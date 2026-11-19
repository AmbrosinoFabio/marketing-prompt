"""Checks the prompt library before publishing.

    python tools/valida_prompt.py

Checks, for data/prompts.js (English) and data/prompts-it.js (Italian):
- unique ids, and every Italian id also exists in English (and vice versa: warning);
- category exists in data/categorie.js;
- every {variable} in the text is declared in `variabili`, and every declared
  variable is used in the text;
- license and review date present (English file);
- the file still runs in a browser (no `${` template expressions).

It reads the .js files as text, so it does not need Node.js.
Exit code 1 if there are errors (useful in GitHub Actions).
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

RADICE = Path(__file__).resolve().parent.parent
DATA = RADICE / "data"

RE_BLOCCO = re.compile(r"p\(\{(.*?)\n    \}\)", re.S)
RE_CAMPO = re.compile(r'^\s{6}(\w+):\s*"((?:[^"\\]|\\.)*)"', re.M)
RE_TESTO = re.compile(r"testo:\s*`(.*?)`", re.S)
RE_VAR_DICH = re.compile(r'\{\s*nome:\s*"([a-z][a-z0-9_]*)"')
RE_VAR_TESTO = re.compile(r"\{([a-z][a-z0-9_]*)\}")


def leggi(file: Path) -> list[dict]:
    s = file.read_text(encoding="utf-8")
    out = []
    for blocco in RE_BLOCCO.findall(s):
        campi = dict(RE_CAMPO.findall(blocco))
        m = RE_TESTO.search(blocco)
        campi["testo"] = m.group(1) if m else ""
        sezione_var = blocco.split("variabili:", 1)[1] if "variabili:" in blocco else ""
        sezione_var = sezione_var.split("consiglio:", 1)[0]
        campi["variabili"] = RE_VAR_DICH.findall(sezione_var)
        out.append(campi)
    return out, s


def main() -> int:
    errori, avvisi = [], []
    categorie = set(re.findall(r'id:\s*"([a-z]+)"', (DATA / "categorie.js").read_text(encoding="utf-8")))

    insiemi = {}
    for nome_file, principale in (("prompts.js", True), ("prompts-it.js", False)):
        prompts, sorgente = leggi(DATA / nome_file)
        if "${" in sorgente:
            errori.append(f"{nome_file}: contiene '${{' (verrebbe interpretato dal browser)")
        ids = set()
        for p in prompts:
            pid = p.get("id", "?")
            dove = f"{nome_file} [{pid}]"
            if pid in ids:
                errori.append(f"{dove}: id duplicato")
            ids.add(pid)
            if not re.fullmatch(r"[a-z0-9-]+", pid):
                errori.append(f"{dove}: id non valido (solo minuscole, numeri e trattini)")
            if principale:
                if p.get("categoria") not in categorie:
                    errori.append(f"{dove}: categoria '{p.get('categoria')}' non esiste in categorie.js")
                if not p.get("titolo"):
                    errori.append(f"{dove}: manca il titolo")
            nel_testo = set(RE_VAR_TESTO.findall(p["testo"]))
            dichiarate = set(p["variabili"])
            for v in sorted(nel_testo - dichiarate):
                errori.append(f"{dove}: {{{v}}} è nel testo ma non in 'variabili'")
            for v in sorted(dichiarate - nel_testo):
                avvisi.append(f"{dove}: la variabile '{v}' è dichiarata ma non usata nel testo")
            if not p["testo"].strip():
                errori.append(f"{dove}: testo vuoto")
        insiemi[nome_file] = ids
        print(f"{nome_file}: {len(prompts)} prompt")

    en, it = insiemi["prompts.js"], insiemi["prompts-it.js"]
    for pid in sorted(it - en):
        errori.append(f"prompts-it.js [{pid}]: non esiste in prompts.js")
    for pid in sorted(en - it):
        avvisi.append(f"prompts.js [{pid}]: manca la traduzione italiana")

    # license and review are set once by p() in prompts.js
    s = (DATA / "prompts.js").read_text(encoding="utf-8")
    if 'var LIC = "' not in s or 'var REV = "' not in s:
        errori.append("prompts.js: mancano licenza (LIC) o data di revisione (REV) predefinite")

    for a in avvisi:
        print("AVVISO ", a)
    for e in errori:
        print("ERRORE ", e)
    print("Tutto a posto." if not errori else f"{len(errori)} errori.")
    return 1 if errori else 0


if __name__ == "__main__":
    sys.exit(main())

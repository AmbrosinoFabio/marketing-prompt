"""Updates the home page news (data/news.js + data/news.json) and checks the watched pages.

Standard library only: nothing to install. Run from the project folder:
    python tools/aggiorna_news.py

What it does:
1. Reads every feed in tools/fonti.py (RSS 2.0 or Atom).
2. Keeps only title, source, date, link and a short excerpt (max ~280 characters):
   short quotations with a link, never the full article.
3. Merges with the previous news, removes duplicates, keeps the 60 most recent.
4. Writes data/news.json (for tools) and data/news.js (read by the site, also via file://).
5. Saves a hash of the watched pages in tools/stato_pagine.json; if one changed it
   prints it and, inside GitHub Actions, writes `pagine_cambiate` to GITHUB_OUTPUT.

A source that fails (offline, 403, malformed feed) is skipped with a warning:
the other sources are still updated.
"""
from __future__ import annotations

import hashlib
import html
import json
import os
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from html.parser import HTMLParser
from pathlib import Path

RADICE = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(RADICE / "tools"))
from fonti import FEEDS, PAGINE_SORVEGLIATE  # noqa: E402

FILE_JSON = RADICE / "data" / "news.json"
FILE_JS = RADICE / "data" / "news.js"
FILE_STATO = RADICE / "tools" / "stato_pagine.json"
MAX_VOCI = 60
MAX_ESTRATTO = 280
TIMEOUT = 20
USER_AGENT = "marketing-prompt-news/1.0 (+https://github.com/AmbrosinoFabio/marketing-prompt)"

ATOM = "{http://www.w3.org/2005/Atom}"


# ---------------------------------------------------------------- utilities
class _Testo(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parti: list[str] = []

    def handle_data(self, data):
        self.parti.append(data)


def testo_pulito(s: str | None) -> str:
    """HTML → plain text on one line."""
    if not s:
        return ""
    p = _Testo()
    try:
        p.feed(html.unescape(s) if "&lt;" in s else s)
    except Exception:
        return re.sub(r"\s+", " ", s).strip()
    t = re.sub(r"\s+", " ", " ".join(p.parti)).strip()
    # boilerplate added by blog platforms
    t = re.sub(r"\s*(The post .* appeared first on .*|Read more\s*›?|Continue reading.*)$", "", t)
    return t.strip()


def accorcia(s: str, n: int = MAX_ESTRATTO) -> str:
    if len(s) <= n:
        return s
    taglio = s[:n].rsplit(" ", 1)[0]
    return taglio.rstrip(",.;:") + "…"


def data_iso(s: str | None) -> str:
    if not s:
        return ""
    s = s.strip()
    try:
        d = parsedate_to_datetime(s)  # RSS: "Tue, 18 Nov 2026 10:00:00 GMT"
    except (TypeError, ValueError):
        try:
            d = datetime.fromisoformat(s.replace("Z", "+00:00"))  # Atom: ISO 8601
        except ValueError:
            return ""
    if d.tzinfo is None:
        d = d.replace(tzinfo=timezone.utc)
    return d.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def scarica(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "*/*"})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
        return r.read()


def link_sicuro(url: str | None) -> str:
    url = (url or "").strip()
    return url if re.match(r"^https?://", url, re.I) else ""


# ---------------------------------------------------------------- feeds
def leggi_feed(fonte: dict) -> list[dict]:
    radice = ET.fromstring(scarica(fonte["url"]))
    voci = []

    if radice.tag == ATOM + "feed":  # Atom
        for e in radice.findall(ATOM + "entry"):
            link = ""
            for l in e.findall(ATOM + "link"):
                if l.get("rel", "alternate") == "alternate":
                    link = l.get("href", "")
                    break
            titolo = testo_pulito(e.findtext(ATOM + "title"))
            estratto = testo_pulito(e.findtext(ATOM + "summary") or e.findtext(ATOM + "content"))
            data = e.findtext(ATOM + "published") or e.findtext(ATOM + "updated")
            voci.append((titolo, link, data, estratto))
    else:  # RSS 2.0
        canale = radice.find("channel")
        for i in (canale.findall("item") if canale is not None else []):
            voci.append((
                testo_pulito(i.findtext("title")),
                i.findtext("link") or "",
                i.findtext("pubDate"),
                testo_pulito(i.findtext("description")),
            ))

    out = []
    for titolo, link, data, estratto in voci:
        link = link_sicuro(link)
        if not titolo or not link:
            continue
        if "github.com" in fonte["url"]:
            # commit messages: keep only the first line, no excerpt
            titolo = titolo.splitlines()[0]
            estratto = ""
        if estratto == titolo:
            estratto = ""
        out.append({
            "titolo": accorcia(titolo, 160),
            "url": link,
            "fonte": fonte["nome"],
            "tipo": fonte["tipo"],
            "data": data_iso(data),
            "estratto": accorcia(estratto),
        })
    out.sort(key=lambda v: v["data"], reverse=True)
    return out[: fonte.get("max", 5)]


def aggiorna_news() -> int:
    vecchie = []
    if FILE_JSON.exists():
        try:
            vecchie = json.loads(FILE_JSON.read_text(encoding="utf-8")).get("voci", [])
        except (json.JSONDecodeError, OSError):
            vecchie = []

    nuove, errori = [], 0
    for f in FEEDS:
        try:
            voci = leggi_feed(f)
            print(f"  ok   {f['nome']}: {len(voci)} voci")
            nuove.extend(voci)
        except Exception as e:  # one broken source must not stop the others
            errori += 1
            print(f"  SALTATA {f['nome']}: {e}", file=sys.stderr)

    nomi_validi = {f["nome"] for f in FEEDS}
    per_url: dict[str, dict] = {}
    for v in vecchie + nuove:  # new versions overwrite the old ones
        if v.get("url") and v.get("fonte") in nomi_validi:
            per_url[v["url"]] = v
    voci = sorted(per_url.values(), key=lambda v: v.get("data", ""), reverse=True)[:MAX_VOCI]

    cambiato = [v["url"] for v in voci] != [v.get("url") for v in vecchie] or voci != vecchie
    if not cambiato:
        print("Nessuna novità.")
        return errori

    dati = {"aggiornato": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"), "voci": voci}
    FILE_JSON.write_text(json.dumps(dati, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    FILE_JS.write_text(
        "/* Generated by tools/aggiorna_news.py — do not edit by hand. */\n"
        "window.NEWS = " + json.dumps(dati, ensure_ascii=False, indent=1) + ";\n",
        encoding="utf-8",
    )
    print(f"Scritte {len(voci)} voci in data/news.js")
    return errori


# ---------------------------------------------------------------- watched pages
def controlla_pagine() -> list[str]:
    stato = {}
    if FILE_STATO.exists():
        try:
            stato = json.loads(FILE_STATO.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            stato = {}

    cambiate = []
    for p in PAGINE_SORVEGLIATE:
        try:
            impronta = hashlib.sha256(scarica(p["url"])).hexdigest()
        except Exception as e:
            print(f"  SALTATA pagina {p['nome']}: {e}", file=sys.stderr)
            continue
        prima = stato.get(p["url"], {}).get("hash")
        if prima and prima != impronta:
            cambiate.append(f"{p['nome']} — {p['url']}")
        if prima != impronta:
            stato[p["url"]] = {"nome": p["nome"], "hash": impronta,
                               "controllato": datetime.now(timezone.utc).strftime("%Y-%m-%d")}

    FILE_STATO.write_text(json.dumps(stato, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    if cambiate:
        print("Pagine cambiate:\n  " + "\n  ".join(cambiate))
        out = os.environ.get("GITHUB_OUTPUT")
        if out:
            with open(out, "a", encoding="utf-8") as fh:
                fh.write("pagine_cambiate<<FINE\n" + "\n".join(cambiate) + "\nFINE\n")
    return cambiate


if __name__ == "__main__":
    print("Notizie:")
    aggiorna_news()
    print("Pagine sorvegliate:")
    controlla_pagine()

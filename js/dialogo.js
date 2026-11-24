/* Dialog to "use" a prompt: tip, fields for the variables, live preview, copy.
   Wide screens: fields on the left, preview on the right. Shortcut: C copies.
   Shared by the library (prompt.html) and My prompts (miei-prompt.html). */
(function () {
  "use strict";
  var MP = window.MP = window.MP || {};
  var el = function (t, c, x) { return MP.el(t, c, x); };
  // Longer links are opened without the prompt (it is in the clipboard anyway):
  // very long URLs can be rejected by servers and browsers.
  var MAX_URL_CLAUDE = 8000;

  /**
   * opzioni.prompt       { titolo, categoria, descrizione, testo, variabili?, consiglio?, tecniche?, fonte?, licenza?, revisione?, note? }
   * opzioni.azioniExtra  [{ etichetta, icona?, primario?, azione(testoCompilato, dialog) }]
   */
  MP.apriPrompt = function (opzioni) {
    var p = opzioni.prompt;
    var vecchio = document.getElementById("dlgPrompt");
    if (vecchio) vecchio.remove();

    var dlg = el("dialog");
    dlg.id = "dlgPrompt";
    dlg.setAttribute("aria-labelledby", "dlgTitolo");

    // ----- header -----
    var testa = el("div", "dlg-testa");
    var titoli = el("div", "dlg-titoli");
    titoli.appendChild(el("span", "etichetta", MP.categoria(p.categoria).nome));
    var h = el("h2", null, p.titolo);
    h.id = "dlgTitolo";
    titoli.appendChild(h);
    if (p.descrizione) titoli.appendChild(el("p", "muted small", p.descrizione));
    testa.appendChild(titoli);
    var chiudi = MP.bottone("btn-icona", "chiudi");
    chiudi.setAttribute("aria-label", MP.t("ui.close"));
    chiudi.addEventListener("click", function () { dlg.close(); });
    testa.appendChild(chiudi);
    dlg.appendChild(testa);

    // ----- body: two columns -----
    var corpo = el("div", "dlg-corpo");
    var colonne = el("div", "dlg-colonne");
    var sx = el("div", "dlg-sx");
    var dx = el("div", "dlg-dx");

    // tip first: it helps while filling in the fields
    if (p.consiglio) {
      var c = el("div", "consiglio");
      c.appendChild(el("strong", null, MP.t("lib.tip") + ": "));
      c.appendChild(document.createTextNode(p.consiglio));
      sx.appendChild(c);
    }
    if (p.note) sx.appendChild(el("div", "consiglio", p.note));

    // variables: declared (library) or detected in the text (my prompts)
    var dichiarate = {};
    (p.variabili || []).forEach(function (v) { dichiarate[v.nome] = v; });
    var nomi = MP.variabiliIn(p.testo);
    var valori = {};
    var input = [];

    if (nomi.length) {
      sx.appendChild(el("h3", null, MP.t("lib.fields")));
      var campi = el("div", "campi");
      nomi.forEach(function (n) {
        var info = dichiarate[n] || { nome: n, etichetta: n, esempio: "" };
        var lab = el("label", null, info.etichetta || n);
        var lungo = /\((paste|incolla)/i.test(info.esempio || "");
        var inp = document.createElement(lungo ? "textarea" : "input");
        if (lungo) { inp.rows = 3; inp.className = "corto testo-normale"; }
        else inp.type = "text";
        inp.placeholder = info.esempio || "";
        inp.addEventListener("input", function () { valori[n] = inp.value; aggiorna(); });
        lab.appendChild(inp);
        campi.appendChild(lab);
        input.push(inp);
      });
      sx.appendChild(campi);
      sx.appendChild(el("p", "fonte-riga", MP.t("lib.fieldsNote")));
    }

    if (p.tecniche && p.tecniche.length) {
      sx.appendChild(el("h3", null, MP.t("lib.tech")));
      var tec = el("div", "tecniche");
      p.tecniche.forEach(function (x) { tec.appendChild(el("span", "etichetta neutra", x)); });
      sx.appendChild(tec);
    }
    if (p.tipo === "adattato" && p.fonte) {
      // adapted prompt: full attribution (source, author, original license) + what changed
      var box = el("div", "fonte-box");
      var r1 = el("p");
      var url = MP.linkSicuro(p.fonte.url);
      var nome = url ? el("a", null, p.fonte.nome) : el("strong", null, p.fonte.nome);
      if (url) { nome.href = url; nome.rel = "noopener noreferrer"; nome.target = "_blank"; }
      var parti = MP.t("lib.adaptedFrom", "\u0000").split("\u0000");
      r1.appendChild(document.createTextNode(parti[0]));
      r1.appendChild(nome);
      r1.appendChild(document.createTextNode((parti[1] || "") + (p.fonte.autore ? " " + MP.t("lib.by", p.fonte.autore) : "") + "."));
      box.appendChild(r1);
      var r2 = el("p");
      var lurl = MP.linkSicuro(p.fonte.licenzaUrl);
      if (lurl) {
        var la = el("a", null, MP.t("lib.origLicense", p.fonte.licenza));
        la.href = lurl; la.rel = "noopener noreferrer"; la.target = "_blank";
        r2.appendChild(la);
      } else r2.textContent = MP.t("lib.origLicense", p.fonte.licenza || "?");
      box.appendChild(r2);
      if (p.modifiche) {
        var r3 = el("p");
        r3.appendChild(el("strong", null, MP.t("lib.changes") + ": "));
        r3.appendChild(document.createTextNode(p.modifiche));
        box.appendChild(r3);
      }
      sx.appendChild(box);
    }
    if (p.licenza) {
      var nomeFonte = p.tipo === "adattato" ? MP.t("lib.adapted") : MP.t("lib.original");
      sx.appendChild(el("p", "fonte-riga", MP.t("lib.source", nomeFonte, p.licenza, MP.dataIt(p.revisione))));
    }

    dx.appendChild(el("h3", null, MP.t("lib.preview")));
    var prev = el("div", "anteprima");
    prev.setAttribute("aria-live", "polite");
    dx.appendChild(prev);
    if (nomi.length) dx.appendChild(el("p", "fonte-riga", MP.t("lib.previewHint")));

    if (sx.childNodes.length) { colonne.appendChild(sx); colonne.appendChild(dx); corpo.appendChild(colonne); }
    else corpo.appendChild(dx);
    dlg.appendChild(corpo);

    // ----- footer -----
    var piede = el("div", "dlg-piede");
    var bCopia = MP.bottone("btn primario", "copia", MP.t("lib.copy"));
    var copia = function () { MP.copia(MP.compila(p.testo, valori), bCopia); };
    bCopia.addEventListener("click", copia);
    piede.appendChild(bCopia);
    // Open in Claude: claude.ai/new?q= prefills the chat box (it is never sent automatically).
    // The prompt is also copied, so the user can paste it if the box stays empty
    // (Claude may ask to confirm a prompt that comes from a link, or ignore it if very long).
    var bClaude = MP.bottone("btn", "esterno", MP.t("lib.openClaude"));
    bClaude.title = MP.t("lib.openClaudeTip");
    bClaude.addEventListener("click", function () {
      var testo = MP.compila(p.testo, valori);
      MP.copia(testo, null, MP.t("lib.openClaudeCopied"));
      var url = "https://claude.ai/new?q=" + encodeURIComponent(testo);
      if (url.length > MAX_URL_CLAUDE) url = "https://claude.ai/new";
      window.open(url, "_blank", "noopener,noreferrer");
    });
    piede.appendChild(bClaude);
    (opzioni.azioniExtra || []).forEach(function (a) {
      var b = MP.bottone("btn" + (a.primario ? " primario" : ""), a.icona, a.etichetta);
      b.addEventListener("click", function () { a.azione(MP.compila(p.testo, valori), dlg); });
      piede.appendChild(b);
    });
    if (nomi.length) {
      var bReset = MP.bottone("btn", null, MP.t("lib.reset"));
      bReset.addEventListener("click", function () {
        input.forEach(function (i) { i.value = ""; });
        valori = {};
        aggiorna();
        if (input[0]) input[0].focus();
      });
      piede.appendChild(bReset);
    }
    var sugg = el("span", "suggerimento");
    sugg.appendChild(el("span", "kbd", "C"));
    sugg.appendChild(document.createTextNode(MP.t("lib.kbCopy")));
    sugg.appendChild(el("span", "kbd", "Esc"));
    sugg.appendChild(document.createTextNode(MP.t("ui.close")));
    piede.appendChild(sugg);
    dlg.appendChild(piede);

    function aggiorna() { MP.anteprima(prev, p.testo, valori); }
    aggiorna();

    // C copies, unless the user is typing in a field
    dlg.addEventListener("keydown", function (e) {
      var t = e.target.tagName;
      if ((e.key === "c" || e.key === "C") && !e.ctrlKey && !e.metaKey && !e.altKey && t !== "INPUT" && t !== "TEXTAREA") {
        e.preventDefault();
        copia();
      }
    });
    dlg.addEventListener("close", function () {
      dlg.remove();
      if (opzioni.allaChiusura) opzioni.allaChiusura();
    });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    document.body.appendChild(dlg);
    dlg.showModal();
    if (input[0]) input[0].focus(); else bCopia.focus();
    return dlg;
  };
})();

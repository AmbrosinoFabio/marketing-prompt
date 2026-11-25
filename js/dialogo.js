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
   * opzioni.azioniExtra  [{ etichetta, icona?, primario?, azione(testoCompilato, dialog, bottone), prepara?(bottone) }]
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
    var campoPer = {}; // field name → its input
    var esempioPer = {}; // field name → example usable as a value ("(paste …)" hints are not)

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
        // "e.g." prefix: without it the grey example looked like a value already typed in
        // ("paste your text here" is an instruction, not an example: no prefix)
        inp.placeholder = !info.esempio ? "" : lungo ? info.esempio : MP.t("lib.eg", info.esempio);
        inp.addEventListener("input", function () { valori[n] = inp.value; aggiorna(); });
        lab.appendChild(inp);
        campi.appendChild(lab);
        input.push(inp);
        campoPer[n] = inp;
        if (info.esempio && !lungo) esempioPer[n] = info.esempio;
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

    if (sx.childNodes.length) {
      // small screens show one column at a time: Fields | Preview (CSS hides this switch on wide screens)
      var viste = el("div", "tipi dlg-viste");
      viste.setAttribute("role", "group");
      viste.setAttribute("aria-label", MP.t("lib.view"));
      colonne.setAttribute("data-vista", "sx");
      [["sx", nomi.length ? MP.t("lib.fields") : MP.t("lib.details")], ["dx", MP.t("lib.preview")]].forEach(function (v) {
        var t = el("button", "tab", v[1]);
        t.type = "button";
        t.setAttribute("aria-pressed", v[0] === "sx" ? "true" : "false");
        t.addEventListener("click", function () {
          colonne.setAttribute("data-vista", v[0]);
          viste.querySelectorAll(".tab").forEach(function (x) { x.setAttribute("aria-pressed", x === t ? "true" : "false"); });
        });
        viste.appendChild(t);
      });
      corpo.appendChild(viste);
      colonne.appendChild(sx); colonne.appendChild(dx); corpo.appendChild(colonne);
    }
    else corpo.appendChild(dx);
    dlg.appendChild(corpo);

    // ----- footer -----
    var piede = el("div", "dlg-piede");

    // Empty fields: the AI would receive "{brand}" as it is. Before copying or opening
    // Claude, say which fields are empty and offer "Use the examples" or "Copy anyway".
    var avvisoCampi = el("div", "avviso-campi");
    avvisoCampi.setAttribute("role", "alert");
    avvisoCampi.hidden = true;
    piede.appendChild(avvisoCampi);
    function vuoti() {
      return nomi.filter(function (n) { return !(valori[n] || "").trim(); });
    }
    function controllaCampi(azione, chiaveComunque) {
      var v = vuoti();
      if (!v.length) { avvisoCampi.hidden = true; azione(); return; }
      avvisoCampi.textContent = "";
      avvisoCampi.appendChild(el("span", null, v.length === 1 ? MP.t("lib.empty1", "{" + v[0] + "}")
        : MP.t("lib.emptyN", v.length, v.map(function (n) { return "{" + n + "}"; }).join(", "))));
      var azioni = el("span", "azioni-avviso");
      var conEsempio = v.filter(function (n) { return esempioPer[n]; });
      if (conEsempio.length) {
        var bEs = MP.bottone("btn piccolo", null, MP.t("lib.useExamples"));
        bEs.addEventListener("click", function () {
          conEsempio.forEach(function (n) { campoPer[n].value = esempioPer[n]; valori[n] = esempioPer[n]; });
          aggiorna();
          MP.toast(MP.t("lib.examplesIn"));
          var restano = vuoti(); // fields with no usable example ("paste your text here")
          if (restano.length) { controllaCampi(azione, chiaveComunque); campoPer[restano[0]].focus(); }
          else { avvisoCampi.hidden = true; campoPer[conEsempio[0]].focus(); }
        });
        azioni.appendChild(bEs);
      }
      var bComunque = MP.bottone("btn piccolo", null, MP.t(chiaveComunque));
      bComunque.addEventListener("click", function () { avvisoCampi.hidden = true; azione(); });
      azioni.appendChild(bComunque);
      avvisoCampi.appendChild(azioni);
      avvisoCampi.hidden = false;
      (conEsempio.length ? azioni.firstChild : bComunque).focus();
    }

    var bCopia = MP.bottone("btn primario", "copia", MP.t("lib.copy"));
    var copiaSubito = function () { MP.copia(MP.compila(p.testo, valori), bCopia); };
    var copia = function () { controllaCampi(copiaSubito, "lib.copyAnyway"); };
    bCopia.addEventListener("click", copia);
    piede.appendChild(bCopia);
    // Open in Claude: claude.ai/new?q= prefills the chat box (it is never sent automatically).
    // The prompt is also copied, so the user can paste it if the box stays empty
    // (Claude may ask to confirm a prompt that comes from a link, or ignore it if very long).
    var bClaude = MP.bottone("btn sec");
    MP.etichettaBottone(bClaude, "esterno", MP.t("lib.openClaude"));
    bClaude.title = MP.t("lib.openClaudeTip");
    var apriClaude = function () {
      var testo = MP.compila(p.testo, valori);
      MP.copia(testo, null, MP.t("lib.openClaudeCopied"));
      var url = "https://claude.ai/new?q=" + encodeURIComponent(testo);
      if (url.length > MAX_URL_CLAUDE) url = "https://claude.ai/new";
      window.open(url, "_blank", "noopener,noreferrer");
    };
    bClaude.addEventListener("click", function () { controllaCampi(apriClaude, "lib.openAnyway"); });
    piede.appendChild(bClaude);
    (opzioni.azioniExtra || []).forEach(function (a) {
      var b = MP.bottone("btn" + (a.primario ? " primario" : " sec"));
      MP.etichettaBottone(b, a.icona, a.etichetta);
      b.addEventListener("click", function () { a.azione(MP.compila(p.testo, valori), dlg, b); });
      if (a.prepara) a.prepara(b); // lets the action set its initial state (e.g. "Saved")
      piede.appendChild(b);
    });
    if (nomi.length) {
      var bReset = MP.bottone("btn sec");
      MP.etichettaBottone(bReset, "svuota", MP.t("lib.reset"));
      bReset.addEventListener("click", function () {
        input.forEach(function (i) { i.value = ""; });
        valori = {};
        avvisoCampi.hidden = true;
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

    function aggiorna() {
      MP.anteprima(prev, p.testo, valori);
      if (!avvisoCampi.hidden && !vuoti().length) avvisoCampi.hidden = true; // all filled in now
    }
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
    // touch screens: focusing a field would pop up the keyboard and cover the dialog,
    // so focus the title instead (the user taps a field when ready)
    var touch = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    if (touch) { h.tabIndex = -1; h.focus(); }
    else if (input[0]) input[0].focus(); else bCopia.focus();
    return dlg;
  };
})();

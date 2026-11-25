/* Prompt library page (prompt.html): search, category filter, prompt dialog.
   Supports ?cat=<category> and ?id=<prompt> links. */
(function () {
  "use strict";
  var MP = window.MP;

  document.addEventListener("DOMContentLoaded", function () {
    var ordineCat = {};
    (window.CATEGORIE || []).forEach(function (c, i) { ordineCat[c.id] = i; });
    var tutti = (window.PROMPTS || []).map(MP.localizza).sort(function (a, b) {
      return (ordineCat[a.categoria] || 0) - (ordineCat[b.categoria] || 0); // stable: keeps the file order inside a category
    });
    var cerca = document.getElementById("cerca");
    var boxCat = document.getElementById("categorie");
    var lista = document.getElementById("lista");
    var conteggio = document.getElementById("conteggio");
    var params = new URLSearchParams(location.search);
    var catAttiva = params.get("cat") || "";
    var tipoAttivo = params.get("tipo") || ""; // "", "adattato", "originale"
    var boxTipi = document.getElementById("tipi");

    // tabs: All / Adapted from sources / Original (a tab is hidden while it has no prompts)
    var perTipo = { adattato: 0, originale: 0 };
    tutti.forEach(function (p) { perTipo[p.tipo === "adattato" ? "adattato" : "originale"]++; });
    [["", "lib.tabAll", tutti.length], ["adattato", "lib.tabSrc", perTipo.adattato], ["originale", "lib.tabOrig", perTipo.originale]].forEach(function (t) {
      if (t[0] && !t[2]) return;
      var b = MP.el("button", "tab", MP.t(t[1]) + " (" + t[2] + ")");
      b.type = "button";
      b.setAttribute("aria-pressed", t[0] === tipoAttivo ? "true" : "false");
      b.addEventListener("click", function () {
        tipoAttivo = t[0];
        boxTipi.querySelectorAll(".tab").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        disegna();
      });
      boxTipi.appendChild(b);
    });

    // category chips (only categories that have prompts)
    var usate = {};
    tutti.forEach(function (p) { usate[p.categoria] = (usate[p.categoria] || 0) + 1; });
    function chip(id, testo) {
      var b = MP.el("button", "chip", testo);
      b.type = "button";
      b.setAttribute("aria-pressed", id === catAttiva ? "true" : "false");
      b.addEventListener("click", function () {
        catAttiva = id;
        boxCat.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        disegna();
      });
      boxCat.appendChild(b);
    }
    chip("", MP.t("lib.all") + " (" + tutti.length + ")");
    (window.CATEGORIE || []).forEach(function (c) {
      if (usate[c.id]) chip(c.id, MP.categoria(c.id).nome + " (" + usate[c.id] + ")");
    });
    // phones: the chips are one sliding row; bring the chosen category (?cat=) into view
    var scelta = boxCat.querySelector('[aria-pressed="true"]');
    if (scelta && boxCat.scrollWidth > boxCat.clientWidth) {
      boxCat.scrollLeft = scelta.getBoundingClientRect().left - boxCat.getBoundingClientRect().left - 16;
    }

    function normalizza(s) {
      return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    }

    // "Start here": easy prompts with few fields, shown first when no search or filter is active
    var INIZIA = ["email-oggetti", "social-riuso-contenuto", "strategia-obiettivi-smart", "copy-riscrivi-pas"];

    /** Search relevance: a word in the title counts more than one in the description,
        which counts more than one only in the prompt text. 0 = not every word found. */
    function punteggio(p, parole) {
      var titolo = normalizza(p.titolo), desc = normalizza(p.descrizione);
      var altro = normalizza([MP.categoria(p.categoria).nome, (p.tecniche || []).join(" ")].join(" "));
      var testo = normalizza(p.testo);
      var tot = 0;
      for (var i = 0; i < parole.length; i++) {
        var w = parole[i];
        if (titolo.indexOf(w) >= 0) tot += 10;
        else if (desc.indexOf(w) >= 0) tot += 5;
        else if (altro.indexOf(w) >= 0) tot += 3;
        else if (testo.indexOf(w) >= 0) tot += 1;
        else return 0;
      }
      return tot;
    }

    function disegna() {
      var q = normalizza(cerca.value.trim());
      var parole = q ? q.split(/\s+/) : [];
      var punti = {};
      var filtrati = tutti.filter(function (p) {
        if (catAttiva && p.categoria !== catAttiva) return false;
        if (tipoAttivo && (p.tipo === "adattato" ? "adattato" : "originale") !== tipoAttivo) return false;
        if (!parole.length) return true;
        punti[p.id] = punteggio(p, parole);
        return punti[p.id] > 0;
      });
      // with a search, best matches first (the sort is stable: ties keep the usual order)
      if (parole.length) filtrati.sort(function (a, b) { return punti[b.id] - punti[a.id]; });

      conteggio.textContent = filtrati.length === 1 ? MP.t("lib.count1") : MP.t("lib.count", filtrati.length);
      lista.textContent = "";
      if (!filtrati.length) {
        var v = MP.el("div", "vuoto");
        v.appendChild(MP.el("p", null, MP.t("lib.none")));
        var reset = MP.bottone("btn", null, MP.t("lib.clearFilters"));
        reset.addEventListener("click", function () {
          cerca.value = ""; catAttiva = ""; tipoAttivo = "";
          boxTipi.querySelectorAll(".tab").forEach(function (c, i) { c.setAttribute("aria-pressed", i === 0 ? "true" : "false"); });
          boxCat.querySelectorAll(".chip").forEach(function (c, i) { c.setAttribute("aria-pressed", i === 0 ? "true" : "false"); });
          disegna(); cerca.focus();
        });
        v.appendChild(reset);
        lista.appendChild(v);
        return;
      }

      // no search or filter: a short "Start here" row for first-time visitors
      if (!parole.length && !catAttiva && !tipoAttivo) {
        var facili = INIZIA.map(function (id) { return tutti.filter(function (p) { return p.id === id; })[0]; }).filter(Boolean);
        if (facili.length) {
          var ti = MP.el("div", "gruppo-testa inizia");
          ti.appendChild(MP.el("h2", null, MP.t("lib.start")));
          ti.appendChild(MP.el("p", null, MP.t("lib.startD")));
          lista.appendChild(ti);
          facili.forEach(scheda);
        }
      }

      // two sections on the same page: original prompts (simpler), then adapted from sources
      [["originale", "lib.secOrig", "lib.secOrigD"], ["adattato", "lib.secSrc", "lib.secSrcD"]].forEach(function (g) {
        var gruppo = filtrati.filter(function (p) { return (p.tipo === "adattato" ? "adattato" : "originale") === g[0]; });
        if (!gruppo.length) return;
        var testa = MP.el("div", "gruppo-testa");
        testa.appendChild(MP.el("h2", null, MP.t(g[1]) + " · " + gruppo.length));
        testa.appendChild(MP.el("p", null, MP.t(g[2])));
        lista.appendChild(testa);
        gruppo.forEach(scheda);
      });
    }

    function scheda(p) {
        var s = MP.el("article", "scheda link");
        // the whole card opens the prompt (an invisible button covers it)
        var tutta = MP.el("button", "apri-tutta");
        tutta.type = "button";
        tutta.setAttribute("aria-label", MP.t("lib.open") + ": " + p.titolo);
        tutta.addEventListener("click", function () { apri(p); });
        s.appendChild(tutta);
        var top = MP.el("div", "riga-top");
        top.appendChild(MP.el("span", "etichetta", MP.categoria(p.categoria).nome));
        if (p.tipo === "adattato") top.appendChild(MP.el("span", "etichetta neutra", MP.t("lib.adapted") + (p.fonte && p.fonte.licenza ? " · " + p.fonte.licenza : "")));
        s.appendChild(top);
        s.appendChild(MP.el("h3", null, p.titolo));
        s.appendChild(MP.el("p", null, p.descrizione));

        var meta = MP.el("div", "meta-scheda");
        var n = MP.variabiliIn(p.testo).length;
        meta.appendChild(MP.el("span", null, n === 1 ? MP.t("lib.field1") : MP.t("lib.fieldsN", n)));
        (p.tecniche || []).slice(0, 2).forEach(function (t) {
          meta.appendChild(MP.el("span", "sep"));
          meta.appendChild(MP.el("span", null, t));
        });
        s.appendChild(meta);

        var piede = MP.el("div", "piede-scheda");
        var apriB = MP.bottone("btn piccolo primario", null, n ? MP.t("lib.fillCopy") : MP.t("lib.open"));
        apriB.addEventListener("click", function () { apri(p); });
        piede.appendChild(apriB);
        if (!n) {
          var copia = MP.bottone("btn piccolo", "copia", MP.t("lib.copyShort"));
          copia.addEventListener("click", function () { MP.copia(p.testo, copia); });
          piede.appendChild(copia);
        }
        s.appendChild(piede);
        lista.appendChild(s);
    }

    /** The copy of this library prompt already in My prompts, if any. */
    function giaSalvato(p) {
      return MP.store.tutti().filter(function (x) { return x.origine === "lib:" + p.id; })[0] || null;
    }
    /** Turns the Save button into "Saved · Open in My prompts" (a second click opens it). */
    function statoSalvato(b, rec) {
      MP.etichettaBottone(b, "ok", MP.t("lib.savedOpen"));
      b.title = MP.t("lib.savedOpenTip");
      b._salvato = rec;
    }

    function apri(p) {
      MP.apriPrompt({
        prompt: p,
        azioniExtra: [{
          etichetta: MP.t("lib.saveMine"),
          icona: "piu",
          prepara: function (b) {
            var rec = MP.store.disponibile() && giaSalvato(p);
            if (rec) statoSalvato(b, rec);
          },
          azione: function (testo, dlg, b) {
            if (b._salvato) { location.href = "miei-prompt.html?usa=" + encodeURIComponent(b._salvato.id); return; }
            if (!MP.store.disponibile()) { MP.toast(MP.t("mine.noStorage")); return; }
            var rec = giaSalvato(p) || MP.store.salva({
              titolo: p.titolo,
              categoria: p.categoria,
              testo: p.testo,
              note: p.consiglio || "",
              // keep the field labels and examples, so the fields look the same in My prompts
              variabili: p.variabili || [],
              origine: "lib:" + p.id
            });
            if (rec) { MP.toast(MP.t("lib.saved")); statoSalvato(b, rec); }
          }
        }]
      });
    }

    /** Used by the quick search when already on this page. */
    MP.apriDallaLibreria = function (id) {
      var trovato = tutti.filter(function (p) { return p.id === id; })[0];
      if (trovato) apri(trovato);
    };

    var t;
    cerca.addEventListener("input", function () { clearTimeout(t); t = setTimeout(disegna, 120); });
    disegna();

    var id = params.get("id");
    if (id) MP.apriDallaLibreria(id);
  });
})();

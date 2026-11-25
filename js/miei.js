/* My prompts page (miei-prompt.html): create, edit, delete, favorites,
   search, use with fields, export/import JSON backup. */
(function () {
  "use strict";
  var MP = window.MP;

  document.addEventListener("DOMContentLoaded", function () {
    var lista = document.getElementById("lista");
    var cerca = document.getElementById("cerca");
    var selCat = document.getElementById("filtro-cat");
    var bFav = document.getElementById("solo-preferiti");
    var soloPreferiti = false;

    if (!MP.store.disponibile()) {
      var av = document.getElementById("avviso-storage");
      av.textContent = MP.t("mine.noStorage");
      av.hidden = false;
    }

    // category options (filter + editor)
    function opzioniCategorie(sel, conTutte) {
      sel.textContent = "";
      if (conTutte) {
        var o = document.createElement("option");
        o.value = ""; o.textContent = MP.t("mine.allCats");
        sel.appendChild(o);
      }
      (window.CATEGORIE || []).forEach(function (c) {
        var o = document.createElement("option");
        o.value = c.id; o.textContent = MP.categoria(c.id).nome;
        sel.appendChild(o);
      });
    }
    opzioniCategorie(selCat, true);

    function normalizza(s) { return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }

    function disegna() {
      var tutti = MP.store.tutti();
      var q = normalizza(cerca.value.trim()), parole = q ? q.split(/\s+/) : [];
      var filtrati = tutti.filter(function (p) {
        if (soloPreferiti && !p.preferito) return false;
        if (selCat.value && p.categoria !== selCat.value) return false;
        var t = normalizza(p.titolo + " " + p.testo + " " + p.note);
        return parole.every(function (w) { return t.indexOf(w) >= 0; });
      });
      // favorites first, then most recently edited
      filtrati.sort(function (a, b) {
        if (a.preferito !== b.preferito) return a.preferito ? -1 : 1;
        return a.modificato < b.modificato ? 1 : -1;
      });

      lista.textContent = "";
      // nothing saved yet: no toolbar (nothing to search, filter or export), only the empty state
      document.getElementById("barraAzioni").hidden = !tutti.length;
      document.getElementById("barraFiltri").hidden = !tutti.length;
      if (!tutti.length) {
        var v = MP.el("div", "vuoto");
        v.appendChild(MP.el("p", null, MP.t("mine.empty")));
        var az = MP.el("div", "azioni");
        var nuovo = MP.bottone("btn primario", "piu", MP.t("mine.createFirst"));
        nuovo.addEventListener("click", function () { editor(null); });
        az.appendChild(nuovo);
        var lib = MP.el("a", "btn", MP.t("mine.browseLib"));
        lib.href = "prompt.html";
        az.appendChild(lib);
        v.appendChild(az);
        var imp = MP.el("button", "link-bottone", MP.t("mine.importLink"));
        imp.type = "button";
        imp.addEventListener("click", function () { fileImporta.click(); });
        v.appendChild(imp);
        lista.appendChild(v);
        return;
      }
      if (!filtrati.length) { lista.appendChild(MP.el("div", "vuoto", MP.t("mine.none"))); return; }

      filtrati.forEach(function (p) {
        var s = MP.el("article", "scheda");
        var top = MP.el("div", "riga-top");
        top.appendChild(MP.el("span", "etichetta", MP.categoria(p.categoria).nome));
        if (p.origine && p.origine.indexOf("lib:") === 0) top.appendChild(MP.el("span", "etichetta neutra", MP.t("mine.fromLib")));
        var stella = MP.el("button", "stella", "★");
        stella.type = "button";
        stella.setAttribute("aria-pressed", p.preferito ? "true" : "false");
        stella.setAttribute("aria-label", MP.t(p.preferito ? "mine.favOn" : "mine.favOff"));
        stella.title = stella.getAttribute("aria-label");
        stella.addEventListener("click", function () { p.preferito = !p.preferito; MP.store.salva(p); disegna(); });
        top.appendChild(stella);
        s.appendChild(top);
        s.appendChild(MP.el("h3", null, p.titolo));
        var anteprima = p.testo.length > 180 ? p.testo.slice(0, 180) + "…" : p.testo;
        s.appendChild(MP.el("p", "estratto", anteprima));
        s.appendChild(MP.el("p", "fonte-riga", MP.t("mine.edited", MP.dataIt(p.modificato))));

        var piede = MP.el("div", "piede-scheda");
        function bottone(etichetta, cls, fn) {
          var b = MP.bottone("btn piccolo " + cls, null, etichetta);
          b.addEventListener("click", fn);
          piede.appendChild(b);
        }
        bottone(MP.t("mine.use"), "primario", function () { usa(p); });
        bottone(MP.t("mine.edit"), "", function () { editor(p); });
        bottone(MP.t("mine.dup"), "", function () {
          var copia = {};
          for (var k in p) copia[k] = p[k];
          copia.id = ""; copia.titolo = p.titolo + " (2)"; copia.preferito = false;
          MP.store.salva(copia);
          disegna();
        });
        // Delete: icon button in the top row, next to the star (in the bottom row, with
        // Use / Edit / Duplicate, it wrapped onto a line of its own). It asks before deleting.
        var bElimina = MP.bottone("btn piccolo pericolo icona-sola");
        MP.etichettaBottone(bElimina, "cestino", MP.t("mine.delete"));
        bElimina.addEventListener("click", function () {
          if (confirm(MP.t("mine.confirmDel", p.titolo))) { MP.store.elimina(p.id); MP.toast(MP.t("mine.deleted")); disegna(); }
        });
        top.appendChild(bElimina);
        s.appendChild(piede);
        lista.appendChild(s);
      });
    }

    function usa(p) {
      MP.apriPrompt({
        prompt: p,
        azioniExtra: [{ etichetta: MP.t("mine.edit"), icona: "matita", azione: function (x, dlg) { dlg.close(); editor(p); } }]
      });
    }
    /** Used by the quick search and by ?usa=<id> links. */
    MP.usaMio = function (id) {
      var p = MP.store.tutti().filter(function (x) { return x.id === id; })[0];
      if (p) usa(p);
    };

    // ----- editor -----
    var dlg = document.getElementById("dlgEditor");
    var form = document.getElementById("formEditor");
    var fTitolo = document.getElementById("edTitolo");
    var fCat = document.getElementById("edCategoria");
    var fTesto = document.getElementById("edTesto");
    var fNote = document.getElementById("edNote");
    var fVars = document.getElementById("edVariabili");
    var inModifica = null;
    opzioniCategorie(fCat, false);

    function aggiornaVariabili() {
      var v = MP.variabiliIn(fTesto.value);
      fVars.textContent = v.length ? MP.t("ed.vars", v.map(function (n) { return "{" + n + "}"; }).join(", ")) : MP.t("ed.noVars");
    }
    fTesto.addEventListener("input", aggiornaVariabili);

    function editor(p) {
      inModifica = p || null;
      document.getElementById("edTitoloDlg").textContent = MP.t(p ? "ed.edit" : "ed.new");
      fTitolo.value = p ? p.titolo : "";
      fCat.value = p ? p.categoria : "altro";
      fTesto.value = p ? p.testo : "";
      fNote.value = p ? p.note : "";
      aggiornaVariabili();
      dlg.showModal();
      fTitolo.focus();
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!fTesto.value.trim()) { MP.toast(MP.t("ed.needText")); fTesto.focus(); return; }
      var rec = inModifica ? Object.assign({}, inModifica) : {};
      rec.titolo = fTitolo.value.trim();
      rec.categoria = fCat.value;
      rec.testo = fTesto.value;
      rec.note = fNote.value.trim();
      if (MP.store.salva(rec)) { MP.toast(MP.t("mine.savedOk")); dlg.close(); disegna(); }
    });
    document.getElementById("edAnnulla").addEventListener("click", function () { dlg.close(); });

    // ----- toolbar -----
    document.getElementById("btnNuovo").addEventListener("click", function () { editor(null); });
    document.getElementById("btnEsporta").addEventListener("click", function () {
      MP.toast(MP.t("mine.exported", MP.store.esporta()));
    });
    var fileImporta = document.getElementById("fileImporta");
    document.getElementById("btnImporta").addEventListener("click", function () { fileImporta.click(); });
    fileImporta.addEventListener("change", function () {
      var f = fileImporta.files && fileImporta.files[0];
      if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        try {
          var esito = MP.store.importa(String(r.result));
          MP.toast(MP.t("mine.imported", esito.nuovi, esito.aggiornati));
          disegna();
        } catch (err) {
          MP.toast(MP.t("mine.importErr", err.message));
        }
        fileImporta.value = "";
      };
      r.readAsText(f);
    });
    bFav.addEventListener("click", function () {
      soloPreferiti = !soloPreferiti;
      bFav.setAttribute("aria-pressed", soloPreferiti ? "true" : "false");
      disegna();
    });
    selCat.addEventListener("change", disegna);
    var t;
    cerca.addEventListener("input", function () { clearTimeout(t); t = setTimeout(disegna, 120); });

    MP.nuovoPrompt = function () { editor(null); };

    disegna();
    var params = new URLSearchParams(location.search);
    if (params.get("nuovo")) editor(null);
    else if (params.get("usa")) MP.usaMio(params.get("usa"));
  });
})();

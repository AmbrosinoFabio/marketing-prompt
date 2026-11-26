/* Quick search ("command palette"): Ctrl+K / Cmd+K or "/" from any page,
   or the search button in the header. Finds library prompts, your own prompts,
   pages and actions. Works offline: everything is searched in the browser. */
(function () {
  "use strict";
  var MP = window.MP;


  /** Goes to an internal page keeping the chosen language. */
  MP.vai = function (url) {
    location.href = url + (url.indexOf("?") >= 0 ? "&" : "?") + "lang=" + MP.lingua;
  };

  function voci() {
    var out = [];
    var qui = location.pathname.split("/").pop() || "index.html";

    // actions and pages
    out.push({ gruppo: "pal.actions", titolo: MP.t("mine.new"), sub: MP.t("nav.mine"), icona: "piu", azione: function () {
      if (qui === "miei-prompt.html" && MP.nuovoPrompt) MP.nuovoPrompt(); else MP.vai("miei-prompt.html?nuovo=1");
    } });
    out.push({ gruppo: "pal.actions", titolo: MP.t("pal.theme"), icona: "luna", azione: function () {
      var b = document.getElementById("btnTema"); if (b) b.click();
    } });
    out.push({ gruppo: "pal.actions", titolo: MP.t("ui.lang"), icona: "freccia", azione: function () {
      var b = document.getElementById("btnLingua"); if (b) b.click();
    } });
    [["index.html", "nav.home"], ["prompt.html", "nav.library"], ["miei-prompt.html", "nav.mine"], ["fonti.html", "nav.sources"]].forEach(function (p) {
      out.push({ gruppo: "pal.pages", titolo: MP.t(p[1]), icona: "file", azione: function () { MP.vai(p[0]); } });
    });

    // library prompts
    (window.PROMPTS || []).forEach(function (raw) {
      var p = MP.localizza(raw);
      out.push({
        gruppo: "pal.library", titolo: p.titolo, sub: MP.categoria(p.categoria).nome, icona: "nota",
        cerca: [p.descrizione, (p.tecniche || []).join(" ")].join(" "),
        azione: function () {
          if (qui === "prompt.html" && MP.apriDallaLibreria) MP.apriDallaLibreria(p.id);
          else MP.vai("prompt.html?id=" + encodeURIComponent(p.id));
        }
      });
    });

    // my prompts
    if (MP.store) {
      MP.store.tutti().forEach(function (p) {
        out.push({
          gruppo: "pal.mine", titolo: p.titolo, sub: (p.preferito ? "★ " : "") + MP.categoria(p.categoria).nome, icona: "nota",
          cerca: p.testo.slice(0, 400),
          azione: function () {
            if (qui === "miei-prompt.html" && MP.usaMio) MP.usaMio(p.id);
            else MP.vai("miei-prompt.html?usa=" + encodeURIComponent(p.id));
          }
        });
      });
    }
    return out;
  }

  var dlg, input, lista, risultati = [], sel = 0;

  function crea() {
    dlg = MP.el("dialog", "palette");
    dlg.setAttribute("aria-label", MP.t("pal.title"));
    var riga = MP.el("div", "pal-input");
    riga.appendChild(MP.icona("cerca"));
    input = document.createElement("input");
    input.type = "text";
    input.setAttribute("role", "combobox");
    input.setAttribute("aria-expanded", "true");
    input.setAttribute("aria-controls", "palLista");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-label", MP.t("pal.title"));
    input.placeholder = MP.t("pal.placeholder");
    input.autocomplete = "off";
    riga.appendChild(input);
    riga.appendChild(MP.el("span", "kbd", "Esc"));
    dlg.appendChild(riga);

    lista = MP.el("ul", "pal-lista");
    lista.id = "palLista";
    lista.setAttribute("role", "listbox");
    dlg.appendChild(lista);

    var piede = MP.el("div", "pal-piede");
    [["↑ ↓", "pal.move"], ["↵", "pal.open"], ["Ctrl K", "pal.toggle"]].forEach(function (x) {
      var s = MP.el("span");
      s.appendChild(MP.el("span", "kbd", x[0]));
      s.appendChild(document.createTextNode(MP.t(x[1])));
      piede.appendChild(s);
    });
    dlg.appendChild(piede);

    input.addEventListener("input", function () { sel = 0; disegna(); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); sel = Math.min(sel + 1, risultati.length - 1); evidenzia(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); sel = Math.max(sel - 1, 0); evidenzia(); }
      else if (e.key === "Enter") { e.preventDefault(); esegui(sel); }
    });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    document.body.appendChild(dlg);
  }

  function disegna() {
    var q = MP.normalizza(input.value.trim()), parole = q ? q.split(/\s+/) : [];
    var tutte = voci();
    risultati = tutte.filter(function (v) {
      if (!parole.length) return true; // the per-group limit below keeps the list short
      var t = MP.normalizza(v.titolo + " " + (v.sub || "") + " " + (v.cerca || ""));
      return parole.every(function (w) { return t.indexOf(w) >= 0; });
    });
    // limit per group
    var conta = {};
    risultati = risultati.filter(function (v) {
      conta[v.gruppo] = (conta[v.gruppo] || 0) + 1;
      return conta[v.gruppo] <= (v.gruppo === "pal.library" ? 8 : 6);
    });
    // order: with a query, prompts first
    if (parole.length) {
      var ordine = { "pal.library": 0, "pal.mine": 1, "pal.pages": 2, "pal.actions": 3 };
      risultati.sort(function (a, b) { return ordine[a.gruppo] - ordine[b.gruppo]; });
    }

    lista.textContent = "";
    input.setAttribute("aria-expanded", risultati.length ? "true" : "false");
    if (!risultati.length) { lista.appendChild(MP.el("li", "pal-vuoto", MP.t("pal.none"))); return; }
    var ultimo = "";
    risultati.forEach(function (v, i) {
      if (v.gruppo !== ultimo) {
        var g = MP.el("li", "pal-gruppo", MP.t(v.gruppo));
        g.setAttribute("role", "presentation");
        lista.appendChild(g);
        ultimo = v.gruppo;
      }
      var li = MP.el("li", "pal-voce");
      li.id = "palVoce" + i;
      li.setAttribute("role", "option");
      li.appendChild(MP.icona(v.icona));
      li.appendChild(MP.el("span", null, v.titolo));
      if (v.sub) li.appendChild(MP.el("span", "sub", v.sub));
      li.addEventListener("mousemove", function () { if (sel !== i) { sel = i; evidenzia(); } });
      li.addEventListener("click", function () { esegui(i); });
      lista.appendChild(li);
    });
    evidenzia();
  }

  function evidenzia() {
    lista.querySelectorAll(".pal-voce").forEach(function (li) {
      var attivo = li.id === "palVoce" + sel;
      li.setAttribute("aria-selected", attivo ? "true" : "false");
      if (attivo) { input.setAttribute("aria-activedescendant", li.id); li.scrollIntoView({ block: "nearest" }); }
    });
  }

  function esegui(i) {
    var v = risultati[i];
    if (!v) return;
    dlg.close();
    v.azione();
  }

  MP.apriPalette = function () {
    if (!dlg) crea();
    if (dlg.open) { dlg.close(); return; }
    var altro = document.querySelector("dialog[open]");
    if (altro) {
      // closing a window with something typed in it would lose that text (e.g. the editor)
      var compilato = Array.prototype.some.call(altro.querySelectorAll("input, textarea"), function (x) {
        return x.type !== "file" && x.value.trim() !== "";
      });
      if (compilato) { MP.toast(MP.t("pal.busy")); return; }
      altro.close();
    }
    input.value = "";
    sel = 0;
    disegna();
    dlg.showModal();
    input.focus();
  };

  document.addEventListener("keydown", function (e) {
    var t = e.target.tagName;
    var scrivendo = t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.target.isContentEditable;
    if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) { e.preventDefault(); MP.apriPalette(); }
    else if (e.key === "/" && !scrivendo && !document.querySelector("dialog[open]")) { e.preventDefault(); MP.apriPalette(); }
  });

  document.addEventListener("DOMContentLoaded", function () {
    var b = document.getElementById("btnCerca");
    if (b) b.addEventListener("click", MP.apriPalette);
    document.querySelectorAll("[data-apri-palette]").forEach(function (x) { x.addEventListener("click", MP.apriPalette); });
  });
})();

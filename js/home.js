/* Home page: category cards and automatic news.
   News comes from data/news.js (written every day by tools/aggiorna_news.py).
   When the site is opened locally (file://) and online, it also tries to load the
   latest news.js from the published site: a <script> tag has no CORS limits. */
(function () {
  "use strict";
  var MP = window.MP;
  var SITO_LIVE = "https://ambrosinofabio.github.io/marketing-prompt/";

  document.addEventListener("DOMContentLoaded", function () {
    // ----- hero: live example prompt -----
    var demo = document.getElementById("demo");
    var esempio = (window.PROMPTS || []).filter(function (p) { return p.id === "email-sequenza-benvenuto"; })[0];
    if (demo && esempio) {
      esempio = MP.localizza(esempio);
      var vars = esempio.variabili || [];
      var valori = {};
      if (vars[0]) valori[vars[0].nome] = vars[0].esempio; // one field filled, the others highlighted
      document.getElementById("demoTitolo").textContent = esempio.titolo;
      MP.anteprima(document.getElementById("demoTesto"), esempio.testo, valori);
      var bDemo = document.getElementById("demoApri");
      bDemo.addEventListener("click", function () { MP.vai("prompt.html?id=" + esempio.id); });
    }
    var nP = document.getElementById("statPrompt"), nC = document.getElementById("statCat");
    if (nP) nP.textContent = String((window.PROMPTS || []).length);
    if (nC) {
      var cats = {};
      (window.PROMPTS || []).forEach(function (p) { cats[p.categoria] = 1; });
      nC.textContent = String(Object.keys(cats).length);
    }

    // ----- categories -----
    var griglia = document.getElementById("griglia-cat");
    var conta = {};
    (window.PROMPTS || []).forEach(function (p) { conta[p.categoria] = (conta[p.categoria] || 0) + 1; });
    (window.CATEGORIE || []).forEach(function (c) {
      if (!conta[c.id]) return;
      var cat = MP.categoria(c.id);
      var a = MP.el("a", "scheda link");
      a.href = "prompt.html?cat=" + encodeURIComponent(c.id);
      a.appendChild(MP.el("h3", null, cat.nome));
      a.appendChild(MP.el("p", null, cat.descrizione));
      var piede = MP.el("div", "piede-scheda");
      piede.appendChild(MP.el("span", "etichetta", conta[c.id] === 1 ? MP.t("home.n1Prompt") : MP.t("home.nPrompts", conta[c.id])));
      a.appendChild(piede);
      griglia.appendChild(a);
    });

    // ----- news -----
    var filtro = "";
    var box = document.getElementById("novita");
    var agg = document.getElementById("novita-agg");
    var filtri = document.getElementById("filtri-news");

    function disegnaNews() {
      var dati = window.NEWS || { aggiornato: "", voci: [] };
      agg.textContent = dati.aggiornato ? MP.t("home.newsUpd", MP.dataIt(dati.aggiornato)) : "";
      box.textContent = "";
      var voci = (dati.voci || []).filter(function (v) { return !filtro || v.tipo === filtro; }).slice(0, 12);
      if (!voci.length) { box.appendChild(MP.el("li", "pal-vuoto", MP.t("home.newsNone"))); return; }
      voci.forEach(function (v) {
        var url = MP.linkSicuro(v.url);
        if (!url) return;
        var li = MP.el("li");
        li.appendChild(MP.el("div", "meta", [v.fonte, MP.dataIt(v.data)].filter(Boolean).join(" · ")));
        var a = MP.el("a", null, v.titolo);
        a.href = url;
        a.rel = "noopener noreferrer";
        a.target = "_blank";
        li.appendChild(a);
        if (v.estratto) li.appendChild(MP.el("p", null, v.estratto));
        box.appendChild(li);
      });
    }

    [["", "home.newsAll"], ["ai", "home.newsAi"], ["marketing", "home.newsMkt"]].forEach(function (f) {
      var b = MP.el("button", "chip", MP.t(f[1]));
      b.type = "button";
      b.setAttribute("aria-pressed", f[0] === filtro ? "true" : "false");
      b.addEventListener("click", function () {
        filtro = f[0];
        filtri.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        disegnaNews();
      });
      filtri.appendChild(b);
    });
    disegnaNews();

    // local copy: try to get fresher news from the published site
    if (location.protocol === "file:" && navigator.onLine) {
      var locale = window.NEWS;
      var s = document.createElement("script");
      s.src = SITO_LIVE + "data/news.js?t=" + Date.now();
      s.onload = function () {
        if (!window.NEWS || !locale || window.NEWS.aggiornato >= (locale.aggiornato || "")) disegnaNews();
        else window.NEWS = locale;
      };
      s.onerror = function () { window.NEWS = locale; };
      document.body.appendChild(s);
    }
  });
})();

/* Funzioni condivise da tutte le pagine.
   Solo <script> classici (niente ES modules): così il sito funziona anche
   aprendo index.html con doppio clic (file://). */
(function () {
  "use strict";
  var MP = window.MP = window.MP || {};
  if (!MP.t) MP.t = function (k) { return k; };

  // ---------- tema chiaro/scuro ----------
  var CHIAVE_TEMA = "mp_tema";
  function leggi(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function scrivi(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignorato */ } }

  var temaSalvato = leggi(CHIAVE_TEMA);
  if (temaSalvato === "light" || temaSalvato === "dark") {
    document.documentElement.setAttribute("data-theme", temaSalvato);
  }

  // Dark is the default theme; light only when chosen with the button.
  function temaAttuale() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btnTema = document.getElementById("btnTema");
    function aggiornaIcona() {
      if (!btnTema) return;
      var scuro = temaAttuale() === "dark";
      btnTema.textContent = "";
      btnTema.appendChild(MP.icona(scuro ? "sole" : "luna"));
      btnTema.setAttribute("aria-label", MP.t(scuro ? "ui.themeLight" : "ui.themeDark"));
      btnTema.title = btnTema.getAttribute("aria-label");
    }
    if (btnTema) {
      aggiornaIcona();
      btnTema.addEventListener("click", function () {
        var nuovo = temaAttuale() === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", nuovo);
        scrivi(CHIAVE_TEMA, nuovo);
        aggiornaIcona();
      });
    }

    // ---------- mobile menu ----------
    var burger = document.getElementById("btnMenu");
    var nav = document.getElementById("nav");
    if (burger && nav) {
      burger.textContent = "";
      burger.appendChild(MP.icona("menu"));
      var chiudiMenu = function () { nav.classList.remove("aperto"); burger.setAttribute("aria-expanded", "false"); };
      burger.addEventListener("click", function () {
        var aperto = nav.classList.toggle("aperto");
        burger.setAttribute("aria-expanded", aperto ? "true" : "false");
      });
      nav.addEventListener("click", function (e) { if (e.target.closest("a")) chiudiMenu(); });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nav.classList.contains("aperto")) { chiudiMenu(); burger.focus(); }
      });
    }

    // anno nel footer
    var anno = document.getElementById("anno");
    if (anno) anno.textContent = String(new Date().getFullYear());
  });


  /** Crea un elemento con testo sicuro (mai innerHTML con dati esterni o dell'utente). */
  MP.el = function (tag, classe, testo) {
    var e = document.createElement(tag);
    if (classe) e.className = classe;
    if (testo != null) e.textContent = testo;
    return e;
  };

  /** Small SVG icons (inline, so they work offline and look the same everywhere). */
  var ICONE = {
    menu: "M4 7h16M4 12h16M4 17h16",
    chiudi: "M6 6l12 12M18 6L6 18",
    sole: "M12 4V2M12 22v-2M4.9 4.9L3.5 3.5M20.5 20.5l-1.4-1.4M4 12H2M22 12h-2M4.9 19.1l-1.4 1.4M20.5 3.5l-1.4 1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z",
    luna: "M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z",
    cerca: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4",
    copia: "M9 9h10v10H9zM5 15V5h10",
    ok: "M5 12.5l4.5 4.5L19 7.5",
    freccia: "M5 12h14M13 6l6 6-6 6",
    piu: "M12 5v14M5 12h14",
    file: "M7 3h7l5 5v13H7zM14 3v5h5",
    nota: "M5 4h14v16H5zM9 8h6M9 12h6M9 16h4"
  };
  MP.icona = function (nome) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("class", "ico");
    svg.setAttribute("aria-hidden", "true");
    var p = document.createElementNS(ns, "path");
    p.setAttribute("d", ICONE[nome] || "");
    svg.appendChild(p);
    return svg;
  };

  /** Accetta solo link http/https (le voci delle news arrivano da fonti esterne). */
  MP.linkSicuro = function (url) {
    return typeof url === "string" && /^https?:\/\//i.test(url) ? url : null;
  };

  MP.toast = function (msg) {
    var t = document.getElementById("toast");
    if (!t) { t = MP.el("div", "toast"); t.id = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add("vis");
    clearTimeout(MP._toastTimer);
    MP._toastTimer = setTimeout(function () { t.classList.remove("vis"); }, 2200);
  };

  /** Copies to the clipboard. On file:// navigator.clipboard may be missing, so there is a fallback.
      If a button is passed, it shows "Copied ✓" on it for 2 seconds. */
  MP.copia = function (testo, bottone) {
    function esito(ok) {
      MP.toast(MP.t(ok ? "ui.copied" : "ui.copyFail"));
      if (ok && bottone && !bottone._copiato) {
        var prima = Array.prototype.slice.call(bottone.childNodes);
        bottone._copiato = true;
        bottone.classList.add("copiato");
        bottone.textContent = "";
        bottone.appendChild(MP.icona("ok"));
        bottone.appendChild(document.createTextNode(MP.t("ui.copiedShort")));
        setTimeout(function () {
          bottone.textContent = "";
          prima.forEach(function (n) { bottone.appendChild(n); });
          bottone.classList.remove("copiato");
          bottone._copiato = false;
        }, 2000);
      }
    }
    function riserva() {
      var ta = document.createElement("textarea");
      ta.value = testo;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      esito(ok);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(testo).then(function () { esito(true); }, riserva);
    } else {
      riserva();
    }
  };

  /** Button with icon + text. */
  MP.bottone = function (classe, icona, testo) {
    var b = MP.el("button", classe);
    b.type = "button";
    if (icona) b.appendChild(MP.icona(icona));
    if (testo) b.appendChild(document.createTextNode(testo));
    return b;
  };

  /** Trova le variabili {nome} in un testo, senza doppioni, nell'ordine in cui compaiono. */
  MP.variabiliIn = function (testo) {
    var visti = {}, out = [], re = /\{([a-z][a-z0-9_]*)\}/g, m;
    while ((m = re.exec(testo || ""))) { if (!visti[m[1]]) { visti[m[1]] = 1; out.push(m[1]); } }
    return out;
  };

  /** Sostituisce {nome} con i valori; le variabili vuote restano come {nome}. */
  MP.compila = function (testo, valori) {
    return (testo || "").replace(/\{([a-z][a-z0-9_]*)\}/g, function (tutto, nome) {
      var v = valori && valori[nome];
      return v && v.trim() ? v.trim() : tutto;
    });
  };

  /** Riempie un elemento con il testo del prompt evidenziando le variabili ancora vuote. */
  MP.anteprima = function (contenitore, testo, valori) {
    contenitore.textContent = "";
    var re = /\{([a-z][a-z0-9_]*)\}/g, ultimo = 0, m;
    while ((m = re.exec(testo || ""))) {
      contenitore.appendChild(document.createTextNode(testo.slice(ultimo, m.index)));
      var v = valori && valori[m[1]];
      if (v && v.trim()) contenitore.appendChild(document.createTextNode(v.trim()));
      else contenitore.appendChild(MP.el("mark", null, m[0]));
      ultimo = re.lastIndex;
    }
    contenitore.appendChild(document.createTextNode((testo || "").slice(ultimo)));
  };

  MP.dataIt = function (iso) {
    if (!iso) return "";
    var d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleDateString(MP.lingua === "it" ? "it-IT" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
  };

  MP.categoria = function (id) {
    var cats = window.CATEGORIE || [];
    for (var i = 0; i < cats.length; i++) {
      if (cats[i].id === id) {
        var t = cats[i][MP.lingua] || cats[i].en;
        return { id: id, nome: t[0], descrizione: t[1] };
      }
    }
    return { id: id, nome: id, descrizione: "" };
  };
})();

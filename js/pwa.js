/* Installable app (PWA): registers the service worker and shows the "Install app"
   button when the browser allows it (Chrome, Edge, Android). Does nothing on file://. */
(function () {
  "use strict";
  var MP = window.MP;
  if (!("serviceWorker" in navigator) || !/^https?:$/.test(location.protocol)) return;

  window.addEventListener("load", function () {
    navigator.serviceWorker.register(MP.urlScriptFidato("sw.js")).catch(function () { /* the site works without it */ });
  });

  // ----- "A new version is available – Reload" -----
  // The service worker serves the saved copy first and downloads the new one in the
  // background, so a change appears only at the next visit. When it finds a changed file
  // (message "aggiornamento") or a new service worker takes over, offer a reload.
  // Nothing is lost by reloading: My prompts live in localStorage.
  var avviso = null;
  function mostraAvviso() {
    if (avviso || !MP || !MP.t) return;
    avviso = MP.el("div", "avviso-agg");
    avviso.setAttribute("role", "status");
    avviso.appendChild(MP.el("span", null, MP.t("pwa.update")));
    var ricarica = MP.bottone("btn primario", null, MP.t("pwa.reload"));
    ricarica.addEventListener("click", function () { location.reload(); });
    avviso.appendChild(ricarica);
    var chiudi = MP.bottone("btn-icona", "chiudi");
    chiudi.setAttribute("aria-label", MP.t("pwa.later"));
    chiudi.title = MP.t("pwa.later");
    chiudi.addEventListener("click", function () { avviso.hidden = true; });
    avviso.appendChild(chiudi);
    document.body.appendChild(avviso);
  }
  navigator.serviceWorker.addEventListener("message", function (e) {
    if (e.data && e.data.tipo === "aggiornamento") mostraAvviso();
  });
  // first visit: no controller yet, so the first service worker taking over is not an update
  var avevaController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener("controllerchange", function () {
    if (avevaController) mostraAvviso();
    avevaController = true;
  });

  var richiesta = null;
  function bottoni() { return document.querySelectorAll("[data-installa]"); }
  function mostra(si) { bottoni().forEach(function (b) { b.hidden = !si; }); }

  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    richiesta = e;
    mostra(true);
  });
  window.addEventListener("appinstalled", function () {
    richiesta = null;
    mostra(false);
    if (MP && MP.toast) MP.toast(MP.t("pwa.installed"));
  });

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-installa]");
    if (!b || !richiesta) return;
    richiesta.prompt();
    richiesta.userChoice.finally(function () { richiesta = null; mostra(false); });
  });
})();

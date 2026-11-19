/* Installable app (PWA): registers the service worker and shows the "Install app"
   button when the browser allows it (Chrome, Edge, Android). Does nothing on file://. */
(function () {
  "use strict";
  var MP = window.MP;
  if (!("serviceWorker" in navigator) || !/^https?:$/.test(location.protocol)) return;

  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").catch(function () { /* the site works without it */ });
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

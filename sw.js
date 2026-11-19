/* Service worker: makes the site work offline once it has been opened online.
   - On install it saves the whole app (pages, styles, scripts, data, fonts, icons).
   - Pages, scripts and prompts: served from the cache at once and refreshed in the
     background ("stale-while-revalidate"), so a new version appears at the next visit.
   - News (data/news.js): network first, cache only when offline, so it is always fresh.
   Only registered on http(s) pages (not when the site is opened as a local file).
   Bump VERSIONE when files are added to or removed from FILE_APP. */
var VERSIONE = "mp-v1";
var FILE_APP = [
  "./", "index.html", "prompt.html", "miei-prompt.html", "fonti.html", "404.html",
  "css/style.css",
  "js/i18n.js", "js/comune.js", "js/store.js", "js/dialogo.js", "js/palette.js",
  "js/libreria.js", "js/miei.js", "js/home.js", "js/pwa.js",
  "data/categorie.js", "data/prompts.js", "data/prompts-it.js", "data/news.js",
  "fonts/geist.woff2", "fonts/geist-mono.woff2",
  "img/icon-192.png", "img/icon-512.png", "manifest.webmanifest"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSIONE).then(function (c) { return c.addAll(FILE_APP); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (nomi) {
    return Promise.all(nomi.filter(function (n) { return n !== VERSIONE; }).map(function (n) { return caches.delete(n); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== location.origin) return; // external links: browser default

  // news: network first
  if (url.pathname.endsWith("/data/news.js")) {
    e.respondWith(fetch(req).then(function (r) {
      var copia = r.clone();
      caches.open(VERSIONE).then(function (c) { c.put(req, copia); });
      return r;
    }).catch(function () { return caches.match(req, { ignoreSearch: true }); }));
    return;
  }

  // everything else: cache first, refresh in the background
  e.respondWith(caches.open(VERSIONE).then(function (c) {
    // pages are cached without ?lang=… / ?id=…: the query is read by the page's JavaScript
    return c.match(req, { ignoreSearch: req.mode === "navigate" }).then(function (inCache) {
      var rete = fetch(req).then(function (r) {
        if (r && r.ok) c.put(req.mode === "navigate" ? url.pathname : req, r.clone());
        return r;
      }).catch(function () {
        if (inCache) return inCache;
        return req.mode === "navigate" ? c.match("404.html") : Response.error();
      });
      return inCache || rete;
    });
  }));
});

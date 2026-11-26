/* Service worker: makes the site work offline once it has been opened online.
   - On install it saves the whole app (pages, styles, scripts, data, fonts, icons).
   - Pages, scripts and prompts: served from the cache at once and refreshed in the
     background ("stale-while-revalidate"), so a new version appears at the next visit.
   - News (data/news.js): network first, cache only when offline, so it is always fresh.
   Only registered on http(s) pages (not when the site is opened as a local file).
   - When a refreshed file differs from the cached one, open pages get a message and
     js/pwa.js shows "A new version is available – Reload" (no manual version bump needed).
   Bump VERSIONE when files are added to or removed from FILE_APP. */
var VERSIONE = "mp-v3";
var FILE_APP = [
  "./", "index.html", "prompt.html", "miei-prompt.html", "fonti.html", "404.html",
  "css/style.css",
  "js/i18n.js", "js/comune.js", "js/store.js", "js/dialogo.js", "js/palette.js",
  "js/libreria.js", "js/miei.js", "js/home.js", "js/pwa.js", "js/dati-lingua.js",
  "data/categorie.js", "data/prompts.js", "data/prompts-it.js", "data/news.js",
  "fonts/geist.woff2", "fonts/geist-mono.woff2",
  "img/icon-192.png", "img/icon-512.png", "img/icon-maskable-512.png",
  "img/apple-touch-icon.png", "img/og.png", "manifest.webmanifest"
];

/** True if the copy from the network differs from the cached one.
    Compares the text, not the ETag: GitHub Pages redeploys every file at each commit
    (also the daily news one), so ETags can change while the content is the same.
    Only pages, scripts and styles count: fonts and icons never trigger the notice. */
function diverso(vecchia, nuova, url, navigazione) {
  if (!navigazione && !/\.(html|js|css)$/.test(url.pathname)) return Promise.resolve(false);
  return Promise.all([vecchia.text(), nuova.text()]).then(function (t) { return t[0] !== t[1]; })
    .catch(function () { return false; });
}

/** Sends one "update available" message to every open page of the site. */
function avvisaAggiornamento() {
  return self.clients.matchAll({ type: "window" }).then(function (pagine) {
    pagine.forEach(function (p) { p.postMessage({ tipo: "aggiornamento" }); });
  });
}

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSIONE).then(function (c) { return c.addAll(FILE_APP); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (nomi) {
    // only this site's old caches: other sites on the same domain keep theirs
    return Promise.all(nomi.filter(function (n) { return n.indexOf("mp-") === 0 && n !== VERSIONE; }).map(function (n) { return caches.delete(n); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== location.origin) return; // external links: browser default

  // news: network first, but never more than 3 seconds (news.js blocks the home page);
  // only good answers are saved, a slow or failed one falls back to the saved copy
  if (url.pathname.endsWith("/data/news.js")) {
    var rete = fetch(req);
    e.waitUntil(rete.then(function (r) {
      if (!r.ok) return;
      var copia = r.clone();
      return caches.open(VERSIONE).then(function (c) { return c.put(req, copia); });
    }).catch(function () { /* offline */ }));
    var salvata = function () { return caches.match(req, { ignoreSearch: true }); };
    var attesa = new Promise(function (ok) { setTimeout(ok, 3000); }).then(salvata);
    e.respondWith(Promise.race([
      rete.then(function (r) { return r.ok ? r : salvata().then(function (c) { return c || r; }); }),
      attesa.then(function (c) { return c || rete; })
    ]).catch(function () { return salvata().then(function (c) { return c || Response.error(); }); }));
    return;
  }

  // everything else: cache first, refresh in the background
  e.respondWith(caches.open(VERSIONE).then(function (c) {
    // pages are cached without ?lang=… / ?id=…: the query is read by the page's JavaScript
    var nav = req.mode === "navigate";
    return c.match(req, { ignoreSearch: nav }).then(function (inCache) {
      // copy taken now: the original is handed to the page and can be read only once
      var copiaCache = inCache ? inCache.clone() : null;
      // "no-cache": ask the site whether the file changed instead of reusing the
      // browser's own short-term copy (GitHub Pages lets browsers keep files 10 minutes)
      var dallaRete = fetch(req, { cache: "no-cache" });
      // background work: save the new copy and, if the file changed while the page was
      // shown from the cache, tell the open pages ("New version – Reload").
      // waitUntil must be called now, while the event is still running.
      e.waitUntil(dallaRete.then(function (r) {
        if (!r || !r.ok) return;
        var daSalvare = r.clone();
        var confronto = copiaCache ? diverso(copiaCache, r.clone(), url, nav) : Promise.resolve(false);
        return confronto.then(function (cambiato) {
          return c.put(nav ? url.pathname : req, daSalvare).then(function () {
            if (cambiato) return avvisaAggiornamento();
          });
        });
      }).catch(function () { /* offline: keep the cached copy */ }));
      if (inCache) return inCache;
      return dallaRete.catch(function () {
        return nav ? c.match("404.html") : Response.error();
      });
    });
  }));
});

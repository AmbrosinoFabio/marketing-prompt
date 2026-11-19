/* Archivio dei "miei prompt".
   Tutti i dati restano nel browser (localStorage): nessun server, nessun invio.
   Tutto l'accesso passa da qui: se un giorno servirà IndexedDB, si cambia solo questo file. */
(function () {
  "use strict";
  var CHIAVE = "mp_miei_prompt";
  var VERSIONE_SCHEMA = 1;
  var MP = window.MP = window.MP || {};

  function disponibile() {
    try { var k = "mp_test"; localStorage.setItem(k, "1"); localStorage.removeItem(k); return true; }
    catch (e) { return false; }
  }

  function leggiTutti() {
    try {
      var raw = localStorage.getItem(CHIAVE);
      if (!raw) return [];
      var dati = JSON.parse(raw);
      return Array.isArray(dati.prompt) ? dati.prompt : [];
    } catch (e) { return []; }
  }

  function scriviTutti(lista) {
    try {
      localStorage.setItem(CHIAVE, JSON.stringify({ schemaVersion: VERSIONE_SCHEMA, prompt: lista }));
      return true;
    } catch (e) {
      MP.toast && MP.toast(MP.t("ui.saveFail"));
      return false;
    }
  }

  function nuovoId() {
    return "mio-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);
  }

  /** Tiene solo i campi previsti e li riporta a stringhe: protegge dai file importati malformati. */
  function pulisci(p) {
    var s = function (v, max) { return String(v == null ? "" : v).slice(0, max); };
    var ora = new Date().toISOString();
    return {
      id: s(p.id, 80) || nuovoId(),
      titolo: s(p.titolo, 200) || "Senza titolo",
      categoria: s(p.categoria, 40) || "altro",
      testo: s(p.testo, 50000),
      note: s(p.note, 5000),
      preferito: !!p.preferito,
      origine: s(p.origine, 80),
      creato: s(p.creato, 40) || ora,
      modificato: s(p.modificato, 40) || ora
    };
  }

  MP.store = {
    disponibile: disponibile,
    tutti: leggiTutti,

    salva: function (p) {
      var lista = leggiTutti();
      var ora = new Date().toISOString();
      var rec = pulisci(p);
      rec.modificato = ora;
      var i = lista.findIndex(function (x) { return x.id === rec.id; });
      if (i >= 0) { rec.creato = lista[i].creato; lista[i] = rec; }
      else { rec.creato = ora; lista.unshift(rec); }
      return scriviTutti(lista) ? rec : null;
    },

    elimina: function (id) {
      return scriviTutti(leggiTutti().filter(function (x) { return x.id !== id; }));
    },

    /** Scarica un backup .json (funziona anche su file://). */
    esporta: function () {
      var dati = {
        app: "marketing-prompt",
        schemaVersion: VERSIONE_SCHEMA,
        esportato: new Date().toISOString(),
        prompt: leggiTutti()
      };
      var blob = new Blob([JSON.stringify(dati, null, 2)], { type: "application/json" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "miei-prompt-" + new Date().toISOString().slice(0, 10) + ".json";
      document.body.appendChild(a);
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
      return dati.prompt.length;
    },

    /** Unisce un backup: stesso id → vince la versione modificata più di recente. */
    importa: function (testoJson) {
      var dati = JSON.parse(testoJson);
      var arrivati = Array.isArray(dati) ? dati : dati && dati.prompt;
      if (!Array.isArray(arrivati)) throw new Error(MP.lingua === "it" ? "il file non contiene un elenco di prompt" : "the file does not contain a list of prompts");
      if (dati.schemaVersion && dati.schemaVersion > VERSIONE_SCHEMA) {
        throw new Error(MP.lingua === "it" ? "il backup viene da una versione più recente dell'app" : "the backup comes from a newer version of the app");
      }
      var lista = leggiTutti(), nuovi = 0, aggiornati = 0;
      arrivati.forEach(function (grezzo) {
        if (!grezzo || typeof grezzo !== "object") return;
        var p = pulisci(grezzo);
        var i = lista.findIndex(function (x) { return x.id === p.id; });
        if (i < 0) { lista.push(p); nuovi++; }
        else if (p.modificato > lista[i].modificato) { lista[i] = p; aggiornati++; }
      });
      scriviTutti(lista);
      return { nuovi: nuovi, aggiornati: aggiornati };
    }
  };
})();

/* Languages: English (default) and Italian.
   - Short interface texts: elements with data-i18n="key" (text) and
     data-i18n-attr="placeholder:key;aria-label:key" (attributes). The English text
     written in the HTML is the fallback.
   - Long texts (e.g. fonti.html): blocks with data-lang="en" / data-lang="it".
   - Language order: ?lang= in the URL → saved choice → browser language (it) → en.
   Load this script BEFORE the others. */
(function () {
  "use strict";
  var LINGUE = ["en", "it"];
  var CHIAVE = "mp_lingua";

  var D = {
    en: {
      "nav.home": "Home", "nav.library": "Prompt library", "nav.mine": "My prompts", "nav.sources": "Sources & licenses",
      "ui.menu": "Open menu", "ui.lang": "Leggi in italiano", "ui.langShort": "IT",
      "ui.themeDark": "Switch to dark theme", "ui.themeLight": "Switch to light theme",
      "ui.copied": "Copied to clipboard", "ui.copyFail": "Copy failed: select the text manually",
      "ui.close": "Close", "ui.saveFail": "Could not save: browser storage is full or blocked",

      "foot.about": "About", "foot.aboutText": "An open-source, non-profit personal project by Fabio Ambrosino.",
      "foot.errors": "May contain errors: always check what the AI produces before using it.",
      "foot.report": "Report an error", "foot.privacy": "Privacy",
      "foot.privacyText": "Your prompts stay in your browser: nothing is sent to any server (unless you click \"Open in Claude\", which opens claude.ai with that prompt). No cookies, no analytics.",
      "foot.ai": "AI and licenses",
      "foot.aiText": "Prompts and texts were written with AI assistance (Claude) under the editorial responsibility of the author.",
      "foot.lic": "Code: MIT · Content: CC BY-NC 4.0 · Details",
      "foot.tm": "Not affiliated with Anthropic, OpenAI or Google. Product names are trademarks of their owners.",

      "home.title": "Prompts that get marketing work done.",
      "home.lead": "An open library of prompts for Claude and other AI assistants, organized by marketing task. Fill in the fields, copy, paste — and keep your own prompts in your browser.",
      "home.ctaLib": "Browse the library", "home.ctaMine": "Save your prompts",
      "home.anatomy": "Anatomy of a good prompt",
      "home.anatomyIntro": "The official prompting guides agree on a few simple habits. Every prompt in the library follows them.",
      "an.role": "Role", "an.roleD": "Tell the AI who it should be: \"You are an SEO consultant…\".",
      "an.ctx": "Context", "an.ctxD": "Give the facts: product, audience, data. Wrap long material in tags like <data>.",
      "an.task": "Task", "an.taskD": "Say exactly what to do, in numbered steps if there are several.",
      "an.rules": "Constraints", "an.rulesD": "Limits, things to avoid, and \"don't invent facts\".",
      "an.format": "Output format", "an.formatD": "Table, list, length: describe what the answer should look like.",
      "an.ex": "Examples", "an.exD": "One or two examples of what you like are worth a page of instructions.",
      "home.anatomyLink": "Read Anthropic's prompting best practices →",
      "home.cats": "Browse by task",
      "home.catsIntro": "Each prompt has fields to fill in, a tip and the techniques it uses.",
      "home.nPrompts": "{0} prompts", "home.n1Prompt": "1 prompt",
      "home.news": "Latest from the sources",
      "home.newsIntro": "Updated automatically every day from official AI sources and marketing blogs. Each item links to the original article.",
      "home.newsUpd": "Last update: {0}", "home.newsNone": "No news yet: the list is filled by the daily update job.",
      "home.newsAll": "All", "home.newsAi": "AI & prompting", "home.newsMkt": "Marketing",
      "home.newsAuto": "Automatic news: title and short excerpt from the source.",
      "home.offline": "Use it offline",
      "home.offlineText": "Install it as an app from Chrome or Edge (button below, or the install icon in the address bar): it then opens in its own window and works without internet. Or download the project from GitHub and open index.html with a double click. Your prompts are saved in the browser you use.",
      "pwa.install": "Install the app", "pwa.installed": "App installed: you can now open it from your apps, even offline.",
      "pwa.update": "A new version of the site is available.", "pwa.reload": "Reload", "pwa.later": "Later",
      "home.offlineLink": "How to download it",

      "lib.title": "Prompt library",
      "lib.intro": "Open a prompt, fill in the fields and copy the result into Claude or another AI assistant.",
      "lib.intro2": "Original prompts and prompts adapted from openly licensed sources, all reviewed by the author and free to reuse for non-commercial purposes.",
      "lib.search": "Search prompts (e.g. email, SEO, persona)…", "lib.all": "All",
      "lib.count": "{0} prompts", "lib.count1": "1 prompt", "lib.none": "No prompt matches your search.",
      "lib.open": "Open", "lib.fields": "Fill in the fields", "lib.preview": "Prompt preview",
      "lib.previewHint": "Highlighted parts are fields you haven't filled in yet.",
      "lib.tip": "Tip", "lib.tech": "Techniques used",
      "lib.copy": "Copy prompt", "lib.saveMine": "Save to My prompts", "lib.reset": "Clear fields",
      "lib.openClaude": "Open in Claude",
      "lib.openClaudeTip": "Opens claude.ai in a new tab with the prompt in the chat box (not sent). The prompt is also copied.",
      "lib.openClaudeCopied": "Prompt copied. If the box in Claude is empty, paste it (Ctrl+V).",
      "lib.saved": "Saved in My prompts", "lib.savedOpen": "Saved · Open", "lib.savedOpenTip": "Already in My prompts: click to open it there",
      "lib.typeGroup": "Prompt type", "lib.view": "Show", "lib.details": "Details",
      "lib.eg": "e.g. {0}",
      "lib.empty1": "The field {0} is empty: the AI would receive it as it is.",
      "lib.emptyN": "{0} fields are empty ({1}): the AI would receive them as they are.",
      "lib.useExamples": "Use the examples", "lib.examplesIn": "Examples filled in: change them to fit your case.",
      "lib.copyAnyway": "Copy anyway", "lib.openAnyway": "Open anyway",
      "lib.start": "Start here", "lib.startD": "Four quick prompts with few fields, good for a first try.",
      "home.ctaTry": "Try an example", "home.how": "How it works",
      "home.step1": "Pick a task", "home.step1D": "Search the library or browse by marketing task: emails, ads, SEO, social…",
      "home.step2": "Fill in the fields", "home.step2D": "Brand, audience, tone: the preview shows the finished prompt as you type.",
      "home.step3": "Paste it into Claude", "home.step3D": "Copy it, or open it straight in Claude. Save the ones you like in My prompts.",
      "mine.importLink": "or import a backup file", "mine.untitled": "Untitled", "pal.busy": "Save or close the open window first",
"lib.source": "Source: {0} · License: {1} · Reviewed: {2}",
      "lib.fieldsNote": "The fields only build the text on this page: nothing is saved or sent (\"Open in Claude\" sends it to claude.ai only when you click it).",
      "lib.original": "Original",

      "mine.title": "My prompts",
      "mine.intro": "Write, organize and reuse your own prompts. Use {name} for the parts that change and you'll get fields to fill in, like in the library.",
      "mine.warnTitle": "Your data stays in this browser.",
      "mine.warn": "Nothing is sent online, but it also means that changing browser, moving the project folder or clearing browsing data can make your prompts disappear. Export a backup regularly.",
      "mine.new": "New prompt", "mine.export": "Export backup", "mine.import": "Import backup",
      "mine.search": "Search your prompts…", "mine.fav": "★ Favorites", "mine.allCats": "All categories",
      "mine.empty": "You haven't saved any prompts yet. Create one or save one from the library.",
      "mine.none": "No prompt matches the filters.",
      "mine.use": "Use", "mine.edit": "Edit", "mine.delete": "Delete", "mine.dup": "Duplicate",
      "mine.confirmDel": "Delete \"{0}\"? This cannot be undone.",
      "mine.deleted": "Prompt deleted", "mine.savedOk": "Prompt saved",
      "mine.exported": "Backup downloaded ({0} prompts)",
      "mine.imported": "Import done: {0} new, {1} updated", "mine.importErr": "Import failed: {0}",
      "mine.edited": "Edited {0}", "mine.fromLib": "from the library",
      "mine.favOn": "Remove from favorites", "mine.favOff": "Add to favorites",
      "mine.noStorage": "This browser is blocking local storage (private mode or blocked site data): your prompts cannot be saved here.",
      "ed.new": "New prompt", "ed.edit": "Edit prompt", "ed.title": "Title", "ed.cat": "Category",
      "ed.text": "Prompt text", "ed.textHint": "Use {name} for the parts that change, e.g. {brand} or {audience}.",
      "ed.notes": "Notes (optional)", "ed.save": "Save", "ed.cancel": "Cancel",
      "ed.vars": "Fields found: {0}", "ed.noVars": "No fields: the prompt will be copied as it is.",
      "ed.needText": "Write the prompt text first.",

      "ui.skip": "Skip to content", "ui.search": "Search", "ui.copiedShort": "Copied",
      "home.eyebrow": "Free · open source · works offline",
      "home.statPrompts": "prompts", "home.statCats": "marketing tasks", "home.statData": "sign-ups, cookies or tracking",
      "home.demoOpen": "Open", "home.demoLabel": "Example",
      "home.searchCta": "Search prompts",
      "lib.kbCopy": "copy", "lib.clearFilters": "Clear search and filters",
      "lib.field1": "1 field", "lib.fieldsN": "{0} fields", "lib.fillCopy": "Fill in & copy", "lib.copyShort": "Copy",
      "mine.createFirst": "Create your first prompt", "mine.browseLib": "Browse the library",
      "pal.title": "Quick search", "pal.placeholder": "Search prompts, pages, actions…",
      "pal.actions": "Actions", "pal.pages": "Pages", "pal.library": "Library", "pal.mine": "My prompts",
      "pal.theme": "Switch light / dark theme", "pal.none": "No results.",
      "pal.move": "move", "pal.open": "open", "pal.toggle": "open / close",
      "e404.title": "This page doesn't exist.", "e404.text": "The link may be old or mistyped. Try the quick search, or start from the library.",
      "lib.tabAll": "All", "lib.tabSrc": "Adapted from sources", "lib.tabOrig": "Original",
      "lib.secSrc": "Adapted from open sources",
      "lib.secSrcD": "Prompts based on openly licensed collections and guides, reworked for marketing and reviewed by the author. Each one cites its source, author and original license.",
      "lib.secOrig": "Original prompts",
      "lib.secOrigD": "Written from scratch for this project and reviewed by the author.",
      "lib.adapted": "Adapted", "lib.adaptedFrom": "Adapted from {0}", "lib.by": "by {0}",
      "lib.origLicense": "Original license: {0}", "lib.changes": "What changed", "lib.reviewed": "Reviewed by the author: {0}"
    },

    it: {
      "nav.home": "Home", "nav.library": "Libreria di prompt", "nav.mine": "I miei prompt", "nav.sources": "Fonti e licenze",
      "ui.menu": "Apri il menu", "ui.lang": "Read in English", "ui.langShort": "EN",
      "ui.themeDark": "Passa al tema scuro", "ui.themeLight": "Passa al tema chiaro",
      "ui.copied": "Copiato negli appunti", "ui.copyFail": "Copia non riuscita: seleziona il testo a mano",
      "ui.close": "Chiudi", "ui.saveFail": "Salvataggio non riuscito: memoria del browser piena o bloccata",

      "foot.about": "Il progetto", "foot.aboutText": "Un progetto personale open source e senza scopo di lucro di Fabio Ambrosino.",
      "foot.errors": "Può contenere errori: controlla sempre ciò che produce l'AI prima di usarlo.",
      "foot.report": "Segnala un errore", "foot.privacy": "Privacy",
      "foot.privacyText": "I tuoi prompt restano nel browser: nulla viene inviato a un server (salvo se clicchi \"Apri in Claude\", che apre claude.ai con quel prompt). Niente cookie, niente statistiche.",
      "foot.ai": "AI e licenze",
      "foot.aiText": "Prompt e testi sono stati scritti con l'assistenza dell'AI (Claude) sotto la responsabilità editoriale dell'autore.",
      "foot.lic": "Codice: MIT · Contenuti: CC BY-NC 4.0 · Dettagli",
      "foot.tm": "Non affiliato ad Anthropic, OpenAI o Google. I nomi dei prodotti sono marchi dei rispettivi proprietari.",

      "home.title": "Prompt che fanno il lavoro di marketing.",
      "home.lead": "Una libreria aperta di prompt per Claude e altri assistenti AI, organizzati per attività di marketing. Compila i campi, copia, incolla — e tieni i tuoi prompt nel browser.",
      "home.ctaLib": "Sfoglia la libreria", "home.ctaMine": "Salva i tuoi prompt",
      "home.anatomy": "Com'è fatto un buon prompt",
      "home.anatomyIntro": "Le guide ufficiali sul prompting concordano su poche abitudini semplici. Tutti i prompt della libreria le seguono.",
      "an.role": "Ruolo", "an.roleD": "Di' all'AI chi deve essere: \"Sei un consulente SEO…\".",
      "an.ctx": "Contesto", "an.ctxD": "Dai i fatti: prodotto, pubblico, dati. Racchiudi i materiali lunghi in tag come <dati>.",
      "an.task": "Compito", "an.taskD": "Di' esattamente cosa fare, in passi numerati se sono più di uno.",
      "an.rules": "Vincoli", "an.rulesD": "Limiti, cose da evitare e \"non inventare dati\".",
      "an.format": "Formato dell'output", "an.formatD": "Tabella, elenco, lunghezza: descrivi come deve essere la risposta.",
      "an.ex": "Esempi", "an.exD": "Uno o due esempi di ciò che ti piace valgono una pagina di istruzioni.",
      "home.anatomyLink": "Leggi le best practice di prompting di Anthropic (in inglese) →",
      "home.cats": "Cerca per attività",
      "home.catsIntro": "Ogni prompt ha campi da compilare, un consiglio e le tecniche che usa.",
      "home.nPrompts": "{0} prompt", "home.n1Prompt": "1 prompt",
      "home.news": "Le ultime dalle fonti",
      "home.newsIntro": "Aggiornate automaticamente ogni giorno da fonti ufficiali sull'AI e blog di marketing. Ogni voce rimanda all'articolo originale (in inglese).",
      "home.newsUpd": "Ultimo aggiornamento: {0}", "home.newsNone": "Ancora nessuna notizia: l'elenco viene riempito dall'aggiornamento giornaliero.",
      "home.newsAll": "Tutte", "home.newsAi": "AI e prompting", "home.newsMkt": "Marketing",
      "home.newsAuto": "Notizia automatica: titolo e breve estratto dalla fonte.",
      "home.offline": "Usala offline",
      "home.offlineText": "Installala come app da Chrome o Edge (pulsante qui sotto, o l'icona di installazione nella barra degli indirizzi): si apre in una finestra sua e funziona anche senza internet. Oppure scarica il progetto da GitHub e apri index.html con un doppio clic. I tuoi prompt vengono salvati nel browser che usi.",
      "pwa.install": "Installa l'app", "pwa.installed": "App installata: ora puoi aprirla dalle tue app, anche offline.",
      "pwa.update": "È disponibile una nuova versione del sito.", "pwa.reload": "Aggiorna", "pwa.later": "Più tardi",
      "home.offlineLink": "Come scaricarla",

      "lib.title": "Libreria di prompt",
      "lib.intro": "Apri un prompt, compila i campi e copia il risultato in Claude o in un altro assistente AI.",
      "lib.intro2": "Prompt originali e prompt rielaborati da fonti con licenza aperta, tutti rivisti dall'autore e liberamente riutilizzabili per scopi non commerciali.",
      "lib.search": "Cerca tra i prompt (es. email, SEO, persona)…", "lib.all": "Tutti",
      "lib.count": "{0} prompt", "lib.count1": "1 prompt", "lib.none": "Nessun prompt corrisponde alla ricerca.",
      "lib.open": "Apri", "lib.fields": "Compila i campi", "lib.preview": "Anteprima del prompt",
      "lib.previewHint": "Le parti evidenziate sono campi che non hai ancora compilato.",
      "lib.tip": "Consiglio", "lib.tech": "Tecniche usate",
      "lib.copy": "Copia il prompt", "lib.saveMine": "Salva nei miei prompt", "lib.reset": "Svuota i campi",
      "lib.openClaude": "Apri in Claude",
      "lib.openClaudeTip": "Apre claude.ai in una nuova scheda con il prompt nella casella (non inviato). Il prompt viene anche copiato.",
      "lib.openClaudeCopied": "Prompt copiato. Se in Claude la casella è vuota, incollalo (Ctrl+V).",
      "lib.saved": "Salvato nei tuoi prompt", "lib.savedOpen": "Salvato · Apri", "lib.savedOpenTip": "È già nei tuoi prompt: clicca per aprirlo lì",
      "lib.typeGroup": "Tipo di prompt", "lib.view": "Mostra", "lib.details": "Dettagli",
      "lib.eg": "es. {0}",
      "lib.empty1": "Il campo {0} è vuoto: l'AI lo riceverebbe così com'è.",
      "lib.emptyN": "{0} campi sono vuoti ({1}): l'AI li riceverebbe così come sono.",
      "lib.useExamples": "Usa gli esempi", "lib.examplesIn": "Esempi inseriti: adattali al tuo caso.",
      "lib.copyAnyway": "Copia comunque", "lib.openAnyway": "Apri comunque",
      "lib.start": "Inizia da qui", "lib.startD": "Quattro prompt rapidi con pochi campi, ideali per una prima prova.",
      "home.ctaTry": "Prova un esempio", "home.how": "Come funziona",
      "home.step1": "Scegli un'attività", "home.step1D": "Cerca nella libreria o sfoglia per attività di marketing: email, annunci, SEO, social…",
      "home.step2": "Compila i campi", "home.step2D": "Brand, pubblico, tono: l'anteprima mostra il prompt finito mentre scrivi.",
      "home.step3": "Incollalo in Claude", "home.step3D": "Copialo, oppure aprilo direttamente in Claude. Salva quelli che ti piacciono nei tuoi prompt.",
      "mine.importLink": "oppure importa un file di backup", "mine.untitled": "Senza titolo", "pal.busy": "Prima salva o chiudi la finestra aperta",
"lib.source": "Fonte: {0} · Licenza: {1} · Revisione: {2}",
      "lib.fieldsNote": "I campi servono solo a comporre il testo in questa pagina: nulla viene salvato o inviato (\"Apri in Claude\" lo porta su claude.ai solo quando lo clicchi).",
      "lib.original": "Originale",

      "mine.title": "I miei prompt",
      "mine.intro": "Scrivi, organizza e riusa i tuoi prompt. Usa {nome} per le parti che cambiano e avrai i campi da compilare, come nella libreria.",
      "mine.warnTitle": "I tuoi dati restano in questo browser.",
      "mine.warn": "Nulla viene inviato online, ma questo significa anche che cambiando browser, spostando la cartella del progetto o cancellando i dati di navigazione i tuoi prompt possono sparire. Esporta un backup regolarmente.",
      "mine.new": "Nuovo prompt", "mine.export": "Esporta backup", "mine.import": "Importa backup",
      "mine.search": "Cerca tra i tuoi prompt…", "mine.fav": "★ Preferiti", "mine.allCats": "Tutte le categorie",
      "mine.empty": "Non hai ancora salvato nessun prompt. Creane uno o salvane uno dalla libreria.",
      "mine.none": "Nessun prompt corrisponde ai filtri.",
      "mine.use": "Usa", "mine.edit": "Modifica", "mine.delete": "Elimina", "mine.dup": "Duplica",
      "mine.confirmDel": "Eliminare \"{0}\"? L'operazione non si può annullare.",
      "mine.deleted": "Prompt eliminato", "mine.savedOk": "Prompt salvato",
      "mine.exported": "Backup scaricato ({0} prompt)",
      "mine.imported": "Importazione completata: {0} nuovi, {1} aggiornati", "mine.importErr": "Importazione non riuscita: {0}",
      "mine.edited": "Modificato il {0}", "mine.fromLib": "dalla libreria",
      "mine.favOn": "Togli dai preferiti", "mine.favOff": "Aggiungi ai preferiti",
      "mine.noStorage": "Questo browser blocca l'archivio locale (navigazione privata o dati dei siti bloccati): qui i tuoi prompt non possono essere salvati.",
      "ed.new": "Nuovo prompt", "ed.edit": "Modifica prompt", "ed.title": "Titolo", "ed.cat": "Categoria",
      "ed.text": "Testo del prompt", "ed.textHint": "Usa {nome} per le parti che cambiano, es. {brand} o {pubblico}.",
      "ed.notes": "Note (facoltative)", "ed.save": "Salva", "ed.cancel": "Annulla",
      "ed.vars": "Campi trovati: {0}", "ed.noVars": "Nessun campo: il prompt verrà copiato così com'è.",
      "ed.needText": "Scrivi prima il testo del prompt.",

      "ui.skip": "Vai al contenuto", "ui.search": "Cerca", "ui.copiedShort": "Copiato",
      "home.eyebrow": "Gratis · open source · funziona offline",
      "home.statPrompts": "prompt", "home.statCats": "attività di marketing", "home.statData": "registrazioni, cookie o tracciamento",
      "home.demoOpen": "Apri", "home.demoLabel": "Esempio",
      "home.searchCta": "Cerca tra i prompt",
      "lib.kbCopy": "copia", "lib.clearFilters": "Azzera ricerca e filtri",
      "lib.field1": "1 campo", "lib.fieldsN": "{0} campi", "lib.fillCopy": "Compila e copia", "lib.copyShort": "Copia",
      "mine.createFirst": "Crea il tuo primo prompt", "mine.browseLib": "Sfoglia la libreria",
      "pal.title": "Ricerca rapida", "pal.placeholder": "Cerca prompt, pagine, azioni…",
      "pal.actions": "Azioni", "pal.pages": "Pagine", "pal.library": "Libreria", "pal.mine": "I miei prompt",
      "pal.theme": "Cambia tema chiaro / scuro", "pal.none": "Nessun risultato.",
      "pal.move": "sposta", "pal.open": "apri", "pal.toggle": "apri / chiudi",
      "e404.title": "Questa pagina non esiste.", "e404.text": "Il link potrebbe essere vecchio o sbagliato. Prova la ricerca rapida, oppure parti dalla libreria.",
      "lib.tabAll": "Tutti", "lib.tabSrc": "Rielaborati da fonti", "lib.tabOrig": "Originali",
      "lib.secSrc": "Rielaborati da fonti aperte",
      "lib.secSrcD": "Prompt basati su raccolte e guide con licenza aperta, rielaborati per il marketing e rivisti dall'autore. Ognuno cita fonte, autore e licenza originale.",
      "lib.secOrig": "Prompt originali",
      "lib.secOrigD": "Scritti da zero per questo progetto e rivisti dall'autore.",
      "lib.adapted": "Rielaborato", "lib.adaptedFrom": "Rielaborato da {0}", "lib.by": "di {0}",
      "lib.origLicense": "Licenza originale: {0}", "lib.changes": "Cosa è cambiato", "lib.reviewed": "Rivisto dall'autore: {0}"
    }
  };

  function leggi(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function scrivi(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignorato */ } }

  function scegliLingua() {
    var m = /[?&]lang=([a-z]{2})/.exec(location.search);
    if (m && LINGUE.indexOf(m[1]) >= 0) { scrivi(CHIAVE, m[1]); return m[1]; }
    var s = leggi(CHIAVE);
    if (s && LINGUE.indexOf(s) >= 0) return s;
    var b = (navigator.language || "en").slice(0, 2).toLowerCase();
    return b === "it" ? "it" : "en";
  }

  var lingua = scegliLingua();
  document.documentElement.lang = lingua;

  var MP = window.MP = window.MP || {};
  MP.lingua = lingua;

  /** Translates a key; {0}, {1}… are replaced by the arguments. */
  MP.t = function (k) {
    var s = (D[lingua] && D[lingua][k]) || D.en[k] || k;
    var args = arguments;
    return s.replace(/\{(\d)\}/g, function (x, n) { var v = args[+n + 1]; return v == null ? x : v; });
  };

  /** Prompt text in the current language (falls back to English). */
  MP.localizza = function (p) {
    var it = lingua === "it" && ((window.PROMPTS_IT && window.PROMPTS_IT[p.id]) || p.it);
    if (it) {
      var out = {};
      for (var k in p) out[k] = p[k];
      ["titolo", "descrizione", "testo", "variabili", "consiglio", "tecniche", "modifiche"].forEach(function (c) {
        if (it[c]) out[c] = it[c];
      });
      return out;
    }
    return p;
  };

  function applica() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (D[lingua][k]) el.textContent = D[lingua][k];
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (coppia) {
        var p = coppia.split(":");
        if (p.length === 2 && D[lingua][p[1].trim()]) el.setAttribute(p[0].trim(), D[lingua][p[1].trim()]);
      });
    });
    document.querySelectorAll("[data-lang]").forEach(function (el) {
      el.hidden = el.getAttribute("data-lang") !== lingua;
    });
    // anchors inside language blocks: #licenze → #licenze-it in Italian
    if (lingua !== "en" && location.hash) {
      var dest = document.getElementById(location.hash.slice(1) + "-" + lingua);
      if (dest) setTimeout(function () { dest.scrollIntoView(); }, 0);
    }
    var titolo = document.querySelector("meta[name='title-" + lingua + "']");
    if (titolo) document.title = titolo.content;
    if (lingua !== "en") {
      var desc = document.querySelector("meta[name='description-" + lingua + "']");
      var descBase = document.querySelector("meta[name='description']");
      if (desc && descBase) descBase.content = desc.content;
    }
    // an explicit ?lang=it page is its own (Italian) version for search engines:
    // its canonical matches the hreflang="it" address instead of the English page
    var canon = document.querySelector("link[rel='canonical']");
    if (canon && lingua !== "en" && /[?&]lang=/.test(location.search) && !/\?/.test(canon.href)) {
      canon.href = canon.href + "?lang=" + lingua;
    }

    // switch button
    var btn = document.getElementById("btnLingua");
    if (btn) {
      btn.textContent = MP.t("ui.langShort");
      btn.setAttribute("aria-label", MP.t("ui.lang"));
      btn.title = MP.t("ui.lang");
      btn.addEventListener("click", function () {
        var nuova = lingua === "en" ? "it" : "en";
        scrivi(CHIAVE, nuova);
        var u = new URL(location.href);
        u.searchParams.set("lang", nuova);
        location.href = u.toString();
      });
    }

    // keep ?lang= on internal links so the choice survives (also on file://, where storage may be shared)
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a) return;
      var h = a.getAttribute("href");
      if (!h || /^(https?:|mailto:|#)/i.test(h) || !/\.html(\?|#|$)/.test(h)) return;
      var parti = h.split("#");
      var base = parti[0].replace(/([?&])lang=[a-z]{2}&?/, "$1").replace(/[?&]$/, "");
      a.setAttribute("href", base + (base.indexOf("?") >= 0 ? "&" : "?") + "lang=" + lingua + (parti[1] ? "#" + parti[1] : ""));
    }, true);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", applica);
  else applica();
})();

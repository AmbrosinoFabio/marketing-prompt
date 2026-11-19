/* Traduzione italiana dei prompt (data/prompts.js è la versione inglese principale).
   Ogni voce ha lo stesso id del prompt inglese e contiene solo i campi di testo:
   titolo, descrizione, testo, variabili, consiglio, tecniche.
   Le variabili possono avere nomi diversi dall'inglese: ogni lingua è autonoma. */
(function () {
  function p(o) { return o; }

  var elenco = [

    /* ===================== SEO ===================== */
    p({
      id: "seo-cluster-parole-chiave",
      titolo: "Cluster di parole chiave per un argomento",
      categoria: "seo",
      descrizione: "Trasforma un argomento in gruppi di parole chiave ordinati per intento di ricerca, pronti per pianificare le pagine.",
      testo: `Sei un consulente SEO esperto del mercato {mercato}.

<contesto>
Sito: {sito}
Argomento principale: {argomento}
Pubblico: {pubblico}
</contesto>

Compito: crea una mappa di parole chiave per l'argomento.

1. Proponi 5-8 cluster tematici.
2. Per ogni cluster indica: la parola chiave principale, 5-10 parole chiave correlate (incluse domande e varianti long-tail) e l'intento di ricerca prevalente (informativo, commerciale, transazionale, navigazionale).
3. Suggerisci quale tipo di pagina serve per ogni cluster (articolo, guida, pagina categoria, pagina prodotto, FAQ).
4. Segnala i cluster che rischiano di farsi concorrenza tra loro (cannibalizzazione).

Vincoli:
- Non inventare volumi di ricerca o difficoltà: se servono, scrivi "da verificare con uno strumento SEO".
- Usa la lingua e le espressioni che il pubblico userebbe davvero nel motore di ricerca.

Formato: una tabella per cluster, poi un elenco di 3 priorità da cui partire, con la motivazione.`,
      variabili: [
        { nome: "mercato", etichetta: "Mercato / paese", esempio: "italiano" },
        { nome: "sito", etichetta: "Sito o attività", esempio: "e-commerce di caffè specialty" },
        { nome: "argomento", etichetta: "Argomento", esempio: "macinare il caffè a casa" },
        { nome: "pubblico", etichetta: "Pubblico", esempio: "appassionati alle prime armi" }
      ],
      consiglio: "Dopo la prima risposta, incolla i volumi reali presi da uno strumento SEO e chiedi di riordinare le priorità.",
      tecniche: ["Ruolo", "Contesto in tag XML", "Passi numerati", "Divieto di inventare dati"]
    }),
    p({
      id: "seo-ottimizza-pagina",
      titolo: "Revisione SEO on-page di una pagina",
      categoria: "seo",
      descrizione: "Analizza il testo di una pagina e propone title, meta description, titoli e miglioramenti concreti.",
      testo: `Agisci come specialista SEO on-page.

Parola chiave principale: {keyword}
Intento di ricerca: {intento}

<pagina>
{testo_pagina}
</pagina>

Analizza la pagina e restituisci:

1. Tre proposte di title tag (massimo 60 caratteri, parola chiave verso l'inizio).
2. Tre proposte di meta description (massimo 155 caratteri, con un invito all'azione).
3. Una struttura di titoli H1-H2-H3 migliorata.
4. Le domande del pubblico che la pagina non copre ancora.
5. I cinque interventi più utili, in ordine di impatto, ognuno con il motivo.

Non riscrivere tutta la pagina: indica cosa cambiare e dove. Se il testo non corrisponde all'intento di ricerca, dillo per primo.`,
      variabili: [
        { nome: "keyword", etichetta: "Parola chiave", esempio: "corso fotografia online" },
        { nome: "intento", etichetta: "Intento di ricerca", esempio: "commerciale" },
        { nome: "testo_pagina", etichetta: "Testo della pagina", esempio: "(incolla qui il testo)" }
      ],
      consiglio: "Incolla il testo vero della pagina, non un riassunto: i suggerimenti diventano molto più precisi.",
      tecniche: ["Ruolo", "Documento in tag XML", "Formato numerato", "Limiti di lunghezza"]
    }),

    /* ===================== BRIEF ===================== */
    p({
      id: "brief-articolo",
      titolo: "Brief completo per un articolo",
      categoria: "brief",
      descrizione: "Prepara il brief da dare a chi scrive: obiettivo, scaletta, fonti da cercare e criteri di qualità.",
      testo: `Sei un content strategist. Prepara il brief per un articolo.

<dati>
Titolo provvisorio: {titolo}
Parola chiave: {keyword}
Pubblico: {pubblico}
Obiettivo dell'articolo: {obiettivo}
Lunghezza indicativa: {lunghezza}
</dati>

Il brief deve contenere:
- L'idea centrale dell'articolo in una frase.
- Cosa il lettore deve sapere o fare alla fine della lettura.
- Una scaletta con H2 e H3, e per ogni sezione 2-3 punti da trattare.
- Domande frequenti da includere.
- Tipi di fonti, dati o esempi da cercare (senza inventare fonti specifiche).
- Cosa evitare (cliché, promesse esagerate, argomenti fuori tema).
- Una checklist finale di 6 controlli di qualità.

Scrivi in modo che un copywriter che non conosce il progetto possa iniziare subito.`,
      variabili: [
        { nome: "titolo", etichetta: "Titolo provvisorio", esempio: "Come scegliere un CRM per una piccola impresa" },
        { nome: "keyword", etichetta: "Parola chiave", esempio: "CRM piccola impresa" },
        { nome: "pubblico", etichetta: "Pubblico", esempio: "titolari di aziende con meno di 10 dipendenti" },
        { nome: "obiettivo", etichetta: "Obiettivo", esempio: "far iscrivere alla prova gratuita" },
        { nome: "lunghezza", etichetta: "Lunghezza", esempio: "1500 parole" }
      ],
      consiglio: "Usa il brief come primo messaggio e chiedi l'articolo in un secondo messaggio: Claude seguirà la scaletta con più cura.",
      tecniche: ["Ruolo", "Dati in tag XML", "Elenco di sezioni richieste", "Lettore destinatario esplicito"]
    }),
    p({
      id: "brief-da-intervista",
      titolo: "Brief partendo da domande al cliente",
      categoria: "brief",
      descrizione: "Invece di inventare, Claude ti fa le domande giuste prima di preparare il brief.",
      testo: `Devo preparare un contenuto su {argomento} per {cliente}.

Prima di scrivere qualsiasi cosa, fammi al massimo 8 domande per capire:
- obiettivo e risultato atteso;
- pubblico e livello di conoscenza;
- tono di voce e cose da non dire;
- prove a disposizione (dati, casi, testimonianze);
- formato e canale di pubblicazione.

Fai una domanda per riga, numerate. Aspetta le mie risposte. Poi prepara un brief di una pagina con: obiettivo, messaggio chiave, scaletta, invito all'azione, elementi da verificare.`,
      variabili: [
        { nome: "argomento", etichetta: "Argomento", esempio: "nuovo servizio di consegna in giornata" },
        { nome: "cliente", etichetta: "Cliente / azienda", esempio: "una pasticceria di quartiere" }
      ],
      consiglio: "Ottimo quando hai poche informazioni: le domande evitano testi generici.",
      tecniche: ["Domande di chiarimento", "Processo in due fasi", "Limite al numero di domande"]
    }),

    /* ===================== COPY ===================== */
    p({
      id: "copy-pagina-prodotto",
      titolo: "Descrizione di una pagina prodotto",
      categoria: "copy",
      descrizione: "Scrive la descrizione di un prodotto partendo dalle caratteristiche e trasformandole in benefici.",
      testo: `Sei un copywriter e-commerce.

<prodotto>
Nome: {prodotto}
Caratteristiche: {caratteristiche}
Prezzo: {prezzo}
</prodotto>

<cliente>
{cliente}
</cliente>

Tono di voce: {tono}

Scrivi:
1. Un titolo (massimo 70 caratteri).
2. Un paragrafo di apertura di 2-3 frasi che parta dal problema del cliente.
3. 5 punti elenco: per ognuno, la caratteristica e il beneficio concreto ("quindi…").
4. Una sezione "Per chi è / Per chi non è".
5. Tre risposte brevi alle obiezioni più probabili.

Usa solo le informazioni fornite: se manca un dato importante (misure, materiali, garanzia), scrivi [DA COMPLETARE] invece di inventarlo.`,
      variabili: [
        { nome: "prodotto", etichetta: "Prodotto", esempio: "zaino da città impermeabile 20 L" },
        { nome: "caratteristiche", etichetta: "Caratteristiche", esempio: "tessuto riciclato, tasca PC 15\", cerniere YKK" },
        { nome: "prezzo", etichetta: "Prezzo", esempio: "89 €" },
        { nome: "cliente", etichetta: "Cliente tipo", esempio: "pendolari in bici che portano il portatile" },
        { nome: "tono", etichetta: "Tono", esempio: "diretto e pratico, senza superlativi" }
      ],
      consiglio: "Il segnaposto [DA COMPLETARE] ti mostra subito cosa manca, invece di trovare dati inventati nel testo.",
      tecniche: ["Ruolo", "Tag XML separati", "Struttura fissa", "Segnaposto per dati mancanti"]
    }),
    p({
      id: "copy-riscrivi-pas",
      titolo: "Riscrivi un testo con lo schema PAS",
      categoria: "copy",
      descrizione: "Riscrive un testo esistente con lo schema Problema – Agitazione – Soluzione e spiega le scelte.",
      testo: `Riscrivi il testo qui sotto usando lo schema PAS (Problema, Agitazione, Soluzione).

<testo_originale>
{testo}
</testo_originale>

Pubblico: {pubblico}
Lunghezza massima: {lunghezza}

Regole:
- Mantieni tutte le informazioni vere dell'originale; non aggiungere promesse.
- Frasi brevi, una idea per frase.
- Chiudi con un invito all'azione chiaro: {cta}.

Dopo il testo, aggiungi una sezione "Cosa ho cambiato" con 3-5 punti.`,
      variabili: [
        { nome: "testo", etichetta: "Testo originale", esempio: "(incolla qui il testo)" },
        { nome: "pubblico", etichetta: "Pubblico", esempio: "freelance che fatturano in ritardo" },
        { nome: "lunghezza", etichetta: "Lunghezza massima", esempio: "150 parole" },
        { nome: "cta", etichetta: "Invito all'azione", esempio: "prova gratis per 14 giorni" }
      ],
      consiglio: "Chiedi anche una versione con lo schema AIDA e confrontale.",
      tecniche: ["Schema di scrittura noto", "Vincoli espliciti", "Spiegazione delle modifiche"]
    }),

    /* ===================== ADS ===================== */
    p({
      id: "ads-google-rsa",
      titolo: "Titoli e descrizioni per Google Ads (RSA)",
      categoria: "ads",
      descrizione: "Genera titoli e descrizioni per annunci adattabili della rete di ricerca, rispettando i limiti di caratteri.",
      testo: `Sei uno specialista Google Ads.

<offerta>
Prodotto/servizio: {offerta}
Vantaggio principale: {vantaggio}
Prova o garanzia: {prova}
Parola chiave del gruppo di annunci: {keyword}
</offerta>

Crea per un annuncio adattabile della rete di ricerca:
- 15 titoli, massimo 30 caratteri ciascuno;
- 4 descrizioni, massimo 90 caratteri ciascuna.

Varia gli angoli: beneficio, prezzo/offerta, prova sociale, urgenza onesta, domanda, parola chiave esatta.
Indica accanto a ogni riga il numero di caratteri.
Non usare punti esclamativi nei titoli, maiuscole continue o affermazioni non dimostrabili ("il migliore", "n.1").

Formato: tabella con colonne Testo | Caratteri | Angolo.`,
      variabili: [
        { nome: "offerta", etichetta: "Offerta", esempio: "corso di inglese online per adulti" },
        { nome: "vantaggio", etichetta: "Vantaggio principale", esempio: "lezioni 1:1 negli orari che scegli" },
        { nome: "prova", etichetta: "Prova / garanzia", esempio: "prima lezione gratuita" },
        { nome: "keyword", etichetta: "Parola chiave", esempio: "corso inglese online" }
      ],
      consiglio: "Il conteggio dei caratteri può sbagliare di poco: ricontrollalo nell'editor di Google Ads prima di pubblicare.",
      tecniche: ["Ruolo", "Limiti numerici", "Varietà di angoli richiesta", "Output in tabella"]
    }),
    p({
      id: "ads-meta-varianti",
      titolo: "Varianti di annuncio Meta per test A/B",
      categoria: "ads",
      descrizione: "Scrive varianti di annunci per Facebook e Instagram, ognuna basata su un'ipotesi diversa da testare.",
      testo: `Prepara un test A/B di annunci Meta (Facebook e Instagram).

Prodotto: {prodotto}
Pubblico: {pubblico}
Obiettivo della campagna: {obiettivo}

Crea 4 varianti. Ognuna deve testare UNA ipotesi diversa (per esempio: dolore vs desiderio, prova sociale vs dato tecnico, testo breve vs storia).

Per ogni variante:
- Ipotesi: cosa stiamo verificando, in una frase.
- Testo principale (massimo 125 caratteri prima del "Altro").
- Titolo (massimo 40 caratteri).
- Idea per l'immagine o il video in una riga.
- Metrica da guardare per decidere.

Rispetta le regole pubblicitarie di Meta: non rivolgerti al lettore citando caratteristiche personali (salute, età, situazione economica) in modo diretto.`,
      variabili: [
        { nome: "prodotto", etichetta: "Prodotto", esempio: "app per imparare a cucinare" },
        { nome: "pubblico", etichetta: "Pubblico", esempio: "studenti fuori sede" },
        { nome: "obiettivo", etichetta: "Obiettivo", esempio: "installazioni dell'app" }
      ],
      consiglio: "Testa una variabile alla volta: se cambi testo e immagine insieme non saprai cosa ha funzionato.",
      tecniche: ["Ipotesi esplicite", "Struttura ripetuta per ogni variante", "Vincoli di piattaforma"]
    }),

    /* ===================== EMAIL ===================== */
    p({
      id: "email-sequenza-benvenuto",
      titolo: "Sequenza di benvenuto (5 email)",
      categoria: "email",
      descrizione: "Pianifica e scrive una sequenza automatica per chi si iscrive alla newsletter.",
      testo: `Sei un esperto di email marketing.

<contesto>
Azienda: {azienda}
Cosa ha ricevuto chi si iscrive: {lead_magnet}
Prodotto da proporre alla fine: {prodotto}
Tono: {tono}
</contesto>

Progetta una sequenza di benvenuto di 5 email.

Prima scrivi la mappa: per ogni email, giorno di invio, obiettivo e unico invito all'azione.
Poi scrivi le 5 email. Per ognuna:
- 3 proposte di oggetto (massimo 45 caratteri) e il testo di anteprima;
- corpo dell'email (massimo 180 parole);
- invito all'azione.

Regole: una sola idea per email; la vendita esplicita solo dalla quarta email; nessuna falsa urgenza.`,
      variabili: [
        { nome: "azienda", etichetta: "Azienda", esempio: "studio di yoga con lezioni online" },
        { nome: "lead_magnet", etichetta: "Cosa riceve chi si iscrive", esempio: "guida PDF a 10 posizioni per la schiena" },
        { nome: "prodotto", etichetta: "Prodotto finale", esempio: "abbonamento mensile" },
        { nome: "tono", etichetta: "Tono", esempio: "caldo, incoraggiante, informale" }
      ],
      consiglio: "Chiedi prima solo la mappa, correggila, poi fai scrivere le email: risparmi tempo sulle revisioni.",
      tecniche: ["Ruolo", "Pianifica poi scrivi", "Limiti di lunghezza", "Regole di contenuto"]
    }),
    p({
      id: "email-oggetti",
      titolo: "20 oggetti email da testare",
      categoria: "email",
      descrizione: "Genera oggetti di newsletter divisi per stile, con anteprima, per scegliere cosa testare.",
      testo: `Ecco il contenuto di una newsletter:

<newsletter>
{contenuto}
</newsletter>

Pubblico: {pubblico}

Scrivi 20 oggetti possibili, massimo 50 caratteri, divisi in questi gruppi: curiosità, beneficio diretto, domanda, numero/elenco, personale.
Per ogni oggetto proponi anche un testo di anteprima (massimo 90 caratteri) che lo completi senza ripeterlo.

Evita parole tipiche dello spam ("gratis!!!", "urgente", tutto maiuscolo) e oggetti che promettono cose non presenti nell'email.
Alla fine indica i 2 oggetti che testeresti in A/B e perché.`,
      variabili: [
        { nome: "contenuto", etichetta: "Contenuto della newsletter", esempio: "(incolla qui il testo)" },
        { nome: "pubblico", etichetta: "Pubblico", esempio: "clienti di un negozio di bici" }
      ],
      consiglio: "Annota quale oggetto vince ogni test e incollalo nei prompt successivi come esempio.",
      tecniche: ["Documento in tag XML", "Gruppi di stile", "Scelta motivata finale"]
    }),

    /* ===================== SOCIAL ===================== */
    p({
      id: "social-carosello-instagram",
      titolo: "Carosello Instagram/LinkedIn",
      categoria: "social",
      descrizione: "Trasforma un concetto in un carosello di slide con gancio iniziale e chiusura con invito all'azione.",
      testo: `Crea un carosello per {piattaforma} sull'argomento: {argomento}.

Pubblico: {pubblico}
Obiettivo: {obiettivo}

Struttura:
- Slide 1: un gancio di massimo 8 parole che prometta un beneficio chiaro.
- Slide 2-7: un solo concetto per slide, titolo di massimo 6 parole + testo di massimo 25 parole.
- Slide 8: riepilogo in 3 punti.
- Slide 9: invito all'azione.

Per ogni slide suggerisci anche un elemento visivo semplice (icona, grafico, foto).
Poi scrivi la didascalia del post (massimo 150 parole) e 5-8 hashtag pertinenti, evitando quelli troppo generici.`,
      variabili: [
        { nome: "piattaforma", etichetta: "Piattaforma", esempio: "LinkedIn" },
        { nome: "argomento", etichetta: "Argomento", esempio: "5 errori nel preventivo di un sito web" },
        { nome: "pubblico", etichetta: "Pubblico", esempio: "web designer freelance" },
        { nome: "obiettivo", etichetta: "Obiettivo", esempio: "salvataggi e richieste di consulenza" }
      ],
      consiglio: "Dai a Claude 2-3 tuoi post migliori come esempio di stile tra tag <esempi>.",
      tecniche: ["Struttura slide per slide", "Limiti di parole", "Output multiplo (slide + didascalia)"]
    }),
    p({
      id: "social-riuso-contenuto",
      titolo: "Un contenuto, cinque formati",
      categoria: "social",
      descrizione: "Riadatta un articolo o un video in post per canali diversi, rispettando il linguaggio di ognuno.",
      testo: `Ecco un contenuto che ho già pubblicato:

<contenuto>
{contenuto}
</contenuto>

Riadattalo per questi canali: {canali}.

Per ogni canale:
- scegli l'aspetto del contenuto più adatto a quel pubblico (non riassumere tutto);
- rispetta il linguaggio e la lunghezza tipici del canale;
- chiudi con un invito all'azione diverso da quello degli altri canali.

Mantieni il tono: {tono}. Non aggiungere dati o affermazioni che non sono nel contenuto originale.`,
      variabili: [
        { nome: "contenuto", etichetta: "Contenuto originale", esempio: "(incolla qui articolo o trascrizione)" },
        { nome: "canali", etichetta: "Canali", esempio: "LinkedIn, Instagram, X, newsletter, TikTok (script 30 s)" },
        { nome: "tono", etichetta: "Tono", esempio: "competente ma alla mano" }
      ],
      consiglio: "Per i video, incolla la trascrizione: Claude ricaverà frasi da usare come citazioni.",
      tecniche: ["Documento in tag XML", "Adattamento per canale", "Divieto di aggiungere dati"]
    }),

    /* ===================== CALENDARIO ===================== */
    p({
      id: "calendario-mensile",
      titolo: "Calendario editoriale di un mese",
      categoria: "calendario",
      descrizione: "Pianifica i contenuti di 4 settimane bilanciando obiettivi, formati e canali.",
      testo: `Sei un social media manager. Crea un calendario editoriale di 4 settimane.

<dati>
Attività: {attivita}
Canali: {canali}
Frequenza: {frequenza}
Obiettivi del mese: {obiettivi}
Date o eventi importanti: {eventi}
</dati>

Regole di equilibrio:
- circa 40% contenuti utili, 30% relazione/dietro le quinte, 20% prova sociale, 10% vendita diretta;
- non pubblicare lo stesso formato due volte di fila sullo stesso canale.

Formato: tabella con colonne Data | Canale | Formato | Tema | Gancio (una frase) | Obiettivo.
Dopo la tabella, elenca i materiali da preparare in anticipo (foto, video, testimonianze).`,
      variabili: [
        { nome: "attivita", etichetta: "Attività", esempio: "ristorante di pesce a Napoli" },
        { nome: "canali", etichetta: "Canali", esempio: "Instagram, Facebook, Google Business Profile" },
        { nome: "frequenza", etichetta: "Frequenza", esempio: "3 post a settimana + stories quotidiane" },
        { nome: "obiettivi", etichetta: "Obiettivi", esempio: "aumentare le prenotazioni del pranzo" },
        { nome: "eventi", etichetta: "Date/eventi", esempio: "festa del papà, nuovo menù dal 15" }
      ],
      consiglio: "Chiedi di esportare la tabella in formato CSV per incollarla in un foglio di calcolo.",
      tecniche: ["Ruolo", "Dati in tag XML", "Regole di equilibrio", "Output in tabella"]
    }),
    p({
      id: "calendario-idee-pilastri",
      titolo: "Pilastri di contenuto e 30 idee",
      categoria: "calendario",
      descrizione: "Definisce 4-5 temi ricorrenti (pilastri) per il brand e genera idee di contenuto per ognuno.",
      testo: `Aiutami a definire i pilastri di contenuto per {brand}.

Cosa vendiamo: {offerta}
Pubblico: {pubblico}
Cosa ci rende diversi: {differenza}

1. Proponi 4-5 pilastri: nome, perché interessa al pubblico, come collega il pubblico all'offerta.
2. Per ogni pilastro scrivi 6 idee di contenuto, ognuna con titolo provvisorio e formato consigliato.
3. Segna con ★ le 5 idee da realizzare per prime, spiegando la scelta in una riga.`,
      variabili: [
        { nome: "brand", etichetta: "Brand", esempio: "un'agenzia di viaggi per famiglie" },
        { nome: "offerta", etichetta: "Offerta", esempio: "pacchetti vacanza con bambini piccoli" },
        { nome: "pubblico", etichetta: "Pubblico", esempio: "genitori 30-45 anni" },
        { nome: "differenza", etichetta: "Elemento distintivo", esempio: "strutture verificate di persona" }
      ],
      consiglio: "Salva i pilastri tra i tuoi prompt e riusali come contesto in ogni richiesta di contenuti.",
      tecniche: ["Passi numerati", "Collegamento a obiettivo di business", "Prioritizzazione"]
    }),

    /* ===================== PERSONA ===================== */
    p({
      id: "persona-da-dati",
      titolo: "Buyer persona partendo da dati reali",
      categoria: "persona",
      descrizione: "Costruisce una buyer persona a partire da recensioni, email o interviste che incolli.",
      testo: `Sei un ricercatore di marketing. Analizza il materiale qui sotto (recensioni, email dei clienti, note di interviste).

<materiale>
{materiale}
</materiale>

Prodotto: {prodotto}

Costruisci 1-2 buyer persona basate SOLO su ciò che emerge dal materiale:
- situazione e obiettivi;
- problemi e frustrazioni (con citazioni testuali dal materiale);
- cosa li fa decidere e cosa li frena;
- parole ed espressioni che usano;
- dove cercano informazioni.

Per ogni affermazione indica se è "supportata dal materiale" o "ipotesi da verificare".
Chiudi con 3 domande da fare nelle prossime interviste per colmare i vuoti.`,
      variabili: [
        { nome: "materiale", etichetta: "Materiale", esempio: "(incolla recensioni o note)" },
        { nome: "prodotto", etichetta: "Prodotto", esempio: "software di fatturazione per artigiani" }
      ],
      consiglio: "Più materiale reale incolli (anche 50 recensioni), più la persona sarà concreta e meno stereotipata.",
      tecniche: ["Ruolo", "Documento in tag XML", "Citazioni a supporto", "Distinzione fatti/ipotesi"]
    }),
    p({
      id: "persona-jobs-to-be-done",
      titolo: "Mappa Jobs-to-be-Done",
      categoria: "persona",
      descrizione: "Descrive il 'lavoro' che il cliente vuole portare a termine e il percorso che lo porta a scegliere.",
      testo: `Usa il metodo Jobs-to-be-Done per analizzare chi compra {prodotto}.

Contesto: {contesto}

Descrivi:
1. Il lavoro principale (funzionale), in una frase del tipo "Quando…, voglio…, così posso…".
2. I lavori emotivi e sociali collegati.
3. Il momento che fa scattare la ricerca di una soluzione.
4. Le alternative che il cliente considera (anche "non fare nulla").
5. Le forze in gioco: spinta, attrazione, ansia, abitudine.
6. Tre messaggi di marketing che nascono da questa analisi.

Segnala chiaramente cosa è una deduzione e cosa andrebbe verificato con clienti veri.`,
      variabili: [
        { nome: "prodotto", etichetta: "Prodotto", esempio: "un'agenda cartacea per insegnanti" },
        { nome: "contesto", etichetta: "Contesto", esempio: "vendita online, prezzo 25 €, picco a settembre" }
      ],
      consiglio: "Combinalo con il prompt 'Buyer persona partendo da dati reali' per verificare le deduzioni.",
      tecniche: ["Framework noto", "Passi numerati", "Distinzione fatti/ipotesi"]
    }),

    /* ===================== COMPETITOR ===================== */
    p({
      id: "competitor-confronto-messaggi",
      titolo: "Confronto dei messaggi dei competitor",
      categoria: "competitor",
      descrizione: "Confronta i testi dei siti concorrenti e trova lo spazio di posizionamento libero.",
      testo: `Sei un analista di posizionamento. Ti incollo i testi delle home page di alcuni concorrenti.

<competitor nome="{competitor_1}">
{testo_1}
</competitor>
<competitor nome="{competitor_2}">
{testo_2}
</competitor>

Il nostro prodotto: {nostro_prodotto}

Analizza:
1. Per ogni concorrente: promessa principale, pubblico a cui parla, prove usate, tono.
2. Una tabella di confronto con queste righe.
3. I messaggi che usano tutti (e che quindi non ci differenziano).
4. Due o tre spazi di posizionamento che nessuno occupa e che sono coerenti con il nostro prodotto.

Basati solo sui testi forniti; non fare supposizioni su prezzi o quote di mercato.`,
      variabili: [
        { nome: "competitor_1", etichetta: "Concorrente 1", esempio: "Alfa" },
        { nome: "testo_1", etichetta: "Testo concorrente 1", esempio: "(incolla il testo della home)" },
        { nome: "competitor_2", etichetta: "Concorrente 2", esempio: "Beta" },
        { nome: "testo_2", etichetta: "Testo concorrente 2", esempio: "(incolla il testo della home)" },
        { nome: "nostro_prodotto", etichetta: "Il nostro prodotto", esempio: "gestionale per palestre" }
      ],
      consiglio: "Aggiungi altri blocchi <competitor> se ne hai più di due: la struttura funziona allo stesso modo.",
      tecniche: ["Più documenti in tag XML con attributi", "Tabella di confronto", "Limite alle fonti fornite"]
    }),
    p({
      id: "competitor-swot",
      titolo: "Analisi SWOT ragionata",
      categoria: "competitor",
      descrizione: "Prepara una SWOT a partire dalle tue informazioni e la trasforma in azioni concrete.",
      testo: `Prepara un'analisi SWOT per {azienda}.

<informazioni>
{informazioni}
</informazioni>

1. Compila punti di forza, debolezze, opportunità e minacce (massimo 5 voci ciascuno), usando solo le informazioni fornite.
2. Incrocia i quadranti:
   - forze × opportunità: cosa sfruttare subito;
   - debolezze × minacce: cosa proteggere.
3. Proponi 5 azioni di marketing per i prossimi 90 giorni, ognuna con obiettivo e indicatore di successo.

Se le informazioni non bastano per un quadrante, scrivilo e indica cosa servirebbe sapere.`,
      variabili: [
        { nome: "azienda", etichetta: "Azienda", esempio: "una libreria indipendente" },
        { nome: "informazioni", etichetta: "Informazioni", esempio: "(clienti, punti forti, concorrenti vicini, dati di vendita…)" }
      ],
      consiglio: "Chiedi a Claude di ragionare passo passo prima della tabella finale se le informazioni sono tante.",
      tecniche: ["Framework noto", "Incrocio dei dati", "Azioni misurabili", "Gestione delle informazioni mancanti"]
    }),

    /* ===================== STRATEGIA ===================== */
    p({
      id: "strategia-piano-lancio",
      titolo: "Piano di lancio di un prodotto",
      categoria: "strategia",
      descrizione: "Prepara un piano di lancio in tre fasi con canali, attività e metriche.",
      testo: `Sei un responsabile marketing. Prepara il piano di lancio per {prodotto}.

<vincoli>
Data di lancio: {data}
Budget: {budget}
Team disponibile: {team}
Canali già attivi: {canali}
</vincoli>

Organizza il piano in tre fasi: pre-lancio (4 settimane), lancio (1 settimana), post-lancio (4 settimane).
Per ogni fase indica:
- obiettivo;
- attività principali con canale e responsabile;
- ripartizione indicativa del budget;
- 2-3 metriche da controllare.

Considera i vincoli realisticamente: se il budget o il team non bastano per qualcosa, proponi un'alternativa più semplice invece di ignorarlo.
Chiudi con i 3 rischi principali e come ridurli.`,
      variabili: [
        { nome: "prodotto", etichetta: "Prodotto", esempio: "nuova linea di cosmetici solidi" },
        { nome: "data", etichetta: "Data di lancio", esempio: "1 marzo" },
        { nome: "budget", etichetta: "Budget", esempio: "3.000 €" },
        { nome: "team", etichetta: "Team", esempio: "1 persona part-time + fondatrice" },
        { nome: "canali", etichetta: "Canali attivi", esempio: "Instagram (4k follower), newsletter (800 iscritti)" }
      ],
      consiglio: "Più sei preciso sui vincoli, meno il piano sarà generico.",
      tecniche: ["Ruolo", "Vincoli in tag XML", "Struttura per fasi", "Analisi dei rischi"]
    }),
    p({
      id: "strategia-obiettivi-smart",
      titolo: "Da obiettivo vago a obiettivi SMART",
      categoria: "strategia",
      descrizione: "Trasforma un desiderio generico ('più vendite') in obiettivi misurabili con indicatori.",
      testo: `Il mio obiettivo di marketing è: "{obiettivo}".

Situazione attuale: {situazione}

1. Riformula l'obiettivo in 2-3 obiettivi SMART (specifici, misurabili, raggiungibili, rilevanti, con scadenza).
2. Per ognuno: indicatore principale, indicatori di supporto, dove si misura (es. Google Analytics, CRM).
3. Indica cosa dovrebbe essere vero per raggiungerlo (ipotesi) e come verificarlo nelle prime 2 settimane.

Se un numero che proponi è una stima, dillo e spiega su cosa si basa.`,
      variabili: [
        { nome: "obiettivo", etichetta: "Obiettivo vago", esempio: "voglio più clienti dal sito" },
        { nome: "situazione", etichetta: "Situazione attuale", esempio: "1.200 visite/mese, 6 richieste di preventivo" }
      ],
      consiglio: "Fornisci i numeri attuali, anche approssimativi: senza punto di partenza gli obiettivi restano astratti.",
      tecniche: ["Framework noto", "Trasparenza sulle stime", "Verifica delle ipotesi"]
    }),

    /* ===================== BRAND ===================== */
    p({
      id: "brand-estrai-tono",
      titolo: "Estrai il tono di voce dai tuoi testi",
      categoria: "brand",
      descrizione: "Analizza testi che ti piacciono e ne ricava linee guida di tono di voce riutilizzabili.",
      testo: `Ecco alcuni testi del nostro brand che rappresentano bene come vogliamo comunicare:

<esempi>
{esempi}
</esempi>

Analizzali e scrivi una guida al tono di voce:
1. 3-4 aggettivi che descrivono il tono, ognuno con "significa…" e "non significa…".
2. Caratteristiche di stile: lunghezza delle frasi, uso del tu/voi, emoji, tecnicismi, umorismo.
3. Parole ed espressioni ricorrenti da usare; parole da evitare.
4. Una tabella "Così sì / Così no" con 5 esempi.
5. Un breve paragrafo riassuntivo da incollare all'inizio dei prompt futuri.`,
      variabili: [
        { nome: "esempi", etichetta: "Testi di esempio", esempio: "(incolla 3-5 testi: post, email, pagine)" }
      ],
      consiglio: "Salva il paragrafo riassuntivo nei tuoi prompt e incollalo come contesto in ogni richiesta.",
      tecniche: ["Esempi (few-shot) in tag XML", "Estrazione di regole", "Output riusabile"]
    }),
    p({
      id: "brand-adatta-tono",
      titolo: "Adatta un testo al tono del brand",
      categoria: "brand",
      descrizione: "Riscrive un testo seguendo le tue linee guida di tono e segnala cosa ha cambiato.",
      testo: `<linee_guida_tono>
{linee_guida}
</linee_guida_tono>

<testo>
{testo}
</testo>

Riscrivi il testo seguendo le linee guida di tono. Mantieni significato, informazioni e lunghezza simile.
Poi elenca le 3-5 modifiche più importanti, citando la regola delle linee guida che le giustifica.
Se una parte del testo è in conflitto con le linee guida in un modo che non si può risolvere riscrivendo (per esempio una promessa non coerente con il brand), segnalala invece di modificarla.`,
      variabili: [
        { nome: "linee_guida", etichetta: "Linee guida di tono", esempio: "(incolla la guida o il paragrafo riassuntivo)" },
        { nome: "testo", etichetta: "Testo da adattare", esempio: "(incolla il testo)" }
      ],
      consiglio: "Funziona molto bene insieme al prompt 'Estrai il tono di voce dai tuoi testi'.",
      tecniche: ["Linee guida in tag XML", "Giustificazione delle modifiche", "Segnalazione dei conflitti"]
    }),

    /* ===================== ANALISI ===================== */
    p({
      id: "analisi-leggi-report",
      titolo: "Interpreta un report di analytics",
      categoria: "analisi",
      descrizione: "Legge i dati che incolli (Analytics, social, email) e li traduce in osservazioni e azioni.",
      testo: `Sei un analista di marketing digitale. Ecco i dati del periodo {periodo}:

<dati>
{dati}
</dati>

Obiettivo del sito/canale: {obiettivo}

1. Riassumi in 3 frasi cosa è successo, per chi non legge i numeri.
2. Elenca le 5 osservazioni più rilevanti, ognuna con il dato che la supporta.
3. Distingui correlazioni da cause: non attribuire un cambiamento a una causa se i dati non lo dimostrano.
4. Proponi 3 azioni e 2 analisi da approfondire.

Se i dati sono incompleti o sembrano incoerenti (per esempio totali che non tornano), segnalalo prima di tutto.`,
      variabili: [
        { nome: "periodo", etichetta: "Periodo", esempio: "ottobre 2026 vs settembre 2026" },
        { nome: "dati", etichetta: "Dati", esempio: "(incolla la tabella o il CSV esportato)" },
        { nome: "obiettivo", etichetta: "Obiettivo", esempio: "richieste di contatto" }
      ],
      consiglio: "Incolla i dati in formato tabella o CSV: Claude li legge meglio di uno screenshot descritto a parole.",
      tecniche: ["Ruolo", "Dati in tag XML", "Correlazione vs causa", "Controllo di coerenza"]
    }),
    p({
      id: "analisi-cro-landing",
      titolo: "Audit di conversione di una landing page",
      categoria: "analisi",
      descrizione: "Valuta una landing page e propone ipotesi di test ordinate per impatto e facilità.",
      testo: `Agisci come esperto di CRO (ottimizzazione delle conversioni).

<landing>
{testo_landing}
</landing>

Traffico principale: {traffico}
Conversione desiderata: {conversione}
Tasso di conversione attuale: {tasso}

Valuta la pagina su: chiarezza della promessa nei primi secondi, coerenza con la fonte di traffico, prove e fiducia, obiezioni non risolte, frizione del modulo/checkout, invito all'azione.

Poi proponi 6 ipotesi di test nel formato:
"Se [modifica], allora [metrica] migliorerà perché [motivo]."
Assegna a ciascuna un punteggio ICE (Impatto, Confidenza, Facilità da 1 a 10) e ordinale.`,
      variabili: [
        { nome: "testo_landing", etichetta: "Testo della landing", esempio: "(incolla il testo, indicando anche pulsanti e moduli)" },
        { nome: "traffico", etichetta: "Fonte di traffico", esempio: "annunci Meta su mobile" },
        { nome: "conversione", etichetta: "Conversione", esempio: "prenotazione di una call" },
        { nome: "tasso", etichetta: "Tasso attuale", esempio: "1,2%" }
      ],
      consiglio: "Descrivi anche la versione mobile: spesso i problemi di conversione sono lì.",
      tecniche: ["Ruolo", "Criteri di valutazione espliciti", "Formato di ipotesi fisso", "Punteggio ICE"]
    }),

    /* ===================== NUOVI PROMPT ORIGINALI (approved 2026-11-19) ===================== */
    p({
      id: "seo-scheda-google-business",
      titolo: "Audit e ottimizzazione della scheda Google Business Profile",
      descrizione: "Audit campo per campo della scheda di un'attività locale, con descrizione, categorie, servizi, post, risposte alle recensioni e piano d'azione di 30 giorni.",
      testo: `Sei un consulente senior di SEO locale. Fai audit delle schede Google Business Profile per piccole attività e segui in modo rigoroso le linee guida di Google.

<attivita>
Nome usato su insegna e documenti: {nome_attivita}
Tipo di attività: {tipo_attivita}
Città e zone servite: {zone}
Servizi o prodotti, dal più importante: {servizi}
Cosa la distingue (solo fatti dimostrabili): {elemento_distintivo}
Principali concorrenti locali e categoria principale che usano, se nota: {concorrenti}
</attivita>

<scheda_attuale>
{scheda_attuale}
</scheda_attuale>

Compito:
1. Tabella di audit. Per ogni campo (nome, categoria principale, categorie aggiuntive, descrizione, servizi, zone servite, orari normali e speciali, attributi, foto, post, recensioni e risposte) indica: stato (OK / da migliorare / mancante), il problema specifico e la priorità (alta / media / bassa).
2. Controllo del nome. Se il nome della scheda aggiunge parole chiave o località non usate nella realtà, segnalalo: viola le linee guida di Google e può portare alla sospensione.
3. Categorie. Proponi la categoria principale più specifica e solo le aggiuntive (massimo 9) che descrivono davvero l'attività. Motiva ogni scelta in una riga e confrontala con i concorrenti.
4. Descrizione. Scrivi 2 versioni, massimo 750 caratteri ciascuna, con il conteggio dei caratteri. Metti le informazioni chiave nei primi 250 caratteri. Niente link, prezzi o promozioni. Nomina la città principale una sola volta.
5. Servizi. Elenca 8-12 servizi con le parole che usano i clienti, ognuno con una breve descrizione.
6. Post. Prepara 4 post per i prossimi 30 giorni alternando Aggiornamento, Offerta ed Evento, ognuno con il pulsante consigliato (Chiama, Prenota, Scopri di più…). Ricordami che i post vengono archiviati dopo 6 mesi se non hanno un intervallo di date.
7. Domande dei clienti. Le domande e risposte sono limitate e Google risponde sempre più spesso in Maps con l'AI, usando scheda, recensioni e sito. Elenca le 6 domande più frequenti e indica dove deve comparire ogni risposta: descrizione, servizi, attributi o FAQ del sito.
8. Recensioni. Suggerisci un processo per chiedere recensioni (senza incentivi: Google li vieta) e 3 modelli di risposta: positiva, mista, negativa.
9. Piano d'azione di 30 giorni, ordinato per impatto e sforzo.

Vincoli:
- Non inventare mai orari, prezzi, anni di attività, certificazioni o recensioni: scrivi [DA COMPLETARE].
- Non promettere posizionamenti: Google ordina i risultati locali per pertinenza, distanza e notorietà, e la distanza non si può cambiare.
- Dove una regola potrebbe essere cambiata, aggiungi "da verificare nella Guida di Google Business Profile".

Formato: una sezione con titolo per ogni punto, tabelle per i punti 1, 3 e 9.`,
      variabili: [
        { nome: "nome_attivita", etichetta: "Nome reale dell'attività", esempio: "Ciclofficina Raggi" },
        { nome: "tipo_attivita", etichetta: "Tipo di attività", esempio: "ciclofficina indipendente" },
        { nome: "zone", etichetta: "Città e zone servite", esempio: "Bologna centro + 10 km, ritiro a domicilio" },
        { nome: "servizi", etichetta: "Servizi / prodotti", esempio: "riparazioni, tagliandi, assistenza e-bike, bici usate" },
        { nome: "elemento_distintivo", etichetta: "Cosa la distingue", esempio: "riparazioni in giornata prenotabili online, garanzia 2 anni sul lavoro" },
        { nome: "concorrenti", etichetta: "Concorrenti locali (facoltativo)", esempio: "Bike Doctor (Negozio di riparazione biciclette), CicloPiù (Negozio di biciclette)" },
        { nome: "scheda_attuale", etichetta: "Scheda attuale", esempio: "(incolla qui nome, categorie, descrizione, servizi, orari, attributi e recensioni recenti)" }
      ],
      consiglio: "Cerca quale categoria principale usano le prime 3 attività nella mappa per la tua ricerca principale e inseriscila nel campo concorrenti: la categoria è uno dei segnali di pertinenza più forti che puoi controllare.",
      tecniche: ["Ruolo", "Contesto in tag XML", "Audit campo per campo", "Regole della piattaforma come vincoli", "Piano d'azione con priorità"]
    }),
    p({
      id: "seo-faq-dati-strutturati",
      titolo: "Sezione FAQ per persone, ricerca e risposte AI",
      descrizione: "Trasforma le domande vere dei clienti in una sezione FAQ mirata, individua gli argomenti che meritano una pagina propria e aggiunge il markup FAQPage facoltativo, chiarendo cosa fa oggi.",
      testo: `Sei un content strategist SEO senior. Scrivi FAQ che rispondono in modo chiaro a domande reali, utili ai clienti, ai risultati di ricerca classici e alle risposte generate dall'AI.

<pagina>
Tipo di pagina e URL: {tipo_pagina}
Argomento principale e ricerca obiettivo: {argomento}
Pubblico e livello di conoscenza: {pubblico}
Testo della pagina:
{testo_pagina}
</pagina>

<domande_clienti>
{domande_clienti}
</domande_clienti>

Compito:
1. Classifica ogni domanda per fase (prima dell'acquisto, durante la scelta, dopo l'acquisto) e per tipo (prezzo, tempi, procedura, obiezione, confronto, fiducia).
2. Scegli 6-10 domande per questa pagina. Mantieni le parole dei clienti; etichetta ognuna come "dai clienti" o "suggerita dalle lacune della pagina".
3. Rispondi a ognuna in 40-80 parole: la risposta diretta nella prima frase, poi un dettaglio concreto (condizione, numero, esempio) preso dalla pagina. Suggerisci un link interno dove sul sito esiste una risposta più lunga.
4. Elenca le domande troppo complesse per una FAQ che meritano una pagina o sezione propria, con un titolo provvisorio.
5. Posizione: indica dove mettere le FAQ nella pagina e assicurati che le risposte siano nel testo visibile della pagina, non solo in immagini o contenuti caricati dopo.
6. Markup ({includi_schema}): se "sì", genera il JSON-LD FAQPage con parole identiche alle risposte visibili. Specifica chiaramente che Google ha smesso di mostrare i risultati multimediali FAQ il 7 maggio 2026: il markup è innocuo e valido per schema.org, altri sistemi possono leggerlo, ma non crea uno snippet visibile su Google. Suggerisci di verificarne la sintassi con lo Schema Markup Validator.
7. Manutenzione: quali query di Search Console (domande con come, cosa, perché, quanto costa…) controllare ogni trimestre per aggiornare le FAQ.

Vincoli:
- Basa le risposte solo sul testo della pagina e sulle domande fornite; scrivi [DA COMPLETARE] dove mancano informazioni.
- Nessun tono promozionale e nessuna affermazione non verificabile.
- Non promettere posizionamenti, snippet o citazioni nelle risposte AI.

Formato: una tabella per i punti 1-3 (domanda, fase, tipo, origine, risposta, link interno), poi una breve sezione per ciascuno dei punti restanti.`,
      variabili: [
        { nome: "tipo_pagina", etichetta: "Tipo di pagina e URL", esempio: "pagina servizio — /diagnosi-energetica" },
        { nome: "argomento", etichetta: "Argomento e ricerca obiettivo", esempio: "costo diagnosi energetica casa" },
        { nome: "pubblico", etichetta: "Pubblico", esempio: "proprietari di casa senza competenze tecniche" },
        { nome: "testo_pagina", etichetta: "Testo della pagina", esempio: "(incolla qui il testo della pagina)" },
        { nome: "domande_clienti", etichetta: "Domande reali dei clienti", esempio: "(incolla qui domande da email, telefonate, chat o recensioni)" },
        { nome: "includi_schema", etichetta: "Generare il markup FAQPage? (sì/no)", esempio: "sì" }
      ],
      consiglio: "Il valore sta nelle risposte, non nel markup: raccogli le domande da email di assistenza, chiamate commerciali e recensioni, e aggiorna le FAQ quando ne arrivano di nuove.",
      tecniche: ["Ruolo", "Documenti in tag XML", "Classificazione per fase e tipo", "Etichetta della fonte", "Dati aggiornati sulla piattaforma"]
    }),
    p({
      id: "brief-video-verticale",
      titolo: "Copione per video verticale breve (Reels, TikTok, Shorts)",
      descrizione: "Trasforma un'idea in ganci iniziali e un copione inquadratura per inquadratura per un video verticale breve.",
      testo: `Sei uno stratega di video brevi che scrive per {piattaforma}.

<input>
Argomento o prodotto: {argomento}
Pubblico: {pubblico}
Obiettivo del video: {obiettivo}
Durata: {durata} secondi
Risorse disponibili: {risorse}
</input>

Compito: scrivi il brief e il copione di un video verticale.

1. Proponi 3 ganci per i primi 2 secondi (uno visivo, uno parlato, uno come testo a schermo) e indica quale testeresti per primo.
2. Scrivi il copione come tabella con le colonne: tempo, cosa si vede, cosa si dice, testo a schermo.
3. Una sola idea per video: se l'argomento è troppo ampio, dillo e proponi come dividerlo.
4. Chiudi con un unico invito all'azione coerente con l'obiettivo.
5. Aggiungi una didascalia (massimo 150 caratteri) e una nota sull'audio (voce fuori campo, audio originale o musica).

Vincoli:
- Usa solo inquadrature realizzabili con le risorse indicate; segnala tutto ciò che richiede attrezzatura in più.
- Nessun risultato, numero o testimonianza che non sia nell'input: scrivi [DA COMPLETARE].
- Il parlato deve stare nella durata: circa 2-3 parole al secondo.

Formato: ganci, tabella del copione, didascalia, note di produzione.`,
      variabili: [
        { nome: "piattaforma", etichetta: "Piattaforma", esempio: "Instagram Reels" },
        { nome: "argomento", etichetta: "Argomento o prodotto", esempio: "come conservare la pasta fresca" },
        { nome: "pubblico", etichetta: "Pubblico", esempio: "chi cucina a casa nei giorni feriali" },
        { nome: "obiettivo", etichetta: "Obiettivo", esempio: "visite al negozio online" },
        { nome: "durata", etichetta: "Durata (secondi)", esempio: "30" },
        { nome: "risorse", etichetta: "Risorse", esempio: "uno smartphone, luce naturale, il bancone del negozio" }
      ],
      consiglio: "Chiedi due copioni con ganci diversi e girali entrambi: i primi secondi decidono gran parte del risultato.",
      tecniche: ["Ruolo", "Contesto in tag XML", "Output in tabella", "Limiti di produzione realistici"]
    }),
    p({
      id: "brief-caso-studio",
      titolo: "Caso studio dai dati del cliente",
      descrizione: "Trasforma situazione, interventi e risultati di un cliente in un caso studio credibile, pronto per l'approvazione.",
      testo: `Sei un content writer B2B che trasforma i risultati dei clienti in casi studio credibili.

<cliente>
Cliente (o descrizione anonima): {cliente}
Situazione di partenza: {prima}
Cosa abbiamo fatto: {soluzione}
Risultati e dati: {risultati}
Citazioni del cliente: {citazioni}
</cliente>

Compito: prepara il caso studio.

1. Riassumi la storia in tre righe: problema, approccio, risultato.
2. Proponi 3 titoli che mettano al centro il risultato del cliente, non la nostra azienda.
3. Scrivi il caso studio (500-700 parole) in sezioni: il cliente, la sfida, l'approccio, i risultati, i prossimi passi.
4. Riporta i numeri principali in un breve riquadro "in sintesi" all'inizio.
5. Elenca i punti che il cliente deve approvare prima della pubblicazione.

Vincoli:
- Usa solo i dati e le citazioni forniti. Non arrotondare i numeri per eccesso, non inventare percentuali e non modificare le citazioni cambiandone il senso.
- Se un risultato non ha un numero, descrivilo a parole e aggiungi [DATO DA RICHIEDERE].
- Indica come e in quale periodo sono stati misurati i risultati; se non è specificato, scrivi [DA COMPLETARE].

Formato: sintesi, titoli, caso studio con intestazioni, checklist di approvazione.`,
      variabili: [
        { nome: "cliente", etichetta: "Cliente", esempio: "una catena regionale di 6 studi dentistici" },
        { nome: "prima", etichetta: "Situazione di partenza", esempio: "molti appuntamenti saltati, prenotazioni solo per telefono" },
        { nome: "soluzione", etichetta: "Cosa abbiamo fatto", esempio: "prenotazione online e promemoria via SMS" },
        { nome: "risultati", etichetta: "Risultati e dati", esempio: "(incolla qui i numeri con periodo e fonte)" },
        { nome: "citazioni", etichetta: "Citazioni del cliente", esempio: "(incolla qui le frasi esatte)" }
      ],
      consiglio: "Fatti approvare per iscritto il testo dal cliente prima di pubblicarlo, soprattutto numeri e citazioni.",
      tecniche: ["Ruolo", "Dati in tag XML", "Divieto di inventare dati", "Checklist di approvazione"]
    }),
    p({
      id: "copy-comunicato-stampa",
      titolo: "Comunicato stampa",
      descrizione: "Scrive un comunicato stampa fattuale e utilizzabile dai giornalisti, con titolo, citazione e nota sull'organizzazione.",
      testo: `Sei un addetto stampa che scrive comunicati che i giornalisti possono davvero usare.

<notizia>
Organizzazione: {organizzazione}
La notizia: {notizia}
Fatti principali (date, luoghi, numeri): {fatti}
Portavoce e ruolo: {portavoce}
Testate di riferimento: {testate}
</notizia>

Compito: scrivi un comunicato stampa.

1. Un titolo (massimo 90 caratteri) che dica la notizia, non uno slogan pubblicitario.
2. Un sottotitolo di una frase con il dettaglio più importante.
3. Un primo paragrafo che risponda a chi, cosa, quando, dove e perché.
4. Due o tre paragrafi di contesto e dettagli, dal più al meno importante.
5. Una citazione del portavoce, segnalata come bozza da approvare.
6. Un breve paragrafo di presentazione dell'organizzazione e un blocco con i contatti per la stampa.

Vincoli:
- Usa solo i fatti forniti; scrivi [DA COMPLETARE] per quelli mancanti (nome del referente, email, data).
- Niente superlativi come "rivoluzionario" o "leader" se i fatti non li dimostrano.
- Massimo 450 parole in tutto.

Dopo il comunicato, elenca 3 spunti che potrebbero interessare le testate indicate e una domanda che un giornalista probabilmente farà.`,
      variabili: [
        { nome: "organizzazione", etichetta: "Organizzazione", esempio: "una biblioteca di quartiere senza scopo di lucro" },
        { nome: "notizia", etichetta: "La notizia", esempio: "apertura di un servizio gratuito di prestito attrezzi" },
        { nome: "fatti", etichetta: "Fatti principali", esempio: "apre il 12 gennaio, 150 attrezzi, aperto da martedì a sabato" },
        { nome: "portavoce", etichetta: "Portavoce", esempio: "Anna Rossi, coordinatrice" },
        { nome: "testate", etichetta: "Testate di riferimento", esempio: "quotidiani e radio locali" }
      ],
      consiglio: "Fai riscrivere la citazione al portavoce con parole sue: le citazioni vere suonano molto meglio.",
      tecniche: ["Ruolo", "Fatti in tag XML", "Piramide rovesciata", "Divieto di superlativi"]
    }),
    p({
      id: "copy-pagina-prezzi",
      titolo: "Testi per la pagina prezzi",
      descrizione: "Scrive una pagina prezzi che aiuta a scegliere il piano e risponde con onestà alle obiezioni più comuni.",
      testo: `Sei un copywriter orientato alla conversione, specializzato in pagine prezzi.

<offerta>
Prodotto o servizio: {prodotto}
Piani e prezzi: {piani}
Cosa include ogni piano: {inclusioni}
Cliente tipo: {cliente}
Obiezioni più frequenti: {obiezioni}
</offerta>

Compito: scrivi i testi della pagina prezzi.

1. Un titolo e un sottotitolo che aiutino a scegliere (non solo "Prezzi").
2. Per ogni piano: nome, una riga su a chi è adatto, il prezzo esattamente come fornito e 4-6 voci incluse scritte come risultati.
3. Suggerisci quale piano mettere in evidenza e perché, basandoti solo sulle informazioni qui sopra.
4. Una tabella di confronto con le differenze principali tra i piani.
5. Una sezione FAQ di 5-6 domande che risponda alle obiezioni (fatturazione, disdetta, cambio piano, assistenza).
6. Il testo del pulsante per ogni piano.

Vincoli:
- Non modificare i prezzi e non inventare sconti, garanzie, prove gratuite o limiti: tutto ciò che non è indicato diventa [DA COMPLETARE].
- Niente falsa urgenza (conti alla rovescia, "solo oggi") e niente "illimitato" se non è letteralmente vero.
- Ogni descrizione di piano sotto le 60 parole.

Formato: sezioni nell'ordine indicato, pronte da incollare nella pagina.`,
      variabili: [
        { nome: "prodotto", etichetta: "Prodotto o servizio", esempio: "software di fatturazione online per freelance" },
        { nome: "piani", etichetta: "Piani e prezzi", esempio: "Base 9 €/mese, Pro 19 €/mese, Studio 39 €/mese" },
        { nome: "inclusioni", etichetta: "Cosa include ogni piano", esempio: "(incolla qui l'elenco delle funzioni per piano)" },
        { nome: "cliente", etichetta: "Cliente tipo", esempio: "liberi professionisti e piccoli studi" },
        { nome: "obiezioni", etichetta: "Obiezioni frequenti", esempio: "paura di restare vincolati, dubbi sugli adempimenti fiscali" }
      ],
      consiglio: "Aggiungi le domande che il commerciale o l'assistenza sentono più spesso: rendono le FAQ molto più convincenti.",
      tecniche: ["Ruolo", "Offerta in tag XML", "Struttura fissa", "Divieto di falsa urgenza"]
    }),
    p({
      id: "ads-retargeting-segmenti",
      titolo: "Annunci di retargeting per segmento",
      descrizione: "Pianifica i segmenti di retargeting in base all'intenzione e scrive varianti di annuncio per ognuno, senza messaggi invadenti.",
      testo: `Sei uno specialista di advertising social e display che pianifica campagne di retargeting.

<contesto>
Attività e prodotto: {attivita}
Comportamenti dei visitatori che possiamo usare: {pubblici}
Motivo principale per cui le persone escono senza acquistare: {obiezione}
Offerta disponibile (se c'è): {offerta}
Piattaforme: {piattaforme}
</contesto>

Compito: pianifica gli annunci di retargeting per segmento di pubblico.

1. Dividi i pubblici in 3-4 segmenti per livello di intenzione (per esempio: ha visto una pagina, ha visto un prodotto, ha iniziato il checkout, ha già acquistato), usando solo i comportamenti indicati.
2. Per ogni segmento indica: angolo del messaggio, finestra temporale consigliata, una nota sulla frequenza e un'esclusione per evitare sovrapposizioni.
3. Scrivi 2 varianti di annuncio per segmento: testo principale (massimo 125 caratteri), titolo (massimo 40 caratteri), invito all'azione.
4. Descrivi in una frase un'idea creativa per ogni segmento.

Vincoli:
- Non promettere sconti o offerte che non sono nell'input.
- Non citare caratteristiche personali sensibili e non far capire che stai osservando chi guarda ("Abbiamo visto che stavi guardando...").
- Ricordami di verificare le regole pubblicitarie di ogni piattaforma e che alcuni segmenti potrebbero essere troppo piccoli per partire.

Formato: una tabella per segmento, poi un breve elenco di cosa misurare per ciascuno.`,
      variabili: [
        { nome: "attivita", etichetta: "Attività e prodotto", esempio: "negozio online di stoviglie in ceramica fatte a mano" },
        { nome: "pubblici", etichetta: "Comportamenti utilizzabili", esempio: "visitatori del sito, chi ha visto prodotti, carrelli abbandonati, clienti degli ultimi 180 giorni" },
        { nome: "obiezione", etichetta: "Motivo principale di abbandono", esempio: "timore di rotture durante la spedizione" },
        { nome: "offerta", etichetta: "Offerta disponibile", esempio: "spedizione gratuita sopra i 60 €" },
        { nome: "piattaforme", etichetta: "Piattaforme", esempio: "Meta (Facebook e Instagram)" }
      ],
      consiglio: "Incolla le dimensioni dei pubblici dal tuo account pubblicitario: Claude potrà unire i segmenti troppo piccoli.",
      tecniche: ["Ruolo", "Contesto in tag XML", "Segmentazione per intenzione", "Limiti di caratteri"]
    }),
    p({
      id: "ads-termini-ricerca-negativi",
      titolo: "Analisi dei termini di ricerca: parole chiave negative e nuove",
      descrizione: "Legge il report dei termini di ricerca di Google Ads, spiega e propone le parole chiave negative e suggerisce nuove parole chiave positive da aggiungere.",
      testo: `Sei uno specialista Google Ads che analizza un report dei termini di ricerca. Spiega il tuo ragionamento in modo che lo capisca anche chi usa Google Ads da poco.

<account>
Attività: {attivita}
Cosa vendiamo, e cosa NON vendiamo: {perimetro_offerta}
Obiettivo della campagna e costo per risultato desiderato, se noto: {obiettivo}
Parole chiave attuali e tipi di corrispondenza: {parole_chiave_attuali}
</account>

<termini_di_ricerca>
{termini_ricerca}
</termini_di_ricerca>

Compito:
1. Breve spiegazione (massimo 120 parole): cosa sono le parole chiave negative e in cosa differiscono le corrispondenze negative generica, a frase ed esatta. Ricorda che le negative non coprono automaticamente varianti simili, plurali o errori di battitura, quindi le varianti importanti vanno aggiunte a parte.
2. Raggruppa i termini in: pertinenti e con conversioni, pertinenti ma ancora senza conversioni, non pertinenti, dubbi.
3. Parole chiave negative. Per ogni termine o schema non pertinente: la negativa, il tipo di corrispondenza, il livello (gruppo di annunci, campagna o elenco di parole chiave negative condiviso), il motivo e un esempio di ricerca che bloccherebbe.
4. Controllo dei rischi. Segnala le negative proposte che potrebbero bloccare anche ricerche buone, e come restringerle.
5. Parole chiave positive. Dai termini pertinenti, suggerisci nuove parole chiave da aggiungere: parola chiave, tipo di corrispondenza, gruppo di annunci in cui va (esistente o nuovo), motivo e dati che la supportano (clic, conversioni, costo).
6. Schemi ricorrenti (chi cerca lavoro, "gratis", fai-da-te, nomi di concorrenti, località sbagliate) e un elenco di negative standard da riusare in tutte le campagne.

Vincoli:
- Basati solo sui dati incollati; non inventare costi, clic, conversioni o volumi di ricerca.
- Se nel report mancano costi o conversioni, o ci sono pochissimi clic, indica quali conclusioni sono incerte.
- Dove il funzionamento di Google Ads potrebbe essere cambiato, aggiungi "da verificare nella Guida di Google Ads".

Formato: spiegazione, poi tabelle per i punti 2, 3 e 5, poi elenchi puntati per i punti 4 e 6.`,
      variabili: [
        { nome: "attivita", etichetta: "Attività", esempio: "idraulico per pronto intervento a Torino" },
        { nome: "perimetro_offerta", etichetta: "Cosa vendiamo / non vendiamo", esempio: "riparazioni e manutenzione caldaie; no progettazione bagni, no vendita ricambi" },
        { nome: "obiettivo", etichetta: "Obiettivo e costo desiderato", esempio: "telefonate dalla zona, massimo 40 € a chiamata" },
        { nome: "parole_chiave_attuali", etichetta: "Parole chiave attuali", esempio: "\"idraulico urgente\" (a frase), [riparazione caldaia torino] (esatta)" },
        { nome: "termini_ricerca", etichetta: "Report termini di ricerca", esempio: "(incolla qui il report esportato con clic, costo e conversioni)" }
      ],
      consiglio: "Esporta almeno 30 giorni di dati con le colonne costo e conversioni: con pochi clic è difficile distinguere un termine sbagliato dalla sfortuna.",
      tecniche: ["Ruolo", "Dati in tag XML", "Prima spiega, poi agisci", "Classificazione", "Controllo dei rischi delle raccomandazioni"]
    }),
    p({
      id: "email-carrello-abbandonato",
      titolo: "Sequenza per il carrello abbandonato con incentivi intelligenti (3 email)",
      descrizione: "Scrive tre email di recupero carrello che prima rispondono alle obiezioni e poi usano incentivi controllati, come la spedizione gratuita o uno sconto se il cliente aggiunge un prodotto complementare.",
      testo: `Sei un esperto di email marketing per l'e-commerce che recupera i carrelli senza erodere i margini.

<negozio>
Negozio e prodotti: {negozio}
Tono del brand: {tono}
Motivi tipici di abbandono del carrello: {motivi}
Spedizioni e resi: {condizioni}
Soglia per la spedizione gratuita, se c'è: {soglia_spedizione_gratuita}
Prodotti complementari che si abbinano ai carrelli tipici: {prodotti_complementari}
Incentivi consentiti e loro limiti (sconto massimo, ordine minimo, validità del codice): {incentivi}
</negozio>

Compito: scrivi una sequenza di 3 email per il carrello abbandonato con una scala di incentivi.

1. Email 1 (circa 1 ora dopo): promemoria cordiale che mostra il carrello. Nessun incentivo.
2. Email 2 (circa 24 ore dopo): rispondi all'obiezione più probabile con informazioni pratiche (spedizione, resi, taglie, pagamento). Se il carrello è sotto la soglia di spedizione gratuita, mostra quanto manca e suggerisci 1-2 prodotti complementari per raggiungerla ("aggiungi X e la spedizione è gratis").
3. Email 3 (circa 48-72 ore dopo): ultimo promemoria con l'incentivo, scelto solo tra quelli consentiti. Proponi due varianti:
   a) "Completa il set": uno sconto o la spedizione gratuita se il cliente aggiunge al carrello un prodotto complementare;
   b) un incentivo semplice sul carrello attuale, per chi non ha reagito all'email 2.

Per ogni email fornisci: 3 oggetti (massimo 45 caratteri), testo di anteprima (massimo 90 caratteri), corpo (massimo 120 parole), testo del pulsante e i campi dinamici necessari ([nome prodotto], [immagine], [link al carrello], [importo mancante per la spedizione gratuita], [codice sconto], [data di scadenza]).

Poi indica le regole dell'incentivo: chi lo riceve, ogni quanto (per esempio una volta per cliente ogni 90 giorni), una scadenza reale, come escludere chi abbandona il carrello di continuo e come misurare il ricavo in più rispetto a un gruppo di controllo senza incentivi.

Vincoli:
- Non inventare sconti, prezzi, disponibilità di magazzino o scadenze; niente falsa scarsità. Scrivi [DA COMPLETARE] per i dati mancanti.
- Ricordami che la sequenza deve interrompersi appena il cliente acquista, deve rispettare consenso e regole di disiscrizione, e che l'annuncio di sconti può essere soggetto alle regole sull'indicazione dei prezzi del mio mercato (per esempio le norme UE "Omnibus" sulle riduzioni di prezzo).

Formato: un blocco per email, poi le regole dell'incentivo, poi 3 idee da testare.`,
      variabili: [
        { nome: "negozio", etichetta: "Negozio e prodotti", esempio: "abbigliamento per neonati in cotone biologico" },
        { nome: "tono", etichetta: "Tono del brand", esempio: "caldo e rassicurante, senza vezzeggiativi" },
        { nome: "motivi", etichetta: "Motivi di abbandono", esempio: "dubbi sulle taglie, costi di spedizione mostrati tardi" },
        { nome: "condizioni", etichetta: "Spedizioni e resi", esempio: "reso gratuito entro 30 giorni, consegna in 2-4 giorni" },
        { nome: "soglia_spedizione_gratuita", etichetta: "Soglia spedizione gratuita", esempio: "60 €" },
        { nome: "prodotti_complementari", etichetta: "Prodotti complementari", esempio: "bavaglini (9 €), teli in mussola (12 €), calzini 3 paia (10 €)" },
        { nome: "incentivi", etichetta: "Incentivi consentiti e limiti", esempio: "spedizione gratuita o 10% di sconto, ordine minimo 50 €, codice valido 72 ore" }
      ],
      consiglio: "Parti dalla spinta verso la spedizione gratuita nell'email 2: spesso aumenta il valore dell'ordine senza bisogno di sconti. Tieni lo sconto percentuale per l'email 3 e confrontalo con un gruppo che non riceve incentivi.",
      tecniche: ["Ruolo", "Contesto in tag XML", "Scala di incentivi", "Vendita abbinata fino alla soglia", "Regole di business e conformità"]
    }),
    p({
      id: "email-contatto-creator",
      titolo: "Email di contatto a un creator / influencer",
      descrizione: "Scrive un primo contatto personale e un follow-up utile per proporre una collaborazione a un creator.",
      testo: `Sei un responsabile partnership che scrive email di contatto a cui i creator rispondono davvero.

<brand>
Brand e prodotto: {brand}
Perché questo creator è adatto: {affinita}
Cosa proponiamo: {proposta}
Compenso: {compenso}
</brand>

<creator>
Nome o profilo: {creator}
Contenuto recente da citare: {contenuto_recente}
</creator>

Compito: scrivi una prima email di contatto e un follow-up.

1. Tre oggetti (massimo 50 caratteri), personali ma non acchiappaclic.
2. La prima email (massimo 150 parole): un riferimento preciso al suo lavoro, perché la collaborazione ha senso per il suo pubblico, la proposta in due frasi, il compenso detto con chiarezza, un passo successivo semplice.
3. Un follow-up dopo 5-7 giorni (massimo 70 parole) che aggiunga un dettaglio nuovo e utile invece di un generico "ti scrivo per sapere se hai visto".

Vincoli:
- Cita solo i contenuti che ho descritto; non inventare post, numeri o complimenti.
- Se il compenso non è indicato, scrivi [DA COMPLETARE] invece di lasciar intendere un pagamento.
- Ricorda che i contenuti sponsorizzati vanno segnalati chiaramente come pubblicità.
- Niente formule adulatorie e nessuna pressione.

Formato: oggetti, email, follow-up, poi 2 domande a cui devo essere pronto a rispondere.`,
      variabili: [
        { nome: "brand", etichetta: "Brand e prodotto", esempio: "piccolo marchio di deodoranti naturali ricaricabili" },
        { nome: "affinita", etichetta: "Perché questo creator", esempio: "parla di routine a basso spreco senza fare la predica" },
        { nome: "proposta", etichetta: "Proposta", esempio: "un video di recensione sincera dopo 3 settimane di uso" },
        { nome: "compenso", etichetta: "Compenso", esempio: "300 € più il prodotto" },
        { nome: "creator", etichetta: "Creator", esempio: "@martascaffaleverde" },
        { nome: "contenuto_recente", etichetta: "Contenuto recente", esempio: "il suo video sui kit da viaggio zero rifiuti" }
      ],
      consiglio: "Dedica cinque minuti ai suoi contenuti veri prima di compilare i campi: è il riferimento preciso che fa ottenere una risposta.",
      tecniche: ["Ruolo", "Due blocchi XML", "Limiti di parole", "Promemoria sulla trasparenza pubblicitaria"]
    }),
    p({
      id: "social-risposta-commento-negativo",
      titolo: "Rispondere a un commento o una recensione negativa",
      descrizione: "Classifica un commento critico, decide se gestirlo in pubblico o in privato e scrive risposte calme e oneste.",
      testo: `Sei un community manager che gestisce le critiche con calma e in pubblico.

<situazione>
Brand: {brand}
Piattaforma: {piattaforma}
Commento o recensione ricevuta:
{commento}
Cosa sappiamo del caso: {fatti}
Cosa possiamo offrire: {rimedio}
Tono di voce: {tono}
</situazione>

Compito: aiutami a rispondere.

1. Classifica il commento: lamentela fondata, malinteso, in parte ragione, troll o spam, possibile crisi (molti commenti simili, questioni di sicurezza o legali).
2. Indica se rispondere in pubblico, spostarsi in privato o entrambe le cose, e perché.
3. Scrivi 2 risposte pubbliche (massimo 80 parole ciascuna): riconosci il problema, prenditi la responsabilità di ciò che è nostro, indica un passo concreto.
4. Scrivi il messaggio privato di seguito.
5. Se può trattarsi di una crisi, elenca chi in azienda va avvisato prima di rispondere.

Vincoli:
- Non ammettere responsabilità legali, non promettere rimborsi e non condividere dati personali oltre quanto previsto da "cosa possiamo offrire".
- Niente polemiche, niente sarcasmo, niente scuse copia-incolla.
- Se mancano dei fatti, scrivi [DA VERIFICARE] invece di dare per scontato chi ha ragione.

Formato: classificazione, raccomandazione, risposte, note per l'escalation.`,
      variabili: [
        { nome: "brand", etichetta: "Brand", esempio: "pizzeria a conduzione familiare con consegna a domicilio" },
        { nome: "piattaforma", etichetta: "Piattaforma", esempio: "recensioni Google" },
        { nome: "commento", etichetta: "Commento o recensione", esempio: "(incolla qui il commento esatto)" },
        { nome: "fatti", etichetta: "Cosa sappiamo", esempio: "ordine arrivato con 50 minuti di ritardo di sabato, mancava un fattorino" },
        { nome: "rimedio", etichetta: "Cosa possiamo offrire", esempio: "una pizza in omaggio al prossimo ordine" },
        { nome: "tono", etichetta: "Tono di voce", esempio: "cordiale, diretto, senza linguaggio aziendale" }
      ],
      consiglio: "Aspetta di aver verificato i fatti internamente: una risposta veloce ma sbagliata fa più danni di una corretta che arriva un po' dopo.",
      tecniche: ["Ruolo", "Situazione in tag XML", "Classificazione prima di scrivere", "Percorso di escalation"]
    }),
    p({
      id: "social-linkedin-punto-di-vista",
      titolo: "Post LinkedIn con un vero punto di vista",
      descrizione: "Trasforma l'esperienza di un professionista in un post LinkedIn che prende posizione, senza cliché né storie inventate.",
      testo: `Sei un ghostwriter per LinkedIn che aiuta i professionisti a condividere competenze reali.

<autore>
Ruolo e settore: {ruolo}
Chi vuole raggiungere: {pubblico}
Esperienza o opinione da condividere: {idea}
Esempio o storia concreta: {storia}
</autore>

Compito: trasforma questo materiale in un post LinkedIn con un punto di vista chiaro.

1. Scrivi 3 frasi d'apertura alternative che dicano subito l'idea o la tensione (niente "Sono felice di annunciare...").
2. Scrivi il post (150-250 parole): l'idea, l'esempio, cosa può portarsi via chi legge e una domanda che inviti a una discussione vera.
3. Usa paragrafi brevi e al massimo 3 hashtag pertinenti.
4. Suggerisci un commento che l'autore potrebbe aggiungere sotto il post per approfondire.

Vincoli:
- Resta fedele all'esperienza fornita: non aggiungere aneddoti, numeri, clienti o risultati inventati.
- Evita gli inviti forzati all'interazione ("scrivi SÌ nei commenti"), i luoghi comuni e le file di emoji.
- Se l'idea è troppo generica per essere interessante, dillo e fammi una domanda per renderla più precisa prima di scrivere.

Formato: frasi d'apertura, post, commento suggerito.`,
      variabili: [
        { nome: "ruolo", etichetta: "Ruolo e settore", esempio: "responsabile operativo in un'azienda di logistica" },
        { nome: "pubblico", etichetta: "Pubblico", esempio: "altri manager di aziende medie" },
        { nome: "idea", etichetta: "Esperienza o opinione", esempio: "la maggior parte dei ritardi nasce nei passaggi di consegna, non dalle persone lente" },
        { nome: "storia", etichetta: "Esempio concreto", esempio: "abbiamo ridotto i ritardi mappando chi passa cosa a chi" }
      ],
      consiglio: "Scrivi l'idea come la diresti a un collega davanti a un caffè: con un input informale Claude conserva meglio la tua voce.",
      tecniche: ["Ruolo", "Contesto in tag XML", "Più opzioni di apertura", "Domanda di chiarimento se l'input è debole"]
    }),
    p({
      id: "calendario-promozione-evento",
      titolo: "Calendario di promozione di un evento",
      descrizione: "Pianifica settimana per settimana la promozione di un evento o webinar, dall'annuncio al follow-up.",
      testo: `Sei un responsabile marketing per gli eventi.

<evento>
Evento: {evento}
Data e formato: {data_formato}
Pubblico: {pubblico}
Obiettivo di iscrizioni: {obiettivo}
Canali disponibili: {canali}
Persone e ore a settimana: {risorse}
</evento>

Compito: costruisci il calendario di promozione da oggi fino a una settimana dopo l'evento.

1. Dividi il periodo in fasi: annuncio, prime iscrizioni, spinta con i contenuti, ultimi promemoria, giorno dell'evento, follow-up.
2. Per ogni settimana, elenca le azioni per canale con formato, messaggio chiave e il segnaposto [RESPONSABILE].
3. Includi le email di promemoria per gli iscritti (per esempio 7 giorni, 1 giorno e 1 ora prima) e un follow-up per chi si è iscritto ma non ha partecipato.
4. Fissa 3 momenti di verifica in cui confrontare le iscrizioni con l'obiettivo, e indica cosa fare se siamo indietro.
5. Aggiungi idee di contenuti post-evento che riutilizzino ciò che succede durante l'evento (resoconto, registrazione, frasi chiave).

Vincoli:
- Pianifica solo con i canali e le forze indicati; se il piano è troppo pesante per il team, taglialo e dimmi cosa hai tolto.
- Non inventare relatori, sponsor o numeri di iscritti: usa [DA COMPLETARE].
- Se la data lascia troppo poco tempo per una promozione adeguata, dillo per prima cosa.

Formato: una tabella settimana per settimana (settimana, fase, canale, azione, messaggio, responsabile), poi i momenti di verifica.`,
      variabili: [
        { nome: "evento", etichetta: "Evento", esempio: "webinar gratuito sulla contabilità per nuovi freelance" },
        { nome: "data_formato", etichetta: "Data e formato", esempio: "tra 5 settimane, giovedì ore 18, online, 60 minuti" },
        { nome: "pubblico", etichetta: "Pubblico", esempio: "freelance nei primi due anni di attività" },
        { nome: "obiettivo", etichetta: "Obiettivo di iscrizioni", esempio: "200 iscritti" },
        { nome: "canali", etichetta: "Canali", esempio: "newsletter (3.000 contatti), LinkedIn, Instagram" },
        { nome: "risorse", etichetta: "Persone e ore", esempio: "una persona, circa 5 ore a settimana" }
      ],
      consiglio: "Indica la data rispetto a oggi ('tra 5 settimane'): la tempistica diventa più facile da controllare e riutilizzare.",
      tecniche: ["Ruolo", "Contesto in tag XML", "Piano per fasi", "Momenti di verifica", "Limite di capacità"]
    }),
    p({
      id: "calendario-annuale-stagionalita",
      titolo: "Piano di 12 mesi basato sulla stagionalità",
      descrizione: "Costruisce un calendario marketing annuale intorno alla stagionalità delle tue vendite e alle tue date chiave.",
      testo: `Sei un marketing planner che costruisce piani annuali sulla stagionalità reale.

<attivita>
Attività: {attivita}
Mercato: {mercato}
Mesi forti e deboli (dai nostri dati di vendita): {stagionalita}
Date importanti per noi (festività, fiere, lanci): {date_chiave}
Canali: {canali}
</attivita>

Compito: prepara una bozza di calendario marketing di 12 mesi.

1. Per ogni mese indica: tema principale, priorità commerciale (spingere, coltivare o rallentare), 2-3 idee di contenuti o campagne e i canali.
2. Inizia la preparazione 4-6 settimane prima di ogni data importante e rendi visibile questo anticipo nel piano.
3. Usa di proposito i mesi più deboli per creare contenuti sempre validi e riutilizzare ciò che ha funzionato.
4. Evidenzia 4 "momenti chiave" dell'anno e spiega perché li hai scelti.

Vincoli:
- Usa solo le date e la stagionalità che ti fornisco. Se suggerisci una festività o una giornata a tema generica, segnala "da verificare", perché le date cambiano da un anno all'altro e da paese a paese.
- Non inventare dati di vendita né obiettivi di crescita.
- Mantieni il piano realistico per un piccolo team: al massimo 2 campagne importanti a trimestre.

Formato: una tabella di 12 righe (mese, tema, priorità, idee, canali, inizio preparazione), poi i momenti chiave.`,
      variabili: [
        { nome: "attivita", etichetta: "Attività", esempio: "vivaio con negozio online" },
        { nome: "mercato", etichetta: "Mercato", esempio: "Nord Italia" },
        { nome: "stagionalita", etichetta: "Mesi forti e deboli", esempio: "picco marzo-giugno, secondo picco a dicembre, calma ad agosto e gennaio" },
        { nome: "date_chiave", etichetta: "Date chiave", esempio: "porte aperte di primavera, mostra florovivaistica locale a maggio, vendita alberi di Natale" },
        { nome: "canali", etichetta: "Canali", esempio: "newsletter, Instagram, scheda Google, punto vendita" }
      ],
      consiglio: "Incolla le vendite mensili degli ultimi due anni invece di descriverle: il piano seguirà la tua curva reale.",
      tecniche: ["Ruolo", "Contesto in tag XML", "Output in tabella", "Divieto di inventare date", "Limite di capacità"]
    }),
    p({
      id: "persona-guida-intervista",
      titolo: "Traccia per interviste ai clienti",
      descrizione: "Prepara una traccia di intervista con i tempi, centrata sui comportamenti reali passati, con domande di approfondimento e una scheda per gli appunti.",
      testo: `Sei un ricercatore che prepara interviste con {tipo_intervistati}.

<ricerca>
Prodotto o servizio: {prodotto}
Cosa vogliamo capire: {obiettivo_ricerca}
Durata dell'intervista: {durata} minuti
</ricerca>

Compito: scrivi una traccia di intervista.

1. Una breve introduzione da leggere ad alta voce: scopo, durata, consenso alla registrazione, nessuna risposta giusta o sbagliata.
2. 2-3 domande di riscaldamento sul ruolo e sul contesto.
3. 8-10 domande centrali sull'ultima volta reale in cui hanno affrontato il problema: cosa l'ha fatto emergere, cosa hanno provato, chi era coinvolto, cosa li ha quasi fermati.
4. Per ogni domanda centrale, 1-2 domande di approfondimento ("Mi racconta meglio?", "E poi cos'è successo?").
5. Domande di chiusura e un ringraziamento.
6. Una scheda per gli appunti con campi per citazioni, difficoltà, fattori scatenanti e sorprese.

Vincoli:
- Chiedi dei comportamenti passati, non di intenzioni future ipotetiche ("Lo comprerebbe...?").
- Niente domande che suggeriscono la risposta, e non nominare il nostro prodotto prima della parte finale.
- Indica un tempo stimato per ogni sezione che, sommato, corrisponda alla durata dell'intervista.

Formato: la traccia divisa in sezioni, poi la scheda. Chiudi con 3 errori da evitare durante l'intervista.`,
      variabili: [
        { nome: "tipo_intervistati", etichetta: "Chi intervisti", esempio: "titolari di piccoli studi di commercialisti" },
        { nome: "prodotto", etichetta: "Prodotto o servizio", esempio: "app per raccogliere i documenti dai clienti" },
        { nome: "obiettivo_ricerca", etichetta: "Cosa vogliamo capire", esempio: "come sollecitano oggi i documenti mancanti e quanto costa loro" },
        { nome: "durata", etichetta: "Durata (minuti)", esempio: "30" }
      ],
      consiglio: "Dopo 5-6 interviste, incolla gli appunti e usali con il prompt 'Buyer persona partendo da dati reali'.",
      tecniche: ["Ruolo", "Contesto in tag XML", "Comportamenti passati, non intenzioni", "Gestione dei tempi"]
    }),
    p({
      id: "persona-sondaggio-clienti",
      titolo: "Progettare un sondaggio per i clienti",
      descrizione: "Progetta un sondaggio breve e imparziale costruito intorno a una decisione di business, con indicazioni per l'analisi.",
      testo: `Sei un ricercatore di mercato che progetta sondaggi brevi e imparziali.

<sondaggio>
Chi risponde: {rispondenti}
Decisione che il sondaggio deve supportare: {decisione}
Canale: {canale}
Tempo massimo di compilazione: {tempo_max} minuti
</sondaggio>

Compito: progetta il sondaggio.

1. Riformula la decisione ed elenca le 3-4 cose che dobbiamo sapere per prenderla; elimina ogni domanda che non serve a una di queste.
2. Scrivi le domande in ordine, dalle più semplici alle più personali. Per ognuna indica: tipo (scelta singola, scelta multipla, scala di valutazione, aperta), opzioni di risposta e a quale obiettivo conoscitivo serve.
3. Inserisci al massimo 2 domande aperte.
4. Scrivi un breve testo introduttivo (perché lo chiediamo, quanto tempo richiede, come useremo i dati) e un messaggio di ringraziamento.
5. Spiega come analizzare le risposte una volta raccolte.

Vincoli:
- Niente domande che suggeriscono la risposta, che ne contengono due in una o che sono cariche di giudizio; scale bilanciate con un'opzione neutra quando ha senso; l'opzione "altro" o "non so" dove serve.
- Chiedi dati personali solo se strettamente necessari, e spiega perché.
- Rispetta il limite di tempo: calcola circa 3-4 domande chiuse al minuto.

Formato: un elenco numerato di domande con le opzioni, poi introduzione, ringraziamento e note per l'analisi.`,
      variabili: [
        { nome: "rispondenti", etichetta: "Chi risponde", esempio: "clienti che hanno acquistato negli ultimi 6 mesi" },
        { nome: "decisione", etichetta: "Decisione da supportare", esempio: "se lanciare un abbonamento mensile" },
        { nome: "canale", etichetta: "Canale", esempio: "email dopo la consegna" },
        { nome: "tempo_max", etichetta: "Tempo massimo (minuti)", esempio: "3" }
      ],
      consiglio: "Prova il sondaggio con due o tre colleghi prima di inviarlo: le domande poco chiare saltano subito all'occhio.",
      tecniche: ["Ruolo", "Progettazione a partire dalla decisione", "Controllo dei bias", "Gestione dei tempi"]
    }),
    p({
      id: "competitor-analisi-recensioni",
      titolo: "Cosa dicono i clienti di un concorrente",
      descrizione: "Analizza le recensioni pubbliche di un concorrente per trovare apprezzamenti e frustrazioni ricorrenti da cui imparare.",
      testo: `Sei un analista di mercato che ricava indicazioni dalle recensioni dei clienti.

<recensioni>
Concorrente: {concorrente}
Fonte delle recensioni: {fonte}

{recensioni}
</recensioni>

La nostra offerta, in breve: {nostra_offerta}

Compito: scopri cosa i clienti apprezzano e cosa non sopportano di questo concorrente.

1. Raggruppa le recensioni per temi (prodotto, prezzo, assistenza, consegna, facilità d'uso, altro) e conta quante recensioni citano ogni tema, in positivo e in negativo.
2. Per ogni tema, riporta 1-2 frasi brevi copiate parola per parola dalle recensioni.
3. Individua le 3 frustrazioni più frequenti e indica se la nostra offerta le risolve, basandoti solo su quanto ho descritto.
4. Individua ciò che i clienti lodano e che non dovremmo sottovalutare.
5. Suggerisci 3 messaggi o miglioramenti per noi, ognuno collegato a un riscontro nelle recensioni.

Vincoli:
- Lavora solo sulle recensioni incollate. Il campione può essere piccolo o poco rappresentativo: indica quanta fiducia meritano le conclusioni.
- Non inventare e non riformulare le citazioni.
- Non suggerire messaggi che attacchino o nominino il concorrente.

Formato: una tabella dei temi (tema, citazioni positive, citazioni negative, frase di esempio), poi sezioni numerate per i punti 3-5.`,
      variabili: [
        { nome: "concorrente", etichetta: "Concorrente", esempio: "un negozio online di cibo per animali più grande del nostro" },
        { nome: "fonte", etichetta: "Fonte delle recensioni", esempio: "recensioni pubbliche su una piattaforma di recensioni, ultimi 6 mesi" },
        { nome: "recensioni", etichetta: "Recensioni", esempio: "(incolla qui 30-100 recensioni)" },
        { nome: "nostra_offerta", etichetta: "La nostra offerta", esempio: "abbonamento con date di consegna flessibili e consigli del veterinario in chat" }
      ],
      consiglio: "Includi sia recensioni a 5 stelle sia a 1 stella: quelle intermedie spesso contengono le critiche più precise.",
      tecniche: ["Ruolo", "Dati in tag XML", "Conteggio e citazioni testuali", "Livello di affidabilità"]
    }),
    p({
      id: "competitor-confronto-prezzi",
      titolo: "Confronto prezzi e pacchetti dei concorrenti",
      descrizione: "Confronta come tu e i concorrenti costruite e prezzate i piani, e suggerisce come presentare i tuoi.",
      testo: `Sei un analista di pricing che confronta come i concorrenti costruiscono la loro offerta.

<nostri_prezzi>
{nostri_prezzi}
</nostri_prezzi>

<prezzi_concorrenti>
{prezzi_concorrenti}
</prezzi_concorrenti>

Cliente tipo: {cliente}

Compito: confronta pacchetti e prezzi.

1. Crea una tabella con una riga per ogni piano (nostri e di ciascun concorrente): nome del piano, prezzo, periodo di fatturazione, limiti principali, cosa include, prova gratuita o garanzia.
2. Descrivi in due frasi la logica di prezzo di ogni concorrente (per utente, a consumo, a canone fisso, freemium...).
3. Indica dove sembriamo più cari o più convenienti per il cliente tipo, e dove il confronto non è alla pari.
4. Suggerisci 3 modifiche ai nostri pacchetti o al modo di presentarli, ognuna con vantaggi e rischi.

Vincoli:
- Usa solo il testo incollato. I prezzi cambiano spesso: ricordami di verificare ogni cifra sulle pagine aggiornate prima di usarla.
- Non ipotizzare costi nascosti o sconti; se qualcosa non è chiaro, scrivi "non indicato".
- Non consigliare di copiare la pagina o i testi di un concorrente.

Formato: la tabella, poi una sezione per ciascuno dei punti 2-4.`,
      variabili: [
        { nome: "nostri_prezzi", etichetta: "I nostri piani e prezzi", esempio: "(incolla qui il testo della nostra pagina prezzi)" },
        { nome: "prezzi_concorrenti", etichetta: "Pagine prezzi dei concorrenti", esempio: "(incolla qui il testo di 2-4 pagine prezzi dei concorrenti, con i nomi)" },
        { nome: "cliente", etichetta: "Cliente tipo", esempio: "piccoli team di 3-10 persone" }
      ],
      consiglio: "Incolla il testo delle pagine, non degli screenshot, e annota la data in cui l'hai copiato.",
      tecniche: ["Ruolo", "Tag XML separati per fonte", "Verifica del confronto alla pari", "Vantaggi e rischi"]
    }),
    p({
      id: "strategia-piano-misurazione",
      titolo: "Piano di misurazione e convenzione UTM",
      descrizione: "Definisce KPI, eventi da tracciare e una convenzione UTM coerente prima che parta una campagna.",
      testo: `Sei un analista di marketing che prepara i piani di misurazione prima che partano le campagne.

<campagna>
Campagna: {campagna}
Obiettivo di business: {obiettivo}
Canali: {canali}
Strumenti disponibili: {strumenti}
</campagna>

Compito: prepara il piano di misurazione.

1. Collega l'obiettivo di business a 1 KPI principale e a 2-4 metriche di supporto, spiegando perché ognuna è importante.
2. Elenca gli eventi o le conversioni da tracciare e dove avviene ciascuno (sito, modulo, checkout, telefonata).
3. Proponi una convenzione UTM per source, medium, campaign e content, tutto minuscolo e senza spazi, e costruisci 3 URL di esempio a partire dai miei canali.
4. Indica quale situazione di partenza dobbiamo misurare prima del lancio e come ottenerla.
5. Definisci una cadenza dei report e quale decisione deve supportare ciascun report.

Vincoli:
- Non inventare benchmark o obiettivi numerici: scrivi [OBIETTIVO DA DEFINIRE] dove serve un numero.
- Usa solo gli strumenti indicati; se qualcosa non si può misurare con questi, dillo.
- Ricordami di non inserire mai dati personali (nomi, email) negli URL o nei parametri UTM.

Formato: una tabella dei KPI, una tabella degli eventi, una tabella UTM con esempi, poi brevi sezioni per i punti 4-5.`,
      variabili: [
        { nome: "campagna", etichetta: "Campagna", esempio: "promozione di primavera per una scuola di lingue" },
        { nome: "obiettivo", etichetta: "Obiettivo di business", esempio: "iscrizioni ai corsi serali per adulti" },
        { nome: "canali", etichetta: "Canali", esempio: "newsletter, inserzioni Instagram, siti partner, volantini con QR code" },
        { nome: "strumenti", etichetta: "Strumenti", esempio: "Google Analytics 4, piattaforma newsletter, foglio di calcolo" }
      ],
      consiglio: "Condividi la tabella UTM con chiunque crei link: basta un valore scritto in modo diverso per spezzare i report.",
      tecniche: ["Ruolo", "Contesto in tag XML", "Catena obiettivo-metrica", "Segnaposto per gli obiettivi"]
    }),
    p({
      id: "strategia-proposta-partnership",
      titolo: "Proposta di partnership di co-marketing",
      descrizione: "Verifica l'affinità con un potenziale partner, propone formati di collaborazione e scrive il primo contatto.",
      testo: `Sei un responsabile business development che prepara una proposta di co-marketing.

<noi>
La nostra azienda: {nostra_azienda}
Il nostro pubblico e i nostri canali: {nostre_risorse}
</noi>

<partner>
Potenziale partner: {partner}
Perché pensiamo sia adatto: {affinita}
</partner>

Idea di collaborazione: {idea}

Compito: prepara una proposta di partnership.

1. Verifica l'affinità: pubblico in comune, offerte non in concorrenza, cosa ci guadagna ciascuna parte. Se l'affinità è debole, dillo prima di scrivere qualsiasi altra cosa.
2. Proponi 2-3 formati di collaborazione (webinar congiunto, scambio di contenuti, pacchetto combinato, segnalazioni reciproche...) con l'impegno richiesto e il beneficio atteso per entrambe le parti.
3. Scrivi la prima email di contatto (massimo 180 parole), centrata su cosa ci guadagna il partner.
4. Prepara la scaletta di una proposta di una pagina: obiettivo, formato, chi fa cosa, tempi, come misuriamo i risultati, come si condividono contatti e dati.

Vincoli:
- Non inventare dimensioni del pubblico, risultati di collaborazioni passate o conoscenze in comune: scrivi [DA COMPLETARE].
- Segnala la condivisione di contatti e dati come punto da concordare per iscritto, nel rispetto delle norme sulla privacy.
- Nessuna pressione e nessuna promessa vaga come "enorme visibilità".

Formato: verifica dell'affinità, una tabella dei formati, l'email, la scaletta della proposta.`,
      variabili: [
        { nome: "nostra_azienda", etichetta: "La nostra azienda", esempio: "studio di yoga con lezioni online" },
        { nome: "nostre_risorse", etichetta: "Pubblico e canali", esempio: "1.200 iscritti alla newsletter, Instagram locale attivo" },
        { nome: "partner", etichetta: "Potenziale partner", esempio: "caffetteria biologica del quartiere" },
        { nome: "affinita", etichetta: "Perché è adatto", esempio: "stesso pubblico locale, attento al benessere, abitudini mattutine" },
        { nome: "idea", etichetta: "Idea di collaborazione", esempio: "pacchetto lezione della domenica mattina più brunch" }
      ],
      consiglio: "Parti da un formato piccolo e a basso rischio: un primo test riuscito rende molto più facile accordarsi su una collaborazione più grande.",
      tecniche: ["Ruolo", "Due blocchi XML", "Verifica dell'affinità prima di scrivere", "Limite di parole"]
    }),
    p({
      id: "brand-dichiarazione-posizionamento",
      titolo: "Dichiarazione di posizionamento",
      descrizione: "Scrive e valuta dichiarazioni di posizionamento alternative, ognuna sostenuta da prove tratte dai tuoi dati.",
      testo: `Sei un brand strategist.

<dati>
Azienda e offerta: {offerta}
Cliente target: {target}
Alternative che il cliente valuta (compreso il non fare nulla): {alternative}
Cosa facciamo di diverso, con le prove: {differenze}
Parole dei clienti (da recensioni o interviste): {parole_clienti}
</dati>

Compito: scrivi una dichiarazione di posizionamento e mettila alla prova.

1. Riassumi in una frase il problema principale che il target vuole risolvere.
2. Scrivi 3 dichiarazioni di posizionamento alternative, ognuna in questa forma: per [target] che [bisogno], [brand] è il/la [categoria] che [beneficio principale], a differenza di [alternativa], perché [prova].
3. Dai a ciascuna un punteggio da 1 a 5 su chiarezza, differenza, credibilità e rilevanza, con una riga di motivazione per ogni punteggio.
4. Raccomandane una e spiega cosa significa in pratica: cosa dovremmo dire di più e cosa smettere di dire.
5. Scrivi una versione di 25 parole con le parole dei clienti.

Vincoli:
- Ogni beneficio deve essere sostenuto da una prova presente tra le differenze fornite; altrimenti segnalalo con [PROVA MANCANTE].
- Evita parole generiche (qualità, innovativo, passione) a meno che i dati non le rendano specifiche.

Formato: sezioni numerate, con le 3 dichiarazioni e i punteggi in una tabella.`,
      variabili: [
        { nome: "offerta", etichetta: "Azienda e offerta", esempio: "studio di consulenza contabile per ristoranti" },
        { nome: "target", etichetta: "Cliente target", esempio: "titolari di 1-3 ristoranti indipendenti" },
        { nome: "alternative", etichetta: "Alternative", esempio: "commercialista generalista, fai-da-te, servizi online economici" },
        { nome: "differenze", etichetta: "Differenze con prove", esempio: "report mensile sul food cost; 40 ristoranti clienti; un ex cuoco nel team" },
        { nome: "parole_clienti", etichetta: "Parole dei clienti", esempio: "(incolla qui frasi da recensioni o interviste)" }
      ],
      consiglio: "Prova la dichiarazione scelta con due o tre clienti veri: se non si riconoscono, torna alle loro parole.",
      tecniche: ["Ruolo", "Dati in tag XML", "Schema fisso", "Punteggi motivati"]
    }),
    p({
      id: "brand-naming",
      titolo: "Idee di nome per brand, prodotto o rebranding",
      descrizione: "Genera nomi candidati in stili diversi, li filtra per problemi linguistici ed elenca le verifiche da fare.",
      testo: `Sei un consulente di naming che lavora su {oggetto_naming}.

<brief>
Cos'è e a chi si rivolge: {descrizione}
Personalità (3-5 aggettivi): {personalita}
Nomi che ci piacciono o non ci piacciono, e perché: {riferimenti}
Mercati e lingue: {mercati}
Vincoli pratici (lunghezza, parole da evitare, dominio): {vincoli}
</brief>

Compito: genera e filtra i nomi candidati.

1. Proponi 15 nomi in almeno 4 stili: descrittivo, evocativo, inventato, composto, metafora.
2. Per ognuno indica: stile, significato o origine, come suona detto ad alta voce e un possibile payoff (massimo 6 parole).
3. Controlla ogni nome nelle lingue indicate per significati indesiderati, pronuncia difficile o grafia ambigua, e segnala quando non sei sicuro.
4. Seleziona una rosa di 5 e motiva la scelta rispetto alla personalità.

Vincoli:
- Non puoi verificare marchi, registro delle imprese, domini o profili social: per ogni nome della rosa scrivi "disponibilità da verificare" ed elenca i controlli necessari (ricerca di anteriorità del marchio nelle classi pertinenti, dominio, profili social, parere legale).
- Non proporre nomi di marchi noti già esistenti né loro leggere varianti.

Formato: una tabella dei 15 nomi, poi la rosa con le motivazioni e la checklist.`,
      variabili: [
        { nome: "oggetto_naming", etichetta: "Cosa va nominato", esempio: "il rebranding di una piccola web agency" },
        { nome: "descrizione", etichetta: "Cos'è e per chi", esempio: "siti web e manutenzione per artigiani e piccoli negozi" },
        { nome: "personalita", etichetta: "Personalità", esempio: "pratica, calorosa, affidabile, senza pretese" },
        { nome: "riferimenti", etichetta: "Nomi graditi / non graditi", esempio: "ci piacciono parole vere e brevi; non ci piacciono i nomi che finiscono in -ify o -ly" },
        { nome: "mercati", etichetta: "Mercati e lingue", esempio: "Italia e Germania; italiano, tedesco, inglese" },
        { nome: "vincoli", etichetta: "Vincoli pratici", esempio: "massimo 2 sillabe, facile da dettare al telefono" }
      ],
      consiglio: "Pronuncia i nomi della rosa al telefono con qualcuno: se non riesce a scriverli, ripensaci.",
      tecniche: ["Ruolo", "Brief in tag XML", "Prima divergere, poi convergere", "Limiti del modello dichiarati"]
    }),
    p({
      id: "analisi-risultati-test-ab",
      titolo: "Interpretare i risultati di un test A/B",
      descrizione: "Verifica se il risultato di un test A/B è affidabile e consiglia se applicarlo, continuare il test o scartarlo.",
      testo: `Sei un analista CRO che legge con attenzione i risultati dei test A/B.

<test>
Cosa è stato testato: {descrizione_test}
Ipotesi: {ipotesi}
Metrica principale: {metrica_principale}
Durata e date: {periodo_test}
Risultati per variante (visitatori, conversioni, altre metriche):
{risultati}
</test>

Compito: interpreta il test e consiglia una decisione.

1. Calcola il tasso di conversione di ogni variante e la differenza relativa, mostrando il calcolo.
2. Valuta se campione e durata bastano per fidarsi del risultato. Se i dati lo permettono, stima la significatività statistica e indica il metodo usato; altrimenti spiega cosa manca.
3. Cerca i segnali d'allarme: traffico diviso in modo molto squilibrato, test fermato in anticipo, festività o altre campagne nel periodo, metriche secondarie che vanno nella direzione opposta.
4. Consiglia: applicare, continuare a testare o scartare, con la motivazione.
5. Proponi il prossimo test che parta da ciò che abbiamo imparato.

Vincoli:
- Usa solo i numeri forniti; se un calcolo richiede dati che non hai, dillo invece di ipotizzarli.
- Tieni ben separato ciò che mostrano i dati dalla tua interpretazione.
- Consigliami di ricontrollare la significatività con lo strumento di test o con un calcolatore statistico.

Formato: una tabella dei risultati, poi sezioni numerate per i punti 2-5.`,
      variabili: [
        { nome: "descrizione_test", etichetta: "Cosa è stato testato", esempio: "modulo di checkout più corto (5 campi invece di 9)" },
        { nome: "ipotesi", etichetta: "Ipotesi", esempio: "meno campi aumenteranno gli ordini completati" },
        { nome: "metrica_principale", etichetta: "Metrica principale", esempio: "ordini completati / visitatori del checkout" },
        { nome: "periodo_test", etichetta: "Durata e date", esempio: "3 settimane, 1-21 ottobre" },
        { nome: "risultati", etichetta: "Risultati", esempio: "(incolla qui visitatori e conversioni per variante)" }
      ],
      consiglio: "Prima di lanciare il prossimo test, decidi e metti per iscritto metrica principale e durata minima.",
      tecniche: ["Ruolo", "Dati in tag XML", "Calcoli visibili", "Dati separati dall'interpretazione"]
    }),
    p({
      id: "analisi-feedback-aperti",
      titolo: "Analizzare feedback a risposta aperta",
      descrizione: "Raggruppa le risposte libere di sondaggi, recensioni o ticket in temi contati che rispondono a una domanda di business.",
      testo: `Sei un analista di ricerca che trasforma i feedback a risposta aperta in decisioni.

<feedback>
Fonte: {fonte}
Domanda posta, se c'era: {domanda}
Risposte:
{risposte}
</feedback>

Domanda di business: {domanda_business}

Compito: analizza i feedback.

1. Leggi tutte le risposte e definisci 5-8 temi, ognuno con un nome chiaro e una definizione di una riga.
2. Assegna ogni risposta a uno o più temi e conta le occorrenze; indica anche il sentiment (positivo, negativo, misto).
3. Per ogni tema, riporta parola per parola 2 risposte rappresentative.
4. Evidenzia i commenti sorprendenti o minoritari che potrebbero comunque contare.
5. Rispondi alla domanda di business partendo dai temi, ed elenca cosa questi dati non possono dirci.

Vincoli:
- Non inventare e non riformulare le citazioni; i conteggi devono corrispondere alle risposte incollate.
- Non trarre conclusioni statistiche da un campione piccolo o autoselezionato, e indica quante risposte hai analizzato.
- Elimina nomi, email o altri dati personali se compaiono nelle citazioni.

Formato: una tabella dei temi (tema, definizione, conteggio, sentiment), le citazioni, poi sezioni per i punti 4-5.`,
      variabili: [
        { nome: "fonte", etichetta: "Fonte", esempio: "commenti del sondaggio NPS dopo l'acquisto" },
        { nome: "domanda", etichetta: "Domanda posta", esempio: "Qual è il motivo principale del tuo voto?" },
        { nome: "risposte", etichetta: "Risposte", esempio: "(incolla qui le risposte, una per riga)" },
        { nome: "domanda_business", etichetta: "Domanda di business", esempio: "cosa dobbiamo sistemare per primo per ridurre i resi?" }
      ],
      consiglio: "Con più di qualche centinaio di risposte, dividile in blocchi e chiedi a Claude di unire i temi alla fine.",
      tecniche: ["Ruolo", "Dati in tag XML", "Codifica tematica", "Controllo privacy"]
    }),

    /* ===================== RIELABORATI DA FONTI CON LICENZA APERTA (approved 2026-11-19) ===================== */
    p({
      id: "seo-diagnosi-codice-html",
      titolo: "Controllo SEO rapido dal codice HTML di una pagina",
      descrizione: "Legge il codice sorgente di una pagina e segnala i pochi problemi tecnici che pesano davvero sulla visibilità nei motori di ricerca.",
      testo: `Sei un consulente SEO tecnico. Analizzerai il codice HTML di una sola pagina, non il sito online.

<contesto>
Attività: {attivita}
Mercato e lingua di riferimento: {mercato}
</contesto>

<codice_html>
{codice_html}
</codice_html>

Compito:
1. Elenca ciò che si vede davvero nel codice: indizi su CMS o framework, script di analytics o tag manager, title, meta description, canonical, meta robots, hreflang, viewport, struttura dei titoli, dati strutturati.
2. Scegli i 3 problemi con l'impatto maggiore sul traffico organico per questo mercato e per ognuno spiega in una frase l'impatto probabile.
3. Segnala un componente che sembra obsoleto o rischioso (per esempio una libreria molto vecchia), solo se è chiaramente visibile.
4. Indica una cosa che la pagina fa già bene, se c'è.

Vincoli:
- Ogni osservazione deve basarsi su una riga del codice: cita il tag o l'attributo.
- Non tirare a indovinare ciò che il codice non può mostrare (velocità, backlink, posizionamenti, dati di scansione): mettilo nell'elenco "Da verificare con altri strumenti".
- Non inventare dati di traffico o percentuali.

Formato: una breve tabella (problema | prova nel codice | impatto | correzione), poi l'elenco "Da verificare con altri strumenti". Massimo 250 parole fuori dalla tabella.`,
      variabili: [
        { nome: "attivita", etichetta: "Attività", esempio: "azienda B2B che produce valvole industriali" },
        { nome: "mercato", etichetta: "Mercato e lingua", esempio: "Germania, tedesco" },
        { nome: "codice_html", etichetta: "Codice HTML della pagina", esempio: "(incolla qui il sorgente: tasto destro > Visualizza sorgente pagina)" }
      ],
      consiglio: "Incolla il sorgente completo della home o di una landing importante; se la pagina è generata da JavaScript, incolla anche l'HTML renderizzato preso dall'ispettore del browser.",
      tecniche: ["Ruolo", "Documento in tag XML", "Passaggi numerati", "Citazioni a supporto", "Divieto di inventare dati"],
      modifiche: "Mantenuta l'idea della diagnosi rapida dal sorgente della home con massimo 3 problemi ad alto impatto e un componente obsoleto; eliminati il pubblico fisso (produttore cinese) e la chiusura commerciale, aggiunte variabili, l'obbligo di citare il codice, l'elenco di ciò che il sorgente non può dimostrare e il formato a tabella."
    }),
    p({
      id: "seo-parole-chiave-immagini-prodotto",
      titolo: "Parole chiave e testo alternativo da una foto prodotto",
      descrizione: "Guarda la foto di un prodotto e il suo titolo e restituisce parole chiave di ricerca, testo alternativo e una breve descrizione da catalogo.",
      testo: `Sei uno specialista di cataloghi e-commerce che scrive dati di prodotto facili da trovare con la ricerca.

<prodotto>
Titolo: {titolo_prodotto}
Categoria: {categoria}
Lingua del negozio: {lingua}
</prodotto>

Allego una foto del prodotto: {foto}

Compito:
1. Descrivi in una frase solo l'oggetto indicato nel titolo (ignora accessori e altri oggetti nella foto).
2. Indica 8-12 parole chiave di ricerca in minuscolo: tipo di oggetto, materiale, stile, colore, uso. Aggiungi materiale, stile o colore solo se si vedono chiaramente e caratterizzano l'oggetto.
3. Scrivi un testo alternativo (massimo 125 caratteri) che descriva l'immagine a chi non può vederla, senza riempirlo di parole chiave.
4. Scrivi una descrizione da catalogo di 40-60 parole, concreta e senza superlativi.

Vincoli:
- Se qualcosa non si vede nella foto (materiale esatto, misure, marca), non affermarlo: scrivi accanto "da confermare".
- Nessuna certificazione, misura o specifica tecnica inventata.

Formato: quattro sezioni con un'etichetta; le parole chiave come elenco separato da virgole.`,
      variabili: [
        { nome: "titolo_prodotto", etichetta: "Titolo del prodotto", esempio: "Tavolino in rovere con cassetto" },
        { nome: "categoria", etichetta: "Categoria", esempio: "mobili per il soggiorno" },
        { nome: "lingua", etichetta: "Lingua del negozio", esempio: "italiano" },
        { nome: "foto", etichetta: "Foto", esempio: "(allega l'immagine del prodotto alla chat)" }
      ],
      consiglio: "Usalo su più prodotti, uno alla volta e con le stesse impostazioni, poi chiedi a Claude di rendere coerenti le parole chiave di tutta la categoria.",
      tecniche: ["Ruolo", "Contesto in tag XML", "Passaggi numerati", "Limiti di lunghezza", "Divieto di inventare dati"],
      modifiche: "Uniti in un solo prompt i due system prompt del notebook (tag e descrizione, pensati per l'arredamento) e resi validi per qualsiasi prodotto; aggiunti testo alternativo, limiti di parole e caratteri, un blocco di contesto con variabili e la regola \"da confermare\" per i dettagli non visibili."
    }),
    p({
      id: "brief-format-podcast",
      titolo: "Format ripetibile per podcast o serie video",
      descrizione: "Progetta la struttura standard di una puntata, le rubriche fisse e la presentazione del programma prima di registrare.",
      testo: `Sei un producer di podcast e serie video per i brand.

<programma>
Nicchia e argomento: {nicchia}
Conduttore e sua esperienza: {conduttore}
A chi si rivolge: {pubblico}
Atmosfera desiderata: {atmosfera}
Obiettivo di business del programma: {obiettivo}
Durata della puntata: {durata}
</programma>

Compito: progetta un format di puntata ripetibile.

1. Scaletta della puntata: una timeline con i minutaggi (apertura a freddo, sigla, blocchi principali, invito all'azione, chiusura) che corrisponda alla durata.
2. Due rubriche fisse che rendano riconoscibile il programma, ognuna con nome, funzionamento e motivo per cui il pubblico la aspetterebbe.
3. Dove e come compare l'obiettivo di business (citazione, offerta, invito all'azione) senza trasformare il programma in una pubblicità.
4. Tre idee di nome e una presentazione di 2 frasi per le piattaforme di podcast o video.
5. Cinque argomenti per le prime puntate adatti al format.

Vincoli:
- Non affermare che i nomi siano liberi o inutilizzati: scrivi "verificare la disponibilità".
- Mantieni il format realistico per un solo conduttore senza squadra di produzione, salvo diversa indicazione.

Formato: un titolo per ogni punto; la scaletta come tabella (minuto | blocco | cosa succede).`,
      variabili: [
        { nome: "nicchia", etichetta: "Nicchia e argomento", esempio: "cucina di casa con le verdure di stagione" },
        { nome: "conduttore", etichetta: "Conduttore", esempio: "titolare di una scuola di cucina con 15 anni di insegnamento" },
        { nome: "pubblico", etichetta: "Pubblico", esempio: "genitori indaffarati che vogliono cene sane e veloci" },
        { nome: "atmosfera", etichetta: "Atmosfera", esempio: "calda, pratica, un po' ironica" },
        { nome: "obiettivo", etichetta: "Obiettivo di business", esempio: "riempire i corsi di cucina online" },
        { nome: "durata", etichetta: "Durata della puntata", esempio: "25 minuti" }
      ],
      consiglio: "Scelto il format, chiedi a Claude di trasformare la scaletta in una checklist riutilizzabile per preparare ogni puntata.",
      tecniche: ["Ruolo", "Contesto in tag XML", "Passaggi numerati", "Collegamento a obiettivo di business", "Struttura fissa"],
      modifiche: "Mantenute la scaletta con minutaggi, le due rubriche fisse e le idee di nome e presentazione; eliminate le parti su sound design e attrezzatura, estesa alle serie video, aggiunti pubblico, obiettivo di business e durata, argomenti per le prime puntate e il divieto di dichiarare liberi i nomi."
    }),
    p({
      id: "copy-articolo-con-competenza",
      titolo: "Bozza di articolo che lascia spazio alla tua competenza",
      descrizione: "Scrive un articolo SEO facile da scorrere e segna i punti in cui solo la tua esperienza reale può aggiungere valore.",
      testo: `Sei un redattore che lavora insieme a esperti della materia.

<brief>
Argomento: {argomento}
Parola chiave principale: {parola_chiave}
Lettore: {lettore}
Invito all'azione finale: {invito_azione}
Note dell'esperto (esperienza, opinioni, casi): {note_esperto}
</brief>

Compito: scrivi la bozza dell'articolo.

1. Inizia con un title (massimo 60 caratteri) e una meta description (massimo 155 caratteri).
2. Apri con un aggancio che nomini il problema o la domanda del lettore. Niente aperture generiche come "Al giorno d'oggi".
3. Usa titoli H2 e H3 descrittivi, paragrafi di massimo 3-4 frasi ed elenchi puntati dove aiutano la lettura veloce.
4. Costruisci almeno una sezione sulle note dell'esperto: l'idea controintuitiva, il metodo o il consiglio che un articolo generico non avrebbe.
5. Usa la parola chiave e le sue varianti naturali dove stanno bene; non forzarle mai.
6. Chiudi con una breve conclusione e l'invito all'azione.

Vincoli:
- Usa solo fatti presenti nelle note o di conoscenza comune. Dove servirebbe un numero, un caso o una citazione che non ti ho dato, scrivi [CONTRIBUTO ESPERTO: cosa serve] invece di inventarlo.
- Tono sicuro e colloquiale, senza enfasi pubblicitaria.

Formato: l'articolo in Markdown, poi l'elenco di tutti i segnaposto [CONTRIBUTO ESPERTO].`,
      variabili: [
        { nome: "argomento", etichetta: "Argomento", esempio: "scegliere la scarpa da corsa con il piede piatto" },
        { nome: "parola_chiave", etichetta: "Parola chiave principale", esempio: "scarpe running piede piatto" },
        { nome: "lettore", etichetta: "Lettore", esempio: "runner principianti con dolore al ginocchio" },
        { nome: "invito_azione", etichetta: "Invito all'azione", esempio: "prenota un'analisi gratuita dell'appoggio in negozio" },
        { nome: "note_esperto", etichetta: "Note dell'esperto", esempio: "(appunti del fisioterapista del negozio)" }
      ],
      consiglio: "Più ricche sono le note dell'esperto, meno segnaposto otterrai: spesso basta trascrivere e incollare un vocale di dieci minuti.",
      tecniche: ["Ruolo", "Contesto in tag XML", "Passaggi numerati", "Segnaposto invece di dati inventati", "Limiti di lunghezza"],
      modifiche: "Mantenute le sei regole (aggancio, struttura scorrevole, intuizione da esperto, parola chiave naturale, invito all'azione, metadati in apertura); sostituita la richiesta di \"sembrare un veterano\" con note reali fornite dall'utente, aggiunti segnaposto [CONTRIBUTO ESPERTO] al posto di fatti inventati e un elenco finale delle lacune."
    }),
    p({
      id: "copy-titoli-hero",
      titolo: "Opzioni di titolo e sottotitolo per l'apertura di una landing",
      descrizione: "Propone dieci coppie H1 + H2 per la parte alta di una landing page, ognuna costruita su un angolo diverso.",
      testo: `Sei un copywriter specializzato in conversioni. Scrivi le prime due righe che un visitatore legge su una landing page.

<prodotto>
Nome: {nome_prodotto}
Che cos'è e cosa fa: {descrizione}
Caratteristiche principali: {caratteristiche}
Cliente ideale: {cliente}
</prodotto>

<esempi_di_stile>
{esempi}
</esempi_di_stile>

Compito:
1. Scrivi 10 coppie: un H1 (massimo 8 parole, breve e memorabile) e un H2 (massimo 25 parole, spiega cosa fa il prodotto e per chi).
2. Usa un angolo diverso per ogni coppia: risultato, problema eliminato, velocità, semplicità, identità, confronto con il vecchio modo, curiosità, numeri che ti ho dato, obiezione superata, caso d'uso.
3. Dopo ogni coppia indica l'angolo in 2-3 parole.
4. Consiglia le 3 coppie più adatte al cliente ideale, con una frase di motivazione ciascuna.

Vincoli:
- Usa gli esempi di stile solo per ritmo e lunghezza, non copiarne mai le parole.
- Nessuna affermazione non supportata dalla descrizione o dalle caratteristiche (niente "n. 1", "il migliore", numeri inventati).

Formato: elenco numerato "H1 / H2 / angolo", poi i 3 consigli.`,
      variabili: [
        { nome: "nome_prodotto", etichetta: "Nome del prodotto", esempio: "Rondò" },
        { nome: "descrizione", etichetta: "Descrizione", esempio: "app che pianifica i pasti della settimana con quello che hai già in frigo" },
        { nome: "caratteristiche", etichetta: "Caratteristiche principali", esempio: "scansione del frigo, ricette in 20 minuti, lista della spesa automatica" },
        { nome: "cliente", etichetta: "Cliente ideale", esempio: "coppie che lavorano a tempo pieno e sprecano cibo" },
        { nome: "esempi", etichetta: "Esempi di titoli che ti piacciono", esempio: "Progetta. Pubblica. Fatto. / Smetti di rifare i tuoi progetti da zero." }
      ],
      consiglio: "Metti alla prova le due coppie migliori sulla pagina reale: un test A/B sul solo titolo è uno degli esperimenti più semplici da fare.",
      tecniche: ["Ruolo", "Contesto in tag XML", "Esempi (few-shot)", "Varietà di angoli", "Limiti di lunghezza", "Divieto di inventare dati"],
      modifiche: "Mantenuto il passaggio \"dieci opzioni H1/H2 con esempi di stile\"; eliminati lo schizzo del prodotto e l'output JSON, resi gli esempi una variabile, aggiunti limiti di parole, dieci angoli obbligatori, i consigli finali e il divieto di affermazioni non supportate."
    }),
    p({
      id: "copy-descrizione-per-persona",
      titolo: "Una descrizione prodotto per ogni buyer persona",
      descrizione: "Riscrive la stessa descrizione di prodotto per buyer persona diverse senza cambiare i fatti.",
      testo: `Sei un copywriter e-commerce che personalizza le schede prodotto.

<descrizione_prodotto>
{descrizione_prodotto}
</descrizione_prodotto>

<persona>
{persona}
</persona>

Compito:
1. Per ogni persona scegli i 2-3 fatti del prodotto che contano di più per lei e spiega il perché in una riga.
2. Scrivi una versione della descrizione per ogni persona ({lunghezza}), con le sue parole, partendo da ciò che le interessa.
3. Dai a ogni versione un breve titolo.
4. Chiudi con una tabella: persona | fatti usati | beneficio principale | tono.

Vincoli:
- Ogni versione deve contenere solo fatti presenti nella descrizione originale. Non aggiungere caratteristiche, materiali, numeri o garanzie.
- Non chiamare la persona con un nome inventato e non citare l'etichetta della persona nel testo: chi legge non deve sentirsi profilato.
- Mantieni il tono del brand: {tono_brand}.

Formato: una sezione per persona (titolo, descrizione), poi la tabella.`,
      variabili: [
        { nome: "descrizione_prodotto", etichetta: "Descrizione originale", esempio: "(incolla la descrizione attuale con tutte le specifiche)" },
        { nome: "persona", etichetta: "Buyer persona", esempio: "1) escursionista del fine settimana, attento al prezzo; 2) chi viaggia per lavoro e prende l'aereo ogni settimana" },
        { nome: "lunghezza", etichetta: "Lunghezza di ogni versione", esempio: "60-80 parole" },
        { nome: "tono_brand", etichetta: "Tono del brand", esempio: "pratico, cordiale, senza punti esclamativi" }
      ],
      consiglio: "Usa queste versioni per email segmentate o annunci che portano alla stessa pagina; se il tuo negozio lo consente, provale come varianti di pagina per fonte di traffico.",
      tecniche: ["Ruolo", "Documento in tag XML", "Passaggi numerati", "Divieto di aggiungere dati", "Tabella di confronto"],
      modifiche: "Mantenuta l'idea centrale di adattare una descrizione prodotto a ogni persona; eliminati la pipeline con database vettoriale e l'istruzione di usare il nome della persona nel testo, aggiunti la selezione dei fatti, il divieto di fatti nuovi, il tono del brand e una tabella riassuntiva."
    }),
    p({
      id: "ads-controllo-policy-creativita",
      titolo: "Controllo preventivo di un annuncio rispetto a una policy",
      descrizione: "Verifica testo e targeting di un annuncio rispetto a una policy pubblicitaria, clausola per clausola, prima di inviarlo.",
      testo: `Sei un revisore di campagne pubblicitarie. Controlli gli annunci rispetto a una policy scritta prima che vengano inviati.

<policy>
{policy}
</policy>

<annuncio>
Canale e posizionamento: {canale}
Testo dell'annuncio e testo visibile: {testo_annuncio}
Descrizione dell'immagine o del video: {visual}
Targeting (età, aree, pubblici): {targeting}
Categoria di prodotto: {categoria_prodotto}
</annuncio>

Compito:
1. Scorri la policy clausola per clausola e per ogni clausola pertinente decidi: conforme, da revisione manuale o non conforme.
2. Per ogni "da revisione" o "non conforme" cita la clausola e le parole esatte o l'impostazione dell'annuncio che la fanno scattare.
3. Considera i dati di targeting mancanti come il caso più restrittivo (per esempio, età minima non impostata = tutte le età).
4. Suggerisci la modifica più piccola che renderebbe l'annuncio conforme, mantenendo il messaggio.
5. Elenca le clausole che non puoi valutare con le informazioni date.

Vincoli:
- Usa solo il testo della policy che ti ho dato, non quello che ricordi delle regole delle piattaforme. Se non ti ho dato una policy, dillo e fermati.
- È un controllo preventivo, non una consulenza legale: scrivilo in una riga alla fine.

Formato: una tabella (clausola | esito | prova | correzione suggerita), poi un giudizio complessivo: pronto, pronto dopo le correzioni, oppure da non inviare.`,
      variabili: [
        { nome: "policy", etichetta: "Policy pubblicitaria", esempio: "(incolla il testo della policy della piattaforma o del cliente)" },
        { nome: "canale", etichetta: "Canale e posizionamento", esempio: "Meta, Storie di Instagram" },
        { nome: "testo_annuncio", etichetta: "Testo dell'annuncio", esempio: "Perdi 5 kg in 2 settimane, garantito!" },
        { nome: "visual", etichetta: "Immagine o video", esempio: "foto prima/dopo del girovita di una donna" },
        { nome: "targeting", etichetta: "Targeting", esempio: "donne 18-45, tutta Italia, età minima non impostata nel gruppo di inserzioni" },
        { nome: "categoria_prodotto", etichetta: "Categoria di prodotto", esempio: "integratore alimentare" }
      ],
      consiglio: "Tieni in un documento la versione aggiornata della policy di ogni piattaforma e incolla la sezione pertinente: le regole cambiano spesso e Claude non deve affidarsi alla memoria.",
      tecniche: ["Ruolo", "Documento in tag XML", "Controllo clausola per clausola", "Citazioni a supporto", "Limite alle fonti fornite"],
      modifiche: "La fonte è la policy di un circuito pubblicitario fittizio usata per una pipeline di moderazione automatica; ne abbiamo trasformato la logica (esiti per clausola, revisione o rifiuto, età mancante = tutte le età) in un unico prompt per chi pubblica gli annunci, valido per qualsiasi policy fornita dall'utente, con citazione delle prove e correzioni minime. Nessun testo della policy è riutilizzato."
    }),
    p({
      id: "ads-annuncio-da-foto",
      titolo: "Annuncio social da una foto prodotto",
      descrizione: "Trasforma la foto di un prodotto e pochi dati in brevi varianti di annuncio social, ognuna legata a ciò che mostra l'immagine.",
      testo: `Sei un copywriter di annunci social orientati ai risultati.

<brief>
Prodotto: {prodotto}
Dati chiave (prezzo, offerta, consegna, ecc.): {dati}
Pubblico: {pubblico}
Piattaforma e formato: {piattaforma}
Obiettivo dell'annuncio: {obiettivo}
</brief>

Allego la foto che verrà usata nell'annuncio: {foto}

Compito:
1. Descrivi in 2 righe cosa mostra la foto e cosa nota per primo chi la guarda.
2. Scrivi 4 varianti di annuncio. Ognuna ha: testo principale (massimo 125 caratteri prima del taglio "altro"), titolo (massimo 40 caratteri), pulsante di invito all'azione suggerito.
3. Collega ogni variante all'immagine: il testo deve completare la foto, non ripeterla.
4. Indica quale variante metteresti in test per prima contro quale e cosa ci direbbe il test.

Vincoli:
- Usa solo i dati del brief e ciò che si vede nella foto. Nessuno sconto, recensione o numero inventato.
- Se la foto ha un problema per l'annuncio (troppo testo, prodotto poco visibile, proporzioni sbagliate per il formato), dillo per prima cosa.

Formato: varianti numerate, poi il suggerimento di test.`,
      variabili: [
        { nome: "prodotto", etichetta: "Prodotto", esempio: "giacca da viaggio ripiegabile" },
        { nome: "dati", etichetta: "Dati chiave", esempio: "pesa 280 g, si chiude nella sua tasca, reso gratuito" },
        { nome: "pubblico", etichetta: "Pubblico", esempio: "chi viaggia solo con il bagaglio a mano" },
        { nome: "piattaforma", etichetta: "Piattaforma e formato", esempio: "feed di Facebook, immagine 1:1" },
        { nome: "obiettivo", etichetta: "Obiettivo", esempio: "visite alla pagina prodotto" },
        { nome: "foto", etichetta: "Foto", esempio: "(allega l'immagine dell'annuncio alla chat)" }
      ],
      consiglio: "Prima di pubblicare controlla i limiti di testo attuali della piattaforma: cambiano e variano a seconda del posizionamento.",
      tecniche: ["Ruolo", "Contesto in tag XML", "Immagine come input", "Limiti di lunghezza", "Divieto di inventare dati", "Piano di test A/B"],
      modifiche: "Un'istruzione di una riga (\"Scrivi un breve annuncio Facebook su questa foto prodotto\") è diventata un brief completo: dati del prodotto, pubblico, piattaforma e obiettivo, controllo dell'immagine, quattro varianti con limiti di caratteri, un suggerimento di test e il divieto di offerte inventate."
    }),
    p({
      id: "email-audit-programma",
      titolo: "Audit del programma di email marketing",
      descrizione: "Esamina come raccogli i contatti, segmenti, scrivi e misuri le email e restituisce un piano di miglioramento con priorità.",
      testo: `Sei un consulente di email marketing per piccole e medie imprese.

<programma>
Attività e prodotto: {attivita}
Dimensione della lista e modalità di raccolta dei contatti: {lista}
Email inviate oggi (tipi e frequenza): {email_attuali}
Segmenti in uso: {segmenti}
Metriche recenti (aperture, clic, conversioni, disiscrizioni, rimbalzi): {metriche}
Obiettivo principale del prossimo trimestre: {obiettivo}
</programma>

Compito: esegui un audit del programma in cinque aree e indica cosa cambiare.

1. Pubblico e raccolta contatti: fonti di iscrizione, consenso, segmentazione.
2. Contenuti: oggetti, tono, struttura, chiarezza dell'invito all'azione, leggibilità da smartphone.
3. Prestazioni: frequenza, orari, abitudine ai test A/B.
4. Misurazione: quali metriche si seguono e come si collegano a vendite o contatti.
5. Miglioramento continuo: come i risultati diventano modifiche.

Per ogni area indica: cosa funziona, cosa manca e 1-3 azioni concrete.

Vincoli:
- Valuta le metriche solo rispetto ai miei dati passati o ai riferimenti che ti fornisco. Non citare medie di settore o statistiche a memoria.
- Se mancano dati su un'area, indica cosa raccogliere invece di fare supposizioni.
- Segnala eventuali problemi di consenso o privacy che noti (per esempio contatti aggiunti senza iscrizione), senza dare consulenza legale.

Formato: una tabella per area (funziona | manca | azioni), poi le 5 azioni con il maggiore impatto sull'obiettivo, in ordine di impegno (da basso ad alto).`,
      variabili: [
        { nome: "attivita", etichetta: "Attività e prodotto", esempio: "negozio online di cosmetici biologici" },
        { nome: "lista", etichetta: "Dimensione e fonti della lista", esempio: "4.200 contatti; iscrizione al checkout e popup con il 10%" },
        { nome: "email_attuali", etichetta: "Email inviate oggi", esempio: "newsletter promozionale settimanale, carrello abbandonato (1 email)" },
        { nome: "segmenti", etichetta: "Segmenti", esempio: "nessuno" },
        { nome: "metriche", etichetta: "Metriche recenti", esempio: "(incolla gli ultimi 3 mesi dal tuo strumento di email)" },
        { nome: "obiettivo", etichetta: "Obiettivo", esempio: "più acquisti ripetuti" }
      ],
      consiglio: "Esporta come tabella il report delle campagne dal tuo strumento di email e incollalo nelle metriche: così Claude può individuare le tendenze per tipo di email.",
      tecniche: ["Ruolo", "Contesto in tag XML", "Struttura fissa", "Divieto di inventare dati", "Gestione delle informazioni mancanti", "Priorità per impegno"],
      modifiche: "L'originale è una guida generica passo per passo (pubblico, contenuti, prestazioni, misurazione, aggiustamenti) che cita anche una statistica sulle aperture da mobile; abbiamo mantenuto le cinque aree ma trasformato la guida in un audit del programma reale dell'utente, tolto la statistica, vietato i riferimenti a memoria e aggiunto il controllo del consenso e un elenco di azioni ordinate per impegno."
    }),
    p({
      id: "email-annuncio-aumento-prezzi",
      titolo: "Piano di aumento prezzi ed email ai clienti",
      descrizione: "Aiuta una piccola attività a dimensionare un aumento di prezzo e a scrivere l'annuncio per ogni tipo di cliente.",
      testo: `Sei un consulente che aiuta le piccole attività a comunicare i prezzi.

<attivita>
Cosa vendo e prezzi attuali: {offerta_prezzi}
Aumenti dei costi (cosa e di quanto): {aumenti_costi}
Tipi di clienti (occasionali, abituali, abbonati, clienti chiave): {tipi_clienti}
Ultimo cambio di prezzo e reazione dei clienti: {ultimo_cambio}
Preavvisi o condizioni contrattuali da rispettare: {vincoli}
</attivita>

Compito:
1. Numeri: dai dati sopra, mostra il margine perso e tre opzioni di aumento (prudente, obiettivo, ambiziosa) con il nuovo prezzo arrotondato a una cifra sensata. Per ciascuna calcola quanti clienti potrei perdere prima che l'aumento smetta di convenire. Mostra la formula.
2. Struttura: indica se aumentare tutto, solo alcune voci, oppure tramite un nuovo pacchetto o un supplemento, e quale opzione appare più giusta.
3. Chi riceve cosa: suggerisci se mantenere per un periodo i vecchi prezzi ai clienti fedeli o con contratto e chi merita una telefonata personale.
4. Tempi: proponi una data e un preavviso coerenti con i miei vincoli.
5. Messaggi: scrivi l'email di annuncio per i clienti abituali, la versione per abbonati o clienti con contratto e una breve risposta a un cliente che si lamenta.

Vincoli:
- Se manca un numero per i calcoli, chiedimelo invece di ipotizzarlo.
- Nelle email: tono semplice, cordiale e sicuro; spiega il motivo con onestà; non scusarti più di una volta; niente motivazioni inventate o urgenza finta.
- Non dare consulenza legale sui preavvisi: ricordami di verificare i contratti e le norme locali.

Formato: sezioni 1-5 con titoli; i calcoli in una tabella; le email pronte da copiare, con l'oggetto.`,
      variabili: [
        { nome: "offerta_prezzi", etichetta: "Cosa vendi e prezzi", esempio: "toelettatura cani: taglia piccola 35 euro, taglia grande 55 euro" },
        { nome: "aumenti_costi", etichetta: "Aumenti dei costi", esempio: "affitto +12%, prodotti +18%, energia +20%" },
        { nome: "tipi_clienti", etichetta: "Tipi di clienti", esempio: "circa 300 abituali ogni 6-8 settimane, 40 abbonamenti mensili" },
        { nome: "ultimo_cambio", etichetta: "Ultimo cambio di prezzo", esempio: "2 anni fa, +5 euro, due lamentele, nessuno se n'è andato" },
        { nome: "vincoli", etichetta: "Preavvisi e contratti", esempio: "gli abbonamenti richiedono 30 giorni di preavviso" }
      ],
      consiglio: "Inserisci numeri reali su costi e clienti: il calcolo di quanti clienti puoi permetterti di perdere è la parte che rende più facile decidere.",
      tecniche: ["Ruolo", "Contesto in tag XML", "Passaggi numerati", "Calcoli visibili", "Domande se mancano dati", "Messaggi per segmento"],
      modifiche: "L'originale funziona come un'intervista che pone sei domande e poi procede passo per passo; l'abbiamo condensato in un unico brief da compilare con variabili, mantenendo i passaggi (numeri, struttura, segmenti, tempi, messaggi), e abbiamo aggiunto formule visibili, il divieto di urgenza finta o motivi inventati e il promemoria che non è consulenza legale."
    }),
    p({
      id: "social-brief-influencer",
      titolo: "Brief per una campagna con influencer",
      descrizione: "Prepara il brief da inviare ai creator: obiettivo, profilo da cercare, requisiti dei contenuti, regole e misurazione.",
      testo: `Sei un social media manager che gestisce campagne con i creator.

<campagna>
Brand e prodotto: {brand_prodotto}
Obiettivo della campagna: {obiettivo}
Pubblico di riferimento: {pubblico}
Piattaforme: {piattaforme}
Budget indicativo e tipo di compenso: {budget}
Regole del brand e cose da evitare: {regole_brand}
</campagna>

Compito: scrivi il brief da inviare ai creator e le mie note interne.

1. Profilo di creator da cercare: nicchia, affinità con il pubblico, stile dei contenuti, segnali di coinvolgimento autentico da verificare (senza inventare soglie di follower come regole).
2. Il brief per il creator: contesto in 3 righe, il messaggio chiave, 3 idee di contenuto che può adattare con la sua voce, elementi obbligatori (prodotto visibile, link o codice, indicazione di pubblicità), cosa non è consentito.
3. Consegne e tempi: formati per piattaforma, numero di contenuti, passaggio di approvazione, finestra di pubblicazione.
4. Misurazione: cosa monitoreremo e cosa chiederemo al creator di condividere (screenshot degli insight, clic sul link, utilizzi del codice).

Vincoli:
- Richiedi sempre un'indicazione chiara di contenuto pubblicitario, come prevedono la piattaforma e le norme locali; non suggerire di nascondere la collaborazione.
- Non promettere risultati e non fare nomi di creator specifici.
- Lascia libertà creativa: niente copioni completi, salvo mia richiesta.

Formato: sezione "Note interne" (punti 1 e 4), poi sezione "Brief per il creator" (punti 2 e 3) scritta in modo da poterla inviare così com'è.`,
      variabili: [
        { nome: "brand_prodotto", etichetta: "Brand e prodotto", esempio: "nuova linea athleisure in tessuto riciclato" },
        { nome: "obiettivo", etichetta: "Obiettivo della campagna", esempio: "notorietà e prime vendite con un codice sconto" },
        { nome: "pubblico", etichetta: "Pubblico", esempio: "donne 25-40 che praticano yoga e pilates" },
        { nome: "piattaforme", etichetta: "Piattaforme", esempio: "Instagram e TikTok" },
        { nome: "budget", etichetta: "Budget e compenso", esempio: "contenuto; prodotto omaggio più compenso fisso per micro-creator" },
        { nome: "regole_brand", etichetta: "Regole del brand", esempio: "niente corpi prima/dopo, niente discorsi sulle diete" }
      ],
      consiglio: "Prima di inviarlo, chiedi a Claude di rileggere il brief dal punto di vista del creator: cosa spingerebbe un buon creator a dire di no?",
      tecniche: ["Ruolo", "Contesto in tag XML", "Passaggi numerati", "Vincoli espliciti", "Output interno ed esterno separati"],
      modifiche: "L'originale chiede al modello di interpretare un influencer che crea una campagna su Instagram; abbiamo spostato il punto di vista sul brand che lavora con i creator e l'abbiamo trasformato in un brief strutturato con profilo del creator, consegne, obbligo di indicare la pubblicità e misurazione."
    }),
    p({
      id: "social-post-linkedin-con-domande",
      titolo: "Post LinkedIn che parte dalle domande",
      descrizione: "Prima ti fa alcune domande mirate, poi scrive un post LinkedIn con righe brevi e un intento chiaro.",
      testo: `Sei un ghostwriter LinkedIn per professionisti e piccole aziende.

<post>
Argomento: {argomento}
Angolo o focus: {angolo}
Intento del post: {intento}
Chi dovrebbe leggerlo: {lettore}
Autore (ruolo, azienda): {autore}
</post>

Prima di scrivere, fammi al massimo 4 domande per ottenere una storia, un esempio o un'opinione reale che solo io posso dare. Aspetta le mie risposte.

Poi:
1. Scrivi il post: una prima riga che fermi lo scorrimento, righe brevi (7-12 parole), spazio tra le idee, massimo {max_parole} parole.
2. Costruiscilo sulle mie risposte, non su consigli generici.
3. Chiudi con una domanda o un invito all'azione adatto all'intento.
4. Proponi 2 prime righe alternative.

Vincoli:
- Nessun aneddoto, numero o cliente inventato: se le mie risposte sono povere, dimmi cosa manca.
- Massimo 3 hashtag, solo se pertinenti; niente muri di emoji.

Formato: prima le domande; dopo le mie risposte, il post pronto da copiare, poi le prime righe alternative.`,
      variabili: [
        { nome: "argomento", etichetta: "Argomento", esempio: "restare energici con un lavoro da scrivania" },
        { nome: "angolo", etichetta: "Angolo", esempio: "piccole abitudini su cibo e orari, non allenamenti in palestra" },
        { nome: "intento", etichetta: "Intento", esempio: "formazione / promozione / ispirazione / notizia / consigli" },
        { nome: "lettore", etichetta: "Lettore", esempio: "office manager e HR di aziende medie" },
        { nome: "autore", etichetta: "Autore", esempio: "nutrizionista che tiene workshop aziendali" },
        { nome: "max_parole", etichetta: "Numero massimo di parole", esempio: "250" }
      ],
      consiglio: "Rispondi alle domande a voce e incolla la trascrizione: le risposte parlate contengono spesso le frasi più naturali per il post.",
      tecniche: ["Ruolo", "Contesto in tag XML", "Domande di chiarimento prima", "Limite al numero di domande", "Limiti di lunghezza", "Divieto di inventare dati"],
      modifiche: "Mantenuti argomento, focus, elenco degli intenti, regola delle righe brevi, limite di parole e l'invito a fare domande di approfondimento; rese le domande obbligatorie e limitate a 4, aggiunti lettore e autore, il divieto di aneddoti inventati, il limite agli hashtag e le prime righe alternative."
    }),
    p({
      id: "calendario-stagionale-servizi-locali",
      titolo: "Calendario social stagionale per un'attività di servizi locali",
      descrizione: "Pianifica un trimestre di contenuti social intorno ai picchi di domanda di un'attività di servizi locale, con formati e didascalie.",
      testo: `Sei un pianificatore di contenuti social per attività di servizi locali (artigiani, riparazioni, pulizie, disinfestazioni, giardinaggio).

<attivita>
Servizio e zona servita: {servizio_zona}
Mesi da pianificare: {mesi}
Stagionalità della domanda (quando le chiamate aumentano e calano): {stagionalita}
Piattaforme e post a settimana: {piattaforme_frequenza}
Cosa possiamo filmare o fotografare: {materiale_disponibile}
Offerta o invito all'azione: {offerta}
</attivita>

Compito:
1. Dividi il periodo in fasi in base alla stagionalità (prima del picco, picco, dopo il picco) e dai a ogni fase un obiettivo di contenuto.
2. Costruisci un calendario settimanale: data, piattaforma, formato (reel, carosello, post foto, storia), argomento, obiettivo del post.
3. Alterna i contenuti: consigli utili di prevenzione, dietro le quinte, prima/dopo di lavori reali, domande frequenti, recensioni già ricevute, offerte.
4. Scrivi la didascalia dei post delle prime 2 settimane, con 3-5 hashtag ciascuna (locali più tematici).

Vincoli:
- Non inventare recensioni, risultati o numeri di interventi: segnali come "[usa una recensione reale]" o "[serve una foto reale]".
- Evita i contenuti che le piattaforme limitano spesso: niente immagini crude di infestanti, ferite o danni; niente messaggi basati sulla paura; niente promesse sulla salute.
- Rispetta la privacy dei clienti: niente indirizzi o volti senza consenso.

Formato: tabella delle fasi, poi la tabella del calendario, poi le didascalie.`,
      variabili: [
        { nome: "servizio_zona", etichetta: "Servizio e zona", esempio: "disinfestazioni, Bologna e provincia" },
        { nome: "mesi", etichetta: "Mesi da pianificare", esempio: "da marzo a maggio" },
        { nome: "stagionalita", etichetta: "Stagionalità", esempio: "formiche e vespe da aprile, picco a giugno" },
        { nome: "piattaforme_frequenza", etichetta: "Piattaforme e frequenza", esempio: "Facebook e Instagram, 3 post a settimana" },
        { nome: "materiale_disponibile", etichetta: "Materiale disponibile", esempio: "video col telefono durante i lavori, il furgone, i tecnici" },
        { nome: "offerta", etichetta: "Offerta o invito all'azione", esempio: "sopralluogo gratuito per prenotazioni entro il 30 aprile" }
      ],
      consiglio: "Descrivi la stagionalità usando il registro delle chiamate o delle prenotazioni dell'anno scorso: i picchi reali rendono il calendario molto più utile delle supposizioni.",
      tecniche: ["Ruolo", "Contesto in tag XML", "Pianificazione per fasi", "Segnaposto invece di dati inventati", "Vincoli espliciti"],
      modifiche: "L'originale è una richiesta breve e informale di un calendario di un mese per una ditta di disinfestazione, con didascalie e hashtag \"che non vengano limitati\"; l'abbiamo esteso a qualsiasi servizio locale, organizzato per fasi di domanda stagionale e trasformato il timore delle limitazioni in regole esplicite sui contenuti, con segnaposto per recensioni e foto reali."
    }),
    p({
      id: "persona-insight-da-intervista",
      titolo: "Insight documentati da un'intervista al cliente",
      descrizione: "Trasforma la trascrizione di un'intervista in bisogni, problemi, fattori scatenanti e obiezioni, ognuno supportato da una citazione testuale.",
      testo: `Sei un ricercatore che studia i clienti. Trasformi le trascrizioni delle interviste in insight di cui un team marketing può fidarsi.

<contesto>
Prodotto o idea: {prodotto}
Obiettivo della ricerca: {obiettivo_ricerca}
</contesto>

<trascrizione>
{trascrizione}
</trascrizione>

Compito:
1. Descrivi come la persona risolve oggi il problema: passaggi, strumenti, persone coinvolte, tempo o denaro spesi.
2. Estrai: compiti da svolgere (jobs to be done), problemi, risultati desiderati, fattori che l'hanno spinta a cercare una soluzione, timori o ostacoli al cambiamento.
3. Valuta ogni problema per frequenza e intensità (bassa, media, alta), solo in base a quanto dice la trascrizione, con una frase di motivazione.
4. Elenca le parole esatte con cui la persona descrive il problema: sono materia prima per i testi.
5. Segnala le domande suggestive fatte dall'intervistatore, perché le risposte a quelle domande sono prove più deboli.

Vincoli:
- Ogni insight deve citare almeno una breve citazione testuale (meno di 40 parole). Non inventare, unire o ritoccare le citazioni. Se gli appunti sono parafrasati, indicalo con "parafrasi".
- Separa ciò che la persona ha detto o fatto dalla tua interpretazione.
- Considera "lo userei / potrei pagare" come ipotesi, più deboli dei comportamenti passati.
- Sostituisci nomi di persone, aziende e luoghi con segnaposto come [PERSONA_1].

Formato: sezioni 1-5 con tabelle (insight | citazione | tipo: fatto o interpretazione), poi 3 domande aperte per la prossima intervista.`,
      variabili: [
        { nome: "prodotto", etichetta: "Prodotto o idea", esempio: "software di prenotazione per piccoli studi di fisioterapia" },
        { nome: "obiettivo_ricerca", etichetta: "Obiettivo della ricerca", esempio: "perché gli studi abbandonano l'agenda cartacea e cosa li frena" },
        { nome: "trascrizione", etichetta: "Trascrizione", esempio: "(incolla la trascrizione completa o appunti dettagliati)" }
      ],
      consiglio: "Usalo su ogni intervista separatamente con lo stesso prompt, poi incolla insieme tutti i risultati e chiedi a Claude gli schemi che ricorrono in almeno tre interviste.",
      tecniche: ["Ruolo", "Documento in tag XML", "Citazioni a supporto", "Distinzione fatti/ipotesi", "Anonimizzazione dei dati"],
      modifiche: "Mantenute le regole sulle prove (citazioni testuali sotto le 40 parole, comportamenti più delle ipotesi, segnalazione delle domande suggestive, anonimizzazione); sostituito lo schema JSON rigido pensato per i team di prodotto con tabelle leggibili per il marketing e aggiunte una sezione sul \"linguaggio del cliente\" per i testi e le domande per la prossima intervista."
    }),
    p({
      id: "persona-voce-cliente-da-chiamate",
      titolo: "La voce del cliente dalle trascrizioni delle chiamate",
      descrizione: "Riassume chiamate di vendita o assistenza in una struttura fissa: bisogno, obiezioni, segnali d'acquisto e azioni successive.",
      testo: `Sei un analista della clientela. Estrai dalle trascrizioni delle chiamate ciò che conta per marketing e vendite.

<contesto>
Azienda e prodotto: {azienda_prodotto}
Tipo di chiamata: {tipo_chiamata}
</contesto>

<trascrizione>
{trascrizione}
</trascrizione>

Prima di rispondere, analizza la trascrizione dentro i tag <thinking>: il bisogno principale, come si è conclusa la chiamata e cosa non è chiaro.

Poi fornisci un riepilogo con questi campi:
1. Bisogno del cliente: cosa voleva ottenere (massimo 100 caratteri).
2. Problema o domanda sollevata (massimo 100 caratteri).
3. Obiezioni o dubbi, con una breve citazione per ciascuno.
4. Segnali di acquisto o di rischio (abbandono, reclamo), con una breve citazione.
5. Parole usate dal cliente per descrivere la sua situazione.
6. Esito della chiamata e azioni successive necessarie (sì/no, quali).
7. Ambiguità: punti vaghi o contraddittori nella conversazione.

Vincoli:
- Elimina i dati personali: nomi, numeri di telefono, indirizzi email, indirizzi.
- Se la chiamata non è pertinente (numero sbagliato, chiamata vuota), dillo e non compilare i campi.
- Non dedurre emozioni o intenzioni che le parole della trascrizione non sostengono.

Formato: i campi come elenco dentro i tag <summary>, così da poter confrontare molte chiamate.`,
      variabili: [
        { nome: "azienda_prodotto", etichetta: "Azienda e prodotto", esempio: "dispositivi per la casa intelligente, termostato e serrature" },
        { nome: "tipo_chiamata", etichetta: "Tipo di chiamata", esempio: "assistenza / demo commerciale / richiesta di disdetta" },
        { nome: "trascrizione", etichetta: "Trascrizione", esempio: "(incolla la trascrizione della chiamata)" }
      ],
      consiglio: "Dopo 20-30 chiamate, incolla tutti i riepiloghi e chiedi a Claude di raggruppare obiezioni e parole dei clienti per frequenza: ottieni la materia prima per FAQ, annunci e landing page.",
      tecniche: ["Ruolo", "Documento in tag XML", "Ragionamento prima della risposta", "Struttura fissa", "Limiti di lunghezza", "Anonimizzazione dei dati"],
      modifiche: "Mantenuta la struttura del prompt finale della lezione (trascrizione in tag XML, analisi preliminare in <thinking>, campi da 100 caratteri, rimozione dei dati personali, elenco delle ambiguità, gestione delle chiamate non pertinenti); spostati i campi dalla risoluzione del problema agli insight di marketing (obiezioni, segnali d'acquisto, parole del cliente) e sostituito l'output JSON con campi in tag."
    }),
    p({
      id: "competitor-sintesi-documento",
      titolo: "Sintesi strutturata di un documento di un concorrente",
      descrizione: "Riassume un documento lungo di un concorrente (report, catalogo, condizioni, pagina prezzi) sempre nelle stesse sezioni.",
      testo: `Sei un analista di mercato noto per sintesi accurate e ordinate.

<contesto>
La nostra azienda e la nostra offerta: {nostra_azienda}
Concorrente: {concorrente}
Tipo di documento: {tipo_documento}
</contesto>

<documento>
{documento}
</documento>

<sintesi_di_esempio>
{sintesi_esempio}
</sintesi_di_esempio>

Compito: riassumi il documento in queste sezioni, in quest'ordine:
1. Offerta: prodotti, piani o servizi descritti.
2. Prezzi e condizioni: prezzi, sconti, vincoli contrattuali, garanzie, esattamente come sono scritti.
3. Clienti target e casi d'uso citati.
4. Affermazioni e prove: cosa dichiarano e quali prove mostrano.
5. Novità rispetto a ciò che è comune sul mercato, solo se il documento lo dice.
6. Cosa significa per noi: 3 punti, indicati chiaramente come interpretazione.

Vincoli:
- Le sezioni 1-5 devono contenere solo informazioni presenti nel documento; riporta i numeri esattamente. Se una sezione non ha contenuto, scrivi "non presente nel documento".
- Se c'è la sintesi di esempio, seguine il livello di dettaglio e lo stile, non il contenuto.
- Nessuna introduzione.

Formato: racchiudi tutta la risposta nei tag <summary>, con un titolo per sezione.`,
      variabili: [
        { nome: "nostra_azienda", etichetta: "La nostra azienda e offerta", esempio: "rete regionale di coworking, postazioni flessibili e sale riunioni" },
        { nome: "concorrente", etichetta: "Concorrente", esempio: "una catena nazionale di coworking" },
        { nome: "tipo_documento", etichetta: "Tipo di documento", esempio: "pagina prezzi e condizioni di abbonamento" },
        { nome: "documento", etichetta: "Testo del documento", esempio: "(incolla il testo del documento)" },
        { nome: "sintesi_esempio", etichetta: "Esempio di buona sintesi (facoltativo)", esempio: "(incolla una sintesi che ti è piaciuta, oppure scrivi: nessuna)" }
      ],
      consiglio: "Riassumi con questo prompt lo stesso tipo di documento per ogni concorrente: le sezioni fisse rendono facile affiancare le sintesi in un'unica tabella.",
      tecniche: ["Ruolo", "Documento in tag XML", "Struttura fissa", "Esempi (few-shot)", "Distinzione fatti/ipotesi", "Limite alle fonti fornite"],
      modifiche: "La guida riassume contratti di sublocazione con il ruolo di analista legale, sintesi di esempio e output nei tag <summary>; abbiamo mantenuto l'approccio ruolo più esempi e l'output in tag, sostituito l'ambito legale con i documenti dei concorrenti, definito sezioni di marketing e separato i fatti del documento dalla nostra interpretazione."
    }),
    p({
      id: "competitor-perche-converte",
      titolo: "Perché la landing page di un concorrente converte",
      descrizione: "Analizza a ritroso la pagina di un concorrente: promessa, motivazioni, gerarchia, prove, attriti e cosa puoi imparare.",
      testo: `Sei uno stratega di UX e conversioni. Analizzi la pagina di un concorrente per imparare, non per copiare.

<contesto>
Il nostro prodotto e l'obiettivo della nostra pagina: {nostra_pagina}
URL o nome della pagina del concorrente: {pagina_concorrente}
</contesto>

<contenuto_pagina>
{contenuto_pagina}
</contenuto_pagina>

Analizza la pagina in quest'ordine:
1. Chiarezza del valore: qual è la promessa principale che il visitatore coglie nei primi 3-5 secondi? È specifica e orientata al risultato?
2. Motivazioni principali: su quali leve punta la pagina (desiderio, paura di perdere, controllo, sollievo, appartenenza)? Ordina le 2 principali con le prove.
3. Gerarchia: cosa si vede per primo, quanto è evidente e chiaro l'invito all'azione principale, in che ordine arrivano le informazioni.
4. Percorso di conversione: aggancio, coinvolgimento, momento dell'impegno.
5. Fiducia: elementi di prova (recensioni, numeri, loghi, garanzie) e come viene ridotto il rischio.
6. Attriti: punti confusi, informazioni mancanti, sovraccarico.

Poi:
7. Elenca 3-5 idee da testare sulla nostra pagina, adattate al nostro prodotto, e 2 cose da NON copiare, con il motivo.

Vincoli:
- Basa ogni punto sul contenuto della pagina che ho incollato (o sullo screenshot); se qualcosa non si vede, scrivi "non visibile".
- Non riprodurre i loro testi nelle nostre idee: descrivi il principio.
- Non stimare il loro tasso di conversione o il loro traffico.

Formato: sintesi in 3-4 righe, poi sezioni 1-7 con punti elenco brevi.`,
      variabili: [
        { nome: "nostra_pagina", etichetta: "Il nostro prodotto e obiettivo", esempio: "app per imparare le lingue, iscrizioni alla prova gratuita" },
        { nome: "pagina_concorrente", etichetta: "Pagina del concorrente", esempio: "pagina prezzi del concorrente" },
        { nome: "contenuto_pagina", etichetta: "Contenuto della pagina", esempio: "(incolla il testo della pagina in ordine, oppure allega uno screenshot a pagina intera)" }
      ],
      consiglio: "Uno screenshot a pagina intera più il testo incollato danno il risultato migliore: lo screenshot mostra la gerarchia, il testo evita errori di lettura.",
      tecniche: ["Ruolo", "Documento in tag XML", "Passaggi numerati", "Citazioni a supporto", "Vincoli espliciti"],
      modifiche: "Mantenuta la sequenza di analisi (chiarezza del valore, leve umane in classifica, gerarchia visiva, flusso di conversione, fiducia, attriti); inquadrata come analisi dei concorrenti, unite le \"meccaniche nascoste\" al punto sulle leve, aggiunti il contesto della nostra pagina, l'obbligo di prove, il divieto di copiare e una sezione finale con idee da testare e cose da non copiare."
    }),
    p({
      id: "strategia-concept-campagna",
      titolo: "Concept di campagna pubblicitaria",
      descrizione: "Sviluppa il concept di una campagna: pubblico, messaggio chiave, proposte di slogan, mix di canali e attività di supporto.",
      testo: `Sei uno stratega pubblicitario.

<brief>
Prodotto o servizio: {prodotto}
Pubblico di riferimento: {pubblico}
Obiettivo della campagna: {obiettivo}
Budget indicativo: {budget}
Periodo: {periodo}
Cosa sappiamo del pubblico (ricerche, dati, feedback): {insight}
</brief>

Compito: sviluppa un concept di campagna.

1. Pubblico: a chi parliamo esattamente, cosa desidera e cosa lo frena, in base agli insight forniti.
2. Idea centrale: l'idea della campagna in una frase e perché dovrebbe funzionare con questo pubblico.
3. Messaggi chiave: un messaggio principale e 3 messaggi di supporto, ognuno collegato a un bisogno.
4. Slogan: 5 proposte, con l'angolo di ciascuna.
5. Canali: il mix di canali con il ruolo di ciascuno (notorietà, considerazione, conversione) e una ripartizione indicativa del budget in percentuale, con la motivazione.
6. Attività di supporto: eventi, collaborazioni, ufficio stampa, punto vendita o contenuti che rafforzano l'idea.
7. Misurazione: un KPI principale e 2-3 KPI secondari, e come leggerli.

Vincoli:
- Dove gli insight non coprono qualcosa, indicalo come ipotesi da verificare.
- Non inventare dati di mercato, dimensioni del pubblico o risultati attesi.
- Rispetta le regole pubblicitarie della categoria (per esempio limiti di età per bevande energetiche o alcolici) e segnalale.

Formato: sezioni 1-7 con titoli; il mix di canali come tabella (canale | ruolo | % budget | motivo).`,
      variabili: [
        { nome: "prodotto", etichetta: "Prodotto o servizio", esempio: "nuova bevanda energetica a basso contenuto di zucchero" },
        { nome: "pubblico", etichetta: "Pubblico", esempio: "adulti 18-30 che studiano e lavorano" },
        { nome: "obiettivo", etichetta: "Obiettivo della campagna", esempio: "prova del prodotto nei primi 3 mesi dal lancio" },
        { nome: "budget", etichetta: "Budget indicativo", esempio: "50.000-70.000 euro" },
        { nome: "periodo", etichetta: "Periodo", esempio: "da settembre a novembre" },
        { nome: "insight", etichetta: "Insight sul pubblico", esempio: "sondaggio su 300 studenti: non amano l'immagine \"sport estremi\" delle bevande energetiche" }
      ],
      consiglio: "Chiedi due concept contrastanti in chat separate e poi chiedi a Claude di confrontarli punto per punto rispetto all'obiettivo.",
      tecniche: ["Ruolo", "Contesto in tag XML", "Passaggi numerati", "Distinzione fatti/ipotesi", "Divieto di inventare dati", "Tabella di confronto"],
      modifiche: "Mantenuti i quattro elementi dell'originale (pubblico, messaggi chiave e slogan, canali, attività aggiuntive) e il suo esempio della bevanda energetica come valori d'esempio; aggiunti un brief strutturato, l'idea centrale, la ripartizione del budget, i KPI, la marcatura delle ipotesi, il divieto di dati di mercato inventati e il richiamo alle regole pubblicitarie della categoria."
    }),
    p({
      id: "brand-identita-piccola-impresa",
      titolo: "Primi passi dell'identità di marca per una piccola impresa",
      descrizione: "Da valori, pubblico e settore propone posizionamento, tono di voce, direzioni visive e modi per distinguersi.",
      testo: `Sei un brand strategist che aiuta le piccole imprese a costruire un'identità chiara e memorabile con un budget ridotto.

<attivita>
Attività e cosa vende: {attivita}
Valori (con le parole del titolare): {valori}
Clienti target: {clienti}
Settore e concorrenti locali: {concorrenti}
Cosa dicono già di noi i clienti: {feedback_clienti}
</attivita>

Compito:
1. Posizionamento: una frase "Per [chi], [attività] è il/la [categoria] che [differenza], perché [motivo per crederci]", più 2 alternative.
2. Personalità: 3-4 tratti, ciascuno con "siamo / non siamo".
3. Tono di voce: come scriviamo in pratica, con 3 brevi esempi (l'inizio di un post social, la risposta a una recensione, un'insegna o un'etichetta).
4. Direzioni visive: 2 direzioni diverse descritte a parole (atmosfera, palette con nomi o codici esadecimali, stile dei caratteri, idea di logo). Descrivi, non disegnare.
5. Differenziazione: 3 modi per distinguersi dai concorrenti indicati, realistici per una piccola squadra.
6. Coerenza: 5 punti di contatto da aggiornare per primi e una checklist di una pagina per mantenere coerente il marchio.

Vincoli:
- Parti dai valori e dai feedback che ti ho dato; se sono in conflitto, dillo.
- Non affermare che un nome, uno slogan o un'idea di logo siano liberi: ricordami di verificare i marchi registrati.
- Niente parole vaghe come "innovativo" o "qualità" se non sono sostenute da qualcosa di concreto.

Formato: sezioni 1-6 con titoli; tutta la risposta sotto le 900 parole.`,
      variabili: [
        { nome: "attivita", etichetta: "Attività", esempio: "panificio di famiglia con due negozi, pane a lievitazione naturale e pasticceria" },
        { nome: "valori", etichetta: "Valori", esempio: "lievitazione lenta, farine locali, nessuna scorciatoia" },
        { nome: "clienti", etichetta: "Clienti target", esempio: "famiglie del quartiere e giovani professionisti" },
        { nome: "concorrenti", etichetta: "Settore e concorrenti", esempio: "due panetterie di supermercato e una catena di caffetterie alla moda" },
        { nome: "feedback_clienti", etichetta: "Feedback dei clienti", esempio: "le recensioni dicono \"il pane dura tutta la settimana\" e \"personale gentile\"" }
      ],
      consiglio: "Dai a Claude estratti di recensioni reali: il posizionamento più forte nasce spesso dalle parole che i clienti usano già.",
      tecniche: ["Ruolo", "Contesto in tag XML", "Passaggi numerati", "Modello da completare", "Limiti di lunghezza", "Segnalazione dei conflitti"],
      modifiche: "Mantenuti gli input (valori, pubblico, settore) e gli output (idee di logo, palette di colori, tono di voce, differenziazione, coerenza); trasformato il ruolo di un paragrafo in un brief strutturato, aggiunti un modello di posizionamento, i tratti di personalità, esempi di tono, i feedback dei clienti come input, il promemoria sui marchi e un limite di lunghezza."
    }),
    p({
      id: "brand-nomi-prodotto",
      titolo: "Idee di nome per un prodotto, con rosa finale",
      descrizione: "Genera nomi di prodotto vari a partire da una descrizione o da uno schizzo, poi li filtra secondo i tuoi criteri.",
      testo: `Sei uno specialista di naming e copywriter.

<prodotto>
Descrizione e caratteristiche principali: {descrizione}
A chi è destinato: {pubblico}
Personalità del brand: {personalita}
Mercati e lingue in cui sarà venduto: {mercati}
Nomi o parole da evitare: {da_evitare}
</prodotto>

Se allego uno schizzo o una foto, usali solo per capire il prodotto: {immagine}

Compito:
1. Scrivi 10 nomi usando stili diversi: descrittivo, evocativo, parola inventata, composto, metafora, parola di un'altra lingua, breve e giocoso, e così via. Indica lo stile di ciascuno.
2. Per ogni nome: una riga sull'idea e sui possibili problemi (pronuncia, significati indesiderati nelle lingue indicate, somiglianza con parole comuni).
3. Scegli una rosa di 3 secondo questi criteri: facile da dire e da scrivere, coerente con la personalità, distintivo nella categoria, adatto a tutti i mercati indicati.
4. Per la rosa finale, suggerisci un breve payoff per ciascuno.

Vincoli:
- Non affermare che un nome o un dominio sia libero o non registrato: verificherò io marchi e domini.
- Se non sei sicuro di un significato in un'altra lingua, dillo invece di tirare a indovinare.

Formato: una tabella (nome | stile | idea | possibili problemi), poi la rosa finale con motivazioni e payoff.`,
      variabili: [
        { nome: "descrizione", etichetta: "Descrizione e caratteristiche", esempio: "zaino con due piccole ventole elettriche per brevi voli sospesi (concept)" },
        { nome: "pubblico", etichetta: "A chi è destinato", esempio: "pendolari di città e appassionati di tecnologia" },
        { nome: "personalita", etichetta: "Personalità del brand", esempio: "audace, giocosa, un po' futuristica" },
        { nome: "mercati", etichetta: "Mercati e lingue", esempio: "Regno Unito, Italia, Germania" },
        { nome: "da_evitare", etichetta: "Nomi o parole da evitare", esempio: "qualsiasi cosa con \"jet\" o \"razzo\"" },
        { nome: "immagine", etichetta: "Schizzo o foto (facoltativo)", esempio: "(allega un'immagine, oppure scrivi: nessuna)" }
      ],
      consiglio: "Pronuncia ad alta voce ogni nome della rosa a cinque persone e chiedi loro di scriverlo: è il test reale più rapido.",
      tecniche: ["Ruolo", "Contesto in tag XML", "Varietà di stili", "Criteri di valutazione espliciti", "Divieto di inventare dati"],
      modifiche: "Il notebook chiede \"dieci nomi possibili, vari e interessanti\" partendo dallo schizzo di un prodotto; abbiamo mantenuto i dieci nomi vari e l'immagine facoltativa, aggiungendo gli stili di naming, un controllo dei rischi per ogni nome, i criteri per la rosa finale, i payoff e il divieto di dichiarare la disponibilità."
    }),
    p({
      id: "brand-linee-guida-scritte",
      titolo: "Linee guida di marca scritte per documenti e contenuti",
      descrizione: "Trasforma regole di marca sparse in una linea guida ordinata: identità, tono, frasi standard, formattazione e checklist finale.",
      testo: `Sei un brand manager che scrive linee guida di marca che le persone seguono davvero.

<materiale_brand>
{materiale_brand}
</materiale_brand>

<contesto>
Azienda e settore: {azienda}
Chi userà le linee guida: {utilizzatori}
Documenti e canali principali: {canali}
</contesto>

Compito: organizza il materiale in una linea guida con queste sezioni:
1. Identità del brand: nome, payoff, cosa facciamo, in massimo 5 righe.
2. Tono di voce: 3-5 principi, ciascuno con un esempio "scrivi così / non così".
3. Frasi standard: aperture, chiusure e inviti all'azione che riutilizziamo; parole che usiamo sempre o mai.
4. Basi visive: colori (nome, codice esadecimale), caratteri e gerarchia, regole sul logo, solo come indicato nel materiale.
5. Convenzioni di formattazione: numeri, valuta, date, percentuali, tabelle, titoli per i documenti e i canali indicati.
6. Elementi vietati.
7. Checklist prima della pubblicazione: 6-10 controlli sì/no.

Vincoli:
- Usa solo ciò che è nel materiale. Se una sezione non ha informazioni, scrivi "da definire" e suggerisci la decisione da prendere, indicandola come suggerimento.
- Se il materiale contiene contraddizioni (per esempio due blu diversi), elencale in una sezione finale "Da risolvere".
- Scrivi la linea guida in modo che si possa incollare in un Progetto di Claude o in un file di stile e riutilizzare come istruzioni.

Formato: Markdown con titoli per le sezioni 1-7, poi "Da risolvere".`,
      variabili: [
        { nome: "materiale_brand", etichetta: "Materiale di marca esistente", esempio: "(incolla vecchie linee guida, email con regole, note sul logo, esempi di testi approvati)" },
        { nome: "azienda", etichetta: "Azienda e settore", esempio: "società di servizi informatici per i Comuni" },
        { nome: "utilizzatori", etichetta: "Chi le userà", esempio: "commerciali, due persone del marketing, freelance esterni" },
        { nome: "canali", etichetta: "Documenti e canali", esempio: "offerte in Word, presentazioni, LinkedIn, newsletter" }
      ],
      consiglio: "Una volta approvata, salva la linea guida nelle istruzioni del tuo Progetto Claude: ogni nuovo testo partirà dalle stesse regole.",
      tecniche: ["Ruolo", "Documento in tag XML", "Elenco di sezioni richieste", "Divieto di aggiungere dati", "Segnalazione dei conflitti", "Checklist"],
      modifiche: "La fonte è una skill di esempio con le linee guida di un'azienda fittizia (colori, caratteri, tono, frasi standard, formati dei dati, elementi vietati, checklist di qualità); ne abbiamo ripreso solo la struttura delle sezioni, in un prompt che costruisce la linea guida dal materiale dell'utente, con lacune \"da definire\" e un elenco di contraddizioni. Nessun contenuto di marca della fonte è riutilizzato."
    }),
    p({
      id: "analisi-sentiment-recensioni",
      titolo: "Sentiment e temi nelle recensioni dei clienti",
      descrizione: "Valuta il sentiment di un gruppo di recensioni e le raggruppa per tema, con citazioni e azioni.",
      testo: `Sei un analista dei feedback dei clienti.

<contesto>
Attività e prodotto: {attivita}
Fonte delle recensioni e periodo: {fonte}
</contesto>

<recensioni>
{recensioni}
</recensioni>

Compito:
1. Per ogni recensione indica: numero, sentiment complessivo (positivo, negativo, neutro, misto) e intensità (debole o forte).
2. Raggruppa le recensioni per tema (per esempio qualità del prodotto, consegna, prezzo, personale, facilità d'uso). Per ogni tema: numero di recensioni, equilibrio del sentiment, una breve citazione rappresentativa.
3. Indica i 3 temi che incidono di più sulla soddisfazione e se si tratta di lodi o lamentele.
4. Suggerisci un'azione per tema e un modello di risposta per la lamentela più frequente.

Vincoli:
- Conta solo ciò che c'è nelle recensioni fornite; non estendere i risultati a tutti i clienti e non inventare percentuali sulla popolazione.
- Tratta con attenzione ironia e recensioni miste: se hai dubbi, segna la recensione come "incerta" e spiega perché.
- Le citazioni devono essere testuali e brevi.

Formato: prima la tabella per recensione (numero | sentiment | intensità | temi), poi la tabella dei temi, poi i 3 temi chiave, le azioni e il modello di risposta.`,
      variabili: [
        { nome: "attivita", etichetta: "Attività e prodotto", esempio: "pizzeria di quartiere con consegna a domicilio" },
        { nome: "fonte", etichetta: "Fonte e periodo", esempio: "recensioni Google, ultimi 6 mesi" },
        { nome: "recensioni", etichetta: "Recensioni", esempio: "(incolla le recensioni, una per riga, numerate)" }
      ],
      consiglio: "Numera le recensioni prima di incollarle: così è facile confrontare la tabella con gli originali.",
      tecniche: ["Ruolo", "Dati in tag XML", "Struttura fissa", "Citazioni a supporto", "Divieto di inventare dati", "Segnalazione dell'incertezza"],
      modifiche: "Il notebook assegna un sentiment positivo/negativo/neutro con intensità debole/forte a singole recensioni di ristoranti tramite uno schema JSON; abbiamo mantenuto l'idea di sentiment più intensità applicandola a un gruppo di recensioni, con la classe \"misto\", il raggruppamento per temi, le citazioni, le azioni, un modello di risposta e regole su ironia ed estrapolazioni."
    }),
    p({
      id: "analisi-valuta-testi-rubrica",
      titolo: "Valutare testi di marketing con una rubrica",
      descrizione: "Valuta una o più varianti di testo con una rubrica a punteggio ed esempi di riferimento, prima di testarle con utenti reali.",
      testo: `Sei un editor rigoroso che valuta testi di marketing con una rubrica.

<contesto>
Tipo di testo e canale: {tipo_testo}
Obiettivo del testo: {obiettivo}
Lettore: {lettore}
Fatti di partenza che il testo deve rispettare: {fatti}
</contesto>

<varianti>
{varianti}
</varianti>

<rubrica>
1. Chiarezza (1-5): 1 = il lettore non capisce cosa viene offerto; 3 = chiaro ma serve una seconda lettura; 5 = si capisce al primo sguardo.
2. Accuratezza (1-5): 1 = contiene affermazioni assenti dai fatti di partenza; 3 = piccole forzature; 5 = ogni affermazione corrisponde ai fatti.
3. Adeguatezza al lettore (1-5): 1 = lessico o tono sbagliati; 3 = generico; 5 = sembra scritto per questo lettore.
4. Invito all'azione (1-5): 1 = assente o vago; 3 = presente ma debole; 5 = un passo successivo chiaro e specifico.
{criteri_extra}
</rubrica>

<esempi_di_riferimento>
{esempi_riferimento}
</esempi_di_riferimento>

Compito:
1. Assegna a ogni variante un punteggio per ogni criterio, con una frase di motivazione che citi il testo.
2. Elenca le affermazioni non supportate dai fatti di partenza.
3. Ordina le varianti e indica il criterio più debole della vincitrice, con una correzione concreta.

Vincoli:
- Usa gli esempi di riferimento per calibrare i punteggi; se non ci sono, sii prudente (non dare 5 senza un motivo chiaro).
- Giudica solo il testo; non prevedere tassi di clic o di conversione.

Formato: una tabella (variante | chiarezza | accuratezza | adeguatezza | invito all'azione | extra | totale), poi le affermazioni non supportate, la classifica e la correzione.`,
      variabili: [
        { nome: "tipo_testo", etichetta: "Tipo di testo e canale", esempio: "email promozionale per clienti esistenti" },
        { nome: "obiettivo", etichetta: "Obiettivo", esempio: "prenotare il tagliando di primavera" },
        { nome: "lettore", etichetta: "Lettore", esempio: "chi ha comprato da noi una bici elettrica negli ultimi 2 anni" },
        { nome: "fatti", etichetta: "Fatti di partenza", esempio: "il tagliando costa 49 euro, dura 1 ora, posti dal 3 al 30 aprile" },
        { nome: "varianti", etichetta: "Varianti da valutare", esempio: "(incolla le varianti A, B, C)" },
        { nome: "criteri_extra", etichetta: "Criteri aggiuntivi (facoltativo)", esempio: "5. Tono del brand (1-5): 1 = fuori tono; 5 = rispetta le nostre linee guida" },
        { nome: "esempi_riferimento", etichetta: "Esempi di riferimento (facoltativo)", esempio: "(un testo passato da 5 e uno da 2, con i punteggi)" }
      ],
      consiglio: "Mantieni per mesi la stessa rubrica e gli stessi esempi di riferimento: i punteggi diventano confrontabili e vedi se i tuoi testi migliorano.",
      tecniche: ["Ruolo", "Contesto in tag XML", "Rubrica con livelli descritti", "Esempi (few-shot)", "Citazioni a supporto", "Divieto di inventare dati"],
      modifiche: "Il valutatore della lezione assegna punteggi 1-5 a sintesi di articoli per concisione, accuratezza e tono, con livelli descritti ed esempi; abbiamo mantenuto la rubrica 1-5 con livelli ed esempi ma sostituito i criteri con criteri di marketing (chiarezza, accuratezza rispetto ai fatti, adeguatezza al lettore, invito all'azione, criterio extra facoltativo), confrontato più varianti e aggiunto la ricerca di affermazioni non supportate e una classifica."
    }),
    p({
      id: "analisi-classifica-messaggi",
      titolo: "Classificare i messaggi in arrivo nelle tue categorie",
      descrizione: "Smista email, messaggi privati, moduli o commenti nelle categorie che definisci tu, per contarli e assegnarli.",
      testo: `Classifichi i messaggi in arrivo per un team di marketing e vendite.

<categorie>
{categorie}
</categorie>

<esempi>
{esempi}
</esempi>

<messaggi>
{messaggi}
</messaggi>

Compito:
1. Assegna ogni messaggio a una sola categoria dell'elenco. Usa le descrizioni delle categorie, non solo le etichette.
2. Se un messaggio non rientra in nessuna, usa "altro"; se rientra in due, scegli quella che decide chi deve rispondere e annota la seconda.
3. Indica un livello di fiducia (alto, medio, basso) e, se medio o basso, una riga di motivazione.
4. Alla fine conta i messaggi per categoria ed elenca le richieste ricorrenti che potrebbero meritare una nuova categoria.

Vincoli:
- Usa solo le categorie fornite; non inventarne di nuove nella classificazione.
- Non copiare dati personali (nomi, email, numeri di telefono) nel risultato: indica i messaggi con il loro numero.

Formato: una tabella (n. messaggio | categoria | seconda categoria | fiducia | motivo), poi i conteggi e i suggerimenti.`,
      variabili: [
        { nome: "categorie", etichetta: "Categorie con descrizioni", esempio: "Richiesta preventivo: chiede prezzi o un'offerta; Collaborazione: propone una partnership; Assistenza: problema con un ordine; Lavoro: candidatura o CV; Spam" },
        { nome: "esempi", etichetta: "Esempi classificati (facoltativo)", esempio: "\"Mi mandate un prezzo per 200 tazze con il nostro logo?\" -> Richiesta preventivo" },
        { nome: "messaggi", etichetta: "Messaggi", esempio: "(incolla i messaggi, numerati)" }
      ],
      consiglio: "Scrivi una breve descrizione per ogni categoria, non solo l'etichetta: nella guida di origine sono proprio descrizioni ed esempi a migliorare di più l'accuratezza.",
      tecniche: ["Categorie in tag XML", "Esempi (few-shot)", "Regola dell'etichetta unica", "Livelli di fiducia", "Anonimizzazione dei dati"],
      modifiche: "La guida classifica ticket di assistenza assicurativa in dieci categorie predefinite con descrizioni in tag XML, poi migliora l'accuratezza con esempi recuperati automaticamente; abbiamo mantenuto categorie con descrizioni ed esempi in tag XML, resi entrambi definibili dall'utente per le caselle di marketing e vendite, e aggiunto una regola per i casi doppi, livelli di fiducia, conteggi e suggerimenti di nuove categorie."
    })
  ];

  window.PROMPTS_IT = {};
  elenco.forEach(function (x) { window.PROMPTS_IT[x.id] = x; });
})();

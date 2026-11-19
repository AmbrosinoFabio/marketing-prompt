/* Prompt library — main version (English).
   The Italian translation is in data/prompts-it.js (same ids).

   All prompts here are ORIGINAL to this project (license CC BY-NC 4.0).
   They apply the techniques described in the official guides (role, context in XML
   tags, explicit constraints, output format, examples) without copying their text.

   Schema (field names are in Italian, like the rest of the code):
   - id          unique id, lowercase-with-dashes (shared with the translation)
   - categoria   id from data/categorie.js
   - titolo      short name
   - descrizione what it is for, in one sentence
   - testo       the prompt; variables are written {name}
   - variabili   [{ nome, etichetta, esempio }] one for every {name} in the text
   - consiglio   how to get better results
   - tecniche    prompting techniques used
   - tipo        "originale" (written here) or "adattato" (adapted from an openly licensed source)
   - fonte       { nome, url } — "Original" if written here; for adapted prompts also
                 { autore, licenza, licenzaUrl } of the ORIGINAL source
   - modifiche   adapted prompts only: what was changed compared with the source
   - licenza     license of the prompt text
   - revisione   date of last review (YYYY-MM-DD)

   Before adding a prompt, check it with: python tools/valida_prompt.py */
(function () {
  var ORIGINAL = { nome: "Original", url: "" };
  var LIC = "CC BY-NC 4.0";
  var REV = "2026-11-18";

  function p(o) {
    o.tipo = o.tipo || "originale"; // "originale" = written for this project, "adattato" = adapted from a licensed source
    o.fonte = o.fonte || ORIGINAL;
    o.licenza = o.licenza || LIC;
    o.revisione = o.revisione || REV;
    return o;
  }

  window.PROMPTS = [

    /* ===================== SEO ===================== */
    p({
      id: "seo-cluster-parole-chiave",
      categoria: "seo",
      titolo: "Keyword clusters for a topic",
      descrizione: "Turns a topic into keyword groups sorted by search intent, ready for planning pages.",
      testo: `You are an SEO consultant who knows the {market} market well.

<context>
Website: {website}
Main topic: {topic}
Audience: {audience}
</context>

Task: build a keyword map for the topic.

1. Propose 5-8 topic clusters.
2. For each cluster give: the main keyword, 5-10 related keywords (including questions and long-tail variants) and the dominant search intent (informational, commercial, transactional, navigational).
3. Suggest which type of page each cluster needs (article, guide, category page, product page, FAQ).
4. Flag clusters that risk competing with each other (cannibalization).

Constraints:
- Do not invent search volumes or difficulty scores: if they matter, write "check with an SEO tool".
- Use the words and phrases the audience would actually type into a search engine.

Format: one table per cluster, then a list of 3 priorities to start with, with the reason.`,
      variabili: [
        { nome: "market", etichetta: "Market / country", esempio: "UK" },
        { nome: "website", etichetta: "Website or business", esempio: "specialty coffee online shop" },
        { nome: "topic", etichetta: "Topic", esempio: "grinding coffee at home" },
        { nome: "audience", etichetta: "Audience", esempio: "beginner home baristas" }
      ],
      consiglio: "After the first answer, paste real search volumes from an SEO tool and ask Claude to re-rank the priorities.",
      tecniche: ["Role", "Context in XML tags", "Numbered steps", "Ban on invented data"]
    }),
    p({
      id: "seo-ottimizza-pagina",
      categoria: "seo",
      titolo: "On-page SEO review of a page",
      descrizione: "Analyzes the text of a page and proposes title tags, meta descriptions, headings and concrete fixes.",
      testo: `Act as an on-page SEO specialist.

Main keyword: {keyword}
Search intent: {intent}

<page>
{page_text}
</page>

Analyze the page and return:

1. Three title tag options (max 60 characters, keyword near the start).
2. Three meta description options (max 155 characters, with a call to action).
3. An improved H1-H2-H3 heading structure.
4. Audience questions the page does not answer yet.
5. The five most useful changes, ordered by impact, each with its reason.

Do not rewrite the whole page: say what to change and where. If the text does not match the search intent, say that first.`,
      variabili: [
        { nome: "keyword", etichetta: "Keyword", esempio: "online photography course" },
        { nome: "intent", etichetta: "Search intent", esempio: "commercial" },
        { nome: "page_text", etichetta: "Page text", esempio: "(paste the page text here)" }
      ],
      consiglio: "Paste the real page text, not a summary: the suggestions become much more precise.",
      tecniche: ["Role", "Document in XML tags", "Numbered format", "Length limits"]
    }),

    /* ===================== BRIEF ===================== */
    p({
      id: "brief-articolo",
      categoria: "brief",
      titolo: "Complete article brief",
      descrizione: "Prepares the brief for the writer: goal, outline, sources to look for and quality criteria.",
      testo: `You are a content strategist. Prepare the brief for an article.

<data>
Working title: {title}
Keyword: {keyword}
Audience: {audience}
Goal of the article: {goal}
Target length: {length}
</data>

The brief must include:
- The core idea of the article in one sentence.
- What the reader should know or do after reading.
- An outline with H2 and H3 headings, with 2-3 points to cover in each section.
- Frequently asked questions to include.
- Types of sources, data or examples to look for (do not invent specific sources).
- What to avoid (clichés, exaggerated promises, off-topic material).
- A final checklist of 6 quality checks.

Write it so that a copywriter who does not know the project can start right away.`,
      variabili: [
        { nome: "title", etichetta: "Working title", esempio: "How to choose a CRM for a small business" },
        { nome: "keyword", etichetta: "Keyword", esempio: "small business CRM" },
        { nome: "audience", etichetta: "Audience", esempio: "owners of companies with fewer than 10 employees" },
        { nome: "goal", etichetta: "Goal", esempio: "get sign-ups for the free trial" },
        { nome: "length", etichetta: "Length", esempio: "1,500 words" }
      ],
      consiglio: "Send the brief as the first message and ask for the article in a second one: Claude will follow the outline more carefully.",
      tecniche: ["Role", "Data in XML tags", "List of required sections", "Explicit target reader"]
    }),
    p({
      id: "brief-da-intervista",
      categoria: "brief",
      titolo: "Brief built from client questions",
      descrizione: "Instead of guessing, Claude asks you the right questions before writing the brief.",
      testo: `I need to prepare content about {topic} for {client}.

Before writing anything, ask me at most 8 questions to understand:
- goal and expected result;
- audience and how much they already know;
- tone of voice and things not to say;
- available proof (data, case studies, testimonials);
- format and publishing channel.

One question per line, numbered. Wait for my answers. Then prepare a one-page brief with: goal, key message, outline, call to action, points to verify.`,
      variabili: [
        { nome: "topic", etichetta: "Topic", esempio: "new same-day delivery service" },
        { nome: "client", etichetta: "Client / company", esempio: "a neighborhood bakery" }
      ],
      consiglio: "Great when you have little information: the questions prevent generic copy.",
      tecniche: ["Clarifying questions", "Two-step process", "Limit on number of questions"]
    }),

    /* ===================== COPY ===================== */
    p({
      id: "copy-pagina-prodotto",
      categoria: "copy",
      titolo: "Product page description",
      descrizione: "Writes a product description starting from features and turning them into benefits.",
      testo: `You are an e-commerce copywriter.

<product>
Name: {product}
Features: {features}
Price: {price}
</product>

<customer>
{customer}
</customer>

Tone of voice: {tone}

Write:
1. A headline (max 70 characters).
2. An opening paragraph of 2-3 sentences that starts from the customer's problem.
3. 5 bullet points: for each, the feature and the concrete benefit ("so you can…").
4. A "Who it's for / Who it's not for" section.
5. Three short answers to the most likely objections.

Use only the information provided: if an important detail is missing (size, materials, warranty), write [TO COMPLETE] instead of inventing it.`,
      variabili: [
        { nome: "product", etichetta: "Product", esempio: "waterproof 20 L city backpack" },
        { nome: "features", etichetta: "Features", esempio: "recycled fabric, 15\" laptop sleeve, YKK zips" },
        { nome: "price", etichetta: "Price", esempio: "€89" },
        { nome: "customer", etichetta: "Typical customer", esempio: "bike commuters who carry a laptop" },
        { nome: "tone", etichetta: "Tone", esempio: "direct and practical, no superlatives" }
      ],
      consiglio: "The [TO COMPLETE] placeholder shows you immediately what is missing, instead of invented facts hidden in the copy.",
      tecniche: ["Role", "Separate XML tags", "Fixed structure", "Placeholder for missing data"]
    }),
    p({
      id: "copy-riscrivi-pas",
      categoria: "copy",
      titolo: "Rewrite a text with the PAS formula",
      descrizione: "Rewrites existing copy with the Problem – Agitate – Solution formula and explains the choices.",
      testo: `Rewrite the text below using the PAS formula (Problem, Agitate, Solution).

<original_text>
{text}
</original_text>

Audience: {audience}
Maximum length: {length}

Rules:
- Keep all the true information from the original; do not add promises.
- Short sentences, one idea per sentence.
- End with a clear call to action: {cta}.

After the text, add a "What I changed" section with 3-5 points.`,
      variabili: [
        { nome: "text", etichetta: "Original text", esempio: "(paste the text here)" },
        { nome: "audience", etichetta: "Audience", esempio: "freelancers who get paid late" },
        { nome: "length", etichetta: "Maximum length", esempio: "150 words" },
        { nome: "cta", etichetta: "Call to action", esempio: "try it free for 14 days" }
      ],
      consiglio: "Also ask for a version using the AIDA formula and compare the two.",
      tecniche: ["Known copywriting formula", "Explicit constraints", "Explanation of changes"]
    }),

    /* ===================== ADS ===================== */
    p({
      id: "ads-google-rsa",
      categoria: "ads",
      titolo: "Google Ads headlines and descriptions (RSA)",
      descrizione: "Generates headlines and descriptions for responsive search ads, within the character limits.",
      testo: `You are a Google Ads specialist.

<offer>
Product/service: {offer}
Main benefit: {benefit}
Proof or guarantee: {proof}
Ad group keyword: {keyword}
</offer>

Create for a responsive search ad:
- 15 headlines, max 30 characters each;
- 4 descriptions, max 90 characters each.

Vary the angles: benefit, price/offer, social proof, honest urgency, question, exact keyword.
Show the character count next to each line.
No exclamation marks in headlines, no all caps, no claims you cannot prove ("the best", "#1").

Format: table with columns Text | Characters | Angle.`,
      variabili: [
        { nome: "offer", etichetta: "Offer", esempio: "online Spanish course for adults" },
        { nome: "benefit", etichetta: "Main benefit", esempio: "1:1 lessons at times you choose" },
        { nome: "proof", etichetta: "Proof / guarantee", esempio: "first lesson free" },
        { nome: "keyword", etichetta: "Keyword", esempio: "online spanish course" }
      ],
      consiglio: "Character counts can be slightly off: double-check them in the Google Ads editor before publishing.",
      tecniche: ["Role", "Numeric limits", "Required variety of angles", "Table output"]
    }),
    p({
      id: "ads-meta-varianti",
      categoria: "ads",
      titolo: "Meta ad variants for A/B testing",
      descrizione: "Writes Facebook and Instagram ad variants, each based on a different hypothesis to test.",
      testo: `Prepare an A/B test of Meta ads (Facebook and Instagram).

Product: {product}
Audience: {audience}
Campaign objective: {objective}

Create 4 variants. Each must test ONE different hypothesis (for example: pain vs desire, social proof vs technical fact, short copy vs story).

For each variant:
- Hypothesis: what we are testing, in one sentence.
- Primary text (max 125 characters before "See more").
- Headline (max 40 characters).
- Image or video idea in one line.
- Metric to watch to decide the winner.

Follow Meta's advertising policies: do not address the reader by directly referring to personal attributes (health, age, financial situation).`,
      variabili: [
        { nome: "product", etichetta: "Product", esempio: "app that teaches you to cook" },
        { nome: "audience", etichetta: "Audience", esempio: "students living away from home" },
        { nome: "objective", etichetta: "Objective", esempio: "app installs" }
      ],
      consiglio: "Test one variable at a time: if you change copy and image together you won't know what worked.",
      tecniche: ["Explicit hypotheses", "Repeated structure per variant", "Platform constraints"]
    }),

    /* ===================== EMAIL ===================== */
    p({
      id: "email-sequenza-benvenuto",
      categoria: "email",
      titolo: "Welcome sequence (5 emails)",
      descrizione: "Plans and writes an automated sequence for new newsletter subscribers.",
      testo: `You are an email marketing expert.

<context>
Company: {company}
What subscribers received: {lead_magnet}
Product to offer at the end: {product}
Tone: {tone}
</context>

Design a 5-email welcome sequence.

First write the map: for each email, the send day, the goal and the single call to action.
Then write the 5 emails. For each one:
- 3 subject line options (max 45 characters) and the preview text;
- the email body (max 180 words);
- the call to action.

Rules: one idea per email; explicit selling only from the fourth email; no fake urgency.`,
      variabili: [
        { nome: "company", etichetta: "Company", esempio: "yoga studio with online classes" },
        { nome: "lead_magnet", etichetta: "What subscribers get", esempio: "PDF guide to 10 poses for back pain" },
        { nome: "product", etichetta: "Final product", esempio: "monthly membership" },
        { nome: "tone", etichetta: "Tone", esempio: "warm, encouraging, informal" }
      ],
      consiglio: "Ask only for the map first, fix it, then have the emails written: you save time on revisions.",
      tecniche: ["Role", "Plan then write", "Length limits", "Content rules"]
    }),
    p({
      id: "email-oggetti",
      categoria: "email",
      titolo: "20 email subject lines to test",
      descrizione: "Generates newsletter subject lines grouped by style, with preview text, to choose what to test.",
      testo: `Here is the content of a newsletter:

<newsletter>
{content}
</newsletter>

Audience: {audience}

Write 20 possible subject lines, max 50 characters, grouped as: curiosity, direct benefit, question, number/list, personal.
For each subject line also write a preview text (max 90 characters) that completes it without repeating it.

Avoid typical spam words ("free!!!", "urgent", all caps) and subject lines that promise things not in the email.
At the end, name the 2 subject lines you would A/B test and why.`,
      variabili: [
        { nome: "content", etichetta: "Newsletter content", esempio: "(paste the text here)" },
        { nome: "audience", etichetta: "Audience", esempio: "customers of a bike shop" }
      ],
      consiglio: "Note which subject line wins each test and paste it into later prompts as an example.",
      tecniche: ["Document in XML tags", "Style groups", "Reasoned final choice"]
    }),

    /* ===================== SOCIAL ===================== */
    p({
      id: "social-carosello-instagram",
      categoria: "social",
      titolo: "Instagram / LinkedIn carousel",
      descrizione: "Turns an idea into a slide carousel with an opening hook and a closing call to action.",
      testo: `Create a carousel for {platform} on this topic: {topic}.

Audience: {audience}
Goal: {goal}

Structure:
- Slide 1: a hook of max 8 words that promises a clear benefit.
- Slides 2-7: one idea per slide, a title of max 6 words + text of max 25 words.
- Slide 8: summary in 3 points.
- Slide 9: call to action.

For each slide also suggest a simple visual (icon, chart, photo).
Then write the post caption (max 150 words) and 5-8 relevant hashtags, avoiding overly generic ones.`,
      variabili: [
        { nome: "platform", etichetta: "Platform", esempio: "LinkedIn" },
        { nome: "topic", etichetta: "Topic", esempio: "5 mistakes in website quotes" },
        { nome: "audience", etichetta: "Audience", esempio: "freelance web designers" },
        { nome: "goal", etichetta: "Goal", esempio: "saves and consultation requests" }
      ],
      consiglio: "Give Claude 2-3 of your best posts as style examples inside <examples> tags.",
      tecniche: ["Slide-by-slide structure", "Word limits", "Multiple outputs (slides + caption)"]
    }),
    p({
      id: "social-riuso-contenuto",
      categoria: "social",
      titolo: "One piece of content, five formats",
      descrizione: "Repurposes an article or video into posts for different channels, in each channel's own style.",
      testo: `Here is a piece of content I have already published:

<content>
{content}
</content>

Repurpose it for these channels: {channels}.

For each channel:
- pick the angle of the content that best suits that audience (do not summarize everything);
- respect the typical language and length of the channel;
- end with a call to action different from the other channels.

Keep this tone: {tone}. Do not add data or claims that are not in the original content.`,
      variabili: [
        { nome: "content", etichetta: "Original content", esempio: "(paste the article or transcript)" },
        { nome: "channels", etichetta: "Channels", esempio: "LinkedIn, Instagram, X, newsletter, TikTok (30 s script)" },
        { nome: "tone", etichetta: "Tone", esempio: "knowledgeable but approachable" }
      ],
      consiglio: "For videos, paste the transcript: Claude will pull out lines you can use as quotes.",
      tecniche: ["Document in XML tags", "Per-channel adaptation", "Ban on adding data"]
    }),

    /* ===================== CALENDAR ===================== */
    p({
      id: "calendario-mensile",
      categoria: "calendario",
      titolo: "One-month content calendar",
      descrizione: "Plans 4 weeks of content, balancing goals, formats and channels.",
      testo: `You are a social media manager. Create a 4-week content calendar.

<data>
Business: {business}
Channels: {channels}
Frequency: {frequency}
Goals for the month: {goals}
Key dates or events: {events}
</data>

Balance rules:
- about 40% useful content, 30% relationship/behind the scenes, 20% social proof, 10% direct selling;
- never publish the same format twice in a row on the same channel.

Format: table with columns Date | Channel | Format | Topic | Hook (one sentence) | Goal.
After the table, list the material to prepare in advance (photos, videos, testimonials).`,
      variabili: [
        { nome: "business", etichetta: "Business", esempio: "seafood restaurant in Lisbon" },
        { nome: "channels", etichetta: "Channels", esempio: "Instagram, Facebook, Google Business Profile" },
        { nome: "frequency", etichetta: "Frequency", esempio: "3 posts a week + daily stories" },
        { nome: "goals", etichetta: "Goals", esempio: "more lunch bookings" },
        { nome: "events", etichetta: "Dates / events", esempio: "Father's Day, new menu from the 15th" }
      ],
      consiglio: "Ask for the table as CSV so you can paste it into a spreadsheet.",
      tecniche: ["Role", "Data in XML tags", "Balance rules", "Table output"]
    }),
    p({
      id: "calendario-idee-pilastri",
      categoria: "calendario",
      titolo: "Content pillars and 30 ideas",
      descrizione: "Defines 4-5 recurring themes (pillars) for the brand and generates content ideas for each.",
      testo: `Help me define the content pillars for {brand}.

What we sell: {offer}
Audience: {audience}
What makes us different: {difference}

1. Propose 4-5 pillars: name, why the audience cares, how it connects the audience to the offer.
2. For each pillar write 6 content ideas, each with a working title and recommended format.
3. Mark with ★ the 5 ideas to produce first, explaining the choice in one line.`,
      variabili: [
        { nome: "brand", etichetta: "Brand", esempio: "a travel agency for families" },
        { nome: "offer", etichetta: "Offer", esempio: "holiday packages for families with toddlers" },
        { nome: "audience", etichetta: "Audience", esempio: "parents aged 30-45" },
        { nome: "difference", etichetta: "What sets you apart", esempio: "every hotel visited in person" }
      ],
      consiglio: "Save the pillars in My prompts and reuse them as context in every content request.",
      tecniche: ["Numbered steps", "Link to business goal", "Prioritization"]
    }),

    /* ===================== PERSONA ===================== */
    p({
      id: "persona-da-dati",
      categoria: "persona",
      titolo: "Buyer persona from real data",
      descrizione: "Builds a buyer persona from reviews, emails or interview notes that you paste in.",
      testo: `You are a marketing researcher. Analyze the material below (reviews, customer emails, interview notes).

<material>
{material}
</material>

Product: {product}

Build 1-2 buyer personas based ONLY on what the material shows:
- situation and goals;
- problems and frustrations (with verbatim quotes from the material);
- what makes them decide and what holds them back;
- words and phrases they use;
- where they look for information.

For each statement, mark whether it is "supported by the material" or "hypothesis to verify".
End with 3 questions to ask in the next interviews to fill the gaps.`,
      variabili: [
        { nome: "material", etichetta: "Material", esempio: "(paste reviews or notes)" },
        { nome: "product", etichetta: "Product", esempio: "invoicing software for tradespeople" }
      ],
      consiglio: "The more real material you paste (even 50 reviews), the more concrete and less stereotyped the persona.",
      tecniche: ["Role", "Document in XML tags", "Supporting quotes", "Facts vs hypotheses"]
    }),
    p({
      id: "persona-jobs-to-be-done",
      categoria: "persona",
      titolo: "Jobs-to-be-Done map",
      descrizione: "Describes the 'job' customers want done and the path that leads them to choose you.",
      testo: `Use the Jobs-to-be-Done method to analyze people who buy {product}.

Context: {context}

Describe:
1. The main (functional) job, in one sentence like "When…, I want to…, so I can…".
2. The related emotional and social jobs.
3. The moment that triggers the search for a solution.
4. The alternatives the customer considers (including "do nothing").
5. The forces at play: push, pull, anxiety, habit.
6. Three marketing messages that come out of this analysis.

Clearly flag what is a deduction and what should be checked with real customers.`,
      variabili: [
        { nome: "product", etichetta: "Product", esempio: "a paper planner for teachers" },
        { nome: "context", etichetta: "Context", esempio: "sold online, €25, peak in September" }
      ],
      consiglio: "Pair it with 'Buyer persona from real data' to check the deductions.",
      tecniche: ["Known framework", "Numbered steps", "Facts vs hypotheses"]
    }),

    /* ===================== COMPETITORS ===================== */
    p({
      id: "competitor-confronto-messaggi",
      categoria: "competitor",
      titolo: "Competitor messaging comparison",
      descrizione: "Compares competitors' website copy and finds the open positioning space.",
      testo: `You are a positioning analyst. I am pasting the home page copy of some competitors.

<competitor name="{competitor_1}">
{text_1}
</competitor>
<competitor name="{competitor_2}">
{text_2}
</competitor>

Our product: {our_product}

Analyze:
1. For each competitor: main promise, audience they speak to, proof used, tone.
2. A comparison table with these rows.
3. The messages everyone uses (which therefore do not differentiate us).
4. Two or three positioning spaces nobody occupies that fit our product.

Base everything only on the texts provided; do not guess prices or market share.`,
      variabili: [
        { nome: "competitor_1", etichetta: "Competitor 1", esempio: "Alpha" },
        { nome: "text_1", etichetta: "Competitor 1 copy", esempio: "(paste the home page text)" },
        { nome: "competitor_2", etichetta: "Competitor 2", esempio: "Beta" },
        { nome: "text_2", etichetta: "Competitor 2 copy", esempio: "(paste the home page text)" },
        { nome: "our_product", etichetta: "Our product", esempio: "gym management software" }
      ],
      consiglio: "Add more <competitor> blocks if you have more than two: the structure works the same way.",
      tecniche: ["Multiple documents in XML tags with attributes", "Comparison table", "Limited to provided sources"]
    }),
    p({
      id: "competitor-swot",
      categoria: "competitor",
      titolo: "Reasoned SWOT analysis",
      descrizione: "Builds a SWOT from your information and turns it into concrete actions.",
      testo: `Prepare a SWOT analysis for {company}.

<information>
{information}
</information>

1. Fill in strengths, weaknesses, opportunities and threats (max 5 items each), using only the information provided.
2. Cross the quadrants:
   - strengths × opportunities: what to exploit now;
   - weaknesses × threats: what to protect.
3. Propose 5 marketing actions for the next 90 days, each with a goal and a success metric.

If the information is not enough for a quadrant, say so and state what you would need to know.`,
      variabili: [
        { nome: "company", etichetta: "Company", esempio: "an independent bookshop" },
        { nome: "information", etichetta: "Information", esempio: "(customers, strengths, nearby competitors, sales data…)" }
      ],
      consiglio: "If you provide a lot of information, ask Claude to reason step by step before the final table.",
      tecniche: ["Known framework", "Cross-analysis", "Measurable actions", "Handling missing information"]
    }),

    /* ===================== STRATEGY ===================== */
    p({
      id: "strategia-piano-lancio",
      categoria: "strategia",
      titolo: "Product launch plan",
      descrizione: "Prepares a three-phase launch plan with channels, activities and metrics.",
      testo: `You are a marketing manager. Prepare the launch plan for {product}.

<constraints>
Launch date: {date}
Budget: {budget}
Available team: {team}
Channels already active: {channels}
</constraints>

Organize the plan in three phases: pre-launch (4 weeks), launch (1 week), post-launch (4 weeks).
For each phase give:
- goal;
- main activities with channel and owner;
- indicative budget split;
- 2-3 metrics to track.

Treat the constraints realistically: if the budget or team is not enough for something, propose a simpler alternative instead of ignoring it.
End with the 3 main risks and how to reduce them.`,
      variabili: [
        { nome: "product", etichetta: "Product", esempio: "new line of solid cosmetics" },
        { nome: "date", etichetta: "Launch date", esempio: "1 March" },
        { nome: "budget", etichetta: "Budget", esempio: "€3,000" },
        { nome: "team", etichetta: "Team", esempio: "1 part-time person + the founder" },
        { nome: "channels", etichetta: "Active channels", esempio: "Instagram (4k followers), newsletter (800 subscribers)" }
      ],
      consiglio: "The more precise the constraints, the less generic the plan.",
      tecniche: ["Role", "Constraints in XML tags", "Phase structure", "Risk analysis"]
    }),
    p({
      id: "strategia-obiettivi-smart",
      categoria: "strategia",
      titolo: "From a vague goal to SMART goals",
      descrizione: "Turns a generic wish ('more sales') into measurable goals with metrics.",
      testo: `My marketing goal is: "{goal}".

Current situation: {situation}

1. Rewrite the goal as 2-3 SMART goals (specific, measurable, achievable, relevant, time-bound).
2. For each one: main metric, supporting metrics, where it is measured (e.g. Google Analytics, CRM).
3. State what would need to be true to reach it (assumptions) and how to check them in the first 2 weeks.

If a number you propose is an estimate, say so and explain what it is based on.`,
      variabili: [
        { nome: "goal", etichetta: "Vague goal", esempio: "I want more customers from the website" },
        { nome: "situation", etichetta: "Current situation", esempio: "1,200 visits/month, 6 quote requests" }
      ],
      consiglio: "Give your current numbers, even rough ones: without a starting point, goals stay abstract.",
      tecniche: ["Known framework", "Transparent estimates", "Assumption checks"]
    }),

    /* ===================== BRAND ===================== */
    p({
      id: "brand-estrai-tono",
      categoria: "brand",
      titolo: "Extract the tone of voice from your texts",
      descrizione: "Analyzes texts you like and derives reusable tone-of-voice guidelines.",
      testo: `Here are some of our brand's texts that represent well how we want to communicate:

<examples>
{examples}
</examples>

Analyze them and write a tone-of-voice guide:
1. 3-4 adjectives that describe the tone, each with "this means…" and "this does not mean…".
2. Style traits: sentence length, formal or informal address, emoji, jargon, humor.
3. Recurring words and phrases to use; words to avoid.
4. A "Do / Don't" table with 5 examples.
5. A short summary paragraph to paste at the start of future prompts.`,
      variabili: [
        { nome: "examples", etichetta: "Example texts", esempio: "(paste 3-5 texts: posts, emails, pages)" }
      ],
      consiglio: "Save the summary paragraph in My prompts and paste it as context in every request.",
      tecniche: ["Examples (few-shot) in XML tags", "Rule extraction", "Reusable output"]
    }),
    p({
      id: "brand-adatta-tono",
      categoria: "brand",
      titolo: "Adapt a text to the brand voice",
      descrizione: "Rewrites a text following your tone guidelines and reports what it changed.",
      testo: `<tone_guidelines>
{guidelines}
</tone_guidelines>

<text>
{text}
</text>

Rewrite the text following the tone guidelines. Keep the meaning, the information and a similar length.
Then list the 3-5 most important changes, citing the guideline rule that justifies each.
If part of the text conflicts with the guidelines in a way rewriting cannot fix (for example a promise that does not fit the brand), flag it instead of changing it.`,
      variabili: [
        { nome: "guidelines", etichetta: "Tone guidelines", esempio: "(paste the guide or summary paragraph)" },
        { nome: "text", etichetta: "Text to adapt", esempio: "(paste the text)" }
      ],
      consiglio: "Works very well together with 'Extract the tone of voice from your texts'.",
      tecniche: ["Guidelines in XML tags", "Justified changes", "Conflict flagging"]
    }),

    /* ===================== ANALYTICS ===================== */
    p({
      id: "analisi-leggi-report",
      categoria: "analisi",
      titolo: "Interpret an analytics report",
      descrizione: "Reads the data you paste (Analytics, social, email) and turns it into insights and actions.",
      testo: `You are a digital marketing analyst. Here is the data for {period}:

<data>
{data}
</data>

Goal of the website/channel: {goal}

1. Summarize what happened in 3 sentences, for someone who doesn't read numbers.
2. List the 5 most relevant observations, each with the figure that supports it.
3. Separate correlation from causation: do not attribute a change to a cause the data does not prove.
4. Propose 3 actions and 2 analyses to dig into.

If the data is incomplete or looks inconsistent (for example totals that don't add up), say so before anything else.`,
      variabili: [
        { nome: "period", etichetta: "Period", esempio: "October 2026 vs September 2026" },
        { nome: "data", etichetta: "Data", esempio: "(paste the table or exported CSV)" },
        { nome: "goal", etichetta: "Goal", esempio: "contact requests" }
      ],
      consiglio: "Paste the data as a table or CSV: Claude reads it better than a screenshot described in words.",
      tecniche: ["Role", "Data in XML tags", "Correlation vs causation", "Consistency check"]
    }),
    p({
      id: "analisi-cro-landing",
      categoria: "analisi",
      titolo: "Landing page conversion audit",
      descrizione: "Evaluates a landing page and proposes test hypotheses ranked by impact and ease.",
      testo: `Act as a CRO (conversion rate optimization) expert.

<landing_page>
{landing_text}
</landing_page>

Main traffic source: {traffic}
Desired conversion: {conversion}
Current conversion rate: {rate}

Evaluate the page on: clarity of the promise in the first seconds, match with the traffic source, proof and trust, unresolved objections, form/checkout friction, call to action.

Then propose 6 test hypotheses in the format:
"If [change], then [metric] will improve because [reason]."
Give each an ICE score (Impact, Confidence, Ease from 1 to 10) and sort them.`,
      variabili: [
        { nome: "landing_text", etichetta: "Landing page text", esempio: "(paste the text, including buttons and forms)" },
        { nome: "traffic", etichetta: "Traffic source", esempio: "Meta ads on mobile" },
        { nome: "conversion", etichetta: "Conversion", esempio: "booking a call" },
        { nome: "rate", etichetta: "Current rate", esempio: "1.2%" }
      ],
      consiglio: "Describe the mobile version too: conversion problems are often there.",
      tecniche: ["Role", "Explicit evaluation criteria", "Fixed hypothesis format", "ICE score"]
    }),

    /* ===================== NEW ORIGINAL PROMPTS (approved 2026-11-19) ===================== */
    p({
      id: "seo-scheda-google-business",
      tipo: "originale",
      categoria: "seo",
      titolo: "Google Business Profile audit and optimization",
      descrizione: "A field-by-field audit of a local business profile with rewritten description, categories, services, posts, review replies and a 30-day action plan.",
      testo: `You are a senior local SEO consultant. You audit Google Business Profiles for small businesses and you follow Google's guidelines strictly.

<business>
Name used on signage and documents: {business_name}
Type of business: {business_type}
City and areas served: {areas}
Services or products, most important first: {services}
What makes it different (provable facts only): {differentiator}
Main local competitors and the primary category they use, if known: {competitors}
</business>

<current_profile>
{current_profile}
</current_profile>

Task:
1. Audit table. For each field (business name, primary category, additional categories, description, services, service areas, regular and special hours, attributes, photos, posts, reviews and replies) give: status (OK / to improve / missing), the specific problem and a priority (high / medium / low).
2. Name check. If the profile name adds keywords or locations not used in real life, flag it: it breaks Google's guidelines and can lead to suspension.
3. Categories. Propose the most specific primary category and only the additional ones (max 9) that describe what the business really is. Explain each choice in one line and how it compares with the competitors.
4. Description. Write 2 versions, max 750 characters each, with the character count. Put the key information in the first 250 characters. No links, prices or promotions. Name the main city once.
5. Services. List 8-12 services in the words customers use, each with a short description.
6. Posts. Draft 4 posts for the next 30 days mixing Update, Offer and Event, each with the suggested button (Call, Book, Learn more…). Remind me that posts are archived after 6 months unless they have a date range.
7. Customer questions. Q&A is limited and Google increasingly answers questions in Maps with AI, using the profile, reviews and website. List the 6 questions customers ask most and say where each answer must appear: description, services, attributes or website FAQ.
8. Reviews. Suggest a review request process (no incentives: Google forbids them) and 3 reply templates: positive, mixed, negative.
9. 30-day action plan, ordered by impact and effort.

Constraints:
- Never invent opening hours, prices, years in business, certifications or reviews: write [TO COMPLETE].
- Do not promise rankings: Google ranks local results on relevance, distance and prominence, and distance cannot be changed.
- Where a rule may have changed since your training, add "check in Google Business Profile Help".

Format: one headed section per point, tables for points 1, 3 and 9.`,
      variabili: [
        { nome: "business_name", etichetta: "Real business name", esempio: "Spokes & Co" },
        { nome: "business_type", etichetta: "Type of business", esempio: "independent bicycle repair shop" },
        { nome: "areas", etichetta: "City and areas served", esempio: "Bristol city centre + 10 km, pick-up service" },
        { nome: "services", etichetta: "Services / products", esempio: "repairs, servicing, e-bike tune-ups, used bikes" },
        { nome: "differentiator", etichetta: "What makes it different", esempio: "same-day repairs booked online, 2-year warranty on work" },
        { nome: "competitors", etichetta: "Local competitors (optional)", esempio: "Bike Doctor (Bicycle repair shop), CycleWorks (Bicycle store)" },
        { nome: "current_profile", etichetta: "Current profile", esempio: "(paste name, categories, description, services, hours, attributes and recent reviews here)" }
      ],
      consiglio: "Look up which primary category the top 3 businesses in the local map results use for your main search, and paste it in the competitors field: category is one of the strongest relevance signals you control.",
      tecniche: ["Role", "Context in XML tags", "Field-by-field audit", "Platform rules as constraints", "Prioritized action plan"],
      revisione: "2026-11-19"
    }),
    p({
      id: "seo-faq-dati-strutturati",
      tipo: "originale",
      categoria: "seo",
      titolo: "FAQ section for people, search and AI answers",
      descrizione: "Turns real customer questions into a focused FAQ section, finds topics that deserve their own page and adds optional FAQPage markup with the facts about what it does today.",
      testo: `You are a senior SEO content strategist. You write FAQ content that answers real questions clearly, so it helps customers, classic search results and AI-generated answers.

<page>
Page type and URL: {page_type}
Main topic and target query: {topic}
Audience and their level of knowledge: {audience}
Page text:
{page_text}
</page>

<customer_questions>
{customer_questions}
</customer_questions>

Task:
1. Classify every customer question by stage (before buying, while deciding, after buying) and type (price, timing, process, objection, comparison, trust).
2. Select 6-10 questions for this page. Keep the customer's own wording; label each "from customers" or "suggested from gaps in the page".
3. Answer each in 40-80 words: the direct answer in the first sentence, then one concrete detail (condition, number, example) taken from the page. Suggest an internal link where a longer answer exists on the site.
4. List questions that are too complex for an FAQ and deserve their own page or section, with a working title.
5. Placement: say where the FAQ should sit on the page and make sure the answers are in the visible text of the page, not only in images or content loaded later.
6. Markup ({include_schema}): if "yes", produce FAQPage JSON-LD with wording identical to the visible answers. State clearly that Google stopped showing FAQ rich results on 7 May 2026: the markup is harmless and valid schema.org, other systems may read it, but it will not create a visible snippet in Google. Suggest validating the syntax with the Schema Markup Validator.
7. Maintenance: which Search Console queries (questions with how, what, why, cost…) to check every quarter to update the FAQ.

Constraints:
- Base answers only on the page text and the questions provided; write [TO COMPLETE] where information is missing.
- No promotional language and no claims that cannot be verified.
- Do not promise rankings, snippets or citations in AI answers.

Format: a table for points 1-3 (question, stage, type, source, answer, internal link), then one short section per remaining point.`,
      variabili: [
        { nome: "page_type", etichetta: "Page type and URL", esempio: "service page — /home-energy-audit" },
        { nome: "topic", etichetta: "Main topic and target query", esempio: "home energy audit cost" },
        { nome: "audience", etichetta: "Audience", esempio: "homeowners with no technical background" },
        { nome: "page_text", etichetta: "Page text", esempio: "(paste the page text here)" },
        { nome: "customer_questions", etichetta: "Real customer questions", esempio: "(paste questions from emails, calls, chat or reviews here)" },
        { nome: "include_schema", etichetta: "Generate FAQPage markup? (yes/no)", esempio: "yes" }
      ],
      consiglio: "The value is in the answers, not in the markup: collect questions from support emails, sales calls and reviews, and update the FAQ when new ones come up.",
      tecniche: ["Role", "Documents in XML tags", "Classification by stage and type", "Source labelling", "Up-to-date platform facts"],
      revisione: "2026-11-19"
    }),
    p({
      id: "brief-video-verticale",
      tipo: "originale",
      categoria: "brief",
      titolo: "Short vertical video script (Reels, TikTok, Shorts)",
      descrizione: "Turns one idea into hooks and a shot-by-shot script for a short vertical video.",
      testo: `You are a short-form video strategist who writes for {platform}.

<input>
Topic or product: {topic}
Audience: {audience}
Goal of the video: {goal}
Length: {duration} seconds
Resources available: {resources}
</input>

Task: write the brief and script for one vertical video.

1. Propose 3 hooks for the first 2 seconds (one visual, one spoken, one on-screen text) and say which you would test first.
2. Write the script as a table with columns: time, what we see, what is said, on-screen text.
3. Keep to one idea per video: if the topic is too broad, say so and propose how to split it.
4. End with a single call to action that matches the goal.
5. Add a caption (max 150 characters) and a note on sound (voice-over, original audio or music).

Constraints:
- Use only shots that can be filmed with the resources listed; flag anything that needs extra equipment.
- No results, numbers or testimonials that are not in the input: write [TO COMPLETE].
- Spoken lines must fit the length: about 2-3 words per second.

Format: hooks, script table, caption, production notes.`,
      variabili: [
        { nome: "platform", etichetta: "Platform", esempio: "Instagram Reels" },
        { nome: "topic", etichetta: "Topic or product", esempio: "how to store fresh pasta" },
        { nome: "audience", etichetta: "Audience", esempio: "people who cook at home on weeknights" },
        { nome: "goal", etichetta: "Goal", esempio: "visits to the online shop" },
        { nome: "duration", etichetta: "Length (seconds)", esempio: "30" },
        { nome: "resources", etichetta: "Resources", esempio: "one smartphone, natural light, shop counter" }
      ],
      consiglio: "Ask for two scripts with different hooks and film both: the first seconds decide most of the result.",
      tecniche: ["Role", "Context in XML tags", "Table output", "Realistic production limits"],
      revisione: "2026-11-19"
    }),
    p({
      id: "brief-caso-studio",
      tipo: "originale",
      categoria: "brief",
      titolo: "Case study from customer data",
      descrizione: "Turns a client's situation, actions and results into a credible case study, ready for approval.",
      testo: `You are a B2B content writer who turns client results into credible case studies.

<client>
Client (or anonymized description): {client}
Their situation before: {before}
What we did: {solution}
Results and data: {results}
Client quotes: {quotes}
</client>

Task: prepare the case study.

1. Summarize the story in three lines: challenge, approach, result.
2. Propose 3 headlines that lead with the client's result, not with our company.
3. Write the case study (500-700 words) in sections: the client, the challenge, the approach, the results, next steps.
4. Put the key numbers in a short "at a glance" box at the top.
5. List the points that need the client's approval before publishing.

Constraints:
- Use only the data and quotes provided. Never round numbers up, invent percentages or edit quotes in a way that changes their meaning.
- If a result has no number, describe it qualitatively and add [DATA TO REQUEST].
- State how and over what period the results were measured; if this is not given, write [TO COMPLETE].

Format: summary, headlines, the case study with headings, approval checklist.`,
      variabili: [
        { nome: "client", etichetta: "Client", esempio: "a regional chain of 6 dental clinics" },
        { nome: "before", etichetta: "Situation before", esempio: "many missed appointments, bookings only by phone" },
        { nome: "solution", etichetta: "What we did", esempio: "online booking and SMS reminders" },
        { nome: "results", etichetta: "Results and data", esempio: "(paste figures with period and source here)" },
        { nome: "quotes", etichetta: "Client quotes", esempio: "(paste the exact quotes here)" }
      ],
      consiglio: "Get written approval from the client before publishing, especially for numbers and quotes.",
      tecniche: ["Role", "Data in XML tags", "Ban on invented data", "Approval checklist"],
      revisione: "2026-11-19"
    }),
    p({
      id: "copy-comunicato-stampa",
      tipo: "originale",
      categoria: "copy",
      titolo: "Press release",
      descrizione: "Writes a factual press release that journalists can use, with headline, quote and boilerplate.",
      testo: `You are a press officer who writes releases journalists can actually use.

<news>
Organization: {organization}
The news: {news}
Key facts (dates, places, figures): {facts}
Spokesperson and role: {spokesperson}
Target media: {media}
</news>

Task: write a press release.

1. A headline (max 90 characters) that states the news, not an advertising slogan.
2. A one-sentence subhead with the most important detail.
3. An opening paragraph that answers who, what, when, where and why.
4. Two or three paragraphs of context and details, from most to least important.
5. One quote from the spokesperson, marked as a draft to be approved.
6. A short "About" paragraph on the organization and a media contact block.

Constraints:
- Use only the facts provided; write [TO COMPLETE] for missing ones (contact name, email, date).
- No superlatives such as "revolutionary" or "leading" unless the facts prove them.
- Max 450 words in total.

After the release, list 3 angles that could interest the target media and one question a journalist is likely to ask.`,
      variabili: [
        { nome: "organization", etichetta: "Organization", esempio: "a non-profit community library" },
        { nome: "news", etichetta: "The news", esempio: "opening of a free tool-lending service" },
        { nome: "facts", etichetta: "Key facts", esempio: "opens 12 January, 150 tools, open Tue-Sat" },
        { nome: "spokesperson", etichetta: "Spokesperson", esempio: "Anna Rossi, coordinator" },
        { nome: "media", etichetta: "Target media", esempio: "local newspapers and radio" }
      ],
      consiglio: "Send the spokesperson the draft quote to rewrite in their own words: real quotes sound much better.",
      tecniche: ["Role", "Facts in XML tags", "Inverted pyramid", "Ban on superlatives"],
      revisione: "2026-11-19"
    }),
    p({
      id: "copy-pagina-prezzi",
      tipo: "originale",
      categoria: "copy",
      titolo: "Pricing page copy",
      descrizione: "Writes a pricing page that helps visitors choose a plan and answers the usual objections honestly.",
      testo: `You are a conversion copywriter specialized in pricing pages.

<offer>
Product or service: {product}
Plans and prices: {plans}
What each plan includes: {inclusions}
Target customer: {customer}
Most common objections: {objections}
</offer>

Task: write the copy for the pricing page.

1. A headline and subhead that help the visitor choose (not just "Pricing").
2. For each plan: name, one line on who it is for, the price exactly as provided, and 4-6 included items written as outcomes.
3. Suggest which plan to highlight and why, based only on the information above.
4. A comparison table of the main differences between plans.
5. An FAQ of 5-6 questions that handles the objections (billing, cancellation, upgrades, support).
6. The button text for each plan.

Constraints:
- Do not change prices or invent discounts, guarantees, trials or limits: anything not stated becomes [TO COMPLETE].
- No fake urgency (countdowns, "today only") and no "unlimited" unless it is literally true.
- Keep each plan description under 60 words.

Format: sections in the order above, ready to paste into the page.`,
      variabili: [
        { nome: "product", etichetta: "Product or service", esempio: "online invoicing software for freelancers" },
        { nome: "plans", etichetta: "Plans and prices", esempio: "Basic €9/month, Pro €19/month, Studio €39/month" },
        { nome: "inclusions", etichetta: "What each plan includes", esempio: "(paste the feature list per plan here)" },
        { nome: "customer", etichetta: "Target customer", esempio: "freelancers and small studios" },
        { nome: "objections", etichetta: "Common objections", esempio: "fear of lock-in, unclear tax features" }
      ],
      consiglio: "Add the questions your sales or support team hears most: they make the FAQ far more convincing.",
      tecniche: ["Role", "Offer in XML tags", "Fixed structure", "Ban on fake urgency"],
      revisione: "2026-11-19"
    }),
    p({
      id: "ads-retargeting-segmenti",
      tipo: "originale",
      categoria: "ads",
      titolo: "Retargeting ads by audience segment",
      descrizione: "Plans retargeting segments by intent and writes ad variants for each, without invasive messages.",
      testo: `You are a paid social and display specialist who plans retargeting campaigns.

<context>
Business and product: {business}
Visitor behaviours we can target: {audiences}
Main reason people leave without buying: {objection}
Offer available (if any): {offer}
Platforms: {platforms}
</context>

Task: plan retargeting ads by audience segment.

1. Split the audiences into 3-4 segments by intent (for example: viewed a page, viewed a product, started checkout, past customers), using only the behaviours listed above.
2. For each segment give: message angle, suggested time window, a note on frequency, and one exclusion to avoid overlaps.
3. Write 2 ad variants per segment: primary text (max 125 characters), headline (max 40 characters), call to action.
4. Describe a creative idea for each segment in one sentence.

Constraints:
- Do not promise discounts or offers that are not in the input.
- Do not mention sensitive personal characteristics or imply you are watching the viewer ("We saw you looking at...").
- Remind me to check each platform's ad policies and that some segments may be too small to run.

Format: one table per segment, then a short list of what to measure for each one.`,
      variabili: [
        { nome: "business", etichetta: "Business and product", esempio: "online shop of handmade ceramic tableware" },
        { nome: "audiences", etichetta: "Behaviours we can target", esempio: "site visitors, product viewers, cart abandoners, buyers in the last 180 days" },
        { nome: "objection", etichetta: "Main reason for leaving", esempio: "worry about breakage in shipping" },
        { nome: "offer", etichetta: "Offer available", esempio: "free shipping over €60" },
        { nome: "platforms", etichetta: "Platforms", esempio: "Meta (Facebook and Instagram)" }
      ],
      consiglio: "Paste the audience sizes from your ad account: Claude can then merge segments that are too small.",
      tecniche: ["Role", "Context in XML tags", "Segmentation by intent", "Character limits"],
      revisione: "2026-11-19"
    }),
    p({
      id: "ads-termini-ricerca-negativi",
      tipo: "originale",
      categoria: "ads",
      titolo: "Search terms review: negative and new keywords",
      descrizione: "Reads a Google Ads search terms report, explains and proposes negative keywords, and suggests new positive keywords to add.",
      testo: `You are a Google Ads specialist reviewing a search terms report. Explain your reasoning so that someone new to Google Ads understands it.

<account>
Business: {business}
What we sell, and what we do NOT sell: {offer_scope}
Campaign goal and target cost per result, if known: {goal}
Current keywords and match types: {current_keywords}
</account>

<search_terms>
{search_terms}
</search_terms>

Task:
1. Short explanation (max 120 words): what negative keywords are, and how negative broad, phrase and exact match differ. Note that negatives do not automatically cover close variants, plurals or misspellings, so important variants must be added separately.
2. Group the search terms into: relevant and converting, relevant but not converting yet, irrelevant, unclear.
3. Negative keywords. For each irrelevant term or pattern: the negative keyword, the match type, the level (ad group, campaign, or shared negative keyword list), the reason, and an example of a search it would block.
4. Risk check. Point out any proposed negative that could also block good searches, and how to narrow it.
5. Positive keywords. From the relevant terms, suggest new keywords to add: keyword, match type, the ad group it belongs in (existing or new), the reason, and the data that supports it (clicks, conversions, cost).
6. Recurring patterns (job seekers, "free", DIY, competitor names, wrong locations) and a standard negative list to reuse across campaigns.

Constraints:
- Base everything on the data pasted; do not invent cost, click, conversion or search volume figures.
- If the report lacks cost or conversion columns, or has very few clicks, say which conclusions are uncertain.
- Where Google Ads behaviour may have changed, add "check in Google Ads Help".

Format: explanation, then tables for points 2, 3 and 5, then bullet lists for points 4 and 6.`,
      variabili: [
        { nome: "business", etichetta: "Business", esempio: "emergency plumber in Leeds" },
        { nome: "offer_scope", etichetta: "What we sell / don't sell", esempio: "repairs and boiler service; no bathroom design, no parts sales" },
        { nome: "goal", etichetta: "Goal and target cost", esempio: "phone calls from the local area, max £40 per call" },
        { nome: "current_keywords", etichetta: "Current keywords", esempio: "\"emergency plumber\" (phrase), [boiler repair leeds] (exact)" },
        { nome: "search_terms", etichetta: "Search terms report", esempio: "(paste the exported report with clicks, cost and conversions here)" }
      ],
      consiglio: "Export at least 30 days of data and include the cost and conversions columns: with few clicks it is hard to tell a bad term from bad luck.",
      tecniche: ["Role", "Data in XML tags", "Explain then act", "Classification", "Risk check on recommendations"],
      revisione: "2026-11-19"
    }),
    p({
      id: "email-carrello-abbandonato",
      tipo: "originale",
      categoria: "email",
      titolo: "Abandoned-cart sequence with smart incentives (3 emails)",
      descrizione: "Writes three cart-recovery emails that answer objections first and then use controlled incentives, such as free shipping or a discount when the customer adds a complementary product.",
      testo: `You are an e-commerce email marketer who recovers carts without eroding margins.

<store>
Store and products: {store}
Brand tone: {tone}
Typical reasons for abandoning the cart: {reasons}
Shipping and returns policy: {policy}
Free shipping threshold, if any: {free_shipping_threshold}
Complementary products that go well with typical carts: {complementary_products}
Incentives allowed and their limits (max discount, minimum order, code validity): {incentives}
</store>

Task: write an abandoned-cart sequence of 3 emails with an incentive ladder.

1. Email 1 (about 1 hour later): friendly reminder showing the cart. No incentive.
2. Email 2 (about 24 hours later): answer the most likely objection with practical information (shipping, returns, sizing, payment). If the cart is below the free shipping threshold, show how much is missing and suggest 1-2 complementary products that close the gap ("add X and shipping is free").
3. Email 3 (about 48-72 hours later): last reminder with the incentive, chosen only from the allowed ones. Propose two variants:
   a) "Complete the set": a discount or free shipping if the customer adds a complementary product to the cart;
   b) a simple incentive on the current cart, for customers who did not react to email 2.

For each email give: 3 subject lines (max 45 characters), preview text (max 90 characters), body (max 120 words), button text, and the dynamic fields needed ([product name], [image], [cart link], [amount missing for free shipping], [discount code], [expiry date]).

Then give the rules for the incentive: who gets it, how often (for example once per customer every 90 days), real expiry date, how to exclude customers who abandon carts repeatedly, and how to measure the extra revenue against a control group without incentives.

Constraints:
- Do not invent discounts, prices, stock levels or deadlines; no fake scarcity. Write [TO COMPLETE] for missing data.
- Remind me that the sequence must stop as soon as the customer buys, must respect consent and unsubscribe rules, and that announcing discounts may be subject to price-display rules in my market (for example the EU Omnibus rules on price reductions).

Format: one block per email, then the incentive rules, then 3 ideas to test.`,
      variabili: [
        { nome: "store", etichetta: "Store and products", esempio: "organic cotton baby clothes" },
        { nome: "tone", etichetta: "Brand tone", esempio: "warm and reassuring, no baby talk" },
        { nome: "reasons", etichetta: "Reasons for abandoning", esempio: "unsure about sizes, shipping costs shown late" },
        { nome: "policy", etichetta: "Shipping and returns", esempio: "free returns within 30 days, delivery in 2-4 days" },
        { nome: "free_shipping_threshold", etichetta: "Free shipping threshold", esempio: "€60" },
        { nome: "complementary_products", etichetta: "Complementary products", esempio: "bibs (€9), muslin cloths (€12), socks 3-pack (€10)" },
        { nome: "incentives", etichetta: "Allowed incentives and limits", esempio: "free shipping or 10% off, min. order €50, code valid 72 h" }
      ],
      consiglio: "Start with the free-shipping nudge in email 2: it often raises the order value without a discount. Keep the percentage discount for email 3 and test it against a group that receives no incentive.",
      tecniche: ["Role", "Context in XML tags", "Incentive ladder", "Cross-sell to a threshold", "Business rules and compliance"],
      revisione: "2026-11-19"
    }),
    p({
      id: "email-contatto-creator",
      tipo: "originale",
      categoria: "email",
      titolo: "Creator / influencer outreach email",
      descrizione: "Writes a personal first contact and a useful follow-up to propose a collaboration to a creator.",
      testo: `You are a partnerships manager who writes outreach emails that creators actually answer.

<brand>
Brand and product: {brand}
Why this creator fits: {creator_fit}
What we propose: {proposal}
Compensation: {compensation}
</brand>

<creator>
Name or handle: {creator}
Recent content worth mentioning: {recent_content}
</creator>

Task: write a first outreach email and a follow-up.

1. Three subject lines (max 50 characters), personal but not clickbait.
2. The first email (max 150 words): one specific reference to their work, why the collaboration makes sense for their audience, the proposal in two sentences, compensation stated clearly, one simple next step.
3. A follow-up for 5-7 days later (max 70 words) that adds one new useful detail instead of "just checking in".

Constraints:
- Mention only the content I have described; do not invent posts, numbers or compliments.
- If compensation is not specified, write [TO COMPLETE] rather than implying payment.
- Mention that sponsored content must be clearly disclosed as advertising.
- No flattery formulas and no pressure.

Format: subject lines, email, follow-up, then 2 questions I should be ready to answer.`,
      variabili: [
        { nome: "brand", etichetta: "Brand and product", esempio: "small brand of refillable natural deodorants" },
        { nome: "creator_fit", etichetta: "Why this creator", esempio: "talks about low-waste routines without preaching" },
        { nome: "proposal", etichetta: "Proposal", esempio: "one honest review video after 3 weeks of use" },
        { nome: "compensation", etichetta: "Compensation", esempio: "€300 fee plus product" },
        { nome: "creator", etichetta: "Creator", esempio: "@greenshelfmarta" },
        { nome: "recent_content", etichetta: "Recent content", esempio: "her video on zero-waste travel kits" }
      ],
      consiglio: "Spend five minutes on their real content before filling in the fields: a precise reference is what gets a reply.",
      tecniche: ["Role", "Two XML blocks", "Word limits", "Disclosure reminder"],
      revisione: "2026-11-19"
    }),
    p({
      id: "social-risposta-commento-negativo",
      tipo: "originale",
      categoria: "social",
      titolo: "Reply to a negative comment or review",
      descrizione: "Classifies a critical comment, decides public or private handling and drafts calm, honest replies.",
      testo: `You are a community manager who handles criticism calmly and in public.

<situation>
Brand: {brand}
Platform: {platform}
Comment or review received:
{comment}
What we know about the case: {facts}
What we are allowed to offer: {remedy}
Tone of voice: {tone}
</situation>

Task: help me reply.

1. Classify the comment: legitimate complaint, misunderstanding, partly right, troll or spam, possible crisis (many similar comments, safety or legal issues).
2. Say whether to reply publicly, move to private messages, or both, and why.
3. Write 2 public replies (max 80 words each): acknowledge the problem, take responsibility for what is ours, give a concrete next step.
4. Write the private follow-up message.
5. If it could be a crisis, list who inside the company should be informed before replying.

Constraints:
- Do not admit legal liability, promise refunds or share personal data beyond what "what we are allowed to offer" permits.
- No arguing, no sarcasm, no copy-paste apologies.
- If facts are missing, write [TO VERIFY] instead of assuming who is right.

Format: classification, recommendation, replies, escalation notes.`,
      variabili: [
        { nome: "brand", etichetta: "Brand", esempio: "family-run pizzeria with delivery" },
        { nome: "platform", etichetta: "Platform", esempio: "Google reviews" },
        { nome: "comment", etichetta: "Comment or review", esempio: "(paste the exact comment here)" },
        { nome: "facts", etichetta: "What we know", esempio: "order arrived 50 minutes late on a Saturday, driver shortage" },
        { nome: "remedy", etichetta: "What we can offer", esempio: "a free pizza on the next order" },
        { nome: "tone", etichetta: "Tone of voice", esempio: "friendly, direct, no corporate language" }
      ],
      consiglio: "Wait until you have checked the facts internally: a quick reply that turns out wrong does more damage than a slower correct one.",
      tecniche: ["Role", "Situation in XML tags", "Classification before writing", "Escalation path"],
      revisione: "2026-11-19"
    }),
    p({
      id: "social-linkedin-punto-di-vista",
      tipo: "originale",
      categoria: "social",
      titolo: "LinkedIn post with a real point of view",
      descrizione: "Turns a professional's own experience into a LinkedIn post that takes a position, without clichés or invented stories.",
      testo: `You are a LinkedIn ghostwriter who helps professionals share real expertise.

<author>
Role and field: {role}
Who they want to reach: {audience}
Experience or opinion to share: {insight}
Concrete example or story: {story}
</author>

Task: turn this into a LinkedIn post with a clear point of view.

1. Write 3 alternative opening lines that state the idea or the tension directly (no "Excited to share...").
2. Write the post (150-250 words): the idea, the example, what the reader can take away, and a question that invites genuine discussion.
3. Use short paragraphs and at most 3 relevant hashtags.
4. Suggest one comment the author could add under the post to go deeper.

Constraints:
- Stay faithful to the experience provided: do not add invented anecdotes, numbers, clients or results.
- Avoid engagement bait ("comment YES below"), clichés and strings of emoji.
- If the insight is too generic to be interesting, say so and ask me one question to sharpen it before writing.

Format: opening lines, post, suggested comment.`,
      variabili: [
        { nome: "role", etichetta: "Role and field", esempio: "operations manager in a logistics company" },
        { nome: "audience", etichetta: "Audience", esempio: "other managers in mid-sized companies" },
        { nome: "insight", etichetta: "Experience or opinion", esempio: "most delays come from handovers, not from slow people" },
        { nome: "story", etichetta: "Concrete example", esempio: "we cut order delays by mapping who passes what to whom" }
      ],
      consiglio: "Write the insight as you would say it to a colleague over coffee: Claude keeps your voice better when the input is informal.",
      tecniche: ["Role", "Context in XML tags", "Multiple hook options", "Clarifying question if input is weak"],
      revisione: "2026-11-19"
    }),
    p({
      id: "calendario-promozione-evento",
      tipo: "originale",
      categoria: "calendario",
      titolo: "Event promotion calendar",
      descrizione: "Plans week-by-week promotion for an event or webinar, from announcement to post-event follow-up.",
      testo: `You are an event marketing manager.

<event>
Event: {event}
Date and format: {date_format}
Audience: {audience}
Registration goal: {goal}
Channels available: {channels}
Team and hours per week: {resources}
</event>

Task: build the promotion calendar from today until one week after the event.

1. Divide the period into phases: announcement, early registrations, content push, final reminders, event day, follow-up.
2. For each week, list the actions per channel with format, key message and an [OWNER] placeholder.
3. Include reminder emails for registrants (for example 7 days, 1 day and 1 hour before) and a follow-up for people who registered but did not attend.
4. Set 3 checkpoints where we compare registrations with the goal, and say what to do if we are behind.
5. Add post-event content ideas that reuse what happens at the event (recap, recording, key quotes).

Constraints:
- Plan only for the channels and capacity listed; if the plan is too heavy for the team, cut it and say what you removed.
- Do not invent speakers, sponsors or registration numbers: use [TO COMPLETE].
- If the date leaves too little time for proper promotion, say so first.

Format: a week-by-week table (week, phase, channel, action, message, owner), then the checkpoints.`,
      variabili: [
        { nome: "event", etichetta: "Event", esempio: "free webinar on bookkeeping for new freelancers" },
        { nome: "date_format", etichetta: "Date and format", esempio: "in 5 weeks, Thursday 6 pm, online, 60 minutes" },
        { nome: "audience", etichetta: "Audience", esempio: "freelancers in their first two years" },
        { nome: "goal", etichetta: "Registration goal", esempio: "200 registrations" },
        { nome: "channels", etichetta: "Channels", esempio: "newsletter (3,000 contacts), LinkedIn, Instagram" },
        { nome: "resources", etichetta: "Team and hours", esempio: "one person, about 5 hours a week" }
      ],
      consiglio: "Write the date relative to today ('in 5 weeks'): it makes the timeline easier to check and reuse.",
      tecniche: ["Role", "Context in XML tags", "Phased plan", "Checkpoints", "Capacity limit"],
      revisione: "2026-11-19"
    }),
    p({
      id: "calendario-annuale-stagionalita",
      tipo: "originale",
      categoria: "calendario",
      titolo: "12-month plan based on seasonality",
      descrizione: "Builds an annual marketing calendar around your own sales seasonality and key dates.",
      testo: `You are a marketing planner who builds annual plans around real seasonality.

<business>
Business: {business}
Market: {market}
Strong and weak months (from our sales data): {seasonality}
Dates that matter to us (holidays, trade fairs, launches): {key_dates}
Channels: {channels}
</business>

Task: draft a 12-month marketing calendar.

1. For each month give: main theme, commercial priority (push, nurture or rest), 2-3 content or campaign ideas, and channels.
2. Start preparing 4-6 weeks before each important date and show this lead time in the plan.
3. Use the weaker months on purpose to build evergreen content and reuse what worked.
4. Highlight 4 "anchor moments" of the year and explain why you chose them.

Constraints:
- Use only the dates and seasonality I provide. If you suggest a general holiday or awareness day, mark it "to verify", because dates change by year and country.
- Do not invent sales figures or growth targets.
- Keep the plan realistic for a small team: at most 2 major campaigns per quarter.

Format: a 12-row table (month, theme, priority, ideas, channels, preparation starts), then the anchor moments.`,
      variabili: [
        { nome: "business", etichetta: "Business", esempio: "garden centre with an online shop" },
        { nome: "market", etichetta: "Market", esempio: "Ireland" },
        { nome: "seasonality", etichetta: "Strong and weak months", esempio: "peak March-June, second peak December, quiet August and January" },
        { nome: "key_dates", etichetta: "Key dates", esempio: "spring open day, local flower show in May, Christmas tree sales" },
        { nome: "channels", etichetta: "Channels", esempio: "newsletter, Instagram, Google Business Profile, in-store" }
      ],
      consiglio: "Paste monthly sales from the last two years instead of describing them: the plan will follow your real curve.",
      tecniche: ["Role", "Context in XML tags", "Table output", "Ban on invented dates", "Capacity limit"],
      revisione: "2026-11-19"
    }),
    p({
      id: "persona-guida-intervista",
      tipo: "originale",
      categoria: "persona",
      titolo: "Customer interview guide",
      descrizione: "Prepares a timed interview guide focused on real past behaviour, with follow-up probes and a note template.",
      testo: `You are a customer researcher preparing interviews with {interviewee_type}.

<research>
Product or service: {product}
What we want to learn: {research_goal}
Interview length: {duration} minutes
</research>

Task: write an interview guide.

1. A short introduction to read aloud: purpose, duration, consent to record, no right or wrong answers.
2. 2-3 warm-up questions about their role and context.
3. 8-10 core questions about the last real time they faced the problem: what triggered it, what they tried, who was involved, what almost stopped them.
4. For each core question, 1-2 follow-up probes ("Can you tell me more about that?", "What happened next?").
5. Closing questions and a thank-you.
6. A note-taking template with fields for quotes, pains, triggers and surprises.

Constraints:
- Ask about past behaviour, not hypothetical future intentions ("Would you buy...?").
- No leading questions, and do not mention our product before the final part.
- Give an estimated time per section that adds up to the interview length.

Format: the guide in sections, then the template. End with 3 mistakes to avoid while interviewing.`,
      variabili: [
        { nome: "interviewee_type", etichetta: "Who you interview", esempio: "owners of small accounting firms" },
        { nome: "product", etichetta: "Product or service", esempio: "app for collecting documents from clients" },
        { nome: "research_goal", etichetta: "What we want to learn", esempio: "how they chase missing documents today and what it costs them" },
        { nome: "duration", etichetta: "Length (minutes)", esempio: "30" }
      ],
      consiglio: "After 5-6 interviews, paste your notes and use them with the 'Buyer persona from real data' prompt.",
      tecniche: ["Role", "Context in XML tags", "Past behaviour, not intentions", "Time budget"],
      revisione: "2026-11-19"
    }),
    p({
      id: "persona-sondaggio-clienti",
      tipo: "originale",
      categoria: "persona",
      titolo: "Customer survey design",
      descrizione: "Designs a short, unbiased survey built around one business decision, with analysis notes.",
      testo: `You are a market researcher who designs short, unbiased surveys.

<survey>
Who answers: {respondents}
Decision this survey must inform: {decision}
Channel: {channel}
Maximum completion time: {max_time} minutes
</survey>

Task: design the survey.

1. Restate the decision and list the 3-4 things we need to learn to make it; drop any question that does not serve one of them.
2. Write the questions in order, from easy to more personal. For each give: type (single choice, multiple choice, rating scale, open), answer options, and which learning goal it serves.
3. Include at most 2 open questions.
4. Write a short intro text (why we ask, how long it takes, how the data will be used) and a thank-you message.
5. Explain how to analyze the answers once collected.

Constraints:
- No leading, double or loaded questions; balanced scales with a neutral option where it makes sense; an "other" or "don't know" option where needed.
- Ask for personal data only if strictly necessary, and say why.
- Respect the time limit: count roughly 3-4 closed questions per minute.

Format: a numbered list of questions with options, then intro, thank-you and analysis notes.`,
      variabili: [
        { nome: "respondents", etichetta: "Who answers", esempio: "customers who bought in the last 6 months" },
        { nome: "decision", etichetta: "Decision to inform", esempio: "whether to launch a monthly subscription" },
        { nome: "channel", etichetta: "Channel", esempio: "email after delivery" },
        { nome: "max_time", etichetta: "Max time (minutes)", esempio: "3" }
      ],
      consiglio: "Test the survey on two or three colleagues before sending it: confusing questions show up immediately.",
      tecniche: ["Role", "Decision-first design", "Bias checks", "Time budget"],
      revisione: "2026-11-19"
    }),
    p({
      id: "competitor-analisi-recensioni",
      tipo: "originale",
      categoria: "competitor",
      titolo: "What customers say about a competitor",
      descrizione: "Mines a competitor's public reviews for recurring praise and frustrations you can learn from.",
      testo: `You are a market analyst who extracts insight from customer reviews.

<reviews>
Competitor: {competitor}
Source of the reviews: {source}

{reviews}
</reviews>

Our offer, in short: {our_offer}

Task: find what customers value and dislike about this competitor.

1. Group the reviews into themes (product, price, service, delivery, ease of use, other) and count how many reviews mention each theme, positively and negatively.
2. For each theme, quote 1-2 short phrases copied word for word from the reviews.
3. Identify the 3 most frequent frustrations and say whether our offer addresses them, based only on what I have described.
4. Identify what customers praise that we should not underestimate.
5. Suggest 3 messages or improvements for us, each linked to evidence in the reviews.

Constraints:
- Work only on the reviews pasted. The sample may be small or unrepresentative: say how much confidence the conclusions deserve.
- Do not invent or reword quotes.
- Do not suggest messages that attack or name the competitor.

Format: a theme table (theme, positive mentions, negative mentions, example quote), then numbered sections for points 3-5.`,
      variabili: [
        { nome: "competitor", etichetta: "Competitor", esempio: "a larger online pet food shop" },
        { nome: "source", etichetta: "Source of reviews", esempio: "public reviews on a review platform, last 6 months" },
        { nome: "reviews", etichetta: "Reviews", esempio: "(paste 30-100 reviews here)" },
        { nome: "our_offer", etichetta: "Our offer", esempio: "subscription with flexible delivery dates and vet advice by chat" }
      ],
      consiglio: "Include both 5-star and 1-star reviews: the middle ratings often contain the most precise criticism.",
      tecniche: ["Role", "Data in XML tags", "Counting and verbatim quotes", "Confidence statement"],
      revisione: "2026-11-19"
    }),
    p({
      id: "competitor-confronto-prezzi",
      tipo: "originale",
      categoria: "competitor",
      titolo: "Competitor pricing and packaging comparison",
      descrizione: "Compares how you and your competitors package and price plans, and suggests how to present yours.",
      testo: `You are a pricing analyst comparing how competitors package their offer.

<our_pricing>
{our_pricing}
</our_pricing>

<competitor_pricing>
{competitor_pricing}
</competitor_pricing>

Target customer: {customer}

Task: compare packaging and pricing.

1. Build a table with one row per plan (ours and each competitor's): plan name, price, billing period, main limits, what is included, free trial or guarantee.
2. Describe each competitor's pricing logic in two sentences (per user, per usage, flat fee, freemium...).
3. Point out where we look more expensive or cheaper for the target customer, and where the comparison is not like-for-like.
4. Suggest 3 changes to our packaging or to how we present it, each with benefits and risks.

Constraints:
- Use only the text pasted. Prices change often: remind me to check every figure on the live pages before using it.
- Do not guess hidden costs or discounts; if something is unclear, write "not stated".
- Do not recommend copying a competitor's page or wording.

Format: the table, then sections for points 2-4.`,
      variabili: [
        { nome: "our_pricing", etichetta: "Our plans and prices", esempio: "(paste our pricing page text here)" },
        { nome: "competitor_pricing", etichetta: "Competitor pricing pages", esempio: "(paste the text of 2-4 competitor pricing pages here, with names)" },
        { nome: "customer", etichetta: "Target customer", esempio: "small teams of 3-10 people" }
      ],
      consiglio: "Paste the text of the pages, not screenshots, and note the date you copied them.",
      tecniche: ["Role", "Separate XML tags per source", "Like-for-like check", "Benefits and risks"],
      revisione: "2026-11-19"
    }),
    p({
      id: "strategia-piano-misurazione",
      tipo: "originale",
      categoria: "strategia",
      titolo: "Measurement plan and UTM convention",
      descrizione: "Defines KPIs, events to track and a consistent UTM naming convention before a campaign starts.",
      testo: `You are a marketing analyst who builds measurement plans before campaigns start.

<campaign>
Campaign: {campaign}
Business goal: {goal}
Channels: {channels}
Tools available: {tools}
</campaign>

Task: build the measurement plan.

1. Link the business goal to 1 main KPI and 2-4 supporting metrics, explaining why each matters.
2. List the events or conversions to track and where each happens (website, form, checkout, phone call).
3. Propose a UTM naming convention for source, medium, campaign and content, all lowercase with no spaces, and build 3 example URLs from my channels.
4. Say what baseline we need before launch and how to get it.
5. Define a reporting rhythm and which decision each report should support.

Constraints:
- Do not invent benchmarks or targets: write [TARGET TO DEFINE] wherever a number is needed.
- Use only the tools listed; if something cannot be measured with them, say so.
- Remind me never to put personal data (names, emails) in URLs or UTM parameters.

Format: a KPI table, an events table, a UTM table with examples, then short sections for points 4-5.`,
      variabili: [
        { nome: "campaign", etichetta: "Campaign", esempio: "spring promotion for a language school" },
        { nome: "goal", etichetta: "Business goal", esempio: "enrolments in adult evening courses" },
        { nome: "channels", etichetta: "Channels", esempio: "newsletter, Instagram ads, partner websites, flyers with QR code" },
        { nome: "tools", etichetta: "Tools", esempio: "Google Analytics 4, newsletter platform, spreadsheet" }
      ],
      consiglio: "Share the UTM table with everyone who creates links: a single inconsistent value is enough to split your reports.",
      tecniche: ["Role", "Context in XML tags", "Goal-to-metric chain", "Placeholder for targets"],
      revisione: "2026-11-19"
    }),
    p({
      id: "strategia-proposta-partnership",
      tipo: "originale",
      categoria: "strategia",
      titolo: "Co-marketing partnership pitch",
      descrizione: "Checks the fit with a potential partner, proposes collaboration formats and writes the first contact.",
      testo: `You are a business development manager preparing a co-marketing proposal.

<us>
Our company: {our_company}
Our audience and channels: {our_assets}
</us>

<partner>
Potential partner: {partner}
Why we think it fits: {fit}
</partner>

Collaboration idea: {idea}

Task: prepare a partnership pitch.

1. Check the fit: shared audience, non-competing offers, what each side gains. If the fit is weak, say so before writing anything else.
2. Propose 2-3 collaboration formats (joint webinar, content exchange, bundle, referral...) with the effort and the expected benefit for both sides.
3. Write the first contact email (max 180 words), focused on what the partner gains.
4. Outline a one-page proposal: objective, format, who does what, timeline, how we measure results, how leads and data are shared.

Constraints:
- Do not invent audience sizes, past partnership results or mutual contacts: write [TO COMPLETE].
- Flag lead and data sharing as a point to agree in writing, in line with privacy rules.
- No pressure and no vague promises like "huge visibility".

Format: fit check, a table of formats, the email, the proposal outline.`,
      variabili: [
        { nome: "our_company", etichetta: "Our company", esempio: "yoga studio with online classes" },
        { nome: "our_assets", etichetta: "Our audience and channels", esempio: "1,200 newsletter subscribers, active local Instagram" },
        { nome: "partner", etichetta: "Potential partner", esempio: "neighbourhood organic café" },
        { nome: "fit", etichetta: "Why it fits", esempio: "same local audience, health-conscious, mornings" },
        { nome: "idea", etichetta: "Collaboration idea", esempio: "Sunday morning class plus brunch package" }
      ],
      consiglio: "Start with a small, low-risk format: a successful first test makes a bigger partnership much easier to agree.",
      tecniche: ["Role", "Two XML blocks", "Fit check before writing", "Word limit"],
      revisione: "2026-11-19"
    }),
    p({
      id: "brand-dichiarazione-posizionamento",
      tipo: "originale",
      categoria: "brand",
      titolo: "Positioning statement",
      descrizione: "Writes and scores alternative positioning statements, each backed by proof from your own inputs.",
      testo: `You are a brand strategist.

<inputs>
Company and offer: {offer}
Target customer: {target}
Alternatives the customer considers (including doing nothing): {alternatives}
What we do differently, with proof: {differentiators}
Customer words (from reviews or interviews): {customer_words}
</inputs>

Task: write a positioning statement and test it.

1. Summarize in one sentence the main problem the target wants solved.
2. Write 3 alternative positioning statements, each in this form: for [target] who [need], [brand] is the [category] that [main benefit], unlike [alternative], because [proof].
3. Score each one from 1 to 5 on clarity, difference, credibility and relevance, with one line of reasoning per score.
4. Recommend one and explain what it means in practice: what we should say more and what we should stop saying.
5. Write a 25-word version in the customer's own words.

Constraints:
- Every benefit must be backed by a proof from the differentiators provided; otherwise mark it [PROOF MISSING].
- Avoid generic words (quality, innovative, passion) unless the inputs make them specific.

Format: numbered sections, with the 3 statements and their scores in a table.`,
      variabili: [
        { nome: "offer", etichetta: "Company and offer", esempio: "accounting firm for restaurants" },
        { nome: "target", etichetta: "Target customer", esempio: "owners of 1-3 independent restaurants" },
        { nome: "alternatives", etichetta: "Alternatives", esempio: "generalist accountant, doing it themselves, cheap online services" },
        { nome: "differentiators", etichetta: "Differences with proof", esempio: "monthly food-cost report; 40 restaurant clients; former chef on the team" },
        { nome: "customer_words", etichetta: "Customer words", esempio: "(paste quotes from reviews or interviews here)" }
      ],
      consiglio: "Test the recommended statement on two or three real customers: if they don't recognize themselves in it, go back to their words.",
      tecniche: ["Role", "Inputs in XML tags", "Fixed template", "Scoring with reasons"],
      revisione: "2026-11-19"
    }),
    p({
      id: "brand-naming",
      tipo: "originale",
      categoria: "brand",
      titolo: "Name ideas for a brand, product or rebrand",
      descrizione: "Generates name candidates in different styles, screens them for language issues and lists the checks to do.",
      testo: `You are a naming consultant working on {naming_object}.

<brief>
What it is and who it's for: {description}
Personality (3-5 adjectives): {personality}
Names we like or dislike, and why: {references}
Markets and languages: {markets}
Practical constraints (length, words to avoid, domain): {constraints}
</brief>

Task: generate and screen name candidates.

1. Propose 15 names across at least 4 styles: descriptive, evocative, invented, compound, metaphor.
2. For each: style, meaning or origin, how it sounds when said aloud, and a possible tagline (max 6 words).
3. Check each name in the languages listed for unwanted meanings, hard pronunciation or confusing spelling, and say when you are unsure.
4. Shortlist 5 and explain the choice in relation to the personality.

Constraints:
- You cannot verify trademarks, company registers, domains or social handles: for every shortlisted name write "availability to check" and list the checks needed (trademark search in the relevant classes, domain, handles, legal advice).
- Do not propose names of existing well-known brands or slight variations of them.

Format: a table of 15 names, then the shortlist with reasons and the checklist.`,
      variabili: [
        { nome: "naming_object", etichetta: "What needs a name", esempio: "the rebrand of a small web agency" },
        { nome: "description", etichetta: "What it is and for whom", esempio: "websites and maintenance for craftspeople and small shops" },
        { nome: "personality", etichetta: "Personality", esempio: "practical, warm, reliable, unpretentious" },
        { nome: "references", etichetta: "Names liked / disliked", esempio: "like short real words; dislike names ending in -ify or -ly" },
        { nome: "markets", etichetta: "Markets and languages", esempio: "Italy and Germany; Italian, German, English" },
        { nome: "constraints", etichetta: "Practical constraints", esempio: "max 2 syllables, easy to spell on the phone" }
      ],
      consiglio: "Say the shortlisted names out loud on a phone call to someone: if they can't spell them, think again.",
      tecniche: ["Role", "Brief in XML tags", "Divergent then convergent", "Declared limits of the model"],
      revisione: "2026-11-19"
    }),
    p({
      id: "analisi-risultati-test-ab",
      tipo: "originale",
      categoria: "analisi",
      titolo: "Interpret A/B test results",
      descrizione: "Checks whether an A/B test result is trustworthy and recommends whether to implement, keep testing or discard.",
      testo: `You are a CRO analyst who reads A/B test results carefully.

<test>
What was tested: {test_description}
Hypothesis: {hypothesis}
Primary metric: {primary_metric}
Duration and dates: {test_period}
Results per variant (visitors, conversions, other metrics):
{results}
</test>

Task: interpret the test and recommend a decision.

1. Calculate the conversion rate of each variant and the relative difference, showing the calculation.
2. Assess whether sample size and duration are enough to trust the result. If the data allows it, estimate statistical significance and name the method you used; otherwise say what is missing.
3. Check for red flags: very uneven traffic split, test stopped early, holidays or other campaigns during the period, secondary metrics moving the other way.
4. Recommend: implement, keep testing, or discard, with the reasoning.
5. Propose the next test that builds on what we learned.

Constraints:
- Use only the numbers provided; if a calculation needs data you do not have, say so instead of assuming it.
- Keep what the data shows clearly separate from your interpretation.
- Advise me to double-check significance with the testing tool or a statistics calculator.

Format: a results table, then numbered sections for points 2-5.`,
      variabili: [
        { nome: "test_description", etichetta: "What was tested", esempio: "shorter checkout form (5 fields instead of 9)" },
        { nome: "hypothesis", etichetta: "Hypothesis", esempio: "fewer fields will increase completed orders" },
        { nome: "primary_metric", etichetta: "Primary metric", esempio: "completed orders / checkout visitors" },
        { nome: "test_period", etichetta: "Duration and dates", esempio: "3 weeks, 1-21 October" },
        { nome: "results", etichetta: "Results", esempio: "(paste visitors and conversions per variant here)" }
      ],
      consiglio: "Decide the primary metric and minimum duration before launching the next test, and write them down.",
      tecniche: ["Role", "Data in XML tags", "Visible calculations", "Data vs interpretation"],
      revisione: "2026-11-19"
    }),
    p({
      id: "analisi-feedback-aperti",
      tipo: "originale",
      categoria: "analisi",
      titolo: "Analyze open-ended feedback",
      descrizione: "Groups free-text answers from surveys, reviews or tickets into counted themes that answer a business question.",
      testo: `You are a research analyst who turns open-ended feedback into decisions.

<feedback>
Source: {source}
Question asked, if any: {question}
Answers:
{answers}
</feedback>

Business question: {business_question}

Task: analyze the feedback.

1. Read all the answers and define 5-8 themes, each with a clear name and a one-line definition.
2. Assign every answer to one or more themes and count them; also mark the sentiment (positive, negative, mixed).
3. For each theme, quote 2 representative answers word for word.
4. Highlight surprising or minority comments that might matter anyway.
5. Answer the business question based on the themes, and list what this data cannot tell us.

Constraints:
- Do not invent or rephrase quotes; counts must match the answers pasted.
- Do not draw statistical conclusions from a small or self-selected sample, and state how many answers you analyzed.
- Remove names, emails or other personal data if they appear in quotes.

Format: a theme table (theme, definition, count, sentiment), the quotes, then sections for points 4-5.`,
      variabili: [
        { nome: "source", etichetta: "Source", esempio: "comments from the post-purchase NPS survey" },
        { nome: "question", etichetta: "Question asked", esempio: "What is the main reason for your score?" },
        { nome: "answers", etichetta: "Answers", esempio: "(paste the answers here, one per line)" },
        { nome: "business_question", etichetta: "Business question", esempio: "what should we fix first to reduce returns?" }
      ],
      consiglio: "With more than a few hundred answers, split them into batches and ask Claude to merge the themes at the end.",
      tecniche: ["Role", "Data in XML tags", "Thematic coding", "Privacy check"],
      revisione: "2026-11-19"
    }),

    /* ===================== ADAPTED FROM OPENLY LICENSED SOURCES (approved 2026-11-19) ===================== */
    p({
      id: "seo-diagnosi-codice-html",
      tipo: "adattato",
      categoria: "seo",
      titolo: "Quick SEO check from a page's HTML source",
      descrizione: "Reads the HTML source of a page and reports the few technical issues that really hurt search visibility.",
      testo: `You are a technical SEO consultant. You will review the HTML source of one page, not the live site.

<context>
Business: {business}
Target market and language: {target_market}
</context>

<html_source>
{html_source}
</html_source>

Task:
1. List what you can actually see in the source: CMS or framework clues, analytics or tag manager scripts, title tag, meta description, canonical, robots meta, hreflang, viewport, heading structure, structured data.
2. Pick the 3 issues with the highest impact on organic traffic for this market, and for each one explain the likely impact in one sentence.
3. Flag one component that looks outdated or risky (for example a very old library version), only if it is clearly visible.
4. Name one thing the page already does well, if there is one.

Constraints:
- Base every finding on a line of the source: quote the relevant tag or attribute.
- Do not guess things that the source cannot show (speed, backlinks, rankings, crawl stats): list them under "To check with other tools".
- Do not invent traffic figures or percentages.

Format: a short table (issue | evidence in the source | impact | fix), then the "To check with other tools" list. Maximum 250 words outside the table.`,
      variabili: [
        { nome: "business", etichetta: "Business", esempio: "B2B manufacturer of industrial valves" },
        { nome: "target_market", etichetta: "Target market and language", esempio: "Germany, German" },
        { nome: "html_source", etichetta: "HTML source of the page", esempio: "(paste the page source here: right click > View page source)" }
      ],
      consiglio: "Paste the full source of the home page or of a key landing page; if the page is built by JavaScript, also paste the rendered HTML from the browser's inspector.",
      tecniche: ["Role", "Document in XML tags", "Numbered steps", "Quoted evidence", "Ban on invented data"],
      fonte: { nome: "awesome-chatgpt-prompts / prompts.chat — \"SEO diagnosis\"", url: "https://github.com/f/prompts.chat/blob/main/prompts.csv", autore: "Fatih Kadir Akin and contributors (prompt contributed by Bornduck)", licenza: "CC0 1.0", licenzaUrl: "https://github.com/f/prompts.chat/blob/main/LICENSE" },
      modifiche: "Kept the idea of a quick diagnostic from homepage source with max 3 high-impact issues and one outdated component; removed the fixed audience (Chinese manufacturer) and the sales-pitch closing line, added variables, an evidence-quote rule, a list of things the source cannot prove and a table format.",
      revisione: "2026-11-19"
    }),
    p({
      id: "seo-parole-chiave-immagini-prodotto",
      tipo: "adattato",
      categoria: "seo",
      titolo: "Marketplace keywords and alt text from a product photo",
      descrizione: "Looks at a product photo and its title and returns search keywords, alt text and a short catalog description.",
      testo: `You are an e-commerce catalog specialist who writes product data that shoppers can find through search.

<product>
Title: {product_title}
Category: {category}
Shop language: {language}
</product>

I am attaching a photo of the product: {photo}

Task:
1. Describe in one sentence only the item named in the title (ignore props and other objects in the photo).
2. Give 8-12 search keywords in lower case: item type, material, style, color, use. Add a material, style or color keyword only when it is clearly visible and makes the item stand out.
3. Write an alt text (max 125 characters) that describes the image for someone who cannot see it, without keyword stuffing.
4. Write a catalog description of 40-60 words, concrete and without superlatives.

Constraints:
- If something cannot be seen in the photo (exact material, dimensions, brand), do not state it: write "to confirm" next to it.
- No made-up certifications, sizes or technical specs.

Format: four labelled sections; keywords as a comma-separated list.`,
      variabili: [
        { nome: "product_title", etichetta: "Product title", esempio: "Oak side table with drawer" },
        { nome: "category", etichetta: "Category", esempio: "living room furniture" },
        { nome: "language", etichetta: "Shop language", esempio: "English" },
        { nome: "photo", etichetta: "Photo", esempio: "(attach the product image to the chat)" }
      ],
      consiglio: "Run it on a batch of products one at a time with the same settings, then ask Claude to make the keywords consistent across the whole category.",
      tecniche: ["Role", "Context in XML tags", "Numbered steps", "Length limits", "Ban on invented data"],
      fonte: { nome: "OpenAI Cookbook — \"How to use GPT-4o mini to tag & caption images\" (Tag_caption_images_with_GPT4V)", url: "https://github.com/openai/openai-cookbook/blob/main/examples/Tag_caption_images_with_GPT4V.ipynb", autore: "Copyright (c) 2025 OpenAI", licenza: "MIT", licenzaUrl: "https://github.com/openai/openai-cookbook/blob/main/LICENSE" },
      modifiche: "Merged the notebook's separate tagging and description system prompts (written for furniture) into one general prompt for any product, and added alt text, word and character limits, a variable-based context block and a 'to confirm' rule for details that cannot be seen.",
      revisione: "2026-11-19"
    }),
    p({
      id: "brief-format-podcast",
      tipo: "adattato",
      categoria: "brief",
      titolo: "Repeatable podcast or video series format",
      descrizione: "Designs the standard structure of an episode, recurring segments and a show pitch before you record anything.",
      testo: `You are a producer of branded podcasts and video series.

<show>
Niche and topic: {niche}
Host and their background: {host}
Who the show is for: {audience}
Desired feel: {feel}
Business goal of the show: {goal}
Episode length: {length}
</show>

Task: design a repeatable episode format.

1. Episode blueprint: a timeline with timestamps (cold open, intro, main segments, call to action, close) that adds up to the episode length.
2. Two recurring signature segments that set the show apart, each with a name, how it works and why the audience would wait for it.
3. Where and how the business goal appears (mention, offer, call to action) without turning the show into an ad.
4. Three show name ideas and a 2-sentence pitch for podcast or video platforms.
5. Five first-episode topics that fit the format.

Constraints:
- Do not claim the names are available or unused: write "check availability".
- Keep the format realistic for one host with no production team, unless I say otherwise.

Format: headings for each point; the blueprint as a table (time | segment | what happens).`,
      variabili: [
        { nome: "niche", etichetta: "Niche and topic", esempio: "home cooking with seasonal Italian vegetables" },
        { nome: "host", etichetta: "Host", esempio: "a cookery school owner with 15 years of teaching" },
        { nome: "audience", etichetta: "Audience", esempio: "busy parents who want quick healthy dinners" },
        { nome: "feel", etichetta: "Desired feel", esempio: "warm, practical, a bit funny" },
        { nome: "goal", etichetta: "Business goal", esempio: "fill the online cooking classes" },
        { nome: "length", etichetta: "Episode length", esempio: "25 minutes" }
      ],
      consiglio: "Once you choose the format, ask Claude to turn the blueprint into a reusable checklist to prepare each episode.",
      tecniche: ["Role", "Context in XML tags", "Numbered steps", "Link to business goal", "Fixed structure"],
      fonte: { nome: "awesome-chatgpt-prompts / prompts.chat — \"The Ultimate Podcast Format & Audio Branding Architect\"", url: "https://github.com/f/prompts.chat/blob/main/prompts.csv", autore: "Fatih Kadir Akin and contributors (prompt contributed by sercansolmaz)", licenza: "CC0 1.0", licenzaUrl: "https://github.com/f/prompts.chat/blob/main/LICENSE" },
      modifiche: "Kept the episode blueprint with timestamps, two signature segments and name/pitch ideas; dropped the sound design and studio-gear parts, extended it to video series, added audience, business goal and length, first-episode topics and a rule against claiming name availability.",
      revisione: "2026-11-19"
    }),
    p({
      id: "copy-articolo-con-competenza",
      tipo: "adattato",
      categoria: "copy",
      titolo: "Blog post draft that leaves room for your expertise",
      descrizione: "Writes a skimmable SEO article and marks the places where only your real experience can add value.",
      testo: `You are a content writer who works with subject experts.

<brief>
Topic: {topic}
Main keyword: {keyword}
Reader: {reader}
Call to action at the end: {cta}
Expert notes (my experience, opinions, cases): {expert_notes}
</brief>

Task: write the draft of the article.

1. Start with a title tag (max 60 characters) and a meta description (max 155 characters).
2. Open with a hook that names the reader's problem or question. No generic openings such as "In today's world".
3. Use descriptive H2 and H3 headings, paragraphs of max 3-4 sentences and bullet points where they help scanning.
4. Build at least one section on the expert notes: the counter-intuitive idea, method or tip that a generic article would not have.
5. Use the keyword and natural variations where they fit; never force them.
6. Close with a short conclusion and the call to action.

Constraints:
- Use only facts from the expert notes or common knowledge. Where a number, case or quote would help but I have not given one, write [EXPERT INPUT: what is needed] instead of inventing it.
- Confident and conversational tone, no hype.

Format: the article in Markdown, then a list of all [EXPERT INPUT] placeholders.`,
      variabili: [
        { nome: "topic", etichetta: "Topic", esempio: "choosing a running shoe for flat feet" },
        { nome: "keyword", etichetta: "Main keyword", esempio: "running shoes for flat feet" },
        { nome: "reader", etichetta: "Reader", esempio: "beginner runners with knee pain" },
        { nome: "cta", etichetta: "Call to action", esempio: "book a free gait analysis in store" },
        { nome: "expert_notes", etichetta: "Expert notes", esempio: "(bullet points from the shop's physiotherapist)" }
      ],
      consiglio: "The richer the expert notes, the fewer placeholders you get: a ten-minute voice memo transcribed and pasted is often enough.",
      tecniche: ["Role", "Context in XML tags", "Numbered steps", "Placeholders instead of invented data", "Length limits"],
      fonte: { nome: "awesome-chatgpt-prompts / prompts.chat — \"The Elite SEO Blog Architect & Ghostwriter\"", url: "https://github.com/f/prompts.chat/blob/main/prompts.csv", autore: "Fatih Kadir Akin and contributors (prompt contributed by sercansolmaz)", licenza: "CC0 1.0", licenzaUrl: "https://github.com/f/prompts.chat/blob/main/LICENSE" },
      modifiche: "Kept the six guidelines (hook, skimmable structure, expert insight, natural keyword use, CTA, metadata first); replaced the request to 'sound like a veteran' with real expert notes supplied by the user, added explicit [EXPERT INPUT] placeholders instead of invented facts and a final list of gaps.",
      revisione: "2026-11-19"
    }),
    p({
      id: "copy-titoli-hero",
      tipo: "adattato",
      categoria: "copy",
      titolo: "Hero headline and subheadline options",
      descrizione: "Proposes ten H1 + H2 pairs for the top of a landing page, each built on a different angle.",
      testo: `You are a conversion copywriter. You write the first two lines a visitor reads on a landing page.

<product>
Name: {product_name}
What it is and what it does: {description}
Main features: {features}
Ideal customer: {customer}
</product>

<style_examples>
{examples}
</style_examples>

Task:
1. Write 10 pairs: an H1 (max 8 words, short and memorable) and an H2 (max 25 words, explains what the product does and for whom).
2. Use a different angle for each pair: outcome, pain removed, speed, simplicity, identity, comparison with the old way, curiosity, numbers you are given, objection answered, use case.
3. After each pair, name the angle in 2-3 words.
4. Recommend the 3 pairs best suited to the ideal customer, with one sentence of reasoning each.

Constraints:
- Use the style examples only for rhythm and length, never copy their words.
- No claims that are not supported by the description or features (no "#1", "best", invented numbers).

Format: a numbered list "H1 / H2 / angle", then the 3 recommendations.`,
      variabili: [
        { nome: "product_name", etichetta: "Product name", esempio: "Rondò" },
        { nome: "description", etichetta: "Description", esempio: "app that plans weekly meals from what is already in your fridge" },
        { nome: "features", etichetta: "Main features", esempio: "fridge scan, 20-minute recipes, automatic shopping list" },
        { nome: "customer", etichetta: "Ideal customer", esempio: "couples who work full time and waste food" },
        { nome: "examples", etichetta: "Headline examples you like", esempio: "Design. Publish. Done. / Stop rebuilding your designs from scratch." }
      ],
      consiglio: "Test the top two pairs on the real page: an A/B test on the headline alone is one of the simplest experiments to run.",
      tecniche: ["Role", "Context in XML tags", "Few-shot examples", "Angle variety", "Length limits", "Ban on invented data"],
      fonte: { nome: "Google Gemini Cookbook — \"Market a Jet Backpack\" (website copy H1/H2 step)", url: "https://github.com/google-gemini/cookbook/blob/main/examples/Market_a_Jet_Backpack.ipynb", autore: "Copyright 2026 Google LLC (notebook header)", licenza: "Apache-2.0", licenzaUrl: "https://github.com/google-gemini/cookbook/blob/main/LICENSE" },
      modifiche: "Kept the 'ten H1/H2 options with style examples' step; removed the product-sketch image and JSON output, made the examples a user variable, added word limits, ten required angles, recommendations and a ban on unsupported claims.",
      revisione: "2026-11-19"
    }),
    p({
      id: "copy-descrizione-per-persona",
      tipo: "adattato",
      categoria: "copy",
      titolo: "One product description per buyer persona",
      descrizione: "Rewrites the same product description for different buyer personas without changing the facts.",
      testo: `You are an e-commerce copywriter who personalizes product pages.

<product_description>
{product_description}
</product_description>

<personas>
{personas}
</personas>

Task:
1. For each persona, pick the 2-3 product facts that matter most to them and explain why in one line.
2. Write a version of the description for each persona ({length}), in their words, leading with what they care about.
3. Give each version a short headline.
4. End with a table: persona | facts used | main benefit | tone.

Constraints:
- Every version must contain only facts present in the original description. Do not add features, materials, numbers or guarantees.
- Do not address the persona by a made-up name or mention the persona label in the copy: the reader must not feel profiled.
- Keep the brand voice: {brand_voice}.

Format: one section per persona (headline, description), then the table.`,
      variabili: [
        { nome: "product_description", etichetta: "Original product description", esempio: "(paste the current description with all specs)" },
        { nome: "personas", etichetta: "Buyer personas", esempio: "1) weekend hiker, budget-conscious; 2) business traveler who flies every week" },
        { nome: "length", etichetta: "Length of each version", esempio: "60-80 words" },
        { nome: "brand_voice", etichetta: "Brand voice", esempio: "practical, friendly, no exclamation marks" }
      ],
      consiglio: "Use these versions for segmented emails or ads pointing to the same page; if your shop supports it, test them as page variants by traffic source.",
      tecniche: ["Role", "Document in XML tags", "Numbered steps", "Ban on adding data", "Comparison table"],
      fonte: { nome: "Google Gemini Cookbook — \"Personalized Product Descriptions with Weaviate and the Gemini API\" (Part 4)", url: "https://github.com/google-gemini/cookbook/blob/main/examples/weaviate/personalized_description_with_weaviate_and_gemini_api.ipynb", autore: "Copyright 2026 Google LLC (notebook header)", licenza: "Apache-2.0", licenzaUrl: "https://github.com/google-gemini/cookbook/blob/main/LICENSE" },
      modifiche: "Kept the core idea of tailoring one product description to each persona; removed the vector-database pipeline and the instruction to use the persona's name in the copy, added a fact-selection step, a ban on new facts, brand voice and a summary table.",
      revisione: "2026-11-19"
    }),
    p({
      id: "ads-controllo-policy-creativita",
      tipo: "adattato",
      categoria: "ads",
      titolo: "Pre-flight check of an ad against a policy",
      descrizione: "Checks ad copy and targeting against an advertising policy clause by clause before you submit it.",
      testo: `You are an ad operations reviewer. You check ads against a written policy before they are submitted.

<policy>
{policy}
</policy>

<ad>
Channel and placement: {channel}
Ad copy and visible text: {ad_copy}
Description of the image or video: {visual}
Targeting (age, regions, audiences): {targeting}
Product category: {product_category}
</ad>

Task:
1. Go through the policy clause by clause and decide for each relevant one: compliant, needs manual review, or not compliant.
2. For every "needs review" or "not compliant", quote the clause and the exact words or setting in the ad that trigger it.
3. Treat missing targeting data as the most restrictive case (for example, no minimum age set = all ages).
4. Suggest the smallest change that would make the ad compliant, keeping its message.
5. List any clause you cannot evaluate with the information given.

Constraints:
- Use only the policy text I gave you, not your memory of platform rules. If I gave no policy, say so and stop.
- This is a pre-check, not legal advice: say so in one line at the end.

Format: a table (clause | verdict | evidence | suggested fix), then an overall verdict: ready, ready after fixes, or do not submit.`,
      variabili: [
        { nome: "policy", etichetta: "Advertising policy", esempio: "(paste the platform's or client's policy text)" },
        { nome: "channel", etichetta: "Channel and placement", esempio: "Meta, Instagram Stories" },
        { nome: "ad_copy", etichetta: "Ad copy", esempio: "Lose 5 kg in 2 weeks, guaranteed!" },
        { nome: "visual", etichetta: "Visual", esempio: "before/after photo of a woman's waist" },
        { nome: "targeting", etichetta: "Targeting", esempio: "women 18-45, whole country, minimum age not set in the ad set" },
        { nome: "product_category", etichetta: "Product category", esempio: "dietary supplement" }
      ],
      consiglio: "Keep the current version of each platform's policy in a document and paste the relevant section: rules change often and Claude must not rely on memory.",
      tecniche: ["Role", "Document in XML tags", "Clause-by-clause check", "Quoted evidence", "Limited to provided sources"],
      fonte: { nome: "Claude Cookbooks — content moderation, \"Ad Creative Acceptance Policy\" example data", url: "https://github.com/anthropics/claude-cookbooks/blob/main/capabilities/content_moderation/data/ad_creatives/policies.md", autore: "Copyright (c) 2023 Anthropic", licenza: "MIT", licenzaUrl: "https://github.com/anthropics/claude-cookbooks/blob/main/LICENSE" },
      modifiche: "The source is a fictional network's ad policy used to build an automated moderation pipeline; we turned its logic (clause-based verdicts, review vs reject, missing age = all ages) into a single advertiser-side prompt that takes any user-supplied policy, quotes evidence and proposes minimal fixes. No policy text is reused.",
      revisione: "2026-11-19"
    }),
    p({
      id: "ads-annuncio-da-foto",
      tipo: "adattato",
      categoria: "ads",
      titolo: "Social ad copy from a product photo",
      descrizione: "Turns a product photo and a few facts into short social ad variants, each tied to what the image shows.",
      testo: `You are a performance copywriter for social ads.

<brief>
Product: {product}
Key facts (price, offer, delivery, etc.): {facts}
Audience: {audience}
Platform and format: {platform}
Goal of the ad: {goal}
</brief>

I am attaching the photo that will be used in the ad: {photo}

Task:
1. Describe in 2 lines what the photo shows and what a viewer notices first.
2. Write 4 ad variants. Each has: primary text (max 125 characters before the "more" cut), headline (max 40 characters), call-to-action button suggestion.
3. Link each variant to the image: the text should complete the picture, not repeat it.
4. Say which variant you would test first against which, and what the test would tell us.

Constraints:
- Use only the facts in the brief and what is visible in the photo. No invented discounts, reviews or numbers.
- If the photo has a problem for the ad (too much text, product hard to see, wrong ratio for the format), say so first.

Format: numbered variants, then the test suggestion.`,
      variabili: [
        { nome: "product", etichetta: "Product", esempio: "packable travel jacket" },
        { nome: "facts", etichetta: "Key facts", esempio: "weighs 280 g, folds into its pocket, free returns" },
        { nome: "audience", etichetta: "Audience", esempio: "people who travel with carry-on only" },
        { nome: "platform", etichetta: "Platform and format", esempio: "Facebook feed, 1:1 image" },
        { nome: "goal", etichetta: "Goal", esempio: "visits to the product page" },
        { nome: "photo", etichetta: "Photo", esempio: "(attach the ad image to the chat)" }
      ],
      consiglio: "Check the current text limits of your platform before publishing: they change and differ by placement.",
      tecniche: ["Role", "Context in XML tags", "Image as input", "Length limits", "Ban on invented data", "A/B test plan"],
      fonte: { nome: "Google Gemini Cookbook — \"Personalized Product Descriptions with Weaviate and the Gemini API\" (\"Write a short Facebook ad about this product photo\")", url: "https://github.com/google-gemini/cookbook/blob/main/examples/weaviate/personalized_description_with_weaviate_and_gemini_api.ipynb", autore: "Copyright 2026 Google LLC (notebook header)", licenza: "Apache-2.0", licenzaUrl: "https://github.com/google-gemini/cookbook/blob/main/LICENSE" },
      modifiche: "Expanded a one-line instruction ('Write a short Facebook ad about this product photo') into a full brief: product facts, audience, platform and goal, an image check, four variants with character limits, a test suggestion and a ban on invented offers.",
      revisione: "2026-11-19"
    }),
    p({
      id: "email-audit-programma",
      tipo: "adattato",
      categoria: "email",
      titolo: "Email marketing program audit",
      descrizione: "Reviews how you collect, segment, write and measure your emails and returns a prioritized improvement plan.",
      testo: `You are an email marketing consultant for small and mid-sized businesses.

<program>
Business and product: {business}
List size and how contacts are collected: {list_info}
Emails currently sent (types and frequency): {current_emails}
Segments in use: {segments}
Recent metrics (opens, clicks, conversions, unsubscribes, bounces): {metrics}
Main goal for the next quarter: {goal}
</program>

Task: audit the program in five areas and say what to change.

1. Audience and list building: opt-in sources, consent, segmentation.
2. Content: subject lines, tone, structure, clarity of the call to action, mobile readability.
3. Performance: frequency, timing, A/B testing habits.
4. Measurement: which metrics are tracked, how they connect to sales or leads.
5. Iteration: how results turn into changes.

For each area give: what works, what is missing, and 1-3 concrete actions.

Constraints:
- Judge metrics only against my own past figures or against benchmarks I provide. Do not quote industry averages or statistics from memory.
- If data for an area is missing, say what to collect instead of assuming.
- Note any consent or privacy issue you see (for example contacts added without opt-in), without giving legal advice.

Format: a table per area (works | missing | actions), then the 5 actions with the highest impact for the goal, ordered by effort (low to high).`,
      variabili: [
        { nome: "business", etichetta: "Business and product", esempio: "online shop of organic skincare" },
        { nome: "list_info", etichetta: "List size and sources", esempio: "4,200 contacts; checkout opt-in and a 10% popup" },
        { nome: "current_emails", etichetta: "Emails sent now", esempio: "weekly promo newsletter, abandoned cart (1 email)" },
        { nome: "segments", etichetta: "Segments", esempio: "none" },
        { nome: "metrics", etichetta: "Recent metrics", esempio: "(paste the last 3 months from your email tool)" },
        { nome: "goal", etichetta: "Goal", esempio: "more repeat purchases" }
      ],
      consiglio: "Export the campaign report from your email tool as a table and paste it under metrics: Claude can then spot trends by email type.",
      tecniche: ["Role", "Context in XML tags", "Fixed structure", "Ban on invented data", "Handling missing information", "Prioritization by effort"],
      fonte: { nome: "awesome-chatgpt-prompts / prompts.chat — \"Email Marketing\"", url: "https://github.com/f/prompts.chat/blob/main/prompts.csv", autore: "Fatih Kadir Akin and contributors", licenza: "CC0 1.0", licenzaUrl: "https://github.com/f/prompts.chat/blob/main/LICENSE" },
      modifiche: "The original is a generic step-by-step guide (audience, content, performance, measurement, adjustment) that also quotes a mobile-open statistic; we kept the five areas but turned the guide into an audit of the user's real program, removed the statistic, banned benchmarks from memory and added consent checks and an effort-ordered action list.",
      revisione: "2026-11-19"
    }),
    p({
      id: "email-annuncio-aumento-prezzi",
      tipo: "adattato",
      categoria: "email",
      titolo: "Price increase plan and customer emails",
      descrizione: "Helps a small business size a price increase and write the announcement for each type of customer.",
      testo: `You are an advisor to small businesses on pricing communication.

<business>
What I sell and current prices: {offer_and_prices}
Cost increases (what and how much): {cost_increases}
Customer mix (one-off, regulars, subscriptions, key accounts): {customer_mix}
Last price change and how customers reacted: {last_change}
Notice periods or contract terms I must respect: {constraints}
</business>

Task:
1. Numbers: from the data above, show the margin lost and three increase options (conservative, target, ambitious) with the new price rounded to a sensible price point. For each, compute how many customers I could lose before the increase stops paying off. Show the formula.
2. Structure: say whether to raise across the board, on some items only, or through a new package or fee, and which option feels fairest.
3. Who gets what: suggest whether to keep old prices for a while for loyal or contract customers and who deserves a personal call.
4. Timing: propose a date and notice period consistent with my constraints.
5. Messages: write the announcement email for regulars, the version for subscription or contract customers, and a short reply to a customer who complains.

Constraints:
- If a number is missing for the calculations, ask for it instead of assuming it.
- In the emails: plain, warm and confident tone; explain the reason honestly; no apologies repeated more than once; no invented reasons or fake urgency.
- Do not give legal advice on notice periods: remind me to check my contracts and local rules.

Format: sections 1-5 with headings; the calculations in a table; the emails ready to copy, with subject lines.`,
      variabili: [
        { nome: "offer_and_prices", etichetta: "What you sell and prices", esempio: "dog grooming: small dog 35, large dog 55" },
        { nome: "cost_increases", etichetta: "Cost increases", esempio: "rent +12%, products +18%, energy +20%" },
        { nome: "customer_mix", etichetta: "Customer mix", esempio: "about 300 regulars every 6-8 weeks, 40 monthly subscriptions" },
        { nome: "last_change", etichetta: "Last price change", esempio: "2 years ago, +5 euro, two complaints, nobody left" },
        { nome: "constraints", etichetta: "Notice and contract terms", esempio: "subscriptions require 30 days' notice" }
      ],
      consiglio: "Give real numbers for costs and customers: the break-even churn calculation is the part that makes the decision easier.",
      tecniche: ["Role", "Context in XML tags", "Numbered steps", "Show calculations", "Clarifying questions when data is missing", "Segmented messages"],
      fonte: { nome: "awesome-chatgpt-prompts / prompts.chat — \"Act as a Customer Price Increase Advisor for Small Businesses\"", url: "https://github.com/f/prompts.chat/blob/main/prompts.csv", autore: "Fatih Kadir Akin and contributors (prompt contributed by f)", licenza: "CC0 1.0", licenzaUrl: "https://github.com/f/prompts.chat/blob/main/LICENSE" },
      modifiche: "The original runs as an interactive interview that asks six questions and then works step by step; we compressed it into a single filled-in brief with variables, kept the steps (numbers, structure, segments, timing, messages), and added visible formulas, a ban on fake urgency or invented reasons and a reminder that it is not legal advice.",
      revisione: "2026-11-19"
    }),
    p({
      id: "social-brief-influencer",
      tipo: "adattato",
      categoria: "social",
      titolo: "Influencer campaign brief",
      descrizione: "Prepares the brief to send to creators: goal, profile to look for, content requirements, rules and measurement.",
      testo: `You are a social media manager who runs campaigns with creators.

<campaign>
Brand and product: {brand_product}
Campaign goal: {goal}
Target audience: {audience}
Platforms: {platforms}
Budget range and compensation type: {budget}
Brand rules and things to avoid: {brand_rules}
</campaign>

Task: write the brief I will send to creators, plus my internal notes.

1. Creator profile to look for: niche, audience fit, content style, signals of authentic engagement to check (without inventing follower thresholds as rules).
2. The brief for the creator: context in 3 lines, the key message, 3 content ideas they can adapt in their own voice, mandatory elements (product shown, link or code, disclosure), what is not allowed.
3. Deliverables and timeline: formats per platform, number of posts, approval step, publication window.
4. Measurement: what we will track and what we will ask the creator to share (screenshots of insights, link clicks, code uses).

Constraints:
- Always require a clear advertising disclosure as the platform and local rules require; do not suggest hiding the partnership.
- Do not promise results or name specific creators.
- Leave creative freedom: no full scripts unless I ask.

Format: section "Internal notes" (point 1 and 4), then section "Brief for the creator" (points 2 and 3) written so it can be sent as it is.`,
      variabili: [
        { nome: "brand_product", etichetta: "Brand and product", esempio: "new line of recycled-fabric athleisure" },
        { nome: "goal", etichetta: "Campaign goal", esempio: "awareness and first sales with a discount code" },
        { nome: "audience", etichetta: "Target audience", esempio: "women 25-40 who do yoga and pilates" },
        { nome: "platforms", etichetta: "Platforms", esempio: "Instagram and TikTok" },
        { nome: "budget", etichetta: "Budget and compensation", esempio: "small; free product plus fixed fee for micro-creators" },
        { nome: "brand_rules", etichetta: "Brand rules", esempio: "no before/after bodies, no diet talk" }
      ],
      consiglio: "Before sending, ask Claude to check the brief from the creator's side: what would make a good creator say no?",
      tecniche: ["Role", "Context in XML tags", "Numbered steps", "Explicit constraints", "Separate internal and external output"],
      fonte: { nome: "awesome-chatgpt-prompts / prompts.chat — \"Act as a Social Media Influencer\"", url: "https://github.com/f/prompts.chat/blob/main/prompts.csv", autore: "Fatih Kadir Akin and contributors (prompt contributed by devisasari)", licenza: "CC0 1.0", licenzaUrl: "https://github.com/f/prompts.chat/blob/main/LICENSE" },
      modifiche: "The original asks the model to role-play as an influencer creating an Instagram campaign; we switched the point of view to the brand working with creators and turned it into a structured brief with creator profile, deliverables, disclosure requirement and measurement.",
      revisione: "2026-11-19"
    }),
    p({
      id: "social-post-linkedin-con-domande",
      tipo: "adattato",
      categoria: "social",
      titolo: "LinkedIn post that starts with questions",
      descrizione: "Asks you a few targeted questions first, then writes a LinkedIn post with short lines and a clear intent.",
      testo: `You are a LinkedIn ghostwriter for professionals and small companies.

<post>
Topic: {topic}
Angle or focus: {angle}
Intent of the post: {intent}
Who should read it: {reader}
Author (role, company): {author}
</post>

Before writing, ask me up to 4 questions to get a real story, example or opinion that only I can give. Wait for my answers.

Then:
1. Write the post: a first line that makes people stop scrolling, short lines (7-12 words), white space between ideas, max {max_words} words.
2. Build it on my answers, not on generic advice.
3. End with one question or call to action that fits the intent.
4. Propose 2 alternative first lines.

Constraints:
- No invented anecdotes, figures or clients: if my answers are thin, tell me what is missing.
- Max 3 hashtags, only if relevant; no emoji walls.

Format: the questions first; after my answers, the post ready to copy, then the alternative first lines.`,
      variabili: [
        { nome: "topic", etichetta: "Topic", esempio: "staying energetic in a desk job" },
        { nome: "angle", etichetta: "Angle", esempio: "small food and schedule habits, not gym routines" },
        { nome: "intent", etichetta: "Intent", esempio: "education / promotion / inspiration / news / tips" },
        { nome: "reader", etichetta: "Reader", esempio: "office managers and HR in mid-size companies" },
        { nome: "author", etichetta: "Author", esempio: "nutritionist who runs corporate workshops" },
        { nome: "max_words", etichetta: "Maximum words", esempio: "250" }
      ],
      consiglio: "Answer the questions by voice and paste the transcript: spoken answers often contain the most natural sentences for the post.",
      tecniche: ["Role", "Context in XML tags", "Clarifying questions first", "Limit on number of questions", "Length limits", "Ban on invented data"],
      fonte: { nome: "awesome-chatgpt-prompts / prompts.chat — \"LinkedIn Ghostwriter\"", url: "https://github.com/f/prompts.chat/blob/main/prompts.csv", autore: "Fatih Kadir Akin and contributors (prompt contributed by siddqamar)", licenza: "CC0 1.0", licenzaUrl: "https://github.com/f/prompts.chat/blob/main/LICENSE" },
      modifiche: "Kept topic, focus, intent list, short-line rule, word limit and the invitation to ask follow-up questions; made the questions mandatory and capped at 4, added reader and author, a ban on invented anecdotes, hashtag limits and alternative opening lines.",
      revisione: "2026-11-19"
    }),
    p({
      id: "calendario-stagionale-servizi-locali",
      tipo: "adattato",
      categoria: "calendario",
      titolo: "Seasonal social calendar for a local service business",
      descrizione: "Plans a quarter of social content around the demand peaks of a local service business, with formats and captions.",
      testo: `You are a social media planner for local service businesses (trades, repairs, cleaning, pest control, gardening).

<business>
Service and area served: {service_area}
Months to plan: {months}
Seasonal demand (when calls peak and drop): {seasonality}
Platforms and posts per week: {platforms_frequency}
What we can film or photograph: {available_content}
Offer or call to action: {offer}
</business>

Task:
1. Split the period into phases based on seasonality (before the peak, peak, after the peak) and give each phase a content goal.
2. Build a weekly calendar: date, platform, format (reel, carousel, photo post, story), topic, goal of the post.
3. Mix the content: useful prevention tips, behind the scenes, before/after of real jobs, FAQ, reviews already received, offers.
4. Write the caption for the first 2 weeks of posts, with 3-5 hashtags each (local plus topic).

Constraints:
- Do not invent customer reviews, results or job numbers: mark them as "[use a real review]" or "[real photo needed]".
- Avoid content that platforms often restrict: no graphic images of pests, injuries or damage; no fear-based claims; no health promises.
- Respect customers' privacy: no addresses or faces without consent.

Format: phase table, then the calendar table, then the captions.`,
      variabili: [
        { nome: "service_area", etichetta: "Service and area", esempio: "pest control, Bristol and surroundings" },
        { nome: "months", etichetta: "Months to plan", esempio: "March to May" },
        { nome: "seasonality", etichetta: "Seasonal demand", esempio: "ants and wasps from April, peak in June" },
        { nome: "platforms_frequency", etichetta: "Platforms and frequency", esempio: "Facebook and Instagram, 3 posts a week" },
        { nome: "available_content", etichetta: "Available content", esempio: "phone videos from jobs, the van, the technicians" },
        { nome: "offer", etichetta: "Offer or call to action", esempio: "free inspection for bookings before 30 April" }
      ],
      consiglio: "Use last year's call or booking log to describe seasonality: real peaks make the calendar much more useful than guesses.",
      tecniche: ["Role", "Context in XML tags", "Phased planning", "Placeholders instead of invented data", "Explicit constraints"],
      fonte: { nome: "awesome-chatgpt-prompts / prompts.chat — \"Pest Control Social Media Content Calendar\"", url: "https://github.com/f/prompts.chat/blob/main/prompts.csv", autore: "Fatih Kadir Akin and contributors", licenza: "CC0 1.0", licenzaUrl: "https://github.com/f/prompts.chat/blob/main/LICENSE" },
      modifiche: "The original is a short, informal request for a one-month pest control calendar with captions and hashtags that 'will not be restricted'; we generalized it to any local service, organized it around seasonal demand phases, and turned the restriction concern into explicit content rules plus placeholders for real reviews and photos.",
      revisione: "2026-11-19"
    }),
    p({
      id: "persona-insight-da-intervista",
      tipo: "adattato",
      categoria: "persona",
      titolo: "Evidence-backed insights from a customer interview",
      descrizione: "Turns one interview transcript into jobs, pains, triggers and objections, each supported by a verbatim quote.",
      testo: `You are a customer researcher. You turn interview transcripts into insights a marketing team can trust.

<context>
Product or idea: {product}
Research goal: {research_goal}
</context>

<transcript>
{transcript}
</transcript>

Task:
1. Describe the participant's current way of solving the problem: steps, tools, people involved, time or money spent.
2. Extract: jobs to be done, pains, desired outcomes, triggers that made them look for a solution, worries or blockers about switching.
3. Rate each pain for frequency and intensity (low, medium, high), only from what the transcript says, with one sentence of reasoning.
4. List the exact words the participant uses to describe the problem: they are raw material for copy.
5. Flag leading questions asked by the interviewer, because the answers to them are weaker evidence.

Constraints:
- Every insight must cite at least one short verbatim quote (under 40 words). Never invent, merge or polish quotes. If the notes are paraphrased, label them "paraphrase".
- Separate what the person said or did from your interpretation.
- Treat "I would use / I might pay" as hypothetical and weaker than past behavior.
- Replace names of people, companies and places with placeholders such as [PERSON_1].

Format: sections 1-5 with tables (insight | quote | type: fact or interpretation), then 3 open questions for the next interview.`,
      variabili: [
        { nome: "product", etichetta: "Product or idea", esempio: "booking software for small physiotherapy clinics" },
        { nome: "research_goal", etichetta: "Research goal", esempio: "why clinics move from paper diaries and what stops them" },
        { nome: "transcript", etichetta: "Transcript", esempio: "(paste the full transcript or detailed notes)" }
      ],
      consiglio: "Run it on each interview separately with the same prompt, then paste all the outputs together and ask Claude for patterns that appear in at least three interviews.",
      tecniche: ["Role", "Document in XML tags", "Citations as support", "Facts vs hypotheses", "Data anonymization"],
      fonte: { nome: "awesome-chatgpt-prompts / prompts.chat — \"Customer Interview Insight Extractor (JSON)\"", url: "https://github.com/f/prompts.chat/blob/main/prompts.csv", autore: "Fatih Kadir Akin and contributors (prompt contributed by f)", licenza: "CC0 1.0", licenzaUrl: "https://github.com/f/prompts.chat/blob/main/LICENSE" },
      modifiche: "Kept the evidence rules (verbatim quotes under 40 words, behavior over hypotheticals, leading-question flags, anonymization); replaced the strict JSON schema for product teams with readable tables for marketers and added a 'customer language' section for copywriting and next-interview questions.",
      revisione: "2026-11-19"
    }),
    p({
      id: "persona-voce-cliente-da-chiamate",
      tipo: "adattato",
      categoria: "persona",
      titolo: "Voice of the customer from call transcripts",
      descrizione: "Summarizes sales or support calls into a fixed structure: need, objections, buying signals and follow-up.",
      testo: `You are a customer insight analyst. You extract what matters for marketing and sales from call transcripts.

<context>
Company and product: {company_product}
Type of call: {call_type}
</context>

<transcript>
{transcript}
</transcript>

Before answering, analyze the transcript inside <thinking> tags: the main need, how the call ended and anything unclear.

Then give a summary with these fields:
1. Customer need: what they were trying to achieve (max 100 characters).
2. Problem or question raised (max 100 characters).
3. Objections or doubts, with a short quote for each.
4. Buying signals or signs of risk (churn, complaint), with a short quote.
5. Words the customer used to describe their situation.
6. Outcome of the call and follow-up needed (yes/no, what).
7. Ambiguities: points that are vague or contradictory in the conversation.

Constraints:
- Remove personal data: names, phone numbers, email addresses, addresses.
- If the call is not relevant (wrong number, empty call), say so and fill no fields.
- Do not infer emotions or intentions that are not supported by the words in the transcript.

Format: the fields as a list inside <summary> tags, so many calls can be compared.`,
      variabili: [
        { nome: "company_product", etichetta: "Company and product", esempio: "smart home devices, thermostat and locks" },
        { nome: "call_type", etichetta: "Type of call", esempio: "support call / sales demo / cancellation call" },
        { nome: "transcript", etichetta: "Transcript", esempio: "(paste the call transcript)" }
      ],
      consiglio: "After 20-30 calls, paste all the summaries and ask Claude to group objections and customer words by frequency: you get the raw material for FAQs, ads and landing pages.",
      tecniche: ["Role", "Document in XML tags", "Thinking before answering", "Fixed structure", "Length limits", "Data anonymization"],
      fonte: { nome: "Anthropic Courses — Real world prompting, \"Call summarizer\" (04_call_summarizer)", url: "https://github.com/anthropics/courses/blob/master/real_world_prompting/04_call_summarizer.ipynb", autore: "Anthropic", licenza: "CC BY-NC 4.0", licenzaUrl: "https://github.com/anthropics/courses/blob/master/LICENSE" },
      modifiche: "Kept the structure of the lesson's final prompt (transcript in XML tags, analysis in <thinking> first, 100-character fields, removal of personal data, ambiguities list, handling of irrelevant calls); refocused the fields from support resolution to marketing insight (objections, buying signals, customer words) and replaced the JSON output with tagged fields.",
      revisione: "2026-11-19"
    }),
    p({
      id: "competitor-sintesi-documento",
      tipo: "adattato",
      categoria: "competitor",
      titolo: "Structured summary of a competitor document",
      descrizione: "Summarizes a long competitor document (report, catalog, terms, pricing page) into the same fixed sections every time.",
      testo: `You are a market analyst known for accurate, structured summaries.

<context>
Our company and offer: {our_company}
Competitor: {competitor}
Type of document: {document_type}
</context>

<document>
{document}
</document>

<example_summary>
{example_summary}
</example_summary>

Task: summarize the document in these sections, in this order:
1. Offer: products, plans or services described.
2. Prices and conditions: prices, discounts, contract terms, guarantees, exactly as written.
3. Target customers and use cases mentioned.
4. Claims and proof: what they claim and what evidence they show.
5. Changes or news compared to what is common in the market, only if the document says so.
6. What this means for us: 3 points, clearly marked as interpretation.

Constraints:
- Sections 1-5 must contain only information found in the document; quote numbers exactly. If a section has nothing, write "not in the document".
- If the example summary is given, follow its level of detail and style, not its content.
- No preamble.

Format: wrap the whole answer in <summary> tags, with a heading per section.`,
      variabili: [
        { nome: "our_company", etichetta: "Our company and offer", esempio: "regional coworking network, flexible desks and meeting rooms" },
        { nome: "competitor", etichetta: "Competitor", esempio: "a national coworking chain" },
        { nome: "document_type", etichetta: "Type of document", esempio: "pricing page and membership terms" },
        { nome: "document", etichetta: "Document text", esempio: "(paste the document text)" },
        { nome: "example_summary", etichetta: "Example of a good summary (optional)", esempio: "(paste a summary you liked, or write: none)" }
      ],
      consiglio: "Summarize the same type of document for each competitor with this prompt: the fixed sections make the summaries easy to put side by side in one table.",
      tecniche: ["Role", "Document in XML tags", "Fixed structure", "Few-shot examples", "Facts vs hypotheses", "Limited to provided sources"],
      fonte: { nome: "Claude Cookbooks — \"Summarization\" guide (guided and multi-shot summarization)", url: "https://github.com/anthropics/claude-cookbooks/blob/main/capabilities/summarization/guide.ipynb", autore: "Copyright (c) 2023 Anthropic", licenza: "MIT", licenzaUrl: "https://github.com/anthropics/claude-cookbooks/blob/main/LICENSE" },
      modifiche: "The guide summarizes legal sublease agreements with a legal-analyst role, example summaries and output in <summary> tags; we kept the role-plus-examples approach and the tagged output, replaced the legal domain with competitor documents, defined marketing sections, and separated document facts from our interpretation.",
      revisione: "2026-11-19"
    }),
    p({
      id: "competitor-perche-converte",
      tipo: "adattato",
      categoria: "competitor",
      titolo: "Why a competitor's landing page converts",
      descrizione: "Reverse-engineers a competitor page: promise, motivations, hierarchy, proof, friction, and what you can learn from it.",
      testo: `You are a UX and conversion strategist. You analyze a competitor's page to learn from it, not to copy it.

<context>
Our product and page goal: {our_page}
Competitor page URL or name: {competitor_page}
</context>

<page_content>
{page_content}
</page_content>

Analyze the page in this order:
1. Value clarity: what is the core promise a visitor gets in the first 3-5 seconds? Is it specific and outcome-driven?
2. Main motivations: which drivers does the page use (desire, fear of loss, control, relief, belonging)? Rank the top 2 with evidence.
3. Hierarchy: what is seen first, how prominent and clear the main call to action is, in what order information arrives.
4. Conversion path: hook, engagement, the moment of commitment.
5. Trust: proof elements (reviews, numbers, logos, guarantees) and how risk is reduced.
6. Friction: confusing points, missing information, overload.

Then:
7. List 3-5 ideas we could test on our page, adapted to our product, and 2 things we should NOT copy and why.

Constraints:
- Base every point on the page content I pasted (or the screenshot); if something is not visible, say "not visible".
- Do not reproduce their copy in our ideas: describe the principle.
- Do not estimate their conversion rate or traffic.

Format: summary in 3-4 lines, then sections 1-7 with short bullet points.`,
      variabili: [
        { nome: "our_page", etichetta: "Our product and page goal", esempio: "language-learning app, free trial sign-ups" },
        { nome: "competitor_page", etichetta: "Competitor page", esempio: "competitor's pricing page" },
        { nome: "page_content", etichetta: "Page content", esempio: "(paste the page text in order, or attach a full-page screenshot)" }
      ],
      consiglio: "A full-page screenshot plus the pasted text gives the best result: the screenshot shows hierarchy, the text avoids reading errors.",
      tecniche: ["Role", "Document in XML tags", "Numbered steps", "Quoted evidence", "Explicit constraints"],
      fonte: { nome: "awesome-chatgpt-prompts / prompts.chat — \"UX Conversion Deconstruction Engine\"", url: "https://github.com/f/prompts.chat/blob/main/prompts.csv", autore: "Fatih Kadir Akin and contributors (prompt contributed by mmanisaligil)", licenza: "CC0 1.0", licenzaUrl: "https://github.com/f/prompts.chat/blob/main/LICENSE" },
      modifiche: "Kept the analysis sequence (value clarity, human drivers ranked, visual hierarchy, conversion flow, trust, friction); framed it as competitor research, merged 'hidden mechanics' into the drivers step, added our own page context, an evidence rule, a no-copy rule and a final section of test ideas and things not to copy.",
      revisione: "2026-11-19"
    }),
    p({
      id: "strategia-concept-campagna",
      tipo: "adattato",
      categoria: "strategia",
      titolo: "Advertising campaign concept",
      descrizione: "Develops a campaign concept: audience, key message, slogan options, channel mix and supporting activities.",
      testo: `You are an advertising strategist.

<brief>
Product or service: {product}
Target audience: {audience}
Campaign goal: {goal}
Budget range: {budget}
Period: {period}
What we know about the audience (research, data, feedback): {insights}
</brief>

Task: develop one campaign concept.

1. Audience: who exactly we are talking to, what they want and what holds them back, based on the insights given.
2. Core idea: the campaign idea in one sentence and why it should work for this audience.
3. Key messages: one main message and 3 supporting messages, each linked to a need.
4. Slogan: 5 options, with the angle of each.
5. Channels: the mix of channels with the role of each (awareness, consideration, conversion) and a rough share of budget in percent, with the reasoning.
6. Supporting activities: events, partnerships, PR, in-store or content that reinforce the idea.
7. Measurement: one main KPI and 2-3 secondary KPIs, and how to read them.

Constraints:
- Where the insights do not cover something, mark it as an assumption to verify.
- Do not invent market data, audience sizes or expected results.
- Respect advertising rules for the category (for example age limits for energy drinks or alcohol); flag them.

Format: sections 1-7 with headings; the channel mix as a table (channel | role | budget % | why).`,
      variabili: [
        { nome: "product", etichetta: "Product or service", esempio: "new low-sugar energy drink" },
        { nome: "audience", etichetta: "Target audience", esempio: "adults 18-30 who study and work" },
        { nome: "goal", etichetta: "Campaign goal", esempio: "trial in the first 3 months after launch" },
        { nome: "budget", etichetta: "Budget range", esempio: "50,000-70,000 euro" },
        { nome: "period", etichetta: "Period", esempio: "September to November" },
        { nome: "insights", etichetta: "Audience insights", esempio: "survey of 300 students: they dislike the 'extreme sport' image of energy drinks" }
      ],
      consiglio: "Ask for two contrasting concepts in separate chats and then ask Claude to compare them point by point against the goal.",
      tecniche: ["Role", "Context in XML tags", "Numbered steps", "Facts vs hypotheses", "Ban on invented data", "Comparison table"],
      fonte: { nome: "awesome-chatgpt-prompts / prompts.chat — \"Act as an Advertiser\"", url: "https://github.com/f/prompts.chat/blob/main/prompts.csv", autore: "Fatih Kadir Akin and contributors (prompt contributed by devisasari)", licenza: "CC0 1.0", licenzaUrl: "https://github.com/f/prompts.chat/blob/main/LICENSE" },
      modifiche: "Kept the four elements of the original (target audience, key messages and slogans, media channels, additional activities) and its energy-drink example as sample values; added a structured brief, a core idea, budget split, KPIs, assumption marking, a ban on invented market data and a reminder about category advertising rules.",
      revisione: "2026-11-19"
    }),
    p({
      id: "brand-identita-piccola-impresa",
      tipo: "adattato",
      categoria: "brand",
      titolo: "Brand identity starter for a small business",
      descrizione: "From values, audience and industry, proposes a positioning, tone of voice, visual directions and ways to stand out.",
      testo: `You are a brand strategist who helps small businesses build a clear, memorable identity on a small budget.

<business>
Business and what it sells: {business}
Values (in the owner's words): {values}
Target customers: {customers}
Industry and local competitors: {competitors}
What customers already say about us: {customer_feedback}
</business>

Task:
1. Positioning: one sentence "For [who], [business] is the [category] that [difference], because [reason to believe]", plus 2 alternatives.
2. Personality: 3-4 traits, each with "we are / we are not".
3. Tone of voice: how we write in practice, with 3 short examples (a social post opening, a reply to a review, a shop sign or label).
4. Visual directions: 2 different directions described in words (mood, color palette with names or hex codes, type style, logo idea). Describe, do not draw.
5. Differentiation: 3 ways to stand out from the competitors listed, realistic for a small team.
6. Consistency: 5 touchpoints to update first and a one-page checklist to keep the brand consistent.

Constraints:
- Build on the values and feedback I gave; if they conflict, say so.
- Do not claim a name, slogan or logo idea is free to use: remind me to check trademarks.
- No vague words like "innovative" or "quality" unless backed by something concrete.

Format: sections 1-6 with headings; keep the whole answer under 900 words.`,
      variabili: [
        { nome: "business", etichetta: "Business", esempio: "family bakery with two shops, sourdough and pastries" },
        { nome: "values", etichetta: "Values", esempio: "slow fermentation, local flour, no shortcuts" },
        { nome: "customers", etichetta: "Target customers", esempio: "neighborhood families and young professionals" },
        { nome: "competitors", etichetta: "Industry and competitors", esempio: "two supermarket bakeries and a trendy café chain" },
        { nome: "customer_feedback", etichetta: "Customer feedback", esempio: "reviews mention 'the bread lasts all week' and 'friendly staff'" }
      ],
      consiglio: "Give Claude real review excerpts: the strongest positioning often comes from words customers already use.",
      tecniche: ["Role", "Context in XML tags", "Numbered steps", "Fill-in template", "Length limits", "Conflict flagging"],
      fonte: { nome: "awesome-chatgpt-prompts / prompts.chat — \"Creative Branding Strategist\"", url: "https://github.com/f/prompts.chat/blob/main/prompts.csv", autore: "Fatih Kadir Akin and contributors (prompt contributed by waleedsid)", licenza: "CC0 1.0", licenzaUrl: "https://github.com/f/prompts.chat/blob/main/LICENSE" },
      modifiche: "Kept the inputs (values, audience, industry) and outputs (logo concepts, color palettes, tone of voice, differentiation, consistency); turned the one-paragraph role into a structured brief, added a positioning template, personality traits, tone examples, customer feedback as input, a trademark reminder and a length limit.",
      revisione: "2026-11-19"
    }),
    p({
      id: "brand-nomi-prodotto",
      tipo: "adattato",
      categoria: "brand",
      titolo: "Product name ideas with a shortlist",
      descrizione: "Generates varied product names from a description or sketch, then filters them against your criteria.",
      testo: `You are a naming specialist and copywriter.

<product>
Description and main features: {description}
Who it is for: {audience}
Brand personality: {personality}
Markets and languages where it will be sold: {markets}
Names or words to avoid: {avoid}
</product>

If I attach a sketch or photo, use it only to understand the product: {image}

Task:
1. Write 10 names using different naming styles: descriptive, evocative, invented word, compound, metaphor, a word from another language, short and playful, and so on. Label the style of each.
2. For each name: one line on the idea behind it and possible problems (pronunciation, unwanted meanings in the listed languages, similarity to common words).
3. Pick a shortlist of 3 against these criteria: easy to say and spell, fits the personality, distinctive in the category, works in all listed markets.
4. For the shortlist, suggest a short tagline for each.

Constraints:
- Do not state that a name or domain is available or not registered: I will check trademarks and domains myself.
- If you are unsure about a meaning in another language, say so instead of guessing.

Format: a table (name | style | idea | possible problems), then the shortlist with reasons and taglines.`,
      variabili: [
        { nome: "description", etichetta: "Description and features", esempio: "backpack with two small electric fans for short hovering flights (concept)" },
        { nome: "audience", etichetta: "Who it is for", esempio: "urban commuters and tech enthusiasts" },
        { nome: "personality", etichetta: "Brand personality", esempio: "bold, playful, a bit futuristic" },
        { nome: "markets", etichetta: "Markets and languages", esempio: "UK, Italy, Germany" },
        { nome: "avoid", etichetta: "Names or words to avoid", esempio: "anything with 'jet' or 'rocket'" },
        { nome: "image", etichetta: "Sketch or photo (optional)", esempio: "(attach an image, or write: none)" }
      ],
      consiglio: "Say each shortlisted name out loud to five people and ask them to spell it: it is the quickest real-world test.",
      tecniche: ["Role", "Context in XML tags", "Style variety", "Explicit evaluation criteria", "Ban on invented data"],
      fonte: { nome: "Google Gemini Cookbook — \"Market a Jet Backpack\" (product naming step)", url: "https://github.com/google-gemini/cookbook/blob/main/examples/Market_a_Jet_Backpack.ipynb", autore: "Copyright 2026 Google LLC (notebook header)", licenza: "Apache-2.0", licenzaUrl: "https://github.com/google-gemini/cookbook/blob/main/LICENSE" },
      modifiche: "The notebook asks for 'ten varied, interesting possible names' from a product sketch; we kept the ten varied names and the optional image, and added naming styles, a risk check per name, shortlist criteria, taglines and a ban on availability claims.",
      revisione: "2026-11-19"
    }),
    p({
      id: "brand-linee-guida-scritte",
      tipo: "adattato",
      categoria: "brand",
      titolo: "Written brand guidelines for documents and content",
      descrizione: "Turns scattered brand rules into a structured guideline: identity, voice, standard phrases, formatting and a final checklist.",
      testo: `You are a brand manager who writes brand guidelines that people actually follow.

<brand_material>
{brand_material}
</brand_material>

<context>
Company and industry: {company}
Who will use the guidelines: {users}
Main documents and channels: {channels}
</context>

Task: organize the material into a guideline with these sections:
1. Brand identity: name, tagline, what we do, in max 5 lines.
2. Tone of voice: 3-5 principles, each with a "write this / not this" example.
3. Standard phrases: openings, closings and the call to action we reuse; words we always or never use.
4. Visual basics: colors (name, hex), fonts and hierarchy, logo rules, only as given in the material.
5. Formatting conventions: numbers, currency, dates, percentages, tables, headings for the listed documents and channels.
6. Prohibited elements.
7. Pre-publication checklist: 6-10 yes/no checks.

Constraints:
- Use only what is in the brand material. Where a section has no information, write "to be defined" and suggest the decision to make, marked as a suggestion.
- If the material contains contradictions (for example two different blues), list them in a final "To resolve" section.
- Write the guideline so it can be pasted into a Claude Project or a style file and reused as instructions.

Format: Markdown with headings for sections 1-7, then "To resolve".`,
      variabili: [
        { nome: "brand_material", etichetta: "Existing brand material", esempio: "(paste old guidelines, emails with rules, logo notes, examples of approved texts)" },
        { nome: "company", etichetta: "Company and industry", esempio: "IT services company for local councils" },
        { nome: "users", etichetta: "Who will use them", esempio: "sales team, two marketers, external freelancers" },
        { nome: "channels", etichetta: "Documents and channels", esempio: "proposals in Word, slide decks, LinkedIn, newsletter" }
      ],
      consiglio: "Once approved, save the guideline in your Claude Project instructions: every new text will start from the same rules.",
      tecniche: ["Role", "Document in XML tags", "List of required sections", "Ban on adding data", "Conflict flagging", "Checklist"],
      fonte: { nome: "Claude Cookbooks — custom skill \"applying-brand-guidelines\" (SKILL.md)", url: "https://github.com/anthropics/claude-cookbooks/blob/main/skills/custom_skills/applying-brand-guidelines/SKILL.md", autore: "Copyright (c) 2023 Anthropic", licenza: "MIT", licenzaUrl: "https://github.com/anthropics/claude-cookbooks/blob/main/LICENSE" },
      modifiche: "The source is a sample brand-guidelines skill for a fictional company (colors, fonts, tone, standard phrases, data formats, prohibited elements, quality checklist); we reused its section structure only, as a prompt that builds such a guideline from the user's own material, with 'to be defined' gaps and a contradictions list. No brand content from the source is reused.",
      revisione: "2026-11-19"
    }),
    p({
      id: "analisi-sentiment-recensioni",
      tipo: "adattato",
      categoria: "analisi",
      titolo: "Sentiment and themes in customer reviews",
      descrizione: "Scores the sentiment of a batch of reviews and groups them by theme, with quotes and actions.",
      testo: `You are a customer feedback analyst.

<context>
Business and product: {business}
Source of the reviews and period: {source}
</context>

<reviews>
{reviews}
</reviews>

Task:
1. For each review give: id, overall sentiment (positive, negative, neutral, mixed) and strength (weak or strong).
2. Group the reviews by theme (for example product quality, delivery, price, staff, ease of use). For each theme: number of reviews, sentiment balance, one representative short quote.
3. Point out the 3 themes that most affect satisfaction and whether they are praise or complaints.
4. Suggest one action per theme and one reply template for the most common complaint.

Constraints:
- Count only what is in the reviews provided; do not extrapolate to all customers or invent percentages for a population.
- Treat irony and mixed reviews carefully: if unsure, mark the review "uncertain" and say why.
- Quotes must be verbatim and short.

Format: first the per-review table (id | sentiment | strength | themes), then the theme table, then the 3 key themes, actions and the reply template.`,
      variabili: [
        { nome: "business", etichetta: "Business and product", esempio: "neighborhood pizzeria with delivery" },
        { nome: "source", etichetta: "Source and period", esempio: "Google reviews, last 6 months" },
        { nome: "reviews", etichetta: "Reviews", esempio: "(paste the reviews, one per line, numbered)" }
      ],
      consiglio: "Number the reviews before pasting them: it makes the per-review table easy to check against the originals.",
      tecniche: ["Role", "Data in XML tags", "Fixed structure", "Citations as support", "Ban on invented data", "Uncertainty flagging"],
      fonte: { nome: "Google Gemini Cookbook — \"Sentiment Analysis\" (JSON capabilities)", url: "https://github.com/google-gemini/cookbook/blob/main/examples/json_capabilities/Sentiment_Analysis.ipynb", autore: "Copyright 2026 Google LLC (notebook header)", licenza: "Apache-2.0", licenzaUrl: "https://github.com/google-gemini/cookbook/blob/main/LICENSE" },
      modifiche: "The notebook scores positive/negative/neutral sentiment with a weak/strong magnitude for single restaurant reviews via a JSON schema; we kept the sentiment-plus-strength idea and applied it to a batch of reviews, adding a 'mixed' class, theme grouping, quotes, actions, a reply template and rules on irony and extrapolation.",
      revisione: "2026-11-19"
    }),
    p({
      id: "analisi-valuta-testi-rubrica",
      tipo: "adattato",
      categoria: "analisi",
      titolo: "Score marketing copy against a rubric",
      descrizione: "Evaluates one or more copy variants with a scored rubric and anchored examples, before you test them with real users.",
      testo: `You are a strict copy editor who evaluates marketing texts with a rubric.

<context>
Type of text and channel: {text_type}
Goal of the text: {goal}
Reader: {reader}
Source facts the text must respect: {source_facts}
</context>

<variants>
{variants}
</variants>

<rubric>
1. Clarity (1-5): 1 = the reader cannot tell what is offered; 3 = clear but needs a second read; 5 = understood at first glance.
2. Accuracy (1-5): 1 = contains claims not in the source facts; 3 = minor stretches; 5 = every claim matches the source facts.
3. Fit for the reader (1-5): 1 = wrong vocabulary or tone; 3 = generic; 5 = sounds written for this reader.
4. Call to action (1-5): 1 = missing or vague; 3 = present but weak; 5 = one clear, specific next step.
{extra_criteria}
</rubric>

<anchor_examples>
{anchor_examples}
</anchor_examples>

Task:
1. Score each variant on every criterion, with one sentence of justification that quotes the text.
2. List any claim that is not supported by the source facts.
3. Rank the variants and name the weakest criterion of the winner, with a concrete fix.

Constraints:
- Use the anchor examples to calibrate the scores; if none are given, be conservative (do not give 5 without a clear reason).
- Judge only the text; do not predict click or conversion rates.

Format: a table (variant | clarity | accuracy | fit | CTA | extra | total), then the unsupported claims, the ranking and the fix.`,
      variabili: [
        { nome: "text_type", etichetta: "Type of text and channel", esempio: "promotional email for existing customers" },
        { nome: "goal", etichetta: "Goal", esempio: "book a spring service appointment" },
        { nome: "reader", etichetta: "Reader", esempio: "owners of electric bikes bought from us in the last 2 years" },
        { nome: "source_facts", etichetta: "Source facts", esempio: "service costs 49 euro, takes 1 hour, slots from 3 to 30 April" },
        { nome: "variants", etichetta: "Variants to evaluate", esempio: "(paste variants A, B, C)" },
        { nome: "extra_criteria", etichetta: "Extra criteria (optional)", esempio: "5. Brand voice (1-5): 1 = off-brand; 5 = matches our guidelines" },
        { nome: "anchor_examples", etichetta: "Anchor examples (optional)", esempio: "(a past text you would score 5 and one you would score 2, with the scores)" }
      ],
      consiglio: "Keep the same rubric and anchor examples for months: the scores become comparable and you can see whether your copy is improving.",
      tecniche: ["Role", "Context in XML tags", "Rubric with anchored levels", "Few-shot examples", "Quoted evidence", "Ban on invented data"],
      fonte: { nome: "Anthropic Courses — Prompt evaluations, lesson 9 \"Custom model-graded evals\" (custom_llm_eval.py)", url: "https://github.com/anthropics/courses/blob/master/prompt_evaluations/09_custom_model_graded_prompt_foo/custom_llm_eval.py", autore: "Anthropic", licenza: "CC BY-NC 4.0", licenzaUrl: "https://github.com/anthropics/courses/blob/master/LICENSE" },
      modifiche: "The lesson's grader scores article summaries for conciseness, accuracy and tone on 1-5 scales with described levels and example summaries; we kept the anchored 1-5 rubric with examples but replaced the criteria with marketing ones (clarity, accuracy to source facts, reader fit, CTA, optional extra), compared several variants and added unsupported-claim detection and a ranking.",
      revisione: "2026-11-19"
    }),
    p({
      id: "analisi-classifica-messaggi",
      tipo: "adattato",
      categoria: "analisi",
      titolo: "Classify inbound messages into your own categories",
      descrizione: "Sorts emails, DMs, form submissions or comments into categories you define, so you can count them and route them.",
      testo: `You classify inbound messages for a marketing and sales team.

<categories>
{categories}
</categories>

<examples>
{examples}
</examples>

<messages>
{messages}
</messages>

Task:
1. Assign each message to exactly one category from the list. Use the category descriptions, not just the labels.
2. If a message fits none, use "other"; if it fits two, choose the one that decides who should answer it and note the second.
3. Give a confidence level (high, medium, low) and, for medium or low, a one-line reason.
4. At the end, count the messages per category and list any recurring request that might deserve a new category.

Constraints:
- Use only the categories given; do not invent new ones in the classification itself.
- Do not copy personal data (names, emails, phone numbers) into the output: refer to messages by their number.

Format: a table (message no. | category | second category | confidence | reason), then the counts and the suggestions.`,
      variabili: [
        { nome: "categories", etichetta: "Categories with descriptions", esempio: "Quote request: asks for prices or a proposal; Partnership: proposes collaboration; Support: problem with an order; Job: application or CV; Spam" },
        { nome: "examples", etichetta: "Classified examples (optional)", esempio: "\"Can you send me a price for 200 mugs with our logo?\" -> Quote request" },
        { nome: "messages", etichetta: "Messages", esempio: "(paste the messages, numbered)" }
      ],
      consiglio: "Write a short description for each category, not just a label: in the source guide, descriptions and a few examples are what improve accuracy the most.",
      tecniche: ["Categories in XML tags", "Few-shot examples", "Single-label rule", "Confidence levels", "Data anonymization"],
      fonte: { nome: "Claude Cookbooks — \"Classification\" guide (insurance support ticket classifier)", url: "https://github.com/anthropics/claude-cookbooks/blob/main/capabilities/classification/guide.ipynb", autore: "Copyright (c) 2023 Anthropic", licenza: "MIT", licenzaUrl: "https://github.com/anthropics/claude-cookbooks/blob/main/LICENSE" },
      modifiche: "The guide classifies insurance support tickets into ten predefined categories with descriptions in XML tags, then improves accuracy with retrieved examples; we kept categories-with-descriptions and examples in XML tags, made both user-defined for marketing and sales inboxes, and added a tie-break rule, confidence levels, counts and suggestions for new categories.",
      revisione: "2026-11-19"
    })
  ];
})();

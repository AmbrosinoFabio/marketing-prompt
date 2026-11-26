# Marketing Prompt

**A free library of original digital marketing prompts for Claude (and other AI assistants), with a private space to save your own.**
English by default, also available in Italian (button **IT** in the header). Dark theme by default, light theme with one click.

**Shortcuts:** `Ctrl K` (or `/`) quick search from any page · `C` copy the open prompt · `Esc` close.

**Open in Claude:** the button in every prompt opens claude.ai in a new tab with the filled-in prompt in the chat box (nothing is sent until you press Enter). The prompt is also copied, so you can paste it if the box stays empty.

🔗 **Live site:** https://ambrosinofabio.github.io/marketing-prompt/

## What's inside

| Page | What it does |
|---|---|
| **Home** | How a good prompt is built, categories, and news updated every day from official AI sources and marketing blogs |
| **Prompt library** | 72 prompts in 12 categories, (SEO, briefs, copywriting, ads, email, social, content calendar, personas, competitors, strategy, brand voice, analytics & CRO), in two sections: 48 original prompts and 24 adapted from openly licensed sources, each with source, author, license and changes. Search, fill in the fields, copy |
| **My prompts** | Create, edit, mark as favorite and reuse your own prompts. `{name}` in the text becomes a field to fill in. Export / import a JSON backup |
| **Sources & licenses** | Official prompting guides, news sources, licenses, privacy, AI disclosure |

## Download and use it on your computer

You need **only a web browser**: no installation, no account, no internet connection (except for the news).

1. On GitHub click **Code → Download ZIP** (or `git clone https://github.com/AmbrosinoFabio/marketing-prompt.git`).
2. Unzip the folder.
3. Double-click **`index.html`**.

### If something doesn't work with a double click

Some browsers limit pages opened as files (`file://`), e.g. Safari or copying to the clipboard.
In that case start the small local server included (requires [Python](https://www.python.org/downloads/) 3):

| System | What to do |
|---|---|
| Windows | double-click `avvia.bat` |
| macOS | double-click `avvia.command` (the first time: right click → Open) |
| Linux | `./avvia.sh` |
| Any | from the folder: `python -m http.server 8000`, then open http://localhost:8000 |

### Your data

- Your prompts are saved **only in the browser you use** (localStorage). Nothing is sent online.
- Changing browser, moving the folder or clearing browsing data can make them disappear:
  use **Export backup** regularly and **Import backup** to restore them (also on another computer).
- The site online and the downloaded copy are separate "places": prompts saved in one are not
  visible in the other. Move them with export/import.

### Updating

`git pull`, or download the ZIP again (your prompts are not touched, but export them first).
When opened as a local file, the home page also asks the live site for the latest news (`data/news.json`, plain data, 5-second limit).

## For developers

Plain HTML, CSS and vanilla JavaScript: no build step, no dependencies.
Data lives in `.js` files (not JSON) so the site works from `file://`.

```
index.html  prompt.html  miei-prompt.html  fonti.html
css/style.css     design "Precision": tokens on :root (dark) and [data-theme="light"]
fonts/            Geist + Geist Mono (SIL OFL 1.1), stored locally for offline use
js/palette.js     quick search (Ctrl K)
js/i18n.js        languages (EN default + IT) — load first
js/comune.js      theme, menu, copy, variables {name}
js/store.js       "My prompts" storage, export/import
js/dialogo.js     dialog to fill in and copy a prompt
js/dati-lingua.js loads data/prompts-it.js only when the page is in Italian
js/libreria.js  js/miei.js  js/home.js
data/prompts.js      prompts (English, main)
data/prompts-it.js   Italian translation (same ids)
data/categorie.js    categories EN + IT
data/news.js         generated: do not edit (news.json = same data for tools and local copies)
tools/fonti.py           news sources and watched pages
tools/aggiorna_news.py   updates data/news.js (standard library only)
tools/valida_prompt.py   checks the prompt library
.github/workflows/news.yml   runs the update every day at 06:00 UTC
.github/workflows/valida.yml checks the prompts on every push / pull request that changes them
```

**Security:** every page has a Content-Security-Policy meta tag (scripts and styles only from the site itself, no inline code): keep new code in `js/` files and use no `onclick=` or `style=` attributes.

**Adding a prompt:** add it to `data/prompts.js` and its translation to `data/prompts-it.js`
(same `id`), then run `python tools/valida_prompt.py`.

**News:** `python tools/aggiorna_news.py` updates them by hand. On GitHub the workflow does it
every day; it also opens an issue when Anthropic's prompting guide changes (Anthropic has no RSS
feed). GitHub pauses scheduled workflows after 60 days without activity in the repository: if it
happens, re-enable it from the Actions tab.

## Licenses

- **Code:** [MIT](LICENSE)
- **Fonts:** Geist and Geist Mono, [SIL Open Font License 1.1](fonts/OFL.txt)
- **Content** (prompts, translations, texts): [CC BY-NC 4.0](LICENSE-CONTENT.md) — free to reuse
  and adapt for non-commercial purposes, with attribution.
- **Adapted prompts:** sources and required notices in [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)
- Personal, non-profit, open-source project: no ads, no affiliate links, no tracking.

Prompts and texts were written with AI assistance (Claude) under the editorial responsibility of
the author. They may contain errors: [report them](https://github.com/AmbrosinoFabio/marketing-prompt/issues).
Not affiliated with Anthropic, OpenAI or Google.

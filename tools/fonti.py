"""Sources read by tools/aggiorna_news.py.

FEEDS: RSS/Atom feeds shown as news on the home page.
  - nome: name shown on the site
  - url:  feed address (all checked on 2026-11-18)
  - tipo: "ai" or "marketing" (home page filters)
  - max:  how many items to keep from each run of this source

PAGINE_SORVEGLIATE: pages without a feed (Anthropic has no RSS). The script saves a
fingerprint (hash) of each one; when it changes, the GitHub workflow opens an issue
to remind you to review the library.

To add a source: add a line, run `python tools/aggiorna_news.py` and check data/news.js.
Do not add sites that block automated access (e.g. Search Engine Land / Search Engine
Journal answered 403 in the test).
"""

FEEDS = [
    # ----- AI & prompting -----
    {"nome": "OpenAI News", "url": "https://openai.com/news/rss.xml", "tipo": "ai", "max": 6},
    {"nome": "Google AI Blog", "url": "https://blog.google/technology/ai/rss/", "tipo": "ai", "max": 5},
    {"nome": "Google Gemini", "url": "https://blog.google/products/gemini/rss/", "tipo": "ai", "max": 5},
    {"nome": "Google for Developers", "url": "https://developers.googleblog.com/rss/", "tipo": "ai", "max": 4},
    {"nome": "Claude cookbooks (GitHub)", "url": "https://github.com/anthropics/claude-cookbooks/commits/main.atom", "tipo": "ai", "max": 3},
    {"nome": "Anthropic courses (GitHub)", "url": "https://github.com/anthropics/courses/commits/master.atom", "tipo": "ai", "max": 2},
    {"nome": "OpenAI cookbook (GitHub)", "url": "https://github.com/openai/openai-cookbook/commits/main.atom", "tipo": "ai", "max": 2},
    # ----- Marketing -----
    {"nome": "HubSpot Marketing Blog", "url": "https://blog.hubspot.com/marketing/rss.xml", "tipo": "marketing", "max": 6},
    {"nome": "Moz Blog", "url": "https://moz.com/posts/rss/blog", "tipo": "marketing", "max": 5},
    {"nome": "Ahrefs Blog", "url": "https://ahrefs.com/blog/feed/", "tipo": "marketing", "max": 5},
    {"nome": "Social Media Examiner", "url": "https://www.socialmediaexaminer.com/feed/", "tipo": "marketing", "max": 5},
]

PAGINE_SORVEGLIATE = [
    {"nome": "Claude prompting best practices",
     "url": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices.md"},
    {"nome": "Claude prompt engineering overview",
     "url": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview.md"},
]

#!/bin/sh
# Starts a small local web server and opens the site (Linux / macOS).
cd "$(dirname "$0")" || exit 1
URL="http://localhost:8000/index.html"
if command -v python3 >/dev/null 2>&1; then PY=python3; elif command -v python >/dev/null 2>&1; then PY=python; else
  echo "Python not found. Open index.html with a double click, or install Python from https://www.python.org/downloads/"; exit 1; fi
( sleep 1; if command -v xdg-open >/dev/null 2>&1; then xdg-open "$URL"; elif command -v open >/dev/null 2>&1; then open "$URL"; fi ) &
echo "Site running at $URL — press Ctrl+C to stop."
"$PY" -m http.server 8000

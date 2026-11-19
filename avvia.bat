@echo off
rem Starts a small local web server and opens the site in the browser.
rem Needed only if double-clicking index.html does not work well (e.g. some browsers block features on file://).
cd /d "%~dp0"
where python >nul 2>nul
if %errorlevel%==0 (
  start "" http://localhost:8000/index.html
  python -m http.server 8000
  goto :eof
)
where py >nul 2>nul
if %errorlevel%==0 (
  start "" http://localhost:8000/index.html
  py -m http.server 8000
  goto :eof
)
echo Python not found. Open index.html with a double click, or install Python from https://www.python.org/downloads/
pause

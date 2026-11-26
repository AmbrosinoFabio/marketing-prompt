/* Loads the prompt translation only for the language in use (MP.lingua, set by i18n.js),
   so English pages do not download the Italian file (about 170 KB).
   document.write keeps it a normal, in-order script: the scripts after this one
   (store, library…) find window.PROMPTS_IT ready, also when the site is opened as a
   local file. Changing language reloads the page, so this runs again. */
(function () {
  "use strict";
  var FILE = { it: "data/prompts-it.js" };
  var f = window.MP && FILE[window.MP.lingua];
  if (f) document.write('<script src="' + f + '"><\/script>');
})();

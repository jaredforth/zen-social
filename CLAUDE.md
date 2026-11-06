# zen social

Chrome MV3 extension. Pauses before distracting sites, hides feeds and recommendations, grays out social sites. Plain JS/CSS, no build step, no dependencies.

Load: `chrome://extensions` → Developer mode → Load unpacked → this folder. Reload the card after edits.

## Files

- `settings.js`: site lists and defaults, shared by `content.js` and `options.js`.
- `content.js` + `content.css`: injected at `document_start`.
- `options.html` + `options.js`: settings page (toolbar icon opens it).
- `background.js`: closes the tab on "leave"; opens settings on icon click.

## Rules

- **Site lists live in two places.** `settings.js` and `manifest.json` `content_scripts[].matches`. After editing a list, regenerate matches:
  ```sh
  node -e 'const fs=require("fs");eval(fs.readFileSync("settings.js","utf8").replace(/const /g,"var "));const m=JSON.parse(fs.readFileSync("manifest.json"));const p=d=>`*://*.${d}/*`;m.content_scripts[0].matches=ZS_SITES.map(p);m.content_scripts[1].matches=ZS_PAUSE_ONLY.map(p);fs.writeFileSync("manifest.json",JSON.stringify(m,null,2)+"\n")'
  ```
- **`ZS_SITES` and `ZS_PAUSE_ONLY` must not overlap.** Overlap injects `content.js` twice and it crashes on `const` redeclare.
- Every site gets `gray.css` (grayscale follows `pauseSites`). Only `ZS_SITES` (social) gets `content.css` (feed/algo hiding).
- `ZS_CHAT` sites skip feed hiding (feed CSS hides `main`, which is the chat).
- CSS features are on by default and turned off via `html[data-zs-off~="gray|feed|algo"]`, so enabled features never flash in late. Keep new CSS rules gated the same way.
- Feed pages are set by `isFeed()` in `content.js` → `html[data-zs-feed]`.
- Saved `sites`/`pauseSites` in `chrome.storage.sync` override defaults, so new default sites don't reach existing installs.

## Design

Dark only, minimal, monochrome (Light Phone feel): black bg, white text, light Helvetica-style type, lowercase copy, text-link buttons, no color. The pause overlay lives in a closed shadow root with its own styles, so it works on pause-only sites and site CSS can't leak in.

# Chrome Web Store listing

Upload `dist/zen-social.zip`. Build it with:

```sh
rm -f dist/zen-social.zip && mkdir -p dist && zip -qr dist/zen-social.zip manifest.json background.js content.js content.css gray.css settings.js options.html options.js icons
```

Bump `version` in `manifest.json` before each new upload.

## Store listing tab

**Name:** zen social

**Summary** (max 132 chars):
Pause before distracting sites, hide social feeds and recommendations, and turn it all gray.

**Description:**
zen social makes the internet quieter.

pause: before a distracting site opens, a black screen asks "why are you here?" Leave, or continue after a short countdown.

no feeds: home feeds, explore, reels, shorts and For You pages are hidden on Facebook, Instagram, Threads, YouTube, LinkedIn, X, TikTok, Pinterest and Reddit. Single posts and search still work.

no recommendations: YouTube suggestions, end screens and Shorts, and X trends and "who to follow", are hidden.

gray: every distracting site shows in grayscale, so it pulls less at your attention.

Turn each feature and each site on or off from the toolbar icon. Set the pause length to suit you.

No accounts. No tracking. No data leaves your browser.

**Category:** Productivity (Workflow & Planning)
**Language:** English

**Graphics:**
- Store icon (128x128): `icons/128.png`
- Screenshots (1280x800): `store/screenshot-pause.png`, `store/screenshot-settings.png`
- Small promo tile (440x280): `store/promo-440x280.png`
- Marquee promo tile (1400x560): `store/marquee-1400x560.png`

## Privacy practices tab

**Single purpose:**
Reduce distraction on social and other time-consuming websites by adding a pause before they open, hiding feeds and recommendations, and showing them in grayscale.

**Permission justifications:**
- `storage`: saves the user's settings (which features and sites are on, and the pause length).
- Host permissions (content scripts on the listed sites): the extension must run on these sites to show the pause screen, hide feeds and recommendations, and apply grayscale. It reads no page content and sends nothing anywhere.

**Remote code:** No, I am not using remote code.

**Data usage:** Collects none of the listed data types. Check all three certifications (no selling, no unrelated use, no creditworthiness use).

**Privacy policy URL:** `https://github.com/jaredforth/zen-social/blob/main/PRIVACY.md` (needs the repo to be public).

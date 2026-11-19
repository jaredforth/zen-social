<p align="center"><img src="logo.svg" width="96" alt="zen social logo"></p>

# zen social

A minimal Chrome extension for calmer browsing.

- **pause:** before a distracting site opens, a black screen asks "why are you here?" You can leave, or continue after a short countdown (10 seconds by default). It shows once per tab per site.
- **no feeds:** hides home feeds, explore pages and short-video feeds on popular social sites. Single posts and searches still work.
- **no recommendations:** hides suggested videos, end screens, trends and "who to follow" panels.
- **gray:** every distracting site shows in grayscale.

Social sites (all four features): Facebook, Instagram, Threads, Messenger, WhatsApp, YouTube, LinkedIn, X, TikTok, Snapchat, Pinterest, Reddit. Messenger, WhatsApp and Snapchat skip feed hiding, because their main view is your chats.

Pause and gray also cover about 70 other sites: news, streaming, shopping and more. The full list is in [`settings.js`](settings.js).

## Install

1. Clone this repo.
2. Open `chrome://extensions` (or `brave://extensions`).
3. Turn on **Developer mode**.
4. Click **Load unpacked** and choose the repo folder.

## Settings

Click the toolbar icon. You can turn each feature and each site on or off, and set the pause length. Settings sync with your browser profile.

## Development

Plain JS and CSS. No build step and no dependencies. After you edit a file, reload the extension card. See [`CLAUDE.md`](CLAUDE.md) for how the parts work and how to edit them safely.

## License

AGPL-3.0-or-later. See [`LICENSE`](LICENSE).

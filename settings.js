// Shared by content.js and options.js. Keep in sync with manifest.json "matches".
// Social sites (Meta + big tech): feed hiding, recommendation hiding, grayscale (and pause).
const ZS_SITES = [
  'facebook.com', 'instagram.com', 'threads.net', 'threads.com', 'messenger.com', 'whatsapp.com', // Meta
  'youtube.com', 'linkedin.com', 'x.com', 'twitter.com', 'tiktok.com', 'snapchat.com', 'pinterest.com', 'reddit.com',
];
// Chat apps: no feed, so feed hiding would blank the chat.
const ZS_CHAT = ['messenger.com', 'whatsapp.com', 'snapchat.com'];
// Pause-only sites.
const ZS_PAUSE_ONLY = [
  'bbc.co.uk', 'bbc.com', 'hulu.com', 'news.google.com', 'gmail.com',
  'dailymail.co.uk', 'huffingtonpost.com', '9gag.com', 'imgur.com', 'quora.com', 'bing.com', 'foxnews.com',
  'twitch.tv', 'slate.com', 'feedly.com', 'theatlantic.com', 'vimeo.com', 'itunes.apple.com',
  'etsy.com', 'politico.com', 'guardian.co.uk', 'bsky.app', 'chase.com', 'goodreads.com', 'wikipedia.org',
  'archive.org', 'substack.com', 'medium.com',
  // Social / chat
  'tumblr.com', 'discord.com', 'mastodon.social',
  'mail.google.com',
  // Video / streaming
  'netflix.com', 'primevideo.com', 'disneyplus.com', 'max.com', 'peacocktv.com', 'paramountplus.com',
  // News
  'cnn.com', 'nytimes.com', 'washingtonpost.com', 'wsj.com', 'theguardian.com', 'nbcnews.com', 'cnbc.com',
  'bloomberg.com', 'reuters.com', 'apnews.com', 'npr.org', 'usatoday.com', 'axios.com', 'vox.com',
  'buzzfeed.com', 'espn.com', 'theverge.com', 'techcrunch.com', 'wired.com', 'news.ycombinator.com',
  'producthunt.com', 'lobste.rs',
  // Shopping / money
  'amazon.com', 'ebay.com', 'walmart.com', 'target.com', 'aliexpress.com', 'temu.com', 'craigslist.org',
  'zillow.com', 'robinhood.com', 'coinbase.com',
];
const ZS_PAUSE_SITES = [...ZS_SITES, ...ZS_PAUSE_ONLY];
const ZS_DEFAULTS = { pause: true, feed: true, algo: true, gray: true, seconds: 10, sites: ZS_SITES, pauseSites: ZS_PAUSE_SITES };

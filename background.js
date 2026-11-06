// "Leave" on the pause screen closes the tab.
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg === 'close') chrome.tabs.remove(sender.tab.id);
});

// Saved site lists override defaults, so on install/update add defaults not seen before.
// `seen` remembers past defaults, so a site the user unchecked stays unchecked.
importScripts('settings.js');
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['sites', 'pauseSites', 'seen'], (s) => {
    const seen = s.seen || [];
    const out = { seen: ZS_PAUSE_SITES };
    for (const [key, all] of [['sites', ZS_SITES], ['pauseSites', ZS_PAUSE_SITES]]) {
      if (s[key]) out[key] = [...new Set([...s[key], ...all.filter((d) => !seen.includes(d))])];
    }
    chrome.storage.sync.set(out);
  });
});

// Toolbar icon opens settings.
chrome.action.onClicked.addListener(() => chrome.runtime.openOptionsPage());

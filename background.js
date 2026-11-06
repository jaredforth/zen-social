// "Leave" on the pause screen closes the tab.
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg === 'close') chrome.tabs.remove(sender.tab.id);
});

// Toolbar icon opens settings.
chrome.action.onClicked.addListener(() => chrome.runtime.openOptionsPage());

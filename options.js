const FEATURES = { pause: 'pause', feed: 'hide feeds', algo: 'hide recommendations', gray: 'grayscale' };
const $ = (id) => document.getElementById(id);

const box = (parent, checked, text, onchange) => {
  const label = document.createElement('label');
  label.append(Object.assign(document.createElement('input'), { type: 'checkbox', checked, onchange }), ' ' + text);
  parent.append(label);
};

chrome.storage.sync.get(ZS_DEFAULTS, (s) => {
  for (const [k, text] of Object.entries(FEATURES)) {
    box($('features'), s[k], text, (e) => chrome.storage.sync.set({ [k]: e.target.checked }));
  }
  for (const [key, all] of [['sites', ZS_SITES], ['pauseSites', ZS_PAUSE_SITES]]) {
    for (const d of all) {
      box($(key), s[key].includes(d), d, (e) => {
        s[key] = e.target.checked ? [...s[key], d] : s[key].filter((x) => x !== d);
        chrome.storage.sync.set({ [key]: s[key] });
      });
    }
  }
  $('seconds').value = s.seconds;
  $('seconds').onchange = () => chrome.storage.sync.set({ seconds: Math.max(0, Math.min(120, +$('seconds').value || 0)) });
});

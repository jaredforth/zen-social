const root = document.documentElement;

// Feed / algorithmic pages: home timelines, explore, reels, shorts, For You, r/popular, r/all.
const isFeed = (p) => p === '/' || /^\/(home|feed|explore|reels|shorts|foryou|r\/popular|r\/all)(\/|$)/.test(p);
const here = (list) => list.some((d) => location.hostname === d || location.hostname.endsWith('.' + d));

// ponytail: polls for SPA navigation; switch to the Navigation API if 300ms lag matters.
const mark = () => root.toggleAttribute('data-zs-feed', !here(ZS_CHAT) && isFeed(location.pathname));
mark();
setInterval(mark, 300);

// CSS features are on until listed in data-zs-off, so enabled ones never flash in late.
const apply = (s) => {
  root.dataset.zsOff = ['gray', 'feed', 'algo'].filter((f) => !here(s.sites) || !s[f]).join(' ');
};

chrome.storage.sync.get(ZS_DEFAULTS, (s) => {
  apply(s);
  if (s.pause && here(s.pauseSites)) pause(s.seconds);
});
chrome.storage.onChanged.addListener(() => chrome.storage.sync.get(ZS_DEFAULTS, apply));

// Pause: once per tab per site, make the user wait before continuing.
function pause(seconds) {
  if (sessionStorage.getItem('zs-paused')) return;
  const o = document.createElement('div');
  o.id = 'zs-pause';
  o.innerHTML = `
    <p>breathe.</p>
    <p>why are you here?</p>
    <div><button id="zs-leave">leave</button><button id="zs-go"></button></div>`;
  root.append(o);

  const go = o.querySelector('#zs-go');
  let n = seconds;
  const tick = () => {
    go.disabled = n > 0;
    go.textContent = n > 0 ? `continue ${n--}` : 'continue';
    if (!go.disabled) clearInterval(t);
  };
  const t = setInterval(tick, 1000);
  tick();

  go.onclick = () => { sessionStorage.setItem('zs-paused', '1'); o.remove(); };
  o.querySelector('#zs-leave').onclick = () => chrome.runtime.sendMessage('close');
}

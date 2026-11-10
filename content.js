const root = document.documentElement;

// Feed / algorithmic pages: home timelines, explore, reels, shorts, For You, r/popular, r/all.
const isFeed = (p) => p === '/' || /^\/(home|feed|explore|reels|shorts|foryou|r\/popular|r\/all|tag|topic|explore-topics|notifications)(\/|$)/.test(p);
const here = (list) => list.some((d) => location.hostname === d || location.hostname.endsWith('.' + d));

// ponytail: polls for SPA navigation; switch to the Navigation API if 300ms lag matters.
const mark = () => root.toggleAttribute('data-zs-feed', !here(ZS_CHAT) && isFeed(location.pathname));
if (here(['bsky.app'])) root.setAttribute('data-zs-keep', '');
if (here(['linkedin.com'])) root.setAttribute('data-zs-keep', 'li');
mark();
setInterval(mark, 300);

// CSS features are on until listed in data-zs-off, so enabled ones never flash in late.
const apply = (s) => {
  // gray follows the pause list (every distracting site); feed/algo follow the social list.
  const list = { gray: s.pauseSites, feed: s.sites, algo: s.sites };
  root.dataset.zsOff = Object.keys(list).filter((f) => !s[f] || !here(list[f])).join(' ');
};

chrome.storage.sync.get(ZS_DEFAULTS, (s) => {
  apply(s);
  if (s.pause && here(s.pauseSites)) pause(s.seconds);
});
chrome.storage.onChanged.addListener(() => chrome.storage.sync.get(ZS_DEFAULTS, apply));

// Pause: once per tab per site, make the user wait before continuing.
function pause(seconds) {
  if (sessionStorage.getItem('zs-paused')) return;
  // Shadow root: styles ship with the overlay (pause-only sites don't load content.css)
  // and site CSS can't leak in. Inline !important on the host beats site CSS.
  const o = document.createElement('div');
  o.style.cssText = 'all: initial !important; position: fixed !important; inset: 0 !important; z-index: 2147483647 !important;';
  const shadow = o.attachShadow({ mode: 'closed' });
  shadow.innerHTML = `
    <style>
      dialog {
        position: fixed; inset: 0; width: 100%; height: 100%; max-width: none; max-height: none;
        margin: 0; padding: 0; border: 0; pointer-events: auto;
        display: none;
      }
      dialog[open] {
        display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
        background: #000; color: #fff;
        font: 300 28px/1.4 -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif;
        letter-spacing: -0.01em;
      }
      p { margin: 0; animation: breathe 8s ease-in-out infinite; }
      div { display: flex; gap: 48px; margin-top: 64px; }
      button {
        all: unset; font-size: 16px; cursor: pointer;
        border-bottom: 1px solid currentColor; padding-bottom: 2px;
      }
      button:disabled { cursor: default; color: #555; border-color: transparent; }
      button:focus-visible { outline: 1px solid #fff; outline-offset: 4px; }
      @keyframes breathe { 50% { opacity: .35; } }
    </style>
    <dialog>
      <p>breathe.</p>
      <p>why are you here?</p>
      <div><button id="zs-leave">leave</button><button id="zs-go"></button></div>
    </dialog>`;
  root.append(o);
  // Top-layer modal: sites that open their own modal dialog make everything else inert.
  const d = shadow.querySelector('dialog');
  d.oncancel = (e) => e.preventDefault();
  d.showModal();
  // A site dialog opened later would sit above ours; re-show ours so it stays on top.
  let seen = 0;
  const top = setInterval(() => {
    const k = document.querySelectorAll(':modal').length;
    if (k !== seen && (seen = k)) { d.close(); d.showModal(); }
  }, 300);

  const go = shadow.getElementById('zs-go');
  let n = seconds;
  const tick = () => {
    go.disabled = n > 0;
    go.textContent = n > 0 ? `continue ${n--}` : 'continue';
    if (!go.disabled) clearInterval(t);
  };
  const t = setInterval(tick, 1000);
  tick();

  const leave = shadow.getElementById('zs-leave');
  const act = (b) => {
    if (b === go && !go.disabled) { sessionStorage.setItem('zs-paused', '1'); o.remove(); clearInterval(top); for (const t of EV) removeEventListener(t, trap, true); }
    else if (b === leave) chrome.runtime.sendMessage('close');
  };
  // Page scripts (LinkedIn) can swallow clicks before they reach the shadow DOM, so handle
  // them at the window in the capture phase and hit-test the buttons ourselves.
  const hit = (b, e) => { const r = b.getBoundingClientRect(); return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top - 8 && e.clientY <= r.bottom + 8; };
  const trap = (e) => {
    e.stopImmediatePropagation(); e.preventDefault();
    if (e.type === 'click') act([go, leave].find((b) => hit(b, e)));
  };
  const EV = ['click', 'mousedown', 'mouseup', 'pointerdown', 'pointerup'];
  for (const t of EV) addEventListener(t, trap, true);
}

/* ══════════════════════════════════════════════════════════
   ITM RESCUE FORCE — app.js v4.0
   100% offline — no API, no internet required for AI
   ══════════════════════════════════════════════════════════ */
'use strict';

/* ── THEME ──────────────────────────────────────────────── */
const html     = document.documentElement;
const iconSun  = document.getElementById('iconSun');
const iconMoon = document.getElementById('iconMoon');

function applyTheme(t) {
  html.setAttribute('data-theme', t);
  localStorage.setItem('rfTheme', t);
  if (iconSun)  iconSun.style.display  = t === 'dark'  ? 'inline' : 'none';
  if (iconMoon) iconMoon.style.display = t === 'light' ? 'inline' : 'none';
}
applyTheme(localStorage.getItem('rfTheme') || 'dark');

document.getElementById('themeToggle')?.addEventListener('click', () =>
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark')
);

/* ── NAVBAR ─────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (!navbar) return;
  const scrolled = window.scrollY > 40;
  navbar.classList.toggle('at-top',  !scrolled);
  navbar.classList.toggle('scrolled', scrolled);
}, { passive: true });

/* ── MOBILE MENU ────────────────────────────────────────── */
const mobileNav   = document.getElementById('mobileNav');
const hamburger   = document.getElementById('hamburger');
const mobileClose = document.getElementById('mobileClose');
hamburger?.addEventListener('click',   () => mobileNav?.classList.add('open'));
mobileClose?.addEventListener('click', () => mobileNav?.classList.remove('open'));
document.querySelectorAll('.mob-link').forEach(l =>
  l.addEventListener('click', () => mobileNav?.classList.remove('open'))
);

/* ── COUNTER ANIMATION ──────────────────────────────────── */
function animateNum(el, target, dur = 1800) {
  let start = null;
  const tick = ts => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    // Ease out quad
    const ease = 1 - (1 - p) * (1 - p);
    el.textContent = Math.floor(ease * target).toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString();
  };
  requestAnimationFrame(tick);
}

const numObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateNum(e.target, parseInt(e.target.dataset.target));
      numObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => numObs.observe(el));

/* ── SCROLL REVEAL ──────────────────────────────────────── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 0.06 + 's';
  revObs.observe(el);
});

/* ── LIVE CLOCK ─────────────────────────────────────────── */
function updateClock() {
  const el = document.getElementById('lastUpdate');
  if (!el) return;
  el.textContent = new Date().toLocaleString('en-BD', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
  });
}
updateClock();
setInterval(updateClock, 1000);

/* ── DASHBOARD LIVE SIM ─────────────────────────────────── */
(function () {
  const vals = [3, 4, 2, 5, 3, 4, 3]; let i = 0;
  setInterval(() => {
    const el1 = document.getElementById('activeCount');
    const el2 = document.getElementById('heroActive');
    i = (i + 1) % vals.length;
    if (el1) el1.textContent = vals[i];
    if (el2) el2.textContent = vals[i];
  }, 8000);
})();

/* ── UPDATE TOPIC COUNT ─────────────────────────────────── */
const tcEl = document.getElementById('topicCountDisplay');
if (tcEl && window.RescueGPT) tcEl.textContent = window.RescueGPT.topicCount;

/* ── GEOLOCATION ────────────────────────────────────────── */
function getLocation() {
  const btn    = document.getElementById('btnGPS');
  const info   = document.getElementById('locInfo');
  const input  = document.getElementById('repLocation');
  if (!navigator.geolocation) { info.textContent = 'Geolocation not supported by your browser.'; return; }
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Locating...';
  btn.disabled  = true;
  info.textContent = 'Acquiring GPS coordinates...';
  navigator.geolocation.getCurrentPosition(
    async ({ coords: { latitude: lat, longitude: lng } }) => {
      input.value      = lat.toFixed(5) + ', ' + lng.toFixed(5);
      btn.innerHTML    = '<i class="fa-solid fa-check"></i> Located';
      info.textContent = 'Location acquired.';
      try {
        const r = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const d = await r.json();
        if (d?.display_name) {
          input.value      = d.display_name;
          info.textContent = d.display_name.split(',').slice(0, 3).join(',');
        }
      } catch (_) { /* use coordinates */ }
    },
    err => {
      info.textContent = 'GPS error: ' + err.message;
      btn.innerHTML    = '<i class="fa-solid fa-crosshairs"></i> GPS';
      btn.disabled     = false;
    },
    { timeout: 10000, enableHighAccuracy: true }
  );
}

/* ── EMERGENCY FORM ─────────────────────────────────────── */
const emergForm = document.getElementById('emergencyForm');
emergForm?.addEventListener('submit', e => {
  e.preventDefault();
  const type     = document.getElementById('repType').value;
  const location = document.getElementById('repLocation').value;
  const desc     = document.getElementById('repDesc').value;
  if (!type || !location || !desc) {
    alert('Please fill in all required fields (marked with *).');
    return;
  }
  const id = 'RF-' + Date.now().toString().slice(-8).toUpperCase();
  const reports = JSON.parse(localStorage.getItem('rescueReports') || '[]');
  reports.push({
    id, type, location, desc, timestamp: new Date().toISOString(),
    severity: document.querySelector('input[name="severity"]:checked')?.value || 'medium',
    name:  document.getElementById('repName').value,
    phone: document.getElementById('repPhone').value
  });
  localStorage.setItem('rescueReports', JSON.stringify(reports));
  emergForm.style.display                             = 'none';
  document.getElementById('reportSuccess').style.display = 'block';
  document.getElementById('reportId').textContent     = 'Report ID: ' + id;
});

function resetForm() {
  emergForm?.reset();
  if (emergForm) emergForm.style.display                       = 'block';
  document.getElementById('reportSuccess').style.display = 'none';
  document.getElementById('locInfo').textContent         = '';
  const btn = document.getElementById('btnGPS');
  if (btn) { btn.innerHTML = '<i class="fa-solid fa-crosshairs"></i> GPS'; btn.disabled = false; }
}

/* ══════════════════════════════════════════════════════════
   RESCUEGPT CHATBOT UI — powered by offline engine
   ══════════════════════════════════════════════════════════ */

const chatBody  = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const sendBtn   = document.getElementById('sendBtn');
const chatQuick = document.getElementById('chatQuick');

/* ── Render helpers ─────────────────────────────────────── */
function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

function fmtText(t) {
  // Bold: **text**
  // Bullet lines: lines starting with •
  // Line breaks
  return t
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .split('\n')
    .map(line => {
      if (line.startsWith('•')) {
        return '<div style="display:flex;gap:8px;align-items:baseline;margin:2px 0">'
          + '<span style="color:var(--red);font-size:.6rem;flex-shrink:0;margin-top:3px"><i class="fa-solid fa-circle-dot"></i></span>'
          + '<span>' + line.slice(1).trim() + '</span></div>';
      }
      return line === '' ? '<br/>' : '<span style="display:block;margin:1px 0">' + line + '</span>';
    })
    .join('');
}

function scrollBottom() {
  if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
}

function appendBotMsg(text, animate = true) {
  if (!chatBody) return;
  const wrap = document.createElement('div');
  wrap.className = 'msg';
  wrap.style.cssText = 'max-width:92%;opacity:0;transform:translateY(10px);transition:opacity .35s ease,transform .35s ease';
  wrap.innerHTML =
    '<div class="msg-av bot-av"><i class="fa-solid fa-robot"></i></div>' +
    '<div class="msg-text bot-text">' + fmtText(text) + '</div>';
  chatBody.appendChild(wrap);
  scrollBottom();
  if (animate) {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      wrap.style.opacity   = '1';
      wrap.style.transform = 'translateY(0)';
    }));
  } else {
    wrap.style.opacity = '1'; wrap.style.transform = 'translateY(0)';
  }
}

function appendUserMsg(text) {
  if (!chatBody) return;
  const wrap = document.createElement('div');
  wrap.className = 'msg user-msg';
  wrap.style.cssText = 'max-width:88%;opacity:0;transform:translateY(8px);transition:opacity .25s ease,transform .25s ease';
  wrap.innerHTML =
    '<div class="msg-av user-av"><i class="fa-solid fa-user"></i></div>' +
    '<div class="msg-text user-text">' + esc(text) + '</div>';
  chatBody.appendChild(wrap);
  scrollBottom();
  requestAnimationFrame(() => requestAnimationFrame(() => {
    wrap.style.opacity   = '1';
    wrap.style.transform = 'translateY(0)';
  }));
}

function showTyping() {
  if (!chatBody) return;
  const d = document.createElement('div');
  d.className = 'msg'; d.id = 'typingIndicator';
  d.innerHTML =
    '<div class="msg-av bot-av"><i class="fa-solid fa-robot"></i></div>' +
    '<div class="msg-text bot-text"><div class="typing-dots">' +
    '<span></span><span></span><span></span></div></div>';
  chatBody.appendChild(d);
  scrollBottom();
}
function removeTyping() { document.getElementById('typingIndicator')?.remove(); }

function addFollowups(followups) {
  if (!chatBody || !followups?.length) return;
  const row = document.createElement('div');
  row.className = 'followup-row';
  followups.forEach(q => {
    const btn = document.createElement('button');
    btn.className = 'fu-chip';
    btn.textContent = q;
    btn.onclick = () => { row.remove(); sendMsg(q); };
    row.appendChild(btn);
  });
  chatBody.appendChild(row);
  scrollBottom();
}

/* ── Build quick buttons from engine ────────────────────── */
function buildQuickBtns() {
  if (!chatQuick || !window.RescueGPT) return;
  const ICONS = {
    'Flood Safety':      'fa-water',
    'Fire Emergency':    'fa-fire-flame-curved',
    'CPR Steps':         'fa-heart-pulse',
    'Earthquake':        'fa-house-crack',
    'Cyclone Safety':    'fa-wind',
    'Emergency Numbers': 'fa-phone-volume',
    'Burns First Aid':   'fa-fire',
    'Snake Bite':        'fa-shield-virus',
    'Emergency Kit':     'fa-kit-medical',
    'Choking':           'fa-lungs',
    'Bleeding Control':  'fa-droplet',
    'Gas Leak':          'fa-faucet-drip'
  };
  window.RescueGPT.quickQuestions.forEach(({ label, text }) => {
    const btn = document.createElement('button');
    btn.className = 'q-btn';
    const ico = ICONS[label] || 'fa-circle-question';
    btn.innerHTML = '<i class="fa-solid ' + ico + '"></i>' + label;
    btn.onclick   = () => sendMsg(text);
    chatQuick.appendChild(btn);
  });
}

/* ── Main send function ─────────────────────────────────── */
function sendMsg(overrideText) {
  const raw = overrideText || chatInput?.value?.trim();
  if (!raw) return;
  if (chatInput && !overrideText) chatInput.value = '';
  if (sendBtn) sendBtn.disabled = true;

  /* Hide quick buttons after first message */
  if (chatQuick) chatQuick.style.display = 'none';

  appendUserMsg(raw);
  showTyping();

  /* Simulate a brief "thinking" delay for realism */
  const thinkTime = 300 + Math.random() * 400;
  setTimeout(() => {
    removeTyping();
    const result = window.RescueGPT.respond(raw);
    appendBotMsg(result.text);
    if (result.followups?.length) addFollowups(result.followups);
    if (sendBtn) sendBtn.disabled = false;
    if (!overrideText && chatInput) chatInput.focus();
  }, thinkTime);
}

/* ── Quick ask (from buttons/chips) ─────────────────────── */
function quickAsk(text) { sendMsg(text); }

/* ── Clear chat ─────────────────────────────────────────── */
function clearChat() {
  if (!chatBody) return;
  chatBody.innerHTML = '';
  if (chatQuick) chatQuick.style.display = 'flex';
  initChat();
}

/* ── Welcome message ────────────────────────────────────── */
function initChat() {
  appendBotMsg(
    '**Welcome to RescueGPT** — ITM Rescue Force Emergency AI Assistant.\n\n' +
    'I am fully offline — no internet connection needed. I have detailed knowledge on:\n\n' +
    '• Flood, cyclone, earthquake and fire safety\n' +
    '• First aid: CPR, burns, bleeding, choking, snake bite\n' +
    '• All Bangladesh emergency hotlines\n' +
    '• Disaster preparedness and emergency kits\n' +
    '• Road accidents, building collapse, gas leaks\n' +
    '• Animal rescue and environmental emergencies\n\n' +
    'For immediate life-threatening danger — **call 999 right now** — do not wait.\n\n' +
    'How can I help you today?',
    false
  );
}

/* ── INIT ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  if (window.RescueGPT) {
    initChat();
    buildQuickBtns();
  } else {
    appendBotMsg('RescueGPT engine failed to load. Please refresh the page.', false);
  }
});

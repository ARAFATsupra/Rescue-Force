/* ══════════════════════════════════════════════════════════
   ITM RESCUE FORCE — admin.js v4.0
   Fully offline — AI advisor uses the RescueGPT engine
   ══════════════════════════════════════════════════════════ */
'use strict';

/* ── THEME ──────────────────────────────────────────────── */
const html      = document.documentElement;
const aIconSun  = document.getElementById('aIconSun');
const aIconMoon = document.getElementById('aIconMoon');

function applyTheme(t) {
  html.setAttribute('data-theme', t);
  localStorage.setItem('rfTheme', t);
  if (aIconSun)  aIconSun.style.display  = t === 'dark'  ? 'inline' : 'none';
  if (aIconMoon) aIconMoon.style.display = t === 'light' ? 'inline' : 'none';
}
applyTheme(localStorage.getItem('rfTheme') || 'dark');
document.getElementById('adminTheme')?.addEventListener('click', () =>
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark')
);

/* ── AUTH ───────────────────────────────────────────────── */
function adminLogin() {
  const user  = (document.getElementById('adminUser')?.value || '').trim();
  const pass  = (document.getElementById('adminPass')?.value || '').trim();
  const errEl = document.getElementById('loginErr');
  if (user === 'admin' && pass === 'rescue2025') {
    document.getElementById('loginOverlay').style.display = 'none';
    document.getElementById('adminContent').style.display = 'block';
    sessionStorage.setItem('rfAdmin', '1');
    initAdmin();
  } else {
    if (errEl) { errEl.style.display = 'block'; setTimeout(() => errEl.style.display = 'none', 3500); }
    const p = document.getElementById('adminPass');
    if (p) p.value = '';
  }
}

function adminLogout() { sessionStorage.removeItem('rfAdmin'); location.reload(); }

window.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('rfAdmin') === '1') {
    document.getElementById('loginOverlay').style.display = 'none';
    document.getElementById('adminContent').style.display = 'block';
    initAdmin();
  }
});

/* ── PANEL NAV ──────────────────────────────────────────── */
function showPanel(name) {
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.a-ni').forEach(a => a.classList.remove('active'));
  document.getElementById('panel-' + name)?.classList.add('active');
  document.querySelectorAll('.a-ni').forEach(a => {
    if (a.getAttribute('onclick')?.includes("'" + name + "'")) a.classList.add('active');
  });
  if (name === 'reports')   loadReports();
  if (name === 'mission')   loadMissions();
  if (name === 'team')      loadTeam();
  if (name === 'analytics') buildChart();
  if (name === 'resources') buildResources();
  if (name === 'ai')        initAdvisor();
}

/* ── CLOCK ──────────────────────────────────────────────── */
function updateClock() {
  const el = document.getElementById('adminClock');
  if (!el) return;
  el.textContent = new Date().toLocaleString('en-BD', {
    weekday: 'short', day: 'numeric', month: 'short',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
  }) + ' — Asia/Dhaka';
}

/* ── VEHICLE DISPATCH ───────────────────────────────────── */
const VEH_CFG = {
  ambulance:  { dot: 'ld-r', cls: 'sr', msg: 'AI Ambulance dispatched — Dhaka Medical College pre-alerted. ETA: 6 min.' },
  fire:       { dot: 'ld-r', cls: 'sr', msg: 'Fire Rescue Vehicle launched — AI route optimized. ETA: 4 min.' },
  helicopter: { dot: 'ld-a', cls: 'sa', msg: 'Rescue Helicopter airborne — Pilot Arif briefed and ascending.' },
  boat:       { dot: 'ld-b', cls: 'sb', msg: 'Flood Rescue Boat launched — Sylhet river zone. ETA: 12 min.' }
};

function launchVehicle(type) {
  const cfg  = VEH_CFG[type];
  const btn  = document.getElementById('btn-' + type);
  const stEl = document.getElementById('st-' + type);
  if (!btn || !cfg) return;
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Dispatched';
  btn.disabled  = true;
  if (stEl) stEl.classList.add('show');
  addLog(cfg.msg, cfg.dot);
}

function addLog(text, dotCls) {
  const logEl = document.getElementById('dispatchLog');
  if (!logEl) return;
  const time = new Date().toLocaleTimeString('en-BD', { hour: '2-digit', minute: '2-digit', hour12: true });
  const div  = document.createElement('div');
  div.className = 'log-row';
  div.innerHTML = '<div class="log-dot ' + dotCls + '"></div><span class="log-time">' + time + '</span><span class="log-txt">' + text + '</span>';
  logEl.prepend(div);
}

/* ── DRONE LAUNCH ───────────────────────────────────────── */
const DRONE_CFG = {
  alpha: { dot: 'ld-b', cls: 'sb', color: 'var(--sapphire)', label: 'DRONE ALPHA — 4K STREAM ACTIVE' },
  beta:  { dot: 'ld-a', cls: 'sa', color: 'var(--amber)',    label: 'DRONE BETA — THERMAL IMAGING ACTIVE' },
  gamma: { dot: 'ld-g', cls: 'sg', color: 'var(--emerald)',  label: 'DRONE GAMMA — SUPPLY DROP ACTIVE' }
};
let droneTimer = null;

function launchDrone(type) {
  const cfg  = DRONE_CFG[type];
  const btn  = document.getElementById('btn-' + type);
  const stEl = document.getElementById('st-' + type);
  if (!btn || !cfg) return;
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Airborne';
  btn.disabled  = true;
  if (stEl) stEl.classList.add('show');

  const sigEl = document.getElementById('feedSig');
  if (sigEl) { sigEl.textContent = 'LIVE — ' + cfg.label; sigEl.className = 'feed-sig live'; sigEl.style.color = cfg.color; }

  const feedEl = document.getElementById('feedBody');
  if (!feedEl) return;

  feedEl.innerHTML =
    '<div style="width:100%;height:100%;background:linear-gradient(135deg,#050d14,#0a1e2e);' +
    'display:flex;align-items:center;justify-content:center;flex-direction:column;gap:14px;' +
    'position:relative;overflow:hidden;padding:20px;">' +
    '<div style="position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,200,100,.015) 3px,rgba(0,200,100,.015) 4px);pointer-events:none;"></div>' +
    '<i class="fa-solid fa-satellite-dish" style="font-size:2rem;color:' + cfg.color + ';opacity:.8;"></i>' +
    '<div style="font-family:var(--f-mono);font-size:.72rem;color:' + cfg.color + ';letter-spacing:.12em;">LIVE — ' + cfg.label + '</div>' +
    '<div id="droneCoords" style="font-family:var(--f-mono);font-size:.64rem;color:rgba(255,255,255,.35);">LAT: 23.8103 N &nbsp;|&nbsp; LON: 90.4125 E &nbsp;|&nbsp; ALT: 87m &nbsp;|&nbsp; SPEED: 12 m/s</div>' +
    '<div id="droneBatt" style="font-family:var(--f-mono);font-size:.64rem;color:rgba(255,255,255,.24);">BATTERY: 94% &nbsp;|&nbsp; SIGNAL: STRONG &nbsp;|&nbsp; MISSION TIME: 00:00</div>' +
    '<div style="width:68px;height:68px;border:1.5px solid ' + cfg.color + ';border-radius:50%;animation:spin 4s linear infinite;opacity:.7;position:relative;">' +
    '<div style="position:absolute;top:50%;left:50%;width:5px;height:5px;background:' + cfg.color + ';border-radius:50%;transform:translate(-50%,-50%);"></div></div></div>';

  if (droneTimer) clearInterval(droneTimer);
  let secs = 0;
  droneTimer = setInterval(() => {
    secs++;
    const el = document.getElementById('droneBatt');
    if (!el) { clearInterval(droneTimer); return; }
    const batt = Math.max(0, 94 - Math.floor(secs / 6));
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    el.textContent = 'BATTERY: ' + batt + '% \u00a0|\u00a0 SIGNAL: STRONG \u00a0|\u00a0 MISSION TIME: ' + m + ':' + s;
  }, 1000);
}

/* Spin animation */
(function () {
  const s = document.createElement('style');
  s.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
  document.head.appendChild(s);
})();

/* ── MISSION LOG ────────────────────────────────────────── */
const MISSIONS = [
  { id: 'RF-20250901', type: 'Flood',           location: 'Sylhet, Osmani Nagar',  team: 'Alpha Squad',  started: '2025-09-01 06:15', status: 'completed' },
  { id: 'RF-20250902', type: 'Fire',             location: 'Dhaka, Mirpur-10',      team: 'Bravo Unit',   started: '2025-09-02 14:30', status: 'completed' },
  { id: 'RF-20250903', type: 'Road Accident',    location: 'Chittagong, Agrabad',   team: 'Charlie Team', started: '2025-09-03 09:45', status: 'completed' },
  { id: 'RF-20250904', type: 'Cyclone',          location: "Cox's Bazar Coast",     team: 'Delta Force',  started: '2025-09-04 22:00', status: 'active' },
  { id: 'RF-20250905', type: 'Health Emergency', location: 'Rajshahi, Boalia',      team: 'Medic Squad',  started: '2025-09-05 11:20', status: 'active' },
  { id: 'RF-20250906', type: 'Flood',            location: 'Comilla, Burichong',    team: 'Alpha Squad',  started: '2025-09-06 08:00', status: 'active' }
];
let missionFilter = 'all';

function loadMissions() {
  const tbody = document.getElementById('missionBody');
  if (!tbody) return;
  const list = missionFilter === 'all' ? MISSIONS : MISSIONS.filter(m => m.status === missionFilter);
  tbody.innerHTML = list.map(m => {
    const cls = m.status === 'active' ? 'sc-mission' : 'sc-available';
    const ico = m.status === 'active' ? 'fa-circle-dot' : 'fa-circle-check';
    return '<tr>' +
      '<td><span style="font-family:var(--f-mono);font-size:.72rem;color:var(--text-2)">' + m.id + '</span></td>' +
      '<td>' + m.type + '</td><td>' + m.location + '</td><td>' + m.team + '</td>' +
      '<td style="font-size:.78rem;color:var(--text-2)">' + m.started + '</td>' +
      '<td><span class="status-chip ' + cls + '"><i class="fa-solid ' + ico + '"></i> ' + (m.status === 'active' ? 'Active' : 'Completed') + '</span></td></tr>';
  }).join('');
}
function filterMissions(f) { missionFilter = f; loadMissions(); }

/* ── REPORTS ────────────────────────────────────────────── */
function loadReports() {
  const container = document.getElementById('reportsContainer');
  const countEl   = document.getElementById('reportCount');
  if (!container) return;
  const reports = JSON.parse(localStorage.getItem('rescueReports') || '[]');
  if (countEl) countEl.textContent = reports.length + ' report(s) received from public form';
  if (!reports.length) {
    container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-3);"><i class="fa-solid fa-inbox" style="font-size:2.5rem;display:block;margin-bottom:12px;opacity:.3;"></i>No reports yet. Emergency form submissions appear here.</div>';
    return;
  }
  const SEV = { low: 'sc-available', medium: 'sc-standby', high: 'sc-mission', critical: 'sc-mission' };
  container.innerHTML = [...reports].reverse().map(r =>
    '<div style="background:var(--bg3);border:1px solid var(--border);border-radius:var(--r-md);padding:14px;margin-bottom:10px;">' +
    '<div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:9px;">' +
    '<span style="font-family:var(--f-mono);font-size:.7rem;color:var(--red)"><i class="fa-solid fa-hashtag fa-xs"></i> ' + r.id + '</span>' +
    '<span class="status-chip ' + (SEV[r.severity] || 'sc-standby') + '"><i class="fa-solid fa-gauge fa-xs"></i> ' + (r.severity || 'medium').toUpperCase() + '</span></div>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;font-size:.82rem;">' +
    '<div><span style="color:var(--text-2)">Type:</span> <strong>' + r.type + '</strong></div>' +
    '<div><span style="color:var(--text-2)">Name:</span> ' + (r.name || 'Anonymous') + '</div>' +
    '<div style="grid-column:1/-1"><span style="color:var(--text-2)">Location:</span> ' + r.location + '</div>' +
    '<div style="grid-column:1/-1"><span style="color:var(--text-2)">Description:</span> ' + r.desc + '</div>' +
    '<div style="grid-column:1/-1;font-family:var(--f-mono);font-size:.68rem;color:var(--text-3)"><i class="fa-solid fa-clock fa-xs"></i> ' + new Date(r.timestamp).toLocaleString() + '</div>' +
    '</div></div>'
  ).join('');
}

function clearReports() {
  if (!confirm('Clear all emergency reports from storage?')) return;
  localStorage.removeItem('rescueReports');
  loadReports();
}

/* ── TEAM ───────────────────────────────────────────────── */
const TEAM = [
  { name: 'Cmdr. Rafiq',     role: 'Commander',    district: 'Dhaka',      contact: '01711-XXXXXX', status: 'mission' },
  { name: 'Dr. Nadia Islam', role: 'Medic Lead',   district: 'Dhaka',      contact: '01812-XXXXXX', status: 'mission' },
  { name: 'Pilot Arif',      role: 'Drone Pilot',  district: 'Comilla',    contact: '01615-XXXXXX', status: 'mission' },
  { name: 'Rescuer Sumon',   role: 'Field Rescuer',district: 'Chittagong', contact: '01913-XXXXXX', status: 'available' },
  { name: 'Comms Bristy',    role: 'Comms Officer',district: 'Sylhet',     contact: '01719-XXXXXX', status: 'standby' },
  { name: 'Eng. Kamal',      role: 'Engineer',     district: 'Rajshahi',   contact: '01514-XXXXXX', status: 'available' },
  { name: 'Rescuer Ritu',    role: 'Field Rescuer',district: 'Khulna',     contact: '01811-XXXXXX', status: 'standby' }
];
const ST_CLS = { mission: 'sc-mission', available: 'sc-available', standby: 'sc-standby' };
const ST_ICO = { mission: 'fa-circle-dot', available: 'fa-circle-check', standby: 'fa-circle-pause' };
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function loadTeam() {
  const tbody = document.getElementById('teamBody');
  if (!tbody) return;
  tbody.innerHTML = TEAM.map((m, i) =>
    '<tr><td><strong>' + m.name + '</strong></td><td>' + m.role + '</td><td>' + m.district + '</td>' +
    '<td style="font-family:var(--f-mono);font-size:.74rem;color:var(--text-2)">' + m.contact + '</td>' +
    '<td><span class="status-chip ' + ST_CLS[m.status] + '" id="tb_' + i + '"><i class="fa-solid ' + ST_ICO[m.status] + '"></i> ' + cap(m.status) + '</span></td>' +
    '<td><select onchange="updateTeam(' + i + ',this.value)" style="background:var(--surface);border:1px solid var(--border);color:var(--text);padding:5px 8px;border-radius:var(--r-md);font-size:.74rem;cursor:pointer;">' +
    '<option value="available"' + (m.status === 'available' ? ' selected' : '') + '>Available</option>' +
    '<option value="mission"'   + (m.status === 'mission'   ? ' selected' : '') + '>On Mission</option>' +
    '<option value="standby"'   + (m.status === 'standby'   ? ' selected' : '') + '>Standby</option>' +
    '</select></td></tr>'
  ).join('');
}

function updateTeam(i, status) {
  TEAM[i].status = status;
  const el = document.getElementById('tb_' + i);
  if (el) { el.className = 'status-chip ' + ST_CLS[status]; el.innerHTML = '<i class="fa-solid ' + ST_ICO[status] + '"></i> ' + cap(status); }
}

/* ── RESOURCES ──────────────────────────────────────────── */
const RESOURCES = [
  { icon: 'fa-briefcase-medical', color: 'vi-red',   name: 'Medical Kits',       count: 24, total: 30, pct: 80,  fillColor: 'var(--emerald)' },
  { icon: 'fa-screwdriver-wrench',color: 'vi-amber', name: 'Rescue Tools',       count: 18, total: 25, pct: 72,  fillColor: 'var(--amber)' },
  { icon: 'fa-life-ring',          color: 'vi-blue',  name: 'Life Jackets',       count: 45, total: 50, pct: 90,  fillColor: 'var(--sapphire)' },
  { icon: 'fa-fire-extinguisher',  color: 'vi-red',   name: 'Fire Extinguishers', count: 11, total: 20, pct: 55,  fillColor: 'var(--red)' },
  { icon: 'fa-battery-full',       color: 'vi-green', name: 'Power Packs',        count: 8,  total: 10, pct: 80,  fillColor: 'var(--emerald)' },
  { icon: 'fa-pills',              color: 'vi-amber', name: 'Medicine Boxes',     count: 6,  total: 10, pct: 60,  fillColor: 'var(--amber)' },
  { icon: 'fa-rope',               color: 'vi-blue',  name: 'Rescue Ropes',       count: 14, total: 16, pct: 87,  fillColor: 'var(--sapphire)' },
  { icon: 'fa-walkie-talkie',      color: 'vi-green', name: 'Radios',             count: 10, total: 12, pct: 83,  fillColor: 'var(--emerald)' }
];

function buildResources() {
  const grid = document.getElementById('resourceGrid');
  if (!grid || grid.dataset.built) return;
  grid.dataset.built = 'true';
  grid.innerHTML = RESOURCES.map(r =>
    '<div class="res-card">' +
    '<div class="v-ico ' + r.color + '" style="margin-bottom:8px;"><i class="fa-solid ' + r.icon + '"></i></div>' +
    '<div class="res-num">' + r.count + '</div>' +
    '<div class="res-lbl">Available / ' + r.total + ' total — ' + r.name + '</div>' +
    '<div class="res-track"><div class="res-fill" style="width:0%;background:' + r.fillColor + '" data-w="' + r.pct + '%"></div></div>' +
    '</div>'
  ).join('');
  /* Animate bars */
  requestAnimationFrame(() => requestAnimationFrame(() => {
    grid.querySelectorAll('.res-fill').forEach(el => { el.style.width = el.dataset.w; });
  }));
}

/* ── AI RESULTS (simulated offline) ────────────────────── */
const AI_RES = {
  route:    'ROUTE OPTIMIZED\nZone 3 — Dhaka North: Via Uttara to Mirpur — 4.2 km, ETA 5 min\nZone 5 — Comilla: Via N2 Highway — 67 km, ETA 38 min\nZone 7 — Sylhet Flood Area: River route recommended — ETA 22 min\nNo conflicts detected. AI coordination active.',
  flood:    'HIGH RISK ZONES — NEXT 24 HOURS\nSylhet District: 87% flood probability — evacuate low areas NOW\nKishorganj: 72% risk — pre-deploy rescue boats immediately\nNetrokona: 65% risk — alert local authorities\nDhaka Metro: 23% risk — monitoring only\nRecommendation: Alert Delta Force and pre-position boats in Sylhet.',
  resource: 'DEPLOYMENT RECOMMENDATION\nZone 3 (Fire): 4x extinguishers, 2x medic kits, Drone Alpha\nZone 5 (Flood): 3x life jackets, 1x rescue boat, 2x ropes, Drone Gamma\nZone 7 (Medical): 3x medical kits, 1x ambulance, Medic Squad\nStatus: 78% resources available — resupply medicine (6 boxes remaining)',
  hospital: 'HOSPITALS PRE-ALERTED\nDhaka Medical College: 23 beds ready, trauma team on standby\nBIRDEM Hospital: 8 ICU beds available — notified\nComilla General: Pre-alert sent — confirmation pending\nSylhet MAG Osmani: 15 beds reserved for flood-related cases\nRecommendation: Route critical patients to Dhaka Medical.'
};

function runAI(type) {
  const el = document.getElementById('res-' + type);
  if (!el) return;
  el.style.display = 'block';
  el.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> AI processing...';
  setTimeout(() => { el.innerHTML = AI_RES[type].replace(/\n/g, '<br/>'); }, 1200);
}

/* ══════════════════════════════════════════════════════════
   AI MISSION ADVISOR — Uses RescueGPT offline engine
   ══════════════════════════════════════════════════════════ */

/* Mission-specific knowledge for the advisor */
const ADVISOR_KB = [
  {
    intents: ['deploy','dispatch','send team','launch','mobilize'],
    keywords: [['deploy',5],['dispatch',5],['send',3],['launch',4],['mobilize',5],['assign',3]],
    response: 'DEPLOYMENT PROTOCOL:\n1. Assess threat level and exact affected area — use drone for aerial overview first\n2. Assign Commander to lead ground operations within 2 minutes\n3. Deploy Medic team simultaneously — never after ground team\n4. Establish radio comms on Channel 3 before departure\n5. Brief all units on known hazards before entry\n6. Set up base camp 500m from danger zone\n7. Maintain one rescue unit in reserve for secondary incidents\n8. Document all actions in real-time for post-mission report'
  },
  {
    intents: ['flood mission','flood operation','water rescue','river rescue'],
    keywords: [['flood',5],['water rescue',5],['river',4],['boat',3],['inundation',4],['waterlog',4]],
    response: 'FLOOD MISSION PROTOCOL:\n1. Deploy surveillance drone FIRST for safe entry route identification\n2. Launch rescue boat from nearest elevated access point\n3. Assign thermal drone for survivor location in darkness or debris\n4. Establish comms with BWDB for real-time river level data\n5. Set up decontamination zone for floodwater exposure treatment\n6. Pre-alert Sylhet Medical College for incoming flood patients\n7. Priority order: children and elderly, then injured adults, then able-bodied\n8. Never let rescue boat enter current faster than 3 knots without anchor support'
  },
  {
    intents: ['fire mission','building fire','fire operation','structure fire'],
    keywords: [['fire mission',5],['building fire',4],['structure fire',5],['blaze',4],['rescue fire',4]],
    response: 'FIRE RESCUE PROTOCOL:\n1. Establish 50m exclusion zone around structure — enforce strictly\n2. Launch Drone Alpha for aerial fire mapping and entry point identification\n3. Deploy Fire Unit on optimal AI-routed path — ETA must be under 8 minutes\n4. Medic team stages outside exclusion zone — ready for immediate response\n5. Commander coordinates with Fire Brigade (101) — do not duplicate efforts\n6. Use thermal drone to locate trapped survivors through walls and smoke\n7. Establish accountability: know how many people are inside\n8. Ready evacuation route before any team enters the structure'
  },
  {
    intents: ['resource allocation','equipment','what equipment','what to bring','supplies'],
    keywords: [['resource',5],['equipment',5],['supplies',4],['bring',3],['tools',4],['kit',3],['allocation',5]],
    response: 'RESOURCE ALLOCATION GUIDE:\nFlood response: Rescue boat + life jackets + ropes + medic kit + ORS packs + clean water\nFire response: Fire unit + extinguishers + thermal drone + medic kit + oxygen supply\nEarthquake/collapse: Rescue tools + thermal drone + search rope + medic kit + stretchers\nCyclone response: Rescue boat + communication equipment + shelter materials + food packs\nMedical emergency: Ambulance + full medic kit + AED if available + oxygen\n\nGeneral rule: Always carry double the calculated ORS and water. Medical supplies should exceed the estimated number of casualties by 30%.'
  },
  {
    intents: ['risk assessment','danger level','how dangerous','threat level','safety check'],
    keywords: [['risk',4],['danger',4],['threat',4],['safety',3],['hazard',4],['assessment',5],['evaluate',3]],
    response: 'FIELD RISK ASSESSMENT PROTOCOL:\nStep 1 — Aerial survey: Launch drone before any ground team entry. Identify: structural damage, fire, gas leaks, unstable terrain, crowd density.\nStep 2 — Environmental hazards: Check wind direction (chemical/fire incidents), water current speed (flood), aftershock probability (earthquake).\nStep 3 — Threat classification:\n  Level 1 (Low): Single casualty, stable environment — 3-person team\n  Level 2 (Medium): Multiple casualties, some hazards — full unit + medics\n  Level 3 (High): Mass casualty, active hazard — all units + request external support\n  Level 4 (Critical): Ongoing collapse/explosion/toxic release — establish perimeter, call Army (999)\nStep 4 — Go/No-Go decision: Commander reviews drone footage before ground entry. Any identified Level 4 hazard = No-Go until hazard controlled.'
  },
  {
    intents: ['communication','radio','coordinate','inter-agency','police fire ambulance'],
    keywords: [['communicat',5],['radio',4],['coordinate',5],['inter-agency',5],['channel',3],['signal',3]],
    response: 'COMMUNICATIONS PROTOCOL:\nPrimary channels:\n  Channel 3: Rescue Force internal operations\n  Channel 7: Coordination with Fire Brigade (101)\n  Channel 9: Police liaison (100/999)\n  Channel 12: Hospital coordination\n\nReport format (all comms must follow):\n  UNIT / LOCATION / SITUATION / NEEDS / ETA\n  Example: "Alpha-1 / Mirpur-10 / 3 casualties trapped / requesting medic / 4 minutes out"\n\nBackup communication:\n  If radio fails: use mobile phone, assign one person per unit as comms officer\n  If all comms fail: physical runner system, pre-designated checkpoint times\n\nMedia management:\n  All media inquiries to Comms Officer only\n  No photos of casualties — privacy and legal requirement\n  Situation update every 30 minutes to HQ'
  },
  {
    intents: ['after mission','debrief','report mission','post mission','mission complete'],
    keywords: [['debrief',5],['after mission',5],['post mission',5],['report',3],['review',3],['lessons',4]],
    response: 'POST-MISSION PROTOCOL:\nWithin 1 hour of mission completion:\n1. Account for all team members — full rollcall before dismissal\n2. Medical check: all field team members assessed by medic for injury or exposure\n3. Equipment inventory: log all used, damaged, or lost equipment immediately\n4. Incident log: Commander documents timeline, decisions made, outcomes\n\nWithin 24 hours:\n5. Full written mission report submitted to HQ\n6. Patient handover confirmation from hospitals\n7. Vehicle and drone maintenance check and battery recharge\n8. Resupply request submitted for consumed resources\n\nWithin 72 hours:\n9. Team debrief meeting: What worked, what failed, what to improve\n10. Update Standard Operating Procedures if gaps were identified\n11. Community feedback collected if applicable'
  },
  {
    intents: ['who to call','which hospital','hospital near','nearest hospital'],
    keywords: [['hospital',5],['nearest',4],['medical center',4],['clinic',3],['trauma',4]],
    response: 'KEY MEDICAL CONTACTS — BANGLADESH:\nDhaka:\n  Dhaka Medical College: 02-55165088 — largest trauma center\n  BIRDEM Hospital: 02-8616641 — diabetes + general emergency\n  National Heart Foundation: 02-8116000\n  Sir Salimullah Medical: 02-7314357\n\nChittagong:\n  Chittagong Medical College: 031-613283\n  Park View Hospital: 031-2855555\n\nSylhet:\n  MAG Osmani Medical College: 0821-714957\n\nComilla:\n  Comilla Medical College: 081-72286\n\nRajshahi:\n  Rajshahi Medical College: 0721-772150\n\nAmbulance: 108 (national — fastest response)\nAll government hospitals provide free emergency treatment.'
  }
];

function advisorRespond(text) {
  const input = text.toLowerCase();
  let best = null; let bestScore = 0;
  ADVISOR_KB.forEach(entry => {
    let score = 0;
    entry.intents.forEach(i => { if (input.includes(i)) score += 20 + i.length; });
    entry.keywords.forEach(([w, wt]) => { if (input.includes(w)) score += wt; });
    if (score > bestScore) { bestScore = score; best = entry; }
  });
  if (best && bestScore >= 5) return best.response;
  /* Fall back to main RescueGPT engine for general emergency knowledge */
  if (window.RescueGPT) {
    const r = window.RescueGPT.respond(text);
    return r.text;
  }
  return 'For this mission scenario, follow BDMA protocols and ensure team safety before any rescue operation. Maintain clear communications and document all decisions for the post-mission report.';
}

let advisorInited = false;

function initAdvisor() {
  if (advisorInited) return;
  advisorInited = true;
  const body = document.getElementById('advisorBody');
  if (!body) return;
  const div = document.createElement('div');
  div.className = 'adv-msg';
  div.innerHTML =
    '<i class="fa-solid fa-brain" style="color:var(--amber);margin-right:7px;"></i>' +
    '<strong>AI Mission Advisor online — Fully Offline.</strong><br/>' +
    '<span style="color:var(--text-2);font-size:.82rem;">I can advise on: deployment strategy, flood/fire/earthquake operations, resource allocation, risk assessment, inter-agency communications, and post-mission protocols. Ask me anything.</span>';
  body.appendChild(div);
}

function sendAdvisor() {
  const input = document.getElementById('advisorInput');
  const body  = document.getElementById('advisorBody');
  if (!input || !body) return;
  const text = input.value.trim();
  if (!text) return;
  input.value = '';

  const uMsg = document.createElement('div');
  uMsg.className = 'adv-msg user'; uMsg.textContent = text;
  body.appendChild(uMsg);
  body.scrollTop = body.scrollHeight;

  const typing = document.createElement('div');
  typing.className = 'adv-msg'; typing.id = 'advTyping';
  typing.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="color:var(--text-3)"></i> Analyzing...';
  body.appendChild(typing);
  body.scrollTop = body.scrollHeight;

  setTimeout(() => {
    document.getElementById('advTyping')?.remove();
    const reply = advisorRespond(text);
    const botMsg = document.createElement('div');
    botMsg.className = 'adv-msg';
    botMsg.innerHTML = reply
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');
    body.appendChild(botMsg);
    body.scrollTop = body.scrollHeight;
  }, 600 + Math.random() * 400);
}

/* ── ANALYTICS CHART ────────────────────────────────────── */
function buildChart() {
  const chart = document.getElementById('barChart');
  if (!chart || chart.dataset.built) return;
  chart.dataset.built = 'true';
  const vals = [18, 22, 15, 28, 31, 19, 9], max = Math.max(...vals);
  vals.forEach(v => {
    const bar = document.createElement('div');
    bar.className = 'bar-item'; bar.style.height = '0';
    bar.innerHTML = '<span>' + v + '</span>';
    chart.appendChild(bar);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      bar.style.height = (v / max * 100) + '%';
    }));
  });
}

/* ── INIT ───────────────────────────────────────────────── */
function initAdmin() {
  updateClock();
  setInterval(updateClock, 1000);
  loadMissions();
}

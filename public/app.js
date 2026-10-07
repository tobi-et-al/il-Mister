const FRAMEWORKS = [
  {
    id: "bluf",
    name: "BLUF",
    industry: "Military and executive briefs",
    use: "Use when your manager needs the point before the path.",
    moves: ["Bottom line", "Why it matters", "Options or trade-off", "Recommendation", "Decision needed"],
    checklist: ["Lead with the answer", "Name the decision", "Make the trade-off explicit", "End with the next move"],
  },
  {
    id: "sbar",
    name: "SBAR",
    industry: "Clinical handover",
    use: "Use when a messy situation needs a clean handoff.",
    moves: ["Situation", "Background", "Assessment", "Recommendation"],
    checklist: ["Separate fact from interpretation", "Include the minimum context", "Say what you think is happening", "Recommend a clear action"],
  },
  {
    id: "readback",
    name: "Readback",
    industry: "Aviation and mission control",
    use: "Use when the real skill is confirming the ask without losing nuance.",
    moves: ["Repeat the constraint", "Confirm owner", "Confirm timing", "Check the risk", "Close the loop"],
    checklist: ["Repeat the ask in your own words", "Name the constraint", "Check for correction", "Confirm the next action"],
  },
  {
    id: "pyramid",
    name: "Pyramid",
    industry: "Consulting and board communication",
    use: "Use when you need a crisp manage-up narrative.",
    moves: ["Answer first", "Three reasons", "Evidence", "Implication", "Ask"],
    checklist: ["Put the answer first", "Group points into reasons", "Remove side quests", "Tie evidence to the ask"],
  },
  {
    id: "ooda",
    name: "OODA",
    industry: "Operations and incident command",
    use: "Use when the meeting is moving and the answer may change.",
    moves: ["Observe", "Orient", "Decide", "Act"],
    checklist: ["Separate observation from orientation", "Make the decision point visible", "Name what changes your mind", "Pick the next action"],
  },
  {
    id: "newsroom",
    name: "Newsroom Lead",
    industry: "Editors and live desks",
    use: "Use when you need to find the story hiding in the details.",
    moves: ["What happened", "Why now", "Who is affected", "What changed", "What happens next"],
    checklist: ["Find the lead", "Cut background that does not change the decision", "Name who cares", "End with what happens next"],
  },
  {
    id: "crm",
    name: "CRM",
    industry: "Crew resource management",
    use: "Use when status, tension and shared mental model matter.",
    moves: ["Call-out", "Check-back", "Shared mental model", "Escalation trigger"],
    checklist: ["Surface tension early", "Invite correction", "Use closed-loop language", "Name the escalation trigger"],
  },
  {
    id: "label",
    name: "Label and Calibrate",
    industry: "Negotiation",
    use: "Use when the ask is emotionally or politically loaded.",
    moves: ["Label the concern", "Mirror a key phrase", "Ask a calibrated question", "Summarise the agreement"],
    checklist: ["Name the concern without blame", "Use one calibrated question", "Listen for correction", "Replay the agreement"],
  },
];

const SCENARIOS = [
  {
    id: "roadmap-cut",
    level: 1,
    title: "The roadmap squeeze",
    setting: "Product sync",
    pressure: "Competing priorities",
    ask: "Help your manager decide whether to cut scope or move the launch.",
    focus: "Distinguish request, constraint and recommendation.",
    mustCatch: ["enterprise demo", "security review", "three engineers", "launch date", "cut scope"],
    beats: [
      { speaker: "VP Product", tone: "pressure", text: "We still have the enterprise demo pencilled in for the 28th. Sales are treating that as real, even though I keep saying it is not a launch commitment." },
      { speaker: "Engineering Lead", tone: "signal", text: "The blocker is the security review. If we keep the audit export in scope, I need three engineers on it all week and the launch date becomes fragile." },
      { speaker: "Design", tone: "noise", text: "The walkthrough screens are fine, but there are a few polish gaps. They are visible, not dangerous." },
      { speaker: "VP Product", tone: "signal", text: "I need a clear recommendation by Friday: cut audit export from the demo, or tell Sales the launch date moves." },
      { speaker: "Engineering Lead", tone: "signal", text: "My bias is to cut scope and protect the date. Moving the date creates more confusion than removing one feature from the demo." },
    ],
  },
  {
    id: "incident-review",
    level: 2,
    title: "The incident review that is not really over",
    setting: "Post-incident review",
    pressure: "Latent risk",
    ask: "Replay the residual risk and the decision your director needs to make.",
    focus: "Avoid mistaking a resolved outage for a resolved system risk.",
    mustCatch: ["manual rollback", "unknown owner", "customer comms", "Friday deploy", "kill switch"],
    beats: [
      { speaker: "SRE", tone: "signal", text: "The outage is over, but the rollback was manual. We do not have a tested kill switch for this path." },
      { speaker: "PM", tone: "noise", text: "Customer comms went out quickly. Support are happy with the tone, so I do not think we need a follow-up email." },
      { speaker: "Staff Engineer", tone: "signal", text: "The uncomfortable part is ownership. The feature flag belongs to one team, the ranking job to another, and nobody owns the combined failure mode." },
      { speaker: "Director", tone: "pressure", text: "We have a Friday deploy. I need to know if you are recommending a hold, a smaller deploy, or a deploy with a kill switch in place." },
      { speaker: "SRE", tone: "signal", text: "I would not hold everything. I would require the kill switch and name a single owner for the combined path before Friday." },
    ],
  },
  {
    id: "skip-level",
    level: 2,
    title: "The skip-level signal",
    setting: "1:1 synthesis",
    pressure: "People and delivery tension",
    ask: "Summarise a people risk without turning it into gossip.",
    focus: "Protect confidentiality while making the management action clear.",
    mustCatch: ["context switching", "unclear ownership", "senior engineer", "delivery risk", "manager action"],
    beats: [
      { speaker: "Senior Engineer", tone: "signal", text: "I can make the deadline, but I am context switching across three workstreams and I do not know who gets to say no." },
      { speaker: "Senior Engineer", tone: "pressure", text: "I do not want this to sound like complaining. The team is working hard. It is just getting harder to know what winning means." },
      { speaker: "EM", tone: "noise", text: "There are also some tooling frustrations, but those feel solvable if we had more clarity." },
      { speaker: "Senior Engineer", tone: "signal", text: "The thing I need is clearer ownership. If this stays fuzzy for another sprint, delivery risk goes up." },
      { speaker: "EM", tone: "signal", text: "Your manager action is to clarify who can trade scope and protect the senior engineer from being the unofficial router." },
    ],
  },
  {
    id: "ai-vendor",
    level: 3,
    title: "The AI vendor pitch",
    setting: "Vendor evaluation",
    pressure: "Hype versus operating reality",
    ask: "Brief leadership on whether to proceed, pause or run a bounded trial.",
    focus: "Separate capability promise from evidence, cost and reversibility.",
    mustCatch: ["no eval set", "data retention", "pilot", "success criteria", "exit cost"],
    beats: [
      { speaker: "Vendor", tone: "noise", text: "The model is best in class and our roadmap includes autonomous workflow support next quarter." },
      { speaker: "Security", tone: "signal", text: "The data retention language is still not acceptable for customer content. We need a contract carve-out before any production data." },
      { speaker: "Product", tone: "signal", text: "We do not have an eval set yet. The demo looked good, but we cannot compare it to our own baseline." },
      { speaker: "Finance", tone: "pressure", text: "The commercial structure makes exit expensive after six months. A pilot is fine, but the success criteria need to be written before procurement." },
      { speaker: "You", tone: "signal", text: "The upward replay should recommend a bounded trial with synthetic data, an eval set, and a decision gate before any long commitment." },
    ],
  },
  {
    id: "exec-ambiguity",
    level: 4,
    title: "The ambiguous exec ask",
    setting: "Leadership meeting",
    pressure: "Unclear sponsor intent",
    ask: "Clarify the real decision and replay it without sounding defensive.",
    focus: "Convert a broad challenge into options and a specific ask.",
    mustCatch: ["confidence", "operating model", "two options", "decision owner", "next review"],
    beats: [
      { speaker: "CPO", tone: "pressure", text: "I am not convinced we have enough confidence in the operating model. It still sounds like everyone owns it, which usually means nobody does." },
      { speaker: "Data Lead", tone: "signal", text: "There are two options. Centralise the platform ownership, or keep domain ownership but set stricter service gates." },
      { speaker: "Finance", tone: "noise", text: "The cost model is roughly fine either way. The variance is mostly people allocation, not cloud spend." },
      { speaker: "CPO", tone: "signal", text: "I need the decision owner named. Bring me a recommendation and the consequence of the option you are not choosing at the next review." },
      { speaker: "You", tone: "signal", text: "The manage-up move is to replay that the question is ownership confidence, not technical feasibility." },
    ],
  },
  {
    id: "board-prep",
    level: 5,
    title: "The board prep compression",
    setting: "Board narrative prep",
    pressure: "Severe compression",
    ask: "Reduce a complex programme update into one board-safe message.",
    focus: "Choose the few points that change confidence.",
    mustCatch: ["on track", "adoption risk", "mitigation", "decision not needed", "watch item"],
    beats: [
      { speaker: "Programme Lead", tone: "signal", text: "The programme is on track for the current milestone. Delivery is not the board issue this month." },
      { speaker: "Customer Lead", tone: "signal", text: "Adoption risk is the watch item. Two large customers are waiting for clearer migration support." },
      { speaker: "Engineering", tone: "noise", text: "There are a few tech debt items in the integration layer, but they are not driving the milestone." },
      { speaker: "COO", tone: "pressure", text: "Do not ask the board for a decision. I want confidence, the watch item, and the mitigation we are already taking." },
      { speaker: "Programme Lead", tone: "signal", text: "The mitigation is a named customer migration squad and weekly adoption reporting until the risk burns down." },
    ],
  },
];

const NAV = [
  ["home", "Home", "now"],
  ["practice", "Practice", "rep"],
  ["runs", "Runs", "log"],
  ["frameworks", "Frameworks", "tools"],
  ["plan", "Plan", "next"],
  ["settings", "Settings", "sync"],
];

const DEFAULT_STATE = {
  version: 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  runs: [],
  drafts: {},
  deletedRuns: {},
  activityDates: [],
  settings: {
    targetRuns: 4,
    lastScenarioId: "roadmap-cut",
    lastFrameworkId: "bluf",
  },
};

const KEY = "il-mister-state-v1";
const cloudAccount = document.querySelector("#cloud-account")?.dataset || {};
const cloudEnabled = cloudAccount.storageMode !== "local" && Boolean(cloudAccount.userId);
let state = loadState();
let cloudRevision = null;
let cloudStatus = cloudEnabled ? "loading" : "offline";
let syncTimer = null;
let selectedScenarioId = state.settings.lastScenarioId || SCENARIOS[0].id;
let selectedFrameworkId = state.settings.lastFrameworkId || FRAMEWORKS[0].id;
let beatIndex = 2;
let latestCoach = null;
let scoring = false;

function h(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function route() {
  return (location.hash || "#home").replace("#", "") || "home";
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normaliseState(value) {
  const base = clone(DEFAULT_STATE);
  const incoming = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  return {
    ...base,
    ...incoming,
    runs: Array.isArray(incoming.runs) ? incoming.runs : [],
    drafts: incoming.drafts && typeof incoming.drafts === "object" ? incoming.drafts : {},
    deletedRuns: incoming.deletedRuns && typeof incoming.deletedRuns === "object" ? incoming.deletedRuns : {},
    activityDates: Array.isArray(incoming.activityDates) ? incoming.activityDates : [],
    settings: { ...base.settings, ...(incoming.settings || {}) },
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    return saved && saved.version === 1 ? normaliseState(saved) : clone(DEFAULT_STATE);
  } catch {
    return clone(DEFAULT_STATE);
  }
}

function saveState(options = {}) {
  if (options.touch !== false) state.updatedAt = new Date().toISOString();
  localStorage.setItem(KEY, JSON.stringify(state));
  updateShell();
  if (options.sync !== false) queueCloudSave();
}

function queueCloudSave() {
  if (!cloudEnabled) {
    setCloudStatus("offline", "Local only");
    return;
  }
  clearTimeout(syncTimer);
  syncTimer = setTimeout(pushCloud, 650);
}

function setCloudStatus(status, label) {
  cloudStatus = status;
  const node = document.querySelector("#cloud-status");
  if (node) {
    node.dataset.state = status;
    const strong = node.querySelector("strong");
    if (strong) strong.textContent = label || status;
  }
  const summary = document.querySelector(".sync-summary");
  if (summary) summary.dataset.state = status;
}

function mergeCloudConflict(remote, local) {
  const merged = normaliseState(remote);
  const deleted = { ...(merged.deletedRuns || {}), ...(local.deletedRuns || {}) };
  const runs = new Map();
  [...(merged.runs || []), ...(local.runs || [])].forEach((run) => {
    if (run?.id && !deleted[run.id]) runs.set(run.id, run);
  });
  merged.runs = [...runs.values()].sort((a, b) => new Date(a.date) - new Date(b.date));
  merged.drafts = { ...(merged.drafts || {}), ...(local.drafts || {}) };
  merged.deletedRuns = deleted;
  merged.activityDates = [...new Set([...(merged.activityDates || []), ...(local.activityDates || [])])];
  merged.settings = { ...merged.settings, ...local.settings };
  merged.updatedAt = new Date().toISOString();
  return merged;
}

async function pushCloud() {
  if (!cloudEnabled) {
    setCloudStatus("offline", "Local only");
    return;
  }
  setCloudStatus("syncing", "Saving");
  try {
    const response = await fetch("/api/state", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ state, baseRevision: cloudRevision }),
    });
    const payload = await response.json();
    if (response.status === 409 && payload.record) {
      state = mergeCloudConflict(payload.record.state, state);
      cloudRevision = payload.record.revision;
      localStorage.setItem(KEY, JSON.stringify(state));
      return pushCloud();
    }
    if (!response.ok) throw new Error(payload.error || "Sync failed");
    cloudRevision = payload.record.revision;
    setCloudStatus("synced", "Synced");
  } catch {
    setCloudStatus("offline", "Local only");
  }
}

async function loadCloud() {
  if (!cloudEnabled) {
    setCloudStatus("offline", "Local only");
    return;
  }
  try {
    const response = await fetch("/api/state", { headers: { accept: "application/json" } });
    if (!response.ok) throw new Error("Cloud unavailable");
    const payload = await response.json();
    if (payload.record?.state) {
      const remote = normaliseState(payload.record.state);
      cloudRevision = payload.record.revision;
      const localStamp = new Date(state.updatedAt || state.createdAt || 0).getTime();
      const remoteStamp = new Date(remote.updatedAt || remote.createdAt || 0).getTime();
      if (state.runs.length && localStamp > remoteStamp) {
        state = mergeCloudConflict(remote, state);
        saveState({ touch: false });
      } else {
        state = remote;
        localStorage.setItem(KEY, JSON.stringify(state));
        selectedScenarioId = state.settings.lastScenarioId || selectedScenarioId;
        selectedFrameworkId = state.settings.lastFrameworkId || selectedFrameworkId;
        render();
      }
    } else {
      await pushCloud();
    }
    setCloudStatus("synced", "Synced");
  } catch {
    setCloudStatus("offline", "Local only");
  }
}

function scenario() {
  return SCENARIOS.find((item) => item.id === selectedScenarioId) || SCENARIOS[0];
}

function framework() {
  return FRAMEWORKS.find((item) => item.id === selectedFrameworkId) || FRAMEWORKS[0];
}

function draftFor(id = selectedScenarioId) {
  state.drafts[id] ||= { ask: "", signals: "", summary: "", replay: "", action: "" };
  return state.drafts[id];
}

function runsThisWeek() {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  start.setHours(0, 0, 0, 0);
  return state.runs.filter((run) => new Date(run.date) >= start).length;
}

function averageScore(runs = state.runs) {
  if (!runs.length) return 0;
  return runs.reduce((sum, run) => sum + (run.overall || 0), 0) / runs.length;
}

function streakDays() {
  const dates = new Set(state.activityDates || []);
  let streak = 0;
  const cursor = new Date();
  while (dates.has(todayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function dimensionAverages() {
  const dims = ["listening", "signal", "structure", "upward"];
  return dims.map((dim) => {
    const values = state.runs.map((run) => run.scores?.[dim]).filter(Number.isFinite);
    const avg = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
    return { dim, avg };
  });
}

function dimensionName(dim) {
  return {
    listening: "Listening",
    signal: "Signal",
    structure: "Structure",
    upward: "Upward replay",
  }[dim] || dim;
}

function dimensionHint(dim) {
  return {
    listening: "Slow the tape down and confirm the ask before compressing.",
    signal: "Separate decision-changing constraints from interesting detail.",
    structure: "Use the framework moves as your rails before writing prose.",
    upward: "Lead with consequence, recommendation and the decision needed.",
  }[dim] || "Run a focused rep and compare what changed.";
}

function derivePlan() {
  const dims = dimensionAverages();
  const weakest = [...dims].sort((a, b) => (a.avg || 0) - (b.avg || 0))[0] || { dim: "listening", avg: 0 };
  const map = { listening: "readback", signal: "newsroom", structure: "pyramid", upward: "bluf" };
  const frameworkId = map[weakest.dim] || "bluf";
  const fw = FRAMEWORKS.find((item) => item.id === frameworkId) || FRAMEWORKS[0];
  const recentIds = new Set(state.runs.slice(-3).map((run) => run.scenarioId));
  const next = SCENARIOS.find((item) => !recentIds.has(item.id) && item.level <= Math.max(1, Math.round(averageScore()) + 1)) || SCENARIOS[0];
  return {
    weakest: weakest.dim,
    framework: fw,
    scenario: next,
    note: state.runs.length < 3
      ? "Build a three-run baseline before trusting the trend."
      : `Your next useful constraint is ${weakest.dim}. Use ${fw.name} to force a cleaner rep.`,
  };
}

function updateShell() {
  const pct = Math.min(100, Math.round((runsThisWeek() / Math.max(1, state.settings.targetRuns || 4)) * 100));
  const pctNode = document.querySelector("#rail-percent");
  const track = document.querySelector("#rail-track");
  if (pctNode) pctNode.textContent = `${pct}%`;
  if (track) track.style.width = `${pct}%`;
  renderNav();
}

function renderNav() {
  const current = route();
  const html = NAV.map(([id, label, meta]) => `<button class="nav-link ${current === id ? "active" : ""}" data-route="${id}"><span>${label}</span><small>${meta}</small></button>`).join("");
  const primary = document.querySelector("#primary-nav");
  const mobile = document.querySelector("#mobile-nav");
  if (primary) primary.innerHTML = html;
  if (mobile) mobile.innerHTML = html;
}

function render() {
  updateShell();
  const views = { home: renderHome, practice: renderPractice, runs: renderRuns, frameworks: renderFrameworks, plan: renderPlan, settings: renderSettings };
  document.querySelector("#app").innerHTML = (views[route()] || renderHome)();
}

function pageHead(kicker, title, copy) {
  return `<header class="page-head"><div><p class="eyebrow">${h(kicker)}</p><h1>${h(title)}</h1><p>${h(copy)}</p></div><div class="date-stamp">${new Date().toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" })}</div></header>`;
}

function renderHome() {
  const plan = derivePlan();
  const avg = averageScore();
  const week = runsThisWeek();
  const target = state.settings.targetRuns || 4;
  const remaining = Math.max(0, target - week);
  return `<section class="page">
    ${pageHead("Practice cockpit", "Get better at hearing the ask, finding the signal and replaying it up.", "Short, realistic reps for engineering managers who spend a lot of their life in meetings. Each run trains compression, judgement and upward clarity.")}
    <section class="command-strip">
      <div class="command-copy">
        <p class="eyebrow">Next best rep</p>
        <h2>${h(plan.scenario.title)}</h2>
        <p>${h(dimensionHint(plan.weakest))} Use ${h(plan.framework.name)} for this run.</p>
      </div>
      <div class="command-metrics">
        <div class="command-stat"><small>Focus</small><strong>${h(dimensionName(plan.weakest))}</strong></div>
        <div class="command-stat"><small>Rhythm</small><strong>${remaining ? `${remaining} left` : "on track"}</strong></div>
      </div>
      <div class="command-actions">
        <button class="button" data-start-scenario="${h(plan.scenario.id)}" data-framework="${h(plan.framework.id)}">Start planned rep</button>
        <button class="button button-quiet" data-route="plan">View ladder</button>
      </div>
    </section>
    <div class="home-grid">
      <section class="hero-panel" data-level="L${plan.scenario.level}">
        <div class="session-meta"><span>${h(plan.scenario.setting)}</span><span>${h(plan.framework.name)}</span><span>${h(plan.weakest)} focus</span></div>
        <h2>${h(plan.scenario.title)}</h2>
        <p>${h(plan.note)} The rep takes about six minutes: scan the meeting tape, capture the ask, then write the replay you would send upward.</p>
        <div class="hero-actions"><button class="button" data-start-scenario="${h(plan.scenario.id)}" data-framework="${h(plan.framework.id)}">Start next rep</button><button class="button button-dark" data-route="frameworks">Choose a framework</button></div>
      </section>
      <aside class="metric-stack">
        <section class="metric-panel"><h3>This week</h3><div class="ring-row"><div class="progress-ring" style="--value:${Math.min(100, Math.round(week / Math.max(1, target) * 100))}" data-label="${week}/${target}"></div><p>${week >= target ? "Weekly target met. Keep quality high." : `${target - week} more reps to hit the rhythm.`}</p></div></section>
        <section class="metric-panel"><h3>Average run</h3><strong>${avg ? avg.toFixed(1) : "0.0"}</strong><p>Overall score across listening, signal, structure and upward replay.</p></section>
        <section class="metric-panel"><h3>Streak</h3><strong>${streakDays()}</strong><p>Days with at least one completed practice run.</p></section>
      </aside>
    </div>
    <div class="section-title"><h2>Borrowed drills</h2><p>Patterns from jobs where replay quality matters.</p></div>
    <div class="drill-strip">
      ${FRAMEWORKS.slice(0, 4).map((fw) => `<article class="drill-tile"><span class="tag">${h(fw.industry.split(" ")[0])}</span><strong>${h(fw.name)}</strong><p>${h(fw.use)}</p></article>`).join("")}
    </div>
  </section>`;
}

function renderPractice() {
  const item = scenario();
  const fw = framework();
  const draft = draftFor(item.id);
  const shown = item.beats.slice(0, Math.max(0, Math.min(beatIndex, item.beats.length)));
  const transcript = item.beats.map((beat) => `${beat.speaker}: ${beat.text}`).join("\n");
  return `<section class="page">
    ${pageHead("Practice run", "Listen for the real ask, not every word.", "Reveal the meeting tape in beats, capture what matters, then ask the coach to score your upward replay. Cmd+Enter submits when the fields are ready.")}
    <div class="practice-intel">
      <span><strong>${h(item.setting)}</strong>${h(item.pressure)}</span>
      <span><strong>${h(fw.name)}</strong>${h(fw.moves.slice(0, 3).join(" / "))}</span>
      <span><strong>L${item.level}</strong>${h(item.focus)}</span>
    </div>
    <div class="practice-grid">
      <section class="practice-column">
        <div class="section-panel">
          <h2>Run setup</h2>
          <div class="control-grid">
            <label>Scenario<select id="scenario-select">${SCENARIOS.map((candidate) => `<option value="${h(candidate.id)}" ${candidate.id === item.id ? "selected" : ""}>L${candidate.level} - ${h(candidate.title)}</option>`).join("")}</select></label>
            <div class="scenario-meta">
              <div class="meta-box"><small>Setting</small><strong>${h(item.setting)}</strong></div>
              <div class="meta-box"><small>Pressure</small><strong>${h(item.pressure)}</strong></div>
              <div class="meta-box"><small>Level</small><strong>${item.level}</strong></div>
            </div>
            <p>${h(item.focus)}</p>
          </div>
        </div>
        <div class="section-panel">
          <h2>Framework</h2>
          <div class="framework-picker">
            ${FRAMEWORKS.map((candidate) => `<button class="framework-option ${candidate.id === fw.id ? "active" : ""}" data-framework-pick="${h(candidate.id)}">${h(candidate.name)}<small>${h(candidate.industry)}</small></button>`).join("")}
          </div>
        </div>
        <div class="section-panel">
          <h2>Meeting tape</h2>
          <p>${h(item.ask)}</p>
          <div class="tape" aria-live="polite">
            ${shown.length ? shown.map((beat, index) => `<article class="beat" data-tone="${h(beat.tone)}"><strong>${index + 1}. ${h(beat.speaker)}</strong><span>${h(beat.text)}</span></article>`).join("") : `<div class="empty-state"><h2>Ready when you are.</h2><p>Reveal one beat at a time, then write the replay from memory.</p></div>`}
          </div>
          <div class="tape-actions"><button class="button button-teal" data-next-beat ${beatIndex >= item.beats.length ? "disabled" : ""}>Next beat</button><button class="button button-quiet" data-show-all>Show all</button><button class="button button-quiet" data-reset-beats>Reset tape</button></div>
        </div>
      </section>
      <section class="practice-column">
        <div class="form-panel section-panel">
          <h2>Your capture</h2>
          <p class="capture-helper">Write for your manager's next decision: ask, signal, summary, replay, next action.</p>
          <div class="capture-grid" data-transcript="${h(transcript)}">
            <div class="field-pair">
              <label>What is the real ask?<textarea data-field="ask" placeholder="The decision, clarification or action being asked for...">${h(draft.ask)}</textarea></label>
              <label>Which points matter most?<textarea data-field="signals" placeholder="Constraints, risks, commitments, timing, owners...">${h(draft.signals)}</textarea></label>
            </div>
            <label>Thirty-second summary<textarea class="wide" data-field="summary" placeholder="The version you would say out loud after the meeting...">${h(draft.summary)}</textarea></label>
            <label>Manage-up replay<textarea class="wide" data-field="replay" placeholder="Bottom line, so what, recommendation, decision needed...">${h(draft.replay)}</textarea></label>
            <label>Next action<textarea data-field="action" placeholder="What you will do, ask, or decide next...">${h(draft.action)}</textarea></label>
          </div>
          <div class="form-actions"><button class="button" data-submit-run ${scoring ? "disabled" : ""}>${scoring ? "Scoring..." : "Score run"}</button><button class="button button-quiet" data-clear-draft>Clear draft</button></div>
        </div>
      </section>
      <aside class="practice-column coach-side">
        <div class="coach-card section-panel">
          <h2>Live checks</h2>
          <div class="live-checks">${liveChecks(item, fw, draft)}</div>
        </div>
        <div class="coach-card section-panel">
          <h2>Coach</h2>
          ${latestCoach ? coachResultHtml(latestCoach) : `<p>Score a run to get a replay rewrite, risks and the next drill. The local coach works immediately; an AI endpoint can add richer critique.</p><div class="score-grid">${["listening", "signal", "structure", "upward"].map((name) => `<div class="score-box"><small>${name}</small><strong>-</strong></div>`).join("")}</div>`}
        </div>
      </aside>
    </div>
  </section>`;
}

function liveChecks(item, fw, draft) {
  const combined = `${draft.ask} ${draft.signals} ${draft.summary} ${draft.replay} ${draft.action}`.toLowerCase();
  const checks = [
    ["Ask named", draft.ask.trim().split(/\s+/).length >= 6, "Can a manager tell what decision or action is needed?"],
    ["Key signal captured", item.mustCatch.some((signal) => combined.includes(signal.toLowerCase().split(" ")[0])), "At least one must-catch constraint is visible."],
    ["Framework used", fw.moves.some((move) => combined.includes(move.toLowerCase().split(" ")[0])), `${fw.name}: ${fw.moves.join(", ")}.`],
    ["Upward ready", /recommend|decision|risk|trade|next|ask|owner/i.test(draft.replay), "Replay includes consequence, recommendation or next action."],
  ];
  return checks.map(([label, done, copy]) => `<div class="check-row ${done ? "done" : ""}"><span class="check-dot"></span><span><strong>${h(label)}</strong><small>${h(copy)}</small></span></div>`).join("");
}

function coachResultHtml(coach) {
  const scores = coach.scores || {};
  return `<div class="coach-result">
    <p class="eyebrow">${h(coach.mode === "ai" ? "AI coach" : "Local coach")}</p>
    <h2>${h(coach.headline || "Run scored")}</h2>
    <div class="score-grid">${["listening", "signal", "structure", "upward"].map((name) => `<div class="score-box"><small>${name}</small><strong>${scores[name] || "-"}</strong></div>`).join("")}</div>
    <ul class="feedback-list">${[...(coach.strengths || []), ...(coach.risks || [])].map((item) => `<li>${h(item)}</li>`).join("")}</ul>
    <pre>${h(coach.rewrite || "")}</pre>
    <p><strong>Next drill:</strong> ${h(coach.nextDrill || "Run the scenario again with a tighter replay.")}</p>
    ${coach.coachNote ? `<p>${h(coach.coachNote)}</p>` : ""}
  </div>`;
}

function renderRuns() {
  const runs = [...state.runs].reverse();
  const avg = averageScore();
  const dims = dimensionAverages();
  const weakest = [...dims].sort((a, b) => (a.avg || 0) - (b.avg || 0))[0] || { dim: "listening", avg: 0 };
  const plan = derivePlan();
  return `<section class="page">
    ${pageHead("Run monitor", "Your practice history should tell you what to train next.", "Track patterns across reps so improvement does not depend on vibes after a long meeting day.")}
    <div class="run-monitor-layout">
      <aside class="trend-panel">
        <p class="eyebrow">Weakest dimension</p>
        <h2>${h(dimensionName(weakest.dim))}</h2>
        <p>${h(dimensionHint(weakest.dim))}</p>
        <div class="trend-bars">
          ${dims.map((item) => `<div class="bar-row"><span>${h(dimensionName(item.dim))}</span><div class="bar-track"><span style="width:${Math.min(100, (item.avg || 0) * 20)}%"></span></div><strong>${item.avg ? item.avg.toFixed(1) : "-"}</strong></div>`).join("")}
        </div>
        <div class="next-drill-box">
          <span class="tag coral">${h(plan.framework.name)}</span>
          <strong>${h(plan.scenario.title)}</strong>
          <p>${h(plan.note)}</p>
          <button class="button button-teal button-small" data-start-scenario="${h(plan.scenario.id)}" data-framework="${h(plan.framework.id)}">Start planned rep</button>
        </div>
      </aside>
      <section class="run-list-panel">
        <div class="section-title"><h2>Recent runs</h2><p>${state.runs.length} runs, ${avg ? avg.toFixed(1) : "0.0"} average</p></div>
        ${runs.length ? `<div class="run-grid compact">${runs.map(runCard).join("")}</div>` : `<div class="empty-state"><h2>No runs yet.</h2><p>Start one rep and the monitor will begin showing trends.</p><button class="button" data-route="practice">Start practice</button></div>`}
      </section>
    </div>
  </section>`;
}

function runCard(run) {
  const scenarioName = SCENARIOS.find((item) => item.id === run.scenarioId)?.title || run.scenarioTitle || "Practice run";
  const fw = FRAMEWORKS.find((item) => item.id === run.frameworkId)?.name || run.frameworkName || "Framework";
  return `<article class="run-card">
    <div class="run-meta"><span class="tag yellow">${h(fw)}</span><span>${h(new Date(run.date).toLocaleString())}</span><span>Overall ${run.overall}/5</span></div>
    <h3>${h(scenarioName)}</h3>
    <blockquote>${h(run.fields?.replay || run.fields?.summary || "")}</blockquote>
    ${["listening", "signal", "structure", "upward"].map((dim) => `<div class="bar-row"><span>${h(dim)}</span><div class="bar-track"><span style="width:${Math.min(100, (run.scores?.[dim] || 0) * 20)}%"></span></div><strong>${run.scores?.[dim] || "-"}</strong></div>`).join("")}
    <p>${h(run.coach?.nextDrill || "")}</p>
    <button class="button button-quiet button-small" data-delete-run="${h(run.id)}">Delete</button>
  </article>`;
}

function renderFrameworks() {
  return `<section class="page">
    ${pageHead("Framework library", "Use the tool that matches the meeting, not the one you remember first.", "These are borrowed from industries where the cost of a fuzzy replay is high. The app deliberately rotates them so you build range.")}
    <div class="framework-grid">
      ${FRAMEWORKS.map((fw) => `<article class="framework-card">
        <span class="tag">${h(fw.industry)}</span>
        <h3>${h(fw.name)}</h3>
        <p>${h(fw.use)}</p>
        <div class="framework-meta">${fw.moves.map((move) => `<span>${h(move)}</span>`).join("")}</div>
        <ul>${fw.checklist.map((item) => `<li>${h(item)}</li>`).join("")}</ul>
        <button class="button button-small" data-start-framework="${h(fw.id)}">Practice with this</button>
      </article>`).join("")}
    </div>
  </section>`;
}

function renderPlan() {
  const plan = derivePlan();
  const dims = dimensionAverages();
  return `<section class="page">
    ${pageHead("Training plan", "Progressive reps, not random notes.", "Il Mister uses your run history to choose the next useful constraint: hear better, filter harder, structure cleaner or replay upward with more consequence.")}
    <div class="plan-grid">
      <article class="plan-panel"><p class="eyebrow">Next best rep</p><h2>${h(plan.scenario.title)}</h2><p>${h(plan.note)}</p><button class="button" data-start-scenario="${h(plan.scenario.id)}" data-framework="${h(plan.framework.id)}">Start planned rep</button></article>
      <article class="plan-panel"><p class="eyebrow">Weakest dimension</p><h2>${h(plan.weakest)}</h2>${dims.map((item) => `<div class="bar-row"><span>${h(item.dim)}</span><div class="bar-track"><span style="width:${Math.min(100, (item.avg || 0) * 20)}%"></span></div><strong>${item.avg ? item.avg.toFixed(1) : "-"}</strong></div>`).join("")}</article>
      <article class="plan-panel"><p class="eyebrow">Three-run ladder</p><ol><li>Run ${h(plan.framework.name)} on a level ${plan.scenario.level} scenario.</li><li>Repeat the same scenario and cut the replay by 25 percent.</li><li>Switch to ${h(plan.framework.name === "BLUF" ? "SBAR" : "BLUF")} and compare which replay would help your manager more.</li></ol></article>
      <article class="plan-panel"><p class="eyebrow">Iteration rule</p><ul><li>After every three runs, inspect the lowest dimension.</li><li>If upward is below 4, force BLUF or Pyramid.</li><li>If listening is below 4, force Readback before summarising.</li><li>If signal is below 4, use Newsroom Lead and write the lead first.</li></ul></article>
    </div>
  </section>`;
}

function renderSettings() {
  const storageCopy = cloudEnabled
    ? `Progress is saved locally first and synced to the private D1-backed app state when available.`
    : `Progress is saved locally in this browser. Export a backup when you want to move it to another device.`;
  const accountCopy = cloudEnabled
    ? `Your practice record is private to <strong>${h(cloudAccount.userEmail || "your signed-in account")}</strong>.`
    : `Your practice record is saved on <strong>${h(cloudAccount.userEmail || "this browser")}</strong>.`;
  const syncCopy = cloudEnabled
    ? cloudStatus === "synced" ? "Progress synced" : cloudStatus === "syncing" ? "Saving changes" : cloudStatus === "offline" ? "Saved locally; cloud retry pending" : "Connecting"
    : "Saved locally on this device";
  const syncAction = cloudEnabled
    ? `<button class="button button-quiet" data-sync-now>Sync now</button>`
    : `<button class="button button-quiet" data-export>Export backup</button>`;
  return `<section class="page">
    ${pageHead("Settings", "Keep the app frictionless and portable.", storageCopy)}
    <div class="settings-stack">
      <section class="settings-panel"><h2>Account and sync</h2><p>${accountCopy}</p><div class="sync-summary" data-state="${h(cloudStatus)}"><span class="cloud-dot"></span><span>${syncCopy}</span></div><div class="settings-actions">${syncAction}</div></section>
      <section class="settings-panel"><h2>Weekly rhythm</h2><p>Set the target shown in the rail and home dashboard.</p><label>Practice runs per week<input id="target-runs" type="number" min="1" max="20" step="1" value="${h(state.settings.targetRuns || 4)}"></label></section>
      <section class="settings-panel"><h2>Backups</h2><p>Export or restore a JSON backup if you want to move between environments.</p><div class="settings-actions"><button class="button" data-export>Export</button><button class="button button-quiet" data-import>Import</button><button class="button button-danger" data-reset>Reset</button></div></section>
    </div>
  </section>`;
}

function draftPayload() {
  const item = scenario();
  const fw = framework();
  const draft = draftFor(item.id);
  return {
    scenarioId: item.id,
    scenarioTitle: item.title,
    frameworkId: fw.id,
    frameworkName: fw.name,
    difficulty: item.level,
    transcript: item.beats.map((beat) => `${beat.speaker}: ${beat.text}`).join("\n"),
    ask: draft.ask.trim(),
    signals: draft.signals.trim(),
    summary: draft.summary.trim(),
    replay: draft.replay.trim(),
    action: draft.action.trim(),
    mustCatch: item.mustCatch,
  };
}

function localCoach(payload) {
  const combined = `${payload.ask} ${payload.signals} ${payload.summary} ${payload.replay} ${payload.action}`.toLowerCase();
  const hits = payload.mustCatch.filter((item) => combined.includes(item.toLowerCase().split(" ")[0]));
  const fieldCount = [payload.ask, payload.signals, payload.summary, payload.replay, payload.action].filter((value) => value.split(/\s+/).length >= 8).length;
  const upwardHits = ["decision", "recommend", "risk", "trade", "owner", "next", "ask", "because"].filter((word) => combined.includes(word)).length;
  const scores = {
    listening: Math.max(1, Math.min(5, Math.round(2 + hits.length / Math.max(1, payload.mustCatch.length) * 3))),
    signal: Math.max(1, Math.min(5, 1 + hits.length)),
    structure: Math.max(1, Math.min(5, 1 + fieldCount)),
    upward: Math.max(1, Math.min(5, Math.round(1 + upwardHits / 2))),
  };
  const missing = payload.mustCatch.filter((item) => !hits.includes(item)).slice(0, 3);
  return {
    mode: "local",
    headline: "Local coach scored the run.",
    scores,
    strengths: ["You completed the full capture loop.", fieldCount >= 4 ? "Your replay has enough structure to improve." : "The next gain is clearer field separation."],
    risks: missing.length ? missing.map((item) => `Possible missed signal: ${item}.`) : ["Good signal coverage. Now compress harder."],
    rewrite: `BLUF: ${payload.summary}\nAsk: ${payload.ask}\nSo what: ${payload.signals}\nNext move: ${payload.action}`,
    nextDrill: missing[0] ? `Run it again and force the phrase "${missing[0]}" into your replay.` : "Repeat at the next level and cut the replay by 25 percent.",
    coachNote: "The AI endpoint was unavailable, so the browser fallback handled this run.",
  };
}

async function submitRun() {
  const payload = draftPayload();
  if ([payload.ask, payload.signals, payload.summary, payload.replay, payload.action].some((value) => value.length < 2)) {
    showToast("Fill in each capture field before scoring.");
    return;
  }
  scoring = true;
  render();
  let coach;
  try {
    const response = await fetch("/api/coach", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Coach unavailable");
    coach = result;
  } catch {
    coach = localCoach(payload);
  }
  const scores = coach.scores || {};
  const overall = Math.round((["listening", "signal", "structure", "upward"].reduce((sum, key) => sum + (scores[key] || 1), 0)) / 4);
  const run = {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    scenarioId: payload.scenarioId,
    scenarioTitle: payload.scenarioTitle,
    frameworkId: payload.frameworkId,
    frameworkName: payload.frameworkName,
    overall,
    scores,
    fields: { ask: payload.ask, signals: payload.signals, summary: payload.summary, replay: payload.replay, action: payload.action },
    coach,
  };
  state.runs.push(run);
  if (!state.activityDates.includes(todayKey())) state.activityDates.push(todayKey());
  latestCoach = coach;
  scoring = false;
  saveState();
  render();
  showToast("Run saved. Coach notes are ready.");
}

function exportBackup() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `il-mister-backup-${todayKey()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

document.addEventListener("click", (event) => {
  const routeButton = event.target.closest("[data-route]");
  if (routeButton) {
    location.hash = routeButton.dataset.route;
    return;
  }
  const start = event.target.closest("[data-start-scenario]");
  if (start) {
    selectedScenarioId = start.dataset.startScenario;
    selectedFrameworkId = start.dataset.framework || selectedFrameworkId;
    state.settings.lastScenarioId = selectedScenarioId;
    state.settings.lastFrameworkId = selectedFrameworkId;
    beatIndex = 2;
    latestCoach = null;
    saveState({ sync: false });
    location.hash = "practice";
    render();
    return;
  }
  const startFramework = event.target.closest("[data-start-framework]");
  if (startFramework) {
    selectedFrameworkId = startFramework.dataset.startFramework;
    state.settings.lastFrameworkId = selectedFrameworkId;
    saveState({ sync: false });
    location.hash = "practice";
    render();
    return;
  }
  const fwPick = event.target.closest("[data-framework-pick]");
  if (fwPick) {
    selectedFrameworkId = fwPick.dataset.frameworkPick;
    state.settings.lastFrameworkId = selectedFrameworkId;
    latestCoach = null;
    saveState();
    render();
    return;
  }
  if (event.target.closest("[data-next-beat]")) {
    beatIndex = Math.min(scenario().beats.length, beatIndex + 1);
    render();
    return;
  }
  if (event.target.closest("[data-show-all]")) {
    beatIndex = scenario().beats.length;
    render();
    return;
  }
  if (event.target.closest("[data-reset-beats]")) {
    beatIndex = 0;
    render();
    return;
  }
  if (event.target.closest("[data-submit-run]")) {
    submitRun();
    return;
  }
  if (event.target.closest("[data-clear-draft]")) {
    state.drafts[selectedScenarioId] = { ask: "", signals: "", summary: "", replay: "", action: "" };
    latestCoach = null;
    saveState();
    render();
    return;
  }
  const remove = event.target.closest("[data-delete-run]");
  if (remove) {
    const id = remove.dataset.deleteRun;
    state.runs = state.runs.filter((run) => run.id !== id);
    state.deletedRuns[id] = new Date().toISOString();
    saveState();
    render();
    showToast("Run deleted.");
    return;
  }
  if (event.target.closest("[data-sync-now]")) {
    pushCloud();
    return;
  }
  if (event.target.closest("[data-export]")) {
    exportBackup();
    return;
  }
  if (event.target.closest("[data-import]")) {
    document.querySelector("#backup-input")?.click();
    return;
  }
  if (event.target.closest("[data-reset]")) {
    document.querySelector("#confirm-dialog")?.showModal();
  }
});

document.addEventListener("change", (event) => {
  if (event.target.id === "scenario-select") {
    selectedScenarioId = event.target.value;
    state.settings.lastScenarioId = selectedScenarioId;
    beatIndex = 2;
    latestCoach = null;
    saveState();
    render();
  }
});

document.addEventListener("input", (event) => {
  if (event.target.matches("[data-field]")) {
    const field = event.target.dataset.field;
    draftFor()[field] = event.target.value;
    saveState({ sync: false });
  }
  if (event.target.id === "target-runs") {
    state.settings.targetRuns = Math.max(1, Math.min(20, Number(event.target.value) || 4));
    saveState();
    updateShell();
  }
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter" && route() === "practice") {
    event.preventDefault();
    submitRun();
  }
});

document.querySelector("#confirm-dialog")?.addEventListener("close", (event) => {
  if (event.target.returnValue === "confirm") {
    localStorage.removeItem(KEY);
    state = clone(DEFAULT_STATE);
    selectedScenarioId = state.settings.lastScenarioId;
    selectedFrameworkId = state.settings.lastFrameworkId;
    latestCoach = null;
    saveState();
    render();
    showToast("Practice record reset.");
  }
});

document.querySelector("#backup-input")?.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    state = normaliseState(JSON.parse(await file.text()));
    selectedScenarioId = state.settings.lastScenarioId || selectedScenarioId;
    selectedFrameworkId = state.settings.lastFrameworkId || selectedFrameworkId;
    saveState();
    render();
    showToast("Backup restored.");
  } catch {
    showToast("That backup could not be read.");
  } finally {
    event.target.value = "";
  }
});

window.addEventListener("hashchange", render);
render();
loadCloud();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

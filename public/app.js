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
  ["coach", "Coach", "AI"],
  ["plan", "Plan", "next"],
  ["settings", "Settings", "data"],
];

const DEFAULT_STATE = {
  version: 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  runs: [],
  drafts: {},
  deletedRuns: {},
  activityDates: [],
  progressCoach: null,
  settings: {
    targetRuns: 4,
    lastScenarioId: "roadmap-cut",
    lastFrameworkId: "bluf",
  },
};

const KEY = "il-mister-state-v1";
const cloudAccount = document.querySelector("#cloud-account")?.dataset || {};
const SUPABASE_URL = "https://xmpghizpaxffjmwgfxih.supabase.co";
const SUPABASE_KEY = "sb_publishable_FYBaxDTy_Dk34_FQHz4uMQ_WZ2KShqg";
const SUPABASE_TABLE = "il_mister_shared_state";
const SUPABASE_SHARED_ID = "default";
const supabaseClient = window.supabase?.createClient?.(SUPABASE_URL, SUPABASE_KEY) || null;
const cloudEnabled = Boolean(supabaseClient);
let state = loadState();
let cloudStatus = cloudEnabled ? "loading" : "offline";
let syncTimer = null;
let selectedScenarioId = state.settings.lastScenarioId || SCENARIOS[0].id;
let selectedFrameworkId = state.settings.lastFrameworkId || FRAMEWORKS[0].id;
let beatIndex = 2;
let latestCoach = null;
let scoring = false;
let progressCoachLoading = false;

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
    progressCoach: incoming.progressCoach && typeof incoming.progressCoach === "object" ? incoming.progressCoach : null,
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
  setCloudStatus("syncing", "Syncing");
  try {
    const { error } = await supabaseClient
      .from(SUPABASE_TABLE)
      .upsert({ id: SUPABASE_SHARED_ID, data: clone(state), updated_at: new Date().toISOString() })
      .select("data, updated_at")
      .maybeSingle();
    if (error) throw error;
    setCloudStatus("synced", "Synced");
  } catch {
    setCloudStatus("offline", "Sync unavailable");
  }
}

async function loadCloud() {
  if (!cloudEnabled) {
    setCloudStatus("offline", "Local only");
    return;
  }
  try {
    setCloudStatus("syncing", "Checking");
    const { data, error } = await supabaseClient
      .from(SUPABASE_TABLE)
      .select("data, updated_at")
      .eq("id", SUPABASE_SHARED_ID)
      .maybeSingle();
    if (error) throw error;
    if (data?.data) {
      const remote = normaliseState(data.data);
      const localStamp = new Date(state.updatedAt || state.createdAt || 0).getTime();
      const remoteStamp = new Date(data.updated_at || remote.updatedAt || remote.createdAt || 0).getTime();
      const hasLocalWork = state.runs.length || Object.keys(state.drafts || {}).length || state.progressCoach;
      if (hasLocalWork && localStamp >= remoteStamp - 1000) {
        state = mergeCloudConflict(remote, state);
        localStorage.setItem(KEY, JSON.stringify(state));
        await pushCloud();
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
    setCloudStatus("offline", "Sync unavailable");
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

function trimWords(value, limit = 70) {
  const words = String(value || "").trim().split(/\s+/).filter(Boolean);
  return words.length > limit ? `${words.slice(0, limit).join(" ")}...` : words.join(" ");
}

function averageOf(runs, field = "overall") {
  const values = runs.map((run) => field === "overall" ? run.overall : run.scores?.[field]).filter(Number.isFinite);
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
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

function progressPayload() {
  const recentRuns = state.runs.slice(-10).map((run) => ({
    date: run.date,
    scenarioTitle: SCENARIOS.find((item) => item.id === run.scenarioId)?.title || run.scenarioTitle || "Practice run",
    frameworkName: FRAMEWORKS.find((item) => item.id === run.frameworkId)?.name || run.frameworkName || "Framework",
    overall: run.overall || 0,
    scores: run.scores || {},
    replay: trimWords(run.fields?.replay || "", 70),
    summary: trimWords(run.fields?.summary || "", 45),
    nextDrill: trimWords(run.coach?.nextDrill || "", 32),
  }));
  const lastThree = state.runs.slice(-3);
  const previousThree = state.runs.slice(-6, -3);
  const plan = derivePlan();
  return {
    generatedAt: new Date().toISOString(),
    totals: {
      totalRuns: state.runs.length,
      weeklyRuns: runsThisWeek(),
      targetRuns: state.settings.targetRuns || 4,
      streakDays: streakDays(),
      averageScore: Number(averageScore().toFixed(2)),
      lastThreeAverage: Number(averageOf(lastThree).toFixed(2)),
      previousThreeAverage: Number(averageOf(previousThree).toFixed(2)),
    },
    dimensions: dimensionAverages().map((item) => ({ dim: item.dim, name: dimensionName(item.dim), avg: Number((item.avg || 0).toFixed(2)) })),
    nextPlan: {
      weakest: plan.weakest,
      frameworkId: plan.framework.id,
      frameworkName: plan.framework.name,
      scenarioId: plan.scenario.id,
      scenarioTitle: plan.scenario.title,
      note: plan.note,
    },
    recentRuns,
  };
}

function localProgressCoach(payload = progressPayload()) {
  const dims = [...(payload.dimensions || [])].sort((a, b) => (a.avg || 0) - (b.avg || 0));
  const weakest = dims[0] || { dim: "listening", name: "Listening", avg: 0 };
  const strongest = [...dims].sort((a, b) => (b.avg || 0) - (a.avg || 0))[0] || { dim: "signal", name: "Signal", avg: 0 };
  const totalRuns = payload.totals?.totalRuns || 0;
  const trend = (payload.totals?.lastThreeAverage || 0) - (payload.totals?.previousThreeAverage || 0);
  const plan = payload.nextPlan || derivePlan();
  if (!totalRuns) {
    return {
      mode: "local",
      headline: "Build a three-run baseline first.",
      summary: "You do not have enough scored reps for a real trend yet. Start with three short runs so the coach can separate noise from a pattern.",
      pattern: "No practice history yet.",
      strengths: ["The app is ready for a quick baseline.", "The first goal is consistency, not perfection."],
      risks: ["Do not over-tune the system before you have three examples.", "Avoid switching frameworks after every single attempt."],
      nextThreeRuns: [
        { title: plan.scenarioTitle || "The roadmap squeeze", framework: plan.frameworkName || "Readback", why: "Create a listening baseline." },
        { title: "The incident review that is not really over", framework: "SBAR", why: "Practise separating fact, risk and recommendation." },
        { title: "The skip-level signal", framework: "BLUF", why: "Practise a sensitive manage-up replay." },
      ],
      managerPractice: "After the next run, write one sentence that starts: \"The decision I think you need is...\"",
      coachNote: "Local progress coach used. Configure the Netlify AI environment variables for model-backed feedback.",
    };
  }
  return {
    mode: "local",
    headline: `${weakest.name} is the next useful constraint.`,
    summary: `You have ${totalRuns} scored run${totalRuns === 1 ? "" : "s"}. Your strongest area is ${strongest.name.toLowerCase()}, and the next gain is ${weakest.name.toLowerCase()}.`,
    pattern: trend > 0.25 ? "The recent average is moving up." : trend < -0.25 ? "The recent average has dipped, so simplify the next rep." : "The recent average is broadly flat; change the constraint rather than adding more volume.",
    strengths: [
      `${strongest.name} is currently your best-scored dimension.`,
      totalRuns >= 3 ? "There is enough history to choose focused reps instead of random practice." : "You have started the loop; add a few more reps before trusting the trend.",
    ],
    risks: [
      `${weakest.name} may be limiting the quality of the replay.`,
      "The next rep should constrain one behaviour, not ask you to improve everything at once.",
    ],
    nextThreeRuns: [
      { title: plan.scenarioTitle, framework: plan.frameworkName, why: `Target ${weakest.name.toLowerCase()} with one clean rep.` },
      { title: plan.scenarioTitle, framework: plan.frameworkName, why: "Repeat it and cut the replay by 25 percent." },
      { title: strongest.name === "Upward replay" ? "The incident review that is not really over" : "The ambiguous exec ask", framework: weakest.dim === "listening" ? "Readback" : "BLUF", why: "Transfer the skill into a higher-pressure meeting." },
    ],
    managerPractice: "In your next real meeting, pause before summarising and say: \"Let me check I have the ask right: the decision is..., the constraint is..., and the next move is...\"",
    coachNote: "Local progress coach used. Configure the Netlify AI environment variables for model-backed feedback.",
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
  const views = { home: renderHome, practice: renderPractice, runs: renderRuns, frameworks: renderFrameworks, coach: renderCoach, plan: renderPlan, settings: renderSettings };
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
  const dims = dimensionAverages();
  const weakest = dims.find((item) => item.dim === plan.weakest) || dims[0] || { dim: "listening", avg: 0 };
  const recentReport = state.progressCoach?.report;
  return `<section class="page">
    <section class="executive-desk">
      <div class="desk-primary">
        <p class="eyebrow">Meeting replay studio</p>
        <h1>Practise the moment where a messy meeting becomes a useful brief.</h1>
        <p>Short reps for engineering managers: identify the real ask, separate signal from theatre, and replay upward with a recommendation your manager can act on.</p>
        <div class="desk-actions">
          <button class="button" data-start-scenario="${h(plan.scenario.id)}" data-framework="${h(plan.framework.id)}">Start next rep</button>
          <button class="button button-quiet" data-route="coach">Open coach readout</button>
        </div>
      </div>
      <aside class="briefing-board" aria-label="Today briefing">
        <div class="briefing-head">
          <div><span>Today</span><strong>${h(dimensionName(plan.weakest))}</strong></div>
          <span class="level-token">L${plan.scenario.level}</span>
        </div>
        <div class="briefing-line"><span>Ask</span><p>${h(plan.scenario.ask)}</p></div>
        <div class="briefing-line"><span>Signal</span><p>${h(plan.scenario.focus)}</p></div>
        <div class="briefing-line"><span>Replay rail</span><p>${h(plan.framework.name)}: ${h(plan.framework.moves.slice(0, 4).join(" / "))}</p></div>
        <div class="briefing-foot">
          <span>${avg ? `${avg.toFixed(1)} avg` : "baseline needed"}</span>
          <span>${weakest.avg ? `${weakest.avg.toFixed(1)} ${h(plan.weakest)}` : "no trend yet"}</span>
        </div>
      </aside>
    </section>
    <div class="home-grid">
      <section class="practice-queue">
        <div class="queue-topline">
          <span class="tag">${h(plan.scenario.setting)}</span>
          <span class="tag neutral">${h(plan.framework.name)}</span>
          <span class="tag amber">${h(dimensionName(plan.weakest))}</span>
        </div>
        <h2>${h(plan.scenario.title)}</h2>
        <p>${h(plan.note)} The rep takes about six minutes: read the tape, capture the ask, then write the replay you would use with leadership.</p>
        <div class="queue-steps">
          <article><span>01</span><strong>Hear</strong><p>Find the request behind the discussion.</p></article>
          <article><span>02</span><strong>Distil</strong><p>Keep only the points that change the decision.</p></article>
          <article><span>03</span><strong>Replay</strong><p>Say the consequence, recommendation and owner.</p></article>
        </div>
        <div class="queue-actions">
          <button class="button" data-start-scenario="${h(plan.scenario.id)}" data-framework="${h(plan.framework.id)}">Start planned rep</button>
          <button class="button button-quiet" data-route="plan">View ladder</button>
          <button class="button button-quiet" data-route="frameworks">Choose framework</button>
        </div>
      </section>
      <aside class="metric-stack">
        <section class="metric-panel"><h3>This week</h3><div class="ring-row"><div class="progress-ring" style="--value:${Math.min(100, Math.round(week / Math.max(1, target) * 100))}" data-label="${week}/${target}"></div><p>${week >= target ? "Weekly target met. Keep quality high." : `${target - week} more reps to hit the rhythm.`}</p></div></section>
        <section class="metric-panel"><h3>Average run</h3><strong>${avg ? avg.toFixed(1) : "0.0"}</strong><p>Overall score across listening, signal, structure and upward replay.</p></section>
        <section class="metric-panel"><h3>Streak</h3><strong>${streakDays()}</strong><p>Days with at least one completed practice run.</p></section>
      </aside>
    </div>
    <section class="coach-teaser">
      <div><p class="eyebrow">${recentReport?.mode === "ai" ? "AI readout" : "Progress coach"}</p><h2>${h(recentReport?.headline || "Let the coach read the pattern.")}</h2><p>${h(recentReport?.summary || "After a few scored reps, Il Mister can analyse your history and suggest the next three drills.")}</p></div>
      <button class="button button-coral" data-route="coach">Open coach</button>
    </section>
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
        <div class="next-drill-box ai-drill-box">
          <span class="tag yellow">AI coach</span>
          <strong>Read the trend</strong>
          <p>Ask the progress coach to inspect your scored runs and suggest the next training loop.</p>
          <button class="button button-coral button-small" data-route="coach">Open coach</button>
        </div>
      </aside>
      <section class="run-list-panel">
        <div class="section-title"><h2>Recent runs</h2><p>${state.runs.length} runs, ${avg ? avg.toFixed(1) : "0.0"} average</p></div>
        ${runs.length ? `<div class="run-grid compact">${runs.map(runCard).join("")}</div>` : `<div class="empty-state"><h2>No runs yet.</h2><p>Start one rep and the monitor will begin showing trends.</p><button class="button" data-route="practice">Start practice</button></div>`}
      </section>
    </div>
  </section>`;
}

function renderCoach() {
  const payload = progressPayload();
  const report = state.progressCoach?.report;
  const plan = derivePlan();
  const dims = payload.dimensions || [];
  return `<section class="page">
    ${pageHead("AI progress coach", "Turn practice history into a sharper next rep.", "The coach reads your scored runs, looks for patterns across listening, signal, structure and upward replay, then gives a focused training prescription.")}
    <div class="coach-lab-grid">
      <section class="coach-command-panel">
        <p class="eyebrow">Progress readout</p>
        <h2>${payload.totals.totalRuns ? `${payload.totals.totalRuns} scored run${payload.totals.totalRuns === 1 ? "" : "s"}` : "No scored runs yet"}</h2>
        <p>${payload.totals.totalRuns ? `Average ${payload.totals.averageScore.toFixed(1)}. This week ${payload.totals.weeklyRuns}/${payload.totals.targetRuns}. Streak ${payload.totals.streakDays}.` : "Run a quick baseline first, then ask the coach for a pattern read."}</p>
        <div class="coach-readout-grid">
          ${dims.map((item) => `<div><small>${h(item.name)}</small><strong>${item.avg ? item.avg.toFixed(1) : "-"}</strong><span style="width:${Math.min(100, (item.avg || 0) * 20)}%"></span></div>`).join("")}
        </div>
        <div class="coach-command-actions">
          <button class="button" data-analyse-progress ${progressCoachLoading ? "disabled" : ""}>${progressCoachLoading ? "Analysing..." : "Analyse progress with AI"}</button>
          <button class="button button-quiet" data-start-scenario="${h(plan.scenario.id)}" data-framework="${h(plan.framework.id)}">Start recommended rep</button>
        </div>
        <p class="coach-fineprint">The direct Netlify app sends only recent scored-run summaries to the coach endpoint. Your full local backup stays in this browser.</p>
      </section>
      <section class="coach-report-panel">
        ${progressReportHtml(report)}
      </section>
    </div>
    <section class="coach-evidence-panel">
      <div class="section-title"><h2>Evidence the coach reads</h2><p>Recent scored runs, trimmed to the replay and next drill.</p></div>
      ${payload.recentRuns.length ? `<div class="evidence-list">${payload.recentRuns.slice().reverse().map((run) => `<article><span>${h(run.frameworkName)} / ${h(run.overall)}/5</span><strong>${h(run.scenarioTitle)}</strong><p>${h(run.replay || run.summary || "No replay text saved.")}</p></article>`).join("")}</div>` : `<div class="empty-state"><h2>No evidence yet.</h2><p>Score a run on the Practice page and this panel will fill in.</p><button class="button" data-route="practice">Start practice</button></div>`}
    </section>
  </section>`;
}

function progressReportHtml(report) {
  if (!report) {
    const local = localProgressCoach(progressPayload());
    return `<div class="progress-report empty-report">
      <p class="eyebrow">Coach preview</p>
      <h2>${h(local.headline)}</h2>
      <p>${h(local.summary)}</p>
      <button class="button button-coral" data-analyse-progress ${progressCoachLoading ? "disabled" : ""}>${progressCoachLoading ? "Analysing..." : "Generate feedback"}</button>
    </div>`;
  }
  const nextRuns = Array.isArray(report.nextThreeRuns) ? report.nextThreeRuns.slice(0, 3) : [];
  return `<div class="progress-report">
    <div class="report-mode"><span class="tag ${report.mode === "ai" ? "green" : "yellow"}">${h(report.mode === "ai" ? "AI coach" : "Local coach")}</span>${state.progressCoach?.createdAt ? `<small>${h(new Date(state.progressCoach.createdAt).toLocaleString())}</small>` : ""}</div>
    <h2>${h(report.headline || "Progress review")}</h2>
    <p>${h(report.summary || "")}</p>
    ${report.pattern ? `<blockquote>${h(report.pattern)}</blockquote>` : ""}
    <div class="report-columns">
      <section><h3>Keep</h3><ul>${(report.strengths || []).map((item) => `<li>${h(item)}</li>`).join("")}</ul></section>
      <section><h3>Watch</h3><ul>${(report.risks || []).map((item) => `<li>${h(item)}</li>`).join("")}</ul></section>
    </div>
    <section class="next-three"><h3>Next three reps</h3>${nextRuns.map((item, index) => `<article><span>${index + 1}</span><div><strong>${h(item.title || "Focused rep")}</strong><p>${h(item.framework || "Framework")} - ${h(item.why || "Run it with a single constraint.")}</p></div></article>`).join("")}</section>
    ${report.managerPractice ? `<section class="manager-practice"><h3>Try in a real meeting</h3><p>${h(report.managerPractice)}</p></section>` : ""}
    ${report.coachNote ? `<p class="coach-fineprint">${h(report.coachNote)}</p>` : ""}
  </div>`;
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
    ? `Progress is saved locally first and synced to the shared Supabase database used by the newborn tracker.`
    : `Progress is saved locally in this browser. Export a backup when you want to move it to another device.`;
  const accountCopy = cloudEnabled
    ? `Your practice record syncs to <strong>the shared Supabase record</strong>. Existing local runs are pushed up automatically.`
    : `Your practice record is saved on <strong>${h(cloudAccount.userEmail || "this browser")}</strong>.`;
  const syncCopy = cloudEnabled
    ? cloudStatus === "synced" ? "Progress synced to Supabase" : cloudStatus === "syncing" ? "Syncing with Supabase" : cloudStatus === "offline" ? "Saved locally; Supabase retry pending" : "Connecting"
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

function normaliseProgressReport(value, fallback) {
  const item = value && typeof value === "object" && !Array.isArray(value) ? value : fallback;
  const list = (field) => Array.isArray(item[field]) ? item[field].filter((entry) => typeof entry === "string").slice(0, 5) : fallback[field] || [];
  const nextThreeRuns = Array.isArray(item.nextThreeRuns)
    ? item.nextThreeRuns.slice(0, 3).map((run) => ({
        title: trimWords(run?.title || "Focused rep", 16),
        framework: trimWords(run?.framework || "Framework", 10),
        why: trimWords(run?.why || "Run it with a single constraint.", 24),
      }))
    : fallback.nextThreeRuns;
  return {
    mode: item.mode === "ai" ? "ai" : "local",
    headline: trimWords(item.headline || fallback.headline, 22),
    summary: trimWords(item.summary || fallback.summary, 80),
    pattern: trimWords(item.pattern || fallback.pattern || "", 50),
    strengths: list("strengths"),
    risks: list("risks"),
    nextThreeRuns,
    managerPractice: trimWords(item.managerPractice || fallback.managerPractice || "", 55),
    coachNote: trimWords(item.coachNote || fallback.coachNote || "", 45),
  };
}

async function analyseProgress() {
  const payload = progressPayload();
  const fallback = localProgressCoach(payload);
  progressCoachLoading = true;
  render();
  try {
    const response = await fetch("/.netlify/functions/progress-coach", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Progress coach unavailable");
    state.progressCoach = {
      createdAt: new Date().toISOString(),
      report: normaliseProgressReport(result, fallback),
    };
    saveState();
    showToast(state.progressCoach.report.mode === "ai" ? "AI progress feedback ready." : "Progress feedback ready.");
  } catch {
    state.progressCoach = {
      createdAt: new Date().toISOString(),
      report: normaliseProgressReport(fallback, fallback),
    };
    saveState();
    showToast("Progress feedback ready.");
  } finally {
    progressCoachLoading = false;
    render();
  }
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
  if (event.target.closest("[data-analyse-progress]")) {
    analyseProgress();
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

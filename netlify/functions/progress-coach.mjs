const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

function json(statusCode, body) {
  return { statusCode, headers: JSON_HEADERS, body: JSON.stringify(body) };
}

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function trimWords(value, limit = 70) {
  const words = String(value || "").trim().split(/\s+/).filter(Boolean);
  return words.length > limit ? `${words.slice(0, limit).join(" ")}...` : words.join(" ");
}

function finiteNumber(value, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function validatePayload(value) {
  if (!isRecord(value) || !isRecord(value.totals) || !Array.isArray(value.dimensions) || !Array.isArray(value.recentRuns)) return null;
  const dimensions = value.dimensions.slice(0, 4).map((item) => ({
    dim: trimWords(item?.dim, 3),
    name: trimWords(item?.name, 5),
    avg: finiteNumber(item?.avg),
  }));
  const recentRuns = value.recentRuns.slice(-10).map((run) => ({
    scenarioTitle: trimWords(run?.scenarioTitle, 18),
    frameworkName: trimWords(run?.frameworkName, 8),
    overall: finiteNumber(run?.overall),
    scores: isRecord(run?.scores) ? run.scores : {},
    replay: trimWords(run?.replay, 70),
    summary: trimWords(run?.summary, 45),
    nextDrill: trimWords(run?.nextDrill, 32),
  }));
  return {
    generatedAt: trimWords(value.generatedAt, 8),
    totals: {
      totalRuns: finiteNumber(value.totals.totalRuns),
      weeklyRuns: finiteNumber(value.totals.weeklyRuns),
      targetRuns: finiteNumber(value.totals.targetRuns, 4),
      streakDays: finiteNumber(value.totals.streakDays),
      averageScore: finiteNumber(value.totals.averageScore),
      lastThreeAverage: finiteNumber(value.totals.lastThreeAverage),
      previousThreeAverage: finiteNumber(value.totals.previousThreeAverage),
    },
    dimensions,
    nextPlan: isRecord(value.nextPlan) ? {
      weakest: trimWords(value.nextPlan.weakest, 4),
      frameworkName: trimWords(value.nextPlan.frameworkName, 8),
      scenarioTitle: trimWords(value.nextPlan.scenarioTitle, 18),
      note: trimWords(value.nextPlan.note, 28),
    } : {},
    recentRuns,
  };
}

function localProgressCoach(payload) {
  const dims = [...(payload.dimensions || [])].sort((a, b) => (a.avg || 0) - (b.avg || 0));
  const weakest = dims[0] || { dim: "listening", name: "Listening", avg: 0 };
  const strongest = [...dims].sort((a, b) => (b.avg || 0) - (a.avg || 0))[0] || { name: "Signal", avg: 0 };
  const totalRuns = payload.totals?.totalRuns || 0;
  const trend = (payload.totals?.lastThreeAverage || 0) - (payload.totals?.previousThreeAverage || 0);
  const plan = payload.nextPlan || {};
  if (!totalRuns) {
    return {
      mode: "local",
      headline: "Build a three-run baseline first.",
      summary: "There is not enough scored history for a real trend yet. Start with three short runs, then ask for another readout.",
      pattern: "No practice history yet.",
      strengths: ["You have a clean practice loop ready.", "The first useful target is consistency."],
      risks: ["Do not tune the system before there is evidence.", "Avoid changing every variable after one attempt."],
      nextThreeRuns: [
        { title: "The roadmap squeeze", framework: "Readback", why: "Create a listening baseline." },
        { title: "The incident review that is not really over", framework: "SBAR", why: "Separate fact, risk and recommendation." },
        { title: "The skip-level signal", framework: "BLUF", why: "Practise sensitive manage-up replay." },
      ],
      managerPractice: "After the next run, write one sentence that starts: \"The decision I think you need is...\"",
      coachNote: "AI provider is not configured, so this fallback coach handled the review.",
    };
  }
  return {
    mode: "local",
    headline: `${weakest.name} is the next useful constraint.`,
    summary: `You have ${totalRuns} scored run${totalRuns === 1 ? "" : "s"}. Your strongest area is ${strongest.name.toLowerCase()}, and the next gain is ${weakest.name.toLowerCase()}.`,
    pattern: trend > 0.25 ? "Recent scores are moving up." : trend < -0.25 ? "Recent scores dipped; simplify the next rep." : "Recent scores are broadly flat; change the constraint rather than adding volume.",
    strengths: [`${strongest.name} is currently your best-scored dimension.`, "There is enough signal to choose a focused next rep."],
    risks: [`${weakest.name} may be limiting the quality of your upward replay.`, "Trying to improve every dimension at once will blur the feedback."],
    nextThreeRuns: [
      { title: plan.scenarioTitle || "Focused rep", framework: plan.frameworkName || "BLUF", why: `Target ${weakest.name.toLowerCase()} with one clean rep.` },
      { title: plan.scenarioTitle || "Focused rep", framework: plan.frameworkName || "BLUF", why: "Repeat it and cut the replay by 25 percent." },
      { title: "The ambiguous exec ask", framework: weakest.dim === "listening" ? "Readback" : "BLUF", why: "Transfer the skill into higher pressure." },
    ],
    managerPractice: "In the next real meeting, check the ask aloud before summarising the answer.",
    coachNote: "AI provider is not configured, so this fallback coach handled the review.",
  };
}

function extractJson(content) {
  if (isRecord(content)) return content;
  if (typeof content !== "string") throw new Error("Model content missing");
  return JSON.parse(content.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, ""));
}

function normaliseAiReport(value, fallback) {
  if (!isRecord(value)) return fallback;
  const list = (field) => Array.isArray(value[field]) ? value[field].filter((item) => typeof item === "string").slice(0, 5).map((item) => trimWords(item, 28)) : fallback[field];
  return {
    mode: "ai",
    headline: trimWords(value.headline || fallback.headline, 22),
    summary: trimWords(value.summary || fallback.summary, 80),
    pattern: trimWords(value.pattern || fallback.pattern, 50),
    strengths: list("strengths"),
    risks: list("risks"),
    nextThreeRuns: Array.isArray(value.nextThreeRuns)
      ? value.nextThreeRuns.slice(0, 3).map((run) => ({
          title: trimWords(run?.title || "Focused rep", 16),
          framework: trimWords(run?.framework || "Framework", 10),
          why: trimWords(run?.why || "Run it with one constraint.", 24),
        }))
      : fallback.nextThreeRuns,
    managerPractice: trimWords(value.managerPractice || fallback.managerPractice, 55),
    coachNote: trimWords(value.coachNote || "Model-backed progress review.", 36),
  };
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") return json(204, {});
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });
  if (!event.body || event.body.length > 120_000) return json(413, { error: "Request too large" });

  let payload;
  try {
    payload = validatePayload(JSON.parse(event.body));
  } catch {
    return json(400, { error: "Invalid JSON" });
  }
  if (!payload) return json(400, { error: "Invalid progress payload" });

  const fallback = localProgressCoach(payload);
  const apiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY;
  const model = process.env.AI_MODEL || process.env.OPENAI_MODEL;
  const apiUrl = process.env.AI_API_URL || "https://api.openai.com/v1/chat/completions";
  if (!apiKey || !model) return json(200, fallback);

  const system = [
    "You are Il Mister, a demanding but encouraging coach for engineering managers.",
    "Analyse practice progress, not personality. Use concise British English.",
    "The learner is training listening, signal selection, structure and upward replay.",
    "Do not invent meetings or facts beyond the provided scored-run summaries.",
    "Return JSON only with: headline, summary, pattern, strengths, risks, nextThreeRuns, managerPractice, coachNote.",
    "nextThreeRuns must be three objects with title, framework and why.",
  ].join(" ");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 22_000);
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({
        model,
        temperature: 0.25,
        max_tokens: 900,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: JSON.stringify({ progress: payload }) },
        ],
      }),
      signal: controller.signal,
    });
    const providerText = await response.text();
    if (!response.ok) return json(200, { ...fallback, coachNote: `AI provider returned ${response.status}; fallback coach used.` });
    const providerBody = JSON.parse(providerText);
    const content = providerBody?.choices?.[0]?.message?.content ?? providerBody?.output?.[0]?.content?.[0]?.text;
    return json(200, normaliseAiReport(extractJson(content), fallback));
  } catch (error) {
    const timedOut = error instanceof DOMException && error.name === "AbortError";
    return json(200, { ...fallback, coachNote: timedOut ? "AI provider timed out; fallback coach used." : "AI provider unavailable; fallback coach used." });
  } finally {
    clearTimeout(timeout);
  }
}

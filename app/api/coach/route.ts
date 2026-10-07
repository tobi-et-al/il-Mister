import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../chatgpt-auth";

export const dynamic = "force-dynamic";

type CoachDraft = {
  scenarioId: string;
  scenarioTitle: string;
  frameworkId: string;
  frameworkName: string;
  difficulty: number;
  transcript: string;
  ask: string;
  signals: string;
  summary: string;
  replay: string;
  action: string;
  mustCatch: string[];
};

type CoachScore = {
  listening: number;
  signal: number;
  structure: number;
  upward: number;
};

function isString(value: unknown, min = 1, max = 4_000): value is string {
  return typeof value === "string" && value.trim().length >= min && value.length <= max;
}

function validDraft(value: unknown): value is CoachDraft {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const draft = value as Partial<CoachDraft>;
  return isString(draft.scenarioId, 2, 80) &&
    isString(draft.scenarioTitle, 2, 160) &&
    isString(draft.frameworkId, 2, 80) &&
    isString(draft.frameworkName, 2, 120) &&
    Number.isInteger(draft.difficulty) &&
    draft.difficulty >= 1 &&
    draft.difficulty <= 5 &&
    isString(draft.transcript, 40, 12_000) &&
    isString(draft.ask, 2, 1_200) &&
    isString(draft.signals, 2, 1_800) &&
    isString(draft.summary, 10, 1_800) &&
    isString(draft.replay, 10, 1_800) &&
    isString(draft.action, 2, 1_200) &&
    Array.isArray(draft.mustCatch) &&
    draft.mustCatch.every((item) => typeof item === "string" && item.length <= 120);
}

function clampScore(value: number): number {
  return Math.max(1, Math.min(5, Math.round(value)));
}

function countHits(text: string, needles: string[]): number {
  const haystack = text.toLowerCase();
  return needles.filter((needle) => haystack.includes(needle.toLowerCase().split(" ")[0])).length;
}

function localCoach(draft: CoachDraft) {
  const combined = `${draft.ask} ${draft.signals} ${draft.summary} ${draft.replay} ${draft.action}`.toLowerCase();
  const fieldCount = [draft.ask, draft.signals, draft.summary, draft.replay, draft.action].filter((value) => value.trim().split(/\s+/).length >= 8).length;
  const catchHits = countHits(combined, draft.mustCatch);
  const decisionWords = ["decision", "recommend", "risk", "trade", "owner", "next", "ask", "option", "by", "because"];
  const upwardHits = decisionWords.filter((word) => combined.includes(word)).length;
  const summaryWords = draft.summary.trim().split(/\s+/).length;

  const scores: CoachScore = {
    listening: clampScore(2 + catchHits / Math.max(1, draft.mustCatch.length) * 3),
    signal: clampScore(1 + Math.min(4, catchHits)),
    structure: clampScore(1 + fieldCount),
    upward: clampScore(1 + upwardHits / 2 + (summaryWords <= 90 ? 1 : 0)),
  };
  const overall = Math.round((scores.listening + scores.signal + scores.structure + scores.upward) / 4);
  const missing = draft.mustCatch.filter((item) => !combined.includes(item.toLowerCase().split(" ")[0])).slice(0, 4);
  const headline = overall >= 4
    ? "Strong replay. You are close to exec-ready."
    : overall >= 3
      ? "Good raw capture. Tighten the decision shape."
      : "Useful start. Pull the ask and constraints further forward.";

  return {
    mode: "local",
    headline,
    scores,
    strengths: [
      fieldCount >= 4 ? "You separated the ask, signal and next action." : "You captured enough raw material to improve the replay.",
      summaryWords <= 90 ? "Your summary is short enough to be usable in a real upward update." : "You have the material; now compress it for senior attention.",
    ],
    risks: missing.length
      ? missing.map((item) => `Possible missed signal: ${item}.`)
      : ["No obvious must-catch signal was missed. Now improve sharpness and trade-offs."],
    rewrite: `BLUF: ${draft.summary.trim()}\nAsk: ${draft.ask.trim()}\nSo what: ${draft.signals.trim()}\nNext move: ${draft.action.trim()}`,
    nextDrill: missing[0]
      ? `Replay the scenario once more and make "${missing[0]}" impossible to miss.`
      : `Run a harder ${draft.frameworkName} rep and cut your replay by 25 percent.`,
    coachNote: "Local scoring is active. Configure the AI coach endpoint for richer critique and calibrated examples.",
  };
}

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Sign in required" }, { status: 401 });

  let draft: CoachDraft;
  try {
    const raw = await request.json();
    if (!validDraft(raw)) return Response.json({ error: "Invalid practice run" }, { status: 400 });
    draft = raw;
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const functionUrl = env.COACH_FUNCTION_URL;
  const proxySecret = env.COACH_PROXY_SECRET;
  if (!functionUrl || !proxySecret) return Response.json(localCoach(draft), { headers: { "cache-control": "no-store" } });

  const userToken = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`il-mister:${user.userId}`));
  const anonymousUser = Array.from(new Uint8Array(userToken).slice(0, 12), (byte) => byte.toString(16).padStart(2, "0")).join("");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);

  try {
    const response = await fetch(functionUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-coach-secret": proxySecret,
        "x-coach-user": anonymousUser,
      },
      body: JSON.stringify(draft),
      signal: controller.signal,
    });
    const text = await response.text();
    let payload: unknown;
    try { payload = JSON.parse(text); } catch { payload = { error: "The coach returned an unreadable response" }; }
    return Response.json(payload, { status: response.status, headers: { "cache-control": "no-store" } });
  } catch (error) {
    const timedOut = error instanceof DOMException && error.name === "AbortError";
    return Response.json({
      ...localCoach(draft),
      coachNote: timedOut ? "The AI coach took too long, so local scoring handled this run." : "The AI coach is unavailable, so local scoring handled this run.",
    }, { status: 200, headers: { "cache-control": "no-store" } });
  } finally {
    clearTimeout(timeout);
  }
}

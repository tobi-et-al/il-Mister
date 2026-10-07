import { getChatGPTUser } from "../../chatgpt-auth";
import { createPracticeState, getPracticeState, updatePracticeState } from "../../../db/practice-state";

export const dynamic = "force-dynamic";
const MAX_STATE_BYTES = 750_000;

function validState(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const item = value as Record<string, unknown>;
  return item.version === 1 &&
    Array.isArray(item.runs) &&
    typeof item.drafts === "object" &&
    typeof item.settings === "object";
}

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Sign in required" }, { status: 401 });
  try {
    return Response.json({ record: await getPracticeState(user.userId), account: { email: user.email, name: user.displayName } });
  } catch {
    return Response.json({ error: "Cloud progress is temporarily unavailable" }, { status: 503 });
  }
}

export async function PUT(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Sign in required" }, { status: 401 });
  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_STATE_BYTES) return Response.json({ error: "Learning record is too large" }, { status: 413 });
  let payload: { state?: unknown; baseRevision?: unknown };
  try { payload = JSON.parse(raw); } catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }
  if (!validState(payload.state)) return Response.json({ error: "Invalid practice record" }, { status: 400 });
  try {
    const current = await getPracticeState(user.userId);
    if (!current) {
      const created = await createPracticeState(user.userId, payload.state);
      if (created) return Response.json({ record: created }, { status: 201 });
      return Response.json({ error: "Revision conflict", record: await getPracticeState(user.userId) }, { status: 409 });
    }
    if (!Number.isInteger(payload.baseRevision) || payload.baseRevision !== current.revision) {
      return Response.json({ error: "Revision conflict", record: current }, { status: 409 });
    }
    const updated = await updatePracticeState(user.userId, payload.state, current.revision);
    if (!updated) return Response.json({ error: "Revision conflict", record: await getPracticeState(user.userId) }, { status: 409 });
    return Response.json({ record: updated });
  } catch {
    return Response.json({ error: "Cloud progress is temporarily unavailable" }, { status: 503 });
  }
}

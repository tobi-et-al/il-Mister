import { env } from "cloudflare:workers";

export type StoredPracticeState = { state: Record<string, unknown>; revision: number; updatedAt: string };

function binding(): D1Database {
  if (!env.DB) throw new Error("Practice storage is unavailable");
  return env.DB;
}

export async function getPracticeState(userId: string): Promise<StoredPracticeState | null> {
  const row = await binding().prepare("SELECT state_json, revision, updated_at FROM practice_states WHERE user_id = ?")
    .bind(userId).first<{ state_json: string; revision: number; updated_at: string }>();
  if (!row) return null;
  return { state: JSON.parse(row.state_json), revision: row.revision, updatedAt: row.updated_at };
}

export async function createPracticeState(userId: string, state: Record<string, unknown>): Promise<StoredPracticeState | null> {
  const updatedAt = new Date().toISOString();
  const result = await binding().prepare("INSERT OR IGNORE INTO practice_states (user_id, state_json, revision, updated_at) VALUES (?, ?, 1, ?)")
    .bind(userId, JSON.stringify(state), updatedAt).run();
  if (!result.meta.changes) return null;
  return { state, revision: 1, updatedAt };
}

export async function updatePracticeState(userId: string, state: Record<string, unknown>, baseRevision: number): Promise<StoredPracticeState | null> {
  const revision = baseRevision + 1;
  const updatedAt = new Date().toISOString();
  const result = await binding().prepare("UPDATE practice_states SET state_json = ?, revision = ?, updated_at = ? WHERE user_id = ? AND revision = ?")
    .bind(JSON.stringify(state), revision, updatedAt, userId, baseRevision).run();
  if (!result.meta.changes) return null;
  return { state, revision, updatedAt };
}

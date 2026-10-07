# Il Mister

Il Mister is a private practice app for engineering managers who want to improve meeting listening, summarising and manage-up replay.

The app uses realistic meeting tapes, cross-industry communication frameworks and a run monitor that turns repeated practice into a training plan.

## What it does

- Progressive practice scenarios from low-ambiguity product syncs to high-compression board prep.
- Frameworks borrowed from healthcare handover, aviation readback, military BLUF, consulting pyramids, incident command, newsroom editing, crew resource management and negotiation.
- A desktop-focused cockpit with scenario setup, beat-by-beat tape reveal, capture fields, live checks and coach feedback.
- Local-first progress with private D1 sync through the `DB` binding.
- Local coach scoring by default, plus an optional AI coach proxy endpoint.

## Data

Progress is stored in the `practice_states` table:

```sql
CREATE TABLE IF NOT EXISTS practice_states (
  user_id text PRIMARY KEY NOT NULL,
  state_json text NOT NULL,
  revision integer DEFAULT 1 NOT NULL,
  updated_at text NOT NULL
);
```

The app follows the same D1-backed setup style as the referenced tracker: `.openai/hosting.json` declares the `DB` binding, and the app stores one JSON practice record per signed-in user.

## Local commands

```bash
npm run install:ci
npm run dev
npm run build
npm run start
```

## Optional AI coach

The app works without AI configuration. To use the richer coach, deploy `supabase/functions/il-mister-coach` or an equivalent endpoint, then configure the Site runtime variables:

- `COACH_FUNCTION_URL`
- `COACH_PROXY_SECRET`

The external coach endpoint should call the model provider using its own `AI_API_URL`, `AI_API_KEY` and `AI_MODEL` secrets.

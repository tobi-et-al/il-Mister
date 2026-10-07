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
pnpm install
pnpm dev
pnpm build
pnpm start
```

## Deployment

Netlify hosts the direct app from `public/`, the same style as the newborn tracker: a static `index.html` plus browser-side `app.js`/`style.css`. That direct version saves locally in the browser and uses export/import for portability.

Deploys are triggered with:

```bash
pnpm deploy:netlify
```

Set `NETLIFY_BUILD_HOOK_URL` in `.env.local` or in the deployment environment. The hook URL is intentionally kept out of source control.

## Optional AI progress coach

The direct Netlify app includes `/.netlify/functions/progress-coach`. It analyses recent scored runs and returns a training prescription. Without provider secrets it returns a deterministic local coach response; with these Netlify environment variables it uses an OpenAI-compatible chat completions endpoint:

- `AI_API_KEY` or `OPENAI_API_KEY`
- `AI_MODEL` or `OPENAI_MODEL`
- `AI_API_URL` optional, defaults to `https://api.openai.com/v1/chat/completions`

## Optional AI coach

The app works without AI configuration. To use the richer coach, deploy `supabase/functions/il-mister-coach` or an equivalent endpoint, then configure the Site runtime variables:

- `COACH_FUNCTION_URL`
- `COACH_PROXY_SECRET`

The external coach endpoint should call the model provider using its own `AI_API_URL`, `AI_API_KEY` and `AI_MODEL` secrets.

-- Run this once in the same Supabase SQL editor used by the newborn tracker.
create table if not exists public.il_mister_shared_state (
  id text primary key,
  data jsonb not null default '{
    "version": 1,
    "runs": [],
    "drafts": {},
    "deletedRuns": {},
    "activityDates": [],
    "progressCoach": null,
    "settings": {
      "targetRuns": 4,
      "lastScenarioId": "roadmap-cut",
      "lastFrameworkId": "bluf"
    }
  }'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.il_mister_shared_state enable row level security;

drop policy if exists "il mister can read shared state" on public.il_mister_shared_state;
drop policy if exists "il mister can create shared state" on public.il_mister_shared_state;
drop policy if exists "il mister can update shared state" on public.il_mister_shared_state;

create policy "il mister can read shared state"
  on public.il_mister_shared_state for select to anon using (true);

create policy "il mister can create shared state"
  on public.il_mister_shared_state for insert to anon with check (id = 'default');

create policy "il mister can update shared state"
  on public.il_mister_shared_state for update to anon using (id = 'default') with check (id = 'default');

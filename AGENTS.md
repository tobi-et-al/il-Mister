# Project Notes

- Use Netlify as the default deploy target for this repo.
- After committing and pushing app changes, trigger deployment with `pnpm deploy:netlify`.
- Keep the real `NETLIFY_BUILD_HOOK_URL` in local or CI environment only. Do not commit `.env.local` or the hook URL.

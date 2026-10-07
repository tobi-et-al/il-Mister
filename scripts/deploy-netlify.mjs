#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadLocalEnv() {
  try {
    const envPath = resolve(process.cwd(), ".env.local");
    const contents = readFileSync(envPath, "utf8");
    for (const line of contents.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (!match) continue;
      const [, key, rawValue] = match;
      if (process.env[key]) continue;
      process.env[key] = rawValue.replace(/^['"]|['"]$/g, "");
    }
  } catch {
    // Local env is optional; CI can provide NETLIFY_BUILD_HOOK_URL directly.
  }
}

function maskUrl(value) {
  return value.replace(/(build_hooks\/).+$/i, "$1...");
}

loadLocalEnv();

const hookUrl = process.env.NETLIFY_BUILD_HOOK_URL;

if (!hookUrl) {
  console.error("NETLIFY_BUILD_HOOK_URL is not set.");
  process.exit(1);
}

if (!/^https:\/\/api\.netlify\.com\/build_hooks\/[A-Za-z0-9_-]+$/.test(hookUrl)) {
  console.error("NETLIFY_BUILD_HOOK_URL must be a Netlify build hook URL.");
  process.exit(1);
}

const response = await fetch(hookUrl, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ trigger_title: "Codex deploy" }),
});

if (!response.ok) {
  const detail = await response.text().catch(() => "");
  console.error(`Netlify hook failed (${response.status}). ${detail}`.trim());
  process.exit(1);
}

console.log(`Netlify build hook triggered: ${maskUrl(hookUrl)}`);

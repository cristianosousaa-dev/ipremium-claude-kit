/**
 * Secret scan of every tracked file, run in CI on each push.
 *
 * The repository is private on GitHub's free plan, so GitHub's own secret
 * scanning and push protection are not available; this is the check instead.
 * It looks for the credential formats this project uses (Stripe, Supabase,
 * Anthropic, Groq, Resend, GitHub, AWS, Google, Sentry, private keys, database
 * URLs with a password) and decodes every JWT it finds, failing on one whose
 * role is service_role. Matches are printed masked: the log must not become
 * the leak. The full git history was scanned the same way on 2026-10-25: clean.
 *
 * Usage: node scripts/scan-secrets.mjs  (exits 1 when it finds something)
 */
/* global process, console, Buffer -- Node script, not app code; ESLint 9 dropped eslint-env */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const PATTERNS = [
  ["Stripe secret key", /\b[sr]k_(live|test)_[0-9A-Za-z]{10,}/],
  ["Stripe webhook secret", /\bwhsec_[0-9A-Za-z]{10,}/],
  ["Supabase secret key", /\bsb_secret_[0-9A-Za-z_-]{10,}/],
  ["Anthropic key", /\bsk-ant-[0-9A-Za-z_-]{20,}/],
  ["Groq key", /\bgsk_[0-9A-Za-z]{20,}/],
  ["Resend key", /\bre_[0-9A-Za-z]{8}_[0-9A-Za-z]{10,}/],
  ["GitHub token", /\b(ghp|gho|ghs|ghu)_[0-9A-Za-z]{30,}|\bgithub_pat_[0-9A-Za-z_]{30,}/],
  ["AWS access key", /\bAKIA[0-9A-Z]{16}\b/],
  ["Google API key", /\bAIza[0-9A-Za-z_-]{35}\b/],
  ["Sentry auth token", /\bsntrys_[0-9A-Za-z_=-]{20,}/],
  ["Private key", /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ["Database URL with password", /postgres(ql)?:\/\/[^:/\s]+:[^@\s]{6,}@/]
];
const JWT = /eyJ[0-9A-Za-z_-]{10,}\.eyJ[0-9A-Za-z_-]{10,}\.[0-9A-Za-z_-]*/g;
// Binary or generated files that cannot hold a hand-written secret.
const SKIP = /\.(png|jpe?g|gif|webp|ico|svg|woff2?|ttf|mp4|webm|pdf|lock)$|^package-lock\.json$/;

const files = execFileSync("git", ["ls-files"], { encoding: "utf8" }).split("\n").filter((f) => f && !SKIP.test(f));
const mask = (s) => `${s.slice(0, 8)}…(${s.length} chars)`;
const found = [];

for (const file of files) {
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    continue; // deleted in the working tree, or not readable as text
  }
  text.split("\n").forEach((line, i) => {
    for (const [what, re] of PATTERNS) {
      const m = line.match(re);
      if (m) found.push(`${file}:${i + 1}  ${what}  ${mask(m[0])}`);
    }
    for (const token of line.match(JWT) ?? []) {
      try {
        const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString());
        if (payload.role === "service_role") found.push(`${file}:${i + 1}  Supabase service_role JWT  ${mask(token)}`);
      } catch {
        // not a JWT after all
      }
    }
  });
}

if (found.length) {
  console.error(`Secret scan: ${found.length} possible secret(s) in tracked files:\n  ${found.join("\n  ")}`);
  console.error("Remove it, rotate it (it is in the history now), and keep it in Vercel/Supabase secrets.");
  process.exit(1);
}
console.log(`Secret scan: ${files.length} tracked files, nothing found.`);

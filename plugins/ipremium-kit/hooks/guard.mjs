#!/usr/bin/env node
// PreToolUse hook (Bash): blocks the few commands that cannot be undone.
// Claude Code sends the tool call as JSON on stdin; exit 2 blocks it and
// feeds stderr back to the model. Anything else passes.
import { readFileSync } from "node:fs";

const BLOCK = [
  [/\bgit\s+push\b.*(--force\b|--force-with-lease\b|\s-f\b)/, "force push rewrites shared history"],
  [/\bgit\s+reset\s+--hard\b/, "reset --hard discards work"],
  [/\bgit\b.*--no-verify\b/, "do not skip hooks"],
  [/\brm\s+-[a-z]*r[a-z]*f|\brm\s+-[a-z]*f[a-z]*r/i, "recursive force delete"],
  [/\b(drop|truncate)\s+(table|schema|database)\b/i, "destructive SQL belongs in a reviewed migration"],
  [/\bsupabase\s+db\s+(reset|push)\b.*--(linked|db-url)/, "never change the live database from the shell"],
];

let command = "";
try {
  command = JSON.parse(readFileSync(0, "utf8"))?.tool_input?.command ?? "";
} catch {
  process.exit(0); // not our payload: do not block
}

for (const [re, why] of BLOCK) {
  if (re.test(command)) {
    console.error(`Blocked: ${why}. Ask the user to run it themselves if it is really intended.`);
    process.exit(2);
  }
}

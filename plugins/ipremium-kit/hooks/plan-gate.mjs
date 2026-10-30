#!/usr/bin/env node
// PreToolUse hook (Write|Edit|MultiEdit|NotebookEdit): no code before the plan is approved.
// Only projects that opt in (the template ships an empty .claude/plan-gate) are gated, and only
// until docs/plan/APPROVED.md exists. docs/, .claude/ and root *.md stay writable so the plan
// itself can be written. This is a guard rail for the agent, not a security boundary
// (a shell redirect would get around it).
import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, relative, resolve } from "node:path";

let payload;
try {
  payload = JSON.parse(readFileSync(0, "utf8"));
} catch {
  process.exit(0); // not our payload: never block on a parse problem
}

const root = process.env.CLAUDE_PROJECT_DIR || payload.cwd || process.cwd();
if (!existsSync(resolve(root, ".claude", "plan-gate"))) process.exit(0);
if (existsSync(resolve(root, "docs", "plan", "APPROVED.md"))) process.exit(0);

const target = payload.tool_input?.file_path ?? payload.tool_input?.notebook_path;
if (!target) process.exit(0);

const abs = isAbsolute(target) ? target : resolve(root, target);
const rel = relative(root, abs).split(String.fromCharCode(92)).join("/");
if (rel.startsWith("..")) process.exit(0); // outside the project

if (/^(docs\/|\.claude\/|[^/]+\.md$)/.test(rel)) process.exit(0);

console.error(
  `Planeamento por aprovar: não se escreve código em "${rel}" antes de existir docs/plan/APPROVED.md. ` +
    "Correr a skill kickoff (perguntas, plano em docs/plan/, revisão, aprovação do utilizador). Não contornar o portão.",
);
process.exit(2);

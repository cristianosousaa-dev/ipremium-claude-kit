#!/usr/bin/env node
// Vendors third-party skills, agents and slash commands into the packs listed in skills.manifest.json.
//   node scripts/vendor.mjs check    clone, report found/missing + licence, change nothing
//   node scripts/vendor.mjs vendor   copy into plugins/ipremium-<pack>/{skills,agents,commands}, write THIRD_PARTY.md + licenses/
// Every repo is pinned to the commit recorded in skills.lock.json (created on first run),
// so an upstream change never reaches the kit without a deliberate `--update`.
// Manifest entry: { "repo": "owner/name", "skills": [...], "agents": [...], "commands": [...] }
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const [mode = "check", ...flags] = process.argv.slice(2);
const UPDATE = flags.includes("--update");
const CACHE = join(tmpdir(), "ipremium-vendor-cache");
const manifest = JSON.parse(readFileSync(join(ROOT, "skills.manifest.json"), "utf8"));
const lockPath = join(ROOT, "skills.lock.json");
const lock = existsSync(lockPath) ? JSON.parse(readFileSync(lockPath, "utf8")) : {};
const git = (cwd, ...args) => execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
const NL = String.fromCharCode(10);

function clone(repo) {
  const dir = join(CACHE, repo.replace("/", "__"));
  if (!existsSync(dir)) {
    mkdirSync(CACHE, { recursive: true });
    execFileSync("git", ["clone", "--quiet", "--filter=blob:none", `https://github.com/${repo}.git`, dir], { stdio: "pipe" });
  }
  const pinned = !UPDATE && lock[repo];
  if (pinned) git(dir, "checkout", "--quiet", pinned);
  else git(dir, "checkout", "--quiet", git(dir, "rev-parse", "origin/HEAD"));
  return { dir, sha: git(dir, "rev-parse", "HEAD") };
}

function skillDirs(dir) {
  const found = existsSync(join(dir, "SKILL.md")) ? [dir] : [];
  (function walk(d) {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (!e.isDirectory() || [".git", "node_modules"].includes(e.name)) continue;
      const p = join(d, e.name);
      if (existsSync(join(p, "SKILL.md"))) found.push(p);
      walk(p);
    }
  })(dir);
  return found;
}

const frontName = (p) => /^name:\s*["']?([^"'\n]+)/m.exec(readFileSync(join(p, "SKILL.md"), "utf8").slice(0, 800))?.[1]?.trim();
const licenseOf = (dir) => {
  const f = readdirSync(dir).find((n) => /^(licen[sc]e|copying)/i.test(n));
  if (!f) {
    // Some repos state the licence only in the README ("## License" then "MIT").
    const readme = readdirSync(dir).find((n) => /^readme/i.test(n));
    const m = readme && /##\s*License\s+(MIT|Apache-2\.0|BSD[-\w.]*|ISC)\b/i.exec(readFileSync(join(dir, readme), "utf8"));
    return m ? { file: null, id: `${m[1]} (README)`, text: `Licence declared in the README of this repository: ${m[1]}.${NL}` } : { file: null, id: "NO LICENSE FILE" };
  }
  const head = readFileSync(join(dir, f), "utf8").slice(0, 400);
  const id = /MIT License|Permission is hereby granted, free of charge/i.test(head) ? "MIT" : /Apache License/i.test(head) ? "Apache-2.0" : /BSD/i.test(head) ? "BSD" :
    /Creative Commons/i.test(head) ? "Creative Commons" : /Mozilla/i.test(head) ? "MPL" : /GNU/i.test(head) ? "GPL/LGPL" : "other (read it)";
  return { file: f, id };
};

const newLock = { ...lock };
let missing = 0;
for (const [pack, repos] of Object.entries(manifest.packs)) {
  const target = join(ROOT, "plugins", pack === "core" ? "ipremium-kit" : `ipremium-${pack}`);
  const rows = [];
  for (const { repo, skills = [], agents = [], commands = [] } of repos) {
    const { dir, sha } = clone(repo);
    newLock[repo] = sha;
    const lic = licenseOf(dir);
    const all = skillDirs(dir);
    const kbOf = (p) => Math.round(execFileSync("git", ["-C", dir, "ls-files", relative(dir, p) || "."], { encoding: "utf8" }).split(NL).filter(Boolean)
      .reduce((n, f) => n + statSync(join(dir, f)).size, 0) / 1024);
    for (const name of skills) {
      const hits = all.filter((p) => basename(p) === name || frontName(p) === name).sort((a, b) => a.length - b.length);
      if (!hits.length) { console.log(`MISSING  ${pack}  ${repo}  ${name}`); missing++; continue; }
      console.log(`ok       ${pack}  ${repo}@${sha.slice(0, 7)}  ${name}  ${kbOf(hits[0])}KB  [${lic.id}]`);
      rows.push({ kind: "skill", repo, sha, name, src: hits[0], lic });
    }
    // Agents and slash commands are single markdown files in agents/ and commands/ at the repo root.
    for (const [kind, names] of [["agent", agents], ["command", commands]]) {
      for (const name of names) {
        const src = join(dir, `${kind}s`, `${name}.md`);
        if (!existsSync(src)) { console.log(`MISSING  ${pack}  ${repo}  ${kind}:${name}`); missing++; continue; }
        console.log(`ok       ${pack}  ${repo}@${sha.slice(0, 7)}  ${kind}:${name}  ${Math.round(statSync(src).size / 1024)}KB  [${lic.id}]`);
        rows.push({ kind, repo, sha, name, src, lic });
      }
    }
  }
  if (mode !== "vendor") continue;
  // Prune what a previous run vendored (listed in THIRD_PARTY.md) so removing an item from the manifest removes it here too.
  const prev = join(target, "THIRD_PARTY.md");
  if (existsSync(prev)) {
    for (const m of readFileSync(prev, "utf8").matchAll(/^\| (?:(agent|command):)?([\w.-]+) \| https/gm)) {
      rmSync(m[1] ? join(target, `${m[1]}s`, `${m[2]}.md`) : join(target, "skills", m[2]), { recursive: true, force: true });
    }
  }
  mkdirSync(join(target, "licenses"), { recursive: true });
  const lines = [`# Third-party content in ${basename(target)}`, "", "Vendored copies, pinned to the commit shown. Licences in `licenses/`. Do not edit here: change `skills.manifest.json` and run `node scripts/vendor.mjs vendor`.", "", "| Item | Source | Commit | Licence |", "|---|---|---|---|"];
  for (const r of rows) {
    const dest = r.kind === "skill" ? join(target, "skills", r.name) : join(target, `${r.kind}s`, `${r.name}.md`);
    mkdirSync(dirname(dest), { recursive: true });
    rmSync(dest, { recursive: true, force: true });
    cpSync(r.src, dest, { recursive: true, filter: (s) => !s.includes(`${join("", ".git")}`) });
    // Our own model choice for vendored agents (manifest "agentModels"): reproducible, never hand-edited.
    const wanted = r.kind === "agent" && manifest.agentModels?.[r.name];
    if (wanted) writeFileSync(dest, readFileSync(dest, "utf8").replace(/^model:\s*\S+/m, `model: ${wanted}`));
    const licDest = join(target, "licenses", `${r.repo.replace("/", "__")}.LICENSE`);
    if (r.lic.file) cpSync(join(CACHE, r.repo.replace("/", "__"), r.lic.file), licDest);
    else if (r.lic.text) writeFileSync(licDest, r.lic.text);
    else if (r.kind === "skill" && readdirSync(r.src).some((n) => /^licen[sc]e/i.test(n))) cpSync(join(r.src, readdirSync(r.src).find((n) => /^licen[sc]e/i.test(n))), licDest); // licence shipped inside the skill folder
    else { console.log(`REFUSED  ${r.name}: no licence found, not vendored`); rmSync(dest, { recursive: true, force: true }); continue; }
    lines.push(`| ${r.kind === "skill" ? r.name : r.kind + ":" + r.name} | https://github.com/${r.repo} | ${r.sha.slice(0, 12)} | ${r.lic.id} |`);
  }
  writeFileSync(join(target, "THIRD_PARTY.md"), lines.join(NL) + NL);
}
if (mode === "vendor") writeFileSync(lockPath, JSON.stringify(newLock, null, 2) + NL);
console.log(missing ? `${NL}${missing} missing: fix names in skills.manifest.json` : `${NL}all found`);

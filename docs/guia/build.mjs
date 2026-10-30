#!/usr/bin/env node
// Numbers the pages of guia.template.html and prints it to PDF with headless Chrome.
//   node docs/guia/build.mjs        (CHROME=<path> to choose the browser)
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_HTML = join(HERE, "guia.html");
const OUT_PDF = join(resolve(HERE, "..", ".."), "docs", "iPremium_Metodologia_IA.pdf");

let html = readFileSync(join(HERE, "guia.template.html"), "utf8");
// inline the brand logos (Simple Icons, CC0): no network needed when printing
html = html.replace(/\{\{LOGO:([a-z0-9]+)\}\}/g, (_, slug) => readFileSync(join(HERE, "logos", `${slug}.svg`), "utf8").replace(/<title>[^<]*<\/title>/, "").replace("<svg ", '<svg aria-hidden="true" '));
const parts = html.split('<section class="page');
const total = parts.length - 1;
// the cover carries no number; every other page gets "NN / TT"
html = parts.map((p, i) => (i < 2 ? p : p.replace(/<span class="pg">[^<]*<\/span>/, `<span class="pg">${String(i).padStart(2, "0")} / ${total}</span>`))).join('<section class="page');
// page 2 is the first numbered page: number it too
html = html.replace(/(<!-- 2 RESUMO -->[\s\S]*?)<span class="pg">[^<]*<\/span>/, `$1<span class="pg">02 / ${total}</span>`);
writeFileSync(OUT_HTML, html);
console.log(`html ok: ${total} paginas`);

const CHROMES = [process.env.CHROME, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome"].filter(Boolean);
const chrome = CHROMES.find((c) => existsSync(c));
if (!chrome) { console.log("Chrome nao encontrado: abrir guia.html e imprimir para PDF (A4, sem margens, com graficos de fundo)."); process.exit(0); }
const r = spawnSync(chrome, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=25000", `--print-to-pdf=${OUT_PDF}`, pathToFileURL(OUT_HTML).href], { stdio: "inherit" });
console.log(r.status === 0 ? `pdf ok: ${OUT_PDF}` : `chrome terminou com ${r.status}`);

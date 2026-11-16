// Genera la versión de un solo archivo para publicarla como página en Claude.
// Uso: node tools/build-artifact.mjs [estado.json]  →  dist/maya-artifact.html
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const root = new URL("..", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");

const css = read("css/styles.css");
const app = `${read("js/data.js")}\n${read("js/app.js")}`;
if (/<\/script/i.test(app)) throw new Error("El código contiene «</script>» y rompería la página.");

const statePath = process.argv[2];
const state = statePath ? readFileSync(statePath, "utf8").trim() : "";
if (state) JSON.parse(state);

const html = `<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#5B4BE8"><title>Maya · Entreno</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@500;700;800;900&amp;display=swap"><style id="css">${css}</style></head><body><div id="root"></div><script id="state" type="application/json">${state.replace(/</g, "\\u003c")}</script><script id="app">${app}</script></body></html>`;

mkdirSync(new URL("dist/", root), { recursive: true });
writeFileSync(new URL("dist/maya-artifact.html", root), html);
console.log(`dist/maya-artifact.html · ${(html.length / 1024).toFixed(0)} KB`);

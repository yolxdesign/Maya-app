// Pruebas de extremo a extremo: recorre la app como una persona, en móvil y escritorio.
// Uso: npm test   (necesita Playwright y Chromium instalados)
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium, devices } = require("playwright");
const axeSource = await readFile(require.resolve("axe-core/axe.min.js"), "utf8");

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".webmanifest": "application/manifest+json", ".json": "application/json" };
const server = createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (path.endsWith("/")) path += "index.html";
    const file = normalize(join(ROOT, path));
    if (!file.startsWith(ROOT)) throw new Error("fuera de la raíz");
    const body = await readFile(file);
    res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end();
  }
});
await new Promise((ok) => server.listen(0, ok));
const BASE = `http://localhost:${server.address().port}/`;

let failures = 0;
let passes = 0;
function check(name, condition, detail = "") {
  if (condition) { passes++; console.log(`  ✓ ${name}`); }
  else { failures++; console.log(`  ✗ ${name}${detail ? ` — ${detail}` : ""}`); }
}

async function finishSession(page, rating = 3) {
  for (let i = 0; i < 12 && (await page.$('[data-action="next"]')); i++) await page.click('[data-action="next"]');
  await page.click(`[data-action="rate"][data-value="${rating}"]`);
}
const stored = (page) => page.evaluate(() => JSON.parse(localStorage.getItem("maya-entreno-v2") || "null"));

async function axeViolations(page) {
  await page.evaluate(axeSource);
  return page.evaluate(async () => {
    const r = await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa"] });
    return r.violations.map((v) => `${v.id} ×${v.nodes.length}: ${v.nodes.map((n) => n.target.join(" ")).join("; ")}`);
  });
}

const browser = await chromium.launch();
await mkdir(join(ROOT, "tests/screens"), { recursive: true });

for (const [label, options] of [["Móvil (iPhone 13)", devices["iPhone 13"]], ["Escritorio", { viewport: { width: 1280, height: 900 } }]]) {
  console.log(`\n${label}`);
  const context = await browser.newContext(options);
  const page = await context.newPage();
  await page.emulateMedia({ reducedMotion: "reduce" });   // sin animaciones: las medidas de contraste son estables
  const errors = [];
  const external = (url) => /fonts\.(googleapis|gstatic)\.com/.test(url);
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error" && !external(m.location().url || "")) errors.push(`${m.text()} ${m.location().url || ""}`); });
  // Las fuentes de Google se ignoran: en el entorno de pruebas no hay acceso a internet
  page.on("requestfailed", (r) => { if (!external(r.url())) errors.push(`no carga ${r.url()} (${r.failure().errorText})`); });

  await page.goto(BASE);
  await page.waitForSelector(".hero");
  check("La app arranca y muestra a Maya", (await page.textContent(".dog-name")) === "Maya");
  check("Empieza en el nivel 1", (await page.textContent(".level-pill")).includes("Nivel 1"));

  // Rutina diaria
  await page.click('[data-action="routine-step"][data-value="olfato"][data-step="1"]');
  await page.click('[data-action="routine-step"][data-value="olfato"][data-step="1"]');
  await page.click('[data-action="routine-toggle"][data-value="mastic"]');
  const routine = (await stored(page)).daily;
  const day = Object.values(routine)[0] || {};
  check("La rutina cuenta y marca", day.olfato === 2 && day.mastic === 1, JSON.stringify(routine));

  // Elegir tipo y bajar al plan
  await page.click('[data-action="goal"][data-value="trucos"]');
  check("Elegir un tipo cambia el plan", (await page.textContent("#plan h2")).includes("Trucos"));

  // Ficha de ejercicio y bloqueo del fondo
  await page.click('[data-action="view"][data-value="ejercicios"]');
  await page.click('[data-action="detail"][data-value="sitio"]');
  check("La ficha se abre como diálogo", await page.isVisible('[role="dialog"]'));
  check("El fondo no se desplaza con la ficha abierta", await page.evaluate(() => document.body.classList.contains("is-locked")));
  check("La ficha muestra los 3 niveles", (await page.$$(".sheet .level-item")).length === 3);
  await page.keyboard.press("Escape");
  check("Escape cierra la ficha", await page.isHidden("#overlay"));

  // Cronómetro «aguanta» (A tu sitio, nivel 1: mín. 1 min) — no debe dar por cumplido con poco tiempo
  await page.click('[data-action="detail"][data-value="sitio"]');
  await page.click('.sheet-cta [data-action="start"]');
  check("El cronómetro aparece en ejercicios con tiempo", await page.isVisible("#chrono"));
  await page.click('[data-action="chrono"]');
  await page.waitForTimeout(400);
  await page.click('[data-action="chrono"]');
  await finishSession(page);
  check("Aguantar 0,4 s no cumple «mín. 1 min»", (await page.getAttribute(".met-toggle", "aria-pressed")) === "false");
  await page.click('[data-action="close"]');

  // Cronómetro «en menos de» (Espacio de juego, nivel 1: máx. 1 min) — rápido sí cumple
  await page.click('[data-action="view"][data-value="ejercicios"]');
  await page.click('[data-action="detail"][data-value="juego"]');
  await page.click('.sheet-cta [data-action="start"]');
  await page.click('[data-action="chrono"]');
  await page.waitForTimeout(300);
  await page.click('[data-action="chrono"]');
  await finishSession(page);
  check("Desconectar en 0,3 s cumple «máx. 1 min»", (await page.getAttribute(".met-toggle", "aria-pressed")) === "true");
  await page.click('[data-action="close"]');

  // Ejercicios sin tiempo no muestran cronómetro
  await page.click('[data-action="detail"][data-value="vinc"]');
  await page.click('.sheet-cta [data-action="start"]');
  check("Vinculación no muestra cronómetro", !(await page.$("#chrono")));
  await page.click('[data-action="close"]');

  // Regla del 80 % y la marca manual se conserva al volver a los pasos
  await page.click('[data-action="detail"][data-value="sentadoneutra"]');
  await page.click('.sheet-cta [data-action="start"]');
  for (let i = 0; i < 4; i++) await page.click('[data-action="hit"]');
  await page.click('[data-action="miss"]');
  check("4 de 5 marca 80 %", (await page.textContent("#score")).includes("80 %"));
  await finishSession(page);
  check("La regla del 80 % marca el objetivo cumplido", (await page.getAttribute(".met-toggle", "aria-pressed")) === "true");
  await page.click('[data-action="met"]');
  await page.click('[data-action="back"]');
  await finishSession(page);
  check("Desmarcar a mano se mantiene al volver a los pasos", (await page.getAttribute(".met-toggle", "aria-pressed")) === "false");
  await page.click('[data-action="met"]');
  await page.fill("#note", "Muy atenta <b>hoy</b>");
  await page.click('[data-action="save"]');
  let saved = await stored(page);
  check("La sesión se guarda con su nivel y la nota", saved.sessions.length === 1 && saved.sessions[0].ok && saved.sessions[0].note.includes("<b>"));

  // Superar el nivel 1 de un ejercicio del programa → espera al resto
  await page.click('[data-action="view"][data-value="ejercicios"]');
  await page.click('[data-action="detail"][data-value="sentadoneutra"]');
  await page.click('.sheet-cta [data-action="start"]');
  for (let i = 0; i < 5; i++) await page.click('[data-action="hit"]');
  await finishSession(page);
  await page.click('[data-action="save"]');
  await page.click('[data-action="detail"][data-value="sentadoneutra"]');
  check("Con 2 sesiones cumplidas queda «espera al resto»", (await page.textContent(".sheet .facts")).includes("espera al resto"));
  check("El nivel 2 sigue bloqueado", (await page.$$(".sheet .level-item.is-locked")).length === 2);
  await page.keyboard.press("Escape");

  // Entrenar hoy: tanda guiada
  await page.click('[data-action="view"][data-value="hoy"]');
  await page.click('[data-action="goal"][data-value="toca"]');
  await page.click('[data-action="train"]');
  check("«Entrenar hoy» abre una tanda", (await page.textContent(".queue-tag")).startsWith("1/"));
  const total = +(await page.textContent(".queue-tag")).split("/")[1];
  for (let i = 0; i < total; i++) { await finishSession(page, 2); await page.click('[data-action="save"]'); }
  check("La tanda termina y se cierra", await page.isHidden("#overlay"));
  saved = await stored(page);
  check(`La tanda guarda ${total} sesiones`, saved.sessions.length === 2 + total + 0, `${saved.sessions.length}`);

  // Progreso, historial y escapes
  await page.click('[data-action="view"][data-value="progreso"]');
  check("Progreso muestra las sesiones", (await page.$$(".log-item")).length === saved.sessions.length);
  check("Las notas no se interpretan como HTML", (await page.$$(".log-item p i b")).length === 0);
  await page.click('[data-action="levels"]');
  await page.click('[data-action="levels-tab"][data-value="3"]');
  check("La hoja de niveles enseña el nivel 3", (await page.textContent(".sheet-body")).includes("3 ochos") || (await page.$$(".sheet-body .level-item")).length > 40);
  await page.keyboard.press("Escape");

  // Borrar sesión con doble confirmación
  await page.click('.log-item [data-action="delete"]');
  check("Borrar pide confirmación", (await page.textContent(".del.is-armed")) === "¿Seguro?");
  await page.click(".del.is-armed");
  check("Y borra al confirmar", (await stored(page)).sessions.length === saved.sessions.length - 1);

  // Restaurar una copia con datos dañados
  const corrupt = JSON.stringify({ state: { sessions: [{ ex: "no-existe", t: "x" }, { ex: "vinc", t: new Date().toISOString(), rating: 3, ok: true }], goal: "nada" } });
  await page.setInputFiles("#restore-file", { name: "copia.json", mimeType: "application/json", buffer: Buffer.from(corrupt) });
  await page.waitForSelector('[data-action="restore-yes"]');
  await page.click('[data-action="restore-yes"]');
  saved = await stored(page);
  check("La copia dañada se limpia al restaurar", saved.sessions.length === 1 && saved.goal === "toca");
  await page.click('[data-action="view"][data-value="hoy"]');
  check("La app sigue funcionando tras restaurar", await page.isVisible(".cta"));

  // Persistencia al recargar
  await page.reload();
  await page.waitForSelector(".hero");
  check("Los datos sobreviven a una recarga", (await stored(page)).sessions.length === 1);

  // Navegación por enlace directo
  await page.goto(`${BASE}#progreso`);
  await page.waitForSelector(".track");
  check("El enlace #progreso abre esa pestaña", await page.isVisible(".track"));

  // Accesibilidad
  for (const v of ["hoy", "ejercicios", "progreso"]) {
    await page.click(`[data-action="view"][data-value="${v}"]`);
    const issues = await axeViolations(page);
    check(`Accesibilidad WCAG AA en «${v}»`, issues.length === 0, issues.join(", "));
  }
  await page.click('[data-action="view"][data-value="hoy"]');
  await page.click('[data-action="train"]');
  let issues = await axeViolations(page);
  check("Accesibilidad WCAG AA en el modo guiado", issues.length === 0, issues.join(", "));
  await finishSession(page);
  issues = await axeViolations(page);
  check("Accesibilidad WCAG AA en la valoración", issues.length === 0, issues.join(", "));
  await page.keyboard.press("Escape");

  // Teclado en el modo guiado
  await page.click('[data-action="train"]');
  await page.keyboard.press("Space");
  await page.keyboard.press("Space");
  await page.keyboard.press("n");
  check("Espacio y N marcan aciertos y fallos", (await page.textContent("#score")).includes("2</b>") || (await page.innerHTML("#score")).startsWith("<b>2</b>"));
  await page.keyboard.press("Escape");

  await page.screenshot({ path: join(ROOT, `tests/screens/${label.startsWith("M") ? "movil" : "escritorio"}.png`), fullPage: false });
  check("Sin errores en consola", errors.length === 0, errors.join(" | "));
  await context.close();
}

// Datos guardados por la versión anterior de la app
console.log("\nMigración de datos de la versión anterior");
{
  const context = await browser.newContext();
  const page = await context.newPage();
  const old = {
    v: 4, dog: "Maya", goal: "s4", weekly: 4, sessionLen: 5, marker: "voz", updated: 1,
    daily: { "2026-11-03": { olfato: 2 } },
    sessions: [
      { id: "a1", t: "2026-11-03T10:00:00.000Z", ex: "esperatuyo", lv: 1, ok: true, rating: 3, rewards: 5, miss: 0, log: [[1, null, 0]], hold: 31, secs: 240, note: "" },
      { id: "a2", t: "2026-11-04T10:00:00.000Z", ex: "comida", rating: 2 },
    ],
  };
  await page.addInitScript((data) => { if (!localStorage.getItem("maya-entreno-v2")) localStorage.setItem("maya-entreno-v2", data); }, JSON.stringify(old));
  await page.goto(BASE);
  await page.waitForSelector(".hero");
  await page.click('[data-action="view"][data-value="progreso"]');
  check("Conserva las sesiones válidas de la versión anterior", (await page.$$(".log-item")).length === 1);
  check("Descarta ejercicios que ya no existen sin romperse", (await page.textContent(".log-item")).includes("Aguanta y gana"));
  await page.click('[data-action="view"][data-value="hoy"]');
  check("Un objetivo antiguo pasa a «Lo que toca»", (await page.getAttribute('[data-action="goal"][data-value="toca"]', "aria-pressed")) === "true");
  await context.close();
}

// Versión instalable
console.log("\nApp instalable (PWA)");
{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(BASE);
  const sw = await page.evaluate(async () => !!(await navigator.serviceWorker.ready));
  check("El service worker se activa", sw);
  const manifest = await page.evaluate(async () => (await fetch("manifest.webmanifest")).json());
  check("El manifiesto tiene iconos y modo app", manifest.display === "standalone" && manifest.icons.length >= 3);
  await page.reload();
  await context.setOffline(true);
  await page.reload();
  check("Abre sin conexión", (await page.textContent(".dog-name")) === "Maya");
  await context.close();
}

// Versión de un solo archivo (Claude)
console.log("\nVersión para Claude (un solo archivo)");
{
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(`${BASE}dist/maya-artifact.html`);
  await page.waitForSelector(".hero");
  check("La versión de un archivo arranca", (await page.textContent(".dog-name")) === "Maya");
  check("Sin errores en consola", errors.length === 0, errors.join(" | "));
  await context.close();
}

await browser.close();
server.close();
console.log(`\n${passes} pruebas correctas, ${failures} fallidas`);
process.exit(failures ? 1 : 0);

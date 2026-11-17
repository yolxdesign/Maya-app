/* Maya · Entreno — lógica de la app.
   Bloques: utilidades → estado y guardado → niveles → iconos → vistas → fichas →
   modo guiado → copias de seguridad → eventos → arranque.
   Funciona igual como app instalada (PWA) y como página publicada en Claude. */
(function () {
  "use strict";

  const DATA = window.MAYA_DATA;
  const TYPES = DATA.types;
  const EXERCISES = DATA.exercises;
  const BY_ID = Object.fromEntries(EXERCISES.map((e) => [e.id, e]));

  const STORAGE_KEY = "maya-entreno-v2";
  const STATE_VERSION = 5;
  const SESSIONS_TO_PASS = 2;   // sesiones con objetivo cumplido para superar un nivel
  const MIN_REPS = 5;           // repeticiones mínimas para aplicar la regla del 80 %
  const PASS_RATE = 0.8;
  const QUEUE_SIZE = 4;         // ejercicios de «Entrenar hoy»
  const BACKUP_REMINDER_DAYS = 7;
  const DIFFICULTY = ["", "Fácil", "Medio", "Avanzado"];
  const RATINGS = {
    1: { label: "Le costó", ink: "#B23A27", tint: "#FFE6E1", mouth: "M8 16c1.2-1.3 2.5-2 4-2s2.8.7 4 2" },
    2: { label: "Bien", ink: "#3E30C4", tint: "#ECE9FF", mouth: "M8.5 15h7" },
    3: { label: "¡Lo bordó!", ink: "#13906D", tint: "#DDF6EE", mouth: "M8 14c1.2 1.6 2.5 2.4 4 2.4s2.8-.8 4-2.4" },
  };
  const VIEWS = ["hoy", "ejercicios", "progreso"];

  /* =========================================================
     Utilidades
     ========================================================= */
  const $ = (sel) => document.querySelector(sel);
  const pad = (n) => String(n).padStart(2, "0");
  const dayKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const weekStart = (d) => addDays(d, -((d.getDay() + 6) % 7));
  const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
  const percent = (a, b) => (b ? Math.round((a / b) * 100) : 0);

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, (c) => (
      { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
    ));
  }
  /** Texto del programa con el nombre de la perra en lugar de «{dog}». */
  const txt = (s) => esc(s).replace(/\{dog\}/g, esc(state.dog));

  function clock(sec, decimals) {
    const s = Math.max(0, sec);
    const m = Math.floor(s / 60);
    const r = s - m * 60;
    return decimals ? `${m}:${r < 10 ? "0" : ""}${r.toFixed(1)}` : `${m}:${pad(Math.floor(r))}`;
  }
  function durationText(sec) {
    return sec >= 60 && sec % 60 === 0 ? `${sec / 60} min` : `${sec} s`;
  }
  function relativeDay(iso) {
    const d = new Date(iso);
    const k = dayKey(d);
    if (k === dayKey(today())) return "Hoy";
    if (k === dayKey(addDays(today(), -1))) return "Ayer";
    return d.toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" });
  }
  const typeVars = (typeKey) => {
    const t = TYPES[typeKey];
    return `--c:${t.accent};--ci:${t.ink};--t:${t.tint}`;
  };

  let toastTimer = 0;
  function toast(message) {
    const el = $("#toast");
    el.textContent = message;
    el.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-on"), 2200);
  }

  /* =========================================================
     Estado y guardado
     ========================================================= */
  function defaultState() {
    return { v: STATE_VERSION, dog: "Maya", goal: "toca", weekly: 4, sessions: [], daily: {}, backup: {}, updated: 0 };
  }

  const toInt = (n, lo, hi, fallback) => (Number.isFinite(+n) ? clamp(Math.round(+n), lo, hi) : fallback);

  /** Devuelve una sesión válida o null. Protege la app de datos antiguos o corruptos. */
  function cleanSession(s) {
    if (!s || typeof s !== "object" || !BY_ID[s.ex]) return null;
    const time = new Date(s.t);
    if (Number.isNaN(time.getTime())) return null;
    const log = Array.isArray(s.log)
      ? s.log.filter((x) => Array.isArray(x) && (x[0] === 0 || x[0] === 1))
          .map((x) => [x[0], Number.isInteger(x[1]) ? x[1] : null, toInt(x[2], 0, 50, 0)])
      : [];
    return {
      id: String(s.id || time.getTime().toString(36)),
      t: time.toISOString(),
      ex: s.ex,
      lv: toInt(s.lv, 1, 3, 1),
      ok: s.ok === true,
      rating: toInt(s.rating, 1, 3, 2),
      rewards: toInt(s.rewards, 0, 9999, 0),
      miss: toInt(s.miss, 0, 9999, 0),
      hold: Number.isFinite(+s.hold) ? Math.max(0, +s.hold) : 0,
      secs: toInt(s.secs, 0, 86400, 0),
      note: String(s.note || "").slice(0, 300),
      log,
    };
  }

  function cleanState(raw) {
    const base = defaultState();
    if (!raw || typeof raw !== "object") return base;
    const goal = raw.goal === "toca" || TYPES[raw.goal] ? raw.goal : "toca";
    const daily = raw.daily && typeof raw.daily === "object" ? raw.daily : {};
    return {
      v: STATE_VERSION,
      dog: String(raw.dog || base.dog).slice(0, 20),
      goal,
      weekly: toInt(raw.weekly, 1, 7, base.weekly),
      sessions: (Array.isArray(raw.sessions) ? raw.sessions : []).map(cleanSession).filter(Boolean),
      daily,
      backup: raw.backup && typeof raw.backup === "object" ? raw.backup : {},
      updated: +raw.updated || 0,
    };
  }

  function loadState() {
    let embedded = null;
    let local = null;
    try {
      const node = document.getElementById("state");
      if (node && node.textContent.trim()) embedded = JSON.parse(node.textContent);
    } catch { embedded = null; }
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) local = JSON.parse(saved);
    } catch { local = null; }
    const newest = local && (!embedded || (+local.updated || 0) > (+embedded.updated || 0)) ? local : embedded;
    return cleanState(newest);
  }

  let state = loadState();

  // Funciones del entorno Claude (null cuando es la app instalada)
  const platform = { artifact: null, mcp: null, downloads: null };
  let publishPending = false;
  let publishTimer = 0;
  let persistAsked = false;

  function save(message) {
    state.updated = Date.now();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      toast("No se ha podido guardar en este dispositivo. Descarga una copia en Progreso.");
    }
    if (!persistAsked && navigator.storage && navigator.storage.persist) {
      persistAsked = true;
      navigator.storage.persist().catch(() => {});
    }
    if (message) toast(message);
    if (platform.artifact) {
      if (guide && queue) publishPending = true;   // evita recargar la página a mitad de una tanda
      else publishPage(message ? 700 : 1500);
    }
  }

  /** Solo en Claude: publica la página con los datos dentro, para verlos en cualquier dispositivo. */
  function publishPage(delay) {
    publishPending = false;
    const head = [...document.head.querySelectorAll("meta, title, link")].map((n) => n.outerHTML).join("");
    const css = document.getElementById("css").textContent;
    const app = document.getElementById("app").textContent;
    const json = JSON.stringify(state).replace(/</g, "\\u003c");
    const html = `<!DOCTYPE html>\n<html lang="es"><head>${head}<style id="css">${css}</style></head>` +
      `<body><div id="root"></div><script id="state" type="application/json">${json}<\/script>` +
      `<script id="app">${app}<\/script></body></html>`;
    clearTimeout(publishTimer);
    publishTimer = setTimeout(() => platform.artifact.publish(html).catch(() => {}), delay);
  }

  /* =========================================================
     Niveles y progreso
     ========================================================= */
  const programExercises = () => EXERCISES.filter((e) => e.program);
  const sessionsOf = (id) => state.sessions.filter((s) => s.ex === id);
  const passedCount = (id, level) => state.sessions.filter((s) => s.ex === id && s.lv === level && s.ok).length;

  function levelsDone(id) {
    let done = 0;
    for (let l = 1; l <= 3 && passedCount(id, l) >= SESSIONS_TO_PASS; l++) done = l;
    return done;
  }
  /** Nivel global: el más bajo que aún le falta a algún ejercicio del programa. */
  function globalLevel() {
    const pending = programExercises().map((e) => levelsDone(e.id) + 1);
    return clamp(Math.min(...pending), 1, 3);
  }
  const programComplete = () => programExercises().every((e) => levelsDone(e.id) >= 3);
  const mastery = (id) => percent(levelsDone(id), 3);
  const lastPracticed = (id) => Math.max(0, ...sessionsOf(id).map((s) => new Date(s.t).getTime()));

  /** Nivel que toca practicar. Los del programa no pueden adelantarse al nivel global. */
  function currentLevel(e) {
    const next = Math.min(levelsDone(e.id) + 1, 3);
    return e.program ? Math.min(next, globalLevel()) : next;
  }
  /** Superó el nivel global y espera a que el resto lo supere. */
  const isWaiting = (e) => e.program && !programComplete() && levelsDone(e.id) >= globalLevel();
  const isFinished = (e) => levelsDone(e.id) >= 3;

  function statusOf(e) {
    if (isFinished(e)) return { text: "Completado", cls: "badge-ok" };
    if (isWaiting(e)) return { text: `Nivel ${levelsDone(e.id)} ✓ · espera al resto`, cls: "badge-ok" };
    const level = currentLevel(e);
    return { text: `Nivel ${level} · ${passedCount(e.id, level)}/${SESSIONS_TO_PASS}`, cls: "" };
  }

  function goalName() {
    return state.goal === "toca" ? "Lo que toca" : TYPES[state.goal].name;
  }

  function plan() {
    if (state.goal === "toca") {
      const level = globalLevel();
      return programExercises()
        .filter((e) => levelsDone(e.id) < level)
        .sort((a, b) => passedCount(b.id, level) - passedCount(a.id, level) || lastPracticed(a.id) - lastPracticed(b.id))
        .slice(0, 6);
    }
    const list = EXERCISES.filter((e) => e.type === state.goal);
    const closed = (e) => (isFinished(e) || isWaiting(e) ? 1 : 0);
    return list.map((e, i) => [e, i]).sort((a, b) => closed(a[0]) - closed(b[0]) || a[1] - b[1]).map((x) => x[0]);
  }

  /** «Entrenar hoy»: los pendientes que hace más tiempo que no se practican. */
  function todayQueue() {
    return plan()
      .map((e, i) => ({ e, i }))
      .filter(({ e }) => !isFinished(e) && !isWaiting(e))
      .sort((a, b) => lastPracticed(a.e.id) - lastPracticed(b.e.id) || a.i - b.i)
      .slice(0, QUEUE_SIZE)
      .map(({ e }) => e.id);
  }

  function sessionsByDay() {
    const days = {};
    state.sessions.forEach((s) => { const k = dayKey(new Date(s.t)); days[k] = (days[k] || 0) + 1; });
    return days;
  }

  function bestStreak() {
    let best = 0;
    let run = 0;
    let prev = null;
    Object.keys(sessionsByDay()).sort().forEach((k) => {
      const d = new Date(`${k}T00:00:00`);
      run = prev && dayKey(addDays(prev, 1)) === k ? run + 1 : 1;
      best = Math.max(best, run);
      prev = d;
    });
    return best;
  }

  /** Dónde falla: agrupa los «No» por repetición de la pirámide o por paso. */
  function failSummary(e, log) {
    const counts = {};
    let total = 0;
    log.forEach(([hit, rep, step]) => {
      if (hit) return;
      total++;
      const key = e.pyramid && rep != null && e.pyramid[rep]
        ? `Repetición ${repLabel(e.pyramid[rep].label)} (${e.pyramid[rep].level.toLowerCase()})` : `Paso ${step + 1}`;
      counts[key] = (counts[key] || 0) + 1;
    });
    return { total, list: Object.entries(counts).sort((a, b) => b[1] - a[1]) };
  }

  /* =========================================================
     Iconos
     ========================================================= */
  const ICON_PATHS = {
    link: '<circle cx="9" cy="12" r="5"/><circle cx="15" cy="12" r="5"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
    recall: '<path d="M3 12h11"/><path d="M10 7l5 5-5 5"/><path d="M20 4v16"/>',
    hourglass: '<path d="M7 3h10M7 21h10"/><path d="M8 3c0 4.5 8 4.5 8 9s-8 4.5-8 9"/><path d="M16 3c0 4.5-8 4.5-8 9s8 4.5 8 9"/>',
    bed: '<path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6"/><path d="M3 15h18M3 18v2M21 18v2"/><path d="M6 10V7.5A1.5 1.5 0 0 1 7.5 6h3A1.5 1.5 0 0 1 12 7.5V10"/>',
    leash: '<circle cx="18" cy="5" r="2.5"/><path d="M16.5 7C14 9 13 12 11 15s-4 5-7 5"/><path d="M4 20l2-3"/>',
    sparkle: '<path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z"/><path d="M19 17l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.4a4.2 4.2 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  };
  const icon = (name) => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${ICON_PATHS[name]}</svg>`;
  const typeIcon = (e) => icon(TYPES[e.type].icon);
  const PAW = '<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="6" cy="9.5" rx="2" ry="2.6"/><ellipse cx="10" cy="5.8" rx="2" ry="2.6"/><ellipse cx="14.5" cy="5.8" rx="2" ry="2.6"/><ellipse cx="18.5" cy="9.5" rx="2" ry="2.6"/><path d="M12.2 11c2.6 0 5.6 3.6 5.6 6.2 0 2-1.6 2.8-3 2.8-1.1 0-1.7-.6-2.6-.6s-1.5.6-2.6.6c-1.4 0-3-.8-3-2.8 0-2.6 3-6.2 5.6-6.2z"/></svg>';
  const bar = (pct) => `<div class="bar"><i style="width:${pct}%"></i></div>`;

  /* =========================================================
     Vistas
     ========================================================= */
  let view = VIEWS.includes(location.hash.slice(1)) ? location.hash.slice(1) : "hoy";
  let libraryFilter = "all";

  function render() {
    $("#root").innerHTML = `${renderHeader()}<div class="wrap">${renderTabs()}<main>${
      view === "hoy" ? renderToday() : view === "ejercicios" ? renderLibrary() : renderProgress()
    }</main></div>`;
  }

  function renderHeader() {
    return `<header class="hero"><div class="wrap"><div class="hero-top">
      <div class="avatar">${PAW}</div>
      <div><div class="hello">Entrenando con</div><h1 class="dog-name">${esc(state.dog)}</h1></div>
    </div></div></header>`;
  }


  function renderTabs() {
    const names = { hoy: "Hoy", ejercicios: "Ejercicios", progreso: "Progreso" };
    return `<nav class="tabs" aria-label="Secciones">${VIEWS.map((v) =>
      `<button class="tab" data-action="view" data-value="${v}"${view === v ? ' aria-current="page"' : ""}>${names[v]}</button>`
    ).join("")}</nav>`;
  }

  /* ---------- Hoy ---------- */
  function renderToday() {
    const next = todayQueue().map((id) => BY_ID[id]);
    const preview = next.length
      ? `<ol class="cta-list">${next.map((e) => `<li>${txt(e.name)}</li>`).join("")}</ol>`
      : "<p>No queda nada pendiente en este grupo.</p>";
    return `<section class="section">
        <div class="cta-card">
          <div><span class="eyebrow">Hoy toca · ${esc(goalName())}</span>${preview}</div>
          <button class="btn btn-primary" data-action="train"${next.length ? "" : " disabled"}>▶ Entrenar ${next.length} ejercicios</button>
        </div>
      </section>
      <section class="section">
        <h2 class="section-title">Elige qué practicar</h2>
        ${renderGoals()}
        ${renderPlan()}
      </section>
      ${renderRoutine()}
      <section class="section">${renderCode()}</section>`;
  }



  /** Rutina diaria en una franja compacta: un contador pequeño por pauta. */
  function renderRoutine() {
    const day = state.daily[dayKey(today())] || {};
    const items = DATA.routine.map((r) => {
      const n = day[r.id] || 0;
      const done = n >= r.min;
      const control = r.check
        ? `<button class="mini-btn" data-action="routine-toggle" data-value="${r.id}" aria-pressed="${n ? "true" : "false"}" aria-label="${esc(r.name)}: ${n ? "hecho" : "marcar"}">${n ? "✓" : "○"}</button>`
        : `<button class="mini-btn" data-action="routine-step" data-value="${r.id}" data-step="-1" aria-label="Quitar uno: ${esc(r.name)}">–</button>
           <b aria-live="polite">${n}<span>/${esc(r.label)}</span></b>
           <button class="mini-btn" data-action="routine-step" data-value="${r.id}" data-step="1" aria-label="Añadir uno: ${esc(r.name)}">+</button>`;
      return `<div class="routine-item${done ? " is-done" : ""}" title="${esc(r.hint)}"><span>${esc(r.name)}</span><div>${control}</div></div>`;
    }).join("");
    return `<section class="section"><h2 class="section-title">Rutina de hoy</h2><div class="routine-strip">${items}</div></section>`;
  }


  function renderGoals() {
    const options = [["toca", { name: "Lo que toca", accent: "#1E1B3A", ink: "#1E1B3A", tint: "#ECEBF3", icon: "arrow" }]]
      .concat(Object.entries(TYPES));
    return `<div class="chip-row" role="group" aria-label="Qué quieres practicar">${options.map(([key, t]) =>
      `<button class="chip" style="--c:${t.accent}" data-action="goal" data-value="${key}" aria-pressed="${state.goal === key}">${icon(t.icon)}${esc(t.name)}</button>`
    ).join("")}</div>`;
  }


  function renderPlan() {
    const list = plan();
    const rows = list.length ? list.map((e) => exerciseRow(e, "start")).join("")
      : '<div class="empty"><b>¡Todo al día!</b>No queda nada pendiente aquí. Elige otro grupo.</div>';
    return `<div class="list" id="plan" aria-label="Ejercicios de ${esc(goalName())}">${rows}</div>`;
  }


  /** Los 3 niveles de un ejercicio: hechos ✓, el actual destacado y los bloqueados con candado. */
  function levelTrack(e, size) {
    const done = levelsDone(e.id);
    const current = isFinished(e) ? 0 : currentLevel(e);
    const steps = [1, 2, 3].map((n) => {
      const kind = n <= done ? "done" : n === current && !isWaiting(e) ? "now" : "next";
      const mark = n <= done ? "✓" : n;
      return `<li class="lt-${kind}"${kind === "now" ? ' aria-current="step"' : ""}><span>${mark}</span>${size === "big" ? `<small>Nivel ${n}</small>` : ""}</li>`;
    }).join("");
    const label = isFinished(e) ? "Los 3 niveles superados" : isWaiting(e) ? `Nivel ${done} superado` : `Nivel ${current} de 3`;
    return `<ol class="level-track${size === "big" ? " is-big" : ""}" aria-label="${label}">${steps}</ol>`;
  }

  /** Fila del plan: tocarla empieza el ejercicio; el botón «i» abre la ficha. */
  /** Fila de ejercicio. En «Hoy» tocarla lo empieza; en la biblioteca abre la ficha. */
  function exerciseRow(e, primary) {
    const times = sessionsOf(e.id).length;
    const practiced = times ? `Practicado ${times} ${times === 1 ? "vez" : "veces"}` : "Sin practicar";
    const level = isFinished(e) ? "Completado" : isWaiting(e) ? "Espera al resto" : `Nivel ${currentLevel(e)}`;
    const main = primary === "start"
      ? `data-action="start" data-value="${e.id}" aria-label="Empezar ${txt(e.name)}"`
      : `data-action="detail" data-value="${e.id}"`;
    const side = primary === "start"
      ? `<button class="icon-btn" data-action="detail" data-value="${e.id}" aria-label="Ver ficha de ${txt(e.name)}">i</button>`
      : `<button class="icon-btn is-play" data-action="start" data-value="${e.id}" aria-label="Empezar ${txt(e.name)}">▶</button>`;
    return `<article class="row" style="${typeVars(e.type)}">
      <button class="row-main" ${main}>
        <span class="tile">${typeIcon(e)}</span>
        <span class="row-text">
          <b>${txt(e.name)}</b>
          <span class="row-summary">${txt(e.summary)}</span>
          <span class="row-meta">${levelTrack(e)}<span>${level} · ${practiced}</span>${e.program ? "" : '<span class="tag">Extra</span>'}${e.missingInfo ? '<span class="tag tag-warn">Falta info</span>' : ""}</span>
        </span>
        ${primary === "start" ? '<span class="play" aria-hidden="true">▶</span>' : ""}
      </button>${side}
    </article>`;
  }





  function renderCode() {
    return `<details class="disclosure"><summary>Código de comunicación</summary><div class="disclosure-body">${DATA.code.map((c) =>
      `<div class="code-row"><b>${txt(c.word)}</b><span>${esc(c.meaning)}</span></div>`
    ).join("")}</div></details>`;
  }


  /* ---------- Ejercicios ---------- */
  function renderLibrary() {
    const chips = [["all", "Todos"]].concat(Object.entries(TYPES).map(([k, t]) => [k, t.name]))
      .map(([k, name]) => `<button class="chip" data-action="filter" data-value="${k}" aria-pressed="${libraryFilter === k}">${esc(name)}</button>`).join("");
    const groups = Object.entries(TYPES)
      .filter(([k]) => libraryFilter === "all" || libraryFilter === k)
      .map(([k, t]) => {
        const list = EXERCISES.filter((e) => e.type === k).sort((a, b) => a.difficulty - b.difficulty);
        return `<section class="group" aria-label="${esc(t.name)}">
          <h3 class="group-title">${esc(t.name)}<small>${list.length}</small></h3>
          <div class="list">${list.map((e) => exerciseRow(e, "detail")).join("")}</div></section>`;
      }).join("");
    return `<section class="section"><h2 class="section-title">Ejercicios</h2>
      <div class="chip-row" role="group" aria-label="Filtrar por tipo">${chips}</div>${groups}</section>`;
  }





  /* ---------- Progreso ---------- */
  function renderProgress() {
    return `${renderTrack()}
      <section class="section"><h2 class="section-title">Progreso de ${esc(state.dog)}</h2>
        <p class="lead">Cada nivel se supera con ${SESSIONS_TO_PASS} sesiones que cumplan su objetivo.</p>
        ${renderTiles()}
        <div class="grid-2" style="margin-bottom:18px">${renderHeatmap()}${renderTypeBars()}</div>
        <div class="grid-2">${renderHistory()}${renderActive()}</div>
        ${renderBackup()}
      </section>`;
  }

  function renderTrack() {
    const total = programExercises().length * 3;
    const done = programExercises().reduce((sum, e) => sum + levelsDone(e.id), 0);
    return `<div class="card track">
      <div class="track-head"><b>Progreso del programa</b><span>${percent(done, total)} % · ${done} de ${total} niveles · ${state.sessions.length} sesiones</span></div>
      <div class="track-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${done}" aria-label="Niveles superados">
        <i style="width:${percent(done, total)}%"></i><em style="left:33.33%"></em><em style="left:66.66%"></em></div>
      <div class="track-labels"><span>Nivel 1</span><span>Nivel 2</span><span>Nivel 3</span></div>
      <button class="btn btn-soft" data-action="levels">Ver qué piden los niveles 1, 2 y 3</button>
    </div>`;
  }

  function renderTiles() {
    const minutes = Math.round(state.sessions.reduce((sum, s) => sum + s.secs, 0) / 60);
    const hits = state.sessions.reduce((sum, s) => sum + s.rewards, 0);
    const tile = (n, label) => `<div class="card"><b>${n}</b><span>${label}</span></div>`;
    return `<div class="tiles">${tile(state.sessions.length, "sesiones totales")}${tile(minutes, "minutos entrenados")}${tile(bestStreak(), "mejor racha (días)")}${tile(hits, "aciertos marcados")}</div>`;
  }

  function renderHeatmap() {
    const days = sessionsByDay();
    const start = addDays(weekStart(today()), -15 * 7);
    const now = today();
    let cells = "";
    for (let i = 0; i < 16 * 7; i++) {
      const d = addDays(start, i);
      const n = days[dayKey(d)] || 0;
      const cls = d > now ? "future" : n >= 3 ? "l3" : n === 2 ? "l2" : n === 1 ? "l1" : "";
      cells += `<i class="${cls}" title="${dayKey(d)}: ${n} sesiones"></i>`;
    }
    return `<div class="card card-pad heat"><h3 class="card-title">Constancia · últimas 16 semanas</h3>
      <div class="heat-grid" aria-hidden="true">${cells}</div>
      <div class="legend">Menos <i style="background:#EEEDF5"></i><i style="background:#C9C2FF"></i><i style="background:#9587FF"></i><i style="background:#5B4BE8"></i> Más</div></div>`;
  }

  function renderTypeBars() {
    return `<div class="card card-pad"><h3 class="card-title">Dominio por tipo</h3><div class="bars">${Object.entries(TYPES).map(([k, t]) => {
      const list = EXERCISES.filter((e) => e.type === k);
      const pct = Math.round(list.reduce((sum, e) => sum + mastery(e.id), 0) / list.length);
      return `<div class="bar-row" style="${typeVars(k)}"><div class="tile">${icon(t.icon)}</div>
        <div><header>${esc(t.name)}<span>${pct} %</span></header>${bar(pct)}</div></div>`;
    }).join("")}</div></div>`;
  }

  function renderHistory() {
    const recent = state.sessions.slice().reverse().slice(0, 30);
    const items = recent.map((s) => {
      const e = BY_ID[s.ex];
      const total = s.rewards + s.miss;
      const score = total ? `${s.rewards}/${total} aciertos (${percent(s.rewards, total)} %)` : `${s.rewards} aciertos`;
      const fails = failSummary(e, s.log);
      return `<div class="log-item" style="${typeVars(e.type)}"><div class="tile">${typeIcon(e)}</div>
        <div><b>${txt(e.name)}</b>
          <small>${relativeDay(s.t)} · Nv ${s.lv}${s.ok ? " ✓" : ""} · ${Math.max(1, Math.round(s.secs / 60))} min · ${score}</small>
          ${fails.total ? `<p class="fail">Falla en: ${fails.list.slice(0, 2).map(([k, n]) => `${txt(k)} ✗${n}`).join(", ")}</p>` : ""}
          ${s.hold ? `<p>Tiempo marcado: ${clock(s.hold, true)}</p>` : ""}
          ${s.note ? `<p><i>${esc(s.note)}</i></p>` : ""}
        </div>
        <span class="rating rating-${s.rating}">${RATINGS[s.rating].label}</span>
        <button class="del" data-action="delete" data-value="${esc(s.id)}" aria-label="Borrar sesión">Borrar</button></div>`;
    }).join("");
    return `<div class="card card-pad"><h3 class="card-title">Historial</h3>${items ||
      '<div class="empty"><b>Aún no hay sesiones</b>Empieza un ejercicio desde «Hoy» y aparecerá aquí.</div>'}</div>`;
  }

  function renderActive() {
    const active = EXERCISES.filter((e) => levelsDone(e.id) > 0 || sessionsOf(e.id).length)
      .sort((a, b) => mastery(b.id) - mastery(a.id));
    return `<div class="card card-pad"><h3 class="card-title">En marcha</h3><div class="bars">${active.length
      ? active.map((e) => `<div class="bar-row" style="${typeVars(e.type)}"><div class="tile">${typeIcon(e)}</div>
          <div><header>${txt(e.name)}<span>${statusOf(e).text}</span></header>${bar(mastery(e.id))}</div></div>`).join("")
      : '<p class="lead" style="margin:0">Los ejercicios que empieces aparecerán aquí con su avance.</p>'}</div></div>`;
  }

  /* =========================================================
     Fichas: ejercicio y niveles
     ========================================================= */
  let lastFocus = null;

  function openOverlay(html, label) {
    const overlay = $("#overlay");
    const opening = overlay.hidden;
    if (opening) lastFocus = document.activeElement;
    overlay.innerHTML = html;
    overlay.setAttribute("aria-label", label);
    overlay.hidden = false;
    document.body.classList.add("is-locked");
    const target = overlay.querySelector(opening ? ".close" : ".step-card, .celebrate, .close");
    if (target) {
      if (!target.matches("button")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  }

  function closeOverlay() {
    stopGuideTimers();
    guide = null;
    queue = null;
    if (publishPending && platform.artifact) publishPage(0);
    const overlay = $("#overlay");
    overlay.hidden = true;
    overlay.innerHTML = "";
    document.body.classList.remove("is-locked");
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }

  const closeButton = '<button class="close" data-action="close" aria-label="Cerrar">×</button>';

  function renderLevels(e) {
    const done = levelsDone(e.id);
    const current = currentLevel(e);
    const global = globalLevel();
    return `<div class="levels">${e.levels.map((lvl, i) => {
      const n = i + 1;
      const locked = e.program && n > global && n > done;
      const now = n === current && n > done && !isWaiting(e);
      const cls = n <= done ? "is-done" : locked ? "is-locked" : now ? "is-current" : "";
      const mark = n <= done ? "✓" : locked ? "🔒" : n;
      const tag = n <= done ? "Superado" : now ? `Ahora · ${passedCount(e.id, n)} de ${SESSIONS_TO_PASS} sesiones` : locked ? "Bloqueado" : "";
      const time = lvl.time ? ` <span class="badge">${lvl.time.kind === "under" ? "máx." : "mín."} ${durationText(lvl.time.sec)}</span>` : "";
      return `<div class="level-item ${cls}"><span aria-hidden="true">${mark}</span><div><b>Nivel ${n}${tag ? ` · ${tag}` : ""}</b>${txt(lvl.goal)}${time}</div></div>`;
    }).join("")}</div>`;
  }


  /** «R1», «P2», «E1 · R3» → «1ª rep.», «2ª rep.», «A · 3ª» */
  function repLabel(label) {
    const m = /^(?:E(\d)\s*·\s*)?[RP](\d)$/.exec(label);
    if (!m) return label;
    return m[1] ? `${"AB"[m[1] - 1] || m[1]} · ${m[2]}ª` : `${m[2]}ª rep.`;
  }

  /** Repeticiones de la sesión (pirámide fácil → difícil → fácil). No son niveles. */
  function renderPyramid(e, active, log) {
    return `<div class="pyramid">${e.pyramid.map((r, i) => {
      let yes = 0;
      let no = 0;
      (log || []).forEach(([hit, rep]) => { if (rep === i) { if (hit) yes++; else no++; } });
      const counts = log ? `<span class="count">${yes ? `<span class="y">✓${yes}</span>` : ""}${no ? `<span class="n">✗${no}</span>` : ""}</span>` : "";
      const cls = `pyr${r.level === "Difícil" ? " is-hard" : ""}${i === active ? " is-active" : ""}${no ? " has-fails" : ""}`;
      const tag = log ? "button" : "div";
      const attrs = log ? ` data-action="pyramid" data-value="${i}" aria-pressed="${i === active}"` : "";
      return `<${tag} class="${cls}"${attrs}><span>${esc(repLabel(r.label))}</span><b>${esc(r.level)}</b><em>${txt(r.detail)}</em>${counts}</${tag}>`;
    }).join("")}</div>`;
  }


  function renderFails(e, log) {
    const f = failSummary(e, log);
    if (!f.total) return '<p class="lead" style="margin:0">Sin fallos marcados con «No».</p>';
    const top = f.list[0];
    return `<div class="fails">${f.list.map(([k, n]) => `<span><b>${txt(k)}</b> ✗${n}</span>`).join("")}</div>${
      top[1] >= 2 ? `<div class="note note-tip" style="margin-top:8px"><b>Sugerencia</b>Donde más falla es «${txt(top[0])}». Hazlo más fácil la próxima vez y vuelve a subir poco a poco.</div>` : ""}`;
  }

  function openDetail(id) {
    const e = BY_ID[id];
    const t = TYPES[e.type];
    const recent = sessionsOf(id).slice(-5);
    const recentLog = recent.flatMap((s) => s.log);
    const best = Math.max(0, ...recent.map((s) => s.hold));
    const html = `<div class="scrim" data-action="close"></div>
      <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title" style="${typeVars(e.type)}">
        <div class="sheet-head">${closeButton}<div class="tile">${typeIcon(e)}</div>
          <span class="kicker">${esc(t.name)}${e.program ? "" : " · Extra"}</span><h2 id="sheet-title">${txt(e.name)}</h2>
          <div style="margin-top:12px">${levelTrack(e, "big")}</div>
          ${e.video ? `<a class="video" href="${esc(e.video)}" target="_blank" rel="noopener">▶ Ver vídeo de la educadora</a>` : ""}</div>
        <div class="sheet-body">
          <div class="facts">
            <div class="fact"><small>Dificultad</small><b>${DIFFICULTY[e.difficulty]}</b></div>
            <div class="fact"><small>Duración</small><b>${e.minutes} min</b></div>
            <div class="fact"><small>Toca</small><b>${isFinished(e) ? "Completado" : isWaiting(e) ? "Espera al resto" : `Nivel ${currentLevel(e)}`}</b></div>
          </div>
          <div class="fact"><small>Material</small><b>${txt(e.material)}</b></div>
          <h3 class="h3">Niveles</h3>${renderLevels(e)}
          <h3 class="h3">Pasos</h3><ol class="steps">${e.steps.map((s) => `<li>${txt(s)}</li>`).join("")}</ol>
          <h3 class="h3">Antes de empezar</h3><div class="stack">
            <div class="note note-tip"><b>Consejo</b>${txt(e.tip)}</div>
            <div class="note note-bad"><b>Error frecuente</b>${txt(e.mistake)}</div>
            <div class="note note-ok"><b>Lo tiene cuando…</b>${txt(e.mastered)}</div>
            ${e.missingInfo ? `<div class="note note-gap"><b>Falta confirmar con la educadora</b>${txt(e.missingInfo)}</div>` : ""}
          </div>
          ${e.pyramid ? `<h3 class="h3">Repeticiones de cada sesión</h3><p class="lead" style="margin:-4px 0 8px">Dentro de cada sesión: fácil → difícil → fácil. No son niveles.</p>${renderPyramid(e, -1)}` : ""}
          ${recent.length ? `<h3 class="h3">Dónde falla · últimas ${recent.length} sesiones</h3>${renderFails(e, recentLog)}` : ""}
          ${best ? `<p class="lead" style="margin-top:8px">Mejor tiempo registrado: <b>${clock(best, true)}</b></p>` : ""}
        </div>
        <div class="sheet-cta"><button class="btn btn-block" data-action="start" data-value="${id}">Empezar ejercicio guiado</button></div>
      </div>`;
    openOverlay(html, txt(e.name));
  }

  let levelsTab = 1;
  function openLevels() {
    const global = globalLevel();
    const tabs = [1, 2, 3].map((n) => `<button class="chip" data-action="levels-tab" data-value="${n}" aria-pressed="${levelsTab === n}">Nivel ${n}${n < global ? " ✓" : n > global ? " 🔒" : ""}</button>`).join("");
    const groups = Object.entries(TYPES).map(([k, t]) => `<h3 class="h3" style="color:${t.ink}">${esc(t.name)}</h3><div class="levels">${
      EXERCISES.filter((e) => e.type === k).map((e) => {
        const ok = levelsDone(e.id) >= levelsTab;
        return `<button class="level-item${ok ? " is-done" : ""}" data-action="detail" data-value="${e.id}"><span aria-hidden="true">${ok ? "✓" : levelsTab}</span>
          <div><b>${txt(e.name)}${e.program ? "" : " · extra"}</b>${txt(e.levels[levelsTab - 1].goal)}</div></button>`;
      }).join("")}</div>`).join("");
    openOverlay(`<div class="scrim" data-action="close"></div>
      <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="levels-title">
        <div class="sheet-head">${closeButton}<span class="kicker">Objetivos por nivel</span>
          <h2 id="levels-title">Qué hay que conseguir en cada nivel</h2><div class="level-tabs" role="group">${tabs}</div></div>
        <div class="sheet-body">${groups}</div></div>`, "Objetivos por nivel");
  }

  /* =========================================================
     Modo guiado
     ========================================================= */
  let guide = null;   // sesión en curso
  let queue = null;   // tanda de «Entrenar hoy»
  let audio = null;

  function beep() {
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      const t0 = audio.currentTime;
      [0, 0.22, 0.44].forEach((offset) => {
        const osc = audio.createOscillator();
        const gain = audio.createGain();
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.0001, t0 + offset);
        gain.gain.exponentialRampToValueAtTime(0.25, t0 + offset + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + offset + 0.18);
        osc.connect(gain).connect(audio.destination);
        osc.start(t0 + offset);
        osc.stop(t0 + offset + 0.2);
      });
    } catch { /* sin audio en este navegador */ }
  }

  function startExercise(id) {
    const e = BY_ID[id];
    stopGuideTimers();
    guide = {
      id, level: currentLevel(e), phase: "steps", step: 0, rep: e.pyramid ? 0 : null,
      hits: 0, misses: 0, log: [], rating: 0, metManual: null, note: "", tipOpen: true,
      timer: { total: e.minutes * 60, left: e.minutes * 60, running: false, handle: 0, used: 0 },
      chrono: { running: false, start: 0, current: 0, attempts: [], handle: 0, alerted: false },
    };
    renderGuide();
  }

  function startQueue() {
    const ids = todayQueue();
    if (!ids.length) { toast("No hay ejercicios pendientes aquí"); return; }
    queue = { ids, index: 0 };
    startExercise(ids[0]);
  }

  function stopGuideTimers() {
    if (!guide) return;
    clearInterval(guide.timer.handle);
    clearInterval(guide.chrono.handle);
    guide.timer.running = false;
    if (guide.chrono.running) stopChrono(true);
  }

  const levelTime = () => BY_ID[guide.id].levels[guide.level - 1].time || null;
  /** Mejor marca: el tiempo más largo si hay que aguantar, el más corto si hay que hacerlo en «menos de». */
  function bestTime() {
    const a = guide.chrono.attempts;
    if (!a.length) return 0;
    const time = levelTime();
    return time && time.kind === "under" ? Math.min(...a) : Math.max(...a);
  }
  const timeMet = (time, sec) => !!time && sec > 0 && (time.kind === "under" ? sec <= time.sec : sec >= time.sec);
  function autoMet() {
    const total = guide.hits + guide.misses;
    return (total >= MIN_REPS && guide.hits / total >= PASS_RATE) || timeMet(levelTime(), bestTime());
  }
  const isMet = () => (guide.metManual == null ? autoMet() : guide.metManual);

  function renderGuide() {
    const e = BY_ID[guide.id];
    const header = `<div class="guide-head">${closeButton}${queue ? `<span class="queue-tag">${queue.index + 1}/${queue.ids.length}</span>` : ""}
      <h2 id="guide-title">${txt(e.name)}</h2></div>`;
    const body = guide.phase === "steps" ? renderSteps(e) : renderRating(e);
    openOverlay(`<div class="guide" role="dialog" aria-modal="true" aria-labelledby="guide-title" style="${typeVars(e.type)}">
      <div class="guide-in">${header}${body}</div></div>`, txt(e.name));
    if (guide.phase === "steps") { paintTimer(); paintChrono(); }
  }

  function renderSteps(e) {
    const last = guide.step === e.steps.length - 1;
    const time = levelTime();
    return `<section class="level-panel" aria-label="Nivel que estás entrenando">
        <div class="level-panel-head"><span>Ahora entrenas</span><b>Nivel ${guide.level}</b>${levelTrack(e, "big")}</div>
        <p><b>Objetivo:</b> ${txt(e.levels[guide.level - 1].goal)}</p>
      </section>
      <details class="tip-box"${guide.tipOpen ? " open" : ""}><summary>Consejo${e.video ? " y vídeo" : ""}</summary>
        <p>${txt(e.tip)}</p>
        ${e.video ? `<a class="video" href="${esc(e.video)}" target="_blank" rel="noopener">▶ Ver vídeo de la educadora</a>` : ""}
      </details>
      <div class="progress" aria-hidden="true">${e.steps.map((_, i) => `<i class="${i <= guide.step ? "on" : ""}"></i>`).join("")}</div>
      <div class="step-card" aria-live="polite"><span>Paso ${guide.step + 1} de ${e.steps.length}</span><p>${txt(e.steps[guide.step])}</p></div>
      <div class="nav"><button data-action="prev"${guide.step === 0 ? " disabled" : ""}>Anterior</button>
        <button class="primary" data-action="next">${last ? "Terminar sesión" : "Siguiente"}</button></div>
      <section class="counter-card" aria-label="Contador de aciertos">
        <div class="score" id="score" aria-live="polite">${scoreText()}</div>
        <div class="counter-buttons">
          <button class="mark-btn is-yes" id="marker" data-action="hit"><b>✓</b>Bien</button>
          <button class="mark-btn is-no" data-action="miss"><b>✗</b>Fallo</button>
        </div>
        <button class="undo-btn" data-action="undo"${guide.log.length ? "" : " disabled"}>↶ Deshacer el último</button>
      </section>
      <section class="clock-card" aria-label="Tiempo">
        ${time ? '<div class="chrono" id="chrono"></div>' : ""}
        <div class="timer-row" id="timer"></div>
      </section>
      ${e.pyramid ? `<h3 class="h3">Repeticiones · toca la que estás haciendo</h3><div id="pyramid">${renderPyramid(e, guide.rep, guide.log)}</div>` : ""}`;
  }


  function scoreText() {
    const total = guide.hits + guide.misses;
    const p = percent(guide.hits, total);
    const met = total >= MIN_REPS && p >= PASS_RATE * 100;
    return `<span class="y">✓ ${guide.hits}</span><span class="n">✗ ${guide.misses}</span>${total ? `<span class="${met ? "met" : ""}">${p} %${met ? " · objetivo" : ""}</span>` : '<span class="hint">Marca cada repetición</span>'}`;
  }


  function renderRating(e) {
    const total = guide.hits + guide.misses;
    const best = bestTime();
    const time = levelTime();
    const met = isMet();
    const faces = [1, 2, 3].map((k) => {
      const r = RATINGS[k];
      return `<button class="rate" data-action="rate" data-value="${k}" aria-pressed="${guide.rating === k}">
        <span class="face" style="background:${r.tint}"><svg viewBox="0 0 24 24" style="stroke:${r.ink}" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="${r.mouth}"/><path d="M9 9.5h.01M15 9.5h.01"/></svg></span>${r.label}</button>`;
    }).join("");
    const used = Math.round(guide.timer.used);
    return `<div class="celebrate"><h3>¡Sesión terminada!</h3><p>¿Cómo le ha ido a ${esc(state.dog)}?</p></div>
      <div class="ratings" role="group" aria-label="Valoración">${faces}</div>
      <div class="summary">
        <div class="fact"><small>Tiempo</small><b>${used ? clock(used) : "—"}</b></div>
        <div class="fact"><small>Aciertos</small><b>${guide.hits}${total ? ` / ${total} · ${percent(guide.hits, total)} %` : ""}</b></div>
        ${best ? `<div class="fact"><small>${time && time.kind === "under" ? "Mejor tiempo" : "Mejor aguante"}</small><b>${clock(best, true)}</b></div>` : ""}
      </div>
      ${total >= MIN_REPS && guide.hits / total >= PASS_RATE ? `<div class="note note-ok" style="margin-top:10px"><b>Regla del 80 %</b>¡${guide.hits} de ${total}! ${esc(state.dog)} está lista para subir de nivel.</div>` : ""}
      <button class="met-toggle" data-action="met" aria-pressed="${met}"><span aria-hidden="true">${met ? "✓" : ""}</span>
        <div><b>Ha cumplido el objetivo del nivel ${guide.level}</b>${txt(e.levels[guide.level - 1].goal)}</div></button>
      <h3 class="h3">Dónde ha fallado</h3>${renderFails(e, guide.log)}
      <h3 class="h3"><label for="note">Notas (opcional)</label></h3>
      <textarea class="notes-input" id="note" maxlength="300" placeholder="Qué funcionó, en qué se distrajo, qué premio usaste…">${esc(guide.note)}</textarea>
      <div class="finish">
        <button class="btn btn-block" data-action="save"${guide.rating ? "" : " disabled"}>${queue && queue.index + 1 < queue.ids.length ? "Guardar y siguiente ejercicio" : "Guardar sesión"}</button>
        ${guide.rating ? "" : '<p class="lead" style="text-align:center;margin:8px 0 0">Elige primero cómo le ha ido.</p>'}
        ${queue && queue.index + 1 < queue.ids.length ? '<p class="lead" style="text-align:center;margin:8px 0 0">Antes del siguiente: 1 min de juego o descanso.</p>' : ""}
        <div class="nav"><button data-action="back">Volver a los pasos</button></div>
      </div>`;
  }

  /* Temporizador de la sesión */
  function paintTimer() {
    const el = $("#timer");
    if (!el || !guide) return;
    const t = guide.timer;
    const c = guide.chrono;
    const both = levelTime() && !(t.running && c.running)
      ? `<button class="both-btn" data-action="both" title="Inicia la sesión y el cronómetro a la vez">▶ Los dos</button>` : "";
    el.innerHTML = `<span>Sesión</span><b>${clock(t.left)}</b>${bar(Math.round((t.left / t.total) * 100))}
      <button class="btn btn-soft" data-action="timer">${t.running ? "Pausar" : t.left < t.total ? "Seguir" : "Iniciar"}</button>${both}`;
  }


  function toggleTimer() {
    const t = guide.timer;
    if (t.running) { clearInterval(t.handle); t.running = false; paintTimer(); return; }
    if (t.left <= 0) t.left = t.total;
    t.running = true;
    let last = Date.now();
    t.handle = setInterval(() => {
      const now = Date.now();
      const dt = (now - last) / 1000;
      last = now;
      t.left = Math.max(0, t.left - dt);
      t.used += dt;
      if (t.left <= 0) {
        clearInterval(t.handle);
        t.running = false;
        beep();
        toast("¡Tiempo! Termina con algo fácil");
      }
      paintTimer();
    }, 250);
    paintTimer();
  }

  /* Cronómetro del objetivo (solo en niveles con tiempo) */
  function paintChrono() {
    const el = $("#chrono");
    const time = levelTime();
    if (!el || !guide || !time) return;
    const c = guide.chrono;
    const shown = c.running ? c.current : bestTime() || c.current;
    const met = timeMet(time, c.running ? (time.kind === "under" ? 0 : c.current) : bestTime());
    const fill = clamp((c.running ? c.current : shown) / time.sec, 0, 1);
    el.classList.toggle("is-met", met);
    el.innerHTML = `<div><span>Objetivo ${time.kind === "under" ? "≤" : "≥"} ${clock(time.sec)}</span><output>${clock(shown, true)}</output>
        ${bar(Math.round(fill * 100))}${c.attempts.length ? `<small>Mejor: ${clock(bestTime(), true)}</small>` : ""}</div>
      <button class="chrono-btn${c.running ? " is-running" : ""}" data-action="chrono">${c.running ? "Parar" : "Iniciar"}</button>`;
  }

  function stopChrono(silent) {
    const c = guide.chrono;
    clearInterval(c.handle);
    c.running = false;
    c.attempts.push(c.current);
    if (!silent) paintChrono();
  }
  function toggleChrono() {
    const c = guide.chrono;
    if (c.running) { stopChrono(); paintTimer(); return; }
    const time = levelTime();
    c.running = true;
    c.current = 0;
    c.start = Date.now();
    c.alerted = false;
    c.handle = setInterval(() => {
      c.current = (Date.now() - c.start) / 1000;
      if (time.kind === "hold" && !c.alerted && c.current >= time.sec) { c.alerted = true; beep(); }
      paintChrono();
    }, 100);
    paintChrono();
    paintTimer();
  }

  function mark(hit) {
    if (hit) guide.hits++; else guide.misses++;
    guide.log.push([hit ? 1 : 0, guide.rep, guide.step]);
    refreshCounter();
  }

  function undoMark() {
    const last = guide.log.pop();
    if (!last) return;
    if (last[0]) guide.hits--; else guide.misses--;
    refreshCounter();
    toast(last[0] ? "Deshecho: un «Bien» menos" : "Deshecho: un «Fallo» menos");
  }

  function refreshCounter() {
    $("#score").innerHTML = scoreText();
    $(".undo-btn").disabled = !guide.log.length;
    const pyramid = $("#pyramid");
    if (pyramid) pyramid.innerHTML = renderPyramid(BY_ID[guide.id], guide.rep, guide.log);
  }


  function saveSession() {
    const e = BY_ID[guide.id];
    const noteField = $("#note");
    if (noteField) guide.note = noteField.value.trim().slice(0, 300);
    const before = { level: levelsDone(e.id), global: globalLevel(), complete: programComplete() };
    const met = isMet();
    state.sessions.push(cleanSession({
      id: Date.now().toString(36), t: new Date().toISOString(), ex: e.id, lv: guide.level, ok: met,
      rating: guide.rating, rewards: guide.hits, miss: guide.misses, log: guide.log,
      hold: Math.round(bestTime() * 10) / 10,
      secs: guide.timer.used >= 30 ? Math.round(guide.timer.used) : e.minutes * 60,
      note: guide.note,
    }));
    const message = globalLevel() > before.global || (!before.complete && programComplete())
      ? `¡${state.dog} sube al nivel ${globalLevel()}!`
      : levelsDone(e.id) > before.level ? `Nivel ${levelsDone(e.id)} superado en «${e.name.replace("{dog}", state.dog)}»`
      : met ? "Sesión guardada · objetivo cumplido" : "Sesión guardada";

    if (queue && queue.index + 1 < queue.ids.length) {
      queue.index++;
      save(message);
      render();
      startExercise(queue.ids[queue.index]);
      return;
    }
    closeOverlay();
    render();
    save(message);
    afterSessionBackup();
  }

  /* =========================================================
     Copias de seguridad
     ========================================================= */
  let pendingRestore = null;
  let backupBusy = false;

  const backupJson = () => JSON.stringify({ app: "maya-entreno", exported: new Date().toISOString(), state }, null, 1);

  function renderBackup() {
    const b = state.backup || {};
    const intro = platform.mcp
      ? "Tus datos se guardan en tu cuenta. Además, una vez al día, al guardar la primera sesión, se copia en tu Google Drive (carpeta «Maya Entreno · copias»)."
      : "Tus datos se guardan en este dispositivo. Descarga una copia de vez en cuando y guárdala en Drive o en tu ordenador.";
    const confirm = pendingRestore ? `<div class="note note-gap" style="margin-top:12px"><b>¿Restaurar esta copia?</b>
        Se sustituirán tus datos actuales por la copia (${pendingRestore.sessions.length} sesiones).
        <div class="backup-actions"><button class="btn" data-action="restore-yes">Sí, restaurar</button><button class="btn btn-soft" data-action="restore-no">Cancelar</button></div></div>` : "";
    return `<div class="card card-pad" style="margin-top:18px"><h3 class="card-title">Copia de seguridad</h3>
      <p class="lead" style="margin:0">${intro}</p>
      <p class="lead" style="margin:8px 0 0">Última copia: <b>${b.last ? relativeDay(`${b.last}T12:00:00`) : "ninguna todavía"}</b></p>
      ${b.error ? `<p class="error-text">${esc(b.error)}</p>` : ""}
      <div class="backup-actions">
        ${platform.mcp ? `<button class="btn" data-action="backup-drive"${backupBusy ? " disabled" : ""}>${backupBusy ? "Guardando…" : "Copiar a Google Drive ahora"}</button>` : ""}
        <button class="btn btn-soft" data-action="backup-download">Descargar copia</button>
        <label class="btn btn-soft">Restaurar copia<input type="file" id="restore-file" accept=".json,application/json" class="visually-hidden"></label>
      </div>${confirm}</div>`;
  }

  function markBackup() {
    state.backup = state.backup || {};
    state.backup.last = dayKey(today());
    state.backup.error = "";
  }

  function downloadBackup() {
    const filename = `maya-entreno-${dayKey(today())}.json`;
    if (platform.downloads) {
      platform.downloads.save({ filename, data: backupJson() })
        .then(() => { markBackup(); save("Copia descargada"); render(); })
        .catch(() => toast("Descarga cancelada"));
      return;
    }
    const url = URL.createObjectURL(new Blob([backupJson()], { type: "application/json" }));
    const link = Object.assign(document.createElement("a"), { href: url, download: filename });
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    markBackup();
    save("Copia descargada");
    render();
  }

  function driveError(err) {
    switch (err && err.code) {
      case "server_not_connected": return "Conecta Google Drive en los conectores de claude.ai.";
      case "needs_reauth": return "Vuelve a conectar Google Drive en los conectores de claude.ai.";
      case "approval_required":
      case "not_in_manifest": return "Permite el acceso a Google Drive cuando te lo pregunte.";
      case "blocked_by_policy": return "Tu organización no permite usar Google Drive desde aquí.";
      default: return "No se pudo confirmar la copia. Revisa tu Drive antes de volver a intentarlo.";
    }
  }

  function backupToDrive(auto) {
    if (!platform.mcp || backupBusy) return;
    backupBusy = true;
    state.backup = state.backup || {};
    const create = (args) => platform.mcp.callTool("Google Drive", "create_file", args, { cache: false });
    const folder = state.backup.folder
      ? Promise.resolve(state.backup.folder)
      : create({ title: "Maya Entreno · copias", contentMimeType: "application/vnd.google-apps.folder" }).then((r) => {
          const p = r.payload || {};
          state.backup.folder = p.id || (p.file && p.file.id) || "";
          return state.backup.folder;
        });
    folder
      .then((parentId) => create({
        title: `maya-entreno-${dayKey(today())}.json`, textContent: backupJson(), contentMimeType: "application/json",
        disableConversionToGoogleType: true, ...(parentId ? { parentId } : {}),
      }))
      .then(() => { backupBusy = false; markBackup(); save(auto ? "Copia diaria guardada en Google Drive" : "Copia guardada en Google Drive"); render(); })
      .catch((err) => { backupBusy = false; state.backup.error = driveError(err); render(); toast("La copia no se ha podido hacer"); });
  }

  function afterSessionBackup() {
    const last = state.backup && state.backup.last;
    if (platform.mcp) {
      if (last !== dayKey(today())) backupToDrive(true);
      return;
    }
    const age = last ? (Date.now() - new Date(`${last}T12:00:00`).getTime()) / 864e5 : Infinity;
    if (state.sessions.length >= 3 && age > BACKUP_REMINDER_DAYS) {
      setTimeout(() => toast("Hace más de 7 días sin copia: descárgala en Progreso"), 2600);
    }
  }

  function readRestoreFile(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        const raw = parsed && parsed.state ? parsed.state : parsed;
        if (!raw || !Array.isArray(raw.sessions)) throw new Error("formato");
        pendingRestore = cleanState(raw);
        const dropped = raw.sessions.length - pendingRestore.sessions.length;
        render();
        toast(dropped ? `Copia leída: ${dropped} registros dañados se descartarán` : `Copia leída: ${pendingRestore.sessions.length} sesiones`);
      } catch {
        toast("Ese archivo no es una copia válida");
      }
    };
    reader.readAsText(file);
  }

  /* =========================================================
     Eventos
     ========================================================= */
  function setView(next) {
    view = next;
    if (location.hash.slice(1) !== next) history.replaceState(null, "", `#${next}`);
    render();
    window.scrollTo({ top: 0 });
  }

  function changeRoutine(id, step, toggle) {
    const key = dayKey(today());
    const day = state.daily[key] || (state.daily[key] = {});
    day[id] = toggle ? (day[id] ? 0 : 1) : Math.max(0, (day[id] || 0) + step);
    render();
    save();
  }

  function deleteSession(button, id) {
    if (!button.classList.contains("is-armed")) {
      button.classList.add("is-armed");
      button.textContent = "¿Seguro?";
      setTimeout(() => { button.classList.remove("is-armed"); button.textContent = "Borrar"; }, 2500);
      return;
    }
    state.sessions = state.sessions.filter((s) => s.id !== id);
    render();
    save("Sesión borrada");
  }

  const actions = {
    view: (v) => setView(v),
    goal: (v) => {
      state.goal = v;
      render();
      save();
      const planEl = $("#plan");
      if (planEl) planEl.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    filter: (v) => { libraryFilter = v; render(); },
    train: () => startQueue(),
    detail: (v) => openDetail(v),
    levels: () => { levelsTab = globalLevel(); openLevels(); },
    "levels-tab": (v) => { levelsTab = +v; openLevels(); },
    start: (v) => startExercise(v),
    close: () => closeOverlay(),
    "routine-step": (v, el) => changeRoutine(v, +el.dataset.step, false),
    "routine-toggle": (v) => changeRoutine(v, 0, true),
    delete: (v, el) => deleteSession(el, v),
    prev: () => { if (guide.step > 0) { guide.step--; renderGuide(); } },
    next: () => {
      const e = BY_ID[guide.id];
      if (guide.step < e.steps.length - 1) { guide.step++; renderGuide(); return; }
      stopGuideTimers();
      guide.phase = "rate";
      renderGuide();
    },
    back: () => { keepNote(); guide.phase = "steps"; renderGuide(); },
    hit: () => mark(true),
    miss: () => mark(false),
    undo: () => undoMark(),
    pyramid: (v) => { guide.rep = +v; $("#pyramid").innerHTML = renderPyramid(BY_ID[guide.id], guide.rep, guide.log); },
    timer: () => toggleTimer(),
    both: () => {
      if (!guide.timer.running) toggleTimer();
      if (levelTime() && !guide.chrono.running) toggleChrono();
    },
    chrono: () => toggleChrono(),
    rate: (v) => { keepNote(); guide.rating = +v; renderGuide(); },
    met: () => { keepNote(); guide.metManual = !isMet(); renderGuide(); },
    save: () => { if (guide.rating) saveSession(); },
    "backup-drive": () => backupToDrive(false),
    "backup-download": () => downloadBackup(),
    "restore-yes": () => {
      const keep = state.backup;
      state = pendingRestore;
      state.backup = keep;
      pendingRestore = null;
      render();
      save("Copia restaurada");
    },
    "restore-no": () => { pendingRestore = null; render(); },
  };

  function keepNote() {
    const field = $("#note");
    if (field && guide) guide.note = field.value;
  }

  document.addEventListener("click", (ev) => {
    const el = ev.target.closest("[data-action]");
    if (!el || el.disabled) return;
    const run = actions[el.dataset.action];
    if (run) run(el.dataset.value, el);
  });

  document.addEventListener("toggle", (ev) => {
    if (guide && ev.target.classList && ev.target.classList.contains("tip-box")) guide.tipOpen = ev.target.open;
  }, true);

  document.addEventListener("change", (ev) => {
    if (ev.target.id === "restore-file" && ev.target.files[0]) readRestoreFile(ev.target.files[0]);
  });

  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && !$("#overlay").hidden) { closeOverlay(); return; }
    if (!guide || guide.phase !== "steps") return;
    const typing = /^(INPUT|TEXTAREA)$/.test(ev.target.tagName);
    if (typing) return;
    if (ev.code === "Space") {
      ev.preventDefault();
      const marker = $("#marker");
      marker.classList.add("is-hit");
      setTimeout(() => marker.classList.remove("is-hit"), 90);
      mark(true);
    } else if (ev.key === "n" || ev.key === "N") {
      mark(false);
    } else if (ev.key === "z" || ev.key === "Z" || ev.key === "Backspace") {
      undoMark();
    } else if (ev.key === "ArrowRight") {
      actions.next();
    } else if (ev.key === "ArrowLeft") {
      actions.prev();
    }
  });

  window.addEventListener("hashchange", () => {
    const next = location.hash.slice(1);
    if (VIEWS.includes(next) && next !== view) { view = next; render(); }
  });

  /* =========================================================
     Arranque
     ========================================================= */
  function boot() {
    document.body.insertAdjacentHTML("beforeend",
      '<div class="overlay" id="overlay" hidden></div><div class="toast" id="toast" role="status" aria-live="polite"></div>');
    render();

    // En Claude: guardado en la página, Google Drive y descargas. En la app instalada no existen.
    if (window.claude && typeof window.claude.use === "function") {
      const use = (name, key) => window.claude.use(name)
        .then((ns) => { platform[key] = ns; if (ns && view === "progreso") render(); })
        .catch(() => {});
      use("artifact", "artifact");
      use("mcp", "mcp");
      use("downloads", "downloads");
    }
  }

  boot();
})();

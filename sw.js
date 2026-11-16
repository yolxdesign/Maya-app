/* Service worker: guarda la app en el móvil para abrirla sin conexión.
   Estrategia: responde al instante con la copia guardada y la actualiza en segundo plano.
   Sube VERSION al publicar cambios para limpiar las copias antiguas. */
"use strict";
const VERSION = "maya-v4";
const APP_FILES = [
  "./", "index.html", "css/styles.css", "js/data.js", "js/app.js", "js/pwa.js",
  "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-180.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(APP_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  const cacheable = url.origin === location.origin || url.hostname.endsWith("fonts.googleapis.com") || url.hostname.endsWith("fonts.gstatic.com");
  if (!cacheable) return;
  event.respondWith(
    caches.open(VERSION).then(async (cache) => {
      const cached = await cache.match(request, { ignoreSearch: true });
      const network = fetch(request)
        .then((response) => {
          if (response && (response.ok || response.type === "opaque")) cache.put(request, response.clone());
          return response;
        })
        .catch(async () => cached || (request.mode === "navigate" && (await cache.match("index.html"))) || Response.error());
      return cached || network;
    })
  );
});

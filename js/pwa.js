/* Registro del service worker: permite instalar la app y usarla sin conexión. */
"use strict";
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

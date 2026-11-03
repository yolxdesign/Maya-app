const C="maya-v1";const A=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-180.png","https://fonts.googleapis.com/css2?family=Nunito:wght@500;700;800;900&display=swap"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A.filter(u=>!u.startsWith("http")))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html"))))});

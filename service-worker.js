const CACHE='guia-rj-2026-v10.2-github';
const BASE=new URL('./', self.location.href);
const asset=(p)=>new URL(p, BASE).href;
const SHELL=['./','./index.html','./manifest.webmanifest','./offline.html','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png'].map(asset);

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin) return;

  if(req.mode==='navigate'){
    e.respondWith(
      fetch(req)
        .then(r=>{
          if(r.ok){
            const copy=r.clone();
            caches.open(CACHE).then(c=>c.put(asset('./index.html'),copy));
          }
          return r;
        })
        .catch(()=>caches.match(asset('./index.html')).then(r=>r||caches.match(asset('./offline.html'))))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(cached=>cached||fetch(req).then(r=>{
      if(r.ok){
        const copy=r.clone();
        caches.open(CACHE).then(c=>c.put(req,copy));
      }
      return r;
    }))
  );
});

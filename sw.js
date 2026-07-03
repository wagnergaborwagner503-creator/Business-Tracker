// Trackly – Service Worker v2
const CACHE = 'biztracker-v2';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = e.request.url;

  // App shell: mindig friss hálózatról
  if (url.endsWith('/') || url.endsWith('/index.html') || url.endsWith('/sw.js') || url.endsWith('/manifest.json')) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' }).then(resp => {
        if (resp && resp.status === 200) {
          const cloned = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, cloned));
        }
        return resp;
      }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // CDN assetek: cache-first
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (resp && resp.status === 200 && resp.type !== 'opaque') {
          const cloned = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, cloned));
        }
        return resp;
      }).catch(() => cached);
    })
  );
});

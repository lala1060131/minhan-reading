const CACHE = 'minhan-reading-v1';
const ASSETS = [
  '/minhan-reading/',
  '/minhan-reading/index.html',
  '/minhan-reading/unit1.html',
  '/minhan-reading/unit2.html',
  '/minhan-reading/unit3.html',
  '/minhan-reading/unit4.html',
  '/minhan-reading/unit5.html',
  '/minhan-reading/unit6.html',
  '/minhan-reading/unit7.html',
  '/minhan-reading/unit8.html',
  '/minhan-reading/unit9.html',
  '/minhan-reading/unit10.html',
  '/minhan-reading/icon-192.png',
  '/minhan-reading/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/minhan-reading/')))
  );
});

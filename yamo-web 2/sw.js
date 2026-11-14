/* Service worker : permet d'installer Yamo comme une app et de l'ouvrir hors connexion */
const CACHE = 'yamo-v4';
const FILES = [
  './', './index.html', './app.html', './auth.html',
  './css/style.css',
  './js/config.js', './js/data.js', './js/app.js', './js/auth.js', './js/moderation.js', './js/countries.js',
  './admin.html',
  './manifest.webmanifest',
  './assets/logo-192.png', './assets/logo-512.png', './assets/favicon.svg', './assets/apple-touch-icon.png'
];
/* On met chaque fichier en cache individuellement : un fichier manquant
   ne bloque plus l'installation (utile si une image est renommée). */
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(
    FILES.map((f) => c.add(f).catch(() => null))
  )).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
      if (res && res.status === 200 && e.request.url.startsWith(location.origin)) {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match('./app.html')))
  );
});

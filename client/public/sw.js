const CACHE_NAME = 'pooja-travels-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/src/App.jsx',
  '/src/index.css',
  '/manifest.json',
  '/favicon.ico'
];

// Install Event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching App Shell');
      return cache.addAll(ASSETS_TO_CACHE).catch(err => console.log('Caching failed:', err));
    })
  );
});

// Activate Event
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch Event (Offline support: cache first, fallback to network)
self.addEventListener('fetch', (e) => {
  // Only intercept HTTP/HTTPS queries (skip chrome-extension, etc.)
  if (e.request.url.startsWith('http')) {
    e.respondWith(
      caches.match(e.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(e.request).then((networkResponse) => {
          // Check if response is valid
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          
          // Cache the fetched file for future offline use
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache);
          });
          
          return networkResponse;
        }).catch(() => {
          // If offline and request is HTML, return cache root
          if (e.request.headers.get('accept').includes('text/html')) {
            return caches.match('/');
          }
        });
      })
    );
  }
});

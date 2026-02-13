// Unique cache name for this app version; update for new releases to clear old caches.
const CACHE_NAME = 'coastguard-v1';

// List of essential files/URLs to cache for offline functionality.
// Includes the app itself and Leaflet dependencies via CDN.
const urlsToCache = [
  './',
  './index.html',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
  // Add custom CSS/JS files or icons if separated in future.
];

// Install event listener: Opens the cache and adds all specified URLs.
// This runs when the service worker is first registered.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event listener: Intercepts network requests and serves from cache if available.
// Falls back to network if not cached, enabling offline map viewing (though data fetches may fail).
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
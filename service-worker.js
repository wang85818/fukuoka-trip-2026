const CACHE_NAME = 'fukuoka-trip-v3';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icon.svg',
    './src/css/main.css',
    './src/css/tabs.css',
    './src/css/map.css',
    './src/data/data.js',
    './src/js/app.js',
    './src/js/map.js',
    './src/js/optimize.js',
    './src/js/render.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

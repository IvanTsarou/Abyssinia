// Service Worker для офлайн работы
// Версия кэша — обновите при изменении контента
const CACHE_VERSION = 'east-africa-v4';

// Файлы для кэширования при установке
const PRECACHE_URLS = [
  '/',
  '/overview.html',
  '/journey.html',
  '/uganda.html',
  '/rwanda.html',
  '/burundi.html',
  '/index.html',
  '/location.html',
  '/map-fullscreen.html',
  '/overview-map-fullscreen.html',
  '/uganda-map-fullscreen.html',
  '/rwanda-map-fullscreen.html',
  '/burundi-map-fullscreen.html',
  '/uganda-map.html',
  '/rwanda-map.html',
  '/burundi-map.html',
  '/uganda-location.html',
  '/rwanda-location.html',
  '/burundi-location.html',
  '/ethiopia-location.html',
  '/css/styles.css',
  '/js/main.js',
  '/js/locations-data.js',
  '/js/ethiopia-data.js',
  '/js/uganda-data.js',
  '/js/rwanda-data.js',
  '/js/burundi-data.js',
  '/js/overview-data.js',
  '/js/navigation.js',
  '/manifest.json'
];

// Внешние ресурсы для кэширования
const EXTERNAL_URLS = [
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
];

// Установка Service Worker
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => {
        console.log('[SW] Caching app shell');
        // Кэшируем локальные файлы
        return cache.addAll(PRECACHE_URLS)
          .then(() => {
            // Пытаемся кэшировать внешние ресурсы (не критично если не получится)
            return Promise.allSettled(
              EXTERNAL_URLS.map(url => 
                fetch(url, { mode: 'cors' })
                  .then(response => {
                    if (response.ok) {
                      return cache.put(url, response);
                    }
                  })
                  .catch(() => console.log('[SW] Could not cache:', url))
              )
            );
          });
      })
      .then(() => self.skipWaiting())
  );
});

// Активация — очистка старых кэшей
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_VERSION)
            .map(name => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Стратегия: Cache First, затем Network
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Пропускаем не-GET запросы
  if (event.request.method !== 'GET') return;
  
  // Для тайлов карты — Network First с кэшированием
  if (url.hostname.includes('tile.openstreetmap.org')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(CACHE_VERSION + '-tiles')
            .then(cache => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }
  
  // Для остальных ресурсов — Cache First
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Возвращаем из кэша, но обновляем в фоне
          fetch(event.request)
            .then(response => {
              if (response.ok) {
                caches.open(CACHE_VERSION)
                  .then(cache => cache.put(event.request, response));
              }
            })
            .catch(() => {});
          
          return cachedResponse;
        }
        
        // Если нет в кэше — загружаем из сети
        return fetch(event.request)
          .then(response => {
            // Кэшируем успешные ответы
            if (response.ok && response.type === 'basic') {
              const responseClone = response.clone();
              caches.open(CACHE_VERSION)
                .then(cache => cache.put(event.request, responseClone));
            }
            return response;
          })
          .catch(() => {
            // Офлайн fallback для HTML страниц
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/overview.html');
            }
          });
      })
  );
});

// Сообщение для обновления кэша
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data === 'cachePhotos') {
    // Кэширование фотографий по запросу
    caches.open(CACHE_VERSION + '-photos')
      .then(cache => {
        const photoUrls = [];
        for (let i = 1; i <= 20; i++) {
          photoUrls.push(`/photos/${i}.jpg`);
        }
        return cache.addAll(photoUrls);
      })
      .then(() => {
        self.clients.matchAll().then(clients => {
          clients.forEach(client => client.postMessage('photosCached'));
        });
      });
  }
});

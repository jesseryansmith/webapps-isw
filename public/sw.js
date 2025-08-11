// Service Worker for iOS Shortcut Wizard
// Provides offline functionality and performance improvements

const CACHE_NAME = 'ios-shortcut-wizard-v1';
const RUNTIME_CACHE = 'runtime-cache-v1';

// Critical resources to cache immediately
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/src/main.js',
  '/src/style.css',
  '/src/iphone-ui.css',
  '/manifest.json'
];

// Runtime cache for API calls and dynamic content
const RUNTIME_CACHE_PATTERNS = [
  /^https:\/\/fonts\.googleapis\.com/,
  /^https:\/\/fonts\.gstatic\.com/,
  /\/images\//,
  /\/assets\//
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  console.log('📦 Service Worker installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('🗂️ Caching critical assets');
        return cache.addAll(CRITICAL_ASSETS);
      })
      .then(() => {
        console.log('✅ Critical assets cached');
        // Force activation of new service worker
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activating...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker activated');
        // Take control of all pages
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle navigation requests (HTML)
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match('/')
        .then((response) => {
          return response || fetch(request);
        })
        .catch(() => {
          // Offline fallback
          return caches.match('/');
        })
    );
    return;
  }

  // Handle asset requests
  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) {
          console.log('🎯 Cache hit:', url.pathname);
          return response;
        }

        // Check if should be runtime cached
        const shouldRuntimeCache = RUNTIME_CACHE_PATTERNS.some(pattern =>
          pattern.test(request.url)
        );

        if (shouldRuntimeCache) {
          return fetch(request)
            .then((response) => {
              // Cache successful responses
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(RUNTIME_CACHE)
                  .then((cache) => {
                    cache.put(request, responseClone);
                  });
              }
              return response;
            })
            .catch(() => {
              // Try runtime cache as fallback
              return caches.match(request);
            });
        }

        // Default: network only
        return fetch(request);
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Background sync triggered');
    event.waitUntil(
      // Handle offline user actions
      handleBackgroundSync()
    );
  }
});

async function handleBackgroundSync() {
  // Handle any queued actions from when user was offline
  try {
    // Example: sync user preferences
    const preferences = await getStoredPreferences();
    if (preferences.pendingSync) {
      await syncPreferences(preferences);
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

async function getStoredPreferences() {
  // Implementation would depend on your storage strategy
  return {};
}

async function syncPreferences(preferences) {
  // Implementation for syncing preferences
  console.log('Syncing preferences:', preferences);
}

// Push notification handling (if needed in future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/images/icon-192.png',
      badge: '/images/badge.png',
      data: data.data
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    self.clients.openWindow('/')
  );
});

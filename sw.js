/* MKT Live app-shell service worker.
   Caches only same-origin static files. Never caches quotes,
   candle API responses, or other third-party market data. */
var CACHE_NAME = "mkt-live-shell-v3";
var SHELL_URLS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-192-maskable.png",
  "./icons/icon-512-maskable.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(SHELL_URLS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  var request = event.request;
  if (request.method !== "GET") return;

  var url;
  try {
    url = new URL(request.url);
  } catch (err) {
    return;
  }

  // Never intercept cross-origin traffic (CNBC quotes, Twelve Data).
  if (url.origin !== self.location.origin) return;

  if (url.protocol === "ws:" || url.protocol === "wss:") return;
  if ((request.headers.get("upgrade") || "").toLowerCase() === "websocket") return;

  event.respondWith(networkFirstShell(request));
});

function networkFirstShell(request) {
  return fetch(request).then(function (response) {
    if (response && response.ok) {
      var copy = response.clone();
      caches.open(CACHE_NAME).then(function (cache) {
        cache.put(request, copy);
      }).catch(function () {});
    }
    return response;
  }).catch(function () {
    return caches.match(request, { ignoreSearch: true }).then(function (cached) {
      if (cached) return cached;
      if (request.mode === "navigate") {
        return caches.match("./index.html");
      }
      return Promise.reject(new Error("offline and uncached"));
    });
  });
}

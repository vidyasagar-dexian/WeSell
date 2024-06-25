// self.addEventListener("install", (event) => {
//     console.log("Service worker installed.");
//     event.waitUntil(
//         caches.open("static")
//             .then((cache) => {
//                 return cache.addAll([
//                     '/',
//                     '/index.html',
//                     '/src/Pages/Dashboard.js',
//                     '/src/Pages/LogIn.js',
//                     '/src/Pages/NotFound.js',
//                     '/src/Pages/Profile.js',
//                     '/src/Services/AuthServices.js',
//                     '/src/Services/ProductServices.js',
//                     '/src/App.js',
//                     '/src/App.css',
//                     '/src/index.js',
//                 ]);
//             })
//     );
//     self.skipWaiting();
// });

// self.addEventListener("activate", (event) => {
//     console.log("Service worker activated.");
//     // Clean up old caches if needed
//     event.waitUntil(
//         caches.keys().then((cacheNames) => {
//             return Promise.all(
//                 cacheNames.filter((cacheName) => {
//                     // Return true if you want to remove this cache
//                     return cacheName.startsWith("static") && cacheName !== "static";
//                 }).map((cacheName) => {
//                     return caches.delete(cacheName);
//                 })
//             );
//         })
//     );
// });

// self.addEventListener("fetch", (event) => {
//     event.respondWith(
//         caches.match(event.request)
//             .then((response) => {
//                 // Cache hit - return response
//                 if (response) {
//                     return response;
//                 }

//                 // Clone the request to make sure it's safe to read
//                 let fetchRequest = event.request.clone();

//                 return fetch(fetchRequest)
//                     .then((response) => {
//                         // Check if we received a valid response
//                         if (!response || response.status !== 200 || response.type !== 'basic') {
//                             return response;
//                         }

//                         // Clone the response to use it and cache it
//                         let responseToCache = response.clone();

//                         caches.open("static")
//                             .then((cache) => {
//                                 cache.put(event.request, responseToCache);
//                             });

//                         return response;
//                     });
//             })
//     );
// });

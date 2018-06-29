let cacheName = 'currency-converter-v1';
let contentToCache = [
    '/',
    '/index.html',
    '/main.js',
    '/CSS/style.css',
];

self.addEventListener('install', (event)=> {
    console.log("[serviceWorker] installed")
    event.waitUntil(
        caches.open(cacheName).then((cache)=> {
            console.log("[serviceWorker] caching files");
            return cache.addAll([contentToCache]);
        })
    );
});

self.addEventListener('activated', (event)=> {
    console.log("[serviceWorker] activated")
    event.waitUntil(
        caches.keys().then((cacheNames)=>{
            return Promise.all(cacheNames.map((thisCacheName)=>{
                if (thisCacheName !== cacheName)
                console.log("[serviceWorker] removing cache from ", thisCacheName)
                return caches.delete(thisCacheName);
            }))
        })
    )
});

self.addEventListener('fetch', (event)=> {
    console.log("[serviceWorker] fetching ");
    event.respondWith(
        caches.match(event.request).then((response)=> {
            if ( response) {
                console.log("[serviceWorker] Found in cache");
                return response;
            }
            let requestClone = event.request.clone();

            fetch(requestClone).then((response)=>{
              if (!response) {
                  console.log("[serviceWorker] no response from fetch")
                  return response;
              }
              let responseClone =  response.clone();
              caches.open(cacheName).then((cache)=>{
                 cache.put(event.request, event.responseClone);
                 return response;
              });
          }).catch((err)=>{
              console.log("[serviceWorker] Error Fetching and Caching New Data", err);
          })
      }));

})

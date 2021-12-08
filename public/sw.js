const staticCache = 'Static-v14'
const dynamicCache = 'Dynamic-cache-v14'

const assets = [
    '/',
    '/public/index.html',
    '/public/js/app.js',
    '/public/js/ui.js',
    '/public/js/materialize.min.js',
    '/public/js/db.js',
    '/public/css/app.css',
    '/public/css/materialize.min.css',
    '/public/img/lotus.svg',
    '/public/img/lotus 120x120.svg',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    '/public/pages/fallback.html',
];

//Cache size limit
const limitCacheSize = (name, size) =>{
   caches.open(name).then((cache) => {
       cache.keys().then((keys) => {
           if (keys.length > size) {
               cache.delete(keys[0]).then(limitCacheSize(name, size));
           }
       })
   }) 
}

self.addEventListener("install", function(event){
    //fires when the browser install the app
    //here we're just logging the event and the conbtents of the object passed to the event.
    //the purpose of this event is to give the service worker a place to set up the local 
    //environment after the installation completes.
    console.log(`SW: Event Fired ${event.type}`);
    event.waitUntil(
        caches.open(staticCache).then(function (cache) {
        console.log('SW: Precaching the App Shell');
        cache.addAll(assets);
    })
    );
});

self.addEventListener("activate", function(event){
    //console.log(`SW: Event Fired: ${event.type}`);
event.waitUntil(
    caches.keys().then((keys) => {
    return Promise.all(
        keys
        .filter((key) => key !== staticCache && key !== dynamicCache)
        .map((key) => caches.delete(key))
        );
    })
    );
});

self.addEventListener("fetch", function(event){
    //fires whenever the app requests a resource (file or data)
    //console.log(`SW: Fetching ${event.request.url}`);
    //next, go get requested resource from network
    if(event.request.url.indexOf("firestore.googleapis.com") === -1) {
    event.respondWith(
        caches
        .match(event.request)
        .then((response) => {
        return (
            response || 
            fetch(event.request).then(fetchRes => {
            return caches.open(dynamicCache).then((cache) => {
                cache.put(event.request.url, fetchRes.clone());
                limitCacheSize(dynamicCache, 3);
                return fetchRes;
            });
        })
        );
    })
    .catch(() => caches.match("/public/pages/fallback.html"))
    );
}
});


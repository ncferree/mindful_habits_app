//does the browser support the service worker?

if ('serviceWorker' in navigator) {
    //defer service worker installation until page completes loading
    window.addEventListener("load", () => {
    //then register the service worker
    navigator.serviceWorker
    .register('/public/sw.js')
    .then((reg) => {
        //display a success message
        console.log(`Service Worker Registration (Scope: ${reg.scope})`);
    })
    .catch((error) => {
        //display an error message
        console.log(`Service Worker  Error (${error})`);
    });
});
} else {
    //happens when the app isnt served over a TLS connection (HTTPS)
    //or if browser doesn't support the service worker
    console.log('Service worker not available');
};

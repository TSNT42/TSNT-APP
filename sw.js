const CACHE_NAME =
    "tsnt-app-v3";


const FILES_TO_CACHE = [

    "./",

    "./index.html",

    "./style.css?v=3",

    "./app.js?v=3",

    "./manifest.json?v=3",

    "./logo.png?v=3"

];



/* =========================
   INSTALLATION
========================= */

self.addEventListener(
    "install",
    function (event) {


        event.waitUntil(

            caches
                .open(
                    CACHE_NAME
                )

                .then(
                    function (cache) {


                        return cache.addAll(
                            FILES_TO_CACHE
                        );


                    }
                )

        );


        self.skipWaiting();


    }
);



/* =========================
   ACTIVATION
========================= */

self.addEventListener(
    "activate",
    function (event) {


        event.waitUntil(

            caches
                .keys()

                .then(
                    function (cacheNames) {


                        return Promise.all(

                            cacheNames.map(
                                function (cacheName) {


                                    if (
                                        cacheName !==
                                        CACHE_NAME
                                    ) {


                                        return caches.delete(
                                            cacheName
                                        );


                                    }


                                    return null;


                                }
                            )

                        );


                    }
                )

        );


        self.clients.claim();


    }
);



/* =========================
   REQUÊTES
========================= */

self.addEventListener(
    "fetch",
    function (event) {


        event.respondWith(

            fetch(
                event.request
            )

                .then(
                    function (response) {


                        return response;


                    }
                )

                .catch(
                    function () {


                        return caches.match(
                            event.request
                        );


                    }
                )

        );


    }
);

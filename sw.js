const CACHE_NAME = "tsnt-app-v2";

const FICHIERS_A_METTRE_EN_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json"
];


self.addEventListener(
    "install",
    function(event) {

        event.waitUntil(

            caches.open(CACHE_NAME)

                .then(function(cache) {

                    return cache.addAll(
                        FICHIERS_A_METTRE_EN_CACHE
                    );

                })

        );

        self.skipWaiting();

    }
);


self.addEventListener(
    "activate",
    function(event) {

        event.waitUntil(

            caches.keys()

                .then(function(cachesExistants) {

                    return Promise.all(

                        cachesExistants.map(
                            function(cache) {

                                if (
                                    cache !== CACHE_NAME
                                ) {

                                    return caches.delete(
                                        cache
                                    );

                                }

                            }
                        )

                    );

                })

        );

        self.clients.claim();

    }
);


self.addEventListener(
    "fetch",
    function(event) {

        event.respondWith(

            fetch(event.request)

                .catch(function() {

                    return caches.match(
                        event.request
                    );

                })

        );

    }
);

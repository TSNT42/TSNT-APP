document.addEventListener("DOMContentLoaded", function () {

    console.log("Application TSNT chargée");


    /*
     * =========================
     * SERVICE WORKER
     * =========================
     */

    if ("serviceWorker" in navigator) {

        window.addEventListener("load", function () {

            navigator.serviceWorker
                .register("./sw.js")
                .then(function (registration) {

                    console.log(
                        "Service Worker enregistré :",
                        registration.scope
                    );

                })
                .catch(function (error) {

                    console.error(
                        "Erreur Service Worker :",
                        error
                    );

                });

        });

    }


    /*
     * =========================
     * INSTALLATION PWA
     * =========================
     */

    let deferredPrompt = null;


    window.addEventListener(
        "beforeinstallprompt",
        function (event) {

            event.preventDefault();

            deferredPrompt = event;

            console.log(
                "Installation de l'application disponible"
            );

        }
    );


    window.addEventListener(
        "appinstalled",
        function () {

            console.log(
                "TSNT a été installé sur l'appareil"
            );

            deferredPrompt = null;

        }
    );


    /*
     * =========================
     * LIENS DES CARTES
     * =========================
     */

    const cards =
        document.querySelectorAll(".card");


    cards.forEach(function (card) {

        card.addEventListener(
            "click",
            function (event) {

                const href =
                    card.getAttribute("href");


                if (
                    !href ||
                    href === "#"
                ) {

                    event.preventDefault();

                }

            }
        );

    });

});

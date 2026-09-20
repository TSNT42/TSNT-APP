var API_URL =
    "https://script.google.com/macros/s/AKfycbxP3YtMQjf7trOAWgXEuRDikm8Qq-Qc2ZHHM2Ewtkj0IkwuWACU_PXUlPBrokqC24TA2A/exec";


var FORMULAIRE_INSCRIPTION =
    "https://forms.gle/oKfhgG4H2fDA8mLH6";


var ID_QUESTION_ACTIVITE =
    "913318224";



function ouvrirPage(page) {

    var pages =
        document.querySelectorAll(".page");


    pages.forEach(function(element) {

        element.classList.remove(
            "active-page"
        );

    });


    var pageSelectionnee =
        document.getElementById(
            "page-" + page
        );


    if (pageSelectionnee) {

        pageSelectionnee.classList.add(
            "active-page"
        );

    }


    var boutons =
        document.querySelectorAll(
            ".nav-item"
        );


    boutons.forEach(function(element) {

        element.classList.remove(
            "active"
        );

    });


    var bouton =
        document.getElementById(
            "nav-" + page
        );


    if (bouton) {

        bouton.classList.add(
            "active"
        );

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



function ouvrirAdhesion() {

    window.open(
        "https://docs.google.com/forms/d/e/1FAIpQLSfGZ8C4W02WViwnMBeBYD4IjiuqvF2dbeVSd1F-tll72fcXVA/viewform?usp=header",
        "_blank"
    );

}



function ouvrirInscription(activite) {

    var lien =
        FORMULAIRE_INSCRIPTION +
        "?entry." +
        ID_QUESTION_ACTIVITE +
        "=" +
        encodeURIComponent(activite);


    window.open(
        lien,
        "_blank"
    );

}



function ouvrirQuiSommesNous() {

    window.open(
        "https://sites.google.com/view/tsnt42/qui-sommes-nous",
        "_blank"
    );

}



function ouvrirReseauxSociaux() {

    window.open(
        "https://sites.google.com/view/tsnt42/nos-r%C3%A9seaux-sociaux",
        "_blank"
    );

}



function ouvrirContact() {

    window.open(
        "https://sites.google.com/view/tsnt42/nous-contacter",
        "_blank"
    );

}



function ouvrirSite() {

    window.open(
        "https://sites.google.com/view/tsnt42/",
        "_blank"
    );

}



function chargerProchaineActivite() {

    var titre =
        document.getElementById(
            "prochaine-activite-titre"
        );


    var date =
        document.getElementById(
            "prochaine-activite-date"
        );


    var lieu =
        document.getElementById(
            "prochaine-activite-lieu"
        );


    var bouton =
        document.getElementById(
            "prochaine-activite-bouton"
        );


    if (!titre) {

        return;

    }


    fetch(API_URL)

        .then(function(response) {

            if (!response.ok) {

                throw new Error(
                    "Erreur réseau"
                );

            }

            return response.json();

        })

        .then(function(data) {

            if (
                !data.disponible ||
                !data.activites ||
                data.activites.length === 0
            ) {

                titre.textContent =
                    "Aucune activité prévue";


                date.textContent =
                    "📅 Revenez bientôt pour découvrir les prochaines activités.";


                lieu.textContent =
                    "";


                bouton.style.display =
                    "none";


                return;

            }


            var activite =
                data.activites[0];


            titre.textContent =
                activite.titre;


            date.textContent =
                "📅 " + activite.debut;


            lieu.textContent =
                activite.lieu
                    ? "📍 " + activite.lieu
                    : "";


            bouton.style.display =
                "block";

        })

        .catch(function(error) {

            console.error(
                "Erreur calendrier :",
                error
            );


            titre.textContent =
                "Impossible de charger l'activité";


            date.textContent =
                "Vérifiez votre connexion.";


            lieu.textContent =
                "";


            bouton.style.display =
                "none";

        });

}



function chargerActivites() {

    var liste =
        document.getElementById(
            "liste-activites"
        );


    if (!liste) {

        return;

    }


    liste.innerHTML =
        "<p class='page-intro'>Chargement des activités...</p>";


    fetch(API_URL)

        .then(function(response) {

            if (!response.ok) {

                throw new Error(
                    "Erreur réseau"
                );

            }

            return response.json();

        })

        .then(function(data) {

            liste.innerHTML = "";


            if (
                !data.disponible ||
                !data.activites ||
                data.activites.length === 0
            ) {

                liste.innerHTML =

                    "<section class='activity-card'>" +

                    "<h3>" +
                    "Aucune activité prévue" +
                    "</h3>" +

                    "<p>" +
                    "Les prochaines activités " +
                    "seront bientôt disponibles." +
                    "</p>" +

                    "</section>";

                return;

            }


            data.activites.forEach(
                function(activite) {

                    var carte =
                        document.createElement(
                            "section"
                        );


                    carte.className =
                        "activity-card";


                    var html =

                        "<span class='activity-date'>" +

                        "📅 " +
                        activite.debut +

                        "</span>" +


                        "<h3>" +

                        activite.titre +

                        "</h3>";


                    if (activite.lieu) {

                        html +=

                            "<p>" +

                            "📍 " +
                            activite.lieu +

                            "</p>";

                    }


                    if (activite.description) {

                        html +=

                            "<p>" +

                            activite.description +

                            "</p>";

                    }


                    carte.innerHTML =
                        html;


                    var boutonInscription =
                        document.createElement(
                            "button"
                        );


                    boutonInscription.className =
                        "primary-button";


                    boutonInscription.textContent =
                        "S'inscrire";


                    boutonInscription.onclick =
                        function() {

                            ouvrirInscription(
                                activite.titre
                            );

                        };


                    carte.appendChild(
                        boutonInscription
                    );


                    liste.appendChild(
                        carte
                    );

                }
            );

        })

        .catch(function(error) {

            console.error(
                "Erreur activités :",
                error
            );


            liste.innerHTML =

                "<section class='activity-card'>" +

                "<h3>" +
                "Erreur de chargement" +
                "</h3>" +

                "<p>" +
                "Impossible de récupérer les activités pour le moment." +
                "</p>" +

                "</section>";

        });

}



document.addEventListener(
    "DOMContentLoaded",
    function() {

        chargerProchaineActivite();

        chargerActivites();

    }
);
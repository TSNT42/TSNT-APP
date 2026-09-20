// ==============================
// CONFIGURATION
// ==============================

const API_URL =
    "https://script.google.com/macros/s/AKfycbxP3YtMQjf7trOAWgXEuRDikm8Qq-Qc2ZHHM2Ewtkj0IkwuWACU_PXUlPBrokqC24TA2A/exec";

const URL_ADHESION =
    "https://docs.google.com/forms/d/e/1FAIpQLSfGZ8C4W02WViwnMBeBYD4IjiuqvF2dbeVSd1F-tll72fcXVA/viewform?usp=header";

const URL_INSCRIPTION =
    "https://forms.gle/oKfhgG4H2fDA8mLH6";

const QUESTION_ACTIVITE_ID =
    913318224;


// ==============================
// INSTALLATION PWA
// ==============================

let deferredInstallPrompt = null;


// Détection du navigateur / appareil
function estIOS() {

    return (
        /iphone|ipad|ipod/i.test(
            navigator.userAgent
        )
        ||
        (
            navigator.platform === "MacIntel"
            &&
            navigator.maxTouchPoints > 1
        )
    );

}


// Vérifie si l'application est déjà installée
function estDejaInstallee() {

    return (
        window.matchMedia(
            "(display-mode: standalone)"
        ).matches
        ||
        window.navigator.standalone === true
    );

}


// Le navigateur propose l'installation
window.addEventListener(
    "beforeinstallprompt",
    function(event) {

        event.preventDefault();

        deferredInstallPrompt =
            event;

        afficherBoutonInstallation();

    }
);


// Application installée
window.addEventListener(
    "appinstalled",
    function() {

        deferredInstallPrompt =
            null;

        masquerBoutonInstallation();

        console.log(
            "Application TSNT installée."
        );

    }
);


// Afficher le bouton d'installation
function afficherBoutonInstallation() {

    var bouton =
        document.getElementById(
            "bouton-installation"
        );

    if (!bouton) {
        return;
    }

    if (estDejaInstallee()) {

        bouton.style.display =
            "none";

        return;

    }

    bouton.style.display =
        "block";

}


// Masquer le bouton d'installation
function masquerBoutonInstallation() {

    var bouton =
        document.getElementById(
            "bouton-installation"
        );

    if (!bouton) {
        return;
    }

    bouton.style.display =
        "none";

}


// Lancement de l'installation
function installerApplication() {

    // iPhone / iPad
    if (estIOS()) {

        alert(
            "Pour ajouter TSNT à votre écran d'accueil :\n\n" +
            "1. Appuie sur le bouton Partager ⬆️\n" +
            "2. Choisis « Sur l'écran d'accueil »\n" +
            "3. Appuie sur « Ajouter »"
        );

        return;

    }


    // Si le navigateur n'a pas encore fourni
    // la fenêtre d'installation
    if (!deferredInstallPrompt) {

        alert(
            "Pour installer l'application TSNT, ouvre cette page dans Chrome ou Edge puis utilise le menu du navigateur et choisis « Installer l'application » ou « Ajouter à l'écran d'accueil »."
        );

        return;

    }


    deferredInstallPrompt
        .prompt()
        .then(
            function() {

                return deferredInstallPrompt
                    .userChoice;

            }
        )
        .then(
            function(choix) {

                console.log(
                    "Choix installation :",
                    choix.outcome
                );

                deferredInstallPrompt =
                    null;

            }
        )
        .catch(
            function(erreur) {

                console.error(
                    "Erreur installation :",
                    erreur
                );

            }
        );

}


// ==============================
// NAVIGATION
// ==============================

function afficherPage(page) {

    var pages =
        document.querySelectorAll(
            ".page"
        );

    pages.forEach(
        function(element) {

            element.classList.remove(
                "active"
            );

        }
    );


    var pageCible =
        document.getElementById(
            "page-" + page
        );

    if (pageCible) {

        pageCible.classList.add(
            "active"
        );

    }


    var boutonsNavigation =
        document.querySelectorAll(
            ".nav-button"
        );

    boutonsNavigation.forEach(
        function(element) {

            element.classList.remove(
                "active"
            );

        }
    );


    var boutonNavigation =
        document.getElementById(
            "nav-" + page
        );

    if (boutonNavigation) {

        boutonNavigation.classList.add(
            "active"
        );

    }


    window.scrollTo(
        0,
        0
    );


    if (
        page === "activites"
    ) {

        chargerActivites();

    }

}


// ==============================
// OUVERTURE DES FORMULAIRES
// ==============================

function ouvrirAdhesion() {

    window.open(
        URL_ADHESION,
        "_blank"
    );

}


function ouvrirInscription() {

    window.open(
        URL_INSCRIPTION,
        "_blank"
    );

}


// ==============================
// OUVERTURE DES PAGES DU SITE
// ==============================

function ouvrirPageSite(page) {

    var urls = {

        "qui-sommes-nous":
            "https://sites.google.com/view/tsnt42/qui-sommes-nous",

        "adhesion-reglement":
            "https://sites.google.com/view/tsnt42/adhesion-reglement",

        "activites-evenements":
            "https://sites.google.com/view/tsnt42/activites-evenements",

        "reseaux-sociaux":
            "https://sites.google.com/view/tsnt42/reseaux-sociaux",

        "contact":
            "https://sites.google.com/view/tsnt42/contact"

    };


    if (
        urls[page]
    ) {

        window.open(
            urls[page],
            "_blank"
        );

    }

}


// ==============================
// CHARGEMENT DES ACTIVITÉS
// ==============================

function chargerActivites() {

    var liste =
        document.getElementById(
            "liste-activites"
        );

    if (!liste) {
        return;
    }


    liste.innerHTML =
        '<p class="loading">Chargement des activités...</p>';


    fetch(
        API_URL
    )
        .then(
            function(response) {

                if (!response.ok) {

                    throw new Error(
                        "Erreur réseau"
                    );

                }

                return response.json();

            }
        )
        .then(
            function(data) {

                if (
                    !data
                    ||
                    !data.activites
                    ||
                    data.activites.length === 0
                ) {

                    liste.innerHTML =
                        '<p class="empty-state">Aucune activité prévue pour le moment.</p>';

                    return;

                }


                liste.innerHTML =
                    "";


                data.activites.forEach(
                    function(activite) {

                        var carte =
                            document.createElement(
                                "article"
                            );

                        carte.className =
                            "activity-card";


                        var titre =
                            document.createElement(
                                "h3"
                            );

                        titre.textContent =
                            activite.titre;


                        var informations =
                            document.createElement(
                                "div"
                            );

                        informations.className =
                            "activity-infos";


                        var date =
                            document.createElement(
                                "p"
                            );

                        date.innerHTML =
                            "📅 <strong>" +
                            activite.debut +
                            "</strong>";


                        var fin =
                            document.createElement(
                                "p"
                            );

                        fin.innerHTML =
                            "🕐 " +
                            activite.fin;


                        informations.appendChild(
                            date
                        );

                        informations.appendChild(
                            fin
                        );


                        if (
                            activite.lieu
                        ) {

                            var lieu =
                                document.createElement(
                                    "p"
                                );

                            lieu.innerHTML =
                                "📍 " +
                                activite.lieu;

                            informations.appendChild(
                                lieu
                            );

                        }


                        carte.appendChild(
                            titre
                        );

                        carte.appendChild(
                            informations
                        );


                        if (
                            activite.description
                        ) {

                            var description =
                                document.createElement(
                                    "p"
                                );

                            description.className =
                                "activity-description";

                            description.textContent =
                                activite.description;

                            carte.appendChild(
                                description
                            );

                        }


                        var bouton =
                            document.createElement(
                                "button"
                            );

                        bouton.className =
                            "primary-button";

                        bouton.textContent =
                            "📝 S'inscrire";

                        bouton.onclick =
                            function() {

                                ouvrirInscription();

                            };


                        carte.appendChild(
                            bouton
                        );


                        liste.appendChild(
                            carte
                        );

                    }
                );

            }
        )
        .catch(
            function(erreur) {

                console.error(
                    "Erreur chargement activités :",
                    erreur
                );


                liste.innerHTML =
                    '<p class="empty-state">Impossible de charger les activités pour le moment.</p>';

            }
        );

}


// ==============================
// PROCHAINE ACTIVITÉ
// ==============================

function chargerProchaineActivite() {

    var titre =
        document.getElementById(
            "prochaine-activite-titre"
        );

    var informations =
        document.getElementById(
            "prochaine-activite-infos"
        );


    if (
        !titre ||
        !informations
    ) {

        return;

    }


    fetch(
        API_URL
    )
        .then(
            function(response) {

                if (!response.ok) {

                    throw new Error(
                        "Erreur réseau"
                    );

                }

                return response.json();

            }
        )
        .then(
            function(data) {

                if (
                    !data
                    ||
                    !data.activites
                    ||
                    data.activites.length === 0
                ) {

                    titre.textContent =
                        "Aucune activité prévue";

                    informations.innerHTML =
                        "<p>Les prochaines activités seront bientôt disponibles.</p>";

                    return;

                }


                var activite =
                    data.activites[0];


                titre.textContent =
                    activite.titre;


                var html =
                    "";


                if (
                    activite.debut
                ) {

                    html +=
                        "<p>📅 " +
                        activite.debut +
                        "</p>";

                }


                if (
                    activite.fin
                ) {

                    html +=
                        "<p>🕐 " +
                        activite.fin +
                        "</p>";

                }


                if (
                    activite.lieu
                ) {

                    html +=
                        "<p>📍 " +
                        activite.lieu +
                        "</p>";

                }


                informations.innerHTML =
                    html;

            }
        )
        .catch(
            function(erreur) {

                console.error(
                    "Erreur prochaine activité :",
                    erreur
                );


                titre.textContent =
                    "Bienvenue chez TSNT";


                informations.innerHTML =
                    "<p>Découvrez nos prochaines activités.</p>";

            }
        );

}


// ==============================
// INITIALISATION
// ==============================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        chargerProchaineActivite();


        // Le bouton peut être affiché
        // si le navigateur autorise déjà
        // l'installation.
        afficherBoutonInstallation();


        // Sur iPhone / iPad,
        // afficher également le bouton
        // pour donner les instructions.
        if (
            estIOS()
            &&
            !estDejaInstallee()
        ) {

            afficherBoutonInstallation();

        }

    }
);

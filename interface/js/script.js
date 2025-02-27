// 🕹 Données des commandes par jeu
const gameCommands = [
    { // Legilimens
        keys: [
            { icon: "mouse", action: "Cliquer sur les boutons" }
        ]
    },
    { // Memory Cards
        keys: [
            { icon: "mouse", action: "Cliquer sur les cartes" }
        ]
    },
    { // LabyQuest
        keys: [
            { icon: "arrow-up", action: "Aller en haut" },
            { icon: "arrow-down", action: "Aller en bas" },
            { icon: "arrow-left", action: "Aller à gauche" },
            { icon: "arrow-right", action: "Aller à droite" }
        ]
    },
    { // AI Chess
        keys: [
            { icon: "mouse", action: "Déplacer les pièces" }
        ]
    },
    { // Pacman
        keys: [
            { key: "Espace", action: "Pause" },
            { icon: "arrow-up", action: "Aller en haut" },
            { icon: "arrow-down", action: "Aller en bas" },
            { icon: "arrow-left", action: "Aller à gauche" },
            { icon: "arrow-right", action: "Aller à droite" }
        ]
    },
    { // SpeedyVerse
        keys: [
            { key: "C", action: "Insérer une pièce" },
            { key: "M", action: "Couper le son" },
            { icon: "arrow-left", action: "Déplacer gauche" },
            { icon: "arrow-right", action: "Déplacer droite" },
            { icon: "arrow-up", action: "Accélérer" },
            { icon: "arrow-down", action: "Ralentir" }
        ]
    }
];

// 📌 Fonction pour ouvrir la popup
function openPopup(index) {
    if (index < 0 || index >= gamesData.length) {
        console.error("Index invalide pour la popup.");
        return;
    }

    const popupContainer = document.getElementById("popup-container");
    const popupImage = document.getElementById("popup-image");
    const popupTitle = document.getElementById("popup-title");
    const popupDescription = document.getElementById("popup-description");
    const popupCreator = document.getElementById("popup-creator");
    popupCreator.innerHTML = `Made by <a href="${gamesData[index].creatorLink}" target="_blank" class="creator-link">${gamesData[index].creator}</a>`;
    const playGameBtn = document.getElementById("play-game-btn");
    const commandsTable = document.getElementById("popup-commands").querySelector("tbody");

    // Remplissage des infos du jeu
    popupImage.src = gamesData[index].image;
    popupTitle.textContent = gamesData[index].title;
    popupDescription.textContent = gamesData[index].description;
    popupImage.style.borderRadius = "15px";
    playGameBtn.onclick = () => openGame(index);

    // Nettoyage du tableau des commandes
    commandsTable.innerHTML = "";
    gameCommands[index].keys.forEach(cmd => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                ${cmd.icon 
                    ? `<i data-lucide="${cmd.icon}"></i>` 
                    : `<strong class="key-box">${cmd.key}</strong>`}
            </td>
            <td>${cmd.action}</td>
        `;
        commandsTable.appendChild(row);
    });

    // 🔄 Recharge les icônes Lucide après l’ajout dynamique
    lucide.createIcons();

    popupContainer.style.display = "flex";
}

// 📌 Fonction pour fermer la popup
function closePopup() {
    document.getElementById("popup-container").style.display = "none";
}

// 📌 Fonction pour rediriger vers la page jeux.html avec un index de jeu
function redirectToJeux(index) {
    window.location.href = `jeux.html?game=${index}#popup-container`;
}

// 🔄 Vérifie si une redirection a eu lieu pour ouvrir la popup après un clic sur la page d'accueil
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("game")) {
        const gameIndex = parseInt(urlParams.get("game"));
        if (!isNaN(gameIndex)) {
            openPopup(gameIndex);
        }
    }
});

// 🚀 Ferme la popup en cliquant en dehors
window.onclick = function (event) {
    const popupContainer = document.getElementById("popup-container");
    if (event.target === popupContainer) {
        closePopup();
    }
};

// ~~~~🎠 Carrousel avec Swiper.js~~~~
var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 30 },
        1024: { slidesPerView: 4, spaceBetween: 40 }
    }
});

// ~~~~🏆 Menu Burger Responsive~~~~
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = document.querySelector('.menu-toggle i');

    navLinks.classList.toggle('active');

    if (navLinks.classList.contains('active')) {
        menuIcon.setAttribute('data-lucide', 'x');
    } else {
        menuIcon.setAttribute('data-lucide', 'menu');
    }

    lucide.createIcons();
}

// ~~~~~~🕹 Données des jeux~~~~~~
const gamesData = [
    {
        title: "Legilimens",
        image: "images/legilimens.png",
        description: "Un jeu qui lit dans ta tête et qui te retourne le cerveau !",
        link: "../Game/Legilimens/index.html",
        creator: "Prashant",
        creatorLink: "https://github.com/Praashoo7"
    },
    {
        title: "Memory Cards",
        image: "images/memorycard.png",
        description: "Un jeu de mémoire où vous devez retrouver les paires.",
        link: "../Game/MemoryCards/index.html",
        creator: "Talha",
        creatorLink: "https://github.com/he-is-talha"
    },
    {
        title: "LabyQuest",
        image: "images/labyquest.png",
        description: "Explorez et résolvez des labyrinthes générés aléatoirement.",
        link: "../Game/LabyQuest/index.html",
        creator: "Yilmazer",
        creatorLink: "https://codepen.io/Abdullah-Yilmazer"
    },
    {
        title: "AI Chess",
        image: "images/aichess.png",
        description: "Jouez aux échecs contre une intelligence artificielle.",
        link: "../Game/ChessAI/index.html",
        creator: "jak_e",
        creatorLink: "https://codepen.io/jak_e"
    },
    {
        title: "Pacman",
        image: "images/pacman.png",
        description: "Évitez les fantômes et mangez toutes les pac-gommes.",
        link: "../Game/Pacman/index.html",
        creator: "mumuy",
        creatorLink: "https://github.com/mumuy"
    },
    {
        title: "SpeedyVerse",
        image: "images/speedyverse.png",
        description: "Course en 3D avec obstacles à éviter.",
        link: "../Game/SpeedyVerse/index.html",
        creator: "KodeMeister",
        creatorLink: "https://github.com/KodeMeister-YT"
    }
];

// 🔄 Vérifie s'il y a un paramètre "game" dans l'URL
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const gameIndex = params.get("game");

    if (gameIndex !== null) {
        openPopup(parseInt(gameIndex));
    }
});

// Chargement des icônes au démarrage
document.addEventListener("DOMContentLoaded", function () {
    lucide.createIcons();
});

// 🎭 Initialisation AOS.js pour les animations
document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        duration: 800,
        easing: "ease-out-quart",
        once: true 
    });
});

// 📌 Fonction pour ouvrir la popup du jeu
function openGame(index) {
    const gamePopup = document.getElementById("game-popup");
    const gameIframe = document.getElementById("game-iframe");
    const popupContainer = document.getElementById("popup-container"); 

    // Vérification si l'index est valide
    if (index < 0 || index >= gamesData.length) {
        console.error("Index invalide pour le jeu.");
        return;
    }

    // Ajoute une transition fluide pour masquer le popup de présentation
    popupContainer.style.animation = "fadeOutScale 0.4s ease forwards";
    setTimeout(() => {
        popupContainer.style.display = "none";
        popupContainer.style.animation = "";
    }, 400);

    // Charger le jeu dans l'iframe
    gameIframe.src = gamesData[index].link;

    // Affichage de la popup en plein écran avec un effet d'apparition fluide
    gamePopup.style.display = "flex";
    gamePopup.style.animation = "fadeInScale 0.4s ease forwards";

    // Ajout d'un délai pour éviter les bugs d'affichage
    setTimeout(() => {
        gamePopup.classList.add("visible");
    }, 50);

    // Met à jour les icônes Lucide
    lucide.createIcons();
}

// 📌 Fermer le popup en cliquant en dehors
document.addEventListener("click", function (event) {
    const gamePopup = document.getElementById("game-popup");
    if (event.target === gamePopup) {
        closeGamePopup();
    }
});

// 📌 Fonction pour fermer la popup du jeu
function closeGamePopup() {
    const gamePopup = document.getElementById("game-popup");
    const gameIframe = document.getElementById("game-iframe");

    // Supprime le lien pour arrêter le jeu
    gameIframe.src = "";
    gamePopup.style.display = "none";

    // Si le mode plein écran est activé, on le désactive en fermant la popup
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}

// 📌 Fonction pour activer/désactiver le plein écran
function toggleFullscreen() {
    const gameIframe = document.getElementById("game-iframe");

    if (!document.fullscreenElement) {
        gameIframe.requestFullscreen().catch(err => {
            console.error(`Erreur lors de l'activation du plein écran: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// 📌 Fonction pour relancer le jeu
function reloadGame() {
    const gameIframe = document.getElementById("game-iframe");

    if (gameIframe.src) {
        gameIframe.src = gameIframe.src;
    }
}

// 📌 Lier le bouton "Lancer le jeu" avec la popup
document.querySelectorAll(".play-game-btn").forEach((btn, index) => {
    btn.addEventListener("click", (event) => {
        event.stopPropagation();
        openGame(index);
    });
});

// ~~~~~~Carrousel about.html~~~~~~
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".carousel-container");
    let isDown = false;
    let startX;
    let scrollLeft;

    // 🖱️ Effet Drag & Drop pour scroller horizontalement avec la souris
    if (slider) {
        slider.addEventListener("mousedown", (e) => {
            isDown = true;
            slider.classList.add("grabbing");
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener("mouseleave", () => {
            isDown = false;
            slider.classList.remove("grabbing");
        });

        slider.addEventListener("mouseup", () => {
            isDown = false;
            slider.classList.remove("grabbing");
        });

        slider.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    // 🛠️ Fonction pour ajuster la hauteur du carrousel
    function adjustCarouselHeight() {
        let activeSlide = document.querySelector(".presentation-carousel .swiper-slide-active");
        let carousel = document.querySelector(".presentation-carousel");
        if (activeSlide && carousel) {
            // Si la slide contient un élément avec la classe "table-container", on utilise sa hauteur
            let content = activeSlide.querySelector(".table-container") || activeSlide;
            let newHeight = content.scrollHeight + 120; // On ajoute un peu d'espace (ultra important)s
            gsap.to(carousel, { height: newHeight, duration: 0.5, ease: "power2.inOut" });
        }
    }    
    
    // 🎠 Initialisation unique de Swiper.js
    var swiper = new Swiper(".presentation-carousel", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        effect: "slide",
        grabCursor: true,
        centeredSlides: true,
        speed: 600,
        on: {
            init: function () {
                setTimeout(adjustCarouselHeight, 100);
            },
            slideChangeTransitionEnd: function () {
                adjustCarouselHeight();
            }
        }
    });

    // 🔄 Vérification après chargement complet
    window.addEventListener("load", () => {
        adjustCarouselHeight();
        setTimeout(adjustCarouselHeight, 200);
    });

    // 🛠️ Empêcher le drag-scroll pendant l'utilisation des flèches
    document.querySelectorAll('.swiper-button-next, .swiper-button-prev').forEach(button => {
        button.addEventListener('click', () => {
            isDown = false;
        });
    });
});

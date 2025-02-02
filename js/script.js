$(document).ready(function() {
    // Bascule Mode Nuit/Jour
    $('#toggle-mode').click(function() {
      $('body').toggleClass('dark-mode');
    });
    
    // Animation de ScrollReveal sur certains éléments
    ScrollReveal().reveal('.section-title', { duration: 1000, origin: 'bottom', distance: '50px' });
    ScrollReveal().reveal('#custom-image', { duration: 1000, origin: 'left', distance: '100px' });
    
    // Initialisation de Rellax pour les éléments parallax
    var rellax = new Rellax('.parallax');
    
    // Chargement de l'animation Lottie pour l'effet magique
    lottie.loadAnimation({
      container: document.getElementById('lottie-magic'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'images/lottie-magic.json' // Fichier JSON de l'animation (à fournir)
    });
    
    // (Optionnel) Exemple d'animation GSAP sur l'overlay cinématique lors d'un lancement de jeu
    // Cette animation pourrait être déclenchée dans game.html lors du clic sur "Démarrer"
    /*
    $('#start-btn').click(function() {
      gsap.to('#cinematic-overlay', { opacity: 1, duration: 0.5, ease: "power2.inOut", onComplete: function() {
        // Affichez ici la zone de jeu, etc.
        gsap.to('#cinematic-overlay', { opacity: 0, duration: 0.5, delay: 0.8, ease: "power2.inOut" });
      }});
    });
    */
  });
  
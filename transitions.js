(function() {
  // 1. Création de l'écran de transition (Overlay)
  const overlay = document.createElement('div');
  overlay.id = 'page-transition-overlay';
  
  // On applique les styles en dur pour que ça marche partout sans CSS externe
  overlay.style.cssText = `
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background-color: #ffffff; /* Couleur de fond de ton site */
    z-index: 9999;
    pointer-events: none;
    transition: opacity 0.5s ease-in-out;
    opacity: 1; /* Démarre opaque (caché) au chargement de la page */
  `;
  
  // On l'ajoute au body dès que le DOM est prêt
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(overlay);
    
    // 2. Animation d'ENTRÉE : on fait disparaître l'overlay (Fade In de la page)
    // Un petit délai de 50ms évite les bugs sur certains navigateurs
    setTimeout(() => {
      overlay.style.opacity = '0';
    }, 50);
  });

  // 3. Animation de SORTIE : on intercepte les clics sur les liens
  document.addEventListener('click', (e) => {
    // On cherche si on a cliqué sur un lien
    const link = e.target.closest('a');
    
    // On ignore : les liens vides, les liens externes, les liens qui ouvrent un nouvel onglet, et les ancres (#)
    if (!link || link.target === '_blank' || link.href.includes('#') || link.hostname !== window.location.hostname) return;

    e.preventDefault(); // On bloque le changement de page immédiat
    const destination = link.href;

    // On fait apparaître l'overlay (Fade Out de la page actuelle)
    overlay.style.opacity = '1';

    // On attend la fin de l'animation (0.5s) avant d'aller vers la nouvelle page
    setTimeout(() => {
      window.location.href = destination;
    }, 500);
  });
})();

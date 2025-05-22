/**
 * Mona Schmidt - Model Portfolio
 * Lightbox-Funktionalität
 */

// === Lightbox initialisieren ===
document.addEventListener('DOMContentLoaded', function() {
  initLightbox();
});

/**
 * Initialisiert die Lightbox-Funktionalität für Galeriebilder
 */
function initLightbox() {
  const images = document.querySelectorAll('.gallery img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  if (!lightbox || !lightboxImg) {
    console.error('Lightbox-Elemente nicht gefunden');
    return;
  }

  // Klick-Event für jedes Bild
  images.forEach(img => {
    img.addEventListener('click', () => {
      openLightbox(img.src);
    });
    
    // Tastatur-Zugänglichkeit
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(img.src);
      }
    });
  });

  // Schließen mit Escape-Taste
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  // Schließen beim Klick außerhalb des Bildes
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

/**
 * Öffnet die Lightbox mit dem angegebenen Bild
 * @param {string} imgSrc - Die Bild-URL
 */
function openLightbox(imgSrc) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  if (!lightbox || !lightboxImg) return;
  
  lightboxImg.src = imgSrc;
  lightbox.style.display = 'flex';
  
  // Verhindere Scrollen des Hintergrunds
  document.body.style.overflow = 'hidden';
  
  // Fokus für Barrierefreiheit
  setTimeout(() => {
    const closeButton = lightbox.querySelector('.close');
    if (closeButton) closeButton.focus();
  }, 100);
}

/**
 * Schließt die Lightbox
 */
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  
  lightbox.style.display = 'none';
  
  // Erlaube Scrollen wieder
  document.body.style.overflow = '';
} 
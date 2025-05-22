/**
 * Mona Schmidt - Model Portfolio
 * Hauptskript für die Website
 */

// === DOMContentLoaded - Initialisierung ===
document.addEventListener('DOMContentLoaded', () => {
  // Initialisiere AOS für Animationen
  AOS.init({
    duration: 1000,
    once: false,
    mirror: true
  });
  
  // Fixiere den Top-Gap beim Laden der Seite
  window.scrollTo(0, 0);
  
  // Füge die loaded-Klasse zum Body hinzu, um die Fade-In-Animation zu starten
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 10);
  
  // Zeige den Back-to-Top Button, wenn der Benutzer nach unten scrollt
  const backToTopButton = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });
  
  // Handle Formular-Einreichungen
  setupForms();
  
  // Lade Gästebucheinträge
  loadGuestbookEntries();
  
  // Initialisiere Burger-Menü
  initBurgerMenu();
  
  // Initialisiere Spracheinstellungen
  initializeLanguage();
  
  // Initialisiere Back-to-Top Button
  initBackToTop();
  
  // Stelle sicher, dass das Burger-Menü korrekt positioniert ist
  ensureBurgerMenuPosition();
});

// === Burger-Menü Funktionalität ===
function initBurgerMenu() {
  // iOS Safari Fix und allgemeine Initialisierung des Burger-Menüs
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    const burgerMenuContainer = document.querySelector('.burger-menu-container');
    if (burgerMenuContainer) {
      burgerMenuContainer.style.display = 'block';
    }
  }
  
  // Überprüfen, ob der Viewport kleiner als 768px ist
  if (window.innerWidth <= 768) {
    const burgerMenuContainer = document.querySelector('.burger-menu-container');
    if (burgerMenuContainer) {
      burgerMenuContainer.style.display = 'block';
    }
  }
  
  // Event Listener für Viewport-Änderungen
  window.addEventListener('resize', function() {
    const burgerMenuContainer = document.querySelector('.burger-menu-container');
    if (burgerMenuContainer) {
      if (window.innerWidth <= 768) {
        burgerMenuContainer.style.display = 'block';
      } else {
        burgerMenuContainer.style.display = 'none';
      }
    }
  });
  
  // Event-Listener für Klick außerhalb des Burger-Menüs
  document.addEventListener('click', function(event) {
    const menu = document.getElementById('burger-menu');
    const burgerButton = document.querySelector('.burger-button');
    
    if (menu && burgerButton) {
      if (!menu.contains(event.target) && !burgerButton.contains(event.target) && menu.style.display === 'block') {
        menu.style.display = 'none';
      }
    }
  });
}

// === Burger-Menü öffnen/schließen ===
function toggleBurgerMenu() {
  const menu = document.getElementById('burger-menu');
  if (menu.style.display === 'block') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
  }
}

// === Back-to-Top Button ===
function initBackToTop() {
  const backToTopButton = document.getElementById('backToTop');
  if (!backToTopButton) return;
  
  // Zeige Button, wenn der Benutzer 300px nach unten gescrollt hat
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });
}

// === Sprachumschaltung initialisieren ===
function initializeLanguage() {
  // Standardmäßig deutsche Version anzeigen
  document.querySelectorAll('.lang-en').forEach(el => {
    el.style.display = 'none';
  });
  
  document.querySelectorAll('.lang-de').forEach(el => {
    el.style.display = el.tagName === 'A' ? 'inline-block' : 'block';
  });
}

// === Sprache umschalten ===
function toggleLanguage() {
  const deElements = document.querySelectorAll('.lang-de');
  const enElements = document.querySelectorAll('.lang-en');
  
  deElements.forEach(el => {
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
  });
  
  enElements.forEach(el => {
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
  });
}

// === Formularvalidierung ===
function initFormValidation() {
  // Kontaktformular
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', validateContactForm);
    
    // Event-Listener für Eingabefelder
    contactForm.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', function() {
        this.setCustomValidity('');
        const errorMessage = this.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
          errorMessage.textContent = '';
        }
      });
    });
  }
  
  // Gästebuchformular
  const guestbookForm = document.getElementById('guestbook-form');
  if (guestbookForm) {
    guestbookForm.addEventListener('submit', handleGuestbookSubmit);
  }
}

// === Kontaktformular validieren ===
function validateContactForm(e) {
  let isValid = true;
  const form = e.target;
  
  // Name validieren
  const nameInput = form.querySelector('#name');
  if (nameInput && nameInput.value.trim().length < 2) {
    e.preventDefault();
    showError(nameInput, 'Bitte geben Sie einen gültigen Namen ein');
    isValid = false;
  }
  
  // E-Mail validieren
  const emailInput = form.querySelector('#email');
  if (emailInput) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(emailInput.value)) {
      e.preventDefault();
      showError(emailInput, 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
      isValid = false;
    }
  }
  
  // Betreff validieren
  const subjectInput = form.querySelector('#betreff');
  if (subjectInput && subjectInput.value.trim().length < 3) {
    e.preventDefault();
    showError(subjectInput, 'Bitte geben Sie einen Betreff ein');
    isValid = false;
  }
  
  // Nachricht validieren
  const messageInput = form.querySelector('#nachricht');
  if (messageInput && messageInput.value.trim().length < 10) {
    e.preventDefault();
    showError(messageInput, 'Bitte geben Sie eine Nachricht mit mindestens 10 Zeichen ein');
    isValid = false;
  }
  
  // Datenschutz-Checkbox validieren
  const privacyCheckbox = form.querySelector('input[name="datenschutz"]');
  if (privacyCheckbox && !privacyCheckbox.checked) {
    e.preventDefault();
    showError(privacyCheckbox, 'Sie müssen der Datenschutzerklärung zustimmen');
    isValid = false;
  }
  
  // Erfolgsmeldung anzeigen, wenn das Formular gültig ist
  if (isValid) {
    const formSuccess = document.getElementById('form-success');
    if (formSuccess) {
      formSuccess.style.display = 'block';
      formSuccess.textContent = 'Nachricht erfolgreich gesendet!';
      setTimeout(() => {
        formSuccess.style.display = 'none';
        formSuccess.textContent = '';
      }, 5000);
    }
  }
  
  return isValid;
}

// === Fehlermeldung anzeigen ===
function showError(input, message) {
  input.setCustomValidity(message);
  
  // Suche nach dem nächsten Fehlermeldungselement
  const errorElement = input.nextElementSibling;
  if (errorElement && errorElement.classList.contains('error-message')) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
}

// === Gästebuch-Formular absenden ===
function handleGuestbookSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  
  fetch(form.action, {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(response => {
    return response.text().then(text => {
      if (response.ok) {
        // Erfolgsmeldung anzeigen
        const successMessage = document.createElement('div');
        successMessage.id = 'success-message';
        successMessage.innerHTML = '<span class="lang-de">Vielen Dank für deinen Eintrag! Er wird nach Überprüfung veröffentlicht.</span><span class="lang-en">Thank you for your entry! It will be published after review.</span>';
        form.parentNode.insertBefore(successMessage, form.nextSibling);
        successMessage.style.display = 'block';
        
        // Formular zurücksetzen
        form.reset();
        
        // Erfolgsmeldung nach 5 Sekunden ausblenden
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 5000);
      } else {
        throw new Error('Fehler beim Senden: ' + text);
      }
    });
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Es gab einen Fehler beim Senden des Formulars. Bitte versuche es später noch einmal.');
  });
}

// === Gästebucheinträge laden ===
function loadGuestbookEntries() {
  const entriesContainer = document.getElementById('entries-container');
  if (!entriesContainer) return;
  
  // Gästebuchdaten (können später durch einen API-Aufruf ersetzt werden)
  const guestbookData = {
    "entries": [
      {
        "id": 1,
        "name": "Hier steht vielleicht dein Name",
        "role": "Fotograf",
        "message": "Hier steht vielleicht deine Nachricht",
        "date": "Hier steht vielleicht der Tag"
      }
    ]
  };
  
  entriesContainer.innerHTML = ''; // Leere den Container

  // Einträge rendern
  guestbookData.entries.forEach(entry => {
    const entryElement = document.createElement('div');
    entryElement.className = 'guestbook-entry';
    entryElement.innerHTML = `
      <div class="guestbook-entry-header">
        <div>
          <span class="guestbook-entry-name">${entry.name}</span>
          <span class="guestbook-entry-role">${entry.role}</span>
        </div>
        <span class="guestbook-entry-date">${entry.date}</span>
      </div>
      <div class="guestbook-entry-message">
        ${entry.message}
      </div>
    `;
    entriesContainer.appendChild(entryElement);
  });
}

// === Sicherstellen, dass das Burger-Menü richtig positioniert ist ===
function ensureBurgerMenuPosition() {
  const burgerMenuContainer = document.querySelector('.burger-menu-container');
  const topBar = document.querySelector('.top-bar');
  
  if (burgerMenuContainer && topBar) {
    // Stelle sicher, dass die !important CSS-Regeln angewendet werden
    burgerMenuContainer.style.setProperty('top', '80px', 'important');
    
    // Stelle sicher, dass die Anzeige korrekt ist
    if (window.innerWidth <= 768) {
      burgerMenuContainer.style.setProperty('display', 'block', 'important');
    }
  }
}

// Zusätzlicher Event-Listener für window.onload, um sicherzustellen, dass die Positionierung 
// auch nach dem vollständigen Laden aller Ressourcen korrekt ist
window.onload = function() {
  // Spalt oben vermeiden durch Zurücksetzen des Scrolls
  window.scrollTo(0, 0);
  
  // Verzögerte Ausführung um sicherzustellen, dass alle Berechnungen abgeschlossen sind
  setTimeout(function() {
    ensureBurgerMenuPosition();
    window.scrollTo(0, 0);
  }, 100);
  
  // Auch bei Scrolling und Resize nochmal prüfen
  window.addEventListener('scroll', ensureBurgerMenuPosition);
  window.addEventListener('resize', ensureBurgerMenuPosition);
};

// === Formular-Setup ===
function setupForms() {
  // Kontaktformular
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const datenschutzCheckbox = contactForm.querySelector('input[name="datenschutz"]');
      if (!datenschutzCheckbox.checked) {
        alert('Bitte bestätige die Datenschutzerklärung, um das Formular abzusenden.');
        return;
      }
      // Formulardaten sammeln
      const formData = new FormData(contactForm);
      const formDataObj = Object.fromEntries(formData.entries());
      // An Formspark senden
      fetch(contactForm.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formDataObj)
      })
      .then(response => {
        if (response.ok) {
          contactForm.reset();
          const formSuccess = document.getElementById('form-success');
          if (formSuccess) {
            formSuccess.style.display = 'block';
            formSuccess.textContent = 'Nachricht erfolgreich gesendet!';
            setTimeout(() => {
              formSuccess.style.display = 'none';
              formSuccess.textContent = '';
            }, 5000);
          }
        } else {
          throw new Error('Fehler beim Senden des Formulars');
        }
      })
      .catch(error => {
        const formSuccess = document.getElementById('form-success');
        if (formSuccess) {
          formSuccess.style.display = 'block';
          formSuccess.textContent = 'Entschuldige, wir haben gerade technische Probleme. Es wird sich gekümmert.';
          setTimeout(() => {
            formSuccess.style.display = 'none';
            formSuccess.textContent = '';
          }, 7000);
        }
      });
    });
  }
  
  // Gästebuchformular
  const guestbookForm = document.getElementById('guestbook-form');
  if (guestbookForm) {
    guestbookForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const datenschutzCheckbox = guestbookForm.querySelector('input[name="privacy"]');
      if (!datenschutzCheckbox.checked) {
        alert('Bitte bestätige die Datenschutzerklärung, um das Formular abzusenden.');
        return;
      }
      // Formulardaten sammeln
      const formData = new FormData(guestbookForm);
      const formDataObj = Object.fromEntries(formData.entries());
      // An Formspark senden
      fetch(guestbookForm.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formDataObj)
      })
      .then(response => {
        if (response.ok) {
          guestbookForm.reset();
          const guestbookSuccess = document.getElementById('guestbook-success');
          if (guestbookSuccess) {
            guestbookSuccess.style.display = 'block';
            guestbookSuccess.textContent = 'Eintrag erfolgreich gesendet!';
            setTimeout(() => {
              guestbookSuccess.style.display = 'none';
              guestbookSuccess.textContent = '';
            }, 5000);
          }
        } else {
          throw new Error('Fehler beim Senden des Gästebuchs');
        }
      })
      .catch(error => {
        const guestbookSuccess = document.getElementById('guestbook-success');
        if (guestbookSuccess) {
          guestbookSuccess.style.display = 'block';
          guestbookSuccess.textContent = 'Entschuldige, wir haben gerade technische Probleme. Es wird sich gekümmert.';
          setTimeout(() => {
            guestbookSuccess.style.display = 'none';
            guestbookSuccess.textContent = '';
          }, 7000);
        }
      });
    });
  }
}

function showPrivacyError(checkbox, message) {
  const errorDiv = checkbox.closest('form').querySelector('.privacy-error');
  errorDiv.textContent = message;
  errorDiv.classList.add('show');
  checkbox.closest('.privacy-container').style.borderColor = '#ff6b6b';
}

function clearPrivacyError(checkbox) {
  const errorDiv = checkbox.closest('form').querySelector('.privacy-error');
  errorDiv.textContent = '';
  errorDiv.classList.remove('show');
  checkbox.closest('.privacy-container').style.borderColor = 'rgba(212, 175, 55, 0.1)';
}

function validatePrivacyCheckbox(checkbox) {
  if (!checkbox.checked) {
    const message = document.body.classList.contains('lang-en') 
      ? 'Please accept the privacy policy to continue.'
      : 'Bitte akzeptieren Sie die Datenschutzerklärung, um fortzufahren.';
    showPrivacyError(checkbox, message);
    return false;
  }
  clearPrivacyError(checkbox);
  return true;
}

// Kontaktformular Event-Listener
if (contactForm) {
  const contactPrivacyCheckbox = contactForm.querySelector('#datenschutz');
  
  contactPrivacyCheckbox.addEventListener('change', function() {
    if (this.checked) {
      clearPrivacyError(this);
    }
  });

  contactForm.addEventListener('submit', function(e) {
    if (!validatePrivacyCheckbox(contactPrivacyCheckbox)) {
      e.preventDefault();
      return;
    }
    // ... rest of the existing contact form submission code ...
  });
}

// Gästebuchformular Event-Listener
if (guestbookForm) {
  const guestbookPrivacyCheckbox = guestbookForm.querySelector('#guestbook-privacy');
  
  guestbookPrivacyCheckbox.addEventListener('change', function() {
    if (this.checked) {
      clearPrivacyError(this);
    }
  });

  guestbookForm.addEventListener('submit', function(e) {
    if (!validatePrivacyCheckbox(guestbookPrivacyCheckbox)) {
      e.preventDefault();
      return;
    }
    // ... rest of the existing guestbook form submission code ...
  });
}

// Modal Funktionen
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Event-Listener für Klicks außerhalb der Modals
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
} 
import './styles/main.css';
import './styles/scratch.css';

import { initCanvasPetals } from './modules/canvasPetals.js';
import { initScratchCard } from './modules/scratchCard.js';
import { initCountdown } from './modules/countdown.js';
import { initAudioPlayer } from './modules/audioPlayer.js';
import { initRSVP } from './modules/rsvp.js';
import { initGallery } from './modules/gallery.js';
import { setLang, getLang } from './modules/i18n.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Background Canvas Petals
  initCanvasPetals();

  // Initialize Scratch Card Foil Canvas
  initScratchCard();

  // Initialize Live Countdown Timer
  initCountdown();

  // Initialize Audio Player Synth
  initAudioPlayer();

  // Initialize RSVP & Guestbook Wall
  initRSVP();

  // Initialize Photo Lightbox
  initGallery();

  // Language Toggle Handler
  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const nextLang = getLang() === 'en' ? 'te' : 'en';
      setLang(nextLang);
    });
  }

  // Scroll Reveal Animations via Intersection Observer
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section').forEach((section) => {
    observer.observe(section);
  });
});

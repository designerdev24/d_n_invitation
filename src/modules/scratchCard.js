import confetti from 'canvas-confetti';
import { playChimeSound } from './audioPlayer.js';

export function initScratchCard() {
  const canvas = document.getElementById('scratch-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const container = canvas.parentElement;

  let isScratching = false;
  let isRevealed = false;

  function resizeCanvas() {
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    if (!isRevealed) {
      drawFoil();
    }
  }

  function drawFoil() {
    const w = canvas.width;
    const h = canvas.height;

    // Metallic Gold & Shimmer Foil Gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#e6be53');
    grad.addColorStop(0.3, '#fff3ca');
    grad.addColorStop(0.5, '#b38b22');
    grad.addColorStop(0.8, '#f3c752');
    grad.addColorStop(1, '#85610d');

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Decorative Sparkles Pattern on Foil
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    for (let i = 0; i < 60; i++) {
      const rx = (Math.sin(i * 99) * 0.5 + 0.5) * w;
      const ry = (Math.cos(i * 33) * 0.5 + 0.5) * h;
      ctx.beginPath();
      ctx.arc(rx, ry, Math.random() * 3 + 1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Foil Border
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, w - 6, h - 6);

    // Foil Center Text Instruction
    ctx.fillStyle = '#12060c';
    ctx.font = 'bold 18px Cinzel, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ SCRATCH HERE ✨', w / 2, h / 2 - 12);

    ctx.font = '13px Outfit, sans-serif';
    ctx.fillStyle = '#3d2508';
    ctx.fillText('Scratch to unveil the wedding date', w / 2, h / 2 + 16);
  }

  function getScratchPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  function scratch(pos) {
    if (isRevealed) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 26, 0, Math.PI * 2);
    ctx.fill();

    checkProgress();
  }

  function checkProgress() {
    if (isRevealed) return;

    const w = canvas.width;
    const h = canvas.height;
    const imgData = ctx.getImageData(0, 0, w, h);
    const pixels = imgData.data;
    let transparentCount = 0;

    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) {
        transparentCount++;
      }
    }

    const totalSamples = pixels.length / 16;
    const percent = Math.round((transparentCount / totalSamples) * 100);

    const progressEl = document.getElementById('scratch-percent');
    if (progressEl) {
      progressEl.textContent = `${percent}%`;
    }

    if (percent >= 45) {
      triggerReveal();
    }
  }

  function triggerReveal() {
    isRevealed = true;
    canvas.style.transition = 'opacity 0.8s ease';
    canvas.style.opacity = '0';

    setTimeout(() => {
      canvas.style.display = 'none';
    }, 800);

    // Audio chime & Confetti Celebration
    playChimeSound();
    fireConfetti();

    const progressEl = document.getElementById('scratch-percent');
    if (progressEl) {
      progressEl.textContent = '100% Unveiled! 🎉';
    }
  }

  function fireConfetti() {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#d4af37', '#e84393', '#fff']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#ffe599', '#ba184b']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#d4af37', '#ffffff']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45
    });
  }

  // Event Listeners
  canvas.addEventListener('mousedown', (e) => {
    isScratching = true;
    scratch(getScratchPos(e));
  });

  canvas.addEventListener('mousemove', (e) => {
    if (isScratching) scratch(getScratchPos(e));
  });

  window.addEventListener('mouseup', () => {
    isScratching = false;
  });

  canvas.addEventListener('touchstart', (e) => {
    isScratching = true;
    scratch(getScratchPos(e));
  }, { passive: true });

  canvas.addEventListener('touchmove', (e) => {
    if (isScratching) scratch(getScratchPos(e));
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isScratching = false;
  });

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
}

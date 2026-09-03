interface ConfettiParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  shape: 'flower' | 'petal' | 'blossom';
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  swaySpeed: number;
  swayOffset: number;
}

export function fireConfetti(customOriginX?: number, customOriginY?: number) {
  const existingCanvas = document.getElementById('wedding-confetti-canvas');
  if (existingCanvas) {
    existingCanvas.remove();
  }

  const canvas = document.createElement('canvas');
  canvas.id = 'wedding-confetti-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const originX = customOriginX ?? window.innerWidth / 2;
  const originY = customOriginY ?? window.innerHeight / 2;

  const colors = [
    '#FF69B4', // Hot Pink
    '#FF1493', // Deep Pink
    '#FF85C0', // Light Pink / Rose
    '#D4AF37', // Gold Accent
    '#2E7D32', // Rich Green
    '#81C784', // Light Sage Green
    '#FFFFFF', // Accent White
  ];

  const particles: ConfettiParticle[] = [];
  const particleCount = 220;

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 18;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed - 5 * Math.random();

    particles.push({
      x: originX,
      y: originY,
      size: 10 + Math.random() * 14,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: Math.random() > 0.65 ? 'flower' : Math.random() > 0.35 ? 'petal' : 'blossom',
      vx,
      vy,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.15,
      opacity: 1,
      swaySpeed: 0.003 + Math.random() * 0.004,
      swayOffset: Math.random() * Math.PI * 2,
    });
  }

  const startTime = Date.now();
  const duration = 6500;

  function update() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const elapsed = Date.now() - startTime;

    if (elapsed > duration) {
      window.removeEventListener('resize', resize);
      canvas.remove();
      return;
    }

    particles.forEach((p) => {
      p.x += p.vx + Math.sin(p.swayOffset + elapsed * p.swaySpeed) * 0.5;
      p.y += p.vy;
      p.vy += 0.25;
      p.vx *= 0.982;
      p.vy *= 0.982;
      p.rotation += p.rotationSpeed;

      if (elapsed > 4700) {
        p.opacity = Math.max(0, 1 - (elapsed - 4700) / 1800);
      }

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;

      const r = p.size / 2;

      if (p.shape === 'flower') {
        const petals = 5;
        ctx.beginPath();
        for (let i = 0; i < petals; i++) {
          const a = (i * 2 * Math.PI) / petals;
          const px = Math.cos(a) * (r * 0.65);
          const py = Math.sin(a) * (r * 0.65);
          ctx.moveTo(px, py);
          ctx.arc(px, py, r * 0.45, 0, Math.PI * 2);
        }
        ctx.fill();

        ctx.fillStyle = '#4CAF50';
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.25, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === 'petal') {
        ctx.beginPath();
        ctx.moveTo(0, -r);
        ctx.bezierCurveTo(r * 0.85, -r * 0.4, r * 0.85, r * 0.5, 0, r);
        ctx.bezierCurveTo(-r * 0.85, r * 0.5, -r * 0.85, -r * 0.4, 0, -r);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(-r * 0.4, -r * 0.4, r * 0.45, 0, Math.PI * 2);
        ctx.arc(r * 0.4, -r * 0.4, r * 0.45, 0, Math.PI * 2);
        ctx.arc(r * 0.4, r * 0.4, r * 0.45, 0, Math.PI * 2);
        ctx.arc(-r * 0.4, r * 0.4, r * 0.45, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FF69B4';
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });

    requestAnimationFrame(update);
  }

  update();
}

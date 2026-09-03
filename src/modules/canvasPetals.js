export function initCanvasPetals() {
  const canvas = document.getElementById('petal-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const PETAL_COUNT = 30;
  const SPARK_COUNT = 45;

  class Petal {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * -height;
      this.size = Math.random() * 10 + 8;
      this.speedY = Math.random() * 1.2 + 0.8;
      this.speedX = Math.random() * 0.8 - 0.4;
      this.angle = Math.random() * Math.PI * 2;
      this.spin = (Math.random() - 0.5) * 0.03;
      this.color = Math.random() > 0.4 ? '#e84393' : '#d63031';
      this.opacity = Math.random() * 0.6 + 0.3;
    }
    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.angle) * 0.8 + this.speedX;
      this.angle += this.spin;
      if (this.y > height + 20) {
        this.reset();
      }
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
      ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
      ctx.fill();
      ctx.restore();
    }
  }

  class GoldSpark {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2 + 0.5;
      this.speedY = -(Math.random() * 0.5 + 0.2);
      this.opacity = Math.random() * 0.8 + 0.2;
      this.pulse = Math.random() * 0.02 + 0.01;
    }
    update() {
      this.y += this.speedY;
      this.opacity += Math.sin(Date.now() * 0.003) * this.pulse;
      if (this.y < -10) {
        this.reset();
        this.y = height + 10;
      }
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0.1, Math.min(1, this.opacity));
      ctx.fillStyle = '#f3ce70';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#ffe599';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const petals = Array.from({ length: PETAL_COUNT }, () => new Petal());
  const sparks = Array.from({ length: SPARK_COUNT }, () => new GoldSpark());

  function animate() {
    ctx.clearRect(0, 0, width, height);

    sparks.forEach(spark => {
      spark.update();
      spark.draw();
    });

    petals.forEach(petal => {
      petal.update();
      petal.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

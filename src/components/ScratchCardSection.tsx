import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { fireConfetti } from '../utils/confetti';

export const ScratchCardSection: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const scratchCountRef = useRef(0);
  const [isDrawing, setIsDrawing] = useState(false);

  // Live Countdown State
  const weddingDate = new Date('2026-09-04T10:00:00+05:30').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, weddingDate - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isRevealed) {
      const canvas = canvasRef.current;
      if (canvas && canvas.parentElement) {
        const rect = canvas.parentElement.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;
        fireConfetti(originX, originY);
      } else {
        fireConfetti();
      }
    }
  }, [isRevealed]);

  useEffect(() => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fillCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      ctx.scale(dpr, dpr);

      // Smooth Decent Metallic Sage Foil Gradient
      const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, '#264A3A');
      gradient.addColorStop(0.25, '#386752');
      gradient.addColorStop(0.5, '#4E8A70');
      gradient.addColorStop(0.75, '#386752');
      gradient.addColorStop(1, '#1F3C2F');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Soft Radial Highlight for Decent Metallic Sheen
      const radialGlow = ctx.createRadialGradient(
        rect.width / 2,
        rect.height / 2,
        10,
        rect.width / 2,
        rect.height / 2,
        rect.width / 1.5
      );
      radialGlow.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
      radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Clean Scratch Text Overlay
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 15px Cinzel, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✨ SCRATCH TO REVEAL DATE ✨', rect.width / 2, rect.height / 2);
    };

    fillCanvas();
    const animFrame = requestAnimationFrame(fillCanvas);
    const timer = setTimeout(fillCanvas, 80);
    const handleResize = () => fillCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [isRevealed]);

  const getPosition = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const draw = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Satisfying Scratch Mechanics: 75px brush width
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 75;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    if (lastPosRef.current) {
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.arc(x, y, 37.5, 0, Math.PI * 2);
      ctx.fill();
    }
    lastPosRef.current = { x, y };

    scratchCountRef.current += 1;
    checkScratchPercentage();
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const pos = getPosition(e);
    draw(pos.x, pos.y);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    if (e.cancelable) e.preventDefault();
    const pos = getPosition(e);
    draw(pos.x, pos.y);
  };

  const handleEnd = () => {
    setIsDrawing(false);
    lastPosRef.current = null;
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let transparentCount = 0;
    let totalCount = 0;

    const step = 8;
    for (let i = 0; i < pixels.length; i += 4 * step) {
      totalCount++;
      if (pixels[i + 3] === 0) transparentCount++;
    }

    const percentage = (transparentCount / totalCount) * 100;
    // Requires scratching for ~2s (35% cleared + at least 18 scratch updates)
    if (percentage > 35 && scratchCountRef.current >= 18) {
      setIsRevealed(true);
    }
  };

  return (
    <section className="relative z-10 w-full min-h-screen pt-0 pb-0 flex flex-col justify-between items-center text-center snap-start overflow-hidden">
      
      {/* 1. Full-Width flower_top.png Image anchored at absolute top edge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full z-20 pointer-events-none leading-none flex justify-center shrink-0"
      >
        <img
          src="/assets/flower_top.png"
          alt="Top Flower Garland"
          className="w-full max-w-5xl h-auto object-contain object-top block"
        />
      </motion.div>

      {/* 2. Main Content Stack */}
      <div className="w-full max-w-2xl px-4 mx-auto my-auto flex flex-col items-center justify-center -translate-y-[4%]">
        
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-4 sm:mb-5"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#386752]">
            Scratch To Reveal Wedding Date
          </h2>
        </motion.div>

        {/* Scratch Card Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative z-10 w-full max-w-md mx-auto flex justify-center items-center"
        >
          <div className="relative w-full aspect-[16/10] bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(40,40,40,0.06)] flex flex-col justify-center items-center text-center select-none">
            
            {/* CONTENT INSIDE CARD */}
            <div className="absolute inset-0 flex flex-col justify-center items-center p-6 bg-white/80 backdrop-blur-md z-0">
              
              {/* TOP: MONTH */}
              <span className="font-serif text-xs sm:text-sm tracking-[0.35em] text-[#386752] uppercase font-semibold mb-1">
                SEPTEMBER
              </span>

              {/* MIDDLE ROW: [DAY + LINES] [NUMERAL 04] [TIME + LINES] */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 my-1">
                
                {/* Left: DAY with top & bottom thin line rules */}
                <div className="py-0.5 px-2.5 sm:px-3 border-y border-[#386752]/50 text-center">
                  <span className="font-serif text-xs sm:text-sm tracking-[0.25em] text-[#386752] uppercase font-bold">
                    FRIDAY
                  </span>
                </div>

                {/* Center: BIG NUMERAL 04 */}
                <span className="font-serif text-5xl sm:text-6xl font-extrabold text-[#386752] leading-none px-1">
                  04
                </span>

                {/* Right: TIME with top & bottom thin line rules */}
                <div className="py-0.5 px-2.5 sm:px-3 border-y border-[#386752]/50 text-center">
                  <span className="font-serif text-xs sm:text-sm tracking-[0.2em] text-[#386752] uppercase font-bold">
                    AT 10 AM
                  </span>
                </div>

              </div>

              {/* BOTTOM: YEAR */}
              <span className="font-serif text-xs sm:text-sm tracking-[0.35em] text-[#386752] uppercase font-semibold mt-1">
                2026
              </span>

            </div>

            {/* Canvas Scratch Foil Layer */}
            <AnimatePresence>
              {!isRevealed && (
                <motion.canvas
                  ref={canvasRef}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  onMouseDown={handleStart}
                  onMouseMove={handleMove}
                  onMouseUp={handleEnd}
                  onMouseLeave={handleEnd}
                  onTouchStart={handleStart}
                  onTouchMove={handleMove}
                  onTouchEnd={handleEnd}
                  className="absolute inset-0 z-10 w-full h-full cursor-grab active:cursor-grabbing touch-none"
                />
              )}
            </AnimatePresence>

          </div>
        </motion.div>

        {/* 3. COUNTDOWN TIMER */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="mt-4 sm:mt-5 w-full max-w-md mx-auto"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-[0_10px_25px_rgba(40,40,40,0.06)]">
                <span className="font-poppins font-medium text-xs uppercase tracking-[0.2em] text-[#282828] block mb-3">
                  Counting Down To The Big Day
                </span>

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="flex flex-col items-center bg-white/90 p-2 sm:p-2.5 rounded-xl">
                    <span className="font-poppins text-xl sm:text-2xl font-medium text-[#282828]">
                      {timeLeft.days}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-poppins font-medium text-[#282828]/70 uppercase tracking-wider mt-0.5">
                      Days
                    </span>
                  </div>

                  <div className="flex flex-col items-center bg-white/90 p-2 sm:p-2.5 rounded-xl">
                    <span className="font-poppins text-xl sm:text-2xl font-medium text-[#282828]">
                      {timeLeft.hours}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-poppins font-medium text-[#282828]/70 uppercase tracking-wider mt-0.5">
                      Hours
                    </span>
                  </div>

                  <div className="flex flex-col items-center bg-white/90 p-2 sm:p-2.5 rounded-xl">
                    <span className="font-poppins text-xl sm:text-2xl font-medium text-[#282828]">
                      {timeLeft.minutes}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-poppins font-medium text-[#282828]/70 uppercase tracking-wider mt-0.5">
                      Mins
                    </span>
                  </div>

                  <div className="flex flex-col items-center bg-white/90 p-2 sm:p-2.5 rounded-xl">
                    <span className="font-poppins text-xl sm:text-2xl font-medium text-[#282828]">
                      {timeLeft.seconds}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-poppins font-medium text-[#282828]/70 uppercase tracking-wider mt-0.5">
                      Secs
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* 4. Full-Width flower_bottom.png Image anchored at absolute bottom edge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full z-20 pointer-events-none leading-none flex justify-center shrink-0"
      >
        <img
          src="/assets/flower_bottom.png"
          alt="Bottom Flower Garland"
          className="w-full max-w-5xl h-auto object-contain object-bottom block"
        />
      </motion.div>

    </section>
  );
};

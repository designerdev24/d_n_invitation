import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface FallingFlowersProps {
  active?: boolean;
}

interface PetalItem {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  rotateStart: number;
  rotateXEnd: number;
  rotateYEnd: number;
  opacity: number;
  type: 'velvet-rose' | 'marigold' | 'jasmine' | 'blush-rose';
}

export const FallingFlowers: React.FC<FallingFlowersProps> = ({ active = true }) => {
  const petals = useMemo<PetalItem[]>(() => {
    const types: ('velvet-rose' | 'marigold' | 'jasmine' | 'blush-rose')[] = [
      'velvet-rose',
      'marigold',
      'blush-rose',
      'jasmine',
      'marigold',
      'velvet-rose',
    ];

    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: 5 + (i * 90) / 20 + (Math.random() * 5 - 2.5),
      size: 18 + Math.random() * 12,
      duration: 10 + Math.random() * 7,
      delay: Math.random() * 6,
      sway: 20 + Math.random() * 25,
      rotateStart: Math.random() * 360,
      rotateXEnd: (Math.random() - 0.5) * 720,
      rotateYEnd: (Math.random() - 0.5) * 720,
      opacity: 0.6 + Math.random() * 0.35,
      type: types[i % types.length],
    }));
  }, []);

  if (!active) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-30 select-none">
      {/* SVG Gradient definitions for rich, realistic petals */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <linearGradient id="roseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BB2965" />
            <stop offset="60%" stopColor="#961E4E" />
            <stop offset="100%" stopColor="#660014" />
          </linearGradient>

          <linearGradient id="marigoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFC107" />
            <stop offset="50%" stopColor="#FF9800" />
            <stop offset="100%" stopColor="#E65100" />
          </linearGradient>

          <linearGradient id="blushGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF758F" />
            <stop offset="60%" stopColor="#FF4D6D" />
            <stop offset="100%" stopColor="#C9184A" />
          </linearGradient>

          <linearGradient id="jasmineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#EBFDFF" />
            <stop offset="100%" stopColor="#386752" />
          </linearGradient>
        </defs>
      </svg>

      {petals.map((p) => {
        const gradId =
          p.type === 'velvet-rose'
            ? 'url(#roseGrad)'
            : p.type === 'marigold'
            ? 'url(#marigoldGrad)'
            : p.type === 'blush-rose'
            ? 'url(#blushGrad)'
            : 'url(#jasmineGrad)';

        return (
          <motion.div
            key={p.id}
            initial={{
              top: '-8%',
              left: `${p.left}%`,
              opacity: 0,
              scale: 0.6,
              rotate: p.rotateStart,
              rotateX: 0,
              rotateY: 0,
            }}
            animate={{
              top: '108%',
              x: [0, p.sway, -p.sway, 0],
              rotate: p.rotateStart + 180,
              rotateX: p.rotateXEnd,
              rotateY: p.rotateYEnd,
              opacity: [0, p.opacity, p.opacity, 0],
              scale: [0.7, 1, 0.95, 0.7],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size * 1.35,
              perspective: 400,
            }}
          >
            <svg
              viewBox="0 0 30 40"
              className="w-full h-full filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
            >
              <path
                d="M15 0 C 25 6, 30 22, 15 40 C 0 22, 5 6, 15 0 Z"
                fill={gradId}
                opacity={0.92}
              />
              <path
                d="M15 4 C 16 16, 15 28, 15 36"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="0.8"
                fill="none"
              />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
};

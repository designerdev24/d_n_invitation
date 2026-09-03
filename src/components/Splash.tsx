import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { FallingFlowers } from './FallingFlowers';

interface SplashProps {
  onEnter: () => void;
}

const getGraphemes = (str: string): string[] => {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(str), (s) => s.segment);
  }
  return str.split('');
};

export const Splash: React.FC<SplashProps> = ({ onEnter }) => {
  // Animation Stage States
  const [cloudsParted, setCloudsParted] = useState(false);
  const [churchVisible, setChurchVisible] = useState(false);
  const [coupleVisible, setCoupleVisible] = useState(false);
  const [monogramVisible, setMonogramVisible] = useState(false);
  const [ramisettiVisible, setRamisettiVisible] = useState(false);
  const [weddingVisible, setWeddingVisible] = useState(false);
  const [flowersActive, setFlowersActive] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  const ramisettiLetters = getGraphemes("Ramisetti's");
  const weddingInvitationLetters = getGraphemes("Wedding Invitation");

  useEffect(() => {
    // 1. Keep clouds stationary covering screen for 1.5s, then start slow parting over 4s
    const t1 = setTimeout(() => setCloudsParted(true), 1500);

    // 2. Church comes from bottom & sticks (starts at 3.0s as clouds reach half distance)
    const t2 = setTimeout(() => setChurchVisible(true), 3000);

    // 3. Couple illustration appears at bottom center of church (30% height of church)
    const t3 = setTimeout(() => setCoupleVisible(true), 4400);

    // 4. Text Reveal Starts + Falling Flowers Start (Static layout, zero shift)
    const t4 = setTimeout(() => {
      setMonogramVisible(true); // Decorative D & N Monogram Image
      setFlowersActive(true);
    }, 5200);

    const t5 = setTimeout(() => setRamisettiVisible(true), 5800); // Ramisetti's
    const t6 = setTimeout(() => setWeddingVisible(true), 6600); // Wedding Invitation

    // 5. Open Invitation Shiny Glass Button appears
    const t7 = setTimeout(() => setButtonVisible(true), 7400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex flex-col justify-end items-center bg-gradient-to-b from-[#EBFDFF] via-[#F2FEFF] to-[#FFFFFF] text-[#2D3A34] overflow-hidden selection:bg-[#BB2965]/20"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,103,82,0.12)_0%,transparent_75%)] pointer-events-none" />

      {/* Falling Flowers Component (Triggers when text reveal starts) */}
      <FallingFlowers active={flowersActive} />

      {/* --- CLOUD COVER & 200% WIDTH REVEAL ANIMATION (MIX-BLEND-SCREEN) --- */}
      {/* Left Group of Clouds (clouds 1, 3, 5 - 200% screen width, moving Left) */}
      <motion.div
        initial={{ x: '0vw' }}
        animate={{ x: cloudsParted ? '-220vw' : '0vw' }}
        transition={{ duration: 4.2, ease: [0.25, 1, 0.5, 1] }}
        className="absolute inset-0 z-40 pointer-events-none mix-blend-screen"
      >
        <img
          src="/assets/cloud_1.png"
          alt="Cloud Left Top"
          className="absolute -top-12 -left-[50vw] w-[200vw] max-w-none opacity-100 object-cover mix-blend-screen drop-shadow-2xl"
        />
        <img
          src="/assets/cloud_3.png"
          alt="Cloud Left Middle"
          className="absolute top-[28%] -left-[60vw] w-[200vw] max-w-none opacity-100 object-cover mix-blend-screen drop-shadow-2xl"
        />
        <img
          src="/assets/cloud_5.png"
          alt="Cloud Left Bottom"
          className="absolute -bottom-10 -left-[50vw] w-[200vw] max-w-none opacity-100 object-cover drop-shadow-2xl mix-blend-screen"
        />
      </motion.div>

      {/* Right Group of Clouds (clouds 2, 4, 6 - 200% screen width, moving Right) */}
      <motion.div
        initial={{ x: '0vw' }}
        animate={{ x: cloudsParted ? '220vw' : '0vw' }}
        transition={{ duration: 4.2, ease: [0.25, 1, 0.5, 1] }}
        className="absolute inset-0 z-40 pointer-events-none mix-blend-screen"
      >
        <img
          src="/assets/cloud_2.png"
          alt="Cloud Right Top"
          className="absolute -top-12 -right-[50vw] w-[200vw] max-w-none opacity-100 object-cover mix-blend-screen drop-shadow-2xl"
        />
        <img
          src="/assets/cloud_4.png"
          alt="Cloud Right Middle"
          className="absolute top-[32%] -right-[60vw] w-[200vw] max-w-none opacity-100 object-cover mix-blend-screen drop-shadow-2xl"
        />
        <img
          src="/assets/cloud_6.png"
          alt="Cloud Right Bottom"
          className="absolute -bottom-10 -right-[50vw] w-[200vw] max-w-none opacity-100 object-cover drop-shadow-2xl mix-blend-screen"
        />
      </motion.div>


      {/* --- CONTENT WRAPPER: PRE-CALCULATED STATIC LAYOUT (ZERO LAYOUT SHIFT OR MOVEMENT) --- */}
      <div className="relative z-30 w-full flex flex-col items-center justify-end h-full pb-0 pointer-events-none">
        
        {/* TOP TEXT & BUTTON CONTAINER - Always present in layout so no element moves */}
        <div className="flex flex-col items-center text-center px-4 mb-[12px] pointer-events-auto">
          
          {/* 1. D & N Monogram Image (Replaces component with d&n.png image) */}
          <div className="flex flex-col items-center mb-4 sm:mb-6 min-h-[120px] sm:min-h-[160px] justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
              animate={{
                opacity: monogramVisible ? 1 : 0,
                scale: monogramVisible ? 1 : 0.85,
                filter: monogramVisible ? 'blur(0px)' : 'blur(8px)',
              }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative flex items-center justify-center"
            >
              <img
                src="/assets/d&n.png"
                alt="D & N Logo"
                className="w-36 sm:w-48 h-auto max-h-[140px] sm:max-h-[180px] object-contain drop-shadow-md"
              />
            </motion.div>
          </div>

          {/* 2. Ramisetti's (Always in position, character blur fade in-place) */}
          <div className="font-serif text-[#386752] text-base sm:text-2xl tracking-[0.3em] uppercase font-extrabold mb-1 min-h-[28px] sm:min-h-[36px] flex justify-center flex-wrap items-center">
            {ramisettiLetters.map((char, index) => (
              <motion.span
                key={`ramisetti-${index}`}
                initial={{ opacity: 0, filter: 'blur(6px)' }}
                animate={{
                  opacity: ramisettiVisible ? 1 : 0,
                  filter: ramisettiVisible ? 'blur(0px)' : 'blur(6px)',
                }}
                transition={{
                  duration: 0.4,
                  delay: ramisettiVisible ? index * 0.04 : 0,
                  ease: 'easeOut',
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          {/* 3. Wedding Invitation (Always in position, character blur fade in-place) */}
          <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#BB2965] tracking-tight my-0.5 drop-shadow-sm min-h-[36px] sm:min-h-[48px] flex justify-center flex-wrap items-center">
            {weddingInvitationLetters.map((char, index) => (
              <motion.span
                key={`wedding-${index}`}
                initial={{ opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
                animate={{
                  opacity: weddingVisible ? 1 : 0,
                  scale: weddingVisible ? 1 : 0.98,
                  filter: weddingVisible ? 'blur(0px)' : 'blur(6px)',
                }}
                transition={{
                  duration: 0.45,
                  delay: weddingVisible ? index * 0.04 : 0,
                  ease: 'easeOut',
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>

          {/* 4. Glassmorphic Shiny Button (Always in position, fades in-place) */}
          <div className="mt-3 min-h-[48px] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{
                opacity: buttonVisible ? 1 : 0,
                filter: buttonVisible ? 'blur(0px)' : 'blur(4px)',
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={buttonVisible ? 'pointer-events-auto' : 'pointer-events-none'}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-1 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_10px_30px_rgba(40,40,40,0.10)] hover:shadow-[0_12px_36px_rgba(187,41,101,0.25)] transition-all duration-300 group"
              >
                {/* Subtle aura gradient glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#BB2965]/20 via-[#386752]/20 to-[#BB2965]/20 blur-md opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <button
                  onClick={onEnter}
                  className="glass-shine-btn relative px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-white/60 backdrop-blur-md border-[0.5px] border-[#386752] text-[#BB2965] font-poppins font-medium text-sm sm:text-base tracking-wider shadow-sm cursor-pointer overflow-hidden z-10 flex items-center gap-2.5 mx-auto active:shadow-inner"
                >
                  {/* Shimmer sweep effect */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <span className="relative z-10">Open Invitation</span>
                  <Heart className="w-4 h-4 fill-[#BB2965] text-[#BB2965] relative z-10" />
                </button>
              </motion.div>
            </motion.div>
          </div>

        </div>

        {/* CHURCH & COUPLE CONTAINER */}
        <div className="relative flex justify-center items-end w-full max-w-[620px] px-4 pointer-events-none">
          <AnimatePresence>
            {churchVisible && (
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex justify-center items-end w-full"
              >
                {/* Church Image */}
                <img
                  src="/assets/chruch.png"
                  alt="Wedding Church Altar"
                  className="w-full h-auto max-h-[43vh] sm:max-h-[48vh] object-contain object-bottom drop-shadow-2xl"
                />

                {/* Couple Illustration at Bottom Center of Church */}
                <AnimatePresence>
                  {coupleVisible && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 0, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[30%] flex items-end justify-center z-20 pb-1"
                    >
                      <img
                        src="/assets/couple_illustration.png"
                        alt="Durgaprasad & Nookaratnam Illustration"
                        className="h-full w-auto object-contain drop-shadow-lg"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </motion.div>
  );
};

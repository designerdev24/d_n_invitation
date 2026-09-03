import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const getGraphemes = (str: string): string[] => {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(str), (s) => s.segment);
  }
  return str.split('');
};

export const Hero: React.FC = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const durgaprasadLetters = getGraphemes('Durgaprasad');
  const wedsLetters = getGraphemes('Weds');
  const nookaratnamLetters = getGraphemes('Nookaratnam');
  const verseQuoteLetters = getGraphemes('“I will rejoice in doing them good, says the Lord”');
  const verseRefLetters = getGraphemes('— Jeremiah 32:41,42');

  useEffect(() => {
    const handleScroll = () => {
      // Smoothly hide indicator as soon as user starts scrolling past 50px into next section
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollClick = () => {
    window.scrollTo({
      top: window.innerHeight * 0.9,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative z-10 w-full min-h-screen pt-[24px] pb-0 px-4 flex flex-col justify-start items-center text-center snap-start bg-gradient-to-b from-[#EBFDFF] via-[#F2FEFF] to-[#FFFFFF] overflow-hidden select-none">
      
      {/* Background Subtle Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,103,82,0.10)_0%,transparent_75%)] pointer-events-none" />

      {/* Main Content Stack - Packed tightly from 24px top padding */}
      <div className="relative z-10 max-w-xl mx-auto w-full flex flex-col items-center justify-start">
        
        {/* 1. Cross Image at Top (Starts Reveal at Top - Delay 0.2s) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex justify-center"
        >
          <img
            src="/assets/cross.png"
            alt="Holy Cross"
            className="w-16 h-16 sm:w-24 sm:h-24 object-contain drop-shadow-md"
          />
        </motion.div>

        {/* 2. Scripture Verse Text (Sequence 2: Top-to-Bottom Letter-by-Letter Blur Reveal - Delay 0.7s) */}
        <div className="max-w-md mx-auto px-2 mt-0">
          <blockquote className="font-poppins font-normal italic text-[10px] text-[#282828] leading-relaxed tracking-wide flex justify-center flex-wrap">
            {verseQuoteLetters.map((char, index) => (
              <motion.span
                key={`quote-${index}`}
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.35,
                  delay: 0.7 + index * 0.02,
                  ease: 'easeOut',
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </blockquote>
          <p className="font-poppins font-normal text-[10px] text-[#282828] tracking-wider mt-0.5 uppercase flex justify-center flex-wrap">
            {verseRefLetters.map((char, index) => (
              <motion.span
                key={`ref-${index}`}
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.35,
                  delay: 1.4 + index * 0.025,
                  ease: 'easeOut',
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </p>
        </div>

        {/* 3. D & N Monogram Image (Sequence 3: Soft Scale & Blur Reveal - Delay 1.9s) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 1.9, ease: [0.34, 1.56, 0.64, 1] }}
          className="mt-3 mb-1 sm:mt-4 sm:mb-2 flex justify-center"
        >
          <img
            src="/assets/d&n.png"
            alt="D & N Logo"
            className="w-36 sm:w-52 h-auto max-h-[140px] sm:max-h-[180px] object-contain drop-shadow-md"
          />
        </motion.div>

        {/* 4. Couple Names Text Part: Durgaprasad Weds Nookaratnam (Sequence 4: Staggered Blur Reveal - Delay 2.5s) */}
        <div className="flex flex-col items-center space-y-0.5 sm:space-y-1 mb-2 sm:mb-3">
          
          {/* Durgaprasad */}
          <h1 className="font-cursive text-5xl sm:text-7xl font-extrabold text-[#BB2965] leading-none drop-shadow-sm flex justify-center flex-wrap">
            {durgaprasadLetters.map((char, index) => (
              <motion.span
                key={`dp-${index}`}
                initial={{ opacity: 0, filter: 'blur(6px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.45,
                  delay: 2.5 + index * 0.05,
                  ease: 'easeOut',
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>

          {/* Weds */}
          <span className="font-serif text-lg sm:text-2xl text-[#386752] font-extrabold uppercase tracking-widest my-0.5 flex justify-center flex-wrap">
            {wedsLetters.map((char, index) => (
              <motion.span
                key={`weds-${index}`}
                initial={{ opacity: 0, filter: 'blur(5px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.4,
                  delay: 3.1 + index * 0.06,
                  ease: 'easeOut',
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>

          {/* Nookaratnam */}
          <h1 className="font-cursive text-5xl sm:text-7xl font-extrabold text-[#BB2965] leading-none drop-shadow-sm flex justify-center flex-wrap">
            {nookaratnamLetters.map((char, index) => (
              <motion.span
                key={`nk-${index}`}
                initial={{ opacity: 0, filter: 'blur(6px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.45,
                  delay: 3.4 + index * 0.05,
                  ease: 'easeOut',
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>

        </div>

        {/* 5. Hero Church Image (Sequence 5: Smooth Glide & Blur Fade at Bottom - Delay 3.9s) */}
        <motion.div
          initial={{ opacity: 0, y: 35, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 3.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-xl sm:max-w-2xl mx-auto mt-1 sm:mt-2 flex justify-center items-end pointer-events-none leading-none"
        >
          <img
            src="/assets/hero_church.png"
            alt="Hero Church Illustration"
            className="w-full h-auto max-h-[38vh] sm:max-h-[45vh] object-contain object-bottom drop-shadow-xl block"
          />
        </motion.div>

      </div>

      {/* 6. Side-by-Side Scroll Text & Animated Arrow Indicator */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
            transition={{ duration: 0.8, delay: 4.5 }}
            onClick={handleScrollClick}
            className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 cursor-pointer flex items-center justify-center gap-1.5 group"
          >
            <span className="font-poppins text-xs font-semibold tracking-widest text-[#282828] uppercase drop-shadow-sm group-hover:text-[#282828] transition-colors">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[#282828]"
            >
              <ChevronDown className="w-4 h-4 stroke-[2.5] drop-shadow-sm text-[#282828]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

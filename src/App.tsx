import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Splash } from './components/Splash';
import { Hero } from './components/Hero';
import { ScratchCardSection } from './components/ScratchCardSection';
import { Timeline } from './components/Timeline';
import { Gallery } from './components/Gallery';
import { SaveTheDate } from './components/SaveTheDate';
import { ThankYou } from './components/ThankYou';
import { FallingFlowers } from './components/FallingFlowers';
import { AudioPlayer } from './components/AudioPlayer';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Create background audio instance
    const audio = new Audio('/assets/music.mp3');
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Auto-scroll engine: Waits 10 seconds per section and smooth scrolls to the next section
  useEffect(() => {
    if (!hasEntered) return;

    // Small delay to ensure main container is mounted and ready
    const mountTimeout = setTimeout(() => {
      const mainEl = mainRef.current;
      if (!mainEl) return;

      let isUserInteracting = false;
      let userPauseTimeout: NodeJS.Timeout | null = null;

      const performAutoScroll = () => {
        if (isUserInteracting) return;

        const sections = mainEl.querySelectorAll('section');
        if (!sections || sections.length === 0) return;

        // Calculate current section index from scrollTop
        const currentScroll = mainEl.scrollTop;
        let activeIdx = 0;
        let minDiff = Infinity;

        sections.forEach((sec, idx) => {
          const diff = Math.abs((sec as HTMLElement).offsetTop - currentScroll);
          if (diff < minDiff) {
            minDiff = diff;
            activeIdx = idx;
          }
        });

        const nextIdx = (activeIdx + 1) % sections.length;
        const targetSection = sections[nextIdx] as HTMLElement;

        if (targetSection) {
          mainEl.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth',
          });
        }
      };

      const intervalId = setInterval(performAutoScroll, 10000);

      // Pause auto-scroll ONLY when user actively scrolls (wheel or touch drag)
      const handleUserScroll = () => {
        isUserInteracting = true;
        if (userPauseTimeout) clearTimeout(userPauseTimeout);

        // Resume auto-scroll 10 seconds after user stops scrolling
        userPauseTimeout = setTimeout(() => {
          isUserInteracting = false;
        }, 10000);
      };

      mainEl.addEventListener('wheel', handleUserScroll, { passive: true });
      mainEl.addEventListener('touchmove', handleUserScroll, { passive: true });

      return () => {
        clearInterval(intervalId);
        if (userPauseTimeout) clearTimeout(userPauseTimeout);
        mainEl.removeEventListener('wheel', handleUserScroll);
        mainEl.removeEventListener('touchmove', handleUserScroll);
      };
    }, 500);

    return () => clearTimeout(mountTimeout);
  }, [hasEntered]);

  const handleEnterInvitation = () => {
    setHasEntered(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Audio playback notice:', err);
        });
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Audio playback notice:', err);
        });
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#EBFDFF] via-[#F2FEFF] to-[#FFFFFF] font-sans antialiased text-[#2D3A34] selection:bg-[#BB2965]/20 selection:text-[#BB2965] overflow-hidden relative">
      
      {/* Background Audio Toggle Button (Shows after entering or on page load) */}
      {hasEntered && <AudioPlayer isPlaying={isPlaying} onToggle={toggleAudio} />}

      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <Splash key="splash" onEnter={handleEnterInvitation} />
        ) : (
          <main ref={mainRef} key="main-content" className="w-full h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth relative">
            {/* Background Falling Rose Petals & Flowers Engine */}
            <FallingFlowers />

            {/* Section 1: Hero */}
            <Hero />

            {/* Section 2: Interactive Scratch Card Reveal */}
            <ScratchCardSection />

            {/* Section 3: Event Schedule Timeline */}
            <Timeline />

            {/* Section 4: Our Photo Gallery */}
            <Gallery />

            {/* Section 5: The Venue */}
            <SaveTheDate />

            {/* Section 6: RSVP & Thank You */}
            <ThankYou />
          </main>
        )}
      </AnimatePresence>
    </div>
  );
}

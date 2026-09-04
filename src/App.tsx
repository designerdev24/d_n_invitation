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
    if (!hasEntered || !mainRef.current) return;

    const mainEl = mainRef.current;
    let sectionIndex = 0;
    let autoScrollInterval: NodeJS.Timeout | null = null;
    let userPauseTimeout: NodeJS.Timeout | null = null;
    let isUserInteracting = false;

    const startAutoScroll = () => {
      if (autoScrollInterval) clearInterval(autoScrollInterval);

      autoScrollInterval = setInterval(() => {
        if (isUserInteracting) return;

        const sections = mainEl.querySelectorAll('section');
        if (sections.length === 0) return;

        sectionIndex = (sectionIndex + 1) % sections.length;
        sections[sectionIndex].scrollIntoView({ behavior: 'smooth' });
      }, 10000); // 10 seconds per section
    };

    // Keep active sectionIndex in sync with user scrolling
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sections = Array.from(mainEl.querySelectorAll('section'));
            const idx = sections.indexOf(entry.target as HTMLElement);
            if (idx !== -1) {
              sectionIndex = idx;
            }
          }
        });
      },
      { root: mainEl, threshold: 0.5 }
    );

    const sections = mainEl.querySelectorAll('section');
    sections.forEach((sec) => observer.observe(sec));

    // Pause auto-scroll when user manually scrolls or touches the screen
    const handleUserInteraction = () => {
      isUserInteracting = true;
      if (userPauseTimeout) clearTimeout(userPauseTimeout);

      // Resume auto-scroll 10 seconds after user finishes manual interaction
      userPauseTimeout = setTimeout(() => {
        isUserInteracting = false;
      }, 10000);
    };

    mainEl.addEventListener('touchstart', handleUserInteraction, { passive: true });
    mainEl.addEventListener('wheel', handleUserInteraction, { passive: true });
    mainEl.addEventListener('keydown', handleUserInteraction, { passive: true });
    mainEl.addEventListener('mousedown', handleUserInteraction, { passive: true });

    startAutoScroll();

    return () => {
      if (autoScrollInterval) clearInterval(autoScrollInterval);
      if (userPauseTimeout) clearTimeout(userPauseTimeout);
      observer.disconnect();
      mainEl.removeEventListener('touchstart', handleUserInteraction);
      mainEl.removeEventListener('wheel', handleUserInteraction);
      mainEl.removeEventListener('keydown', handleUserInteraction);
      mainEl.removeEventListener('mousedown', handleUserInteraction);
    };
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

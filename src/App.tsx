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

// Auto-Scroll Engine Component: Mounts directly inside <main> and triggers smooth section scrolling every 10s
function AutoScrollEngine() {
  useEffect(() => {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    let isUserInteracting = false;
    let userPauseTimeout: NodeJS.Timeout | null = null;

    const performAutoScroll = () => {
      if (isUserInteracting) return;

      const sections = mainEl.querySelectorAll('section');
      if (!sections || sections.length === 0) return;

      // Find current section index based on scrollTop
      const currentScroll = mainEl.scrollTop;
      const viewportHeight = mainEl.clientHeight;
      let activeIdx = 0;
      let minDiff = Infinity;

      sections.forEach((sec, idx) => {
        const diff = Math.abs((sec as HTMLElement).offsetTop - currentScroll);
        if (diff < minDiff) {
          minDiff = diff;
          activeIdx = idx;
        }
      });

      const currentSection = sections[activeIdx] as HTMLElement;
      const sectionBottom = currentSection.offsetTop + currentSection.offsetHeight;
      const visibleBottom = currentScroll + viewportHeight;
      const remainingUnseenSpace = sectionBottom - visibleBottom;

      // If section is long (like Wedding Schedule) and has > 150px unseen content below viewport:
      if (remainingUnseenSpace > 150) {
        const scrollAmount = Math.min(viewportHeight * 0.8, remainingUnseenSpace);
        mainEl.scrollTo({
          top: currentScroll + scrollAmount,
          behavior: 'smooth',
        });
      } else {
        // Move to start of next section
        const nextIdx = (activeIdx + 1) % sections.length;
        const targetSection = sections[nextIdx] as HTMLElement;
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    // Auto-scroll every 10 seconds
    const intervalId = setInterval(performAutoScroll, 10000);

    // Pause auto-scroll when user actively scrolls (wheel or touch drag)
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
  }, []);

  return null;
}

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
          <main key="main-content" className="w-full h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth relative">
            {/* Auto-scroll Engine */}
            <AutoScrollEngine />

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

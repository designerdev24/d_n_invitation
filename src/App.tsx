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

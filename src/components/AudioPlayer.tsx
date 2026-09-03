import React from 'react';
import { Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, onToggle }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 pointer-events-auto">
      <button
        onClick={onToggle}
        aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full backdrop-blur-md border flex items-center justify-center shadow-[0_10px_25px_rgba(40,40,40,0.15)] transition-all duration-300 transform active:scale-95 cursor-pointer hover:scale-105 ${
          isPlaying
            ? 'bg-white/85 border-[#BB2965]/40 text-[#BB2965] shadow-[0_4px_20px_rgba(187,41,101,0.2)]'
            : 'bg-white/80 border-[#386752]/30 text-[#386752] hover:text-[#BB2965]'
        }`}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 fill-current" />
        ) : (
          <Play className="w-5 h-5 fill-current ml-0.5" />
        )}
      </button>
    </div>
  );
};

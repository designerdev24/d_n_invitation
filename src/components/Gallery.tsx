import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  isPortrait?: boolean;
}

const GALLERY_IMAGES: GalleryItem[] = [
  {
    id: 1,
    src: '/assets/gallery_images/DSC00056 1.png',
    alt: 'Couple Portrait Floral Backdrop',
    isPortrait: true,
  },
  {
    id: 2,
    src: '/assets/gallery_images/DSC00384 1.png',
    alt: 'Bride Traditional Ritual Ceremony',
    isPortrait: true,
  },
  {
    id: 3,
    src: '/assets/gallery_images/DSC00013 1.png',
    alt: 'Ring Exchange Ritual Close Up',
    isPortrait: false,
  },
  {
    id: 4,
    src: '/assets/gallery_images/DSC00179 1.png',
    alt: 'Romantic Couple Moment',
    isPortrait: false,
  },
  {
    id: 5,
    src: '/assets/gallery_images/DSC00127 1.png',
    alt: 'Temple Backdrop Couple Portrait',
    isPortrait: false,
  },
  {
    id: 6,
    src: '/assets/gallery_images/DSC00299 copy.JPG 1.png',
    alt: 'Groom Stage Entrance',
    isPortrait: false,
  },
  {
    id: 7,
    src: '/assets/gallery_images/DSC00423 1.png',
    alt: 'Seashore Sunset Romance',
    isPortrait: false,
  },
  {
    id: 8,
    src: '/assets/gallery_images/DSC09913 1.png',
    alt: 'Celebration Moment',
    isPortrait: false,
  },
];

export const Gallery: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null
    );
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

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

      {/* Main Gallery Content Container */}
      <div className="max-w-2xl mx-auto w-full px-4 my-auto flex flex-col items-center">
        
        {/* Title Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center pt-[32px] mb-8 w-full"
        >
          <span className="font-serif text-xs uppercase tracking-[0.35em] text-[#386752] font-semibold block mb-1">
            MEMORIES
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#BB2965]">
            Our Gallery
          </h2>

          {/* Line Divider with Centered Heart Symbol */}
          <div className="flex items-center justify-center gap-3 mt-3.5 mb-1 max-w-xs mx-auto">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#386752]/40 to-[#386752]/60" />
            <Heart className="w-4 h-4 text-[#BB2965] fill-[#BB2965] shrink-0" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#386752]/40 to-[#386752]/60" />
          </div>
        </motion.div>

        {/* Gallery Grid Matching Uploaded Format */}
        <div className="w-full grid grid-cols-2 gap-3 sm:gap-4 items-start">
          
          {/* Row 1: Tall Portrait Cards (Items 0 and 1) */}
          {GALLERY_IMAGES.slice(0, 2).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 + idx * 0.1 }}
              onClick={() => setSelectedIndex(idx)}
              className="group relative p-2 bg-white/70 backdrop-blur-md rounded-[2rem] border border-white/60 shadow-[0_10px_25px_rgba(40,40,40,0.06)] cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[0_15px_30px_rgba(187,41,101,0.15)] hover:scale-[1.02]"
            >
              <div className="relative w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-gray-100">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="w-6 h-6 text-white drop-shadow-md" />
                </div>
              </div>
            </motion.div>
          ))}

          {/* Row 2: Landscape Cards (Items 2 and 3) */}
          {GALLERY_IMAGES.slice(2, 4).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 + idx * 0.1 }}
              onClick={() => setSelectedIndex(2 + idx)}
              className="group relative p-2 bg-white/70 backdrop-blur-md rounded-[2rem] border border-white/60 shadow-[0_10px_25px_rgba(40,40,40,0.06)] cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[0_15px_30px_rgba(187,41,101,0.15)] hover:scale-[1.02]"
            >
              <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-gray-100">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="w-6 h-6 text-white drop-shadow-md" />
                </div>
              </div>
            </motion.div>
          ))}

          {/* Row 3: Landscape Cards (Items 4 and 5) */}
          {GALLERY_IMAGES.slice(4, 6).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 + idx * 0.1 }}
              onClick={() => setSelectedIndex(4 + idx)}
              className="group relative p-2 bg-white/70 backdrop-blur-md rounded-[2rem] border border-white/60 shadow-[0_10px_25px_rgba(40,40,40,0.06)] cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[0_15px_30px_rgba(187,41,101,0.15)] hover:scale-[1.02]"
            >
              <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-gray-100">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="w-6 h-6 text-white drop-shadow-md" />
                </div>
              </div>
            </motion.div>
          ))}

          {/* Row 4: Centered Single Landscape Card (Item 6) */}
          {GALLERY_IMAGES.slice(6, 7).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.45 }}
              onClick={() => setSelectedIndex(6 + idx)}
              className="col-span-2 max-w-sm mx-auto w-full group relative p-2 bg-white/70 backdrop-blur-md rounded-[2rem] border border-white/60 shadow-[0_10px_25px_rgba(40,40,40,0.06)] cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[0_15px_30px_rgba(187,41,101,0.15)] hover:scale-[1.02]"
            >
              <div className="relative w-full aspect-[16/10] rounded-[1.5rem] overflow-hidden bg-gray-100">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="w-6 h-6 text-white drop-shadow-md" />
                </div>
              </div>
            </motion.div>
          ))}

        </div>

      </div>

      {/* 4. Full-Width flower_bottom.png Image anchored at absolute bottom edge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full z-20 pointer-events-none leading-none flex justify-center shrink-0 mt-6"
      >
        <img
          src="/assets/flower_bottom.png"
          alt="Bottom Flower Garland"
          className="w-full max-w-5xl h-auto object-contain object-bottom block"
        />
      </motion.div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer select-none"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full backdrop-blur-sm transition-colors z-20"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Image Button */}
            <button
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm transition-all transform hover:scale-110 z-20"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Next Image Button */}
            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm transition-all transform hover:scale-110 z-20"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Image Counter Badge */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white/90 text-xs px-3.5 py-1.5 rounded-full backdrop-blur-sm font-poppins border border-white/20 z-20 tracking-wider">
              {selectedIndex + 1} / {GALLERY_IMAGES.length}
            </div>

            {/* Active Image Container */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-3xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl p-2 bg-white/20 border border-white/30"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <img
                src={GALLERY_IMAGES[selectedIndex].src}
                alt={GALLERY_IMAGES[selectedIndex].alt}
                className="w-full h-full max-h-[80vh] object-contain rounded-2xl cursor-pointer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

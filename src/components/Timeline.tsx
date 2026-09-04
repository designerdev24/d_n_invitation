import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Heart, Navigation } from 'lucide-react';

export const Timeline: React.FC = () => {
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

      {/* Main Section Wrapper */}
      <div className="max-w-2xl mx-auto w-full px-4 my-auto flex flex-col items-center">
        
        {/* Main Title: Wedding Schedule with 32px Gap (pt-[32px]) & Heart Line Divider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center pt-[32px] mb-8 w-full"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#BB2965]">
            Wedding Schedule
          </h2>

          {/* Line Divider with Centered Heart Symbol */}
          <div className="flex items-center justify-center gap-3 mt-3.5 mb-1 max-w-xs mx-auto">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#386752]/40 to-[#386752]/60" />
            <Heart className="w-4 h-4 text-[#BB2965] fill-[#BB2965] shrink-0" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#386752]/40 to-[#386752]/60" />
          </div>
        </motion.div>

        {/* Glassmorphic Event Cards Container */}
        <div className="w-full flex flex-col space-y-8 items-center">
          
          {/* CARD 1: Holy Matrimony (Muhurtham) - 60% Opacity with blended bg_blend background */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full bg-white/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-[0_15px_35px_rgba(40,40,40,0.06)] border border-white/60 flex flex-col items-center text-center relative overflow-hidden"
          >
            {/* Blended Background Image: bg_blend.png */}
            <img
              src="/assets/bg_blend.png"
              alt="Background Pattern Blend"
              className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-multiply pointer-events-none rounded-3xl"
            />

            <div className="relative z-10 w-full flex flex-col items-center text-center">
              {/* Top Illustration: muhurtham.png */}
              <img
                src="/assets/muhurtham.png"
                alt="Muhurtham Illustration"
                className="w-36 sm:w-44 h-auto object-contain mx-auto mb-3"
              />

              {/* Decorative Icon Ring */}
              <span className="text-xl mb-1">💍</span>

              {/* Title */}
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#386752]">
                Muhurtham · Holy Matrimony
              </h3>

              {/* Description Subtitle */}
              <p className="font-poppins text-xs sm:text-sm text-[#2D3A34]/80 max-w-md my-2.5 font-normal leading-relaxed">
                The moment two families become one under divine blessings. Officiated by Pastor Eripilli John Garu.
              </p>

              {/* Pill Badges at Bottom */}
              <div className="flex flex-col items-center gap-2 mt-2 w-full">
                {/* Row 1: Date & Time Badges */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#386752]/25 shadow-xs">
                    <Calendar className="w-3.5 h-3.5 text-[#BB2965]" />
                    <span className="font-poppins text-xs font-medium text-[#386752]">
                      4th September 2026
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#386752]/25 shadow-xs">
                    <Clock className="w-3.5 h-3.5 text-[#BB2965]" />
                    <span className="font-poppins text-xs font-medium text-[#386752]">
                      10:00 AM IST
                    </span>
                  </div>
                </div>

                {/* Row 2: Location Badge */}
                <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 border border-[#386752]/25 shadow-xs max-w-full">
                  <MapPin className="w-3.5 h-3.5 text-[#BB2965] shrink-0" />
                  <span className="font-poppins text-xs font-medium text-[#BB2965] truncate">
                    Uppada Nayakar Colony - 2, At Residence
                  </span>
                </div>

                {/* Direction Google Maps Button */}
                <a
                  href="https://maps.app.goo.gl/THD7yDuZhRZvKgrPA?g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 mt-3 px-5 py-2 rounded-full bg-white/90 text-[#386752] border-[0.5px] border-[#386752] font-poppins font-medium text-xs tracking-wider uppercase shadow-[0_10px_30px_rgba(40,40,40,0.10)] hover:bg-[#386752] hover:text-white transition-all duration-300 transform active:scale-95 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Direction</span>
                </a>
              </div>
            </div>
          </motion.div>


          {/* CARD 2: Wedding Lunch & Feast - 60% Opacity */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="w-full bg-white/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-[0_15px_35px_rgba(40,40,40,0.06)] border border-white/60 flex flex-col items-center text-center"
          >
            {/* Top Illustration: feast.png */}
            <img
              src="/assets/feast.png"
              alt="Grand Feast Illustration"
              className="w-36 sm:w-44 h-auto object-contain mx-auto mb-3"
            />

            {/* Decorative Icon */}
            <span className="text-xl mb-1">🍽️</span>

            {/* Title */}
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#386752]">
              Grand Feast · Celebration
            </h3>

            {/* Description Subtitle */}
            <p className="font-poppins text-xs sm:text-sm text-[#2D3A34]/80 max-w-md my-2.5 font-normal leading-relaxed">
              Join us for a joyous celebratory wedding lunch and fellowship with family, friends, and loved ones.
            </p>

            {/* Pill Badges at Bottom */}
            <div className="flex flex-col items-center gap-2 mt-2 w-full">
              {/* Row 1: Date & Time Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#386752]/25 shadow-xs">
                  <Calendar className="w-3.5 h-3.5 text-[#BB2965]" />
                  <span className="font-poppins text-xs font-medium text-[#386752]">
                    4th September 2026
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#386752]/25 shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-[#BB2965]" />
                  <span className="font-poppins text-xs font-medium text-[#386752]">
                    12:00 PM Onwards
                  </span>
                </div>
              </div>

              {/* Row 2: Location Badge */}
              <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 border border-[#386752]/25 shadow-xs max-w-full">
                <MapPin className="w-3.5 h-3.5 text-[#BB2965] shrink-0" />
                <span className="font-poppins text-xs font-medium text-[#BB2965] truncate">
                  Feast Venue: At Residence (Uppada Nayakar Colony - 2)
                </span>
              </div>
            </div>
          </motion.div>

        </div>

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

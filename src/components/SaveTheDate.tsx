import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Heart, Navigation } from 'lucide-react';

export const SaveTheDate: React.FC = () => {
  const openGoogleCalendar = () => {
    const title = encodeURIComponent('Durgaprasad & Nookaratnam Holy Wedding Celebration');
    const details = encodeURIComponent('Join us for the Holy Matrimony of Durgaprasad & Nookaratnam at Uppada Nayakar Colony - 2.');
    const location = encodeURIComponent('Uppada Nayakar Colony - 2, Uppada, Kakinada District, Andhra Pradesh, India');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20260904T043000Z/20260904T093000Z&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

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

      {/* Main Content Wrapper */}
      <div className="max-w-2xl mx-auto w-full px-4 my-auto flex flex-col items-center">
        
        {/* Title Stack: WHERE TO FIND US · The Venue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center pt-[32px] mb-8 w-full"
        >
          <span className="font-serif text-xs uppercase tracking-[0.35em] text-[#386752] font-semibold block mb-1">
            WHERE TO FIND US
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#BB2965]">
            The Venue
          </h2>

          {/* Line Divider with Centered Heart Symbol */}
          <div className="flex items-center justify-center gap-3 mt-3.5 mb-1 max-w-xs mx-auto">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#386752]/40 to-[#386752]/60" />
            <Heart className="w-4 h-4 text-[#BB2965] fill-[#BB2965] shrink-0" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#386752]/40 to-[#386752]/60" />
          </div>
        </motion.div>

        {/* Glassmorphic Venue Card (60% Opacity, matching Wedding Schedule theme) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full bg-white/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-[0_15px_35px_rgba(40,40,40,0.06)] border border-white/60 flex flex-col items-center text-center"
        >
          {/* Location Pin Icon */}
          <div className="w-12 h-12 rounded-full bg-white/80 border border-[#386752]/25 flex items-center justify-center mb-3 shadow-xs">
            <MapPin className="w-6 h-6 text-[#BB2965]" />
          </div>

          {/* Venue Name */}
          <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#386752] mb-1">
            Residence Venue
          </h3>

          {/* Full Address */}
          <p className="font-poppins text-xs sm:text-sm text-[#2D3A34]/80 max-w-md mb-6 font-normal leading-relaxed">
            Uppada Nayakar Colony - 2, At Residence, Uppada, Kakinada District, Andhra Pradesh
          </p>

          {/* Details Table List */}
          <div className="w-full max-w-md space-y-3 mb-6 text-xs sm:text-sm font-poppins">
            <div className="flex justify-between items-center py-2 border-b border-[#386752]/20">
              <span className="text-[#386752] font-semibold">Date</span>
              <span className="text-[#2D3A34] font-medium">4th September 2026</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-[#386752]/20">
              <span className="text-[#386752] font-semibold">Muhurtham</span>
              <span className="text-[#2D3A34] font-medium">10:00 AM IST</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-[#386752] font-semibold">Grand Feast</span>
              <span className="text-[#2D3A34] font-medium">12:00 PM onwards</span>
            </div>
          </div>

          {/* Action Buttons Stack */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md pt-2">
            
            {/* Button 1: Open in Google Maps */}
            <a
              href="https://maps.app.goo.gl/THD7yDuZhRZvKgrPA?g_st=aw"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white/90 text-[#386752] border-[0.5px] border-[#386752] font-poppins font-medium text-xs tracking-wider uppercase shadow-[0_10px_30px_rgba(40,40,40,0.10)] hover:bg-[#386752] hover:text-white transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
            </a>

            {/* Button 2: Add to Calendar */}
            <button
              onClick={openGoogleCalendar}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white/90 text-[#386752] border-[0.5px] border-[#386752] font-poppins font-medium text-xs tracking-wider uppercase shadow-[0_10px_30px_rgba(40,40,40,0.10)] hover:bg-[#386752] hover:text-white transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Add to Calendar</span>
            </button>

          </div>

        </motion.div>

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

    </section>
  );
};

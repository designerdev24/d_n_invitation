import React from 'react';
import { motion } from 'motion/react';
import { Heart, User } from 'lucide-react';

export const CoupleIntro: React.FC = () => {
  return (
    <section className="relative z-10 w-full min-h-screen py-16 px-4 flex flex-col justify-center items-center snap-start">
      <div className="max-w-4xl mx-auto w-full text-center">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="text-[#386752] font-serif text-xs uppercase tracking-[0.3em] font-bold">
            The Holy Union
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#BB2965] mt-2">
            The Groom &amp; The Bride
          </h2>
          <div className="w-16 h-[2px] bg-[#386752] mx-auto mt-4" />
        </motion.div>

        {/* Groom & Bride Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-[#386752] shadow-[0_15px_35px_rgba(187,41,101,0.08)] text-center flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-[#386752]/15 border border-[#386752] flex items-center justify-center mx-auto mb-4 text-[#386752]">
                <User className="w-6 h-6" />
              </div>
              <span className="font-serif text-xs uppercase tracking-widest text-[#386752] font-bold">
                The Groom
              </span>
              <h3 className="font-cursive text-4xl font-bold text-[#BB2965] my-3">
                Chi. Durgaprasad
              </h3>
              <div className="w-full h-[1px] bg-[#386752]/30 my-4" />
              <p className="text-sm text-[#2D3A34] leading-relaxed">
                <strong className="block text-[#BB2965] font-serif mb-1 text-base">Parents:</strong>
                Son of Sri Ramisetti Venkataramana &amp; Srimathi Nookaramma
              </p>
            </div>
          </motion.div>

          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-[#386752] shadow-[0_15px_35px_rgba(187,41,101,0.08)] text-center flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-[#BB2965]/15 border border-[#BB2965] flex items-center justify-center mx-auto mb-4 text-[#BB2965]">
                <Heart className="w-6 h-6 fill-[#BB2965]" />
              </div>
              <span className="font-serif text-xs uppercase tracking-widest text-[#386752] font-bold">
                The Bride
              </span>
              <h3 className="font-cursive text-4xl font-bold text-[#BB2965] my-3">
                Chi. Sou. Nookaratnam
              </h3>
              <div className="w-full h-[1px] bg-[#386752]/30 my-4" />
              <p className="text-sm text-[#2D3A34] leading-relaxed">
                <strong className="block text-[#BB2965] font-serif mb-1 text-base">Parents:</strong>
                First daughter of Sri Bade Veerababu &amp; Srimathi Bujji (Pagadalapeta, Kakinada)
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

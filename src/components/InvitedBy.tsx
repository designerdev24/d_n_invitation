import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const InvitedBy: React.FC = () => {
  return (
    <section className="relative z-10 w-full min-h-screen py-16 px-4 flex flex-col justify-center items-center snap-start text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto w-full p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-[#386752] shadow-[0_15px_35px_rgba(187,41,101,0.08)]"
      >
        <span className="text-[#386752] font-serif text-xs uppercase tracking-[0.3em] font-bold">
          Best Wishes &amp; Blessings
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#BB2965] mt-2 mb-6">
          With Warm Wishes From Relatives
        </h2>

        {/* Relatives List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left my-6">
          {[
            'Dangeti Jagadeesh & Srimathi Suvarnabhanu',
            'Ramisetti Apparao (Late) & Srimathi Lakshmi',
            'Ramisetti Jagannatham & Srimathi Bangaramma',
            'Ramisetti Appalaraju & Srimathi Bujji'
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#F2FEFF]/80 border border-[#386752]/30 flex items-center gap-3 text-[#BB2965] text-sm font-semibold"
            >
              <Sparkles className="w-4 h-4 text-[#386752] shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-[#386752] italic my-4 font-medium">
          And all relatives, friends &amp; well-wishers...
        </p>

        <div className="w-full h-[1px] bg-[#386752]/40 my-6" />

        {/* Inviting Parents */}
        <div className="text-center">
          <span className="text-[#386752] text-xs font-serif uppercase tracking-widest block mb-2 font-bold">
            Welcoming You With Love:
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#BB2965]">
            Sri Ramisetti Venkataramana &amp; Srimathi Nookaramma
          </h3>
        </div>

      </motion.div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Send, MessageSquare } from 'lucide-react';

interface Wish {
  name: string;
  message: string;
  time: string;
}

const STORAGE_KEY = 'dp_nk_react_wishes_v5_clean';

export const ThankYou: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('Yes');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Clear old mock wishes keys from previous versions
    try {
      localStorage.removeItem('dp_nk_react_wishes_v1');
      localStorage.removeItem('dp_nk_react_wishes_v2');
      localStorage.removeItem('dp_nk_react_wishes_v3');
      
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setWishes(JSON.parse(stored));
      } else {
        setWishes([]);
      }
    } catch (e) {
      setWishes([]);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: Wish = {
      name: `${name.trim()} (${attendance})`,
      message: message.trim(),
      time: 'Just now'
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}

    setName('');
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
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
        
        {/* Title Stack: CONFIRM ATTENDANCE · RSVP & Blessings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center pt-[32px] mb-6 w-full"
        >
          <span className="font-serif text-xs uppercase tracking-[0.35em] text-[#386752] font-semibold block mb-1">
            CONFIRM ATTENDANCE
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#BB2965]">
            RSVP &amp; Blessings
          </h2>

          {/* Line Divider with Centered Heart Symbol */}
          <div className="flex items-center justify-center gap-3 mt-3.5 mb-1 max-w-xs mx-auto">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#386752]/40 to-[#386752]/60" />
            <Heart className="w-4 h-4 text-[#BB2965] fill-[#BB2965] shrink-0" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#386752]/40 to-[#386752]/60" />
          </div>
        </motion.div>

        {/* Glassmorphic Card (60% Opacity, matching Venue section theme) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full bg-white/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-[0_15px_35px_rgba(40,40,40,0.06)] border border-white/60 flex flex-col items-center text-center"
        >
          <p className="font-poppins text-xs sm:text-sm text-[#2D3A34]/80 mb-6 font-normal">
            Please share your heartfelt wishes and confirm your presence with us!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md text-left">
            <div>
              <label className="block text-xs font-poppins text-[#386752] font-semibold uppercase tracking-wider mb-1.5">
                Your Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-[#386752]/25 text-[#2D3A34] text-sm focus:outline-none focus:border-[#BB2965] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-poppins text-[#386752] font-semibold uppercase tracking-wider mb-1.5">
                Will You Attend?
              </label>
              <select
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-[#386752]/25 text-[#2D3A34] text-sm focus:outline-none focus:border-[#BB2965] transition-colors"
              >
                <option value="Yes">Yes, I will attend with joy!</option>
                <option value="With Family">Attending with Family</option>
                <option value="Sending Blessings">Sending blessings from afar</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-poppins text-[#386752] font-semibold uppercase tracking-wider mb-1.5">
                Your Blessings / Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Write your blessings and message for the couple..."
                required
                className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-[#386752]/25 text-[#2D3A34] text-sm focus:outline-none focus:border-[#BB2965] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-white/90 text-[#386752] border-[0.5px] border-[#386752] font-poppins font-medium text-xs tracking-wider uppercase shadow-[0_10px_30px_rgba(40,40,40,0.10)] hover:bg-[#386752] hover:text-white transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitted ? '✨ Blessing Submitted! Thank You! ✨' : 'Submit Blessing'}</span>
            </button>
          </form>

          {/* Guestbook Wall (Only shows user-submitted wishes) */}
          {wishes.length > 0 && (
            <div className="mt-8 w-full max-w-md text-left">
              <div className="flex items-center gap-2 text-[#BB2965] font-serif text-base font-bold mb-3">
                <MessageSquare className="w-4 h-4 text-[#386752]" />
                <span>Guestbook Wishes</span>
              </div>

              <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1">
                {wishes.map((w, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-white/80 border-l-4 border-[#BB2965] border border-[#386752]/20 shadow-xs">
                    <div className="font-poppins font-semibold text-[#BB2965] text-xs">{w.name}</div>
                    <div className="text-xs text-[#2D3A34] mt-1 font-normal">{w.message}</div>
                    <div className="text-[10px] text-[#386752] mt-1 font-medium">{w.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </motion.div>

        {/* Footer */}
        <footer className="mt-6 mb-2 text-center text-xs text-[#386752] font-medium font-poppins">
          <p>Made with ❤️ for Durgaprasad &amp; Nookaratnam Wedding</p>
          <p className="mt-0.5 text-[11px] text-[#386752]/80">Friday, 4th September 2026 · Uppada</p>
        </footer>

      </div>

      {/* 4. Full-Width flower_bottom.png Image anchored at absolute bottom edge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full z-20 pointer-events-none leading-none flex justify-center shrink-0 mt-4"
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

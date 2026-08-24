import React, { useState } from 'react';
import { FAQS, ASSET_IMAGES } from '../data/mockData';
import { ThemeMode } from '../types';
import { soundFX } from '../utils/audio';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQSectionProps {
  themeMode: ThemeMode;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ themeMode }) => {
  const [openFaqId, setOpenFaqId] = useState<string>('faq-2');

  const toggleFaq = (id: string) => {
    soundFX.playClick();
    setOpenFaqId(openFaqId === id ? '' : id);
  };

  return (
    <section 
      className="relative w-full py-28 px-5 lg:px-12 overflow-hidden"
    >
      {/* 1. Pure Image Background with Top and Bottom Edge Blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img
          src={ASSET_IMAGES.faqBg}
          alt="Misty Forest Landscape"
          className="w-full h-full object-cover object-center image-edge-blur-both scale-[1.01]"
        />

        {/* Dark overlay applied strictly in Dark Mode only */}
        {themeMode === 'dark' && (
          <div className="absolute inset-0 bg-black/60 backdrop-brightness-75 transition-opacity duration-500" />
        )}
      </div>

      {/* Edge Blur Seams */}
      <div className="edge-blur-seam-top" />
      <div className="edge-blur-seam-bottom" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className={`font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-medium mb-4 ${
            themeMode === 'dark' ? 'text-[#e5e2e1]' : 'text-[#1a150e]'
          }`}>
            Wisdom of the Mist
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto font-sans ${
            themeMode === 'dark' ? 'text-[#d1c5b4]' : 'text-[#383124]'
          }`}>
            Understanding the philosophy and mechanics of the Aurelian Burn.
          </p>
        </motion.div>

        {/* Glass Accordion Container with Enhanced Glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`rounded-3xl p-6 sm:p-12 shadow-2xl transition-all duration-300 ${
            themeMode === 'dark'
              ? 'glass-sharp text-white'
              : 'glass-sharp-light text-[#1a150e]'
          }`}
        >
          <div className="space-y-6">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqId === faq.id;

              return (
                <motion.div 
                  key={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  onClick={() => toggleFaq(faq.id)}
                  className={`border-b pb-6 cursor-pointer group transition-colors ${
                    themeMode === 'dark' ? 'border-white/10' : 'border-black/10'
                  }`}
                >
                  <div className="flex justify-between items-center gap-4">
                    <h4 className={`font-serif-heading text-lg sm:text-xl font-medium transition-colors ${
                      isOpen
                        ? themeMode === 'dark' ? 'text-[#e9c176]' : 'text-[#775a19]'
                        : themeMode === 'dark' 
                          ? 'text-white group-hover:text-[#e9c176]' 
                          : 'text-[#1a150e] group-hover:text-[#775a19]'
                    }`}>
                      {faq.question}
                    </h4>

                    <div className={`p-1.5 rounded-full transition-transform duration-300 ${
                      isOpen 
                        ? themeMode === 'dark' ? 'rotate-180 text-[#e9c176]' : 'rotate-180 text-[#775a19]' 
                        : themeMode === 'dark' ? 'text-white/60' : 'text-[#775a19]/70'
                    }`}>
                      <ChevronDown size={20} />
                    </div>
                  </div>

                  {/* Expandable Body with smooth height transition */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 text-sm sm:text-base leading-relaxed opacity-95 font-sans">
                          <p className={themeMode === 'dark' ? 'text-white/80' : 'text-[#383124] font-medium'}>
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

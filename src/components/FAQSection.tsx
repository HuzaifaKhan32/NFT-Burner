import React, { useState } from 'react';
import { FAQS, ASSET_IMAGES } from '../data/mockData';
import { ThemeMode } from '../types';
import { soundFX } from '../utils/audio';
import { ChevronDown } from 'lucide-react';

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
      className="relative w-full py-28 px-5 lg:px-12 bg-cover bg-fixed bg-center transition-all duration-500 overflow-hidden"
      style={{ backgroundImage: `url("${ASSET_IMAGES.faqBg}")` }}
    >
      {/* 1. Base dark tint */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        themeMode === 'dark' ? 'bg-black/55 backdrop-brightness-85' : 'bg-[#101412]/35 backdrop-brightness-95'
      }`} />

      {/* 2. Top Edge Fade (blending seamlessly from vault section) */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#060a08] via-[#060a08]/50 to-transparent pointer-events-none z-[1]" />

      {/* 3. Radial Vignette for depth */}
      <div className="absolute inset-0 section-vignette pointer-events-none z-[1]" />

      {/* 4. Bottom Edge Fade (blending directly into the footer) */}
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-b from-transparent via-[#141210]/80 to-[#141210] pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className={`font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-medium mb-4 ${
            themeMode === 'dark' ? 'text-[#e5e2e1]' : 'text-[#1e1b16]'
          }`}>
            Wisdom of the Mist
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto ${
            themeMode === 'dark' ? 'text-[#d1c5b4]' : 'text-[#4e4639]'
          }`}>
            Understanding the philosophy and mechanics of the Aurelian Burn.
          </p>
        </div>

        {/* Glass Accordion Container */}
        <div className={`rounded-3xl p-6 sm:p-12 shadow-2xl transition-all duration-300 ${
          themeMode === 'dark'
            ? 'glass-sharp text-white'
            : 'bg-white/80 border border-white/60 shadow-xl backdrop-blur-md text-[#1e1b16]'
        }`}>
          <div className="space-y-6">
            {FAQS.map(faq => {
              const isOpen = openFaqId === faq.id;

              return (
                <div 
                  key={faq.id}
                  onClick={() => toggleFaq(faq.id)}
                  className="border-b border-white/10 pb-6 cursor-pointer group"
                >
                  <div className="flex justify-between items-center gap-4">
                    <h4 className={`font-serif-heading text-lg sm:text-xl font-medium transition-colors ${
                      isOpen
                        ? 'text-[#e9c176]'
                        : themeMode === 'dark' ? 'text-white group-hover:text-[#e9c176]' : 'text-[#1e1b16] group-hover:text-[#775a19]'
                    }`}>
                      {faq.question}
                    </h4>

                    <div className={`p-1.5 rounded-full transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#e9c176]' : 'text-white/60'
                    }`}>
                      <ChevronDown size={20} />
                    </div>
                  </div>

                  {/* Expandable Body */}
                  {isOpen && (
                    <div className="mt-4 text-sm sm:text-base leading-relaxed opacity-90 animate-fade-in font-sans">
                      <p className={themeMode === 'dark' ? 'text-white/80' : 'text-[#4e4639]'}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

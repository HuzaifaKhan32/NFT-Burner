import React from 'react';
import { ASSET_IMAGES } from '../data/mockData';
import { ThemeMode } from '../types';
import { Sparkles, Search, CheckCheck, Gem } from 'lucide-react';

interface ProcedureSectionProps {
  themeMode: ThemeMode;
}

export const ProcedureSection: React.FC<ProcedureSectionProps> = ({ themeMode }) => {
  const steps = [
    {
      step: "01. CONNECT",
      desc: "Link your Phantom wallet to access your curated vault.",
      icon: <span className="text-2xl">👻</span>
    },
    {
      step: "02. DETECT",
      desc: "Our gallery protocol scans for eligible original works.",
      icon: <Search className="w-6 h-6 text-[#e9c176]" />
    },
    {
      step: "03. SELECT",
      desc: "Choose the original artworks you wish to surrender.",
      icon: <CheckCheck className="w-6 h-6 text-[#e9c176]" />
    },
    {
      step: "04. METAMORPHOSIS",
      desc: "The pieces dissolve into particle light to recombine.",
      icon: <Sparkles className="w-6 h-6 text-[#e9c176] animate-pulse" />,
      highlight: true
    },
    {
      step: "05. REVEAL",
      desc: "Receive your newly forged botanical artifact.",
      icon: <Gem className="w-6 h-6 text-[#e9c176]" />
    }
  ];

  return (
    <section 
      className="relative w-full py-28 px-5 lg:px-12 bg-cover bg-fixed bg-center transition-all duration-500 overflow-hidden"
      style={{ backgroundImage: `url("${ASSET_IMAGES.stepsBg}")` }}
    >
      {/* 1. Base dark tint */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        themeMode === 'dark' ? 'bg-black/55 backdrop-brightness-85' : 'bg-[#181510]/35 backdrop-brightness-95'
      }`} />

      {/* 2. Top Edge Fade (blending seamlessly from Hero) */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0d0c0a] via-[#0d0c0a]/50 to-transparent pointer-events-none z-[1]" />

      {/* 3. Radial Vignette for rich depth */}
      <div className="absolute inset-0 section-vignette pointer-events-none z-[1]" />

      {/* 4. Bottom Edge Fade (blending smoothly into Vault) */}
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-b from-transparent via-[#0a0c0b]/60 to-[#0a0c0b] pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-medium mb-4 text-[#e5e2e1]">
            The Ritual of Metamorphosis
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-[#d1c5b4]">
            A serene five-step journey transitioning physical-digital aesthetic energy into rare botanical artifacts.
          </p>
        </div>

        {/* Glass Panel Container */}
        <div className={`rounded-3xl p-8 lg:p-14 shadow-2xl relative ${
          themeMode === 'dark'
            ? 'glass-sharp text-white'
            : 'bg-black/60 border border-white/20 shadow-2xl backdrop-blur-md text-white'
        }`}>
          {/* Connector Line on Desktop */}
          <div className="hidden md:block absolute top-1/2 left-12 right-12 h-px bg-[#e9c176]/20 -translate-y-6 z-0" />

          {/* 5 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {steps.map((item, idx) => (
              <div 
                key={idx}
                className="flex flex-col items-center text-center group cursor-default transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Circle Icon Container */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 shadow-lg relative ${
                  item.highlight
                    ? 'bg-[#e9c176]/20 ring-2 ring-[#e9c176] shadow-[#e9c176]/20'
                    : themeMode === 'dark'
                      ? 'bg-[#201f1f] border border-white/10'
                      : 'bg-[#2c2416] text-white shadow-md'
                }`}>
                  {item.highlight && (
                    <div className="absolute inset-0 rounded-full bg-[#e9c176]/20 animate-ping" />
                  )}
                  {item.icon}
                </div>

                {/* Step Title */}
                <span className={`text-xs font-semibold tracking-[0.2em] mb-2 uppercase ${
                  themeMode === 'dark' ? 'text-[#e9c176]' : 'text-[#2c2416]'
                }`}>
                  {item.step}
                </span>

                {/* Step Description */}
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  themeMode === 'dark' ? 'text-white/70' : 'text-[#4e4639]'
                }`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

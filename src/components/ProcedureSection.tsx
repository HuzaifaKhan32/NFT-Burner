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
      desc: "Link your Phantom (Solana) wallet to access your curated vault.",
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
      className="relative w-full py-28 px-5 lg:px-12 overflow-hidden"
    >
      {/* 1. Pure Image Background with Top and Bottom Edge Blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img
          src={ASSET_IMAGES.stepsBg}
          alt="Ritual Canopy"
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

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-medium mb-4 ${
            themeMode === 'dark' ? 'text-[#e5e2e1]' : 'text-[#1a150e]'
          }`}>
            The Ritual of Metamorphosis
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto font-sans ${
            themeMode === 'dark' ? 'text-[#d1c5b4]' : 'text-[#383124]'
          }`}>
            A serene five-step journey transitioning physical-digital aesthetic energy into rare botanical artifacts.
          </p>
        </div>

        {/* Glass Panel Container */}
        <div className={`rounded-3xl p-8 lg:p-14 shadow-2xl relative transition-all duration-300 ${
          themeMode === 'dark'
            ? 'glass-sharp text-white'
            : 'glass-sharp-light text-[#1a150e]'
        }`}>
          {/* Connector Line on Desktop */}
          <div className={`hidden md:block absolute top-1/2 left-12 right-12 h-px -translate-y-6 z-0 ${
            themeMode === 'dark' ? 'bg-[#e9c176]/25' : 'bg-[#775a19]/25'
          }`} />

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
                    ? 'bg-[#e9c176]/25 ring-2 ring-[#e9c176] shadow-[#e9c176]/30 backdrop-blur-md'
                    : themeMode === 'dark'
                      ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white'
                      : 'bg-white/40 backdrop-blur-md border border-white/60 text-[#775a19] shadow-md'
                }`}>
                  {item.highlight && (
                    <div className="absolute inset-0 rounded-full bg-[#e9c176]/25 animate-ping" />
                  )}
                  {item.icon}
                </div>

                {/* Step Title */}
                <span className={`text-xs font-bold tracking-[0.2em] mb-2 uppercase ${
                  themeMode === 'dark' ? 'text-[#e9c176]' : 'text-[#775a19]'
                }`}>
                  {item.step}
                </span>

                {/* Step Description */}
                <p className={`text-xs sm:text-sm leading-relaxed font-sans ${
                  themeMode === 'dark' ? 'text-white/80' : 'text-[#383124] font-medium'
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

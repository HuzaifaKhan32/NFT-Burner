import React from 'react';
import { ASSET_IMAGES } from '../data/mockData';
import { ThemeMode } from '../types';
import { soundFX } from '../utils/audio';

interface HeroSectionProps {
  themeMode: ThemeMode;
  onEnterVault: () => void;
  onExploreGallery: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  themeMode,
  onEnterVault,
  onExploreGallery
}) => {
  return (
    <section 
      className="relative w-full min-h-[92vh] flex items-center justify-center pt-28 pb-24 px-5 lg:px-12 bg-cover bg-fixed bg-center transition-all duration-500 overflow-hidden"
      style={{ backgroundImage: `url("${ASSET_IMAGES.heroBg}")` }}
    >
      {/* 1. Base dark tone layer */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        themeMode === 'dark' ? 'bg-black/45 backdrop-brightness-90' : 'bg-[#1a1713]/30 backdrop-brightness-95'
      }`} />

      {/* 2. Top Edge Fade (under navigation) */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none z-[1]" />

      {/* 3. Radial Vignette for focused center attention */}
      <div className="absolute inset-0 section-vignette pointer-events-none z-[1]" />

      {/* 4. Bottom Smooth Fade to next section */}
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-b from-transparent via-[#0d0c0a]/60 to-[#0d0c0a] pointer-events-none z-[1]" />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Glass Card Container */}
        <div className={`rounded-2xl p-8 md:p-14 flex flex-col items-center text-center max-w-3xl w-full transition-all duration-300 ${
          themeMode === 'dark'
            ? 'glass-sharp-gold text-[#e5e2e1]'
            : 'glass-sharp-light text-[#1e1b16]'
        }`}>
          {/* Status Badge */}
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-8 border ${
            themeMode === 'dark'
              ? 'bg-black/40 border-[#e9c176]/30 text-[#e9c176]'
              : 'bg-white/60 border-[#775a19]/30 text-[#775a19]'
          }`}>
            <span className="w-2 h-2 rounded-full bg-[#e9c176] animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase">
              THE VAULT IS OPEN
            </span>
          </div>

          {/* Editorial Headline */}
          <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.15] mb-6">
            Breathe Life Into Your Digital Legacy.
          </h1>

          {/* Description */}
          <p className={`text-base sm:text-lg max-w-2xl leading-relaxed mb-10 font-sans ${
            themeMode === 'dark' ? 'text-white/80' : 'text-[#4e4639]'
          }`}>
            Aurelian Mist is a sanctuary for artistic transformation. Surrender your dormant original artworks to forge luminous, nature-inspired digital artifacts through deliberate metamorphosis.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => {
                soundFX.playClick();
                onEnterVault();
              }}
              className={`w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold tracking-widest uppercase transition-all shadow-xl hover:scale-[1.02] ${
                themeMode === 'dark'
                  ? 'bg-[#e9c176] text-[#412d00] hover:bg-[#ffdea5] shadow-[#e9c176]/20'
                  : 'bg-[#775a19] text-white hover:bg-[#5d4201] shadow-[#775a19]/25'
              }`}
            >
              ENTER TRANSFORMATION VAULT
            </button>

            <button
              onClick={() => {
                soundFX.playClick();
                onExploreGallery();
              }}
              className={`w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold tracking-widest uppercase transition-all backdrop-blur-md border hover:scale-[1.02] ${
                themeMode === 'dark'
                  ? 'bg-black/40 text-white border-white/20 hover:bg-white/10'
                  : 'bg-white/50 text-[#1e1b16] border-[#7f7667]/30 hover:bg-white/70'
              }`}
            >
              EXPLORE GALLERY
            </button>
          </div>
        </div>

        {/* Metrics Counter Bar */}
        <div className="mt-14 flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          <div className="flex flex-col items-center">
            <span className={`font-serif-heading text-3xl sm:text-4xl font-semibold ${
              themeMode === 'dark' ? 'text-[#e5e2e1]' : 'text-white'
            }`}>
              14.2k
            </span>
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#e9c176] uppercase mt-1">
              Transformed Works
            </span>
          </div>

          <div className="w-px h-10 bg-white/20 hidden sm:block" />

          <div className="flex flex-col items-center">
            <span className={`font-serif-heading text-3xl sm:text-4xl font-semibold ${
              themeMode === 'dark' ? 'text-[#e5e2e1]' : 'text-white'
            }`}>
              8,902
            </span>
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#e9c176] uppercase mt-1">
              Active Creators
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

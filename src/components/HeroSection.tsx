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
      className="relative w-full min-h-[92vh] flex items-center justify-center pt-28 pb-24 px-5 lg:px-12 overflow-hidden"
    >
      {/* 1. Pure Image Background with Bottom Edge Blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img
          src={ASSET_IMAGES.heroBg}
          alt="Sanctuary Meadow Landscape"
          className="w-full h-full object-cover object-center image-edge-blur-bottom scale-[1.01]"
        />

        {/* Dark overlay applied strictly in Dark Mode only */}
        {themeMode === 'dark' && (
          <div className="absolute inset-0 bg-black/55 backdrop-brightness-75 transition-opacity duration-500" />
        )}
      </div>

      {/* Subtle edge blur seam at the bottom */}
      <div className="edge-blur-seam-bottom" />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Glass Card Container with Enhanced Glassmorphism */}
        <div className={`rounded-3xl p-8 md:p-14 flex flex-col items-center text-center max-w-3xl w-full transition-all duration-300 ${
          themeMode === 'dark'
            ? 'glass-sharp-gold text-[#e5e2e1]'
            : 'glass-sharp-light text-[#1a150e]'
        }`}>
          {/* Status Badge */}
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-8 border transition-all ${
            themeMode === 'dark'
              ? 'bg-black/50 border-[#e9c176]/30 text-[#e9c176]'
              : 'bg-[#775a19]/10 border-[#775a19]/25 text-[#775a19]'
          }`}>
            <span className="w-2 h-2 rounded-full bg-[#e9c176] animate-pulse" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">
              THE VAULT IS OPEN
            </span>
          </div>

          {/* Editorial Headline */}
          <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.15] mb-6">
            Breathe Life Into Your Digital Legacy.
          </h1>

          {/* Description with High Contrast Readability */}
          <p className={`text-base sm:text-lg max-w-2xl leading-relaxed mb-10 font-sans ${
            themeMode === 'dark' ? 'text-white/80' : 'text-[#383124] font-normal'
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
              className={`w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold tracking-widest uppercase transition-all shadow-xl hover:scale-[1.02] cursor-pointer ${
                themeMode === 'dark'
                  ? 'bg-[#e9c176] text-[#412d00] hover:bg-[#ffdea5] shadow-[#e9c176]/20'
                  : 'bg-[#775a19] text-white hover:bg-[#5d4201] shadow-[#775a19]/30'
              }`}
            >
              ENTER TRANSFORMATION VAULT
            </button>

            <button
              onClick={() => {
                soundFX.playClick();
                onExploreGallery();
              }}
              className={`w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold tracking-widest uppercase transition-all backdrop-blur-md border hover:scale-[1.02] cursor-pointer ${
                themeMode === 'dark'
                  ? 'bg-black/50 text-white border-white/20 hover:bg-white/10'
                  : 'bg-white/70 text-[#1a150e] border-[#7f7667]/40 hover:bg-white/90 shadow-sm'
              }`}
            >
              EXPLORE GALLERY
            </button>
          </div>
        </div>

        {/* Metrics Counter Bar */}
        <div className={`mt-12 flex flex-wrap justify-center items-center gap-x-10 gap-y-4 px-8 py-3.5 rounded-full transition-all duration-300 ${
          themeMode === 'dark'
            ? 'glass-sharp text-white'
            : 'glass-sharp-light text-[#1a150e]'
        }`}>
          <div className="flex items-center gap-3">
            <span className="font-serif-heading text-2xl sm:text-3xl font-semibold">
              14.2k
            </span>
            <span className={`text-[11px] font-bold tracking-[0.18em] uppercase ${
              themeMode === 'dark' ? 'text-[#e9c176]' : 'text-[#775a19]'
            }`}>
              Transformed Works
            </span>
          </div>

          <div className={`w-px h-6 hidden sm:block ${
            themeMode === 'dark' ? 'bg-white/20' : 'bg-[#7f7667]/25'
          }`} />

          <div className="flex items-center gap-3">
            <span className="font-serif-heading text-2xl sm:text-3xl font-semibold">
              8,902
            </span>
            <span className={`text-[11px] font-bold tracking-[0.18em] uppercase ${
              themeMode === 'dark' ? 'text-[#e9c176]' : 'text-[#775a19]'
            }`}>
              Active Creators
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

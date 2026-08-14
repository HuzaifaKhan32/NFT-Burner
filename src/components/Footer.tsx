import React from 'react';
import { NavigationTab, ThemeMode } from '../types';
import { Globe, Share2, Mail, Flame } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface FooterProps {
  themeMode: ThemeMode;
  setActiveTab: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ themeMode, setActiveTab }) => {
  return (
    <footer className={`w-full py-16 px-5 lg:px-12 transition-colors duration-300 border-t ${
      themeMode === 'dark'
        ? 'bg-[#1a1714] text-[#e5e2e1] border-white/10'
        : 'bg-[#2c2416] text-[#f8efe6] border-[#2c2416]'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left copyright */}
        <div className="text-center md:text-left">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase opacity-80 flex items-center gap-2 justify-center md:justify-start">
            <Flame size={14} className="text-[#e9c176]" />
            © 2026 AURELIAN MIST. BURN FOR THE LIGHT.
          </p>
        </div>

        {/* Navigation links */}
        <div className="flex items-center gap-8 text-xs font-semibold tracking-widest uppercase">
          <button
            onClick={() => {
              soundFX.playClick();
              setActiveTab('gallery');
            }}
            className="hover:text-[#e9c176] transition-colors"
          >
            GALLERY
          </button>
          <button
            onClick={() => {
              soundFX.playClick();
              setActiveTab('burn-vault');
            }}
            className="hover:text-[#e9c176] transition-colors"
          >
            BURN
          </button>
          <button
            onClick={() => {
              soundFX.playClick();
              setActiveTab('marketplace');
            }}
            className="hover:text-[#e9c176] transition-colors"
          >
            MARKETPLACE
          </button>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); soundFX.playClick(); }}
            className="opacity-70 hover:opacity-100 hover:text-[#e9c176] transition-all"
            title="Aurelian Network"
          >
            <Globe size={18} />
          </a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); soundFX.playClick(); }}
            className="opacity-70 hover:opacity-100 hover:text-[#e9c176] transition-all"
            title="Share Sanctuary"
          >
            <Share2 size={18} />
          </a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); soundFX.playClick(); }}
            className="opacity-70 hover:opacity-100 hover:text-[#e9c176] transition-all"
            title="Contact Aurelian Guild"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

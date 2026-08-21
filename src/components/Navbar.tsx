import React, { useState } from 'react';
import { NavigationTab, ThemeMode, WalletState } from '../types';
import { ASSET_IMAGES } from '../data/mockData';
import { soundFX } from '../utils/audio';
import { Volume2, VolumeX, Moon, Sun, Menu, X, Wallet, User } from 'lucide-react';

interface NavbarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  walletState: WalletState;
  onOpenWalletModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  themeMode,
  setThemeMode,
  walletState,
  onOpenWalletModal
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundFX.getMuted());

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundFX.setMuted(nextMute);
    if (!nextMute) soundFX.playClick();
  };

  const handleTabClick = (tab: NavigationTab) => {
    soundFX.playClick();
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    soundFX.playClick();
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
      themeMode === 'dark' 
        ? 'bg-black/30 backdrop-blur-md border-b border-white/10' 
        : 'bg-[#fff8f3]/60 backdrop-blur-md border-b border-[#7f7667]/20 text-[#1e1b16]'
    }`}>
      <div className="h-20 max-w-7xl mx-auto px-5 lg:px-12 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleTabClick('burn-vault')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img 
            src={ASSET_IMAGES.logo} 
            alt="Aurelian Compass Logo" 
            className="h-8 w-auto object-contain transition-transform duration-300 group-hover:rotate-45"
          />
          <span className={`font-serif-heading text-xl lg:text-2xl tracking-[0.25em] uppercase transition-colors ${
            themeMode === 'dark' ? 'text-white group-hover:text-[#e9c176]' : 'text-[#1e1b16] group-hover:text-[#775a19]'
          }`}>
            AURELIAN
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-10 lg:gap-14">
          <button
            onClick={() => handleTabClick('gallery')}
            className={`font-semibold text-xs tracking-[0.2em] uppercase transition-all py-1 border-b-2 ${
              activeTab === 'gallery'
                ? themeMode === 'dark' ? 'text-[#e9c176] border-[#e9c176]' : 'text-[#775a19] border-[#775a19]'
                : themeMode === 'dark' ? 'text-white/70 border-transparent hover:text-white' : 'text-[#4e4639] border-transparent hover:text-[#1e1b16]'
            }`}
          >
            GALLERY
          </button>
          <button
            onClick={() => handleTabClick('burn-vault')}
            className={`font-semibold text-xs tracking-[0.2em] uppercase transition-all py-1 border-b-2 ${
              activeTab === 'burn-vault'
                ? themeMode === 'dark' ? 'text-[#e9c176] border-[#e9c176]' : 'text-[#775a19] border-[#775a19]'
                : themeMode === 'dark' ? 'text-white/70 border-transparent hover:text-white' : 'text-[#4e4639] border-transparent hover:text-[#1e1b16]'
            }`}
          >
            METAMORPHOSIS
          </button>
          <button
            onClick={() => handleTabClick('marketplace')}
            className={`font-semibold text-xs tracking-[0.2em] uppercase transition-all py-1 border-b-2 ${
              activeTab === 'marketplace'
                ? themeMode === 'dark' ? 'text-[#e9c176] border-[#e9c176]' : 'text-[#775a19] border-[#775a19]'
                : themeMode === 'dark' ? 'text-white/70 border-transparent hover:text-white' : 'text-[#4e4639] border-transparent hover:text-[#1e1b16]'
            }`}
          >
            MARKETPLACE
          </button>
        </nav>

        {/* Right Actions: Controls & Wallet */}
        <div className="flex items-center gap-3 lg:gap-5">
          {/* Mute Audio Toggle */}
          <button 
            onClick={toggleMute}
            title={isMuted ? "Unmute Ambient Sound" : "Mute Sound"}
            className={`p-2 rounded-full transition-colors ${
              themeMode === 'dark' 
                ? 'bg-white/5 hover:bg-white/15 text-white/80' 
                : 'bg-black/5 hover:bg-black/10 text-[#4e4639]'
            }`}
          >
            {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>

          {/* Dark / Light Theme Toggle */}
          <button 
            onClick={toggleTheme}
            title={themeMode === 'dark' ? "Switch to Aurelian Light Mode" : "Switch to Aurelian Night Mode"}
            className={`p-2 rounded-full transition-colors ${
              themeMode === 'dark' 
                ? 'bg-white/5 hover:bg-white/15 text-[#e9c176]' 
                : 'bg-black/5 hover:bg-black/10 text-[#775a19]'
            }`}
          >
            {themeMode === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Connect Wallet Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              onOpenWalletModal();
            }}
            className={`hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all shadow-lg ${
              walletState.isConnected
                ? themeMode === 'dark'
                  ? 'bg-[#e9c176]/20 border border-[#e9c176]/40 text-[#e9c176] hover:bg-[#e9c176]/30'
                  : 'bg-[#775a19]/15 border border-[#775a19]/30 text-[#775a19] hover:bg-[#775a19]/25'
                : themeMode === 'dark'
                  ? 'bg-[#e9c176] text-[#412d00] hover:bg-[#ffdea5] shadow-[#e9c176]/10'
                  : 'bg-[#775a19] text-white hover:bg-[#5d4201] shadow-[#775a19]/15'
            }`}
          >
            <Wallet size={14} />
            {walletState.isConnected && walletState.address
              ? `${walletState.address.slice(0, 6)}...${walletState.address.slice(-4)}`
              : 'CONNECT PHANTOM'}
          </button>

          {/* User Profile Avatar */}
          <div 
            onClick={() => {
              soundFX.playClick();
              onOpenWalletModal();
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 ${
              themeMode === 'dark' ? 'bg-[#e9c176] text-[#412d00]' : 'bg-[#775a19] text-white'
            }`}
            title="Collector Profile & Phantom Wallet"
          >
            <User size={18} />
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-current"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className={`md:hidden border-b px-6 py-6 space-y-4 ${
          themeMode === 'dark' ? 'bg-[#121212]/95 border-white/10' : 'bg-[#fff8f3]/95 border-[#7f7667]/20'
        }`}>
          <button
            onClick={() => handleTabClick('gallery')}
            className="block w-full text-left py-2 text-sm font-semibold tracking-widest uppercase"
          >
            GALLERY
          </button>
          <button
            onClick={() => handleTabClick('burn-vault')}
            className="block w-full text-left py-2 text-sm font-semibold tracking-widest uppercase text-[#e9c176]"
          >
            METAMORPHOSIS
          </button>
          <button
            onClick={() => handleTabClick('marketplace')}
            className="block w-full text-left py-2 text-sm font-semibold tracking-widest uppercase"
          >
            MARKETPLACE
          </button>

          <button
            onClick={() => {
              onOpenWalletModal();
              setIsMobileMenuOpen(false);
            }}
            className="w-full mt-4 py-3 bg-[#e9c176] text-black rounded-full text-xs font-semibold tracking-wider uppercase text-center"
          >
            {walletState.isConnected ? walletState.address : 'CONNECT PHANTOM WALLET'}
          </button>
        </div>
      )}
    </header>
  );
};

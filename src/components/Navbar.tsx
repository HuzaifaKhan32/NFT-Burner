import React, { useState } from 'react';
import { NavigationTab, ThemeMode, WalletState } from '../types';
import { ASSET_IMAGES } from '../data/mockData';
import { soundFX } from '../utils/audio';
import { Moon, Sun, Menu, X, Wallet, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      themeMode === 'dark' 
        ? 'bg-black/40 backdrop-blur-2xl border-b border-white/10' 
        : 'bg-white/40 backdrop-blur-2xl border-b border-white/50 shadow-sm text-[#1a150e]'
    }`}>
      <div className="h-16 sm:h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleTabClick('burn-vault')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
        >
          <img 
            src={ASSET_IMAGES.logo} 
            alt="Aurelian Compass Logo" 
            className="h-6 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-300 group-hover:rotate-45"
          />
          <span className={`font-serif-heading text-sm sm:text-base md:text-xl lg:text-2xl tracking-[0.16em] sm:tracking-[0.25em] uppercase font-semibold transition-colors truncate ${
            themeMode === 'dark' ? 'text-white group-hover:text-[#e9c176]' : 'text-[#1a150e] group-hover:text-[#775a19]'
          }`}>
            AURELIAN
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-14">
          <button
            onClick={() => handleTabClick('gallery')}
            className={`font-semibold text-xs tracking-[0.2em] uppercase transition-all py-1 border-b-2 cursor-pointer ${
              activeTab === 'gallery'
                ? themeMode === 'dark' ? 'text-[#e9c176] border-[#e9c176]' : 'text-[#775a19] border-[#775a19]'
                : themeMode === 'dark' ? 'text-white/70 border-transparent hover:text-white' : 'text-[#383124] border-transparent hover:text-[#1a150e]'
            }`}
          >
            GALLERY
          </button>
          <button
            onClick={() => handleTabClick('burn-vault')}
            className={`font-semibold text-xs tracking-[0.2em] uppercase transition-all py-1 border-b-2 cursor-pointer ${
              activeTab === 'burn-vault'
                ? themeMode === 'dark' ? 'text-[#e9c176] border-[#e9c176]' : 'text-[#775a19] border-[#775a19]'
                : themeMode === 'dark' ? 'text-white/70 border-transparent hover:text-white' : 'text-[#383124] border-transparent hover:text-[#1a150e]'
            }`}
          >
            METAMORPHOSIS
          </button>
          <button
            onClick={() => handleTabClick('marketplace')}
            className={`font-semibold text-xs tracking-[0.2em] uppercase transition-all py-1 border-b-2 cursor-pointer ${
              activeTab === 'marketplace'
                ? themeMode === 'dark' ? 'text-[#e9c176] border-[#e9c176]' : 'text-[#775a19] border-[#775a19]'
                : themeMode === 'dark' ? 'text-white/70 border-transparent hover:text-white' : 'text-[#383124] border-transparent hover:text-[#1a150e]'
            }`}
          >
            MARKETPLACE
          </button>
        </nav>

        {/* Right Actions: Controls & Wallet */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-5">
          {/* Dark / Light Theme Toggle */}
          <button 
            onClick={toggleTheme}
            title={themeMode === 'dark' ? "Switch to Aurelian Light Mode" : "Switch to Aurelian Night Mode"}
            className={`p-2 rounded-full transition-all duration-200 cursor-pointer ${
              themeMode === 'dark' 
                ? 'bg-white/5 hover:bg-white/15 text-[#e9c176]' 
                : 'bg-black/5 hover:bg-black/10 text-[#775a19]'
            }`}
          >
            {themeMode === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Connect Wallet Button (Solana Phantom) */}
          <button
            onClick={() => {
              soundFX.playClick();
              onOpenWalletModal();
            }}
            className={`hidden sm:flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all shadow-lg cursor-pointer ${
              walletState.isConnected
                ? themeMode === 'dark'
                  ? 'bg-[#e9c176]/20 border border-[#e9c176]/40 text-[#e9c176] hover:bg-[#e9c176]/30 backdrop-blur-md'
                  : 'bg-[#775a19]/15 border border-[#775a19]/30 text-[#775a19] hover:bg-[#775a19]/25 backdrop-blur-md'
                : themeMode === 'dark'
                  ? 'bg-[#e9c176] text-[#412d00] hover:bg-[#ffdea5] shadow-[#e9c176]/10'
                  : 'bg-[#775a19] text-white hover:bg-[#5d4201] shadow-[#775a19]/15'
            }`}
          >
            <Wallet size={14} />
            {walletState.isConnected && walletState.address
              ? `${walletState.address.slice(0, 4)}...${walletState.address.slice(-4)}`
              : 'CONNECT SOLANA'}
          </button>

          {/* User Profile Avatar */}
          <div 
            onClick={() => {
              soundFX.playClick();
              onOpenWalletModal();
            }}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 shadow-md ${
              themeMode === 'dark' ? 'bg-[#e9c176] text-[#412d00]' : 'bg-[#775a19] text-white'
            }`}
            title="Collector Profile & Solana Wallet"
          >
            <User size={16} />
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => {
              soundFX.playClick();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            aria-label="Toggle Navigation Menu"
            className={`md:hidden p-2 rounded-xl transition-colors cursor-pointer ${
              themeMode === 'dark' ? 'text-white hover:bg-white/10' : 'text-[#1a150e] hover:bg-black/5'
            }`}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with Fluid Dropdown Animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={`md:hidden border-b overflow-hidden shadow-2xl backdrop-blur-2xl ${
              themeMode === 'dark' 
                ? 'bg-[#121212]/95 border-white/10 text-white' 
                : 'bg-white/95 border-black/10 text-[#1a150e]'
            }`}
          >
            <motion.div 
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
                closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } }
              }}
              className="px-6 py-6 space-y-4"
            >
              <motion.button
                variants={{
                  open: { opacity: 1, x: 0 },
                  closed: { opacity: 0, x: -12 }
                }}
                onClick={() => handleTabClick('gallery')}
                className={`block w-full text-left py-2 text-xs sm:text-sm font-semibold tracking-widest uppercase cursor-pointer ${
                  activeTab === 'gallery'
                    ? themeMode === 'dark' ? 'text-[#e9c176]' : 'text-[#775a19]'
                    : ''
                }`}
              >
                GALLERY
              </motion.button>
              
              <motion.button
                variants={{
                  open: { opacity: 1, x: 0 },
                  closed: { opacity: 0, x: -12 }
                }}
                onClick={() => handleTabClick('burn-vault')}
                className={`block w-full text-left py-2 text-xs sm:text-sm font-semibold tracking-widest uppercase cursor-pointer ${
                  activeTab === 'burn-vault'
                    ? themeMode === 'dark' ? 'text-[#e9c176]' : 'text-[#775a19]'
                    : ''
                }`}
              >
                METAMORPHOSIS
              </motion.button>

              <motion.button
                variants={{
                  open: { opacity: 1, x: 0 },
                  closed: { opacity: 0, x: -12 }
                }}
                onClick={() => handleTabClick('marketplace')}
                className={`block w-full text-left py-2 text-xs sm:text-sm font-semibold tracking-widest uppercase cursor-pointer ${
                  activeTab === 'marketplace'
                    ? themeMode === 'dark' ? 'text-[#e9c176]' : 'text-[#775a19]'
                    : ''
                }`}
              >
                MARKETPLACE
              </motion.button>

              <motion.button
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 10 }
                }}
                onClick={() => {
                  soundFX.playClick();
                  onOpenWalletModal();
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full mt-4 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-center cursor-pointer shadow-md transition-all ${
                  themeMode === 'dark'
                    ? 'bg-[#e9c176] text-[#2c1d00] hover:bg-[#ffdea5]'
                    : 'bg-[#775a19] text-white hover:bg-[#5d4201]'
                }`}
              >
                {walletState.isConnected && walletState.address
                  ? `${walletState.address.slice(0, 4)}...${walletState.address.slice(-4)} (CONNECTED)`
                  : 'CONNECT SOLANA WALLET'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

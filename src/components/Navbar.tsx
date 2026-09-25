import React, { useState } from 'react';
import { NavigationTab, ThemeMode, WalletState } from '../types';
import { ASSET_IMAGES } from '../data/mockData';
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
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="fixed top-0 w-full z-50 surface-translucent border-b transition-colors duration-300"
      style={{ borderColor: 'var(--color-border-subtle)' }}
    >
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
          <span className="font-serif-heading text-sm sm:text-base md:text-xl lg:text-2xl tracking-[0.1em] sm:tracking-[0.15em] font-semibold transition-colors truncate"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Aurelian Mist
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-14">
          <button
            onClick={() => handleTabClick('gallery')}
            className="font-semibold text-xs tracking-wider uppercase transition-colors py-1 border-b-2 cursor-pointer"
            style={{
              color: activeTab === 'gallery' ? 'var(--color-accent-gold)' : 'var(--color-text-secondary)',
              borderColor: activeTab === 'gallery' ? 'var(--color-accent-gold)' : 'transparent'
            }}
          >
            Gallery
          </button>
          <button
            onClick={() => handleTabClick('burn-vault')}
            className="font-semibold text-xs tracking-wider uppercase transition-colors py-1 border-b-2 cursor-pointer"
            style={{
              color: activeTab === 'burn-vault' ? 'var(--color-accent-gold)' : 'var(--color-text-secondary)',
              borderColor: activeTab === 'burn-vault' ? 'var(--color-accent-gold)' : 'transparent'
            }}
          >
            Transform
          </button>
          <button
            onClick={() => handleTabClick('marketplace')}
            className="font-semibold text-xs tracking-wider uppercase transition-colors py-1 border-b-2 cursor-pointer"
            style={{
              color: activeTab === 'marketplace' ? 'var(--color-accent-gold)' : 'var(--color-text-secondary)',
              borderColor: activeTab === 'marketplace' ? 'var(--color-accent-gold)' : 'transparent'
            }}
          >
            Marketplace
          </button>
        </nav>

        {/* Right Actions: Controls & Wallet */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-5">
          {/* Dark / Light Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={themeMode === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-2 rounded-full transition-colors cursor-pointer"
            style={{
              backgroundColor: 'var(--color-bg-tertiary)',
              color: 'var(--color-accent-gold)'
            }}
          >
            {themeMode === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Connect Wallet Button (Solana Phantom) */}
          <button
            onClick={onOpenWalletModal}
            className={
              walletState.isConnected
                ? "hidden sm:flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold tracking-wide transition-all cursor-pointer btn-secondary"
                : "hidden sm:flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold tracking-wide transition-all cursor-pointer btn-primary"
            }
          >
            <Wallet size={14} />
            {walletState.isConnected && walletState.address
              ? `${walletState.address.slice(0, 4)}...${walletState.address.slice(-4)}`
              : 'Connect Wallet'}
          </button>

          {/* User Profile Avatar */}
          <div
            onClick={onOpenWalletModal}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
            style={{
              backgroundColor: 'var(--color-accent-gold)',
              color: 'var(--color-bg-primary)',
              boxShadow: 'var(--shadow-subtle)'
            }}
            title="Wallet & Profile"
          >
            <User size={16} />
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className={
              themeMode === 'dark'
                ? "md:hidden p-2 rounded-xl transition-colors cursor-pointer text-white hover:bg-white/10"
                : "md:hidden p-2 rounded-xl transition-colors cursor-pointer text-[#1a150e] hover:bg-black/5"
            }
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
            className="md:hidden border-b overflow-hidden surface-translucent"
            style={{ borderColor: 'var(--color-border-subtle)' }}
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
                className="block w-full text-left py-2 text-sm font-semibold tracking-wide uppercase cursor-pointer"
                style={{
                  color: activeTab === 'gallery' ? 'var(--color-accent-gold)' : 'var(--color-text-primary)'
                }}
              >
                Gallery
              </motion.button>

              <motion.button
                variants={{
                  open: { opacity: 1, x: 0 },
                  closed: { opacity: 0, x: -12 }
                }}
                onClick={() => handleTabClick('burn-vault')}
                className="block w-full text-left py-2 text-sm font-semibold tracking-wide uppercase cursor-pointer"
                style={{
                  color: activeTab === 'burn-vault' ? 'var(--color-accent-gold)' : 'var(--color-text-primary)'
                }}
              >
                Transform
              </motion.button>

              <motion.button
                variants={{
                  open: { opacity: 1, x: 0 },
                  closed: { opacity: 0, x: -12 }
                }}
                onClick={() => handleTabClick('marketplace')}
                className="block w-full text-left py-2 text-sm font-semibold tracking-wide uppercase cursor-pointer"
                style={{
                  color: activeTab === 'marketplace' ? 'var(--color-accent-gold)' : 'var(--color-text-primary)'
                }}
              >
                Marketplace
              </motion.button>

              <motion.button
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 10 }
                }}
                onClick={() => {
                  onOpenWalletModal();
                  setIsMobileMenuOpen(false);
                }}
                className={
                  walletState.isConnected
                    ? "w-full mt-4 btn-secondary btn-pill"
                    : "w-full mt-4 btn-primary btn-pill"
                }
              >
                {walletState.isConnected && walletState.address
                  ? `${walletState.address.slice(0, 4)}...${walletState.address.slice(-4)}`
                  : 'Connect Wallet'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

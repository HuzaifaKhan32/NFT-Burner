import React from 'react';
import { ThemeMode } from '../types';
import { motion } from 'motion/react';
import { BurnCounter } from './BurnCounter';

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
      id="section-hero"
      className="relative w-full min-h-[92vh] flex items-center justify-center pt-28 pb-24 px-5 lg:px-12 overflow-hidden bg-transparent z-10"
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="surface-glass-gold p-8 md:p-14 flex flex-col items-center text-center max-w-3xl w-full transition-colors duration-300"
          style={{
            borderRadius: 'var(--radius-lg)',
            color: 'var(--color-text-primary)'
          }}
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="badge badge-gold mb-8"
          >
            <span className="w-2 h-2 rounded-full animate-status-pulse" style={{ backgroundColor: 'var(--color-accent-gold)' }} />
            <span>Vault Open</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.15] mb-6 text-balance"
          >
            Transform What You Own.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-base sm:text-lg max-w-2xl leading-relaxed mb-10 font-sans"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Permanently burn your NFTs and receive new digital artifacts in return.
            Each transformation is recorded on-chain with verifiable provenance.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={onEnterVault}
              className="btn btn-primary w-full sm:w-auto px-8 py-4"
            >
              Enter Vault
            </button>

            <button
              onClick={onExploreGallery}
              className="btn btn-secondary w-full sm:w-auto px-8 py-4"
            >
              View Gallery
            </button>
          </motion.div>
        </motion.div>

        {/* Live Burn Counter */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 w-full max-w-3xl"
        >
          <BurnCounter
            totalBurned={14237}
            remainingSupply={8902}
            themeMode={themeMode}
          />
        </motion.div>
      </div>
    </section>
  );
};

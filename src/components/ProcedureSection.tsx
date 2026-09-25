import React from 'react';
import { ThemeMode } from '../types';
import { motion } from 'motion/react';
import { WalletConnectIcon, LeafScanIcon, HandSelectIcon, FlameAlchemyIcon, CrystalRevealIcon } from './icons/BotanicalIcons';

interface ProcedureSectionProps {
  themeMode: ThemeMode;
}

export const ProcedureSection: React.FC<ProcedureSectionProps> = ({ themeMode }) => {
  const steps = [
    {
      step: "Connect",
      desc: "Link your Solana wallet to access your collection.",
      icon: <WalletConnectIcon className="w-6 h-6" style={{ color: 'var(--color-accent-gold)' }} size={24} />
    },
    {
      step: "Detect",
      desc: "Scan for eligible NFTs in your wallet.",
      icon: <LeafScanIcon className="w-6 h-6" style={{ color: 'var(--color-accent-gold)' }} size={24} />
    },
    {
      step: "Select",
      desc: "Choose which NFTs to transform.",
      icon: <HandSelectIcon className="w-6 h-6" style={{ color: 'var(--color-accent-gold)' }} size={24} />
    },
    {
      step: "Transform",
      desc: "Permanently burn selected NFTs.",
      icon: <FlameAlchemyIcon className="w-6 h-6 animate-status-pulse" style={{ color: 'var(--color-accent-gold)' }} size={24} />,
      highlight: true
    },
    {
      step: "Receive",
      desc: "Collect your new artifact.",
      icon: <CrystalRevealIcon className="w-6 h-6" style={{ color: 'var(--color-accent-gold)' }} size={24} />
    }
  ];

  const sectionBg = themeMode === 'dark'
    ? 'linear-gradient(180deg, rgba(18, 24, 20, 0.95) 0%, rgba(24, 32, 25, 0.97) 50%, rgba(18, 24, 20, 0.95) 100%)'
    : 'linear-gradient(180deg, rgba(243, 239, 230, 0.96) 0%, rgba(234, 229, 217, 0.98) 50%, rgba(243, 239, 230, 0.96) 100%)';

  const borderColor = themeMode === 'dark'
    ? 'rgba(212, 165, 116, 0.15)'
    : 'rgba(157, 126, 90, 0.2)';

  return (
    <section 
      id="section-procedure"
      className="relative w-full py-20 lg:py-24 px-5 lg:px-12 overflow-hidden z-10 transition-colors duration-500"
      style={{
        background: sectionBg,
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`
      }}
    >
      {/* Top & Bottom Tonal Fades for Seam-Free Environmental Continuity */}
      <div 
        className="absolute top-0 inset-x-0 h-12 pointer-events-none z-0"
        style={{
          background: themeMode === 'dark'
            ? 'linear-gradient(to bottom, rgba(15, 14, 12, 0.4), transparent)'
            : 'linear-gradient(to bottom, rgba(250, 247, 243, 0.4), transparent)'
        }}
      />
      <div 
        className="absolute bottom-0 inset-x-0 h-12 pointer-events-none z-0"
        style={{
          background: themeMode === 'dark'
            ? 'linear-gradient(to top, rgba(15, 14, 12, 0.4), transparent)'
            : 'linear-gradient(to top, rgba(250, 247, 243, 0.4), transparent)'
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] block mb-2"
            style={{ color: 'var(--color-accent-gold)' }}
          >
            THE TRANSFORMATION PROCESS
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-medium mb-3">
            How It Works
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto font-sans"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            A straightforward process for transforming your NFTs into new artifacts.
          </p>
        </motion.div>

        {/* Steps Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="surface-glass p-6 sm:p-8 lg:p-10 relative transition-colors duration-300"
          style={{ borderRadius: 'var(--radius-lg)' }}
        >
          {/* Connector Line on Desktop */}
          <div className="hidden md:block absolute top-1/2 left-10 right-10 h-px -translate-y-5 z-0"
            style={{ backgroundColor: 'var(--color-border-subtle)' }}
          />

          {/* 5 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
            {steps.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="flex flex-col items-center text-center group cursor-default"
              >
                {/* Circle Icon Container */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-3.5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: item.highlight ? 'rgba(212, 165, 116, 0.18)' : 'var(--color-bg-tertiary)',
                    border: item.highlight ? '2px solid var(--color-accent-gold)' : '1px solid var(--color-border-subtle)',
                    boxShadow: item.highlight ? '0 0 20px rgba(212, 165, 116, 0.15)' : 'var(--shadow-subtle)'
                  }}
                >
                  {item.icon}
                </div>

                {/* Step Title */}
                <span className="text-xs sm:text-sm font-bold tracking-wide mb-1.5"
                  style={{ color: 'var(--color-accent-gold)' }}
                >
                  {item.step}
                </span>

                {/* Step Description */}
                <p className="text-xs sm:text-sm leading-snug font-sans max-w-[200px] md:max-w-none"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Artifact, ThemeMode, WalletState } from '../types';
import { ArrowUpDown, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MarketplaceSectionProps {
  artifacts: Artifact[];
  themeMode: ThemeMode;
  walletState: WalletState;
}

export const MarketplaceSection: React.FC<MarketplaceSectionProps> = ({
  artifacts,
  themeMode,
  walletState
}) => {
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'recent'>('recent');

  const sortedArtifacts = [...artifacts].sort((a, b) => {
    if (sortBy === 'price-low') return (a.priceEth || 0) - (b.priceEth || 0);
    if (sortBy === 'price-high') return (b.priceEth || 0) - (a.priceEth || 0);
    return 0;
  });

  return (
    <section
      className="min-h-screen pt-28 pb-24 px-5 lg:px-12 bg-transparent relative z-10 transition-colors duration-300"
      style={{ color: 'var(--color-text-primary)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-medium mb-4">
            Marketplace
          </h1>
          <p className="text-base sm:text-lg font-sans" style={{ color: 'var(--color-text-secondary)' }}>
            Acquire artifacts listed by collectors who transformed their NFTs.
          </p>
        </motion.div>

        {/* Sort & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="surface-glass p-4 mb-10 flex flex-wrap items-center justify-between gap-4"
          style={{ borderRadius: 'var(--radius-md)' }}
        >
          <div className="flex items-center gap-2 text-sm font-medium">
            <Tag size={16} style={{ color: 'var(--color-accent-gold)' }} />
            <span>{sortedArtifacts.length} artifacts available</span>
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown size={14} style={{ color: 'var(--color-text-tertiary)' }} />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'price-low' | 'price-high' | 'recent')}
              className="px-3 py-2 text-sm outline-none cursor-pointer transition-colors"
              style={{
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-bg-tertiary)',
                border: '1px solid var(--color-border-subtle)',
                color: 'var(--color-text-primary)'
              }}
            >
              <option value="recent">Recently forged</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {sortedArtifacts.map((art, idx) => (
              <motion.div
                key={art.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="card card-interactive surface-solid overflow-hidden"
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
                  <img src={art.image} alt={art.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 left-3 badge badge-gold">
                    {art.rarity}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-serif-heading text-lg font-medium truncate mb-1">
                    {art.name}
                  </h3>
                  <span className="text-xs block mb-4" style={{ color: 'var(--color-text-tertiary)' }}>
                    Listed by {art.creator}
                  </span>

                  <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                    <div>
                      <span className="text-xs block uppercase tracking-wide" style={{ color: 'var(--color-text-tertiary)' }}>
                        Price
                      </span>
                      <span className="text-base font-semibold" style={{ color: 'var(--color-accent-gold)' }}>
                        {art.priceEth} SOL
                      </span>
                    </div>

                    <button
                      className="btn btn-primary btn-pill"
                    >
                      Collect
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

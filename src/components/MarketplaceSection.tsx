import React, { useState } from 'react';
import { Artifact, ThemeMode, WalletState } from '../types';
import { soundFX } from '../utils/audio';
import { ShoppingBag, ArrowUpDown, Tag, ShieldCheck, Flame } from 'lucide-react';

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
    <section className={`min-h-screen pt-28 pb-24 px-5 lg:px-12 transition-colors duration-300 ${
      themeMode === 'dark' ? 'bg-[#121212] text-[#e5e2e1]' : 'bg-[#fff8f3] text-[#1e1b16]'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e9c176]/20 border border-[#e9c176]/40 text-[#e9c176] text-xs font-semibold tracking-widest uppercase mb-4">
            <ShoppingBag size={14} />
            ECOLOGICAL ECOSYSTEM
          </div>
          <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-medium mb-4">
            Aurelian Marketplace
          </h1>
          <p className={`text-base sm:text-lg ${themeMode === 'dark' ? 'text-[#d1c5b4]' : 'text-[#4e4639]'}`}>
            Acquire nature-inspired artifacts directly from creators who performed the burn ritual.
          </p>
        </div>

        {/* Sort & Filter Bar */}
        <div className={`p-4 rounded-2xl mb-10 flex flex-wrap items-center justify-between gap-4 ${
          themeMode === 'dark' ? 'glass-sharp' : 'bg-white shadow-lg border border-[#7f7667]/20'
        }`}>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
            <Tag size={16} className="text-[#e9c176]" />
            <span>Active Listings ({sortedArtifacts.length})</span>
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown size={14} className="text-white/50" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'price-low' | 'price-high' | 'recent')}
              className="px-3 py-1.5 rounded-xl text-xs bg-black/30 border border-white/10 text-white focus:outline-none focus:border-[#e9c176]"
            >
              <option value="recent">Sort by Recently Forged</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedArtifacts.map(art => (
            <div
              key={art.id}
              className={`rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                themeMode === 'dark'
                  ? 'glass-sharp border border-white/10 hover:border-[#e9c176]/40'
                  : 'bg-white border border-[#7f7667]/20 shadow-lg'
              }`}
            >
              <div className="relative aspect-square overflow-hidden bg-black/40">
                <img src={art.image} alt={art.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 text-[10px] font-bold text-[#e9c176]">
                  {art.rarity}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-serif-heading text-lg font-semibold truncate mb-1">
                  {art.name}
                </h3>
                <span className="text-[10px] text-white/50 block font-mono mb-4">
                  Creator: {art.creator}
                </span>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div>
                    <span className="text-[10px] text-white/50 block uppercase tracking-wider">
                      Price
                    </span>
                    <span className="text-base font-bold text-[#e9c176]">
                      {art.priceEth} ETH
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      soundFX.playClick();
                      alert(`Purchased ${art.name} for ${art.priceEth} ETH!`);
                    }}
                    className="px-4 py-2 rounded-full bg-[#e9c176] text-black text-xs font-bold tracking-wider uppercase hover:bg-[#ffdea5] transition-all"
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

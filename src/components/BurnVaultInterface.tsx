import React, { useState } from 'react';
import { ASSET_IMAGES } from '../data/mockData';
import { NFTItem, ThemeMode, WalletState } from '../types';
import { soundFX } from '../utils/audio';
import { Flame, Check, AlertTriangle, ImageOff, Plus, Sparkles, RefreshCw } from 'lucide-react';

interface BurnVaultInterfaceProps {
  nfts: NFTItem[];
  themeMode: ThemeMode;
  walletState: WalletState;
  onToggleSelectNft: (id: string) => void;
  onStartBurnRitual: (selectedNfts: NFTItem[]) => void;
  onAddTestNft: () => void;
}

export const BurnVaultInterface: React.FC<BurnVaultInterfaceProps> = ({
  nfts,
  themeMode,
  walletState,
  onToggleSelectNft,
  onStartBurnRitual,
  onAddTestNft
}) => {
  const [filterTier, setFilterTier] = useState<string>('All');

  const selectedNfts = nfts.filter(nft => nft.isSelected && nft.isSupported);
  const selectedCount = selectedNfts.length;
  const totalPower = selectedNfts.reduce((sum, item) => sum + item.powerValue, 0);

  const filteredNfts = nfts.filter(nft => {
    if (filterTier === 'All') return true;
    return nft.tier === filterTier;
  });

  const handleBurnClick = () => {
    if (selectedCount === 0) return;
    soundFX.playBurnIgnite();
    onStartBurnRitual(selectedNfts);
  };

  return (
    <section 
      id="burn-vault-interface"
      className="relative w-full py-24 px-5 lg:px-12 bg-cover bg-fixed bg-center transition-all duration-300"
      style={{ backgroundImage: `url("${ASSET_IMAGES.vaultBg}")` }}
    >
      {/* Background Dark Overlay */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${
        themeMode === 'dark' ? 'bg-black/45 backdrop-brightness-90' : 'bg-[#121212]/30'
      }`} />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Main Vault Interface Glass Card */}
        <div className={`w-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${
          themeMode === 'dark'
            ? 'glass-sharp-gold text-[#e5e2e1]'
            : 'glass-sharp-light text-[#1e1b16]'
        }`}>
          {/* Interface Header */}
          <div className="p-6 md:p-8 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-black/20">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-serif-heading text-2xl sm:text-3xl font-medium">
                  The Burn Vault Interface
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#e9c176]/20 text-[#e9c176] border border-[#e9c176]/30">
                  LIVE VAULT
                </span>
              </div>
              <p className={`text-xs sm:text-sm mt-1 ${themeMode === 'dark' ? 'text-white/70' : 'text-[#4e4639]'}`}>
                Select dormant assets to offer to the mist for botanical rebirth.
              </p>
            </div>

            <div className="text-left sm:text-right flex sm:flex-col items-baseline sm:items-end justify-between w-full sm:w-auto">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#e9c176]">
                OFFERING STATUS
              </span>
              <div className="font-serif-heading text-xl sm:text-2xl font-semibold text-[#e9c176] mt-0.5">
                {selectedCount} Selected ({totalPower} Power)
              </div>
            </div>
          </div>

          {/* Filter Bar & Controls */}
          <div className="px-6 md:px-8 py-4 bg-black/10 border-b border-white/5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-semibold text-white/50 tracking-wider uppercase mr-1">
                TIER:
              </span>
              {['All', 'Rare', 'Epic', 'Legendary'].map(tier => (
                <button
                  key={tier}
                  onClick={() => {
                    soundFX.playClick();
                    setFilterTier(tier);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all ${
                    filterTier === tier
                      ? 'bg-[#e9c176] text-black font-semibold'
                      : 'bg-white/5 text-white/70 hover:bg-white/15'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                soundFX.playClick();
                onAddTestNft();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#e9c176]/15 text-[#e9c176] hover:bg-[#e9c176]/30 transition-all border border-[#e9c176]/30"
            >
              <Plus size={14} />
              <span>Mint Test Asset</span>
            </button>
          </div>

          {/* NFT Grid */}
          <div className="p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 min-h-[300px]">
            {filteredNfts.map(nft => {
              if (!nft.isSupported) {
                return (
                  <div 
                    key={nft.id}
                    className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-black/40 flex flex-col items-center justify-center p-4 text-center text-white/40 group"
                  >
                    <ImageOff size={28} className="mb-2 opacity-50" />
                    <span className="text-[10px] font-semibold tracking-wider uppercase">
                      UNSUPPORTED
                    </span>
                    <span className="text-[9px] mt-1 text-white/30 truncate max-w-full">
                      {nft.name}
                    </span>
                  </div>
                );
              }

              const isSelected = !!nft.isSelected;

              return (
                <div
                  key={nft.id}
                  onClick={() => {
                    soundFX.playClick();
                    onToggleSelectNft(nft.id);
                  }}
                  className={`relative aspect-square rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'border-2 border-[#e9c176] ring-4 ring-[#e9c176]/30 shadow-lg shadow-[#e9c176]/20 scale-[1.02]'
                      : 'border border-white/20 hover:border-[#e9c176]/60 hover:scale-[1.01]'
                  }`}
                >
                  {/* NFT Image */}
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                      isSelected ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'
                    }`}
                  />

                  {/* Selected Overlay & Check Badge */}
                  {isSelected && (
                    <>
                      <div className="absolute inset-0 bg-[#e9c176]/15 pointer-events-none" />
                      <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#e9c176] text-[#412d00] flex items-center justify-center shadow-md animate-bounce-once">
                        <Check size={15} strokeWidth={3} />
                      </div>
                    </>
                  )}

                  {/* Tier Badge */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[9px] font-bold tracking-wider text-[#e9c176]">
                    {nft.tier}
                  </div>

                  {/* Card Bottom Label */}
                  <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                    <span className="text-[11px] font-bold text-white block truncate tracking-wide">
                      {nft.name}
                    </span>
                    <span className="text-[9px] text-[#e9c176] font-medium block">
                      +{nft.powerValue} Power
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action & Warning Footer */}
          <div className="p-6 md:p-8 bg-black/40 border-t border-white/10 flex flex-col items-center">
            {/* Irreversible Action Warning Box */}
            <div className="w-full max-w-lg p-4 rounded-xl bg-red-950/30 border border-red-500/30 flex items-start gap-3.5 mb-6">
              <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-300 mb-0.5">
                  Irreversible Action
                </h4>
                <p className="text-xs text-red-200/80 leading-relaxed">
                  Burning these assets will permanently send them to the zero address (0x00...dEaD). This contract execution cannot be reversed or undone.
                </p>
              </div>
            </div>

            {/* Burn Trigger Button */}
            <button
              onClick={handleBurnClick}
              disabled={selectedCount === 0}
              className={`w-full max-w-lg px-8 py-4 rounded-full text-xs font-semibold tracking-widest uppercase transition-all shadow-xl flex items-center justify-center gap-2.5 ${
                selectedCount > 0
                  ? 'bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 text-white hover:from-red-500 hover:to-amber-400 shadow-red-900/40 hover:scale-[1.02] cursor-pointer flame-glow-pulse'
                  : 'bg-white/10 text-white/40 border border-white/10 cursor-not-allowed'
              }`}
            >
              <Flame size={18} className={selectedCount > 0 ? "animate-bounce" : ""} />
              <span>
                {selectedCount > 0
                  ? `BURN ${selectedCount} SELECTED ASSET${selectedCount > 1 ? 'S' : ''}`
                  : 'SELECT ASSETS TO BURN'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

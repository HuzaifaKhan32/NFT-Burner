import React from 'react';
import { ASSET_IMAGES } from '../data/mockData';
import { NFTItem, ThemeMode, WalletState } from '../types';
import { soundFX } from '../utils/audio';
import { Sparkles, Check, AlertCircle, Plus } from 'lucide-react';

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
  const eligibleNfts = nfts.filter(nft => nft.isSupported);
  const selectedNfts = eligibleNfts.filter(nft => nft.isSelected);
  const selectedCount = selectedNfts.length;

  const handleTransformClick = () => {
    if (selectedCount === 0) return;
    soundFX.playBurnIgnite();
    onStartBurnRitual(selectedNfts);
  };

  return (
    <section 
      id="burn-vault-interface"
      className="relative w-full py-28 px-5 lg:px-12 bg-cover bg-fixed bg-center transition-all duration-500 overflow-hidden"
      style={{ backgroundImage: `url("${ASSET_IMAGES.vaultBg}")` }}
    >
      {/* 1. Base dark tint */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        themeMode === 'dark' ? 'bg-black/50 backdrop-brightness-90' : 'bg-[#141414]/35 backdrop-brightness-95'
      }`} />

      {/* 2. Top Edge Fade (blending seamlessly from steps section) */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0a0c0b] via-[#0a0c0b]/50 to-transparent pointer-events-none z-[1]" />

      {/* 3. Radial Vignette for depth */}
      <div className="absolute inset-0 section-vignette pointer-events-none z-[1]" />

      {/* 4. Bottom Edge Fade (blending smoothly into FAQ forest) */}
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-b from-transparent via-[#060a08]/60 to-[#060a08] pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Main Vault Interface Glass Card */}
        <div className={`w-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${
          themeMode === 'dark'
            ? 'glass-sharp-gold text-[#e5e2e1]'
            : 'glass-sharp-light text-[#1e1b16]'
        }`}>
          {/* Interface Header */}
          <div className="p-8 md:p-10 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-black/25">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-serif-heading text-2xl sm:text-3xl font-medium tracking-tight">
                  The Transformation Vault
                </h3>
                <span className="px-3 py-0.5 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-[#e9c176]/20 text-[#e9c176] border border-[#e9c176]/30">
                  CURATED VAULT
                </span>
              </div>
              <p className={`text-xs sm:text-sm mt-1.5 font-sans ${themeMode === 'dark' ? 'text-white/70' : 'text-[#4e4639]'}`}>
                Select original artworks to dissolve into luminous particles and forge your new artifact.
              </p>
            </div>

            {/* Understated Selection Counter */}
            <div className="text-left sm:text-right flex sm:flex-col items-baseline sm:items-end justify-between w-full sm:w-auto">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#e9c176]">
                SELECTION
              </span>
              <div className="font-serif-heading text-xl sm:text-2xl font-medium text-[#e9c176] mt-0.5">
                {selectedCount} {selectedCount === 1 ? 'Work Selected' : 'Works Selected'}
              </div>
            </div>
          </div>

          {/* Sub-header / Mint Action Bar */}
          <div className="px-8 py-3.5 bg-black/15 border-b border-white/5 flex items-center justify-between">
            <span className="text-xs font-serif italic text-white/60">
              Eligible Pieces in Collection ({eligibleNfts.length})
            </span>

            <button
              onClick={() => {
                soundFX.playClick();
                onAddTestNft();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#e9c176]/15 text-[#e9c176] hover:bg-[#e9c176]/30 transition-all border border-[#e9c176]/30"
            >
              <Plus size={13} />
              <span>Add Curated Piece</span>
            </button>
          </div>

          {/* Museum-Grade Art Grid: Minimal Chrome, Larger Tiles, Generous Spacing */}
          <div className="p-8 md:p-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 min-h-[360px]">
            {eligibleNfts.map(nft => {
              const isSelected = !!nft.isSelected;

              return (
                <div
                  key={nft.id}
                  onClick={() => {
                    soundFX.playClick();
                    onToggleSelectNft(nft.id);
                  }}
                  className={`group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                    isSelected
                      ? 'ring-2 ring-[#e9c176] shadow-2xl shadow-[#e9c176]/25 -translate-y-1'
                      : 'border border-white/10 hover:border-[#e9c176]/50 hover:-translate-y-1'
                  }`}
                >
                  {/* High-Impact Artwork Frame */}
                  <div className="relative aspect-square w-full overflow-hidden bg-black/50">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                        isSelected ? 'brightness-105' : 'brightness-95 group-hover:brightness-100'
                      }`}
                    />

                    {/* Subtle Radial Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Minimalist Selection Mark */}
                    <div className={`absolute top-3.5 right-3.5 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#e9c176] text-[#1c1917] shadow-lg scale-100'
                        : 'bg-black/40 backdrop-blur-md border border-white/30 text-transparent opacity-0 group-hover:opacity-100 scale-90'
                    }`}>
                      <Check size={16} strokeWidth={2.5} className={isSelected ? 'opacity-100' : 'opacity-0'} />
                    </div>
                  </div>

                  {/* Understated Artwork Label & Collection */}
                  <div className="p-4 bg-black/40 backdrop-blur-sm border-t border-white/5 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#e9c176]/80 font-medium block truncate mb-1">
                        {nft.collection}
                      </span>
                      <h4 className="font-serif-heading text-base font-medium text-white tracking-wide truncate">
                        {nft.name}
                      </h4>
                    </div>
                    <p className="text-[11px] text-white/50 line-clamp-1 mt-1 font-sans">
                      {nft.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action & Warning Footer */}
          <div className="p-8 md:p-12 bg-black/45 border-t border-white/10 flex flex-col items-center">
            {/* Irreversible Action Warning Box - High Contrast, Saturated Warm Garnet/Amber, No Raw Addresses */}
            <div className="w-full max-w-xl p-5 rounded-2xl bg-[#3b1212]/90 border-2 border-[#ff6b6b]/60 shadow-[0_0_25px_rgba(255,107,107,0.18)] flex items-start gap-4 mb-8 backdrop-blur-md">
              <div className="w-8 h-8 rounded-full bg-[#ff6b6b]/20 border border-[#ff6b6b]/50 flex items-center justify-center shrink-0 mt-0.5 text-[#ff8f8f]">
                <AlertCircle size={18} strokeWidth={2.2} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#ffc2c2]">
                  Permanent Metamorphosis Warning
                </h4>
                <p className="text-xs text-[#ffe0e0]/90 leading-relaxed font-sans font-medium">
                  This action is permanent and cannot be reversed. The selected original pieces will be permanently surrendered and dissolved into particle light to forge your new artifact.
                </p>
              </div>
            </div>

            {/* Transform Trigger Button */}
            <button
              onClick={handleTransformClick}
              disabled={selectedCount === 0}
              className={`w-full max-w-xl px-8 py-4.5 rounded-full text-xs font-semibold tracking-[0.25em] uppercase transition-all shadow-xl flex items-center justify-center gap-3 ${
                selectedCount > 0
                  ? 'bg-gradient-to-r from-[#d97706] via-[#e9c176] to-[#d97706] text-[#2c1d00] hover:brightness-110 shadow-[#d97706]/30 hover:scale-[1.01] cursor-pointer'
                  : 'bg-white/10 text-white/35 border border-white/10 cursor-not-allowed'
              }`}
            >
              <Sparkles size={16} className={selectedCount > 0 ? "animate-pulse" : ""} />
              <span>
                {selectedCount > 0
                  ? `TRANSFORM ${selectedCount} SELECTED ${selectedCount === 1 ? 'WORK' : 'WORKS'}`
                  : 'SELECT WORKS TO TRANSFORM'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

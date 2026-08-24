import React from 'react';
import { ASSET_IMAGES } from '../data/mockData';
import { NFTItem, ThemeMode, WalletState } from '../types';
import { soundFX } from '../utils/audio';
import { Sparkles, Check, AlertCircle, Plus } from 'lucide-react';
import { motion } from 'motion/react';

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
      className="relative w-full py-28 px-5 lg:px-12 overflow-hidden"
    >
      {/* 1. Pure Image Background with Top and Bottom Edge Blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img
          src={ASSET_IMAGES.vaultBg}
          alt="Transformation Vault Landscape"
          className="w-full h-full object-cover object-center image-edge-blur-both scale-[1.01]"
        />

        {/* Dark overlay applied strictly in Dark Mode only */}
        {themeMode === 'dark' && (
          <div className="absolute inset-0 bg-black/55 backdrop-brightness-75 transition-opacity duration-500" />
        )}
      </div>

      {/* Edge Blur Seams */}
      <div className="edge-blur-seam-top" />
      <div className="edge-blur-seam-bottom" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Main Vault Interface Glass Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${
            themeMode === 'dark'
              ? 'glass-sharp-gold text-[#e5e2e1]'
              : 'glass-sharp-light text-[#1a150e]'
          }`}
        >
          {/* Interface Header */}
          <div className={`p-8 md:p-10 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 ${
            themeMode === 'dark' ? 'bg-black/40 border-white/10' : 'bg-white/25 border-white/40'
          }`}>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-serif-heading text-2xl sm:text-3xl font-medium tracking-tight">
                  The Transformation Vault
                </h3>
                <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase border ${
                  themeMode === 'dark'
                    ? 'bg-[#e9c176]/20 text-[#e9c176] border-[#e9c176]/30'
                    : 'bg-[#775a19]/10 text-[#775a19] border-[#775a19]/25'
                }`}>
                  CURATED VAULT
                </span>
              </div>
              <p className={`text-xs sm:text-sm mt-1.5 font-sans ${themeMode === 'dark' ? 'text-white/80' : 'text-[#383124] font-medium'}`}>
                Select original artworks to dissolve into luminous particles and forge your new artifact.
              </p>
            </div>

            {/* Understated Selection Counter */}
            <div className="text-left sm:text-right flex sm:flex-col items-baseline sm:items-end justify-between w-full sm:w-auto">
              <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${
                themeMode === 'dark' ? 'text-[#e9c176]' : 'text-[#775a19]'
              }`}>
                SELECTION
              </span>
              <div className={`font-serif-heading text-xl sm:text-2xl font-medium mt-0.5 ${
                themeMode === 'dark' ? 'text-[#e9c176]' : 'text-[#775a19]'
              }`}>
                {selectedCount} {selectedCount === 1 ? 'Work Selected' : 'Works Selected'}
              </div>
            </div>
          </div>

          {/* Sub-header / Mint Action Bar */}
          <div className={`px-8 py-3.5 border-b flex items-center justify-between ${
            themeMode === 'dark' ? 'bg-black/25 border-white/5' : 'bg-white/15 border-white/20'
          }`}>
            <span className={`text-xs font-serif italic ${
              themeMode === 'dark' ? 'text-white/70' : 'text-[#383124]'
            }`}>
              Eligible Pieces in Collection ({eligibleNfts.length})
            </span>

            <button
              onClick={() => {
                soundFX.playClick();
                onAddTestNft();
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                themeMode === 'dark'
                  ? 'bg-[#e9c176]/15 text-[#e9c176] hover:bg-[#e9c176]/30 border-[#e9c176]/30'
                  : 'bg-[#775a19]/15 text-[#775a19] hover:bg-[#775a19]/25 border-[#775a19]/30'
              }`}
            >
              <Plus size={13} />
              <span>Add Curated Piece</span>
            </button>
          </div>

          {/* Museum-Grade Art Grid */}
          <div className="p-8 md:p-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 min-h-[360px]">
            {eligibleNfts.map((nft, idx) => {
              const isSelected = !!nft.isSelected;

              return (
                <motion.div
                  key={nft.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  onClick={() => {
                    soundFX.playClick();
                    onToggleSelectNft(nft.id);
                  }}
                  className={`group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 backdrop-blur-xl ${
                    isSelected
                      ? 'ring-2 ring-[#e9c176] shadow-2xl shadow-[#e9c176]/25 -translate-y-1'
                      : themeMode === 'dark'
                        ? 'border border-white/15 hover:border-[#e9c176]/50 hover:-translate-y-1 bg-black/30'
                        : 'border border-white/60 hover:border-[#775a19]/60 shadow-lg hover:-translate-y-1 bg-white/20'
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

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
                  <div className={`p-4 backdrop-blur-xl border-t flex flex-col justify-between flex-1 ${
                    themeMode === 'dark' ? 'bg-black/45 border-white/10' : 'bg-white/45 border-white/40 text-[#1a150e]'
                  }`}>
                    <div>
                      <span className={`text-[10px] uppercase tracking-[0.2em] font-bold block truncate mb-1 ${
                        themeMode === 'dark' ? 'text-[#e9c176]/90' : 'text-[#775a19]'
                      }`}>
                        {nft.collection}
                      </span>
                      <h4 className={`font-serif-heading text-base font-medium tracking-wide truncate ${
                        themeMode === 'dark' ? 'text-white' : 'text-[#1a150e]'
                      }`}>
                        {nft.name}
                      </h4>
                    </div>
                    <p className={`text-[11px] line-clamp-1 mt-1 font-sans ${
                      themeMode === 'dark' ? 'text-white/60' : 'text-[#383124] font-medium'
                    }`}>
                      {nft.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Action & Warning Footer */}
          <div className={`p-8 md:p-12 border-t flex flex-col items-center ${
            themeMode === 'dark' ? 'bg-black/40 border-white/10' : 'bg-white/25 border-white/40'
          }`}>
            {/* Irreversible Action Warning Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`w-full max-w-xl p-5 rounded-2xl border-2 flex items-start gap-4 mb-8 backdrop-blur-xl ${
                themeMode === 'dark'
                  ? 'bg-[#3b1212]/90 border-[#ff6b6b]/60 shadow-[0_0_25px_rgba(255,107,107,0.18)]'
                  : 'bg-[#fef2f2]/85 border-[#ef4444]/60 shadow-md'
              }`}
            >
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                themeMode === 'dark'
                  ? 'bg-[#ff6b6b]/20 border-[#ff6b6b]/50 text-[#ff8f8f]'
                  : 'bg-[#ef4444]/20 border-[#ef4444]/40 text-[#dc2626]'
              }`}>
                <AlertCircle size={18} strokeWidth={2.2} />
              </div>
              <div className="space-y-1">
                <h4 className={`text-xs font-bold uppercase tracking-[0.15em] ${
                  themeMode === 'dark' ? 'text-[#ffc2c2]' : 'text-[#991b1b]'
                }`}>
                  Permanent Metamorphosis Warning
                </h4>
                <p className={`text-xs leading-relaxed font-sans font-medium ${
                  themeMode === 'dark' ? 'text-[#ffe0e0]/90' : 'text-[#7f1d1d]'
                }`}>
                  This action is permanent and cannot be reversed. The selected original pieces will be permanently surrendered and dissolved into particle light to forge your new artifact.
                </p>
              </div>
            </motion.div>

            {/* Transform Trigger Button */}
            <motion.button
              whileHover={{ scale: selectedCount > 0 ? 1.02 : 1 }}
              whileTap={{ scale: selectedCount > 0 ? 0.98 : 1 }}
              onClick={handleTransformClick}
              disabled={selectedCount === 0}
              className={`w-full max-w-xl px-8 py-4.5 rounded-full text-xs font-semibold tracking-[0.25em] uppercase transition-all shadow-xl flex items-center justify-center gap-3 ${
                selectedCount > 0
                  ? themeMode === 'dark'
                    ? 'bg-gradient-to-r from-[#d97706] via-[#e9c176] to-[#d97706] text-[#2c1d00] hover:brightness-110 shadow-[#d97706]/30 hover:scale-[1.01] cursor-pointer'
                    : 'bg-gradient-to-r from-[#b45309] via-[#d97706] to-[#b45309] text-white hover:brightness-110 shadow-[#b45309]/30 hover:scale-[1.01] cursor-pointer'
                  : 'bg-black/20 text-black/35 border border-black/10 cursor-not-allowed'
              }`}
            >
              <Sparkles size={16} className={selectedCount > 0 ? "animate-pulse" : ""} />
              <span>
                {selectedCount > 0
                  ? `TRANSFORM ${selectedCount} SELECTED ${selectedCount === 1 ? 'WORK' : 'WORKS'}`
                  : 'SELECT WORKS TO TRANSFORM'}
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

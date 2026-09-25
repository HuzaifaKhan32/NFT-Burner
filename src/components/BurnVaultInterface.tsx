import React from 'react';
import { NFTItem, ThemeMode, WalletState } from '../types';
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
    onStartBurnRitual(selectedNfts);
  };

  return (
    <section 
      id="section-burn-vault"
      className="relative w-full py-16 lg:py-20 px-5 lg:px-12 overflow-hidden bg-transparent z-10"
    >
      <div className="relative z-10 max-w-[1160px] mx-auto flex flex-col items-center">
        {/* Main Vault Interface Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full surface-glass-gold overflow-hidden transition-colors duration-300"
          style={{
            borderRadius: '24px',
            boxShadow: 'var(--shadow-emphasis)'
          }}
        >
          {/* Interface Header */}
          <div className="px-6 py-4.5 md:px-7 md:py-5 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 surface-translucent"
            style={{
              borderColor: 'var(--color-border-subtle)'
            }}
          >
            <div>
              <h3 className="font-serif-heading text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight mb-0.5">
                Transformation Vault
              </h3>
              <p className="text-xs sm:text-sm font-sans" style={{ color: 'var(--color-text-secondary)' }}>
                Select NFTs to permanently transform into new artifacts.
              </p>
            </div>

            {/* Selection Counter */}
            <div className="text-left sm:text-right">
              <span className="text-[10px] tracking-wider uppercase block mb-0.5"
                style={{ color: 'var(--color-accent-gold)' }}
              >
                Selected
              </span>
              <div className="font-serif-heading text-2xl sm:text-3xl font-medium"
                style={{ color: 'var(--color-accent-gold)' }}
              >
                {selectedCount}
              </div>
            </div>
          </div>

          {/* Sub-header / Toolbar */}
          <div className="px-6 py-2.5 md:px-7 md:py-3 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 surface-translucent"
            style={{
              borderColor: 'var(--color-border-subtle)'
            }}
          >
            <div className="flex-1">
              <span className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {eligibleNfts.length} eligible NFTs in your wallet
              </span>
            </div>

            <button
              onClick={onAddTestNft}
              className="btn-secondary btn-pill inline-flex items-center gap-1.5 shrink-0 text-xs py-1.5 px-3.5"
            >
              <Plus size={13} />
              <span>Add Test NFT</span>
            </button>
          </div>

          {/* NFT Grid */}
          <div className="px-6 py-5 md:px-7 md:py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 min-h-[220px]">
            {eligibleNfts.map((nft, idx) => {
              const isSelected = !!nft.isSelected;

              return (
                <motion.div
                  key={nft.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  onClick={() => onToggleSelectNft(nft.id)}
                  className={`card card-interactive surface-glass flex flex-col overflow-hidden ${
                    isSelected ? 'card-selected' : ''
                  }`}
                  style={{
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  {/* Artwork Frame (Target ~190-230px image height depending on viewport) */}
                  <div className="relative h-48 sm:h-52 md:h-56 w-full overflow-hidden"
                    style={{ backgroundColor: 'rgba(15, 14, 12, 0.4)' }}
                  >
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Selection Mark */}
                    <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: isSelected 
                          ? 'var(--color-accent-gold)' 
                          : themeMode === 'dark' ? 'rgba(15, 14, 12, 0.65)' : 'rgba(250, 247, 243, 0.85)',
                        color: isSelected ? 'var(--color-bg-primary)' : 'transparent',
                        border: isSelected ? 'none' : '1px solid var(--color-border-subtle)',
                        opacity: isSelected ? 1 : 0
                      }}
                    >
                      <Check size={14} strokeWidth={2.5} className={isSelected ? 'opacity-100' : 'opacity-0'} />
                    </div>
                  </div>

                  {/* Artwork Label & Collection */}
                  <div className="p-3 border-t flex flex-col justify-between flex-1 surface-translucent"
                    style={{
                      borderColor: 'var(--color-border-subtle)'
                    }}
                  >
                    <div>
                      <span className="text-[10px] tracking-wide block truncate mb-0.5"
                        style={{ color: 'var(--color-accent-gold)' }}
                      >
                        {nft.collection}
                      </span>
                      <h4 className="font-serif-heading text-sm font-medium truncate"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {nft.name}
                      </h4>
                    </div>
                    <p className="text-[11px] line-clamp-1 mt-1 font-sans"
                      style={{ color: 'var(--color-text-tertiary)' }}
                    >
                      {nft.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Action & Warning Footer */}
          <div className="p-5 md:p-6 border-t flex flex-col items-center surface-translucent"
            style={{
              borderColor: 'var(--color-border-subtle)'
            }}
          >
            {/* Irreversible Action Warning */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-lg p-3 px-4 flex items-center gap-3 mb-4"
              style={{
                borderRadius: 'var(--radius-md)',
                backgroundColor: themeMode === 'dark' ? 'var(--color-danger-bg)' : 'rgba(184, 93, 93, 0.08)',
                border: '1px solid rgba(184, 93, 93, 0.3)'
              }}
            >
              <AlertCircle size={15} strokeWidth={2} className="shrink-0" style={{ color: 'var(--color-danger)' }} />
              <p className="text-xs sm:text-sm leading-relaxed font-sans" style={{ color: 'var(--color-text-secondary)' }}>
                <span className="font-semibold" style={{ color: 'var(--color-danger)' }}>This action is permanent.</span>{' '}
                Burned NFTs cannot be recovered.
              </p>
            </motion.div>

            {/* Transform Trigger Button */}
            <button
              onClick={handleTransformClick}
              disabled={selectedCount === 0}
              className="btn btn-primary w-full max-w-lg px-8 py-3.5 flex items-center justify-center gap-2.5 text-xs tracking-wider uppercase font-semibold"
            >
              <Sparkles size={15} />
              <span>
                {selectedCount > 0
                  ? `Transform ${selectedCount} ${selectedCount === 1 ? 'NFT' : 'NFTs'}`
                  : 'Select NFTs to Transform'}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

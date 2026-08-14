import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NFTItem, Artifact } from '../types';
import { ASSET_IMAGES } from '../data/mockData';
import { soundFX } from '../utils/audio';
import { Flame, Sparkles, CheckCircle2, ShieldCheck, Moon, RefreshCw, X, Share2 } from 'lucide-react';

interface BurnRitualModalProps {
  isOpen: boolean;
  selectedNfts: NFTItem[];
  onClose: () => void;
  onCompleteBurn: (newArtifact: Artifact) => void;
}

export const BurnRitualModal: React.FC<BurnRitualModalProps> = ({
  isOpen,
  selectedNfts,
  onClose,
  onCompleteBurn
}) => {
  const [ritualStage, setRitualStage] = useState<'ignite' | 'dissolve' | 'rebirth'>('ignite');
  const [progress, setProgress] = useState(0);
  const [forgedArtifact, setForgedArtifact] = useState<Artifact | null>(null);

  useEffect(() => {
    if (!isOpen || selectedNfts.length === 0) {
      setRitualStage('ignite');
      setProgress(0);
      setForgedArtifact(null);
      return;
    }

    soundFX.playBurnIgnite();

    // Progress animation timer
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    // Stage 1 -> Dissolve at 2.5s
    const dissolveTimer = setTimeout(() => {
      setRitualStage('dissolve');
    }, 2500);

    // Stage 2 -> Rebirth at 5s
    const rebirthTimer = setTimeout(() => {
      setRitualStage('rebirth');
      soundFX.playRebirthChime();

      // Create newly forged artifact based on sacrifices
      const rarities: ('Botanical' | 'Ethereal' | 'Celestial' | 'Mythic')[] = [
        'Ethereal', 'Botanical', 'Celestial', 'Mythic'
      ];
      const randomRarity = rarities[Math.floor(Math.random() * rarities.length)];
      const seedHex = "0x" + Array.from({length: 16}, () => Math.floor(Math.random()*16).toString(16)).join('');

      const newArtifact: Artifact = {
        id: `art-${Date.now()}`,
        name: `Aurelian ${randomRarity} Blossom #${Math.floor(Math.random() * 899 + 100)}`,
        rarity: randomRarity,
        image: ASSET_IMAGES.artifact1,
        forgedAt: "Just now",
        burnedNftCount: selectedNfts.length,
        originalNfts: selectedNfts.map(n => n.name),
        vrfSeed: seedHex,
        moonPhase: "Waxing Gibbous (88%)",
        priceEth: 2.15,
        creator: "0x3A9...811F",
        story: `Forged in the Aurelian Crucible through the intentional sacrifice of ${selectedNfts.map(n => n.name).join(', ')}. The dissolved metadata materialized into a golden botanical structure.`,
        attributes: [
          { trait_type: "Sacrifice Count", value: selectedNfts.length },
          { trait_type: "Botanical Genus", value: "Aurelia Chrystala" },
          { trait_type: "VRF Seed", value: seedHex.slice(0, 8) },
          { trait_type: "Mist Purity", value: "98.7%" }
        ]
      };

      setForgedArtifact(newArtifact);
    }, 5200);

    return () => {
      clearInterval(interval);
      clearTimeout(dissolveTimer);
      clearTimeout(rebirthTimer);
    };
  }, [isOpen, selectedNfts]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl overflow-y-auto">
        {/* Particle Embers background effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 20,
                opacity: 0.8,
                scale: Math.random() * 0.8 + 0.4
              }}
              animate={{
                y: -100,
                opacity: 0,
                x: `calc(${Math.random() * 100}px - 50px)`
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-t from-amber-500 to-yellow-200 blur-[1px]"
            />
          ))}
        </div>

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-2xl glass-sharp-gold rounded-3xl p-6 sm:p-10 text-white overflow-hidden shadow-2xl my-8 border border-[#e9c176]/40"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-colors z-20"
          >
            <X size={18} />
          </button>

          {/* STAGE 1 & 2: IGNITE & DISSOLVE ANIMATION */}
          {ritualStage !== 'rebirth' && (
            <div className="flex flex-col items-center text-center">
              {/* Header Status */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e9c176]/20 border border-[#e9c176]/40 mb-6">
                <Flame className="w-4 h-4 text-[#e9c176] animate-bounce" />
                <span className="text-xs font-semibold tracking-[0.2em] text-[#e9c176] uppercase">
                  {ritualStage === 'ignite' ? 'SACRED CRUCIBLE IGNITED' : 'CONSUMING METADATA'}
                </span>
              </div>

              <h2 className="font-serif-heading text-3xl sm:text-4xl font-medium mb-2">
                The Aurelian Burn Ritual
              </h2>
              <p className="text-xs sm:text-sm text-white/70 max-w-md mb-8">
                Sending {selectedNfts.length} asset{selectedNfts.length > 1 ? 's' : ''} to null address 0x000...dEaD
              </p>

              {/* Central Altar & Selected NFTs floating animation */}
              <div className="relative w-64 h-64 my-4 flex items-center justify-center">
                {/* Glowing Flame Ring */}
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: ritualStage === 'dissolve' ? [1, 1.2, 0.9, 1.1] : [1, 1.05, 1]
                  }}
                  transition={{
                    rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                  }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-[#e9c176]/60 shadow-[0_0_60px_rgba(233,193,118,0.4)]"
                />

                {/* Inner Flame Circle */}
                <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-red-600/30 via-amber-500/30 to-yellow-300/40 blur-md animate-pulse" />

                {/* Sacrificed NFT Cards Floating */}
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {selectedNfts.map((nft, index) => (
                    <motion.div
                      key={nft.id}
                      initial={{ scale: 0.8, y: 10, opacity: 0 }}
                      animate={
                        ritualStage === 'dissolve'
                          ? {
                              scale: [1, 1.1, 0],
                              opacity: [1, 0.8, 0],
                              rotate: [0, index % 2 === 0 ? 25 : -25, 180],
                              filter: ['blur(0px)', 'blur(4px)', 'blur(12px)']
                            }
                          : {
                              scale: 1,
                              y: [0, -10, 0],
                              opacity: 1
                            }
                      }
                      transition={{
                        duration: ritualStage === 'dissolve' ? 2 : 2.5,
                        repeat: ritualStage === 'dissolve' ? 0 : Infinity,
                        delay: index * 0.15
                      }}
                      className="w-24 h-24 rounded-xl overflow-hidden border-2 border-[#e9c176] shadow-xl relative bg-black"
                    >
                      <img src={nft.image} alt={nft.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-transparent to-transparent" />
                      <div className="absolute bottom-1 inset-x-1 text-[8px] font-bold truncate text-[#e9c176] text-center">
                        {nft.name}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Progress Bar & VRF status */}
              <div className="w-full max-w-md mt-6">
                <div className="flex justify-between items-center text-xs text-white/70 mb-2">
                  <span className="flex items-center gap-1.5 font-mono">
                    <RefreshCw size={12} className="animate-spin text-[#e9c176]" />
                    VRF Random Function Verifying
                  </span>
                  <span className="font-bold text-[#e9c176] font-mono">{progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden border border-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-600 to-[#e9c176]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STAGE 3: REBIRTH - NEW ARTIFACT REVEAL */}
          {ritualStage === 'rebirth' && forgedArtifact && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 mb-4 text-emerald-300 text-xs font-semibold tracking-widest uppercase">
                <Sparkles size={14} />
                AURELIAN ARTIFACT FORGED
              </div>

              <h2 className="font-serif-heading text-3xl sm:text-4xl font-semibold text-[#e9c176] mb-2">
                {forgedArtifact.name}
              </h2>
              <p className="text-xs text-white/70 max-w-md mb-6 leading-relaxed">
                {forgedArtifact.story}
              </p>

              {/* Artifact Card Image */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden border-2 border-[#e9c176] shadow-[0_0_50px_rgba(233,193,118,0.3)] my-2 group">
                <img
                  src={forgedArtifact.image}
                  alt={forgedArtifact.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#e9c176]/50 text-[10px] font-bold uppercase tracking-wider text-[#e9c176]">
                  {forgedArtifact.rarity}
                </div>
              </div>

              {/* Metadata Traits Grid */}
              <div className="w-full grid grid-cols-2 gap-3 my-6 text-left">
                {forgedArtifact.attributes.map((attr, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-bold text-white/50 tracking-wider uppercase block">
                      {attr.trait_type}
                    </span>
                    <span className="text-xs font-semibold text-[#e9c176] block truncate">
                      {attr.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Complete Actions */}
              <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
                <button
                  onClick={() => {
                    soundFX.playClick();
                    onCompleteBurn(forgedArtifact);
                  }}
                  className="flex-1 py-3.5 rounded-full bg-[#e9c176] text-black font-bold text-xs tracking-widest uppercase hover:bg-[#ffdea5] transition-all shadow-lg shadow-[#e9c176]/20"
                >
                  CLAIM TO VAULT & VIEW GALLERY
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

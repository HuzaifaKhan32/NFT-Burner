import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NFTItem, Artifact } from '../types';
import { ASSET_IMAGES } from '../data/mockData';
import { soundFX } from '../utils/audio';
import { Sparkles, Moon, RefreshCw, X, ArrowRight, Compass } from 'lucide-react';

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
  const [ritualStage, setRitualStage] = useState<'converge' | 'dissolve' | 'crystallize' | 'revealed'>('converge');
  const [progress, setProgress] = useState(0);
  const [forgedArtifact, setForgedArtifact] = useState<Artifact | null>(null);

  useEffect(() => {
    if (!isOpen || selectedNfts.length === 0) {
      setRitualStage('converge');
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
    }, 75);

    // Stage 1 -> Dissolve and reform moment at 2.2s
    const dissolveTimer = setTimeout(() => {
      setRitualStage('dissolve');
    }, 2200);

    // Stage 2 -> Crystallize at 4.2s
    const crystallizeTimer = setTimeout(() => {
      setRitualStage('crystallize');
    }, 4200);

    // Stage 3 -> Revealed at 5.5s
    const revealTimer = setTimeout(() => {
      setRitualStage('revealed');
      soundFX.playRebirthChime();

      const rarities: ('Botanical' | 'Ethereal' | 'Celestial' | 'Mythic')[] = [
        'Celestial', 'Mythic', 'Ethereal', 'Botanical'
      ];
      const randomRarity = rarities[Math.floor(Math.random() * rarities.length)];
      const seedCode = `VRF-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;

      const newArtifact: Artifact = {
        id: `art-${Date.now()}`,
        name: `Aurelian ${randomRarity} Blossom #${Math.floor(Math.random() * 899 + 100)}`,
        rarity: randomRarity,
        image: ASSET_IMAGES.artifact1,
        forgedAt: "Just now",
        transformedCount: selectedNfts.length,
        originalNfts: selectedNfts.map(n => n.name),
        originalThumbnails: selectedNfts.map(n => n.image),
        vrfSeed: seedCode,
        moonPhase: "Waxing Gibbous (88%)",
        priceEth: 2.15,
        creator: "Aurelian Sanctuary",
        story: `Forged through the quiet metamorphosis of ${selectedNfts.length} original pieces (${selectedNfts.map(n => n.name).join(', ')}). Their visual essences dissolved completely into particle light to reform as this luminous botanical structure.`,
        attributes: [
          { trait_type: "Transformed Works", value: selectedNfts.length },
          { trait_type: "Botanical Genus", value: "Aurelia Chrysalis" },
          { trait_type: "Synthesis Seed", value: seedCode },
          { trait_type: "Mist Harmonic", value: "528 Hz" }
        ]
      };

      setForgedArtifact(newArtifact);
    }, 5500);

    return () => {
      clearInterval(interval);
      clearTimeout(dissolveTimer);
      clearTimeout(crystallizeTimer);
      clearTimeout(revealTimer);
    };
  }, [isOpen, selectedNfts]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl overflow-y-auto">
        {/* Luminous Particle background effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 20,
                opacity: 0.7,
                scale: Math.random() * 0.7 + 0.3
              }}
              animate={{
                y: -120,
                opacity: 0,
                x: `calc(${Math.random() * 80}px - 40px)`
              }}
              transition={{
                duration: Math.random() * 3.5 + 2.5,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-t from-[#e9c176] to-white blur-[1px]"
            />
          ))}
        </div>

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
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

          {/* STAGES 1, 2 & 3: TRANSFORMATION & DISSOLVE-AND-REFORM MOMENT */}
          {ritualStage !== 'revealed' && (
            <div className="flex flex-col items-center text-center">
              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e9c176]/15 border border-[#e9c176]/40 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#e9c176] animate-pulse" />
                <span className="text-[11px] font-semibold tracking-[0.2em] text-[#e9c176] uppercase">
                  {ritualStage === 'converge' && 'ALIGNING ORIGINAL WORKS'}
                  {ritualStage === 'dissolve' && 'THE DISSOLVE & REFORM MOMENT'}
                  {ritualStage === 'crystallize' && 'CRYSTALLIZING BOTANICAL RELIC'}
                </span>
              </div>

              <h2 className="font-serif-heading text-3xl sm:text-4xl font-medium tracking-tight mb-2">
                The Metamorphosis Ritual
              </h2>
              <p className="text-xs sm:text-sm text-white/70 max-w-md mb-8 font-sans">
                {selectedNfts.length} {selectedNfts.length === 1 ? 'original work is' : 'original works are'} dissolving into particle light to forge a harmonious new botanical artifact.
              </p>

              {/* Visual Transformation Frame (Dissolve-and-Reform Concept) */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 my-2 flex items-center justify-center">
                {/* Outer Astral Rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border border-dashed border-[#e9c176]/40 shadow-[0_0_60px_rgba(233,193,118,0.25)]"
                />

                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-6 rounded-full border border-dotted border-white/20"
                />

                {/* Radiant Core Glow */}
                <div className={`absolute w-36 h-36 rounded-full blur-xl transition-all duration-1000 ${
                  ritualStage === 'dissolve'
                    ? 'bg-[#e9c176]/40 scale-125'
                    : ritualStage === 'crystallize'
                      ? 'bg-amber-300/50 scale-150'
                      : 'bg-[#ab9ff2]/25 scale-100'
                }`} />

                {/* Original Artworks Dissolving into Golden Particles */}
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {selectedNfts.map((nft, index) => (
                    <motion.div
                      key={nft.id}
                      initial={{ scale: 0.9, y: 0, opacity: 0.9 }}
                      animate={
                        ritualStage === 'dissolve'
                          ? {
                              scale: [1, 1.15, 0],
                              opacity: [1, 0.9, 0],
                              y: [0, -25, 0],
                              filter: ['blur(0px)', 'blur(6px)', 'blur(20px)']
                            }
                          : ritualStage === 'crystallize'
                            ? { scale: 0, opacity: 0 }
                            : {
                                scale: [1, 1.05, 1],
                                y: [0, -8, 0],
                                opacity: 1
                              }
                      }
                      transition={{
                        duration: ritualStage === 'dissolve' ? 2 : 2.5,
                        repeat: ritualStage === 'dissolve' ? 0 : Infinity,
                        delay: index * 0.12
                      }}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#e9c176]/80 shadow-2xl relative bg-black"
                    >
                      <img src={nft.image} alt={nft.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-1.5 inset-x-1.5 text-[9px] font-medium truncate text-white text-center">
                        {nft.name}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Crystallizing Relic Silhouette in Center */}
                {ritualStage === 'crystallize' && (
                  <motion.div
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: [0.3, 1.1, 1], opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="absolute z-20 w-32 h-32 rounded-2xl overflow-hidden border-2 border-[#e9c176] shadow-[0_0_50px_rgba(233,193,118,0.6)] bg-black/60"
                  >
                    <img src={ASSET_IMAGES.artifact1} alt="Emerging Artifact" className="w-full h-full object-cover" />
                  </motion.div>
                )}
              </div>

              {/* Progress Bar & VRF Status */}
              <div className="w-full max-w-md mt-6">
                <div className="flex justify-between items-center text-xs text-white/70 mb-2">
                  <span className="flex items-center gap-1.5 text-xs text-white/80">
                    <RefreshCw size={12} className="animate-spin text-[#e9c176]" />
                    Verifiable Random Synthesis
                  </span>
                  <span className="font-serif text-[#e9c176] font-semibold">{progress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden border border-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#d97706] to-[#e9c176]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STAGE 4: ARTIFACT REVEAL WITH PROVENANCE LINEAGE */}
          {ritualStage === 'revealed' && forgedArtifact && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e9c176]/20 border border-[#e9c176]/40 mb-4 text-[#e9c176] text-xs font-semibold tracking-widest uppercase">
                <Sparkles size={14} />
                NEW ARTIFACT MATERIALIZED
              </div>

              <h2 className="font-serif-heading text-3xl sm:text-4xl font-semibold text-[#e9c176] mb-2">
                {forgedArtifact.name}
              </h2>
              <p className="text-xs text-white/70 max-w-md mb-6 leading-relaxed font-sans">
                {forgedArtifact.story}
              </p>

              {/* Artifact Card Image */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden border-2 border-[#e9c176] shadow-[0_0_50px_rgba(233,193,118,0.3)] my-2 group">
                <img
                  src={forgedArtifact.image}
                  alt={forgedArtifact.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#e9c176]/50 text-[10px] font-semibold uppercase tracking-wider text-[#e9c176]">
                  {forgedArtifact.rarity}
                </div>
              </div>

              {/* Provenance Lineage Section (Shows origin with thumbnails) */}
              <div className="w-full p-4 rounded-2xl bg-black/35 border border-white/10 my-4 text-left">
                <span className="text-[10px] font-semibold tracking-[0.2em] text-[#e9c176] uppercase block mb-2">
                  PROVENANCE & ORIGIN
                </span>
                <p className="text-xs text-white/80 mb-3">
                  Composed from {forgedArtifact.transformedCount} transformed original {forgedArtifact.transformedCount === 1 ? 'work' : 'works'}:
                </p>
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {forgedArtifact.originalThumbnails?.map((thumb, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1.5 shrink-0">
                      <img src={thumb} alt="Source" className="w-8 h-8 rounded-lg object-cover" />
                      <span className="text-[11px] text-white/90 font-medium pr-1.5 max-w-[120px] truncate">
                        {forgedArtifact.originalNfts[idx] || `Work #${idx + 1}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metadata Traits Grid */}
              <div className="w-full grid grid-cols-2 gap-3 mb-6 text-left">
                {forgedArtifact.attributes.map((attr, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-semibold text-white/50 tracking-wider uppercase block">
                      {attr.trait_type}
                    </span>
                    <span className="text-xs font-semibold text-[#e9c176] block truncate">
                      {attr.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Complete Action */}
              <button
                onClick={() => {
                  soundFX.playClick();
                  onCompleteBurn(forgedArtifact);
                }}
                className="w-full py-4 rounded-full bg-[#e9c176] text-[#2c1d00] font-semibold text-xs tracking-widest uppercase hover:bg-[#ffdea5] transition-all shadow-xl shadow-[#e9c176]/20 cursor-pointer"
              >
                COLLECT ARTIFACT TO VAULT & VIEW GALLERY
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { Artifact, ThemeMode } from '../types';
import { Search, Filter, ArrowUpRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GallerySectionProps {
  artifacts: Artifact[];
  themeMode: ThemeMode;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ artifacts, themeMode }) => {
  const [selectedRarity, setSelectedRarity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectArtifact, setInspectArtifact] = useState<Artifact | null>(null);

  const filteredArtifacts = artifacts.filter(art => {
    const matchesRarity = selectedRarity === 'All' || art.rarity === selectedRarity;
    const matchesSearch = art.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.story.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRarity && matchesSearch;
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
            Artifact Gallery
          </h1>
          <p className="text-base sm:text-lg font-sans" style={{ color: 'var(--color-text-secondary)' }}>
            Browse the digital artifacts created from transformed NFTs.
          </p>
        </motion.div>

        {/* Filter & Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="surface-glass p-4 mb-10 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderRadius: 'var(--radius-md)' }}
        >
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2" size={18} style={{ color: 'var(--color-text-tertiary)' }} />
            <input
              type="text"
              placeholder="Search by name or genus..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm font-sans outline-none transition-colors"
              style={{
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-bg-tertiary)',
                border: '1px solid var(--color-border-subtle)',
                color: 'var(--color-text-primary)'
              }}
            />
          </div>

          {/* Rarity Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <Filter size={16} className="shrink-0 mr-1" style={{ color: 'var(--color-accent-gold)' }} />
            {['All', 'Mythic', 'Celestial', 'Ethereal', 'Botanical'].map(rarity => {
              const active = selectedRarity === rarity;
              return (
                <button
                  key={rarity}
                  onClick={() => setSelectedRarity(rarity)}
                  className="btn-pill whitespace-nowrap transition-colors"
                  style={{
                    backgroundColor: active ? 'var(--color-accent-gold)' : 'var(--color-bg-tertiary)',
                    color: active ? 'var(--color-bg-primary)' : 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border-subtle)',
                    fontWeight: 600
                  }}
                >
                  {rarity}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredArtifacts.map((art, idx) => (
              <motion.div
                key={art.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => setInspectArtifact(art)}
                className="card card-interactive surface-solid overflow-hidden"
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
                  <img
                    src={art.image}
                    alt={art.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 badge badge-gold">
                    {art.rarity}
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-5">
                  <h3 className="font-serif-heading text-lg font-medium truncate mb-1">
                    {art.name}
                  </h3>
                  <p className="text-xs line-clamp-2 mb-4 leading-relaxed font-sans" style={{ color: 'var(--color-text-tertiary)' }}>
                    {art.story}
                  </p>

                  <div className="pt-3 border-t flex justify-between items-center text-xs" style={{ borderColor: 'var(--color-border-subtle)' }}>
                    <span style={{ color: 'var(--color-text-tertiary)' }}>
                      {art.transformedCount || art.originalNfts.length} transformed
                    </span>
                    <span className="font-semibold flex items-center gap-0.5" style={{ color: 'var(--color-accent-gold)' }}>
                      {art.priceEth} SOL <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Inspection for Artifact with Provenance */}
        <AnimatePresence>
          {inspectArtifact && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-3xl surface-glass-gold p-6 sm:p-10 overflow-hidden my-8"
                style={{ borderRadius: 'var(--radius-lg)', color: 'var(--color-text-primary)' }}
              >
                <button
                  onClick={() => setInspectArtifact(null)}
                  className="absolute top-5 right-5 p-2 rounded-full transition-colors cursor-pointer"
                  style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)' }}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="aspect-square overflow-hidden relative"
                    style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-emphasis)', backgroundColor: 'var(--color-bg-primary)' }}
                  >
                    <img src={inspectArtifact.image} alt={inspectArtifact.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 badge badge-gold">
                      {inspectArtifact.rarity}
                    </div>
                  </div>

                  <div>
                    <h2 className="font-serif-heading text-2xl sm:text-3xl font-medium mb-2" style={{ color: 'var(--color-accent-gold)' }}>
                      {inspectArtifact.name}
                    </h2>
                    <p className="text-sm leading-relaxed mb-4 font-sans" style={{ color: 'var(--color-text-secondary)' }}>
                      {inspectArtifact.story}
                    </p>

                    {/* Provenance & Lineage with Origin Previews */}
                    <div className="p-3.5 mb-4"
                      style={{ borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border-subtle)' }}
                    >
                      <span className="text-xs font-semibold tracking-wide uppercase block mb-1.5" style={{ color: 'var(--color-accent-gold)' }}>
                        Provenance & Origin
                      </span>
                      <p className="text-xs mb-2.5" style={{ color: 'var(--color-text-secondary)' }}>
                        Composed from {inspectArtifact.transformedCount || inspectArtifact.originalNfts.length} transformed original works:
                      </p>
                      <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        {inspectArtifact.originalThumbnails?.map((thumb, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 rounded-lg p-1 shrink-0"
                            style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-subtle)' }}
                          >
                            <img src={thumb} alt="Origin" className="w-7 h-7 rounded object-cover" />
                            <span className="text-xs truncate max-w-[100px]" style={{ color: 'var(--color-text-secondary)' }}>
                              {inspectArtifact.originalNfts[idx] || `Work #${idx + 1}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 mb-6 text-xs font-sans">
                      <div className="p-2.5 flex justify-between"
                        style={{ borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border-subtle)' }}
                      >
                        <span style={{ color: 'var(--color-text-tertiary)' }}>Synthesis Seed</span>
                        <span className="font-mono" style={{ color: 'var(--color-accent-gold)' }}>{inspectArtifact.vrfSeed}</span>
                      </div>
                      <div className="p-2.5 flex justify-between"
                        style={{ borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border-subtle)' }}
                      >
                        <span style={{ color: 'var(--color-text-tertiary)' }}>Lunar Calibration</span>
                        <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{inspectArtifact.moonPhase}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setInspectArtifact(null)}
                      className="btn btn-primary w-full py-3.5"
                    >
                      Collect Artifact ({inspectArtifact.priceEth} SOL)
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

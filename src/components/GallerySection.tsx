import React, { useState } from 'react';
import { Artifact, ThemeMode } from '../types';
import { soundFX } from '../utils/audio';
import { Search, Filter, Sparkles, Moon, ExternalLink, ShieldCheck, Flame, ArrowUpRight } from 'lucide-react';

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
    <section className={`min-h-screen pt-28 pb-24 px-5 lg:px-12 transition-colors duration-300 ${
      themeMode === 'dark' ? 'bg-[#121212] text-[#e5e2e1]' : 'bg-[#fff8f3] text-[#1e1b16]'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e9c176]/20 border border-[#e9c176]/40 text-[#e9c176] text-xs font-semibold tracking-widest uppercase mb-4">
            <Sparkles size={14} />
            SANCTUARY OF REBIRTH
          </div>
          <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-medium mb-4">
            The Aurelian Artifact Gallery
          </h1>
          <p className={`text-base sm:text-lg ${themeMode === 'dark' ? 'text-[#d1c5b4]' : 'text-[#4e4639]'}`}>
            Explore nature-inspired digital artifacts forged in the mist through intentional NFT sacrifices.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className={`p-4 rounded-2xl mb-10 flex flex-col md:flex-row items-center justify-between gap-4 ${
          themeMode === 'dark' ? 'glass-sharp' : 'bg-white shadow-lg border border-[#7f7667]/20'
        }`}>
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50" size={18} />
            <input
              type="text"
              placeholder="Search by artifact name or genus..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-black/30 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#e9c176]"
            />
          </div>

          {/* Rarity Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <Filter size={16} className="text-[#e9c176] shrink-0 mr-1" />
            {['All', 'Mythic', 'Celestial', 'Ethereal', 'Botanical'].map(rarity => (
              <button
                key={rarity}
                onClick={() => {
                  soundFX.playClick();
                  setSelectedRarity(rarity);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap ${
                  selectedRarity === rarity
                    ? 'bg-[#e9c176] text-black shadow-md'
                    : 'bg-white/5 text-current hover:bg-white/15'
                }`}
              >
                {rarity}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtifacts.map(art => (
            <div
              key={art.id}
              onClick={() => {
                soundFX.playClick();
                setInspectArtifact(art);
              }}
              className={`group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 ${
                themeMode === 'dark'
                  ? 'glass-sharp hover:border-[#e9c176]/50 shadow-xl'
                  : 'bg-white border border-[#7f7667]/20 hover:shadow-2xl'
              }`}
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-black/40">
                <img
                  src={art.image}
                  alt={art.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#e9c176]/40 text-[10px] font-semibold tracking-wider text-[#e9c176] uppercase">
                  {art.rarity}
                </div>

                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-medium text-white/90 flex items-center gap-1.5 border border-white/10">
                  <Sparkles size={11} className="text-[#e9c176]" />
                  <span>{art.transformedCount || art.originalNfts.length} Transformed</span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5">
                <h3 className="font-serif-heading text-lg font-semibold truncate mb-1">
                  {art.name}
                </h3>
                <p className="text-xs text-current opacity-70 line-clamp-2 mb-4 leading-relaxed font-sans">
                  {art.story}
                </p>

                <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="text-current opacity-60">Forged {art.forgedAt}</span>
                  <span className="text-[#e9c176] font-semibold flex items-center gap-0.5">
                    {art.priceEth} SOL <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Inspection for Artifact with Provenance */}
        {inspectArtifact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-3xl glass-sharp-gold rounded-3xl p-6 sm:p-10 text-white overflow-hidden my-8 border border-[#e9c176]/40">
              <button
                onClick={() => setInspectArtifact(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="aspect-square rounded-2xl overflow-hidden border border-[#e9c176]/50 shadow-2xl relative bg-black">
                  <img src={inspectArtifact.image} alt={inspectArtifact.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 text-[10px] font-semibold text-[#e9c176] border border-[#e9c176]/40 uppercase tracking-wider">
                    {inspectArtifact.rarity}
                  </div>
                </div>

                <div>
                  <h2 className="font-serif-heading text-2xl sm:text-3xl font-semibold text-[#e9c176] mb-2">
                    {inspectArtifact.name}
                  </h2>
                  <p className="text-xs text-white/80 leading-relaxed mb-4 font-sans">
                    {inspectArtifact.story}
                  </p>

                  {/* Provenance & Lineage with Origin Previews */}
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 mb-4">
                    <span className="text-[10px] font-semibold tracking-[0.15em] text-[#e9c176] uppercase block mb-1.5">
                      PROVENANCE & ORIGIN
                    </span>
                    <p className="text-xs text-white/80 mb-2.5">
                      Composed from {inspectArtifact.transformedCount || inspectArtifact.originalNfts.length} transformed original works:
                    </p>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {inspectArtifact.originalThumbnails?.map((thumb, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg p-1 shrink-0">
                          <img src={thumb} alt="Origin" className="w-7 h-7 rounded object-cover" />
                          <span className="text-[10px] text-white/90 truncate max-w-[100px]">
                            {inspectArtifact.originalNfts[idx] || `Work #${idx + 1}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 mb-6 text-xs font-sans">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                      <span className="text-white/60">Verifiable Synthesis Seed</span>
                      <span className="font-mono text-[#e9c176]">{inspectArtifact.vrfSeed}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                      <span className="text-white/60">Lunar Calibration</span>
                      <span className="text-white font-medium">{inspectArtifact.moonPhase}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      soundFX.playClick();
                      setInspectArtifact(null);
                    }}
                    className="w-full py-3.5 rounded-full bg-[#e9c176] text-[#2c1d00] font-semibold text-xs tracking-widest uppercase hover:bg-[#ffdea5] transition-all shadow-lg cursor-pointer"
                  >
                    COLLECT ARTIFACT ({inspectArtifact.priceEth} SOL)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

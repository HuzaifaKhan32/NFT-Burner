import React, { useState } from 'react';
import { NavigationTab, ThemeMode } from '../types';
import { soundFX } from '../utils/audio';
import {
  Sparkles,
  ArrowUp,
  Mail,
  CheckCircle2,
  Globe,
  ShieldCheck,
  Compass,
  FileText,
  ExternalLink,
  ChevronRight,
  X
} from 'lucide-react';

interface FooterProps {
  themeMode: ThemeMode;
  setActiveTab: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ themeMode, setActiveTab }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    soundFX.playRebirthChime();
    setSubscribed(true);
  };

  const scrollToTop = () => {
    soundFX.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (tab: NavigationTab) => {
    soundFX.playClick();
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`w-full transition-colors duration-500 border-t ${
        themeMode === 'dark'
          ? 'bg-[#141210] text-[#e5e2e1] border-white/10'
          : 'bg-[#fcf9f5] text-[#2c2416] border-[#e8dfd3]'
      }`}
    >
      {/* 1. TOP NEWSLETTER / DISPATCH BANNER */}
      <div
        className={`border-b ${
          themeMode === 'dark' ? 'border-white/10 bg-black/20' : 'border-[#e8dfd3] bg-[#f5ede1]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase mb-3 bg-[#e9c176]/15 text-[#e9c176] border border-[#e9c176]/30">
                <Sparkles size={12} />
                THE LUNAR DISPATCH
              </div>
              <h3 className="font-serif-heading text-2xl sm:text-3xl font-medium tracking-tight mb-2">
                Stay Attuned to the Lunar Metamorphosis
              </h3>
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  themeMode === 'dark' ? 'text-white/70' : 'text-[#5d5241]'
                }`}
              >
                Receive cryptographic alerts when cosmic cycles and oracle seeds align for high-resonance botanical transformations.
              </p>
            </div>

            {/* Newsletter Input Box */}
            <div className="w-full lg:w-auto lg:min-w-[420px]">
              {subscribed ? (
                <div className="p-4 rounded-2xl bg-[#e9c176]/15 border border-[#e9c176]/40 flex items-center gap-3 text-[#e9c176]">
                  <CheckCircle2 size={20} className="shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider">You are Attuned</h5>
                    <p className="text-[11px] text-white/80">
                      The sanctuary dispatch will notify you at next full moon alignment.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 w-full">
                  <div className="relative flex-1">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter collector email..."
                      required
                      className={`w-full pl-11 pr-4 py-3.5 rounded-full text-xs font-sans outline-none transition-all ${
                        themeMode === 'dark'
                          ? 'bg-white/5 border border-white/15 text-white placeholder:text-white/40 focus:border-[#e9c176]'
                          : 'bg-white border border-[#d6c7b2] text-[#2c2416] placeholder:text-[#887864] focus:border-[#775a19] shadow-sm'
                      }`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-7 py-3.5 rounded-full bg-[#e9c176] text-[#2c1d00] hover:bg-[#ffdca2] text-xs font-semibold tracking-widest uppercase transition-all shadow-md hover:scale-[1.02] shrink-0 cursor-pointer"
                  >
                    SUBSCRIBE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN 4-COLUMN FOOTER NAVIGATION */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Identity & Protocol Specs */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#d97706] to-[#e9c176] p-[1px] shadow-lg shadow-[#e9c176]/20">
                <div className="w-full h-full rounded-[15px] bg-[#1a1714] flex items-center justify-center text-[#e9c176]">
                  <Sparkles size={18} />
                </div>
              </div>
              <div>
                <span className="font-serif-heading text-xl font-semibold tracking-wider text-current block">
                  AURELIAN MIST
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#e9c176] font-semibold uppercase block">
                  SANCTUARY FOR METAMORPHOSIS
                </span>
              </div>
            </div>

            <p
              className={`text-xs sm:text-sm leading-relaxed max-w-sm font-sans ${
                themeMode === 'dark' ? 'text-white/70' : 'text-[#5d5241]'
              }`}
            >
              An algorithmic sanctuary where original artworks surrender their form, dissolving into particle light to crystallize into immutable botanical artifacts.
            </p>

            {/* Protocol Status Indicators */}
            <div className="pt-2 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/80">Phantom Web3 Integrated</span>
              </div>
              <div className="block text-[11px] text-white/50 font-mono">
                Oracle Seed: <span className="text-[#e9c176]">VRF-528Hz-Active</span> • Protocol v2.4
              </div>
            </div>
          </div>

          {/* Navigation Column 1: Sanctuary */}
          <div className="space-y-4">
            <h4 className="font-serif-heading text-base font-semibold tracking-wider uppercase text-[#e9c176]">
              The Sanctuary
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => handleNavClick('burn-vault')}
                  className="hover:text-[#e9c176] transition-colors flex items-center gap-1.5 text-current opacity-80 hover:opacity-100 cursor-pointer"
                >
                  <ChevronRight size={12} className="text-[#e9c176]" />
                  Transformation Vault
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('gallery')}
                  className="hover:text-[#e9c176] transition-colors flex items-center gap-1.5 text-current opacity-80 hover:opacity-100 cursor-pointer"
                >
                  <ChevronRight size={12} className="text-[#e9c176]" />
                  Botanical Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('marketplace')}
                  className="hover:text-[#e9c176] transition-colors flex items-center gap-1.5 text-current opacity-80 hover:opacity-100 cursor-pointer"
                >
                  <ChevronRight size={12} className="text-[#e9c176]" />
                  Curated Offerings
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setActiveModal('provenance');
                  }}
                  className="hover:text-[#e9c176] transition-colors flex items-center gap-1.5 text-current opacity-80 hover:opacity-100 cursor-pointer"
                >
                  <ChevronRight size={12} className="text-[#e9c176]" />
                  Lineage Archive
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setActiveModal('lunar');
                  }}
                  className="hover:text-[#e9c176] transition-colors flex items-center gap-1.5 text-current opacity-80 hover:opacity-100 cursor-pointer"
                >
                  <ChevronRight size={12} className="text-[#e9c176]" />
                  Lunar Calendar
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2: Protocol & Provenance */}
          <div className="space-y-4">
            <h4 className="font-serif-heading text-base font-semibold tracking-wider uppercase text-[#e9c176]">
              Provenance
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setActiveModal('vrf');
                  }}
                  className="hover:text-[#e9c176] transition-colors flex items-center gap-1.5 text-current opacity-80 hover:opacity-100 cursor-pointer"
                >
                  <ChevronRight size={12} className="text-[#e9c176]" />
                  VRF Synthesis Oracle
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setActiveModal('proof');
                  }}
                  className="hover:text-[#e9c176] transition-colors flex items-center gap-1.5 text-current opacity-80 hover:opacity-100 cursor-pointer"
                >
                  <ChevronRight size={12} className="text-[#e9c176]" />
                  Proof of Surrender
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setActiveModal('phantom');
                  }}
                  className="hover:text-[#e9c176] transition-colors flex items-center gap-1.5 text-current opacity-80 hover:opacity-100 cursor-pointer"
                >
                  <ChevronRight size={12} className="text-[#e9c176]" />
                  Phantom Wallet Security
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setActiveModal('botanical');
                  }}
                  className="hover:text-[#e9c176] transition-colors flex items-center gap-1.5 text-current opacity-80 hover:opacity-100 cursor-pointer"
                >
                  <ChevronRight size={12} className="text-[#e9c176]" />
                  Botanical Genus Types
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Column 3: Guild & Legal */}
          <div className="space-y-4">
            <h4 className="font-serif-heading text-base font-semibold tracking-wider uppercase text-[#e9c176]">
              Guild & Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setActiveModal('terms');
                  }}
                  className="hover:text-[#e9c176] transition-colors flex items-center gap-1.5 text-current opacity-80 hover:opacity-100 cursor-pointer"
                >
                  <ChevronRight size={12} className="text-[#e9c176]" />
                  Terms of Metamorphosis
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setActiveModal('privacy');
                  }}
                  className="hover:text-[#e9c176] transition-colors flex items-center gap-1.5 text-current opacity-80 hover:opacity-100 cursor-pointer"
                >
                  <ChevronRight size={12} className="text-[#e9c176]" />
                  Collector Privacy
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setActiveModal('manifesto');
                  }}
                  className="hover:text-[#e9c176] transition-colors flex items-center gap-1.5 text-current opacity-80 hover:opacity-100 cursor-pointer"
                >
                  <ChevronRight size={12} className="text-[#e9c176]" />
                  Sanctuary Manifesto
                </button>
              </li>
              <li>
                <a
                  href="mailto:curator@aurelianmist.sanctuary"
                  onClick={() => soundFX.playClick()}
                  className="hover:text-[#e9c176] transition-colors flex items-center gap-1.5 text-current opacity-80 hover:opacity-100"
                >
                  <ChevronRight size={12} className="text-[#e9c176]" />
                  Curatorial Inquiries
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM BAR: COPYRIGHT, SOCIALS & BACK TO TOP */}
      <div
        className={`border-t py-8 px-6 sm:px-8 lg:px-12 ${
          themeMode === 'dark' ? 'border-white/10 bg-black/40' : 'border-[#e8dfd3] bg-[#f0e7da]/50'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
          {/* Copyright text */}
          <div className="text-center sm:text-left">
            <p className="opacity-70 font-sans tracking-wide">
              © 2026 <span className="font-semibold text-current">AURELIAN MIST SANCTUARY</span>. ALL RIGHTS RESERVED.
            </p>
            <p className="text-[10px] opacity-40 mt-0.5">
              Permanently transformed works enter the generative botanical continuum.
            </p>
          </div>

          {/* Social Links & Phantom Badge */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => {
                  soundFX.playClick();
                  setActiveModal('phantom');
                }}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#ab9ff2]/20 border border-white/10 hover:border-[#ab9ff2]/40 flex items-center justify-center text-sm transition-all"
                title="Phantom Wallet Network"
              >
                👻
              </button>
              <a
                href="#sanctuary"
                onClick={(e) => {
                  e.preventDefault();
                  soundFX.playClick();
                  setActiveModal('manifesto');
                }}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#e9c176]/20 border border-white/10 hover:border-[#e9c176]/40 flex items-center justify-center opacity-70 hover:opacity-100 hover:text-[#e9c176] transition-all"
                title="Sanctuary Network"
              >
                <Globe size={14} />
              </a>
              <a
                href="#provenance"
                onClick={(e) => {
                  e.preventDefault();
                  soundFX.playClick();
                  setActiveModal('provenance');
                }}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#e9c176]/20 border border-white/10 hover:border-[#e9c176]/40 flex items-center justify-center opacity-70 hover:opacity-100 hover:text-[#e9c176] transition-all"
                title="Provenance Guarantee"
              >
                <ShieldCheck size={14} />
              </a>
            </div>

            <div className="h-4 w-[1px] bg-white/10" />

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#e9c176]/20 border border-white/10 hover:border-[#e9c176]/40 text-current hover:text-[#e9c176] transition-all text-[11px] font-medium tracking-wider uppercase cursor-pointer"
              title="Return to top of page"
            >
              <span>TOP</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. MODAL DIALOGS FOR FOOTER LINKS */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-sharp-gold rounded-3xl p-6 sm:p-8 text-white border border-[#e9c176]/40 shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white cursor-pointer"
            >
              <X size={16} />
            </button>

            {activeModal === 'terms' && (
              <div>
                <h3 className="font-serif-heading text-2xl font-medium text-[#e9c176] mb-3">
                  Terms of Metamorphosis
                </h3>
                <div className="text-xs text-white/80 space-y-3 leading-relaxed font-sans max-h-72 overflow-y-auto pr-2">
                  <p>
                    1. <strong>Irreversibility:</strong> Initiating metamorphosis permanently dissolves the selected original artworks into the Aurelian Protocol. This process is mathematically irreversible.
                  </p>
                  <p>
                    2. <strong>Generative Provenance:</strong> The resulting botanical artifact receives a cryptographic lineage record tracing back to the surrendered source works.
                  </p>
                  <p>
                    3. <strong>Collector Custody:</strong> Minted artifacts are deposited directly into your connected Phantom wallet with complete self-custody and full transfer rights.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'privacy' && (
              <div>
                <h3 className="font-serif-heading text-2xl font-medium text-[#e9c176] mb-3">
                  Collector Privacy
                </h3>
                <div className="text-xs text-white/80 space-y-3 leading-relaxed font-sans">
                  <p>
                    Aurelian Mist respects collector autonomy. We do not track personal identification details, web footprints, or custodial credentials.
                  </p>
                  <p>
                    All transformation state data is processed entirely client-side and verified on-chain via the cryptographic Oracle.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'provenance' && (
              <div>
                <h3 className="font-serif-heading text-2xl font-medium text-[#e9c176] mb-3">
                  Cryptographic Provenance Standard
                </h3>
                <div className="text-xs text-white/80 space-y-3 leading-relaxed font-sans">
                  <p>
                    Every Aurelian Artifact embeds a verifiable token lineage record preserving the titles, genesis IDs, and aesthetic harmonics of all sacrificed pieces.
                  </p>
                  <p>
                    This permanent provenance guarantees authentic digital scarcity and historical significance.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'vrf' && (
              <div>
                <h3 className="font-serif-heading text-2xl font-medium text-[#e9c176] mb-3">
                  Verifiable Random Function (VRF)
                </h3>
                <div className="text-xs text-white/80 space-y-3 leading-relaxed font-sans">
                  <p>
                    Artifact generation utilizes a Verifiable Random Function (VRF) to combine source metadata, current lunar coordinates, and cryptographic randomness.
                  </p>
                  <p>
                    This mathematically prevents predictability and ensures every botanical form is singular.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'phantom' && (
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="text-2xl">👻</span>
                  <h3 className="font-serif-heading text-2xl font-medium text-[#ab9ff2]">
                    Phantom Wallet Security
                  </h3>
                </div>
                <div className="text-xs text-white/80 space-y-3 leading-relaxed font-sans">
                  <p>
                    Aurelian Mist provides native support for Phantom Wallet, ensuring ultra-low latency, zero-knowledge signing, and immediate visual asset rendering.
                  </p>
                  <p>
                    Ensure your Phantom extension or mobile app is updated to the latest release for optimal security.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'manifesto' && (
              <div>
                <h3 className="font-serif-heading text-2xl font-medium text-[#e9c176] mb-3">
                  The Sanctuary Manifesto
                </h3>
                <div className="text-xs text-white/80 space-y-3 leading-relaxed font-sans">
                  <p className="italic font-serif text-sm text-[#e9c176]">
                    "In the digital continuum, true beauty is born from intentional surrender."
                  </p>
                  <p>
                    Aurelian Mist was established to transcend the noise of rapid asset accumulation. By offering original works to the mist, collectors participate in a meditative act of digital re-creation.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'lunar' && (
              <div>
                <h3 className="font-serif-heading text-2xl font-medium text-[#e9c176] mb-3">
                  Lunar Cycle Calibration
                </h3>
                <div className="text-xs text-white/80 space-y-3 leading-relaxed font-sans">
                  <p>
                    Current Phase: <strong className="text-[#e9c176]">Waxing Gibbous (88% Illumination)</strong>
                  </p>
                  <p>
                    During high lunar phases (Gibbous & Full Moon), forged artifacts exhibit heightened luminescence traits and golden botanical crystallization.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'botanical' && (
              <div>
                <h3 className="font-serif-heading text-2xl font-medium text-[#e9c176] mb-3">
                  Botanical Genus Classification
                </h3>
                <div className="text-xs text-white/80 space-y-3 leading-relaxed font-sans">
                  <p>
                    Artifacts are catalogued into four sacred families: <em>Aurelia Chrysalis</em>, <em>Sylva Aurelia</em>, <em>Flora Luminosa</em>, and <em>Oceanus Gold</em>.
                  </p>
                  <p>
                    Each family reflects the elemental harmony of the original works sacrificed in its forging.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'proof' && (
              <div>
                <h3 className="font-serif-heading text-2xl font-medium text-[#e9c176] mb-3">
                  Proof of Surrender
                </h3>
                <div className="text-xs text-white/80 space-y-3 leading-relaxed font-sans">
                  <p>
                    Upon metamorphosis, source artworks are consigned to verified zero-knowledge custody.
                  </p>
                  <p>
                    Cryptographic receipts are minted directly with the new botanical artifact for auditability.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-full bg-[#e9c176] text-[#2c1d00] text-xs font-semibold tracking-wider uppercase hover:bg-[#ffdca2] cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

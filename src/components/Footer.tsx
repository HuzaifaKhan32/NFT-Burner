import React, { useState } from 'react';
import { NavigationTab, ThemeMode } from '../types';
import {
  ArrowUp,
  Mail,
  CheckCircle2,
  FileText,
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
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkClass = "transition-colors flex items-center gap-1.5 text-left";
  const linkStyle = { color: 'var(--color-text-secondary)' };

  const isDark = themeMode === 'dark';

  const newsletterBg = isDark
    ? 'linear-gradient(180deg, rgba(16, 24, 19, 0.95) 0%, rgba(21, 22, 17, 0.98) 60%, rgba(27, 26, 20, 1) 100%)'
    : 'linear-gradient(180deg, rgba(243, 239, 230, 0.96) 0%, rgba(234, 229, 217, 0.98) 100%)';

  const newsletterBorder = isDark ? 'rgba(212, 165, 116, 0.18)' : 'rgba(157, 126, 90, 0.22)';
  const footerBg = isDark ? '#111713' : '#e8e2d5';
  const footerTextPrimary = isDark ? '#ffffff' : '#2a2418';
  const footerTextSecondary = isDark ? '#b8b3a8' : '#5d5547';
  const footerTextMuted = isDark ? '#8e887d' : '#8a7f71';
  const cardBg = isDark ? '#171c17' : '#ded7c8';
  const cardBorder = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(42, 36, 24, 0.1)';

  return (
    <footer
      id="section-footer"
      className="w-full relative z-10 font-sans"
    >
      {/* 1. NEWSLETTER TRANSITIONAL SURFACE (Phase 4.7) */}
      <div 
        className="w-full border-t border-b transition-colors duration-300" 
        style={{
          background: newsletterBg,
          borderColor: newsletterBorder
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] block mb-2" style={{ color: 'var(--color-accent-gold)' }}>
                STAY CONNECTED WITH THE SANCTUARY
              </span>
              <h3 className="font-serif-heading text-2xl sm:text-3xl font-medium tracking-tight mb-2" style={{ color: footerTextPrimary }}>
                Receive Artifact Dispatch Updates
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: footerTextSecondary }}>
                Be the first to learn about upcoming transformation drops, VRF synthesis parameters, and platform updates.
              </p>
            </div>

            {/* Newsletter Input */}
            <div className="w-full lg:w-auto lg:min-w-[420px]">
              {subscribed ? (
                <div className="p-4 flex items-center gap-3"
                  style={{ borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(212, 165, 116, 0.12)', border: '1px solid var(--color-border-emphasis)', color: 'var(--color-accent-gold)' }}
                >
                  <CheckCircle2 size={20} className="shrink-0" />
                  <div>
                    <h5 className="text-sm font-semibold">Subscribed</h5>
                    <p className="text-xs" style={{ color: footerTextSecondary }}>
                      We'll email you about new drops and updates.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 w-full">
                  <div className="relative flex-1">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: footerTextMuted }}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      required
                      className="w-full pl-11 pr-4 py-3 text-sm font-sans outline-none transition-colors"
                      style={{
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: isDark ? '#151c16' : '#f5f1e8',
                        border: `1px solid ${cardBorder}`,
                        color: footerTextPrimary
                      }}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary shrink-0">
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER — SOLID COLORED GROUNDING SURFACE (Phase 4.8 & 4.9) */}
      <div 
        className="w-full transition-colors duration-300"
        style={{
          backgroundColor: footerBg,
          color: footerTextSecondary
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: cardBg, border: '1px solid rgba(212, 165, 116, 0.3)', color: 'var(--color-accent-gold)' }}
                >
                  <FileText size={16} />
                </div>
                <div>
                  <span className="font-serif-heading text-xl font-medium block" style={{ color: footerTextPrimary }}>
                    Aurelian Mist
                  </span>
                  <span className="text-xs" style={{ color: footerTextMuted }}>
                    Transform NFTs into new artifacts
                  </span>
                </div>
              </div>

              <p className="text-sm leading-relaxed max-w-sm font-sans" style={{ color: footerTextSecondary }}>
                A platform for permanently burning NFTs and receiving new digital artifacts, each with verifiable on-chain provenance.
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 text-xs"
                style={{ borderRadius: 'var(--radius-sm)', backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}
              >
                <span className="w-2 h-2 rounded-full animate-status-pulse" style={{ backgroundColor: 'var(--color-success)' }} />
                <span style={{ color: footerTextSecondary }}>Phantom wallet supported</span>
              </div>
            </div>

            {/* Explore Column */}
            <div className="space-y-4">
              <h4 className="font-serif-heading text-base font-medium" style={{ color: 'var(--color-accent-gold)' }}>
                Explore
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button onClick={() => handleNavClick('burn-vault')} className="transition-colors flex items-center gap-1.5 text-left cursor-pointer hover:opacity-100" style={{ color: footerTextSecondary }}>
                    <ChevronRight size={12} style={{ color: 'var(--color-accent-gold)' }} />
                    Transformation Vault
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('gallery')} className="transition-colors flex items-center gap-1.5 text-left cursor-pointer hover:opacity-100" style={{ color: footerTextSecondary }}>
                    <ChevronRight size={12} style={{ color: 'var(--color-accent-gold)' }} />
                    Gallery
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('marketplace')} className="transition-colors flex items-center gap-1.5 text-left cursor-pointer hover:opacity-100" style={{ color: footerTextSecondary }}>
                    <ChevronRight size={12} style={{ color: 'var(--color-accent-gold)' }} />
                    Marketplace
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('provenance')} className="transition-colors flex items-center gap-1.5 text-left cursor-pointer hover:opacity-100" style={{ color: footerTextSecondary }}>
                    <ChevronRight size={12} style={{ color: 'var(--color-accent-gold)' }} />
                    Provenance
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="space-y-4">
              <h4 className="font-serif-heading text-base font-medium" style={{ color: 'var(--color-accent-gold)' }}>
                Resources
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button onClick={() => setActiveModal('vrf')} className="transition-colors flex items-center gap-1.5 text-left cursor-pointer hover:opacity-100" style={{ color: footerTextSecondary }}>
                    <ChevronRight size={12} style={{ color: 'var(--color-accent-gold)' }} />
                    How artifacts are generated
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('proof')} className="transition-colors flex items-center gap-1.5 text-left cursor-pointer hover:opacity-100" style={{ color: footerTextSecondary }}>
                    <ChevronRight size={12} style={{ color: 'var(--color-accent-gold)' }} />
                    Proof of burn
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('phantom')} className="transition-colors flex items-center gap-1.5 text-left cursor-pointer hover:opacity-100" style={{ color: footerTextSecondary }}>
                    <ChevronRight size={12} style={{ color: 'var(--color-accent-gold)' }} />
                    Wallet security
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('botanical')} className="transition-colors flex items-center gap-1.5 text-left cursor-pointer hover:opacity-100" style={{ color: footerTextSecondary }}>
                    <ChevronRight size={12} style={{ color: 'var(--color-accent-gold)' }} />
                    Artifact types
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="space-y-4">
              <h4 className="font-serif-heading text-base font-medium" style={{ color: 'var(--color-accent-gold)' }}>
                Legal
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button onClick={() => setActiveModal('terms')} className="transition-colors flex items-center gap-1.5 text-left cursor-pointer hover:opacity-100" style={{ color: footerTextSecondary }}>
                    <ChevronRight size={12} style={{ color: 'var(--color-accent-gold)' }} />
                    Terms of service
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('privacy')} className="transition-colors flex items-center gap-1.5 text-left cursor-pointer hover:opacity-100" style={{ color: footerTextSecondary }}>
                    <ChevronRight size={12} style={{ color: 'var(--color-accent-gold)' }} />
                    Privacy
                  </button>
                </li>
                <li>
                  <a
                    href="mailto:hello@aurelianmist.xyz"
                    className="transition-colors flex items-center gap-1.5 text-left hover:opacity-100"
                    style={{ color: footerTextSecondary }}
                  >
                    <ChevronRight size={12} style={{ color: 'var(--color-accent-gold)' }} />
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM BAR */}
        <div className="border-t py-8 px-6 sm:px-8 lg:px-12" style={{ borderColor: cardBorder }}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
            <p style={{ color: footerTextMuted }}>
              © 2026 Aurelian Mist. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                {/* Solscan */}
                <a
                  href="https://solscan.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:border-[#e9c176]/50"
                  style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, color: footerTextSecondary }}
                  title="View on Solscan"
                >
                  <FileText size={15} />
                </a>

                {/* X */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:border-[#e9c176]/50"
                  style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, color: footerTextSecondary }}
                  title="Follow on X"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Discord */}
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:border-[#e9c176]/50"
                  style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, color: footerTextSecondary }}
                  title="Join Discord"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" />
                  </svg>
                </a>
              </div>

              <div className="h-4 w-px" style={{ backgroundColor: cardBorder }} />

              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors text-xs font-medium cursor-pointer hover:border-[#e9c176]/50"
                style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, color: footerTextSecondary }}
                title="Back to top"
              >
                <span>Top</span>
                <ArrowUp size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. FOOTER LINK MODALS */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg surface-glass-gold p-6 sm:p-8"
            style={{ borderRadius: 'var(--radius-lg)', color: 'var(--color-text-primary)' }}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full cursor-pointer transition-colors"
              style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)' }}
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {activeModal === 'terms' && (
              <div>
                <h3 className="font-serif-heading text-2xl font-medium mb-3" style={{ color: 'var(--color-accent-gold)' }}>
                  Terms of Service
                </h3>
                <div className="text-sm space-y-3 leading-relaxed font-sans max-h-72 overflow-y-auto pr-2" style={{ color: 'var(--color-text-secondary)' }}>
                  <p>1. <strong style={{ color: 'var(--color-text-primary)' }}>Irreversibility:</strong> Burning an NFT permanently destroys it. This action cannot be undone.</p>
                  <p>2. <strong style={{ color: 'var(--color-text-primary)' }}>Provenance:</strong> Each new artifact records a verifiable link back to the burned source NFTs.</p>
                  <p>3. <strong style={{ color: 'var(--color-text-primary)' }}>Custody:</strong> Minted artifacts are delivered directly to your connected wallet with full transfer rights.</p>
                </div>
              </div>
            )}

            {activeModal === 'privacy' && (
              <div>
                <h3 className="font-serif-heading text-2xl font-medium mb-3" style={{ color: 'var(--color-accent-gold)' }}>
                  Privacy
                </h3>
                <div className="text-sm space-y-3 leading-relaxed font-sans" style={{ color: 'var(--color-text-secondary)' }}>
                  <p>We do not collect personal identification details or custodial credentials.</p>
                  <p>Transformation state is processed client-side and verified on-chain.</p>
                </div>
              </div>
            )}

            {activeModal === 'provenance' && (
              <div>
                <h3 className="font-serif-heading text-2xl font-medium mb-3" style={{ color: 'var(--color-accent-gold)' }}>
                  Provenance
                </h3>
                <div className="text-sm space-y-3 leading-relaxed font-sans" style={{ color: 'var(--color-text-secondary)' }}>
                  <p>Every artifact embeds a verifiable record of the NFTs burned to create it, including their names and token IDs.</p>
                  <p>This provides a permanent, auditable lineage for each new artifact.</p>
                </div>
              </div>
            )}

            {activeModal === 'vrf' && (
              <div>
                <h3 className="font-serif-heading text-2xl font-medium mb-3" style={{ color: 'var(--color-accent-gold)' }}>
                  How Artifacts Are Generated
                </h3>
                <div className="text-sm space-y-3 leading-relaxed font-sans" style={{ color: 'var(--color-text-secondary)' }}>
                  <p>Artifact generation uses a verifiable random function (VRF) combining source metadata with on-chain randomness.</p>
                  <p>This makes each result unpredictable and ensures every artifact is unique.</p>
                </div>
              </div>
            )}

            {activeModal === 'phantom' && (
              <div>
                <h3 className="font-serif-heading text-2xl font-medium mb-3" style={{ color: 'var(--color-phantom)' }}>
                  Wallet Security
                </h3>
                <div className="text-sm space-y-3 leading-relaxed font-sans" style={{ color: 'var(--color-text-secondary)' }}>
                  <p>Aurelian Mist supports Phantom wallet for signing and asset display.</p>
                  <p>Keep your Phantom extension or mobile app updated for the best security.</p>
                </div>
              </div>
            )}

            {activeModal === 'botanical' && (
              <div>
                <h3 className="font-serif-heading text-2xl font-medium mb-3" style={{ color: 'var(--color-accent-gold)' }}>
                  Artifact Types
                </h3>
                <div className="text-sm space-y-3 leading-relaxed font-sans" style={{ color: 'var(--color-text-secondary)' }}>
                  <p>Artifacts fall into four families: <em>Aurelia Chrysalis</em>, <em>Sylva Aurelia</em>, <em>Flora Luminosa</em>, and <em>Oceanus Gold</em>.</p>
                  <p>Each reflects the traits of the NFTs burned to create it.</p>
                </div>
              </div>
            )}

            {activeModal === 'proof' && (
              <div>
                <h3 className="font-serif-heading text-2xl font-medium mb-3" style={{ color: 'var(--color-accent-gold)' }}>
                  Proof of Burn
                </h3>
                <div className="text-sm space-y-3 leading-relaxed font-sans" style={{ color: 'var(--color-text-secondary)' }}>
                  <p>When you transform NFTs, the burn is recorded on-chain.</p>
                  <p>A cryptographic receipt is minted alongside the new artifact for auditability.</p>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t flex justify-end" style={{ borderColor: 'var(--color-border-subtle)' }}>
              <button
                onClick={() => setActiveModal(null)}
                className="btn btn-primary btn-pill"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

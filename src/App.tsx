import React, { useState, useEffect } from 'react';
import { NavigationTab, ThemeMode, NFTItem, Artifact, WalletState } from './types';
import { INITIAL_NFTS, INITIAL_ARTIFACTS, ASSET_IMAGES } from './data/mockData';
import { ENVIRONMENT_MAP, SectionId } from './config/environmentMap';
import { EnvironmentalBackground } from './components/EnvironmentalBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
// import { ProcedureSection } from './components/ProcedureSection';      // old — keep, don't delete
import HowItWorksBurnTrail from './components/HowItWorksBurnTrail'; // new
import { BurnVaultInterface } from './components/BurnVaultInterface';
import { FAQSection } from './components/FAQSection';
import { GallerySection } from './components/GallerySection';
import { MarketplaceSection } from './components/MarketplaceSection';
import { BurnRitualModal } from './components/BurnRitualModal';
import { WalletModal } from './components/WalletModal';
import { Footer } from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('burn-vault');
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');

  // Background state driven by centralized environment map
  const [activeBgUrl, setActiveBgUrl] = useState<string>(ENVIRONMENT_MAP.routes['burn-vault']);

  const [nfts, setNfts] = useState<NFTItem[]>(INITIAL_NFTS);
  const [artifacts, setArtifacts] = useState<Artifact[]>(INITIAL_ARTIFACTS);

  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: true,
    address: 'HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH',
    ethBalance: 24.85,
    aurelBalance: 1420
  });

  const [isBurnModalOpen, setIsBurnModalOpen] = useState(false);
  const [selectedForBurn, setSelectedForBurn] = useState<NFTItem[]>([]);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  // Update background when active Tab changes
  useEffect(() => {
    if (activeTab !== 'burn-vault') {
      setActiveBgUrl(ENVIRONMENT_MAP.routes[activeTab]);
    } else {
      setActiveBgUrl(ENVIRONMENT_MAP.sections['hero']);
    }
  }, [activeTab]);

  // Center-Weighted Viewport Scroll Tracker with Hysteresis
  useEffect(() => {
    if (activeTab !== 'burn-vault') return;

    const sections: { id: string; bg: string }[] = [
      { id: 'section-hero', bg: ENVIRONMENT_MAP.sections['hero'] },
      { id: 'section-procedure', bg: ENVIRONMENT_MAP.sections['procedure'] },
      { id: 'section-burn-vault', bg: ENVIRONMENT_MAP.sections['burn-vault'] },
      { id: 'section-faq', bg: ENVIRONMENT_MAP.sections['faq'] },
      { id: 'section-footer', bg: ENVIRONMENT_MAP.sections['faq'] }
    ];

    let ticking = false;
    let currentDominantId = 'section-hero';

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const vHeight = window.innerHeight;
        const centerTop = vHeight * 0.25;
        const centerBottom = vHeight * 0.75;
        const centerSpan = centerBottom - centerTop;

        let bestSection: { id: string; bg: string; ratio: number } | null = null;
        let currentSectionRatio = 0;

        sections.forEach(sec => {
          const el = document.getElementById(sec.id);
          if (!el) return;

          const rect = el.getBoundingClientRect();
          // Calculate intersection with central 50% band of viewport
          const overlapTop = Math.max(rect.top, centerTop);
          const overlapBottom = Math.min(rect.bottom, centerBottom);
          const overlap = Math.max(0, overlapBottom - overlapTop);
          const ratio = overlap / centerSpan;

          if (sec.id === currentDominantId) {
            currentSectionRatio = ratio;
          }

          if (!bestSection || ratio > bestSection.ratio) {
            bestSection = { id: sec.id, bg: sec.bg, ratio };
          }
        });

        // Hysteresis activation: switch when new section reaches ~48% central visibility,
        // or current drops below 28% and a new section is dominant.
        if (bestSection && bestSection.ratio >= 0.45) {
          if (bestSection.id !== currentDominantId) {
            currentDominantId = bestSection.id;
            setActiveBgUrl(bestSection.bg);
          }
        } else if (bestSection && currentSectionRatio < 0.28 && bestSection.ratio > currentSectionRatio) {
          if (bestSection.id !== currentDominantId) {
            currentDominantId = bestSection.id;
            setActiveBgUrl(bestSection.bg);
          }
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial evaluation on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab]);

  // Toggle selection of NFT in Vault
  const handleToggleSelectNft = (id: string) => {
    setNfts(prev => prev.map(nft => {
      if (nft.id === id) {
        return { ...nft, isSelected: !nft.isSelected };
      }
      return nft;
    }));
  };

  // Start Metamorphosis Ritual
  const handleStartBurnRitual = (selected: NFTItem[]) => {
    setSelectedForBurn(selected);
    setIsBurnModalOpen(true);
  };

  // Complete Metamorphosis Ritual & add newly forged artifact
  const handleCompleteBurn = (newArtifact: Artifact) => {
    setArtifacts(prev => [newArtifact, ...prev]);

    // Remove transformed NFTs from active vault
    const transformedIds = new Set(selectedForBurn.map(n => n.id));
    setNfts(prev => prev.filter(nft => !transformedIds.has(nft.id)));

    setIsBurnModalOpen(false);
    setActiveTab('gallery');
  };

  // Dynamically add a curated piece to the vault for testing transformations
  const handleAddTestNft = () => {
    const randomId = Math.floor(Math.random() * 900 + 100);
    const testArtworks = [
      { name: `Nocturnal Prism #${randomId}`, collection: "Aurelian Studies", img: ASSET_IMAGES.nft1, desc: "Deep chromatic gradient with ambient light reflections." },
      { name: `Geometric Dawn #${randomId}`, collection: "Architectonic Series", img: ASSET_IMAGES.nft2, desc: "Floating architectural volumes bathed in soft morning mist." },
      { name: `Kinetic Resonance #${randomId}`, collection: "Harmonic Fields", img: ASSET_IMAGES.nft3, desc: "Luminescent ribbon curves intersecting in quiet space." },
      { name: `Fluid Synthesis #${randomId}`, collection: "Chrono Guild Studies", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop", desc: "Metallic ribbons suspended in zero-gravity field." },
      { name: `Oceanic Flare #${randomId}`, collection: "Oceanic Cosmos", img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop", desc: "Marine color field illuminated by coronal flare." }
    ];
    const picked = testArtworks[Math.floor(Math.random() * testArtworks.length)];
    const newNft: NFTItem = {
      id: `nft-custom-${Date.now()}`,
      name: picked.name,
      collection: picked.collection,
      image: picked.img,
      isSupported: true,
      description: picked.desc,
      tokenId: `${randomId}`,
      isSelected: true
    };

    setNfts(prev => [newNft, ...prev]);
  };

  // Wallet Handlers (Phantom Solana)
  const handleConnectWallet = (providerName: string) => {
    setWalletState({
      isConnected: true,
      address: 'HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH',
      ethBalance: 24.85,
      aurelBalance: 2000
    });
    setIsWalletModalOpen(false);
  };

  const handleDisconnectWallet = () => {
    setWalletState({
      isConnected: false,
      address: null,
      ethBalance: 0,
      aurelBalance: 0
    });
  };

  const handleAddFaucetFunds = () => {
    setWalletState(prev => ({
      ...prev,
      ethBalance: prev.ethBalance + 2.0,
      aurelBalance: prev.aurelBalance + 500
    }));
  };

  const scrollToVault = () => {
    const el = document.getElementById('section-burn-vault');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      data-theme={themeMode === 'dark' ? 'dark' : 'light'}
      className="min-h-screen flex flex-col font-sans transition-colors duration-300 relative bg-transparent"
      style={{
        color: 'var(--color-text-primary)'
      }}
    >
      {/* 1. PERSISTENT ENVIRONMENTAL BACKGROUND SYSTEM */}
      <EnvironmentalBackground
        activeBgUrl={activeBgUrl}
        themeMode={themeMode}
      />

      {/* 2. TOP NAVBAR */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        walletState={walletState}
        onOpenWalletModal={() => setIsWalletModalOpen(true)}
      />

      {/* 3. MAIN CONTENT LAYER WITH CONTENT-ONLY ROUTE TRANSITION */}
      <main className="flex-1 w-full relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {activeTab === 'burn-vault' && (
              <div className="flex flex-col w-full">
                <HeroSection
                  themeMode={themeMode}
                  onEnterVault={scrollToVault}
                  onExploreGallery={() => setActiveTab('gallery')}
                />

                <HowItWorksBurnTrail themeMode={themeMode} />

                <BurnVaultInterface
                  nfts={nfts}
                  themeMode={themeMode}
                  walletState={walletState}
                  onToggleSelectNft={handleToggleSelectNft}
                  onStartBurnRitual={handleStartBurnRitual}
                  onAddTestNft={handleAddTestNft}
                />

                <FAQSection themeMode={themeMode} />
              </div>
            )}

            {activeTab === 'gallery' && (
              <GallerySection
                artifacts={artifacts}
                themeMode={themeMode}
              />
            )}

            {activeTab === 'marketplace' && (
              <MarketplaceSection
                artifacts={artifacts}
                themeMode={themeMode}
                walletState={walletState}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. BURN RITUAL MODAL (Preserved for Transformation Ritual) */}
      <BurnRitualModal
        isOpen={isBurnModalOpen}
        selectedNfts={selectedForBurn}
        onClose={() => setIsBurnModalOpen(false)}
        onCompleteBurn={handleCompleteBurn}
      />

      {/* 5. WEB3 WALLET MODAL */}
      <WalletModal
        isOpen={isWalletModalOpen}
        walletState={walletState}
        onClose={() => setIsWalletModalOpen(false)}
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
        onAddFaucetFunds={handleAddFaucetFunds}
      />

      {/* 6. FOOTER */}
      <Footer themeMode={themeMode} setActiveTab={setActiveTab} />
    </div>
  );
}

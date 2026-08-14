import React, { useState } from 'react';
import { NavigationTab, ThemeMode, NFTItem, Artifact, WalletState } from './types';
import { INITIAL_NFTS, INITIAL_ARTIFACTS, ASSET_IMAGES } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProcedureSection } from './components/ProcedureSection';
import { BurnVaultInterface } from './components/BurnVaultInterface';
import { FAQSection } from './components/FAQSection';
import { GallerySection } from './components/GallerySection';
import { MarketplaceSection } from './components/MarketplaceSection';
import { BurnRitualModal } from './components/BurnRitualModal';
import { WalletModal } from './components/WalletModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('burn-vault');
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');

  const [nfts, setNfts] = useState<NFTItem[]>(INITIAL_NFTS);
  const [artifacts, setArtifacts] = useState<Artifact[]>(INITIAL_ARTIFACTS);

  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: true,
    address: '0x3A92...811F',
    ethBalance: 4.85,
    aurelBalance: 1420
  });

  const [isBurnModalOpen, setIsBurnModalOpen] = useState(false);
  const [selectedForBurn, setSelectedForBurn] = useState<NFTItem[]>([]);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  // Toggle selection of NFT in Vault
  const handleToggleSelectNft = (id: string) => {
    setNfts(prev => prev.map(nft => {
      if (nft.id === id) {
        return { ...nft, isSelected: !nft.isSelected };
      }
      return nft;
    }));
  };

  // Start Framer Motion Burn Ritual
  const handleStartBurnRitual = (selected: NFTItem[]) => {
    setSelectedForBurn(selected);
    setIsBurnModalOpen(true);
  };

  // Complete Burn Ritual & add newly forged artifact
  const handleCompleteBurn = (newArtifact: Artifact) => {
    setArtifacts(prev => [newArtifact, ...prev]);

    // Remove or filter out burned NFTs from active vault
    const burnedIds = new Set(selectedForBurn.map(n => n.id));
    setNfts(prev => prev.filter(nft => !burnedIds.has(nft.id)));

    // Increment user aurel power & award bonus
    setWalletState(prev => ({
      ...prev,
      aurelBalance: prev.aurelBalance + (selectedForBurn.length * 500)
    }));

    setIsBurnModalOpen(false);
    setActiveTab('gallery');
  };

  // Dynamically mint/add test NFT for testing burn repeatedly
  const handleAddTestNft = () => {
    const randomId = Math.floor(Math.random() * 9000 + 1000);
    const testImages = [
      ASSET_IMAGES.nft1,
      ASSET_IMAGES.nft2,
      ASSET_IMAGES.nft3,
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop"
    ];
    const newNft: NFTItem = {
      id: `nft-custom-${Date.now()}`,
      name: `DORMANT APE #${randomId}`,
      collection: "Aurelian Test Vault",
      image: testImages[Math.floor(Math.random() * testImages.length)],
      tier: Math.random() > 0.5 ? "Epic" : "Rare",
      isSupported: true,
      powerValue: Math.floor(Math.random() * 500 + 300),
      description: "A newly minted test NFT ready to be sacrificed in the burn vault.",
      contractAddress: "0x" + Math.random().toString(16).slice(2, 8),
      tokenId: `${randomId}`,
      isSelected: true
    };

    setNfts(prev => [newNft, ...prev]);
  };

  // Wallet Handlers
  const handleConnectWallet = (providerName: string) => {
    setWalletState({
      isConnected: true,
      address: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`.toUpperCase(),
      ethBalance: 5.0,
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
    const el = document.getElementById('burn-vault-interface');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      themeMode === 'dark' ? 'bg-[#121212] text-[#e5e2e1]' : 'bg-[#fff8f3] text-[#1e1b16]'
    }`}>
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        walletState={walletState}
        onOpenWalletModal={() => setIsWalletModalOpen(true)}
      />

      {/* Main View Content */}
      <main className="flex-1 w-full">
        {activeTab === 'burn-vault' && (
          <div className="flex flex-col w-full">
            <HeroSection
              themeMode={themeMode}
              onEnterVault={scrollToVault}
              onExploreGallery={() => setActiveTab('gallery')}
            />

            <ProcedureSection themeMode={themeMode} />

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
      </main>

      {/* Burn Ritual Animation Modal (Framer Motion) */}
      <BurnRitualModal
        isOpen={isBurnModalOpen}
        selectedNfts={selectedForBurn}
        onClose={() => setIsBurnModalOpen(false)}
        onCompleteBurn={handleCompleteBurn}
      />

      {/* Web3 Wallet Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        walletState={walletState}
        onClose={() => setIsWalletModalOpen(false)}
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
        onAddFaucetFunds={handleAddFaucetFunds}
      />

      {/* Footer */}
      <Footer themeMode={themeMode} setActiveTab={setActiveTab} />
    </div>
  );
}

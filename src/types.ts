export type NavigationTab = 'burn-vault' | 'gallery' | 'marketplace';
export type ThemeMode = 'dark' | 'light';

export interface NFTItem {
  id: string;
  name: string;
  collection: string;
  image: string;
  tier: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  isSupported: boolean;
  powerValue: number;
  description: string;
  contractAddress: string;
  tokenId: string;
  isSelected?: boolean;
}

export interface Artifact {
  id: string;
  name: string;
  rarity: 'Botanical' | 'Ethereal' | 'Celestial' | 'Mythic';
  image: string;
  forgedAt: string;
  burnedNftCount: number;
  originalNfts: string[];
  vrfSeed: string;
  moonPhase: string;
  priceEth?: number;
  creator: string;
  story: string;
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  ethBalance: number;
  aurelBalance: number;
}

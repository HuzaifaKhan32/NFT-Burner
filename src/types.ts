export type NavigationTab = 'burn-vault' | 'gallery' | 'marketplace';
export type ThemeMode = 'dark' | 'light';

export interface NFTItem {
  id: string;
  name: string;
  collection: string;
  image: string;
  isSupported: boolean;
  description: string;
  tokenId: string;
  isSelected?: boolean;
}

export interface Artifact {
  id: string;
  name: string;
  rarity: 'Botanical' | 'Ethereal' | 'Celestial' | 'Mythic';
  image: string;
  forgedAt: string;
  transformedCount: number;
  originalNfts: string[];
  originalThumbnails?: string[];
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
  walletName?: string;
}

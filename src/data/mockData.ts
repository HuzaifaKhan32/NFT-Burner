import { NFTItem, Artifact } from '../types';

export const ASSET_IMAGES = {
  logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop",
  heroBg: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2000&auto=format&fit=crop",
  vaultBg: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop",
  faqBg: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2000&auto=format&fit=crop",
  nft1: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop",
  nft2: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
  nft3: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop",
  // Additional high quality nature/botanical artifacts generated
  artifact1: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop", // Golden ethereal fern
  artifact2: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", // Celestial sea light
  artifact3: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop", // Golden mist forest
  artifact4: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop"  // Golden crystalline bloom
};

export const INITIAL_NFTS: NFTItem[] = [
  {
    id: "nft-1",
    name: "DORMANT APE #402",
    collection: "Bored Ape Sanctuary",
    image: ASSET_IMAGES.nft1,
    tier: "Rare",
    isSupported: true,
    powerValue: 420,
    description: "Abstract swirling mist in shades of deep blue and silver with ethereal high contrast lighting.",
    contractAddress: "0xbc4...f13d",
    tokenId: "402",
    isSelected: true
  },
  {
    id: "nft-2",
    name: "NEO LAND #11",
    collection: "Desolate Plains",
    image: ASSET_IMAGES.nft2,
    tier: "Common",
    isSupported: true,
    powerValue: 180,
    description: "Geometric 3D landscape with floating metallic cubes over a desolate grey plain.",
    contractAddress: "0x8a3...9902",
    tokenId: "11",
    isSelected: false
  },
  {
    id: "nft-3",
    name: "CYBER PUNK #89",
    collection: "Neon Protocol",
    image: ASSET_IMAGES.nft3,
    tier: "Epic",
    isSupported: true,
    powerValue: 650,
    description: "Pixel art character portrait with cyberpunk neon pink and cyan hues on dark canvas.",
    contractAddress: "0xb47...38e1",
    tokenId: "89",
    isSelected: true
  },
  {
    id: "nft-4",
    name: "UNSUPPORTED ASSET",
    collection: "Legacy Contract v1",
    image: "",
    tier: "Common",
    isSupported: false,
    powerValue: 0,
    description: "Contract metadata format not compatible with VRF burn protocol.",
    contractAddress: "0x000...0000",
    tokenId: "0",
    isSelected: false
  },
  {
    id: "nft-5",
    name: "ETHEREAL CHRONO #204",
    collection: "Chrono Guild",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    tier: "Epic",
    isSupported: true,
    powerValue: 510,
    description: "Fluid metallic ribbons suspended in zero gravity time field.",
    contractAddress: "0x781...a112",
    tokenId: "204",
    isSelected: false
  },
  {
    id: "nft-6",
    name: "SOLAR WHALE #708",
    collection: "Oceanic Cosmos",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop",
    tier: "Legendary",
    isSupported: true,
    powerValue: 1200,
    description: "Deep oceanic leviathan glowing with solar flare luminescence.",
    contractAddress: "0x911...c300",
    tokenId: "708",
    isSelected: false
  }
];

export const INITIAL_ARTIFACTS: Artifact[] = [
  {
    id: "art-101",
    name: "Aurelian Fern of Quietude",
    rarity: "Celestial",
    image: ASSET_IMAGES.artifact1,
    forgedAt: "2 hours ago",
    burnedNftCount: 3,
    originalNfts: ["Dormant Ape #112", "Neo Land #88", "Cyber Punk #03"],
    vrfSeed: "0x7e81a932b109fbc883",
    moonPhase: "Waxing Gibbous (82%)",
    priceEth: 1.85,
    creator: "0x3A9...811F",
    story: "Forged during the zenith of the moon phase, this botanical structure crystallizes the dormant kinetic energy of three sacrificed tokens into a serene golden frond.",
    attributes: [
      { trait_type: "Botanical Genus", value: "Aurelia Chrysalis" },
      { trait_type: "Mist Density", value: "94.2%" },
      { trait_type: "Harmonic Tone", value: "432 Hz" },
      { trait_type: "Burn Lineage Tier", value: "Celestial" }
    ]
  },
  {
    id: "art-102",
    name: "Solitude Over Alpine Mist",
    rarity: "Mythic",
    image: ASSET_IMAGES.artifact3,
    forgedAt: "1 day ago",
    burnedNftCount: 5,
    originalNfts: ["Genesis Block #01", "Ape #402", "Cyber Punk #89", "Chrono #12", "Neo Land #04"],
    vrfSeed: "0x99a22f1802bc3321ad",
    moonPhase: "Full Moon (100%)",
    priceEth: 4.20,
    creator: "0x8F1...90AB",
    story: "A monumental transformation requiring 5 high-tier sacrifices. The landscape captures the moment digital noise dissolves into timeless alpine tranquility.",
    attributes: [
      { trait_type: "Botanical Genus", value: "Sylva Aurelia" },
      { trait_type: "Mist Density", value: "99.8%" },
      { trait_type: "Harmonic Tone", value: "528 Hz" },
      { trait_type: "Burn Lineage Tier", value: "Mythic" }
    ]
  },
  {
    id: "art-103",
    name: "Ethereal Bloom of Rebirth",
    rarity: "Ethereal",
    image: ASSET_IMAGES.artifact4,
    forgedAt: "3 days ago",
    burnedNftCount: 2,
    originalNfts: ["Dormant Ape #402", "Cyber Punk #89"],
    vrfSeed: "0x12c8849bf30100aa77",
    moonPhase: "New Moon (0%)",
    priceEth: 0.95,
    creator: "0x12B...4490",
    story: "Forged under the void of a New Moon, yielding translucent crystalline petals that resonate with soft warm light.",
    attributes: [
      { trait_type: "Botanical Genus", value: "Flora Luminosa" },
      { trait_type: "Mist Density", value: "88.0%" },
      { trait_type: "Harmonic Tone", value: "639 Hz" },
      { trait_type: "Burn Lineage Tier", value: "Ethereal" }
    ]
  },
  {
    id: "art-104",
    name: "Marine Radiance #09",
    rarity: "Botanical",
    image: ASSET_IMAGES.artifact2,
    forgedAt: "5 days ago",
    burnedNftCount: 1,
    originalNfts: ["Oceanic Blob #33"],
    vrfSeed: "0x448a01f92193eec001",
    moonPhase: "Waning Crescent (18%)",
    priceEth: 0.60,
    creator: "0x99C...1102",
    story: "Born from a single sacrificial offer, turning coastal foam into a golden luminescent relic.",
    attributes: [
      { trait_type: "Botanical Genus", value: "Oceanus Gold" },
      { trait_type: "Mist Density", value: "76.4%" },
      { trait_type: "Harmonic Tone", value: "396 Hz" },
      { trait_type: "Burn Lineage Tier", value: "Botanical" }
    ]
  }
];

export const FAQS = [
  {
    id: "faq-1",
    question: "Is the burn truly permanent?",
    answer: "Yes. When you initiate a burn, the smart contract sends your selected NFT to a null address (0x000...dEaD). It is mathematically impossible to retrieve it. This irreversible commitment is what gives the resulting Aurelian Artifact its profound intrinsic value."
  },
  {
    id: "faq-2",
    question: "How is the rarity of my new artifact determined?",
    answer: "Rarity is determined by a complex algorithmic ritual that weighs the historical metadata of the burned asset, the current phase of the moon, and a verifiable random function (VRF). While unpredictable, higher-tier burns typically yield more intricate botanical structures in the resulting artifact."
  },
  {
    id: "faq-3",
    question: "What happens to the aesthetic of the burned NFT?",
    answer: "The visual essence of your burned asset is entirely dissolved. In its place, the mist forms a completely new, unique piece of generative nature art. It is a rebirth, not a remix."
  },
  {
    id: "faq-4",
    question: "Which Web3 wallets and networks are supported?",
    answer: "Aurelian Mist supports MetaMask, Coinbase Wallet, Phantom, and WalletConnect across Ethereum Mainnet, Arbitrum, Base, and Polygon. Gas fees for the burn ritual are optimized using custom zero-knowledge verification."
  }
];

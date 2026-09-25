import { NFTItem, Artifact } from '../types';
import heroBgImg from '../assets/images/gallery.webp';
import vaultBgImg from '../assets/images/river.webp';
import faqBgImg from '../assets/images/forest.webp';
import stepsBgImg from '../assets/images/spring.webp';

export const ASSET_IMAGES = {
  logo: "/logo/phantom.png",
  heroBg: heroBgImg,
  vaultBg: vaultBgImg,
  faqBg: faqBgImg,
  stepsBg: stepsBgImg,
  nft1: "/assets/4.webp",
  nft2: "/assets/5.webp",
  nft3: "/assets/6.webp",
  nft4: "/assets/7.webp",
  nft5: "/assets/8.webp",
  artifact1: "/assets/9.webp",
  artifact2: "/assets/10.webp",
  artifact3: "/assets/4.webp",
  artifact4: "/assets/5.webp"
};

export const INITIAL_NFTS: NFTItem[] = [
  {
    id: "nft-1",
    name: "Study in Ethereal Blue",
    collection: "Aurelian Nocturne",
    image: ASSET_IMAGES.nft1,
    isSupported: true,
    description: "Swirling indigo and silver mist captured in high dynamic contrast.",
    tokenId: "402",
    isSelected: true
  },
  {
    id: "nft-2",
    name: "Spatial Geometry IV",
    collection: "Architectonic Horizons",
    image: ASSET_IMAGES.nft2,
    isSupported: true,
    description: "Abstract architectural prisms bathed in dawn ambient light.",
    tokenId: "11",
    isSelected: false
  },
  {
    id: "nft-3",
    name: "Luminescent Form #89",
    collection: "Chromatic Synthesis",
    image: ASSET_IMAGES.nft3,
    isSupported: true,
    description: "Vibrant kinetic light ribbons suspended in deep space.",
    tokenId: "89",
    isSelected: true
  },
  {
    id: "nft-5",
    name: "Temporal Orbit #204",
    collection: "Chrono Guild Studies",
    image: ASSET_IMAGES.nft4,
    isSupported: true,
    description: "Fluid metallic ribbons suspended in zero-gravity field.",
    tokenId: "204",
    isSelected: false
  },
  {
    id: "nft-6",
    name: "Solar Tide #708",
    collection: "Oceanic Cosmos",
    image: ASSET_IMAGES.nft5,
    isSupported: true,
    description: "Deep marine composition illuminated by solar coronal flare.",
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
    transformedCount: 3,
    originalNfts: ["Study in Ethereal Blue", "Spatial Geometry IV", "Luminescent Form #89"],
    originalThumbnails: [ASSET_IMAGES.nft1, ASSET_IMAGES.nft2, ASSET_IMAGES.nft3],
    vrfSeed: "VRF-7E81-A932",
    moonPhase: "Waxing Gibbous (82%)",
    priceEth: 1.85,
    creator: "Aurelian Artisan Guild",
    story: "Forged during the zenith of the lunar cycle, this botanical sculpture crystallizes the light essence of three transformed works into a serene golden frond.",
    attributes: [
      { trait_type: "Botanical Genus", value: "Aurelia Chrysalis" },
      { trait_type: "Mist Density", value: "94.2%" },
      { trait_type: "Harmonic Tone", value: "432 Hz" },
      { trait_type: "Lineage", value: "Triple Synthesis" }
    ]
  },
  {
    id: "art-102",
    name: "Solitude Over Alpine Mist",
    rarity: "Mythic",
    image: ASSET_IMAGES.artifact2,
    forgedAt: "1 day ago",
    transformedCount: 3,
    originalNfts: ["Genesis Study #01", "Study in Ethereal Blue", "Temporal Orbit #204"],
    originalThumbnails: [ASSET_IMAGES.nft1, ASSET_IMAGES.nft3, ASSET_IMAGES.nft4],
    vrfSeed: "VRF-99A2-2F18",
    moonPhase: "Full Moon (100%)",
    priceEth: 4.20,
    creator: "Master Alchemist",
    story: "A monumental transformation uniting three distinguished original studies. The composition captures the quiet moment digital geometry dissolves into timeless alpine tranquility.",
    attributes: [
      { trait_type: "Botanical Genus", value: "Sylva Aurelia" },
      { trait_type: "Mist Density", value: "99.8%" },
      { trait_type: "Harmonic Tone", value: "528 Hz" },
      { trait_type: "Lineage", value: "Triple Synthesis" }
    ]
  },
  {
    id: "art-103",
    name: "Ethereal Bloom of Rebirth",
    rarity: "Ethereal",
    image: ASSET_IMAGES.artifact3,
    forgedAt: "3 days ago",
    transformedCount: 2,
    originalNfts: ["Study in Ethereal Blue", "Luminescent Form #89"],
    originalThumbnails: [ASSET_IMAGES.nft1, ASSET_IMAGES.nft3],
    vrfSeed: "VRF-12C8-849B",
    moonPhase: "New Moon (0%)",
    priceEth: 0.95,
    creator: "Sanctuary Archivist",
    story: "Forged under the quiet of a New Moon, yielding translucent crystalline petals that resonate with warm ambient light.",
    attributes: [
      { trait_type: "Botanical Genus", value: "Flora Luminosa" },
      { trait_type: "Mist Density", value: "88.0%" },
      { trait_type: "Harmonic Tone", value: "639 Hz" },
      { trait_type: "Lineage", value: "Dual Synthesis" }
    ]
  },
  {
    id: "art-104",
    name: "Marine Radiance #09",
    rarity: "Botanical",
    image: ASSET_IMAGES.artifact4,
    forgedAt: "5 days ago",
    transformedCount: 1,
    originalNfts: ["Oceanic Blob #33"],
    originalThumbnails: [ASSET_IMAGES.nft2],
    vrfSeed: "VRF-448A-01F9",
    moonPhase: "Waning Crescent (18%)",
    priceEth: 0.60,
    creator: "Sanctuary Archivist",
    story: "Born from a single transformative offering, translating coastal foam into a golden luminescent relic.",
    attributes: [
      { trait_type: "Botanical Genus", value: "Oceanus Gold" },
      { trait_type: "Mist Density", value: "76.4%" },
      { trait_type: "Harmonic Tone", value: "396 Hz" },
      { trait_type: "Lineage", value: "Singular Synthesis" }
    ]
  }
];

export const FAQS = [
  {
    id: "faq-1",
    question: "Is the transformation permanent?",
    answer: "Yes. When you initiate metamorphosis, the selected original artworks are permanently surrendered to forge your new artifact. This irreversible commitment is the foundation of each Aurelian Artifact's provenance and rare intrinsic value."
  },
  {
    id: "faq-2",
    question: "How is the form of the resulting artifact determined?",
    answer: "Each artifact emerges through an algorithmic synthesis governed by the aesthetic qualities of the transformed pieces, the current lunar cycle, and verifiable cryptographic randomness. Every artifact is a unique generative botanical composition."
  },
  {
    id: "faq-3",
    question: "What happens to the aesthetic of the original pieces?",
    answer: "The visual essence of your selected artworks dissolves completely into particle light, reforming into a harmonious new botanical sculpture. It is an act of creation through quiet metamorphosis, not a simple composite."
  },
  {
    id: "faq-4",
    question: "Which wallet is used for the metamorphosis?",
    answer: "Aurelian Mist is natively integrated with Phantom Wallet for a streamlined, secure collector experience across digital art ecosystems."
  }
];

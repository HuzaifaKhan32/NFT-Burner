import { ASSET_IMAGES } from '../data/mockData';

export interface SceneReadabilityConfig {
  image: string;
  baseOverlay: number;
  textZone: number;
  vignette: number;
}

export const ENVIRONMENT_MAP = {
  scenes: {
    hero: {
      image: ASSET_IMAGES.heroBg,
      baseOverlay: 0.14,
      textZone: 0.28,
      vignette: 0.35
    },
    procedure: {
      image: ASSET_IMAGES.stepsBg,
      baseOverlay: 0.16,
      textZone: 0.32,
      vignette: 0.30
    },
    vault: {
      image: ASSET_IMAGES.vaultBg,
      baseOverlay: 0.22,
      textZone: 0.40,
      vignette: 0.40
    },
    faq: {
      image: ASSET_IMAGES.faqBg,
      baseOverlay: 0.20,
      textZone: 0.36,
      vignette: 0.35
    }
  },
  sections: {
    'hero': ASSET_IMAGES.heroBg,
    'procedure': ASSET_IMAGES.stepsBg,
    'burn-vault': ASSET_IMAGES.vaultBg,
    'faq': ASSET_IMAGES.faqBg
  },
  routes: {
    'burn-vault': ASSET_IMAGES.heroBg,
    'gallery': ASSET_IMAGES.heroBg,
    'marketplace': ASSET_IMAGES.faqBg
  }
} as const;

export const GET_READABILITY_CONFIG = (imageUrl: string): SceneReadabilityConfig => {
  if (imageUrl === ASSET_IMAGES.heroBg) return ENVIRONMENT_MAP.scenes.hero;
  if (imageUrl === ASSET_IMAGES.stepsBg) return ENVIRONMENT_MAP.scenes.procedure;
  if (imageUrl === ASSET_IMAGES.vaultBg) return ENVIRONMENT_MAP.scenes.vault;
  if (imageUrl === ASSET_IMAGES.faqBg) return ENVIRONMENT_MAP.scenes.faq;
  return ENVIRONMENT_MAP.scenes.hero;
};

export const GET_OVERLAY_OPACITY_FOR_IMAGE = (imageUrl: string): number => {
  return GET_READABILITY_CONFIG(imageUrl).baseOverlay;
};

export type SectionId = keyof typeof ENVIRONMENT_MAP.sections;



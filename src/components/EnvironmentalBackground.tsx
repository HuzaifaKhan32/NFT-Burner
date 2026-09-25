import React, { useEffect, useState, useRef } from 'react';
import { ThemeMode } from '../types';
import { GET_READABILITY_CONFIG } from '../config/environmentMap';

interface EnvironmentalBackgroundProps {
  activeBgUrl: string;
  themeMode: ThemeMode;
}

interface BackgroundLayer {
  url: string;
  opacity: number;
  scale: number;
}

export const EnvironmentalBackground: React.FC<EnvironmentalBackgroundProps> = ({
  activeBgUrl,
  themeMode
}) => {
  // Layer A and Layer B for dual-layer crossfading
  const [layerA, setLayerA] = useState<BackgroundLayer>({
    url: activeBgUrl,
    opacity: 1,
    scale: 1
  });

  const [layerB, setLayerB] = useState<BackgroundLayer>({
    url: activeBgUrl,
    opacity: 0,
    scale: 1.018
  });

  // Track active layer ('A' or 'B')
  const [activeLayer, setActiveLayer] = useState<'A' | 'B'>('A');

  // Track prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  useEffect(() => {
    // Skip initial mount if same URL
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const currentUrl = activeLayer === 'A' ? layerA.url : layerB.url;
    if (currentUrl === activeBgUrl) return;

    // PRELOAD NEW IMAGE FIRST (Zero black transition state)
    let isCancelled = false;
    const img = new Image();
    img.src = activeBgUrl;

    const startCrossfade = () => {
      if (isCancelled) return;

      const targetScale = prefersReducedMotion ? 1 : 1.018;

      if (activeLayer === 'A') {
        // Crossfade from A to B
        setLayerB({
          url: activeBgUrl,
          opacity: 1,
          scale: targetScale
        });

        setLayerA(prev => ({
          ...prev,
          opacity: 0,
          scale: 1
        }));

        setActiveLayer('B');
      } else {
        // Crossfade from B to A
        setLayerA({
          url: activeBgUrl,
          opacity: 1,
          scale: targetScale
        });

        setLayerB(prev => ({
          ...prev,
          opacity: 0,
          scale: 1
        }));

        setActiveLayer('A');
      }
    };

    if (img.complete) {
      startCrossfade();
    } else {
      img.onload = startCrossfade;
      img.onerror = startCrossfade; // Fallback gracefully without black frame
    }

    return () => {
      isCancelled = true;
    };
  }, [activeBgUrl, activeLayer, layerA.url, layerB.url, prefersReducedMotion]);

  // Image-aware readability configuration per active scene
  const readability = GET_READABILITY_CONFIG(activeBgUrl);
  const baseBg = themeMode === 'dark'
    ? `rgba(15, 14, 12, ${readability.baseOverlay})`
    : `rgba(245, 241, 235, ${readability.baseOverlay * 1.1})`;

  const vignetteGradient = themeMode === 'dark'
    ? `radial-gradient(ellipse at 50% 40%, rgba(15, 14, 12, ${readability.textZone * 0.35}) 0%, rgba(15, 14, 12, ${readability.vignette}) 100%)`
    : `radial-gradient(ellipse at 50% 40%, rgba(250, 247, 243, 0.15) 0%, rgba(228, 220, 208, ${readability.vignette * 0.75}) 100%)`;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      {/* Layer A */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: layerA.opacity,
          transform: `scale(${layerA.scale})`,
          transition: prefersReducedMotion
            ? 'opacity 750ms ease-in-out'
            : 'opacity 750ms ease-in-out, transform 750ms cubic-bezier(0.25, 1, 0.5, 1)',
          willChange: 'opacity, transform'
        }}
      >
        <img
          src={layerA.url}
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Layer B */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: layerB.opacity,
          transform: `scale(${layerB.scale})`,
          transition: prefersReducedMotion
            ? 'opacity 750ms ease-in-out'
            : 'opacity 750ms ease-in-out, transform 750ms cubic-bezier(0.25, 1, 0.5, 1)',
          willChange: 'opacity, transform'
        }}
      >
        <img
          src={layerB.url}
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Base Image Tonal Layer */}
      <div
        className="absolute inset-0 z-10 transition-colors duration-500"
        style={{ background: baseBg }}
      />

      {/* Image-Aware Scrim Vignette (NO particles/fog/horizontal seam) */}
      <div
        className="absolute inset-0 z-10 transition-opacity duration-700 pointer-events-none"
        style={{ background: vignetteGradient }}
      />
    </div>
  );
};



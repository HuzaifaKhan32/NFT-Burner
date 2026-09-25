import React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface BurnTrailProps {
  stepCount: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  themeMode?: "dark" | "light";
}

export default function BurnTrail({ stepCount, containerRef, themeMode = "dark" }: BurnTrailProps) {
  const shouldReduceMotion = useReducedMotion();
  const isDark = themeMode === "dark";

  const totalHeight = stepCount * 220;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.65"],
  });

  // Calculate exact Y coordinate in SVG space for the growing ember tail
  const glowY = useTransform(scrollYProgress, [0, 1], [0, totalHeight]);

  // Calculate percentage for top position of the Flame Head
  const flameTop = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 flex justify-center">
      <div className="relative h-full w-[12px]">
        <svg
          className="h-full w-full overflow-visible"
          viewBox={`0 0 12 ${totalHeight}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="emberGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c9873f" />
              <stop offset="35%" stopColor="#e8b164" />
              <stop offset="70%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d4a574" />
            </linearGradient>

            <filter id="emberGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Dormant track ahead of the flame pointer (full height) */}
          <line
            x1="6"
            y1="0"
            x2="6"
            y2={totalHeight}
            stroke={isDark ? "rgba(212, 165, 116, 0.25)" : "#d8cdb8"}
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.4"
          />

          {/* 2. Soft glowing halo tail BEHIND the flame pointer */}
          <motion.line
            x1="6"
            y1="0"
            x2="6"
            y2={shouldReduceMotion ? totalHeight : glowY}
            stroke="#e8b164"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.55"
            filter="url(#emberGlow)"
          />

          {/* 3. Crisp glowing ember core tail BEHIND the flame pointer */}
          <motion.line
            x1="6"
            y1="0"
            x2="6"
            y2={shouldReduceMotion ? totalHeight : glowY}
            stroke="url(#emberGradient)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>

        {/* 4. Flame Head sitting at the tip of the tail */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full pointer-events-none z-20"
          style={{
            top: flameTop,
            background: "radial-gradient(circle, #fff4d6 0%, #ffb35c 40%, transparent 75%)",
            filter: "blur(0.5px)",
            boxShadow: "0 0 12px #ffb35c, 0 0 24px #c9873f",
          }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.3, 1],
                  opacity: [0.85, 1, 0.85],
                }
          }
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}

import React, { useRef } from "react";
import { motion } from "framer-motion";
import BurnTrail from "./BurnTrail";
import StepCard from "./StepCard";
import { steps } from "./steps";
import { ThemeMode } from "../../types";

interface HowItWorksBurnTrailProps {
  themeMode?: ThemeMode;
}

export default function HowItWorksBurnTrail({ themeMode = "dark" }: HowItWorksBurnTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = themeMode === "dark";

  const sectionBg = isDark
    ? "linear-gradient(180deg, rgba(18, 24, 20, 0.95) 0%, rgba(24, 32, 25, 0.97) 50%, rgba(18, 24, 20, 0.95) 100%)"
    : "linear-gradient(180deg, rgba(243, 239, 230, 0.96) 0%, rgba(234, 229, 217, 0.98) 50%, rgba(243, 239, 230, 0.96) 100%)";

  const borderColor = isDark
    ? "rgba(212, 165, 116, 0.15)"
    : "rgba(157, 126, 90, 0.2)";

  return (
    <section
      id="section-procedure"
      className="relative w-full py-20 lg:py-24 px-5 lg:px-12 overflow-hidden z-10 transition-colors duration-500"
      style={{
        background: sectionBg,
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`
      }}
    >
      {/* Top & Bottom Tonal Fades */}
      <div 
        className="absolute top-0 inset-x-0 h-12 pointer-events-none z-0"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, rgba(15, 14, 12, 0.4), transparent)"
            : "linear-gradient(to bottom, rgba(250, 247, 243, 0.4), transparent)"
        }}
      />
      <div 
        className="absolute bottom-0 inset-x-0 h-12 pointer-events-none z-0"
        style={{
          background: isDark
            ? "linear-gradient(to top, rgba(15, 14, 12, 0.4), transparent)"
            : "linear-gradient(to top, rgba(250, 247, 243, 0.4), transparent)"
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <span 
            className="text-[11px] font-semibold uppercase tracking-[0.2em] block mb-2"
            style={{ color: "var(--color-accent-gold, #c9873f)" }}
          >
            THE TRANSFORMATION PROCESS
          </span>
          <h2 
            className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-medium mb-3"
            style={{ color: isDark ? "#f4f1ed" : "#2a2420" }}
          >
            How It Works
          </h2>
          <p 
            className="text-base sm:text-lg max-w-2xl mx-auto font-sans"
            style={{ color: isDark ? "#b8b0a6" : "#6b6255" }}
          >
            A straightforward process for transforming your NFTs into new artifacts.
          </p>
        </motion.div>

        {/* Steps Container — Centered vertical layout */}
        <div ref={containerRef} className="relative mx-auto max-w-md">
          {/* Animated SVG Ember Trail */}
          <BurnTrail stepCount={steps.length} containerRef={containerRef} themeMode={themeMode} />

          {/* Vertical Centered Step Cards */}
          <div className="relative flex flex-col gap-16 sm:gap-20 items-center">
            {steps.map((step, index) => (
              <StepCard
                key={step.id}
                step={step}
                index={index}
                themeMode={themeMode}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

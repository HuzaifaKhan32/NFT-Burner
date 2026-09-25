import React from "react";
import { motion } from "framer-motion";
import { StepItem } from "./steps";
import { ThemeMode } from "../../types";

interface StepCardProps {
  step: StepItem;
  index: number;
  themeMode?: ThemeMode;
}

export default function StepCard({ step, index, themeMode = "dark" }: StepCardProps) {
  const Icon = step.icon;
  const stepNumber = String(index + 1).padStart(2, "0");
  const isDark = themeMode === "dark";

  return (
    <motion.div
      initial={{ opacity: 0.4, y: 16, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative flex flex-col items-center w-full max-w-sm mx-auto z-10"
    >
      {/* Hanging Nail Head visual */}
      <div 
        className="w-2.5 h-2.5 rounded-full mb-1 z-20 transition-all duration-500 shadow-sm border"
        style={{
          backgroundColor: isDark ? "#2a2418" : "#e0d5c1",
          borderColor: isDark ? "#9d7e5a" : "#c9873f",
          boxShadow: step.highlight ? "0 0 10px rgba(212, 165, 116, 0.4)" : "none"
        }}
      />

      {/* Hanging Frame Container */}
      <div className="relative w-full">
        {/* Hanging-nail notch on top edge */}
        <div 
          className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 z-20 transition-colors duration-500 border-t border-l"
          style={{
            backgroundColor: isDark ? "#1f1c18" : "#f7f1e6",
            borderColor: isDark ? "rgba(212, 165, 116, 0.3)" : "#d8cdb8"
          }}
        />

        {/* Outer Frame */}
        <div
          className="relative w-full rounded-xl border p-1 shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-500 group-hover:shadow-[0_8px_24px_rgba(201,135,63,0.18)]"
          style={{
            backgroundColor: isDark ? "#1f1c18" : "#f7f1e6",
            borderColor: isDark ? "rgba(212, 165, 116, 0.25)" : "#d8cdb8",
          }}
        >
          {/* Inner Placard Frame */}
          <div
            className="relative rounded-lg border p-6 flex flex-col items-center text-center transition-all duration-500"
            style={{
              backgroundColor: isDark ? "#181512" : "#fbf8f2",
              borderColor: isDark ? "rgba(212, 165, 116, 0.15)" : "#e8dcc4",
            }}
          >
            {/* Step Index Badge (Top Right) */}
            <span
              className="absolute top-3 right-3 text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-full border transition-colors duration-500"
              style={{
                color: isDark ? "#9d7e5a" : "#a89a7c",
                borderColor: isDark ? "rgba(212, 165, 116, 0.2)" : "#e8dcc4",
                backgroundColor: isDark ? "rgba(212, 165, 116, 0.05)" : "rgba(247, 241, 230, 0.5)",
              }}
            >
              {stepNumber}
            </span>

            {/* Icon Container */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110"
              style={{
                backgroundColor: step.id === 'connect'
                  ? "#ffffff"
                  : step.highlight
                    ? (isDark ? "rgba(212, 165, 116, 0.18)" : "rgba(201, 135, 63, 0.12)")
                    : (isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(232, 220, 196, 0.3)"),
                border: step.id === 'connect'
                  ? "2px solid #ab9ff2"
                  : step.highlight
                    ? "2px solid #c9873f"
                    : "1px solid " + (isDark ? "rgba(212, 165, 116, 0.2)" : "#d8cdb8"),
                boxShadow: step.id === 'connect'
                  ? "0 4px 14px rgba(171, 159, 242, 0.3)"
                  : step.highlight
                    ? "0 0 20px rgba(201, 135, 63, 0.25)"
                    : "none"
              }}
            >
              {step.id === 'connect' ? (
                <img src="/logo/phantom.png" alt="Phantom Wallet" className="w-7 h-7 object-contain" />
              ) : (
                <div 
                  className="transition-all duration-500 group-hover:scale-105 flex items-center justify-center" 
                  style={{ color: isDark ? "#d4a574" : "#c9873f" }}
                >
                  <Icon size={26} />
                </div>
              )}
            </div>

            {/* Title */}
            <h3
              className="font-serif text-xl font-semibold tracking-wide mb-1.5 transition-colors duration-500"
              style={{
                color: isDark ? "#f4f1ed" : "#2a2420",
              }}
            >
              {step.title}
            </h3>

            {/* Description / Copy */}
            <p
              className="text-sm font-sans max-w-[240px] leading-relaxed transition-colors duration-500"
              style={{
                color: isDark ? "#b8b0a6" : "#6b6255",
              }}
            >
              {step.copy}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

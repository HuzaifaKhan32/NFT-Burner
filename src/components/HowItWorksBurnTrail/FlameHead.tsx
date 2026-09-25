import React from "react";
import { motion, useTransform, useReducedMotion, MotionValue } from "framer-motion";

interface FlameHeadProps {
  pathData: string;
  progress: MotionValue<number>;
}

export default function FlameHead({ pathData, progress }: FlameHeadProps) {
  const shouldReduceMotion = useReducedMotion();
  const offsetDistance = useTransform(progress, (v) => `${v * 100}%`);

  if (!pathData) return null;

  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0 h-3.5 w-3.5 rounded-full z-20"
      style={{
        offsetPath: `path("${pathData}")`,
        offsetDistance,
        offsetRotate: "0deg",
        background: "radial-gradient(circle, #fff4d6 0%, #ffb35c 40%, transparent 75%)",
        filter: "blur(1.5px)",
        boxShadow: "0 0 12px #ffb35c, 0 0 20px #c9873f",
      }}
      animate={
        shouldReduceMotion
          ? {}
          : {
              scale: [1, 1.25, 1],
              opacity: [0.85, 1, 0.85],
            }
      }
      transition={{
        duration: 1.4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

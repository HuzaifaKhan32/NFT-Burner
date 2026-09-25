import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Flame, TrendingDown } from 'lucide-react';
import { ThemeMode } from '../types';

interface BurnCounterProps {
  totalBurned: number;
  remainingSupply: number;
  themeMode: ThemeMode;
  animationDuration?: number;
}

export const BurnCounter: React.FC<BurnCounterProps> = ({
  totalBurned,
  remainingSupply,
  themeMode,
  animationDuration = 2000
}) => {
  const [displayBurned, setDisplayBurned] = useState(0);
  const [displayRemaining, setDisplayRemaining] = useState(0);

  useEffect(() => {
    // Animate count-up for both numbers
    const steps = 60;
    const burnedIncrement = totalBurned / steps;
    const remainingIncrement = remainingSupply / steps;
    const interval = animationDuration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;

      if (currentStep >= steps) {
        setDisplayBurned(totalBurned);
        setDisplayRemaining(remainingSupply);
        clearInterval(timer);
      } else {
        setDisplayBurned(Math.floor(burnedIncrement * currentStep));
        setDisplayRemaining(Math.floor(remainingIncrement * currentStep));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [totalBurned, remainingSupply, animationDuration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
    >
      {/* Total Burned Counter */}
      <motion.div
        whileHover={{ y: -2 }}
        className="surface-solid p-6 transition-all duration-300 overflow-hidden card"
        style={{
          borderRadius: 'var(--radius-md)',
          borderColor: 'rgba(184, 93, 93, 0.2)'
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Flame
                size={18}
                style={{ color: 'var(--color-danger)' }}
              />
              <span className="text-xs font-bold tracking-wider uppercase"
                style={{ color: 'var(--color-danger)' }}
              >
                Total Burned
              </span>
            </div>

            <motion.div
              key={displayBurned}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              className="font-serif-heading text-4xl sm:text-5xl font-bold tracking-tight"
              style={{ color: 'var(--color-danger)' }}
            >
              {displayBurned.toLocaleString()}
            </motion.div>

            <p className="text-xs mt-1.5" style={{ color: 'var(--color-text-tertiary)' }}>
              Permanently removed
            </p>
          </div>
        </div>
      </motion.div>

      {/* Remaining Supply Counter */}
      <motion.div
        whileHover={{ y: -2 }}
        className="surface-solid p-6 transition-all duration-300 overflow-hidden card"
        style={{
          borderRadius: 'var(--radius-md)',
          borderColor: 'rgba(92, 122, 89, 0.2)'
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown
                size={18}
                style={{ color: 'var(--color-success)' }}
              />
              <span className="text-xs font-bold tracking-wider uppercase"
                style={{ color: 'var(--color-success)' }}
              >
                Remaining Supply
              </span>
            </div>

            <motion.div
              key={displayRemaining}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              className="font-serif-heading text-4xl sm:text-5xl font-bold tracking-tight"
              style={{ color: 'var(--color-success)' }}
            >
              {displayRemaining.toLocaleString()}
            </motion.div>

            <p className="text-xs mt-1.5" style={{ color: 'var(--color-text-tertiary)' }}>
              Available to transform
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

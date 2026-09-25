import React, { useState } from 'react';
import { WalletState } from '../types';
import { X, CheckCircle2, Copy, LogOut, Coins, ExternalLink, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WalletModalProps {
  isOpen: boolean;
  walletState: WalletState;
  onClose: () => void;
  onConnectWallet: (providerName: string) => void;
  onDisconnectWallet: () => void;
  onAddFaucetFunds: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  walletState,
  onClose,
  onConnectWallet,
  onDisconnectWallet,
  onAddFaucetFunds
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (walletState.address) {
      navigator.clipboard.writeText(walletState.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md p-6 sm:p-8 rounded-2xl sm:rounded-3xl border shadow-2xl overflow-hidden transition-colors duration-200 modal-wallet-card"
            style={{
              borderColor: 'var(--color-border-emphasis)',
              color: 'var(--color-text-primary)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)'
            }}
          >
            {/* Background subtle glow effect */}
            <div 
              className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20"
              style={{ backgroundColor: 'var(--color-phantom)' }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full transition-all cursor-pointer hover:scale-105 active:scale-95 z-10"
              style={{ 
                backgroundColor: 'var(--color-bg-tertiary)', 
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-border-subtle)'
              }}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-6">
              {/* White background container for Phantom logo */}
              <div 
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center p-2.5 shadow-md border border-stone-200 shrink-0 ring-4 ring-[#ab9ff2]/15"
                style={{ backgroundColor: '#ffffff' }}
              >
                <img src="/logo/phantom.png" alt="Phantom Wallet" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-serif-heading text-xl sm:text-2xl font-semibold tracking-tight">
                  Phantom Wallet
                </h3>
                <p className="text-xs sm:text-sm font-medium mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                  {walletState.isConnected ? 'Connected & Active' : 'Connect to manage collection'}
                </p>
              </div>
            </div>

            {walletState.isConnected ? (
              <div className="space-y-4">
                {/* Account details card */}
                <div 
                  className="p-4 sm:p-5 space-y-3.5 rounded-xl sm:rounded-2xl border transition-colors"
                  style={{ 
                    backgroundColor: 'var(--color-bg-tertiary)', 
                    borderColor: 'var(--color-border-subtle)' 
                  }}
                >
                  <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
                    <span>Status</span>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <CheckCircle2 size={13} className="animate-pulse" /> Connected
                    </span>
                  </div>

                  {/* Address block */}
                  <div 
                    className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl border transition-all"
                    style={{ 
                      backgroundColor: 'var(--color-bg-primary)', 
                      borderColor: 'var(--color-border-subtle)' 
                    }}
                  >
                    <div className="min-w-0 pr-2">
                      <span className="text-[10px] sm:text-xs block font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
                        Wallet Address
                      </span>
                      <span className="font-mono text-xs sm:text-sm font-semibold truncate block mt-0.5" style={{ color: 'var(--color-accent-gold)' }}>
                        {walletState.address}
                      </span>
                    </div>
                    <button
                      onClick={handleCopy}
                      className="p-2 sm:p-2.5 rounded-lg transition-all cursor-pointer shrink-0 hover:scale-105 active:scale-95"
                      style={{ 
                        backgroundColor: 'var(--color-bg-tertiary)', 
                        color: copied ? 'var(--color-success)' : 'var(--color-text-secondary)',
                        border: '1px solid var(--color-border-subtle)'
                      }}
                      title="Copy address"
                    >
                      {copied ? <Check size={15} /> : <Copy size={15} />}
                    </button>
                  </div>

                  {/* Balance block */}
                  <div 
                    className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl border"
                    style={{ 
                      backgroundColor: 'var(--color-bg-primary)', 
                      borderColor: 'var(--color-border-subtle)' 
                    }}
                  >
                    <div>
                      <span className="text-[10px] sm:text-xs block font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
                        Solana Balance
                      </span>
                      <span className="text-lg sm:text-xl font-bold mt-0.5 block tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                        {walletState.ethBalance.toFixed(2)} <span className="text-xs sm:text-sm font-medium" style={{ color: 'var(--color-accent-gold)' }}>SOL</span>
                      </span>
                    </div>

                    <button
                      onClick={onAddFaucetFunds}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer hover:scale-105 active:scale-95"
                      style={{
                        backgroundColor: 'rgba(212, 165, 116, 0.15)',
                        color: 'var(--color-accent-gold)',
                        border: '1px solid var(--color-border-emphasis)'
                      }}
                    >
                      <Coins size={13} />
                      + Add SOL
                    </button>
                  </div>
                </div>

                {/* Disconnect button */}
                <button
                  onClick={onDisconnectWallet}
                  className="w-full py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 group"
                  style={{
                    backgroundColor: 'var(--color-bg-tertiary)',
                    borderColor: 'var(--color-border-subtle)',
                    color: 'var(--color-text-secondary)'
                  }}
                >
                  <LogOut size={16} className="transition-transform group-hover:-translate-x-0.5" />
                  Disconnect Wallet
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  Connect your Solana Phantom wallet to inspect your collection, burn non-fungible artifacts into dust, and earn rewards.
                </p>

                {/* Connect Phantom Button */}
                <button
                  onClick={() => onConnectWallet('Phantom')}
                  className="w-full p-4 rounded-2xl flex items-center justify-between transition-all cursor-pointer border hover:scale-[1.02] active:scale-[0.98] group shadow-md"
                  style={{
                    backgroundColor: 'var(--color-bg-tertiary)',
                    borderColor: 'rgba(171, 159, 242, 0.4)',
                    color: 'var(--color-text-primary)'
                  }}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Phantom icon with white background */}
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center p-1.5 shadow-sm border border-stone-200 ring-2 ring-[#ab9ff2]/20 shrink-0"
                      style={{ backgroundColor: '#ffffff' }}
                    >
                      <img src="/logo/phantom.png" alt="Phantom Wallet" className="w-full h-full object-contain" />
                    </div>
                    <div className="text-left">
                      <span className="text-sm sm:text-base font-bold block leading-tight">
                        Phantom Wallet
                      </span>
                      <span className="text-[11px] font-medium" style={{ color: 'var(--color-phantom)' }}>
                        Detected / Available
                      </span>
                    </div>
                  </div>

                  <div 
                    className="px-3 py-1 rounded-full text-xs font-semibold transition-colors flex items-center gap-1 group-hover:bg-[#ab9ff2] group-hover:text-black"
                    style={{
                      backgroundColor: 'rgba(171, 159, 242, 0.15)',
                      color: 'var(--color-phantom)'
                    }}
                  >
                    Connect
                    <ExternalLink size={12} className="opacity-70 group-hover:opacity-100" />
                  </div>
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


import React from 'react';
import { WalletState } from '../types';
import { soundFX } from '../utils/audio';
import { X, CheckCircle2, Copy, LogOut } from 'lucide-react';

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md glass-sharp-gold rounded-3xl p-6 sm:p-8 text-white overflow-hidden shadow-2xl border border-[#e9c176]/40">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#ab9ff2]/20 border border-[#ab9ff2]/40 flex items-center justify-center text-2xl shadow-inner">
            👻
          </div>
          <div>
            <h3 className="font-serif-heading text-2xl font-semibold">
              Phantom Wallet
            </h3>
            <p className="text-xs text-white/60">
              {walletState.isConnected ? 'Connected Collector Account' : 'Connect Phantom to access your collection'}
            </p>
          </div>
        </div>

        {walletState.isConnected ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex justify-between items-center text-xs text-white/60">
                <span>Network Status</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 size={13} /> Phantom Connected
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10">
                <div>
                  <span className="text-[10px] text-white/40 block uppercase tracking-wider">Account</span>
                  <span className="font-mono text-xs text-[#e9c176] font-semibold">
                    {walletState.address}
                  </span>
                </div>
                <button
                  onClick={() => {
                    soundFX.playClick();
                    if (walletState.address) navigator.clipboard.writeText(walletState.address);
                  }}
                  className="p-2 text-white/60 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  title="Copy address"
                >
                  <Copy size={14} />
                </button>
              </div>

              <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-[10px] text-white/50 block font-semibold uppercase tracking-wider">
                  Vault Balance
                </span>
                <span className="text-base font-bold text-white mt-0.5 block">
                  {walletState.ethBalance.toFixed(2)} SOL
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  soundFX.playClick();
                  onDisconnectWallet();
                }}
                className="w-full py-3 rounded-full bg-white/10 border border-white/20 text-white/80 hover:text-white text-xs font-semibold tracking-wider uppercase hover:bg-white/20 transition-all flex items-center justify-center gap-1.5"
              >
                <LogOut size={14} /> Disconnect Phantom
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-white/70 leading-relaxed font-sans">
              Connect your Phantom wallet to view your curated collection, initiate artistic transformations, and collect newly forged artifacts.
            </p>

            <button
              onClick={() => {
                soundFX.playClick();
                onConnectWallet('Phantom');
              }}
              className="w-full p-4 rounded-2xl bg-[#ab9ff2]/20 border border-[#ab9ff2]/50 hover:bg-[#ab9ff2]/30 transition-all flex items-center justify-center gap-3 text-white font-medium shadow-lg hover:scale-[1.01] group cursor-pointer"
            >
              <span className="text-xl">👻</span>
              <span className="text-xs font-semibold tracking-widest uppercase text-white group-hover:text-[#ab9ff2] transition-colors">
                Connect Phantom Wallet
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

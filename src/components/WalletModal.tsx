import React from 'react';
import { WalletState } from '../types';
import { soundFX } from '../utils/audio';
import { X, Wallet, CheckCircle2, Copy, LogOut, PlusCircle } from 'lucide-react';

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

  const providers = [
    { name: 'MetaMask', icon: '🦊', desc: 'Connect using browser extension' },
    { name: 'Phantom', icon: '👻', desc: 'Solana & EVM multi-chain wallet' },
    { name: 'Coinbase Wallet', icon: '🟦', desc: 'Self-custody mobile & web wallet' },
    { name: 'WalletConnect', icon: '🌐', desc: 'Scan QR code with your mobile app' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md glass-sharp-gold rounded-3xl p-6 sm:p-8 text-white overflow-hidden shadow-2xl border border-[#e9c176]/40">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#e9c176]/20 flex items-center justify-center text-[#e9c176]">
            <Wallet size={20} />
          </div>
          <div>
            <h3 className="font-serif-heading text-2xl font-semibold">
              Web3 Vault Access
            </h3>
            <p className="text-xs text-white/60">
              {walletState.isConnected ? 'Connected Web3 Account' : 'Choose provider to link your vault'}
            </p>
          </div>
        </div>

        {walletState.isConnected ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex justify-between items-center text-xs text-white/60">
                <span>Status</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 size={12} /> Linked & Verified
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/10">
                <span className="font-mono text-xs text-[#e9c176] font-bold">
                  {walletState.address}
                </span>
                <button
                  onClick={() => {
                    soundFX.playClick();
                    if (walletState.address) navigator.clipboard.writeText(walletState.address);
                    alert('Wallet address copied to clipboard!');
                  }}
                  className="p-1 text-white/60 hover:text-white"
                  title="Copy address"
                >
                  <Copy size={14} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-[10px] text-white/50 block font-semibold uppercase">
                    ETH Balance
                  </span>
                  <span className="text-sm font-bold text-white">
                    {walletState.ethBalance.toFixed(2)} ETH
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-[10px] text-white/50 block font-semibold uppercase">
                    AUREL Power
                  </span>
                  <span className="text-sm font-bold text-[#e9c176]">
                    {walletState.aurelBalance} AUREL
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  soundFX.playClick();
                  onAddFaucetFunds();
                }}
                className="flex-1 py-3 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-wider uppercase hover:bg-white/20 transition-all flex items-center justify-center gap-1.5"
              >
                <PlusCircle size={14} /> Faucet (+2 ETH)
              </button>

              <button
                onClick={() => {
                  soundFX.playClick();
                  onDisconnectWallet();
                }}
                className="flex-1 py-3 rounded-full bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-bold tracking-wider uppercase hover:bg-red-900/40 transition-all flex items-center justify-center gap-1.5"
              >
                <LogOut size={14} /> Disconnect
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {providers.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundFX.playClick();
                  onConnectWallet(p.name);
                }}
                className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#e9c176]/50 hover:bg-white/10 transition-all flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-[#e9c176] transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-[10px] text-white/50">{p.desc}</p>
                  </div>
                </div>
                <span className="text-xs text-[#e9c176] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Connect →
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

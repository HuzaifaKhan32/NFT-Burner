import { PiWalletBold, PiScanBold, PiHandTapBold, PiFireBold, PiDiamondsFourBold } from "react-icons/pi";
import { IconType } from "react-icons";

export interface StepItem {
  id: string;
  icon: IconType;
  title: string;
  copy: string;
  highlight?: boolean;
}

export const steps: StepItem[] = [
  { id: "connect",   icon: PiWalletBold,       title: "Connect",   copy: "Link your Solana wallet to access your collection." },
  { id: "detect",    icon: PiScanBold,         title: "Detect",    copy: "Scan for eligible NFTs in your wallet." },
  { id: "select",    icon: PiHandTapBold,      title: "Select",    copy: "Choose which NFTs to transform." },
  { id: "transform", icon: PiFireBold,         title: "Transform", copy: "Permanently burn selected NFTs.", highlight: true },
  { id: "receive",   icon: PiDiamondsFourBold, title: "Receive",   copy: "Collect your new artifact." },
];

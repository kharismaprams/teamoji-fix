import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi";
import { connectors } from "./wagmi-config";
import { chains } from "./chains"; // ⬅️ Import dari chains.ts

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!;
if (!projectId) throw new Error("Missing WalletConnect project ID");

const metadata = {
  name: "TEAMOJI",
  description: "Mint and manage your favorite emoji NFTs on Tea Sepolia Testnet",
  url: "https://teamoji.art",
  icons: ["https://teamoji.art/ui/Teamoji Banner.png"],
};

export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  connectors,
  metadata,
});

export const web3Modal = createWeb3Modal({
  wagmiConfig,
  projectId,
  themeMode: "dark",
  themeVariables: {
    "--w3m-z-index": 1000,
  },
});

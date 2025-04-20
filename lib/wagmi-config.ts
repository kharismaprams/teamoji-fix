import { walletConnect, injected } from "@wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!;
if (!projectId) throw new Error("Missing WalletConnect project ID");

// ⬅️ Gak perlu defineChain di sini, cukup connectors aja
export const connectors = [
  walletConnect({
    projectId,
    metadata: {
      name: "TEAMOJI",
      description: "Mint and manage your favorite emoji NFTs on Tea Sepolia Testnet",
      url: "https://teamoji.art",
      icons: ["https://teamoji.art/ui/Teamoji Banner.png"],
    },
  }),
  injected(),
];

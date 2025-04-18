import { http, createConfig } from "wagmi";
import { defineChain } from "viem";

const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID);
const rpcUrl = process.env.NEXT_PUBLIC_ALCHEMY_RPC;
const chainName = process.env.NEXT_PUBLIC_CHAIN_NAME;
const currencySymbol = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL;
const blockExplorer = process.env.NEXT_PUBLIC_BLOCK_EXPLORER;

if (!chainId || !rpcUrl || !chainName || !currencySymbol || !blockExplorer) {
  throw new Error("Missing required environment variables in .env.local");
}

export const teaSepolia = defineChain({
  id: chainId,
  name: chainName,
  network: "tea-sepolia",
  nativeCurrency: {
    name: currencySymbol,
    symbol: currencySymbol,
    decimals: 18,
  },
  rpcUrls: {
    default: { http: [rpcUrl] },
    public: { http: [rpcUrl, "https://rpc.teasepolia.com"] },
  },
  blockExplorers: {
    default: {
      name: "Tea Sepolia Explorer",
      url: blockExplorer,
    },
  },
  testnet: true,
});

export const config = createConfig({
  chains: [teaSepolia],
  transports: {
    [teaSepolia.id]: http(rpcUrl, {
      timeout: 10000,
      retryCount: 3,
    }),
  },
});
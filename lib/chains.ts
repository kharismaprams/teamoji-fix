import { Chain } from "viem";

export const teaSepolia: Chain = {
  id: 10218,
  name: "Tea Sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "TEA",
    symbol: "TEA",
  },
  rpcUrls: {
    default: { http: ["https://tea-sepolia.g.alchemy.com/v2/iI8XLrcAWZOFDKOPh7EwSvru4tXVSsMW"] },
    public: { http: ["https://tea-sepolia.g.alchemy.com/public"] },
  },
  blockExplorers: {
    default: { name: "TeaSepoliaExplorer", url: "https://sepolia.tea.xyz" },
  },
  testnet: true,
};

// ⬅️ Tambahin ini ya!
export const chains = [teaSepolia] as const;

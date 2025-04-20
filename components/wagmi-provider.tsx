"use client";import { WagmiProvider } from "wagmi";
import { wagmiConfig, web3Modal } from "@/lib/web3modal-config"; // Impor web3Modal
import { ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";const queryClient = new QueryClient();export default function WagmiWrapper({ children }: { children: ReactNode }) {
  // Pastikan web3Modal diinisialisasi sekali di sisi client
  useEffect(() => {
    console.log("Initializing Web3Modal..."); // Debug log
    if (web3Modal) {
      console.log("Web3Modal initialized successfully");
    }
  }, []);  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

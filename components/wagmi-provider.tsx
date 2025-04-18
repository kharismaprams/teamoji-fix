"use client";

import { WagmiProvider } from "wagmi";
import { config } from "@/lib/wagmi-config";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

// Custom theme buat match Tailwind
const customTheme = {
  colors: {
    accentColor: "#3b82f6", // Tailwind primary (blue-500)
    accentColorForeground: "#ffffff",
    actionButtonBorder: "#e5e7eb", // Tailwind gray-200
    actionButtonBorderMobile: "#e5e7eb",
    actionButtonSecondaryBackground: "#f3f4f6", // Tailwind gray-100
    closeButton: "#6b7280", // Tailwind gray-500
    closeButtonBackground: "#f3f4f6",
    connectButtonBackground: "#3b82f6",
    connectButtonBackgroundError: "#ef4444", // Tailwind red-500
    connectButtonInnerBackground: "#2563eb", // Tailwind blue-600
    connectButtonText: "#ffffff",
    connectButtonTextError: "#ffffff",
    connectionIndicator: "#22c55e", // Tailwind green-500
    error: "#ef4444",
    generalBorder: "#e5e7eb",
    menuItemBackground: "#f3f4f6",
    modalBackground: "#ffffff",
    modalBorder: "#e5e7eb",
    modalText: "#1f2937", // Tailwind gray-800
    modalTextDim: "#6b7280",
    modalTextSecondary: "#4b5563", // Tailwind gray-600
    profileAction: "#f3f4f6",
    profileActionHover: "#e5e7eb",
    profileForeground: "#1f2937",
    selectedOptionBorder: "#3b82f6",
    standby: "#facc15", // Tailwind yellow-400
  },
  radii: {
    actionButton: "8px",
    connectButton: "8px",
    menuButton: "8px",
    modal: "12px",
    modalMobile: "12px",
  },
};

const queryClient = new QueryClient();

export default function WagmiWrapper({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={customTheme}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
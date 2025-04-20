import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import WagmiWrapper from "@/components/wagmi-provider";const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });export const metadata: Metadata = {
  metadataBase: new URL("https://teamoji.art"),
  title: "TEAMOJI - Emoji NFT Collectibles",
  description: "Mint and manage your favorite emoji NFTs on Tea Sepolia Testnet",
  icons: {
    icon: "/ui/favicon.ico",
  },
  openGraph: {
    title: "TEAMOJI",
    description: "Collect unique emoji NFTs on Tea Sepolia Testnet",
    images: ["/ui/Teamoji Banner.png"],
    url: "https://teamoji.art",
    siteName: "TEAMOJI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TEAMOJI",
    description: "Collect unique emoji NFTs on Tea Sepolia Testnet",
    images: ["/ui/Teamoji Banner.png"],
    creator: "@KharismaPramS",
  },
};export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(poppins.className, "bg-background text-white")}>
        <WagmiWrapper>
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />
        </WagmiWrapper>
      </body>
    </html>
  );
}

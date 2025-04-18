import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-navy-900 to-navy-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Image src="/ui/logo.svg" alt="TEAMOJI Logo" width={80} height={32} className="mb-4 animate-glow" />
            <p className="text-sm text-muted-foreground text-shadow-neon">
              TEAMOJI: Mint and collect emoji NFTs on Tea Sepolia Testnet. Join the community! 🎉
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 text-shadow-neon">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/mint" className="text-sm text-muted-foreground hover:text-yellow-400 hover:underline transition-all duration-300 text-shadow-neon">
                  Mint NFTs
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-sm text-muted-foreground hover:text-yellow-400 hover:underline transition-all duration-300 text-shadow-neon">
                  Your Collection
                </Link>
              </li>
              <li>
                <Link href="#faqs" className="text-sm text-muted-foreground hover:text-yellow-400 hover:underline transition-all duration-300 text-shadow-neon">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 text-shadow-neon">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://tea.xyz" className="text-sm text-muted-foreground hover:text-yellow-400 hover:underline transition-all duration-300 text-shadow-neon">
                  Tea Protocol
                </a>
              </li>
              <li>
                <a href="https://x.com/teamoji" className="text-sm text-muted-foreground hover:text-yellow-400 hover:underline transition-all duration-300 text-shadow-neon">
                  Follow on X
                </a>
              </li>
              <li>
                <a href="#support" className="text-sm text-muted-foreground hover:text-yellow-400 hover:underline transition-all duration-300 text-shadow-neon">
                  Get Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-muted-foreground">
          <p className="text-sm text-shadow-neon">© TEAMOJI Association. 2025. Created by Diode Labs. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="#terms" className="text-sm text-muted-foreground hover:text-yellow-400 hover:underline transition-all duration-300 text-shadow-neon">
              📜 Terms of Use
            </Link>
            <Link href="#privacy" className="text-sm text-muted-foreground hover:text-yellow-400 hover:underline transition-all duration-300 text-shadow-neon">
              🔒 Privacy Policy
            </Link>
            <Link href="#sitemap" className="text-sm text-muted-foreground hover:text-yellow-400 hover:underline transition-all duration-300 text-shadow-neon">
              🗺️ Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
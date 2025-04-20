'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About'; // Import About
import HowItWorks from '@/components/sections/HowItWorks';
import FAQs from '@/components/sections/FAQs';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Home() {
  useEffect(() => {
    toast.success('Welcome to TEAMOJI! 🎉 Mint your favorite emoji NFTs now!');
  }, []);

  const [isFooterOpen, setIsFooterOpen] = useState(false);

  const toggleFooter = () => {
    setIsFooterOpen(!isFooterOpen);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Intro Section (Pakai Komponen About) */}
      <About />

      {/* Project Details Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-poppins mb-6 text-lime-300">
            TEAMOJI Project Details📝
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card border-cyan-400">
              <CardHeader>
                <CardTitle className="text-xl text-lime-300">Contract Address🗺️</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-mono break-all text-foreground">
                  <a
                    href="https://sepolia.tea.xyz/address/0xE0C5Eb8f1c92f9038364A6e8304F6362f2445445"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    0xE0C5Eb8f1c92f9038364A6e8304F6362f2445445
                  </a>
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-cyan-400">
              <CardHeader>
                <CardTitle className="text-xl text-lime-300">Number of Unique Designs🔢</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-mono break-all text-foreground">
                  <a
                    href="/mint"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    1,484 Unique Designs
                  </a>
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-cyan-400">
              <CardHeader>
                <CardTitle className="text-xl text-lime-300">Creator Info🔎</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-mono break-all text-foreground">
                  <a
                    href="https://sepolia.tea.xyz/address/0xD21BE5C083ea4337B63b5BB939Ef0d5508feB3B3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    0xD21BE5C083ea4337B63b5BB939Ef0d5508feB3B3
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Supported Categories Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-poppins mb-6 text-lime-300">
            Supported Emoji Categories📚
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {['Activities', 'Animals', 'Food', 'Smileys', 'Symbols', 'Travel', 'Objects', 'Flags'].map((category) => (
              <Card key={category} className="bg-card border-cyan-400">
                <CardContent className="pt-6">
                  <p className="text-lg font-semibold text-foreground">{category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-gray-400">...and more to come!</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-navy-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-poppins mb-6 text-lime-300">
            Why TEAMOJI?🤔
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="bg-card border-cyan-400 hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle className="text-xl text-lime-300">For Collectors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-200">
                  Discover and collect unique emoji NFTs. Show off your collection and trade with others.
                </p>
                <Link href="/mint" className="text-cyan-400 hover:underline mt-2 inline-block">
                  Learn More
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-card border-cyan-400 hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle className="text-xl text-lime-300">For Creators</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-200">
                  Create and mint your own emoji NFTs. Earn rewards based on their popularity.
                </p>
                <Link href="/mint" className="text-cyan-400 hover:underline mt-2 inline-block">
                  Learn More
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-card border-cyan-400 hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle className="text-xl text-lime-300">Decentralized Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-200">
                  TEAMOJI uses a proof-of-collection mechanism to reward users based on their activity.
                </p>
                <Link href="/mint" className="text-cyan-400 hover:underline mt-2 inline-block">
                  Learn More
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-card border-cyan-400 hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle className="text-xl text-lime-300">Tea Sepolia Testnet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-200">
                  Built on Tea Sepolia Testnet, TEAMOJI ensures fast and secure NFT minting.
                </p>
                <Link href="/mint" className="text-cyan-400 hover:underline mt-2 inline-block">
                  Learn More
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQs />

      {/* Footer */}
      <footer className="animate-footer-gradient py-4 sm:py-6 border-t-2 border-cyan-400">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <p className="text-gray-400 text-sm text-center sm:hidden mb-2">
            © TEAMOJI Association. Diode Labs - @KharismaPramS 2025.
          </p>
          <button
            className="sm:hidden text-lime-300 text-sm mb-4 flex items-center justify-center gap-2 mx-auto hover:bg-cyan-400 hover:text-navy-950 rounded-lg px-3 py-2 transition-all duration-300 neon-glow"
            onClick={toggleFooter}
            aria-label={isFooterOpen ? 'Hide Links' : 'Show Links'}
          >
            {isFooterOpen ? 'Hide Links' : 'Show Links'}
            <span className={`transition-transform duration-300 ${isFooterOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          <div
            className={`${
              isFooterOpen ? 'flex' : 'hidden'
            } sm:flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 transition-all duration-300 text-sm`}
          >
            {/* Copyright + Banner */}
            <div className="flex flex-col items-center sm:items-start gap-2">
              <img
                src="/ui/teamoji-banner.png"
                alt="TEAMOJI Banner"
                className="h-10 sm:h-12"
              />
              <p className="text-gray-400 hidden sm:block">
                © TEAMOJI Association. Diode Labs - @KharismaPramS 2025.
              </p>
            </div>

            {/* Legal Links + Disclaimer + Follow Us */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 sm:gap-4">
                <Link
                  href="https://tea.xyz/terms-of-use"
                  className="text-lime-300 hover:bg-cyan-400 hover:text-navy-950 hover:underline px-3 py-1 rounded transition-all duration-300 neon-glow"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Use
                </Link>
                <Link
                  href="https://tea.xyz/privacy-policy"
                  className="text-lime-300 hover:bg-cyan-400 hover:text-navy-950 hover:underline px-3 py-1 rounded transition-all duration-300 neon-glow"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="https://tea.xyz/sitemap"
                  className="text-lime-300 hover:bg-cyan-400 hover:text-navy-950 hover:underline px-3 py-1 rounded transition-all duration-300 neon-glow"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sitemap
                </Link>
                <Link
                  href="https://docs.tea.xyz/tea"
                  className="text-lime-300 hover:bg-cyan-400 hover:text-navy-950 hover:underline px-3 py-1 rounded transition-all duration-300 neon-glow"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn About TEAMOJI
                </Link>
              </div>
              <p className="text-gray-400 text-xs text-center">
                This website is for informational purposes only. Acquiring TEAMOJI tokens involves high risks; purchase only if prepared to lose the entire amount.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap items-center gap-1 sm:gap-1.5">
                <span className="text-gray-400 sm:mr-1">🤝 Follow us:</span>
                <Link
                  href="https://x.com/KharismaPramS"
                  className="text-lime-300 hover:bg-cyan-400 hover:text-navy-950 hover:underline px-3 py-1 rounded transition-all duration-300 neon-glow"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  𝕏 @KharismaPrams 👷‍♂️
                </Link>
                <Link
                  href="https://instagram.com/galleryjohana"
                  className="text-lime-300 hover:bg-cyan-400 hover:text-navy-950 hover:underline px-3 py-1 rounded transition-all duration-300 neon-glow"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🅾 @JohanahPrams 💐
                </Link>
              </div>
            </div>

            {/* Support Text + Social Media Links */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-gray-200 text-sm text-center">
                Have questions or need assistance? Connect with us—we're here to help⛑️
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="https://x.com/themojinft"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label="Follow us on X"
                >
                  <img
                    src="/x.svg"
                    alt="X Logo"
                    className="w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-all duration-300 neon-glow-social"
                  />
                </Link>
                <Link
                  href="https://discord.gg/BEnevQJgA6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label="Join our Discord"
                >
                  <img
                    src="/discord.svg"
                    alt="Discord Logo"
                    className="w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-all duration-300 neon-glow-social"
                  />
                </Link>
                <Link
                  href="https://t.me/teamoji"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label="Join our Telegram"
                >
                  <img
                    src="/telegram.svg"
                    alt="Telegram Logo"
                    className="w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-all duration-300 neon-glow-social"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Hero from '@/components/sections/Hero';
import HowItWorks from '@/components/sections/HowItWorks';
import FAQs from '@/components/sections/FAQs';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function Home() {
  // Toast untuk welcome message
  useEffect(() => {
    toast.success('Welcome to TEAMOJI! 🎉 Mint your favorite emoji NFTs now!');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Intro Section */}
      <section className="py-12 bg-navy-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-poppins mb-6 text-lime-300">
            What is TEAMOJI? 
          </h2>
          <h2 className="text-3xl font-bold font-poppins mb-6 text-lime-300">
          😂 ❤️ 😍 🤣 😊 🙏 🥰 😎 💔 😭 
          </h2>
          <p className="text-lg max-w-3xl mx-auto mb-8 text-gray-200">
            TEAMOJI is a decentralized platform on Tea Sepolia Testnet where you can mint, collect, and manage unique emoji NFTs. Support your favorite emojis, earn rewards, and join a vibrant community of collectors!
          </p>
          <Link href="/mint">
            <Button className="btn-primary bg-cyan-400 text-navy-950 hover:bg-lime-300">
              Rady To Mint? 🇱‌🇫‌🇬‌ 💥
            </Button>
          </Link>
        </div>
      </section>

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
      <section className="py-12 bg-navy-900">
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
      <section className="py-12 bg-background">
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
      <footer className="bg-navy-950 py-6 border-t-2 border-cyan-400">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-2">© TEAMOJI Association. Diode Labs - @KharismaPramS 2025.</p>
          <div className="flex justify-center gap-4">
            <Link href="#terms" className="text-lime-300 hover:underline">Terms of Use</Link>
            <Link href="#privacy" className="text-lime-300 hover:underline">Privacy Policy</Link>
            <Link href="#sitemap" className="text-lime-300 hover:underline">Sitemap</Link>
            <Link href="#learn" className="text-lime-300 hover:underline">Learn About TEAMOJI</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
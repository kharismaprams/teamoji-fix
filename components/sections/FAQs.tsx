import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function FAQs() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold font-poppins mb-6 text-center text-lime-300">
          Frequently Asked Questions❓
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="bg-card border-cyan-400">
            <CardHeader>
              <CardTitle className="text-xl text-lime-300">What is TEAMOJI?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-200">
                TEAMOJI is a decentralized platform on Tea Sepolia Testnet for minting and collecting emoji NFTs in a fun and rewarding way.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-cyan-400">
            <CardHeader>
              <CardTitle className="text-xl text-lime-300">How do I mint an NFT?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-200">
                Connect your wallet, browse emojis, and mint your favorites with a small TEA fee.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-cyan-400">
            <CardHeader>
              <CardTitle className="text-xl text-lime-300">What is the purpose of TEA in TEAMOJI?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-200">
                TEA is used to mint NFTs and participate in the TEAMOJI ecosystem, including staking for rewards.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-cyan-400">
            <CardHeader>
              <CardTitle className="text-xl text-lime-300">When is the TEAMOJI Testnet live?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-200">
                TEAMOJI Testnet is live now on Tea Sepolia Testnet!
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="text-center mt-6">
          <Link href="#faqs" className="text-cyan-400 hover:underline">
            Read All FAQs
          </Link>
        </div>
      </div>
    </section>
  );
}
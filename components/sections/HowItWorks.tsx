import { Card, CardContent } from '@/components/ui/card';

export default function HowItWorks() {
  return (
    <section className="py-12 bg-navy-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-poppins mb-6 text-lime-300">
          How to Mint TEAMOJI NFTs🧐
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="bg-card border-cyan-400 hover:scale-105 transition-transform">
            <CardContent className="pt-6">
              <div className="text-4xl mb-4 text-cyan-400">🔎</div>
              <h3 className="text-xl font-semibold text-lime-300 mb-2">Search Emojis</h3>
              <p className="text-gray-200">
                Use the TEAMOJI app to browse and filter emojis by category.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-cyan-400 hover:scale-105 transition-transform">
            <CardContent className="pt-6">
              <div className="text-4xl mb-4 text-cyan-400">🖨️</div>
              <h3 className="text-xl font-semibold text-lime-300 mb-2">Mint an Emoji</h3>
              <p className="text-gray-200">
                Connect your wallet and mint your favorite emoji as an NFT.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-cyan-400 hover:scale-105 transition-transform">
            <CardContent className="pt-6">
              <div className="text-4xl mb-4 text-cyan-400">🎁</div>
              <h3 className="text-xl font-semibold text-lime-300 mb-2">Collect & Earn</h3>
              <p className="text-gray-200">
                Collect rare emojis and earn rewards in the TEAMOJI ecosystem.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
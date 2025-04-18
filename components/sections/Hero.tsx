import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section
      className="relative py-20 bg-cover bg-center"
      style={{ backgroundImage: 'url(/ui/Teamoji Banner.webp)' }}
    >
      <div className="absolute inset-0 bg-navy-950 opacity-60"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold font-poppins mb-4 text-lime-300 text-shadow">
          Welcome to TEAMOJI 🎉
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-gray-200">
          Collect and mint your favorite emoji NFTs on Tea Sepolia Testnet!🖼️
        </p>
        <Link href="/mint">
          <Button className="btn-primary bg-cyan-400 text-navy-950 hover:bg-lime-300 text-lg px-8 py-3">
            Start Minting 🚀
          </Button>
        </Link>
      </div>
    </section>
  );
}
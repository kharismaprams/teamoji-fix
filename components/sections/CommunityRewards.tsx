import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CommunityRewards() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 text-center md:text-left animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Join the TEAMOJI Community 🌟
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Stake TEA, earn rewards, and vote on TEAMOJI governance. Be part of a vibrant community of emoji collectors!
          </p>
          <Button asChild className="btn-primary">
            <Link href="https://x.com/teamoji">Join on X</Link>
          </Button>
        </div>
        <div className="md:w-1/2 grid grid-cols-2 gap-4 animate-slide-up">
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-primary">10,000+</h3>
            <p className="text-muted-foreground">NFTs Minted</p>
          </div>
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-primary">5,000+</h3>
            <p className="text-muted-foreground">Active Collectors</p>
          </div>
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-primary">1M+</h3>
            <p className="text-muted-foreground">TEA Staked</p>
          </div>
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-primary">100+</h3>
            <p className="text-muted-foreground">Governance Votes</p>
          </div>
        </div>
      </div>
    </section>
  );
}
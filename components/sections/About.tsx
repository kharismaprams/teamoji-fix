'use client';

export default function About() {
  return (
    <section id="about" className="w-full bg-[#1A1A1A] py-20 px-6 md:px-12 text-white">
      <div className="max-w-4xl mx-auto text-center space-y-10">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#45F1C1] to-[#627CF6] text-transparent bg-clip-text">
          What is TEAMOJI?📚
        </h2>

        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          TEAMOJI is a decentralized NFT collection that turns the world’s most expressive language — emojis — into permanent on-chain collectibles. Each emoji is not just a symbol, but an emotion, a meme, a movement.
        </p>

        <p className="text-md md:text-lg text-muted-foreground">
          Built with love by the community, TEAMOJI is open, expressive, and unstoppable. Whether you want to flex a 🔥, collect a 🐱, or gift a 💖 — it’s all possible on the blockchain.
        </p>

        <div className="flex justify-center flex-wrap gap-6 mt-10 text-5xl">
          <span>🎨</span>
          <span>💎</span>
          <span>🐱</span>
          <span>🧠</span>
          <span>🔥</span>
          <span>🚀</span>
        </div>
      </div>
    </section>
  );
}

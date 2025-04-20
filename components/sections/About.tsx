'use client';

export default function About() {
  const floatingEmojis = ['😀', '🤴', '🎈', '🍕', '🚗', '❤️', '㊙️', '🚻', '🆒', '🕵️', '🥽'];

  return (
    <section className="py-12 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0 md:space-x-10">
        {/* Bagian Kiri: Teks dari About.tsx */}
        <div className="flex-1 text-center md:text-left space-y-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-lime-300">
            What is TEAMOJI? 📚
          </h2>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
            TEAMOJI is a decentralized NFT collection that turns the world’s most expressive language — emojis — into permanent on-chain collectibles. Each emoji is not just a symbol, but an emotion, a meme, a movement.
          </p>
          <p className="text-md md:text-lg text-gray-200">
            Built with love by the community, TEAMOJI is open, expressive, and unstoppable. Whether you want to flex a 🔥, collect a 🐱, or gift a 💖 — it’s all possible on the blockchain.
          </p>
          <div className="flex justify-center md:justify-start flex-wrap gap-6 text-5xl">
            <span>🎨</span>
            <span>💎</span>
            <span>🐱</span>
            <span>🧠</span>
            <span>🔥</span>
            <span>🚀</span>
          </div>
          <div className="flex flex-col md:flex-row justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4">
            <a
              href="https://github.com/teaxyz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border-2 border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-navy-950 transition-all duration-300"
            >
              Learn More
              <span className="ml-2">→</span>
            </a>
            <a
              href="/mint"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-400 to-lime-400 text-navy-950 rounded-lg hover:from-cyan-300 hover:to-lime-300 transition-all duration-300"
            >
              Ready To Mint? 🇱‌🇫‌🇬‌ 💥
            </a>
          </div>
        </div>

        {/* Bagian Kanan: Grafik Lingkaran */}
        <div className="relative w-full md:w-1/2 h-80 md:h-96 flex items-center justify-center">
          {/* Lingkaran Orbit (Latar Belakang) */}
          <div className="absolute w-80 h-80 md:w-112 md:h-112 rounded-full border border-cyan-400/30"></div>

          {/* Lingkaran Utama */}
          <div className="absolute w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-r from-lime-300/20 to-cyan-400/20 flex items-center justify-center glow">
            <img src="/ui/teamoji-banner.png" alt="TEAMOJI Logo" className="w-32 h-12" />
          </div>

          {/* Kategori di Sekitar Lingkaran */}
          {['Activities', 'Animals', 'Food', 'Smileys', 'Symbols', 'Travel', 'Objects', 'Flags'].map((category, index) => {
            const angle = (index / 8) * 360; // 8 kategori
            const radius = 160; // Jarak dari pusat (mobile)
            const radiusMd = 224; // Jarak dari pusat (desktop)
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);
            const xMd = radiusMd * Math.cos((angle * Math.PI) / 180);
            const yMd = radiusMd * Math.sin((angle * Math.PI) / 180);
            return (
              <span
                key={category}
                className="absolute text-xs md:text-sm px-3 py-1 rounded-full bg-navy-900 border border-cyan-400 text-cyan-400 category-label"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  ['--x-md' as string]: `${xMd}px`,
                  ['--y-md' as string]: `${yMd}px`,
                }}
              >
                {category}
              </span>
            );
          })}

          {/* Emoji Melayang dengan Efek Glowing */}
          {Array.from({ length: 8 }).map((_, i) => {
            const size = Math.random() * 30 + 20; // Ukuran emoji
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const delay = Math.random() * 3;
            const emoji = floatingEmojis[i % floatingEmojis.length];
            return (
              <span
                key={i}
                className="absolute text-2xl glow-emoji animate-float"
                style={{
                  fontSize: `${size}px`,
                  top: `${top}%`,
                  left: `${left}%`,
                  animationDelay: `${delay}s`,
                }}
              >
                {emoji}
              </span>
            );
          })}

          {/* Teks Kecil */}
          <p className="absolute bottom-0 right-0 text-xs md:text-sm text-gray-400">...and more to come</p>
        </div>
      </div>
    </section>
  );
}
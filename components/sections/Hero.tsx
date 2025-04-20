'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

// Definisi tipe untuk partikel
interface Particle {
  id: number;
  emoji: string;
  left: number;
  delay: number;
}

export default function Hero() {
  const originalText = 'Join the TEAMOJI Craze! 🚀';
  const [displayText, setDisplayText] = useState(originalText);
  // Tambah tipe Particle[] ke state particles
  const [particles, setParticles] = useState<Particle[]>([]);
  const emojis = [
    '😂', '❤️', '😍', '🤣', '😊', '🙏', '�0', '😎', '💔', '😭',
    '📱', '🤕', '🐔', '🐨', '🫏', '🦄', '🦊', '🐯', '🐗', '🐷',
    '🐻‍❄️', '🐼', '🦒', '🐶', '🐺', '🐵', '🙊', '😽', '👿', '👺',
    '👹', '🤖', '👾', '💩', '🍕', '🍔', '🍟', '🌭', '🍿', '🧂',
    '🧈', '🥞', '🍳', '🥚', '🥓', '🍞', '🥐', '🥨', '🥯', '🥖',
    '🫓', '🌯', '🌮', '🥪', '🥗', '🧀', '🫔', '🥫', '🍖', '🍗',
    '🥩', '🍠', '🍙', '🥡', '🥠', '🥟', '🍚', '🍜', '🍤'
  ];

  // Animasi Scramble (jalan sekali saja pas buka web)
  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('scramblePlayed');
    if (hasPlayed) return; // Kalau udah pernah jalan, skip animasi

    let iteration = 0;
    const maxIterations = 5;
    const interval = setInterval(() => {
      if (iteration < maxIterations) {
        let scrambled = '';
        for (let i = 0; i < originalText.length; i++) {
          if (originalText[i] === ' ') {
            scrambled += ' ';
          } else {
            const randomChar = emojis[Math.floor(Math.random() * emojis.length)];
            scrambled += randomChar;
          }
        }
        setDisplayText(scrambled);
        iteration++;
      } else {
        let revealIndex = 0;
        const revealInterval = setInterval(() => {
          if (revealIndex < originalText.length) {
            setDisplayText((prev) => {
              let newText = originalText.slice(0, revealIndex + 1);
              for (let i = revealIndex + 1; i < originalText.length; i++) {
                if (originalText[i] === ' ') {
                  newText += ' ';
                } else {
                  newText += emojis[Math.floor(Math.random() * emojis.length)];
                }
              }
              return newText;
            });
            revealIndex++;
          } else {
            clearInterval(revealInterval);
            setDisplayText(originalText);
            sessionStorage.setItem('scramblePlayed', 'true'); // Tandain animasi udah jalan
          }
        }, 50);
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // Generate Partikel Emoji (client-side only)
  useEffect(() => {
    const particleEmojis = ['😂', '❤️', '😍', '🤣', '😊'];
    const newParticles = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      emoji: particleEmojis[Math.floor(Math.random() * particleEmojis.length)],
      left: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section
      className="relative py-20 bg-cover bg-center hero-shine overflow-hidden"
      style={{ backgroundImage: 'url(/ui/Teamoji Banner.webp)' }}
    >
      <div className="absolute inset-0 bg-navy-950 opacity-60"></div>

      {/* Partikel Emoji */}
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute text-2xl opacity-50 animate-particle"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          {particle.emoji}
        </span>
      ))}

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="neon-border">
          <h1 className="text-5xl md:text-6xl font-bold font-techy mb-4 text-lime-300">
            {displayText}
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-gray-200">
            Collect 🖼️ and mint ✨ your favorite emoji NFTs on Tea Sepolia Testnet! 🚀
          </p>
          <Link href="/mint">
            <Button className="btn-primary bg-cyan-400 text-navy-950 hover:bg-lime-300 text-lg px-8 py-3 pulse">
              Start Minting 🚀
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
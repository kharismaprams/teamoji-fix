'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useState } from 'react';

export default function FAQs() {
  // State untuk track FAQ mana yang dibuka
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Fungsi untuk toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Data FAQ
  const faqs = [
    {
      question: 'What is Teamoji?',
      answer: 'Teamoji is a decentralized platform on tea Sepolia Testnet for minting and collecting emoji NFTs in a fun and rewarding way. Join the community to express yourself through unique emoji collectibles!',
    },
    {
      question: 'What is tea?',
      answer: (
        <>
          tea is a decentralized protocol secured by reputation and incentives. It enhances the sustainability and integrity of the software supply chain by allowing open-source developers to capture the value they create in a trustless manner. In Teamoji, tea powers the ecosystem for minting and managing emoji NFTs.{' '}
          <a
            href="https://tea.xyz/whitepaper"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lime-400 hover:underline"
          >
            Read the white paper
          </a>
        </>
      ),
    },
    {
      question: 'What is Proof of Contribution?',
      answer: 'Proof of Contribution is a mechanism that rewards users based on their contributions to the Teamoji ecosystem, such as minting, collecting, and participating in governance. It ensures that active members of the Teamoji community are incentivized for their engagement.',
    },
    {
      question: 'What is the purpose of tea in Teamoji?',
      answer: 'tea is the token used to mint NFTs, participate in the Teamoji ecosystem, and stake for rewards. It powers all transactions and interactions within Teamoji, making it the core of our decentralized platform.',
    },
    {
      question: 'When is the Teamoji Testnet live?',
      answer: 'Teamoji Testnet is live now on tea Sepolia Testnet! Join now, mint your favorite NFTs, flex your collection, and earn exciting rewards as part of the Teamoji community!',
    },
  ];

  return (
    <section className="py-12 bg-background"> {/* Ubah bg-background jadi bg-navy-900 */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold font-poppins mb-6 text-center text-lime-300">
          Frequently Asked Questions❓
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFAQ === index;
            return (
              <Card
                key={index}
                className="bg-navy-900 border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 faq-card-glow"
              >
                <CardHeader
                  className="cursor-pointer flex justify-between items-center"
                  onClick={() => toggleFAQ(index)}
                >
                  <CardTitle className="text-xl text-lime-300 neon-glow">
                    {faq.question}
                  </CardTitle>
                  <span
                    className={`text-lime-300 transition-transform duration-300 neon-glow ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </CardHeader>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 faq-content-slide' : 'max-h-0'
                  }`}
                >
                  <CardContent>
                    <p className="text-gray-200">{faq.answer}</p>
                    {/* Tambah tombol "Join Now" di FAQ terakhir */}
                    {index === faqs.length - 1 && (
                      <Link
                        href="/mint"
                        className="inline-block mt-4 btn-primary text-sm px-4 py-2 pulse"
                      >
                        Join Now 🚀
                      </Link>
                    )}
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
        <div className="text-center mt-6">
          <Link href="#faqs" className="text-cyan-400 hover:underline neon-glow">
            Read All FAQs
          </Link>
        </div>
      </div>
    </section>
  );
}
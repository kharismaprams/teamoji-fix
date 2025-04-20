'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { web3Modal } from '@/lib/web3modal-config';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const [clientWallet, setClientWallet] = useState<{
    address: string | undefined;
    isConnected: boolean;
  }>({ address: undefined, isConnected: false });

  // Sinkronkan status wallet di sisi client
  useEffect(() => {
    setClientWallet({ address, isConnected });
    console.log("Wallet status:", { address, isConnected }); // Debug log
  }, [address, isConnected]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openModal = () => {
    console.log("Opening Web3Modal..."); // Debug log
    web3Modal.open();
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-navy-950 text-foreground py-3 sm:py-4 shadow-md border-b-2 border-cyan-400 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/ui/logo.png"
            alt="TEAMOJI Logo"
            width={40}
            height={40}
            className="rounded-full w-8 sm:w-10"
          />
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold header-title">
            TEAMOJI
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          <Image
            src="/ui/teamoji-banner.png"
            alt="TEAMOJI Banner"
            width={100}
            height={60}
            className="rounded-full w-20 sm:w-24 md:w-28 hidden sm:block"
          />
          <button
            className="sm:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`w-6 h-0.5 bg-lime-300 shadow-lg shadow-cyan-400/50 transition-transform duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-lime-300 shadow-lg shadow-cyan-400/50 transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-lime-300 shadow-lg shadow-cyan-400/50 transition-transform duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </button>

          <nav
            className={`${
              isMenuOpen ? 'flex' : 'hidden'
            } sm:flex flex-col sm:flex-row absolute sm:static top-full left-0 w-full sm:w-auto bg-navy-950 sm:bg-transparent px-4 sm:px-0 py-4 sm:py-0 gap-2 sm:gap-4 md:gap-6 items-center transition-all duration-300`}
          >
            <Link
              href="/"
              className="nav-button text-sm sm:text-base px-2 py-1 border-2 border-cyan-400/30 shadow-md shadow-cyan-400/20 hover:border-cyan-400/70 hover:shadow-cyan-400/70 rounded transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home🏠
            </Link>
            <Link
              href="/mint"
              className="nav-button text-sm sm:text-base px-2 py-1 border-2 border-cyan-400/30 shadow-md shadow-cyan-400/20 hover:border-cyan-400/70 hover:shadow-cyan-400/70 rounded transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Mint📇
            </Link>
            <Link
              href="/profile"
              className="nav-button text-sm sm:text-base px-2 py-1 border-2 border-cyan-400/30 shadow-md shadow-cyan-400/20 hover:border-cyan-400/70 hover:shadow-cyan-400/70 rounded transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile📝
            </Link>
            <Link
              href="/governance"
              className="nav-button text-sm sm:text-base px-2 py-1 border-2 border-cyan-400/30 shadow-md shadow-cyan-400/20 hover:border-cyan-400/70 hover:shadow-cyan-400/70 rounded transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Governance⚖️
            </Link>
            <Link
              href="/admin"
              className="nav-button text-sm sm:text-base px-2 py-1 border-2 border-cyan-400/30 shadow-md shadow-cyan-400/20 hover:border-cyan-400/70 hover:shadow-cyan-400/70 rounded transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              👨🏻‍💻
            </Link>
            <div>
              {clientWallet.isConnected ? (
                <button
                  onClick={openModal}
                  type="button"
                  className="text-sm sm:text-base px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-lime-300 text-navy-950 font-semibold hover:from-cyan-300 hover:to-lime-400 transition-all duration-300 shadow-lg shadow-cyan-400/50 hover:shadow-cyan-400/70 w-full sm:w-auto"
                >
                  {clientWallet.address?.slice(0, 6)}...{clientWallet.address?.slice(-4)}
                </button>
              ) : (
                <button
                  onClick={openModal}
                  type="button"
                  className="text-sm sm:text-base px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-lime-300 text-navy-950 font-semibold hover:from-cyan-300 hover:to-lime-400 transition-all duration-300 shadow-lg shadow-cyan-400/50 hover:shadow-cyan-400/70 w-full sm:w-auto"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
              className="nav-button text-sm sm:text-base px-2 py-1 hover:bg-cyan-500 hover:text-navy-950 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Home🏠
            </Link>
            <Link
              href="/mint"
              className="nav-button text-sm sm:text-base px-2 py-1 hover:bg-cyan-500 hover:text-navy-950 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Mint📇
            </Link>
            <Link
              href="/profile"
              className="nav-button text-sm sm:text-base px-2 py-1 hover:bg-cyan-500 hover:text-navy-950 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile📝
            </Link>
            <Link
              href="/governance"
              className="nav-button text-sm sm:text-base px-2 py-1 hover:bg-cyan-500 hover:text-navy-950 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Governance⚖️
            </Link>
            <Link
              href="/admin"
              className="nav-button text-sm sm:text-base px-2 py-1 hover:bg-cyan-500 hover:text-navy-950 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              👨🏻‍💻
            </Link>
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus || authenticationStatus === 'authenticated');

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      style: {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            onClick={openConnectModal}
                            type="button"
                            className="btn-primary text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2 rounded w-full sm:w-auto"
                          >
                            Connect Wallet
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button
                            onClick={openConnectModal}
                            type="button"
                            className="btn-primary text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2 rounded w-full sm:w-auto"
                          >
                            Wrong network
                          </button>
                        );
                      }

                      return (
                        <button
                          onClick={openAccountModal}
                          type="button"
                          className="btn-primary text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2 rounded w-full sm:w-auto"
                        >
                          {account.displayName}
                          {account.displayBalance ? ` (${account.displayBalance})` : ''}
                        </button>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </nav>
        </div>
      </div>
    </header>
  );
}
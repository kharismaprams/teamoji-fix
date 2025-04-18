import Link from 'next/link';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-navy-950 text-foreground py-4 shadow-md border-b-2 border-cyan-400 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/ui/logo.png"
            alt="TEAMOJI Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold header-title text-normal">
            TEAMOJI
          </h1>
        </Link>

        <nav className="flex gap-6 items-center">
          <Image
            src="/ui/teamoji-banner.png"
            alt="TEAMOJI Banner"
            width={160}
            height={100}
            className="rounded-full"
          />
          <Link href="/" className="nav-button">
            Home🏠
          </Link>
          <Link href="/mint" className="nav-button">
            Mint📇
          </Link>
          <Link href="/profile" className="nav-button">
            Profile📝
          </Link>
          <Link href="/admin" className="nav-button">
            👨🏻‍💻
          </Link>
          <ConnectButton
            showBalance={false}
            chainStatus="icon"
            accountStatus="avatar"
            label="Connect Wallet"
            className="btn-primary"
          />
        </nav>
      </div>
    </header>
  );
}
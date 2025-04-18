import Link from 'next/link';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function MintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      
      <main>{children}</main>
    </>
  );
}
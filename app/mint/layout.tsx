'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header'; // Tambah import Header

export default function MintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header /> {/* Tambah Header */}
      <main>{children}</main>
    </>
  );
}
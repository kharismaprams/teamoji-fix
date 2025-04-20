"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { teamojiAbi } from "@/lib/contract";
import Papa from "papaparse";
import Link from "next/link";
import Header from "@/components/Header";

type Emoji = {
  name: string;
  category: string;
  tokenURI: string;
  image: string;
  mintCount?: number;
};

export default function MintPage() {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("mintCountDesc");
  const [categories] = useState<string[]>([
    "All",
    "Activities",
    "Objects",
    "Symbols",
    "Travel & Places",
    "Smileys & Emotion",
    "Food & Drink",
    "People & Body",
    "Animals & Nature",
    "Flags",
  ]);
  const [isLoadingEmojis, setIsLoadingEmojis] = useState(true);
  const [emojiError, setEmojiError] = useState<string | null>(null);
  const [topMintedIndex, setTopMintedIndex] = useState(0);

  const placeholderImage = "/emojis/placeholder.svg";
  const { address } = useAccount();

  const { data: seasonActive } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "seasonalActive",
    chainId: 10218,
  });

  // Pindahkan logika pengambilan CSV ke useEffect (client-side)
  useEffect(() => {
    setIsLoadingEmojis(true);
    fetch("/category_map.csv")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch CSV");
        return response.text();
      })
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const emojis: Emoji[] = result.data.map((row: any) => {
              const fileName = row.tokenURI.split("/").pop()?.replace(".json", "") || "";
              const mintCount = row.category === "Smileys & Emotion" ? 50 : row.category === "Animals & Nature" ? 30 : 10;
              return {
                name: row.name,
                category: row.category,
                tokenURI: row.tokenURI,
                image: `/emojis/${encodeURIComponent(fileName)}.svg`,
                mintCount,
              };
            });
            setEmojis(emojis);
            setIsLoadingEmojis(false);
          },
          error: (error: Error) => {
            setEmojiError("Failed to load emoji data");
            toast.error("Failed to load emoji data 🚨");
            console.error(error);
            setIsLoadingEmojis(false);
          },
        });
      })
      .catch((error) => {
        setEmojiError("Failed to load emoji data");
        toast.error("Failed to load emoji data 🚨");
        console.error(error);
        setIsLoadingEmojis(false);
      });
  }, []); // Hapus parsedEmojis, langsung gunakan fetch di useEffect

  const { writeContractAsync, isPending: isMinting } = useWriteContract();

  const handleMint = useCallback(
    async (emoji: Emoji) => {
      if (!address) {
        toast.error("Please connect your wallet first! 🔗");
        return;
      }
      if (seasonActive === false) {
        toast.error("Minting is not active. Wait for the season to start! ⏳");
        return;
      }
      try {
        const price = BigInt(1e18);
        const tx = await writeContractAsync({
          address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
          abi: teamojiAbi,
          functionName: "mint",
          args: [emoji.category, emoji.name, emoji.tokenURI],
          value: price,
          chainId: 10218,
        });
        toast.success(`Minted ${emoji.name}! 🎉 Transaction: ${tx.slice(0, 6)}...`);
      } catch (error: any) {
        toast.error(`Failed to mint: ${error.message} 😢`);
        console.error("Mint error:", error);
      }
    },
    [address, seasonActive, writeContractAsync]
  );

  const displayName = (name: string) => name.replace(" #1", "");

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "All":
        return "bg-gray-300 text-navy-900";
      case "Activities":
        return "bg-teal-400 text-navy-900";
      case "Objects":
        return "bg-sky-400 text-white";
      case "Symbols":
        return "bg-violet-500 text-white";
      case "Travel & Places":
        return "bg-amber-400 text-navy-900";
      case "Smileys & Emotion":
        return "bg-yellow-400 text-navy-900";
      case "Food & Drink":
        return "bg-pink-500 text-white";
      case "People & Body":
        return "bg-orange-400 text-navy-900";
      case "Animals & Nature":
        return "bg-emerald-400 text-navy-900";
      case "Flags":
        return "bg-red-500 text-white";
      default:
        return "bg-lime-400 text-navy-900";
    }
  };

  const filteredEmojis = emojis.filter((emoji) => {
    const matchesSearch =
      emoji.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emoji.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || emoji.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const sortedEmojis = [...filteredEmojis].sort((a, b) => {
    switch (sortOption) {
      case "mintCountDesc":
        return (b.mintCount || 0) - (a.mintCount || 0);
      case "mintCountAsc":
        return (a.mintCount || 0) - (b.mintCount || 0);
      case "nameAsc":
        return a.name.localeCompare(b.name);
      case "nameDesc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const featuredEmojis = emojis
    .filter((e) => e.category === "Smileys & Emotion" || e.mintCount! > 30)
    .slice(0, 5);

  const topMintedEmojis = emojis
    .sort((a, b) => (b.mintCount || 0) - (a.mintCount || 0))
    .slice(0, 10);

  const slidesPerView = 4;
  const totalSlides = topMintedEmojis.length;

  const handlePrev = () => {
    setTopMintedIndex((prev) => (prev === 0 ? totalSlides - slidesPerView : prev - 1));
  };

  const handleNext = () => {
    setTopMintedIndex((prev) => (prev >= totalSlides - slidesPerView ? 0 : prev + 1));
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-navy-950 to-navy-900">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {featuredEmojis.length > 0 && (
          <div className="mb-12 relative overflow-hidden rounded-lg">
            <div className="flex animate-slide">
              {featuredEmojis.concat(featuredEmojis).map((emoji, index) => (
                <div key={`${emoji.name}-${index}`} className="flex-shrink-0 w-full sm:w-1/3 px-2">
                  <div className="card relative">
                    <div className="absolute top-2 right-2 bg-yellow-400 text-navy-900 px-2 py-1 rounded-full text-xs font-semibold">
                      Featured 🌟
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-lime-400 text-center truncate text-normal">
                        {displayName(emoji.name)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <img
                        src={emoji.image}
                        alt={emoji.name}
                        className="w-full h-48 object-contain mb-4 rounded-md"
                        onError={(e) => (e.currentTarget.src = placeholderImage)}
                      />
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getCategoryBadgeColor(emoji.category)} mb-2 text-normal`}
                      >
                        {emoji.category}
                      </span>
                      <p className="text-cyan-400 text-lg font-bold mb-4 text-normal">1 TEA</p>
                      <Button
                        onClick={() => handleMint(emoji)}
                        disabled={isMinting || seasonActive === false}
                        className="btn-primary w-full"
                      >
                        {isMinting ? "Minting..." : "Mint Now"}
                      </Button>
                    </CardContent>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {topMintedEmojis.length > 0 && (
          <div className="mb-12 relative overflow-hidden rounded-lg">
            <h2 className="text-3xl font-bold text-lime-400 mb-6 text-center text-normal">Top Minted NFTs 🔥</h2>
            <div className="relative">
              <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${topMintedIndex * (100 / slidesPerView)}%)` }}>
                {topMintedEmojis.map((emoji, index) => (
                  <div key={`${emoji.name}-${index}`} className="flex-shrink-0 w-full sm:w-1/4 px-2">
                    <div className="card relative">
                      <div className="absolute top-2 right-2 bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Top Minted
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl text-lime-400 text-center truncate text-normal">
                          {displayName(emoji.name)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center">
                        <img
                          src={emoji.image}
                          alt={emoji.name}
                          className="w-full h-40 object-contain mb-4 rounded-md"
                          onError={(e) => (e.currentTarget.src = placeholderImage)}
                        />
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getCategoryBadgeColor(emoji.category)} mb-2 text-normal`}
                        >
                          {emoji.category}
                        </span>
                        <p className="text-cyan-400 text-lg font-bold mb-4 text-normal">1 TEA</p>
                        <Button
                          onClick={() => handleMint(emoji)}
                          disabled={isMinting || seasonActive === false}
                          className="btn-primary w-full"
                        >
                          {isMinting ? "Minting..." : "Mint Now"}
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-cyan-400 text-navy-900 p-2 rounded-full"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-cyan-400 text-navy-900 p-2 rounded-full"
              >
                →
              </button>
            </div>
          </div>
        )}

        <div className="mb-8 w-full px-4">
          <div className="overflow-x-auto hide-scrollbar mb-4">
            <div className="flex justify-start sm:justify-center gap-2 w-max min-w-full">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`category-button ${getCategoryBadgeColor(category)} ${
                    categoryFilter === category ? "ring-2 ring-lime-400" : ""
                  } px-4 py-2 rounded-lg whitespace-nowrap transition text-sm`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <select
              className="card text-foreground border-cyan-400 p-2.5 w-full"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-card text-foreground">
                  {cat}
                </option>
              ))}
            </select>

            <Input
              placeholder="Search by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="card text-foreground border-cyan-400 p-2.5 w-full"
            />

            <select
              className="card text-foreground border-cyan-400 p-2.5 w-full"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="mintCountDesc">Mint Count (High to Low)</option>
              <option value="mintCountAsc">Mint Count (Low to High)</option>
              <option value="nameAsc">Name (A-Z)</option>
              <option value="nameDesc">Name (Z-A)</option>
            </select>
          </div>
        </div>

        {isLoadingEmojis ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-12 w-12 border-4 border-t-cyan-400 border-card rounded-full" />
          </div>
        ) : emojiError ? (
          <p className="text-center text-destructive font-semibold text-normal">{emojiError}</p>
        ) : sortedEmojis.length === 0 ? (
          <p className="text-center text-cyan-400 font-semibold text-normal">No NFTs found. Try a different search or filter.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedEmojis.map((emoji) => (
              <div key={emoji.name} className="card">
                <CardHeader>
                  <CardTitle className="text-xl text-lime-400 text-center line-clamp-1 text-normal">
                    {displayName(emoji.name)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <img
                    src={emoji.image}
                    alt={emoji.name}
                    className="w-full h-48 object-contain mb-4 rounded-md"
                    onError={(e) => (e.currentTarget.src = placeholderImage)}
                  />
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getCategoryBadgeColor(emoji.category)} mb-2 text-normal`}
                  >
                    {emoji.category}
                  </span>
                  <p className="text-cyan-400 text-lg font-bold mb-4 text-normal">1 TEA</p>
                  <Button
                    onClick={() => handleMint(emoji)}
                    disabled={isMinting || seasonActive === false}
                    className="btn-primary w-full"
                  >
                    {isMinting ? "Minting..." : "Mint Now"}
                  </Button>
                </CardContent>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
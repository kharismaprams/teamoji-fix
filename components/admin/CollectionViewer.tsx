"use client";

import { useState, useEffect } from "react";
import { useAccount, useContractRead, usePublicClient } from "wagmi";
import { teamojiAbi } from "@/lib/contract";

interface NFT {
  tokenId: bigint;
  name: string;
  image: string;
  description?: string;
}

export default function CollectionViewer() {
  const { address, chain } = useAccount();
  const publicClient = usePublicClient();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hardcoded Token IDs yang kita tau (sementara)
  const hardcodedTokenIds = [3, 5, 6, 7, 8, 9, 20, 21, 22].map(BigInt);

  // Ambil jumlah NFT yang dimiliki user
  const { data: balance, error: balanceError } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "balanceOf",
    args: [address || "0x0000000000000000000000000000000000000000"],
    query: { enabled: !!address },
  });

  useEffect(() => {
    const fetchNFTs = async () => {
      console.log("Starting fetchNFTs...");
      console.log("Wallet address:", address);
      console.log("Chain ID:", chain?.id);
      console.log("Contract address:", process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

      // Cek network
      if (chain?.id !== 10218) {
        setError("Wrong network. Please switch to Tea Sepolia (Chain ID: 10218).");
        setLoading(false);
        console.log("Wrong network detected:", chain?.id);
        return;
      }

      // Cek wallet
      if (!address) {
        setError("Please connect your wallet.");
        setLoading(false);
        console.log("No wallet address connected");
        return;
      }

      // Cek balance error
      if (balanceError) {
        setError(`Failed to fetch balance: ${balanceError.message}`);
        setLoading(false);
        console.error("Balance error:", balanceError);
        return;
      }

      const balanceNum = Number(balance || 0);
      console.log(`Balance: ${balanceNum} NFTs`);

      if (balanceNum === 0) {
        setNfts([]);
        setError(null);
        setLoading(false);
        console.log("No NFTs to fetch: balance is 0");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
        const items: NFT[] = [];

        // Karena tokenOfOwnerByIndex nggak ada, kita coba query event Transfer
        let tokenIds: bigint[] = [];
        try {
          console.log(`Fetching Transfer events for address ${address}...`);
          const logs = await publicClient.getLogs({
            address: contractAddress,
            event: {
              type: "event",
              name: "Transfer",
              inputs: [
                { type: "address", name: "from", indexed: true },
                { type: "address", name: "to", indexed: true },
                { type: "uint256", name: "tokenId", indexed: true },
              ],
            },
            fromBlock: BigInt(0),
            toBlock: "latest",
          });

          console.log("Transfer logs:", logs);

          // Filter Transfer events where 'to' atau 'from' adalah address user
          const userTokenIds = new Set<bigint>();
          for (const log of logs) {
            const { from, to, tokenId } = log.args as { from: string; to: string; tokenId: bigint };
            if (to.toLowerCase() === address.toLowerCase()) {
              userTokenIds.add(tokenId);
            }
            if (from.toLowerCase() === address.toLowerCase()) {
              userTokenIds.delete(tokenId);
            }
          }

          tokenIds = Array.from(userTokenIds);
          console.log("Token IDs from Transfer events:", tokenIds);
        } catch (e) {
          console.error("Error fetching Transfer events:", e);
          // Fallback ke hardcoded Token IDs
          tokenIds = hardcodedTokenIds;
          console.log("Falling back to hardcoded Token IDs:", tokenIds);
        }

        if (tokenIds.length === 0) {
          setError("No Token IDs found for this address.");
          setLoading(false);
          console.log("No Token IDs found");
          return;
        }

        // Ambil tokenURI untuk setiap Token ID
        for (const tokenId of tokenIds) {
          const tokenIdStr = tokenId.toString();
          let name = `Emoji #${tokenIdStr}`;
          let imageUrl = `/emojis/placeholder.svg`;
          let description = "";

          // Panggil tokenURI dari smart contract
          let tokenURI: string | undefined;
          try {
            console.log(`Fetching tokenURI for tokenId ${tokenIdStr}`);
            tokenURI = await publicClient.readContract({
              address: contractAddress,
              abi: teamojiAbi,
              functionName: "tokenURI",
              args: [tokenId],
            });
            console.log(`tokenURI for tokenId ${tokenIdStr}:`, tokenURI);
          } catch (e) {
            console.error(`Error fetching tokenURI for tokenId ${tokenIdStr}:`, e);
            items.push({
              tokenId,
              name,
              image: imageUrl,
              description,
            });
            continue;
          }

          // Cek format tokenURI
          if (typeof tokenURI !== "string" || !tokenURI) {
            console.warn(`Invalid tokenURI for tokenId ${tokenIdStr}:`, tokenURI);
            items.push({
              tokenId,
              name,
              image: imageUrl,
              description,
            });
            continue;
          }

          try {
            // Coba fetch tokenURI
            console.log(`Fetching metadata from: ${tokenURI}`);
            const response = await fetch(tokenURI);
            if (!response.ok) {
              throw new Error(`Failed to fetch: ${response.statusText}`);
            }

            const contentType = response.headers.get("content-type");
            console.log(`Content-Type for tokenURI ${tokenURI}:`, contentType);

            // Kalau JSON metadata
            if (contentType?.includes("application/json")) {
              const metadata = await response.json();
              console.log(`Metadata for tokenId ${tokenIdStr}:`, metadata);

              imageUrl = metadata.image || `/emojis/placeholder.svg`;
              name = metadata.name || name;
              description = metadata.description || "";

              if (imageUrl.startsWith("ipfs://")) {
                imageUrl = imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
              }
            }
            // Kalau langsung gambar (SVG, PNG, dll.)
            else if (contentType?.includes("image")) {
              imageUrl = tokenURI;
            } else {
              console.warn(`Unexpected content-type for tokenId ${tokenIdStr}:`, contentType);
              imageUrl = `/emojis/placeholder.svg`;
            }
          } catch (e) {
            console.error(`Error fetching metadata for tokenId ${tokenIdStr}:`, e);
            // Coba fallback: anggap tokenURI adalah link gambar langsung
            try {
              if (tokenURI.startsWith("http") || tokenURI.startsWith("ipfs://")) {
                imageUrl = tokenURI.startsWith("ipfs://")
                  ? tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
                  : tokenURI;
                console.log(`Falling back to direct image for tokenId ${tokenIdStr}: ${imageUrl}`);
              }
            } catch (e) {
              console.error(`Error using tokenURI as direct image for tokenId ${tokenIdStr}:`, e);
            }
          }

          items.push({
            tokenId,
            name,
            image: imageUrl,
            description,
          });
        }

        if (items.length === 0 && balanceNum > 0) {
          setError("No valid NFTs found. Check contract or try again.");
          console.warn(`No valid NFTs found for ${balanceNum} balance`);
        } else {
          setNfts(items);
          console.log(`Successfully fetched ${items.length} NFTs`);
        }
      } catch (error: any) {
        console.error("Fetch NFTs error:", error);
        setError(`Failed to load collection: ${error.message || "Unknown error"}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [address, balance, publicClient, chain, balanceError]);

  if (loading) {
    return <p className="text-foreground">Loading your collection...</p>;
  }

  if (error) {
    return <p className="text-destructive">{error}</p>;
  }

  if (nfts.length === 0) {
    return <p className="text-foreground">No NFTs found in your collection.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {nfts.map((nft) => (
        <div key={nft.tokenId.toString()} className="bg-navy-900 rounded-lg p-4 border-2 border-lime-300">
          <img
            src={nft.image}
            alt={nft.name}
            className="w-full h-48 object-cover rounded-lg mb-2"
            onError={(e) => (e.currentTarget.src = "/emojis/placeholder.svg")}
          />
          <h3 className="text-lg font-semibold text-yellow-400">{nft.name}</h3>
          <p className="text-muted-foreground">Token ID: {nft.tokenId.toString()}</p>
          {nft.description && <p className="text-muted-foreground">{nft.description}</p>}
        </div>
      ))}
    </div>
  );
}
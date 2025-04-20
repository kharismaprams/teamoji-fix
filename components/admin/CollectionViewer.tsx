"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useAccount, useContractRead, usePublicClient } from "wagmi";
import { teamojiAbi } from "@/lib/contract";

interface CollectionViewerProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

interface NFT {
  tokenId: bigint;
  name: string;
  image: string;
  description?: string;
}

export default function CollectionViewer({ show, setShow }: CollectionViewerProps) {
  const { address, chain } = useAccount();
  const publicClient = usePublicClient();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hardcoded Token IDs diganti jadi rentang 1-1000 (bisa diubah)
  const hardcodedTokenIds = Array.from({ length: 1000 }, (_, i) => BigInt(i + 1));

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

      if (!publicClient) {
        setError("Public client tidak tersedia. Cek koneksi wallet.");
        setLoading(false);
        console.log("Public client tidak tersedia");
        return;
      }

      if (chain?.id !== 10218) {
        setError("Jaringan salah. Pindah ke Tea Sepolia (Chain ID: 10218).");
        setLoading(false);
        console.log("Jaringan salah:", chain?.id);
        return;
      }

      if (!address) {
        setError("Hubungkan wallet dulu.");
        setLoading(false);
        console.log("Wallet tidak terhubung");
        return;
      }

      if (balanceError) {
        setError(`Gagal ambil balance: ${balanceError.message}`);
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
        console.log("Tidak ada NFT untuk diambil: balance 0");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
        const items: NFT[] = [];

        // Coba ambil event Transfer
        let tokenIds: bigint[] = [];
        try {
          console.log(`Mengambil event Transfer untuk address ${address}...`);
          const latestBlock = await publicClient.getBlockNumber();
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
            toBlock: latestBlock,
          });

          console.log("Transfer logs:", logs);

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
          console.log("Token IDs dari event Transfer:", tokenIds);
        } catch (e) {
          console.error("Error mengambil event Transfer:", e);
          // Fallback ke rentang ID
          tokenIds = hardcodedTokenIds.slice(0, balanceNum); // Batasi sesuai balance
          console.log("Falling back to hardcoded Token IDs:", tokenIds);
        }

        if (tokenIds.length === 0) {
          setError("Tidak ada Token ID ditemukan untuk address ini.");
          setLoading(false);
          console.log("Tidak ada Token ID ditemukan");
          return;
        }

        // Ambil tokenURI untuk setiap Token ID
        for (const tokenId of tokenIds) {
          const tokenIdStr = tokenId.toString();
          let name = `Emoji #${tokenIdStr}`;
          let imageUrl = `/emojis/placeholder.svg`;
          let description = "";

          let tokenURI: string | undefined;
          try {
            console.log(`Mengambil tokenURI untuk tokenId ${tokenIdStr}`);
            tokenURI = await publicClient.readContract({
              address: contractAddress,
              abi: teamojiAbi,
              functionName: "tokenURI",
              args: [tokenId],
            });
            console.log(`tokenURI untuk tokenId ${tokenIdStr}:`, tokenURI);
          } catch (e) {
            console.error(`Error mengambil tokenURI untuk tokenId ${tokenIdStr}:`, e);
            continue; // Skip kalau tokenURI gagal
          }

          if (typeof tokenURI !== "string" || !tokenURI) {
            console.warn(`tokenURI tidak valid untuk tokenId ${tokenIdStr}:`, tokenURI);
            continue;
          }

          try {
            console.log(`Mengambil metadata dari: ${tokenURI}`);
            const response = await fetch(tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/"));
            if (!response.ok) {
              throw new Error(`Gagal fetch: ${response.statusText}`);
            }

            const contentType = response.headers.get("content-type");
            console.log(`Content-Type untuk tokenURI ${tokenURI}:`, contentType);

            if (contentType?.includes("application/json")) {
              const metadata = await response.json();
              console.log(`Metadata untuk tokenId ${tokenIdStr}:`, metadata);

              imageUrl = metadata.image || `/emojis/placeholder.svg`;
              name = metadata.name || name;
              description = metadata.description || "";

              if (imageUrl.startsWith("ipfs://")) {
                imageUrl = imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
              }
            } else if (contentType?.includes("image")) {
              imageUrl = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
            } else {
              console.warn(`Content-type tidak dikenal untuk tokenId ${tokenIdStr}:`, contentType);
              imageUrl = `/emojis/placeholder.svg`;
            }
          } catch (e) {
            console.error(`Error mengambil metadata untuk tokenId ${tokenIdStr}:`, e);
            if (tokenURI.startsWith("http") || tokenURI.startsWith("ipfs://")) {
              imageUrl = tokenURI.startsWith("ipfs://")
                ? tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
                : tokenURI;
              console.log(`Fallback ke gambar langsung untuk tokenId ${tokenIdStr}: ${imageUrl}`);
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
          setError("Tidak ada NFT valid ditemukan. Cek kontrak atau coba lagi.");
          console.warn(`Tidak ada NFT valid ditemukan untuk balance ${balanceNum}`);
        } else {
          setNfts(items);
          console.log(`Berhasil mengambil ${items.length} NFT`);
        }
      } catch (error: any) {
        console.error("Fetch NFTs error:", error);
        setError(`Gagal memuat koleksi: ${error.message || "Error tidak diketahui"}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [address, balance, publicClient, chain, balanceError]);

  if (!show) {
    return (
      <button
        onClick={() => setShow(true)}
        className="btn-primary px-4 py-2 rounded-lg"
      >
        Show Collection
      </button>
    );
  }

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
      <button
        onClick={() => setShow(false)}
        className="btn-primary px-4 py-2 rounded-lg mt-4"
      >
        Hide Collection
      </button>
    </div>
  );
}
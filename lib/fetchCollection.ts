import { teamojiAbi } from "@/lib/contract";
import { PublicClient } from "viem";

export interface CollectionItem {
  tokenId: bigint;
  name: string;
  image: string;
  description?: string;
  category?: string;
}

export const fetchCollection = async (
  address: string | undefined,
  balance: bigint | undefined,
  chain: { id: number } | undefined,
  publicClient: PublicClient | undefined,
  setCollection: (items: CollectionItem[]) => void,
  setIsLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
) => {
  console.log("Starting fetchCollection...");
  console.log("Wallet address:", address);
  console.log("Chain ID:", chain?.id);
  console.log("Contract address:", process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  if (!publicClient) {
    setError("Public client tidak tersedia. Cek koneksi wallet.");
    setCollection([]);
    setIsLoading(false);
    console.log("Public client tidak tersedia");
    return;
  }

  if (chain?.id !== 10218) {
    setError("Jaringan salah. Pindah ke Tea Sepolia (Chain ID: 10218).");
    setCollection([]);
    setIsLoading(false);
    console.log("Jaringan salah:", chain?.id);
    return;
  }

  if (!address) {
    setError("Hubungkan wallet dulu.");
    setCollection([]);
    setIsLoading(false);
    console.log("Wallet tidak terhubung");
    return;
  }

  const balanceNum = Number(balance || 0);
  console.log(`Balance: ${balanceNum} NFTs`);

  if (balanceNum === 0) {
    setCollection([]);
    setError(null);
    setIsLoading(false);
    console.log("Tidak ada NFT untuk diambil: balance 0");
    return;
  }

  try {
    setIsLoading(true);
    setError(null);
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
    const items: CollectionItem[] = [];

    // Ambil event Transfer dengan retry
    let tokenIds: bigint[] = [];
    const maxRetries = 3;
    const blockRange = BigInt(10000); // Batasi 10k block per query
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Mengambil event Transfer (percobaan ${attempt}/${maxRetries}) untuk address ${address}...`);
        const latestBlock = await publicClient.getBlockNumber();
        console.log(`Latest block: ${latestBlock}`);
        const userTokenIds = new Set<bigint>();
        let fromBlock = BigInt(0);

        // Query per range block
        while (fromBlock <= latestBlock) {
          const toBlock = fromBlock + blockRange > latestBlock ? latestBlock : fromBlock + blockRange;
          console.log(`Querying logs dari block ${fromBlock} sampai ${toBlock}...`);
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
            fromBlock,
            toBlock,
          });

          console.log(`Transfer logs (block ${fromBlock}-${toBlock}):`, logs);

          for (const log of logs) {
            const { from, to, tokenId } = log.args as { from: string; to: string; tokenId: bigint };
            console.log(`Transfer event: from=${from}, to=${to}, tokenId=${tokenId}`);
            if (to.toLowerCase() === address.toLowerCase()) {
              userTokenIds.add(tokenId);
              console.log(`Added tokenId ${tokenId} (mint/transfer to user)`);
            }
            if (from.toLowerCase() === address.toLowerCase() && from !== "0x0000000000000000000000000000000000000000") {
              userTokenIds.delete(tokenId);
              console.log(`Removed tokenId ${tokenId} (transfer from user)`);
            }
          }
          fromBlock = toBlock + BigInt(1);
        }

        tokenIds = Array.from(userTokenIds);
        console.log("Token IDs dari event Transfer:", tokenIds);

        if (tokenIds.length > 0) {
          break; // Keluar dari retry kalau dapat tokenIds
        }
        console.warn(`Percobaan ${attempt} gagal, tidak ada Token ID ditemukan`);
      } catch (e) {
        console.error(`Error mengambil event Transfer (percobaan ${attempt}):`, e);
        if (attempt === maxRetries) {
          console.log("Falling back ke cek ownerOf...");
        }
      }
    }

    // Fallback ke cek ownerOf kalau getLogs gagal atau tokenIds kurang
    if (tokenIds.length < balanceNum) {
      console.log(`Cek ownerOf untuk ID 1 sampai 10000 (atau sampai cukup ${balanceNum} NFT)...`);
      const tempTokenIds = new Set<bigint>(tokenIds);
      const maxId = 10000; // Batas besar, tapi stop kalau cukup
      for (let i = 1; tempTokenIds.size < balanceNum && i <= maxId; i++) {
        const tokenId = BigInt(i);
        if (tempTokenIds.has(tokenId)) continue; // Skip ID yang udah ada
        try {
          const owner = await publicClient.readContract({
            address: contractAddress,
            abi: teamojiAbi,
            functionName: "ownerOf",
            args: [tokenId],
          });
          if (owner.toLowerCase() === address.toLowerCase()) {
            tempTokenIds.add(tokenId);
            console.log(`Token ID ${tokenId} dimiliki oleh ${address}`);
          }
        } catch (e) {
          console.log(`Token ID ${tokenId} tidak valid atau tidak ada pemilik`);
        }
      }
      tokenIds = Array.from(tempTokenIds);
      console.log("Token IDs setelah cek ownerOf:", tokenIds);

      if (tokenIds.length === 0) {
        setError("Tidak ada Token ID valid ditemukan untuk address ini. Cek kontrak atau coba lagi.");
        setCollection([]);
        setIsLoading(false);
        console.log("Tidak ada Token ID valid ditemukan setelah fallback");
        return;
      }
    }

    // Ambil tokenURI untuk setiap Token ID
    for (const tokenId of tokenIds) {
      const tokenIdStr = tokenId.toString();
      let name = `Emoji #${tokenIdStr}`;
      let imageUrl = `/emojis/placeholder.svg`;
      let description = "";
      let category = "Unknown";

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
        continue;
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
          category = metadata.category || metadata.type || metadata.collection || "Unknown";

          if (metadata.attributes) {
            const categoryAttr = metadata.attributes.find((attr: any) =>
              attr.trait_type.toLowerCase() === "category"
            );
            if (categoryAttr) {
              category = categoryAttr.value || "Unknown";
            }
          }

          if (!category) {
            console.warn(`No category found untuk tokenId ${tokenIdStr}, metadata:`, metadata);
            category = "Unknown";
          }

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
        category,
      });
    }

    if (items.length === 0 && balanceNum > 0) {
      setError("Tidak ada NFT valid ditemukan. Cek kontrak atau coba lagi.");
      console.warn(`Tidak ada NFT valid ditemukan untuk balance ${balanceNum}`);
    } else {
      setCollection(items);
      console.log(`Berhasil mengambil ${items.length} NFT`);
    }
  } catch (error: any) {
    console.error("Fetch collection error:", error);
    setError(`Gagal memuat koleksi: ${error.message || "Error tidak diketahui"}`);
  } finally {
    setIsLoading(false);
  }
};
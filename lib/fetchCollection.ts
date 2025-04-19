import { teamojiAbi } from "@/lib/contract";
import { PublicClient } from "viem";

// Pindahkan interface ke luar fungsi dan ekspor
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
  const hardcodedTokenIds = [3, 5, 6, 7, 8, 9, 20, 21, 22].map(BigInt);

  console.log("Starting fetchCollection...");
  console.log("Wallet address:", address);
  console.log("Chain ID:", chain?.id);
  console.log("Contract address:", process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  if (!address) {
    setError("Please connect your wallet.");
    setCollection([]);
    setIsLoading(false);
    console.log("No wallet address connected");
    return;
  }

  if (!balance || Number(balance) === 0) {
    setCollection([]);
    setError(null);
    setIsLoading(false);
    console.log("No NFTs to fetch: balance is 0");
    return;
  }

  if (chain?.id !== 10218) {
    setError("Wrong network. Please switch to Tea Sepolia (Chain ID: 10218).");
    setIsLoading(false);
    console.log("Wrong network detected:", chain?.id);
    return;
  }

  if (!publicClient) {
    setError("Public client not available. Please try again.");
    setCollection([]);
    setIsLoading(false);
    console.log("Public client not available");
    return;
  }

  try {
    setIsLoading(true);
    setError(null);
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
    const items: CollectionItem[] = [];

    const balanceNum = Number(balance);
    console.log(`Balance: ${balanceNum} NFTs`);

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

      const userTokenIds = new Set<bigint>();
      for (const log of logs) {
        const { from, to, tokenId } = log.args as { from: string; to: string; tokenId: bigint };
        console.log(`Transfer event: from=${from}, to=${to}, tokenId=${tokenId}`);
        if (to.toLowerCase() === address.toLowerCase()) {
          userTokenIds.add(tokenId);
          console.log(`Added tokenId ${tokenId} (mint/transfer to user)`);
        }
        if (from.toLowerCase() === address.toLowerCase()) {
          userTokenIds.delete(tokenId);
          console.log(`Removed tokenId ${tokenId} (transfer from user)`);
        }
      }

      tokenIds = Array.from(userTokenIds);
      console.log("Token IDs from Transfer events:", tokenIds);
    } catch (e) {
      console.error("Error fetching Transfer events:", e);
      tokenIds = hardcodedTokenIds;
      console.log("Falling back to hardcoded Token IDs:", tokenIds);
    }

    if (tokenIds.length === 0) {
      setCollection([]);
      setError("No Token IDs found for this address.");
      console.log("No Token IDs found");
      setIsLoading(false);
      return;
    }

    for (const tokenId of tokenIds) {
      try {
        console.log(`Fetching tokenURI for tokenId ${tokenId}`);
        const tokenURI = await publicClient.readContract({
          address: contractAddress,
          abi: teamojiAbi,
          functionName: "tokenURI",
          args: [tokenId],
        });

        console.log(`tokenURI for tokenId ${tokenId}:`, tokenURI);

        let imageUrl = "";
        let name = `Emoji #${tokenId}`;
        let description = "";
        let category = "";

        if (typeof tokenURI === "string" && tokenURI) {
          console.log(`Fetching metadata from: ${tokenURI}`);
          const response = await fetch(tokenURI);
          if (!response.ok) {
            throw new Error(`Failed to fetch metadata: ${response.statusText}`);
          }

          const contentType = response.headers.get("content-type");
          console.log(`Content-Type for tokenURI ${tokenURI}:`, contentType);

          if (contentType?.includes("application/json")) {
            const metadata = await response.json();
            console.log(`Metadata for tokenId ${tokenId}:`, metadata);

            imageUrl = metadata.image || "/emojis/placeholder.svg";
            name = metadata.name || name;
            description = metadata.description || "";
            category = metadata.category || metadata.type || metadata.collection || "";
            if (metadata.attributes) {
              const categoryAttr = metadata.attributes.find((attr: any) =>
                attr.trait_type.toLowerCase() === "category"
              );
              if (categoryAttr) {
                category = categoryAttr.value;
              }
            }

            console.log(`Category for tokenId ${tokenId}:`, category);
            if (!category) {
              console.warn(`No category found for tokenId ${tokenId}, metadata:`, metadata);
              category = "Unknown";
            }

            if (imageUrl.startsWith("ipfs://")) {
              imageUrl = imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
            }
          } else if (contentType?.includes("image")) {
            imageUrl = tokenURI;
          } else {
            console.warn(`Unexpected content-type for tokenId ${tokenId}:`, contentType);
            imageUrl = "/emojis/placeholder.svg";
          }
        } else {
          console.warn(`Unexpected tokenURI format for tokenId ${tokenId}:`, tokenURI);
          imageUrl = "/emojis/placeholder.svg";
        }

        items.push({
          tokenId,
          name,
          image: imageUrl,
          description,
          category,
        });
      } catch (e) {
        console.error(`Error fetching tokenURI for tokenId ${tokenId}:`, e);
        continue;
      }
    }

    if (items.length === 0 && balanceNum > 0) {
      setError("No valid NFTs found. Check contract or try again.");
      console.warn(`No valid NFTs found for ${balanceNum} balance`);
    } else {
      setCollection(items);
      console.log(`Successfully fetched ${items.length} NFTs`);
    }
  } catch (error: any) {
    console.error("Fetch collection error:", error);
    const errorMsg = error.message || "Unknown error";
    setError(`Failed to load collection: ${errorMsg}`);
  } finally {
    setIsLoading(false);
  }
};
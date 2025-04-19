"use client";

import { useState } from "react";
import { useContractRead } from "wagmi";
import { teamojiAbi } from "@/lib/contract";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isAddress, isHex } from "viem";

interface ReadFunctionModalProps {
  modalOpen: string | null;
  setModalOpen: (value: string | null) => void;
}

export default function ReadFunctionModal({ modalOpen, setModalOpen }: ReadFunctionModalProps) {
  const [balanceOfAddress, setBalanceOfAddress] = useState<`0x${string}` | "">("");
  const [editionCounterString, setEditionCounterString] = useState("");
  const [getApprovedTokenId, setGetApprovedTokenId] = useState("");
  const [getRoleAdminRole, setGetRoleAdminRole] = useState<`0x${string}` | "">("");
  const [hasRoleRole, setHasRoleRole] = useState<`0x${string}` | "">("");
  const [hasRoleAccount, setHasRoleAccount] = useState<`0x${string}` | "">("");
  const [isApprovedOwner, setIsApprovedOwner] = useState<`0x${string}` | "">("");
  const [isApprovedOperator, setIsApprovedOperator] = useState<`0x${string}` | "">("");
  const [mintCountAddress, setMintCountAddress] = useState<`0x${string}` | "">("");
  const [mintPricesString, setMintPricesString] = useState("");
  const [ownerOfTokenId, setOwnerOfTokenId] = useState("");
  const [supportsInterfaceId, setSupportsInterfaceId] = useState<`0x${string}` | "">("");
  const [tokenURITokenId, setTokenURITokenId] = useState("");

  const { data: airdropRole } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "AIRDROP_ROLE",
  });

  const { data: balanceOf } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "balanceOf",
    args: [balanceOfAddress || ("0x0000000000000000000000000000000000000000" as `0x${string}`)],
    query: { enabled: !!balanceOfAddress && isAddress(balanceOfAddress) },
  });

  const { data: daoRole } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "DAO_ROLE",
  });

  const { data: defaultAdminRole } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "DEFAULT_ADMIN_ROLE",
  });

  const { data: editionCounter } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "editionCounter",
    args: [editionCounterString],
    query: { enabled: !!editionCounterString },
  });

  const { data: fusionRole } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "FUSION_ROLE",
  });

  const { data: getApproved } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "getApproved",
    args: [BigInt(getApprovedTokenId || 0)],
    query: { enabled: !!getApprovedTokenId },
  });

  const { data: getRoleAdmin } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "getRoleAdmin",
    args: [getRoleAdminRole || ("0x00" as `0x${string}`)],
    query: { enabled: !!getRoleAdminRole && isHex(getRoleAdminRole) },
  });

  const { data: hasRole } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "hasRole",
    args: [
      hasRoleRole || ("0x00" as `0x${string}`),
      hasRoleAccount || ("0x0000000000000000000000000000000000000000" as `0x${string}`),
    ],
    query: { enabled: !!hasRoleRole && !!hasRoleAccount && isAddress(hasRoleAccount) },
  });

  const { data: isApprovedForAll } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "isApprovedForAll",
    args: [
      isApprovedOwner || ("0x0000000000000000000000000000000000000000" as `0x${string}`),
      isApprovedOperator || ("0x0000000000000000000000000000000000000000" as `0x${string}`),
    ],
    query: {
      enabled: !!isApprovedOwner && !!isApprovedOperator && isAddress(isApprovedOwner) && isAddress(isApprovedOperator),
    },
  });

  const { data: mintCount } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "mintCount",
    args: [mintCountAddress || ("0x0000000000000000000000000000000000000000" as `0x${string}`)],
    query: { enabled: !!mintCountAddress && isAddress(mintCountAddress) },
  });

  const { data: mintPrices } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "mintPrices",
    args: [mintPricesString],
    query: { enabled: !!mintPricesString },
  });

  const { data: name } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "name",
  });

  const { data: ownerOf } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "ownerOf",
    args: [BigInt(ownerOfTokenId || 0)],
    query: { enabled: !!ownerOfTokenId },
  });

  const { data: priceRole } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "PRICE_ROLE",
  });

  const { data: seasonalActive } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "seasonalActive",
  });

  const { data: seasonalRole } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "SEASONAL_ROLE",
  });

  const { data: supportsInterface } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "supportsInterface",
    args: [supportsInterfaceId || ("0x00" as `0x${string}`)],
    query: { enabled: !!supportsInterfaceId },
  });

  const { data: symbol } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "symbol",
  });

  const { data: tokenURI } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "tokenURI",
    args: [BigInt(tokenURITokenId || 0)],
    query: { enabled: !!tokenURITokenId },
  });

  if (!modalOpen) return null;

  // Fungsi untuk mengonversi data ke string dengan aman
  const toSafeString = (data: any): string => {
    if (data === null || data === undefined) return "Loading...";
    if (typeof data === "bigint") return String(Number(data));
    if (typeof data === "boolean") return String(data);
    if (Array.isArray(data)) return data.map(item => toSafeString(item)).join(", ");
    return String(data);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]"
      onClick={() => setModalOpen(null)}
    >
      <div
        className="bg-navy-900 rounded-lg p-6 pt-8 max-w-md w-full border-2 border-lime-300 shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {modalOpen === "AIRDROP_ROLE" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Airdrop Role</h3>
            <p className="text-muted-foreground">{toSafeString(airdropRole)}</p>
          </>
        )}
        {modalOpen === "balanceOf" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Balance Of</h3>
            <div className="space-y-4">
              <Input
                placeholder="Address (0x...)"
                value={balanceOfAddress}
                onChange={(e) => setBalanceOfAddress(e.target.value as `0x${string}`)}
                className="bg-card text-foreground border-border rounded-lg"
              />
              <p className="text-muted-foreground">{balanceOf !== undefined ? toSafeString(balanceOf) : "Enter address..."}</p>
            </div>
          </>
        )}
        {modalOpen === "DAO_ROLE" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">DAO Role</h3>
            <p className="text-muted-foreground">{toSafeString(daoRole)}</p>
          </>
        )}
        {modalOpen === "DEFAULT_ADMIN_ROLE" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Default Admin Role</h3>
            <p className="text-muted-foreground">{toSafeString(defaultAdminRole)}</p>
          </>
        )}
        {modalOpen === "editionCounter" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Edition Counter</h3>
            <div className="space-y-4">
              <Input
                placeholder="String"
                value={editionCounterString}
                onChange={(e) => setEditionCounterString(e.target.value)}
                className="bg-card text-foreground border-border rounded-lg"
              />
              <p className="text-muted-foreground">{editionCounter !== undefined ? toSafeString(editionCounter) : "Enter string..."}</p>
            </div>
          </>
        )}
        {modalOpen === "FUSION_ROLE" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Fusion Role</h3>
            <p className="text-muted-foreground">{toSafeString(fusionRole)}</p>
          </>
        )}
        {modalOpen === "getApproved" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Get Approved</h3>
            <div className="space-y-4">
              <Input
                placeholder="Token ID"
                value={getApprovedTokenId}
                onChange={(e) => setGetApprovedTokenId(e.target.value)}
                type="number"
                className="bg-card text-foreground border-border rounded-lg"
              />
              <p className="text-muted-foreground">{getApproved ? toSafeString(getApproved) : "Enter token ID..."}</p>
            </div>
          </>
        )}
        {modalOpen === "getRoleAdmin" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Get Role Admin</h3>
            <div className="space-y-4">
              <Input
                placeholder="Role Hash (0x...)"
                value={getRoleAdminRole}
                onChange={(e) => setGetRoleAdminRole(e.target.value as `0x${string}`)}
                className="bg-card text-foreground border-border rounded-lg"
              />
              <p className="text-muted-foreground">{getRoleAdmin ? toSafeString(getRoleAdmin) : "Enter role hash..."}</p>
            </div>
          </>
        )}
        {modalOpen === "hasRole" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Has Role</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label text-foreground">Role Hash (0x...)</label>
                <Input
                  placeholder="0x..."
                  value={hasRoleRole}
                  onChange={(e) => setHasRoleRole(e.target.value as `0x${string}`)}
                  className="bg-card text-foreground border-border rounded-lg"
                />
              </div>
              <div className="form-group">
                <label className="form-label text-foreground">Account Address</label>
                <Input
                  placeholder="0x..."
                  value={hasRoleAccount}
                  onChange={(e) => setHasRoleAccount(e.target.value as `0x${string}`)}
                  className="bg-card text-foreground border-border rounded-lg"
                />
              </div>
              <p className="text-muted-foreground">{hasRole !== undefined ? toSafeString(hasRole) : "Enter role and account..."}</p>
            </div>
          </>
        )}
        {modalOpen === "isApprovedForAll" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Is Approved For All</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label text-foreground">Owner Address</label>
                <Input
                  placeholder="0x..."
                  value={isApprovedOwner}
                  onChange={(e) => setIsApprovedOwner(e.target.value as `0x${string}`)}
                  className="bg-card text-foreground border-border rounded-lg"
                />
              </div>
              <div className="form-group">
                <label className="form-label text-foreground">Operator Address</label>
                <Input
                  placeholder="0x..."
                  value={isApprovedOperator}
                  onChange={(e) => setIsApprovedOperator(e.target.value as `0x${string}`)}
                  className="bg-card text-foreground border-border rounded-lg"
                />
              </div>
              <p className="text-muted-foreground">{isApprovedForAll !== undefined ? toSafeString(isApprovedForAll) : "Enter addresses..."}</p>
            </div>
          </>
        )}
        {modalOpen === "mintCount" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Mint Count</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label text-foreground">Address</label>
                <Input
                  placeholder="0x..."
                  value={mintCountAddress}
                  onChange={(e) => setMintCountAddress(e.target.value as `0x${string}`)}
                  className="bg-card text-foreground border-border rounded-lg"
                />
              </div>
              <p className="text-muted-foreground">{mintCount !== undefined ? toSafeString(mintCount) : "Enter address..."}</p>
            </div>
          </>
        )}
        {modalOpen === "mintPrices" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Mint Prices</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label text-foreground">Category</label>
                <select
                  value={mintPricesString}
                  onChange={(e) => setMintPricesString(e.target.value)}
                  className="bg-card text-foreground border-border rounded-lg w-full p-2"
                >
                  <option value="">Select category...</option>
                  <option value="Common">Common</option>
                  <option value="Rare">Rare</option>
                  <option value="Epic">Epic</option>
                  <option value="Legendary">Legendary</option>
                </select>
              </div>
              <p className="text-muted-foreground">{mintPrices !== undefined ? `${toSafeString(mintPrices / BigInt(1e18))} TEA` : "Select category..."}</p>
            </div>
          </>
        )}
        {modalOpen === "name" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Name</h3>
            <p className="text-muted-foreground">{name ? toSafeString(name) : "Loading..."}</p>
          </>
        )}
        {modalOpen === "ownerOf" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Owner Of</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label text-foreground">Token ID</label>
                <Input
                  placeholder="123"
                  value={ownerOfTokenId}
                  onChange={(e) => setOwnerOfTokenId(e.target.value)}
                  type="number"
                  className="bg-card text-foreground border-border rounded-lg"
                />
              </div>
              <p className="text-muted-foreground">{ownerOf ? toSafeString(ownerOf) : "Enter token ID..."}</p>
            </div>
          </>
        )}
        {modalOpen === "PRICE_ROLE" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Price Role</h3>
            <p className="text-muted-foreground">{priceRole ? toSafeString(priceRole) : "Loading..."}</p>
          </>
        )}
        {modalOpen === "seasonalActive" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Seasonal Active</h3>
            <p className="text-muted-foreground">{seasonalActive !== undefined ? toSafeString(seasonalActive) : "Loading..."}</p>
          </>
        )}
        {modalOpen === "SEASONAL_ROLE" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Seasonal Role</h3>
            <p className="text-muted-foreground">{seasonalRole ? toSafeString(seasonalRole) : "Loading..."}</p>
          </>
        )}
        {modalOpen === "supportsInterface" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Supports Interface</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label text-foreground">Interface ID</label>
                <Input
                  placeholder="0x..."
                  value={supportsInterfaceId}
                  onChange={(e) => setSupportsInterfaceId(e.target.value as `0x${string}`)}
                  className="bg-card text-foreground border-border rounded-lg"
                />
              </div>
              <p className="text-muted-foreground">{supportsInterface !== undefined ? toSafeString(supportsInterface) : "Enter interface ID..."}</p>
            </div>
          </>
        )}
        {modalOpen === "symbol" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Symbol</h3>
            <p className="text-muted-foreground">{symbol ? toSafeString(symbol) : "Loading..."}</p>
          </>
        )}
        {modalOpen === "tokenURI" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Token URI</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label text-foreground">Token ID</label>
                <Input
                  placeholder="123"
                  value={tokenURITokenId}
                  onChange={(e) => setTokenURITokenId(e.target.value)}
                  type="number"
                  className="bg-card text-foreground border-border rounded-lg"
                />
              </div>
              <p className="text-muted-foreground">{tokenURI ? toSafeString(tokenURI) : "Enter token ID..."}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
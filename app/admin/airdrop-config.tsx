"use client";

import { useState } from "react";
import { useWriteContract } from "wagmi";
import { toast } from "sonner";
import { teamojiAbi } from "@/lib/contract";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isAddress } from "viem";

interface AirdropConfigProps {
  onSuccess: () => void;
}

export default function AirdropConfig({ onSuccess }: AirdropConfigProps) {
  const [airdropAddress, setAirdropAddress] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const { writeContract } = useWriteContract();

  const handleAirdrop = async () => {
    if (!isAddress(airdropAddress)) return toast.error("Invalid address");
    if (!tokenURI) return toast.error("Token URI cannot be empty");
    try {
      await writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: teamojiAbi,
        functionName: "airdrop",
        args: [airdropAddress, tokenURI],
      });
      toast.success(`Airdropped to ${airdropAddress.slice(0, 6)}...`);
      setAirdropAddress("");
      setTokenURI("");
      onSuccess();
    } catch (error: any) {
      toast.error(`Airdrop failed: ${error.message}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="form-group">
        <label className="form-label text-gray-200">To Address</label>
        <Input
          placeholder="0x..."
          value={airdropAddress}
          onChange={(e) => setAirdropAddress(e.target.value)}
          className="card text-gray-200 border-cyan-400 rounded-lg pointer-events-auto"
          disabled={false}
        />
      </div>
      <div className="form-group">
        <label className="form-label text-gray-200">Token URI</label>
        <Input
          placeholder="ipfs://..."
          value={tokenURI}
          onChange={(e) => setTokenURI(e.target.value)}
          className="card text-gray-200 border-cyan-400 rounded-lg pointer-events-auto"
          disabled={false}
        />
      </div>
      <Button onClick={handleAirdrop} className="btn-primary w-full">
        Airdrop
      </Button>
    </div>
  );
}
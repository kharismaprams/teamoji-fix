"use client";

import { useState } from "react";
import { useContractWrite } from "wagmi";
import { toast } from "sonner";
import { teamojiAbi } from "@/lib/contract";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MintControlProps {
  onSuccess?: () => void;
}

export default function MintControl({ onSuccess }: MintControlProps) {
  const [mintCategory, setMintCategory] = useState("");
  const [mintName, setMintName] = useState("");
  const [mintTokenURI, setMintTokenURI] = useState("");
  const [mintValue, setMintValue] = useState("");
  const [setMintPriceCategory, setSetMintPriceCategory] = useState("");
  const [setMintPricePrice, setSetMintPricePrice] = useState("");

  const { writeAsync: mint } = useContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "mint",
  });

  const { writeAsync: setMintPrice } = useContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "setMintPrice",
  });

  const handleMint = async () => {
    if (!mintCategory) {
      toast.error("Category cannot be empty");
      return;
    }
    if (!mintName) {
      toast.error("Name cannot be empty");
      return;
    }
    if (!mintTokenURI.startsWith("ipfs://")) {
      toast.error("Token URI must start with 'ipfs://'");
      return;
    }
    const valueNum = Number(mintValue);
    if (isNaN(valueNum) || valueNum < 0) {
      toast.error("Invalid TEA value");
      return;
    }
    try {
      await mint({ args: [mintCategory, mintName, mintTokenURI], value: BigInt(valueNum * 1e18) });
      toast.success(`Minted ${mintName}`);
      setMintCategory("");
      setMintName("");
      setMintTokenURI("");
      setMintValue("");
      onSuccess?.();
    } catch (error: any) {
      toast.error(`Mint failed: ${error.message}`);
    }
  };

  const handleSetMintPrice = async () => {
    if (!setMintPriceCategory) {
      toast.error("Category cannot be empty");
      return;
    }
    const priceNum = Number(setMintPricePrice);
    if (isNaN(priceNum) || priceNum < 0) {
      toast.error("Invalid price");
      return;
    }
    try {
      await setMintPrice({ args: [setMintPriceCategory, BigInt(priceNum * 1e18)] });
      toast.success(`Set ${setMintPriceCategory} price to ${priceNum} TEA`);
      setSetMintPriceCategory("");
      setSetMintPricePrice("");
      onSuccess?.();
    } catch (error: any) {
      toast.error(`Set mint price failed: ${error.message}`);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-lg font-semibold mb-4 text-lime-400 text-normal">Mint NFT</h4>
        <div className="space-y-4">
          <div className="form-group">
            <label className="form-label text-gray-200">Category</label>
            <Input
              placeholder="Activities"
              value={mintCategory}
              onChange={(e) => setMintCategory(e.target.value)}
              className="card text-gray-200 border-cyan-400 rounded-lg"
            />
          </div>
          <div className="form-group">
            <label className="form-label text-gray-200">Name</label>
            <Input
              placeholder="Smiley"
              value={mintName}
              onChange={(e) => setMintName(e.target.value)}
              className="card text-gray-200 border-cyan-400 rounded-lg"
            />
          </div>
          <div className="form-group">
            <label className="form-label text-gray-200">Token URI (ipfs://...)</label>
            <Input
              placeholder="ipfs://..."
              value={mintTokenURI}
              onChange={(e) => setMintTokenURI(e.target.value)}
              className="card text-gray-200 border-cyan-400 rounded-lg"
            />
          </div>
          <div className="form-group">
            <label className="form-label text-gray-200">TEA Value</label>
            <Input
              placeholder="3"
              value={mintValue}
              onChange={(e) => setMintValue(e.target.value)}
              type="number"
              className="card text-gray-200 border-cyan-400 rounded-lg"
            />
          </div>
          <Button onClick={handleMint} className="btn-primary w-full">
            Mint NFT
          </Button>
        </div>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4 text-lime-400 text-normal">Set Mint Price</h4>
        <div className="space-y-4">
          <div className="form-group">
            <label className="form-label text-gray-200">Category</label>
            <Input
              placeholder="Activities"
              value={setMintPriceCategory}
              onChange={(e) => setSetMintPriceCategory(e.target.value)}
              className="card text-gray-200 border-cyan-400 rounded-lg"
            />
          </div>
          <div className="form-group">
            <label className="form-label text-gray-200">Price (TEA)</label>
            <Input
              placeholder="3"
              value={setMintPricePrice}
              onChange={(e) => setSetMintPricePrice(e.target.value)}
              type="number"
              className="card text-gray-200 border-cyan-400 rounded-lg"
            />
          </div>
          <Button onClick={handleSetMintPrice} className="btn-primary w-full">
            Set Price
          </Button>
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { useContractRead, usePublicClient } from "wagmi";
import { teamojiAbi } from "@/lib/contract";
import { formatEther } from "viem";

export default function ContractStats() {
  const publicClient = usePublicClient();

  const { data: name } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "name",
  });

  const { data: seasonalActive } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "seasonalActive",
  });

  const { data: mintCount } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "mintCount",
    args: ["0x0000000000000000000000000000000000000000"],
  });

  const fetchContractBalance = async () => {
    try {
      const balance = await publicClient.getBalance({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      });
      return formatEther(balance);
    } catch (error) {
      return "0";
    }
  };

  const [contractBalance, setContractBalance] = useState("0");
  useEffect(() => {
    fetchContractBalance().then(setContractBalance);
  }, [publicClient]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <div className="card">
        <div className="pt-6 text-center">
          <p className="text-2xl font-bold text-lime-400">{name || "TEAMOJI"}</p>
          <p className="text-cyan-400">Contract Name</p>
        </div>
      </div>
      <div className="card">
        <div className="pt-6 text-center">
          <p className="text-2xl font-bold text-lime-400">{mintCount ? Number(mintCount) : "N/A"}</p>
          <p className="text-cyan-400">Total Minted (Est.)</p>
        </div>
      </div>
      <div className="card">
        <div className="pt-6 text-center">
          <p className="text-2xl font-bold text-lime-400">{contractBalance} TEA</p>
          <p className="text-cyan-400">Contract Balance</p>
        </div>
      </div>
      <div className="card">
        <div className="pt-6 text-center">
          <p className="text-2xl font-bold text-lime-400">{seasonalActive ? "Active" : "Inactive"}</p>
          <p className="text-cyan-400">Season Status</p>
        </div>
      </div>
    </div>
  );
}
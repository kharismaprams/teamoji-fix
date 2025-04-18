"use client";

import { useState } from "react";
import { Button, Input } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAccount, useContractWrite, useContractRead } from "wagmi";
import { teamojiAbi } from "@/lib/contract";
import Header from "@/components/Header";

export default function GovernancePage() {
  const { address } = useAccount();
  const [description, setDescription] = useState("");
  const [proposalId, setProposalId] = useState("");
  const [support, setSupport] = useState("");

  const { writeAsync: proposeVote } = useContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "proposeVote",
  });

  const { writeAsync: vote } = useContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "vote",
  });

  const handlePropose = async () => {
    if (!address) return toast.error("Please connect your wallet!");
    if (!description) return toast.error("Description cannot be empty");
    try {
      await proposeVote({ args: [description] });
      toast.success("Proposal submitted!");
      setDescription("");
    } catch (error: any) {
      toast.error(`Failed to propose: ${error.message}`);
    }
  };

  const handleVote = async () => {
    if (!address) return toast.error("Please connect your wallet!");
    if (!proposalId || isNaN(Number(proposalId))) return toast.error("Invalid proposal ID");
    const supportBool = support.toLowerCase() === "true";
    try {
      await vote({ args: [BigInt(proposalId), supportBool] });
      toast.success(`Voted on proposal ${proposalId}`);
      setProposalId("");
      setSupport("");
    } catch (error: any) {
      toast.error(`Failed to vote: ${error.message}`);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-navy-950 to-navy-900">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-lime-400 header-title text-center mb-8 text-normal">
          TEAMOJI Governance
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card">
            <CardHeader>
              <CardTitle className="text-xl text-lime-400 text-normal">Propose a Vote</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Proposal description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="card text-gray-200 border-cyan-400 mb-4"
              />
              <Button onClick={handlePropose} className="btn-primary w-full">
                Submit Proposal
              </Button>
            </CardContent>
          </div>
          <div className="card">
            <CardHeader>
              <CardTitle className="text-xl text-lime-400 text-normal">Vote on Proposal</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Proposal ID"
                value={proposalId}
                onChange={(e) => setProposalId(e.target.value)}
                type="number"
                className="card text-gray-200 border-cyan-400 mb-4"
              />
              <Input
                placeholder="Support (true/false)"
                value={support}
                onChange={(e) => setSupport(e.target.value)}
                className="card text-gray-200 border-cyan-400 mb-4"
              />
              <Button onClick={handleVote} className="btn-primary w-full">
                Cast Vote
              </Button>
            </CardContent>
          </div>
        </div>
      </div>
    </section>
  );
}
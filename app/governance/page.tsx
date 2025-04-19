"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAccount, useWriteContract } from "wagmi";
import { teamojiAbi } from "@/lib/contract";
import Header from "@/components/Header";

// Definisikan tipe untuk proposal
interface Proposal {
  id: number;
  title: string;
  description: string;
  status: string;
}

export default function GovernancePage() {
  const { address } = useAccount();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [proposalId, setProposalId] = useState("");
  const [support, setSupport] = useState("");
  const [proposals, setProposals] = useState<Proposal[]>(() => {
    const savedProposals = typeof window !== "undefined" ? localStorage.getItem("proposals") : null;
    return savedProposals ? JSON.parse(savedProposals) : [];
  });

  const { writeContract } = useWriteContract();
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

  const handlePropose = async () => {
    if (!address) return toast.error("Please connect your wallet!");
    if (!title || !description) return toast.error("Both Title and Description are required");
    try {
      await writeContract({
        address: contractAddress,
        abi: teamojiAbi,
        functionName: "proposeVote",
        args: [description],
      });

      const newProposal = { id: proposals.length + 1, title, description, status: "Active" };
      const updatedProposals = [...proposals, newProposal];
      setProposals(updatedProposals);
      localStorage.setItem("proposals", JSON.stringify(updatedProposals));

      toast.success("Proposal submitted!");
      setTitle("");
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
      await writeContract({
        address: contractAddress,
        abi: teamojiAbi,
        functionName: "vote",
        args: [BigInt(proposalId), supportBool],
      });
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
          TEAMOJI GOVERNANCE⚖️
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card">
            <CardHeader>
              <CardTitle className="text-xl text-lime-400 text-normal">Create New Proposal📜</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Proposal Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="card text-gray-200 border-cyan-400 mb-4"
              />
              <Input
                placeholder="Proposal Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="card text-gray-200 border-cyan-400 mb-4"
              />
              <Button onClick={handlePropose} className="btn-primary w-full">
                Create Proposal
              </Button>
            </CardContent>
          </div>
          <div className="card">
            <CardHeader>
              <CardTitle className="text-xl text-lime-400 text-normal">Cast Vote on Proposal🤝</CardTitle>
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

        <div className="mt-12">
          <h2 className="text-2xl text-lime-400">PROPOSALS📊</h2>
          {proposals.length === 0 ? (
            <p className="text-gray-300">No proposals yet.🤔</p>
          ) : (
            <div className="space-y-4">
              {proposals.map((proposal) => (
                <Card key={proposal.id} className="bg-gray-800 text-gray-200 border-gray-700">
                  <CardHeader>
                    <h3 className="text-xl">{proposal.title}</h3>
                    <p className="text-gray-400">{proposal.description}</p>
                    <p className="text-gray-400">Status: {proposal.status}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useWriteContract } from "wagmi";
import { toast } from "sonner";
import { teamojiAbi } from "@/lib/contract";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProposalManagerProps {
  setModalOpen: (value: string | null) => void;
}

interface Proposal {
  id: number;
  title: string;
  description: string;
  status: string;
}

export default function ProposalManager({ setModalOpen }: ProposalManagerProps) {
  const [proposalTitle, setProposalTitle] = useState("");
  const [proposalDesc, setProposalDesc] = useState("");
  const [proposals, setProposals] = useState<Proposal[]>(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("proposals") : null;
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, title: "Increase mint price", description: "Set mint price to 2 TEA", status: "Active" },
          { id: 2, title: "Add new role", description: "Add a new governance role", status: "Closed" },
        ];
  });
  const { writeContract } = useWriteContract();

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

  useEffect(() => {
    localStorage.setItem("proposals", JSON.stringify(proposals));
  }, [proposals]);

  const handleProposeVote = async () => {
    if (!proposalTitle) return toast.error("Proposal title cannot be empty");
    if (!proposalDesc) return toast.error("Proposal description cannot be empty");
    const fullDescription = `Title: ${proposalTitle} | Description: ${proposalDesc}`;
    try {
      await writeContract({
        address: contractAddress,
        abi: teamojiAbi,
        functionName: "proposeVote",
        args: [fullDescription],
      });
      toast.success("Proposal created successfully!");
      setProposals((prev) => [
        ...prev,
        { id: prev.length + 1, title: proposalTitle, description: proposalDesc, status: "Active" },
      ]);
      setProposalTitle("");
      setProposalDesc("");
    } catch (error: any) {
      toast.error(`Propose vote failed: ${error.message}`);
    }
  };

  return (
    <div className="card animate-slide-up">
      <h3 className="text-xl font-semibold mb-4 text-foreground">Governance</h3>
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-foreground">Create New Proposal</h4>
          <div className="form-group">
            <label className="form-label text-foreground">Proposal Title</label>
            <Input
              placeholder="e.g., Increase mint price"
              value={proposalTitle}
              onChange={(e) => setProposalTitle(e.target.value)}
              className="bg-card text-foreground border-border rounded-lg"
            />
          </div>
          <div className="form-group">
            <label className="form-label text-foreground">Proposal Description</label>
            <Input
              placeholder="e.g., Set mint price to 2 TEA"
              value={proposalDesc}
              onChange={(e) => setProposalDesc(e.target.value)}
              className="bg-card text-foreground border-border rounded-lg"
            />
          </div>
          <Button onClick={handleProposeVote} className="btn-primary w-full">
            Create Proposal
          </Button>
        </div>
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-foreground">Actions</h4>
          <Button onClick={() => setModalOpen("vote")} className="btn-primary w-full">
            Vote
          </Button>
        </div>
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-foreground">Proposals</h4>
          {proposals.length === 0 ? (
            <p className="text-muted-foreground">No proposals found.</p>
          ) : (
            proposals.map((proposal) => (
              <Card key={proposal.id} className="p-4 bg-card border-border">
                <h5 className="text-md font-semibold text-foreground">Proposal #{proposal.id}: {proposal.title}</h5>
                <p className="text-muted-foreground">{proposal.description}</p>
                <p className="text-muted-foreground">Status: {proposal.status}</p>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
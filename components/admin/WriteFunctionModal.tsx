"use client";

import { useState } from "react";
import { useWriteContract } from "wagmi";
import { toast } from "sonner";
import { teamojiAbi } from "@/lib/contract";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isAddress, isHex } from "viem";
import AirdropConfig from "@/app/admin/airdrop-config";
import MintControl from "@/app/admin/mint-control";

interface WriteFunctionModalProps {
  modalOpen: string | null;
  setModalOpen: (value: string | null) => void;
}

export default function WriteFunctionModal({ modalOpen, setModalOpen }: WriteFunctionModalProps) {
  const [approveTo, setApproveTo] = useState<`0x${string}` | "">("");
  const [approveTokenId, setApproveTokenId] = useState("");
  const [endSeasonLoading, setEndSeasonLoading] = useState(false);
  const [fuseTokenId1, setFuseTokenId1] = useState("");
  const [fuseTokenId2, setFuseTokenId2] = useState("");
  const [grantRoleRole, setGrantRoleRole] = useState<`0x${string}` | "">("");
  const [grantRoleAccount, setGrantRoleAccount] = useState<`0x${string}` | "">("");
  const [proposeVoteDesc, setProposeVoteDesc] = useState("");
  const [renounceRoleRole, setRenounceRoleRole] = useState<`0x${string}` | "">("");
  const [renounceRoleAccount, setRenounceRoleAccount] = useState<`0x${string}` | "">("");
  const [revokeRoleRole, setRevokeRoleRole] = useState<`0x${string}` | "">("");
  const [revokeRoleAccount, setRevokeRoleAccount] = useState<`0x${string}` | "">("");
  const [safeTransferFromAddr, setSafeTransferFromAddr] = useState<`0x${string}` | "">("");
  const [safeTransferTo, setSafeTransferTo] = useState<`0x${string}` | "">("");
  const [safeTransferTokenId, setSafeTransferTokenId] = useState("");
  const [safeTransferData, setSafeTransferData] = useState<`0x${string}` | "">("");
  const [setApprovalOperator, setSetApprovalOperator] = useState<`0x${string}` | "">("");
  const [setApprovalApproved, setSetApprovalApproved] = useState("");
  const [startSeasonLoading, setStartSeasonLoading] = useState(false);
  const [transferFromAddr, setTransferFromAddr] = useState<`0x${string}` | "">("");
  const [transferTo, setTransferTo] = useState<`0x${string}` | "">("");
  const [transferTokenId, setTransferTokenId] = useState("");
  const [voteProposalId, setVoteProposalId] = useState("");
  const [voteSupport, setVoteSupport] = useState("");
  const [withdrawTo, setWithdrawTo] = useState<`0x${string}` | "">("");

  const { writeContract: approve } = useWriteContract();
  const { writeContract: endSeason } = useWriteContract();
  const { writeContract: fuse } = useWriteContract();
  const { writeContract: grantRole } = useWriteContract();
  const { writeContract: proposeVote } = useWriteContract();
  const { writeContract: renounceRole } = useWriteContract();
  const { writeContract: revokeRole } = useWriteContract();
  const { writeContract: safeTransfer } = useWriteContract();
  const { writeContract: setApprovalForAll } = useWriteContract();
  const { writeContract: startSeason } = useWriteContract();
  const { writeContract: transfer } = useWriteContract();
  const { writeContract: vote } = useWriteContract();
  const { writeContract: withdraw } = useWriteContract();

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

  const handleApprove = async () => {
    if (!isAddress(approveTo)) return toast.error("Invalid address");
    if (!approveTokenId || isNaN(Number(approveTokenId))) return toast.error("Invalid token ID");
    try {
      await approve({
        address: contractAddress,
        abi: teamojiAbi,
        functionName: "approve",
        args: [approveTo, BigInt(approveTokenId)],
      });
      toast.success(`Approved token ${approveTokenId} to ${approveTo.slice(0, 6)}...`);
      setApproveTo("");
      setApproveTokenId("");
      setModalOpen(null);
    } catch (error: any) {
      toast.error(`Approve failed: ${error.message}`);
    }
  };

  const handleEndSeason = async () => {
    setEndSeasonLoading(true);
    try {
      await endSeason({
        address: contractAddress,
        abi: teamojiAbi,
        functionName: "endSeason",
      });
      toast.success("Season ended successfully!");
      setModalOpen(null);
    } catch (error: any) {
      toast.error(`End season failed: ${error.message}`);
    } finally {
      setEndSeasonLoading(false);
    }
  };

  const handleFuse = async () => {
    if (!fuseTokenId1 || isNaN(Number(fuseTokenId1))) return toast.error("Invalid token ID 1");
    if (!fuseTokenId2 || isNaN(Number(fuseTokenId2))) return toast.error("Invalid token ID 2");
    try {
      await fuse({
        address: contractAddress,
        abi: teamojiAbi,
        functionName: "fuse",
        args: [BigInt(fuseTokenId1), BigInt(fuseTokenId2)],
      });
      toast.success(`Fused tokens ${fuseTokenId1} and ${fuseTokenId2}`);
      setFuseTokenId1("");
      setFuseTokenId2("");
      setModalOpen(null);
    } catch (error: any) {
      toast.error(`Fuse failed: ${error.message}`);
    }
  };

  const handleGrantRole = async () => {
    if (!isHex(grantRoleRole)) return toast.error("Invalid role hash");
    if (!isAddress(grantRoleAccount)) return toast.error("Invalid address");
    try {
      await grantRole({
        address: contractAddress,
        abi: teamojiAbi,
        functionName: "grantRole",
        args: [grantRoleRole, grantRoleAccount],
      });
      toast.success(`Role granted to ${grantRoleAccount.slice(0, 6)}...`);
      setGrantRoleRole("");
      setGrantRoleAccount("");
      setModalOpen(null);
    } catch (error: any) {
      toast.error(`Grant role failed: ${error.message}`);
    }
  };

  const handleProposeVote = async () => {
    if (!proposeVoteDesc) return toast.error("Description cannot be empty");
    try {
      await proposeVote({
        address: contractAddress,
        abi: teamojiAbi,
        functionName: "proposeVote",
        args: [proposeVoteDesc],
      });
      toast.success("Vote proposed successfully!");
      setProposeVoteDesc("");
      setModalOpen(null);
    } catch (error: any) {
      toast.error(`Propose vote failed: ${error.message}`);
    }
  };

  const handleRenounceRole = async () => {
    if (!isHex(renounceRoleRole)) return toast.error("Invalid role hash");
    if (!isAddress(renounceRoleAccount)) return toast.error("Invalid address");
    try {
      await renounceRole({
        address: contractAddress,
        abi: teamojiAbi,
        functionName: "renounceRole",
        args: [renounceRoleRole, renounceRoleAccount],
      });
      toast.success(`Role renounced for ${renounceRoleAccount.slice(0, 6)}...`);
      setRenounceRoleRole("");
      setRenounceRoleAccount("");
      setModalOpen(null);
    } catch (error: any) {
      toast.error(`Renounce role failed: ${error.message}`);
    }
  };

  const handleRevokeRole = async () => {
    if (!isHex(revokeRoleRole)) return toast.error("Invalid role hash");
    if (!isAddress(revokeRoleAccount)) return toast.error("Invalid address");
    try {
      await revokeRole({
        address: contractAddress,
        abi: teamojiAbi,
        functionName: "revokeRole",
        args: [revokeRoleRole, revokeRoleAccount],
      });
      toast.success(`Role revoked from ${revokeRoleAccount.slice(0, 6)}...`);
      setRevokeRoleRole("");
      setRevokeRoleAccount("");
      setModalOpen(null);
    } catch (error: any) {
      toast.error(`Revoke role failed: ${error.message}`);
    }
  };

  const handleSafeTransferFrom = async () => {
    if (!isAddress(safeTransferFromAddr)) return toast.error("Invalid from address");
    if (!isAddress(safeTransferTo)) return toast.error("Invalid to address");
    if (!safeTransferTokenId || isNaN(Number(safeTransferTokenId))) return toast.error("Invalid token ID");
    try {
      const commonArgs = {
        address: contractAddress,
        abi: teamojiAbi,
        functionName: "safeTransferFrom" as const,
      };

      if (safeTransferData) {
        // Overload dengan 4 argumen (dengan data)
        await safeTransfer({
          ...commonArgs,
          args: [safeTransferFromAddr, safeTransferTo, BigInt(safeTransferTokenId), safeTransferData] as const,
        });
      } else {
        // Overload dengan 3 argumen (tanpa data)
        await safeTransfer({
          ...commonArgs,
          args: [safeTransferFromAddr, safeTransferTo, BigInt(safeTransferTokenId)] as const,
        });
      }

      toast.success(`Transferred token ${safeTransferTokenId} to ${safeTransferTo.slice(0, 6)}...`);
      setSafeTransferFromAddr("");
      setSafeTransferTo("");
      setSafeTransferTokenId("");
      setSafeTransferData("");
      setModalOpen(null);
    } catch (error: any) {
      toast.error(`Safe transfer failed: ${error.message}`);
    }
  };

  const handleSetApprovalForAll = async () => {
    if (!isAddress(setApprovalOperator)) return toast.error("Invalid operator address");
    const approved = setApprovalApproved.toLowerCase() === "true";
    try {
      await setApprovalForAll({
        address: contractAddress,
        abi: teamojiAbi,
        functionName: "setApprovalForAll",
        args: [setApprovalOperator, approved],
      });
      toast.success(`Set approval for ${setApprovalOperator.slice(0, 6)}... to ${approved}`);
      setSetApprovalOperator("");
      setSetApprovalApproved("");
      setModalOpen(null);
    } catch (error: any) {
      toast.error(`Set approval failed: ${error.message}`);
    }
  };

  const handleStartSeason = async () => {
    setStartSeasonLoading(true);
    try {
      await startSeason({
        address: contractAddress,
        abi: teamojiAbi,
        functionName: "startSeason",
      });
      toast.success("Season started successfully!");
      setModalOpen(null);
    } catch (error: any) {
      toast.error(`Start season failed: ${error.message}`);
    } finally {
      setStartSeasonLoading(false);
    }
  };

  const handleTransferFrom = async () => {
    if (!isAddress(transferFromAddr)) return toast.error("Invalid from address");
    if (!isAddress(transferTo)) return toast.error("Invalid to address");
    if (!transferTokenId || isNaN(Number(transferTokenId))) return toast.error("Invalid token ID");
    try {
      await transfer({
        address: contractAddress,
        abi: teamojiAbi,
        functionName: "transferFrom",
        args: [transferFromAddr, transferTo, BigInt(transferTokenId)],
      });
      toast.success(`Transferred token ${transferTokenId} to ${transferTo.slice(0, 6)}...`);
      setTransferFromAddr("");
      setTransferTo("");
      setTransferTokenId("");
      setModalOpen(null);
    } catch (error: any) {
      toast.error(`Transfer failed: ${error.message}`);
    }
  };

  const handleVote = async () => {
    if (!voteProposalId || isNaN(Number(voteProposalId))) return toast.error("Invalid proposal ID");
    const support = voteSupport.toLowerCase() === "true";
    try {
      await vote({
        address: contractAddress,
        abi: teamojiAbi,
        functionName: "vote",
        args: [BigInt(voteProposalId), support],
      });
      toast.success(`Voted on proposal ${voteProposalId}`);
      setVoteProposalId("");
      setVoteSupport("");
      setModalOpen(null);
    } catch (error: any) {
      toast.error(`Vote failed: ${error.message}`);
    }
  };

  const handleWithdraw = async () => {
    if (!isAddress(withdrawTo)) return toast.error("Invalid address");
    try {
      await withdraw({
        address: contractAddress,
        abi: teamojiAbi,
        functionName: "withdraw",
        args: [withdrawTo],
      });
      toast.success(`Withdrawn to ${withdrawTo.slice(0, 6)}...`);
      setWithdrawTo("");
      setModalOpen(null);
    } catch (error: any) {
      toast.error(`Withdraw failed: ${error.message}`);
    }
  };

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] pointer-events-none">
      <div className="bg-navy-900 rounded-lg p-6 max-w-md w-full border-2 border-lime-300 shadow-lg animate-fade-in pointer-events-auto">
        <button
          onClick={() => setModalOpen(null)}
          className="absolute top-3 right-3 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center shadow-md"
        >
          <span className="text-lg leading-none">×</span>
        </button>

        {modalOpen === "airdrop" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Airdrop NFT</h3>
            <AirdropConfig onSuccess={() => setModalOpen(null)} />
          </>
        )}
        {modalOpen === "mint" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Mint NFT</h3>
            <MintControl onSuccess={() => setModalOpen(null)} />
          </>
        )}
        {modalOpen === "setMintPrice" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Set Mint Price</h3>
            <MintControl onSuccess={() => setModalOpen(null)} />
          </>
        )}
        {modalOpen === "approve" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Approve Token</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label text-foreground">To Address</label>
                <Input
                  placeholder="0x..."
                  value={approveTo}
                  onChange={(e) => setApproveTo(e.target.value as `0x${string}`)}
                  className="bg-card text-foreground border-border rounded-lg pointer-events-auto"
                  disabled={false}
                />
              </div>
              <div className="form-group">
                <label className="form-label text-foreground">Token ID</label>
                <Input
                  placeholder="123"
                  value={approveTokenId}
                  onChange={(e) => setApproveTokenId(e.target.value)}
                  type="number"
                  className="bg-card text-foreground border-border rounded-lg pointer-events-auto"
                  disabled={false}
                />
              </div>
              <Button onClick={handleApprove} className="btn-primary w-full">
                Approve
              </Button>
            </div>
          </>
        )}
        {modalOpen === "endSeason" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">End Season</h3>
            <div className="space-y-4">
              <Button
                onClick={handleEndSeason}
                disabled={endSeasonLoading}
                className="btn-primary w-full bg-red-600 text-white hover:bg-red-700"
              >
                {endSeasonLoading ? "Ending..." : "End Season"}
              </Button>
            </div>
          </>
        )}
        {modalOpen === "fuse" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Fuse Tokens</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label text-foreground">Token ID 1</label>
                <Input
                  placeholder="123"
                  value={fuseTokenId1}
                  onChange={(e) => setFuseTokenId1(e.target.value)}
                  type="number"
                  className="bg-card text-foreground border-border rounded-lg pointer-events-auto"
                  disabled={false}
                />
              </div>
              <div className="form-group">
                <label className="form-label text-foreground">Token ID 2</label>
                <Input
                  placeholder="456"
                  value={fuseTokenId2}
                  onChange={(e) => setFuseTokenId2(e.target.value)}
                  type="number"
                  className="bg-card text-foreground border-border rounded-lg pointer-events-auto"
                  disabled={false}
                />
              </div>
              <Button onClick={handleFuse} className="btn-primary w-full">
                Fuse Tokens
              </Button>
            </div>
          </>
        )}
        {modalOpen === "grantRole" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Grant Role</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label text-foreground">Role Hash (0x...)</label>
                <Input
                  placeholder="0x..."
                  value={grantRoleRole}
                  onChange={(e) => setGrantRoleRole(e.target.value as `0x${string}`)}
                  className="bg-card text-foreground border-border rounded-lg pointer-events-auto"
                  disabled={false}
                />
              </div>
              <div className="form-group">
                <label className="form-label text-foreground">Account Address</label>
                <Input
                  placeholder="0x..."
                  value={grantRoleAccount}
                  onChange={(e) => setGrantRoleAccount(e.target.value as `0x${string}`)}
                  className="bg-card text-foreground border-border rounded-lg pointer-events-auto"
                  disabled={false}
                />
              </div>
              <Button onClick={handleGrantRole} className="btn-primary w-full">
                Grant Role
              </Button>
            </div>
          </>
        )}
        {modalOpen === "proposeVote" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Propose Vote</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label text-foreground">Description</label>
                <Input
                  placeholder="Proposal description"
                  value={proposeVoteDesc}
                  onChange={(e) => setProposeVoteDesc(e.target.value)}
                  className="bg-card text-foreground border-border rounded-lg pointer-events-auto"
                  disabled={false}
                />
              </div>
              <Button onClick={handleProposeVote} className="btn-primary w-full">
                Propose Vote
              </Button>
            </div>
          </>
        )}
        {modalOpen === "renounceRole" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Renounce Role</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label text-foreground">Role Hash (0x...)</label>
                <Input
                  placeholder="0x..."
                  value={renounceRoleRole}
                  onChange={(e) => setRenounceRoleRole(e.target.value as `0x${string}`)}
                  className="bg-card text-foreground border-border rounded-lg pointer-events-auto"
                  disabled={false}
                />
              </div>
              <div className="form-group">
                <label className="form-label text-foreground">Account Address</label>
                <Input
                  placeholder="0x..."
                  value={renounceRoleAccount}
                  onChange={(e) => setRenounceRoleAccount(e.target.value as `0x${string}`)}
                  className="bg-card text-foreground border-border rounded-lg pointer-events-auto"
                  disabled={false}
                />
              </div>
              <Button onClick={handleRenounceRole} className="btn-primary w-full">
                Renounce Role
              </Button>
            </div>
          </>
        )}
        {modalOpen === "revokeRole" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Revoke Role</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label text-foreground">Role Hash (0x...)</label>
                <Input
                  placeholder="0x..."
                  value={revokeRoleRole}
                  onChange={(e) => setRevokeRoleRole(e.target.value as `0x${string}`)}
                  className="bg-card text-foreground border-border rounded-lg pointer-events-auto"
                  disabled={false}
                />
              </div>
              <div className="form-group">
                <label className="form-label text-foreground">Account Address</label>
                <Input
                  placeholder="0x..."
                  value={revokeRoleAccount}
                  onChange={(e) => setRevokeRoleAccount(e.target.value as `0x${string}`)}
                  className="bg-card text-foreground border-border rounded-lg pointer-events-auto"
                  disabled={false}
                />
              </div>
              <Button onClick={handleRevokeRole} className="btn-primary w-full">
                Revoke Role
              </Button>
            </div>
          </>
        )}
        {modalOpen === "safeTransferFrom" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Safe Transfer From</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label text-foreground">From Address</label>
                <Input
                  placeholder="0x..."
                  value={safeTransferFromAddr}
                  onChange={(e) => setSafeTransferFromAddr(e.target.value as `0x${string}`)}
                  className="bg-card text-foreground border-border rounded-lg pointer-events-auto"
                  disabled={false}
                />
              </div>
              <div className="form-group">
                <label className="form-label text-foreground">To Address</label>
                <Input
                  placeholder="0x..."
                  value={safeTransferTo}
                  onChange={(e) => setSafeTransferTo(e.target.value as `0x${string}`)}
                  className="bg-card text-foreground border-border rounded-lg pointer-events-auto"
                  disabled={false}
                />
              </div>
              <div className="form-group">
                <label className="form-label text-foreground">Token ID</label>
                <Input
                  placeholder="123"
                  value={safeTransferTokenId}
                  onChange={(e) => setSafeTransferTokenId(e.target.value)}
                  type="number"
                  className="bg-card text-foreground border-border rounded-lg pointer-events-auto"
                  disabled={false}
                />
              </div>
              <div className="form-group">
                <label className="form-label text-foreground">Data (optional)</label>
                <Input
                  placeholder="0x..."
                  value={safeTransferData}
                  onChange={(e) => setSafeTransferData(e.target.value as `0x${string}`)}
                  className="bg-card text-foreground border-border rounded-lg pointer-events-auto"
                  disabled={false}
                />
              </div>
              <Button onClick={handleSafeTransferFrom} className="btn-primary w-full">
                Safe Transfer
              </Button>
            </div>
          </>
        )}
        {modalOpen === "setApprovalForAll" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Set Approval For All</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label text-foreground">Operator Address</label>
                <Input
                  placeholder="0x..."
                  value={setApprovalOperator}
                  onChange={(e) => setSetApprovalOperator(e.target.value as `0x${string}`)}
                  className="bg-card text-foreground border-border rounded-lg pointer-events-auto"
                  disabled={false}
                />
              </div>
              <div className="form-group">
                <label className="form-label text-foreground">Approved (true/false)</label>
                <Input
                  placeholder="true"
                  value={setApprovalApproved}
                  onChange={(e) => setSetApprovalApproved(e.target.value)}
                  className="bg-card text-foreground border-border rounded-lg pointer-events-auto"
                  disabled={false}
                />
              </div>
              <Button onClick={handleSetApprovalForAll} className="btn-primary w-full">
                Set Approval
              </Button>
            </div>
          </>
        )}
        {modalOpen === "startSeason" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Start Season</h3>
            <div className="space-y-4">
              <Button
                onClick={handleStartSeason}
                disabled={startSeasonLoading}
                className="btn-primary w-full"
              >
                {startSeasonLoading ? "Starting..." : "Start Season"}
              </Button>
            </div>
          </>
        )}
        {modalOpen === "transferFrom" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Transfer From</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label text-foreground">From Address</label>
                <Input
                  placeholder="0x..."
                  value={transferFromAddr}
                  onChange={(e) => setTransferFromAddr(e.target.value as `0x${string}`)}
                  className="bg-card text-foreground border-border rounded-lg pointer-events-auto"
                  disabled={false}
                />
              </div>
              <div className="form-group">
                <label className="form-label text-foreground">To Address</label>
                <Input
                  placeholder="0x..."
                  value={transferTo}
                  onChange={(e) => setTransferTo(e.target.value as `0x${string}`)}
                  className="bg-card text-foreground border-border rounded-lg pointer-events-auto"
                  disabled={false}
                />
              </div>
              <div className="form-group">
                <label className="form-label text-foreground">Token ID</label>
                <Input
                  placeholder="123"
                  value={transferTokenId}
                  onChange={(e) => setTransferTokenId(e.target.value)}
                  type="number"
                  className="bg-card text-foreground border-border rounded-lg pointer-events-auto"
                  disabled={false}
                />
              </div>
              <Button onClick={handleTransferFrom} className="btn-primary w-full">
                Transfer
              </Button>
            </div>
          </>
        )}
        {modalOpen === "vote" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Vote</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label text-foreground">Proposal ID</label>
                <Input
                  placeholder="123"
                  value={voteProposalId}
                  onChange={(e) => setVoteProposalId(e.target.value)}
                  type="number"
                  className="bg-card text-foreground border-border rounded-lg pointer-events-auto"
                  disabled={false}
                />
              </div>
              <div className="form-group">
                <label className="form-label text-foreground">Support (true/false)</label>
                <Input
                  placeholder="true"
                  value={voteSupport}
                  onChange={(e) => setVoteSupport(e.target.value)}
                  className="bg-card text-foreground border-border rounded-lg pointer-events-auto"
                  disabled={false}
                />
              </div>
              <Button onClick={handleVote} className="btn-primary w-full">
                Vote
              </Button>
            </div>
          </>
        )}
        {modalOpen === "withdraw" && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Withdraw</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label text-foreground">To Address</label>
                <Input
                  placeholder="0x..."
                  value={withdrawTo}
                  onChange={(e) => setWithdrawTo(e.target.value as `0x${string}`)}
                  className="bg-card text-foreground border-border rounded-lg pointer-events-auto"
                  disabled={false}
                />
              </div>
              <Button onClick={handleWithdraw} className="btn-primary w-full">
                Withdraw
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
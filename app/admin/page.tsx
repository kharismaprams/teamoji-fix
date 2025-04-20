"use client";

import { useState, useEffect, Fragment } from "react";
import { useAccount, useContractRead } from "wagmi";
import { toast } from "sonner";
import { teamojiAbi } from "@/lib/contract";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ContractStats from "@/components/admin/ContractStats";
import RoleManager from "@/components/admin/RoleManager";
import ProposalManager from "@/components/admin/ProposalManager";
import CollectionViewer from "@/components/admin/CollectionViewer";
import WriteFunctionModal from "@/components/admin/WriteFunctionModal";
import ReadFunctionModal from "@/components/admin/ReadFunctionModal";
import { DEFAULT_ADMIN_ROLE } from "@/lib/roles";
import { web3Modal } from "@/lib/web3modal-config"; // Tambah import web3Modal

const readFunctions = [
  { id: "AIRDROP_ROLE", name: "Airdrop Role" },
  { id: "balanceOf", name: "Balance Of" },
  { id: "DAO_ROLE", name: "DAO Role" },
  { id: "DEFAULT_ADMIN_ROLE", name: "Default Admin Role" },
  { id: "editionCounter", name: "Edition Counter" },
  { id: "FUSION_ROLE", name: "Fusion Role" },
  { id: "getApproved", name: "Get Approved" },
  { id: "getRoleAdmin", name: "Get Role Admin" },
  { id: "hasRole", name: "Has Role" },
  { id: "isApprovedForAll", name: "Is Approved For All" },
  { id: "mintCount", name: "Mint Count" },
  { id: "mintPrices", name: "Mint Prices" },
  { id: "name", name: "Name" },
  { id: "ownerOf", name: "Owner Of" },
  { id: "PRICE_ROLE", name: "Price Role" },
  { id: "seasonalActive", name: "Seasonal Active" },
  { id: "SEASONAL_ROLE", name: "Seasonal Role" },
  { id: "supportsInterface", name: "Supports Interface" },
  { id: "symbol", name: "Symbol" },
  { id: "tokenURI", name: "Token URI" },
];

const writeModalKeys = [
  "airdrop", "mint", "setMintPrice", "approve", "setApprovalForAll", "transferFrom",
  "safeTransferFrom", "fuse", "withdraw", "grantRole", "revokeRole", "renounceRole",
  "proposeVote", "vote", "startSeason", "endSeason"
];

export default function AdminDashboard() {
  const { address } = useAccount();
  const [modalOpen, setModalOpen] = useState<string | null>(null);
  const [showCollection, setShowCollection] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { data: isAdmin } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "hasRole",
    args: [DEFAULT_ADMIN_ROLE, address || "0x0000000000000000000000000000000000000000"],
    query: { enabled: !!address },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (!address) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground mb-4">
          Please connect your wallet to access the admin panel. 👻
        </p>
        <Button
          onClick={() => web3Modal.open()} // Tambah onClick handler
          className="text-sm sm:text-base px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-lime-400 text-navy-950 font-semibold hover:from-cyan-600 hover:to-lime-500 transition-all duration-300 shadow-lg shadow-cyan-400/50 hover:shadow-cyan-400/70"
        >
          🤖 NOT A PLAYZONE 🥷🏼
        </Button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-destructive mb-4">
          Opppss... ☠️ You do not have admin access. 🕵
        </p>
      </div>
    );
  }

  return (
    <Fragment>
      {/* Hero Section */}
      <div className="relative bg-navy-900 rounded-lg p-6 sm:p-8 mb-12 shadow-lg drop-shadow-neon animate-fade-in">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src="/emojis/emoji_crown_1.svg"
            alt="Admin Avatar"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-lime-300"
            onError={(e) => (e.currentTarget.src = "/emojis/placeholder.svg")}
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400">
              TEAMOJI Admin Dashboard🛠️
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              {address.slice(0, 6)}...{address.slice(-4)} | Admin Active
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <ContractStats />

      {/* Tabs */}
      <Tabs defaultValue="token-management" className="w-full mt-12">
        <TabsList className="grid grid-cols-2 sm:grid-cols-6 gap-2 bg-card p-1 rounded-lg">
          {["Token Management", "Role Management", "Governance", "Season", "Collection", "Read Functions"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab.toLowerCase().replace(" ", "-")}
              className="px-4 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="token-management" className="mt-6">
          <div className="card animate-slide-up">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Token Management</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {["airdrop", "mint", "setMintPrice", "approve", "setApprovalForAll", "transferFrom", "safeTransferFrom", "fuse", "withdraw"].map(id => (
                <Button
                  key={id}
                  onClick={() => setModalOpen(id)}
                  className="btn-primary w-full"
                >
                  {id.charAt(0).toUpperCase() + id.slice(1).replace(/([A-Z])/g, ' $1')}
                </Button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="role-management" className="mt-6">
          <RoleManager />
        </TabsContent>

        <TabsContent value="governance" className="mt-6">
          <ProposalManager setModalOpen={setModalOpen} />
        </TabsContent>

        <TabsContent value="season" className="mt-6">
          <div className="card animate-slide-up">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Season Management</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={() => setModalOpen("startSeason")}
                className="btn-primary w-full"
              >
                Start Season
              </Button>
              <Button
                onClick={() => setModalOpen("endSeason")}
                className="btn-primary w-full"
              >
                End Season
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="collection" className="mt-6">
          <CollectionViewer show={showCollection} setShow={setShowCollection} />
        </TabsContent>

        <TabsContent value="read-functions" className="mt-6">
          <div className="card animate-slide-up">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Read Functions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {readFunctions.map((func) => (
                <Button
                  key={func.id}
                  onClick={() => setModalOpen(func.id)}
                  className="btn-primary w-full"
                >
                  {func.name}
                </Button>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {modalOpen && writeModalKeys.includes(modalOpen) && (
        <WriteFunctionModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      {modalOpen && readFunctions.some(f => f.id === modalOpen) && (
        <ReadFunctionModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
    </Fragment>
  );
}
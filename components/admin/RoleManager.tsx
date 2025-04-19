"use client";

import { useState } from "react";
import { useWriteContract, useContractRead } from "wagmi";
import { toast } from "sonner";
import { teamojiAbi } from "@/lib/contract";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isAddress } from "viem";

// Interface untuk role
interface Role {
  name: string;
  hash: `0x${string}`; // Ubah tipe menjadi `0x${string}`
}

export default function RoleManager() {
  const [searchAddress, setSearchAddress] = useState<`0x${string}` | "">(""); // Tambah tipe
  const [selectedRole, setSelectedRole] = useState<`0x${string}` | "">(""); // Tambah tipe
  const { writeContract } = useWriteContract();

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

  const roles: Role[] = [
    { name: "Default Admin", hash: "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}` },
    { name: "Airdrop", hash: "0x3a2f235c9daaf33349d300aadff2f15078a89df81bcfdd45ba11c8f816bddc6f" as `0x${string}` },
    { name: "DAO", hash: "0x3b5d4cc60d3ec3516ee8ae083bd60934f6eb2a6c54b1229985c41bfb092b2603" as `0x${string}` },
    { name: "Fusion", hash: "0x0162673fc85f72b051e1428186e6dd466e6749dbeb311be16fe52c52aa87a678" as `0x${string}` },
    { name: "Price", hash: "0xd4656a873938c6a54143cf99a88af3386da566bdef9cba62b37bbb4b88969b2d" as `0x${string}` },
    { name: "Seasonal", hash: "0x591443068c3c8d65e4fdca989463f173ec47e69bbac35dcf2478ada6742c2ceb" as `0x${string}` },
  ];

  const adminAddresses: `0x${string}`[] = [
    "0xD21BE5C083ea4337B63b5BB939Ef0d5508feB3B3" as `0x${string}`,
    "0x6eDc1D1C5700c7BEAf771f88322caf65c0C0E3E3" as `0x${string}`,
  ];

  const roleStatus = adminAddresses.map((addr) => {
    const roleChecks = roles.map((role) => {
      const { data: hasRole } = useContractRead({
        address: contractAddress,
        abi: teamojiAbi,
        functionName: "hasRole",
        args: [role.hash, addr],
      });
      return { role: role.name, hasRole };
    });
    const activeRoles = roleChecks
      .filter((r) => r.hasRole === true)
      .map((r) => r.role)
      .join(", ");
    return {
      address: addr,
      roles: activeRoles || "None",
    };
  });

  const handleGrantRole = async () => {
    if (!selectedRole) return toast.error("Please select a role");
    if (!isAddress(searchAddress)) return toast.error("Invalid address");
    try {
      await writeContract({
        address: contractAddress,
        abi: teamojiAbi,
        functionName: "grantRole",
        args: [selectedRole, searchAddress],
      });
      const roleName = roles.find((r) => r.hash === selectedRole)?.name;
      toast.success(`Role ${roleName} granted to ${searchAddress.slice(0, 6)}...`);
      setSelectedRole("");
      setSearchAddress("");
    } catch (error: any) {
      toast.error(`Grant role failed: ${error.message}`);
    }
  };

  const handleRevokeRole = async () => {
    if (!selectedRole) return toast.error("Please select a role");
    if (!isAddress(searchAddress)) return toast.error("Invalid address");
    try {
      await writeContract({
        address: contractAddress,
        abi: teamojiAbi,
        functionName: "revokeRole",
        args: [selectedRole, searchAddress],
      });
      const roleName = roles.find((r) => r.hash === selectedRole)?.name;
      toast.success(`Role ${roleName} revoked from ${searchAddress.slice(0, 6)}...`);
      setSelectedRole("");
      setSearchAddress("");
    } catch (error: any) {
      toast.error(`Revoke role failed: ${error.message}`);
    }
  };

  const handleRenounceRole = async () => {
    if (!selectedRole) return toast.error("Please select a role");
    if (!isAddress(searchAddress)) return toast.error("Invalid address");
    try {
      await writeContract({
        address: contractAddress,
        abi: teamojiAbi,
        functionName: "renounceRole",
        args: [selectedRole, searchAddress],
      });
      const roleName = roles.find((r) => r.hash === selectedRole)?.name;
      toast.success(`Role ${roleName} renounced for ${searchAddress.slice(0, 6)}...`);
      setSelectedRole("");
      setSearchAddress("");
    } catch (error: any) {
      toast.error(`Renounce role failed: ${error.message}`);
    }
  };

  return (
    <div className="card animate-slide-up">
      <h3 className="text-xl font-semibold mb-4 text-foreground">Role Management</h3>
      <div className="space-y-4">
        <div className="form-group">
          <label className="form-label text-foreground">Role</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as `0x${string}`)} // Tambah tipe
            className="w-full rounded-md border border-border bg-card text-foreground px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role.hash} value={role.hash}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label text-foreground">Address</label>
          <Input
            placeholder="0x..."
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value as `0x${string}`)} // Tambah tipe
            className="bg-card text-foreground border-border rounded-lg"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button onClick={handleGrantRole} className="btn-primary w-full">
            Grant Role
          </Button>
          <Button onClick={handleRevokeRole} className="btn-primary w-full">
            Revoke Role
          </Button>
          <Button onClick={handleRenounceRole} className="btn-primary w-full">
            Renounce Role
          </Button>
        </div>
        <div className="mt-6">
          <h4 className="text-lg font-medium text-foreground mb-4">Role Status</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-foreground">
              <thead className="text-xs uppercase bg-card border-b border-border">
                <tr>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">Roles</th>
                </tr>
              </thead>
              <tbody>
                {roleStatus.map((status, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="px-4 py-2">{status.address.slice(0, 6)}...{status.address.slice(-4)}</td>
                    <td className="px-4 py-2">{status.roles}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
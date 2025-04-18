"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useContractRead } from "wagmi";
import { teamojiAbi } from "@/lib/contract";
import { toast } from "sonner";

export function RoleGuard({
  role,
  children,
}: {
  role: string;
  children: React.ReactNode;
}) {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  const { data: hasRole, isLoading } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "hasRole",
    args: [role, address || "0x0000000000000000000000000000000000000000"],
  });

  useEffect(() => {
    if (!isConnected) {
      toast.error("Please connect your wallet");
      router.push("/");
    } else if (!isLoading && !hasRole) {
      toast.error("You do not have the required role");
      router.push("/");
    }
  }, [isConnected, hasRole, isLoading, router]);

  if (isLoading || !isConnected || !hasRole) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
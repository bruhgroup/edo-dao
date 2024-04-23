"use client";

import { useReadContract } from "wagmi";
import { classdaoAbi } from "@/lib/abi/CLASSDAO.abi";

export function ProposalsList() {
  const data = useReadContract({
    abi: classdaoAbi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    functionName: "PROPOSALS",
  });

  return <></>;
}

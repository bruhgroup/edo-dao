"use client";

import { useAccount, useReadContract } from "wagmi";
import { classdaoAbi } from "@/lib/abi/CLASSDAO.abi";
import { useEffect, useState } from "react";

export function TokensAmount() {
  const account = useAccount();
  const [balance, setBalance] = useState<number>(0);

  const { data } = useReadContract({
    abi: classdaoAbi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    functionName: "balanceOf",
    args: [account?.address || "0x0"],
  });

  // This is required to re-render the state once address has loaded.
  useEffect(() => {
    setBalance(Number(data));
  }, [data]);

  return <>{balance}</>;
}

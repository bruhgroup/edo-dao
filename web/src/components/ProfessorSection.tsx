"use client";

import { useAccount, useReadContract } from "wagmi";
import { classdaoAbi } from "@/lib/abi/CLASSDAO.abi";

export function ProfessorSection() {
  const { address } = useAccount();

  const { data: professorAddress } = useReadContract({
    abi: classdaoAbi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    functionName: "PROFESSOR",
  });

  return (
    <div className={"grid row-span-full justify-center text-white"}>
      {address == professorAddress ? (
        <h1 className={"text-2xl text-center italic"}>
          Your are currently viewing your own class
        </h1>
      ) : (
        <>
          <h1 className={"text-2xl text-center"}>Your Professor</h1>
          <p>{professorAddress}</p>
        </>
      )}
    </div>
  );
}

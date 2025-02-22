"use client";

import ConnectButton from "@/components/ConnectButton";
import { ProfessorSection } from "@/components/ProfessorSection";
import { useAccount, useReadContracts } from "wagmi";
import { contractConfig } from "@/lib/wagmiConfig";
import { useEffect, useState } from "react";
import { eth_address } from "@/lib/types";
import { Proposals } from "@/components/proposals/Proposals";
import { Evaluations } from "@/components/evaluations/Evaluations";

export default function Home() {
  const { address } = useAccount();

  const { data, refetch } = useReadContracts({
    contracts: [
      { ...contractConfig, functionName: "professor" },
      { ...contractConfig, functionName: "balanceOf", args: [address!] },
      { ...contractConfig, functionName: "verifiedStudents", args: [address!] },
      { ...contractConfig, functionName: "totalCourseEvaluations" },
      { ...contractConfig, functionName: "totalProposals" },
    ],
  });

  const [professorAddress, setProfessorAddress] = useState<eth_address>();
  const [tokensAmount, setTokensAmount] = useState<number>(0);
  const [verifiedStudent, setVerifiedStudent] = useState<boolean>(false);
  const [totalCourseEvaluations, setTotalCourseEvaluations] =
    useState<number>(0);
  const [totalProposals, setTotalProposals] = useState<number>(0);

  useEffect(() => {
    if (!data) return;
    setProfessorAddress(data[0].result);
    setTokensAmount(Number(data[1].result) || 0);
    setVerifiedStudent(data[2]?.result ?? false);
    setTotalCourseEvaluations(Number(data[3].result) || 0);
    setTotalProposals(Number(data[4].result) || 0);
  }, [data]);

  console.log("globals", {
    professorAddress,
    tokensAmount,
    verifiedStudent,
    totalCourseEvaluations,
    totalProposals,
  });

  return (
    <div className={"grid row-span-full gap-3"}>
      <div className={"p-5 bg-slate-800 rounded-2xl"}>
        <div
          className={"grid row-span-full justify-items-center text-white gap-3"}
        >
          <ConnectButton />
          <p>You currently have {tokensAmount} $CLK to spend</p>
        </div>
      </div>
      <div className={"p-5 bg-slate-800 rounded-2xl"}>
        <div
          className={"grid row-span-full justify-items-center text-white gap-3"}
        >
          <ProfessorSection
            address={address}
            professorAddress={professorAddress}
          />
        </div>
      </div>
      <div className={"p-5 bg-slate-800 rounded-2xl"}>
        <div
          className={"grid row-span-full justify-items-center text-white gap-3"}
        >
          <h1 className={"text-white text-2xl"}>
            Professor Improvement Proposals (PIPs)
          </h1>
          <Proposals
            address={address}
            professorAddress={professorAddress}
            tokens={tokensAmount}
            refetch={() => refetch()}
            totalProposals={totalProposals}
          />
        </div>
      </div>
      <div className={"p-5 bg-slate-800 rounded-2xl"}>
        <div
          className={"grid row-span-full justify-items-center text-white gap-3"}
        >
          <h1 className={"text-white text-2xl"}>
            Course Evaluation via zkproofs
          </h1>
          <Evaluations
            verifiedStudent={verifiedStudent}
            refetch={() => refetch()}
            totalCourseEvaluations={totalCourseEvaluations}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import ConnectButton from "@/components/ConnectButton";
import { ProposalsList } from "@/components/proposals/ProposalsList";
import { ProfessorSection } from "@/components/ProfessorSection";
import { SubmitProposal } from "@/components/proposals/SubmitProposal";
import { useAccount, useReadContracts } from "wagmi";
import { contractConfig } from "@/lib/wagmiConfig";
import { useEffect, useState } from "react";
import { eth_address } from "@/lib/types";
import { Proposals } from "@/components/proposals/Proposals";

export default function Home() {
  const { address } = useAccount();

  const { data } = useReadContracts({
    contracts: [
      { ...contractConfig, functionName: "PROFESSOR" },
      { ...contractConfig, functionName: "balanceOf", args: [address!] },
    ],
  });

  const [professorAddress, setProfessorAddress] = useState<eth_address>();
  const [tokensAmount, setTokensAmount] = useState<number>(0);

  useEffect(() => {
    if (!data) return;
    setProfessorAddress(data[0].result);
    setTokensAmount(Number(data[1].result));
  }, [data]);

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
          <Proposals address={address} professorAddress={professorAddress} />
        </div>
      </div>
      <div className={"p-5 bg-slate-800 rounded-2xl flex justify-center"}>
        <h1 className={"text-white text-2xl"}>
          Course Evaluation via zkproofs
        </h1>
      </div>
    </div>
  );
}

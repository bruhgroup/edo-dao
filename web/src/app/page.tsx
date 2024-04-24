import ConnectButton from "@/components/ConnectButton";
import { ProposalsList } from "@/components/proposals/ProposalsList";
import { ProfessorSection } from "@/components/ProfessorSection";
import { TokensAmount } from "@/components/TokensAmount";
import { SubmitProposal } from "@/components/proposals/SubmitProposal";

export default function Home() {
  return (
    <div className={"grid row-span-full gap-3"}>
      <div className={"p-5 bg-slate-800 rounded-2xl"}>
        <div
          className={"grid row-span-full justify-items-center text-white gap-3"}
        >
          <ConnectButton />
          <p>
            You currently have <TokensAmount /> $CLK to spend
          </p>
        </div>
      </div>
      <div className={"p-5 bg-slate-800 rounded-2xl"}>
        <div
          className={"grid row-span-full justify-items-center text-white gap-3"}
        >
          <ProfessorSection />
        </div>
      </div>
      <div className={"p-5 bg-slate-800 rounded-2xl"}>
        <div
          className={"grid row-span-full justify-items-center text-white gap-3"}
        >
          <h1 className={"text-white text-2xl"}>
            Professor Improvement Proposals (PIPs)
          </h1>
          <ProposalsList />
          <SubmitProposal />
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

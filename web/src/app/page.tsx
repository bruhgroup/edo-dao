import ConnectButton from "@/components/ConnectButton";
import { ProposalsList } from "@/components/proposals/ProposalsList";
import { ProfessorSection } from "@/components/ProfessorSection";

export default function Home() {
  return (
    <div className={"grid row-span-full gap-3"}>
      <div className={"p-5 bg-slate-800 rounded-2xl flex justify-center"}>
        <ConnectButton />
      </div>
      <div className={"p-5 bg-slate-800 rounded-2xl"}>
        <ProfessorSection />
      </div>
      <div className={"p-5 bg-slate-800 rounded-2xl flex justify-center"}>
        <h1 className={"text-white text-2xl"}>
          Professor Improvement Proposals (PIPs)
        </h1>
        <ProposalsList />
      </div>
      <div className={"p-5 bg-slate-800 rounded-2xl flex justify-center"}>
        <h1 className={"text-white text-2xl"}>
          Course Evaluation via zkproofs
        </h1>
      </div>
    </div>
  );
}

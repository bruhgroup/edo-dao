import contract from "@/lib/blockchain";
import { ethers } from "ethers";
import BarGraph from "@/components/BarGraph";

export default async function Home({
  params,
}: {
  params: { proposal: string };
}) {
  let resolvedContract = await contract;
  let proposalInterface = new ethers.Interface([
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "proposals",
      outputs: [
        {
          internalType: "string",
          name: "description",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "votesFor",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "votesAgainst",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ]);
  let proposals = await resolvedContract.proposals(params.proposal);
  console.log(proposals);
  return (
    <BarGraph
      labels={["Votes For", "Votes Against"]}
      data={[ethers.getNumber(proposals[1]), ethers.getNumber(proposals[2])]}
    ></BarGraph>
  );
}

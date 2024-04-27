"use client";

import { useInfiniteReadContracts } from "wagmi";
import { contractConfig } from "@/lib/wagmiConfig";
import { SubmitProposal } from "@/components/proposals/SubmitProposal";
import { ProposalsList } from "@/components/proposals/ProposalsList";
import { eth_address } from "@/lib/types";

export function Proposals({
  address,
  professorAddress,
}: {
  address: eth_address;
  professorAddress: eth_address;
}) {
  const proposalsPerPage = 5;

  const proposals = useInfiniteReadContracts({
    cacheKey: "proposals-list",
    contracts(pageParam) {
      return [...new Array(proposalsPerPage)].map(
        (_, i) =>
          ({
            ...contractConfig,
            functionName: "PROPOSALS",
            args: [BigInt(pageParam + i)],
          }) as const,
      );
    },
    query: {
      initialPageParam: 0,
      getNextPageParam(_lastPage, _allPages, lastPageParam) {
        return lastPageParam + proposalsPerPage;
      },
    },
  });

  if (proposals.isLoading) return <>Loading...</>;

  return (
    <>
      <ProposalsList proposals={proposals} />
      {address && professorAddress && address !== professorAddress && (
        <SubmitProposal proposals={proposals} />
      )}
    </>
  );
}

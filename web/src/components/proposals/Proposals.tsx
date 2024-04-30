"use client";

import { useInfiniteReadContracts } from "wagmi";
import { contractConfig } from "@/lib/wagmiConfig";
import { SubmitProposal } from "@/components/proposals/SubmitProposal";
import { ProposalsList } from "@/components/proposals/ProposalsList";
import { eth_address } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadMorePagesButton } from "@/components/LoadMorePagesButton";

export function Proposals({
  address,
  professorAddress,
  tokens,
  refetch,
  totalProposals,
}: {
  address: eth_address;
  professorAddress: eth_address;
  tokens: number;
  refetch: () => void;
  totalProposals: number;
}) {
  const proposalsPerPage = 5;

  const proposals = useInfiniteReadContracts({
    cacheKey: "proposals-list",
    contracts(pageParam) {
      return [...new Array(proposalsPerPage)].map(
        (_, i) =>
          ({
            ...contractConfig,
            functionName: "proposals",
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

  if (proposals.isLoading) return <Skeleton className={"h-[250px] w-full"} />;

  console.log("proposals", { proposals });

  return (
    <>
      <ProposalsList proposals={proposals} refetch={() => refetch()} />
      <LoadMorePagesButton
        infiniteQueryResult={proposals}
        totalResults={totalProposals}
      />
      {address && professorAddress && address !== professorAddress && (
        <SubmitProposal
          proposals={proposals}
          hasEnoughTokens={tokens > 0}
          refetch={() => refetch()}
        />
      )}
    </>
  );
}

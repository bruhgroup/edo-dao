"use client";

import { useInfiniteReadContracts, useReadContract } from "wagmi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { contractConfig } from "@/lib/wagmiConfig";
import { hash } from "ohash";

export function ProposalsList() {
  // TODO: https://wagmi.sh/react/api/hooks/useInfiniteReadContracts

  const proposalsPerPage = 5;

  // const { data: totalProposals } = useReadContract({
  //   ...contractConfig,
  //   functionName: "totalProposals",
  // });

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
    <Table>
      <TableCaption>A list of recent proposals.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Title</TableHead>
          <TableHead className="">Description</TableHead>
          <TableHead className="">Votes For</TableHead>
          <TableHead className="">Votes Against</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {// @ts-ignore
        proposals.data?.pages
          .flatMap((p: any[]) => p)
          .filter((p: Record<string, any>) => p.status == "success")
          .map((p: Record<string, any>, pi: number) => (
            <TableRow key={pi}>
              {p.result.map((r: any, ri: number) => {
                if (typeof r == "bigint") r = Number(r);
                return <TableCell key={hash(r + ri)}>{r}</TableCell>;
              })}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

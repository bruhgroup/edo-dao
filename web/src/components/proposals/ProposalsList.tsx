"use client";

import {
  useInfiniteReadContracts,
  useReadContract,
  useWriteContract,
} from "wagmi";
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
import { ArrowDownIcon, ArrowUpIcon, PieChartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import BarGraph from "@/components/BarGraph";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { toast } from "@/components/ui/use-toast";

export function ProposalsList() {
  // TODO: https://wagmi.sh/react/api/hooks/useInfiniteReadContracts

  const { data: txnhash, writeContractAsync } = useWriteContract();

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

  function onClick({
    index,
    amount,
    vote,
  }: {
    index: number;
    amount: number;
    vote: boolean;
  }) {
    toast({
      title: "Voted for a proposal!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            You have voted {vote ? "FOR" : "AGAINST"} proposal #{index}
          </code>
        </pre>
      ),
    });

    writeContractAsync({
      ...contractConfig,
      functionName: "voteProposal",
      args: [BigInt(index), BigInt(amount), vote],
    }).then(() => proposals.refetch());
  }

  return (
    <Table>
      <TableCaption>A list of recent proposals.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className={"w-[250px]"}>Title</TableHead>
          <TableHead className={"w-[750px]"}>Description</TableHead>
          <TableHead>For</TableHead>
          <TableHead>Against</TableHead>
          <TableHead>Vote</TableHead>
          <TableHead>Chart</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {// @ts-ignore
        proposals.data?.pages
          .flatMap((p: any[]) => p)
          .filter((p: Record<string, any>) => p.status == "success")
          .map((p: Record<string, any>, pi: number) => (
            <TableRow key={pi}>
              <TableCell key={hash(pi + "title")}>{p.result[0]}</TableCell>
              <TableCell key={hash(pi + "desc")}>{p.result[1]}</TableCell>
              <TableCell key={hash(pi + "for")}>
                {Number(p.result[2]) ?? 0}
              </TableCell>
              <TableCell key={hash(pi + "against")}>
                {Number(p.result[3]) ?? 0}
              </TableCell>
              <TableCell
                key={hash(pi + "vote")}
                className={"flex flex-row gap-1"}
              >
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={() => onClick({ index: pi, amount: 1, vote: true })}
                >
                  <ArrowUpIcon />
                </Button>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={() => onClick({ index: pi, amount: 1, vote: false })}
                >
                  <ArrowDownIcon />
                </Button>
              </TableCell>
              <TableCell key={hash(pi + "chart")}>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant={"ghost"} size={"icon"}>
                      <PieChartIcon />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full">
                      <DrawerHeader className={"justify-items-center gap-3"}>
                        <DrawerTitle>{p.result[0]}</DrawerTitle>
                        <DrawerDescription>{p.result[1]}</DrawerDescription>
                      </DrawerHeader>
                      <div className="p-5">
                        <BarGraph
                          labels={["Votes For", "Votes Against"]}
                          data={[
                            Number(p.result[2]) ?? 0,
                            Number(p.result[3]) ?? 0,
                          ]}
                        />
                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

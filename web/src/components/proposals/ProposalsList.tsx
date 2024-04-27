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
              {p.result.map((r: any, ri: number) => {
                if (typeof r == "bigint") r = Number(r);
                return <TableCell key={hash(r + ri)}>{r}</TableCell>;
              })}
              <TableCell
                key={hash(pi + "vote")}
                className={"flex flex-row gap-1"}
              >
                <Button variant={"ghost"} size={"icon"}>
                  <ArrowUpIcon />
                </Button>
                <Button variant={"ghost"} size={"icon"}>
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

"use client";

import { useReadContract } from "wagmi";
import { classdaoAbi } from "@/lib/abi/CLASSDAO.abi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export function ProposalsList() {
  // TODO: https://wagmi.sh/react/api/hooks/useInfiniteReadContracts
  // TODO: A method to get length of proposals, then we need to go through each key.
  // TODO: A method to get the creator of the proposal.

  const { data } = useReadContract({
    abi: classdaoAbi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    functionName: "PROPOSALS",
    args: [0],
  });

  return (
    <Table>
      <TableCaption>A list of recent proposals.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Proposal</TableHead>
          <TableHead className="">Votes For</TableHead>
          <TableHead className="">Votes Against</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{data[0]}</TableCell>
          <TableCell>{Number(data[1])}</TableCell>
          <TableCell>{Number(data[2])}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

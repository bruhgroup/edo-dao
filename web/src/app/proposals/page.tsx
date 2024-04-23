import contract from "@/lib/blockchain";
import { ethers } from "ethers";
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

export default async function Home() {
  let resolvedContract = await contract;
  const eventAbi = [
    "event PROPOSAL_SUBMITTED(uint indexed index, address author, string description)",
  ];
  let events = await resolvedContract.queryFilter("PROPOSAL_SUBMITTED", 0);
  let iface = new ethers.Interface(eventAbi);
  return (
    <Table>
      <TableCaption>A list of recent proposals.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Proposal</TableHead>
          <TableHead className="">Author</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((log, index) => {
          return (
            <TableRow key={index}>
              <TableCell key={index}>
                <Link href={`/proposals/${index}`}>
                  Proposal: {iface.parseLog(log)?.args[2]}{" "}
                </Link>
              </TableCell>
              <TableCell key={index}>
                By: {iface.parseLog(log)?.args[1]}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

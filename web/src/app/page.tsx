import Image from "next/image";
import contract from "@/lib/blockchain";
import {AbiCoder, Contract, decodeBytes32String, ethers} from 'ethers'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
export default async function Home() {
  let a = await contract;
  const eventAbi = ["event PROPOSAL_SUBMITTED(uint indexed index, address author, string description)"]
  let events =  await a.queryFilter("PROPOSAL_SUBMITTED", 0);
  let iface = new ethers.Interface(eventAbi);
  console.log("Start here");
  console.log(a.proposals());
  console.log(events[0]);
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
            {events.map((log, index)=> {
              return <TableRow key={index}>
                <TableCell key={index}>Proposal: {iface.parseLog(log)?.args[2]}</TableCell>
                <TableCell key={index}>By: {iface.parseLog(log)?.args[1]}</TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table>
  );
}

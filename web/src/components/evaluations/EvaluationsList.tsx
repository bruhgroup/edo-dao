import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { hash } from "ohash";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";

export function EvaluationsList({
  evaluations,
}: {
  evaluations: InfiniteQueryObserverResult;
}) {
  return (
    <Table>
      <TableCaption>A list of recent course feedback.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Feedback</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {// @ts-ignore
        evaluations.data?.pages
          .flatMap((p: any[]) => p)
          .filter((p: Record<string, any>) => p.status == "success")
          .map((p: Record<string, any>, pi: number) => (
            <TableRow key={pi}>
              <TableCell key={hash(pi + "desc")}>{p.result}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

import { useInfiniteReadContracts } from "wagmi";
import { contractConfig } from "@/lib/wagmiConfig";
import { EvaluationsList } from "@/components/evaluations/EvaluationsList";
import { StudentValidation } from "@/components/StudentValidation";
import { SubmitEvaluation } from "@/components/evaluations/SubmitEvaluation";
import { BadgeCheckIcon, BadgeXIcon } from "lucide-react";

export function Evaluations({
  verifiedStudent,
  refetch,
}: {
  verifiedStudent: boolean;
  refetch: () => void;
}) {
  const evaluationsPerPage = 5;

  const evaluations = useInfiniteReadContracts({
    cacheKey: "evaluations-list",
    contracts(pageParam) {
      return [...new Array(evaluationsPerPage)].map(
        (_, i) =>
          ({
            ...contractConfig,
            functionName: "evaluations",
            args: [BigInt(pageParam + i)],
          }) as const,
      );
    },
    query: {
      initialPageParam: 0,
      getNextPageParam(_lastPage, _allPages, lastPageParam) {
        return lastPageParam + evaluationsPerPage;
      },
    },
  });

  if (evaluations.isLoading) return <>Loading...</>;

  console.log("evaluations", { verifiedStudent, evaluations });

  return (
    <>
      <span className={"inline-flex gap-2"}>
        Verified Student{" "}
        {verifiedStudent ? (
          <BadgeCheckIcon color={"lightgreen"} />
        ) : (
          <BadgeXIcon color={"tomato"} />
        )}
      </span>
      <EvaluationsList evaluations={evaluations} />
      {verifiedStudent ? (
        <SubmitEvaluation evaluations={evaluations} />
      ) : (
        <StudentValidation status={verifiedStudent} refetch={() => refetch()} />
      )}
    </>
  );
}

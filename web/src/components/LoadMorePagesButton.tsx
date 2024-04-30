import { InfiniteQueryObserverResult } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function LoadMorePagesButton({
  infiniteQueryResult,
  totalResults,
}: {
  infiniteQueryResult: InfiniteQueryObserverResult;
  totalResults: number;
}) {
  // @ts-ignore
  const numLoadedPages = Math.max(...infiniteQueryResult?.data?.pageParams) + 5;

  return (
    <Button
      variant={"ghost"}
      onClick={() => infiniteQueryResult.fetchNextPage()}
      disabled={
        infiniteQueryResult.isFetchingNextPage || numLoadedPages > totalResults
      }
    >
      <ChevronRight />
      Load more (+5 entries)
    </Button>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useWriteContract } from "wagmi";
import { useState } from "react";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";
import { contractConfig } from "@/lib/wagmiConfig";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  title: z.string().min(8),
  description: z.string().min(8),
});

export function SubmitProposal({
  proposals,
  hasEnoughTokens,
  refetch,
}: {
  proposals: InfiniteQueryObserverResult;
  hasEnoughTokens: boolean;
  refetch: () => void;
}) {
  // TODO: https://wagmi.sh/react/guides/write-to-contract
  const { data: hash, writeContractAsync } = useWriteContract();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);

    writeContractAsync({
      ...contractConfig,
      functionName: "submitProposal",
      args: [data.title, data.description],
    }).then(() => {
      toast({
        title: "Submitted a new proposal!",
      });

      setLoading(false);
      proposals.refetch();
      refetch();
      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  className="text-black"
                  placeholder="Add a title"
                  {...field}
                />
              </FormControl>
              <FormDescription>A title for your proposal.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="text-black"
                  placeholder="Add a description"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A description of what you want this proposal to achieve.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={loading || !hasEnoughTokens}
          className={"w-full"}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Submit"
          )}
        </Button>
        {!hasEnoughTokens && (
          <div>You do not have enough tokens! 10 $CLK per proposal.</div>
        )}
        {hash && <div>Transaction Hash: {hash}</div>}
      </form>
    </Form>
  );
}

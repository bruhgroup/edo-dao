"use client";

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
import { Skeleton } from "@/components/ui/skeleton";
import { contractConfig } from "@/lib/wagmiConfig";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  feedback: z.string().min(8),
});

export function SubmitEvaluation({
  evaluations,
}: {
  evaluations: InfiniteQueryObserverResult;
}) {
  // TODO: https://wagmi.sh/react/guides/write-to-contract
  const { data: hash, writeContractAsync } = useWriteContract();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      feedback: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);

    writeContractAsync({
      ...contractConfig,
      functionName: "submitCourseEvaluation",
      args: [data.feedback],
    }).then(() => {
      toast({
        title: "Submitted a course evaluation!",
      });

      setLoading(false);
      evaluations.refetch();
      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 grid row-span-2 justify-center"
      >
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feedback</FormLabel>
              <FormControl>
                <Textarea
                  className="text-black"
                  placeholder="Add feedback"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Any feedback submitted into this form is kept anonymous. Your
                student status has been verified by a zero-knowledge proof.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? (
            <div className={"inline-flex gap-1 items-center"}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </div>
          ) : (
            "Submit"
          )}
        </Button>
        {hash && <div>Transaction Hash: {hash}</div>}
      </form>
    </Form>
  );
}

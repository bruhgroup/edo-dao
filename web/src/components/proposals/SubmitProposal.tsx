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
import { classdaoAbi } from "@/lib/abi/CLASSDAO.abi";
import { useWriteContract } from "wagmi";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";
import { contractConfig } from "@/lib/wagmiConfig";

const FormSchema = z.object({
  title: z.string().min(8),
  description: z.string().min(8),
});

export function SubmitProposal({
  proposals,
}: {
  proposals: InfiniteQueryObserverResult;
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
              <FormDescription>
                A description of what you want this proposal to achieve.
              </FormDescription>
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
                <Input
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
        <Button type="submit" disabled={loading}>
          {loading ? <Skeleton>Submit</Skeleton> : "Submit"}
        </Button>
        {hash && <div>Transaction Hash: {hash}</div>}
      </form>
    </Form>
  );
}

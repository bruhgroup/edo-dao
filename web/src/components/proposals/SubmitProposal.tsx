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

const FormSchema = z.object({
  description: z.string().min(8, {
    message: "Description must be at least 8 characters.",
  }),
});

export function SubmitProposal() {
  // TODO: https://wagmi.sh/react/guides/write-to-contract
  const { data: hash, writeContract } = useWriteContract();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: classdaoAbi,
      functionName: "submitProposal",
      args: [data.description],
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  className="text-black"
                  placeholder="Weekly pizza parties"
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
        <Button type="submit">Submit</Button>
        {hash && <div>Transaction Hash: {hash}</div>}
      </form>
    </Form>
  );
}

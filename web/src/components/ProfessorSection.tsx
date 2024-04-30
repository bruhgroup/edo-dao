"use client";

import { useWriteContract } from "wagmi";
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
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { contractConfig } from "@/lib/wagmiConfig";
import type { eth_address } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  student: z.string().startsWith("0x").min(8),
  amount: z.coerce.number().int().min(1).max(Number.MAX_SAFE_INTEGER),
});

export function ProfessorSection({
  address,
  professorAddress,
}: {
  address: eth_address;
  professorAddress: eth_address;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const { data: hash, writeContractAsync } = useWriteContract();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      student: "",
      amount: 0,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    writeContractAsync({
      ...contractConfig,
      functionName: "awardTokens",
      args: [data.student, BigInt(data.amount)],
    }).then(() => {
      toast({
        title: `Awarded student with ${data.amount} tokens.`,
        description: `Student: ${data.student}`,
      });
      setLoading(false);
      form.reset();
    });
  }

  if (address == professorAddress) {
    return (
      <>
        <h1 className={"text-2xl text-center italic"}>
          Your are currently viewing your own class
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="student"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Address</FormLabel>
                  <FormControl>
                    <Input
                      className={"text-black"}
                      placeholder="0x..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Address of student to award $CLK to.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reward Amount</FormLabel>
                  <FormControl>
                    <Input
                      className={"text-black"}
                      type="number"
                      step={1}
                      placeholder="10"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Amount of $CLK to award student.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className={"w-full"}>
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
      </>
    );
  }

  return (
    <>
      <h1 className={"text-2xl text-center"}>Your Professor</h1>
      {professorAddress ? (
        <p>{professorAddress}</p>
      ) : (
        <Skeleton className={"w-1/2 h-[20px]"} />
      )}
    </>
  );
}

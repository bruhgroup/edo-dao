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
import { toast } from "@/components/ui/use-toast";
import { useWriteContract } from "wagmi";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { contractConfig } from "@/lib/wagmiConfig";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { generateZkProof } from "@/lib/generateZkProof";

const FormSchema = z.object({
  code: z.string().min(12).max(12),
});

export function StudentValidation({
  status,
  refetch,
}: {
  status: boolean;
  refetch: () => void;
}) {
  const { data: hash, writeContractAsync } = useWriteContract();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);

    // Generate proof
    const chunks = [...(data.code.match(/.{1,3}/g) || [])];
    const proof = await generateZkProof(chunks);

    if (proof == null) {
      toast({
        title: "An error occurred while generating proof.",
        description: "Most likely, the proof could not be verified.",
      });
      setLoading(false);
      return;
    }

    writeContractAsync({
      ...contractConfig,
      functionName: "verifyStudent",
      args: [proof.a, proof.b, proof.c, proof.publicSignals],
    }).then(() => {
      toast({
        title: "Verified",
      });

      setLoading(false);
      refetch();
      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Verification Code</FormLabel>
              <FormControl>
                <InputOTP maxLength={12} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={6} />
                    <InputOTPSlot index={7} />
                    <InputOTPSlot index={8} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={9} />
                    <InputOTPSlot index={10} />
                    <InputOTPSlot index={11} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the student verification code that you received
                from your professor
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? <Skeleton>Submit</Skeleton> : "Submit"}
        </Button>
        {hash && <div>Transaction Hash: {hash}</div>}{" "}
      </form>
    </Form>
  );
}

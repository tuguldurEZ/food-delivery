import React, { Dispatch, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { SignUp } from "@/lib/auth/sign-up";

interface SecondStepProps {
  setCurrentStep: Dispatch<number>;
  currentStep: number;
  email: string;
}

const SecondStep: React.FC<SecondStepProps> = ({
  setCurrentStep,
  currentStep,
  email,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const formSchema = z
    .object({
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .refine((password) => /[0-9]/.test(password), {
          message: "Password must include at least one number.",
        }),
      confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords do not match.",
      path: ["confirm"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await SignUp({ email, password: values.password });
      router.push("/auth/sign-in");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col gap-6 ">
      <Button
        size="icon"
        variant="outline"
        onClick={() => setCurrentStep(currentStep - 1)}
      >
        <ChevronLeft color="#18181B" />
      </Button>
      <div>
        <p className="text-[#09090B] text-[24px] font-bold tracking-[-0.6px]">
          Create a strong password
        </p>
        <p className="text-[#71717A] text-[16px] ">
          Create a strong password with letters, numbers.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="password" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="confirm" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "loading..." : " Lets go"}
          </Button>
        </form>
      </Form>
      <div className="flex gap-3">
        <p className="text-[#71717A] text-4">Already have an account?</p>
        <a href="/auth/sign-in" className="text-[#2563EB] text-4">
          Log in
        </a>
      </div>
    </div>
  );
};

export default SecondStep;

"use client";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import FormError from "@/components/auth/formerror";
import login from "../../../actions/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import FormSuccess from "@/components/auth/formsuccess";
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
import { loginSchema } from "../../../schema";
import { useState } from "react";
import { useTransition } from "react";

export default function Loginform() {
  const router = useRouter();
  const [ispending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log("hey");
    setSuccess("");
    setError("");
    startTransition(() => {
      login(values).then((res) => {
        setError(
          res?.error instanceof z.ZodError ? res.error.message : res?.error
        );
        setSuccess(res?.success ? "Email sent" : undefined);
      });
    });
  }

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    disabled={ispending}
                    placeholder="your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input
                    disabled={ispending}
                    placeholder="your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button className="w-[100%]" type="submit">
            Submit
          </Button>
        </form>
      </Form>
      <h1
        className="text-center cursor-pointer"
        onClick={() => {
          router.push("/auth/signup");
        }}
      >
        Dont have an account? Sign up{" "}
      </h1>
    </>
  );
}

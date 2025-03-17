"use client";
import { register } from "../../../actions/actions";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { signIn } from "next-auth/react"; // Make sure to import from next-auth/react
import { registerSchema } from "../../../schema";

import { DEFAULT_REDIRECT } from "@/routes";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormSuccess from "@/components/auth/formsuccess";
import FormError from "@/components/auth/formerror";

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  // Function for email/password registration
  function onSubmit(values: z.infer<typeof registerSchema>) {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const result = await register(values);

        if (result?.error) {
          setError(
            result.error instanceof z.ZodError
              ? result.error.message
              : result.error
          );
        } else if (result?.success) {
          setSuccess(
            "Account created! You can now log in with your credentials."
          );
          // Optionally redirect to login page after a short delay
          setTimeout(() => router.push("/auth/signin"), 2000);
        }
      } catch (err) {
        console.error("Registration error:", err);
        setError("An unexpected error occurred.");
      }
    });
  }

  // Functions for social logins
  const handleSocialLogin = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        callbackUrl: DEFAULT_REDIRECT,
      });
      // No need to set success state as signIn handles the redirect
    } catch (err) {
      console.error(`${provider} sign-in error:`, err);
      setError(`Failed to sign in with ${provider}.`);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Enter your name"
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-[100%] flex flex-row items-center justify-around space-x-4">
            <Button
              disabled={isPending}
              type="button"
              onClick={() => handleSocialLogin("github")}
              className="bg-white text-black hover:bg-gray-100 w-[45%]"
            >
              <img className="w-[58px]" src="/fgithub.png" alt="GitHub" />
            </Button>
            <Button
              disabled={isPending}
              type="button"
              onClick={() => handleSocialLogin("google")}
              className="bg-white text-black hover:bg-gray-100 w-[45%]"
            >
              <img className="w-[29px]" src="/Google.svg" alt="Google" />
            </Button>
          </div>

          {success && <FormSuccess message={success} />}
          {error && <FormError message={error} />}

          <Button disabled={isPending} className="w-[100%]" type="submit">
            Sign Up with Email
          </Button>
        </form>
      </Form>

      <h1
        className="text-center cursor-pointer"
        onClick={() => router.push("/auth/signin")}
      >
        Already have an account? Sign in
      </h1>
    </>
  );
}

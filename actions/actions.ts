"use server";
import { loginSchema } from "../schema";
import db from "../src/lib/db";
import { signOut } from "@/auth";
import { getUserByEmail } from "../data/user";
import { registerSchema } from "../schema";
import * as z from "zod"; // Ensure this import is complete
import bcrypt from "bcrypt";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";

const login = async (values: z.infer<typeof loginSchema>) => {
  console.table(values);

  const validatedFeilds = loginSchema.safeParse(values);
  if (!validatedFeilds.success) {
    return { error: validatedFeilds.error };
  }
  const { email, password } = validatedFeilds.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_REDIRECT,
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return { error: "Invalid credentials" };
        }
        default: {
          error: "An error occurred";
        }
      }
    }
    throw error;
  }
};

export const signoutserveraction = async () => {
  try {
    await signOut({
      redirectTo: "/",
    });
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
};
export const register = async (values: z.infer<typeof registerSchema>) => {
  console.log("Register function called with values:", values);
  const validatedFeilds = registerSchema.safeParse(values);
  if (!validatedFeilds.success) {
    console.error("Validation failed:", validatedFeilds.error);
    return { error: validatedFeilds.error };
  }

  const { password, email, name } = validatedFeilds.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    console.warn("User already exists with email:", email);
    return { error: "User already exists" };
  }

  const createdUser = await db.user.create({
    data: {
      role: "NORMAL",
      email,
      name,
      password: hashedPassword,
    },
  });
  console.log("User created successfully:", createdUser);
  return { success: true, data: "Successful", createdUser };
};

export default login;

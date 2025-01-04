"use server";

import { type ActionResponse } from "@/types/actions";
import { actionClient } from "@/lib/safe-action";
import { z } from "zod";
import { createClient } from "../supabase/server";

const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signUpSchema = authSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const signIn = actionClient
  .schema(authSchema)
  .action(
    async ({ parsedInput: { email, password } }): Promise<ActionResponse> => {
      const supabase = await createClient();

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          error: error.message,
          success: false,
        };
      }

      return {
        success: true,
        error: "",
      };
    }
  );

export const signUp = actionClient
  .schema(signUpSchema)
  .action(
    async ({ parsedInput: { email, password } }): Promise<ActionResponse> => {
      const supabase = await createClient();

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        },
      });

      if (error) {
        return {
          error: error.message,
          success: false,
        };
      }

      return {
        success: true,
      };
    }
  );

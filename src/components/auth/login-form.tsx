"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn, signUp } from "@/lib/actions/auth";
import { type ActionResponse } from "@/types/actions";

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

type AuthFormData = z.infer<typeof authSchema>;
type SignUpFormData = z.infer<typeof signUpSchema>;

export function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const signInForm = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSignIn(data: AuthFormData) {
    try {
      const result = (await signIn(data)) as ActionResponse;
      if (!result.data.success) {
        toast.error(result.error || "Failed to sign in");
        return;
      }

      toast.success("Signed in successfully");
      startTransition(() => {
        router.refresh();
        router.push("/tasks");
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  async function onSignUp(data: SignUpFormData) {
    try {
      const result = (await signUp(data)) as ActionResponse;

      if (!result.success) {
        toast.error(result.error || "Failed to create account");
        return;
      }

      toast.success("Check your email to confirm your account");
      signUpForm.reset();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="grid gap-6">
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <form
            onSubmit={signInForm.handleSubmit(onSignIn)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="signin-email">Email</Label>
              <Input
                id="signin-email"
                {...signInForm.register("email")}
                type="email"
                placeholder="m@example.com"
              />
              {signInForm.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {signInForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="signin-password">Password</Label>
              <Input
                id="signin-password"
                {...signInForm.register("password")}
                type="password"
              />
              {signInForm.formState.errors.password && (
                <p className="text-sm text-destructive">
                  {signInForm.formState.errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={signInForm.formState.isSubmitting || isPending}
            >
              {signInForm.formState.isSubmitting || isPending ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="signup">
          <form
            onSubmit={signUpForm.handleSubmit(onSignUp)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                {...signUpForm.register("email")}
                type="email"
                placeholder="m@example.com"
              />
              {signUpForm.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {signUpForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                {...signUpForm.register("password")}
                type="password"
              />
              {signUpForm.formState.errors.password && (
                <p className="text-sm text-destructive">
                  {signUpForm.formState.errors.password.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-confirm-password">Confirm Password</Label>
              <Input
                id="signup-confirm-password"
                {...signUpForm.register("confirmPassword")}
                type="password"
              />
              {signUpForm.formState.errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {signUpForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={signUpForm.formState.isSubmitting}
            >
              {signUpForm.formState.isSubmitting ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </TabsContent>
      </Tabs>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <form action="/auth/google" className="w-full">
        <Button variant="outline" type="submit" className="w-full">
          <Icons.google className="mr-2 h-4 w-4" />
          Google
        </Button>
      </form>
    </div>
  );
}

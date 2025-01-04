import { Card } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/login-form";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/tasks");

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <main className="container max-w-md">
        <Card className="p-8">
          <h1 className="text-2xl font-bold text-center mb-6">
            Personal Task Helper
          </h1>
          <LoginForm />
        </Card>
      </main>
    </div>
  );
}

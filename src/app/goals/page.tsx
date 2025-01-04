import { Card } from "@/components/ui/card";
import { GoalList } from "@/components/goal-list";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getGoals } from "@/lib/actions/goals";
import { ActionResponse } from "@/types/actions";
import { Goal } from "@/types";

export default async function GoalsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const response = (await getGoals({
    userId: user.id,
  })) as ActionResponse;

  const goals = (response.data.data as Goal[]) ?? ([] as Goal[]);

  return (
    <div className="min-h-screen p-8">
      <main className="container mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">2025 Goals</h1>
          <GoalList userId={user?.id ?? null} goals={goals} />
        </Card>
      </main>
    </div>
  );
}

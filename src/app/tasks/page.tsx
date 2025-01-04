import { Card } from "@/components/ui/card";
import { TodoList } from "@/components/todo/todo-list";
import { getTodos } from "@/lib/actions/todos";
import { getGoals } from "@/lib/actions/goals";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ActionResponse } from "@/types/actions";

export default async function TasksPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const { data: todos, error } = await getTodos();
  const { data: goals } = (await getGoals({
    userId: user.id,
  })) as ActionResponse;

  if (error) {
    console.error(error);
  }

  return (
    <div className="min-h-screen p-8">
      <main className="container mx-auto max-w-4xl">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Tasks</h1>
          <TodoList todos={todos ?? []} user={user} goals={goals.data ?? []} />
        </Card>
      </main>
    </div>
  );
}

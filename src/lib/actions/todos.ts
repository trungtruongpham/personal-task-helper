"use server";

import { actionClient } from "@/lib/safe-action";
import { z } from "zod";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

const createTodoSchema = z.object({
  title: z.string().min(1),
  goalId: z.string().optional(),
  userId: z.string(),
});

export const createTodo = actionClient
  .schema(createTodoSchema)
  .action(async ({ parsedInput: { title, goalId, userId } }) => {
    const supabase = await createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    const { data, error } = await supabase
      .from("todos")
      .insert([
        {
          title,
          goal_id: goalId,
          user_id: userId,
        },
      ])
      .select()
      .single();

    if (error) {
      return {
        error: error.message,
        success: false,
      };
    }

    // Revalidate the todos page to refresh the data
    revalidatePath("/tasks");

    return {
      success: true,
      data,
    };
  });

const toggleTodoSchema = z.object({
  id: z.string(),
  completed: z.boolean(),
});

export const toggleTodo = actionClient
  .schema(toggleTodoSchema)
  .action(async ({ parsedInput: { id, completed } }) => {
    const supabase = await createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    const { error } = await supabase
      .from("todos")
      .update({ completed })
      .eq("id", id)
      .eq("user_id", session.user.id);

    if (error) {
      return {
        error: error.message,
      };
    }

    revalidatePath("/todos");

    return {
      success: "Todo updated successfully",
    };
  });

const deleteTodoSchema = z.object({
  id: z.string(),
  userId: z.string(),
});

export const deleteTodo = actionClient
  .schema(deleteTodoSchema)
  .action(async ({ parsedInput: { id, userId } }) => {
    const supabase = await createClient();
    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw new Error("Failed to delete todo");
    return { success: true };
  });

export async function getTodos() {
  const supabase = await createClient();

  // First check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  // Fetch todos for the authenticated user
  const { data: todos, error } = await supabase
    .from("todos")
    .select(
      `
      *,
      goals (
        id,
        title
      )
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching todos:", error);
    return {
      error: "Failed to fetch todos",
    };
  }

  return {
    data: todos,
  };
}

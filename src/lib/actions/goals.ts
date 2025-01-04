"use server";

import { z } from "zod";
import { type ActionResponse } from "@/types/actions";
import { actionClient } from "@/lib/safe-action";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

const createGoalSchema = z.object({
  title: z.string().min(1, "Title is required"),
  userId: z.string().min(1, "User ID is required"),
  dueDate: z.date().optional(),
  description: z.string().optional(),
});

export const createGoal = actionClient
  .schema(createGoalSchema)
  .action(
    async ({
      parsedInput: { title, userId, dueDate, description },
    }): Promise<ActionResponse> => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("goals")
        .insert([{ title, user_id: userId, dueDate: dueDate, description }])
        .select()
        .single();

      if (error) {
        console.error("Supabase error:", error);
        return {
          success: false,
          error: `Failed to create goal: ${error.message}`,
        };
      }

      revalidatePath("/goals");

      return { success: true, data };
    }
  );

const getGoalsSchema = z.object({});

export const getGoals = actionClient
  .schema(getGoalsSchema)
  .action(async ({}): Promise<ActionResponse> => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const { data, error } = await supabase
      .from("goals")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error)
      return {
        success: false,
        error: "Failed to fetch goals",
      };

    return { success: true, data };
  });

const deleteGoalSchema = z.object({
  goalId: z.string().min(1, "Goal ID is required"),
  userId: z.string().min(1, "User ID is required"),
});

export const deleteGoal = actionClient
  .schema(deleteGoalSchema)
  .action(
    async ({ parsedInput: { goalId, userId } }): Promise<ActionResponse> => {
      const supabase = await createClient();
      const { error } = await supabase
        .from("goals")
        .delete()
        .eq("id", goalId)
        .eq("user_id", userId);

      if (error) {
        return {
          success: false,
          error: "Failed to delete goal",
        };
      }

      return { success: true };
    }
  );

"use client";

import { Goal } from "@/types";
import { CreateGoalForm } from "@/components/create-goal-form";
import { GoalItem } from "@/components/goal-item";

export function GoalList({
  userId,
  goals,
}: {
  userId: string | null;
  goals: Goal[] | null;
}) {
  return (
    <div className="space-y-6">
      <CreateGoalForm userId={userId} />
      <div className="space-y-4">
        {Array.isArray(goals) && goals.length > 0 ? (
          goals.map((goal) => (
            <GoalItem key={goal.id} goal={goal} onDelete={() => {}} />
          ))
        ) : (
          <p className="text-muted-foreground text-center py-4">
            No goals found. Create one to get started!
          </p>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Goal } from "@/types";
import { createTodo } from "@/lib/actions/todos";

interface CreateTodoFormProps {
  goals: Goal[];
  userId: string;
}

export function CreateTodoForm({ goals, userId }: CreateTodoFormProps) {
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState("");
  const [goalId, setGoalId] = useState<string>();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    startTransition(async () => {
      await createTodo({
        title: title.trim(),
        goalId: goalId === "none" ? undefined : goalId,
        userId,
      });
      setTitle("");
      setGoalId(undefined);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <div className="flex-1 flex space-x-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1"
        />
        <Select value={goalId} onValueChange={setGoalId}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Link to goal..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No goal</SelectItem>
            {goals.map((goal) => (
              <SelectItem key={goal.id} value={goal.id}>
                {goal.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" size="icon" disabled={isPending}>
        <Plus className="h-4 w-4" />
      </Button>
    </form>
  );
}

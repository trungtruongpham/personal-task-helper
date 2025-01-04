"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { createGoal } from "@/lib/actions/goals";

interface CreateGoalFormProps {
  userId: string | null;
}

export function CreateGoalForm({ userId }: CreateGoalFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    startTransition(async () => {
      await createGoal({
        title: title.trim(),
        userId: userId ?? "",
        dueDate: dueDate,
        description: description.trim(),
      });
      setTitle("");
      setDescription("");
      setDueDate(new Date());
    });

    setTitle("");
    setDescription("");
    setDueDate(new Date());
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Goal title..."
        className="w-full"
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        className="w-full"
      />
      <div className="flex space-x-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !dueDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dueDate ? format(dueDate, "PPP") : <span>Pick a due date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dueDate}
              onSelect={(date) => {
                setDueDate(date || new Date());
                setIsOpen(false);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button type="submit" disabled={isPending}>
          Add Goal
        </Button>
      </div>
    </form>
  );
}

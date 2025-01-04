import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";
import { type Goal } from "@/types";

interface GoalItemProps {
  goal: Goal;
  onDelete: (id: string) => void;
}

export function GoalItem({ goal, onDelete }: GoalItemProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold">{goal.title}</h3>
          {goal.description && (
            <p className="text-sm text-muted-foreground">{goal.description}</p>
          )}
          <p className="text-sm text-muted-foreground mt-1">
            Due:{" "}
            {goal.dueDate
              ? new Date(goal.dueDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "N/A"}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => onDelete(goal.id)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <Progress value={goal.progress} className="h-2" />
    </Card>
  );
}

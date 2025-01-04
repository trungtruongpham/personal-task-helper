import { Progress } from "@/components/ui/progress";
import { type Todo } from "@/types";

interface TodoProgressProps {
  todos: Todo[];
}

export function TodoProgress({ todos }: TodoProgressProps) {
  const totalTodos = todos.length;
  if (!totalTodos) return null;

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const progressPercentage = Math.round((completedTodos / totalTodos) * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>
          {completedTodos} of {totalTodos} tasks completed
        </span>
        <span>{progressPercentage}%</span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
}

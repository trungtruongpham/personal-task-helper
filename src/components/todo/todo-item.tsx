import { Checkbox } from "@/components/ui/checkbox";
import { type Todo } from "@/types";
import { toggleTodo } from "@/lib/actions/todos";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  function handleToggle(checked: boolean) {
    startTransition(async () => {
      await toggleTodo({ id: todo.id, completed: checked });
      if (checked) {
        toast({
          title: "🎉 Task completed!",
          description: "Keep up the great work!",
          className: "bg-background border-border",
        });
      }
    });
  }

  return (
    <div className="flex items-center space-x-2" key={todo.id}>
      <Checkbox
        checked={todo.completed}
        onCheckedChange={handleToggle}
        id={`todo-${todo.id}`}
        disabled={isPending}
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={`text-sm ${
          todo.completed ? "line-through text-muted-foreground" : ""
        }`}
      >
        {todo.title}
      </label>
    </div>
  );
}

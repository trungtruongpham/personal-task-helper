"use client";

import { Goal, type Todo } from "@/types";
import { TodoItem } from "./todo-item";
import { CreateTodoForm } from "../create-todo-form";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { TodoProgress } from "./todo-progress";

interface TodoListProps {
  todos: Todo[];
  user: User | null;
  goals: Goal[];
}

export function TodoList({
  todos: initialTodos,
  user,
  goals: initialGoals,
}: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  useEffect(() => {
    setTodos(initialTodos);
    setGoals(initialGoals);
  }, [initialTodos, initialGoals]);

  if (!todos?.length) {
    return <div className="text-muted-foreground">No tasks to do yet</div>;
  }

  return (
    <div className="space-y-6">
      <TodoProgress todos={todos} />
      <CreateTodoForm userId={user?.id ?? ""} goals={goals} />
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} goals={goals} />
      ))}
    </div>
  );
}

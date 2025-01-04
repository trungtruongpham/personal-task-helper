export interface Goal {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  progress: number;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  goalId?: string;
  user_id: string;
}

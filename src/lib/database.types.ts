export type Database = {
  public: {
    Tables: {
      goals: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          user_id: string;
        };
      };
      todos: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          completed: boolean;
          goal_id?: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          completed?: boolean;
          goal_id?: string;
          user_id: string;
        };
      };
    };
  };
};

import { type Database } from "@/lib/database.types";

export type Goal = Database["public"]["Tables"]["goals"]["Row"];
export type Todo = Database["public"]["Tables"]["todos"]["Row"];

export type ActionResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

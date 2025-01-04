import { type Database } from "@/lib/database.types";

export type Goal = Database["public"]["Tables"]["goals"]["Row"];
export type Todo = Database["public"]["Tables"]["todos"]["Row"];

export type ActionResponse = {
  success: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  error?: string;
};

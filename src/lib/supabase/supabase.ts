import { type Database } from "../database.types";
import { createBrowserClient } from "@supabase/ssr";

if (!process.env.SUPABASE_URL) throw new Error("Missing SUPABASE_URL");
if (!process.env.SUPABASE_ANON_KEY)
  throw new Error("Missing SUPABASE_ANON_KEY");

export const supabase = createBrowserClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

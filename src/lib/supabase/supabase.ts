import { type Database } from "../database.types";
import { createBrowserClient } from "@supabase/ssr";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL)
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");

export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

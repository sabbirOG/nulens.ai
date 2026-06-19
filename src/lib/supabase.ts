import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("your-supabase-project") || supabaseAnonKey.includes("your-supabase-anon-key")) {
  console.warn(
    "Supabase configuration missing or using placeholders. NuLens.ai will run in local-only fallback mode (localStorage)."
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder-url.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);

export const isSupabaseConfigured = () => {
  return (
    !!supabaseUrl &&
    !!supabaseAnonKey &&
    !supabaseUrl.includes("your-supabase-project") &&
    !supabaseAnonKey.includes("your-supabase-anon-key")
  );
};

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  return createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        // new API expects individual get/set/remove methods
        get(name) {
          const c = cookieStore.get(name);
          return c ? c.value : null;
        },
        set(name, value, options) {
          cookieStore.set(name, value, options);
        },
        remove(name) {
          cookieStore.delete(name);
        },
      },
    }
  );
};
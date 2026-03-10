import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const createClient = (request: NextRequest) => {
  // Create an unmodified response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        get(name) {
          const c = request.cookies.get(name);
          return c ? c.value : null;
        },
        set(name, value, options) {
          request.cookies.set(name, value);
          // mirror to response so it propagates
          supabaseResponse = NextResponse.next({ request });
          supabaseResponse.cookies.set(name, value, options);
        },
        remove(name) {
          request.cookies.delete(name);
          supabaseResponse = NextResponse.next({ request });
          supabaseResponse.cookies.delete(name);
        },
      },
    }
  );

  return supabaseResponse;
};
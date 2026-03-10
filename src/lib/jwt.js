import jwt from 'jsonwebtoken';
import { createServerClient } from '@supabase/ssr';

const SECRET = process.env.JWT_SECRET || 'change-me';

export function signToken(payload, expiresIn = '2h') {
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}

// attempt to resolve a user object from either a Supabase session token
// or the legacy JWT. returns null if authentication fails.
export async function getUserFromToken(token) {
  if (!token) return null;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && supabaseKey) {
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        get: () => null,
        set: () => {},
        remove: () => {},
      },
    });
    try {
      const { data, error } = await supabase.auth.getUser(token);
      if (!error && data.user) {
        return data.user;
      }
    } catch {
      // fall through to JWT
    }
  }

  return verifyToken(token);
}

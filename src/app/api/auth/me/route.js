import { verifyToken } from '../../../../lib/jwt';
import cookie from 'cookie';
import { createServerClient } from '@supabase/ssr';

export async function GET(req) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const cookies = cookie.parse(cookieHeader || '');
    const token = cookies.token;

    // try Supabase first if service key present
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (supabaseUrl && supabaseKey && token) {
      const supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
          get: () => null,
          set: () => {},
          remove: () => {},
        },
      }); // we won't pass cookies here, just validate token
      const { data, error } = await supabase.auth.getUser(token);
      if (!error && data.user) {
        return new Response(JSON.stringify({ ok: true, user: data.user }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }
      // fall through to JWT check if supabase failed
    }

    const user = verifyToken(token);
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    return new Response(JSON.stringify({ ok: true, user }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

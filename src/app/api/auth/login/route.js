import { signToken } from '../../../../lib/jwt';
import cookie from 'cookie';
import { createServerClient } from '@supabase/ssr';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Missing credentials' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // using Supabase auth only (no fallback to static credentials)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    console.log('login attempt – supabaseUrl:', supabaseUrl, 'supabaseKey present?', !!supabaseKey);
    if (!supabaseUrl || !supabaseKey) {
      // configuration issue
      console.error('Supabase URL or service key missing');
      return new Response(JSON.stringify({ error: 'Authentication not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
    try {
      console.log('using supabase auth');
      const supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
          get: () => null,
          set: () => {},
          remove: () => {},
        },
      });
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.log('supabase sign-in error', error);
        return new Response(JSON.stringify({ error: error.message || 'Invalid credentials' }), { status: error.status || 401, headers: { 'Content-Type': 'application/json' } });
      }
      if (!data?.session) {
        console.log('supabase returned no session', data);
        return new Response(JSON.stringify({ error: 'No session returned' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
      }
      const token = data.session.access_token;
      const cookieSerialized = cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 2 // 2 hours
      });
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Set-Cookie': cookieSerialized, 'Content-Type': 'application/json' } });
    } catch (supErr) {
      console.error('supabase auth request threw', supErr);
      return new Response(JSON.stringify({ error: supErr instanceof Error ? supErr.message : 'Login failed' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    console.log('falling back to static admin credentials');
    // fallback to legacy admin credentials
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password123';

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const token = signToken({ email });
    const cookieSerialized = cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 2 // 2 hours
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Set-Cookie': cookieSerialized, 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('login error', err);
    const message = err instanceof Error ? err.message : 'Login failed';
    return new Response(JSON.stringify({ error: message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

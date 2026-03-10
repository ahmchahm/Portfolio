import cookie from 'cookie';

export async function POST() {
  try {
    const cookieSerialized = cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      expires: new Date(0)
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Set-Cookie': cookieSerialized, 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Logout failed' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

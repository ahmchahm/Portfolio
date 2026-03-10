import { getUserFromToken } from '../../../../lib/jwt';
import cookie from 'cookie';
import { deleteMessageById } from '../../../../lib/db';

export async function DELETE(req, { params }) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const cookies = cookie.parse(cookieHeader || '');
    const user = await getUserFromToken(cookies.token);
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });

    const { id } = params;
    const removed = await deleteMessageById(id);
    if (!removed) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    return new Response(JSON.stringify({ message: removed }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to delete message' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
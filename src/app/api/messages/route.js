import { getUserFromToken } from '../../../lib/jwt';
import cookie from 'cookie';
import { getMessages, createMessage, deleteMessageById } from '../../../lib/db';

export async function GET(req) {
  try {
    // only admin can list messages
    const cookieHeader = req.headers.get('cookie') || '';
    const cookies = cookie.parse(cookieHeader || '');
    const user = await getUserFromToken(cookies.token);
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });

    const messages = await getMessages();
    return new Response(JSON.stringify({ messages }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to read messages' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body;
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    const payload = { name, email, message };
    const newMsg = await createMessage(payload);
    return new Response(JSON.stringify({ message: newMsg }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to save message' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}


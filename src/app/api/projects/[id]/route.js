import { getUserFromToken } from '../../../../lib/jwt';
import cookie from 'cookie';
import { getProjectById, updateProjectById, deleteProjectById } from '../../../../lib/db';

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const project = await getProjectById(id);
    if (!project) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    return new Response(JSON.stringify({ project }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function PUT(req, { params }) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const cookies = cookie.parse(cookieHeader || '');
    const token = cookies.token;
    const user = verifyToken(token);
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });

    const { id } = params;
    const body = await req.json();
    const updated = await updateProjectById(id, body);
    if (!updated) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    return new Response(JSON.stringify({ project: updated }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to update' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function DELETE(req, { params }) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const cookies = cookie.parse(cookieHeader || '');
    const token = cookies.token;
    const user = verifyToken(token);
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });

    const { id } = params;
    const removed = await deleteProjectById(id);
    if (!removed) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    return new Response(JSON.stringify({ project: removed }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to delete' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

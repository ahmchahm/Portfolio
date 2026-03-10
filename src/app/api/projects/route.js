import { getUserFromToken } from '../../../lib/jwt';
import cookie from 'cookie';
import { getProjects, createProject } from '../../../lib/db';

export async function GET() {
  try {
    const projects = await getProjects();
    return new Response(JSON.stringify({ projects }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to read projects' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function POST(req) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const cookies = cookie.parse(cookieHeader || '');
    const user = await getUserFromToken(cookies.token);
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });

    const body = await req.json();
    const { title, description, image, technologies, github, demo } = body;

    if (!title || !description) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const payload = { title, description, image: image || '', technologies: Array.isArray(technologies) ? technologies : [], github: github || '', demo: demo || '' };
    const newProject = await createProject(payload);

    return new Response(JSON.stringify({ project: newProject }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to create project' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

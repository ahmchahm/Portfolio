import fs from 'fs/promises';
import path from 'path';
const DATA_PATH = path.join(process.cwd(), 'data', 'projects.json');
const MSG_PATH = path.join(process.cwd(), 'data', 'messages.json');

// which backend to use: Prisma (sqlite or postgres) or Supabase
let usePrisma = Boolean(process.env.DATABASE_URL);
let prisma;
if (usePrisma) {
  try {
    // dynamically import to avoid errors when package missing
    // eslint-disable-next-line import/no-extraneous-dependencies
    prisma = require('./prisma').default;
  } catch (err) {
    prisma = null;
    usePrisma = false;
  }
}

// supabase fallback if the service role key is set
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const useSupabase = Boolean(supabaseUrl && supabaseServiceKey);
let supabase;
if (useSupabase) {
  supabase = createSupabaseClient(supabaseUrl, supabaseServiceKey);
}

async function readJson() {
  const raw = await fs.readFile(DATA_PATH, 'utf-8');
  return JSON.parse(raw || '[]');
}

async function writeJson(projects) {
  await fs.writeFile(DATA_PATH, JSON.stringify(projects, null, 2), 'utf-8');
}

// messages helpers for filesystem fallback
async function readMessagesJson() {
  const raw = await fs.readFile(MSG_PATH, 'utf-8');
  return JSON.parse(raw || '[]');
}

async function writeMessagesJson(messages) {
  await fs.writeFile(MSG_PATH, JSON.stringify(messages, null, 2), 'utf-8');
}

export async function getProjects() {
  if (useSupabase && supabase) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('createdAt', { ascending: false });
    if (error) throw error;
    return data.map((r) => ({
      ...r,
      technologies: typeof r.technologies === 'string' ? JSON.parse(r.technologies || '[]') : r.technologies || []
    }));
  }

  if (usePrisma && prisma) {
    const rows = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    return rows.map(r => ({ ...r, technologies: typeof r.technologies === 'string' ? JSON.parse(r.technologies || '[]') : r.technologies || [] }));
  }
  return readJson();
}

// message db helpers
export async function getMessages() {
  if (useSupabase && supabase) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('createdAt', { ascending: false });
    if (error) throw error;
    return data;
  }

  if (usePrisma && prisma) {
    const rows = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } });
    return rows;
  }
  return readMessagesJson();
}

export async function createMessage(payload) {
  if (useSupabase && supabase) {
    const { data, error } = await supabase.from('messages').insert(payload);
    if (error) throw error;
    return data[0];
  }

  if (usePrisma && prisma) {
    const created = await prisma.message.create({ data: payload });
    return created;
  }
  const messages = await readMessagesJson();
  const id = Date.now().toString();
  const newMsg = { id, ...payload, createdAt: new Date().toISOString() };
  messages.unshift(newMsg);
  await writeMessagesJson(messages);
  return newMsg;
}

export async function deleteMessageById(id) {
  if (useSupabase && supabase) {
    const { data, error } = await supabase.from('messages').delete().eq('id', id);
    if (error) throw error;
    return data[0] || null;
  }

  if (usePrisma && prisma) {
    const del = await prisma.message.delete({ where: { id } });
    return del;
  }
  const messages = await readMessagesJson();
  const idx = messages.findIndex(m => m.id === id);
  if (idx === -1) return null;
  const removed = messages.splice(idx, 1)[0];
  await writeMessagesJson(messages);
  return removed;
}
export async function getProjectById(id) {
  if (useSupabase && supabase) {
    const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
    if (error) throw error;
    if (!data) return null;
    return { ...data, technologies: typeof data.technologies === 'string' ? JSON.parse(data.technologies || '[]') : data.technologies || [] };
  }

  if (usePrisma && prisma) {
    const row = await prisma.project.findUnique({ where: { id } });
    if (!row) return null;
    return { ...row, technologies: typeof row.technologies === 'string' ? JSON.parse(row.technologies || '[]') : row.technologies || [] };
  }
  const projects = await readJson();
  return projects.find(p => p.id === id) || null;
}

export async function createProject(payload) {
  if (useSupabase && supabase) {
    const data = { ...payload };
    if (Array.isArray(data.technologies)) data.technologies = JSON.stringify(data.technologies);
    const { data: created, error } = await supabase.from('projects').insert(data).select().single();
    if (error) throw error;
    return { ...created, technologies: typeof created.technologies === 'string' ? JSON.parse(created.technologies || '[]') : created.technologies || [] };
  }

  if (usePrisma && prisma) {
    const data = { ...payload };
    if (Array.isArray(data.technologies)) data.technologies = JSON.stringify(data.technologies);
    const created = await prisma.project.create({ data });
    return { ...created, technologies: typeof created.technologies === 'string' ? JSON.parse(created.technologies || '[]') : created.technologies || [] };
  }
  const projects = await readJson();
  const id = Date.now().toString();
  const newProject = { id, ...payload };
  projects.unshift(newProject);
  await writeJson(projects);
  return newProject;
}

export async function updateProjectById(id, payload) {
  if (useSupabase && supabase) {
    const data = { ...payload };
    if (Array.isArray(data.technologies)) data.technologies = JSON.stringify(data.technologies);
    const { data: updated, error } = await supabase.from('projects').update(data).eq('id', id).select().single();
    if (error) throw error;
    return { ...updated, technologies: typeof updated.technologies === 'string' ? JSON.parse(updated.technologies || '[]') : updated.technologies || [] };
  }

  if (usePrisma && prisma) {
    const data = { ...payload };
    if (Array.isArray(data.technologies)) data.technologies = JSON.stringify(data.technologies);
    const updated = await prisma.project.update({ where: { id }, data });
    return { ...updated, technologies: typeof updated.technologies === 'string' ? JSON.parse(updated.technologies || '[]') : updated.technologies || [] };
  }
  const projects = await readJson();
  const idx = projects.findIndex(p => p.id === id);
  if (idx === -1) return null;
  projects[idx] = { ...projects[idx], ...payload };
  await writeJson(projects);
  return projects[idx];
}

export async function deleteProjectById(id) {
  if (usePrisma && prisma) {
    const deleted = await prisma.project.delete({ where: { id } });
    return { ...deleted, technologies: deleted.technologies || [] };
  }
  const projects = await readJson();
  const idx = projects.findIndex(p => p.id === id);
  if (idx === -1) return null;
  const removed = projects.splice(idx, 1)[0];
  await writeJson(projects);
  return removed;
}

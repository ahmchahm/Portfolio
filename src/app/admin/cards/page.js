"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProjectCard from '@/components/ProjectCard';
import AdminHeader from '@/components/AdminHeader';
import ConfirmModal from '@/components/ConfirmModal';
import Spinner from '@/components/Spinner';

export default function AdminCards() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', image: '', technologies: '', github: '', demo: '' });

  useEffect(() => {
    let mounted = true;
    async function checkAuth() {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (!mounted) return;
      if (!res.ok) return router.push('/admin/login');
      fetchProjects();
    }
    checkAuth();
    return () => { mounted = false; };
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data.projects || []);
    setLoading(false);
  }

  function prepareEdit(p) {
    setEditing(p);
    setForm({ title: p.title || '', description: p.description || '', image: p.image || '', technologies: (p.technologies || []).join(', '), github: p.github || '', demo: p.demo || '' });
    setShowForm(true);
  }

  async function submitEdit(e) {
    e.preventDefault();
    const payload = { ...form, technologies: form.technologies.split(',').map(s => s.trim()).filter(Boolean) };
    const res = await fetch(`/api/projects/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), credentials: 'include' });
    if (res.ok) {
      const data = await res.json();
      setProjects(prev => prev.map(p => p.id === data.project.id ? data.project : p));
      setShowForm(false);
    } else alert('Update failed');
  }

  async function handleDelete(id) {
    setToDelete(id);
    setConfirmOpen(true);
  }

  async function confirmDelete() {
    const id = toDelete;
    setConfirmOpen(false);
    setToDelete(null);
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE', credentials: 'include' });
    if (res.ok) setProjects(prev => prev.filter(p => p.id !== id));
    else alert('Delete failed');
  }

  function cancelDelete() { setConfirmOpen(false); setToDelete(null); }

  return (
    <div className="p-6">
      <AdminHeader />
      {confirmOpen && (
        <ConfirmModal open={confirmOpen} title="Delete Project" message="Are you sure you want to delete this project?" onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Manage Projects (Card View)</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({ title: '', description: '', image: '', technologies: '', github: '', demo: '' }); }} className="px-4 py-2 bg-green-600 text-white rounded">Add New</button>
      </div>

      {showForm && (
        <form onSubmit={editing ? submitEdit : async (e) => {
          e.preventDefault();
          const payload = { ...form, technologies: form.technologies.split(',').map(s => s.trim()).filter(Boolean) };
          const res = await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), credentials: 'include' });
          if (res.ok) {
            const data = await res.json();
            setProjects(prev => [data.project, ...prev]);
            setShowForm(false);
          } else alert('Create failed');
        }} className="bg-white p-4 rounded shadow mb-6">
          <div className="grid gap-2">
            <input className="border p-2" placeholder="Title" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} required />
            <textarea className="border p-2" placeholder="Description" value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} required />
            <input className="border p-2" placeholder="Image URL" value={form.image} onChange={(e)=>setForm({...form, image:e.target.value})} />
            <input className="border p-2" placeholder="Technologies (comma separated)" value={form.technologies} onChange={(e)=>setForm({...form, technologies:e.target.value})} />
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit">{editing ? 'Save' : 'Add'}</button>
              <button type="button" onClick={()=>setShowForm(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
            </div>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? <div className="col-span-full"><Spinner /></div> : projects.map(p => (
          <div key={p.id} className="relative">
            <ProjectCard project={{ id: p.id, title: p.title, description: p.description, tags: p.technologies || [], image: p.image || '🧩', color: '#06b6d4', link: p.demo || p.github || '#' }} onSelect={()=>{}} />
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <button onClick={()=>prepareEdit(p)} className="px-2 py-1 bg-yellow-400 rounded">Edit</button>
              <button onClick={()=>handleDelete(p.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

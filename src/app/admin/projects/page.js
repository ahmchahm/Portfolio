"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/AdminHeader';
import ConfirmModal from '@/components/ConfirmModal';
import Spinner from '@/components/Spinner';

export default function AdminProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', image: '', technologies: '', github: '', demo: '' });
  const descRef = React.useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

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

  function resetForm() {
    setForm({ title: '', description: '', image: '', technologies: '', github: '', demo: '' });
    setEditing(null);
  }

  async function handleAdd(e) {
    e.preventDefault();
    setFormError('');
    if (!form.title || form.title.length < 3) return setFormError('Title must be at least 3 characters');
    if (!form.description || form.description.length < 10) return setFormError('Description must be at least 10 characters');
    setSubmitting(true);
    try {
      const description = descRef.current ? descRef.current.innerHTML : form.description;
      const payload = { ...form, description, technologies: form.technologies.split(',').map(s => s.trim()).filter(Boolean) };
      const res = await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setProjects(prev => [data.project, ...prev]);
        setShowForm(false);
        resetForm();
      } else {
        const d = await res.json();
        setFormError(d?.error || 'Failed to add project');
      }
    } catch (err) {
      setFormError('Network error');
    } finally { setSubmitting(false); }
  }

  async function handleEdit(e) {
    e.preventDefault();
    setFormError('');
    if (!form.title || form.title.length < 3) return setFormError('Title must be at least 3 characters');
    if (!form.description || form.description.length < 10) return setFormError('Description must be at least 10 characters');
    setSubmitting(true);
    try {
      const description = descRef.current ? descRef.current.innerHTML : form.description;
      const payload = { ...form, description, technologies: form.technologies.split(',').map(s => s.trim()).filter(Boolean) };
      const res = await fetch(`/api/projects/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setProjects(prev => prev.map(p => p.id === data.project.id ? data.project : p));
        setShowForm(false);
        resetForm();
      } else {
        const d = await res.json();
        setFormError(d?.error || 'Failed to update');
      }
    } catch (err) {
      setFormError('Network error');
    } finally { setSubmitting(false); }
  }

  function startEdit(project) {
    setEditing(project);
    setForm({ title: project.title, description: project.description, image: project.image || '', technologies: (project.technologies || []).join(', '), github: project.github || '', demo: project.demo || '' });
    setShowForm(true);
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
    else alert('Failed to delete');
  }

  function cancelDelete() { setConfirmOpen(false); setToDelete(null); }

  // Rich editor helpers using execCommand for simplicity
  function formatText(command, value = null) {
    if (typeof document === 'undefined') return;
    document.execCommand(command, false, value);
    // update form.description from editor
    const ed = descRef.current;
    if (ed) setForm({ ...form, description: ed.innerHTML });
  }

  function addLink() {
    const url = prompt('Enter URL');
    if (!url) return;
    formatText('createLink', url);
  }

  function toggleList() {
    formatText('insertUnorderedList');
  }

  function handlePaste(e) {
    if (!e.clipboardData) return;
    e.preventDefault();
    const html = e.clipboardData.getData('text/html');
    const text = e.clipboardData.getData('text/plain');
    if (html) {
      document.execCommand('insertHTML', false, html);
    } else if (text) {
      const escaped = text
        .split(/\r?\n/)
        .map(line => line ? `<p>${line}</p>` : '<br/>')
        .join('');
      document.execCommand('insertHTML', false, escaped);
    }
    const ed = descRef.current;
    if (ed) setForm({ ...form, description: ed.innerHTML });
  }

  function handleFileUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      // save base64 data URL to image field
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="p-6">
      <AdminHeader />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Projects Admin</h1>
        <div>
          <button onClick={() => { setShowForm(s => !s); resetForm(); }} className="px-4 py-2 bg-green-600 text-white rounded">{showForm ? 'Close' : 'Add New Project'}</button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={editing ? handleEdit : handleAdd} className="bg-white p-4 rounded shadow mb-6">
          <div className="grid grid-cols-1 gap-3">
            <input className="border p-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />

            {/* Description with simple styling toolbar */}
            <div>
                <div className="flex gap-2 mb-2">
                  <button type="button" className="px-2 py-1 bg-gray-100 rounded" onClick={() => formatText('bold')}>Bold</button>
                  <button type="button" className="px-2 py-1 bg-gray-100 rounded" onClick={() => formatText('italic')}>Italic</button>
                  <button type="button" className="px-2 py-1 bg-gray-100 rounded" onClick={() => formatText('underline')}>Underline</button>
                  <button type="button" className="px-2 py-1 bg-gray-100 rounded" onClick={() => formatText('insertHTML', '<code>code</code>')}>Code</button>
                  <button type="button" className="px-2 py-1 bg-gray-100 rounded" onClick={() => addLink()}>Link</button>
                  <button type="button" className="px-2 py-1 bg-gray-100 rounded" onClick={() => toggleList()}>Bullets</button>
                </div>

                <div
                  ref={descRef}
                  onInput={() => setForm({ ...form, description: descRef.current ? descRef.current.innerHTML : '' })}
                  onPaste={handlePaste}
                  contentEditable
                  className="border p-2 w-full min-h-[120px] rounded"
                  dangerouslySetInnerHTML={{ __html: form.description }}
                  role="textbox"
                  aria-multiline="true"
                />
            </div>

            {/* Image: URL or upload */}
            <div className="flex flex-col md:flex-row gap-2 items-start">
              <input className="border p-2 flex-1" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
              <div className="flex items-center gap-2">
                <input type="file" accept="image/*" id="imageUpload" className="hidden" onChange={handleFileUpload} />
                <label htmlFor="imageUpload" className="px-3 py-2 bg-gray-100 rounded cursor-pointer">Upload Image</label>
                {form.image && <button type="button" className="px-2 py-1 bg-red-200 rounded" onClick={() => setForm({ ...form, image: '' })}>Clear</button>}
              </div>
            </div>
            <input className="border p-2" placeholder="Technologies (comma separated)" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} />
            <input className="border p-2" placeholder="GitHub Link" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} />
            <input className="border p-2" placeholder="Live Demo Link" value={form.demo} onChange={(e) => setForm({ ...form, demo: e.target.value })} />
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit">{editing ? 'Save' : 'Add'}</button>
              <button type="button" onClick={() => { setShowForm(false); resetForm(); }} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
            </div>
          </div>
        </form>
      )}

      {confirmOpen && (
        <ConfirmModal open={confirmOpen} title="Delete Project" message="Are you sure you want to delete this project?" onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Technologies</th>
              <th className="px-4 py-2 text-left">Links</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {loading ? (
              <tr><td colSpan={4} className="p-4"><Spinner /></td></tr>
            ) : projects.length === 0 ? (
              <tr><td colSpan={4} className="p-4">No projects</td></tr>
            ) : projects.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-2">{p.title}</td>
                <td className="px-4 py-2">{(p.technologies || []).join(', ')}</td>
                <td className="px-4 py-2">
                  {p.github && <a className="text-blue-600 mr-2" href={p.github} target="_blank" rel="noreferrer">GitHub</a>}
                  {p.demo && <a className="text-blue-600" href={p.demo} target="_blank" rel="noreferrer">Demo</a>}
                </td>
                <td className="px-4 py-2 text-center">
                  <button onClick={() => startEdit(p)} className="mr-2 px-3 py-1 bg-yellow-400 rounded">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

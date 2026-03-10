"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/AdminHeader';
import Spinner from '@/components/Spinner';

export default function AdminMessages() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function checkAuth() {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (!mounted) return;
      if (!res.ok) return router.push('/admin/login');
      fetchMessages();
    }
    checkAuth();
    return () => { mounted = false; };
  }, []);

  async function fetchMessages() {
    setLoading(true);
    const res = await fetch('/api/messages');
    if (res.ok) {
      const data = await res.json();
      setMessages(data.messages || []);
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm('Delete this message?')) return;
    const res = await fetch(`/api/messages/${id}`, { method: 'DELETE', credentials: 'include' });
    if (res.ok) {
      setMessages(prev => prev.filter(m => m.id !== id));
    } else {
      alert('Failed to delete');
    }
  }

  return (
    <div className="p-6">
      <AdminHeader />
      <h1 className="text-2xl font-semibold mb-4">Messages</h1>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Message</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {loading ? (
              <tr><td colSpan={5} className="p-4"><Spinner /></td></tr>
            ) : messages.length === 0 ? (
              <tr><td colSpan={5} className="p-4">No messages</td></tr>
            ) : messages.map(msg => (
              <tr key={msg.id}>
                <td className="px-4 py-2">{msg.name}</td>
                <td className="px-4 py-2">{msg.email}</td>
                <td className="px-4 py-2 break-words max-w-xs">{msg.message}</td>
                <td className="px-4 py-2">{new Date(msg.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2 text-center">
                  <button onClick={() => handleDelete(msg.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
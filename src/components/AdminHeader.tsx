"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function AdminHeader() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch (err) {
      // ignore
    }
    router.push('/admin/login');
  }

  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold">Admin Panel</h1>
        <p className="text-sm text-gray-400">Manage projects and messages</p>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => router.push('/admin/dashboard')} className="px-3 py-1 rounded bg-gray-100">Dashboard</button>
        <button onClick={() => router.push('/admin/projects')} className="px-3 py-1 rounded bg-gray-100">Table</button>
        <button onClick={() => router.push('/admin/cards')} className="px-3 py-1 rounded bg-gray-100">Cards</button>
        <button onClick={() => router.push('/admin/messages')} className="px-3 py-1 rounded bg-gray-100">Messages</button>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded">Logout</button>
      </div>
    </header>
  );
}

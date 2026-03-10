"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/AdminHeader';

export default function Dashboard() {
  const router = useRouter();
  useEffect(() => {
    let mounted = true;
    async function check() {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (!mounted) return;
      if (!res.ok) router.push('/admin/login');
    }
    check();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="p-6">
      <AdminHeader />
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <div className="space-y-3">
        <a href="/admin/projects" className="inline-block px-4 py-2 bg-blue-600 text-white rounded">Manage Projects</a>
        <a href="/admin/messages" className="inline-block px-4 py-2 bg-blue-600 text-white rounded">View Messages</a>
      </div>
    </div>
  );
}

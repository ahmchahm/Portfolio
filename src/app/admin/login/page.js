"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Spinner';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data?.error || 'Login failed');
        setLoading(false);
        return;
      }
      router.push('/admin/projects');
    } catch (err) {
      setError('Network error');
      setLoading(false);
    }
  }

  useEffect(() => {
    let mounted = true;
    async function check() {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (!mounted) return;
      if (res.ok) router.push('/admin/projects');
    }
    check();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border rounded p-2 bg-gray-50 text-gray-900" type="email" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full border rounded p-2 bg-gray-50 text-gray-900" type="password" required />
          </div>
          <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2">
            {loading ? <Spinner /> : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useAuth from '@/hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [role, setRole] = useState<'user' | 'neuroscientist'>('user');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      id: String(Date.now()),
      name: name || (role === 'user' ? 'Harmony User' : 'Neuro Researcher'),
      role,
    } as const;
    login(user);

    // Redirect based on role
    if (role === 'neuroscientist') {
      router.push('/neuro-dashboard');
    } else {
      router.push('/user-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <main className="max-w-3xl mx-auto p-6 pt-28">
        <h1 className="text-3xl font-bold mb-4">Login / Sign Up</h1>
        <p className="text-sm text-[#a9b1d6] mb-6">Choose the role that best describes you.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-md bg-[#0f1626] border border-[#2a3254]"
            placeholder="Your display name (optional)"
          />

          <div className="flex gap-3">
            <button type="button" onClick={() => setRole('user')} className={`px-4 py-2 rounded ${role === 'user' ? 'bg-[#5b9eff]' : 'bg-[#2a3254]'}`}>
              User
            </button>
            <button type="button" onClick={() => setRole('neuroscientist')} className={`px-4 py-2 rounded ${role === 'neuroscientist' ? 'bg-[#7c3aed]' : 'bg-[#2a3254]'}`}>
              Neuroscientist
            </button>
          </div>

          <div>
            <button className="px-6 py-3 bg-gradient-to-r from-[#5b9eff] to-[#7c3aed] text-white rounded-md">Continue</button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

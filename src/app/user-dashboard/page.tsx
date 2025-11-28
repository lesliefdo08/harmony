'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserDashboard() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6 pt-28">
        <h1 className="text-3xl font-bold mb-4">Welcome back, {user?.name}</h1>
        <p className="text-sm text-[#a9b1d6] mb-6">Your personalized sessions and progress will appear here.</p>

        <section className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#0f1626] rounded-lg">Personalized Sessions (mock)</div>
          <div className="p-6 bg-[#0f1626] rounded-lg">Session History (mock)</div>
          <div className="p-6 bg-[#0f1626] rounded-lg">Mood & Progress (mock)</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

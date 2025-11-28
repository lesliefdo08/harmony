'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NeuroDashboard() {
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
        <h1 className="text-3xl font-bold mb-4">Neuroscientist Dashboard</h1>
        <p className="text-sm text-[#a9b1d6] mb-6">Clinical analytics and aggregated insights (mock).</p>

        <section className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#0f1626] rounded-lg">Full Analytics (mock)</div>
          <div className="p-6 bg-[#0f1626] rounded-lg">Aggregated Insights (mock)</div>
          <div className="p-6 bg-[#0f1626] rounded-lg">Research Metrics (mock)</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

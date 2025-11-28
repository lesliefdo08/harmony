'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ScienceSection from '@/components/ScienceSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import PWAInstaller from '@/components/PWAInstaller';
import AnalyticsDashboard from '@/components/stats/AnalyticsDashboard';
import WaveRecommendation from '@/components/WaveRecommendation';
import ScrollToTop from '@/components/ScrollToTop';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Skip to main content */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <Header />
      <main id="main-content" className="gpu-accelerate">
        <HeroSection />
        
        {/* Wave Recommendation Section */}
        <WaveRecommendation />
        
        {/* Analytics Dashboard */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <AnalyticsDashboard />
        </section>

        <ScienceSection />
        <AboutSection />
      </main>
      <Footer />
      <AIAssistant />
      <PWAInstaller />
      <ScrollToTop />
    </div>
  );
}

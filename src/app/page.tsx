import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MusicPlayer from '@/components/MusicPlayer';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main>
        <HeroSection />
        <MusicPlayer />
      </main>
      <Footer />
    </div>
  );
}

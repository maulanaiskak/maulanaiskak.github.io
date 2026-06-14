import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0d0d]">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
      <footer className="py-6 text-center text-gray-600 text-sm border-t border-white/5">
        Built with Next.js, Three.js &amp; Framer Motion &bull; &copy; 2025 Maulana Iskak
      </footer>
    </main>
  );
}

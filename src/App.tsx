import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Skills } from './components/Skills';
import { TradingSection } from './components/TradingSection';
import { Contact } from './components/Contact';
import { Scene3D } from './components/Scene3D';
import { CursorFollower } from './components/CursorFollower';
import { motion, useScroll, useSpring } from 'motion/react';

const MainLayout: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-primary/30 selection:text-white overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Interactive Background */}
      <Scene3D />
      
      {/* Custom Cursor */}
      <CursorFollower />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        
        <section id="projects">
          <Portfolio />
        </section>

        <Skills />

        <section id="trading">
          <TradingSection />
        </section>

        <Contact />
      </main>

      {/* Footer / Decorative */}
      <footer className="py-12 text-center text-white/20 text-[10px] uppercase tracking-[0.5em]">
        Designed with passion by Abhay Kirti
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}


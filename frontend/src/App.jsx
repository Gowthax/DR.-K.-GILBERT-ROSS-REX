import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiteNavbar from './components/SiteNavbar';

import Preloader from './components/Preloader';
import HeroSection from './sections/HeroSection';
import AcademicProfileSection from './sections/AcademicProfileSection';
import ResearchSection from './sections/ResearchSection';
import PublicationsSection from './sections/PublicationsSection';
import AchievementsSection from './sections/AchievementsSection';
import ImpactSection from './sections/ImpactSection';
import CollaborationSection from './sections/CollaborationSection';
import SiteFooter from './components/SiteFooter';
import CertificationsPage from './pages/CertificationsPage';
import { Routes, Route } from 'react-router-dom';
import './index.css';

const MainContent = () => (
  <main id="main-content">
    <HeroSection />
    <AcademicProfileSection />
    <ResearchSection />
    <PublicationsSection />
    <ImpactSection />
    <AchievementsSection />
    <CollaborationSection />
  </main>
);

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => { lenis.raf(time * 1000); });
    };
  }, []);

  return (
    <div className="app-container">
      <Preloader />

      <SiteNavbar />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/certifications" element={<CertificationsPage />} />
      </Routes>
      <SiteFooter />
    </div>
  );
}

export default App;

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate, useLocation } from 'react-router-dom';
import './SiteNavbar.css';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: '01 — IDENTITY',    id: 'hero' },
  { label: '02 — PROFILE',     id: 'academic-profile' },
  { label: '03 — RESEARCH',    id: 'research' },
  { label: '04 — PUBLICATIONS',id: 'publications' },
  { label: '05 — ACHIEVEMENTS',id: 'achievements' },
  { label: '06 — CONTACT',     id: 'collaboration' },
  { label: '07 — CERTIFICATIONS', id: 'certifications', route: '/certifications' }
];

const SiteNavbar = () => {
  const navRef = useRef(null);
  const progressRef = useRef(null);
  const [activeId, setActiveId] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Scroll progress bar
    const updateProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
      setScrolled(window.scrollY > 80);
    };

    // Active section detection
    const observers = navItems.map(({ id, route }) => {
      if (route) return null;
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { threshold: 0.25, rootMargin: '-10% 0px -10% 0px' }
      );
      observer.observe(el);
      return observer;
    });

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => {
      observers.forEach(o => o && o.disconnect());
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  const scrollTo = (item) => {
    setMobileMenuOpen(false);
    if (item.route) {
      navigate(item.route);
      setActiveId(item.id);
      return;
    }
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(item.id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      const el = document.getElementById(item.id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`site-navbar ${scrolled ? 'is-scrolled' : ''}`} ref={navRef} aria-label="Main navigation">
      {/* Scroll progress indicator */}
      <div className="nav-progress-bar" ref={progressRef} />

      <div className="nav-inner">
        <button className="nav-logo" onClick={() => scrollTo({ id: 'hero' })} aria-label="Go to top">
          DR. K. GILBERT ROSS REX
        </button>

        {/* Desktop nav links */}
        <ul className="nav-links" role="list">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-item ${activeId === item.id ? 'is-active' : ''}`}
                onClick={() => scrollTo(item)}
                aria-current={activeId === item.id ? 'true' : undefined}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Nav Header Controls */}
        <div className="mobile-nav-controls">
          <span className="mobile-chapter-label">
            {navItems.find(n => n.id === activeId)?.label || '01 — IDENTITY'}
          </span>
          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'is-open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'is-active' : ''}`}>
        <div className="mobile-drawer-header">NAVIGATE SECTIONS</div>
        <ul className="mobile-drawer-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`mobile-drawer-item ${activeId === item.id ? 'is-active' : ''}`}
                onClick={() => scrollTo(item)}
              >
                <span>{item.label}</span>
                {activeId === item.id && <span className="active-dot">✦</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SiteNavbar;

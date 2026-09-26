import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profileData } from '../data/profile';
import TechText from '../components/TechText';
import BlurText from '../components/BlurText';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const portraitRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [nameReady, setNameReady] = useState(false);

  useEffect(() => {
    // Delay TechText mount until after preloader split-curtain curtain lift (~3.5s)
    const t = setTimeout(() => setNameReady(true), 3500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.5 });

      // Portrait entrance
      tl.fromTo('.hero-portrait-wrap',
        { opacity: 0, scale: 1.06, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.8, ease: 'power3.out' }
      )
      .fromTo('.hero-section-num',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' }, '-=1.4'
      )
      .fromTo('.hero-designation',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=1.1'
      )
      // TechText name block entrance
      .fromTo('.hero-name-canvas-wrap',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.8'
      )
      .fromTo('.hero-institution-block',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5'
      )
      // BlurText statement handled by its own IntersectionObserver
      .fromTo('.hero-statement-wrap',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, '-=0.4'
      )
      .fromTo('.hero-cta',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5'
      )
      .fromTo('.hero-side-label',
        { opacity: 0, x: 15 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' }, '-=0.7'
      )
      .fromTo('.hero-scroll-hint',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 }, '-=0.3'
      );

      // Scroll-driven portrait parallax
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          const prog = self.progress;
          if (portraitRef.current) {
            gsap.set(portraitRef.current, { y: prog * 80, scale: 1 + prog * 0.04 });
          }
        }
      });

      // Scroll-driven content fade
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
        onUpdate: (self) => {
          const prog = self.progress;
          gsap.set('.hero-content-block', { y: prog * -40, opacity: 1 - prog * 1.8 });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const scrollToNext = () => {
    document.getElementById('academic-profile')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="hero-section"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      aria-label="Identity and introduction"
    >
      {/* Scientific background geometry */}
      <div className="hero-bg-geometry" aria-hidden="true">
        <div className="geo-circle geo-circle-1" />
        <div className="geo-circle geo-circle-2" />
        <div className="geo-line geo-line-1" />
        <div className="geo-line geo-line-2" />
        <div className="geo-dots" />
      </div>

      <div className="hero-grid">

        {/* LEFT — Portrait column */}
        <div className="hero-portrait-col">
          <div
            className="hero-portrait-wrap"
            ref={portraitRef}
            style={{ transform: `translate3d(${mousePos.x * 8}px, ${mousePos.y * 5}px, 0)` }}
            data-cursor="VIEW"
          >
            <div className="portrait-ring-outer" aria-hidden="true" />
            <div className="portrait-ring-inner" aria-hidden="true" />
            <img
              src="/Dr.Gilbert Ross Rex portrait.png"
              alt="Dr. K. Gilbert Ross Rex — Associate Professor of Biotechnology, Sethu Institute of Technology"
              className="portrait-image"
              loading="eager"
              fetchPriority="high"
            />
          </div>

          <div className="hero-side-label" aria-hidden="true">
            <span>Biotechnology</span>
            <span>RESEARCH</span>
            <span>ACADEMIA</span>
          </div>
        </div>

        {/* RIGHT — Content column */}
        <div className="hero-content-block">
          <div className="hero-section-num section-label">01 — IDENTITY</div>

          <div className="hero-designation section-label" style={{ marginTop: '24px', color: 'var(--green-mid)' }}>
            ASSOCIATE PROFESSOR
          </div>

          {/* ── Text name ── */}
          <div
            className="hero-name-canvas-wrap"
            aria-label="Dr. K. Gilbert Ross Rex"
          >
            <h1 className="hero-name">DR. K. GILBERT ROSS REX</h1>
          </div>

          <div className="hero-institution-block">
            <div className="thin-rule" style={{ maxWidth: '260px', marginBottom: '16px' }} />
            <div className="hero-inst-badge-row">
              <img src={profileData.institutionLogo} alt={profileData.institution} className="hero-inst-logo-img" />
              <div>
                <p className="hero-dept">{profileData.department}</p>
                <p className="hero-inst">{profileData.institution}</p>
              </div>
            </div>
          </div>

          {/* ── BlurText research statement ── */}
          <div className="hero-statement-wrap" aria-label="Research statement">
            <div className="hero-statement-border" aria-hidden="true" />
            <BlurText
              text="Researching at the intersection of molecular biology, genetic engineering, plant Biotechnology and environmental Biotechnology."
              delay={60}
              animateBy="words"
              direction="bottom"
              stepDuration={0.4}
              threshold={0.1}
              className="hero-blur-statement"
            />
          </div>

          <button
            className="hero-cta"
            onClick={() => document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Explore research domains"
            data-cursor="EXPLORE"
          >
            <span>Explore Research</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>

      <button className="hero-scroll-hint" onClick={scrollToNext} aria-label="Scroll to next section">
        <span>SCROLL</span>
        <div className="scroll-line-anim" aria-hidden="true" />
      </button>
    </section>
  );
};

export default HeroSection;

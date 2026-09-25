import React, { useEffect, useRef, useState } from 'react';
import { profileData } from '../data/profile';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import './Home.css';

const Home = () => {
  const containerRef = useRef(null);
  const portraitRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out'
        }
      });

      /*
       * Initial state
       * Keep the portrait completely clean — no white overlays,
       * no artificial frame, no vignette.
       */
      gsap.set('.hero-professor-figure', {
        opacity: 0,
        y: 35,
        scale: 0.97
      });

      gsap.set(
        [
          '.academic-tag',
          '.professor-headline-name',
          '.institution-metadata',
          '.academic-separator-hero',
          '.research-focus-panel',
          '.academic-stats-grid',
          '.hero-cta-group'
        ],
        {
          opacity: 0,
          y: 24
        }
      );

      gsap.set('.stat-cell', {
        opacity: 0,
        y: 18
      });

      /*
       * Cinematic portrait entrance
       */
      tl.to('.hero-professor-figure', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.8,
        ease: 'power3.out'
      })

        /*
         * Identity
         */
        .to(
          '.academic-tag',
          {
            opacity: 1,
            y: 0,
            duration: 0.7
          },
          '-=1.1'
        )

        .to(
          '.professor-headline-name',
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
          },
          '-=0.5'
        )

        /*
         * Institution
         */
        .to(
          '.institution-metadata',
          {
            opacity: 1,
            y: 0,
            duration: 0.7
          },
          '-=0.65'
        )

        /*
         * Divider
         */
        .to(
          '.academic-separator-hero',
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.7,
            transformOrigin: 'left center'
          },
          '-=0.45'
        )

        /*
         * Research
         */
        .to(
          '.research-focus-panel',
          {
            opacity: 1,
            y: 0,
            duration: 0.75
          },
          '-=0.4'
        )

        /*
         * Statistics
         */
        .to(
          '.academic-stats-grid',
          {
            opacity: 1,
            y: 0,
            duration: 0.6
          },
          '-=0.35'
        )

        .to(
          '.stat-cell',
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.55,
            ease: 'power2.out'
          },
          '-=0.35'
        )

        /*
         * CTA
         */
        .to(
          '.hero-cta-group',
          {
            opacity: 1,
            y: 0,
            duration: 0.7
          },
          '-=0.2'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /*
   * Subtle cinematic mouse movement.
   * The movement is deliberately small so the portrait
   * never gets pushed into the viewport edge.
   */
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    const x =
      ((e.clientX - rect.left) / rect.width - 0.5) * 2;

    const y =
      ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    setMousePos({
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y))
    });
  };

  return (
    <main
      className="hero-fullscreen-wrapper"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* =====================================================
          TOP NAVIGATION
      ====================================================== */}

      <header className="hero-navigation">
        <Link to="/" className="hero-logo">
          DR. K. GILBERT ROSS REX
        </Link>

        <nav className="hero-nav-links">
          <a href="#identity" className="active">
            01 — IDENTITY
          </a>

          <a href="#profile">
            02 — PROFILE
          </a>

          <Link to="/research">
            03 — RESEARCH
          </Link>

          <Link to="/publications">
            04 — PUBLICATIONS
          </Link>

          <Link to="/achievements">
            05 — ACHIEVEMENTS
          </Link>
        </nav>
      </header>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        id="identity"
        className="hero-grid-container"
      >

        {/* ===================================================
            PORTRAIT
        ==================================================== */}

        <div className="hero-portrait-stage">

          <div
            className="hero-professor-anchor"
            style={{
              transform: `
                translate3d(
                  ${mousePos.x * 5}px,
                  ${mousePos.y * 4}px,
                  0
                )
              `
            }}
          >

            <div
              className="hero-professor-figure"
              ref={portraitRef}
            >
              <img
                src="/Dr.Gilbert Ross Rex portrait.png"
                alt="Dr. K. Gilbert Ross Rex"
                className="professor-portrait-img"
                draggable="false"
              />
            </div>

          </div>

          {/* Vertical academic label */}

          <div className="portrait-side-label">
            <span>BIOTECHNOLOGY</span>
            <span>RESEARCH</span>
            <span>ACADEMIA</span>
          </div>

          {/* Small identity marker */}

          <div className="portrait-category">
            <span className="category-dot" />
            <span>BIOTECHNOLOGY RESEARCH</span>
          </div>

        </div>


        {/* ===================================================
            CONTENT
        ==================================================== */}

        <div className="hero-content-right">

          <div className="academic-tag">
            <span className="tag-pulse-dot" />
            <span>
              {profileData.designation.toUpperCase()}
            </span>
          </div>


          <h1 className="professor-headline-name">
            <span className="name-title-prefix">
              Dr. K.
            </span>

            <span className="name-highlight">
              Gilbert Ross Rex
            </span>
          </h1>


          <div className="institution-metadata">
            <p className="dept-name">
              {profileData.department}
            </p>

            <p className="inst-name">
              {profileData.institution}
            </p>
          </div>


          <div className="academic-separator-hero" />


          <div className="research-focus-panel">

            <div className="panel-header">
              <span className="panel-title">
                PRIMARY RESEARCH FOCUS
              </span>

              <span className="panel-pill">
                LIFESCIENCES
              </span>
            </div>

            <ul className="focus-list">
              {profileData.researchFocus.map(
                (focus, idx) => (
                  <li
                    key={idx}
                    className="focus-item"
                  >
                    <span className="focus-bullet-marker" />

                    <span className="focus-text">
                      {focus}
                    </span>
                  </li>
                )
              )}
            </ul>

          </div>


          <div className="academic-stats-grid">

            {profileData.stats.map(
              (stat, i) => (
                <div
                  key={i}
                  className="stat-cell"
                >
                  <div className="stat-number">
                    {stat.value}
                  </div>

                  <div className="stat-desc">
                    {stat.label}
                  </div>
                </div>
              )
            )}

          </div>


          <div className="hero-cta-group">

            <Link
              to="/research"
              className="btn-academic-primary"
            >
              <span>
                Explore Research
              </span>

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </Link>


            <Link
              to="/about"
              className="btn-academic-secondary"
            >
              Academic Profile
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM SCROLL INDICATOR
      ====================================================== */}

      <div className="hero-scroll-indicator">

        <span className="scroll-number">
          01
        </span>

        <span className="scroll-line" />

        <span className="scroll-text">
          SCROLL TO EXPLORE
        </span>

      </div>

    </main>
  );
};

export default Home;
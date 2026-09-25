import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { researchDomains, projectsData } from '../data/projects';
import BlurText from '../components/BlurText';
import './ResearchSection.css';

gsap.registerPlugin(ScrollTrigger);

const ResearchSection = () => {
  const sectionRef = useRef(null);
  const [activeDomain, setActiveDomain] = useState(researchDomains[0]);
  const imageRef = useRef(null);
  const detailRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance
      gsap.fromTo('.rs-header',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.rs-header', start: 'top 78%' }
        }
      );

      gsap.fromTo('.domain-nav-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', stagger: 0.07,
          scrollTrigger: { trigger: '.domain-nav', start: 'top 78%' }
        }
      );

      gsap.fromTo('.rs-canvas',
        { opacity: 0, scale: 1.04 },
        {
          opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.rs-canvas', start: 'top 78%' }
        }
      );

      // Projects
      gsap.utils.toArray('.project-strip').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: i * 0.08,
            scrollTrigger: { trigger: el, start: 'top 85%' }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleDomainChange = (domain) => {
    // Animate out
    if (imageRef.current && detailRef.current) {
      gsap.to([imageRef.current, detailRef.current], {
        opacity: 0, y: 10, duration: 0.2, ease: 'power2.in',
        onComplete: () => {
          setActiveDomain(domain);
          gsap.to([imageRef.current, detailRef.current], {
            opacity: 1, y: 0, duration: 0.5, ease: 'power2.out'
          });
        }
      });
    } else {
      setActiveDomain(domain);
    }
  };

  return (
    <section
      id="research"
      className="rs-section"
      ref={sectionRef}
      aria-label="Research domains and projects"
    >
      <div className="section-chapter-marker" aria-hidden="true">03</div>

      <div className="rs-inner">

        {/* Header */}
        <div className="rs-header">
          <div className="section-label" style={{ color: 'var(--green-muted)' }}>
            03 — RESEARCH DOMAINS
          </div>
          <h2 className="rs-heading">
            RESEARCH<br />DOMAINS
          </h2>
          <BlurText
            text="Translational biotechnology across molecular, genetic, agricultural and environmental systems."
            delay={55}
            animateBy="words"
            direction="bottom"
            stepDuration={0.35}
            threshold={0.1}
            className="rs-subheading"
          />
        </div>

        {/* Interactive Explorer */}
        <div className="rs-explorer">

          {/* Left: Domain Nav */}
          <nav className="domain-nav" aria-label="Research domain navigation">
            {researchDomains.map((domain, i) => (
              <button
                key={domain.id}
                className={`domain-nav-item ${activeDomain.id === domain.id ? 'is-active' : ''}`}
                onClick={() => handleDomainChange(domain)}
                aria-pressed={activeDomain.id === domain.id}
                data-cursor="EXPLORE"
              >
                <span className="domain-num">0{i + 1}</span>
                <div className="domain-info">
                  <span className="domain-title">{domain.title}</span>
                  <span className="domain-subtitle">{domain.subtitle}</span>
                </div>
                <div className="domain-arrow" aria-hidden="true">→</div>
              </button>
            ))}
          </nav>

          {/* Right: Research Canvas */}
          <div className="rs-canvas" aria-live="polite" aria-atomic="true">
            {/* Image */}
            <div className="rs-image-stage" ref={imageRef}>
              <img
                src={activeDomain.image}
                alt={`${activeDomain.title} research domain`}
                className="rs-domain-image"
                loading="lazy"
              />
              <div className="rs-image-overlay" aria-hidden="true" />
              <div className="rs-image-label" aria-hidden="true">
                <span className="active-pill">● ACTIVE DISCIPLINE</span>
              </div>
            </div>

            {/* Detail */}
            <div className="rs-domain-detail" ref={detailRef}>
              <div className="rs-detail-header">
                <h3 className="rs-domain-title">{activeDomain.title}</h3>
                <span className="rs-domain-sub">{activeDomain.subtitle}</span>
              </div>
              <p className="rs-domain-desc">{activeDomain.description}</p>
              <div className="rs-key-areas">
                <span className="areas-label">INVESTIGATION AREAS</span>
                <div className="areas-tags">
                  {activeDomain.keyAreas.map((area, idx) => (
                    <span key={idx} className="area-tag">{area}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Funded Projects */}
        <div className="rs-projects">
          <div className="projects-header">
            <h3 className="ap-sub-heading">FUNDED RESEARCH & GRANTS</h3>
          </div>
          <div className="projects-list">
            {projectsData.map((project, i) => (
              <div key={i} className="project-strip" role="listitem">
                <div className="project-strip-meta">
                  <span className={`project-status ${project.status === 'Ongoing' ? 'ongoing' : 'completed'}`}>
                    {project.status}
                  </span>
                  <span className="project-funding">{project.funding}</span>
                </div>
                <div className="project-strip-body">
                  <h4 className="project-strip-title">{project.title}</h4>
                  <p className="project-strip-agency">{project.agency}</p>
                </div>
                <span className="project-badge-tag">{project.awardBadge}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ResearchSection;

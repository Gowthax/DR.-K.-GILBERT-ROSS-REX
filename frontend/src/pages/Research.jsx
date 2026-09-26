import React, { useState, useEffect, useRef } from 'react';
import { researchDomains, projectsData } from '../data/projects';
import gsap from 'gsap';
import './Research.css';

const Research = () => {
  const [activeDomain, setActiveDomain] = useState(researchDomains[0]);
  const displayCardRef = useRef(null);

  useEffect(() => {
    if (displayCardRef.current) {
      gsap.fromTo(displayCardRef.current,
        { opacity: 0, y: 15, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' }
      );
    }
  }, [activeDomain]);

  return (
    <div className="section-container research-section">
      
      {/* Page Header */}
      <div className="research-header-block">
        <div className="academic-badge-tag">
          <span className="badge-pulse" />
          <span>RESEARCH & INNOVATION LAB</span>
        </div>
        <h1 className="page-title text-gradient">Biotechnology Research Domains</h1>
        <p className="research-intro-lead">
          Pioneering translational research at the intersection of molecular genetics, sustainable agricultural bioformulations, and circular bio-economy solutions.
        </p>
      </div>

      {/* Interactive Research Domain Showcase */}
      <div className="research-showcase-container">
        
        {/* Left Column: Domain Selector List */}
        <div className="domain-selection-nav">
          <div className="nav-header-label">SELECT RESEARCH DISCIPLINE</div>
          {researchDomains.map(domain => {
            const isActive = activeDomain.id === domain.id;
            return (
              <button
                key={domain.id}
                className={`domain-select-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveDomain(domain)}
              >
                <div className="domain-active-bar" />
                <div className="domain-btn-content">
                  <span className="domain-btn-title">{domain.title}</span>
                  <span className="domain-btn-subtitle">{domain.subtitle}</span>
                </div>
                <div className="domain-chevron">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: High-Visibility Field Display with Related Image */}
        <div className="domain-featured-stage" ref={displayCardRef}>
          <div className="featured-image-wrapper">
            <img
              src={activeDomain.image}
              alt={activeDomain.title}
              className="featured-domain-img"
            />
            <div className="featured-image-vignette" />
            <div className="featured-field-pill">
              <span className="pill-dot" />
              <span>ACTIVE RESEARCH DISCIPLINE</span>
            </div>
          </div>

          <div className="featured-domain-details">
            <div className="featured-title-wrap">
              <h2 className="featured-title">{activeDomain.title}</h2>
              <span className="featured-subtitle">{activeDomain.subtitle}</span>
            </div>
            
            <p className="featured-description" dangerouslySetInnerHTML={{ __html: activeDomain.description }}></p>

            <div className="key-areas-section">
              <span className="areas-header">INVESTIGATION FOCUS AREAS</span>
              <div className="areas-tags-list">
                {activeDomain.keyAreas.map((area, idx) => (
                  <span key={idx} className="area-tag-pill">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Funded Research Projects Grid */}
      <div className="funded-projects-container">
        <div className="section-title-wrap">
          <h2 className="section-heading">Funded Research Projects & Grants</h2>
          <p className="section-subtitle">
            Government and institution-sponsored research programs developing sustainable Biotechnology solutions.
          </p>
        </div>

        <div className="projects-grid">
          {projectsData.map((project, i) => (
            <div key={i} className="project-card glass-panel">
              <div className="project-header">
                <span className={`project-status-badge ${project.status.toLowerCase()}`}>
                  {project.status}
                </span>
                <span className="project-funding-amt">{project.funding}</span>
              </div>
              
              <h3 className="project-title" dangerouslySetInnerHTML={{ __html: project.title }} />
              
              <div className="project-meta-box">
                <div className="meta-line">
                  <span className="meta-key">Grant Agency:</span>
                  <span className="meta-val">{project.agency}</span>
                </div>
                <div className="meta-line">
                  <span className="meta-key">Focus Area:</span>
                  <span className="meta-val">{project.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Research;

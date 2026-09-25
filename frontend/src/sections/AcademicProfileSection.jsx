import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { educationData, experienceData } from '../data/timeline';
import { profileData } from '../data/profile';
import BlurText from '../components/BlurText';
import './AcademicProfileSection.css';

gsap.registerPlugin(ScrollTrigger);

const AcademicProfileSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header
      gsap.fromTo('.ap-header-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.ap-header-content', start: 'top 80%' }
        }
      );

      // Big number
      gsap.fromTo('.ap-years-display',
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.ap-years-display', start: 'top 80%' }
        }
      );

      // Timeline entries
      gsap.utils.toArray('.timeline-entry').forEach((entry, i) => {
        gsap.fromTo(entry,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.08,
            scrollTrigger: { trigger: entry, start: 'top 85%' }
          }
        );
      });

      // Timeline line draw
      gsap.fromTo('.timeline-track-line',
        { scaleY: 0 },
        {
          scaleY: 1, duration: 2, ease: 'power2.out', transformOrigin: 'top',
          scrollTrigger: { trigger: '.timeline-track', start: 'top 80%' }
        }
      );

      // Education entries
      gsap.utils.toArray('.edu-entry').forEach((entry, i) => {
        gsap.fromTo(entry,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: i * 0.1,
            scrollTrigger: { trigger: entry, start: 'top 85%' }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="academic-profile"
      className="ap-section"
      ref={sectionRef}
      aria-label="Academic profile and career timeline"
    >
      {/* Section chapter marker */}
      <div className="section-chapter-marker" aria-hidden="true">02</div>

      <div className="ap-inner">

        {/* Header */}
        <div className="ap-header-content">
          <div className="section-label" style={{ color: 'var(--green-muted)' }}>
            02 — ACADEMIC PROFILE
          </div>
          <h2 className="ap-heading">
            ACADEMIC<br />PROFILE
          </h2>
          <BlurText
            text={profileData.profileSummary}
            delay={40}
            animateBy="words"
            direction="bottom"
            stepDuration={0.35}
            threshold={0.1}
            className="ap-summary"
          />
        </div>

        <div className="thin-rule ap-rule" />

        {/* Experience Timeline */}
        <div className="ap-timeline-block">
          <div className="ap-years-display">
            <span className="years-number">8+</span>
            <span className="years-label">YEARS OF<br />ACADEMIC<br />EXPERIENCE</span>
          </div>

          <div className="timeline-track">
            <div className="timeline-track-line" aria-hidden="true" />
            {experienceData.map((exp, i) => (
              <div key={i} className="timeline-entry" role="listitem">
                <div className="entry-dot" aria-hidden="true">
                  {exp.type === 'Current Position' && <div className="dot-pulse" />}
                </div>
                <div className="entry-content">
                  <time className="entry-period">{exp.period}</time>
                  <h3 className="entry-role">{exp.role}</h3>
                  <div className="entry-inst-row">
                    {exp.logo && <img src={exp.logo} alt={exp.institution} className="entry-inst-logo" />}
                    <p className="entry-institution">{exp.institution}</p>
                  </div>
                  {exp.type === 'Current Position' && (
                    <span className="current-badge">CURRENT POSITION</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="ap-education-block">
          <h3 className="ap-sub-heading">EDUCATION</h3>
          <div className="edu-grid">
            {educationData.map((edu, i) => (
              <div key={i} className="edu-entry">
                <div className="edu-header-row">
                  <div className="edu-year">{edu.year}</div>
                  {edu.logo && <img src={edu.logo} alt={edu.institution} className="edu-inst-logo" />}
                </div>
                <div className="edu-content">
                  <h4 className="edu-degree">{edu.degree}</h4>
                  <p className="edu-institution">{edu.institution}</p>
                  {edu.details && <p className="edu-details">{edu.details}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AcademicProfileSection;

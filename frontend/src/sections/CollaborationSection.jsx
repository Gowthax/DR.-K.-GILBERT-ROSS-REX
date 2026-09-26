import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profileData } from '../data/profile';
import { Briefcase, GraduationCap, FlaskConical } from 'lucide-react';

import './CollaborationSection.css';

gsap.registerPlugin(ScrollTrigger);

const CollaborationSection = () => {
  const sectionRef = useRef(null);
  const ctaRef = useRef(null);
  const [ctaMagnetic, setCtaMagnetic] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.collab-heading',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.collab-heading', start: 'top 80%' }
        }
      );

      gsap.fromTo('.collab-sub-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: '.collab-sub-items', start: 'top 80%' }
        }
      );

      gsap.fromTo('.contact-detail-group',
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: '.contact-details-grid', start: 'top 95%' }
        }
      );

      gsap.fromTo('.collab-cta-wrap',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.collab-cta-wrap', start: 'top 95%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnetic CTA
  const handleCtaMouseMove = (e) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setCtaMagnetic({ x, y });
  };

  const handleCtaMouseLeave = () => {
    setCtaMagnetic({ x: 0, y: 0 });
  };

  return (
    <section
      id="collaboration"
      className="collab-section"
      ref={sectionRef}
      aria-label="Academic collaboration and contact"
    >
      <div className="section-chapter-marker" aria-hidden="true">06</div>

      <div className="collab-inner">

        <div className="collab-header-block">
          <div className="section-label" style={{ color: 'var(--green-muted)' }}>
            06 — ACADEMIC COLLABORATION
          </div>

          <h2 className="collab-heading">
            ACADEMIC<br />COLLABORATION
          </h2>

          <div className="collab-sub-items">
            {['RESEARCH', 'TEACHING', 'COLLABORATION', 'ENQUIRIES'].map((item, i) => (
              <span key={i} className="collab-sub-item">
                {item}
                {i < 3 && <span className="collab-sub-divider" aria-hidden="true">—</span>}
              </span>
            ))}
          </div>
        </div>

        <div className="thin-rule collab-rule" />

        {/* Contact Details */}
        <div className="contact-details-grid" aria-label="Contact information">

          <div className="contact-detail-group">
            <span className="contact-detail-label">EMAIL</span>
            <div className="contact-detail-values">
              {profileData.contact.email.map((email, i) => (
                <a
                  key={i}
                  href={`mailto:${email}`}
                  className="contact-link"
                  aria-label={`Send email to ${email}`}
                >
                  {email}
                </a>
              ))}
            </div>
          </div>

          <div className="contact-detail-group">
            <span className="contact-detail-label">PHONE</span>
            <a
              href={`tel:${profileData.contact.phone.replace(/\s+/g, '')}`}
              className="contact-link"
              aria-label={`Call ${profileData.contact.phone}`}
            >
              {profileData.contact.phone}
            </a>
          </div>

          <div className="contact-detail-group">
            <span className="contact-detail-label">INSTITUTION</span>
            <p className="contact-address">
              {profileData.department}<br />
              {profileData.institution}
            </p>
          </div>

          <div className="contact-detail-group">
            <span className="contact-detail-label">ADDRESS</span>
            <p className="contact-address">
              {profileData.contact.address.split(',').map((part, i) => (
                <span key={i} style={{ display: 'block' }}>{part.trim()}</span>
              ))}
            </p>
          </div>
          
          <div className="contact-detail-group social-group">
            <span className="contact-detail-label">SOCIAL & RESEARCH</span>
            <div className="social-links-row">
              <a href={profileData.contact.social.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link social-link" aria-label="LinkedIn">
                <Briefcase size={18} /> <span>LinkedIn</span>
              </a>
              <a href={profileData.contact.social.scholar} target="_blank" rel="noopener noreferrer" className="contact-link social-link" aria-label="Google Scholar">
                <GraduationCap size={18} /> <span>Google Scholar</span>
              </a>
              <a href={profileData.contact.social.researchgate} target="_blank" rel="noopener noreferrer" className="contact-link social-link" aria-label="ResearchGate">
                <FlaskConical size={18} /> <span>ResearchGate</span>
              </a>
            </div>
          </div>

        </div>

        {/* 3D Graphics overlay */}


        {/* CTA */}
        <div className="collab-cta-wrap">
          <a
            href={`mailto:${profileData.contact.email[0]}`}
            className="collab-cta-button"
            ref={ctaRef}
            onMouseMove={handleCtaMouseMove}
            onMouseLeave={handleCtaMouseLeave}
            style={{
              transform: `translate3d(${ctaMagnetic.x}px, ${ctaMagnetic.y}px, 0)`
            }}
            aria-label={`Start a conversation — email ${profileData.contact.email[0]}`}
            data-cursor="OPEN"
          >
            <span>START A CONVERSATION</span>
            <span className="cta-arrow">→</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default CollaborationSection;

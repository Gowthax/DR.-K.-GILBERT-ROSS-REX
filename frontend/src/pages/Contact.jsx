import React, { useEffect, useRef } from 'react';
import { profileData } from '../data/profile';
import gsap from 'gsap';
import './Contact.css';

const Contact = () => {
  const containerRef = useRef();

  useEffect(() => {
    gsap.fromTo('.contact-content', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <div className="section-container contact-section" ref={containerRef}>
      <div className="contact-content">
        <h1 className="contact-title text-gradient">Academic Collaboration</h1>
        
        <div className="contact-subheading">
          <span>Research</span>
          <span className="dot">•</span>
          <span>Teaching</span>
          <span className="dot">•</span>
          <span>Academic Collaboration</span>
          <span className="dot">•</span>
          <span>Enquiries</span>
        </div>

        <div className="contact-details glass-panel">
          <div className="contact-grid">
            
            <div className="contact-item">
              <h3>Email</h3>
              {profileData.contact.email.map((email, i) => (
                <a key={i} href={`mailto:${email}`} className="contact-link">{email}</a>
              ))}
            </div>

            <div className="contact-item">
              <h3>Phone</h3>
              <a href={`tel:${profileData.contact.phone.replace(/\s+/g, '')}`} className="contact-link">
                {profileData.contact.phone}
              </a>
            </div>

            <div className="contact-item full-width">
              <h3>Institutional Address</h3>
              <p className="address-text">{profileData.department},<br/>{profileData.institution}</p>
              <p className="address-text" style={{marginTop: '12px', fontSize: '0.85rem', color: 'var(--color-text-muted)'}}>
                {profileData.contact.address}
              </p>
            </div>

          </div>
        </div>

        <footer className="contact-footer">
          <p>© 2026 Dr. K. Gilbert Ross Rex. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Contact;

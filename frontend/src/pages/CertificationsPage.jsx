import React, { useEffect } from 'react';
import gsap from 'gsap';
import { certifications } from '../data/certifications';
import './CertificationsPage.css';

const CertificationsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo('.cert-card', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    );
  }, []);

  return (
    <section className="certifications-page" style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <div className="cert-container">
        <h1 className="cert-title">Certifications & Documents</h1>
        <p className="cert-subtitle">A collection of academic and professional certifications.</p>
        
        <div className="cert-grid">
          {certifications.map((cert) => (
            <div key={cert.id} className="cert-card">
              <div className="cert-pdf-preview">
                {cert.pdf.toLowerCase().endsWith('.pdf') ? (
                  <embed src={cert.pdf} type="application/pdf" width="100%" height="250px" />
                ) : (
                  <img src={cert.pdf} alt={cert.title} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                )}
              </div>
              <div className="cert-info">
                <h3>{cert.title}</h3>
                <a href={cert.pdf} target="_blank" rel="noopener noreferrer" className="cert-btn">
                  View Full Screen
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsPage;

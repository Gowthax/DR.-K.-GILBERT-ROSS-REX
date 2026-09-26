import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { achievementsData } from '../data/achievements';
import { certifications } from '../data/certifications';
import BlurText from '../components/BlurText';
import './AchievementsSection.css';

gsap.registerPlugin(ScrollTrigger);

const AchievementsSection = () => {
  const sectionRef = useRef(null);
  const [lightboxItem, setLightboxItem] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ach-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.ach-header', start: 'top 80%' }
        }
      );

      // Gallery items with staggered parallax entrance
      gsap.utils.toArray('.ach-gallery-item').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 60 + (i % 3) * 20, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', delay: i * 0.1,
            scrollTrigger: { trigger: el, start: 'top 85%' }
          }
        );
      });

      // Certifications
      gsap.utils.toArray('.cert-row').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', delay: i * 0.06,
            scrollTrigger: { trigger: el, start: 'top 88%' }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openLightbox = (item) => setLightboxItem(item);
  const closeLightbox = () => setLightboxItem(null);

  // Asymmetric gallery layout — items have varying sizes
  const galleryItems = achievementsData.galleryItems;

  return (
    <section
      id="achievements"
      className="ach-section"
      ref={sectionRef}
      aria-label="Recognition and achievements"
    >
      <div className="section-chapter-marker" aria-hidden="true">05</div>

      <div className="ach-inner">

        {/* Header */}
        <div className="ach-header">
          <div className="section-label" style={{ color: 'var(--green-muted)' }}>
            05 — RECOGNITION &amp; IMPACT
          </div>
          <h2 className="ach-heading">
            RECOGNITION<br />&amp; IMPACT
          </h2>
          <BlurText
            text="Institutional awards, national innovation grants, and community field deployments."
            delay={50}
            animateBy="words"
            direction="bottom"
            stepDuration={0.35}
            threshold={0.1}
            className="ach-subheading"
          />
        </div>

        {/* Asymmetric Gallery */}
        <div className="ach-gallery" role="list">
          {galleryItems.map((item, i) => {
            const sizes = ['large', 'small', 'small', 'medium', 'medium'];
            const size = sizes[i % sizes.length];
            return (
              <article
                key={item.id}
                className={`ach-gallery-item ach-item-${size}`}
                onClick={() => openLightbox(item)}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(item)}
                tabIndex={0}
                role="listitem"
                aria-label={`${item.title} — Click to expand`}
                data-cursor="VIEW"
              >
                <div className="ach-item-image-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="ach-item-image"
                    loading="lazy"
                  />
                  <div className="ach-item-overlay" aria-hidden="true" />
                </div>
                <div className="ach-item-content">
                  <div className="ach-item-cat-row">
                    <span className="ach-item-year">{item.year}</span>
                    <span className="ach-item-category">{item.category}</span>
                  </div>
                  <h3 className="ach-item-title">{item.title}</h3>
                  <div className="ach-item-inst-row">
                    {item.logo && <img src={item.logo} alt={item.institution} className="ach-inst-logo" />}
                    <p className="ach-item-inst">{item.institution}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Faculty Certifications */}
        <div className="certifications-block">
          <div className="cert-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <h3 className="ap-sub-heading" style={{ margin: 0 }}>FACULTY CERTIFICATIONS &amp; DEVELOPMENT</h3>
            <span className="cert-count">{certifications.length} CREDENTIALS</span>
          </div>
          <div className="cert-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {certifications.map((cert) => (
              <div key={cert.id} className="cert-card glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div className="cert-pdf-preview" style={{ width: '100%', height: '250px', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border-light)' }}>
                  {cert.pdf.toLowerCase().endsWith('.pdf') ? (
                    <embed src={cert.pdf} type="application/pdf" width="100%" height="250px" style={{ pointerEvents: 'none' }} />
                  ) : (
                    <img src={cert.pdf} alt={cert.title} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                  )}
                </div>
                <div className="cert-info" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <h3 style={{ fontFamily: '"Outfit", sans-serif', fontSize: '1.25rem', fontWeight: 400, marginBottom: '1.5rem', lineHeight: 1.3 }}>{cert.title}</h3>
                  <a href={cert.pdf} target="_blank" rel="noopener noreferrer" className="cert-btn" style={{ alignSelf: 'flex-start', padding: '0.75rem 1.5rem', border: '1px solid var(--color-accent)', color: 'var(--color-accent)', borderRadius: '4px', textDecoration: 'none', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
                    View Full Screen
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Responsibilities */}
        <div className="responsibilities-block">
          <h3 className="ap-sub-heading" style={{ marginBottom: '24px' }}>ACADEMIC LEADERSHIP ROLES</h3>
          <div className="roles-grid">
            {achievementsData.responsibilities.map((role, i) => (
              <div key={i} className="role-item-card">
                <span className="role-check" aria-hidden="true">✓</span>
                <div className="role-item-content">
                  <strong className="role-item-title">{role.role}</strong>
                  <span className="role-item-dept">{role.dept}</span>
                  <span className="role-item-desc">{role.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <div
          className="lightbox-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Award details: ${lightboxItem.title}`}
        >
          <div
            className="lightbox-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              ✕
            </button>
            <div className="lightbox-image-wrap">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="lightbox-image"
              />
            </div>
            <div className="lightbox-info">
              <span className="lightbox-cat">{lightboxItem.category} · {lightboxItem.year}</span>
              <h2 className="lightbox-title">{lightboxItem.title}</h2>
              <div className="lightbox-inst-row">
                {lightboxItem.logo && <img src={lightboxItem.logo} alt={lightboxItem.institution} className="lightbox-inst-logo" />}
                {lightboxItem.extraLogo && <img src={lightboxItem.extraLogo} alt="Additional Logo" className="lightbox-inst-logo extra-logo" style={{marginLeft: '10px'}} />}
                <p className="lightbox-inst">{lightboxItem.institution}</p>
              </div>
              <p className="lightbox-desc">{lightboxItem.description}</p>
              {lightboxItem.extraImage && (
                <div className="lightbox-extra-img-wrap" style={{marginTop: '20px'}}>
                  <img src={lightboxItem.extraImage} alt="Additional Event Image" style={{width: '100%', borderRadius: '12px'}} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AchievementsSection;

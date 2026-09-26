import React, { useState } from 'react';
import { achievementsData } from '../data/achievements';
import './Achievements.css';

const Achievements = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredItems = filter === 'all'
    ? achievementsData.galleryItems
    : achievementsData.galleryItems.filter(item => {
        if (filter === 'awards') return item.id.includes('award') || item.id.includes('performer') || item.id.includes('trifest');
        if (filter === 'grants') return item.id.includes('msme') || item.id.includes('sanction');
        if (filter === 'field') return item.id.includes('field');
        return true;
      });

  return (
    <div className="section-container achievements-page-wrapper">
      
      {/* Page Header */}
      <div className="achievements-header">
        <div className="achievements-badge">
          <span className="badge-ring" />
          <span>HONORS & RECOGNITION ARCHIVE</span>
        </div>
        <h1 className="page-title text-gradient">Awards, Grants & Honors</h1>
        <p className="achievements-lead">
          Documenting institutional recognitions, national hackathon research grants, on-stage felicitations, and verified faculty certifications of Dr. K. Gilbert Ross Rex.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="achievements-filter-bar">
        <button
          className={`filter-pill-btn ${filter === 'all' ? 'is-active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Honors ({achievementsData.galleryItems.length})
        </button>
        <button
          className={`filter-pill-btn ${filter === 'awards' ? 'is-active' : ''}`}
          onClick={() => setFilter('awards')}
        >
          Stage Felicitation Awards
        </button>
        <button
          className={`filter-pill-btn ${filter === 'grants' ? 'is-active' : ''}`}
          onClick={() => setFilter('grants')}
        >
          National Grants & Sanctions
        </button>
        <button
          className={`filter-pill-btn ${filter === 'field' ? 'is-active' : ''}`}
          onClick={() => setFilter('field')}
        >
          Community Field Deployments
        </button>
      </div>

      {/* Primary Visual Gallery — The Real Uploaded Images */}
      <div className="honors-gallery-grid">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="honor-card glass-panel"
            onClick={() => setSelectedImage(item)}
          >
            <div className="honor-image-stage">
              <img
                src={item.image}
                alt={item.title}
                className="honor-photo"
                loading="lazy"
              />
              <div className="image-overlay-scrim">
                <span className="expand-hint">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  Click to Expand Photo
                </span>
              </div>
              <div className="honor-year-badge">{item.year}</div>
            </div>

            <div className="honor-body">
              <span className="honor-category">{item.category}</span>
              <h3 className="honor-title">{item.title}</h3>
              <p className="honor-institution">{item.institution}</p>
              <p className="honor-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal for Full Image Inspection */}
      {selectedImage && (
        <div className="lightbox-backdrop" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-card" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setSelectedImage(null)}>
              ✕
            </button>
            <div className="lightbox-image-wrap">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="lightbox-full-img"
              />
            </div>
            <div className="lightbox-caption">
              <span className="lightbox-cat">{selectedImage.category} • {selectedImage.year}</span>
              <h2 className="lightbox-title">{selectedImage.title}</h2>
              <div className="lightbox-inst-row" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                {selectedImage.logo && <img src={selectedImage.logo} alt={selectedImage.institution} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />}
                {selectedImage.extraLogo && <img src={selectedImage.extraLogo} alt="Additional Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />}
                <p className="lightbox-inst" style={{ margin: 0 }}>{selectedImage.institution}</p>
              </div>
              <p className="lightbox-desc">{selectedImage.description}</p>
              {selectedImage.extraImage && (
                <div style={{ marginTop: '20px' }}>
                  <img src={selectedImage.extraImage} alt="Additional Event Image" style={{ width: '100%', borderRadius: '12px' }} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Secondary Section: Faculty Certifications (ATAL & NPTEL) */}
      <div className="certifications-section">
        <div className="section-title-wrap">
          <h2 className="section-heading">Faculty Certifications & NPTEL Credentials</h2>
          <p className="section-subtitle">
            Advanced specialized coursework across molecular techniques, precision agriculture, and biomedical manufacturing.
          </p>
        </div>

        <div className="certifications-grid">
          {achievementsData.facultyCertifications.map((cert, idx) => (
            <div key={idx} className="cert-item-card glass-panel">
              <div className="cert-top-row">
                <span className={`cert-badge-type ${cert.agency.toLowerCase()}`}>
                  {cert.agency}
                </span>
                <span className="cert-focus-tag">{cert.focus}</span>
              </div>
              <h4 className="cert-name">{cert.title}</h4>
              <span className="cert-verified-label">✓ Certified Faculty Development</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tertiary Section: Academic Responsibilities & Guest Lectures */}
      <div className="academic-leadership-grid">
        <div className="leadership-panel glass-panel">
          <h3 className="panel-subheading">Academic Leadership & Roles</h3>
          <ul className="roles-checklist">
            {achievementsData.responsibilities.map((roleItem, idx) => (
              <li key={idx} className="role-item">
                <div className="role-bullet-check">✓</div>
                <div className="role-text-wrap">
                  <strong className="role-title">{roleItem.role}</strong>
                  <span className="role-dept">{roleItem.dept} — {roleItem.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lectures-panel glass-panel">
          <h3 className="panel-subheading">Invited Guest Lectures</h3>
          <div className="lectures-timeline">
            {achievementsData.guestLectures.map((lec, idx) => (
              <div key={idx} className="lecture-card">
                <div className="lecture-year-tag">{lec.year}</div>
                <div className="lecture-info">
                  <h4 className="lecture-title">{lec.title}</h4>
                  <p className="lecture-venue">{lec.institution}</p>
                  <span className="lecture-theme">{lec.focus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Achievements;

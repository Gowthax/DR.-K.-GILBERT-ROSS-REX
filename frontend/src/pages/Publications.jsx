import React, { useEffect, useRef, useState } from 'react';
import { publicationsData } from '../data/publications';
import { patentsData } from '../data/patents';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Publications.css';

gsap.registerPlugin(ScrollTrigger);

const Publications = () => {
  const containerRef = useRef();
  const [activePubIndex, setActivePubIndex] = useState(0);

  useEffect(() => {
    const sections = gsap.utils.toArray('.animate-section');
    sections.forEach(section => {
      gsap.fromTo(section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          }
        }
      );
    });
  }, []);

  return (
    <div className="section-container publications-section" ref={containerRef}>
      <div className="header-section animate-section">
        <h1 className="page-title text-gradient">Publications Archive</h1>
        <p className="profile-summary">A comprehensive record of 27 journal publications, book chapters, and intellectual property.</p>
      </div>

      <div className="animate-section">
        <h2 className="section-heading">Selected Publications</h2>
        
        {/* 3D-like scrolling archive list */}
        <div className="archive-list">
          {publicationsData.map((pub, index) => {
            const isActive = index === activePubIndex;
            return (
              <div 
                key={index} 
                className={`archive-item glass-panel ${isActive ? 'active' : ''}`}
                onMouseEnter={() => setActivePubIndex(index)}
              >
                <div className="archive-meta">
                  <span className="archive-year">{pub.year}</span>
                  <span className="archive-type">{pub.type}</span>
                </div>
                <div className="archive-content">
                  <h3 className="archive-title">{pub.title}</h3>
                  <p className="archive-authors">{pub.authors}</p>
                  <p className="archive-journal">{pub.journal}</p>
                  {pub.link && (
                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className="archive-link">
                      View Publication →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="animate-section">
        <h2 className="section-heading">Intellectual Property & Patents</h2>
        <div className="patents-grid">
          {patentsData.map((patent, index) => (
            <div key={index} className="patent-card glass-panel">
              <div className="patent-header">
                <span className={`patent-status ${patent.status.toLowerCase().includes('granted') ? 'granted' : ''}`}>
                  {patent.status}
                </span>
                <span className="patent-date">{patent.date}</span>
              </div>
              <h3 className="patent-title">{patent.title}</h3>
              <div className="patent-footer">
                <span className="patent-number">{patent.number || 'Pending'}</span>
                <span className="patent-type">{patent.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Publications;

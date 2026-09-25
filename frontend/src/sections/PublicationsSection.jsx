import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { publicationsData } from '../data/publications';
import { patentsData } from '../data/patents';
import './PublicationsSection.css';

gsap.registerPlugin(ScrollTrigger);

const PublicationsSection = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [yearFilter, setYearFilter] = useState('all');

  const years = [...new Set(publicationsData.map(p => p.year))].sort((a, b) => b - a);
  const filtered = yearFilter === 'all'
    ? publicationsData
    : publicationsData.filter(p => p.year === yearFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pub-header',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.pub-header', start: 'top 80%' }
        }
      );

      gsap.utils.toArray('.pub-entry').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30, clipPath: 'inset(0 0 20% 0)' },
          {
            opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
            duration: 0.7, ease: 'power2.out', delay: i * 0.05,
            scrollTrigger: { trigger: el, start: 'top 88%' }
          }
        );
      });

      gsap.utils.toArray('.patent-card-item').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: i * 0.08,
            scrollTrigger: { trigger: el, start: 'top 88%' }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filtered]);

  return (
    <section
      id="publications"
      className="pub-section"
      ref={sectionRef}
      aria-label="Publications archive"
    >
      <div className="section-chapter-marker" aria-hidden="true">04</div>

      <div className="pub-inner">

        {/* Header */}
        <div className="pub-header">
          <div className="section-label" style={{ color: 'var(--green-muted)' }}>
            04 — PUBLICATIONS
          </div>
          <div className="pub-title-row">
            <h2 className="pub-heading">PUBLICATIONS</h2>
            <div className="pub-count-display">
              <span className="pub-count-num">27</span>
              <span className="pub-count-label">RESEARCH<br />OUTPUTS</span>
            </div>
          </div>
          <div className="thin-rule" style={{ marginTop: '24px' }} />
        </div>

        {/* Year filter */}
        <div className="pub-filter-bar" role="group" aria-label="Filter publications by year">
          <button
            className={`pub-filter-btn ${yearFilter === 'all' ? 'is-active' : ''}`}
            onClick={() => setYearFilter('all')}
          >
            ALL
          </button>
          {years.map(year => (
            <button
              key={year}
              className={`pub-filter-btn ${yearFilter === year ? 'is-active' : ''}`}
              onClick={() => setYearFilter(year)}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Publication stream */}
        <div className="pub-stream" role="list">
          {filtered.map((pub, i) => (
            <article
              key={i}
              className={`pub-entry ${activeIndex === i ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              role="listitem"
              data-cursor="VIEW"
            >
              <div className="pub-entry-left">
                <time className="pub-year" dateTime={pub.year}>{pub.year}</time>
                <span className="pub-type">{pub.type}</span>
              </div>
              <div className="pub-entry-right">
                <h3 className="pub-title">{pub.title}</h3>
                <p className="pub-authors">{pub.authors}</p>
                <p className="pub-journal">{pub.journal}</p>
                {pub.link && (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pub-link"
                    aria-label={`View publication: ${pub.title}`}
                  >
                    VIEW PUBLICATION →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Patents */}
        <div className="patents-block">
          <h3 className="ap-sub-heading">INTELLECTUAL PROPERTY & PATENTS</h3>
          <div className="patents-grid">
            {patentsData.map((patent, i) => (
              <div key={i} className="patent-card-item">
                <div className="patent-card-header">
                  <span className={`patent-status ${patent.status.toLowerCase().includes('granted') ? 'granted' : 'filed'}`}>
                    {patent.status}
                  </span>
                  {patent.date && <time className="patent-date">{patent.date}</time>}
                </div>
                <h4 className="patent-title">{patent.title}</h4>
                {patent.number && (
                  <span className="patent-number">{patent.number}</span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PublicationsSection;

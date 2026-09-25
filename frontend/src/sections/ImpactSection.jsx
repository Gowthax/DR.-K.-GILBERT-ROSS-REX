import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profileData } from '../data/profile';
import './ImpactSection.css';

gsap.registerPlugin(ScrollTrigger);

const CountUp = ({ target, suffix = '' }) => {
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const num = parseFloat(target);
    const isSuffix = isNaN(num) ? false : true;
    const actualNum = isSuffix ? num : 0;

    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 80%',
      onEnter: () => {
        if (started.current) return;
        started.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: actualNum,
          duration: 2,
          ease: 'power3.out',
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent = Math.round(obj.val) + suffix;
            }
          }
        });
      }
    });
  }, [target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

const ImpactSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.impact-label',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.impact-label', start: 'top 80%' }
        }
      );

      gsap.utils.toArray('.impact-stat').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.1,
            scrollTrigger: { trigger: el, start: 'top 85%' }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: '27', suffix: '', label: 'PUBLICATIONS', desc: 'Journal articles, book chapters & reviews' },
    { number: '2', suffix: '', label: 'GRANTED PATENTS', desc: 'Indian Patents — biotechnology innovations' },
    { number: '42', suffix: '+', label: 'RESEARCHERS GUIDED', desc: 'UG + PG research scholars mentored' },
    { number: '8', suffix: '+', label: 'YEARS EXPERIENCE', desc: 'Academic teaching & research career' },
  ];

  return (
    <section
      id="impact"
      className="impact-section"
      ref={sectionRef}
      aria-label="Research impact statistics"
    >
      <div className="impact-inner">
        <div className="impact-label section-label">
          RESEARCH IMPACT
        </div>

        <div className="impact-grid">
          {stats.map((stat, i) => (
            <div key={i} className="impact-stat">
              <div className="impact-number" aria-label={`${stat.number}${stat.suffix} ${stat.label}`}>
                <CountUp target={stat.number} suffix={stat.suffix} />
              </div>
              <div className="impact-meta">
                <span className="impact-stat-label">{stat.label}</span>
                <span className="impact-stat-desc">{stat.desc}</span>
              </div>
              {i < stats.length - 1 && <div className="impact-divider" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;

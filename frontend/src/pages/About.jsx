import React, { useEffect, useRef } from 'react';
import { educationData, experienceData, teachingData } from '../data/timeline';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profileData } from '../data/profile';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef();

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
            start: 'top 80%',
          }
        }
      );
    });
  }, []);

  return (
    <div className="section-container about-section" ref={containerRef}>
      
      <div className="animate-section header-section">
        <h1 className="page-title text-gradient">Academic Profile</h1>
        <p className="profile-summary">{profileData.profileSummary}</p>
      </div>

      <div className="animate-section timeline-container">
        <h2 className="section-heading">Academic Experience</h2>
        <div className="timeline-path">
          {experienceData.map((exp, index) => (
            <div key={index} className="timeline-node glass-panel">
              <div className="node-marker"></div>
              <div className="node-content">
                <span className="node-period">{exp.period}</span>
                <h3 className="node-role">{exp.role}</h3>
                <p className="node-institution">{exp.institution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="animate-section timeline-container">
        <h2 className="section-heading">Education</h2>
        <div className="timeline-path">
          {educationData.map((edu, index) => (
            <div key={index} className="timeline-node glass-panel">
              <div className="node-marker edu-marker"></div>
              <div className="node-content">
                <span className="node-period">{edu.year}</span>
                <h3 className="node-role">{edu.degree}</h3>
                <p className="node-institution">{edu.institution}</p>
                {edu.details && <p className="node-details">{edu.details}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="animate-section teaching-section">
        <h2 className="section-heading">Teaching & Mentorship</h2>
        <div className="bookshelf-archive">
          {teachingData.map((subject, i) => (
            <div key={i} className="subject-book glass-panel">
              <div className="book-spine"></div>
              <div className="book-content">
                <span className="book-type">{subject.type}</span>
                <h4 className="book-title">{subject.subject}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default About;

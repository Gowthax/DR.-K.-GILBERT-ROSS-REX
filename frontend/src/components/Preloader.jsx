import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const topCurtainRef = useRef(null);
  const bottomCurtainRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
        setTimeout(() => setVisible(false), 200);
      },
    });

    // Cinematic Blur Reveal
    tl.fromTo(
      titleRef.current,
      { opacity: 0, filter: 'blur(15px)', scale: 1.05 },
      { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.5, ease: 'power2.out' }
    )
    // Hold
    .to({}, { duration: 1.0 })
    // Cinematic Blur Exit
    .to(
      titleRef.current,
      { opacity: 0, filter: 'blur(10px)', scale: 0.95, duration: 1.0, ease: 'power2.in' }
    )
    // Slide Curtains Open
    .to(
      topCurtainRef.current,
      { yPercent: -100, duration: 1.2, ease: 'power3.inOut' },
      '-=0.2'
    )
    .to(
      bottomCurtainRef.current,
      { yPercent: 100, duration: 1.2, ease: 'power3.inOut' },
      '<'
    );

    return () => tl.kill();
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="cinematic-preloader" ref={containerRef} aria-hidden="true">
      <div className="curtain-panel curtain-top" ref={topCurtainRef} />
      <div className="curtain-panel curtain-bottom" ref={bottomCurtainRef} />
      
      <div className="preloader-center">
        <h1 className="preloader-title" ref={titleRef}>
          Welcome to my portfolio
        </h1>
      </div>
    </div>
  );
};

export default Preloader;

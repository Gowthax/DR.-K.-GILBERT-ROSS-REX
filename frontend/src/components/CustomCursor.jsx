import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const labelRef = useRef(null);
  const [label, setLabel] = useState('');
  const pos = useRef({ x: -100, y: -100 });
  const targetPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // Only desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      pos.current.x = lerp(pos.current.x, targetPos.current.x, 0.12);
      pos.current.y = lerp(pos.current.y, targetPos.current.y, 0.12);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      // Dot follows faster
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetPos.current.x}px, ${targetPos.current.y}px, 0)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    const onMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = (e) => {
      const el = e.target.closest('[data-cursor]');
      if (el) {
        const type = el.getAttribute('data-cursor');
        setLabel(type);
        cursorRef.current?.classList.add('is-expanded');
      }
    };

    const onLeave = () => {
      setLabel('');
      cursorRef.current?.classList.remove('is-expanded');
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      {/* Trailing ring */}
      <div className="cursor-ring" ref={cursorRef}>
        {label && <span className="cursor-label" ref={labelRef}>{label}</span>}
      </div>
      {/* Fast dot */}
      <div className="cursor-dot" ref={dotRef} />
    </>
  );
};

export default CustomCursor;

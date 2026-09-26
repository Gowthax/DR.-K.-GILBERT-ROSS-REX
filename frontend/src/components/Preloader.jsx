import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Preloader.css';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ΔΣΩαβγλμ≡≈√';
const TARGET_NAME = 'DR. K. GILBERT ROSS REX';
const KEYWORDS = ['GENETICS', 'ENZYMOLOGY', 'INDUSTRIAL BIOTECH', 'MOLECULAR DYNAMICS'];

const Preloader = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [scrambledName, setScrambledName] = useState('');
  const [progress, setProgress] = useState(0);

  const containerRef = useRef(null);
  const topCurtainRef = useRef(null);
  const bottomCurtainRef = useRef(null);
  const canvasRef = useRef(null);

  const badgeRef = useRef(null);
  const dividerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const tagsRef = useRef(null);
  const tickerRef = useRef(null);
  const counterRef = useRef(null);

  // Canvas molecular mesh / DNA helix animation (tuned for light background)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for biotech mesh
    const numNodes = Math.min(width < 768 ? 22 : 40, 45);
    const nodes = Array.from({ length: numNodes }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 2 + 1.2,
      phase: Math.random() * Math.PI * 2,
    }));

    let step = 0;

    const render = () => {
      step += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Faint background grid (light mode green lines)
      ctx.strokeStyle = 'rgba(5, 150, 105, 0.06)';
      ctx.lineWidth = 1;
      const gridSize = 65;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // DNA Helix sine wave representation across center
      ctx.beginPath();
      ctx.lineWidth = 1.2;
      const centerY = height * 0.5;
      for (let x = 0; x < width; x += 6) {
        const y1 = centerY + Math.sin(x * 0.01 + step) * 38;
        const y2 = centerY + Math.sin(x * 0.01 + step + Math.PI) * 38;
        
        ctx.fillStyle = 'rgba(5, 150, 105, 0.18)';
        ctx.fillRect(x, y1, 2, 2);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.22)';
        ctx.fillRect(x, y2, 2, 2);

        if (x % 48 === 0) {
          ctx.strokeStyle = 'rgba(5, 150, 105, 0.08)';
          ctx.beginPath();
          ctx.moveTo(x, y1);
          ctx.lineTo(x, y2);
          ctx.stroke();
        }
      }

      // Floating molecular nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(5, 150, 105, ${0.25 + Math.sin(node.phase + step) * 0.1})`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(5, 150, 105, ${(1 - dist / 140) * 0.14})`;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Main GSAP Cinematic Timeline
  useEffect(() => {
    let scrambleFrame = 0;
    const totalScrambleFrames = 45;
    let scrambleInterval;

    const runScramble = () => {
      scrambleInterval = setInterval(() => {
        scrambleFrame++;
        const solvedLength = Math.floor((scrambleFrame / totalScrambleFrames) * TARGET_NAME.length);
        
        let result = '';
        for (let i = 0; i < TARGET_NAME.length; i++) {
          if (TARGET_NAME[i] === ' ') {
            result += ' ';
          } else if (i < solvedLength) {
            result += TARGET_NAME[i];
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        setScrambledName(result);

        if (scrambleFrame >= totalScrambleFrames) {
          clearInterval(scrambleInterval);
          setScrambledName(TARGET_NAME);
        }
      }, 30);
    };

    // Counter progress from 00 to 100
    const counterObj = { val: 0 };
    gsap.to(counterObj, {
      val: 100,
      duration: 2.4,
      ease: 'power1.inOut',
      onUpdate: () => {
        setProgress(Math.floor(counterObj.val));
      },
    });

    // Sequence Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
        setTimeout(() => setVisible(false), 200);
      },
    });

    // Scene 01 — Init & Metadata (0s - 0.8s)
    tl.fromTo(
      tickerRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      0.1
    )
    .fromTo(
      counterRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      0.1
    )
    .fromTo(
      badgeRef.current,
      { opacity: 0, y: 15, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' },
      0.3
    )
    .fromTo(
      dividerRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.9, ease: 'expo.inOut' },
      0.5
    )

    // Scene 02 — Title & Designation Reveal (1.0s - 2.2s)
    .call(runScramble, null, 0.9)
    .fromTo(
      titleRef.current,
      { opacity: 0, filter: 'blur(10px)', y: 10 },
      { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.8, ease: 'power2.out' },
      0.9
    )
    .fromTo(
      subtitleRef.current,
      { opacity: 0, y: 12, letterSpacing: '0.05em' },
      { opacity: 1, y: 0, letterSpacing: '0.28em', duration: 1.0, ease: 'power3.out' },
      1.4
    )

    // Scene 03 — Scientific Domain Keywords (2.1s - 2.8s)
    .fromTo(
      tagsRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      2.1
    )

    // Hold moment for cinematic impact (2.8s - 3.3s)
    .to({}, { duration: 0.6 })

    // Scene 04 — Split Curtain Exit (3.4s - 4.1s)
    .to([titleRef.current, subtitleRef.current, badgeRef.current, dividerRef.current, tagsRef.current, tickerRef.current, counterRef.current, canvasRef.current], {
      opacity: 0,
      y: -15,
      duration: 0.4,
      ease: 'power2.in',
    })
    .to(
      topCurtainRef.current,
      { yPercent: -100, duration: 0.8, ease: 'power4.inOut' },
      '-=0.1'
    )
    .to(
      bottomCurtainRef.current,
      { yPercent: 100, duration: 0.8, ease: 'power4.inOut' },
      '<'
    );

    return () => {
      clearInterval(scrambleInterval);
      tl.kill();
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="cinematic-preloader light-mode-preloader" ref={containerRef} role="status" aria-live="polite" aria-label="Loading identity sequence">
      {/* Split curtain background panels */}
      <div className="curtain-panel curtain-top" ref={topCurtainRef} />
      <div className="curtain-panel curtain-bottom" ref={bottomCurtainRef} />

      {/* Canvas background overlay */}
      <canvas ref={canvasRef} className="preloader-canvas" />

      {/* Top Header Ticker Bar */}
      <div className="preloader-top-bar">
        <div className="preloader-ticker" ref={tickerRef}>
          <span className="ticker-pulse" />
          <span>SEQ // 01 · INITIALIZING ACADEMIC ARCHIVE</span>
        </div>
        <div className="preloader-counter" ref={counterRef}>
          <span className="counter-label">SYSTEM READY</span>
          <span className="counter-num">{String(progress).padStart(3, '0')}%</span>
        </div>
      </div>

      {/* Central Content Sequence */}
      <div className="preloader-center">
        {/* Scene 01: Institution Badge */}
        <div className="preloader-badge" ref={badgeRef}>
          <img src="/logos/sethu_logo.png" alt="Sethu Institute of Technology Logo" className="preloader-inst-logo" />
          <span>DEPARTMENT OF Biotechnology · SETHU INSTITUTE OF TECHNOLOGY (AUTONOMOUS)</span>
        </div>

        {/* Crisp Line Divider */}
        <div className="preloader-divider" ref={dividerRef} />

        {/* Scene 02: Main Scrambling Name Reveal */}
        <h1 className="preloader-title" ref={titleRef}>
          {scrambledName || TARGET_NAME}
        </h1>

        {/* Subtitle / Designation with expanding letter spacing */}
        <div className="preloader-subtitle-wrap" ref={subtitleRef}>
          <span>ASSOCIATE PROFESSOR OF Biotechnology</span>
        </div>

        {/* Scene 03: Scientific Keyword Streak */}
        <div className="preloader-tags" ref={tagsRef}>
          {KEYWORDS.map((word, idx) => (
            <React.Fragment key={word}>
              <span className="tag-word">{word}</span>
              {idx < KEYWORDS.length - 1 && <span className="tag-dot">✦</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Footer minimal coordinates */}
      <div className="preloader-footer">
        <span>LAT 9.8242° N · LON 78.1636° E</span>
        <span>INDEX 2026 // BIOTECH identity</span>
      </div>
    </div>
  );
};

export default Preloader;

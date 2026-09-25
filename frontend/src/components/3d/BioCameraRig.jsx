import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';

/**
 * BioCameraRig
 * Controls 3D camera with:
 * - Layered parallax response to mouse coordinates
 * - Scroll-linked camera downward motion (revealing bottom cellular ecosystem)
 * - Route-aware spatial positioning
 */
const BioCameraRig = () => {
  const cameraRef = useRef();
  const location = useLocation();

  // Scroll offset tracking
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // Normalize scroll down to a responsive range
      scrollYRef.current = window.scrollY || document.documentElement.scrollTop;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (!cameraRef.current) return;

    // Normalizing mouse pointer (-1 to 1)
    const px = state.pointer.x;
    const py = state.pointer.y;

    // Scroll progress (0 to ~3 depending on scroll height)
    const scrollFactor = Math.min(scrollYRef.current / 400, 2.5);

    // Target positions
    // On scroll: camera moves downward (y drops from 0 to -1.8) and slightly forward (z: 5.2 to 4.5)
    // This brings the bottom 3D cell right into the center of view for Research!
    let baseY = -scrollFactor * 1.1;
    let baseZ = 5.2 - scrollFactor * 0.4;
    let baseX = 0;

    // Route adjustments
    if (location.pathname === '/research') {
      baseY = -1.6;
      baseX = -0.5;
      baseZ = 4.2;
    } else if (location.pathname === '/about') {
      baseX = -1.2;
      baseZ = 4.8;
    } else if (location.pathname === '/publications') {
      baseZ = 6.0;
    }

    // Smooth lerp for parallax & scroll response
    const targetX = baseX + px * 0.45;
    const targetY = baseY + py * 0.35;
    const targetZ = baseZ;

    cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, targetX, 0.05);
    cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, targetY, 0.05);
    cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, targetZ, 0.05);

    // Subtle camera look-at angle tilting
    const lookTarget = new THREE.Vector3(
      baseX * 0.5 + px * 0.2,
      baseY * 0.8 + py * 0.2 - 0.2,
      0
    );
    cameraRef.current.lookAt(lookTarget);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 5.2]}
      fov={45}
      near={0.1}
      far={100}
    />
  );
};

export default BioCameraRig;

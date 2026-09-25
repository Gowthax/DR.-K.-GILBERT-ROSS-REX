import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Preload } from '@react-three/drei';
import { useLocation } from 'react-router-dom';
import TranslucentCell from './TranslucentCell';
import BioCameraRig from './BioCameraRig';

const SceneContent = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <BioCameraRig />

      {/* Transparent background so CSS background shows through */}

      {/* Lighting Architecture */}
      <ambientLight intensity={0.8} color="#ffffff" />
      
      {/* Warm Academic Key Light */}
      <directionalLight position={[6, 8, 4]} intensity={1.5} color="#ffffff" />
      
      {/* Cool Emerald Scientific Rim Light */}
      <spotLight
        position={[-6, 4, 3]}
        intensity={2.0}
        color="#a3b18a"
        angle={0.7}
        penumbra={0.8}
      />

      {/* 1. Signature Dominant 3D Biological Cell (Hero page only) */}
      {isHome && (
        <>
          <pointLight position={[-1.85, -2.2, 1.2]} intensity={2.2} color="#a3b18a" />
          <TranslucentCell position={[-1.85, -2.4, 0.4]} scale={2.1} />
        </>
      )}

      <Environment preset="city" />
      <Preload all />
    </>
  );
};

const SceneManager = () => {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      }}
    >
      <SceneContent />
    </Canvas>
  );
};

export default SceneManager;


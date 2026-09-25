import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Signature 3D Translucent Biological Cell
 * Emerging from the bottom-left under Dr. Gilbert Ross Rex.
 * Multi-layered scientific visualization:
 * - Outer translucent membrane with physical transmission
 * - Inner lipid bilayer grid
 * - Cytoplasm with suspended organelles & protein complexes
 * - Glowing cellular nucleus with internal chromatic filaments
 */
const TranslucentCell = ({ position = [-1.9, -2.1, 0], scale = 1.9 }) => {
  const outerCellRef = useRef();
  const innerMembraneRef = useRef();
  const nucleusRef = useRef();
  const organelleGroupRef = useRef();
  const internalParticlesRef = useRef();

  // Organelles (mitochondria / protein capsules) inside cytoplasm
  const organelles = useMemo(() => {
    return [
      { pos: [0.45, 0.35, 0.2], rot: [0.4, 0.8, 0.2], scale: [0.28, 0.12, 0.12], color: '#588157' },
      { pos: [-0.4, 0.4, -0.3], rot: [-0.5, 0.3, 0.7], scale: [0.25, 0.1, 0.1], color: '#3a5a40' },
      { pos: [0.3, -0.45, 0.3], rot: [0.2, -0.6, 0.4], scale: [0.3, 0.12, 0.12], color: '#a3b18a' },
      { pos: [-0.35, -0.3, -0.2], rot: [0.7, 0.2, -0.5], scale: [0.22, 0.09, 0.09], color: '#588157' },
      { pos: [0.55, -0.15, -0.25], rot: [-0.3, 0.5, 0.9], scale: [0.24, 0.11, 0.11], color: '#3a5a40' }
    ];
  }, []);

  // Tiny internal cytoplasm particles (Brownian motion)
  const particleCount = 70;
  const [particlePositions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const init = [];
    for (let i = 0; i < particleCount; i++) {
      // Keep within sphere radius 0.75
      const u = Math.random();
      const r = 0.7 * Math.cbrt(u);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      init.push({ x, y, z, speed: 0.4 + Math.random() * 0.8, seed: Math.random() * 10 });
    }
    return [pos, init];
  }, [particleCount]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Organic slow rotation of outer cell
    if (outerCellRef.current) {
      outerCellRef.current.rotation.y = t * 0.04;
      outerCellRef.current.rotation.x = Math.sin(t * 0.03) * 0.08;
      // Gentle breathing pulsation
      const breath = 1 + Math.sin(t * 0.8) * 0.015;
      outerCellRef.current.scale.set(scale * breath, scale * (2 - breath), scale * breath);
    }

    // Inner membrane subtle counter-rotation
    if (innerMembraneRef.current) {
      innerMembraneRef.current.rotation.y = -t * 0.05;
      innerMembraneRef.current.rotation.z = Math.cos(t * 0.04) * 0.06;
    }

    // Nucleus gentle pulse
    if (nucleusRef.current) {
      nucleusRef.current.rotation.y = t * 0.08;
      const nScale = 0.38 + Math.sin(t * 1.2) * 0.015;
      nucleusRef.current.scale.set(nScale, nScale, nScale);
    }

    // Organelles slight drift
    if (organelleGroupRef.current) {
      organelleGroupRef.current.rotation.y = t * 0.025;
      organelleGroupRef.current.rotation.z = Math.sin(t * 0.02) * 0.04;
    }

    // Brownian motion for internal cytoplasm particles
    if (internalParticlesRef.current) {
      const positions = internalParticlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const item = initialPositions[i];
        positions[i * 3] = item.x + Math.sin(t * item.speed + item.seed) * 0.04;
        positions[i * 3 + 1] = item.y + Math.cos(t * item.speed * 0.8 + item.seed) * 0.04;
        positions[i * 3 + 2] = item.z + Math.sin(t * item.speed * 1.2 + item.seed) * 0.04;
      }
      internalParticlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={position}>
      {/* 1. Outer Translucent Physical Membrane */}
      <mesh ref={outerCellRef} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          color="#588157"
          roughness={0.08}
          metalness={0.05}
          transmission={0.94}
          thickness={1.6}
          ior={1.38}
          transparent={true}
          opacity={0.85}
          attenuationColor="#a3b18a"
          attenuationDistance={1.4}
          clearcoat={0.8}
          clearcoatRoughness={0.12}
        />
      </mesh>

      {/* 2. Secondary Inner Lipid Bilayer Wireframe/Cellular Mesh */}
      <mesh ref={innerMembraneRef} scale={scale * 0.95}>
        <sphereGeometry args={[1, 36, 36]} />
        <meshStandardMaterial
          color="#a3b18a"
          wireframe={true}
          transparent={true}
          opacity={0.32}
          roughness={0.3}
          emissive="#3a5a40"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* 3. Central Cell Nucleus */}
      <group position={[0, 0, 0]}>
        {/* Nucleus Outer Translucent Shell */}
        <mesh ref={nucleusRef} scale={0.42}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial
            color="#a3b18a"
            roughness={0.15}
            transmission={0.82}
            thickness={1.0}
            ior={1.42}
            transparent={true}
            opacity={0.9}
          />
        </mesh>
        
        {/* Nucleus Dense Core with Inner Glow */}
        <mesh scale={0.24}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial
            color="#dad7cd"
            emissive="#a3b18a"
            emissiveIntensity={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Chromatin Ring around Nucleus */}
        <mesh rotation={[Math.PI / 3, 0, 0]} scale={0.52}>
          <torusGeometry args={[1, 0.045, 16, 64]} />
          <meshStandardMaterial
            color="#dad7cd"
            emissive="#588157"
            emissiveIntensity={0.4}
            transparent={true}
            opacity={0.65}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* 4. Cytoplasm Organelles (mitochondria-like capsules) */}
      <group ref={organelleGroupRef}>
        {organelles.map((item, idx) => (
          <mesh
            key={idx}
            position={item.pos}
            rotation={item.rot}
            scale={item.scale}
          >
            <capsuleGeometry args={[1, 2, 8, 16]} />
            <meshPhysicalMaterial
              color={item.color}
              transmission={0.85}
              roughness={0.18}
              thickness={0.6}
              ior={1.42}
              transparent={true}
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* 5. Suspended Cytoplasm Micro-particles */}
      <points ref={internalParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#dad7cd"
          transparent={true}
          opacity={0.8}
          sizeAttenuation={true}
        />
      </points>

      {/* 6. Subtle Internal Light for Volumetric Biological Glow */}
      <pointLight
        position={[0, 0, 0]}
        intensity={2.4}
        distance={6}
        color="#a3b18a"
      />
    </group>
  );
};

export default TranslucentCell;

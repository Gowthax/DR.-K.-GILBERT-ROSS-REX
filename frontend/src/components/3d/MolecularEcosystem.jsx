import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Molecular Cluster (Ball and Stick / Protein unit)
 */
const MoleculeCluster = ({ position, scale = 0.4, rotationSpeed = 0.2 }) => {
  const group = useRef();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = state.clock.elapsedTime * rotationSpeed * 0.7;
      group.current.rotation.y = state.clock.elapsedTime * rotationSpeed;
    }
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Central carbon-like atom */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.35, 20, 20]} />
        <meshPhysicalMaterial
          color="#9D9679"
          transmission={0.85}
          roughness={0.2}
          ior={1.45}
          transparent={true}
          opacity={0.9}
        />
      </mesh>

      {/* Bond 1 + Atom */}
      <mesh position={[0.5, 0.4, 0.2]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshPhysicalMaterial
          color="#F2D09D"
          transmission={0.8}
          roughness={0.2}
          ior={1.4}
          transparent={true}
          opacity={0.85}
        />
      </mesh>
      <mesh position={[0.25, 0.2, 0.1]} rotation={[0.4, 0.2, 0.8]}>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} />
        <meshStandardMaterial color="#F3E5AB" roughness={0.3} transparent opacity={0.6} />
      </mesh>

      {/* Bond 2 + Atom */}
      <mesh position={[-0.55, 0.3, -0.3]}>
        <sphereGeometry args={[0.24, 16, 16]} />
        <meshPhysicalMaterial
          color="#F3E5AB"
          transmission={0.7}
          roughness={0.2}
          ior={1.4}
          transparent={true}
          opacity={0.85}
        />
      </mesh>
      <mesh position={[-0.27, 0.15, -0.15]} rotation={[-0.3, 0.5, -0.7]}>
        <cylinderGeometry args={[0.04, 0.04, 0.7, 8]} />
        <meshStandardMaterial color="#FFFDD0" roughness={0.3} transparent opacity={0.5} />
      </mesh>

      {/* Bond 3 + Atom */}
      <mesh position={[0.2, -0.6, -0.2]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshPhysicalMaterial
          color="#8C856B"
          transmission={0.85}
          roughness={0.2}
          ior={1.4}
          transparent={true}
          opacity={0.85}
        />
      </mesh>
      <mesh position={[0.1, -0.3, -0.1]} rotation={[0.6, -0.3, 0.2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.65, 8]} />
        <meshStandardMaterial color="#F3E5AB" roughness={0.3} transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

/**
 * Organic Branching Filaments (Cytoskeletal network fragments)
 */
const CytoskeletalStrands = () => {
  const lineGroup = useRef();

  useFrame((state) => {
    if (lineGroup.current) {
      lineGroup.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.03;
    }
  });

  const curves = useMemo(() => {
    const list = [];
    const controlPoints = [
      [[-4, -2.5, -2], [-2.5, -1.8, -1], [-1.2, -1.2, -0.5], [0, -2, -1.5]],
      [[-3.5, -3, -1], [-2, -2.2, 0.5], [-0.5, -1.8, 1], [1.5, -2.5, 0]],
      [[-4.5, -1, -3], [-3, -0.5, -2], [-1.5, 0.2, -1.5], [-0.2, -0.8, -1]],
      [[-2.8, -3.5, -0.5], [-1.8, -2.8, 0.2], [-0.8, -2.2, -0.2], [0.5, -1.9, -0.8]]
    ];

    controlPoints.forEach((pts) => {
      const vPts = pts.map(p => new THREE.Vector3(p[0], p[1], p[2]));
      const curve = new THREE.CatmullRomCurve3(vPts);
      list.push(new THREE.TubeGeometry(curve, 32, 0.035, 8, false));
    });

    return list;
  }, []);

  return (
    <group ref={lineGroup}>
      {curves.map((geo, idx) => (
        <mesh key={idx} geometry={geo}>
          <meshPhysicalMaterial
            color="#F2D09D"
            transmission={0.8}
            roughness={0.3}
            transparent={true}
            opacity={0.45}
            ior={1.3}
          />
        </mesh>
      ))}
    </group>
  );
};

/**
 * Deep Multi-layered Molecular Particle Field
 * Structured in 3 distinct depth planes:
 * 1. Deep Background (Z: -12 to -6, tiny, subtle blur/depth)
 * 2. Midground (Z: -3 to +1, sharp, biological clusters, away from professor's face)
 * 3. Foreground (Z: +2 to +4, large, soft bokeh near viewport edges)
 */
const MolecularEcosystem = () => {
  const bgPointsRef = useRef();
  const fgPointsRef = useRef();

  // Background particles (800 count)
  const bgData = useMemo(() => {
    const count = 700;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16 - 1;
      pos[i * 3 + 2] = -5 - Math.random() * 8; // deep z
    }
    return pos;
  }, []);

  // Foreground particles (120 count, kept away from face at x:[-1.5, 0], y:[0.5, 2.5])
  const fgData = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    let idx = 0;
    while (idx < count) {
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 10 - 1.5;
      // Exclude face zone: x between -2.2 and 0.2, y between 0.3 and 2.5
      if (x > -2.2 && x < 0.2 && y > 0.3 && y < 2.5) {
        continue; // Protect facial region
      }
      pos[idx * 3] = x;
      pos[idx * 3 + 1] = y;
      pos[idx * 3 + 2] = 1.5 + Math.random() * 2.5; // foreground z
      idx++;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (bgPointsRef.current) {
      bgPointsRef.current.rotation.y = t * 0.01;
      bgPointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.02;
    }
    if (fgPointsRef.current) {
      fgPointsRef.current.rotation.y = -t * 0.02;
      fgPointsRef.current.position.y = Math.sin(t * 0.3) * 0.08;
    }
  });

  return (
    <group>
      {/* Organic Cytoskeletal Branching Filaments */}
      <CytoskeletalStrands />

      {/* Discrete 3D Molecular Clusters positioned around scene */}
      {/* Cluster 1: behind left shoulder */}
      <MoleculeCluster position={[-2.8, 1.2, -1.5]} scale={0.45} rotationSpeed={0.25} />
      
      {/* Cluster 2: lower left midground, connecting to bottom cell */}
      <MoleculeCluster position={[-0.9, -1.4, 0.4]} scale={0.5} rotationSpeed={-0.3} />
      
      {/* Cluster 3: mid-ground far left */}
      <MoleculeCluster position={[-3.6, -0.6, -0.8]} scale={0.4} rotationSpeed={0.18} />

      {/* Cluster 4: right side background framing */}
      <MoleculeCluster position={[3.2, 0.8, -3.5]} scale={0.65} rotationSpeed={-0.15} />
      <MoleculeCluster position={[2.5, -2.0, -2.0]} scale={0.55} rotationSpeed={0.2} />

      {/* Deep Background Particle Cloud */}
      <points ref={bgPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={bgData.length / 3}
            array={bgData}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#F3E5AB"
          transparent={true}
          opacity={0.35}
          sizeAttenuation={true}
        />
      </points>

      {/* Foreground Ambient Floating Micro-Particles */}
      <points ref={fgPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={fgData.length / 3}
            array={fgData}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#FFFDD0"
          transparent={true}
          opacity={0.4}
          sizeAttenuation={true}
        />
      </points>
    </group>
  );
};

export default MolecularEcosystem;

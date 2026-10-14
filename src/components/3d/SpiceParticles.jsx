import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SpiceParticles({ count = 60, radius = 4.5 }) {
  const meshRef = useRef();

  const [particles] = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.0 + Math.random() * radius;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = (Math.random() - 0.2) * 3;
      const z = r * Math.sin(phi) * Math.sin(theta);

      const scale = 0.03 + Math.random() * 0.05;
      const speed = 0.2 + Math.random() * 0.5;
      const rotSpeed = (Math.random() - 0.5) * 1.5;

      temp.push({ x, y, z, origY: y, scale, speed, rotSpeed });
    }
    return [temp];
  }, [count, radius]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    meshRef.current.children.forEach((child, i) => {
      const p = particles[i];
      child.position.y = p.origY + Math.sin(t * p.speed + i) * 0.25;
      child.rotation.x += p.rotSpeed * 0.01;
      child.rotation.y += p.rotSpeed * 0.015;
    });
  });

  return (
    <group ref={meshRef}>
      {particles.map((p, idx) => (
        <mesh key={idx} position={[p.x, p.y, p.z]} scale={p.scale}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={idx % 3 === 0 ? '#eab308' : idx % 3 === 1 ? '#ea580c' : '#22c55e'}
            roughness={0.4}
            metalness={0.2}
            transparent
            opacity={0.65}
          />
        </mesh>
      ))}
    </group>
  );
}

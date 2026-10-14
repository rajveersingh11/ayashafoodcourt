import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SteamParticles({ position = [0, 0.4, 0], count = 40, spread = 0.4, speed = 1.0 }) {
  const pointsRef = useRef();

  // Generate particle positions, random velocities, and initial phases
  const [positions, phases, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    const sp = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Start near the bowl center
      pos[i * 3 + 0] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = Math.random() * 0.8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread;

      ph[i] = Math.random() * Math.PI * 2;
      sp[i] = 0.006 + Math.random() * 0.008;
    }
    return [pos, ph, sp];
  }, [count, spread]);

  // Animate particles rising and undulating
  useFrame((state) => {
    if (!pointsRef.current) return;
    const array = pointsRef.current.geometry.attributes.position.array;
    const time = state.clock.getElapsedTime() * speed;

    for (let i = 0; i < count; i++) {
      // Rise upward
      array[i * 3 + 1] += speeds[i];

      // Subtle horizontal curl (sinusoidal steam curl)
      array[i * 3 + 0] += Math.sin(time + phases[i]) * 0.0015;
      array[i * 3 + 2] += Math.cos(time + phases[i]) * 0.0015;

      // Loop back down when reaching top
      if (array[i * 3 + 1] > 1.4) {
        array[i * 3 + 1] = 0.1;
        array[i * 3 + 0] = (Math.random() - 0.5) * spread;
        array[i * 3 + 2] = (Math.random() - 0.5) * spread;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group position={position}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#fff5ea"
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

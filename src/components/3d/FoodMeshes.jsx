import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getMaterials } from './Materials';

// 1. Thali Platter (Main Tray)
export function ThaliPlatter({ platterType = 'brass', radius = 2.4 }) {
  const materials = useMemo(() => getMaterials(platterType), [platterType]);

  return (
    <group>
      {/* Platter Base */}
      <mesh receiveShadow position={[0, -0.05, 0]}>
        <cylinderGeometry args={[radius, radius * 0.98, 0.08, 64]} />
        <primitive object={materials.platter} />
      </mesh>
      {/* Platter Rim */}
      <mesh position={[0, 0.04, 0]}>
        <torusGeometry args={[radius * 0.97, 0.06, 16, 64]} />
        <primitive object={materials.platter} />
      </mesh>
      {/* Decorative inner circular groove */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius * 0.75, radius * 0.77, 64]} />
        <meshStandardMaterial
          color={platterType === 'brass' ? '#b8860b' : '#94a3b8'}
          metalness={0.9}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

// 2. Katori Bowl (Standard Indian side bowl)
export function KatoriBowl({ platterType = 'brass', radius = 0.62, height = 0.38 }) {
  const materials = useMemo(() => getMaterials(platterType), [platterType]);

  return (
    <group>
      {/* Bowl Outer Shell */}
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <cylinderGeometry args={[radius, radius * 0.75, height, 32, 1, true]} />
        <primitive object={materials.katori} />
      </mesh>
      {/* Bowl Bottom */}
      <mesh position={[0, 0.01, 0]}>
        <circleGeometry args={[radius * 0.75, 32]} />
        <primitive object={materials.katori} />
      </mesh>
      {/* Bowl Rim */}
      <mesh position={[0, height, 0]}>
        <torusGeometry args={[radius, 0.035, 12, 32]} />
        <primitive object={materials.katori} />
      </mesh>
    </group>
  );
}

// 3. Dal Tadka Dish
export function DalTadkaDish({ platterType = 'brass' }) {
  const materials = useMemo(() => getMaterials(platterType), [platterType]);

  return (
    <group>
      <KatoriBowl platterType={platterType} />
      {/* Dal surface */}
      <mesh position={[0, 0.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.58, 32]} />
        <primitive object={materials.dalTadka} />
      </mesh>
      {/* Red Chili Oil Tadka Swirl */}
      <mesh position={[0.05, 0.325, 0.05]} rotation={[-Math.PI / 2, 0, 0.4]}>
        <ringGeometry args={[0.15, 0.38, 24]} />
        <primitive object={materials.chiliOil} />
      </mesh>
      {/* Whole Red Chili Garnish */}
      <mesh position={[-0.1, 0.34, 0.1]} rotation={[0.2, 0.5, 0.1]} scale={[0.04, 0.04, 0.2]}>
        <cylinderGeometry args={[1, 0.3, 1, 8]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.3} />
      </mesh>
      {/* Fresh Coriander Leaf Bits */}
      {[-0.15, 0.08, 0.2].map((x, i) => (
        <mesh key={i} position={[x, 0.33, (i - 1) * 0.12]} rotation={[-Math.PI / 2, 0, i * 1.2]}>
          <circleGeometry args={[0.05, 6]} />
          <primitive object={materials.coriander} />
        </mesh>
      ))}
    </group>
  );
}

// 4. Dal Makhani Dish
export function DalMakhaniDish({ platterType = 'brass' }) {
  const materials = useMemo(() => getMaterials(platterType), [platterType]);

  return (
    <group>
      <KatoriBowl platterType={platterType} />
      {/* Black lentil gravy surface */}
      <mesh position={[0, 0.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.58, 32]} />
        <primitive object={materials.dalMakhani} />
      </mesh>
      {/* Fresh White Cream Spiral Swirl */}
      <mesh position={[0, 0.326, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 0.28, 24]} />
        <meshStandardMaterial color="#fffef0" roughness={0.2} transparent opacity={0.9} />
      </mesh>
      {/* Butter Pat in Center */}
      <mesh position={[0, 0.34, 0]} scale={[0.14, 0.06, 0.14]}>
        <boxGeometry />
        <meshStandardMaterial color="#fef08a" roughness={0.1} />
      </mesh>
      {/* Coriander Sprig */}
      <mesh position={[0.1, 0.33, -0.1]} rotation={[-Math.PI / 2, 0, 0.8]}>
        <circleGeometry args={[0.06, 6]} />
        <primitive object={materials.coriander} />
      </mesh>
    </group>
  );
}

// 5. Shahi Paneer Dish
export function ShahiPaneerDish({ platterType = 'brass' }) {
  const materials = useMemo(() => getMaterials(platterType), [platterType]);

  const paneerCubes = [
    { pos: [-0.15, 0.34, -0.12], rot: [0.1, 0.4, 0] },
    { pos: [0.18, 0.35, -0.05], rot: [-0.1, 0.2, 0.3] },
    { pos: [-0.05, 0.34, 0.16], rot: [0.2, -0.5, 0.1] },
    { pos: [0.12, 0.33, 0.18], rot: [0, 0.8, -0.2] },
  ];

  return (
    <group>
      <KatoriBowl platterType={platterType} />
      {/* Rich Orange Makhani Gravy */}
      <mesh position={[0, 0.31, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.58, 32]} />
        <primitive object={materials.paneerGravy} />
      </mesh>
      {/* Paneer Cubes */}
      {paneerCubes.map((item, idx) => (
        <mesh key={idx} position={item.pos} rotation={item.rot} castShadow scale={[0.13, 0.1, 0.13]}>
          <boxGeometry />
          <primitive object={materials.paneerCube} />
        </mesh>
      ))}
      {/* Cream Drizzle */}
      <mesh position={[0, 0.32, 0]} rotation={[-Math.PI / 2, 0, 1.2]}>
        <ringGeometry args={[0.26, 0.32, 24]} />
        <meshStandardMaterial color="#fffef5" roughness={0.2} transparent opacity={0.88} />
      </mesh>
      {/* Kasuri Methi Herbs */}
      <mesh position={[0, 0.33, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.05, 5]} />
        <primitive object={materials.coriander} />
      </mesh>
    </group>
  );
}

// 6. Fragrant Basmati Rice (Dome with Cumin Seeds)
export function RiceDish({ type = 'jeera', platterType = 'brass' }) {
  const materials = useMemo(() => getMaterials(platterType), [platterType]);

  // Cumin seeds scattered on rice
  const jeeraSpecks = useMemo(() => {
    const list = [];
    for (let i = 0; i < 35; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.45;
      const x = r * Math.cos(angle);
      const z = r * Math.sin(angle);
      const y = 0.28 - (r * r) * 0.35 + (Math.random() - 0.5) * 0.02;
      list.push({ x, y, z, rot: [Math.random(), Math.random(), Math.random()] });
    }
    return list;
  }, []);

  return (
    <group>
      {/* Steamed Rice Mound */}
      <mesh castShadow receiveShadow position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.55, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.42]} />
        <primitive object={materials.rice} />
      </mesh>
      {/* Cumin seeds */}
      {type === 'jeera' &&
        jeeraSpecks.map((s, i) => (
          <mesh key={i} position={[s.x, s.y, s.z]} rotation={s.rot} scale={[0.015, 0.015, 0.05]}>
            <cylinderGeometry args={[1, 1, 1, 5]} />
            <primitive object={materials.jeeraSeed} />
          </mesh>
        ))}
      {/* Garnish Coriander Sprig on Top */}
      <mesh position={[0, 0.34, 0]} rotation={[-Math.PI / 2, 0, 0.5]}>
        <circleGeometry args={[0.07, 6]} />
        <primitive object={materials.coriander} />
      </mesh>
    </group>
  );
}

// 7. Stack of Fresh Ghee-Brushed Rotis
export function RotiStack() {
  const materials = useMemo(() => getMaterials(), []);

  return (
    <group position={[0, 0.04, 0]}>
      {/* Bottom Roti */}
      <mesh castShadow receiveShadow position={[-0.05, 0.04, 0]} rotation={[-0.05, 0.2, -0.05]}>
        <cylinderGeometry args={[0.65, 0.65, 0.025, 32]} />
        <primitive object={materials.roti} />
      </mesh>
      {/* Middle Folded Roti */}
      <mesh castShadow receiveShadow position={[0.02, 0.07, -0.04]} rotation={[0.08, -0.4, 0.04]}>
        <cylinderGeometry args={[0.63, 0.63, 0.025, 32]} />
        <primitive object={materials.roti} />
      </mesh>
      {/* Top Folded Roti (Warm Golden with Ghee Glaze) */}
      <mesh castShadow receiveShadow position={[0, 0.1, 0.03]} rotation={[-0.02, 0.6, 0.06]}>
        <cylinderGeometry args={[0.62, 0.62, 0.025, 32]} />
        <primitive object={materials.roti} />
      </mesh>
      {/* Desi Ghee Melt Glaze on Top */}
      <mesh position={[0, 0.12, 0.03]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.38, 24]} />
        <primitive object={materials.butterGlaze} />
      </mesh>
    </group>
  );
}

// 8. Crisp Tandoori Garlic Naan
export function NaanBread() {
  const materials = useMemo(() => getMaterials(), []);

  return (
    <group position={[0, 0.06, 0]}>
      {/* Teardrop Naan geometry */}
      <mesh castShadow receiveShadow rotation={[-0.1, 0.3, 0.05]} scale={[0.8, 0.03, 1.1]}>
        <sphereGeometry args={[0.6, 24, 16]} />
        <primitive object={materials.roti} />
      </mesh>
      {/* Charred Tandoor Blisters */}
      {[
        [-0.15, 0.08, 0.1],
        [0.12, 0.08, -0.15],
        [0, 0.08, 0.25],
      ].map((pos, i) => (
        <mesh key={i} position={pos} scale={[0.08, 0.02, 0.08]}>
          <sphereGeometry args={[1, 12, 8]} />
          <meshStandardMaterial color="#5c3818" roughness={0.9} />
        </mesh>
      ))}
      {/* Garlic & Coriander flakes */}
      <mesh position={[0, 0.085, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.06, 5]} />
        <primitive object={materials.coriander} />
      </mesh>
      {/* Butter Glaze */}
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.35, 24]} />
        <primitive object={materials.butterGlaze} />
      </mesh>
    </group>
  );
}

// 9. Fresh Salad Katori (Cucumbers, Onion Rings, Lemon)
export function SaladDish({ platterType = 'brass' }) {
  const materials = useMemo(() => getMaterials(platterType), [platterType]);

  return (
    <group>
      <KatoriBowl platterType={platterType} radius={0.48} height={0.3} />
      {/* Cucumber Slices */}
      <mesh position={[-0.1, 0.24, -0.05]} rotation={[-0.2, 0.5, 0.3]} scale={[0.18, 0.02, 0.18]}>
        <cylinderGeometry args={[1, 1, 1, 16]} />
        <primitive object={materials.cucumber} />
      </mesh>
      <mesh position={[0.12, 0.26, 0.08]} rotation={[0.3, -0.2, -0.1]} scale={[0.18, 0.02, 0.18]}>
        <cylinderGeometry args={[1, 1, 1, 16]} />
        <primitive object={materials.cucumber} />
      </mesh>
      {/* Pink Onion Ring */}
      <mesh position={[0.02, 0.28, -0.08]} rotation={[-Math.PI / 2 + 0.3, 0.2, 0]}>
        <torusGeometry args={[0.16, 0.03, 8, 24]} />
        <primitive object={materials.onion} />
      </mesh>
      {/* Lemon Wedge */}
      <mesh position={[-0.05, 0.29, 0.1]} rotation={[0.4, 0.6, 0.1]} scale={[0.1, 0.12, 0.1]}>
        <sphereGeometry args={[1, 12, 8, 0, Math.PI]} />
        <meshStandardMaterial color="#facc15" roughness={0.3} />
      </mesh>
    </group>
  );
}

// 10. Gulab Jamun Dessert
export function GulabJamunDish({ platterType = 'brass' }) {
  const materials = useMemo(() => getMaterials(platterType), [platterType]);

  return (
    <group>
      <KatoriBowl platterType={platterType} radius={0.48} height={0.3} />
      {/* Sweet Rose Syrup base */}
      <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.44, 24]} />
        <primitive object={materials.syrup} />
      </mesh>
      {/* Two golden brown dumplings */}
      <mesh castShadow position={[-0.11, 0.26, 0]} scale={[0.17, 0.17, 0.17]}>
        <sphereGeometry args={[1, 24, 16]} />
        <primitive object={materials.gulabJamun} />
      </mesh>
      <mesh castShadow position={[0.12, 0.28, 0.02]} scale={[0.17, 0.17, 0.17]}>
        <sphereGeometry args={[1, 24, 16]} />
        <primitive object={materials.gulabJamun} />
      </mesh>
      {/* Pistachio Slivers */}
      <mesh position={[0, 0.32, 0.05]} scale={[0.02, 0.01, 0.05]}>
        <boxGeometry />
        <meshStandardMaterial color="#84cc16" roughness={0.4} />
      </mesh>
    </group>
  );
}

// 11. Chilled Boondi Raita
export function RaitaDish({ platterType = 'brass' }) {
  const materials = useMemo(() => getMaterials(platterType), [platterType]);

  return (
    <group>
      <KatoriBowl platterType={platterType} radius={0.52} height={0.32} />
      {/* Creamy Yogurt */}
      <mesh position={[0, 0.26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.48, 24]} />
        <primitive object={materials.raitaYogurt} />
      </mesh>
      {/* Crunchy Boondi Pearls */}
      {[
        [-0.14, 0.28, -0.1],
        [0.15, 0.28, -0.05],
        [0.02, 0.29, 0.12],
        [-0.08, 0.28, 0.15],
        [0.12, 0.28, 0.18],
      ].map((pos, i) => (
        <mesh key={i} position={pos} scale={[0.045, 0.045, 0.045]}>
          <sphereGeometry args={[1, 12, 8]} />
          <primitive object={materials.boondi} />
        </mesh>
      ))}
      {/* Roasted Cumin Powder Dust */}
      <mesh position={[0, 0.27, 0]} rotation={[-Math.PI / 2, 0, 0.6]}>
        <ringGeometry args={[0.1, 0.3, 16]} />
        <meshStandardMaterial color="#78350f" roughness={0.8} transparent opacity={0.65} />
      </mesh>
    </group>
  );
}

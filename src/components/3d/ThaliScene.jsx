import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import {
  ThaliPlatter,
  DalTadkaDish,
  DalMakhaniDish,
  ShahiPaneerDish,
  RiceDish,
  RotiStack,
  SaladDish,
  GulabJamunDish,
} from './FoodMeshes';
import SteamParticles from './SteamParticles';
import SpiceParticles from './SpiceParticles';

// Rotating container with gentle wobble
function ThaliModel({ platterType, activeHotspot, onSelectHotspot }) {
  const groupRef = useRef();

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Main Base Platter */}
      <ThaliPlatter platterType={platterType} radius={2.5} />

      {/* 1. Dal Tadka (Top Left) */}
      <group position={[-1.2, 0.05, -1.0]}>
        <DalTadkaDish platterType={platterType} />
        <SteamParticles position={[0, 0.35, 0]} count={25} spread={0.3} />
        {/* Hotspot */}
        <Html position={[0, 0.65, 0]} center distanceFactor={8}>
          <button
            onClick={() => onSelectHotspot('dal-tadka')}
            className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cream-50/90 hover:bg-saffron-500 text-charcoal-900 border border-saffron-500/40 shadow-lg text-xs font-bold transition-all duration-200 transform hover:scale-110 whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-crimson-600 animate-ping" />
            Dal Tadka 🌶️
          </button>
        </Html>
      </group>

      {/* 2. Shahi Paneer (Top Center) */}
      <group position={[0.1, 0.05, -1.45]}>
        <ShahiPaneerDish platterType={platterType} />
        <SteamParticles position={[0, 0.35, 0]} count={25} spread={0.3} />
        {/* Hotspot */}
        <Html position={[0, 0.65, 0]} center distanceFactor={8}>
          <button
            onClick={() => onSelectHotspot('shahi-paneer')}
            className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cream-50/90 hover:bg-saffron-500 text-charcoal-900 border border-saffron-500/40 shadow-lg text-xs font-bold transition-all duration-200 transform hover:scale-110 whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-crimson-600 animate-ping" />
            Shahi Paneer
          </button>
        </Html>
      </group>

      {/* 3. Dal Makhani (Top Right) */}
      <group position={[1.35, 0.05, -0.9]}>
        <DalMakhaniDish platterType={platterType} />
        <SteamParticles position={[0, 0.35, 0]} count={25} spread={0.3} />
        {/* Hotspot */}
        <Html position={[0, 0.65, 0]} center distanceFactor={8}>
          <button
            onClick={() => onSelectHotspot('dal-makhani')}
            className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cream-50/90 hover:bg-saffron-500 text-charcoal-900 border border-saffron-500/40 shadow-lg text-xs font-bold transition-all duration-200 transform hover:scale-110 whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-crimson-600 animate-ping" />
            Dal Makhani
          </button>
        </Html>
      </group>

      {/* 4. Gulab Jamun Dessert (Right Middle) */}
      <group position={[1.55, 0.05, 0.4]}>
        <GulabJamunDish platterType={platterType} />
      </group>

      {/* 5. Fresh Crunchy Salad (Left Middle) */}
      <group position={[-1.5, 0.05, 0.25]}>
        <SaladDish platterType={platterType} />
      </group>

      {/* 6. Steamed Basmati Rice (Bottom Center/Right) */}
      <group position={[0.55, 0.05, 0.6]}>
        <RiceDish type="jeera" platterType={platterType} />
        <SteamParticles position={[0, 0.35, 0]} count={20} spread={0.25} />
        {/* Hotspot */}
        <Html position={[0, 0.65, 0]} center distanceFactor={8}>
          <button
            onClick={() => onSelectHotspot('jeera-rice')}
            className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cream-50/90 hover:bg-saffron-500 text-charcoal-900 border border-saffron-500/40 shadow-lg text-xs font-bold transition-all duration-200 transform hover:scale-110 whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-crimson-600 animate-ping" />
            Jeera Rice
          </button>
        </Html>
      </group>

      {/* 7. Stack of Warm Ghee Rotis (Bottom Left) */}
      <group position={[-0.6, 0.05, 0.75]}>
        <RotiStack />
        <SteamParticles position={[0, 0.3, 0]} count={20} spread={0.3} />
        {/* Hotspot */}
        <Html position={[0, 0.55, 0]} center distanceFactor={8}>
          <button
            onClick={() => onSelectHotspot('roti-stack')}
            className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cream-50/90 hover:bg-saffron-500 text-charcoal-900 border border-saffron-500/40 shadow-lg text-xs font-bold transition-all duration-200 transform hover:scale-110 whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-crimson-600 animate-ping" />
            Tawa Ghee Roti
          </button>
        </Html>
      </group>
    </group>
  );
}

export default function ThaliScene({
  platterType = 'brass',
  autoRotate = true,
  onSelectHotspot = () => {},
}) {
  const [activeSpot, setActiveSpot] = useState(null);
  const [mood, setMood] = useState('lunch'); // 'lunch' | 'dinner' | 'festive'

  const handleSpotClick = (dishId) => {
    setActiveSpot(dishId);
    onSelectHotspot(dishId);
  };

  // Dynamic light colors and intensities per mood
  const lightingConfigs = {
    lunch: {
      ambient: '#fffaf0',
      ambientIntensity: 1.05,
      keyColor: '#fff5e6',
      keyIntensity: 1.9,
      point1: '#fde047',
      point2: '#fef08a',
    },
    dinner: {
      ambient: '#fed7aa',
      ambientIntensity: 0.6,
      keyColor: '#f97316',
      keyIntensity: 1.6,
      point1: '#ea580c',
      point2: '#fb923c',
    },
    festive: {
      ambient: '#fef08a',
      ambientIntensity: 0.85,
      keyColor: '#e11d48',
      keyIntensity: 1.5,
      point1: '#f59e0b',
      point2: '#d97706',
    },
  };

  const currentLighting = lightingConfigs[mood];

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 4.2, 4.8], fov: 42 }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Dynamic Studio Lighting */}
          <ambientLight intensity={currentLighting.ambientIntensity} color={currentLighting.ambient} />
          <directionalLight
            position={[5, 8, 4]}
            intensity={currentLighting.keyIntensity}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
            color={currentLighting.keyColor}
          />
          <pointLight position={[-4, 4, -2]} intensity={0.9} color={currentLighting.point1} />
          <pointLight position={[0, 2.5, 2]} intensity={0.8} color={currentLighting.point2} />

          {/* 3D Model */}
          <ThaliModel
            platterType={platterType}
            activeHotspot={activeSpot}
            onSelectHotspot={handleSpotClick}
          />

          {/* Floating Spice Atmosphere */}
          <SpiceParticles count={45} radius={4.0} />

          {/* Soft Ground Contact Shadow */}
          <ContactShadows
            position={[0, -0.32, 0]}
            opacity={0.65}
            scale={7.5}
            blur={2.4}
            far={3.5}
            color="#3a1d13"
          />

          {/* Orbit Controls with safety limits */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3.5}
            maxDistance={7.5}
            maxPolarAngle={Math.PI / 2.15}
            minPolarAngle={Math.PI / 8}
            autoRotate={autoRotate}
            autoRotateSpeed={0.8}
            dampingFactor={0.06}
          />
        </Suspense>
      </Canvas>

      {/* Lighting Mood Switcher */}
      <div className="absolute bottom-12 left-4 flex items-center gap-1 p-1 rounded-full bg-cream-50/90 backdrop-blur-md border border-cream-400 shadow-md">
        <button
          onClick={() => setMood('lunch')}
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
            mood === 'lunch'
              ? 'bg-saffron-500 text-charcoal-900 shadow-sm'
              : 'text-muted hover:text-charcoal-900'
          }`}
          title="Bright Lunch Sunlight"
        >
          ☀️ Lunch
        </button>
        <button
          onClick={() => setMood('dinner')}
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
            mood === 'dinner'
              ? 'bg-crimson-700 text-white shadow-sm'
              : 'text-muted hover:text-charcoal-900'
          }`}
          title="Candlelit Evening Dinner"
        >
          🕯️ Dinner
        </button>
        <button
          onClick={() => setMood('festive')}
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
            mood === 'festive'
              ? 'bg-cardamom-700 text-white shadow-sm'
              : 'text-muted hover:text-charcoal-900'
          }`}
          title="Royal Festive Dhaba"
        >
          🏮 Festive
        </button>
      </div>

      {/* Interactive Helper Overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal-900/60 backdrop-blur-md text-cream-100 text-xs shadow-md">
        <span>🔄 Drag to rotate 360°</span>
        <span className="opacity-40">|</span>
        <span>🔍 Scroll to zoom</span>
      </div>
    </div>
  );
}

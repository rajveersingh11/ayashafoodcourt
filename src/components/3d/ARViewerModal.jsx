import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { X, Camera, RefreshCw, Smartphone, Eye } from 'lucide-react';
import {
  ThaliPlatter,
  DalTadkaDish,
  ShahiPaneerDish,
  DalMakhaniDish,
  RiceDish,
  RotiStack,
  SaladDish,
  GulabJamunDish,
} from './FoodMeshes';
import SteamParticles from './SteamParticles';

function ARThaliModel({ scale = 1.0 }) {
  return (
    <group scale={scale} position={[0, -0.4, 0]}>
      <ThaliPlatter platterType="brass" radius={2.5} />

      {/* Dal Tadka */}
      <group position={[-1.2, 0.05, -1.0]}>
        <DalTadkaDish />
        <SteamParticles position={[0, 0.35, 0]} count={15} spread={0.3} />
      </group>

      {/* Shahi Paneer */}
      <group position={[0.1, 0.05, -1.45]}>
        <ShahiPaneerDish />
        <SteamParticles position={[0, 0.35, 0]} count={15} spread={0.3} />
      </group>

      {/* Dal Makhani */}
      <group position={[1.35, 0.05, -0.9]}>
        <DalMakhaniDish />
        <SteamParticles position={[0, 0.35, 0]} count={15} spread={0.3} />
      </group>

      {/* Rice */}
      <group position={[0.55, 0.05, 0.6]}>
        <RiceDish type="jeera" />
      </group>

      {/* Roti */}
      <group position={[-0.6, 0.05, 0.75]}>
        <RotiStack />
      </group>

      {/* Salad & Sweet */}
      <group position={[-1.5, 0.05, 0.25]}>
        <SaladDish />
      </group>
      <group position={[1.55, 0.05, 0.4]}>
        <GulabJamunDish />
      </group>
    </group>
  );
}

export default function ARViewerModal({ isOpen, onClose }) {
  const videoRef = useRef(null);
  const [streamActive, setStreamActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [scale, setScale] = useState(1.1);

  // Initialize environment camera feed
  useEffect(() => {
    let mediaStream = null;

    if (isOpen) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({
            video: { facingMode: { ideal: 'environment' } },
            audio: false,
          })
          .then((stream) => {
            mediaStream = stream;
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              videoRef.current.play().catch(() => {});
            }
            setStreamActive(true);
            setCameraError('');
          })
          .catch((err) => {
            console.warn('Camera access error:', err);
            setCameraError('Camera access unavailable. Rendering in 3D Table Simulator mode.');
            setStreamActive(false);
          });
      } else {
        setCameraError('Camera access not supported on this browser.');
      }
    }

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col animate-fade-in overflow-hidden">
      {/* Top Overlay Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-saffron-500 text-charcoal-900 flex items-center justify-center font-bold text-xs">
            AR
          </div>
          <div>
            <h4 className="font-bold text-sm leading-tight">View On Your Table</h4>
            <small className="text-[11px] text-cream-200/80">
              Point your camera at a table or flat surface
            </small>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors"
          aria-label="Close AR"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Live Camera Video Background */}
      {streamActive ? (
        <video
          ref={videoRef}
          playsInline
          muted
          autoPlay
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      ) : (
        /* Fallback Simulation Background */
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-charcoal-900 via-charcoal-800 to-charcoal-900 flex items-center justify-center text-center p-6">
          <div className="max-w-xs text-cream-200/60 text-xs">
            <Smartphone className="w-10 h-10 mx-auto mb-2 text-saffron-500 animate-bounce" />
            <p>{cameraError || 'Allow camera permissions to project onto your real table.'}</p>
          </div>
        </div>
      )}

      {/* 3D AR Model Viewport */}
      <div className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 4.0, 4.2], fov: 46 }}
          className="w-full h-full"
          gl={{ alpha: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1.2} color="#fffcf5" />
            <directionalLight position={[4, 8, 3]} intensity={2.0} color="#fff2df" castShadow />
            <pointLight position={[-3, 4, -1]} intensity={0.9} color="#fde047" />

            <ARThaliModel scale={scale} />

            <ContactShadows
              position={[0, -0.45, 0]}
              opacity={0.8}
              scale={6.0}
              blur={2.0}
              far={3.0}
              color="#000000"
            />

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              minDistance={2.5}
              maxDistance={7.0}
              maxPolarAngle={Math.PI / 2.05}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 p-2 rounded-full bg-charcoal-900/80 backdrop-blur-md border border-white/20 text-white shadow-2xl">
        <button
          onClick={() => setScale((s) => Math.max(0.7, s - 0.15))}
          className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold"
          title="Scale Down"
        >
          - Smaller
        </button>

        <span className="text-xs font-bold text-saffron-400">
          {Math.round(scale * 100)}% 1:1 Scale
        </span>

        <button
          onClick={() => setScale((s) => Math.min(1.6, s + 0.15))}
          className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold"
          title="Scale Up"
        >
          + Larger
        </button>
      </div>
    </div>
  );
}

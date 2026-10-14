import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { X, Flame, Sparkles, Plus, Check } from 'lucide-react';
import {
  DalTadkaDish,
  DalMakhaniDish,
  ShahiPaneerDish,
  RiceDish,
  RotiStack,
  NaanBread,
  SaladDish,
  GulabJamunDish,
  RaitaDish,
} from './FoodMeshes';
import SteamParticles from './SteamParticles';
import SpiceParticles from './SpiceParticles';
import { useCart } from '../../context/CartContext';

function SingleDishModel({ modelType }) {
  switch (modelType) {
    case 'dal-tadka':
      return (
        <group scale={1.8} position={[0, -0.3, 0]}>
          <DalTadkaDish />
          <SteamParticles position={[0, 0.4, 0]} count={35} spread={0.35} />
        </group>
      );
    case 'dal-makhani':
      return (
        <group scale={1.8} position={[0, -0.3, 0]}>
          <DalMakhaniDish />
          <SteamParticles position={[0, 0.4, 0]} count={35} spread={0.35} />
        </group>
      );
    case 'shahi-paneer':
    case 'paneer-butter-masala':
      return (
        <group scale={1.8} position={[0, -0.3, 0]}>
          <ShahiPaneerDish />
          <SteamParticles position={[0, 0.4, 0]} count={35} spread={0.35} />
        </group>
      );
    case 'roti-stack':
      return (
        <group scale={2.0} position={[0, -0.2, 0]}>
          <RotiStack />
          <SteamParticles position={[0, 0.3, 0]} count={25} spread={0.4} />
        </group>
      );
    case 'garlic-naan':
    case 'naan':
      return (
        <group scale={2.2} position={[0, -0.2, 0]}>
          <NaanBread />
          <SteamParticles position={[0, 0.3, 0]} count={25} spread={0.4} />
        </group>
      );
    case 'jeera-rice':
      return (
        <group scale={1.9} position={[0, -0.3, 0]}>
          <RiceDish type="jeera" />
          <SteamParticles position={[0, 0.4, 0]} count={30} spread={0.35} />
        </group>
      );
    case 'gulab-jamun':
      return (
        <group scale={2.0} position={[0, -0.3, 0]}>
          <GulabJamunDish />
        </group>
      );
    case 'raita':
      return (
        <group scale={1.9} position={[0, -0.3, 0]}>
          <RaitaDish />
        </group>
      );
    default:
      return (
        <group scale={1.8} position={[0, -0.3, 0]}>
          <DalTadkaDish />
          <SteamParticles position={[0, 0.4, 0]} count={35} spread={0.35} />
        </group>
      );
  }
}

export default function DishModal3D({ dish, onClose }) {
  const { addToCart } = useCart();
  const [portion, setPortion] = React.useState(dish.halfPrice ? 'half' : 'standard');
  const [added, setAdded] = React.useState(false);

  if (!dish) return null;

  const currentPrice =
    portion === 'half' && dish.halfPrice
      ? dish.halfPrice
      : portion === 'full' && dish.fullPrice
      ? dish.fullPrice
      : dish.price;

  const handleAddToCart = () => {
    addToCart(dish, portion);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-cream-50 rounded-3xl overflow-hidden shadow-2xl border border-cream-300 grid grid-cols-1 md:grid-cols-2">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-cream-100 hover:bg-cream-200 text-charcoal-800 flex items-center justify-center shadow-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 3D Canvas Area */}
        <div className="relative h-72 md:h-auto min-h-[340px] bg-gradient-to-br from-cream-200 via-saffron-300/30 to-cream-300 flex items-center justify-center cursor-grab active:cursor-grabbing">
          <Canvas
            shadows
            camera={{ position: [0, 2.2, 3.2], fov: 40 }}
            className="w-full h-full"
          >
            <Suspense fallback={null}>
              <ambientLight intensity={1.0} color="#fff8ed" />
              <directionalLight position={[4, 6, 3]} intensity={1.8} castShadow color="#fff3df" />
              <pointLight position={[-3, 2, -1]} intensity={0.8} color="#f5dcaf" />
              <SingleDishModel modelType={dish.modelType || 'dal-tadka'} />
              <SpiceParticles count={30} radius={2.5} />
              <ContactShadows
                position={[0, -0.4, 0]}
                opacity={0.6}
                scale={4.5}
                blur={2.0}
                far={2.5}
                color="#3a1d13"
              />
              <OrbitControls
                enablePan={false}
                minDistance={2.2}
                maxDistance={5.5}
                maxPolarAngle={Math.PI / 2.05}
                autoRotate
                autoRotateSpeed={1.2}
              />
            </Suspense>
          </Canvas>

          {/* Interactive Hint */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-charcoal-900/60 backdrop-blur-sm text-cream-100 text-[11px] pointer-events-none">
            360° Interactive 3D Model
          </div>
        </div>

        {/* Dish Details & Cart Add */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cardamom-600/10 text-cardamom-700">
                100% Pure Veg
              </span>
              {dish.tag && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-saffron-500/20 text-crimson-700">
                  {dish.tag}
                </span>
              )}
            </div>

            <h3 className="font-serif text-2xl md:text-3xl font-bold text-charcoal-900 mb-2">
              {dish.name}
            </h3>

            <p className="text-muted text-sm leading-relaxed mb-5">
              {dish.description}
            </p>

            {/* Spiciness & Calories */}
            <div className="flex items-center gap-4 text-xs font-medium text-charcoal-800 pb-5 mb-5 border-b border-cream-400">
              {dish.spiciness && (
                <div className="flex items-center gap-1">
                  <Flame className="w-4 h-4 text-crimson-600" />
                  <span>Spice Level: {'🌶️'.repeat(dish.spiciness)}</span>
                </div>
              )}
              {dish.calories && (
                <div className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-saffron-600" />
                  <span>{dish.calories}</span>
                </div>
              )}
            </div>

            {/* Portion Options */}
            {(dish.halfPrice || dish.fullPrice) && (
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                  Select Portion Size
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPortion('half')}
                    className={`py-2.5 px-3 rounded-xl border text-sm font-bold flex justify-between items-center transition-all ${
                      portion === 'half'
                        ? 'border-crimson-600 bg-crimson-600/5 text-crimson-700 ring-2 ring-crimson-600/20'
                        : 'border-cream-400 hover:border-cream-400/80 text-charcoal-800'
                    }`}
                  >
                    <span>Half Plate</span>
                    <span className="text-cardamom-700 font-extrabold">₹{dish.halfPrice}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPortion('full')}
                    className={`py-2.5 px-3 rounded-xl border text-sm font-bold flex justify-between items-center transition-all ${
                      portion === 'full'
                        ? 'border-crimson-600 bg-crimson-600/5 text-crimson-700 ring-2 ring-crimson-600/20'
                        : 'border-cream-400 hover:border-cream-400/80 text-charcoal-800'
                    }`}
                  >
                    <span>Full Plate</span>
                    <span className="text-cardamom-700 font-extrabold">₹{dish.fullPrice}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action */}
          <div className="pt-4 border-t border-cream-300 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs text-muted block">Price</span>
              <span className="text-2xl font-black text-cardamom-700 font-serif">
                ₹{currentPrice}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold transition-all shadow-md ${
                added
                  ? 'bg-cardamom-600 text-white'
                  : 'bg-crimson-600 hover:bg-crimson-500 text-white hover:shadow-lg transform active:scale-95'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" /> Added to Order!
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" /> Add to Order
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

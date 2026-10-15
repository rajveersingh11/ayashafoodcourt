import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { Sparkles, Check, ShoppingBag, Send, RefreshCw, Smartphone, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  ThaliPlatter,
  DalTadkaDish,
  DalMakhaniDish,
  ShahiPaneerDish,
  RiceDish,
  RotiStack,
  NaanBread,
  SaladDish,
  GulabJamunDish,
  RaitaDish,
} from './3d/FoodMeshes';
import SteamParticles from './3d/SteamParticles';
import SpiceParticles from './3d/SpiceParticles';
import { THALI_CUSTOMIZER_OPTIONS, RESTAURANT_INFO } from '../data/menuData';
import { useCart } from '../context/CartContext';

function CustomThali3D({ config }) {
  const { platter, dal, sabzi, bread, rice, extras } = config;

  return (
    <group position={[0, -0.2, 0]}>
      {/* Platter */}
      <ThaliPlatter platterType={platter} radius={2.5} />

      {/* Selected Dal (Top Left) */}
      <group position={[-1.2, 0.05, -1.0]}>
        {dal === 'dal-makhani' ? (
          <DalMakhaniDish platterType={platter} />
        ) : (
          <DalTadkaDish platterType={platter} />
        )}
        <SteamParticles position={[0, 0.35, 0]} count={20} spread={0.3} />
      </group>

      {/* Selected Sabzi (Top Center) */}
      <group position={[0.1, 0.05, -1.45]}>
        <ShahiPaneerDish platterType={platter} />
        <SteamParticles position={[0, 0.35, 0]} count={20} spread={0.3} />
      </group>

      {/* Selected Rice (Bottom Center/Right) */}
      <group position={[0.55, 0.05, 0.6]}>
        <RiceDish type={rice === 'steamed-rice' ? 'plain' : 'jeera'} platterType={platter} />
        <SteamParticles position={[0, 0.35, 0]} count={18} spread={0.25} />
      </group>

      {/* Selected Bread (Bottom Left) */}
      <group position={[-0.6, 0.05, 0.75]}>
        {bread === 'garlic-naan' || bread === 'lachha-paratha' ? (
          <NaanBread />
        ) : (
          <RotiStack />
        )}
        <SteamParticles position={[0, 0.3, 0]} count={18} spread={0.3} />
      </group>

      {/* Salad (Standard on Left) */}
      {extras.salad && (
        <group position={[-1.5, 0.05, 0.25]}>
          <SaladDish platterType={platter} />
        </group>
      )}

      {/* Optional Raita (Top Right) */}
      {extras.raita && (
        <group position={[1.35, 0.05, -0.9]}>
          <RaitaDish platterType={platter} />
        </group>
      )}

      {/* Optional Gulab Jamun (Right Middle) */}
      {extras.gulabJamun && (
        <group position={[1.55, 0.05, 0.4]}>
          <GulabJamunDish platterType={platter} />
        </group>
      )}
    </group>
  );
}

export default function ThaliCustomizer({
  initialConfig,
  onOpenAR = () => {},
  onOpenMatcher = () => {},
}) {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('platter'); // 'platter' | 'dal' | 'sabzi' | 'bread' | 'rice' | 'extras'

  const [config, setConfig] = useState({
    platter: 'brass',
    dal: 'dal-tadka',
    sabzi: 'shahi-paneer',
    bread: 'tawa-butter',
    rice: 'jeera-rice',
    extras: {
      salad: true,
      raita: false,
      gulabJamun: false,
    },
  });

  // Sync when smart meal matcher loads an initial configuration
  useEffect(() => {
    if (initialConfig) {
      setConfig(initialConfig);
    }
  }, [initialConfig]);

  const [added, setAdded] = useState(false);

  // Compute custom price
  const basePrice = 85;
  const sabziObj = THALI_CUSTOMIZER_OPTIONS.sabzis.find((s) => s.id === config.sabzi);
  const breadObj = THALI_CUSTOMIZER_OPTIONS.breads.find((b) => b.id === config.bread);
  const riceObj = THALI_CUSTOMIZER_OPTIONS.rice.find((r) => r.id === config.rice);

  let totalPrice = basePrice;
  if (sabziObj) totalPrice += sabziObj.priceAdd || 0;
  if (breadObj) totalPrice += breadObj.priceAdd || 0;
  if (riceObj) totalPrice += riceObj.priceAdd || 0;
  if (config.extras.raita) totalPrice += 30;
  if (config.extras.gulabJamun) totalPrice += 40;

  // Selected names for receipt summary
  const platterName = THALI_CUSTOMIZER_OPTIONS.platters.find((p) => p.id === config.platter)?.name;
  const dalName = THALI_CUSTOMIZER_OPTIONS.dals.find((d) => d.id === config.dal)?.name;
  const sabziName = sabziObj?.name;
  const breadName = breadObj?.name;
  const riceName = riceObj?.name;

  const summary = `${platterName}, ${dalName}, ${sabziName}, ${breadName}, ${riceName}${
    config.extras.raita ? ' + Boondi Raita' : ''
  }${config.extras.gulabJamun ? ' + Gulab Jamun' : ''}`;

  const handleAddToCart = () => {
    addToCart(
      { id: 'custom-thali', name: 'Custom 3D Royal Thali', price: totalPrice },
      'custom',
      {
        title: 'Custom 3D Royal Thali',
        summary,
        totalPrice,
      }
    );

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#e6b866', '#a72d20', '#285b3b'],
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `*🍛 CUSTOM 3D THALI ORDER - AYANSHI FOOD COURT*\n\n` +
      `*Configuration:*\n` +
      `• Platter: ${platterName}\n` +
      `• Dal: ${dalName}\n` +
      `• Sabzi: ${sabziName}\n` +
      `• Bread: ${breadName}\n` +
      `• Rice: ${riceName}\n` +
      `• Extras: Salad${config.extras.raita ? ', Boondi Raita' : ''}${config.extras.gulabJamun ? ', Gulab Jamun' : ''}\n\n` +
      `*Total Price: ₹${totalPrice}*\n\n` +
      `_I would like to order this custom thali. Please confirm availability!_`
    );
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="customizer" className="py-20 px-4 md:px-8 bg-gradient-to-b from-cream-100 via-cream-200 to-cream-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-500/20 text-crimson-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> 3D Interactive Workbench
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-charcoal-900 tracking-tight">
            Build Your Own <span className="text-crimson-600">Thali in 3D</span>
          </h2>
          <p className="mt-3 text-muted text-sm md:text-base leading-relaxed">
            Customize your platter, curries, breads, and treats in real time. Rotate 360° to inspect your meal before ordering.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D Canvas Showcase */}
          <div className="lg:col-span-7 h-[420px] md:h-[540px] rounded-3xl overflow-hidden shadow-warm-lg bg-gradient-to-br from-cream-50 via-cream-200 to-saffron-300/30 border border-cream-400 relative">
            <Canvas
              shadows
              dpr={[1, 2]}
              camera={{ position: [0, 3.8, 4.4], fov: 42 }}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.9} color="#fff8ed" />
                <directionalLight position={[4, 7, 3]} intensity={1.8} castShadow color="#fff3df" />
                <pointLight position={[-3, 3, -1]} intensity={0.8} color="#f5dcaf" />
                <CustomThali3D config={config} />
                <SpiceParticles count={35} radius={3.5} />
                <ContactShadows
                  position={[0, -0.3, 0]}
                  opacity={0.65}
                  scale={6.5}
                  blur={2.2}
                  far={3.0}
                  color="#3a1d13"
                />
                <OrbitControls
                  enablePan={false}
                  minDistance={3.0}
                  maxDistance={6.5}
                  maxPolarAngle={Math.PI / 2.1}
                  autoRotate
                  autoRotateSpeed={0.6}
                />
              </Suspense>
            </Canvas>

            {/* Floating Live Badge */}
            <div className="absolute top-4 left-4 bg-cream-50/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-saffron-500/30 shadow-md text-xs font-bold text-charcoal-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cardamom-600 animate-pulse" />
              Live 3D Rendering
            </div>

            {/* Top Right AR and AI Matcher Actions */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5">
              <button
                type="button"
                onClick={onOpenAR}
                className="bg-cream-50/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-cardamom-600/40 shadow-md text-xs font-bold text-cardamom-800 hover:bg-cream-100 flex items-center gap-1.5 transition-all"
                title="View on real table in Augmented Reality"
              >
                <span>📱 AR Table View</span>
              </button>
              <button
                type="button"
                onClick={onOpenMatcher}
                className="bg-cream-50/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-crimson-600/40 shadow-md text-xs font-bold text-crimson-700 hover:bg-cream-100 flex items-center gap-1.5 transition-all"
                title="AI Craving & Diet Matcher"
              >
                <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
                <span>AI Matcher</span>
              </button>
            </div>

            {/* Drag to inspect tip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none px-3.5 py-1.5 rounded-full bg-charcoal-900/60 backdrop-blur-md text-cream-100 text-xs shadow-md">
              🔄 Drag around to view dishes
            </div>
          </div>

          {/* Configurator Controls */}
          <div className="lg:col-span-5 bg-cream-50 rounded-3xl p-6 md:p-8 shadow-warm border border-cream-300 flex flex-col justify-between">
            <div>
              {/* Category Step Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-6">
                {[
                  { id: 'platter', label: '1. Platter' },
                  { id: 'dal', label: '2. Dal' },
                  { id: 'sabzi', label: '3. Sabzi' },
                  { id: 'bread', label: '4. Bread' },
                  { id: 'rice', label: '5. Rice' },
                  { id: 'extras', label: '6. Extras' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'bg-crimson-600 text-white shadow-md'
                        : 'bg-cream-200 text-charcoal-800 hover:bg-cream-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: Platter Style */}
              {activeTab === 'platter' && (
                <div className="space-y-3">
                  <h4 className="font-serif text-lg font-bold text-charcoal-900">Choose Platter Base</h4>
                  {THALI_CUSTOMIZER_OPTIONS.platters.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setConfig({ ...config, platter: p.id })}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        config.platter === p.id
                          ? 'border-crimson-600 bg-crimson-600/5 shadow-sm ring-2 ring-crimson-600/20'
                          : 'border-cream-300 hover:border-saffron-500 bg-white'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-charcoal-900 text-sm flex items-center gap-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full inline-block border"
                            style={{ backgroundColor: p.color }}
                          />
                          {p.name}
                        </div>
                        <p className="text-xs text-muted mt-0.5">{p.desc}</p>
                      </div>
                      {config.platter === p.id && <Check className="w-5 h-5 text-crimson-600" />}
                    </button>
                  ))}
                </div>
              )}

              {/* Tab 2: Dal */}
              {activeTab === 'dal' && (
                <div className="space-y-3">
                  <h4 className="font-serif text-lg font-bold text-charcoal-900">Choose Your Dal</h4>
                  {THALI_CUSTOMIZER_OPTIONS.dals.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setConfig({ ...config, dal: d.id })}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        config.dal === d.id
                          ? 'border-crimson-600 bg-crimson-600/5 shadow-sm ring-2 ring-crimson-600/20'
                          : 'border-cream-300 hover:border-saffron-500 bg-white'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-charcoal-900 text-sm flex items-center gap-2">
                          {d.name} <span className="text-xs">{d.spice}</span>
                        </div>
                        <p className="text-xs text-muted mt-0.5">{d.desc}</p>
                      </div>
                      {config.dal === d.id && <Check className="w-5 h-5 text-crimson-600" />}
                    </button>
                  ))}
                </div>
              )}

              {/* Tab 3: Sabzi / Paneer */}
              {activeTab === 'sabzi' && (
                <div className="space-y-3">
                  <h4 className="font-serif text-lg font-bold text-charcoal-900">Choose Main Sabzi</h4>
                  {THALI_CUSTOMIZER_OPTIONS.sabzis.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setConfig({ ...config, sabzi: s.id })}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        config.sabzi === s.id
                          ? 'border-crimson-600 bg-crimson-600/5 shadow-sm ring-2 ring-crimson-600/20'
                          : 'border-cream-300 hover:border-saffron-500 bg-white'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-charcoal-900 text-sm">{s.name}</div>
                        <p className="text-xs text-muted mt-0.5">{s.desc}</p>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        {s.priceAdd > 0 && (
                          <span className="text-xs font-bold text-cardamom-700">+₹{s.priceAdd}</span>
                        )}
                        {config.sabzi === s.id && <Check className="w-5 h-5 text-crimson-600" />}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Tab 4: Bread */}
              {activeTab === 'bread' && (
                <div className="space-y-3">
                  <h4 className="font-serif text-lg font-bold text-charcoal-900">Choose Breads</h4>
                  {THALI_CUSTOMIZER_OPTIONS.breads.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setConfig({ ...config, bread: b.id })}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        config.bread === b.id
                          ? 'border-crimson-600 bg-crimson-600/5 shadow-sm ring-2 ring-crimson-600/20'
                          : 'border-cream-300 hover:border-saffron-500 bg-white'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-charcoal-900 text-sm">{b.name}</div>
                        <p className="text-xs text-muted mt-0.5">{b.desc}</p>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        {b.priceAdd > 0 && (
                          <span className="text-xs font-bold text-cardamom-700">+₹{b.priceAdd}</span>
                        )}
                        {config.bread === b.id && <Check className="w-5 h-5 text-crimson-600" />}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Tab 5: Rice */}
              {activeTab === 'rice' && (
                <div className="space-y-3">
                  <h4 className="font-serif text-lg font-bold text-charcoal-900">Choose Rice</h4>
                  {THALI_CUSTOMIZER_OPTIONS.rice.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setConfig({ ...config, rice: r.id })}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        config.rice === r.id
                          ? 'border-crimson-600 bg-crimson-600/5 shadow-sm ring-2 ring-crimson-600/20'
                          : 'border-cream-300 hover:border-saffron-500 bg-white'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-charcoal-900 text-sm">{r.name}</div>
                        <p className="text-xs text-muted mt-0.5">{r.desc}</p>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        {r.priceAdd > 0 && (
                          <span className="text-xs font-bold text-cardamom-700">+₹{r.priceAdd}</span>
                        )}
                        {config.rice === r.id && <Check className="w-5 h-5 text-crimson-600" />}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Tab 6: Extras */}
              {activeTab === 'extras' && (
                <div className="space-y-3">
                  <h4 className="font-serif text-lg font-bold text-charcoal-900">Add Extras & Treats</h4>
                  <div className="p-3.5 rounded-2xl border border-cream-300 bg-cream-100 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-charcoal-900 text-sm">Crisp Salad & Lemon</div>
                      <p className="text-xs text-muted">Cucumber, onion rings, fresh lemon</p>
                    </div>
                    <span className="text-xs font-bold text-cardamom-700">Included</span>
                  </div>

                  <button
                    onClick={() =>
                      setConfig({
                        ...config,
                        extras: { ...config.extras, raita: !config.extras.raita },
                      })
                    }
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      config.extras.raita
                        ? 'border-crimson-600 bg-crimson-600/5 shadow-sm ring-2 ring-crimson-600/20'
                        : 'border-cream-300 hover:border-saffron-500 bg-white'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-charcoal-900 text-sm">Chilled Boondi Raita</div>
                      <p className="text-xs text-muted">Spiced yogurt with crunchy boondi</p>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <span className="text-xs font-bold text-cardamom-700">+₹30</span>
                      {config.extras.raita && <Check className="w-5 h-5 text-crimson-600" />}
                    </div>
                  </button>

                  <button
                    onClick={() =>
                      setConfig({
                        ...config,
                        extras: { ...config.extras, gulabJamun: !config.extras.gulabJamun },
                      })
                    }
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      config.extras.gulabJamun
                        ? 'border-crimson-600 bg-crimson-600/5 shadow-sm ring-2 ring-crimson-600/20'
                        : 'border-cream-300 hover:border-saffron-500 bg-white'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-charcoal-900 text-sm">2x Hot Gulab Jamun</div>
                      <p className="text-xs text-muted">Rose cardamom syrup dessert</p>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <span className="text-xs font-bold text-cardamom-700">+₹40</span>
                      {config.extras.gulabJamun && <Check className="w-5 h-5 text-crimson-600" />}
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Price & Action Row */}
            <div className="mt-8 pt-5 border-t border-cream-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs text-muted uppercase tracking-wider block">Custom Thali Total</span>
                  <span className="font-serif text-3xl font-black text-cardamom-700">₹{totalPrice}</span>
                </div>
                <button
                  onClick={() =>
                    setConfig({
                      platter: 'brass',
                      dal: 'dal-tadka',
                      sabzi: 'shahi-paneer',
                      bread: 'tawa-butter',
                      rice: 'jeera-rice',
                      extras: { salad: true, raita: false, gulabJamun: false },
                    })
                  }
                  className="flex items-center gap-1.5 text-xs text-muted hover:text-crimson-600 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reset
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`py-3.5 px-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-md transition-all ${
                    added
                      ? 'bg-cardamom-600 text-white'
                      : 'bg-crimson-600 hover:bg-crimson-500 text-white hover:shadow-lg active:scale-95'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" /> Added!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </>
                  )}
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="py-3.5 px-4 rounded-2xl font-bold flex items-center justify-center gap-2 bg-cardamom-600 hover:bg-cardamom-500 text-white shadow-md hover:shadow-lg active:scale-95 transition-all text-xs md:text-sm"
                >
                  <Send className="w-4 h-4" /> Order WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

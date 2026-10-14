import React, { useState } from 'react';
import { ArrowRight, Sparkles, Check, Phone, ShieldCheck, Flame } from 'lucide-react';
import ThaliScene from './3d/ThaliScene';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Hero({ onSelectHotspot }) {
  const [platterType, setPlatterType] = useState('brass');
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center py-12 md:py-20 px-4 md:px-8 bg-radial-gradient overflow-hidden">
      {/* Warm ambient background accents */}
      <div className="absolute top-1/4 right-5 w-96 h-96 bg-saffron-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-crimson-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center relative z-10">
        {/* Left Column: Hero Copy & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cardamom-600/10 border border-cardamom-600/20 text-cardamom-700 text-xs font-extrabold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-cardamom-600" />
            Fresh • Homestyle • Pure Vegetarian
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-charcoal-900 tracking-tight leading-[1.08]">
            A little taste of <br className="hidden sm:inline" />
            <span className="text-crimson-600 italic font-serif">home.</span>
          </h1>

          <p className="text-muted text-base sm:text-lg leading-relaxed max-w-xl">
            Comforting Indian meals, puffed tawa rotis, and flavour-packed gravies—prepared homestyle and served with care. Experience our dishes in interactive 3D and order hot to your doorstep in Sector 66, Noida.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#customizer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-crimson-600 hover:bg-crimson-700 text-white font-bold text-sm shadow-warm hover:shadow-warm-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-4 h-4 text-saffron-400" />
              Build 3D Thali
            </a>

            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-cream-50 hover:bg-cream-200 text-charcoal-900 border border-cream-400 font-bold text-sm shadow-sm transition-all transform hover:-translate-y-0.5"
            >
              Explore Menu <ArrowRight className="w-4 h-4 text-crimson-600" />
            </a>

            <a
              href={`tel:${RESTAURANT_INFO.phone1}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-cardamom-600/10 hover:bg-cardamom-600/20 text-cardamom-700 font-bold text-sm transition-all"
            >
              <Phone className="w-4 h-4 text-cardamom-600" />
              Call to Order
            </a>
          </div>

          {/* Value Props & Quick Points */}
          <div className="pt-4 border-t border-cream-300 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-bold text-charcoal-800">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-cardamom-600/10 text-cardamom-700 flex items-center justify-center text-xs">
                ✓
              </span>
              <span>100% Pure Veg</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-cardamom-600/10 text-cardamom-700 flex items-center justify-center text-xs">
                ✓
              </span>
              <span>Free Delivery (2km)</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <span className="w-5 h-5 rounded-full bg-cardamom-600/10 text-cardamom-700 flex items-center justify-center text-xs">
                ✓
              </span>
              <span>Party Orders Welcome</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Showcase */}
        <div className="lg:col-span-6 relative">
          {/* Main 3D Container */}
          <div className="w-full h-[380px] sm:h-[460px] md:h-[540px] rounded-3xl overflow-hidden shadow-warm-lg bg-gradient-to-br from-cream-50 via-cream-200 to-saffron-300/30 border border-cream-400 relative">
            <ThaliScene
              platterType={platterType}
              autoRotate={autoRotate}
              onSelectHotspot={onSelectHotspot}
            />

            {/* Platter Type Switcher Overlay */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 p-1 rounded-full bg-cream-50/90 backdrop-blur-md border border-cream-400 shadow-md">
              <button
                onClick={() => setPlatterType('brass')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  platterType === 'brass'
                    ? 'bg-saffron-500 text-charcoal-900 shadow-sm'
                    : 'text-muted hover:text-charcoal-900'
                }`}
              >
                Royal Brass
              </button>
              <button
                onClick={() => setPlatterType('steel')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  platterType === 'steel'
                    ? 'bg-charcoal-800 text-cream-50 shadow-sm'
                    : 'text-muted hover:text-charcoal-900'
                }`}
              >
                Stainless Steel
              </button>
            </div>

            {/* Auto Rotate Toggle */}
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cream-50/90 backdrop-blur-md border border-cream-400 shadow-md text-xs font-bold text-charcoal-800 hover:bg-cream-200 transition-colors"
            >
              {autoRotate ? '⏸ Pause Spin' : '▶ Auto Spin'}
            </button>
          </div>

          {/* Floating Badges */}
          <div className="hidden sm:flex absolute -bottom-5 -left-4 bg-cream-50 border border-cream-300 rounded-2xl p-3 shadow-warm items-center gap-3 animate-float">
            <div className="w-9 h-9 rounded-xl bg-saffron-500/20 text-crimson-600 flex items-center justify-center font-serif text-lg font-black">
              🍲
            </div>
            <div>
              <strong className="block text-xs text-charcoal-900">Ghar Jaisa Swaad</strong>
              <small className="text-[11px] text-muted">Homestyle goodness, daily</small>
            </div>
          </div>

          <div className="hidden sm:flex absolute -top-4 -right-4 bg-cream-50 border border-cream-300 rounded-2xl p-3 shadow-warm items-center gap-3">
            <div className="text-saffron-600 text-sm">★★★★★</div>
            <div>
              <strong className="block text-xs text-charcoal-900">Made Fresh to Order</strong>
              <small className="text-[11px] text-muted">Mamura, Sector 66</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

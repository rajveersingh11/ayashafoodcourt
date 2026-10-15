import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, X, Flame, Heart, Zap, Award } from 'lucide-react';
import { SMART_MEAL_PRESETS } from '../data/menuData';
import { useCart } from '../context/CartContext';

export default function SmartMealMatcher({ isOpen, onClose, onLoadTo3D }) {
  const { addToCart } = useCart();
  const [step, setStep] = useState(1);
  const [hunger, setHunger] = useState('solo'); // 'solo' | 'duo' | 'group'
  const [vibe, setVibe] = useState('healthy'); // 'healthy' | 'royal' | 'budget' | 'spicy'
  const [added, setAdded] = useState(false);

  if (!isOpen) return null;

  // Determine best matching preset
  let matchedPreset = SMART_MEAL_PRESETS[0];
  if (vibe === 'royal') {
    matchedPreset = SMART_MEAL_PRESETS[1];
  } else if (vibe === 'budget') {
    matchedPreset = SMART_MEAL_PRESETS[2];
  } else if (vibe === 'spicy') {
    matchedPreset = SMART_MEAL_PRESETS[3];
  } else {
    matchedPreset = SMART_MEAL_PRESETS[0];
  }

  const handleApplyTo3D = () => {
    if (onLoadTo3D) {
      onLoadTo3D(matchedPreset.config);
    }
    onClose();
    // Smooth scroll to customizer
    const el = document.getElementById('customizer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDirectAdd = () => {
    addToCart(
      { id: matchedPreset.id, name: matchedPreset.title, price: matchedPreset.price },
      'custom',
      {
        title: matchedPreset.title,
        summary: matchedPreset.description,
        totalPrice: matchedPreset.price,
      }
    );
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-cream-50 rounded-3xl overflow-hidden shadow-2xl border border-cream-300">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-cream-100 via-saffron-300/30 to-cream-200 border-b border-cream-300 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-crimson-600 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-saffron-400" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-crimson-700 block">
                Ayanshi Smart Assistant
              </span>
              <h3 className="font-serif text-xl font-bold text-charcoal-900 leading-tight">
                AI Craving & Diet Matcher
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-cream-300 text-charcoal-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps */}
        <div className="p-6 md:p-8 space-y-6">
          {step === 1 ? (
            <div className="space-y-4">
              <span className="text-xs font-bold text-muted uppercase tracking-wider block">
                Step 1 of 2: Who is eating today?
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'solo', label: 'Solo Meal', icon: '👤', desc: 'Just for me' },
                  { id: 'duo', label: 'Duo / Couple', icon: '👥', desc: 'Two persons' },
                  { id: 'group', label: 'Family / Party', icon: '🎉', desc: 'Group feast' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setHunger(item.id)}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      hunger === item.id
                        ? 'border-crimson-600 bg-crimson-600/5 ring-2 ring-crimson-600/20 shadow-sm'
                        : 'border-cream-300 bg-white hover:border-saffron-500'
                    }`}
                  >
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="font-bold text-sm text-charcoal-900">{item.label}</div>
                    <small className="text-[11px] text-muted">{item.desc}</small>
                  </button>
                ))}
              </div>

              <span className="text-xs font-bold text-muted uppercase tracking-wider block pt-2">
                Step 2 of 2: What is your craving today?
              </span>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    id: 'healthy',
                    label: 'Light & Healthy',
                    icon: '🌿',
                    tag: '<500 kcal',
                    desc: 'Balanced, low oil, comforting',
                  },
                  {
                    id: 'royal',
                    label: 'Royal & Creamy',
                    icon: '👑',
                    tag: 'Indulgent',
                    desc: 'Makhani, butter naan, sweets',
                  },
                  {
                    id: 'budget',
                    label: 'Quick & Budget',
                    icon: '⚡',
                    tag: 'Under ₹100',
                    desc: 'Hearty homestyle value',
                  },
                  {
                    id: 'spicy',
                    label: 'Spicy & Tangy',
                    icon: '🌶️',
                    tag: 'Bold Spices',
                    desc: 'Chole, lachha paratha, raita',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setVibe(item.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      vibe === item.id
                        ? 'border-crimson-600 bg-crimson-600/5 ring-2 ring-crimson-600/20 shadow-sm'
                        : 'border-cream-300 bg-white hover:border-saffron-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-saffron-500/20 text-crimson-700">
                        {item.tag}
                      </span>
                    </div>
                    <div className="font-bold text-xs text-charcoal-900">{item.label}</div>
                    <p className="text-[11px] text-muted mt-0.5 leading-snug">{item.desc}</p>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full mt-4 py-3.5 rounded-2xl bg-crimson-600 hover:bg-crimson-500 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                Find My Perfect 3D Match <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Result Screen */
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-cream-300">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cardamom-600/15 text-cardamom-700 text-xs font-bold">
                  <Award className="w-3.5 h-3.5" /> 99% Craving Match Found!
                </span>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-muted hover:text-crimson-600 font-bold underline"
                >
                  Change Answers
                </button>
              </div>

              {/* Matched Card */}
              <div className="p-5 rounded-2xl bg-white border border-saffron-500/40 shadow-warm">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-2xl mr-2">{matchedPreset.icon}</span>
                    <h4 className="font-serif text-xl font-bold text-charcoal-900 inline">
                      {matchedPreset.title}
                    </h4>
                    <p className="text-xs text-muted mt-1">{matchedPreset.tagline}</p>
                  </div>
                  <span className="font-serif text-2xl font-black text-cardamom-700 whitespace-nowrap">
                    ₹{matchedPreset.price}
                  </span>
                </div>

                <p className="text-xs text-charcoal-800 leading-relaxed bg-cream-100 p-3 rounded-xl mt-3">
                  {matchedPreset.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleApplyTo3D}
                  className="py-3 px-4 rounded-xl font-bold bg-saffron-500 hover:bg-saffron-400 text-charcoal-900 shadow-sm flex items-center justify-center gap-2 text-xs md:text-sm transition-all"
                >
                  <Sparkles className="w-4 h-4" /> Load onto 3D Platter ✨
                </button>

                <button
                  onClick={handleDirectAdd}
                  className={`py-3 px-4 rounded-xl font-bold text-white shadow-md flex items-center justify-center gap-2 text-xs md:text-sm transition-all ${
                    added ? 'bg-cardamom-600' : 'bg-crimson-600 hover:bg-crimson-500'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Order!
                    </>
                  ) : (
                    <>
                      <span>🛒 Add Directly to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

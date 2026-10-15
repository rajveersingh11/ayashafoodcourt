import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Clock, Phone, Bike, Flame, Package, Utensils, Share2, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { useLanguage } from '../context/LanguageContext';

export default function LiveOrderTrackerModal({
  isOpen,
  onClose,
  initialOrderId = null,
  initialTotal = null,
}) {
  const { t, isHindi } = useLanguage();
  
  // Tracked order details
  const [orderId, setOrderId] = useState(() => {
    return initialOrderId || `AYAN-${Math.floor(1000 + Math.random() * 9000)}`;
  });
  
  // Stages: 0 = confirmed, 1 = cooking, 2 = packed, 3 = delivery, 4 = delivered
  const [currentStage, setCurrentStage] = useState(1);
  const [secondsRemaining, setSecondsRemaining] = useState(1440); // 24 minutes

  // Countdown timer
  useEffect(() => {
    if (!isOpen || currentStage === 4) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, currentStage]);

  // Stage progression simulator (changes stage every 25 seconds for realistic demo)
  useEffect(() => {
    if (!isOpen) return;
    const stageTimer = setInterval(() => {
      setCurrentStage((prev) => (prev < 3 ? prev + 1 : prev));
    }, 45000);
    return () => clearInterval(stageTimer);
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const stages = [
    {
      id: 0,
      title: isHindi ? 'ऑर्डर प्राप्त व कन्फर्म' : 'Order Confirmed',
      desc: isHindi ? 'रसोई में पर्ची (KOT) तैयार है' : 'Kitchen Order Ticket (KOT) printed',
      icon: CheckCircle2,
      time: 'Just now',
    },
    {
      id: 1,
      title: isHindi ? 'कड़ाही व तवे पर ताज़ा तैयारी' : 'Simmering on Kadai & Tawa',
      desc: isHindi ? 'शुद्ध मसालों व गरमा-गरम रोटियों की सिकाई' : 'Slow cooked dal & fresh butter rotis',
      icon: Flame,
      time: 'In progress',
    },
    {
      id: 2,
      title: isHindi ? 'हाइजीनिक पैक व गर्म फॉयल' : 'Packed Fresh & Sealed',
      desc: isHindi ? 'इको-फ्रेंडली कंटेनर्स में सुरक्षित' : 'Sealed hot with disposable cutlery & mint chutney',
      icon: Package,
      time: '5 mins away',
    },
    {
      id: 3,
      title: isHindi ? 'डिलीवरी राइडर रास्ते में है' : 'Out for Delivery',
      desc: isHindi ? 'सेक्टर ६६, मामूरा और आसपास' : 'Rider on route to your location',
      icon: Bike,
      time: 'Arriving soon',
    },
  ];

  const handleShareTracking = () => {
    const text = `Tracking my live food order #${orderId} from Ayanshi Food Court! Estimated arrival in ${minutes} mins.`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-cream-50 rounded-3xl shadow-2xl border border-cream-400 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-charcoal-900 to-crimson-950 text-cream-100 p-5 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-saffron-500/20 text-saffron-400 flex items-center justify-center text-xl">
              🛵
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-lg text-cream-50">
                  {t('orderTrackerTitle')}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-saffron-500/20 text-saffron-400 text-xs font-mono font-bold">
                  #{orderId}
                </span>
              </div>
              <p className="text-xs text-cream-400/80">
                Ayanshi Food Court · Mamura Sector 66 Noida
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-cream-100/10 text-cream-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Live ETA Card */}
          <div className="bg-gradient-to-br from-cream-100 to-saffron-500/10 border border-saffron-500/30 rounded-2xl p-5 text-center relative overflow-hidden">
            <div className="text-xs font-bold uppercase tracking-wider text-saffron-700 mb-1">
              {t('orderEta')}
            </div>
            <div className="font-mono text-4xl md:text-5xl font-black text-charcoal-900 tracking-tight">
              {formattedTime} <span className="text-base text-muted font-normal">mins</span>
            </div>
            <p className="text-xs text-muted mt-2">
              {currentStage >= 3
                ? (isHindi ? 'राइडर आपके पते की ओर रवाना हो चुका है!' : 'Rider is zooming to your doorstep!')
                : (isHindi ? 'रसोई में आपका ताज़ा भोजन पक रहा है' : 'Chef is preparing your homestyle order fresh')}
            </p>
          </div>

          {/* Animated Road & Delivery Scooter Visual */}
          <div className="bg-charcoal-900 rounded-2xl p-4 text-cream-100 overflow-hidden relative shadow-inner">
            <div className="text-[10px] font-mono text-saffron-400 flex justify-between items-center mb-2">
              <span>📍 KITCHEN (MAMURA)</span>
              <span className="animate-pulse">● LIVE ROUTE TELEMETRY</span>
              <span>🏠 YOUR DOORSTEP</span>
            </div>

            {/* The Road */}
            <div className="relative h-14 bg-charcoal-800 rounded-xl border border-charcoal-700 flex items-center px-4 overflow-hidden">
              {/* Dashed Road Line */}
              <div className="absolute inset-x-0 h-0.5 border-t-2 border-dashed border-charcoal-600 top-1/2 -translate-y-1/2" />

              {/* Scooter Position Based on Stage */}
              <div
                className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-out flex items-center gap-1"
                style={{
                  left: `${Math.min(90, Math.max(8, currentStage * 28))}%`,
                }}
              >
                <div className="text-2xl animate-bounce">🛵</div>
                <div className="hidden sm:inline-block bg-saffron-500 text-charcoal-950 font-black text-[9px] px-1.5 py-0.5 rounded shadow">
                  Sector 66
                </div>
              </div>
            </div>

            {/* Demo Stage Switcher Pill */}
            <div className="mt-3 flex items-center justify-between text-[11px] text-cream-400">
              <span className="text-muted">Simulate stage:</span>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((s) => (
                  <button
                    key={s}
                    onClick={() => setCurrentStage(s)}
                    className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${
                      currentStage === s
                        ? 'bg-crimson-600 text-white shadow'
                        : 'bg-charcoal-800 hover:bg-charcoal-700 text-cream-400'
                    }`}
                  >
                    Stage {s + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4-Step Vertical Timeline */}
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-muted">
              Live Order Milestones
            </div>
            <div className="space-y-3">
              {stages.map((stg) => {
                const Icon = stg.icon;
                const isPassed = currentStage >= stg.id;
                const isCurrent = currentStage === stg.id;

                return (
                  <div
                    key={stg.id}
                    className={`flex items-start gap-3.5 p-3.5 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-white border-crimson-600 shadow-md ring-2 ring-crimson-600/10'
                        : isPassed
                        ? 'bg-cream-100 border-cream-300 text-charcoal-900'
                        : 'bg-cream-50/50 border-cream-200 text-muted opacity-60'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold transition-colors ${
                        isCurrent
                          ? 'bg-crimson-600 text-white animate-pulse'
                          : isPassed
                          ? 'bg-cardamom-600 text-white'
                          : 'bg-cream-200 text-muted'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-charcoal-900 truncate">
                          {stg.title}
                        </h4>
                        <span className="text-[11px] font-mono text-muted">
                          {stg.time}
                        </span>
                      </div>
                      <p className="text-xs text-muted mt-0.5">
                        {stg.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Direct Kitchen & Rider Contacts */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href={`tel:${RESTAURANT_INFO.phone1}`}
              className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-cream-200 hover:bg-cream-300 text-charcoal-900 font-bold text-xs transition-all active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-crimson-600" />
              <span>{t('callKitchen')}</span>
            </a>

            <button
              onClick={handleShareTracking}
              className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-cardamom-600 hover:bg-cardamom-500 text-white font-bold text-xs transition-all active:scale-95 shadow-md"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Tracking</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-cream-200/80 p-4 px-6 border-t border-cream-300 text-center">
          <p className="text-xs text-muted">
            {isHindi
              ? 'गर्म और ताज़ा खाना पहुंचाने के लिए हमारी रसोई निरंतर तत्पर है।'
              : 'Piping hot homestyle meals delivered safely to your door.'}
          </p>
        </div>
      </div>
    </div>
  );
}

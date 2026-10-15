import React, { useRef, useState, useEffect } from 'react';
import { X, Gift, Sparkles, Copy, Check, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RESTAURANT_INFO } from '../data/menuData';
import { useLanguage } from '../context/LanguageContext';

const REWARDS_POOL = [
  {
    title: 'Free Hot Gulab Jamun (2 Pcs)',
    code: 'GULABFREE',
    icon: '🥮',
    desc: 'Valid on your next order of ₹150 or more',
  },
  {
    title: 'Free Chilled Masala Chaas',
    code: 'CHAASFREE',
    icon: '🥤',
    desc: 'Refreshing spiced buttermilk with any Thali order',
  },
  {
    title: 'Flat ₹30 OFF on Dinner Order',
    code: 'AYANSHI30',
    icon: '🏷️',
    desc: 'Valid on evening orders above ₹199',
  },
  {
    title: 'Ayanshi Dabba Stamp (1/5 Unlocked)',
    code: 'DABBASTAR',
    icon: '🌟',
    desc: 'Collect 5 stamps to unlock a 100% Free Royal Thali',
  },
];

export default function ScratchCardModal({ isOpen, onClose }) {
  const { t, isHindi } = useLanguage();
  const canvasRef = useRef(null);
  
  const [isScratched, setIsScratched] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reward, setReward] = useState(() => {
    return REWARDS_POOL[Math.floor(Math.random() * REWARDS_POOL.length)];
  });

  const isDrawing = useRef(false);

  // Initialize canvas scratch layer
  useEffect(() => {
    if (!isOpen) return;
    setIsScratched(false);
    setCopied(false);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Metallic gradient background
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#d4af37'); // Gold
    grad.addColorStop(0.5, '#fef08a'); // Bright gold sheen
    grad.addColorStop(1, '#ca8a04'); // Warm bronze

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Overlay text
    ctx.fillStyle = '#1c1917';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch Here With Finger ✨', width / 2, height / 2 - 8);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#44403c';
    ctx.fillText('Reveal your Rasoi Reward', width / 2, height / 2 + 16);
  }, [isOpen]);

  if (!isOpen) return null;

  const scratch = (clientX, clientY) => {
    if (isScratched) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    checkScratchProgress(ctx, canvas.width, canvas.height);
  };

  const checkScratchProgress = (ctx, width, height) => {
    try {
      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      let transparentCount = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparentCount++;
      }
      const percentage = (transparentCount / (pixels.length / 4)) * 100;
      if (percentage > 35 && !isScratched) {
        setIsScratched(true);
        // Confetti celebration
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
        });
      }
    } catch {
      // fallback
    }
  };

  // Mouse handlers
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };
  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };
  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    isDrawing.current = true;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };
  const handleTouchMove = (e) => {
    if (!isDrawing.current) return;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };
  const handleTouchEnd = () => {
    isDrawing.current = false;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(reward.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaimOnWhatsApp = () => {
    const text = `Hi Ayanshi Food Court! I just won the Rasoi Reward: "${reward.title}" (Code: ${reward.code})! Please apply it to my order.`;
    const url = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-cream-50 rounded-3xl shadow-2xl border border-cream-400 overflow-hidden flex flex-col text-center">
        {/* Header */}
        <div className="bg-gradient-to-r from-saffron-600 to-crimson-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5" />
            <span className="font-serif font-black text-base">
              {t('scratchTitle')}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 flex flex-col items-center">
          <p className="text-xs text-muted max-w-xs">
            {t('scratchSubtitle')}
          </p>

          {/* Scratch Card Container */}
          <div className="relative w-72 h-44 rounded-2xl overflow-hidden shadow-warm-lg border-2 border-saffron-400 bg-white flex items-center justify-center">
            {/* Underlying Reward */}
            <div className="absolute inset-0 p-4 flex flex-col items-center justify-center text-center bg-gradient-to-br from-cream-100 to-saffron-500/10">
              <span className="text-4xl mb-1">{reward.icon}</span>
              <h3 className="font-serif font-black text-charcoal-900 text-base leading-tight">
                {reward.title}
              </h3>
              <p className="text-[11px] text-muted mt-1 leading-snug">
                {reward.desc}
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-saffron-500/20 border border-saffron-500 rounded-full font-mono text-xs font-black text-charcoal-900">
                <span>{reward.code}</span>
              </div>
            </div>

            {/* Overlying Scratch Canvas */}
            <canvas
              ref={canvasRef}
              width={288}
              height={176}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`absolute inset-0 cursor-crosshair transition-opacity duration-700 ${
                isScratched ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            />
          </div>

          {/* Actions */}
          <div className="w-full space-y-2 pt-1">
            <button
              onClick={handleCopyCode}
              className="w-full py-2.5 px-4 rounded-xl bg-cream-200 hover:bg-cream-300 text-charcoal-900 font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-cardamom-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t('couponCopied') : `Copy Code: ${reward.code}`}</span>
            </button>

            <button
              onClick={handleClaimOnWhatsApp}
              className="w-full py-3 px-4 rounded-xl bg-cardamom-600 hover:bg-cardamom-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t('claimReward')}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-cream-100 p-3 text-[11px] text-muted border-t border-cream-300">
          Valid for 7 days from Ayanshi Food Court, Mamura Sector 66 Noida.
        </div>
      </div>
    </div>
  );
}

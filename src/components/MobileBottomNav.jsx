import React from 'react';
import { Phone, Send, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';

export default function MobileBottomNav() {
  const { totalCount, setIsCartOpen, subtotal } = useCart();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-cream-50/95 backdrop-blur-md border-t border-cream-400 p-2.5 px-4 flex items-center gap-2 shadow-2xl safe-area-pb">
      {/* Call Button */}
      <a
        href={`tel:${RESTAURANT_INFO.phone1}`}
        className="flex-1 py-2.5 px-3 rounded-xl bg-cream-200 text-charcoal-900 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
      >
        <Phone className="w-3.5 h-3.5 text-crimson-600" /> Call
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Ayanshi%20Food%20Court%2C%20I%20would%20like%20to%20place%20an%20order.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-2.5 px-3 rounded-xl bg-cardamom-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
      >
        <Send className="w-3.5 h-3.5" /> WhatsApp
      </a>

      {/* Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="flex-1 py-2.5 px-3 rounded-xl bg-crimson-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 relative active:scale-95 transition-transform"
      >
        <ShoppingBag className="w-3.5 h-3.5" />
        <span>Cart</span>
        {totalCount > 0 && (
          <span className="w-4 h-4 rounded-full bg-saffron-500 text-charcoal-900 text-[10px] font-black flex items-center justify-center">
            {totalCount}
          </span>
        )}
      </button>
    </div>
  );
}

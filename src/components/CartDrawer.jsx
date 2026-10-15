import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Send, Phone, Bike, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';
import UpiPaymentModal from './UpiPaymentModal';

export default function CartDrawer() {
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    freeDeliveryThreshold,
    isFreeDelivery,
    remainingForFreeDelivery,
    deliveryFee,
    grandTotal,
    orderType,
    setOrderType,
    customerDetails,
    setCustomerDetails,
    generateWhatsAppLink,
  } = useCart();

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream-50 shadow-2xl flex flex-col justify-between border-l border-cream-400">
          {/* Header */}
          <div className="p-5 border-b border-cream-300 flex items-center justify-between bg-cream-100">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-crimson-600" />
              <h3 className="font-serif text-xl font-bold text-charcoal-900">Your Meal Order</h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-saffron-500/20 text-crimson-700">
                {items.length} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-muted hover:text-charcoal-900 hover:bg-cream-200 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Threshold Banner */}
          <div className="px-5 py-3 bg-cream-200/60 border-b border-cream-300">
            <div className="flex items-center justify-between text-xs font-bold text-charcoal-800 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Bike className="w-4 h-4 text-cardamom-600" />
                {isFreeDelivery
                  ? '🎉 Free Delivery Unlocked (within 2km)!'
                  : `Add ₹${remainingForFreeDelivery} more for FREE delivery`}
              </span>
              <span>₹{subtotal} / ₹{freeDeliveryThreshold}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-cream-300 overflow-hidden">
              <div
                className="h-full bg-cardamom-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Order Type Toggle */}
          <div className="p-4 border-b border-cream-300 bg-cream-50">
            <div className="grid grid-cols-2 gap-2 p-1 bg-cream-200 rounded-xl">
              <button
                onClick={() => setOrderType('delivery')}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                  orderType === 'delivery'
                    ? 'bg-crimson-600 text-white shadow-sm'
                    : 'text-charcoal-800 hover:text-crimson-600'
                }`}
              >
                🛵 Delivery
              </button>
              <button
                onClick={() => setOrderType('pickup')}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                  orderType === 'pickup'
                    ? 'bg-crimson-600 text-white shadow-sm'
                    : 'text-charcoal-800 hover:text-crimson-600'
                }`}
              >
                🥡 Takeaway / Pickup
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-muted">
                <span className="text-4xl mb-3">🍲</span>
                <p className="font-serif text-lg font-bold text-charcoal-800">Your cart is empty</p>
                <p className="text-xs mt-1 max-w-xs">
                  Explore our menu or design your own customized thali in 3D!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-4 py-2 rounded-full bg-crimson-600 text-white text-xs font-bold hover:bg-crimson-500 transition-colors"
                >
                  Start Ordering
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.key}
                  className="bg-white rounded-2xl p-4 border border-cream-300 shadow-sm flex items-start justify-between gap-3"
                >
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-charcoal-900 leading-tight">
                      {item.name}
                    </h4>
                    {item.customConfig?.summary && (
                      <p className="text-[11px] text-muted mt-1 leading-snug">
                        {item.customConfig.summary}
                      </p>
                    )}
                    <span className="text-xs font-black text-cardamom-700 mt-1.5 block">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeItem(item.key)}
                      className="text-muted hover:text-crimson-600 transition-colors p-1"
                      title="Remove dish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2 bg-cream-100 rounded-lg border border-cream-300 p-1">
                      <button
                        onClick={() => updateQuantity(item.key, -1)}
                        className="w-5 h-5 rounded flex items-center justify-center hover:bg-cream-200 text-charcoal-800"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-black w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.key, 1)}
                        className="w-5 h-5 rounded flex items-center justify-center hover:bg-cream-200 text-charcoal-800"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Customer Details Form */}
          {items.length > 0 && (
            <div className="p-4 border-t border-cream-300 bg-cream-100/70 space-y-2.5">
              <div className="text-xs font-bold text-charcoal-800 uppercase tracking-wider">
                Order & Delivery Info
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={customerDetails.name}
                  onChange={(e) =>
                    setCustomerDetails({ ...customerDetails, name: e.target.value })
                  }
                  className="px-3 py-1.5 rounded-lg border border-cream-400 bg-white text-xs focus:outline-none focus:border-crimson-600"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={customerDetails.phone}
                  onChange={(e) =>
                    setCustomerDetails({ ...customerDetails, phone: e.target.value })
                  }
                  className="px-3 py-1.5 rounded-lg border border-cream-400 bg-white text-xs focus:outline-none focus:border-crimson-600"
                />
              </div>

              {orderType === 'delivery' && (
                <input
                  type="text"
                  placeholder="Address (e.g. Flat/Room, Mamura Sector 66)"
                  value={customerDetails.address}
                  onChange={(e) =>
                    setCustomerDetails({ ...customerDetails, address: e.target.value })
                  }
                  className="w-full px-3 py-1.5 rounded-lg border border-cream-400 bg-white text-xs focus:outline-none focus:border-crimson-600"
                />
              )}

              <input
                type="text"
                placeholder="Special notes (e.g. Less spicy, extra salad)"
                value={customerDetails.notes}
                onChange={(e) =>
                  setCustomerDetails({ ...customerDetails, notes: e.target.value })
                }
                className="w-full px-3 py-1.5 rounded-lg border border-cream-400 bg-white text-xs focus:outline-none focus:border-crimson-600"
              />
            </div>
          )}

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-cream-300 bg-white space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-muted">
                  <span>Subtotal</span>
                  <span className="font-bold text-charcoal-800">₹{subtotal}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between text-muted">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-cardamom-700">
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-charcoal-900 pt-2 border-t border-cream-200">
                  <span>Total Due</span>
                  <span className="text-crimson-700 font-serif text-xl">₹{grandTotal}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsUpiModalOpen(true)}
                  className="w-full py-3 px-4 rounded-xl font-bold bg-gradient-to-r from-crimson-600 to-crimson-700 hover:from-crimson-500 hover:to-crimson-600 text-white flex items-center justify-center gap-2 shadow-md transition-all text-sm active:scale-95"
                >
                  <span>💳 Pay via UPI QR / GPay / PhonePe</span>
                </button>

                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl font-bold bg-cardamom-600 hover:bg-cardamom-500 text-white flex items-center justify-center gap-2 shadow-sm transition-all text-xs active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" /> Order via WhatsApp (COD / Pay on Delivery)
                </a>

                <a
                  href={`tel:${RESTAURANT_INFO.phone1}`}
                  className="w-full py-2 px-4 rounded-xl font-bold bg-cream-200 hover:bg-cream-300 text-charcoal-800 flex items-center justify-center gap-2 text-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" /> Call {RESTAURANT_INFO.phone1} to Order
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Instant UPI Payment Modal */}
      <UpiPaymentModal
        isOpen={isUpiModalOpen}
        onClose={() => setIsUpiModalOpen(false)}
        grandTotal={grandTotal}
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        items={items}
        customerDetails={customerDetails}
        orderType={orderType}
      />
    </div>
  );
}

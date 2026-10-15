import React, { useState } from 'react';
import { X, Check, Calendar, Clock, MapPin, Phone, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { useLanguage } from '../context/LanguageContext';

export default function TiffinSubscriptionModal({ isOpen, onClose }) {
  const { t, isHindi } = useLanguage();

  const [durationDays, setDurationDays] = useState(30); // 15 or 30
  const [mealSlot, setMealSlot] = useState('both'); // 'lunch', 'dinner', 'both'
  const [tier, setTier] = useState('standard'); // 'standard' (₹65) or 'executive' (₹110)
  
  // Delivery address details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [startDate, setStartDate] = useState('');

  if (!isOpen) return null;

  const basePricePerMeal = tier === 'standard' ? 65 : 110;
  const mealsPerDay = mealSlot === 'both' ? 2 : 1;
  const totalMeals = durationDays * mealsPerDay;
  const subtotal = totalMeals * basePricePerMeal;

  // Volume discount: 30 days = 10% discount, 15 days = 5% discount
  const discountPercent = durationDays === 30 ? 10 : 5;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const grandTotal = subtotal - discountAmount;
  const effectivePerMeal = Math.round(grandTotal / totalMeals);

  const handleBookOnWhatsApp = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !deliveryAddress) {
      alert('Please fill in your Name, Phone Number, and Delivery Address in Noida.');
      return;
    }

    const tierTitle = tier === 'standard' ? 'Standard Ghar Ki Rasoi Dabba (₹65/meal)' : 'Executive Royal Dabba (₹110/meal)';
    const slotTitle = mealSlot === 'both' ? 'Both Lunch (12:30 PM) & Dinner (8:00 PM)' : mealSlot === 'lunch' ? 'Lunch Only (12:30 PM)' : 'Dinner Only (8:00 PM)';

    const message = `🍱 *NEW MONTHLY TIFFIN SUBSCRIPTION REQUEST* 🍱
---------------------------------------
👤 *Customer Name:* ${customerName}
📞 *Phone:* ${customerPhone}
📍 *Noida Address:* ${deliveryAddress}
🗓️ *Start Date:* ${startDate || 'Immediate / Tomorrow'}

📋 *SUBSCRIPTION DETAILS:*
• *Plan Duration:* ${durationDays} Days (${totalMeals} total meals)
• *Meal Slot:* ${slotTitle}
• *Selected Tier:* ${tierTitle}

💰 *PRICING BREAKDOWN:*
• Gross Amount: ₹${subtotal}
• Monthly Discount (${discountPercent}%): -₹${discountAmount}
• *Final Net Subscription:* ₹${grandTotal} (Only ₹${effectivePerMeal}/meal)

✅ *Included Perks:*
- Pause & Resume anytime on travel/weekends
- 100% Pure Vegetarian & Low-Oil Cooking
- Free Sector 66 / Noida delivery

Please confirm payment instructions and commencement!`;

    const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-cream-50 rounded-3xl shadow-2xl border border-cream-400 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-cardamom-800 to-charcoal-900 text-cream-100 p-5 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-saffron-500/20 text-saffron-400 flex items-center justify-center text-xl">
              🍱
            </div>
            <div>
              <div className="font-serif font-black text-lg text-cream-50">
                {t('tiffinTitle')}
              </div>
              <p className="text-xs text-cream-300">
                {t('tiffinSubtitle')}
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

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Step 1: Duration Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted block mb-2">
              1. Select Subscription Duration
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDurationDays(15)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  durationDays === 15
                    ? 'bg-cream-100 border-crimson-600 shadow-md ring-2 ring-crimson-600/10'
                    : 'bg-white border-cream-300 hover:border-cream-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-charcoal-900">
                    {t('fifteenDays')}
                  </span>
                  <span className="text-[10px] bg-cardamom-600/10 text-cardamom-700 font-bold px-2 py-0.5 rounded">
                    5% OFF
                  </span>
                </div>
                <p className="text-xs text-muted mt-1">Ideal to test taste & quality</p>
              </button>

              <button
                type="button"
                onClick={() => setDurationDays(30)}
                className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                  durationDays === 30
                    ? 'bg-cream-100 border-crimson-600 shadow-md ring-2 ring-crimson-600/10'
                    : 'bg-white border-cream-300 hover:border-cream-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-charcoal-900">
                    {t('thirtyDays')}
                  </span>
                  <span className="text-[10px] bg-crimson-600 text-white font-bold px-2 py-0.5 rounded shadow">
                    ⭐ 10% OFF
                  </span>
                </div>
                <p className="text-xs text-muted mt-1">Best value for office & bachelors</p>
              </button>
            </div>
          </div>

          {/* Step 2: Meal Time Slot */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted block mb-2">
              2. Delivery Time Slot
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'lunch', label: 'Lunch Only', time: '12:30 - 1:30 PM', icon: '☀️' },
                { id: 'dinner', label: 'Dinner Only', time: '8:00 - 9:00 PM', icon: '🌙' },
                { id: 'both', label: 'Lunch + Dinner', time: '2 meals daily', icon: '🍲' },
              ].map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setMealSlot(slot.id)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    mealSlot === slot.id
                      ? 'bg-cream-100 border-crimson-600 font-bold text-charcoal-900 shadow-sm'
                      : 'bg-white border-cream-300 hover:border-cream-400 text-charcoal-800'
                  }`}
                >
                  <div className="text-lg mb-1">{slot.icon}</div>
                  <div className="text-xs font-bold">{slot.label}</div>
                  <div className="text-[10px] text-muted mt-0.5">{slot.time}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Dabba Menu Tier */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted block mb-2">
              3. Choose Dabba Tier
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Standard */}
              <div
                onClick={() => setTier('standard')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  tier === 'standard'
                    ? 'bg-cream-100 border-cardamom-600 shadow-md ring-2 ring-cardamom-600/10'
                    : 'bg-white border-cream-300 hover:border-cream-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-charcoal-900">
                    Standard Ghar Ki Rasoi
                  </span>
                  <span className="font-mono font-bold text-cardamom-700 text-sm">
                    ₹65/meal
                  </span>
                </div>
                <ul className="text-xs text-muted space-y-1">
                  <li>• 4 Tawa Butter Rotis</li>
                  <li>• Yellow Dal Tadka or Seasonal Sabzi</li>
                  <li>• Steamed Jeera Basmati Rice</li>
                  <li>• Fresh Green Salad & Pickle</li>
                </ul>
              </div>

              {/* Executive */}
              <div
                onClick={() => setTier('executive')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  tier === 'executive'
                    ? 'bg-cream-100 border-crimson-600 shadow-md ring-2 ring-crimson-600/10'
                    : 'bg-white border-cream-300 hover:border-cream-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-charcoal-900">
                    Executive Royal Dabba
                  </span>
                  <span className="font-mono font-bold text-crimson-600 text-sm">
                    ₹110/meal
                  </span>
                </div>
                <ul className="text-xs text-muted space-y-1">
                  <li>• Shahi Paneer / Kadhai Paneer</li>
                  <li>• Slow-cooked Dal Makhani</li>
                  <li>• 4 Butter Rotis / Parathas + Rice</li>
                  <li>• Sweet Gulab Jamun + Raita</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pricing Summary Card */}
          <div className="bg-gradient-to-br from-charcoal-900 to-crimson-950 text-cream-100 rounded-2xl p-4 md:p-5 shadow-lg space-y-2">
            <div className="flex justify-between items-center text-xs text-cream-300">
              <span>Total Meals:</span>
              <span className="font-mono font-bold text-cream-100">
                {durationDays} days × {mealsPerDay} = {totalMeals} meals
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-cream-300">
              <span>Gross Rate:</span>
              <span className="font-mono">₹{subtotal}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-saffron-400 font-bold">
              <span>Monthly Volume Discount ({discountPercent}%):</span>
              <span className="font-mono">-₹{discountAmount}</span>
            </div>
            <div className="border-t border-cream-100/20 pt-2 flex justify-between items-baseline">
              <span className="font-serif font-bold text-base text-cream-50">
                Final Subscription Total:
              </span>
              <div className="text-right">
                <span className="font-mono text-2xl font-black text-saffron-400">
                  ₹{grandTotal}
                </span>
                <span className="text-[11px] text-cream-400 block">
                  (Just ₹{effectivePerMeal} per wholesome meal)
                </span>
              </div>
            </div>
          </div>

          {/* Step 4: Customer Details Form */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-muted block">
              4. Delivery Information in Noida
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your Full Name *"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-sm focus:outline-none focus:border-crimson-600"
                required
              />
              <input
                type="tel"
                placeholder="WhatsApp Phone Number *"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-sm focus:outline-none focus:border-crimson-600"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Full Address / Flat No / Society / Sector in Noida *"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-sm focus:outline-none focus:border-crimson-600"
              required
            />
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted whitespace-nowrap">Preferred Start Date:</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-cream-300 bg-white text-xs text-charcoal-800"
              />
            </div>
          </div>

          {/* Assurance Badges */}
          <div className="p-3 bg-cardamom-600/10 border border-cardamom-600/20 rounded-xl text-xs text-cardamom-800 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-cardamom-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Pause & Resume Guarantee:</strong> Going out of town or on vacation? Just drop a WhatsApp text 2 hours prior to pause delivery; unserved meals never expire and roll forward!
            </div>
          </div>

          {/* Book Button */}
          <button
            type="button"
            onClick={handleBookOnWhatsApp}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cardamom-700 to-cardamom-600 hover:from-cardamom-600 hover:to-cardamom-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>{t('bookTiffin')} (₹{grandTotal})</span>
          </button>
        </div>
      </div>
    </div>
  );
}

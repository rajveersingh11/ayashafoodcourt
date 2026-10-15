import React, { useState } from 'react';
import { X, Building2, Users, Send, Check, Sparkles, Printer, ShieldCheck, Tag } from 'lucide-react';
import { CATERING_PACKAGES, RESTAURANT_INFO } from '../data/menuData';

export default function CorporateCateringModal({ isOpen, onClose }) {
  const [guests, setGuests] = useState(35);
  const [selectedTier, setSelectedTier] = useState(CATERING_PACKAGES[1].id); // default Executive

  // Add-ons
  const [addons, setAddons] = useState({
    chaas: false, // +20/person
    sweet: false, // +30/person
    liveChef: false, // +1500 flat (for >= 50 guests)
  });

  // Client info
  const [clientInfo, setClientInfo] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    eventDate: '',
    location: '',
  });

  if (!isOpen) return null;

  const currentPkg = CATERING_PACKAGES.find((p) => p.id === selectedTier) || CATERING_PACKAGES[0];

  // Base per-person price
  let perPerson = currentPkg.pricePerPerson;
  if (addons.chaas) perPerson += 20;
  if (addons.sweet) perPerson += 30;

  // Subtotal before discounts
  const subtotalBeforeDiscount = perPerson * guests + (addons.liveChef && guests >= 50 ? 1500 : 0);

  // Volume discount calculation
  let discountPercent = 0;
  if (guests >= 200) discountPercent = 15;
  else if (guests >= 100) discountPercent = 10;
  else if (guests >= 50) discountPercent = 5;

  const discountAmount = Math.round((subtotalBeforeDiscount * discountPercent) / 100);
  const finalTotal = subtotalBeforeDiscount - discountAmount;
  const effectivePerPerson = Math.round(finalTotal / guests);

  // WhatsApp Quote Formatter
  const handleSendWhatsAppQuote = () => {
    let msg = `*🏢 CORPORATE & PARTY CATERING INQUIRY*\n`;
    msg += `*Ayanshi Food Court — Pure Veg Homestyle Catering*\n\n`;
    if (clientInfo.companyName) msg += `*Company / Event:* ${clientInfo.companyName}\n`;
    if (clientInfo.contactPerson) msg += `*Contact Person:* ${clientInfo.contactPerson}\n`;
    if (clientInfo.phone) msg += `*Phone:* ${clientInfo.phone}\n`;
    if (clientInfo.eventDate) msg += `*Event Date:* ${clientInfo.eventDate}\n`;
    if (clientInfo.location) msg += `*Location:* ${clientInfo.location}\n`;

    msg += `\n*--- CATERING PACKAGE DETAILS ---*\n`;
    msg += `• Package Tier: *${currentPkg.name}* (₹${currentPkg.pricePerPerson}/plate)\n`;
    msg += `• Total Guest Count: *${guests} People*\n`;
    msg += `• Inclusions: ${currentPkg.features.join(', ')}\n`;

    if (addons.chaas || addons.sweet || addons.liveChef) {
      msg += `• Add-ons:\n`;
      if (addons.chaas) msg += `   - Chilled Mint Chaas / Buttermilk (+₹20/plate)\n`;
      if (addons.sweet) msg += `   - Extra Sweet Box / Gulab Jamun (+₹30/plate)\n`;
      if (addons.liveChef && guests >= 50) msg += `   - Live Tandoor Chef Station (+₹1,500)\n`;
    }

    msg += `\n*Estimate Breakdown:*\n`;
    msg += `• Base Cost: ₹${subtotalBeforeDiscount}\n`;
    if (discountPercent > 0) {
      msg += `• Volume Discount (${discountPercent}% OFF): -₹${discountAmount}\n`;
    }
    msg += `*ESTIMATED TOTAL:* *₹${finalTotal}* (approx ₹${effectivePerPerson}/person)\n\n`;
    msg += `_Please share formal menu confirmation and delivery availability. Thank you!_`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-cream-50 rounded-3xl overflow-hidden shadow-2xl border border-cream-300 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-cream-100 via-saffron-300/30 to-cream-200 border-b border-cream-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-crimson-600 text-white flex items-center justify-center shadow-md">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-cardamom-700 block">
                Office Lunches • Celebrations • Bulk Orders
              </span>
              <h3 className="font-serif text-2xl font-bold text-charcoal-900 leading-tight">
                Corporate Catering Quote Calculator
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

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          {/* Guest Count Slider */}
          <div className="p-5 rounded-2xl bg-white border border-cream-300 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-muted uppercase tracking-wider block">
                  Select Guest / Employee Count
                </span>
                <span className="font-serif text-3xl font-black text-charcoal-900">
                  {guests} Guests
                </span>
              </div>
              {discountPercent > 0 && (
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-cardamom-600/15 text-cardamom-700 flex items-center gap-1.5 animate-pulse">
                  <Tag className="w-3.5 h-3.5" /> {discountPercent}% Bulk Discount Applied!
                </span>
              )}
            </div>

            <input
              type="range"
              min="10"
              max="300"
              step="5"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="w-full accent-crimson-600 cursor-pointer"
            />

            <div className="flex gap-2 pt-1">
              {[20, 50, 100, 150, 200].map((count) => (
                <button
                  key={count}
                  onClick={() => setGuests(count)}
                  className={`py-1 px-3 rounded-lg text-xs font-bold transition-all ${
                    guests === count
                      ? 'bg-crimson-600 text-white shadow-sm'
                      : 'bg-cream-200 text-charcoal-800 hover:bg-cream-300'
                  }`}
                >
                  {count} Pax
                </button>
              ))}
            </div>
          </div>

          {/* Package Tier Selection */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-muted uppercase tracking-wider block">
              Choose Catering Tier
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {CATERING_PACKAGES.map((pkg) => {
                const isSelected = selectedTier === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedTier(pkg.id)}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'border-crimson-600 bg-crimson-600/5 ring-2 ring-crimson-600/20 shadow-md'
                        : 'border-cream-300 bg-white hover:border-saffron-500 shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-saffron-500/20 text-crimson-700">
                          {pkg.tag}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-crimson-600" />}
                      </div>
                      <h4 className="font-serif font-bold text-sm text-charcoal-900 mt-1">
                        {pkg.name}
                      </h4>
                      <p className="text-[11px] text-muted mt-1 leading-snug">{pkg.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-cream-200 flex justify-between items-baseline">
                      <span className="text-[10px] text-muted">Per Plate</span>
                      <span className="font-serif text-lg font-black text-cardamom-700">
                        ₹{pkg.pricePerPerson}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Add-ons */}
          <div className="p-4 rounded-2xl bg-white border border-cream-300 shadow-sm space-y-3">
            <span className="text-xs font-bold text-muted uppercase tracking-wider block">
              Custom Add-ons & Beverage Stations
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className="flex items-center gap-2.5 p-2 rounded-xl bg-cream-100 hover:bg-cream-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addons.chaas}
                  onChange={(e) => setAddons({ ...addons, chaas: e.target.checked })}
                  className="rounded accent-crimson-600 w-4 h-4"
                />
                <span className="font-bold text-charcoal-900">Chilled Mint Chaas (+₹20/plate)</span>
              </label>

              <label className="flex items-center gap-2.5 p-2 rounded-xl bg-cream-100 hover:bg-cream-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addons.sweet}
                  onChange={(e) => setAddons({ ...addons, sweet: e.target.checked })}
                  className="rounded accent-crimson-600 w-4 h-4"
                />
                <span className="font-bold text-charcoal-900">
                  Extra Sweet Box (Gulab Jamun) (+₹30/plate)
                </span>
              </label>

              {guests >= 50 && (
                <label className="flex items-center gap-2.5 p-2 rounded-xl bg-cream-100 hover:bg-cream-200 cursor-pointer sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={addons.liveChef}
                    onChange={(e) => setAddons({ ...addons, liveChef: e.target.checked })}
                    className="rounded accent-crimson-600 w-4 h-4"
                  />
                  <span className="font-bold text-charcoal-900">
                    Live On-Site Tandoor Chef Station (+₹1,500 flat event fee)
                  </span>
                </label>
              )}
            </div>
          </div>

          {/* Client Details Form */}
          <div className="p-4 rounded-2xl bg-cream-100/70 border border-cream-300 space-y-2">
            <span className="text-xs font-bold text-muted uppercase tracking-wider block">
              Company / Event Information
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <input
                type="text"
                placeholder="Company / Society Name"
                value={clientInfo.companyName}
                onChange={(e) => setClientInfo({ ...clientInfo, companyName: e.target.value })}
                className="p-2 rounded-lg border border-cream-400 bg-white"
              />
              <input
                type="text"
                placeholder="Contact Person Name"
                value={clientInfo.contactPerson}
                onChange={(e) => setClientInfo({ ...clientInfo, contactPerson: e.target.value })}
                className="p-2 rounded-lg border border-cream-400 bg-white"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={clientInfo.phone}
                onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                className="p-2 rounded-lg border border-cream-400 bg-white"
              />
              <input
                type="date"
                value={clientInfo.eventDate}
                onChange={(e) => setClientInfo({ ...clientInfo, eventDate: e.target.value })}
                className="p-2 rounded-lg border border-cream-400 bg-white"
              />
            </div>
            <input
              type="text"
              placeholder="Delivery Location (e.g. Sector 62 / Sector 63 / Sector 66 Noida)"
              value={clientInfo.location}
              onChange={(e) => setClientInfo({ ...clientInfo, location: e.target.value })}
              className="w-full p-2 rounded-lg border border-cream-400 bg-white text-xs"
            />
          </div>
        </div>

        {/* Modal Footer / Quotation Summary */}
        <div className="p-6 bg-white border-t border-cream-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-muted">Estimated Cost:</span>
              <span className="font-serif text-3xl font-black text-cardamom-700">₹{finalTotal}</span>
              {discountAmount > 0 && (
                <span className="text-xs line-through text-muted">₹{subtotalBeforeDiscount}</span>
              )}
            </div>
            <small className="text-[11px] text-muted">
              (approx <strong>₹{effectivePerPerson}</strong> per person for {guests} guests)
            </small>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleSendWhatsAppQuote}
              className="flex-1 sm:flex-none py-3 px-6 rounded-xl font-bold bg-cardamom-600 hover:bg-cardamom-500 text-white flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 text-xs md:text-sm"
            >
              <Send className="w-4 h-4" /> Request Quote on WhatsApp
            </button>
            <button
              onClick={() => window.print()}
              className="p-3 rounded-xl bg-cream-200 hover:bg-cream-300 text-charcoal-800 transition-colors"
              title="Print Quotation"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

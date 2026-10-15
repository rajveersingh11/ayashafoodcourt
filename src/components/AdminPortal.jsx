import React, { useState, useEffect } from 'react';
import { X, Lock, Unlock, Check, RefreshCw, Printer, AlertTriangle, ShieldCheck, DollarSign, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';
import { MENU_ITEMS, RESTAURANT_INFO, getMenuOverrides, saveMenuOverrides } from '../data/menuData';

export default function AdminPortal({ isOpen, onClose, onOverridesUpdated }) {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState('stock'); // 'stock' | 'prices' | 'kot' | 'pin'

  // Master menu overrides (stock & custom prices)
  const [overrides, setOverrides] = useState({});
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Stored PIN (default 1234)
  const [storedPin, setStoredPin] = useState(() => {
    return localStorage.getItem('ayanshi_admin_pin') || '1234';
  });
  const [newPin, setNewPin] = useState('');

  useEffect(() => {
    if (isOpen) {
      setOverrides(getMenuOverrides());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === storedPin) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Incorrect PIN. Default is 1234');
      setPin('');
    }
  };

  // Toggle dish availability
  const toggleAvailability = (dishId) => {
    const current = overrides[dishId] || {};
    const updated = {
      ...overrides,
      [dishId]: {
        ...current,
        isSoldOut: !current.isSoldOut,
      },
    };
    setOverrides(updated);
    saveMenuOverrides(updated);
    if (onOverridesUpdated) onOverridesUpdated(updated);
  };

  // Update dish price
  const handlePriceChange = (dishId, field, value) => {
    const num = parseFloat(value) || 0;
    const current = overrides[dishId] || {};
    const updated = {
      ...overrides,
      [dishId]: {
        ...current,
        [field]: num,
      },
    };
    setOverrides(updated);
    saveMenuOverrides(updated);
    if (onOverridesUpdated) onOverridesUpdated(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  // Reset all to defaults
  const handleResetDefaults = () => {
    if (window.confirm('Reset all prices and dish availability back to original factory defaults?')) {
      setOverrides({});
      saveMenuOverrides({});
      if (onOverridesUpdated) onOverridesUpdated({});
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  // Change PIN
  const handleChangePin = (e) => {
    e.preventDefault();
    if (newPin.length >= 4) {
      localStorage.setItem('ayanshi_admin_pin', newPin);
      setStoredPin(newPin);
      setNewPin('');
      alert('Admin PIN updated successfully!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-cream-50 rounded-3xl overflow-hidden shadow-2xl border border-cream-300 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-cream-300 flex items-center justify-between bg-charcoal-900 text-cream-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-crimson-600 flex items-center justify-center text-xl shadow-md">
              🔐
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-saffron-400 block">
                Ayanshi Operations
              </span>
              <h3 className="font-serif text-xl font-bold">Kitchen & Owner Admin Portal</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-charcoal-800 text-cream-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Authentication Screen */}
        {!isAuthenticated ? (
          <div className="p-8 md:p-12 text-center max-w-md mx-auto my-auto space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-crimson-600/10 text-crimson-700 flex items-center justify-center mx-auto text-2xl shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-serif text-2xl font-bold text-charcoal-900">Enter Security PIN</h4>
              <p className="text-xs text-muted mt-1">
                Authorized access for restaurant management & kitchen staff.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <input
                type="password"
                maxLength={6}
                autoFocus
                placeholder="••••"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-40 mx-auto text-center tracking-[0.5em] font-mono text-3xl py-3 rounded-2xl border-2 border-cream-400 bg-white focus:outline-none focus:border-crimson-600 text-charcoal-900 shadow-sm"
              />
              {pinError && <p className="text-xs font-bold text-crimson-600">{pinError}</p>}

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-crimson-600 hover:bg-crimson-500 text-white font-bold text-sm shadow-md transition-all active:scale-95"
              >
                Unlock Admin Controls
              </button>
            </form>
            <small className="text-[11px] text-muted block pt-2">
              Default factory PIN: <strong>1234</strong>
            </small>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Navigation Tabs */}
            <div className="flex items-center gap-2 p-3 bg-cream-200 border-b border-cream-300 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('stock')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'stock'
                    ? 'bg-crimson-600 text-white shadow-sm'
                    : 'bg-cream-100 text-charcoal-800 hover:bg-cream-50'
                }`}
              >
                📦 Dish Stock & Availability
              </button>
              <button
                onClick={() => setActiveTab('prices')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'prices'
                    ? 'bg-crimson-600 text-white shadow-sm'
                    : 'bg-cream-100 text-charcoal-800 hover:bg-cream-50'
                }`}
              >
                💰 Price Editor
              </button>
              <button
                onClick={() => setActiveTab('kot')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'kot'
                    ? 'bg-crimson-600 text-white shadow-sm'
                    : 'bg-cream-100 text-charcoal-800 hover:bg-cream-50'
                }`}
              >
                🖨️ Thermal KOT Ticket
              </button>
              <button
                onClick={() => setActiveTab('pin')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'pin'
                    ? 'bg-crimson-600 text-white shadow-sm'
                    : 'bg-cream-100 text-charcoal-800 hover:bg-cream-50'
                }`}
              >
                🔒 Change PIN
              </button>
            </div>

            {/* Tab 1: Stock & Availability */}
            {activeTab === 'stock' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-cream-300">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-charcoal-900">
                      Live Dish Availability
                    </h4>
                    <p className="text-xs text-muted">
                      Turn off dishes that run out during rush hours. They will immediately show "Sold Out Today" to customers.
                    </p>
                  </div>
                  <button
                    onClick={handleResetDefaults}
                    className="flex items-center gap-1.5 text-xs font-bold text-muted hover:text-crimson-600"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Reset All
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {MENU_ITEMS.map((dish) => {
                    const isSoldOut = overrides[dish.id]?.isSoldOut;
                    return (
                      <div
                        key={dish.id}
                        className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                          isSoldOut
                            ? 'bg-crimson-50/50 border-crimson-300'
                            : 'bg-white border-cream-300'
                        }`}
                      >
                        <div>
                          <span className="font-bold text-sm text-charcoal-900 block leading-tight">
                            {dish.name}
                          </span>
                          <small className="text-[11px] text-muted">
                            {dish.category.toUpperCase()} · ₹{overrides[dish.id]?.price || dish.price}
                          </small>
                        </div>

                        <button
                          onClick={() => toggleAvailability(dish.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            isSoldOut
                              ? 'bg-crimson-600 text-white'
                              : 'bg-cardamom-600/10 text-cardamom-700 hover:bg-cardamom-600/20'
                          }`}
                        >
                          {isSoldOut ? 'Sold Out' : '✓ In Stock'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 2: Price Editor */}
            {activeTab === 'prices' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-cream-300">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-charcoal-900">
                      Live Menu Pricing
                    </h4>
                    <p className="text-xs text-muted">
                      Modify dish prices instantly. Updates reflect across the menu and cart calculations immediately.
                    </p>
                  </div>
                  {savedSuccess && (
                    <span className="text-xs font-bold text-cardamom-700 bg-cardamom-600/10 px-3 py-1 rounded-full flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Saved Live!
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  {MENU_ITEMS.map((dish) => {
                    const currentPrice = overrides[dish.id]?.price || dish.price;
                    const halfPrice = overrides[dish.id]?.halfPrice || dish.halfPrice;
                    const fullPrice = overrides[dish.id]?.fullPrice || dish.fullPrice;

                    return (
                      <div
                        key={dish.id}
                        className="p-3.5 rounded-2xl bg-white border border-cream-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
                      >
                        <div className="flex-1">
                          <span className="font-bold text-sm text-charcoal-900">{dish.name}</span>
                          <span className="text-[11px] text-muted ml-2">({dish.category})</span>
                        </div>

                        <div className="flex items-center gap-3">
                          {dish.halfPrice && dish.fullPrice ? (
                            <>
                              <div className="flex items-center gap-1.5">
                                <label className="text-[11px] font-bold text-muted">Half: ₹</label>
                                <input
                                  type="number"
                                  value={halfPrice}
                                  onChange={(e) =>
                                    handlePriceChange(dish.id, 'halfPrice', e.target.value)
                                  }
                                  className="w-16 p-1.5 rounded-lg border border-cream-400 text-xs font-bold text-charcoal-900"
                                />
                              </div>
                              <div className="flex items-center gap-1.5">
                                <label className="text-[11px] font-bold text-muted">Full: ₹</label>
                                <input
                                  type="number"
                                  value={fullPrice}
                                  onChange={(e) =>
                                    handlePriceChange(dish.id, 'fullPrice', e.target.value)
                                  }
                                  className="w-16 p-1.5 rounded-lg border border-cream-400 text-xs font-bold text-charcoal-900"
                                />
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <label className="text-[11px] font-bold text-muted">Price: ₹</label>
                              <input
                                type="number"
                                value={currentPrice}
                                onChange={(e) =>
                                  handlePriceChange(dish.id, 'price', e.target.value)
                                }
                                className="w-20 p-1.5 rounded-lg border border-cream-400 text-xs font-bold text-charcoal-900"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 3: Thermal KOT Ticket Preview & Print */}
            {activeTab === 'kot' && (
              <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center space-y-4">
                <div className="text-center">
                  <h4 className="font-serif text-lg font-bold text-charcoal-900">
                    Kitchen Order Ticket (KOT) Format
                  </h4>
                  <p className="text-xs text-muted">
                    High-contrast thermal format designed for fast food prep in the kitchen.
                  </p>
                </div>

                {/* Printable Receipt Paper */}
                <div
                  id="printable-kot"
                  className="w-72 bg-white border border-gray-400 p-5 font-mono text-xs text-black shadow-md rounded-lg space-y-2.5"
                >
                  <div className="text-center border-b border-dashed border-gray-400 pb-2">
                    <strong className="text-sm block">AYANSHI FOOD COURT</strong>
                    <small className="block">Mamura Sector 66 Noida</small>
                    <span className="text-[10px] font-bold mt-1 block">*** KITCHEN ORDER TICKET (KOT) ***</span>
                  </div>

                  <div className="text-[11px] space-y-0.5">
                    <div>Date: {new Date().toLocaleDateString('en-IN')} {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
                    <div>Type: <strong>DELIVERY (SECTOR 66)</strong></div>
                    <div>Customer: <strong>Rahul Verma</strong> (8271754563)</div>
                    <div>Address: Gali No. 5, Mamura near Shiv Mandir</div>
                  </div>

                  <div className="border-t border-b border-dashed border-gray-400 py-2 space-y-1">
                    <div className="flex justify-between font-bold">
                      <span>ITEM</span>
                      <span>QTY</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1. Special Royal Thali</span>
                      <span>x2</span>
                    </div>
                    <div className="text-[10px] text-gray-600 pl-3">└ Butter Roti + Dal Makhani + Shahi Paneer</div>
                    <div className="flex justify-between">
                      <span>2. Garlic Naan (Crispy)</span>
                      <span>x2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3. Chilled Boondi Raita</span>
                      <span>x1</span>
                    </div>
                  </div>

                  <div className="text-[11px]">
                    <div>Note: <em>"Make rotis extra hot and crisp, less spicy dal"</em></div>
                  </div>

                  <div className="text-center pt-2 border-t border-dashed border-gray-400 text-[10px]">
                    -- PREPARE WITH CARE · PURE VEG --
                  </div>
                </div>

                <button
                  onClick={() => window.print()}
                  className="py-2.5 px-6 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <Printer className="w-4 h-4" /> Print KOT Slip
                </button>
              </div>
            )}

            {/* Tab 4: Change PIN */}
            {activeTab === 'pin' && (
              <div className="p-8 max-w-sm mx-auto my-auto space-y-4 text-center">
                <ShieldCheck className="w-12 h-12 text-cardamom-600 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-charcoal-900">Change Admin PIN</h4>
                <p className="text-xs text-muted">
                  Update the 4-digit security code used to access this management dashboard.
                </p>

                <form onSubmit={handleChangePin} className="space-y-3">
                  <input
                    type="password"
                    maxLength={6}
                    placeholder="New 4-digit PIN"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    className="w-full text-center py-2.5 rounded-xl border border-cream-400 bg-white font-mono text-xl"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-crimson-600 text-white font-bold text-xs hover:bg-crimson-500 transition-colors"
                  >
                    Save New PIN
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

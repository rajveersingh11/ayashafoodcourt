import React, { useState } from 'react';
import { Sparkles, Eye, Plus, Check, Search } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { useCart } from '../context/CartContext';

export default function MenuSection({ onOpen3DModal }) {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [portionSelections, setPortionSelections] = useState({});
  const [addedItems, setAddedItems] = useState({});

  // Filtered dishes
  const filteredDishes = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePortionChange = (dishId, portion) => {
    setPortionSelections((prev) => ({ ...prev, [dishId]: portion }));
  };

  const handleAdd = (dish) => {
    const currentPortion = portionSelections[dish.id] || (dish.halfPrice ? 'half' : 'standard');
    addToCart(dish, currentPortion);

    setAddedItems((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [dish.id]: false }));
    }, 1500);
  };

  return (
    <section id="menu" className="py-20 px-4 md:px-8 bg-cream-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-crimson-600/10 text-crimson-700 text-xs font-bold uppercase tracking-wider mb-3">
            Fresh From Our Kitchen
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-charcoal-900 tracking-tight">
            Our Everyday <span className="text-crimson-600">Menu</span>
          </h2>
          <p className="mt-3 text-muted text-sm md:text-base leading-relaxed">
            Honest home-style cooking with pure vegetarian ingredients. Click on any 3D badge to inspect dishes in 360-degree 3D view.
          </p>
        </div>

        {/* Featured Thalis Banner */}
        <div id="specials" className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Simple Thali */}
          <div className="bg-gradient-to-br from-cream-50 to-cream-200 border border-cream-400 rounded-3xl p-6 md:p-8 shadow-warm flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-saffron-400/20 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-cardamom-600/10 text-cardamom-700 uppercase">
                  Daily Everyday Meal
                </span>
                <span className="font-serif text-3xl font-black text-crimson-700">₹65</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-charcoal-900 mb-2 group-hover:text-crimson-600 transition-colors">
                Simple Thali
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-4">
                4 fresh tawa rotis + comforting yellow dal tadka + seasonal homestyle sabzi + fragrant steamed rice + crunchy salad.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-cream-300">
              <button
                onClick={() => onOpen3DModal(MENU_ITEMS.find((i) => i.id === 'thali-simple'))}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-cream-100 border border-cream-400 text-charcoal-900 font-bold text-xs shadow-sm transition-all"
              >
                <Eye className="w-4 h-4 text-crimson-600" /> View in 3D
              </button>
              <button
                onClick={() => handleAdd(MENU_ITEMS.find((i) => i.id === 'thali-simple'))}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-crimson-600 hover:bg-crimson-700 text-white font-bold text-xs shadow-md transition-all"
              >
                <Plus className="w-4 h-4" /> Add to Order
              </button>
            </div>
          </div>

          {/* Special Thali */}
          <div className="bg-gradient-to-br from-charcoal-900 to-charcoal-800 text-cream-50 border border-saffron-500/30 rounded-3xl p-6 md:p-8 shadow-warm flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-saffron-500/20 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-saffron-500/20 text-saffron-400 uppercase">
                  Royal Chef Special
                </span>
                <span className="font-serif text-3xl font-black text-saffron-400">₹99</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-cream-50 mb-2 group-hover:text-saffron-400 transition-colors">
                Special Royal Thali
              </h3>
              <p className="text-cream-300/80 text-sm leading-relaxed mb-4">
                4 hot butter rotis + slow-cooked dal makhani + seasonal sabzi + rich shahi paneer + mixed veg rice + crisp salad.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-charcoal-700">
              <button
                onClick={() => onOpen3DModal(MENU_ITEMS.find((i) => i.id === 'thali-special'))}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 border border-saffron-500/30 text-cream-100 font-bold text-xs shadow-sm transition-all"
              >
                <Eye className="w-4 h-4 text-saffron-400" /> View in 3D
              </button>
              <button
                onClick={() => handleAdd(MENU_ITEMS.find((i) => i.id === 'thali-special'))}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-saffron-500 hover:bg-saffron-400 text-charcoal-900 font-bold text-xs shadow-md transition-all"
              >
                <Plus className="w-4 h-4" /> Add to Order
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 scrollbar-none">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-crimson-600 text-white shadow-md'
                    : 'bg-cream-200 text-charcoal-800 hover:bg-cream-300'
                }`}
              >
                <span className="mr-1">{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search paneer, dal, roti..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-cream-50 border border-cream-400 text-xs text-charcoal-900 focus:outline-none focus:border-crimson-600 shadow-sm"
            />
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish) => {
            const selectedPortion =
              portionSelections[dish.id] || (dish.halfPrice ? 'half' : 'standard');
            const displayPrice =
              selectedPortion === 'half' && dish.halfPrice
                ? dish.halfPrice
                : selectedPortion === 'full' && dish.fullPrice
                ? dish.fullPrice
                : dish.price;
            const isAdded = addedItems[dish.id];

            return (
              <div
                key={dish.id}
                className="bg-cream-50 rounded-2xl p-5 border border-cream-300 shadow-sm hover:shadow-warm transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-serif text-lg font-bold text-charcoal-900 group-hover:text-crimson-600 transition-colors">
                      {dish.name}
                    </h4>
                    <span className="font-serif text-lg font-extrabold text-cardamom-700 whitespace-nowrap">
                      ₹{displayPrice}
                    </span>
                  </div>

                  <p className="text-muted text-xs leading-relaxed mb-4 line-clamp-2">
                    {dish.description}
                  </p>

                  {/* Portion selector for curries / rice */}
                  {dish.halfPrice && dish.fullPrice && (
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => handlePortionChange(dish.id, 'half')}
                        className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-bold border transition-all ${
                          selectedPortion === 'half'
                            ? 'border-crimson-600 bg-crimson-600/5 text-crimson-700'
                            : 'border-cream-300 text-muted hover:border-cream-400'
                        }`}
                      >
                        Half (₹{dish.halfPrice})
                      </button>
                      <button
                        onClick={() => handlePortionChange(dish.id, 'full')}
                        className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-bold border transition-all ${
                          selectedPortion === 'full'
                            ? 'border-crimson-600 bg-crimson-600/5 text-crimson-700'
                            : 'border-cream-300 text-muted hover:border-cream-400'
                        }`}
                      >
                        Full (₹{dish.fullPrice})
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom Card Controls */}
                <div className="flex items-center gap-2 pt-3 border-t border-cream-300">
                  {dish.has3D && (
                    <button
                      onClick={() => onOpen3DModal(dish)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-saffron-500/15 hover:bg-saffron-500/25 text-crimson-800 text-xs font-bold transition-colors"
                      title="Inspect dish in 3D"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-saffron-600" /> 3D View
                    </button>
                  )}

                  <button
                    onClick={() => handleAdd(dish)}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-bold text-xs shadow-sm transition-all ${
                      isAdded
                        ? 'bg-cardamom-600 text-white'
                        : 'bg-crimson-600 hover:bg-crimson-500 text-white active:scale-95'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Added
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" /> Add
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

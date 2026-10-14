import React from 'react';
import { Leaf, Home, PartyPopper, Bike } from 'lucide-react';

const REASONS = [
  {
    icon: Leaf,
    title: '100% Pure Vegetarian',
    desc: 'Dedicated vegetarian kitchen preparing clean, wholesome North Indian delicacies daily.',
    color: 'text-cardamom-600',
    bg: 'bg-cardamom-600/10',
  },
  {
    icon: Home,
    title: 'Homestyle Taste (Ghar Jaisa)',
    desc: 'Mild spices, pure ingredients, and balanced flavours inspired by everyday home kitchens.',
    color: 'text-crimson-600',
    bg: 'bg-crimson-600/10',
  },
  {
    icon: PartyPopper,
    title: 'Bulk & Party Catering',
    desc: 'Hosting an office lunch or family celebration? Contact us for customized bulk food orders.',
    color: 'text-saffron-600',
    bg: 'bg-saffron-600/10',
  },
  {
    icon: Bike,
    title: 'Fast Nearby Delivery',
    desc: 'Free doorstep delivery within 2 km on minimum orders of ₹350 across Mamura Sector 66 Noida.',
    color: 'text-cardamom-600',
    bg: 'bg-cardamom-600/10',
  },
];

const GALLERY_PHOTOS = [
  {
    url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=85',
    title: 'Traditional Indian Thali',
  },
  {
    url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=85',
    title: 'Shahi Malai Paneer',
  },
  {
    url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=85',
    title: 'Fresh Tawa Roti & Curries',
  },
];

export default function WhyUsSection() {
  return (
    <section id="about" className="py-20 px-4 md:px-8 bg-cream-50 border-t border-cream-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-crimson-600 uppercase tracking-widest text-xs font-bold">
            The Ayanshi Promise
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-charcoal-900 mt-2">
            Simple Food. Made With Care.
          </h2>
          <p className="mt-3 text-muted text-sm md:text-base leading-relaxed">
            Everyday meals should be comforting, satisfying, and easy to order. Here is why locals in Sector 66 trust Ayanshi Food Court every single day.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {REASONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-cream-100/70 rounded-2xl p-6 border border-cream-300 hover:border-saffron-500 shadow-sm hover:shadow-warm transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-muted text-xs md:text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Photography Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GALLERY_PHOTOS.map((img, i) => (
            <div
              key={i}
              className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-warm border border-cream-300 group"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent flex items-end p-5">
                <span className="font-serif font-bold text-cream-50 text-base">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

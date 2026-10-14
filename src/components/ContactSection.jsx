import React from 'react';
import { MapPin, Phone, Bike, Utensils, Send, Navigation } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function ContactSection() {
  return (
    <footer id="contact" className="bg-gradient-to-b from-cream-200 to-cream-300 text-charcoal-900 pt-20 pb-10 px-4 md:px-8 border-t border-cream-400">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-crimson-600 font-bold uppercase tracking-widest text-xs">
              Come Hungry, Leave Happy
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-black text-charcoal-900 leading-tight">
              Let’s get your <br />
              <span className="text-crimson-600">next meal sorted.</span>
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed">
              Call to place an order, ask about today’s specials, or discuss party quantities. Located right in Gali No. 5, Mamura, Sector 66, Noida.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`tel:${RESTAURANT_INFO.phone1}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-crimson-600 hover:bg-crimson-700 text-white font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <Phone className="w-4 h-4" /> Call {RESTAURANT_INFO.phone1}
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Ayanshi%20Food%20Court%2C%20I%20would%20like%20to%20place%20an%20order.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cardamom-600 hover:bg-cardamom-500 text-white font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <Send className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>
          </div>

          {/* Right Contact Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 shadow-warm-lg border border-cream-400 space-y-5">
            <div className="flex items-start gap-4 pb-4 border-b border-cream-300">
              <div className="w-11 h-11 rounded-2xl bg-cream-200 text-crimson-700 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <small className="text-xs uppercase font-bold text-muted tracking-wider block">Visit Us</small>
                <strong className="text-sm font-bold text-charcoal-900">
                  {RESTAURANT_INFO.address}
                </strong>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-4 border-b border-cream-300">
              <div className="w-11 h-11 rounded-2xl bg-cream-200 text-cardamom-700 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <small className="text-xs uppercase font-bold text-muted tracking-wider block">Call For Orders</small>
                <strong className="text-sm font-bold text-charcoal-900 space-x-3">
                  <a href={`tel:${RESTAURANT_INFO.phone1}`} className="hover:text-crimson-600">
                    {RESTAURANT_INFO.phone1}
                  </a>
                  <span>·</span>
                  <a href={`tel:${RESTAURANT_INFO.phone2}`} className="hover:text-crimson-600">
                    {RESTAURANT_INFO.phone2}
                  </a>
                </strong>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-4 border-b border-cream-300">
              <div className="w-11 h-11 rounded-2xl bg-cream-200 text-saffron-600 flex items-center justify-center flex-shrink-0">
                <Bike className="w-5 h-5" />
              </div>
              <div>
                <small className="text-xs uppercase font-bold text-muted tracking-wider block">Fast Local Delivery</small>
                <strong className="text-sm font-bold text-charcoal-900">
                  Free delivery within 2 km on orders of ₹350 or more.
                </strong>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-2">
              <div className="w-11 h-11 rounded-2xl bg-cream-200 text-charcoal-800 flex items-center justify-center flex-shrink-0">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <small className="text-xs uppercase font-bold text-muted tracking-wider block">Service Channels</small>
                <strong className="text-sm font-bold text-charcoal-900">
                  Dine-In · Takeaway · Party Bulk Orders · Swiggy · Zomato
                </strong>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cream-100 hover:bg-cream-200 border border-cream-400 text-charcoal-900 text-xs font-bold transition-all"
              >
                <Navigation className="w-4 h-4 text-crimson-600" /> Get Google Maps Directions ↗
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 border-t border-cream-400/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div className="flex items-center gap-2">
            <span className="font-serif font-black text-charcoal-900 text-sm">Ayanshi Food Court</span>
            <span>— Food like your home</span>
          </div>
          <div>100% Pure Vegetarian · Homestyle Cooking · Mamura Sector 66 Noida</div>
          <div>© {new Date().getFullYear()} Ayanshi Food Court. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ThaliCustomizer from './components/ThaliCustomizer';
import MenuSection from './components/MenuSection';
import WhyUsSection from './components/WhyUsSection';
import ContactSection from './components/ContactSection';
import CartDrawer from './components/CartDrawer';
import DishModal3D from './components/3d/DishModal3D';
import AudioPlayer from './components/AudioPlayer';
import MobileBottomNav from './components/MobileBottomNav';
import { MENU_ITEMS } from './data/menuData';

export default function App() {
  const [active3DModalDish, setActive3DModalDish] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Handle hotspot clicked on the Hero 3D Thali
  const handleHotspotSelect = (dishKey) => {
    let targetDish = null;
    if (dishKey === 'dal-tadka') {
      targetDish = MENU_ITEMS.find((i) => i.id === 'curry-dal-tadka');
    } else if (dishKey === 'shahi-paneer') {
      targetDish = MENU_ITEMS.find((i) => i.id === 'curry-shahi-paneer');
    } else if (dishKey === 'dal-makhani') {
      targetDish = MENU_ITEMS.find((i) => i.id === 'curry-dal-makhani');
    } else if (dishKey === 'jeera-rice') {
      targetDish = MENU_ITEMS.find((i) => i.id === 'rice-jeera');
    } else if (dishKey === 'roti-stack') {
      targetDish = MENU_ITEMS.find((i) => i.id === 'bread-tawa-butter');
    }

    if (targetDish) {
      setActive3DModalDish(targetDish);
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-cream-100 text-charcoal-800 flex flex-col font-sans selection:bg-saffron-500 selection:text-charcoal-900 pb-16 md:pb-0">
        {/* Ambient Sound Synthesizer */}
        <AudioPlayer
          isPlaying={isAudioPlaying}
          onToggle={() => setIsAudioPlaying(!isAudioPlaying)}
        />

        {/* Navigation Bar */}
        <Navbar
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={() => setIsAudioPlaying(!isAudioPlaying)}
        />

        {/* Hero Section with Interactive 3D Centerpiece */}
        <Hero onSelectHotspot={handleHotspotSelect} />

        {/* 3D Thali Customizer Studio */}
        <ThaliCustomizer />

        {/* Full Categorized Menu with 3D Dish Viewers */}
        <MenuSection onOpen3DModal={(dish) => setActive3DModalDish(dish)} />

        {/* Why Choose Us & Food Photography */}
        <WhyUsSection />

        {/* Contact, Location & Google Maps */}
        <ContactSection />

        {/* Slide-over Shopping Cart Drawer */}
        <CartDrawer />

        {/* 360° Interactive Dish Inspector Modal */}
        {active3DModalDish && (
          <DishModal3D
            dish={active3DModalDish}
            onClose={() => setActive3DModalDish(null)}
          />
        )}

        {/* Mobile Floating Bottom Bar */}
        <MobileBottomNav />
      </div>
    </CartProvider>
  );
}

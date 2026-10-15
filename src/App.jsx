import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ThaliCustomizer from './components/ThaliCustomizer';
import MenuSection from './components/MenuSection';
import WhyUsSection from './components/WhyUsSection';
import ContactSection from './components/ContactSection';
import CartDrawer from './components/CartDrawer';
import DishModal3D from './components/3d/DishModal3D';
import ARViewerModal from './components/3d/ARViewerModal';
import SmartMealMatcher from './components/SmartMealMatcher';
import AudioPlayer from './components/AudioPlayer';
import MobileBottomNav from './components/MobileBottomNav';
import AdminPortal from './components/AdminPortal';
import CorporateCateringModal from './components/CorporateCateringModal';
import LiveOrderTrackerModal from './components/LiveOrderTrackerModal';
import TiffinSubscriptionModal from './components/TiffinSubscriptionModal';
import ScratchCardModal from './components/ScratchCardModal';
import { MENU_ITEMS, getMenuOverrides } from './data/menuData';

export default function App() {
  const [active3DModalDish, setActive3DModalDish] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAROpen, setIsAROpen] = useState(false);
  const [isMatcherOpen, setIsMatcherOpen] = useState(false);
  const [customizerConfig, setCustomizerConfig] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCateringOpen, setIsCateringOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isTiffinOpen, setIsTiffinOpen] = useState(false);
  const [isScratchCardOpen, setIsScratchCardOpen] = useState(false);
  const [trackedOrderId, setTrackedOrderId] = useState(null);
  const [menuOverrides, setMenuOverrides] = useState(() => getMenuOverrides());

  // PWA install prompt state
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstallPwa, setCanInstallPwa] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstallPwa(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallPwa = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setCanInstallPwa(false);
    }
    setDeferredPrompt(null);
  };

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

  const handleOrderPlaced = () => {
    const newId = `AYAN-${Math.floor(1000 + Math.random() * 9000)}`;
    setTrackedOrderId(newId);
    setIsScratchCardOpen(true);
  };

  return (
    <LanguageProvider>
      <CartProvider>
        <div className="min-h-screen bg-cream-100 text-charcoal-800 flex flex-col font-sans selection:bg-saffron-500 selection:text-charcoal-900 pb-16 md:pb-0">
          {/* Ambient Sound Synthesizer */}
          <AudioPlayer
            isPlaying={isAudioPlaying}
            onToggle={() => setIsAudioPlaying(!isAudioPlaying)}
          />

          {/* Navigation Bar with AI Matcher, AR, Catering, Tiffin, Tracker and PWA buttons */}
          <Navbar
            isAudioPlaying={isAudioPlaying}
            onToggleAudio={() => setIsAudioPlaying(!isAudioPlaying)}
            onOpenMatcher={() => setIsMatcherOpen(true)}
            onOpenAR={() => setIsAROpen(true)}
            onOpenCatering={() => setIsCateringOpen(true)}
            onOpenTiffin={() => setIsTiffinOpen(true)}
            onOpenTracker={() => setIsTrackerOpen(true)}
            onOpenScratchCard={() => setIsScratchCardOpen(true)}
            onInstallPwa={handleInstallPwa}
            canInstallPwa={canInstallPwa}
          />

          {/* Hero Section with Interactive 3D Centerpiece */}
          <Hero
            onSelectHotspot={handleHotspotSelect}
            onOpenTiffin={() => setIsTiffinOpen(true)}
          />

          {/* 3D Thali Customizer Studio */}
          <ThaliCustomizer
            initialConfig={customizerConfig}
            onOpenAR={() => setIsAROpen(true)}
            onOpenMatcher={() => setIsMatcherOpen(true)}
          />

          {/* Full Categorized Menu with 3D Dish Viewers & Overrides */}
          <MenuSection
            onOpen3DModal={(dish) => setActive3DModalDish(dish)}
            overrides={menuOverrides}
          />

          {/* Why Choose Us & Food Photography */}
          <WhyUsSection />

          {/* Contact, Location & Google Maps */}
          <ContactSection onOpenAdmin={() => setIsAdminOpen(true)} />

          {/* Slide-over Shopping Cart Drawer */}
          <CartDrawer onOrderSuccess={handleOrderPlaced} />

          {/* 360° Interactive Dish Inspector Modal */}
          {active3DModalDish && (
            <DishModal3D
              dish={active3DModalDish}
              onClose={() => setActive3DModalDish(null)}
            />
          )}

          {/* Augmented Reality Table View Modal */}
          <ARViewerModal
            isOpen={isAROpen}
            onClose={() => setIsAROpen(false)}
          />

          {/* Smart AI Meal & Craving Matcher Modal */}
          <SmartMealMatcher
            isOpen={isMatcherOpen}
            onClose={() => setIsMatcherOpen(false)}
            onLoadTo3D={(config) => setCustomizerConfig(config)}
          />

          {/* Kitchen Admin & Stock Management Portal */}
          <AdminPortal
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            onOverridesUpdated={(updated) => setMenuOverrides(updated)}
          />

          {/* Corporate & Bulk Event Catering Calculator */}
          <CorporateCateringModal
            isOpen={isCateringOpen}
            onClose={() => setIsCateringOpen(false)}
          />

          {/* Live Order & Delivery Tracker Modal */}
          <LiveOrderTrackerModal
            isOpen={isTrackerOpen}
            onClose={() => setIsTrackerOpen(false)}
            initialOrderId={trackedOrderId}
          />

          {/* Monthly Tiffin & Dabba Subscription Modal */}
          <TiffinSubscriptionModal
            isOpen={isTiffinOpen}
            onClose={() => setIsTiffinOpen(false)}
          />

          {/* Rasoi Rewards Interactive Scratch Card Modal */}
          <ScratchCardModal
            isOpen={isScratchCardOpen}
            onClose={() => {
              setIsScratchCardOpen(false);
              setIsTrackerOpen(true);
            }}
          />

          {/* Mobile Floating Bottom Bar */}
          <MobileBottomNav />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
}

import React, { useState } from 'react';
import { ShoppingBag, Phone, Menu, X, Volume2, VolumeX, Sparkles, Languages, Gift, Bike } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({
  isAudioPlaying,
  onToggleAudio,
  onOpenMatcher = () => {},
  onOpenAR = () => {},
  onInstallPwa = () => {},
  canInstallPwa = false,
  onOpenCatering = () => {},
  onOpenTiffin = () => {},
  onOpenTracker = () => {},
  onOpenScratchCard = () => {},
}) {
  const { totalCount, setIsCartOpen } = useCart();
  const { t, isHindi, toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Banner Bar */}
      <div className="bg-charcoal-900 text-cream-100 px-4 md:px-8 py-1.5 text-xs flex justify-between items-center border-b border-saffron-500/20">
        <div className="flex items-center gap-2">
          <span className="text-saffron-500 font-extrabold tracking-wide">{t('pureVeg')}</span>
          <span className="hidden sm:inline text-cream-400/80">· {t('tagline')}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-0.5 rounded-full bg-saffron-500/20 text-saffron-400 border border-saffron-500 text-[11px] font-black hover:bg-saffron-500/30 transition-all flex items-center gap-1 cursor-pointer"
            title="Switch Language / भाषा बदलें"
          >
            <Languages className="w-3 h-3 text-saffron-400" />
            <span>{isHindi ? '🇬🇧 English' : '🇮🇳 हिंदी'}</span>
          </button>
          <span className="hidden md:inline text-cream-400">{t('locationBanner')}</span>
          <div className="flex items-center gap-1.5 text-saffron-400 font-bold">
            <Phone className="w-3 h-3 text-saffron-500" />
            <a href={`tel:${RESTAURANT_INFO.phone1}`} className="hover:underline">
              {RESTAURANT_INFO.phone1}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav className="sticky top-0 z-40 bg-cream-100/90 backdrop-blur-md border-b border-cream-400/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-crimson-600 to-crimson-800 text-cream-50 flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform">
              🍲
            </div>
            <div>
              <div className="font-serif text-xl font-extrabold text-charcoal-900 tracking-tight leading-none group-hover:text-crimson-600 transition-colors">
                Ayanshi Food Court
              </div>
              <div className="text-[10px] text-muted tracking-widest uppercase mt-0.5 font-bold">
                {isHindi ? 'घर जैसा शुद्ध भोजन · 3D अनुभव' : 'Food like your home · 3D Experience'}
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-5 text-sm font-bold text-charcoal-800">
            <a href="#home" className="hover:text-crimson-600 transition-colors">
              {t('home')}
            </a>
            <button
              onClick={onOpenMatcher}
              className="flex items-center gap-1.5 text-crimson-700 hover:text-crimson-600 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-saffron-600" /> {t('aiMatcher')}
            </button>
            <a href="#customizer" className="hover:text-crimson-600 transition-colors">
              {t('thaliStudio')}
            </a>
            <button
              onClick={onOpenAR}
              className="flex items-center gap-1.5 text-cardamom-700 hover:text-cardamom-600 transition-colors"
            >
              <span>{t('viewOnTable')}</span>
            </button>
            <button
              onClick={onOpenTiffin}
              className="flex items-center gap-1.5 text-cardamom-800 hover:text-cardamom-700 transition-colors"
            >
              <span>{t('tiffinClub')}</span>
            </button>
            <button
              onClick={onOpenCatering}
              className="flex items-center gap-1.5 text-crimson-800 hover:text-crimson-600 transition-colors"
            >
              <span>{t('bulkCatering')}</span>
            </button>
            <button
              onClick={onOpenTracker}
              className="flex items-center gap-1 text-saffron-700 hover:text-saffron-600 transition-colors"
            >
              <Bike className="w-3.5 h-3.5 text-saffron-600" /> {t('trackOrder')}
            </button>
            <a href="#menu" className="hover:text-crimson-600 transition-colors">
              {t('fullMenu')}
            </a>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Install PWA Button */}
            {canInstallPwa && (
              <button
                onClick={onInstallPwa}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-saffron-500/20 text-charcoal-900 border border-saffron-500 text-xs font-bold hover:bg-saffron-500/30 transition-all"
                title="Install app on your device"
              >
                <span>📲 Install App</span>
              </button>
            )}

            {/* Ambient Sound Toggle */}
            <button
              onClick={onToggleAudio}
              className="p-2.5 rounded-full bg-cream-200 hover:bg-cream-300 text-charcoal-800 transition-colors"
              title={isAudioPlaying ? 'Mute Kitchen Ambience' : 'Play Kitchen Ambience'}
              aria-label="Toggle Sound"
            >
              {isAudioPlaying ? (
                <Volume2 className="w-4 h-4 text-crimson-600 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 text-muted" />
              )}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-crimson-600 hover:bg-crimson-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all transform active:scale-95"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">{t('myOrder')}</span>
              {totalCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-saffron-500 text-charcoal-900 text-xs font-black flex items-center justify-center animate-bounce">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-cream-200 text-charcoal-800"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-cream-50 border-t border-cream-300 px-6 py-4 space-y-3 animate-fade-in shadow-xl">
            {/* Mobile Language Switcher */}
            <div className="flex justify-between items-center py-2 border-b border-cream-200">
              <span className="text-xs font-bold text-muted">Language / भाषा:</span>
              <button
                onClick={toggleLanguage}
                className="px-3 py-1 rounded-full bg-saffron-500/20 text-saffron-600 border border-saffron-500 text-xs font-bold flex items-center gap-1.5"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{isHindi ? 'Switch to English' : 'हिंदी में बदलें'}</span>
              </button>
            </div>

            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold text-charcoal-800 py-2 border-b border-cream-200"
            >
              {t('home')}
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMatcher();
              }}
              className="w-full text-left font-bold text-crimson-700 py-2 border-b border-cream-200 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-saffron-600" /> ✨ {t('aiMatcher')}
            </button>
            <a
              href="#customizer"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold text-charcoal-800 py-2 border-b border-cream-200"
            >
              {t('thaliStudio')}
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAR();
              }}
              className="w-full text-left font-bold text-cardamom-700 py-2 border-b border-cream-200 flex items-center gap-2"
            >
              <span>{t('viewOnTable')}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTiffin();
              }}
              className="w-full text-left font-bold text-cardamom-800 py-2 border-b border-cream-200 flex items-center gap-2"
            >
              <span>{t('tiffinClub')} (Daily Dabba)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCatering();
              }}
              className="w-full text-left font-bold text-crimson-800 py-2 border-b border-cream-200 flex items-center gap-2"
            >
              <span>{t('bulkCatering')}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracker();
              }}
              className="w-full text-left font-bold text-saffron-700 py-2 border-b border-cream-200 flex items-center gap-2"
            >
              <Bike className="w-4 h-4 text-saffron-600" /> {t('trackOrder')}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenScratchCard();
              }}
              className="w-full text-left font-bold text-crimson-600 py-2 border-b border-cream-200 flex items-center gap-2"
            >
              <Gift className="w-4 h-4 text-saffron-600" /> {isHindi ? '🎁 रसोई रिवॉर्ड्स स्क्रैच कार्ड' : '🎁 Rasoi Rewards Scratch Card'}
            </button>
            {canInstallPwa && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onInstallPwa();
                }}
                className="w-full text-left font-bold text-saffron-700 py-2 border-b border-cream-200 flex items-center gap-2"
              >
                <span>{t('installApp')}</span>
              </button>
            )}
            <a
              href="#specials"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold text-charcoal-800 py-2 border-b border-cream-200"
            >
              {t('specials')}
            </a>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold text-charcoal-800 py-2 border-b border-cream-200"
            >
              {t('fullMenu')}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold text-charcoal-800 py-2"
            >
              {t('contactMap')}
            </a>
          </div>
        )}
      </nav>
    </>
  );
}

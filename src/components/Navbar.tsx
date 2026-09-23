import React, { useState } from 'react';
import { Language } from '../types';
import { t } from '../data/translations';
import { Globe, Menu, X, Recycle, ArrowRight } from 'lucide-react';
import { MarketTicker } from './MarketTicker';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenQuoteModal: (presetMaterial?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang, onOpenQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const text = t[lang];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#07130c]/95 backdrop-blur-md border-b border-emerald-900/40 transition-colors">
      {/* Horizontal Market Commodity Trends Ticker */}
      <MarketTicker lang={lang} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single Brand Wordmark */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-900/30 group-hover:scale-105 transition-transform">
            <Recycle className="w-6 h-6 stroke-[2.2]" />
          </div>
          <span className="font-display tracking-wider text-xl font-bold text-white">
            ECO<span className="text-emerald-400">WIDIA</span>
          </span>
        </a>

        {/* Zone 2: 5-6 Clean Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-emerald-100/80">
          <button 
            onClick={() => handleNavClick('materiales')} 
            className="hover:text-emerald-400 transition-colors py-1 cursor-pointer"
          >
            {text.navMaterials}
          </button>
          <button 
            onClick={() => handleNavClick('calculadora')} 
            className="hover:text-emerald-400 transition-colors py-1 cursor-pointer"
          >
            {text.navValuation}
          </button>
          <button 
            onClick={() => handleNavClick('proceso')} 
            className="hover:text-emerald-400 transition-colors py-1 cursor-pointer"
          >
            {text.navProcess}
          </button>
          <button 
            onClick={() => handleNavClick('sostenibilidad')} 
            className="hover:text-emerald-400 transition-colors py-1 cursor-pointer"
          >
            {text.navSustainability}
          </button>
          <button 
            onClick={() => handleNavClick('testimonios')} 
            className="hover:text-emerald-400 transition-colors py-1 cursor-pointer"
          >
            {text.navTestimonials}
          </button>
          <button 
            onClick={() => handleNavClick('faq')} 
            className="hover:text-emerald-400 transition-colors py-1 cursor-pointer"
          >
            {text.navFaq}
          </button>
          <button 
            onClick={() => handleNavClick('contacto')} 
            className="hover:text-emerald-400 transition-colors py-1 cursor-pointer"
          >
            {text.navContact}
          </button>
        </nav>

        {/* Zone 3: Language Toggle & 1 Primary Action */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Switcher with Explicit Visual Indicator */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl border border-emerald-800/80 bg-emerald-950/60 shadow-sm">
            <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />
            <div className="flex items-center text-xs font-semibold">
              <button
                type="button"
                onClick={() => lang !== 'es' && onToggleLang()}
                className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                  lang === 'es'
                    ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm shadow-emerald-400/30'
                    : 'text-emerald-200/70 hover:text-white'
                }`}
                aria-label="Seleccionar Español"
                title="Español (Activo)"
              >
                ES
              </button>
              <span className="text-emerald-700/80 px-1 select-none font-light">|</span>
              <button
                type="button"
                onClick={() => lang !== 'en' && onToggleLang()}
                className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm shadow-emerald-400/30'
                    : 'text-emerald-200/70 hover:text-white'
                }`}
                aria-label="Select English"
                title="English (Active)"
              >
                EN
              </button>
            </div>
          </div>

          {/* Primary CTA */}
          <button
            onClick={() => onOpenQuoteModal()}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-md shadow-emerald-500/20 transition-all hover:shadow-emerald-500/30 cursor-pointer whitespace-nowrap"
          >
            <span>{text.btnQuote}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Mobile Explicit Language Indicator */}
          <div className="flex items-center p-0.5 rounded-lg border border-emerald-800/80 bg-emerald-950/60 text-xs font-semibold">
            <button
              type="button"
              onClick={() => lang !== 'es' && onToggleLang()}
              className={`px-2 py-1 rounded-md text-[11px] ${
                lang === 'es' ? 'bg-emerald-400 text-slate-950 font-bold' : 'text-emerald-300/70'
              }`}
            >
              ES
            </button>
            <span className="text-emerald-700/80 select-none px-0.5">|</span>
            <button
              type="button"
              onClick={() => lang !== 'en' && onToggleLang()}
              className={`px-2 py-1 rounded-md text-[11px] ${
                lang === 'en' ? 'bg-emerald-400 text-slate-950 font-bold' : 'text-emerald-300/70'
              }`}
            >
              EN
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900/50"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-emerald-900/60 bg-[#07130c]/98 px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3 text-base font-medium text-emerald-100">
            <button 
              onClick={() => handleNavClick('materiales')} 
              className="text-left py-2 hover:text-emerald-400 border-b border-emerald-900/30"
            >
              {text.navMaterials}
            </button>
            <button 
              onClick={() => handleNavClick('calculadora')} 
              className="text-left py-2 hover:text-emerald-400 border-b border-emerald-900/30"
            >
              {text.navValuation}
            </button>
            <button 
              onClick={() => handleNavClick('proceso')} 
              className="text-left py-2 hover:text-emerald-400 border-b border-emerald-900/30"
            >
              {text.navProcess}
            </button>
            <button 
              onClick={() => handleNavClick('sostenibilidad')} 
              className="text-left py-2 hover:text-emerald-400 border-b border-emerald-900/30"
            >
              {text.navSustainability}
            </button>
            <button 
              onClick={() => handleNavClick('testimonios')} 
              className="text-left py-2 hover:text-emerald-400 border-b border-emerald-900/30"
            >
              {text.navTestimonials}
            </button>
            <button 
              onClick={() => handleNavClick('faq')} 
              className="text-left py-2 hover:text-emerald-400 border-b border-emerald-900/30"
            >
              {text.navFaq}
            </button>
            <button 
              onClick={() => handleNavClick('contacto')} 
              className="text-left py-2 hover:text-emerald-400"
            >
              {text.navContact}
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-md"
            >
              <span>{text.btnQuote}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

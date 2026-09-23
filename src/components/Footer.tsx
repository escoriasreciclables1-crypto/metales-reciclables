import React from 'react';
import { Language } from '../types';
import { t } from '../data/translations';
import { Recycle, ArrowUp } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onToggleLang, onOpenQuoteModal }) => {
  const text = t[lang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050e08] border-t border-emerald-950 text-slate-300 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Mission (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center text-slate-950">
                <Recycle className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-display tracking-wider text-xl font-bold text-white">
                ECO<span className="text-emerald-400">WIDIA</span>
              </span>
            </div>

            <p className="text-emerald-100/70 leading-relaxed text-xs">
              {text.footerDesc}
            </p>
          </div>

          {/* Quick Links (Col 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {text.footerQuickLinks}
            </h4>
            <ul className="space-y-2 text-emerald-100/70">
              <li>
                <button onClick={() => handleNavClick('materiales')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  {text.navMaterials}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('calculadora')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  {text.navValuation}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('proceso')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  {text.navProcess}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('sostenibilidad')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  {text.navSustainability}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('testimonios')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  {text.navTestimonials}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('faq')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  {text.navFaq}
                </button>
              </li>
            </ul>
          </div>

          {/* Metals Range (Col 7-9) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {text.footerMaterials}
            </h4>
            <ul className="space-y-2 text-emerald-100/70">
              <li>Carburo de Tungsteno (Widia / WC-Co)</li>
              <li>Superaleaciones Níquel (Inconel, Monel)</li>
              <li>Cobalto y Estelita (Co-Cr)</li>
              <li>Molibdeno Puro y Aleaciones TZM</li>
              <li>Titanio Aeroespacial (Ti-6Al-4V)</li>
              <li>Escorias, Cascarilla y Lodos de Afilado</li>
              <li>Catalizadores Agotados (Petroquímica)</li>
            </ul>
          </div>

          {/* Direct Communication (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {text.footerContactTitle}
            </h4>
            
            <div className="space-y-2 text-emerald-100/80">
              <div>
                <span className="text-emerald-400/80 block">{text.footerEmailLabel}</span>
                <a 
                  href="mailto:escorias.reciclables1@gmail.com" 
                  className="font-mono text-emerald-300 hover:underline break-all"
                >
                  escorias.reciclables1@gmail.com
                </a>
              </div>

              <div>
                <span className="text-emerald-400/80 block">WhatsApp B2B:</span>
                <a 
                  href="https://wa.me/528127020123" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-mono text-white hover:text-red-400 transition-colors"
                >
                  +52 81 2702 0123
                </a>
              </div>

              <div className="text-[11px] text-emerald-300/60 pt-1">
                {text.footerHours}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
                >
                  {text.btnQuote}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-emerald-300/60">
          <div>
            © {new Date().getFullYear()} ECOWIDIA. {text.footerRights}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onToggleLang} 
              className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
            >
              Idioma: {lang === 'es' ? 'Español (Cambiar a EN)' : 'English (Switch to ES)'}
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Subir</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

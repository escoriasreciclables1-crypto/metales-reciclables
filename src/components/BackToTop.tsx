import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Language } from '../types';
import { t } from '../data/translations';

interface BackToTopProps {
  lang: Language;
}

export const BackToTop: React.FC<BackToTopProps> = ({ lang }) => {
  const [isVisible, setIsVisible] = useState(false);
  const text = t[lang];

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={text.backToTop}
      title={text.backToTop}
      className={`fixed z-40 flex items-center justify-center gap-1.5 h-12 min-w-[48px] px-3.5 rounded-full bg-[#0a1c13]/95 hover:bg-emerald-900 border border-emerald-600/70 hover:border-emerald-400 text-emerald-400 hover:text-white shadow-xl shadow-black/60 backdrop-blur-md cursor-pointer transition-all duration-300 ease-out group ${
        // Position: on mobile at bottom-6 left-6 (great thumb ergonomics); on desktop at bottom-20 right-6 stacked above WhatsApp
        'bottom-6 left-6 sm:bottom-20 sm:right-6 sm:left-auto'
      } ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-5 scale-90 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5] group-hover:-translate-y-0.5 transition-transform duration-200" />
      <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider font-mono">
        {text.backToTop}
      </span>
    </button>
  );
};

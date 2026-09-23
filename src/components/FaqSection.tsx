import React, { useState } from 'react';
import { Language } from '../types';
import { t } from '../data/translations';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqSectionProps {
  lang: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const text = t[lang];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#07130c] border-b border-emerald-950/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-2">
            {text.faqKicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display" style={{ textWrap: 'balance' }}>
            {text.faqTitle}
          </h2>
          <p className="text-emerald-100/70 text-base mt-3 leading-relaxed">
            {text.faqSubtitle}
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3.5">
          {text.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-emerald-900/60 bg-[#0a1c13] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-emerald-950/40 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-emerald-100/80 leading-relaxed border-t border-emerald-900/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

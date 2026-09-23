import React from 'react';
import { Language } from '../types';
import { t } from '../data/translations';
import { Building2, MapPin, CheckCircle2, Quote, ArrowRight } from 'lucide-react';

interface TestimonialsSectionProps {
  lang: Language;
  onSelectMaterialForQuote: (materialName: string) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  lang,
  onSelectMaterialForQuote
}) => {
  const text = t[lang];

  return (
    <section id="testimonios" className="py-24 bg-[#08170f] border-b border-emerald-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-2">
            {text.testKicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display" style={{ textWrap: 'balance' }}>
            {text.testTitle}
          </h2>
          <p className="text-emerald-100/70 text-base mt-3 leading-relaxed">
            {text.testSubtitle}
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {text.testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-[#0a1c13] border border-emerald-900/60 flex flex-col justify-between hover:border-emerald-600/50 transition-all duration-300 shadow-xl relative group"
            >
              <div className="space-y-5">
                
                {/* Header: Company & Verified Icon */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                    <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold">{item.company}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-300/80 font-mono shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{lang === 'es' ? 'Verificado' : 'Verified'}</span>
                  </div>
                </div>

                {/* Material Processed Tag */}
                <div className="text-xs text-emerald-300/90 font-mono py-1 px-2.5 rounded bg-emerald-950/80 border border-emerald-900/60 inline-block">
                  {item.material}
                </div>

                {/* Quote Text */}
                <div className="relative">
                  <Quote className="w-6 h-6 text-emerald-700/40 absolute -top-2 -left-1 pointer-events-none" />
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pl-4">
                    "{item.quote}"
                  </p>
                </div>

              </div>

              {/* Card Footer: Author + Proven Metric */}
              <div className="pt-6 mt-6 border-t border-emerald-900/50 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-sm font-bold text-white">
                      {item.name}
                    </div>
                    <div className="text-xs text-emerald-200/70">
                      {item.role}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-emerald-400 tabular-nums font-mono">
                      {item.metric}
                    </div>
                    <div className="text-[10px] text-emerald-300/60">
                      {item.metricLabel}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-emerald-400/80 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-500" />
                    <span>{item.location}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => onSelectMaterialForQuote(item.material)}
                    className="hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <span>{lang === 'es' ? 'Cotizar lote similar' : 'Quote similar batch'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Trust strip below testimonials */}
        <div className="p-6 rounded-2xl bg-[#07130c] border border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-white">
              {lang === 'es'
                ? 'Compromiso de Pago y Liquidación Rápida'
                : 'Commitment to Prompt Settlement & Assay Transparency'}
            </span>
            <span className="hidden md:inline text-emerald-400/60">—</span>
            <span className="hidden md:inline">
              {lang === 'es'
                ? 'Análisis inmediato por fluorescencia de rayos X (XRF) y cotizaciones vinculadas a mercados oficiales LMB / Fastmarkets.'
                : 'Instant X-Ray Fluorescence (XRF) spectrometry with prices indexed to official LMB / Fastmarkets pricing.'}
            </span>
          </div>

          <div className="text-emerald-400 font-mono whitespace-nowrap text-xs font-semibold">
            {lang === 'es' ? 'Pago en 24-48 Horas' : 'Settlement in 24-48 Hours'}
          </div>
        </div>

      </div>
    </section>
  );
};

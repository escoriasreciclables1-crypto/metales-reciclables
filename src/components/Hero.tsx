import React from 'react';
import { Language } from '../types';
import { t } from '../data/translations';
import { ArrowRight, ShieldCheck, Sparkles, Scale, Award } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onOpenQuoteModal: () => void;
  onScrollToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenQuoteModal, onScrollToCalculator }) => {
  const text = t[lang];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#07130c] via-[#091b12] to-[#0b1510] pt-12 pb-20 border-b border-emerald-950/60">
      {/* Background subtle radial ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[350px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Unboxed editorial kicker / metadata */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-emerald-400 tracking-wide mb-6">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{text.heroBadge}</span>
        </div>

        {/* Main Headline & Value Proposition Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <h1 
              className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] font-display"
              style={{ textWrap: 'balance' }}
            >
              {text.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/80 max-w-2xl leading-relaxed">
              {text.heroSubtitle}
            </p>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenQuoteModal}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/30 cursor-pointer"
              >
                <span>{text.heroCtaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToCalculator}
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-emerald-200 hover:text-white bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 rounded-xl transition-all cursor-pointer"
              >
                <Scale className="w-4 h-4 text-emerald-400" />
                <span>{text.heroCtaSecondary}</span>
              </button>
            </div>

            {/* Trust markers */}
            <div className="pt-6 border-t border-emerald-900/40 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white tabular-nums font-display">
                  {text.heroStat1Number}
                </div>
                <div className="text-xs text-emerald-300/70 mt-0.5">
                  {text.heroStat1Label}
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-400 tabular-nums font-display">
                  {text.heroStat2Number}
                </div>
                <div className="text-xs text-emerald-300/70 mt-0.5">
                  {text.heroStat2Label}
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold text-white tabular-nums font-display">
                  {text.heroStat3Number}
                </div>
                <div className="text-xs text-emerald-300/70 mt-0.5">
                  {text.heroStat3Label}
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-400 tabular-nums font-display">
                  {text.heroStat4Number}
                </div>
                <div className="text-xs text-emerald-300/70 mt-0.5">
                  {text.heroStat4Label}
                </div>
              </div>
            </div>

          </div>

          {/* Marquee Visual Hero Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-emerald-800/50 bg-emerald-950/30 shadow-2xl shadow-emerald-950/80 group">
              <div className="aspect-[16/11] relative overflow-hidden">
                <img
                  src="/src/assets/images/hero_ecowidia_recycling_1790139499365.jpg"
                  alt="Ecowidia industrial refractory and tungsten carbide recycling facility"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                {/* Measured Contrast Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07130c] via-black/30 to-transparent" />
              </div>

              {/* Bottom overlay highlight */}
              <div className="p-5 border-t border-emerald-900/60 bg-[#07130c]/90 backdrop-blur-sm space-y-2">
                <div className="flex items-center justify-between text-xs text-emerald-400">
                  <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    {lang === 'es' ? 'Planta y Laboratorio Homologado' : 'Certified Processing & Laboratory'}
                  </span>
                  <span className="text-emerald-300/80 font-mono">XRF / ICP Assay</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'es'
                    ? 'Clasificación espectrométrica inmediata de carburo de tungsteno, molibdeno, níquel y titanio con pesaje calibrado y pago transparente.'
                    : 'Instant spectrometric assay of tungsten carbide, molybdenum, nickel, and titanium with certified weighing and transparent settlement.'}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Trust Strip */}
      <div className="mt-14 border-t border-emerald-950/80 bg-emerald-950/30 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-emerald-300/80">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{text.trustText}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-emerald-200/70">
            <span>{text.certIso}</span>
            <span aria-hidden="true">·</span>
            <span>{text.certTrace}</span>
            <span aria-hidden="true">·</span>
            <span>{text.certGreen}</span>
            <span aria-hidden="true">·</span>
            <span>{text.certFast}</span>
          </div>
        </div>
      </div>

    </section>
  );
};

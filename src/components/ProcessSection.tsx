import React from 'react';
import { Language } from '../types';
import { t } from '../data/translations';
import { ScanLine, Wrench, Flame, RefreshCw, CheckCircle2 } from 'lucide-react';

interface ProcessSectionProps {
  lang: Language;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ lang }) => {
  const text = t[lang];

  const steps = [
    {
      num: text.step1Num,
      title: text.step1Title,
      desc: text.step1Desc,
      icon: ScanLine
    },
    {
      num: text.step2Num,
      title: text.step2Title,
      desc: text.step2Desc,
      icon: Wrench
    },
    {
      num: text.step3Num,
      title: text.step3Title,
      desc: text.step3Desc,
      icon: Flame
    },
    {
      num: text.step4Num,
      title: text.step4Title,
      desc: text.step4Desc,
      icon: RefreshCw
    }
  ];

  return (
    <section id="proceso" className="py-24 bg-[#07130c] border-b border-emerald-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-2">
            {text.processKicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display" style={{ textWrap: 'balance' }}>
            {text.processTitle}
          </h2>
          <p className="text-emerald-100/70 text-base mt-3 leading-relaxed">
            {text.processSubtitle}
          </p>
        </div>

        {/* 4-Step Narrative Flow with Lab Photo Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          <div className="lg:col-span-6 space-y-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0a1c13] border border-emerald-900/50 hover:border-emerald-600/50 transition-all flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-800/80 flex items-center justify-center shrink-0 text-emerald-400 font-display font-bold text-lg">
                    {step.num}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>{step.title}</span>
                    </h3>
                    <p className="text-xs text-emerald-100/70 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Marquee Photo Spotlight */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-emerald-800/60 bg-emerald-950/40 shadow-2xl">
              <div className="aspect-[4/3] w-full">
                <img
                  src="/src/assets/images/facility_metallurgical_lab_1790139533825.jpg"
                  alt="Ecowidia certified metallurgical spectrometry and testing laboratory"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07130c] via-black/30 to-transparent" />
              </div>

              <div className="p-6 border-t border-emerald-900/80 bg-[#07130c]/95 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>
                    {lang === 'es' ? 'Control de Calidad y Espectrometría XRF / ICP' : 'Quality Assurance & XRF / ICP Spectrometry'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'es'
                    ? 'Nuestros ingenieros metalúrgicos validan cada partida de herramientas de carburo de tungsteno, piezas de Inconel y escorias en laboratorios acreditados, garantizando cotizaciones justas y máxima tasa de recuperación.'
                    : 'Our metallurgical engineers validate every batch of tungsten carbide tooling, Inconel alloys, and slag matrices in accredited laboratories, guaranteeing transparent valuations and industry-leading recovery rates.'}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

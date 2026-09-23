import React from 'react';
import { Language } from '../types';
import { t } from '../data/translations';
import { Globe, Droplets, Zap, Shield, Recycle } from 'lucide-react';

interface SustainabilitySectionProps {
  lang: Language;
}

export const SustainabilitySection: React.FC<SustainabilitySectionProps> = ({ lang }) => {
  const text = t[lang];

  return (
    <section id="sostenibilidad" className="py-24 bg-[#091b12] border-b border-emerald-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-2">
            {text.sustKicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display" style={{ textWrap: 'balance' }}>
            {text.sustTitle}
          </h2>
          <p className="text-emerald-100/70 text-base mt-3 leading-relaxed">
            {text.sustSubtitle}
          </p>
        </div>

        {/* 3 Pillar Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div className="p-8 rounded-2xl bg-[#07130c] border border-emerald-900/60 flex flex-col justify-between hover:border-emerald-500/50 transition-colors shadow-lg">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800 flex items-center justify-center text-emerald-400">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                {text.sustCard1Title}
              </h3>
              <p className="text-xs text-emerald-100/70 leading-relaxed">
                {text.sustCard1Desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-emerald-900/40 text-xs text-emerald-400 font-mono">
              {lang === 'es' ? 'Suministro Estratégico Seguro' : 'Strategic Supply Security'}
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#07130c] border border-emerald-900/60 flex flex-col justify-between hover:border-emerald-500/50 transition-colors shadow-lg">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800 flex items-center justify-center text-emerald-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                {text.sustCard2Title}
              </h3>
              <p className="text-xs text-emerald-100/70 leading-relaxed">
                {text.sustCard2Desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-emerald-900/40 text-xs text-emerald-400 font-mono">
              {lang === 'es' ? '-70% Huella Energética' : '-70% Energy Footprint'}
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#07130c] border border-emerald-900/60 flex flex-col justify-between hover:border-emerald-500/50 transition-colors shadow-lg">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800 flex items-center justify-center text-emerald-400">
                <Recycle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                {text.sustCard3Title}
              </h3>
              <p className="text-xs text-emerald-100/70 leading-relaxed">
                {text.sustCard3Desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-emerald-900/40 text-xs text-emerald-400 font-mono">
              {lang === 'es' ? 'Objetivo Residuo Cero (Zero Landfill)' : 'Zero Waste to Landfill Goal'}
            </div>
          </div>

        </div>

        {/* Environmental Comparative Benchmark Table */}
        <div className="bg-[#07130c] rounded-2xl border border-emerald-900/60 p-6 sm:p-8 overflow-x-auto">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>
              {lang === 'es'
                ? 'Comparativa Ecológica: Reciclaje Secundario Ecowidia vs. Minería Primaria'
                : 'Ecological Comparison: Ecowidia Secondary Recycling vs. Virgin Mining'}
            </span>
          </h3>

          <table className="w-full text-left text-xs text-slate-200">
            <thead>
              <tr className="border-b border-emerald-900/70 text-emerald-400 uppercase tracking-wider font-semibold">
                <th className="pb-3 pr-4">{lang === 'es' ? 'Material Metálico' : 'Metallic Material'}</th>
                <th className="pb-3 px-4">{lang === 'es' ? 'Ahorro CO₂/kg' : 'CO₂ Savings / kg'}</th>
                <th className="pb-3 px-4">{lang === 'es' ? 'Ahorro Agua / kg' : 'Water Saved / kg'}</th>
                <th className="pb-3 px-4">{lang === 'es' ? 'Roca Mineral No Excavada' : 'Ore Rock Preserved'}</th>
                <th className="pb-3 pl-4">{lang === 'es' ? 'Tiempo de Refino' : 'Refining Cycle'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-950/80 font-mono tabular-nums">
              <tr>
                <td className="py-3 pr-4 font-sans font-medium text-white">Carburo de Tungsteno (Widia)</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">-18.5 kg CO₂e</td>
                <td className="py-3 px-4">~450 Litros</td>
                <td className="py-3 px-4">~2,200 kg roca</td>
                <td className="py-3 pl-4 text-emerald-300">48-72 Horas</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-sans font-medium text-white">Superaleaciones de Cobalto (Stellite)</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">-22.8 kg CO₂e</td>
                <td className="py-3 px-4">~620 Litros</td>
                <td className="py-3 px-4">~3,100 kg roca</td>
                <td className="py-3 pl-4 text-emerald-300">72 Horas</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-sans font-medium text-white">Inconel y Superaleaciones Níquel</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">-14.2 kg CO₂e</td>
                <td className="py-3 px-4">~380 Litros</td>
                <td className="py-3 px-4">~1,800 kg roca</td>
                <td className="py-3 pl-4 text-emerald-300">48 Horas</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-sans font-medium text-white">Titanio Aeroespacial (Ti-6Al-4V)</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">-28.0 kg CO₂e</td>
                <td className="py-3 px-4">~850 Litros</td>
                <td className="py-3 px-4">~4,500 kg roca</td>
                <td className="py-3 pl-4 text-emerald-300">96 Horas</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};

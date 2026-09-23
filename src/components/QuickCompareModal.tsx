import React, { useState, useEffect } from 'react';
import { Language, MaterialItem } from '../types';
import { t } from '../data/translations';
import { materialsList } from '../data/materialsData';
import { 
  X, 
  ArrowLeftRight, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  Factory, 
  Recycle, 
  Leaf, 
  ShieldCheck, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';

interface QuickCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialMaterial1Id?: string;
  initialMaterial2Id?: string;
  onSelectForQuote: (materialName: string) => void;
}

export const QuickCompareModal: React.FC<QuickCompareModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialMaterial1Id,
  initialMaterial2Id,
  onSelectForQuote
}) => {
  const text = t[lang];

  // Default selections: Tungsten Carbide vs Nickel Superalloys if none provided
  const [material1Id, setMaterial1Id] = useState<string>(
    initialMaterial1Id || materialsList[0]?.id || ''
  );
  const [material2Id, setMaterial2Id] = useState<string>(
    initialMaterial2Id || materialsList[1]?.id || ''
  );

  useEffect(() => {
    if (initialMaterial1Id) setMaterial1Id(initialMaterial1Id);
    if (initialMaterial2Id) setMaterial2Id(initialMaterial2Id);
  }, [initialMaterial1Id, initialMaterial2Id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mat1 = materialsList.find((m) => m.id === material1Id) || materialsList[0];
  const mat2 = materialsList.find((m) => m.id === material2Id) || materialsList[1];

  const handleSwap = () => {
    const temp = material1Id;
    setMaterial1Id(material2Id);
    setMaterial2Id(temp);
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Strategic':
        return 'bg-purple-950/80 text-purple-300 border-purple-800/80';
      case 'Very High':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-700/80';
      default:
        return 'bg-blue-950/80 text-blue-300 border-blue-700/80';
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <div 
        className="relative w-full max-w-5xl bg-[#07130c] border border-emerald-600/50 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="shrink-0 p-5 sm:p-6 border-b border-emerald-900/60 bg-gradient-to-r from-[#07180e] via-[#092215] to-[#07180e] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-widest font-mono">
                {text.compareKicker}
              </div>
              <h2 id="compare-modal-title" className="text-xl sm:text-2xl font-bold text-white font-display">
                {text.compareTitle}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label={text.compareClose}
            className="p-2 rounded-xl text-emerald-300/70 hover:text-white hover:bg-emerald-900/50 border border-transparent hover:border-emerald-800 transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Subtitle & Selectors Bar */}
        <div className="p-4 sm:p-6 bg-[#051109] border-b border-emerald-950/80">
          <p className="text-xs sm:text-sm text-emerald-100/70 mb-4 text-center sm:text-left">
            {text.compareSubtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-11 gap-3 items-center">
            {/* Selector Material 1 */}
            <div className="sm:col-span-5 relative">
              <label htmlFor="select-mat-1" className="block text-[11px] font-semibold uppercase text-emerald-400 mb-1">
                {text.compareMaterial1}
              </label>
              <div className="relative">
                <select
                  id="select-mat-1"
                  value={material1Id}
                  onChange={(e) => setMaterial1Id(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl bg-[#0a1c13] border border-emerald-800/80 text-white font-medium text-xs sm:text-sm focus:border-emerald-400 focus:outline-none transition-colors cursor-pointer"
                >
                  {materialsList.map((m) => (
                    <option key={`m1-${m.id}`} value={m.id} disabled={m.id === material2Id}>
                      {lang === 'es' ? m.nameEs : m.nameEn} ({m.formula})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-emerald-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Swap Button */}
            <div className="sm:col-span-1 flex justify-center pt-2 sm:pt-4">
              <button
                type="button"
                onClick={handleSwap}
                title="Intercambiar materiales"
                className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800/70 hover:border-emerald-400 text-emerald-300 hover:text-white transition-all cursor-pointer shadow-md"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* Selector Material 2 */}
            <div className="sm:col-span-5 relative">
              <label htmlFor="select-mat-2" className="block text-[11px] font-semibold uppercase text-emerald-400 mb-1">
                {text.compareMaterial2}
              </label>
              <div className="relative">
                <select
                  id="select-mat-2"
                  value={material2Id}
                  onChange={(e) => setMaterial2Id(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl bg-[#0a1c13] border border-emerald-800/80 text-white font-medium text-xs sm:text-sm focus:border-emerald-400 focus:outline-none transition-colors cursor-pointer"
                >
                  {materialsList.map((m) => (
                    <option key={`m2-${m.id}`} value={m.id} disabled={m.id === material1Id}>
                      {lang === 'es' ? m.nameEs : m.nameEn} ({m.formula})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-emerald-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Side-by-Side Comparison Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* COLUMN 1: Material 1 */}
            <div className="bg-[#091b12]/90 border border-emerald-800/60 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-5">
              <div className="space-y-5">
                {/* Visual Header */}
                <div className="flex gap-4 items-start">
                  <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-emerald-700/60 bg-emerald-950">
                    <img
                      src={mat1.image}
                      alt={lang === 'es' ? mat1.nameEs : mat1.nameEn}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <span className="inline-block font-mono text-[11px] font-semibold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/70 mb-1">
                      {mat1.formula}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white font-display leading-tight">
                      {lang === 'es' ? mat1.nameEs : mat1.nameEn}
                    </h3>
                    <div className="text-xs text-emerald-200/70 font-mono mt-1">
                      {mat1.minPurity}
                    </div>
                  </div>
                </div>

                {/* Metric 1: Recovery Efficiency (Highlighted) */}
                <div className="p-4 rounded-xl bg-[#051109] border border-emerald-800/70 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      {text.compareEfficiency}
                    </div>
                    <span className="font-mono text-base font-bold text-emerald-300">
                      {mat1.recoveryEfficiencyPct}%
                    </span>
                  </div>

                  {/* Progress bar meter */}
                  <div className="w-full bg-emerald-950 rounded-full h-2.5 overflow-hidden border border-emerald-800/50">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700"
                      style={{ width: `${mat1.recoveryEfficiencyPct}%` }}
                    />
                  </div>

                  <p className="text-xs text-emerald-100/90 font-medium pt-1">
                    {lang === 'es' ? mat1.recoveryEfficiencyEs : mat1.recoveryEfficiencyEn}
                  </p>
                  
                  <div className="pt-1 text-[11px] text-emerald-300/70 font-mono flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{lang === 'es' ? mat1.processingMethodEs : mat1.processingMethodEn}</span>
                  </div>
                </div>

                {/* Metric 2: Typical Industrial Applications */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase text-emerald-400 tracking-wider font-mono">
                    <Factory className="w-3.5 h-3.5 text-emerald-400" />
                    {text.compareApplications}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(lang === 'es' ? mat1.applicationsEs : mat1.applicationsEn).map((app, idx) => (
                      <span
                        key={`m1-app-${idx}`}
                        className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#051109] text-emerald-200 border border-emerald-800/60 px-2.5 py-1 rounded-lg"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metric 3: Accepted Physical Formats */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase text-emerald-400 tracking-wider font-mono">
                    <Recycle className="w-3.5 h-3.5 text-emerald-400" />
                    {text.compareFormats}
                  </div>
                  <ul className="space-y-1 text-xs text-emerald-100/80">
                    {(lang === 'es' ? mat1.formatsEs : mat1.formatsEn).map((fmt, idx) => (
                      <li key={`m1-fmt-${idx}`} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{fmt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metric 4: Environmental & Market Tier */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-900/60 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#051109] border border-emerald-950">
                    <div className="text-[10px] text-emerald-400/80 uppercase font-mono flex items-center gap-1">
                      <Leaf className="w-3 h-3 text-emerald-400" />
                      {text.compareCo2}
                    </div>
                    <div className="text-sm font-bold text-white font-mono mt-0.5">
                      -{mat1.co2SavingsPerKg} kg CO₂/kg
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#051109] border border-emerald-950">
                    <div className="text-[10px] text-emerald-400/80 uppercase font-mono">
                      {text.compareDemand}
                    </div>
                    <div className="mt-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getDemandColor(mat1.marketDemand)}`}>
                        {mat1.marketDemand}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Action Quote Button */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectForQuote(lang === 'es' ? mat1.nameEs : mat1.nameEn);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <span>{text.compareAction}: {mat1.formula}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* COLUMN 2: Material 2 */}
            <div className="bg-[#091b12]/90 border border-emerald-800/60 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-5">
              <div className="space-y-5">
                {/* Visual Header */}
                <div className="flex gap-4 items-start">
                  <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-emerald-700/60 bg-emerald-950">
                    <img
                      src={mat2.image}
                      alt={lang === 'es' ? mat2.nameEs : mat2.nameEn}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <span className="inline-block font-mono text-[11px] font-semibold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/70 mb-1">
                      {mat2.formula}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white font-display leading-tight">
                      {lang === 'es' ? mat2.nameEs : mat2.nameEn}
                    </h3>
                    <div className="text-xs text-emerald-200/70 font-mono mt-1">
                      {mat2.minPurity}
                    </div>
                  </div>
                </div>

                {/* Metric 1: Recovery Efficiency (Highlighted) */}
                <div className="p-4 rounded-xl bg-[#051109] border border-emerald-800/70 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      {text.compareEfficiency}
                    </div>
                    <span className="font-mono text-base font-bold text-emerald-300">
                      {mat2.recoveryEfficiencyPct}%
                    </span>
                  </div>

                  {/* Progress bar meter */}
                  <div className="w-full bg-emerald-950 rounded-full h-2.5 overflow-hidden border border-emerald-800/50">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700"
                      style={{ width: `${mat2.recoveryEfficiencyPct}%` }}
                    />
                  </div>

                  <p className="text-xs text-emerald-100/90 font-medium pt-1">
                    {lang === 'es' ? mat2.recoveryEfficiencyEs : mat2.recoveryEfficiencyEn}
                  </p>
                  
                  <div className="pt-1 text-[11px] text-emerald-300/70 font-mono flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{lang === 'es' ? mat2.processingMethodEs : mat2.processingMethodEn}</span>
                  </div>
                </div>

                {/* Metric 2: Typical Industrial Applications */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase text-emerald-400 tracking-wider font-mono">
                    <Factory className="w-3.5 h-3.5 text-emerald-400" />
                    {text.compareApplications}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(lang === 'es' ? mat2.applicationsEs : mat2.applicationsEn).map((app, idx) => (
                      <span
                        key={`m2-app-${idx}`}
                        className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#051109] text-emerald-200 border border-emerald-800/60 px-2.5 py-1 rounded-lg"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metric 3: Accepted Physical Formats */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase text-emerald-400 tracking-wider font-mono">
                    <Recycle className="w-3.5 h-3.5 text-emerald-400" />
                    {text.compareFormats}
                  </div>
                  <ul className="space-y-1 text-xs text-emerald-100/80">
                    {(lang === 'es' ? mat2.formatsEs : mat2.formatsEn).map((fmt, idx) => (
                      <li key={`m2-fmt-${idx}`} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{fmt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metric 4: Environmental & Market Tier */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-900/60 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#051109] border border-emerald-950">
                    <div className="text-[10px] text-emerald-400/80 uppercase font-mono flex items-center gap-1">
                      <Leaf className="w-3 h-3 text-emerald-400" />
                      {text.compareCo2}
                    </div>
                    <div className="text-sm font-bold text-white font-mono mt-0.5">
                      -{mat2.co2SavingsPerKg} kg CO₂/kg
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#051109] border border-emerald-950">
                    <div className="text-[10px] text-emerald-400/80 uppercase font-mono">
                      {text.compareDemand}
                    </div>
                    <div className="mt-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getDemandColor(mat2.marketDemand)}`}>
                        {mat2.marketDemand}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Action Quote Button */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectForQuote(lang === 'es' ? mat2.nameEs : mat2.nameEn);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <span>{text.compareAction}: {mat2.formula}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="shrink-0 p-4 border-t border-emerald-900/60 bg-[#051109] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-100/70">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>
              {lang === 'es'
                ? 'Valores calculados en base a espectrometría XRF y procesos industriales certificados.'
                : 'Values benchmarked against laboratory XRF spectrometry and certified metallurgical runs.'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/60 border border-emerald-800 text-emerald-300 font-semibold cursor-pointer transition-colors"
          >
            {text.compareClose}
          </button>
        </div>

      </div>
    </div>
  );
};

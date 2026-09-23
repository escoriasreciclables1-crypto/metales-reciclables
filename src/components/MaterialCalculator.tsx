import React, { useState } from 'react';
import { Language } from '../types';
import { t } from '../data/translations';
import { materialsList } from '../data/materialsData';
import { Scale, Leaf, TrendingUp, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

interface MaterialCalculatorProps {
  lang: Language;
  onTransferToQuote: (materialName: string, quantityKg: string, format: string) => void;
}

export const MaterialCalculator: React.FC<MaterialCalculatorProps> = ({
  lang,
  onTransferToQuote
}) => {
  const text = t[lang];

  const [selectedMaterialId, setSelectedMaterialId] = useState<string>(materialsList[0].id);
  const [selectedFormat, setSelectedFormat] = useState<string>('solid');
  const [quantityKg, setQuantityKg] = useState<number>(250);

  const currentMaterial = materialsList.find((m) => m.id === selectedMaterialId) || materialsList[0];

  // Format multiplier (yield factors: solids are highest recovery, slags/sludge have higher processing loss)
  const formatYieldMultiplier: Record<string, number> = {
    solid: 1.0,
    turnings: 0.92,
    sludge: 0.78,
    slags: 0.65
  };

  const yieldFactor = formatYieldMultiplier[selectedFormat] || 1.0;
  const estimatedCo2Saved = Math.round(quantityKg * currentMaterial.co2SavingsPerKg * yieldFactor);
  const estimatedTreesEquivalent = Math.round(estimatedCo2Saved / 22); // average tree absorbs ~22kg CO2/year

  const formatLabels: Record<string, { es: string; en: string }> = {
    solid: { es: 'Sólidos / Herramientas / Insertos', en: 'Solids / Indexable Inserts' },
    turnings: { es: 'Virutas y Rebabas Clasificadas', en: 'Classified Turnings & Burrs' },
    sludge: { es: 'Lodos de Afilado / Slurry Húmedo', en: 'Grinding Sludge / Wet Slurry' },
    slags: { es: 'Escorias / Cascarilla / Polvos', en: 'Furnace Slags / Scale / Dust' }
  };

  const currentFormatLabel = formatLabels[selectedFormat] ? formatLabels[selectedFormat][lang] : selectedFormat;

  const handleTransfer = () => {
    const matName = lang === 'es' ? currentMaterial.nameEs : currentMaterial.nameEn;
    onTransferToQuote(matName, quantityKg.toString(), currentFormatLabel);
  };

  return (
    <section id="calculadora" className="py-20 bg-[#07130c] border-b border-emerald-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-2">
            {text.calcKicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display" style={{ textWrap: 'balance' }}>
            {text.calcTitle}
          </h2>
          <p className="text-emerald-100/70 text-base mt-3 leading-relaxed">
            {text.calcSubtitle}
          </p>
        </div>

        {/* Interactive Calculator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel */}
          <div className="lg:col-span-7 bg-[#0b1a12] border border-emerald-900/60 rounded-2xl p-6 sm:p-8 shadow-xl space-y-7">
            
            {/* Step 1: Material Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 mb-3">
                {text.calcStep1}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {materialsList.map((mat) => {
                  const isSelected = mat.id === selectedMaterialId;
                  const name = lang === 'es' ? mat.nameEs : mat.nameEn;
                  return (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => setSelectedMaterialId(mat.id)}
                      className={`text-left p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-900/40 text-white shadow-md shadow-emerald-950'
                          : 'border-emerald-950/80 bg-emerald-950/20 text-emerald-100/70 hover:border-emerald-800/80 hover:bg-emerald-950/50'
                      }`}
                    >
                      <div className="font-semibold text-emerald-200">{name}</div>
                      <div className="text-[11px] text-emerald-400/80 font-mono mt-0.5">{mat.formula}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Physical Format Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 mb-3">
                {text.calcStep2}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'solid', label: text.calcFormatSolid },
                  { key: 'turnings', label: text.calcFormatTurnings },
                  { key: 'sludge', label: text.calcFormatSludge },
                  { key: 'slags', label: text.calcFormatSlags }
                ].map((fmt) => {
                  const isSelected = selectedFormat === fmt.key;
                  return (
                    <button
                      key={fmt.key}
                      type="button"
                      onClick={() => setSelectedFormat(fmt.key)}
                      className={`p-2.5 rounded-lg border text-[11px] font-medium transition-all text-center leading-tight cursor-pointer ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-900/50 text-white'
                          : 'border-emerald-950/80 bg-emerald-950/20 text-emerald-100/60 hover:border-emerald-800'
                      }`}
                    >
                      {fmt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Quantity Input and Presets */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  {text.calcStep3}
                </label>
                <span className="text-xs text-emerald-400 font-mono font-semibold tabular-nums">
                  {quantityKg.toLocaleString()} kg ({((quantityKg * 2.20462)).toFixed(0)} lbs)
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="25"
                max="10000"
                step="25"
                value={quantityKg}
                onChange={(e) => setQuantityKg(Number(e.target.value))}
                className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {[50, 250, 1000, 2500, 5000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setQuantityKg(preset)}
                    className={`px-3 py-1 rounded-md text-xs font-mono tabular-nums transition-colors cursor-pointer ${
                      quantityKg === preset
                        ? 'bg-emerald-400 text-slate-950 font-bold'
                        : 'bg-emerald-950/80 text-emerald-300/80 hover:bg-emerald-900/60'
                    }`}
                  >
                    {preset.toLocaleString()} kg
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results & Value Proposition Output */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0e2419] to-[#08170f] border border-emerald-700/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-emerald-800/40">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                {text.calcEstMetricTitle}
              </span>
              <span className="text-[11px] font-mono text-emerald-300/80 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800/60">
                {currentMaterial.formula}
              </span>
            </div>

            {/* Main Ecological Metric */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-300/80">
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span>{text.calcCo2SavedLabel}</span>
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-white font-display tabular-nums tracking-tight">
                {estimatedCo2Saved.toLocaleString()} <span className="text-emerald-400 text-2xl font-normal">kg CO₂e</span>
              </div>
              <p className="text-xs text-emerald-200/60">
                {text.calcCo2Desc} ({lang === 'es' ? `~${estimatedTreesEquivalent} árboles/año equivalentes` : `~${estimatedTreesEquivalent} equivalent trees/yr`} saved)
              </p>
            </div>

            {/* Strategic Value Attributes */}
            <div className="space-y-3 pt-2">
              
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-900/60 flex items-center justify-between">
                <div>
                  <div className="text-xs text-emerald-300/80 font-medium">
                    {text.calcDemandLabel}
                  </div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    {currentMaterial.marketDemand === 'Strategic' ? text.calcValuationStrategic : text.calcValuationHigh}
                  </div>
                </div>
                <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0" />
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-900/60 flex items-center justify-between">
                <div>
                  <div className="text-xs text-emerald-300/80 font-medium">
                    {lang === 'es' ? 'Concentración Típica' : 'Typical Target Assay'}
                  </div>
                  <div className="text-sm font-semibold text-emerald-200 font-mono mt-0.5">
                    {currentMaterial.minPurity}
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              </div>

            </div>

            {/* Action CTA: Transfer to Quote */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleTransfer}
                className="w-full flex items-center justify-center gap-2 px-5 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all cursor-pointer"
              >
                <span>{text.calcTransferBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-emerald-300/60 text-center mt-3 leading-tight">
                {text.calcDisclaimer}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

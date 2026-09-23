import React, { useState } from 'react';
import { Language, MaterialItem } from '../types';
import { t } from '../data/translations';
import { materialsList } from '../data/materialsData';
import { QuickCompareModal } from './QuickCompareModal';
import { 
  ArrowRight, 
  ArrowLeftRight, 
  TrendingUp, 
  Check, 
  Scale, 
  Sparkles,
  X
} from 'lucide-react';

interface MaterialsCatalogProps {
  lang: Language;
  onSelectMaterialForQuote: (materialName: string) => void;
}

export const MaterialsCatalog: React.FC<MaterialsCatalogProps> = ({
  lang,
  onSelectMaterialForQuote
}) => {
  const text = t[lang];
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  // Quick Compare state
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([
    'tungsten-carbide-widia',
    'nickel-superalloys'
  ]);

  const filteredMaterials = filterCategory === 'all'
    ? materialsList
    : materialsList.filter((m) => m.category === filterCategory);

  const handleToggleCompare = (materialId: string) => {
    setSelectedForCompare((prev) => {
      if (prev.includes(materialId)) {
        // Unselect
        return prev.filter((id) => id !== materialId);
      }
      if (prev.length >= 2) {
        // Replace second with newly clicked, and open modal
        const next = [prev[0], materialId];
        setIsCompareOpen(true);
        return next;
      }
      const next = [...prev, materialId];
      if (next.length === 2) {
        setIsCompareOpen(true);
      }
      return next;
    });
  };

  const handleOpenComparison = (mat1Id?: string, mat2Id?: string) => {
    if (mat1Id && mat2Id) {
      setSelectedForCompare([mat1Id, mat2Id]);
    }
    setIsCompareOpen(true);
  };

  return (
    <section id="materiales" className="py-24 bg-[#091b12] border-b border-emerald-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-2 font-mono">
            {text.catalogKicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display" style={{ textWrap: 'balance' }}>
            {text.catalogTitle}
          </h2>
          <p className="text-emerald-100/70 text-base mt-3 leading-relaxed">
            {text.catalogSubtitle}
          </p>
        </div>

        {/* Quick Compare Feature Ribbon / Launcher */}
        <div className="max-w-3xl mx-auto mb-8 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-[#07190e] via-[#0b2717] to-[#07190e] border border-emerald-600/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center justify-center sm:justify-start gap-1.5 font-display">
                <span>{text.compareTitle}</span>
                <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono font-normal">
                  B2B
                </span>
              </div>
              <div className="text-[11px] text-emerald-200/70 mt-0.5">
                {lang === 'es'
                  ? 'Compare rendimiento de recuperación y aplicaciones industriales frente a frente.'
                  : 'Compare recovery yield and industrial applications side-by-side.'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleOpenComparison()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>{text.compareBtn}</span>
            {selectedForCompare.length > 0 && (
              <span className="px-1.5 py-0.5 bg-slate-950 text-emerald-400 rounded-full text-[10px] font-mono">
                {selectedForCompare.length}/2
              </span>
            )}
          </button>
        </div>

        {/* Filter Controls (Interactive Buttons) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { key: 'all', label: text.filterAll },
            { key: 'carbide', label: text.filterCarbide },
            { key: 'superalloy', label: text.filterSuperalloys },
            { key: 'refractory', label: text.filterRefractory },
            { key: 'slags', label: text.filterSlags },
            { key: 'catalysts', label: text.filterCatalysts }
          ].map((cat) => {
            const isActive = filterCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setFilterCategory(cat.key)}
                className={`px-4 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'bg-emerald-950/50 text-emerald-200/80 hover:bg-emerald-900/40 hover:text-white border border-emerald-900/50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMaterials.map((material) => {
            const name = lang === 'es' ? material.nameEs : material.nameEn;
            const description = lang === 'es' ? material.descriptionEs : material.descriptionEn;
            const formats = lang === 'es' ? material.formatsEs : material.formatsEn;
            const applications = lang === 'es' ? material.applicationsEs : material.applicationsEn;
            const isSelected = selectedForCompare.includes(material.id);

            return (
              <div
                key={material.id}
                className={`rounded-2xl border bg-[#07130c]/90 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl group ${
                  isSelected 
                    ? 'border-emerald-400 ring-2 ring-emerald-500/30' 
                    : 'border-emerald-900/50 hover:border-emerald-600/50'
                }`}
              >
                <div>
                  {/* Image slot */}
                  <div className="aspect-[4/3] w-full overflow-hidden relative bg-emerald-950">
                    <img
                      src={material.image}
                      alt={name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07130c] via-transparent to-transparent opacity-80" />
                    
                    {/* Top tags on image: Compare button */}
                    <div className="absolute top-3 right-3 z-10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleCompare(material.id);
                        }}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-md transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-400/40'
                            : 'bg-[#07130c]/85 hover:bg-emerald-950 text-emerald-300 hover:text-white border border-emerald-700/60'
                        }`}
                        title={isSelected ? 'Quitar de comparación' : 'Agregar a comparación'}
                      >
                        <ArrowLeftRight className="w-3.5 h-3.5" />
                        <span>{isSelected ? text.compareCardSelected : text.compareCardButton}</span>
                      </button>
                    </div>

                    {/* Bottom image metadata */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-emerald-300 bg-emerald-950/90 px-2.5 py-1 rounded-md border border-emerald-800/80 backdrop-blur-sm">
                        {material.formula}
                      </span>
                      <span className="text-[11px] text-emerald-300 bg-emerald-900/70 px-2 py-0.5 rounded font-mono">
                        {material.minPurity}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-white leading-snug group-hover:text-emerald-300 transition-colors">
                        {name}
                      </h3>
                    </div>

                    {/* Recovery Efficiency Highlight Badge */}
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-950/50 border border-emerald-800/50 text-xs">
                      <span className="text-emerald-400 font-semibold font-mono flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                        {lang === 'es' ? 'Recuperación:' : 'Recovery Yield:'}
                      </span>
                      <span className="font-mono font-bold text-white bg-emerald-900/60 px-2 py-0.5 rounded text-[11px]">
                        {material.recoveryEfficiencyPct}%
                      </span>
                    </div>

                    <p className="text-xs text-emerald-100/70 leading-relaxed">
                      {description}
                    </p>

                    {/* Specifications */}
                    <div className="space-y-2 pt-2 border-t border-emerald-900/40 text-xs">
                      <div>
                        <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                          {text.specFormats}
                        </div>
                        <div className="flex flex-wrap gap-1 text-[11px] text-emerald-100/80">
                          {formats.map((fmt, i) => (
                            <span key={i} className="inline-block bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-900/50">
                              {fmt}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-1">
                        <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                          {text.specApps}
                        </div>
                        <p className="text-[11px] text-emerald-200/70">
                          {applications.join(' · ')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Actions: Quick Compare & Quote */}
                <div className="p-6 pt-0 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleCompare(material.id)}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-400 text-slate-950 font-bold border-emerald-400'
                          : 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border-emerald-800/60 hover:border-emerald-500'
                      }`}
                    >
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                      <span>{isSelected ? text.compareCardSelected : text.compareCardButton}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectMaterialForQuote(name)}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all cursor-pointer font-bold shadow-sm shadow-emerald-400/20"
                    >
                      <span>{text.btnOfferThis}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Quick Compare Modal */}
      <QuickCompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        lang={lang}
        initialMaterial1Id={selectedForCompare[0] || 'tungsten-carbide-widia'}
        initialMaterial2Id={selectedForCompare[1] || 'nickel-superalloys'}
        onSelectForQuote={onSelectMaterialForQuote}
      />
    </section>
  );
};

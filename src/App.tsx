import React, { useState } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MaterialCalculator } from './components/MaterialCalculator';
import { MaterialsCatalog } from './components/MaterialsCatalog';
import { ProcessSection } from './components/ProcessSection';
import { SustainabilitySection } from './components/SustainabilitySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuoteFormModal } from './components/QuoteFormModal';
import { BackToTop } from './components/BackToTop';
import { MessageSquare } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [modalPresetMaterial, setModalPresetMaterial] = useState('');
  const [modalPresetQuantity, setModalPresetQuantity] = useState('');
  const [modalPresetFormat, setModalPresetFormat] = useState('');

  const toggleLang = () => {
    setLang((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  const handleOpenQuoteModal = (presetMaterial?: string) => {
    setModalPresetMaterial(presetMaterial || '');
    setModalPresetQuantity('');
    setModalPresetFormat('');
    setQuoteModalOpen(true);
  };

  const handleTransferToQuote = (materialName: string, quantityKg: string, format: string) => {
    setModalPresetMaterial(materialName);
    setModalPresetQuantity(quantityKg);
    setModalPresetFormat(format);
    setQuoteModalOpen(true);
  };

  const handleScrollToCalculator = () => {
    const el = document.getElementById('calculadora');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07130c] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLang}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          lang={lang}
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onScrollToCalculator={handleScrollToCalculator}
        />

        {/* Interactive Material Valuation & Carbon Offset Calculator */}
        <MaterialCalculator
          lang={lang}
          onTransferToQuote={handleTransferToQuote}
        />

        {/* Comprehensive Materials & Secondary Residues Catalog */}
        <MaterialsCatalog
          lang={lang}
          onSelectMaterialForQuote={(matName) => handleOpenQuoteModal(matName)}
        />

        {/* 4-Step Metallurgical Circular Process */}
        <ProcessSection lang={lang} />

        {/* Sustainability & Environmental Comparative Balance */}
        <SustainabilitySection lang={lang} />

        {/* B2B Testimonials from Recurring Clients */}
        <TestimonialsSection
          lang={lang}
          onSelectMaterialForQuote={(matName) => handleOpenQuoteModal(matName)}
        />

        {/* Frequently Asked Questions */}
        <FaqSection lang={lang} />

        {/* Direct Channels & Contact Information */}
        <ContactSection
          lang={lang}
          onOpenQuoteModal={() => handleOpenQuoteModal()}
        />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onToggleLang={toggleLang}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* Quote / Material Sale Lead Modal */}
      <QuoteFormModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        lang={lang}
        presetMaterial={modalPresetMaterial}
        presetQuantity={modalPresetQuantity}
        presetFormat={modalPresetFormat}
      />

      {/* Floating Action Button (WhatsApp Quick Inquiry) - Red Button linked to +528127020123 */}
      <a
        href="https://wa.me/528127020123?text=Hola%20Ecowidia,%20deseo%20cotizar%20un%20lote%20de%20carburo%20de%20tungsteno%20y%20metales%20secundarios"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-2xl shadow-red-600/40 hover:shadow-red-600/60 hover:scale-105 transition-all cursor-pointer border border-red-400/30"
      >
        <MessageSquare className="w-4 h-4 fill-white" />
        <span className="font-bold tracking-wider">WhatsApp</span>
      </a>

      {/* Floating Back to Top Button */}
      <BackToTop lang={lang} />
    </div>
  );
}

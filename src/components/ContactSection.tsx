import React from 'react';
import { Language } from '../types';
import { t } from '../data/translations';
import { Mail, Phone, MapPin, Clock, MessageSquare, ArrowRight, CheckCircle } from 'lucide-react';

interface ContactSectionProps {
  lang: Language;
  onOpenQuoteModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang, onOpenQuoteModal }) => {
  const text = t[lang];

  return (
    <section id="contacto" className="py-24 bg-[#091b12] border-b border-emerald-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Direct Info & Channels */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-2">
                {lang === 'es' ? 'Canales Directos' : 'Direct Channels'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
                {lang === 'es'
                  ? 'Póngase en Contacto con Nuestro Equipo Técnico'
                  : 'Get in Touch with Our Metallurgical Team'}
              </h2>
              <p className="text-emerald-100/70 text-sm mt-3 leading-relaxed">
                {lang === 'es'
                  ? 'Gestionamos compras directas y contratos a largo plazo para empresas de mecanizado, acerías, plantas químicas y recicladores autorizados.'
                  : 'We manage direct spot purchases and long-term supply agreements for CNC workshops, steel mills, chemical processors, and licensed recyclers.'}
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              
              {/* Primary Email */}
              <a
                href="mailto:escorias.reciclables1@gmail.com"
                className="p-4 rounded-xl bg-[#07130c] border border-emerald-800/80 hover:border-emerald-400 flex items-center gap-4 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-950 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-emerald-400/80 uppercase font-semibold">
                    {lang === 'es' ? 'Correo Oficial de Recepción y Ofertas' : 'Official Inquiries & Material Offers'}
                  </div>
                  <div className="font-mono text-sm text-white font-bold group-hover:text-emerald-300">
                    escorias.reciclables1@gmail.com
                  </div>
                </div>
              </a>

              {/* WhatsApp Quick Action */}
              <a
                href="https://wa.me/528127020123?text=Hola%20Ecowidia,%20deseo%20cotizar%20un%20lote%20de%20carburo%20de%20tungsteno%20y%20metales"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#07130c] border border-red-900/40 hover:border-red-500 flex items-center gap-4 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-red-950/80 border border-red-900/60 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5 fill-red-500" />
                </div>
                <div>
                  <div className="text-[11px] text-red-400 uppercase font-semibold">
                    WhatsApp B2B Directo
                  </div>
                  <div className="font-mono text-sm text-white font-bold group-hover:text-red-300">
                    +52 81 2702 0123
                  </div>
                </div>
              </a>

              {/* Service Logistics */}
              <div className="p-4 rounded-xl bg-[#07130c]/70 border border-emerald-950 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-950 flex items-center justify-center text-emerald-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-emerald-400/80 uppercase font-semibold">
                    {lang === 'es' ? 'Horario de Atención' : 'Operational Schedule'}
                  </div>
                  <div className="text-xs text-emerald-100/70">
                    {lang === 'es' ? 'Lunes a Viernes: 08:00 - 18:00 (Respuesta en <24h)' : 'Monday to Friday: 08:00 - 18:00 (Reply in <24h)'}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: High conversion box */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#07180e] via-[#092215] to-[#0b291a] border border-emerald-600/50 shadow-2xl relative overflow-hidden">
              <div className="space-y-6">
                
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-700/60">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{lang === 'es' ? 'Liquidación Rápida de Lotes' : 'Fast Batch Settlement'}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display leading-snug">
                  {lang === 'es'
                    ? '¿Tiene insertos desgastados, lodos de afilado o escorias acumuladas?'
                    : 'Have worn carbide inserts, grinding sludge, or accumulated slag?'}
                </h3>

                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  {lang === 'es'
                    ? 'Convierta pasivos industriales en ingresos inmediatos y certifique el compromiso ambiental de su planta con nuestro protocolo de trazabilidad verde.'
                    : 'Turn industrial liabilities into immediate cash flow and certify your facility’s environmental commitment with our verified green recycling chain.'}
                </p>

                <div className="pt-2">
                  <button
                    onClick={onOpenQuoteModal}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 cursor-pointer"
                  >
                    <span>{text.btnQuote}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-4 border-t border-emerald-900/60 flex items-center gap-6 text-xs text-emerald-300/70 font-mono">
                  <span>ISO 14001</span>
                  <span>·</span>
                  <span>ISO 9001</span>
                  <span>·</span>
                  <span>LMB Indexed</span>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

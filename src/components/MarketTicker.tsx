import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { TrendingUp, TrendingDown, Activity, Sparkles } from 'lucide-react';

interface MarketItem {
  id: string;
  metal: string;
  gradeEs: string;
  gradeEn: string;
  symbol: string;
  price: string;
  unit: string;
  change: number; // percentage
  benchmark: string;
}

const INITIAL_MARKET_DATA: MarketItem[] = [
  {
    id: 'tungsten-apt',
    metal: 'Tungsten (W)',
    gradeEs: 'APT Grado Metalúrgico',
    gradeEn: 'APT Metallurgical Grade',
    symbol: 'W-APT',
    price: '348.50',
    unit: '$/mtu',
    change: +1.42,
    benchmark: 'Fastmarkets / LMB'
  },
  {
    id: 'tungsten-carbide-scrap',
    metal: 'Carburo de Tungsteno (Widia)',
    gradeEs: 'Inserto Limpio Reciclable',
    gradeEn: 'Clean Solid Inserts Scrap',
    symbol: 'WC-Co',
    price: '28.20',
    unit: '$/kg',
    change: +1.85,
    benchmark: 'Ecowidia Spot Index'
  },
  {
    id: 'cobalt-lme',
    metal: 'Cobalto Primario',
    gradeEs: 'Cátodo 99.8% LME Cash',
    gradeEn: 'Cathode 99.8% LME Cash',
    symbol: 'Co-LME',
    price: '28,650',
    unit: '$/t',
    change: +0.76,
    benchmark: 'LME Cash'
  },
  {
    id: 'cobalt-stellite-scrap',
    metal: 'Aleaciones Co-Cr (Stellite)',
    gradeEs: 'Chatarra de Revestimiento y Desgaste',
    gradeEn: 'Hardfacing & Wear Scrap',
    symbol: 'Co-Cr',
    price: '19.40',
    unit: '$/kg',
    change: +0.92,
    benchmark: 'Secondary Spot'
  },
  {
    id: 'nickel-lme',
    metal: 'Níquel Primario',
    gradeEs: 'LME Settlement 99.8%',
    gradeEn: 'LME Settlement 99.8%',
    symbol: 'Ni-LME',
    price: '16,740',
    unit: '$/t',
    change: -0.38,
    benchmark: 'London Metal Exchange'
  },
  {
    id: 'nickel-inconel',
    metal: 'Superaleaciones Níquel (Inconel 718)',
    gradeEs: 'Sólidos y Recortes Aeroespaciales',
    gradeEn: 'Aerospace Solids & Offcuts',
    symbol: 'Ni-718',
    price: '14.85',
    unit: '$/kg',
    change: +1.15,
    benchmark: 'Aerospace Circular Index'
  },
  {
    id: 'molybdenum-oxide',
    metal: 'Molibdeno Técnico',
    gradeEs: 'Óxido de Mo (Mo 57% min)',
    gradeEn: 'Technical Mo Oxide (Mo 57% min)',
    symbol: 'Mo-Oxide',
    price: '21.80',
    unit: '$/lb',
    change: +0.45,
    benchmark: 'Platts Metals'
  },
  {
    id: 'titanium-grade5',
    metal: 'Titanio Grado 5 (Ti-6Al-4V)',
    gradeEs: 'Viruta limpia y recortes sólidos',
    gradeEn: 'Clean chips & solids',
    symbol: 'Ti-64',
    price: '11.60',
    unit: '$/kg',
    change: +0.55,
    benchmark: 'Argus Titanium'
  }
];

interface MarketTickerProps {
  lang: Language;
}

export const MarketTicker: React.FC<MarketTickerProps> = ({ lang }) => {
  const [tickerData, setTickerData] = useState<MarketItem[]>(INITIAL_MARKET_DATA);

  // Subtle live simulated micro-fluctuations every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerData((prev) =>
        prev.map((item) => {
          // Randomly pick 1-2 items to subtly fluctuate
          if (Math.random() > 0.45) return item;
          const delta = (Math.random() * 0.4 - 0.18); // small random drift
          const currentChange = parseFloat(item.change.toFixed(2));
          const newChange = parseFloat((currentChange + delta * 0.1).toFixed(2));

          // Calculate numeric price update
          const rawPrice = parseFloat(item.price.replace(/,/g, ''));
          const priceChange = rawPrice * (delta / 500);
          const newPrice = rawPrice + priceChange;

          const formattedPrice =
            newPrice > 1000
              ? Math.round(newPrice).toLocaleString('en-US')
              : newPrice.toFixed(2);

          return {
            ...item,
            change: newChange,
            price: formattedPrice
          };
        })
      );
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      role="region"
      aria-label="Market commodity ticker"
      className="bg-[#030905] border-b border-emerald-950/90 text-xs text-slate-300 overflow-hidden relative select-none z-40 h-9 flex items-center"
    >
      {/* Static Left Badge - Live Indicator */}
      <div className="shrink-0 z-20 flex items-center gap-2 pl-3 pr-4 h-full bg-[#030905] border-r border-emerald-900/60 shadow-[4px_0_12px_rgba(0,0,0,0.5)]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-wider uppercase text-emerald-400">
          <Activity className="w-3 h-3" />
          <span className="hidden sm:inline">
            {lang === 'es' ? 'MERCADO METALES REFRACTARIOS' : 'REFRACTORY METALS INDEX'}
          </span>
          <span className="sm:hidden">LME/LMB</span>
        </div>
      </div>

      {/* Infinite scrolling track */}
      <div className="flex-1 overflow-hidden relative flex items-center">
        {/* Left and Right Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#030905] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#030905] to-transparent z-10" />

        <div className="animate-marquee flex items-center whitespace-nowrap">
          {/* Double array for seamless loop */}
          {[...tickerData, ...tickerData].map((item, index) => {
            const isPositive = item.change >= 0;
            return (
              <div
                key={`${item.id}-${index}`}
                className="inline-flex items-center gap-2 px-5 border-r border-emerald-950/80 text-[11px]"
              >
                {/* Symbol Tag */}
                <span className="font-mono font-bold text-emerald-300/90 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40 text-[10px]">
                  {item.symbol}
                </span>

                {/* Metal Name & Grade */}
                <span className="text-slate-200 font-medium">
                  {lang === 'es' ? item.gradeEs : item.gradeEn}
                </span>

                {/* Price */}
                <span className="font-mono font-bold text-white tracking-tight">
                  {item.price} <span className="text-[10px] text-slate-400 font-normal">{item.unit}</span>
                </span>

                {/* Change Pill */}
                <span
                  className={`inline-flex items-center gap-0.5 font-mono text-[10px] font-semibold ${
                    isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-2.5 h-2.5" />
                  ) : (
                    <TrendingDown className="w-2.5 h-2.5" />
                  )}
                  {isPositive ? `+${item.change.toFixed(2)}%` : `${item.change.toFixed(2)}%`}
                </span>

                {/* Benchmark Source */}
                <span className="text-[9px] text-emerald-200/40 font-mono hidden md:inline">
                  [{item.benchmark}]
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Static Right Indicator */}
      <div className="hidden lg:flex shrink-0 z-20 items-center gap-1.5 px-3 h-full bg-[#030905] border-l border-emerald-900/60 text-[10px] text-emerald-400/70 font-mono">
        <Sparkles className="w-3 h-3 text-emerald-400" />
        <span>{lang === 'es' ? 'Precios Indicativos B2B' : 'B2B Indicative Index'}</span>
      </div>
    </div>
  );
};

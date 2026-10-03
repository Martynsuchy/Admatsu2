import React, { useState, useEffect, useRef } from 'react';
import { Search, Bot, Check, X } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { EditableText } from './cms/EditableText';
import { GeoQueryItem } from '../types/cms';

export const GeoExplainer: React.FC = () => {
  const [selectedQueryIndex, setSelectedQueryIndex] = useState(0);
  const { content, updateGeoExplainer, currentLang } = useCms();
  const geo = content.geoExplainer;

  const simulatorUiLabels = {
    cs: {
      promptHeader: 'Co zákazník napsal do ChatGPT / Perplexity / Gemini:',
      classicHeader: 'Běžný web bez strukturovaných dat',
    },
    en: {
      promptHeader: 'What the user asked in ChatGPT / Perplexity / Gemini:',
      classicHeader: 'Standard website without structured data',
    },
    de: {
      promptHeader: 'Was der Kunde in ChatGPT / Perplexity / Gemini eingegeben hat:',
      classicHeader: 'Herkömmliche Website ohne strukturierte Daten',
    },
  };

  const simLabels = simulatorUiLabels[currentLang] || simulatorUiLabels.cs;

  const comparisonGridRef = useRef<HTMLDivElement>(null);
  const unifiedWaveRef = useRef<HTMLDivElement>(null);
  const unifiedSecondaryWaveRef = useRef<HTMLDivElement>(null);
  const seoCardRef = useRef<HTMLDivElement>(null);
  const geoCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!comparisonGridRef.current || !unifiedWaveRef.current) {
            ticking = false;
            return;
          }
          const rect = comparisonGridRef.current.getBoundingClientRect();
          const vh = window.innerHeight || 800;

          // Single continuous progress across the whole comparison section
          const totalDistance = vh + rect.height;
          const currentPos = vh - rect.top;
          const progress = Math.min(Math.max(currentPos / totalDistance, 0), 1);

          // Travel from top bleed to bottom bleed
          const gridH = rect.height;
          const waveH = 460;
          const startY = -waveH * 0.75;
          const endY = gridH + waveH * 0.35;
          const currentY = (startY + progress * (endY - startY)).toFixed(1);

          const intensity = Math.sin(progress * Math.PI);
          const clampedIntensity = Math.max(0, Math.min(intensity, 1));

          unifiedWaveRef.current.style.transform = `translate3d(0, ${currentY}px, 0)`;
          unifiedWaveRef.current.style.opacity = (0.42 + clampedIntensity * 0.36).toFixed(3);

          if (unifiedSecondaryWaveRef.current) {
            const secondaryY = (parseFloat(currentY) - 120).toFixed(1);
            unifiedSecondaryWaveRef.current.style.transform = `translate3d(0, ${secondaryY}px, 0)`;
            unifiedSecondaryWaveRef.current.style.opacity = (0.30 + clampedIntensity * 0.30).toFixed(3);
          }

          // Harmonized card borders and glows
          const alpha = (0.22 + clampedIntensity * 0.22).toFixed(3);
          if (seoCardRef.current) {
            seoCardRef.current.style.borderColor = `rgba(16, 185, 129, ${alpha})`;
            seoCardRef.current.style.boxShadow = `0 0 ${(14 + clampedIntensity * 16).toFixed(1)}px rgba(16, 185, 129, ${(0.05 + clampedIntensity * 0.08).toFixed(3)})`;
          }
          if (geoCardRef.current) {
            geoCardRef.current.style.borderColor = `rgba(6, 182, 212, ${alpha})`;
            geoCardRef.current.style.boxShadow = `0 0 ${(14 + clampedIntensity * 16).toFixed(1)}px rgba(6, 182, 212, ${(0.05 + clampedIntensity * 0.08).toFixed(3)})`;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const defaultSeoBullets = [
    'Čistá sémantika: Správná hierarchie nadpisů (H1, H2), logické členění textů a žádný zmatek v kódu.',
    'Blesková odezva: Web se nezasekává, posuny rozvržení jsou nulové a stránka reaguje okamžitě.',
    'Bez penalizací: Žádné skryté nekalé praktiky — čistá práce, kterou Google bez obav indexuje.',
  ];

  const defaultGeoBullets = [
    'Otevřeno pro AI roboty: Povolujeme GPTBot, PerplexityBot, ClaudeBot a další v robots.txt.',
    'Entitní Schema.org v kódu: AI model okamžitě ví, kdo jste, kde sídlíte a co nabízíte.',
    'Fakta místo obecných frází: Obsah strukturovaný tak, aby ho model mohl citovat bez zkreslení.',
  ];

  const defaultQueries: GeoQueryItem[] = [
    {
      id: 'case-craft',
      label: 'Truhlářství & Zakázkový nábytek',
      query: '„Potřebuju v Brně spolehlivého truhláře na vestavěnou skříň do ložnice. Spěchá to, potřeboval bych někoho s rychlým volným termínem, kdo to přijede zaměřit přímo ke mně.“',
      classicTitle: 'Pouze fotogalerie bez termínů a lokality',
      classicSnippet: 'Web má hezké fotky hotového nábytku a heslo „vyrábíme s láskou“, ale chybí jakákoliv zmínka o obvyklých termínech realizace nebo lokalitě montáže. AI z fotek nepozná, zda montujete v Brně ani jak rychle obvykle zakázky dodáváte.',
      classicLimitation: 'Výsledek: AI firmu nedoporučí, protože o obvyklých termínech realizace ani lokalitě montáže nemá ověřená data.',
      aiEngine: 'ChatGPT Search (s GEO daty)',
      aiAnswer: '„V Brně a okolí můžete zkusit Truhlářství [Váš web]. Specializují se na vestavěné skříně na míru, zaměření dělají přímo na místě a na webu uvádějí rychlou realizaci s montáží obvykle do 3–4 týdnů. Kontakt: +420 777 ...“',
      citations: 'Co AI našla: Lokalita Brno a okolí · Zaměření na místě · Reálné termíny realizace',
      verifiedLabel: 'AI má všechna data k doporučení',
    },
    {
      id: 'case-b2b',
      label: 'CNC kovoobrábění',
      query: '„Hledám spolehlivou firmu na přesné CNC frézování. Potřebujeme menší sérii cca 50–100 přesných dílů z nerezi a titanu, máme hotové 3D modely. Kdo to zvládne v solidní toleranci?“',
      classicTitle: 'Pouze obecné heslo „kovovýroba na zakázku“',
      classicSnippet: 'Na webu je jen obecný slogan a fotka haly z fotobanky. V kódu ani v textu ale není soupis zpracovávaných materiálů, strojních parametrů ani formátů podkladů. AI robot tak nedokáže nákupčímu potvrdit, zda titan a nerez vůbec obrábíte.',
      classicLimitation: 'Výsledek: Model firmu přeskočí, protože nedokáže potvrdit obrábění titanu ani kapacitu pro menší série.',
      aiEngine: 'Perplexity AI (s GEO daty)',
      aiAnswer: '„Pro menší série a přesné obrábění nerezi i titanu uvádí konkrétní parametry [Vaše firma]. V technickém profilu přímo deklarují toleranci na 0,01 mm a příjem 3D modelů ve standardních formátech STEP i IGES. Kontakt: ...“',
      citations: 'Co AI našla: Obrábění titanu a nerezi · Přesnost 0,01 mm · Podpora 3D CAD modelů (STEP)',
      verifiedLabel: 'AI má všechna data k doporučení',
    },
    {
      id: 'case-emergency',
      label: 'Havarijní servis',
      query: '„Kdo v Olomouci a okolí zajišťuje havarijní opravy kotlů a rozvodů vody i o víkendu?“',
      classicTitle: 'Nejasná otevírací doba a schovaný kontakt',
      classicSnippet: 'Zákazník řeší akutní havárii, ale AI z webu nedokáže potvrdit, zda servis vyjíždí v sobotu večer a jaký má dojezdový rádius.',
      classicLimitation: 'Výsledek: AI nemůže riskovat chybné doporučení a nabídne firmu s explicitně potvrzenou víkendovou pohotovostí.',
      aiEngine: 'AI Overviews (s GEO daty)',
      aiAnswer: '„Víkendovou pohotovost v Olomouci a dojezdu do 30 km zajišťuje [Vaše firma]. V datech přímo deklarují dostupnost dispečinku 24/7 a garantovaný výjezd k akutním haváriím.“',
      citations: 'Co AI našla: Ověřená dostupnost: 24/7 havárie · Rádius dojezdu 30 km · Nonstop kontakt',
      verifiedLabel: 'AI má všechna data k doporučení',
    },
  ];

  const seoBullets = geo.seoCardBullets || defaultSeoBullets;
  const geoBullets = geo.geoCardBullets || defaultGeoBullets;
  const queries = geo.simulatorQueries || defaultQueries;
  const currentQuery = queries[selectedQueryIndex] || queries[0];

  const updateCurrentQuery = (updated: Partial<GeoQueryItem>) => {
    const newQueries = [...queries];
    newQueries[selectedQueryIndex] = { ...currentQuery, ...updated };
    updateGeoExplainer({ simulatorQueries: newQueries });
  };

  return (
    <section id="seo-geo" className="pt-10 pb-12 lg:pt-14 lg:pb-14 border-b border-white/5 relative bg-[#060910]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-10 sm:mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <EditableText
              value={geo.kicker}
              onChange={(val) => updateGeoExplainer({ kicker: val })}
              label="Kicker sekce SEO a GEO"
            />
          </div>
          <EditableText
            as="h2"
            value={geo.headline}
            onChange={(val) => updateGeoExplainer({ headline: val })}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display text-balance"
            label="Nadpis sekce SEO a GEO"
          />
          <EditableText
            as="p"
            multiline
            value={geo.subheadline}
            onChange={(val) => updateGeoExplainer({ subheadline: val })}
            className="text-base sm:text-lg text-slate-300 text-balance leading-relaxed"
            label="Perex sekce SEO a GEO"
          />
        </div>

        {/* Comparison Grid: Single Master Wave Permeating Both SEO & GEO in Height and Width */}
        <div ref={comparisonGridRef} className="relative mb-16 rounded-2xl overflow-hidden p-1 sm:p-2">
          {/* Master Liquid Wave Background: Permeates through both cards */}
          <div 
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
            aria-hidden="true"
          >
            {/* Primary master water swell */}
            <div 
              ref={unifiedWaveRef}
              className="absolute -inset-x-12 h-[460px] pointer-events-none will-change-transform transition-transform duration-150 ease-out"
              style={{
                top: '0px',
                transform: 'translate3d(0, -320px, 0)',
              }}
            >
              <div className="w-full h-full animate-liquid-1 relative">
                {/* Glowing liquid water body: Emerald -> Teal -> Cyan -> Blue */}
                <svg viewBox="0 0 1200 460" preserveAspectRatio="none" className="w-full h-full filter blur-xl">
                  <defs>
                    <linearGradient id="masterWaterGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#047857" stopOpacity="0.12" />
                      <stop offset="25%" stopColor="#10B981" stopOpacity="0.50" />
                      <stop offset="50%" stopColor="#14B8A6" stopOpacity="0.55" />
                      <stop offset="75%" stopColor="#06B6D4" stopOpacity="0.52" />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity="0.16" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M-50,110 C150,40 350,180 600,105 C850,30 1050,170 1250,105 L1250,460 L-50,460 Z" 
                    fill="url(#masterWaterGrad1)" 
                  />
                </svg>
                {/* Translucent water surface shimmer */}
                <svg viewBox="0 0 1200 460" preserveAspectRatio="none" className="w-full h-full absolute inset-0 filter blur-sm opacity-65">
                  <defs>
                    <linearGradient id="masterWaterSurface1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
                      <stop offset="30%" stopColor="#34D399" stopOpacity="0.80" />
                      <stop offset="50%" stopColor="#2DD4BF" stopOpacity="0.90" />
                      <stop offset="70%" stopColor="#67E8F9" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.25" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M-50,110 C150,40 350,180 600,105 C850,30 1050,170 1250,105" 
                    fill="none" 
                    stroke="url(#masterWaterSurface1)" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                  />
                </svg>
              </div>
            </div>

            {/* Secondary liquid water wave following behind */}
            <div 
              ref={unifiedSecondaryWaveRef}
              className="absolute -inset-x-12 h-[400px] pointer-events-none will-change-transform transition-transform duration-150 ease-out"
              style={{
                top: '0px',
                transform: 'translate3d(0, -440px, 0)',
              }}
            >
              <div className="w-full h-full animate-liquid-2 relative">
                {/* Deeper liquid layer */}
                <svg viewBox="0 0 1200 460" preserveAspectRatio="none" className="w-full h-full filter blur-xl">
                  <defs>
                    <linearGradient id="masterWaterGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#065F46" stopOpacity="0.08" />
                      <stop offset="35%" stopColor="#059669" stopOpacity="0.38" />
                      <stop offset="50%" stopColor="#0D9488" stopOpacity="0.42" />
                      <stop offset="75%" stopColor="#0284C7" stopOpacity="0.40" />
                      <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.10" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M-50,140 C180,70 380,210 600,135 C820,60 1020,190 1250,125 L1250,460 L-50,460 Z" 
                    fill="url(#masterWaterGrad2)" 
                  />
                </svg>
                {/* Delicate water ripple line */}
                <svg viewBox="0 0 1200 460" preserveAspectRatio="none" className="w-full h-full absolute inset-0 filter blur-sm opacity-50">
                  <defs>
                    <linearGradient id="masterWaterSurface2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#059669" stopOpacity="0.15" />
                      <stop offset="40%" stopColor="#2DD4BF" stopOpacity="0.70" />
                      <stop offset="75%" stopColor="#38BDF8" stopOpacity="0.70" />
                      <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.15" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M-50,140 C180,70 380,210 600,135 C820,60 1020,190 1250,125" 
                    fill="none" 
                    stroke="url(#masterWaterSurface2)" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Cards Grid: Frosted glass letting the master wave permeate through both cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
            
            {/* Classic SEO Box */}
            <div 
              ref={seoCardRef}
              className="rounded-xl bg-[#0B101D]/80 backdrop-blur-xl p-6 sm:p-8 relative flex flex-col justify-between transition-colors duration-300 shadow-xl"
              style={{
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(16, 185, 129, 0.22)',
              }}
            >
              <div className="space-y-6 relative z-10">
              {/* 1. Hlavička (ikona + nadpis + podtitulek) */}
              <div className="pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                    <Search className="h-5 w-5" />
                  </div>
                  <div>
                    <EditableText
                      as="h3"
                      value={geo.seoCardTitle}
                      onChange={(val) => updateGeoExplainer({ seoCardTitle: val })}
                      className="text-lg font-bold text-white block font-heading tracking-tight leading-normal overflow-visible pb-0.5"
                      label="Název karty SEO"
                    />
                    <div className="text-xs text-emerald-400 mt-0.5 leading-normal overflow-visible">
                      <EditableText
                        value={geo.seoCardSubtitle || 'Pevný a čistý základ pro vyhledávače'}
                        onChange={(val) => updateGeoExplainer({ seoCardSubtitle: val })}
                        className="leading-normal overflow-visible"
                        label="Podtitulek karty SEO"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Popisný text */}
              <EditableText
                as="p"
                multiline
                value={geo.seoCardDesc}
                onChange={(val) => updateGeoExplainer({ seoCardDesc: val })}
                className="text-sm text-slate-300 leading-relaxed block"
                label="Popis karty SEO"
              />

              {/* 3. Seznam klíčových bodů s fajfkami */}
              <div className="space-y-3 text-xs text-slate-300">
                {seoBullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <EditableText
                      value={bullet}
                      onChange={(val) => {
                        const newB = [...seoBullets];
                        newB[bIdx] = val;
                        updateGeoExplainer({ seoCardBullets: newB });
                      }}
                      label={`SEO bod #${bIdx + 1}`}
                      className="leading-relaxed"
                    />
                  </div>
                ))}
              </div>

              {/* 4. Štítek (✓ V ceně webu) */}
              <div className="pt-1">
                <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 text-xs font-mono font-semibold shadow-sm shadow-emerald-500/10">
                  <Check className="h-3.5 w-3.5 text-emerald-400 stroke-[2.5]" />
                  <EditableText
                    value={geo.seoCardBadge || 'V ceně webu'}
                    onChange={(val) => updateGeoExplainer({ seoCardBadge: val })}
                    label="Štítek karty SEO"
                  />
                </div>
              </div>
            </div>

            {/* 5. Spodní poznámka oddělená tenkou linkou */}
            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-slate-400 italic relative z-10">
              <EditableText
                value={geo.seoCardNote || 'Upřímnost: Špičkový kód je pro úspěch v Googlu nutnost, ale není to kouzelná hůlka. O pozicích rozhoduje i váš obor a obsah.'}
                onChange={(val) => updateGeoExplainer({ seoCardNote: val })}
                label="SEO poznámka"
              />
            </div>
          </div>

          {/* GEO Box */}
          <div 
            ref={geoCardRef}
            className="rounded-xl bg-[#0B101D]/80 backdrop-blur-xl p-6 sm:p-8 relative flex flex-col justify-between transition-colors duration-300 shadow-xl"
            style={{
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(6, 182, 212, 0.22)',
            }}
          >
            <div className="space-y-6 relative z-10">
              {/* 1. Hlavička (ikona + nadpis + podtitulek) */}
              <div className="pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <EditableText
                      as="h3"
                      value={geo.geoCardTitle}
                      onChange={(val) => updateGeoExplainer({ geoCardTitle: val })}
                      className="text-lg font-bold text-white block font-heading tracking-tight leading-normal overflow-visible pb-0.5"
                      label="Název karty GEO"
                    />
                    <div className="text-xs text-cyan-400 mt-0.5 leading-normal overflow-visible">
                      <EditableText
                        value={geo.geoCardSubtitle || 'Správný formát pro AI'}
                        onChange={(val) => updateGeoExplainer({ geoCardSubtitle: val })}
                        className="leading-normal overflow-visible"
                        label="Podtitulek karty GEO"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Popisný text */}
              <EditableText
                as="p"
                multiline
                value={geo.geoCardDesc}
                onChange={(val) => updateGeoExplainer({ geoCardDesc: val })}
                className="text-sm text-slate-300 leading-relaxed block"
                label="Popis karty GEO"
              />

              {/* 3. Seznam klíčových bodů s fajfkami */}
              <div className="space-y-3 text-xs text-slate-300">
                {geoBullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <EditableText
                      value={bullet}
                      onChange={(val) => {
                        const newB = [...geoBullets];
                        newB[bIdx] = val;
                        updateGeoExplainer({ geoCardBullets: newB });
                      }}
                      label={`GEO bod #${bIdx + 1}`}
                      className="leading-relaxed"
                    />
                  </div>
                ))}
              </div>

              {/* 4. Štítek (Nová éra) */}
              <div className="pt-1">
                <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-cyan-500/15 border border-cyan-500/35 text-cyan-300 text-xs font-mono font-semibold shadow-sm shadow-cyan-500/10">
                  <EditableText
                    value={geo.geoCardBadge || 'Nová éra'}
                    onChange={(val) => updateGeoExplainer({ geoCardBadge: val })}
                    label="Štítek karty GEO"
                  />
                </div>
              </div>
            </div>

            {/* 5. Spodní poznámka oddělená tenkou linkou */}
            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-slate-400 italic relative z-10">
              <EditableText
                value={geo.geoCardNote || 'Statistika: Už přes 25 % objemu vyhledávání dnes přebírají AI asistenti a přes 50 % lidí se ptá konverzačně. Do budoucna tento podíl ještě dramaticky poroste.'}
                onChange={(val) => updateGeoExplainer({ geoCardNote: val })}
                label="GEO poznámka"
              />
            </div>
          </div>

        </div>
      </div>

        {/* Interactive Real-World Case Simulator */}
        <div className="rounded-xl border border-white/10 bg-[#0B101D] p-6 lg:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider block">
              <EditableText
                value={geo.simulatorKicker || 'Příklady z reálné praxe'}
                onChange={(val) => updateGeoExplainer({ simulatorKicker: val })}
                label="Kicker simulátoru"
              />
            </span>
            <EditableText
              as="h3"
              value={geo.simulatorTitle || 'Jak AI vyhodnocuje weby, když se jí zákazník zeptá'}
              onChange={(val) => updateGeoExplainer({ simulatorTitle: val })}
              className="text-xl font-bold text-white font-display block"
              label="Titulek simulátoru"
            />
            <EditableText
              as="p"
              value={geo.simulatorSubtitle || 'Když se člověk ptá v ChatGPT nebo Perplexity na konkrétní službu, model nerozhoduje podle hezkých obrázků. Hledá ověřitelná data. Podívejte se na rozdíl mezi webem plným obecných frází a webem, kde má AI všechna fakta přesně tak, jak potřebuje, aby vás mohla doporučit.'}
              onChange={(val) => updateGeoExplainer({ simulatorSubtitle: val })}
              className="text-xs text-slate-400 block"
              label="Podtitulek simulátoru"
            />
          </div>

          {/* Industry case selector tabs */}
          <div className="flex flex-wrap gap-2 pt-1">
            {queries.map((q, idx) => (
              <button
                key={q.id || idx}
                type="button"
                onClick={() => setSelectedQueryIndex(idx)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                  selectedQueryIndex === idx
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                <EditableText
                  value={q.label || q.query}
                  onChange={(val) => {
                    const newQueries = [...queries];
                    newQueries[idx] = { ...newQueries[idx], label: val };
                    updateGeoExplainer({ simulatorQueries: newQueries });
                  }}
                  label={`Záložka #${idx + 1}`}
                />
              </button>
            ))}
          </div>

          {/* Prompt mockup box */}
          <div className="rounded-lg bg-black/50 border border-white/10 p-4 space-y-1.5">
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>{simLabels.promptHeader}</span>
            </div>
            <div className="text-sm sm:text-base text-cyan-100 font-medium font-sans">
              <EditableText
                value={currentQuery.query}
                onChange={(val) => updateCurrentQuery({ query: val })}
                label="Dotaz zákazníka do AI"
              />
            </div>
          </div>

          {/* Results display: Old web vs Admatsu GEO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
            {/* Classic Old Web */}
            <div className="p-5 rounded-lg bg-rose-950/20 border border-rose-500/25 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center pb-2 border-b border-rose-500/15">
                  <div className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                    <X className="h-3.5 w-3.5 text-rose-400 shrink-0 stroke-[2.5]" />
                    <span>{simLabels.classicHeader}</span>
                  </div>
                </div>
                <div className="text-xs font-semibold text-slate-200">
                  <EditableText
                    value={currentQuery.classicTitle}
                    onChange={(val) => updateCurrentQuery({ classicTitle: val })}
                    label="Starý web: Titulek"
                  />
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  <EditableText
                    as="p"
                    multiline
                    value={currentQuery.classicSnippet}
                    onChange={(val) => updateCurrentQuery({ classicSnippet: val })}
                    label="Starý web: Popis"
                  />
                </div>
              </div>
              <div className="pt-3 border-t border-rose-500/15 text-[11px] text-rose-300/90 font-medium">
                <EditableText
                  value={currentQuery.classicLimitation}
                  onChange={(val) => updateCurrentQuery({ classicLimitation: val })}
                  label="Starý web: Výsledek"
                />
              </div>
            </div>

            {/* AI Response with GEO */}
            <div className="p-5 rounded-lg bg-cyan-950/20 border border-cyan-500/35 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center pb-2 border-b border-cyan-500/15">
                  <div className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                    <Bot className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <EditableText
                      value={currentQuery.aiEngine}
                      onChange={(val) => updateCurrentQuery({ aiEngine: val })}
                      label="AI odpověď: Název enginu"
                    />
                  </div>
                </div>
                <div className="text-xs text-slate-100 leading-relaxed font-sans bg-black/40 p-3 rounded-lg border border-white/5">
                  <EditableText
                    as="p"
                    multiline
                    value={currentQuery.aiAnswer}
                    onChange={(val) => updateCurrentQuery({ aiAnswer: val })}
                    label="AI odpověď: Text odpovědi"
                  />
                </div>
              </div>
              <div className="pt-2 border-t border-cyan-500/15 flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-cyan-400 font-mono text-[10px]">
                  <EditableText
                    value={currentQuery.citations}
                    onChange={(val) => updateCurrentQuery({ citations: val })}
                    label="AI odpověď: Citace / Zdroje"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { ArrowRight, Check, Zap, Award, Sparkles, Code2, Palette } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { EditableText } from './cms/EditableText';

interface HeroProps {
  onOpenConsultation: () => void;
  onExploreComparison: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onExploreComparison }) => {
  const { content, updateHero, updateContact, isInlineEditing, currentLang } = useCms();

  const heroCardLabels = {
    cs: {
      ready: 'Připraveno',
      speedTitle: 'Maximální rychlost načítání',
      speedDesc: 'Web se načte do 1 vteřiny i na pomalém mobilním připojení. Žádné čekání a odcházení zákazníků.',
      featFast: 'Blesková odezva',
      featAi: 'Připraveno pro Google i AI',
      featCode: 'Čistý kód na míru',
      featDesign: 'Individuální design na přání',
      footerCustom: 'Kód i design zcela na míru',
    },
    en: {
      ready: 'Live & Ready',
      speedTitle: 'Sub-Second Page Speed',
      speedDesc: 'Webpages load under 1 second even on cellular connections. Zero waiting, zero lost prospects.',
      featFast: 'Instant Response',
      featAi: 'Optimized for Google & AI',
      featCode: 'Pristine Custom Code',
      featDesign: 'Custom Tailored Design',
      footerCustom: '100% Custom Code & Design',
    },
    de: {
      ready: 'Bereit & Live',
      speedTitle: 'Maximale Ladegeschwindigkeit',
      speedDesc: 'Seiten laden unter 1 Sekunde auch bei mobilem Internet. Kein Warten, keine abspringenden Kunden.',
      featFast: 'Blitzschnelle Reaktion',
      featAi: 'Bereit für Google & KI',
      featCode: 'Sauberer Code nach Maß',
      featDesign: 'Individuelles Design nach Wunsch',
      footerCustom: '100 % Code & Design nach Maß',
    },
  };

  const cardLabels = heroCardLabels[currentLang] || heroCardLabels.cs;

  const stackItems = content.hero.stackItems || [
    { title: 'React 19 & Next.js', desc: 'Blesková odezva a čisté komponenty' },
    { title: 'Typový TypeScript', desc: '100% stabilita bez skrytých chyb' },
    { title: 'Tailwind CSS', desc: 'Responzivní styl na míru bez balastu' },
    { title: 'Globální Edge CDN', desc: 'Dostupnost po celém světě pod 1s' },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-10 lg:pt-16 lg:pb-14 border-b border-white/5">
      {/* Atmospheric glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[250px] bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Proposition & Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Headline (H1) */}
            <div>
              <EditableText
                as="h1"
                multiline
                value={content.hero.headline}
                onChange={(val) => updateHero({ headline: val })}
                label="Hlavní nadpis (H1)"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display text-balance leading-tight sm:leading-[1.18] overflow-visible pb-1"
              />
            </div>

            {/* Subheading */}
            <div>
              <EditableText
                as="p"
                multiline
                value={content.hero.subheadline}
                onChange={(val) => updateHero({ subheadline: val })}
                label="Perex / Podnadpis"
                className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed text-balance"
              />
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={(e) => {
                  if (isInlineEditing) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }
                  onOpenConsultation();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-cyan-400 shadow-lg shadow-cyan-500/15 cursor-pointer active:scale-98"
              >
                <EditableText
                  value={content.hero.primaryCtaText || 'Nezávazná poptávka'}
                  onChange={(val) => updateHero({ primaryCtaText: val })}
                  label="Primární CTA tlačítko"
                />
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  if (isInlineEditing) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }
                  onExploreComparison();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/5 border border-white/10 px-5 py-3 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <EditableText
                  value={content.hero.secondaryCtaText || 'Srovnání se starým webem'}
                  onChange={(val) => updateHero({ secondaryCtaText: val })}
                  label="Sekundární CTA tlačítko"
                />
              </button>
            </div>

            {/* Unboxed metric proof points */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {content.hero.metrics.map((m, idx) => (
                <div key={idx} className="relative">
                  <EditableText
                    value={m.title}
                    onChange={(val) => {
                      const updated = [...content.hero.metrics];
                      updated[idx] = { ...updated[idx], title: val };
                      updateHero({ metrics: updated });
                    }}
                    label={`Metrika #${idx + 1} Titulek`}
                    className={`text-xl font-bold font-display block ${
                      m.highlight ? 'text-cyan-400' : 'text-white'
                    }`}
                  />
                  <EditableText
                    as="p"
                    multiline
                    value={m.description}
                    onChange={(val) => {
                      const updated = [...content.hero.metrics];
                      updated[idx] = { ...updated[idx], description: val };
                      updateHero({ metrics: updated });
                    }}
                    label={`Metrika #${idx + 1} Popis`}
                    className="text-xs text-slate-400 mt-1 block leading-relaxed"
                  />
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Visual Engineering & Performance Card (No duplicate copy!) */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-white/10 bg-[#0B101D] shadow-2xl overflow-hidden">
              
              {/* Window Header with Inspector Controls */}
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-[#080D18]">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                  <span className="ml-2 text-xs font-mono text-slate-400 truncate max-w-[140px] sm:max-w-none">
                    admatsu.engineering
                  </span>
                </div>
              </div>

              {/* Window Body */}
              <div className="p-5 flex flex-col justify-between space-y-4">
                
                {/* Rychlost načítání & Performance */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3.5 p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
                    <div className="h-11 w-11 shrink-0 rounded-full border border-emerald-400/50 bg-emerald-500/15 flex items-center justify-center text-emerald-300 shadow-sm shadow-emerald-500/20">
                      <Award className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-200">
                        {cardLabels.speedTitle}
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                        {cardLabels.speedDesc}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2 text-slate-200">
                      <Zap className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span className="text-[11px] leading-tight font-medium">{cardLabels.featFast}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2 text-slate-200">
                      <Sparkles className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      <span className="text-[11px] leading-tight font-medium">{cardLabels.featAi}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2 text-slate-200">
                      <Code2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span className="text-[11px] leading-tight font-medium">{cardLabels.featCode}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2 text-slate-200">
                      <Palette className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                      <span className="text-[11px] leading-tight font-medium">{cardLabels.featDesign}</span>
                    </div>
                  </div>
                </div>

                {/* Footer of the window */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <EditableText
                      value={content.hero.windowFooterNote || 'Moderní React & Next.js stack'}
                      onChange={(val) => updateHero({ windowFooterNote: val })}
                      label="Patička okna architektury"
                      className="text-slate-300"
                    />
                  </div>
                  <span className="text-cyan-400 font-medium tracking-tight">{cardLabels.footerCustom}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

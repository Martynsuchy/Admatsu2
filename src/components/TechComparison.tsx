import React, { useState, useEffect, useRef } from 'react';
import {
  XCircle,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  MoveRight,
  Sparkles,
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { EditableText } from './cms/EditableText';

interface TechComparisonProps {
  onOpenConsultation: () => void;
}

export const TechComparison: React.FC<TechComparisonProps> = ({ onOpenConsultation }) => {
  const { content, updateTechComparison, isInlineEditing, currentLang } = useCms();
  const data = content.techComparison;
  const containerRef = useRef<HTMLDivElement>(null);

  const comparisonUiLabels = {
    cs: {
      btnOld: '1. Zastaralý web',
      btnModern: '2. Moderní web',
      sliderTooltip: 'Táhněte pro přímé srovnání',
      warningText: '⚠️ Odrazuje klienty a stojí peníze za údržbu',
      scrollPrompt: 'Scrollováním vytlačíte',
      successText: '✨ Bleskový moderní web bez licencí',
    },
    en: {
      btnOld: '1. Outdated Website',
      btnModern: '2. Modern Website',
      sliderTooltip: 'Drag for direct comparison',
      warningText: '⚠️ Drives away clients & incurs costly maintenance',
      scrollPrompt: 'Scroll to push out',
      successText: '✨ Ultra-fast modern web with zero license fees',
    },
    de: {
      btnOld: '1. Veraltete Website',
      btnModern: '2. Moderne Website',
      sliderTooltip: 'Ziehen für direkten Vergleich',
      warningText: '⚠️ Schreckt Kunden ab & verursacht ständige Wartungskosten',
      scrollPrompt: 'Durch Scrollen verdrängen',
      successText: '✨ Blitzschnelle moderne Website ohne Lizenzgebühren',
    },
  };

  const compLabels = comparisonUiLabels[currentLang] || comparisonUiLabels.cs;

  // Scroll progress: 0 (100% old web visible) to 1 (100% modern green web locked in)
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isManualOverride, setIsManualOverride] = useState(false);

  const items = data.items || [];

  // V-Sync synchronized scroll listener using requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      if (isManualOverride || !containerRef.current) {
        ticking = false;
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const totalDist = containerRef.current.scrollHeight - window.innerHeight;

      if (totalDist > 0) {
        const currentScroll = -rect.top;
        const rawProgress = currentScroll / totalDist;
        const clamped = Math.min(Math.max(rawProgress, 0), 1);
        setScrollProgress(clamped);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress();

    const handleResetEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ progress?: number }>;
      const targetP = customEvent.detail?.progress ?? 0;
      setIsManualOverride(true);
      setScrollProgress(targetP);
      setTimeout(() => {
        setIsManualOverride(false);
      }, 1600);
    };
    window.addEventListener('tech-comparison-reset', handleResetEvent);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('tech-comparison-reset', handleResetEvent);
    };
  }, [isManualOverride]);

  // Jump to specific state (0 = old, 1 = new) with smooth scroll
  const handleJumpTo = (targetProgress: number) => {
    if (!containerRef.current) return;
    setIsManualOverride(true);
    setScrollProgress(targetProgress);

    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const totalDist = containerRef.current.scrollHeight - window.innerHeight;
    const targetScrollY = scrollTop + rect.top + targetProgress * totalDist;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });

    setTimeout(() => {
      setIsManualOverride(false);
    }, 700);
  };

  // Interpolation helper for pushing effect
  // Transition happens smoothly between progress 0.12 and 0.88
  const transitionStart = 0.12;
  const transitionEnd = 0.88;
  const t = Math.min(
    Math.max((scrollProgress - transitionStart) / (transitionEnd - transitionStart), 0),
    1
  );

  // High-performance smooth easing curve without layout triggers
  const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  // Red Card GPU transforms: physically ejected to the left with dynamic tilt
  const redTranslateX = (-ease * 140).toFixed(2);
  const redRotate = (-ease * 5).toFixed(2);
  const redScale = (1 - ease * 0.08).toFixed(3);
  const redOpacity = Math.max(0, 1 - ease * 1.6).toFixed(3);

  // Green Card GPU transforms: sweeps in from the right, pushes red card, locks in center
  const greenTranslateX = ((1 - ease) * 140).toFixed(2);
  const greenRotate = ((1 - ease) * 4).toFixed(2);
  const greenScale = (0.94 + ease * 0.06).toFixed(3);
  const greenOpacity = Math.min(1, ease * 1.8).toFixed(3);

  // States for indicators
  const isOldDominant = ease < 0.45;
  const isModernDominant = ease >= 0.55;

  // Active transition rule: NO CSS transition while user is actively scrolling to prevent frame conflicts,
  // smooth 600ms transition only when jumping via click.
  const motionTransition = isManualOverride
    ? 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms ease'
    : 'none';

  return (
    <section
      id="srovnani"
      ref={containerRef}
      className="relative min-h-[200vh] sm:min-h-[220vh] bg-[#05080F] border-b border-white/5 overflow-x-clip"
    >
      {/* Dynamic styling for short viewports (mobile landscape & small tablets) */}
      <style>{`
        @media (max-height: 520px) {
          .comp-inner-wrapper { transform: none !important; }
          .comp-kicker { display: none !important; }
          .comp-viewport { padding-top: 4px !important; padding-bottom: 4px !important; gap: 4px !important; }
          .comp-card { padding: 6px 10px !important; border-radius: 12px !important; }
          .comp-item { padding: 3px 6px !important; gap: 2px !important; }
          .comp-item-title { font-size: 9px !important; line-height: 1.1 !important; }
          .comp-item-text { font-size: 8px !important; line-height: 1.15 !important; white-space: normal !important; overflow: visible !important; }
          .comp-top-bar { padding-bottom: 4px !important; }
          .comp-bottom-bar { padding-top: 5px !important; margin-top: 4px !important; font-size: 8px !important; }
          .comp-cta-btn { padding: 2px 8px !important; font-size: 9px !important; }
          .comp-heading { font-size: 12px !important; line-height: 1.15 !important; }
          .comp-nav-btn { padding: 2px 8px !important; font-size: 9px !important; }
        }
      `}</style>

      {/* 
        Sticky Viewport:
        Pinned below the fixed top navigation bar (top-16 = 64px offset).
        Height is explicitly calc(100svh - 4rem) so nothing is obscured by the navbar.
        Uses `flex flex-col justify-center items-center`:
        Elements are in normal flow with physical gap separation - ZERO OVERLAPPING EVER.
      */}
      <div className="comp-viewport sticky top-16 h-[calc(100svh-4rem)] min-h-[calc(100svh-4rem)] max-h-[calc(100svh-4rem)] w-full flex flex-col justify-center items-center py-2 px-3 sm:px-6 lg:px-8 overflow-hidden z-10 box-border gap-1 sm:gap-2">
        
        {/* Hardware-accelerated background lighting */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 transform-gpu"
          style={{
            background: `radial-gradient(circle at ${30 - ease * 20}% 40%, rgba(244, 63, 94, ${
              (1 - ease) * 0.08
            }), transparent 50%), radial-gradient(circle at ${
              70 - (1 - ease) * 20
            }% 50%, rgba(16, 185, 129, ${ease * 0.1}), transparent 50%)`,
          }}
        />

        {/* Content Wrapper positioned slightly above optical center */}
        <div className="comp-inner-wrapper w-full flex flex-col items-center gap-1 sm:gap-2 -translate-y-1 sm:-translate-y-4 lg:-translate-y-6">
          {/* Section Top Header in Normal Flex Flow */}
          <div className="relative mx-auto max-w-4xl w-full text-center space-y-0.5 sm:space-y-1 z-30 shrink-0">
          <div className="comp-kicker inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-2 py-0.5 text-[9px] sm:text-[10px] font-mono text-cyan-300">
            <Sparkles className="h-2.5 w-2.5 text-cyan-400" />
            <EditableText
              value={data.kicker || 'Srovnání v praxi · Proč zastaralé weby selhávají'}
              onChange={(val) => updateTechComparison({ kicker: val })}
              label="Kicker srovnání"
            />
          </div>

          {/* Full headline with zero truncation */}
          <h2 className="comp-heading text-xs sm:text-base lg:text-xl font-bold tracking-tight text-white font-display px-2 text-balance leading-tight">
            <EditableText
              as="span"
              value={data.headline || 'Rozdíl mezi starým a moderním webem'}
              onChange={(val) => updateTechComparison({ headline: val })}
              label="Nadpis srovnání"
            />
          </h2>

          {/* Interactive Apple-style Navigation Bar */}
          <div className="pt-0.5 flex items-center justify-center gap-1.5 sm:gap-3">
            <button
              type="button"
              onClick={() => handleJumpTo(0)}
              className={`comp-nav-btn px-2.5 py-0.5 sm:py-1 rounded-lg text-[9px] sm:text-xs font-semibold transition-all duration-150 cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                isOldDominant
                  ? 'bg-rose-500/25 border border-rose-500/60 text-rose-300 shadow-sm shadow-rose-500/20'
                  : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <XCircle className="h-3 w-3 text-rose-400 shrink-0" />
              <span>{compLabels.btnOld}</span>
            </button>

            <button
              type="button"
              onClick={() => handleJumpTo(1)}
              className={`comp-nav-btn px-2.5 py-0.5 sm:py-1 rounded-lg text-[9px] sm:text-xs font-semibold transition-all duration-150 cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                isModernDominant
                  ? 'bg-emerald-500/25 border border-emerald-400/60 text-emerald-300 shadow-sm shadow-emerald-500/20'
                  : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
              <span>{compLabels.btnModern}</span>
            </button>
          </div>
        </div>

        {/* 
          Dual-Window Collision Arena:
          In normal flex flow directly AFTER the header with physical gap separation.
          Card 1 (Red) is `relative w-full`, providing the EXACT intrinsic container dimensions.
          Card 2 (Green) is `absolute inset-0 w-full h-full`, perfectly locked into the same box.
        */}
        <div className="relative mx-auto max-w-xl sm:max-w-2xl lg:max-w-3xl w-full shrink-0">
          
          {/* ========================================================================= */}
          {/* WINDOW 1 (RED): OUTDATED OLD WEBSITE - DEFINES INTRINSIC CONTAINER SIZE   */}
          {/* ========================================================================= */}
          <div
            className="comp-card relative w-full rounded-xl sm:rounded-2xl border-2 border-rose-500/50 bg-[#16080E] shadow-2xl shadow-rose-950/70 p-2.5 sm:p-3.5 pb-3 sm:pb-3.5 text-slate-100 will-change-transform transform-gpu z-10 flex flex-col select-none"
            style={{
              transform: `translate3d(${redTranslateX}%, 0, 0) rotate(${redRotate}deg) scale(${redScale})`,
              opacity: Number(redOpacity),
              transition: motionTransition,
              pointerEvents: isOldDominant ? 'auto' : 'none',
            }}
          >
            {/* Window Top bar with mock browser dots */}
            <div className="comp-top-bar flex items-center justify-between pb-1 sm:pb-1.5 border-b border-rose-500/20 shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-rose-500" />
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-amber-500/60" />
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-slate-700" />
                </div>
                <span className="comp-item-title text-[9.5px] sm:text-xs font-mono text-rose-300 font-semibold flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-rose-400 shrink-0" />
                  <EditableText
                    value={data.oldWayLabel || 'Zastaralý web (starý WordPress apod.):'}
                    onChange={(val) => updateTechComparison({ oldWayLabel: val })}
                    label="Štítek starého webu"
                  />
                </span>
              </div>
            </div>

            {/* List of 5 Core Disadvantages in 2 columns */}
            <div className="py-1 sm:py-1.5 grid grid-cols-2 gap-1 sm:gap-1.5 text-xs">
              {items.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className={`comp-item p-1 sm:p-1.5 rounded-lg border border-rose-500/20 bg-rose-950/20 flex flex-col justify-start gap-0.5 ${
                    idx === 4 ? 'col-span-2' : ''
                  }`}
                >
                  <div className="comp-item-title flex items-center gap-1 text-rose-400 font-semibold font-display text-[9px] sm:text-[10.5px] leading-tight">
                    <XCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0 text-rose-400" />
                    <span>{item.area}</span>
                  </div>
                  <EditableText
                    as="p"
                    value={item.oldWay}
                    onChange={(val) => {
                      const newItems = [...items];
                      newItems[idx] = { ...newItems[idx], oldWay: val };
                      updateTechComparison({ items: newItems });
                    }}
                    className="comp-item-text text-slate-300 leading-snug block text-[8.5px] sm:text-[9.5px] md:text-[10px] whitespace-normal break-words"
                    label={`Starý web: ${item.area}`}
                  />
                </div>
              ))}
            </div>

            {/* Bottom ejection banner */}
            <div className="comp-bottom-bar mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 pb-0.5 border-t border-rose-500/20 flex items-center justify-between text-[8px] sm:text-[9.5px] text-rose-300/90 font-mono shrink-0">
              <span className="break-words">{compLabels.warningText}</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-slate-400 shrink-0">
                <span>{compLabels.scrollPrompt}</span>
                <MoveRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 animate-pulse" />
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* WINDOW 2 (GREEN): MODERN ADMATSU STANDARD - SWOOPS IN OVER RED CARD       */}
          {/* ========================================================================= */}
          <div
            className="comp-card absolute inset-0 w-full h-full rounded-xl sm:rounded-2xl border-2 border-emerald-400 bg-[#061718] shadow-2xl shadow-emerald-500/25 p-2.5 sm:p-3.5 pb-3 sm:pb-3.5 text-slate-100 will-change-transform transform-gpu z-20 flex flex-col select-none"
            style={{
              transform: `translate3d(${greenTranslateX}%, 0, 0) rotate(${greenRotate}deg) scale(${greenScale})`,
              opacity: Number(greenOpacity),
              transition: motionTransition,
              pointerEvents: isModernDominant ? 'auto' : 'none',
            }}
          >
            {/* Window Top bar with modern green dots */}
            <div className="comp-top-bar flex items-center justify-between pb-1 sm:pb-1.5 border-b border-emerald-500/25 shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-cyan-400" />
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-indigo-400" />
                </div>
                <span className="comp-item-title text-[9.5px] sm:text-xs font-mono text-emerald-300 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                  <EditableText
                    value={data.admatsuLabel || 'Moderní web:'}
                    onChange={(val) => updateTechComparison({ admatsuLabel: val })}
                    label="Štítek standardu"
                  />
                </span>
              </div>
            </div>

            {/* List of 5 Core Admatsu Advantages in 2 columns */}
            <div className="py-1 sm:py-1.5 grid grid-cols-2 gap-1 sm:gap-1.5 text-xs">
              {items.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className={`comp-item p-1 sm:p-1.5 rounded-lg border border-emerald-500/35 bg-emerald-950/30 flex flex-col justify-start gap-0.5 ${
                    idx === 4 ? 'col-span-2' : ''
                  }`}
                >
                  <div className="comp-item-title flex items-center gap-1 text-emerald-300 font-semibold font-display text-[9px] sm:text-[10.5px] leading-tight">
                    <CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0 text-emerald-400" />
                    <span>{item.area}</span>
                  </div>
                  <EditableText
                    as="p"
                    value={item.admatsuWay}
                    onChange={(val) => {
                      const newItems = [...items];
                      newItems[idx] = { ...newItems[idx], admatsuWay: val };
                      updateTechComparison({ items: newItems });
                    }}
                    className="comp-item-text text-emerald-100 leading-snug block text-[8.5px] sm:text-[9.5px] md:text-[10px] font-medium whitespace-normal break-words"
                    label={`Moderní standard: ${item.area}`}
                  />
                </div>
              ))}
            </div>

            {/* Bottom confirmation action */}
            <div className="comp-bottom-bar mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 pb-0.5 border-t border-emerald-500/20 flex items-center justify-between gap-1.5 text-xs shrink-0">
              <span className="text-emerald-300 font-mono text-[8px] sm:text-[9.5px] text-left break-words">
                {compLabels.successText}
              </span>

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
                className="comp-cta-btn inline-flex items-center justify-center gap-1 rounded-lg bg-emerald-400 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8.5px] sm:text-[10px] font-bold text-slate-950 transition-all hover:bg-emerald-300 shrink-0 cursor-pointer shadow-md shadow-emerald-500/20 active:scale-98"
              >
                <EditableText
                  value={data.ctaButtonText || 'Nezávazná konzultace'}
                  onChange={(val) => updateTechComparison({ ctaButtonText: val })}
                  label="Tlačítko CTA srovnání"
                />
                <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              </button>
            </div>
          </div>

        </div>
        {/* End of comp-inner-wrapper */}
        </div>

      </div>
    </section>
  );
};

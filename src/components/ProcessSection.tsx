import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { EditableText } from './cms/EditableText';

interface ProcessSectionProps {
  onOpenConsultation: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenConsultation }) => {
  const { content, updateProcessSection, isInlineEditing } = useCms();
  const proc = content.processSection;

  return (
    <section id="proces" className="pt-10 pb-12 lg:pt-14 lg:pb-14 border-b border-white/5 relative bg-[#060910]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-10 sm:mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <EditableText
              value={proc.kicker}
              onChange={(val) => updateProcessSection({ kicker: val })}
              label="Kicker sekce Proces"
            />
          </div>
          <EditableText
            as="h2"
            value={proc.headline}
            onChange={(val) => updateProcessSection({ headline: val })}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display text-balance"
            label="Nadpis sekce Proces"
          />
          <EditableText
            as="p"
            multiline
            value={proc.subheadline}
            onChange={(val) => updateProcessSection({ subheadline: val })}
            className="text-base sm:text-lg text-slate-300 text-balance leading-relaxed"
            label="Perex sekce Proces"
          />
        </div>

        {/* Steps List */}
        <div className="space-y-6">
          {proc.steps.map((step, idx) => (
            <div
              key={step.id}
              className="rounded-xl border border-white/10 bg-[#0B101D] p-6 lg:p-8 hover:border-cyan-500/30 transition-colors"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Step number and duration */}
                <div className="lg:col-span-3 flex lg:flex-col justify-between lg:justify-start items-center lg:items-start gap-2">
                  <EditableText
                    value={step.num}
                    onChange={(val) => {
                      const newSteps = [...proc.steps];
                      newSteps[idx] = { ...newSteps[idx], num: val };
                      updateProcessSection({ steps: newSteps });
                    }}
                    className="text-2xl font-bold text-cyan-400 font-mono"
                    label={`Číslo kroku #${idx + 1}`}
                  />
                  <EditableText
                    value={step.duration}
                    onChange={(val) => {
                      const newSteps = [...proc.steps];
                      newSteps[idx] = { ...newSteps[idx], duration: val };
                      updateProcessSection({ steps: newSteps });
                    }}
                    className="text-xs font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded border border-white/5"
                    label={`Doba trvání kroku #${idx + 1}`}
                  />
                </div>

                {/* Step details */}
                <div className="lg:col-span-5 space-y-2">
                  <EditableText
                    as="h3"
                    value={step.title}
                    onChange={(val) => {
                      const newSteps = [...proc.steps];
                      newSteps[idx] = { ...newSteps[idx], title: val };
                      updateProcessSection({ steps: newSteps });
                    }}
                    className="text-xl font-bold text-white font-heading tracking-tight leading-normal overflow-visible pb-1 block"
                    label={`Název kroku #${idx + 1}`}
                  />
                  <EditableText
                    as="p"
                    multiline
                    value={step.description}
                    onChange={(val) => {
                      const newSteps = [...proc.steps];
                      newSteps[idx] = { ...newSteps[idx], description: val };
                      updateProcessSection({ steps: newSteps });
                    }}
                    className="text-sm text-slate-300 leading-relaxed"
                    label={`Popis kroku #${idx + 1}`}
                  />
                </div>

                {/* Deliverables */}
                <div className="lg:col-span-4 bg-white/5 p-4 rounded-lg border border-white/5 space-y-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    <EditableText
                      value={proc.deliverablesLabel || 'Výstupy této fáze:'}
                      onChange={(val) => updateProcessSection({ deliverablesLabel: val })}
                      label="Titulek výstupů fáze"
                    />
                  </div>
                  {step.deliverables.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      <EditableText
                        value={d}
                        onChange={(val) => {
                          const newSteps = [...proc.steps];
                          const newDeliverables = [...newSteps[idx].deliverables];
                          newDeliverables[dIdx] = val;
                          newSteps[idx] = { ...newSteps[idx], deliverables: newDeliverables };
                          updateProcessSection({ steps: newSteps });
                        }}
                        label={`Výstup fáze #${dIdx + 1}`}
                      />
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA block */}
        <div className="mt-12 p-8 rounded-xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/20 via-[#0B101D] to-indigo-950/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <EditableText
              as="h3"
              value={proc.ctaTitle || 'Chcete vyměnit zastaralý web za moderní řešení?'}
              onChange={(val) => updateProcessSection({ ctaTitle: val })}
              className="text-xl font-bold text-white font-heading tracking-tight leading-normal overflow-visible pb-0.5 block"
              label="Titulek CTA procesu"
            />
            <EditableText
              as="p"
              value={proc.ctaSubtitle || 'Napište nám. Probereme vaše představy a navrhneme férové řešení.'}
              onChange={(val) => updateProcessSection({ ctaSubtitle: val })}
              className="text-xs sm:text-sm text-slate-300 block"
              label="Perex CTA procesu"
            />
          </div>
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
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-xs font-semibold text-slate-950 transition-colors hover:bg-cyan-400 shrink-0 cursor-pointer"
          >
            <EditableText
              value={proc.ctaButtonText || 'Nezávazně poptat nový web'}
              onChange={(val) => updateProcessSection({ ctaButtonText: val })}
              label="Tlačítko CTA procesu"
            />
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

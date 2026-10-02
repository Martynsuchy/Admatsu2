import React from 'react';
import { Globe, Search, Bot, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { EditableText } from './cms/EditableText';

interface ServicesProps {
  onOpenConsultation: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenConsultation }) => {
  const { content, updateServicesSection, updateService, updateContact, isInlineEditing } = useCms();

  return (
    <section id="sluzby" className="pt-10 pb-12 lg:pt-14 lg:pb-16 border-b border-white/5 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-10 sm:mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <EditableText
              value={content.servicesSection.kicker}
              onChange={(val) => updateServicesSection({ kicker: val })}
              label="Kicker sekce"
            />
            <span aria-hidden="true">·</span>
            <span>Admatsu</span>
          </div>
          <EditableText
            as="h2"
            value={content.servicesSection.headline}
            onChange={(val) => updateServicesSection({ headline: val })}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display text-balance"
            label="Nadpis sekce Služby"
          />
          <EditableText
            as="p"
            multiline
            value={content.servicesSection.subheadline}
            onChange={(val) => updateServicesSection({ subheadline: val })}
            className="text-base sm:text-lg text-slate-300 text-balance leading-relaxed"
            label="Perex sekce Služby"
          />
        </div>

        {/* 3 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.services.map((srv, idx) => {
            const Icon = idx === 0 ? Globe : idx === 1 ? Search : Bot;

            return (
              <div
                key={srv.id}
                className="rounded-xl border border-white/10 bg-[#0B101D] p-6 sm:p-8 flex flex-col justify-between hover:border-cyan-500/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <EditableText
                      value={srv.tag}
                      onChange={(val) => updateService(srv.id, { tag: val })}
                      className="text-sm font-mono text-cyan-400 font-semibold leading-normal overflow-visible pb-0.5 inline-block"
                      label={`Tag služby (${srv.title})`}
                    />
                    <Icon className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                  </div>

                  <EditableText
                    as="h3"
                    value={srv.title}
                    onChange={(val) => updateService(srv.id, { title: val })}
                    className="text-2xl font-bold text-white font-heading tracking-tight leading-normal overflow-visible pb-1 block"
                    label={`Název služby`}
                  />

                  <EditableText
                    as="p"
                    multiline
                    value={srv.shortDesc}
                    onChange={(val) => updateService(srv.id, { shortDesc: val })}
                    className="text-sm text-slate-300 leading-relaxed"
                    label={`Popis služby (${srv.title})`}
                  />

                  {srv.bulletPoints && srv.bulletPoints.length > 0 && (
                    <div className="pt-2 space-y-2.5 text-xs text-slate-300">
                      {srv.bulletPoints.map((bp, bidx) => (
                        <div key={bidx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                          <EditableText
                            value={bp}
                            onChange={(val) => {
                              const newPoints = [...srv.bulletPoints];
                              newPoints[bidx] = val;
                              updateService(srv.id, { bulletPoints: newPoints });
                            }}
                            className="leading-snug text-slate-300"
                            label={`Bod výhody #${bidx + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 min-h-[36px]">
                  <EditableText
                    value={srv.priceNote || 'Dodání: 7–14 dní'}
                    onChange={(val) => updateService(srv.id, { priceNote: val })}
                    className="text-xs text-cyan-400/90 font-mono font-medium leading-normal overflow-visible pb-0.5 inline-block"
                    label="Cenová poznámka pod kartou"
                  />
                  {idx === 2 && srv.buttonText && (
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
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <EditableText
                        value={srv.buttonText || 'Nezávazně poptat'}
                        onChange={(val) => updateService(srv.id, { buttonText: val })}
                        label={`Tlačítko v kartě (${srv.title})`}
                      />
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

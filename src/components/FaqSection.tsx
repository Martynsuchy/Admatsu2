import React, { useState } from 'react';
import { ChevronDown, Eye } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { EditableText } from './cms/EditableText';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [expandAll, setExpandAll] = useState(false);
  const { content, updateFaqSection, updateFaq, isInlineEditing } = useCms();

  const faqSec = content.faqSection;
  const faqs = content.faq;

  return (
    <section id="faq" className="pt-10 pb-12 lg:pt-14 lg:pb-14 border-b border-white/5 relative bg-[#070B14]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <EditableText
              value={faqSec.kicker}
              onChange={(val) => updateFaqSection({ kicker: val })}
              label="Kicker sekce FAQ"
            />
          </div>
          <EditableText
            as="h2"
            value={faqSec.headline}
            onChange={(val) => updateFaqSection({ headline: val })}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display text-balance"
            label="Nadpis sekce FAQ"
          />
          <EditableText
            as="p"
            multiline
            value={faqSec.subheadline}
            onChange={(val) => updateFaqSection({ subheadline: val })}
            className="text-base text-slate-300 max-w-2xl mx-auto"
            label="Perex sekce FAQ"
          />

          {isInlineEditing && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setExpandAll(!expandAll)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400/20 text-amber-300 text-xs font-semibold hover:bg-amber-400/30 transition-colors cursor-pointer"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>{expandAll ? 'Sbalit otázky' : 'Rozbalit všechny odpovědi pro úpravu'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = expandAll || openIndex === idx;
            return (
              <div
                key={faq.id}
                className="rounded-xl border border-white/10 bg-[#0B101D] overflow-hidden transition-colors"
              >
                <div
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer"
                  onClick={() => {
                    if (!expandAll) {
                      setOpenIndex(isOpen ? null : idx);
                    }
                  }}
                >
                  <div className="flex-1 pr-4">
                    <EditableText
                      as="span"
                      value={faq.question}
                      onChange={(val) => updateFaq(faq.id, { question: val })}
                      className="text-base sm:text-lg font-bold text-white font-sans tracking-tight leading-normal overflow-visible pb-0.5 block"
                      label={`Otázka #${idx + 1}`}
                    />
                  </div>
                  <div
                    className={`h-7 w-7 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-cyan-400 bg-cyan-500/10' : ''
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-white/5">
                    <EditableText
                      as="p"
                      multiline
                      value={faq.answer}
                      onChange={(val) => updateFaq(faq.id, { answer: val })}
                      label={`Odpověď #${idx + 1}`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

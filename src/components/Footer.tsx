import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { EditableText } from './cms/EditableText';
import { LegalModal, LegalDocType } from './LegalModal';
import { scrollToTarget } from '../utils/scrollHelper';
import { Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = 2026;
  const { content, updateFooter, updateContact, isInlineEditing, currentLang, setIsLoginModalOpen, isAuthenticated } = useCms();
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalDocType>('privacy');

  const navLinksByLang = {
    cs: [
      { label: 'Služby & modernizace webů', href: '#sluzby' },
      { label: 'Srovnání zastaralý vs. moderní web', href: '#srovnani' },
      { label: 'Technické SEO a GEO', href: '#seo-geo' },
      { label: 'Jak probíhá spolupráce', href: '#proces' },
      { label: 'Kalkulačka ceny webu', href: '#kalkulacka' },
      { label: 'Časté dotazy (FAQ)', href: '#faq' },
      { label: 'Nezávazný kontakt', href: '#kontakt' },
    ],
    en: [
      { label: 'Services & Web Modernization', href: '#sluzby' },
      { label: 'Outdated vs. Modern Web', href: '#srovnani' },
      { label: 'Technical SEO & GEO', href: '#seo-geo' },
      { label: 'Development Process', href: '#proces' },
      { label: 'Price Calculator', href: '#kalkulacka' },
      { label: 'Frequently Asked Questions', href: '#faq' },
      { label: 'Free Consultation', href: '#kontakt' },
    ],
    de: [
      { label: 'Leistungen & Modernisierung', href: '#sluzby' },
      { label: 'Veraltete vs. moderne Website', href: '#srovnani' },
      { label: 'Technisches SEO & GEO', href: '#seo-geo' },
      { label: 'Entwicklungsablauf', href: '#proces' },
      { label: 'Preiskalkulator', href: '#kalkulacka' },
      { label: 'Häufig gestellte Fragen (FAQ)', href: '#faq' },
      { label: 'Unverbindliche Anfrage', href: '#kontakt' },
    ],
  };

  const navLinks = navLinksByLang[currentLang] || navLinksByLang.en;

  return (
    <footer className="border-t border-white/10 bg-[#05080E] py-12 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/5">
          
          {/* Brand & Brief */}
          <div className="md:col-span-5 space-y-3">
            <span className="text-xl font-bold tracking-tight text-white font-display block">
              <EditableText
                value={content.contact.companyName}
                onChange={(val) => updateContact({ companyName: val })}
                label="Patička: Název firmy"
              />
            </span>
            <EditableText
              as="p"
              multiline
              value={content.footer.aboutText}
              onChange={(val) => updateFooter({ aboutText: val })}
              className="text-xs text-slate-400 leading-relaxed max-w-sm block"
              label="Patička: O firmě"
            />
            <div className="text-[11px] text-slate-400 font-mono">
              <span>{currentLang === 'de' ? 'Registernummer (IdNr.): ' : currentLang === 'en' ? 'Company ID: ' : 'IČO: '}</span>
              <EditableText
                value={content.contact.ico}
                onChange={(val) => updateContact({ ico: val })}
                label="Patička: IČO"
              />
              <span> · </span>
              <EditableText
                value={content.footer.registryNote || 'Spisová značka C 400085/MSPH vedená u Městského soudu v Praze'}
                onChange={(val) => updateFooter({ registryNote: val })}
                label="Patička: Rejstřík"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              <EditableText
                value={content.footer.linksTitle || 'Rychlé odkazy'}
                onChange={(val) => updateFooter({ linksTitle: val })}
                label="Patička: Titulek odkazů"
              />
            </div>
            <ul className="space-y-1.5 text-xs">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (isInlineEditing) {
                        e.preventDefault();
                        return;
                      }
                      e.preventDefault();
                      scrollToTarget(link.href);
                    }}
                    className="hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              <EditableText
                value={content.footer.contactTitle || 'Kontakt & Sídlo'}
                onChange={(val) => updateFooter({ contactTitle: val })}
                label="Patička: Titulek kontaktu"
              />
            </div>
            <div className="space-y-1 text-xs text-slate-400">
              <div className="text-white font-medium">
                <EditableText
                  value={content.contact.companyName}
                  onChange={(val) => updateContact({ companyName: val })}
                  label="Patička: Firma kontakt"
                />
              </div>
              <div>
                <EditableText
                  value={content.contact.address}
                  onChange={(val) => updateContact({ address: val })}
                  label="Patička: Adresa"
                />
              </div>
              <div>
                <EditableText
                  value={content.contact.city}
                  onChange={(val) => updateContact({ city: val })}
                  label="Patička: Město"
                />
              </div>
              <div className="pt-2">
                <a href={`mailto:${content.contact.email}`} className="text-cyan-400 hover:underline">
                  <EditableText
                    value={content.contact.email}
                    onChange={(val) => updateContact({ email: val })}
                    label="Patička: E-mail"
                  />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Quiet legal notice + subtle login */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            <span>© {currentYear} {content.contact.companyName}. </span>
            <EditableText
              value={content.footer.copyrightNotice}
              onChange={(val) => updateFooter({ copyrightNotice: val })}
              label="Patička copyright"
            />
          </div>

          <div className="flex items-center gap-5 flex-wrap">
            <button
              type="button"
              onClick={() => {
                if (!isInlineEditing) {
                  setLegalModalTab('privacy');
                  setIsLegalModalOpen(true);
                }
              }}
              className="hover:text-cyan-400 underline-offset-4 hover:underline transition-colors cursor-pointer text-left"
            >
              <EditableText
                value={content.footer.privacyText || 'Ochrana osobních údajů'}
                onChange={(val) => updateFooter({ privacyText: val })}
                label="Patička: GDPR"
              />
            </button>
            <button
              type="button"
              onClick={() => {
                if (!isInlineEditing) {
                  setLegalModalTab('terms');
                  setIsLegalModalOpen(true);
                }
              }}
              className="hover:text-cyan-400 underline-offset-4 hover:underline transition-colors cursor-pointer text-left"
            >
              <EditableText
                value={content.footer.termsText || 'Všeobecné obchodní podmínky'}
                onChange={(val) => updateFooter({ termsText: val })}
                label="Patička: Podmínky"
              />
            </button>

            {!isAuthenticated && (
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(true)}
                className="hover:text-cyan-300 transition-colors cursor-pointer inline-flex items-center gap-1.5 text-slate-500 hover:bg-white/5 px-2 py-1 rounded"
                title="Otevřít přihlašovací okno do administrace webu"
              >
                <Lock className="h-3 w-3 text-cyan-400/70" />
                <span>Správa webu</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Interactive Legal Modal */}
      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalModalTab}
      />
    </footer>
  );
};

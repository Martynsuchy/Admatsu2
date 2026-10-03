import React, { useState, useEffect, useMemo } from 'react';
import { Send, CheckCircle2, Mail, MapPin } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { EditableText } from './cms/EditableText';

interface ContactSectionProps {
  preloadedMessage?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preloadedMessage }) => {
  const { content, updateContactSection, updateContact, addInquiry, isInlineEditing, currentLang } = useCms();
  const sec = content.contactSection;
  const contact = content.contact;

  const serviceOptions = useMemo(() => {
    if (currentLang === 'en') {
      return [
        'One-Page Presentation Website',
        'Multi-Page Corporate Website',
        'Complete Legacy Website Rework (Redesign & Speed)',
        'Website with Interactive Client Calculator',
        'Other / Custom Specification',
      ];
    }
    if (currentLang === 'de') {
      return [
        'One-Page Unternehmenswebsite',
        'Mehrseitige Firmenwebsite',
        'Komplettes Relaunch einer veralteten Website (Redesign & Speed)',
        'Website mit interaktivem Kundenkalkulator',
        'Sonstiges / Individuelle Anfrage',
      ];
    }
    return [
      'Jednostránkový prezentační web (One-Page)',
      'Vícestránkový firemní web',
      'Kompletní předělání zastaralého webu (redesign a zrychlení)',
      'Web s interaktivní klientskou kalkulačkou',
      'Jiné / Individuální zadání',
    ];
  }, [currentLang]);

  const formPlaceholders = {
    cs: {
      name: 'Např. Jan Dvořák, Architekti s.r.o.',
      email: 'vas@email.cz',
      url: 'https://vas-stary-web.cz',
      orDirect: 'Nebo nás kontaktujte přímo',
    },
    en: {
      name: 'e.g. John Smith, Apex Media Ltd',
      email: 'john@company.com',
      url: 'https://your-current-site.com',
      orDirect: 'Or contact us directly',
    },
    de: {
      name: 'z. B. Max Mustermann, Müller GmbH',
      email: 'max@unternehmen.de',
      url: 'https://ihre-aktuelle-website.de',
      orDirect: 'Oder kontaktieren Sie uns direkt',
    },
  };

  const ph = formPlaceholders[currentLang] || formPlaceholders.cs;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    existingUrl: '',
    serviceType: 'Jednostránkový prezentační web (One-Page)',
    message: '',
  });

  // Update default serviceType when language changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      serviceType: serviceOptions[0],
    }));
  }, [serviceOptions]);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (preloadedMessage) {
      setFormData((prev) => ({
        ...prev,
        message: preloadedMessage,
      }));
    }
  }, [preloadedMessage]);

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      errors.name =
        currentLang === 'en'
          ? 'Please enter your full name or company.'
          : currentLang === 'de'
          ? 'Bitte geben Sie Ihren Namen oder Firmennamen ein.'
          : 'Zadejte prosím vaše jméno nebo název firmy';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errors.email =
        currentLang === 'en'
          ? 'Please enter a valid email address.'
          : currentLang === 'de'
          ? 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
          : 'Zadejte platnou e-mailovou adresu';
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isInlineEditing) return;

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setIsSubmitting(true);

    addInquiry({
      name: formData.name,
      email: formData.email,
      phone: '',
      existingUrl: formData.existingUrl || undefined,
      serviceType: formData.serviceType,
      message: formData.message || 'Poptávka odeslána z webového formuláře',
      estimatedPrice: 'Dle specifikace',
      notes: 'Odesláno přes hlavní kontaktní formulář na webu.',
      lang: currentLang,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      existingUrl: '',
      serviceType: 'Jednostránkový prezentační web (One-Page)',
      message: '',
    });
  };

  return (
    <section id="kontakt" className="pt-10 pb-16 lg:pt-14 lg:pb-20 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header: Centered on Top */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <EditableText
              value={sec.kicker}
              onChange={(val) => updateContactSection({ kicker: val })}
              label="Kicker kontaktní sekce"
            />
          </div>
          <EditableText
            as="h2"
            value={sec.headline}
            onChange={(val) => updateContactSection({ headline: val })}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display text-balance"
            label="Nadpis kontaktní sekce"
          />
          <EditableText
            as="p"
            multiline
            value={sec.subheadline}
            onChange={(val) => updateContactSection({ subheadline: val })}
            className="text-base text-slate-300 leading-relaxed max-w-2xl mx-auto"
            label="Perex kontaktní sekce"
          />
        </div>

        {/* 1. Nejdřív formulář */}
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-[#0B101D] p-6 sm:p-10 shadow-2xl">
            
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="h-14 w-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <EditableText
                  as="h3"
                  value={sec.successTitle || 'Děkujeme za vaši zprávu!'}
                  onChange={(val) => updateContactSection({ successTitle: val })}
                  className="text-2xl font-bold text-white font-display block"
                  label="Potvrzení: Nadpis"
                />
                <EditableText
                  as="p"
                  multiline
                  value={sec.successDesc || 'Poptávku jsme v pořádku přijali a byla propsána do CMS administrace. Ozveme se vám, abychom nezávazně probrali vaše představy a možnosti řešení.'}
                  onChange={(val) => updateContactSection({ successDesc: val })}
                  className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed block"
                  label="Potvrzení: Popis"
                />
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer"
                  >
                    <EditableText
                      value={sec.resetButtonText || 'Odeslat další dotaz'}
                      onChange={(val) => updateContactSection({ resetButtonText: val })}
                      label="Potvrzení: Tlačítko resetu"
                    />
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-white/10 pb-4">
                  <EditableText
                    as="h3"
                    value={sec.formTitle}
                    onChange={(val) => updateContactSection({ formTitle: val })}
                    className="text-xl font-bold text-white font-display"
                    label="Titulek formuláře"
                  />
                  <EditableText
                    as="p"
                    value={sec.formSubtitle}
                    onChange={(val) => updateContactSection({ formSubtitle: val })}
                    className="text-xs text-slate-400 mt-1"
                    label="Podtitulek formuláře"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      <EditableText
                        value={sec.nameLabel || 'Jméno a příjmení / Firma'}
                        onChange={(val) => updateContactSection({ nameLabel: val })}
                        label="Štítek pole Jméno"
                      /> <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={ph.name}
                      className="w-full rounded-lg bg-black/40 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                    {validationErrors.name && (
                      <p className="text-[11px] text-rose-400 mt-1">{validationErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      <EditableText
                        value={sec.emailLabel || 'E-mailová adresa'}
                        onChange={(val) => updateContactSection({ emailLabel: val })}
                        label="Štítek pole E-mail"
                      /> <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={ph.email}
                      className="w-full rounded-lg bg-black/40 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                    {validationErrors.email && (
                      <p className="text-[11px] text-rose-400 mt-1">{validationErrors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    <EditableText
                      value={sec.urlLabel || 'Odkaz na stávající web (nepovinné)'}
                      onChange={(val) => updateContactSection({ urlLabel: val })}
                      label="Štítek pole Odkaz"
                    />
                  </label>
                  <input
                    type="url"
                    value={formData.existingUrl}
                    onChange={(e) => setFormData({ ...formData, existingUrl: e.target.value })}
                    placeholder={ph.url}
                    className="w-full rounded-lg bg-black/40 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    <EditableText
                      value={sec.serviceTypeLabel || 'Typ projektu / poptávané řešení'}
                      onChange={(val) => updateContactSection({ serviceTypeLabel: val })}
                      label="Štítek pole Typ řešení"
                    />
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full rounded-lg bg-black/40 border border-white/10 px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none cursor-pointer"
                  >
                    {serviceOptions.map((opt: string, idx: number) => (
                      <option key={idx} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    <EditableText
                      value={sec.messageLabel || 'Vaše představa nebo poznámka k projektu'}
                      onChange={(val) => updateContactSection({ messageLabel: val })}
                      label="Štítek pole Zpráva"
                    />
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      currentLang === 'en'
                        ? 'Tell us briefly about your vision, what you expect from the new website, or what issues you are facing with your current solution...'
                        : currentLang === 'de'
                        ? 'Beschreiben Sie uns kurz Ihre Vorstellungen, was Sie von der neuen Website erwarten oder welche Probleme Ihre bestehende Lösung bereitet...'
                        : 'Napište nám stručně, jakou máte představu, co od nového webu očekáváte nebo co vás trápí na stávajícím řešení...'
                    }
                    className="w-full rounded-lg bg-black/40 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={(e) => {
                      if (isInlineEditing) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-6 py-3.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-all cursor-pointer shadow-lg shadow-cyan-500/20 active:scale-98 disabled:opacity-70"
                  >
                    <Send className="h-4 w-4" />
                    <EditableText
                      value={sec.submitButtonText || 'Odeslat nezávaznou poptávku'}
                      onChange={(val) => updateContactSection({ submitButtonText: val })}
                      label="Tlačítko odeslání formuláře"
                    />
                  </button>
                  <div className="text-[11px] text-slate-400 text-center mt-2">
                    <EditableText
                      value={sec.submitSubtext || 'Žádné závazky ani spam. Ozveme se vám s konkrétním návrhem.'}
                      onChange={(val) => updateContactSection({ submitSubtext: val })}
                      label="Podtext pod tlačítkem odeslání"
                    />
                  </div>
                </div>
              </form>
            )}

          </div>
        </div>

        {/* 2. A pak až kontakty */}
        <div className="max-w-3xl mx-auto mt-10 pt-8 border-t border-white/10">
          <div className="text-center mb-6">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              {ph.orDirect}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#0B101D] border border-white/10">
              <Mail className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-slate-400">
                  <EditableText
                    value={sec.directEmailLabel || 'Přímý e-mail:'}
                    onChange={(val) => updateContactSection({ directEmailLabel: val })}
                    label="Štítek e-mailu"
                  />
                </div>
                <EditableText
                  value={contact.email}
                  onChange={(val) => updateContact({ email: val })}
                  className="font-medium text-white hover:text-cyan-300 transition-colors"
                  label="E-mail firmy"
                />
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#0B101D] border border-white/10">
              <MapPin className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-slate-400">
                  <EditableText
                    value={sec.directAddressLabel || 'Sídlo společnosti:'}
                    onChange={(val) => updateContactSection({ directAddressLabel: val })}
                    label="Štítek sídla"
                  />
                </div>
                <EditableText
                  value={contact.companyName}
                  onChange={(val) => updateContact({ companyName: val })}
                  className="font-medium text-white"
                  label="Název firmy"
                />
                <div className="text-xs text-slate-300 mt-0.5">
                  <EditableText
                    value={contact.address}
                    onChange={(val) => updateContact({ address: val })}
                    label="Ulice a číslo"
                  />
                  {', '}
                  <EditableText
                    value={contact.city}
                    onChange={(val) => updateContact({ city: val })}
                    label="Město a PSČ"
                  />
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-1">
                  <EditableText
                    value={sec.directIcoLabel || 'IČO:'}
                    onChange={(val) => updateContactSection({ directIcoLabel: val })}
                    label="Štítek IČO"
                  />{' '}
                  <EditableText
                    value={contact.ico}
                    onChange={(val) => updateContact({ ico: val })}
                    label="IČO firmy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};


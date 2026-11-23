import React, { useState, useEffect, useMemo } from 'react';
import { Send, CheckCircle2, Mail, MapPin } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { EditableText } from './cms/EditableText';
import { ActivePageTab } from './OverviewLanding';

interface ContactSectionProps {
  activePage?: ActivePageTab;
  preloadedMessage?: string;
  preloadedServiceCategory?: 'web' | 'outreach' | 'combined';
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  activePage = 'web',
  preloadedMessage,
  preloadedServiceCategory,
}) => {
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
        'AI B2B Outreach Campaign (1,000–10,000+ Contacts/Mo)',
        'Complete Growth Package: Modern Website + AI Outreach',
        'Other / Custom Specification',
      ];
    }
    if (currentLang === 'de') {
      return [
        'One-Page Unternehmenswebsite',
        'Mehrseitige Firmenwebsite',
        'Komplettes Relaunch einer veralteten Website (Redesign & Speed)',
        'Website mit interaktivem Kundenkalkulator',
        'AI B2B Outreach-Kampagne (1.000–10.000+ Kontakte/Monat)',
        'Komplettpaket: Moderne Website + AI Outreach',
        'Sonstiges / Individuelle Anfrage',
      ];
    }
    return [
      'Jednostránkový prezentační web (One-Page)',
      'Vícestránkový firemní web',
      'Kompletní předělání zastaralého webu (redesign a zrychlení)',
      'Web s interaktivní klientskou kalkulačkou',
      'AI B2B Outreach kampaň (oslovení 1 000–10 000+ kontaktů/měs.)',
      'Kompletní růstový balíček: Moderní web + AI Outreach',
      'Jiné / Individuální zadání',
    ];
  }, [currentLang]);

  const defaultServiceIndex = useMemo(() => {
    if (preloadedServiceCategory === 'outreach' || (!preloadedServiceCategory && activePage === 'outreach')) {
      return 4;
    }
    if (preloadedServiceCategory === 'combined' || (!preloadedServiceCategory && activePage === 'overview')) {
      return 5;
    }
    return 0;
  }, [preloadedServiceCategory, activePage]);

  // Context-aware copy for Overview & AI Outreach tabs (Web tab uses CMS-editable sec values)
  const contextualCopy = useMemo(() => {
    const map = {
      overview: {
        cs: {
          kicker: 'NEZÁVAZNÁ KONZULTACE · WEB & AI OUTREACH',
          headline: 'Ozvěte se nám a proberme moderní web, AI Outreach kampaň nebo obojí.',
          subheadline:
            'Žádné obchodní triky ani nátlak. Společně zhodnotíme, jestli váš růst nejvíce zrychlí nový bleskový web s GEO, škálovatelný AI Outreach na tisíce B2B kontaktů, nebo jejich propojení.',
          formTitle: 'Rychlý poptávkový formulář',
          formSubtitle: 'Vyplnění zabere 1 minutu. Ozveme se vám zpět s konkrétním návrhem postupu.',
          urlLabel: 'Odkaz na web vaší firmy (nepovinné)',
          urlPlaceholder: 'https://vase-firma.cz',
          messageLabel: 'Vaše představa nebo cíle projektu',
          messagePlaceholder:
            'Napište nám stručně, co aktuálně řešíte — zda plánujete nový web či redesign, chcete oslovit tisíce B2B firem přes AI Outreach, nebo obojí dohromady...',
          submitButtonText: 'Odeslat nezávaznou poptávku',
          submitSubtext: 'Žádné závazky ani spam. Ozveme se vám s konkrétním návrhem.',
        },
        en: {
          kicker: 'FREE CONSULTATION · WEB & AI OUTREACH',
          headline: 'Let’s discuss your next-gen website, AI Outreach engine, or both.',
          subheadline:
            'No sales pressure or generic pitches. We will review your goals and recommend whether a high-speed GEO website, scalable AI Outreach to thousands of decision-makers, or a combined growth system fits best.',
          formTitle: 'Quick Inquiry Form',
          formSubtitle: 'Takes less than a minute to complete. We will reply promptly with a concrete plan.',
          urlLabel: 'Your Company Website URL (optional)',
          urlPlaceholder: 'https://your-company.com',
          messageLabel: 'Your project goals, target market, or notes',
          messagePlaceholder:
            'Tell us briefly what you are looking to achieve — whether it is a custom website & GEO upgrade, an AI Outreach campaign reaching 1,000s of B2B contacts, or both...',
          submitButtonText: 'Send Free Inquiry',
          submitSubtext: 'Zero obligations · We will reply with actionable next steps.',
        },
        de: {
          kicker: 'UNVERBINDLICHE BERATUNG · WEB & AI OUTREACH',
          headline: 'Lassen Sie uns Ihre neue Website, AI Outreach oder beides besprechen.',
          subheadline:
            'Keine Verkaufstricks, kein Druck. Wir analysieren gemeinsam, ob eine blitzschnelle GEO-Website, skalierbarer AI Outreach an Tausende B2B-Entscheider oder die Kombination aus beidem den größten Hebel bietet.',
          formTitle: 'Schnelles Anfrageformular',
          formSubtitle: 'In 1 Minute ausgefüllt. Wir melden uns umgehend mit einem konkreten Vorschlag.',
          urlLabel: 'Ihre Unternehmenswebsite (optional)',
          urlPlaceholder: 'https://ihr-unternehmen.de',
          messageLabel: 'Ihre Ziele, Zielgruppe oder Projektnotizen',
          messagePlaceholder:
            'Beschreiben Sie uns kurz Ihr Vorhaben — ob Sie eine moderne Website bzw. ein Redesign planen, Tausende B2B-Kontakte via AI Outreach erreichen möchten oder beides...',
          submitButtonText: 'Unverbindliche Anfrage senden',
          submitSubtext: 'Keinerlei Verpflichtung · Wir antworten mit konkreten Schritten.',
        },
      },
      outreach: {
        cs: {
          kicker: 'AI OUTREACH · NÁVRH KAMPANĚ & KALKULACE DOSAHU',
          headline: 'Pojďme spočítat potenciál vaší AI Outreach kampaně na tisíce B2B kontaktů.',
          subheadline:
            'Žádné prázdné sliby ani hromadný spam. Probereme váš ideální profil zákazníka (ICP), ukážeme reálný vzorek 1:1 personalizovaných e-mailů pro váš obor a navrhneme bezpečnou multi-doménovou infrastrukturu.',
          formTitle: 'Poptávka AI Outreach kampaně',
          formSubtitle: 'Napište nám cílový obor a trh — připravíme odhad počtu ověřených decision-makerů.',
          urlLabel: 'Web vaší firmy (pro analýzu vaší nabídky a ICP)',
          urlPlaceholder: 'https://vase-firma.cz',
          messageLabel: 'Koho chcete oslovit (obor, trh, cílový objem kontaktů)',
          messagePlaceholder:
            'Např. Chceme oslovit 3 000 výrobních firem v ČR a Německu (jednatelé a ředitelé nákupu). Naše služba je...',
          submitButtonText: 'Poptat návrh AI Outreach kampaně',
          submitSubtext: 'Žádné závazky · Připravíme konkrétní návrh ICP a ukázku personalizace.',
        },
        en: {
          kicker: 'AI OUTREACH · CAMPAIGN STRATEGY & VOLUME PROPOSAL',
          headline: 'Let’s map your target B2B market and design a tailored AI Outreach engine.',
          subheadline:
            'No empty promises or domain-burning spam. We will review your Ideal Customer Profile (ICP), show you live samples of 1:1 AI-personalized emails for your niche, and size your monthly addressable volume.',
          formTitle: 'AI Outreach Campaign Inquiry',
          formSubtitle: 'Share your target vertical and geography — we will estimate your verified decision-maker pool.',
          urlLabel: 'Your Company Website (so we can analyze your offer & ICP)',
          urlPlaceholder: 'https://your-company.com',
          messageLabel: 'Who you want to reach (industry, region, monthly volume)',
          messagePlaceholder:
            'e.g. Looking to reach 3,000 B2B manufacturing CEOs across DACH & UK. Our core offer is...',
          submitButtonText: 'Request AI Outreach Proposal',
          submitSubtext: 'Zero obligations · We will prepare a concrete ICP & sample copy plan.',
        },
        de: {
          kicker: 'AI OUTREACH · KAMPAGNENKONZEPT & REICHWEITENANALYSE',
          headline: 'Lassen Sie uns das Potenzial Ihrer AI-Outreach-Kampagne berechnen.',
          subheadline:
            'Keine leeren Versprechen, kein Massen-Spam. Wir analysieren Ihr ideales Kundenprofil (ICP), zeigen echte Beispiele für 1:1 KI-personalisierte E-Mails in Ihrer Branche und planen Ihre sichere Multi-Domain-Infrastruktur.',
          formTitle: 'Anfrage für AI-Outreach-Kampagne',
          formSubtitle: 'Nennen Sie uns Branche und Zielmarkt — wir ermitteln das Volumen verifizierter Entscheider.',
          urlLabel: 'Ihre Unternehmenswebsite (zur Analyse Ihres Angebots & ICP)',
          urlPlaceholder: 'https://ihr-unternehmen.de',
          messageLabel: 'Ihre Zielgruppe (Branche, Region, gewünschtes Monatsvolumen)',
          messagePlaceholder:
            'z. B. Wir möchten monatlich 3.000 Geschäftsführer im Maschinenbau in der DACH-Region erreichen. Unser Angebot ist...',
          submitButtonText: 'AI-Outreach-Konzept anfragen',
          submitSubtext: 'Keinerlei Verpflichtung · Sie erhalten eine konkrete ICP-Einschätzung.',
        },
      },
    };

    if (activePage === 'outreach') {
      return map.outreach[currentLang] || map.outreach.en;
    }
    if (activePage === 'overview') {
      return map.overview[currentLang] || map.overview.en;
    }
    return null;
  }, [activePage, currentLang]);

  const formPlaceholders = {
    cs: {
      name: 'Např. Jan Dvořák, Architekti s.r.o.',
      email: 'vas@email.cz',
      url: 'https://vas-stary-web.cz',
      orDirect: 'Nebo nás kontaktujte přímo',
      webMessage:
        'Napište nám stručně, jakou máte představu, co od nového webu očekáváte nebo co vás trápí na stávajícím řešení...',
      successDescFallback:
        'Poptávku jsme v pořádku přijali. Ozveme se vám v nejbližší době, abychom nezávazně probrali vaše představy a možnosti řešení.',
    },
    en: {
      name: 'e.g. John Smith, Apex Media Ltd',
      email: 'john@company.com',
      url: 'https://your-current-site.com',
      orDirect: 'Or contact us directly',
      webMessage:
        'Tell us briefly about your vision, what you expect from the new website, or what issues you are facing with your current solution...',
      successDescFallback:
        'We have successfully received your inquiry. We will review your details and get back to you shortly to discuss next steps.',
    },
    de: {
      name: 'z. B. Max Mustermann, Müller GmbH',
      email: 'max@unternehmen.de',
      url: 'https://ihre-aktuelle-website.de',
      orDirect: 'Oder kontaktieren Sie uns direkt',
      webMessage:
        'Beschreiben Sie uns kurz Ihre Vorstellungen, was Sie von der neuen Website erwarten oder welche Probleme Ihre bestehende Lösung bereitet...',
      successDescFallback:
        'Wir haben Ihre Anfrage erfolgreich erhalten. Wir prüfen Ihre Angaben und melden uns zeitnah bei Ihnen.',
    },
  };

  const ph = formPlaceholders[currentLang] || formPlaceholders.cs;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    existingUrl: '',
    serviceType: serviceOptions[defaultServiceIndex] || serviceOptions[0],
    message: '',
  });

  // Update default serviceType when language, tab, or preloaded category changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      serviceType: serviceOptions[defaultServiceIndex] || serviceOptions[0],
    }));
  }, [serviceOptions, defaultServiceIndex]);

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
      notes: `Odesláno ze sekce: ${activePage}.`,
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
      serviceType: serviceOptions[defaultServiceIndex] || serviceOptions[0],
      message: '',
    });
  };

  const accentTextClass = activePage === 'outreach' ? 'text-indigo-400' : 'text-cyan-400';

  return (
    <section id="kontakt" className="pt-12 pb-16 lg:pt-16 lg:pb-20 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header: Centered on Top */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className={`flex items-center justify-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest ${accentTextClass}`}>
            {contextualCopy ? (
              <span>{contextualCopy.kicker}</span>
            ) : (
              <EditableText
                value={sec.kicker}
                onChange={(val) => updateContactSection({ kicker: val })}
                label="Kicker kontaktní sekce"
              />
            )}
          </div>

          {contextualCopy ? (
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display text-balance">
              {contextualCopy.headline}
            </h2>
          ) : (
            <EditableText
              as="h2"
              value={sec.headline}
              onChange={(val) => updateContactSection({ headline: val })}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display text-balance"
              label="Nadpis kontaktní sekce"
            />
          )}

          {contextualCopy ? (
            <p className="text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
              {contextualCopy.subheadline}
            </p>
          ) : (
            <EditableText
              as="p"
              multiline
              value={sec.subheadline}
              onChange={(val) => updateContactSection({ subheadline: val })}
              className="text-base text-slate-300 leading-relaxed max-w-2xl mx-auto"
              label="Perex kontaktní sekce"
            />
          )}
        </div>

        {/* 1. Contact Form */}
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
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  {ph.successDescFallback}
                </p>
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
                  {contextualCopy ? (
                    <>
                      <h3 className="text-xl font-bold text-white font-display">
                        {contextualCopy.formTitle}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        {contextualCopy.formSubtitle}
                      </p>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
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
                    {contextualCopy ? (
                      <span>{contextualCopy.urlLabel}</span>
                    ) : (
                      <EditableText
                        value={sec.urlLabel || 'Odkaz na stávající web (nepovinné)'}
                        onChange={(val) => updateContactSection({ urlLabel: val })}
                        label="Štítek pole Odkaz"
                      />
                    )}
                  </label>
                  <input
                    type="url"
                    value={formData.existingUrl}
                    onChange={(e) => setFormData({ ...formData, existingUrl: e.target.value })}
                    placeholder={contextualCopy ? contextualCopy.urlPlaceholder : ph.url}
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
                      <option key={idx} value={opt} className="bg-[#0B101D] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {contextualCopy ? (
                      <span>{contextualCopy.messageLabel}</span>
                    ) : (
                      <EditableText
                        value={sec.messageLabel || 'Vaše představa nebo poznámka k projektu'}
                        onChange={(val) => updateContactSection({ messageLabel: val })}
                        label="Štítek pole Zpráva"
                      />
                    )}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={contextualCopy ? contextualCopy.messagePlaceholder : ph.webMessage}
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
                    <Send className="h-4 w-4 shrink-0" />
                    {contextualCopy ? (
                      <span>{contextualCopy.submitButtonText}</span>
                    ) : (
                      <EditableText
                        value={sec.submitButtonText || 'Odeslat nezávaznou poptávku'}
                        onChange={(val) => updateContactSection({ submitButtonText: val })}
                        label="Tlačítko odeslání formuláře"
                      />
                    )}
                  </button>
                  <div className="text-[11px] text-slate-400 text-center mt-2">
                    {contextualCopy ? (
                      <span>{contextualCopy.submitSubtext}</span>
                    ) : (
                      <EditableText
                        value={sec.submitSubtext || 'Žádné závazky ani spam. Ozveme se vám s konkrétním návrhem.'}
                        onChange={(val) => updateContactSection({ submitSubtext: val })}
                        label="Podtext pod tlačítkem odeslání"
                      />
                    )}
                  </div>
                </div>
              </form>
            )}

          </div>
        </div>

        {/* 2. Direct Contacts (Balanced 2-column grid) */}
        <div className="max-w-3xl mx-auto mt-10 pt-8 border-t border-white/10">
          <div className="text-center mb-6">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              {ph.orDirect}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3.5 p-5 rounded-xl bg-[#0B101D] border border-white/10">
              <Mail className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <div className="text-xs text-slate-400">
                  <EditableText
                    value={sec.directEmailLabel || 'Přímý e-mail:'}
                    onChange={(val) => updateContactSection({ directEmailLabel: val })}
                    label="Štítek e-mailu"
                  />
                </div>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-medium text-white hover:text-cyan-300 transition-colors break-all block mt-0.5"
                >
                  <EditableText
                    value={contact.email}
                    onChange={(val) => updateContact({ email: val })}
                    label="E-mail firmy"
                  />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-5 rounded-xl bg-[#0B101D] border border-white/10">
              <MapPin className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="min-w-0">
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
                  className="font-medium text-white block mt-0.5"
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

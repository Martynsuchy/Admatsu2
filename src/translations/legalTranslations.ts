import React from 'react';
import { Lock, CheckCircle2 } from 'lucide-react';
import { Language } from './contentTranslations';

export interface LegalContent {
  privacyBadge: string;
  privacyBadgeText: string;
  privacyTitle: string;
  privacySubtitle: string;
  termsBadge: string;
  termsBadgeText: string;
  termsTitle: string;
  termsSubtitle: string;
  closeBtn: string;
  questionNotice: string;
}

export const LEGAL_UI_LABELS: Record<Language, LegalContent> = {
  cs: {
    privacyBadge: 'Maximální soukromí',
    privacyBadgeText:
      'Vaše soukromí bereme s maximální vážností. Shromažďujeme výhradně údaje, které nám sami dobrovolně poskytnete v poptávkovém formuláři za účelem vypracování nezávazné nabídky. Vaše data nikdy neprodáváme, neprofilujeme ani nepředáváme třetím stranám pro marketingové účely.',
    privacyTitle: 'Zásady ochrany osobních údajů (GDPR)',
    privacySubtitle: 'ADMATSU s.r.o. · IČO: 21394555 · Platnost od 1. 10. 2026',
    termsBadge: 'Férová spolupráce',
    termsBadgeText:
      'Zakládáme si na transparentní a profesionální spolupráci. Orientační kalkulačka i odeslání formuláře jsou zcela nezávazné. Závazná zakázka vzniká až po vašem odsouhlasení konkrétní specifikace a pevné ceny. Níže uvedené podmínky chrání obě strany před nejasnostmi v průběhu vývoje.',
    termsTitle: 'Všeobecné obchodní podmínky (VOP)',
    termsSubtitle: 'ADMATSU s.r.o. · IČO: 21394555 · Platnost od 1. 10. 2026',
    closeBtn: 'Zavřít',
    questionNotice: 'Máte dotaz k podmínkám? Napište nám na',
  },
  en: {
    privacyBadge: 'Maximum Privacy Protection',
    privacyBadgeText:
      'We treat your personal data with utmost confidentiality and care. We solely collect details voluntarily submitted via our project inquiry forms to prepare a bespoke, non-binding proposal. We never sell, profile, or disclose your personal data to third parties for marketing purposes.',
    privacyTitle: 'Privacy Policy (GDPR Compliance)',
    privacySubtitle: 'ADMATSU s.r.o. · Company ID: 21394555 · Effective October 1, 2026',
    termsBadge: 'Fair Collaboration Standards',
    termsBadgeText:
      'We believe in transparent, professional partnerships without convoluted small print. Our cost estimator and inquiry forms are strictly non-binding. A binding engagement is established only once you approve a concrete project specification and fixed price quotation. The terms below safeguard both parties during development.',
    termsTitle: 'General Terms of Service (B2B)',
    termsSubtitle: 'ADMATSU s.r.o. · Company ID: 21394555 · Effective October 1, 2026',
    closeBtn: 'Close',
    questionNotice: 'Have questions regarding our terms? Contact us at',
  },
  de: {
    privacyBadge: 'Höchster Datenschutz',
    privacyBadgeText:
      'Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir erheben ausschließlich Informationen, die Sie uns freiwillig im Anfrageformular zur Erstellung eines unverbindlichen Angebots übermitteln. Ihre Daten werden niemals verkauft, profiliert oder an Dritte zu Marketingzwecken weitergegeben.',
    privacyTitle: 'Datenschutzerklärung (DSGVO)',
    privacySubtitle: 'ADMATSU s.r.o. · Identifikationsnummer: 21394555 · Gültig ab 1. 10. 2026',
    termsBadge: 'Faire Zusammenarbeit',
    termsBadgeText:
      'Wir legen Wert auf transparente und partnerschaftliche Zusammenarbeit ohne Klauseln im Kleingedruckten. Projektkalkulator und Anfrageformular sind absolut unverbindlich. Ein verbindlicher Auftrag kommt erst nach Ihrer ausdrücklichen Freigabe des Angebots und Festpreises zustande.',
    termsTitle: 'Allgemeine Geschäftsbedingungen (AGB)',
    termsSubtitle: 'ADMATSU s.r.o. · Identifikationsnummer: 21394555 · Gültig ab 1. 10. 2026',
    closeBtn: 'Schließen',
    questionNotice: 'Haben Sie Fragen zu unseren Bedingungen? Schreiben Sie uns an',
  },
};

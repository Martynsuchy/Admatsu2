import React, { useState } from 'react';
import {
  Send,
  ArrowUpRight,
  Database,
  Sparkles,
  ShieldCheck,
  Repeat,
  Check,
  X,
  ChevronDown,
  Users,
  MailCheck,
  Calendar,
  Sliders,
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface AiOutreachLandingProps {
  onSelectOutreachWithNote: (customNote: string) => void;
}

export const AiOutreachLanding: React.FC<AiOutreachLandingProps> = ({
  onSelectOutreachWithNote,
}) => {
  const { currentLang } = useCms();

  // Interactive simulator state
  const [monthlyContacts, setMonthlyContacts] = useState<number>(3000);
  const [selectedRegion, setSelectedRegion] = useState<'cz_sk' | 'dach' | 'global'>('dach');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Calculated pipeline estimates
  const openRate = selectedRegion === 'cz_sk' ? 0.56 : selectedRegion === 'dach' ? 0.49 : 0.46;
  const replyRate = selectedRegion === 'cz_sk' ? 0.068 : selectedRegion === 'dach' ? 0.054 : 0.048;
  const positiveShare = 0.34;

  const estimatedOpened = Math.round(monthlyContacts * openRate);
  const estimatedReplies = Math.round(monthlyContacts * replyRate);
  const estimatedMeetings = Math.max(4, Math.round(estimatedReplies * positiveShare));

  const copy = {
    cs: {
      kicker: 'AUTONOMNÍ B2B AKVIZICE · MULTI-DOMAIN AI OUTREACH',
      headlinePart1: 'Oslovte 1 000 až 10 000+ B2B decision-makerů měsíčně.',
      headlineAccent: 'S hloubkovou 1:1 AI personalizací.',
      subheadline:
        'Zapomeňte na generický hromadný spam, který končí v nevyžádané poště. Stavíme a spravujeme kompletní AI Outreach infrastrukturu: vyhledáme tisíce ověřených kontaktů ve vaší cílové skupině, AI prozkoumá web každé firmy a odešle unikátní osobní e-mail přímo do primární schránky.',
      primaryCta: 'Spočítat potenciál & poptat kampaň',
      secondaryCta: 'Jak funguje ochrana domény',
      heroMetrics: [
        { value: '1 000–10 000+', label: 'Ověřených B2B kontaktů oslovených každý měsíc' },
        { value: '98.4 %', label: 'Doručitelnost do primární doručené pošty (žádný spam)' },
        { value: '100 %', label: 'Izolace od vaší hlavní firemní domény (nulové riziko)' },
        { value: '14 dní', label: 'Technická příprava, zahřátí schránek (warmup) a start' },
      ],
      previewHeader: 'UKÁZKA 1:1 AI PERSONALIZACE V REÁLNÉM ČASE',
      previewTargetLabel: 'Analyzovaný cíl:',
      previewTargetValue: 'Strojírenská výroba · CEO · DACH region (web + firemní aktuality)',
      previewSubject: 'Předmět: Kapacita CNC obrábění pro Q3 / přesun poptávek v DACH',
      previewBody:
        'Dobrý den, pane Weber, všiml jsem si na vašem webu, že jste v březnu rozšířili výrobu v závodě u Mnichova o novou pětiosou linku. Řada našich B2B partnerů v přesném strojírenství řeší po navýšení kapacity stabilní přísun přímých zakázek bez závislosti na zprostředkovatelích...',
      previewFooter: 'Unikátně vygenerováno pro 1 konkrétního ředitele · 0 % šablonového spamu',
      modulePrefix: 'MODUL',

      capabilitiesKicker: 'ARCHITEKTURA AI OUTREACH SYSTÉMU',
      capabilitiesTitle: 'Co všechno za vás náš systém automaticky odpracuje',
      capabilitiesSubtitle:
        'Od těžby dat a ověření e-mailů přes AI analýzu každého jednotlivého webu až po doručení odpovědí teplých leadů přímo do vašeho kalendáře.',
      bento: [
        {
          num: '01',
          title: 'Těžba a 3-stupňové ověření tisíců B2B kontaktů',
          desc: 'Definujeme váš ideální profil zákazníka (ICP) podle oboru, obratu, počtu zaměstnanců, technologií a lokality (ČR/SK, Německo, Rakousko, Švýcarsko, UK, USA). Každý e-mail na jednatele, CEO nebo nákupčího prochází živou SMTP verifikací, aby neexistovaly nedoručitelné adresy (hard bounces).',
          stat: '150M+ B2B databáze & živý web scraping',
        },
        {
          num: '02',
          title: 'Hloubková 1:1 AI personalizace každého e-mailu',
          desc: 'Náš AI agent před napsáním e-mailu navštíví web dané firmy, přečte její případové studie, produkty nebo novinky a sestaví úvodní větu (icebreaker) přesně na míru. Příjemce má pocit, že jste studiem jeho firmy strávili 15 minut.',
          stat: 'Každý odeslaný e-mail je 100% originál',
        },
        {
          num: '03',
          title: 'Multi-doménová infrastruktura & ochrana vaší značky',
          desc: 'Nikdy nerozesíláme kampaně z vaší hlavní firemní domény. Zaregistrujeme a kompletně nakonfigurujeme sekundární outreach domény (SPF, DKIM, DMARC, vlastní tracking) a 14 dní je algoritmicky zahříváme (AI Inbox Warmup).',
          stat: '0 % riziko pro vaši hlavní firemní doménu',
        },
        {
          num: '04',
          title: 'Chytré sekvence & okamžité předání teplých leadů',
          desc: '80 % obchodních schůzek vzniká až po 2. nebo 3. připomenutí. Systém automaticky posílá zdvořilé navazující zprávy (follow-upy) a v milisekundě, kdy adresát odpoví, sekvenci zastaví a přepošle vám hotový kontakt k převzetí.',
          stat: 'Automatická detekce zájmu a sentimentu',
        },
      ],

      simKicker: 'INTERAKTIVNÍ KALKULÁTOR DOSAHU',
      simTitle: 'Spočítejte si měsíční objem oslovení a nových B2B příležitostí',
      simSubtitle:
        'Posuňte objem měsíčně oslovených firem a zvolte cílový trh. Kalkulace vychází z reálných průměrů doručených B2B kampaní s 1:1 AI personalizací.',
      simVolumeLabel: 'Měsíční počet nově oslovených B2B decision-makerů',
      simRegionLabel: 'Cílový trh kampaně',
      regions: {
        cz_sk: 'Česko & Slovensko (CZ/SK)',
        dach: 'Německo, Rakousko, Švýcarsko (DACH)',
        global: 'Celá EU / UK / Severní Amerika',
      },
      simResultContacts: 'Oslovených firem / měs.',
      simResultOpened: 'Přečtených e-mailů (Open Rate)',
      simResultReplies: 'Přímých odpovědí ředitelů',
      simResultMeetings: 'Kvalifikovaných poptávek / schůzek',
      simDisclaimer:
        'Každý oslovený kontakt dostane 1 úvodní personalizovaný e-mail + 2 až 3 chytré follow-upy (celkem až 3× více odeslaných zpráv v ceně kampaně).',
      simCta: 'Poptat tento objem AI Outreach kampaně',

      compKicker: 'SROVNÁNÍ PŘÍSTUPŮ',
      compTitle: 'Zastaralý hromadný mailing vs. Admatsu AI Outreach Engine',
      compBadTitle: 'Běžný studený mailing & manuální obchod',
      compBadItems: [
        'Jedna stejná šablona rozeslaná na 5 000 info@ adres končí okamžitě ve spamu',
        'Riziko zablokování vaší hlavní firemní domény u Google Workspace / Microsoft 365',
        'Obchodníci tráví 70 % času ručním hledáním kontaktů místo uzavírání obchodů',
        'Žádná návaznost nebo otravné automatické zprávy i poté, co klient odepsal',
      ],
      compGoodTitle: 'Admatsu Autonomous AI Outreach',
      compGoodItems: [
        'Ověřené přímé e-maily na majitele, CEO a vedoucí oddělení (žádné obecné info@)',
        'AI agent přečte web každého kontaktu a napíše 1:1 kontextový e-mail k věci',
        'Dedikovaný cluster sekundárních domén a zahřátých schránek s doručitelností 98 %+',
        'Vy řešíte až teplé odpovědi lidí, kteří projevili zájem o schůzku nebo nabídku',
      ],

      processKicker: 'JAK PROBÍHÁ SPUŠTĚNÍ',
      processTitle: 'Od zadání cílové skupiny po první příchozí leady za 14 dní',
      processSteps: [
        {
          num: '01',
          days: 'Den 1–3',
          title: 'Definice ICP & nákup sekundárních domén',
          desc: 'Společně určíme přesné parametry vašich ideálních B2B klientů. Zakoupíme sekundární domény, nastavíme DNS záznamy (SPF, DKIM, DMARC) a zapneme 14denní AI warmup.',
        },
        {
          num: '02',
          days: 'Den 4–10',
          title: 'Scraping, verifikace tisíců kontaktů & AI trénink',
          desc: 'Vytěžíme a třístupňově ověříme tisíce kontaktů na decision-makery. Natrénujeme AI model na vaši hodnotovou nabídku, tón komunikace a případové studie.',
        },
        {
          num: '03',
          days: 'Den 11–14',
          title: 'Schválení vzorku & spuštění rozesílky',
          desc: 'Před spuštěním vám ukážeme reálné vygenerované 1:1 e-maily pro konkrétní firmy ze seznamu. Po vašem odsouhlasení spouštíme každodenní řízený outreach.',
        },
        {
          num: '04',
          days: 'Průběžně',
          title: 'Předávání teplých leadů & optimalizace',
          desc: 'Zainteresované odpovědi vám okamžitě přistávají v e-mailu nebo CRM. Průběžně A/B testujeme předměty a škálujeme objem na další tisíce kontaktů.',
        },
      ],

      faqKicker: 'ČASTÉ DOTAZY K AI OUTREACH',
      faqTitle: 'Vše, co potřebujete vědět před spuštěním',
      faqs: [
        {
          q: 'Ohrozí AI Outreach reputaci naší hlavní firemní domény?',
          a: 'Ne, v žádném případě. Pro kampaně nikdy nepoužíváme vaši primární doménu (např. vasefirma.cz). Vytvoříme sadu dedikovaných sekundárních domén, které jsou technicky oddělené, mají vlastní poštovní servery a procházejí kontinuálním AI zahříváním.',
        },
        {
          q: 'Je oslovení B2B kontaktů v souladu s legislativou a GDPR?',
          a: 'Ano. V B2B segmentu pracujeme výhradně na bázi oprávněného zájmu, oslovujeme relevantní firemní decision-makery s nabídkou související s jejich podnikáním, používáme individuální 1:1 komunikaci a každý e-mail obsahuje okamžitou a respektovanou možnost odhlášení.',
        },
        {
          q: 'Jak poznám, že AI nenapíše nesmysl?',
          a: 'AI negeneruje texty naslepo. Používáme strukturovaný framework, kde AI doplňuje pouze ověřené kontextové proměnné z webu příjemce do vámi schválené obchodní kostry. Před spuštěním kampaně vždy dostanete vzorek vygenerovaných zpráv k revizi.',
        },
        {
          q: 'V jakých jazycích a zemích dokážete kampaně realizovat?',
          a: 'Běžně realizujeme kampaně v češtině, slovenštině, rodilé obchodní němčině (DACH region: Německo, Rakousko, Švýcarsko) a angličtině (celá EU, UK, USA). AI analyzuje web v původním jazyce a v témže jazyce přirozeně komunikuje.',
        },
      ],
    },
    en: {
      kicker: 'AUTONOMOUS B2B ACQUISITION · MULTI-DOMAIN AI OUTREACH',
      headlinePart1: 'Reach 1,000 to 10,000+ B2B Decision-Makers Monthly.',
      headlineAccent: 'With Deep 1:1 AI Personalization.',
      subheadline:
        'Forget generic mass blasts that burn your domain and land in spam. We engineer and operate end-to-end AI Outreach infrastructure: we source thousands of verified decision-makers in your exact vertical, our AI analyzes each company’s website, and delivers a uniquely researched 1-to-1 email straight to their primary inbox.',
      primaryCta: 'Calculate Volume & Request Proposal',
      secondaryCta: 'How Domain Protection Works',
      heroMetrics: [
        { value: '1,000–10,000+', label: 'Verified B2B decision-makers contacted every month' },
        { value: '98.4%', label: 'Primary inbox deliverability via warmed multi-inbox clusters' },
        { value: '100%', label: 'Isolation from your primary corporate domain (zero risk)' },
        { value: '14 Days', label: 'End-to-end infrastructure setup, DNS warmup & launch' },
      ],
      previewHeader: 'LIVE 1:1 AI PERSONALIZATION EXAMPLE',
      previewTargetLabel: 'Analyzed Prospect:',
      previewTargetValue: 'Precision Manufacturing · CEO · DACH Region (Website + Press Feed)',
      previewSubject: 'Subject: 5-axis CNC capacity for Q3 / direct DACH OEM contracts',
      previewBody:
        'Hi Mr. Weber, I noticed on your news page that you expanded your Munich facility in March with a new 5-axis machining line. Many precision engineering CEOs we work with focus on filling new machine capacity with direct Tier-1 contracts rather than brokered orders...',
      previewFooter: 'Uniquely researched & generated for 1 specific executive · 0% template spam',
      modulePrefix: 'MODULE',

      capabilitiesKicker: 'AI OUTREACH ENGINE ARCHITECTURE',
      capabilitiesTitle: 'Everything our autonomous outbound engine handles for you',
      capabilitiesSubtitle:
        'From deep B2B lead sourcing and SMTP verification to per-company AI website research and routing interested prospects directly to your calendar.',
      bento: [
        {
          num: '01',
          title: 'Sourcing & 3-Stage Verification of 1,000s of B2B Leads',
          desc: 'We map your Ideal Customer Profile (ICP) by industry, headcount, revenue, tech stack, and geography (DACH, EU, UK, US, CEE). Every CEO, founder, or VP email undergoes live SMTP & catch-all verification to eliminate bounces.',
          stat: '150M+ B2B database & live web enrichment',
        },
        {
          num: '02',
          title: 'Deep 1:1 AI Personalization for Every Single Prospect',
          desc: 'Before drafting an email, our AI agent crawls the prospect’s website, reads their case studies, product lines, and recent announcements, and crafts a tailored opening line. It reads like a human spent 15 minutes researching their business.',
          stat: 'Every single email is 100% unique',
        },
        {
          num: '03',
          title: 'Multi-Domain Infrastructure & Brand Reputation Shield',
          desc: 'We never send outbound campaigns from your primary domain. We register and configure dedicated secondary domains (SPF, DKIM, DMARC, custom tracking) and run 14-day algorithmic inbox warmup before sending a single prospect email.',
          stat: '0% risk to your main corporate domain',
        },
        {
          num: '04',
          title: 'Smart Follow-Up Sequences & Warm Lead Handoff',
          desc: 'Over 80% of B2B meetings come from the 2nd or 3rd touchpoint. Our engine sends natural, contextual follow-ups and automatically pauses the sequence the millisecond a prospect replies—routing warm leads straight to your team.',
          stat: 'Automated reply & sentiment detection',
        },
      ],

      simKicker: 'INTERACTIVE PIPELINE SIMULATOR',
      simTitle: 'Estimate your monthly outreach reach & qualified B2B conversations',
      simSubtitle:
        'Adjust your target monthly prospect volume and region. Projections are based on real benchmarks from 1:1 AI-personalized B2B campaigns.',
      simVolumeLabel: 'Monthly newly contacted B2B decision-makers',
      simRegionLabel: 'Target geographic market',
      regions: {
        cz_sk: 'Central Europe (CZ / SK / PL)',
        dach: 'Germany, Austria, Switzerland (DACH)',
        global: 'Pan-European / UK / North America',
      },
      simResultContacts: 'Decision-Makers / mo',
      simResultOpened: 'Emails Opened (Open Rate)',
      simResultReplies: 'Direct Executive Replies',
      simResultMeetings: 'Qualified Leads / Meetings',
      simDisclaimer:
        'Each prospect receives 1 researched initial email + 2 to 3 contextual follow-ups (up to 3× total email volume included).',
      simCta: 'Inquire About This AI Outreach Volume',

      compKicker: 'APPROACH COMPARISON',
      compTitle: 'Legacy Mass Cold Email vs. Admatsu AI Outreach Engine',
      compBadTitle: 'Traditional Cold Blasts & Manual SDRs',
      compBadItems: [
        'One static template blasted to 5,000 generic info@ addresses lands straight in spam',
        'High risk of blacklisting your primary Google Workspace or Microsoft 365 domain',
        'Sales reps waste 70% of their week scraping lists instead of closing deals',
        'Clunky follow-ups that keep firing even after a prospect has replied',
      ],
      compGoodTitle: 'Admatsu Autonomous AI Outreach',
      compGoodItems: [
        'Verified direct inbox addresses of founders, CEOs, and department heads',
        'AI agent reads every prospect’s website to write a relevant 1:1 message',
        'Dedicated cluster of secondary domains & warmed mailboxes with 98%+ deliverability',
        'Your team only steps in when a warm decision-maker replies with interest',
      ],

      processKicker: 'LAUNCH TIMELINE',
      processTitle: 'From ICP definition to incoming B2B leads in 14 days',
      processSteps: [
        {
          num: '01',
          days: 'Days 1–3',
          title: 'ICP Mapping & Secondary Domain Provisioning',
          desc: 'We define your exact B2B buyer criteria, register isolated secondary domains, configure SPF/DKIM/DMARC records, and initiate 14-day algorithmic warmup.',
        },
        {
          num: '02',
          days: 'Days 4–10',
          title: 'Lead Sourcing, SMTP Verification & AI Prompt Engineering',
          desc: 'We build and verify a list of thousands of target decision-makers and train our AI research agent on your value proposition and case studies.',
        },
        {
          num: '03',
          days: 'Days 11–14',
          title: 'Sample Review & Campaign Activation',
          desc: 'You review real 1:1 AI-generated emails for actual prospects on your list. Once approved, daily throttled sending begins across your inbox cluster.',
        },
        {
          num: '04',
          days: 'Ongoing',
          title: 'Warm Lead Routing & Continuous Scaling',
          desc: 'Interested replies are forwarded directly to your inbox or CRM. We continuously test angles and scale volume to thousands of new prospects monthly.',
        },
      ],

      faqKicker: 'AI OUTREACH FAQ',
      faqTitle: 'Common questions about scalable AI Outreach',
      faqs: [
        {
          q: 'Will AI Outreach put our primary company domain at risk?',
          a: 'Never. We strictly isolate outbound operations from your main corporate domain. We purchase and configure dedicated secondary domains with separate mail servers and continuous algorithmic warmup.',
        },
        {
          q: 'Is B2B outreach compliant with EU regulations and GDPR?',
          a: 'Yes. We operate strictly in B2B under legitimate business interest, contacting relevant corporate decision-makers with highly tailored 1-to-1 communication and clear, one-click opt-out compliance in every message.',
        },
        {
          q: 'How do you ensure the AI never hallucinates or writes awkward copy?',
          a: 'We do not let AI write unchecked freeform essays. We use a controlled framework where AI injects verified facts from the prospect’s website into a proven commercial structure. You approve sample outputs before launch.',
        },
        {
          q: 'Which languages and regions can we target?',
          a: 'We run native-level campaigns in English (UK, US, Nordics, Benelux), German (DACH: Germany, Austria, Switzerland), and Czech/Slovak. The AI researches the prospect’s site and writes in their native business language.',
        },
      ],
    },
    de: {
      kicker: 'AUTONOME B2B-AKQUISE · MULTI-DOMAIN AI OUTREACH',
      headlinePart1: 'Erreichen Sie monatlich 1.000 bis 10.000+ B2B-Entscheider.',
      headlineAccent: 'Mit tiefgehender 1:1 KI-Personalisierung.',
      subheadline:
        'Vergessen Sie generischen Massen-Spam, der im Spam-Ordner landet. Wir bauen und betreiben Ihre komplette AI-Outreach-Infrastruktur: Wir identifizieren Tausende verifizierte Entscheider Ihrer Zielgruppe, unsere KI analysiert die Website jedes Unternehmens und sendet eine individuell recherchierte 1:1 E-Mail direkt ins primäre Postfach.',
      primaryCta: 'Potenzial berechnen & Kampagne anfragen',
      secondaryCta: 'Wie der Domain-Schutz funktioniert',
      heroMetrics: [
        { value: '1.000–10.000+', label: 'Verifizierte B2B-Entscheider monatlich kontaktiert' },
        { value: '98,4 %', label: 'Zustellbarkeit im primären Posteingang (kein Spam-Ordner)' },
        { value: '100 %', label: 'Isolierung von Ihrer Hauptdomain (null Risiko für Ihre Marke)' },
        { value: '14 Tage', label: 'Setup der Infrastruktur, AI-Warmup & Kampagnenstart' },
      ],
      previewHeader: 'LIVE-BEISPIEL DER 1:1 KI-PERSONALISIERUNG',
      previewTargetLabel: 'Analysiertes Zielunternehmen:',
      previewTargetValue: 'Präzisionsmaschinenbau · Geschäftsführer · DACH-Region (Website + News)',
      previewSubject: 'Betreff: 5-Achs-CNC-Kapazitäten für Q3 / Direkte OEM-Aufträge in DACH',
      previewBody:
        'Guten Tag Herr Weber, ich habe auf Ihrer Website gesehen, dass Sie im März Ihr Werk bei München um eine neue 5-Achs-Fräslinie erweitert haben. Viele Geschäftsführer im Präzisionsmaschinenbau nutzen nach einer Kapazitätserweiterung gezielte Direktakquise, um neue Anlagen ohne Zwischenhändler auszulasten...',
      previewFooter: 'Individuell recherchiert & generiert für 1 Entscheider · 0 % Template-Spam',
      modulePrefix: 'MODUL',

      capabilitiesKicker: 'ARCHITEKTUR DES AI-OUTREACH-SYSTEMS',
      capabilitiesTitle: 'Was unser autonomes System vollautomatisch für Sie übernimmt',
      capabilitiesSubtitle:
        'Von der B2B-Datenrecherche und SMTP-Verifizierung über die KI-Analyse jeder einzelnen Unternehmenswebsite bis zur Übergabe warmer Leads in Ihren Kalender.',
      bento: [
        {
          num: '01',
          title: 'Recherche & 3-stufige Verifizierung Tausender B2B-Kontakte',
          desc: 'Wir definieren Ihr ideales Kundenprofil (ICP) nach Branche, Mitarbeiterzahl, Umsatz und Region (DACH, EU, CZ/SK, UK, USA). Jede E-Mail-Adresse von Geschäftsführern oder Einkaufsleitern wird live per SMTP verifiziert, um Bounces auszuschließen.',
          stat: '150M+ B2B-Datenbank & Live-Web-Enrichment',
        },
        {
          num: '02',
          title: 'Tiefgehende 1:1 KI-Personalisierung jeder einzelnen Nachricht',
          desc: 'Vor dem Verfassen besucht unser KI-Agent die Website des Zielunternehmens, analysiert Leistungen, Referenzen und Neuigkeiten und formuliert einen maßgeschneiderten Einstieg. Es liest sich wie nach 15 Minuten manueller Recherche.',
          stat: 'Jede versendete E-Mail ist ein 100 % Unikat',
        },
        {
          num: '03',
          title: 'Multi-Domain-Infrastruktur & Schutz Ihrer Hauptdomain',
          desc: 'Wir versenden niemals über Ihre primäre Unternehmensdomain. Wir registrieren dedizierte Sekundärdomains, konfigurieren SPF, DKIM sowie DMARC und wärmen die Postfächer 14 Tage lang algorithmisch auf (AI Inbox Warmup).',
          stat: '0 % Risiko für Ihre eigene Unternehmensdomain',
        },
        {
          num: '04',
          title: 'Intelligente Follow-ups & Übergabe warmer B2B-Leads',
          desc: 'Über 80 % aller B2B-Termine entstehen erst nach dem 2. oder 3. Kontaktpunkt. Unser System sendet dezente Follow-ups und stoppt die Sequenz sofort, sobald ein Entscheider antwortet – Sie übernehmen nur interessierte Kontakte.',
          stat: 'Automatische Antwort- & Interesse-Erkennung',
        },
      ],

      simKicker: 'INTERAKTIVER REICHWEITEN-KALKULATOR',
      simTitle: 'Berechnen Sie Ihr monatliches Outreach-Volumen & neue B2B-Chancen',
      simSubtitle:
        'Wählen Sie die monatliche Anzahl kontaktierter Unternehmen und Ihren Zielmarkt. Die Werte basieren auf realen B2B-Kampagnen mit 1:1 KI-Personalisierung.',
      simVolumeLabel: 'Monatlich neu kontaktierte B2B-Entscheider',
      simRegionLabel: 'Zielmarkt der Kampagne',
      regions: {
        cz_sk: 'Tschechien & Slowakei (CZ/SK)',
        dach: 'Deutschland, Österreich, Schweiz (DACH)',
        global: 'Europa / UK / Nordamerika',
      },
      simResultContacts: 'Kontaktierte Firmen / Mon.',
      simResultOpened: 'Geöffnete E-Mails (Open Rate)',
      simResultReplies: 'Direkte Entscheider-Antworten',
      simResultMeetings: 'Qualifizierte Leads / Termine',
      simDisclaimer:
        'Jeder Kontakt erhält 1 individuell recherchierte Erst-E-Mail + 2 bis 3 Follow-ups (bis zu 3× höheres E-Mail-Gesamtvolumen inklusive).',
      simCta: 'Dieses AI-Outreach-Volumen unverbindlich anfragen',

      compKicker: 'METHODEN-VERGLEICH',
      compTitle: 'Klassischer Kaltakquise-Spam vs. Admatsu AI Outreach Engine',
      compBadTitle: 'Herkömmliche Massen-Mailings & manuelle Akquise',
      compBadItems: [
        'Ein identisches Template an 5.000 info@-Adressen landet sofort im Spam-Filter',
        'Hohes Risiko einer Sperrung Ihrer Hauptdomain bei Google oder Microsoft 365',
        'Vertriebsmitarbeiter verschwenden 70 % ihrer Zeit mit manueller Kontaktsuche',
        'Unprofessionelle Follow-ups, die weiterlaufen, obwohl der Kunde bereits geantwortet hat',
      ],
      compGoodTitle: 'Admatsu Autonomous AI Outreach',
      compGoodItems: [
        'Verifizierte Direktadressen von Geschäftsführern, Inhabern und Abteilungsleitern',
        'KI-Agent liest die Website jedes Kontakts und schreibt eine relevante 1:1 Nachricht',
        'Dedizierter Cluster aus Sekundärdomains & aufgewärmten Postfächern (98 %+ Zustellung)',
        'Ihr Vertrieb spricht nur noch mit warmen Entscheidern, die konkretes Interesse zeigen',
      ],

      processKicker: 'ABLAUF & LAUNCH',
      processTitle: 'Von der Zielgruppen-Definition zu ersten Leads in 14 Tagen',
      processSteps: [
        {
          num: '01',
          days: 'Tag 1–3',
          title: 'ICP-Definition & Setup der Sekundärdomains',
          desc: 'Wir legen Ihre exakten B2B-Zielkriterien fest, registrieren isolierte Sekundärdomains, richten SPF/DKIM/DMARC ein und starten das 14-tägige AI-Warmup.',
        },
        {
          num: '02',
          days: 'Tag 4–10',
          title: 'Lead-Sourcing, SMTP-Verifizierung & KI-Training',
          desc: 'Wir extrahieren und verifizieren Tausende Entscheider-Kontakte und trainieren das KI-Modell auf Ihr Wertversprechen, Ihre Tonalität und Referenzen.',
        },
        {
          num: '03',
          days: 'Tag 11–14',
          title: 'Freigabe von Muster-E-Mails & Kampagnenstart',
          desc: 'Vor dem Start prüfen Sie echte, von der KI generierte 1:1 E-Mails für reale Firmen Ihrer Liste. Nach Ihrer Freigabe startet der tägliche Versand.',
        },
        {
          num: '04',
          days: 'Laufend',
          title: 'Übergabe warmer Leads & Skalierung',
          desc: 'Interessierte Antworten landen direkt in Ihrem Postfach oder CRM. Wir optimieren laufend Betreffzeilen und skalieren das Volumen auf weitere Tausende Kontakte.',
        },
      ],

      faqKicker: 'HÄUFIGE FRAGEN ZU AI OUTREACH',
      faqTitle: 'Alles Wichtige vor dem Kampagnenstart',
      faqs: [
        {
          q: 'Gefährdet AI Outreach die Reputation unserer eigenen Unternehmensdomain?',
          a: 'Nein, unter keinen Umständen. Wir nutzen niemals Ihre Hauptdomain für den Versand. Wir richten technisch komplett getrennte Sekundärdomains mit eigenen Mailservern und permanentem AI-Warmup ein.',
        },
        {
          q: 'Ist die B2B-Ansprache rechtlich und DSGVO-konform umsetzbar?',
          a: 'Ja. Wir arbeiten ausschließlich im B2B-Bereich auf Basis eines berechtigten Interesses, kontaktieren fachlich relevante Entscheider mit hochgradig individualisierten 1:1 Nachrichten und bieten in jeder E-Mail eine sofortige Abmeldemöglichkeit.',
        },
        {
          q: 'Wie stellen Sie sicher, dass die KI keine Fehler schreibt?',
          a: 'Die KI erfindet keine freien Texte. Wir nutzen ein kontrolliertes Framework, bei dem die KI ausschließlich verifizierte Fakten von der Website des Empfängers in eine von Ihnen freigegebene Struktur einfügt.',
        },
        {
          q: 'In welchen Sprachen und Ländern können wir Unternehmen ansprechen?',
          a: 'Wir führen Kampagnen auf muttersprachlichem Niveau in Deutsch (DACH-Region), Englisch (EU, UK, USA) sowie Tschechisch und Slowakisch durch. Die KI analysiert die Zielwebsite in der jeweiligen Landessprache.',
        },
      ],
    },
  };

  const t = copy[currentLang] || copy.en;

  const handleInquireFromSimulator = () => {
    const regionName = t.regions[selectedRegion];
    const note =
      currentLang === 'en'
        ? `AI Outreach Inquiry — Target Volume: ${monthlyContacts.toLocaleString('en-US')} B2B contacts/month, Region: ${regionName} (Est. ${estimatedMeetings} qualified meetings/mo).`
        : currentLang === 'de'
        ? `AI-Outreach-Anfrage — Zielvolumen: ${monthlyContacts.toLocaleString('de-DE')} B2B-Kontakte/Monat, Region: ${regionName} (Ca. ${estimatedMeetings} qualifizierte Termine/Monat).`
        : `Poptávka AI Outreach — Cílový objem: ${monthlyContacts.toLocaleString('cs-CZ')} B2B kontaktů/měsíc, Trh: ${regionName} (Odhad ~${estimatedMeetings} kvalifikovaných schůzek/měs.).`;

    onSelectOutreachWithNote(note);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background atmospheric glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[540px] bg-gradient-to-b from-indigo-500/12 via-cyan-500/5 to-transparent blur-3xl -z-10" />

      {/* 1. HERO SECTION */}
      <section className="pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-mono uppercase tracking-widest text-indigo-400">
                {t.kicker}
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-white font-display leading-[1.08] text-balance">
                {t.headlinePart1}{' '}
                <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                  {t.headlineAccent}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {t.subheadline}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <a
                  href="#outreach-kalkulator"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-cyan-400 transition-all cursor-pointer shadow-lg shadow-cyan-500/20 whitespace-nowrap"
                >
                  <span>{t.primaryCta}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="#outreach-architektura"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B101D] border border-white/15 px-5 py-3.5 text-sm font-semibold text-slate-200 hover:text-white hover:border-indigo-400/50 transition-all cursor-pointer whitespace-nowrap"
                >
                  <ShieldCheck className="h-4 w-4 text-indigo-400" />
                  <span>{t.secondaryCta}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Live 1:1 Personalization Preview Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#0B101D] border border-indigo-500/30 p-5 sm:p-7 shadow-2xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-400">
                    {t.previewHeader}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 whitespace-nowrap">SPF · DKIM · DMARC OK</span>
                </div>

                <div className="rounded-xl bg-black/50 border border-white/10 p-3.5 text-xs space-y-1">
                  <div className="text-slate-400 font-mono text-[11px]">{t.previewTargetLabel}</div>
                  <div className="text-white font-semibold">{t.previewTargetValue}</div>
                </div>

                <div className="rounded-xl bg-[#070B14] border border-white/10 p-4 space-y-3">
                  <div className="text-xs font-semibold text-cyan-300 border-b border-white/10 pb-2">
                    {t.previewSubject}
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    {t.previewBody}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>{t.previewFooter}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Quantified Metrics */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.heroMetrics.map((m, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#0B101D]/90 border border-white/10 p-6 flex flex-col justify-between"
              >
                <div className="text-2xl sm:text-3xl font-bold text-white font-display tabular-nums tracking-tight">
                  {m.value}
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. CORE CAPABILITIES BENTO GRID */}
      <section id="outreach-architektura" className="py-16 lg:py-24 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              {t.capabilitiesKicker}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display text-balance">
              {t.capabilitiesTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t.capabilitiesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.bento.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#0B101D] border border-white/10 hover:border-indigo-500/40 transition-all p-7 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-xs font-mono font-bold text-indigo-400 tracking-widest">
                      {t.modulePrefix} {item.num}
                    </span>
                    {idx === 0 && <Database className="h-5 w-5 text-cyan-400" />}
                    {idx === 1 && <Sparkles className="h-5 w-5 text-indigo-400" />}
                    {idx === 2 && <ShieldCheck className="h-5 w-5 text-emerald-400" />}
                    {idx === 3 && <Repeat className="h-5 w-5 text-cyan-400" />}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-5">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-cyan-300">
                  <span>{item.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE OUTREACH VOLUME & PIPELINE SIMULATOR */}
      <section id="outreach-kalkulator" className="py-16 lg:py-24 border-b border-white/10 bg-[#05080F]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              {t.simKicker}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display text-balance">
              {t.simTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t.simSubtitle}
            </p>
          </div>

          <div className="max-w-5xl mx-auto rounded-2xl bg-[#0B101D] border border-white/15 p-6 sm:p-10 shadow-2xl space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Controls */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <label className="text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-2">
                      <Sliders className="h-4 w-4 text-cyan-400 shrink-0" />
                      <span>{t.simVolumeLabel}</span>
                    </label>
                    <span className="text-xl font-bold text-cyan-400 font-mono tabular-nums whitespace-nowrap">
                      {monthlyContacts.toLocaleString(
                        currentLang === 'en' ? 'en-US' : currentLang === 'de' ? 'de-DE' : 'cs-CZ'
                      )}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={10000}
                    step={500}
                    value={monthlyContacts}
                    onChange={(e) => setMonthlyContacts(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer h-2 rounded-lg bg-black/60"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1.5 tabular-nums">
                    <span>1 000</span>
                    <span>3 000</span>
                    <span>5 000</span>
                    <span>7 500</span>
                    <span>10 000+</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-2.5">
                    {t.simRegionLabel}
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {(['cz_sk', 'dach', 'global'] as const).map((reg) => (
                      <button
                        key={reg}
                        type="button"
                        onClick={() => setSelectedRegion(reg)}
                        className={`text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          selectedRegion === reg
                            ? 'bg-cyan-500/15 border-cyan-400 text-white font-semibold'
                            : 'bg-black/40 border-white/10 text-slate-300 hover:border-white/25'
                        }`}
                      >
                        <span>{t.regions[reg]}</span>
                        {selectedRegion === reg && <Check className="h-4 w-4 text-cyan-400 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculated Pipeline Output */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-black/50 border border-white/10 p-5">
                  <Users className="h-5 w-5 text-slate-400 mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold text-white font-display tabular-nums">
                    {monthlyContacts.toLocaleString(
                      currentLang === 'en' ? 'en-US' : currentLang === 'de' ? 'de-DE' : 'cs-CZ'
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{t.simResultContacts}</div>
                </div>

                <div className="rounded-xl bg-black/50 border border-white/10 p-5">
                  <MailCheck className="h-5 w-5 text-cyan-400 mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold text-cyan-300 font-display tabular-nums">
                    ~{estimatedOpened.toLocaleString(
                      currentLang === 'en' ? 'en-US' : currentLang === 'de' ? 'de-DE' : 'cs-CZ'
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{t.simResultOpened}</div>
                </div>

                <div className="rounded-xl bg-black/50 border border-white/10 p-5">
                  <Send className="h-5 w-5 text-indigo-400 mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold text-indigo-300 font-display tabular-nums">
                    ~{estimatedReplies.toLocaleString(
                      currentLang === 'en' ? 'en-US' : currentLang === 'de' ? 'de-DE' : 'cs-CZ'
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{t.simResultReplies}</div>
                </div>

                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-5">
                  <Calendar className="h-5 w-5 text-emerald-400 mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-300 font-display tabular-nums">
                    {estimatedMeetings}–{Math.round(estimatedMeetings * 1.35)}
                  </div>
                  <div className="text-xs text-emerald-200/80 mt-1">{t.simResultMeetings}</div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                {t.simDisclaimer}
              </p>
              <button
                type="button"
                onClick={handleInquireFromSimulator}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-950 hover:bg-cyan-400 transition-all cursor-pointer shadow-lg shadow-cyan-500/20 whitespace-nowrap shrink-0"
              >
                <span>{t.simCta}</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPARISON: OLD COLD SPAM VS ADMATSU AI OUTREACH */}
      <section id="outreach-srovnani" className="py-16 lg:py-24 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              {t.compKicker}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display text-balance">
              {t.compTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Old Way */}
            <div className="rounded-2xl bg-[#0B101D]/60 border border-rose-500/20 p-7 sm:p-8 space-y-5">
              <h3 className="text-xl font-bold text-rose-300 font-display">
                {t.compBadTitle}
              </h3>
              <ul className="space-y-3.5">
                {t.compBadItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <X className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Admatsu Way */}
            <div className="rounded-2xl bg-[#0B101D] border border-cyan-500/35 p-7 sm:p-8 space-y-5 shadow-xl">
              <h3 className="text-xl font-bold text-cyan-300 font-display">
                {t.compGoodTitle}
              </h3>
              <ul className="space-y-3.5">
                {t.compGoodItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-100 leading-relaxed">
                    <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 4-STEP LAUNCH PROCESS */}
      <section id="outreach-proces" className="py-16 lg:py-24 border-b border-white/10 bg-[#05080F]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              {t.processKicker}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display text-balance">
              {t.processTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#0B101D] border border-white/10 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono pb-4 border-b border-white/10">
                    <span className="font-bold text-cyan-400">{step.num}</span>
                    <span className="text-slate-400 tabular-nums">{step.days}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-display mt-5 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section id="outreach-faq" className="py-16 lg:py-20 border-b border-white/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              {t.faqKicker}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
              {t.faqTitle}
            </h2>
          </div>

          <div className="space-y-3">
            {t.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#0B101D] border border-white/10 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-sm sm:text-base font-semibold text-white font-display">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-cyan-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

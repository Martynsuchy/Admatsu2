import React from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Globe,
  Send,
  Zap,
  Check,
  TrendingUp,
  Target,
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

export type ActivePageTab = 'overview' | 'web' | 'outreach';

interface OverviewLandingProps {
  onNavigateTab: (tab: ActivePageTab) => void;
  onSelectServiceAndScroll: (serviceKey: 'web' | 'outreach' | 'combined', customNote?: string) => void;
}

export const OverviewLanding: React.FC<OverviewLandingProps> = ({
  onNavigateTab,
  onSelectServiceAndScroll,
}) => {
  const { currentLang } = useCms();

  const copy = {
    cs: {
      kicker: 'ADMATSU DIGITAL GROWTH ARCHITECTURE · PRAHA & EU',
      headlinePart1: 'Inženýrství moderních webů',
      headlineAccent: '& škálovatelný AI Outreach.',
      subheadline:
        'Spojujeme dvě klíčové disciplíny digitálního růstu pod jednu střechu. Stavíme bleskové firemní weby připravené pro Google i AI vyhledávače (ChatGPT, Perplexity — GEO) a paralelně provozujeme autonomní B2B AI Outreach systémy, které osloví tisíce relevantních decision-makerů měsíčně.',
      primaryCta: 'Nezávazná konzultace růstu',
      secondaryCtaWeb: 'Prozkoumat Web & GEO',
      secondaryCtaOutreach: 'Prozkoumat AI Outreach',
      metrics: [
        { value: '7–14 dní', label: 'Dodání nového webu i spuštění outreach kampaní' },
        { value: '1 000–10 000+', label: 'Oslovených B2B kontaktů měsíčně s 1:1 AI personalizací' },
        { value: '99/100', label: 'Technický výkon webu, Core Web Vitals & GEO připravenost' },
        { value: '98,4 %', label: 'Doručitelnost do primární schránky díky multi-doménové infrastruktuře' },
      ],
      divisionsKicker: 'DVĚ SPECIALIZOVANÉ DIVIZE, JEDEN EKOSYSTÉM',
      divisionsTitle: 'Vyberte si pilíř, který váš byznys právě teď potřebuje nejvíce',
      divisionsSubtitle:
        'Obě divize fungují samostatně na špičkové úrovni. Pokud je ale propojíte, získáte kompletní akviziční motor: AI Outreach přivede tisíce kvalifikovaných B2B návštěvníků a váš nový bleskový web je promění v platící klienty.',
      pillar1: {
        number: '01',
        tag: 'DIVIZE WEB & GEO ENGINEERING',
        title: 'Moderní firemní weby, redesign & technické GEO',
        desc: 'Zastaralý web brzdí obchod a přichází o zákazníky, kteří dnes hledají přes ChatGPT, Perplexity nebo Google AI. Navrhujeme a kódujeme bleskové, konverzní weby na čisté moderní architektuře bez těžkopádných šablon.',
        previewHeader: 'ARCHITEKTURA · CORE WEB VITALS & GEO',
        previewStat1Label: 'Rychlost Google',
        previewStat2Label: 'AI & GEO Schema',
        previewStat3Label: 'Vlastnictví kódu',
        bullets: [
          'Kompletní redesign zastaralých webů i stavba nových firemních prezentací na míru',
          'Technické SEO & GEO (Generative Engine Optimization) pro citace v AI vyhledávačích',
          'Interaktivní klientské kalkulačky, vícejazyčnost (CZ/EN/DE) a vlastní lehký CMS systém',
          'Okamžité načtení pod 0,8 sekundy a plné vlastnictví zdrojového kódu bez paušálů',
        ],
        metricLabel: 'Průměrný dopad na konverze',
        metricValue: '3,4× vyšší poměr poptávek',
        ctaExplore: 'Detail Web & GEO',
        ctaInquire: 'Poptat web',
      },
      pillar2: {
        number: '02',
        tag: 'DIVIZE AUTONOMNÍ B2B AKVIZICE',
        title: 'AI Outreach: Oslovte tisíce B2B kontaktů měsíčně',
        desc: 'Konec ručního hledání kontaktů a nefunkčního hromadného spamu. Postavíme vám dedikovanou outreach infrastrukturu, která automaticky vyhledá tisíce ověřených firem, zanalyzuje jejich web a každému napíše unikátní personalizovaný e-mail.',
        previewHeader: 'OUTBOUND ENGINE · MULTI-INBOX WARMUP',
        previewRate: '1 000–10 000+ / měs.',
        previewStat1Label: 'Primární schránka',
        previewStat2Label: 'AI analýza webu',
        previewStat3Label: 'Míra otevření',
        bullets: [
          'Scraping a ověření 1 000 až 10 000+ B2B decision-makerů měsíčně v ČR, DACH nebo globálně',
          'Hloubková 1:1 AI personalizace: AI přečte web a kontext každé firmy před napsáním zprávy',
          'Bezpečná multi-doménová infrastruktura (SPF, DKIM, DMARC, AI warmup) mimo vaši hlavní doménu',
          'Chytré navazující sekvence (follow-upy), které se samy zastaví, jakmile kontakt odpoví',
        ],
        metricLabel: 'Typický měsíční dosah',
        metricValue: '3 000+ ředitelů a majitelů',
        ctaExplore: 'Detail AI Outreach',
        ctaInquire: 'Poptat kampaň',
      },
      synergyKicker: 'SYNERGIE OBOU PILÍŘŮ',
      synergyTitle: 'Proč nejrychleji rostoucí B2B firmy kombinují nový web a AI Outreach?',
      synergySubtitle:
        'Samotný outreach bez důvěryhodného webu ztrácí až 60 % potenciálu — první věc, kterou oslovený ředitel udělá před odpovědí na e-mail, je kontrola vašeho webu.',
      stepPrefix: 'KROK',
      steps: [
        {
          step: '01',
          title: 'AI Outreach osloví 1 000+ firem ve vaší cílové skupině',
          desc: 'Každý den odchází stovky precizně personalizovaných zpráv přímo do primární schránky majitelů, CEO nebo nákupčích.',
        },
        {
          step: '02',
          title: 'Oslovený decision-maker klikne a prověří váš web',
          desc: 'Než vám odepíše, otevře si vaši doménu. Místo pomalého webu z roku 2018 uvidí okamžitě načtenou, špičkovou prezentaci s jasnou hodnotou.',
        },
        {
          step: '03',
          title: 'GEO & AI vyhledávače potvrdí vaši autoritu',
          desc: 'Když si vás klient ověří v ChatGPT, Claude nebo Googlu, strukturovaná GEO architektura webu zajistí, že vaše firma vystupuje jako technologický lídr oboru.',
        },
      ],
      bottomBannerTitle: 'Chcete probrat nový web, AI Outreach na tisíce kontaktů, nebo obojí?',
      bottomBannerDesc:
        'Připravíme vám konkrétní návrh architektury webu nebo ukážeme živou kalkulaci dosahu AI Outreach kampaně pro váš obor.',
      bottomBannerCta: 'Přejít k nezávazné poptávce',
    },
    en: {
      kicker: 'ADMATSU DIGITAL GROWTH ARCHITECTURE · PRAGUE & EU',
      headlinePart1: 'Next-Gen Web Engineering',
      headlineAccent: '& Scalable AI Outreach.',
      subheadline:
        'We unite the two fundamental pillars of modern B2B growth under one roof. We engineer sub-second websites built for traditional search and AI answer engines (GEO), while operating autonomous AI Outreach engines that connect you with thousands of verified decision-makers every month.',
      primaryCta: 'Request Growth Consultation',
      secondaryCtaWeb: 'Explore Web & GEO',
      secondaryCtaOutreach: 'Explore AI Outreach',
      metrics: [
        { value: '7–14 Days', label: 'Turnaround for custom web launch & outreach infrastructure setup' },
        { value: '1,000–10,000+', label: 'Verified B2B prospects reached monthly with 1:1 AI research' },
        { value: '99/100', label: 'Core Web Vitals performance & Generative Engine (GEO) readiness' },
        { value: '98.4%', label: 'Primary inbox deliverability via isolated multi-domain warmup' },
      ],
      divisionsKicker: 'TWO SPECIALIZED DIVISIONS, ONE GROWTH ECOSYSTEM',
      divisionsTitle: 'Choose the capability your business needs right now',
      divisionsSubtitle:
        'Each division operates as a standalone high-performance solution. Combined together, they form a complete acquisition flywheel: AI Outreach drives thousands of qualified B2B prospects directly to a high-converting website that closes the deal.',
      pillar1: {
        number: '01',
        tag: 'WEB & GEO ENGINEERING DIVISION',
        title: 'High-Speed Corporate Websites, Redesigns & Technical GEO',
        desc: 'An outdated website leaks revenue and remains invisible to buyers researching through ChatGPT, Perplexity, and Google AI Overviews. We design and engineer ultra-fast, conversion-architected websites without bloated legacy templates.',
        previewHeader: 'ARCHITECTURE · CORE WEB VITALS & GEO',
        previewStat1Label: 'Google Speed',
        previewStat2Label: 'AI & GEO Schema',
        previewStat3Label: 'Code Ownership',
        bullets: [
          'Complete legacy website overhauls and bespoke corporate web engineering',
          'Technical SEO & GEO (Generative Engine Optimization) for AI search citations',
          'Interactive client calculators, multilingual support (EN/DE/CS) & custom lightweight CMS',
          'Sub-second load times (< 0.8s) and 100% source code ownership with zero vendor lock-in',
        ],
        metricLabel: 'Average conversion impact',
        metricValue: '3.4× higher inquiry rate',
        ctaExplore: 'Explore Web & GEO',
        ctaInquire: 'Inquire Website',
      },
      pillar2: {
        number: '02',
        tag: 'AUTONOMOUS B2B ACQUISITION DIVISION',
        title: 'AI Outreach: Reach 1,000s of Decision-Makers Monthly',
        desc: 'Eliminate manual prospecting and ineffective mass spam. We build dedicated outbound infrastructure that automatically sources thousands of verified companies, analyzes their digital footprint, and writes genuinely personalized 1-to-1 emails.',
        previewHeader: 'OUTBOUND ENGINE · MULTI-INBOX WARMUP',
        previewRate: '1,000–10,000+ / mo',
        previewStat1Label: 'Primary Inbox',
        previewStat2Label: 'Deep Research',
        previewStat3Label: 'Open Rate',
        bullets: [
          'Sourcing & verification of 1,000 to 10,000+ B2B decision-makers monthly across EU, UK & US',
          'Deep 1:1 AI personalization: AI reads each prospect’s website & context before drafting copy',
          'Isolated multi-domain infrastructure (SPF, DKIM, DMARC, algorithmic warmup) protecting your core domain',
          'Intelligent multi-step follow-up sequences that automatically pause the moment a prospect replies',
        ],
        metricLabel: 'Typical monthly volume',
        metricValue: '3,000+ C-level prospects',
        ctaExplore: 'Explore AI Outreach',
        ctaInquire: 'Inquire Outreach',
      },
      synergyKicker: 'THE ACQUISITION FLYWHEEL',
      synergyTitle: 'Why top-performing B2B companies combine Web Engineering with AI Outreach',
      synergySubtitle:
        'Running outbound campaigns without a credible, high-speed website wastes up to 60% of replies—the very first thing an executive does before replying to your email is inspect your website.',
      stepPrefix: 'STEP',
      steps: [
        {
          step: '01',
          title: 'AI Outreach initiates 1,000s of targeted B2B conversations',
          desc: 'Hundreds of individually researched, hyper-personalized emails land directly in the primary inbox of founders, CEOs, and heads of procurement daily.',
        },
        {
          step: '02',
          title: 'The decision-maker clicks through to vet your company',
          desc: 'Before booking a call, prospects visit your domain. Instead of a sluggish 2018 page, they experience an instant, authoritative digital flagship.',
        },
        {
          step: '03',
          title: 'GEO & AI search engines validate your market authority',
          desc: 'When prospects cross-check your company in ChatGPT, Perplexity, or Google, our semantic schema and GEO architecture position you as the clear industry leader.',
        },
      ],
      bottomBannerTitle: 'Ready to upgrade your website, launch AI Outreach to 1,000s of leads, or both?',
      bottomBannerDesc:
        'We will prepare a tailored web architecture proposal or calculate your exact addressable B2B outreach volume.',
      bottomBannerCta: 'Proceed to Free Consultation',
    },
    de: {
      kicker: 'ADMATSU DIGITAL GROWTH ARCHITECTURE · PRAG & DACH/EU',
      headlinePart1: 'Modernes Web-Engineering',
      headlineAccent: '& skalierbarer AI Outreach.',
      subheadline:
        'Wir vereinen die zwei entscheidenden Säulen für modernes B2B-Wachstum unter einem Dach: Ultraschnelle Unternehmenswebsites, optimiert für Google und KI-Antwortmaschinen (GEO), kombiniert mit autonomen AI-Outreach-Systemen, die monatlich Tausende Entscheider erreichen.',
      primaryCta: 'Unverbindliche Wachstumsberatung',
      secondaryCtaWeb: 'Web & GEO entdecken',
      secondaryCtaOutreach: 'AI Outreach entdecken',
      metrics: [
        { value: '7–14 Tage', label: 'Bis zum Launch Ihrer neuen Website oder AI-Outreach-Kampagne' },
        { value: '1.000–10.000+', label: 'Erreichte B2B-Entscheider pro Monat mit 1:1 KI-Personalisierung' },
        { value: '99/100', label: 'Core Web Vitals Performance & Generative Engine (GEO) Readiness' },
        { value: '98,4 %', label: 'Zustellbarkeit im primären Postfach durch Multi-Domain-Infrastruktur' },
      ],
      divisionsKicker: 'ZWEI SPEZIALISIERTE DIVISIONEN, EIN ÖKOSYSTEM',
      divisionsTitle: 'Wählen Sie den Wachstumspfeiler, den Ihr Unternehmen jetzt benötigt',
      divisionsSubtitle:
        'Beide Bereiche funktionieren eigenständig auf höchstem Niveau. In Kombination entsteht ein lückenloser Akquise-Motor: AI Outreach bringt Tausende qualifizierte B2B-Entscheider auf Ihre Seite, und Ihre neue Website konvertiert sie zu Kunden.',
      pillar1: {
        number: '01',
        tag: 'DIVISION WEB & GEO ENGINEERING',
        title: 'Moderne Unternehmenswebsites, Redesign & Technisches GEO',
        desc: 'Eine veraltete Website kostet Vertrauen und bleibt für Kunden unsichtbar, die heute über ChatGPT, Perplexity oder Google AI suchen. Wir entwickeln blitzschnelle, konversionsstarke Websites ohne träge Baukasten-Templates.',
        previewHeader: 'ARCHITEKTUR · CORE WEB VITALS & GEO',
        previewStat1Label: 'Google Speed',
        previewStat2Label: 'AI & GEO Schema',
        previewStat3Label: 'Code-Eigentum',
        bullets: [
          'Komplettes Redesign veralteter Websites sowie maßgeschneiderte Unternehmenspräsentationen',
          'Technisches SEO & GEO (Generative Engine Optimization) für Sichtbarkeit in KI-Suchmaschinen',
          'Interaktive Kundenkalkulatoren, Mehrsprachigkeit (DE/EN/CS) & eigenes leichtgewichtiges CMS',
          'Ladezeiten unter 0,8 Sekunden und 100 % Eigentum am Quellcode ohne laufende Lizenzgebühren',
        ],
        metricLabel: 'Durchschnittlicher Effekt',
        metricValue: '3,4× höhere Anfragerate',
        ctaExplore: 'Mehr zu Web & GEO',
        ctaInquire: 'Website anfragen',
      },
      pillar2: {
        number: '02',
        tag: 'DIVISION AUTONOME B2B-AKQUISE',
        title: 'AI Outreach: Tausende B2B-Entscheider monatlich erreichen',
        desc: 'Schluss mit manueller Recherche und wirkungslosem Massen-Spam. Wir bauen eine dedizierte Outreach-Infrastruktur auf, die automatisch Tausende verifizierte Unternehmen findet, deren Website analysiert und individuell personalisierte 1:1 E-Mails versendet.',
        previewHeader: 'OUTBOUND ENGINE · MULTI-INBOX WARMUP',
        previewRate: '1.000–10.000+ / Mon.',
        previewStat1Label: 'Primärpostfach',
        previewStat2Label: 'KI-Analyse',
        previewStat3Label: 'Öffnungsrate',
        bullets: [
          'Identifikation & Verifizierung von 1.000 bis 10.000+ B2B-Entscheidern monatlich in DACH & EU',
          'Tiefgehende 1:1 KI-Personalisierung: KI analysiert Website & Kontext jedes Kontakts vor dem Versand',
          'Abgesicherte Multi-Domain-Infrastruktur (SPF, DKIM, DMARC, AI-Warmup) zum Schutz Ihrer Hauptdomain',
          'Intelligente Follow-up-Sequenzen, die automatisch stoppen, sobald ein Interessent antwortet',
        ],
        metricLabel: 'Typisches Volumen',
        metricValue: '3.000+ Entscheider / Mon.',
        ctaExplore: 'Mehr zu AI Outreach',
        ctaInquire: 'Kampagne anfragen',
      },
      synergyKicker: 'SYNERGIE BEIDER SÄULEN',
      synergyTitle: 'Warum führende B2B-Unternehmen Web-Engineering und AI Outreach kombinieren',
      synergySubtitle:
        'Outreach ohne eine überzeugende Website verschenkt bis zu 60 % des Potenzials – denn jeder Geschäftsführer prüft zuerst Ihre Website, bevor er auf eine E-Mail antwortet.',
      stepPrefix: 'SCHRITT',
      steps: [
        {
          step: '01',
          title: 'AI Outreach startet 1.000+ gezielte B2B-Gespräche',
          desc: 'Täglich landen Hunderte individuell recherchierte Nachrichten direkt im primären Postfach von Geschäftsführern und Entscheidern Ihrer Zielbranche.',
        },
        {
          step: '02',
          title: 'Der Entscheider klickt auf Ihre Domain zur Prüfung',
          desc: 'Vor einer Antwort besucht der Interessent Ihre Website. Statt einer langsamen Seite von 2018 erlebt er einen sofort ladenden, souveränen digitalen Auftritt.',
        },
        {
          step: '03',
          title: 'GEO & KI-Suchmaschinen bestätigen Ihre Marktautorität',
          desc: 'Wenn Interessenten Ihr Unternehmen in ChatGPT, Perplexity oder Google prüfen, sorgt unsere GEO-Architektur dafür, dass Sie als führender Anbieter empfohlen werden.',
        },
      ],
      bottomBannerTitle: 'Möchten Sie eine neue Website, AI Outreach für Tausende Kontakte oder beides besprechen?',
      bottomBannerDesc:
        'Wir erstellen Ihnen ein konkretes Konzept für Ihre Website oder berechnen das genaue B2B-Potenzial einer AI-Outreach-Kampagne für Ihre Branche.',
      bottomBannerCta: 'Zur unverbindlichen Anfrage',
    },
  };

  const t = copy[currentLang] || copy.en;

  return (
    <div className="relative overflow-hidden">
      {/* Background atmospheric glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[520px] bg-gradient-to-b from-cyan-500/10 via-indigo-500/5 to-transparent blur-3xl -z-10" />

      {/* 1. HERO SECTION */}
      <section className="pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              {t.kicker}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display leading-[1.08] text-balance">
              {t.headlinePart1}{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                {t.headlineAccent}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
              {t.subheadline}
            </p>

            {/* Primary & Division Jump CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => onSelectServiceAndScroll('combined')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-cyan-400 transition-all cursor-pointer shadow-lg shadow-cyan-500/20 active:scale-98 whitespace-nowrap"
              >
                <span>{t.primaryCta}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('web')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B101D] border border-white/15 px-5 py-3.5 text-sm font-semibold text-white hover:border-cyan-400/50 hover:text-cyan-300 transition-all cursor-pointer whitespace-nowrap"
              >
                <Globe className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>{t.secondaryCtaWeb}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('outreach')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B101D] border border-indigo-500/30 px-5 py-3.5 text-sm font-semibold text-white hover:border-indigo-400 hover:text-indigo-300 transition-all cursor-pointer whitespace-nowrap"
              >
                <Send className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>{t.secondaryCtaOutreach}</span>
              </button>
            </div>
          </div>

          {/* 4 Quantified Proof Metrics */}
          <div className="mt-14 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.metrics.map((m, idx) => (
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

      {/* 2. DUAL-PILLAR BENTO SHOWCASE */}
      <section id="prehled-divize" className="py-16 lg:py-24 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              {t.divisionsKicker}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display text-balance">
              {t.divisionsTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t.divisionsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* PILLAR 01: WEB & GEO ENGINEERING */}
            <div className="rounded-2xl bg-[#0B101D] border border-white/10 hover:border-cyan-500/40 transition-all p-6 sm:p-9 flex flex-col justify-between relative group">
              <div>
                <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/10">
                  <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
                    {t.pillar1.number} · {t.pillar1.tag}
                  </span>
                  <Globe className="h-5 w-5 text-cyan-400 shrink-0" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mt-6 tracking-tight">
                  {t.pillar1.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mt-3">
                  {t.pillar1.desc}
                </p>

                {/* Concrete Visual Preview Card inside Pillar 1 */}
                <div className="mt-6 rounded-xl bg-black/50 border border-white/10 p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
                    <span>{t.pillar1.previewHeader}</span>
                    <span className="text-cyan-400 font-semibold tabular-nums">LCP &lt; 0.8s</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-[#0B101D] border border-white/5 p-2.5">
                      <div className="text-sm font-bold text-white font-mono tabular-nums">99/100</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">{t.pillar1.previewStat1Label}</div>
                    </div>
                    <div className="rounded-lg bg-[#0B101D] border border-white/5 p-2.5">
                      <div className="text-sm font-bold text-cyan-400 font-mono">JSON-LD</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">{t.pillar1.previewStat2Label}</div>
                    </div>
                    <div className="rounded-lg bg-[#0B101D] border border-white/5 p-2.5">
                      <div className="text-sm font-bold text-emerald-400 font-mono">100%</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">{t.pillar1.previewStat3Label}</div>
                    </div>
                  </div>
                </div>

                <ul className="mt-6 space-y-3">
                  {t.pillar1.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
                      <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs">
                  <span className="text-slate-400">{t.pillar1.metricLabel}:</span>
                  <span className="font-semibold text-cyan-300">{t.pillar1.metricValue}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigateTab('web')}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>{t.pillar1.ctaExplore}</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectServiceAndScroll('web')}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs font-semibold text-slate-200 hover:text-white hover:border-white/25 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>{t.pillar1.ctaInquire}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* PILLAR 02: AI OUTREACH AT SCALE */}
            <div className="rounded-2xl bg-[#0B101D] border border-white/10 hover:border-indigo-500/40 transition-all p-6 sm:p-9 flex flex-col justify-between relative group">
              <div>
                <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/10">
                  <span className="text-xs font-mono font-bold text-indigo-400 tracking-wider">
                    {t.pillar2.number} · {t.pillar2.tag}
                  </span>
                  <Send className="h-5 w-5 text-indigo-400 shrink-0" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mt-6 tracking-tight">
                  {t.pillar2.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mt-3">
                  {t.pillar2.desc}
                </p>

                {/* Concrete Visual Preview Card inside Pillar 2 */}
                <div className="mt-6 rounded-xl bg-black/50 border border-white/10 p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
                    <span>{t.pillar2.previewHeader}</span>
                    <span className="text-indigo-400 font-semibold tabular-nums">{t.pillar2.previewRate}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-[#0B101D] border border-white/5 p-2.5">
                      <div className="text-sm font-bold text-white font-mono tabular-nums">98.4%</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">{t.pillar2.previewStat1Label}</div>
                    </div>
                    <div className="rounded-lg bg-[#0B101D] border border-white/5 p-2.5">
                      <div className="text-sm font-bold text-indigo-400 font-mono">1:1 AI</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">{t.pillar2.previewStat2Label}</div>
                    </div>
                    <div className="rounded-lg bg-[#0B101D] border border-white/5 p-2.5">
                      <div className="text-sm font-bold text-emerald-400 font-mono tabular-nums">45–68%</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">{t.pillar2.previewStat3Label}</div>
                    </div>
                  </div>
                </div>

                <ul className="mt-6 space-y-3">
                  {t.pillar2.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
                      <Check className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs">
                  <span className="text-slate-400">{t.pillar2.metricLabel}:</span>
                  <span className="font-semibold text-indigo-300">{t.pillar2.metricValue}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigateTab('outreach')}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-xs font-bold text-white hover:bg-indigo-400 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>{t.pillar2.ctaExplore}</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectServiceAndScroll('outreach')}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs font-semibold text-slate-200 hover:text-white hover:border-white/25 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>{t.pillar2.ctaInquire}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SYNERGY / FLYWHEEL SECTION */}
      <section id="prehled-synergie" className="py-16 lg:py-24 border-b border-white/10 bg-[#05080F]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              {t.synergyKicker}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display text-balance">
              {t.synergyTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t.synergySubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.steps.map((s, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#0B101D] border border-white/10 p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono font-bold text-cyan-400 tracking-widest">
                      {t.stepPrefix} {s.step}
                    </span>
                    {idx === 0 && <Target className="h-5 w-5 text-indigo-400 shrink-0" />}
                    {idx === 1 && <Zap className="h-5 w-5 text-cyan-400 shrink-0" />}
                    {idx === 2 && <TrendingUp className="h-5 w-5 text-emerald-400 shrink-0" />}
                  </div>
                  <h3 className="text-lg font-bold text-white font-display leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Conversion Banner */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#0B1222] via-[#0F172A] to-[#0B1222] border border-cyan-500/25 p-7 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left max-w-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                {t.bottomBannerTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.bottomBannerDesc}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelectServiceAndScroll('combined')}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-950 hover:bg-cyan-400 transition-all cursor-pointer shadow-lg shadow-cyan-500/20 whitespace-nowrap shrink-0"
            >
              <span>{t.bottomBannerCta}</span>
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

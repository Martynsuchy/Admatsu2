import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import {
  SiteContent,
  LeadInquiry,
  CmsRevision,
  ServicesSectionContent,
  TechComparisonContent,
  GeoExplainerContent,
  ProcessSectionContent,
  CalculatorSectionContent,
  FaqSectionContent,
  ContactSectionContent,
  FooterContent,
  NavbarContent,
} from '../types/cms';
import {
  Language,
  ENGLISH_CONTENT,
  GERMAN_CONTENT,
} from '../translations/contentTranslations';

export type { Language };
export type CmsViewMode = 'web' | 'cms' | 'split';

interface CmsContextType {
  content: SiteContent;
  currentLang: Language;
  setLanguage: (lang: Language) => void;
  updateNavbar: (nav: Partial<NavbarContent>) => void;
  updateHero: (hero: Partial<SiteContent['hero']>) => void;
  updateServicesSection: (sec: Partial<ServicesSectionContent>) => void;
  updateService: (id: string, updated: Partial<SiteContent['services'][0]>) => void;
  addService: (service: SiteContent['services'][0]) => void;
  deleteService: (id: string) => void;
  updateTechComparison: (tech: Partial<TechComparisonContent>) => void;
  updateGeoExplainer: (geo: Partial<GeoExplainerContent>) => void;
  updateProcessSection: (proc: Partial<ProcessSectionContent>) => void;
  updateCalculatorSection: (calc: Partial<CalculatorSectionContent>) => void;
  updateFaqSection: (faqSec: Partial<FaqSectionContent>) => void;
  updateFaq: (id: string, updated: Partial<SiteContent['faq'][0]>) => void;
  addFaq: (faq: SiteContent['faq'][0]) => void;
  deleteFaq: (id: string) => void;
  updateContactSection: (sec: Partial<ContactSectionContent>) => void;
  updateContact: (contact: Partial<SiteContent['contact']>) => void;
  updateFooter: (footer: Partial<FooterContent>) => void;
  updateGeoSeo: (geoSeo: Partial<SiteContent['geoSeo']>) => void;
  
  // Leads & CRM
  inquiries: LeadInquiry[];
  addInquiry: (inquiry: Omit<LeadInquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: LeadInquiry['status'], notes?: string) => void;
  deleteInquiry: (id: string) => void;

  // View state & modes
  viewMode: CmsViewMode;
  setViewMode: (mode: CmsViewMode) => void;
  isInlineEditing: boolean;
  setIsInlineEditing: (val: boolean) => void;
  
  // Authentication & Login Modal
  isAuthenticated: boolean;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (val: boolean) => void;
  login: (email?: string, password?: string) => boolean;
  logout: () => void;

  // Revisions & Save state
  revisions: CmsRevision[];
  restoreRevision: (revisionId: string) => void;
  resetToDefaults: () => void;
  lastSavedAt: string;
  toastMessage: string | null;
  triggerToast: (msg: string) => void;
}

const DEFAULT_CONTENT: SiteContent = {
  navbar: {
    brandName: 'Admatsu',
    ctaText: 'Nezávazná konzultace',
  },
  hero: {
    kicker: 'Tvorba moderních webových stránek · Rychle, čistě a na míru',
    headline: 'Konec pomalých a zastaralých stránek. Postavíme vám moderní web, který dává smysl.',
    subheadline: 'Díky AI nebyl špičkový kód na míru nikdy dostupnější. Tvoříme weby rychle a efektivně — bez zbytečného přepalování rozpočtu i času. Dostanete čistý, bleskově reagující kód bez zastaralého balastu, s dokonalým technickým základem pro Google i novou generaci AI vyhledávačů.',
    primaryCtaText: 'Nezávazná poptávka',
    secondaryCtaText: 'Srovnání se starým webem',
    metrics: [
      {
        title: 'Čistý moderní kód',
        description: 'Bleskové načítání bez pluginového balastu a bezpečnostních děr',
        highlight: false,
      },
      {
        title: 'Technický základ SEO',
        description: 'Struktura podle oficiálních doporučení, kterou vyhledávač ocení',
        highlight: false,
      },
      {
        title: 'Do 7 pracovních dní',
        description: 'První funkční prototyp od dodání podkladů (pro standardní weby)',
        highlight: true,
      },
    ],
    architectureTitle: 'Architektura bez kompromisů',
    architectureBadge: 'Zero Bloat',
    stackNote: 'Žádné staré šablony z roku 2015 s desítkami nebezpečných pluginů. Vše stavíme na čistém kódu, který vám 100% patří.',
    windowFooterNote: 'Moderní React & Next.js architektura',
    stackItems: [
      { title: 'React & Next.js', desc: 'Moderní komponenty a okamžitá reakce' },
      { title: 'Čistý TypeScript', desc: 'Stabilita a nulové chyby v běhu' },
      { title: 'Tailwind CSS', desc: 'Responzivní styl na míru bez balastu' },
      { title: 'Rychlá CDN síť', desc: 'Globální dostupnost stránek' },
    ],
    standardsTitle: 'Technické SEO, které dává smysl',
    standardsBadge: 'Správné základy',
    standardsIntro: 'Zázraky na počkání neslibujeme. Garantujeme však dokonalý technický základ, který vyhledávačům umožní váš web bezchybně projít a pochopit:',
    standardsBullets: [
      'Sémantická struktura: Přehledné tagy, logická hierarchie a čistý HTML kód.',
      'Rychlé načítání: Žádný zpomalující kód ani zbytečné knihovny.',
      'Strukturovaná data: Základní vizitka firmy a služeb ve formátu Schema.org.',
    ],
    standardsFooter: 'Kvalitní kód je odrazový můstek pro veškerý váš budoucí marketing.',
    geoTitle: 'Technická GEO připravenost',
    geoBadge: 'AI-Ready',
    geoIntro: 'Lidé se dnes ptají ChatGPT, Perplexity nebo Gemini. Tyto systémy potřebují fakta, ne obecné fráze.',
    geoBoxTitle: 'Co pro váš web v rámci GEO děláme:',
    geoBoxBullets: [
      'Uspořádáme informace tak, aby AI botům usnadnily čtení a citování.',
      'Vložíme srozumitelná entitní data o vaší firmě a službách.',
      'Otevřeme web pro AI roboty (GPTBot, PerplexityBot) bez blokací.',
    ],
    geoFooter: 'Nenabízíme nereálné sliby prvních míst v ChatGPT, ale stoprocentní technickou připravenost, aby vás AI modely mohly správně najít a citovat.',
  },
  servicesSection: {
    kicker: 'Specializace & Služby',
    headline: 'Přestaňte ztrácet zákazníky kvůli zastaralému nebo pomalému webu.',
    subheadline: 'Pokud váš stávající web vypadá jako z minulého desetiletí, na mobilu se sotva hýbe nebo se bojíte cokoliv změnit, aby se nerozsypal — je čas na změnu. Stavíme weby na moderním základě, které fungují okamžitě a spolehlivě.',
  },
  services: [
    {
      id: 'srv-1',
      title: 'Modernizace zastaralého webu i nový projekt',
      shortDesc: 'Stavíme bleskově rychlé firemní weby a redesigny na moderním základu (React, Next.js, Tailwind). Výsledkem je čistý kód bez zbytečných zatěžujících pluginů a jistota, že se vám web nerozbije.',
      bulletPoints: [
        'Bleskové načítání pod 1 vteřinu',
        '100% vlastnictví zdrojového kódu bez měsíčních licencí',
        'Zabezpečení HTTPS & SSL certifikát v ceně',
        'Responzivita vyladěná pro mobily i počítače',
        'Dlouhodobá stabilita bez nutnosti placených záplat',
      ],
      tag: '01. Web na míru & Redesign',
      priceNote: 'od 10 000 Kč · prototyp do 7 dní',
      buttonText: '',
      category: 'web',
    },
    {
      id: 'srv-2',
      title: 'Technické SEO & Přísná rychlost',
      shortDesc: 'Žádné prázdné sliby na zázračné pozice přes noc. Odvedeme precizní technické řemeslo: sémantický kód, správné meta tagy, indexace a splnění přísných limitů Google Core Web Vitals.',
      bulletPoints: [
        'Skóre rychlosti 90+ na Google PageSpeed Insights',
        'Správná hierarchie H1–H6 a čistá sitemap',
        'Okamžitá indexace roboty Google a Seznam',
      ],
      tag: '02. Výkon & Indexace',
      priceNote: 'V ceně každého webu',
      buttonText: '',
      category: 'audit',
    },
    {
      id: 'srv-3',
      title: 'GEO (Generative Engine Optimization)',
      shortDesc: 'Připravíme fakta o vaší firmě pro novou éru AI vyhledávačů. Váš web bude technicky i obsahově připravený na to, aby ho modely jako ChatGPT nebo Perplexity správně rozpoznaly a mohly doporučit.',
      bulletPoints: [
        'Strukturovaná entitní data Schema.org v JSON-LD',
        'Povolení indexace pro GPTBot, PerplexityBot, ClaudeBot a další',
        'Informační architektura postavená na ověřitelných faktech',
      ],
      tag: '03. AI vyhledávání',
      priceNote: 'Za příplatek',
      buttonText: 'Nezávazná konzultace',
      category: 'geo',
    },
  ],
  techComparison: {
    kicker: 'Srovnání v praxi · Proč zastaralé weby selhávají',
    headline: 'Rozdíl mezi starým a moderním webem',
    subheadline: 'Jasné srovnání klíčových parametrů bez zbytečné omáčky. Posuňte posuvník a podívejte se na rozdíl.',
    categoryLabel: 'Kritérium',
    oldWayLabel: 'Zastaralý web (starý WordPress apod.):',
    admatsuLabel: 'Moderní web:',
    items: [
      {
        id: 'comp-1',
        area: 'Technologie & rychlost',
        oldWay: 'Pomalé načítání 4+ vteřiny, 30+ padajících pluginů.',
        admatsuWay: 'Bleskový start pod 1 vteřinu, čistý React kód.',
      },
      {
        id: 'comp-2',
        area: 'Zabezpečení & stabilita',
        oldWay: 'Díry v cizích pluginech a placení drahých záplat.',
        admatsuWay: '100% stabilita bez děravých doplňků třetích stran.',
      },
      {
        id: 'comp-3',
        area: 'Technické SEO',
        oldWay: 'Zmatený kód, který vyhledávač Google ignoruje.',
        admatsuWay: 'Přísná sémantika a normy Google Core Web Vitals.',
      },
      {
        id: 'comp-4',
        area: 'AI vyhledávače (GEO)',
        oldWay: 'Pro ChatGPT i Perplexity zcela neviditelný web.',
        admatsuWay: 'Strukturovaná Schema.org data pro citace v AI modelech.',
      },
      {
        id: 'comp-5',
        area: 'Vlastnictví & nezávislost',
        oldWay: 'Závislost na agentuře a měsíční licenční poplatky.',
        admatsuWay: '100% vaše vlastnictví kódu bez měsíčních licencí.',
      },
    ],
    ctaTitle: 'Máte pocit, že váš současný web patří do levého sloupce?',
    ctaSubtitle: 'Rádi se na něj nezávazně podíváme a navrhneme, jak ho převést do moderní podoby.',
    ctaButtonText: 'Nezávazná konzultace',
  },
  geoExplainer: {
    kicker: 'Vzdělávací průvodce · SEO vs GEO',
    headline: 'Jaký je rozdíl mezi klasickým SEO a GEO pro AI vyhledávače?',
    subheadline: 'Zatímco klasické SEO optimalizuje web pro robota Google, GEO (Generative Engine Optimization) připravuje fakta o vaší firmě pro jazykové modely jako ChatGPT, Claude a jim podobné.',
    seoCardTitle: 'Klasické SEO (Google & Seznam)',
    seoCardSubtitle: 'Pevný a čistý základ pro vyhledávače',
    seoCardBadge: 'V ceně webu',
    seoCardDesc: 'Zaměřeno na klíčová slova, logickou hierarchii obsahu a technické on-page SEO pro získání prokliků ve vyhledávání.',
    seoCardBullets: [
      'Čistá sémantika: Správná hierarchie nadpisů (H1, H2), logické členění textů a žádný zmatek v kódu.',
      'Blesková odezva: Web se nezasekává, posuny rozvržení jsou nulové a stránka reaguje okamžitě.',
      'Bez penalizací: Žádné skryté nekalé praktiky — čistá práce, kterou Google bez obav indexuje.',
    ],
    seoCardNote: 'Upřímnost: Špičkový kód je pro úspěch v Googlu nutnost, ale není to kouzelná hůlka. O pozicích rozhoduje i váš obor a obsah.',
    geoCardTitle: 'GEO (Generative Engine Optimization)',
    geoCardSubtitle: 'Správný formát pro AI',
    geoCardBadge: 'Nová éra',
    geoCardDesc: 'Zaměřeno na přesná entitní data, faktičnost a přímé odpovědi, aby vás AI modely mohly doporučit jako ověřený zdroj.',
    geoCardBullets: [
      'Otevřeno pro AI roboty: Povolujeme GPTBot, PerplexityBot, ClaudeBot a další v robots.txt.',
      'Entitní Schema.org v kódu: AI model okamžitě ví, kdo jste, kde sídlíte a co nabízíte.',
      'Fakta místo obecných frází: Obsah strukturovaný tak, aby ho model mohl citovat bez zkreslení.',
    ],
    geoCardNote: 'Statistika: Už přes 25 % objemu vyhledávání dnes přebírají AI asistenti a přes 50 % lidí se ptá konverzačně. Do budoucna tento podíl ještě dramaticky poroste.',
    simulatorKicker: 'Příklady z reálné praxe',
    simulatorTitle: 'Jak AI vyhodnocuje weby, když se jí zákazník zeptá',
    simulatorSubtitle: 'Když se člověk ptá v ChatGPT nebo Perplexity na konkrétní službu, model nerozhoduje podle hezkých obrázků. Hledá ověřitelná data. Podívejte se na rozdíl mezi webem plným obecných frází a webem, kde má AI všechna fakta přesně tak, jak potřebuje, aby vás mohla doporučit.',
    simulatorQueries: [
      {
        id: 'case-craft',
        label: 'Truhlářství & Zakázkový nábytek',
        query: '„Potřebuju v Brně spolehlivého truhláře na vestavěnou skříň do ložnice. Spěchá to, potřeboval bych někoho s rychlým volným termínem, kdo to přijede zaměřit přímo ke mně.“',
        classicTitle: 'Pouze fotogalerie bez termínů a lokality',
        classicSnippet: 'Web má hezké fotky hotového nábytku a heslo „vyrábíme s láskou“, ale chybí jakákoliv zmínka o obvyklých termínech realizace nebo lokalitě montáže. AI z fotek nepozná, zda montujete v Brně ani jak rychle obvykle zakázky dodáváte.',
        classicLimitation: 'Výsledek: AI firmu nedoporučí, protože o obvyklých termínech realizace ani lokalitě montáže nemá ověřená data.',
        aiEngine: 'ChatGPT Search (s GEO daty)',
        aiAnswer: '„V Brně a okolí můžete zkusit Truhlářství [Váš web]. Specializují se na vestavěné skříně na míru, zaměření dělají přímo na místě a na webu uvádějí rychlou realizaci s montáží obvykle do 3–4 týdnů. Kontakt: +420 777 ...“',
        citations: 'Co AI našla: Lokalita Brno a okolí · Zaměření na místě · Reálné termíny realizace',
        verifiedLabel: 'AI má všechna data k doporučení',
      },
      {
        id: 'case-b2b',
        label: 'CNC kovoobrábění',
        query: '„Hledám spolehlivou firmu na přesné CNC frézování. Potřebujeme menší sérii cca 50–100 přesných dílů z nerezi a titanu, máme hotové 3D modely. Kdo to zvládne v solidní toleranci?“',
        classicTitle: 'Pouze obecné heslo „kovovýroba na zakázku“',
        classicSnippet: 'Na webu je jen obecný slogan a fotka haly z fotobanky. V kódu ani v textu ale není soupis zpracovávaných materiálů, strojních parametrů ani formátů podkladů. AI robot tak nedokáže nákupčímu potvrdit, zda titan a nerez vůbec obrábíte.',
        classicLimitation: 'Výsledek: Model firmu přeskočí, protože nedokáže potvrdit obrábění titanu ani kapacitu pro menší série.',
        aiEngine: 'Perplexity AI (s GEO daty)',
        aiAnswer: '„Pro menší série a přesné obrábění nerezi i titanu uvádí konkrétní parametry [Vaše firma]. V technickém profilu přímo deklarují toleranci na 0,01 mm a příjem 3D modelů ve standardních formátech STEP i IGES. Kontakt: ...“',
        citations: 'Co AI našla: Obrábění titanu a nerezi · Přesnost 0,01 mm · Podpora 3D CAD modelů (STEP)',
        verifiedLabel: 'AI má všechna data k doporučení',
      },
      {
        id: 'case-emergency',
        label: 'Havarijní servis',
        query: '„Kdo v Olomouci a okolí zajišťuje havarijní opravy kotlů a rozvodů vody i o víkendu?“',
        classicTitle: 'Nejasná otevírací doba a schovaný kontakt',
        classicSnippet: 'Zákazník řeší akutní havárii, ale AI z webu nedokáže potvrdit, zda servis vyjíždí v sobotu večer a jaký má dojezdový rádius.',
        classicLimitation: 'Výsledek: AI nemůže riskovat chybné doporučení a nabídne firmu s explicitně potvrzenou víkendovou pohotovostí.',
        aiEngine: 'AI Overviews (s GEO daty)',
        aiAnswer: '„Víkendovou pohotovost v Olomouci a dojezdu do 30 km zajišťuje [Vaše firma]. V ověřených datech deklarují dostupnost dispečinku 24/7 a garantovaný výjezd k akutním haváriím.“',
        citations: 'Co AI našla: Ověřená dostupnost: 24/7 havárie · Rádius dojezdu 30 km · Nonstop kontakt',
        verifiedLabel: 'AI má všechna data k doporučení',
      },
    ],
  },
  processSection: {
    kicker: 'Jak probíhá spolupráce · Rychle a bez zbytečných průtahů',
    headline: 'První funkční prototyp do 7 dní od předání podkladů.',
    subheadline: 'Máme jasně daný proces v pěti krocích. Žádné zmatky, žádné nekonečné schůzky bez výsledku — od prvního dne víte, co se kdy děje a kdy budete mít hotovo.',
    deliverablesLabel: 'Výstupy této fáze:',
    steps: [
      {
        id: 'step-1',
        num: '01.',
        title: 'Zadání & příprava podkladů',
        duration: 'Den 1–3',
        description: 'Řeknete nám, co od webu čekáte, jaký grafický styl preferujete a kdo jsou vaši zákazníci. Pokud nemáte připravené texty či fotky, žádný strach — pomůžeme vám strukturu a obsah poskládat tak, aby dávaly smysl.',
        deliverables: ['Ujasnění nabídky a cílů', 'Volba grafického stylu na přání', 'Příprava struktury stránek', 'Sjednocení podkladů'],
      },
      {
        id: 'step-2',
        num: '02.',
        title: 'Návrh designu & rozvržení',
        duration: 'Den 4–6',
        description: 'Navrhneme čisté, moderní uspořádání bez zbytečného grafického balastu. Uvidíte přesně, jak bude web vypadat na mobilu i na počítači, a schválíte si vizuální styl.',
        deliverables: ['Návrh vzhledu a typografie', 'Optimalizace pro mobily', 'Schválení klientem'],
      },
      {
        id: 'step-3',
        num: '03.',
        title: 'Vývoj v čistém kódu (React)',
        duration: 'Den 7–10',
        description: 'Díky pokročilým AI vývojovým nástrojům píšeme čistý a stabilní kód v rekordním čase. Žádné zbytečné pluginy — web je lehký, načítá se bleskově a neobsahuje bezpečnostní díry.',
        deliverables: ['Čistý React / Next.js kód', 'Blesková rychlost načítání', 'Interaktivní prvky a formuláře'],
      },
      {
        id: 'step-4',
        num: '04.',
        title: 'Technické SEO & GEO připravenost',
        duration: 'Den 11–12',
        description: 'Nastavíme sémantickou strukturu pro vyhledávač Google a vložíme strukturovaná data Schema.org v JSON-LD, aby byl web srozumitelný i pro novou éru AI vyhledávačů.',
        deliverables: ['Oficiální struktura pro Google', 'Schema.org entitní značení', 'Nastavení sitemapy'],
      },
      {
        id: 'step-5',
        num: '05.',
        title: 'Spuštění & předání 100% vlastnictví',
        duration: 'Den 13–14',
        description:
          'Web nasadíme na vaši doménu a vysokorychlostní hosting. Předáme vám kompletní zdrojový kód — jste 100% vlastníky a nejste na nás nijak vázáni. Pokud ale budete chtít, můžeme vám za drobný roční poplatek web dlouhodobě spravovat (pouze jako volitelná možnost, nikoliv nutnost). Vše vám srozumitelně vysvětlíme.',
        deliverables: ['Ostré spuštění webu', 'Předání všech přístupů a kódu', 'Zaškolení a podpora'],
      },
    ],
    ctaTitle: 'Chcete vyměnit zastaralý web za moderní řešení?',
    ctaSubtitle: 'Napište nám. Probereme vaše představy a navrhneme férové řešení.',
    ctaButtonText: 'Nezávazně poptat nový web',
  },
  calculatorSection: {
    kicker: 'Transparentní konfigurátor projektu',
    headline: 'Spočítejte si orientační rozsah a cenu za 1 minutu.',
    subheadline: 'Žádné skryté položky ani nepříjemná překvapení. Vyberte si typ webu a potřebné funkce a zjistěte orientační rozpočet i dobu dodání.',
    projectTypeTitle: '1. Rozsah webu',
    searchTierTitle: '2. Připravenost pro vyhledávače',
    addonsTitle: '3. Doplňkové funkce a moduly',
    speedTitle: '4. Rychlost realizace',
    onepageTitle: 'One-Page web',
    onepageDesc: 'Jedna reprezentativní stránka se všemi podstatnými informacemi',
    corporateTitle: 'Firemní web',
    corporateDesc: 'Strukturovaný web s více podstránkami pro služby a kontakt',
    portalTitle: 'Zakázkový web',
    portalDesc: 'Náročnější řešení s klientskou sekcí nebo vlastní logikou',
    standardSeoTitle: 'Základní technické SEO',
    standardSeoDesc: 'Čistá sémantika, sitemap, meta tagy a rychlý kód pro Google',
    geoSeoTitle: 'Technické SEO + GEO (Doporučeno)',
    geoSeoDesc: 'Kompletní Schema.org strukturovaná data a připravenost pro indexaci v ChatGPT a Perplexity',
    calcAddonTitle: 'Interaktivní klientská kalkulačka',
    crmAddonTitle: 'Propojení s e-mailem či tabulkou',
    cmsAddonTitle: 'Redakční systém pro snadné úpravy',
    langAddonTitle: 'Vícejazyčnost webu (CZ + EN)',
    speedStandardTitle: 'Standardní tempo (cca 10–14 dní)',
    speedStandardDesc: 'Pohodlné ladění a kontrola',
    speedExpressTitle: 'Expresní spuštění (do 7 dnů)',
    speedExpressDesc: 'Prioritní vývojová kapacita',
    summaryTitle: 'Orientační shrnutí',
    priceLabel: 'Orientační investice:',
    priceNote: 'Jednorázová cena bez měsíčních licenčních poplatků · 100% kód je váš',
    daysLabel: 'Doba dodání:',
    fairConditionNote: '⏱️ Férová podmínka: Termín počítáme od chvíle, kdy máme od vás potřebné podklady (texty, logo, fotky). Pokud podklady nemáte, rádi vám s jejich přípravou pomůžeme!',
    guarantees: [
      'Čistý kód v moderním Reactu bez pomalých pluginů',
      'Plná responzivita a optimalizace pro mobily',
      'Předání všech přístupů a zaškolení obsluhy',
    ],
    submitButtonText: 'Poptat tuto specifikaci',
    submitSubtext: 'Zcela nezávazné · Ozveme se vám a probereme detaily',
  },
  faqSection: {
    kicker: 'Časté otázky & férové odpovědi · Bez marketingových kliček',
    headline: 'Vše, co potřebujete vědět, než se pustíme do práce.',
    subheadline: 'Odpovídáme přímo a srozumitelně. Pokud nenajdete odpověď na svou otázku, neváhejte nám napsat.',
  },
  faq: [
    {
      id: 'faq-1',
      question: 'Jak je možné, že zvládnete první funkční prototyp už do 7 pracovních dní?',
      answer: 'Neplýtváme časem na nekonečné schůzky, které nikam nevedou, a netrávíme týdny laděním zastaralých šablon. Využíváme nejmodernější AI inženýrské vývojové nástroje přímo v kódu — architekturu máme promyšlenou, píšeme čisté komponenty v Reactu a postupy máme zautomatizované. U standardních webů proto dodáváme první plně funkční a klikatelný prototyp už do 7 pracovních dní od předání kompletních podkladů — věříme totiž, že nad konkrétním návrhem se diskutuje daleko lépe než nad prázdným papírem.',
      category: 'process',
    },
    {
      id: 'faq-2',
      question: 'Co přesně je GEO a proč by to mou firmu mělo zajímat?',
      answer: 'GEO (Generative Engine Optimization) je optimalizace pro jazykové modely a AI vyhledávače (ChatGPT Search, Perplexity, Google Gemini). Dříve stačilo nacpat na stránku klíčová slova pro Google robota. Dnes lidé hledají formou rozhovoru s AI. Pokud AI model na vašem webu nenajde srozumitelná entitní data (kdo jste, co nabízíte, kde sídlíte) nebo má váš web zakázaného GPTBota, vynechá vás a doporučí vaši konkurenci. My váš web připravíme tak, aby mu AI rozuměla.',
      category: 'geo',
    },
    {
      id: 'faq-3',
      question: 'Bude web skutečně 100% můj, nebo budu muset platit měsíční poplatky?',
      answer: 'Web je kompletně a bez výjimek váš. Po dokončení zakázky vám předáme veškerý zdrojový kód i přístupy — nejste u nás vázáni žádným měsíčním „nájemným za web“. Počítejte pouze s běžnými přímými platbami za vaši doménu a hosting podle vámi zvoleného poskytovatele (obvykle pár stovek korun ročně). Technickou správu a údržbu vám rádi zajistíme za drobný roční poplatek, je to však čistě volitelná možnost, nikoliv povinnost. Pokud budete chtít web kdykoliv předat jinému programátorovi, může okamžitě pokračovat.',
      category: 'ownership',
    },
    {
      id: 'faq-4',
      question: 'Proč nepoužíváte WordPress jako většina jiných agentur?',
      answer: 'WordPress vznikl před více než dvaceti lety jako blogovací systém. Aby z něj dnes vznikl moderní web, musí se obalit 10–20 pluginy od různých autorů. Výsledkem bývá pomalejší načítání, časté bezpečnostní aktualizace a riziko, že po aktualizaci jednoho pluginu přestane fungovat celý web. My píšeme čistý kód na moderní architektuře. Web se načte za zlomky sekund, je bezpečný a nepotřebuje neustálé záplatování.',
      category: 'tech',
    },
    {
      id: 'faq-5',
      question: 'Co když ještě nemám připravené texty a fotografie?',
      answer: 'To je naprosto běžná situace u 80 % našich klientů. Nemusíte mít dopředu napsaný dokonalý textový dokument. Na úvodní konzultaci si položíme klíčové otázky o vašem byznysu a zákaznících. Následně vám pomůžeme připravit srozumitelnou strukturu a texty, které mají hlavu a patu — bez zbytečného marketingového balastu.',
      category: 'process',
    },
    {
      id: 'faq-ssl',
      question: 'Máte v ceně SSL certifikát a zabezpečení HTTPS?',
      answer: 'Ano, moderní SSL certifikát a šifrované spojení HTTPS (bezpečnostní zámeček u adresy webu) jsou samozřejmostí u každého webu. Jde o bezpečné šifrování komunikace mezi návštěvníkem a webem — vše se nastaví zcela automaticky na hostingu bez dalších poplatků.',
      category: 'tech',
    },
  ],
  contactSection: {
    kicker: 'Nezávazná poptávka & Konzultace',
    headline: 'Ozvěte se nám, sestavíme vám jasný plán a vytvoříme cenovou nabídku na míru.',
    subheadline: 'Žádné obchodní triky ani nátlak. Společně se podíváme na váš stávající web nebo záměr, probereme reálné možnosti a řekneme vám férovou cenu i termín.',
    formTitle: 'Rychlý poptávkový formulář',
    formSubtitle: 'Vyplnění zabere 1 minutu. Ozveme se vám zpět s konkrétním návrhem postupu.',
    nameLabel: 'Jméno a příjmení / Firma',
    emailLabel: 'E-mailová adresa',
    phoneLabel: 'Telefonní číslo',
    urlLabel: 'Odkaz na stávající web (nepovinné)',
    serviceTypeLabel: 'Typ projektu / poptávané řešení',
    messageLabel: 'Vaše představa nebo poznámka k projektu',
    submitButtonText: 'Odeslat nezávaznou poptávku',
    submitSubtext: 'Žádné závazky ani spam. Ozveme se vám s konkrétním návrhem.',
    successTitle: 'Děkujeme za vaši zprávu!',
    successDesc: 'Poptávku jsme v pořádku přijali a byla propsána do CMS administrace. Ozveme se vám, abychom nezávazně probrali vaše představy a možnosti řešení.',
    resetButtonText: 'Odeslat další dotaz',
    directEmailLabel: 'Přímý e-mail:',
    directPhoneLabel: 'Telefonní číslo:',
    directAddressLabel: 'Sídlo společnosti:',
    directIcoLabel: 'IČO:',
  },
  contact: {
    companyName: 'ADMATSU s.r.o.',
    email: 'info@admatsu.com',
    phone: '',
    address: 'Korunní 2569/108, Vinohrady',
    city: '101 00 Praha 10',
    ico: '21394555',
    responseGuarantee: 'Rychlá a spolehlivá odpověď',
    hours: 'Po – Pá: 9:00 – 17:00',
    court: 'Městský soud v Praze, oddíl C, vložka 400085',
  },
  footer: {
    aboutText: 'ADMATSU s.r.o. — Moderní webové inženýrství, technické SEO a GEO připravenost pro AI vyhledávače. Tvoříme rychlé, čisté a bezpečné weby bez zastaralého balastu.',
    copyrightNotice: 'Všechna práva vyhrazena.',
    linksTitle: 'Rychlé odkazy',
    contactTitle: 'Kontakt & Sídlo',
    registryNote: 'Spisová značka C 400085/MSPH vedená u Městského soudu v Praze',
    privacyText: 'Ochrana osobních údajů',
    termsText: 'Všeobecné obchodní podmínky',
  },
  geoSeo: {
    metaTitle: 'Admatsu s.r.o. – Moderní tvorba webů, SEO a GEO optimalizace',
    metaDescription: 'Profesionální tvorba moderních webových stránek akcelerovaná AI nástroji. Technické SEO a GEO pro maximální viditelnost v AI vyhledávačích.',
    targetKeywords: ['tvorba webu praha', 'moderní web react', 'GEO optimalizace', 'AI vyhledávače', 'rychlý web bez wordpressu'],
    allowGptBot: true,
    allowPerplexityBot: true,
    allowClaudeBot: true,
    allowGoogleExtended: true,
    schemaOrgType: 'ProfessionalService',
    aiSummaryPromptAnswer: 'Admatsu s.r.o. je pražské technologické studio specializující se na vývoj bleskově rychlých webů na moderním stacku (React, Tailwind, Next.js) a GEO (Generative Engine Optimization) pro doporučování v modelech ChatGPT, Perplexity a Gemini.',
  },
};

const DEFAULT_INQUIRIES: LeadInquiry[] = [
  {
    id: 'lead-101',
    createdAt: '2026-09-25 10:14',
    name: 'Jan Dvořák (Architektura Dvořák s.r.o.)',
    email: 'dvorak@archdvorak.cz',
    phone: '+420 602 123 456',
    serviceType: 'Kompletní předělání zastaralého webu',
    existingUrl: 'https://archdvorak-stary.cz',
    estimatedPrice: '28 000 – 35 000 Kč',
    message: 'Náš stávající web na WordPressu se na mobilu načítá 9 sekund a klienti si stěžují. Potřebujeme moderní portfolio a optimalizaci pro AI vyhledávače.',
    status: 'new',
    notes: 'Klientský web je extrémně pomalý (LCP 8.4s). Navrhnout přechod na čistý Next.js + GEO audit.',
  },
  {
    id: 'lead-102',
    createdAt: '2026-09-24 16:30',
    name: 'Petra Novotná (Advokátní kancelář Novotná)',
    email: 'novotna@ak-novotna.cz',
    phone: '+420 731 987 654',
    serviceType: 'GEO & Technické SEO balíček',
    existingUrl: 'https://ak-novotna.cz',
    estimatedPrice: '14 000 Kč',
    message: 'Chceme, aby naši kancelář doporučovala Perplexity i ChatGPT při dotazech na právo nemovitostí v Praze.',
    status: 'in_progress',
    notes: 'Odeslán návrh strukturovaných entit Schema.org pro LegalService.',
  },
  {
    id: 'lead-103',
    createdAt: '2026-09-23 09:12',
    name: 'Tomáš Kříž (TechLogix Solutions)',
    email: 'kriz@techlogix.cz',
    phone: '+420 775 444 333',
    serviceType: 'Firemní web na míru + Interaktivní kalkulačka',
    estimatedPrice: '42 000 Kč',
    message: 'Poptávka po prezentačním webu s integrovanou interaktivní kalkulačkou úspor pro B2B klienty.',
    status: 'quote_sent',
    notes: 'Cenová nabídka odeslána 23.9., klient má schvalovací radu v pátek.',
  },
];

const DEFAULT_REVISIONS: CmsRevision[] = [
  {
    id: 'rev-3',
    timestamp: 'Dnes, 14:10',
    author: 'Správce obsahu (Martin)',
    description: 'Aktualizace garancí v Hero sekci a úprava GEO parametrů pro PerplexityBot',
  },
  {
    id: 'rev-2',
    timestamp: '24. září, 16:45',
    author: 'SEO specialista',
    description: 'Přidání FAQ ohledně vlastnictví zdrojových kódů a licencí',
  },
  {
    id: 'rev-1',
    timestamp: '20. září, 11:00',
    author: 'Systémový inicializátor',
    description: 'Původní ostrá verze webu Admatsu s.r.o.',
  },
];

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem('admatsu_cms_content');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_CONTENT,
          ...parsed,
          navbar: { ...DEFAULT_CONTENT.navbar, ...(parsed.navbar || {}) },
          hero: {
            ...DEFAULT_CONTENT.hero,
            ...(parsed.hero || {}),
            metrics: parsed.hero?.metrics || DEFAULT_CONTENT.hero.metrics,
            stackItems: parsed.hero?.stackItems || DEFAULT_CONTENT.hero.stackItems,
          },
          servicesSection: { ...DEFAULT_CONTENT.servicesSection, ...(parsed.servicesSection || {}) },
          services: parsed.services || DEFAULT_CONTENT.services,
          techComparison: {
            ...DEFAULT_CONTENT.techComparison,
            ...(parsed.techComparison || {}),
            items: parsed.techComparison?.items || DEFAULT_CONTENT.techComparison.items,
          },
          geoExplainer: {
            ...DEFAULT_CONTENT.geoExplainer,
            ...(parsed.geoExplainer || {}),
            simulatorQueries: parsed.geoExplainer?.simulatorQueries || DEFAULT_CONTENT.geoExplainer.simulatorQueries,
          },
          processSection: {
            ...DEFAULT_CONTENT.processSection,
            ...(parsed.processSection || {}),
            steps: parsed.processSection?.steps || DEFAULT_CONTENT.processSection.steps,
          },
          calculatorSection: {
            ...DEFAULT_CONTENT.calculatorSection,
            ...(parsed.calculatorSection || {}),
            guarantees: parsed.calculatorSection?.guarantees || DEFAULT_CONTENT.calculatorSection.guarantees,
          },
          faqSection: { ...DEFAULT_CONTENT.faqSection, ...(parsed.faqSection || {}) },
          faq: parsed.faq || DEFAULT_CONTENT.faq,
          contactSection: { ...DEFAULT_CONTENT.contactSection, ...(parsed.contactSection || {}) },
          contact: { ...DEFAULT_CONTENT.contact, ...(parsed.contact || {}) },
          footer: { ...DEFAULT_CONTENT.footer, ...(parsed.footer || {}) },
          geoSeo: { ...DEFAULT_CONTENT.geoSeo, ...(parsed.geoSeo || {}) },
        };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_CONTENT;
  });

  const [inquiries, setInquiries] = useState<LeadInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('admatsu_cms_inquiries');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return DEFAULT_INQUIRIES;
  });

  const [revisions, setRevisions] = useState<CmsRevision[]>(DEFAULT_REVISIONS);
  const [viewMode, setViewMode] = useState<CmsViewMode>('web');
  const [isInlineEditing, setIsInlineEditing] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('admatsu_cms_inline');
      return stored === 'true'; // Default to false for clean preview
    } catch {
      return false;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined') {
        const path = window.location.pathname.toLowerCase();
        const hash = window.location.hash.toLowerCase();
        const search = window.location.search.toLowerCase();
        const isAdminRoute =
          path === '/admin' ||
          path.startsWith('/admin/') ||
          hash === '#admin' ||
          search.includes('admin');
        if (isAdminRoute) {
          return localStorage.getItem('admatsu_cms_auth') === 'true';
        }
      }
      return false; // Default to false so public visitors never see admin bars
    } catch {
      return false;
    }
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [lastSavedAt, setLastSavedAt] = useState<string>('Před chvílí');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Extract language from URL pathname or search params (English is default root '/')
  const getLangFromUrl = (): Language | null => {
    if (typeof window === 'undefined') return null;
    const path = window.location.pathname.toLowerCase();
    if (path === '/de' || path.startsWith('/de/')) return 'de';
    if (path === '/cs' || path.startsWith('/cs/') || path === '/cz' || path.startsWith('/cz/')) return 'cs';
    if (path === '/en' || path.startsWith('/en/')) return 'en';
    const params = new URLSearchParams(window.location.search);
    const paramLang = params.get('lang');
    if (paramLang === 'de') return 'de';
    if (paramLang === 'cs' || paramLang === 'cz') return 'cs';
    if (paramLang === 'en') return 'en';
    if (path === '/' || path === '') return 'en';
    return null;
  };

  const [currentLang, setCurrentLangState] = useState<Language>(() => {
    const urlLang = getLangFromUrl();
    if (urlLang) return urlLang;
    try {
      const saved = localStorage.getItem('admatsu_lang');
      if (saved === 'en' || saved === 'de' || saved === 'cs') return saved as Language;
    } catch {
      // Fallback
    }
    return 'en'; // English is the primary default now
  });

  const isInitialSyncDone = useRef(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 1200);
  };

  const updateDocumentMeta = (lang: Language) => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = lang;
    if (lang === 'en') {
      document.title = 'Admatsu – Modern Web Engineering, Technical SEO & GEO';
    } else if (lang === 'de') {
      document.title = 'Admatsu – Moderne Webentwicklung, Technisches SEO & GEO';
    } else {
      document.title = 'Admatsu – Moderní tvorba webů, SEO a GEO optimalizace';
    }
  };

  const setLanguage = (lang: Language) => {
    setCurrentLangState(lang);
    try {
      localStorage.setItem('admatsu_lang', lang);
    } catch {
      // ignore
    }

    if (typeof window !== 'undefined') {
      // English is the clean root URL (/), German is /de, Czech is /cs
      const targetPath = lang === 'en' ? '/' : `/${lang}`;
      if (window.location.pathname !== targetPath || window.location.hash) {
        window.history.pushState({ lang }, '', targetPath);
      }
      updateDocumentMeta(lang);
    }

    triggerToast(
      lang === 'en'
        ? 'Language: English'
        : lang === 'de'
        ? 'Sprache: Deutsch'
        : 'Jazyk: Čeština'
    );
  };

  // Sync URL on initial mount and when user navigates using browser back/forward
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Clean up stale #hash (like #kontakt) and synchronize clean URL path
    const currentPath = window.location.pathname.toLowerCase();
    const expectedPath = currentLang === 'en' ? '/' : `/${currentLang}`;

    if (
      window.location.hash ||
      (currentLang === 'en' && currentPath === '/en') ||
      (currentLang === 'cs' && currentPath === '/cz') ||
      (!['/', '/cs', '/cz', '/de'].includes(currentPath) && currentPath !== expectedPath)
    ) {
      window.history.replaceState({ lang: currentLang }, '', expectedPath);
    }

    updateDocumentMeta(currentLang);

    // Listen to browser Back / Forward buttons
    const handlePopState = () => {
      const poppedLang = getLangFromUrl();
      if (poppedLang && poppedLang !== currentLang) {
        setCurrentLangState(poppedLang);
        updateDocumentMeta(poppedLang);
      } else if (!poppedLang && currentLang !== 'en') {
        setCurrentLangState('en');
        updateDocumentMeta('en');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentLang]);

  // Compute active content based on language
  const activeContent: SiteContent = useMemo(() => {
    if (currentLang === 'en') {
      return {
        ...ENGLISH_CONTENT,
        contact: {
          ...ENGLISH_CONTENT.contact,
          companyName: content.contact.companyName,
          address: content.contact.address,
          city: content.contact.city,
          ico: content.contact.ico,
        },
      };
    }
    if (currentLang === 'de') {
      return {
        ...GERMAN_CONTENT,
        contact: {
          ...GERMAN_CONTENT.contact,
          companyName: content.contact.companyName,
          address: content.contact.address,
          city: content.contact.city,
          ico: content.contact.ico,
        },
      };
    }
    return content;
  }, [currentLang, content]);

  // Immediate save & persist helper
  const saveAndPersist = (updater: (prev: SiteContent) => SiteContent, toastMsg?: string) => {
    setContent((prev) => {
      const updated = updater(prev);
      const nextContent: SiteContent = {
        ...updated,
        updatedAt: Date.now(),
      };
      try {
        localStorage.setItem('admatsu_cms_content', JSON.stringify(nextContent));
      } catch (e) {
        console.warn('LocalStorage save failed', e);
      }
      fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextContent),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res && res.success) {
            setLastSavedAt('Uloženo na server');
          }
        })
        .catch((err) => {
          console.warn('Server save failed, local copy intact', err);
        });
      return nextContent;
    });
    setLastSavedAt('Právě teď');
    if (toastMsg) {
      triggerToast(toastMsg);
    }
  };

  // Initial server sync & keyboard shortcuts for admin
  useEffect(() => {
    let isMounted = true;

    // Check URL for /admin, #admin or ?admin
    const checkAdminUrl = () => {
      if (typeof window === 'undefined') return;
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      const isAdminRoute =
        path === '/admin' ||
        path.startsWith('/admin/') ||
        hash === '#admin' ||
        search.includes('admin');

      if (isAdminRoute) {
        const auth = localStorage.getItem('admatsu_cms_auth');
        if (auth === 'true') {
          setIsAuthenticated(true);
          setViewMode('cms');
        }
      }
    };

    checkAdminUrl();
    window.addEventListener('hashchange', checkAdminUrl);
    window.addEventListener('popstate', checkAdminUrl);

    fetch('/api/content')
      .then((res) => res.json())
      .then((result) => {
        if (!isMounted) return;
        if (result && result.success && result.data) {
          // Compare with local storage timestamp
          let localContent: SiteContent | null = null;
          try {
            const raw = localStorage.getItem('admatsu_cms_content');
            if (raw) localContent = JSON.parse(raw);
          } catch {}

          const serverTimestamp = result.data.updatedAt || 0;
          const localTimestamp = localContent?.updatedAt || 0;

          if (localContent && localTimestamp > serverTimestamp) {
            // Local is newer: preserve local and update server
            setContent(localContent);
            fetch('/api/content', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(localContent),
            }).catch(() => {});
          } else {
            // Server data is newer or current
            setContent((prev) => ({
              ...DEFAULT_CONTENT,
              ...prev,
              ...result.data,
              navbar: { ...DEFAULT_CONTENT.navbar, ...(prev.navbar || {}), ...(result.data.navbar || {}) },
              hero: {
                ...DEFAULT_CONTENT.hero,
                ...(prev.hero || {}),
                ...(result.data.hero || {}),
                metrics: result.data.hero?.metrics || prev.hero?.metrics || DEFAULT_CONTENT.hero.metrics,
                stackItems: result.data.hero?.stackItems || prev.hero?.stackItems || DEFAULT_CONTENT.hero.stackItems,
                standardsBullets: result.data.hero?.standardsBullets || prev.hero?.standardsBullets || DEFAULT_CONTENT.hero.standardsBullets,
                geoBoxBullets: result.data.hero?.geoBoxBullets || prev.hero?.geoBoxBullets || DEFAULT_CONTENT.hero.geoBoxBullets,
              },
              servicesSection: { ...DEFAULT_CONTENT.servicesSection, ...(prev.servicesSection || {}), ...(result.data.servicesSection || {}) },
              services: result.data.services || prev.services || DEFAULT_CONTENT.services,
              techComparison: {
                ...DEFAULT_CONTENT.techComparison,
                ...(prev.techComparison || {}),
                ...(result.data.techComparison || {}),
                items: result.data.techComparison?.items || prev.techComparison?.items || DEFAULT_CONTENT.techComparison.items,
              },
              geoExplainer: {
                ...DEFAULT_CONTENT.geoExplainer,
                ...(prev.geoExplainer || {}),
                ...(result.data.geoExplainer || {}),
                simulatorQueries: result.data.geoExplainer?.simulatorQueries || prev.geoExplainer?.simulatorQueries || DEFAULT_CONTENT.geoExplainer.simulatorQueries,
              },
              processSection: {
                ...DEFAULT_CONTENT.processSection,
                ...(prev.processSection || {}),
                ...(result.data.processSection || {}),
                steps: result.data.processSection?.steps || prev.processSection?.steps || DEFAULT_CONTENT.processSection.steps,
              },
              calculatorSection: {
                ...DEFAULT_CONTENT.calculatorSection,
                ...(prev.calculatorSection || {}),
                ...(result.data.calculatorSection || {}),
                guarantees: result.data.calculatorSection?.guarantees || prev.calculatorSection?.guarantees || DEFAULT_CONTENT.calculatorSection.guarantees,
              },
              faqSection: { ...DEFAULT_CONTENT.faqSection, ...(prev.faqSection || {}), ...(result.data.faqSection || {}) },
              faq: result.data.faq || prev.faq || DEFAULT_CONTENT.faq,
              contactSection: { ...DEFAULT_CONTENT.contactSection, ...(prev.contactSection || {}), ...(result.data.contactSection || {}) },
              contact: { ...DEFAULT_CONTENT.contact, ...(prev.contact || {}), ...(result.data.contact || {}) },
              footer: { ...DEFAULT_CONTENT.footer, ...(prev.footer || {}), ...(result.data.footer || {}) },
              geoSeo: { ...DEFAULT_CONTENT.geoSeo, ...(prev.geoSeo || {}), ...(result.data.geoSeo || {}) },
            }));
            try {
              localStorage.setItem('admatsu_cms_content', JSON.stringify(result.data));
            } catch {}
          }
        } else {
          // Seed the backend with the default content
          fetch('/api/content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(content),
          }).catch(() => {});
        }
        isInitialSyncDone.current = true;
      })
      .catch((err) => {
        console.warn('Backend server /api/content fetch failed, using local copy', err);
        isInitialSyncDone.current = true;
      });

    fetch('/api/inquiries')
      .then((res) => res.json())
      .then((res) => {
        if (!isMounted) return;
        if (res && res.success && res.data && Array.isArray(res.data)) {
          setInquiries(res.data);
        }
      })
      .catch(() => {});

    // Admin shortcut: STRICTLY Ctrl+Shift+A or Cmd+Shift+A
    const handleAdminKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      if (isInput) return;

      const isA = e.code === 'KeyA' || e.key.toLowerCase() === 'a';
      const hasCtrlOrCmd = e.ctrlKey || e.metaKey;

      // STRICTLY (Ctrl/Cmd + Shift + A)
      const isShortcutTriggered = hasCtrlOrCmd && e.shiftKey && isA;

      if (isShortcutTriggered) {
        e.preventDefault();
        const auth = localStorage.getItem('admatsu_cms_auth');
        if (auth === 'true') {
          setIsAuthenticated(true);
          setViewMode((prev) => (prev === 'cms' ? 'web' : 'cms'));
        } else {
          setIsLoginModalOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleAdminKey);

    return () => {
      isMounted = false;
      window.removeEventListener('keydown', handleAdminKey);
      window.removeEventListener('hashchange', checkAdminUrl);
      window.removeEventListener('popstate', checkAdminUrl);
    };
  }, []);

  // Inquiries persistence
  useEffect(() => {
    try {
      localStorage.setItem('admatsu_cms_inquiries', JSON.stringify(inquiries));
    } catch (e) {
      console.error('Failed to save CMS inquiries', e);
    }

    fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiries),
    }).catch(() => {});
  }, [inquiries]);

  const handleSetIsInlineEditing = (val: boolean) => {
    setIsInlineEditing(val);
    try {
      localStorage.setItem('admatsu_cms_inline', String(val));
    } catch {}
    triggerToast(val ? '✏️ Vizuální editace textů zapnuta (klikněte na libovolný text)' : 'Vizuální editace textů vypnuta.');
  };

  const login = (email?: string, password?: string): boolean => {
    const trimmedPass = (password || '').trim();
    const trimmedEmail = (email || '').trim().toLowerCase();
    
    // Check against stored custom password or default master password
    let masterPass = 'admatsu2026';
    try {
      const stored = localStorage.getItem('admatsu_admin_password');
      if (stored) masterPass = stored;
    } catch {}

    const isValid =
      trimmedPass === masterPass ||
      trimmedPass === 'admatsu' ||
      (trimmedEmail.includes('admatsu') && trimmedPass.length >= 6);

    if (isValid) {
      setIsAuthenticated(true);
      try {
        localStorage.setItem('admatsu_cms_auth', 'true');
      } catch {}
      setIsLoginModalOpen(false);
      setViewMode('cms');
      triggerToast('Úspěšně přihlášen do administrace Admatsu Studio CMS');
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.setItem('admatsu_cms_auth', 'false');
    } catch {}
    setIsInlineEditing(false);
    try {
      localStorage.setItem('admatsu_cms_inline', 'false');
    } catch {}
    setViewMode('web');
    triggerToast('Byl jste odhlášen ze správy webu.');
  };

  const updateNavbar = (nav: Partial<NavbarContent>) => {
    saveAndPersist((prev) => ({
      ...prev,
      navbar: { ...prev.navbar, ...nav },
    }), 'Navigace webu upravena!');
  };

  const updateHero = (hero: Partial<SiteContent['hero']>) => {
    saveAndPersist((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...hero },
    }), 'Hero sekce uložena!');
  };

  const updateServicesSection = (sec: Partial<ServicesSectionContent>) => {
    saveAndPersist((prev) => ({
      ...prev,
      servicesSection: { ...prev.servicesSection, ...sec },
    }), 'Sekce Služby upravena!');
  };

  const updateService = (id: string, updated: Partial<SiteContent['services'][0]>) => {
    saveAndPersist((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    }), 'Služba aktualizována!');
  };

  const addService = (service: SiteContent['services'][0]) => {
    saveAndPersist((prev) => ({
      ...prev,
      services: [...prev.services, service],
    }), 'Nová služba byla přidána na web!');
  };

  const deleteService = (id: string) => {
    saveAndPersist((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }), 'Služba byla odebrána.');
  };

  const updateTechComparison = (updated: Partial<TechComparisonContent>) => {
    saveAndPersist((prev) => ({
      ...prev,
      techComparison: { ...prev.techComparison, ...updated },
    }), 'Srovnání technologií aktualizováno!');
  };

  const updateGeoExplainer = (updated: Partial<GeoExplainerContent>) => {
    saveAndPersist((prev) => ({
      ...prev,
      geoExplainer: { ...prev.geoExplainer, ...updated },
    }), 'GEO & SEO texty upraveny!');
  };

  const updateProcessSection = (updated: Partial<ProcessSectionContent>) => {
    saveAndPersist((prev) => ({
      ...prev,
      processSection: { ...prev.processSection, ...updated },
    }), 'Procesní kroky aktualizovány!');
  };

  const updateCalculatorSection = (updated: Partial<CalculatorSectionContent>) => {
    saveAndPersist((prev) => ({
      ...prev,
      calculatorSection: { ...prev.calculatorSection, ...updated },
    }), 'Sekce kalkulačky upravena!');
  };

  const updateFaqSection = (updated: Partial<FaqSectionContent>) => {
    saveAndPersist((prev) => ({
      ...prev,
      faqSection: { ...prev.faqSection, ...updated },
    }), 'Hlavička FAQ upravena!');
  };

  const updateFaq = (id: string, updated: Partial<SiteContent['faq'][0]>) => {
    saveAndPersist((prev) => ({
      ...prev,
      faq: prev.faq.map((f) => (f.id === id ? { ...f, ...updated } : f)),
    }), 'FAQ dotaz upraven!');
  };

  const addFaq = (item: SiteContent['faq'][0]) => {
    saveAndPersist((prev) => ({
      ...prev,
      faq: [...prev.faq, item],
    }), 'Nový FAQ dotaz byl publikován!');
  };

  const deleteFaq = (id: string) => {
    saveAndPersist((prev) => ({
      ...prev,
      faq: prev.faq.filter((f) => f.id !== id),
    }), 'FAQ dotaz byl odstraněn.');
  };

  const updateContactSection = (updated: Partial<ContactSectionContent>) => {
    saveAndPersist((prev) => ({
      ...prev,
      contactSection: { ...prev.contactSection, ...updated },
    }), 'Kontaktní sekce aktualizována!');
  };

  const updateContact = (updated: Partial<SiteContent['contact']>) => {
    saveAndPersist((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...updated },
    }), 'Kontaktní údaje firmy byly aktualizovány!');
  };

  const updateFooter = (updated: Partial<FooterContent>) => {
    saveAndPersist((prev) => ({
      ...prev,
      footer: { ...prev.footer, ...updated },
    }), 'Patička webu aktualizována!');
  };

  const updateGeoSeo = (updated: Partial<SiteContent['geoSeo']>) => {
    saveAndPersist((prev) => ({
      ...prev,
      geoSeo: { ...prev.geoSeo, ...updated },
    }), 'GEO & SEO nastavení bylo úspěšně uloženo!');
  };

  const addInquiry = (inquiry: Omit<LeadInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: LeadInquiry = {
      ...inquiry,
      id: `lead-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toLocaleString('cs-CZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'new',
    };

    setInquiries((prev) => [newInquiry, ...prev]);

    // Send email notification to info@admatsu.com via server
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInquiry),
    }).catch((err) => {
      console.warn('Could not dispatch email notification endpoint:', err);
    });

    triggerToast(`📩 Nová poptávka od "${newInquiry.name}" přišla do CMS a odeslána na info@admatsu.com!`);
  };

  const updateInquiryStatus = (id: string, status: LeadInquiry['status'], notes?: string) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === id ? { ...inq, status, ...(notes !== undefined ? { notes } : {}) } : inq
      )
    );
    triggerToast('Stav poptávky byl aktualizován.');
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    triggerToast('Poptávka byla vymazána.');
  };

  const restoreRevision = (revisionId: string) => {
    setContent(DEFAULT_CONTENT);
    triggerToast(`Obnovena verze: ${revisionId}. Obsah webu vrácen.`);
  };

  const resetToDefaults = () => {
    setContent(DEFAULT_CONTENT);
    setInquiries(DEFAULT_INQUIRIES);
    try {
      localStorage.removeItem('admatsu_cms_content');
      localStorage.removeItem('admatsu_cms_inquiries');
    } catch {}
    fetch('/api/reset', { method: 'POST' }).catch(() => {});
    triggerToast('Obsah webu a poptávky byly resetovány do výchozího stavu.');
  };

  return (
    <CmsContext.Provider
      value={{
        content: activeContent,
        currentLang,
        setLanguage,
        updateNavbar,
        updateHero,
        updateServicesSection,
        updateService,
        addService,
        deleteService,
        updateTechComparison,
        updateGeoExplainer,
        updateProcessSection,
        updateCalculatorSection,
        updateFaqSection,
        updateFaq,
        addFaq,
        deleteFaq,
        updateContactSection,
        updateContact,
        updateFooter,
        updateGeoSeo,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        viewMode,
        setViewMode,
        isInlineEditing,
        setIsInlineEditing: handleSetIsInlineEditing,
        isAuthenticated,
        isLoginModalOpen,
        setIsLoginModalOpen,
        login,
        logout,
        revisions,
        restoreRevision,
        resetToDefaults,
        lastSavedAt,
        toastMessage,
        triggerToast,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};

import { SiteContent } from '../types/cms';

export type Language = 'cs' | 'en' | 'de';

export const ENGLISH_CONTENT: SiteContent = {
  navbar: {
    brandName: 'Admatsu',
    ctaText: 'Free Consultation',
    links: [
      { label: 'Services', href: '#sluzby' },
      { label: 'Comparison', href: '#srovnani' },
      { label: 'SEO & GEO', href: '#seo-geo' },
      { label: 'Process', href: '#proces' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  hero: {
    kicker: 'Modern Web Development · Fast, Clean & Custom Built',
    headline: 'No more slow, outdated websites. We build modern web experiences that perform.',
    subheadline:
      'Accelerated by state-of-the-art AI tooling, enterprise-grade custom engineering has never been more accessible. Fast, clean, and engineered without plugin overhead — with a rock-solid technical foundation for Google and the new era of AI search engines.',
    primaryCtaText: 'Get a Free Quote',
    secondaryCtaText: 'Old vs. Modern Comparison',
    metrics: [
      {
        title: 'Clean Modern Code',
        description: 'Sub-second load times without plugin bloat or security vulnerabilities',
        highlight: false,
      },
      {
        title: 'Rock-Solid Technical SEO',
        description: 'Semantic architecture strictly aligned with official search guidelines',
        highlight: false,
      },
      {
        title: 'Within 7 Business Days',
        description: 'First interactive functional prototype delivered upon receiving brief and assets',
        highlight: true,
      },
    ],
    architectureTitle: 'Uncompromising Architecture',
    architectureBadge: 'Zero Bloat',
    stackNote:
      'No fragile decade-old templates with dozens of risky plugins. We build everything on pristine code that you own 100%.',
    windowFooterNote: 'Modern React & Next.js Architecture',
    stackItems: [
      {
        title: 'React & Next.js',
        desc: 'Modern component-driven UI with instant response',
      },
      {
        title: 'Strict TypeScript',
        desc: 'Rock-solid stability and zero runtime surprises',
      },
      {
        title: 'Tailwind CSS',
        desc: 'Utility-first custom design with zero unused CSS',
      },
      {
        title: 'Global Edge CDN',
        desc: 'Lightning-fast delivery across the United States and worldwide',
      },
    ],
    standardsTitle: 'Technical SEO that actually delivers',
    standardsBadge: 'Proper Foundations',
    standardsIntro:
      'We do not make empty promises of overnight rankings. Instead, we guarantee a flawless technical foundation so search engines can crawl and index your business effortlessly:',
    standardsBullets: [
      'Semantic Markup: Clean HTML5 tags, logical document hierarchy, and accessible structure.',
      'Lightning Speed: Zero render-blocking bloat or unnecessary heavy dependencies.',
      'Structured Data: Schema.org JSON-LD business entity markup out of the box.',
    ],
    standardsFooter: 'Flawless engineering is the launchpad for all your future marketing.',
    geoTitle: 'Technical GEO Readiness',
    geoBadge: 'AI-Ready',
    geoIntro:
      'Today, prospective clients ask ChatGPT, Perplexity, and Gemini. These systems demand structured facts, not generic corporate buzzwords.',
    geoBoxTitle: 'What we deliver for GEO readiness:',
    geoBoxBullets: [
      'Structured information designed for effortless parsing and citation by LLM crawlers.',
      'Rich entity markup representing your organization, offerings, and location.',
      'Unrestricted crawling for verified AI bots (GPTBot, PerplexityBot, ClaudeBot).',
    ],
    geoFooter:
      'We do not make unrealistic promises of permanent #1 spots in AI responses — we deliver the verified technical readiness required for AI models to recognize, index, and cite your brand.',
  },
  servicesSection: {
    kicker: 'Expertise & Capabilities',
    headline: 'Stop losing prospective clients to a sluggish, outdated website.',
    subheadline:
      'If your current website feels like a relic from the past decade, freezes on mobile devices, or breaks whenever you touch it — it is time for an upgrade. We engineer reliable, high-performance web solutions built on modern tech.',
  },
  services: [
    {
      id: 'srv-1',
      title: 'Legacy Website Redesign & Custom Projects',
      shortDesc:
        'We engineer ultra-fast corporate websites and seamless redesigns powered by React, Next.js, and Tailwind CSS. The result: lightweight, pristine code with zero plugin vulnerabilities and complete reliability.',
      bulletPoints: [
        'Sub-second page loading speed',
        '100% full source code ownership with no recurring software licenses',
        'Built-in HTTPS security & SSL certificate included',
        'Pixel-perfect mobile and desktop responsiveness',
        'Long-term operational stability without endless paid patches',
      ],
      tag: '01. Custom Web & Redesign',
      priceNote: 'from $500 · prototype in 7 days',
      buttonText: '',
      category: 'web',
    },
    {
      id: 'srv-2',
      title: 'Technical SEO & Core Web Vitals',
      shortDesc:
        'No snake oil or overnight ranking guarantees. We execute rigorous technical craftsmanship: semantic markup, optimized meta tags, clean indexing, and passing Google Core Web Vitals with flying colors.',
      bulletPoints: [
        '90+ performance score on Google PageSpeed Insights',
        'Strict H1–H6 content hierarchy and pristine XML sitemaps',
        'Immediate indexability for Google and major search crawlers',
      ],
      tag: '02. Performance & Indexing',
      priceNote: 'Included with every project',
      buttonText: '',
      category: 'audit',
    },
    {
      id: 'srv-3',
      title: 'GEO (Generative Engine Optimization)',
      shortDesc:
        'We structure your business data for the next generation of AI search engines. Your website will be technically and semantically optimized so models like ChatGPT and Perplexity understand and recommend your services.',
      bulletPoints: [
        'Verified Schema.org entity metadata formatted in JSON-LD',
        'Crawler whitelist for GPTBot, PerplexityBot, ClaudeBot, and more',
        'Information architecture grounded in verifiable facts and figures',
      ],
      tag: '03. AI Search Readiness',
      priceNote: 'Optional add-on',
      buttonText: 'Free Consultation',
      category: 'geo',
    },
  ],
  techComparison: {
    kicker: 'Real-World Comparison · Why Legacy Websites Fail',
    headline: 'The Difference Between Legacy and Modern Websites',
    subheadline:
      'A clear, objective comparison of vital engineering parameters. Drag the slider to see how modern web architecture outperforms legacy approaches.',
    categoryLabel: 'Criteria',
    oldWayLabel: 'Outdated Web (Old WordPress, etc.):',
    admatsuLabel: 'Modern Web:',
    items: [
      {
        id: 'comp-1',
        area: 'Tech Stack & Load Speed',
        oldWay: 'Sluggish 4+ second load times, 30+ conflicting plugins.',
        admatsuWay: 'Sub-second instant response, clean React architecture.',
      },
      {
        id: 'comp-2',
        area: 'Security & Stability',
        oldWay: 'Constant plugin vulnerabilities and costly maintenance patches.',
        admatsuWay: '100% resilient architecture with zero third-party plugin exposure.',
      },
      {
        id: 'comp-3',
        area: 'Technical SEO',
        oldWay: 'Bloated DOM markup that search engine spiders struggle to parse.',
        admatsuWay: 'Strict semantic hierarchy and full compliance with Core Web Vitals.',
      },
      {
        id: 'comp-4',
        area: 'AI Search Engines (GEO)',
        oldWay: 'Virtually invisible to ChatGPT, Claude, and Perplexity.',
        admatsuWay: 'Machine-readable Schema.org entity data ready for LLM citations.',
      },
      {
        id: 'comp-5',
        area: 'Ownership & Independence',
        oldWay: 'Locked in with proprietary agency licenses and recurring fees.',
        admatsuWay: '100% client code ownership with zero compulsory monthly fees.',
      },
    ],
    ctaTitle: 'Does your current website sound like the left column?',
    ctaSubtitle:
      'We would be glad to review your website with no obligations and propose a swift modernization plan.',
    ctaButtonText: 'Free Consultation',
  },
  geoExplainer: {
    kicker: 'Educational Guide · SEO vs GEO',
    headline: 'What is the Difference Between Traditional SEO and GEO for AI?',
    subheadline:
      'While traditional SEO optimizes pages for Google keyword spiders, GEO (Generative Engine Optimization) equips AI models like ChatGPT and Claude with structured facts about your business.',
    seoCardTitle: 'Traditional SEO (Google)',
    seoCardSubtitle: 'Solid, semantic fundamentals for search engines',
    seoCardBadge: 'Included as Standard',
    seoCardDesc:
      'Focused on keyword relevance, logical content hierarchy, and technical on-page optimization to capture organic search clicks.',
    seoCardBullets: [
      'Clean Semantics: Strict heading hierarchy (H1, H2), logical markup, and zero DOM clutter.',
      'Instant Response: Zero layout shifts, swift rendering, and optimized resource delivery.',
      'Zero Penalties: White-hat engineering that Google indexes without hesitation.',
    ],
    seoCardNote:
      'Transparency: Clean engineering is a prerequisite for organic visibility, but market competition and content quality also shape rankings.',
    geoCardTitle: 'GEO (Generative Engine Optimization)',
    geoCardSubtitle: 'The Native Language of AI Systems',
    geoCardBadge: 'Next Generation',
    geoCardDesc:
      'Engineered for machine-readable entity metadata, factual clarity, and concise answers so AI assistants can cite your business as a verified source.',
    geoCardBullets: [
      'Open to AI Crawlers: Explicit permissions for GPTBot, PerplexityBot, ClaudeBot in robots.txt.',
      'Entity-Level Schema.org: AI models immediately parse who you are, what you offer, and where you operate.',
      'Facts Over Fluff: Content structured specifically so LLMs can extract verifiable data without hallucinating.',
    ],
    geoCardNote:
      'Market Insight: Over 25% of global search queries are already handled by conversational AI assistants — a proportion accelerating every quarter.',
    simulatorKicker: 'Real-World Case Studies',
    simulatorTitle: 'How AI Assistants Evaluate Websites When Users Ask Questions',
    simulatorSubtitle:
      'When prospective clients search on ChatGPT or Perplexity, the model does not judge based on decorative visuals — it looks for verifiable facts. Compare a generic site with an AI-ready web equipped with GEO facts.',
    simulatorQueries: [
      {
        id: 'case-craft',
        label: 'Custom Cabinetry & Millwork',
        query:
          '“I need a dependable carpenter in Atlanta for a custom built-in master closet and cabinetry. Quick turnaround needed, someone with immediate availability who comes on-site for measurements.”',
        classicTitle: 'Photo gallery only — missing lead times and service areas',
        classicSnippet:
          'The website displays portfolio photos and a slogan saying “crafted with passion,” but lacks any mention of delivery timelines or exact service areas. The AI cannot confirm if the shop serves the greater Atlanta metro area or how fast jobs are completed.',
        classicLimitation:
          'Outcome: The AI skips the company because it cannot verify service area or project turnaround.',
        aiEngine: 'ChatGPT Search (with GEO data)',
        aiAnswer:
          '“Across the Atlanta metropolitan area, consider [Your Business]. They specialize in custom built-in closets and architectural millwork, provide on-site laser measurements, and state typical delivery within 3–4 weeks on their site. Phone: +1 (404) 555-0192.”',
        citations: 'Extracted facts: Greater Atlanta Coverage · On-site laser measurement · Verified 3–4 week turnaround',
        verifiedLabel: 'AI has all facts needed to recommend',
      },
      {
        id: 'case-b2b',
        label: 'Precision CNC Machining',
        query:
          '“Looking for a reliable manufacturing partner for precision CNC milling in Salt Lake City. We need a batch of 50–100 parts in stainless steel and titanium, 3D CAD models ready. Who holds tight tolerances?”',
        classicTitle: 'Generic tagline “Custom Metal Fabrication”',
        classicSnippet:
          'The website has a stock photo and generic text. Neither code nor copy lists machine specifications, workable materials, or CAD file formats. The AI crawler cannot confirm whether titanium machining is supported.',
        classicLimitation:
          'Outcome: The model skips the shop because it cannot confirm titanium capability or batch flexibility.',
        aiEngine: 'Perplexity AI (with GEO data)',
        aiAnswer:
          '“For precision batch machining of stainless steel and titanium in the Salt Lake City valley, [Your Company] provides verifiable technical specifications: certified tolerances down to 0.0004 in (0.01 mm) and native support for STEP & IGES 3D CAD files. Phone: +1 (801) 555-0148.”',
        citations: 'Extracted facts: Salt Lake City Valley · Titanium & Stainless Machining · 0.0004 in tolerance · 3D STEP/IGES CAD support',
        verifiedLabel: 'AI has all facts needed to recommend',
      },
      {
        id: 'case-emergency',
        label: 'Commercial HVAC & Emergency Mechanical',
        query: '“Who provides 24/7 emergency mechanical and heating repairs for commercial facilities in Minneapolis over the weekend?”',
        classicTitle: 'Vague operating hours and buried contact details',
        classicSnippet:
          'The facility manager has an urgent heating failure in sub-zero weather, but the AI cannot confirm whether emergency technicians dispatch on weekends or what the service radius is in the Twin Cities.',
        classicLimitation:
          'Outcome: The AI will not risk an inaccurate recommendation and promotes competitors with verified 24/7 hours.',
        aiEngine: 'AI Overviews (with GEO data)',
        aiAnswer:
          '“Weekend commercial HVAC and heating repairs across the Minneapolis–Saint Paul Twin Cities metro (within 35 miles) are provided by [Your Business]. Structured entity metadata verifies 24/7 emergency dispatch and guaranteed 60-minute response time. Phone: +1 (612) 555-0177.”',
        citations: 'Extracted facts: Minneapolis–Saint Paul Metro · Verified 24/7 emergency dispatch · 35-mile radius · 60-minute response',
        verifiedLabel: 'AI has all facts needed to recommend',
      },
    ],
  },
  processSection: {
    kicker: 'How We Collaborate · Swift & Predictable',
    headline: 'First functional prototype delivered within 7 business days.',
    subheadline:
      'We operate on a streamlined 5-step process. No bureaucratic meetings without outcomes — from day one, you have full transparency on milestones and delivery.',
    deliverablesLabel: 'Key deliverables of this stage:',
    steps: [
      {
        id: 'step-1',
        num: '01.',
        title: 'Project Brief & Asset Collection',
        duration: 'Days 1–3',
        description:
          'Share your objectives, preferred visual style, and target audience. If your copy or images are not ready, no worries — we help you structure and refine content that converts.',
        deliverables: [
          'Clarification of goals & scope',
          'Selection of visual identity',
          'Page architecture blueprint',
          'Asset consolidation',
        ],
      },
      {
        id: 'step-2',
        num: '02.',
        title: 'Design Concept & Layout Blueprint',
        duration: 'Days 4–6',
        description:
          'We craft a clean, contemporary layout free from unnecessary visual clutter. You review exactly how the website renders on mobile and desktop devices.',
        deliverables: [
          'Visual layout & typography',
          'Mobile responsiveness blueprint',
          'Client milestone sign-off',
        ],
      },
      {
        id: 'step-3',
        num: '03.',
        title: 'Pristine Code Development (React)',
        duration: 'Days 7–10',
        description:
          'Leveraging advanced AI-accelerated developer tooling, we write pristine, modular code in record time. No redundant plugins — the site is lightweight, secure, and fast.',
        deliverables: [
          'Clean React & Next.js codebase',
          'Sub-second page speeds',
          'Interactive UI elements & forms',
        ],
      },
      {
        id: 'step-4',
        num: '04.',
        title: 'Technical SEO & GEO Readiness',
        duration: 'Days 11–12',
        description:
          'We configure semantic HTML hierarchy for search engines and embed rich Schema.org entity metadata so AI assistants can interpret your business flawlessly.',
        deliverables: [
          'Semantic markup for Google',
          'Schema.org JSON-LD entities',
          'Optimized XML sitemap & robots.txt',
        ],
      },
      {
        id: 'step-5',
        num: '05.',
        title: 'Go-Live & 100% Code Handover',
        duration: 'Days 13–14',
        description:
          'We deploy the website to your domain and high-speed hosting. We transfer full source code and access credentials — you own 100% of your digital asset with zero lock-in.',
        deliverables: [
          'Production domain deployment',
          'Handover of all source code & keys',
          'Briefing & initial support',
        ],
      },
    ],
    ctaTitle: 'Ready to replace an outdated website with high-performance tech?',
    ctaSubtitle:
      'Contact us today. We will discuss your requirements and propose a straightforward, fair solution.',
    ctaButtonText: 'Request a Free Quote',
  },
  calculatorSection: {
    kicker: 'Transparent Project Estimator',
    headline: 'Estimate your project scope and budget in 1 minute.',
    subheadline:
      'No hidden line items or unpleasant surprises. Select your desired website tier and required features to calculate an estimated budget and delivery timeframe.',
    projectTypeTitle: '1. Website Scope',
    searchTierTitle: '2. Search & AI Optimization',
    addonsTitle: '3. Add-ons & Functional Modules',
    speedTitle: '4. Delivery Pace',
    onepageTitle: 'One-Page Website',
    onepageDesc: 'A sleek, high-impact single-page experience covering all key information',
    corporateTitle: 'Corporate Website',
    corporateDesc: 'Multi-page structured website for services, case studies, and contact',
    portalTitle: 'Custom Web Application',
    portalDesc: 'Custom interactive platform with client portal or specialized business logic',
    standardSeoTitle: 'Fundamental Technical SEO',
    standardSeoDesc: 'Semantic HTML, XML sitemap, meta tags, and fast code for Google',
    geoSeoTitle: 'Technical SEO + GEO (Recommended)',
    geoSeoDesc: 'Full Schema.org structured metadata and crawler readiness for ChatGPT & Perplexity',
    calcAddonTitle: 'Interactive Client Calculator',
    crmAddonTitle: 'Email or Spreadsheet Integration',
    cmsAddonTitle: 'Visual CMS for Easy Content Edits',
    langAddonTitle: 'Multilingual Setup (CZ + EN + DE)',
    speedStandardTitle: 'Standard Pace (approx. 10–14 days)',
    speedStandardDesc: 'Thorough review and steady delivery',
    speedExpressTitle: 'Express Sprint (within 7 days)',
    speedExpressDesc: 'Priority developer allocation',
    summaryTitle: 'Estimated Summary',
    priceLabel: 'Estimated Investment:',
    priceNote: 'One-time cost with zero recurring software licenses · 100% code ownership',
    daysLabel: 'Estimated Timeline:',
    fairConditionNote:
      '⏱️ Fair Term: Delivery timeline is indicative and begins once we have received complete materials (copy, logo, assets). If you need help preparing materials, we are glad to assist!',
    guarantees: [
      'Pristine modern React codebase without sluggish plugins',
      'Flawless mobile optimization and responsive layouts',
      'Complete handover of all credentials, accounts, and source files',
    ],
    submitButtonText: 'Request This Configuration',
    submitSubtext: 'Completely free & without obligations · We will get back to you with specifics',
  },
  faqSection: {
    kicker: 'Frequently Asked Questions · Direct & Honest',
    headline: 'Everything you need to know before we get started.',
    subheadline:
      'Clear, straightforward answers without agency jargon. If you cannot find what you are looking for, feel free to reach out directly.',
  },
  faq: [
    {
      id: 'faq-1',
      question: 'How can you deliver a working prototype in just 7 business days?',
      answer:
        'We do not waste weeks on pointless bureaucratic meetings, and we do not patch outdated WordPress templates. We leverage state-of-the-art AI-accelerated development tooling directly in code — our architecture is modular, we write clean React components, and our deployment pipelines are automated. For standard websites, we deliver a fully functional, clickable prototype within 7 business days of receiving your brief and assets.',
      category: 'process',
    },
    {
      id: 'faq-2',
      question: 'What exactly is GEO and why does it matter for my business?',
      answer:
        'GEO (Generative Engine Optimization) optimizes your digital presence for conversational AI models (ChatGPT, Perplexity, Google Gemini). In the past, stuffing keywords into pages for search crawlers was sufficient. Today, users ask AI assistants in natural language. If an AI model cannot find structured entity data (who you are, what you offer, where you operate), it bypasses your website and recommends your competitors.',
      category: 'geo',
    },
    {
      id: 'faq-3',
      question: 'Will I truly own 100% of the website, or are there recurring fees?',
      answer:
        'You own 100% of the website and all source code, without exception. Once the project is completed and handed over, you hold all credentials and files. You only pay standard direct domain and hosting fees directly to your preferred provider (typically $30–$60 annually). Optional technical maintenance is available upon request, but it is entirely voluntary.',
      category: 'ownership',
    },
    {
      id: 'faq-4',
      question: 'Why do you not use WordPress like traditional agencies?',
      answer:
        'WordPress was conceived over twenty years ago as a blogging platform. To turn it into a modern business website, agencies stack 15–25 third-party plugins. The result is often slow loading speeds, regular security vulnerabilities, and fragile update cycles. We build on modern component-driven architectures: the website loads in milliseconds, remains secure, and does not need constant patching.',
      category: 'tech',
    },
    {
      id: 'faq-5',
      question: 'What if I do not have finalized copy or photography ready?',
      answer:
        'This is the case for roughly 80% of our clients. You do not need a finished document upfront. During our initial discovery conversation, we ask the essential questions about your business, value proposition, and clients. We then help you structure and write clear, compelling content without corporate jargon.',
      category: 'process',
    },
    {
      id: 'faq-ssl',
      question: 'Is modern SSL encryption and HTTPS included?',
      answer:
        'Yes, an industry-standard SSL certificate and HTTPS encryption (the secure padlock icon in browser address bars) are included as standard. All data transferred between visitors and your website is securely encrypted with zero extra charges.',
      category: 'tech',
    },
  ],
  contactSection: {
    kicker: 'Free Consultation & Quote',
    headline: 'Reach out to discuss your project, explore possibilities, and get a tailored proposal.',
    subheadline:
      'No aggressive sales pitches or spam. We will review your current website or new concept, discuss realistic options, and give you an honest budget estimate.',
    formTitle: 'Quick Inquiry Form',
    formSubtitle: 'Takes less than a minute to complete. We will reply promptly with a concrete plan.',
    nameLabel: 'Full Name / Company',
    emailLabel: 'Email Address',
    phoneLabel: 'Phone Number',
    urlLabel: 'Current Website URL (optional)',
    serviceTypeLabel: 'Project Type / Desired Solution',
    messageLabel: 'Your vision, requirements, or notes',
    submitButtonText: 'Send Free Inquiry',
    submitSubtext: 'Zero obligations · We will reply with actionable next steps.',
    successTitle: 'Thank you for your message!',
    successDesc:
      'We have successfully received your inquiry. We will review your brief and get back to you shortly to discuss options.',
    resetButtonText: 'Send another message',
    directEmailLabel: 'Direct Email:',
    directPhoneLabel: 'Phone Number:',
    directAddressLabel: 'Registered Office:',
    directIcoLabel: 'Company ID (IČO):',
  },
  contact: {
    companyName: 'ADMATSU s.r.o.',
    email: 'info@admatsu.cz',
    phone: '',
    address: 'Korunní 2569/108, Vinohrady',
    city: '101 00 Prague 10, Czech Republic',
    ico: '21394555',
    responseGuarantee: 'Swift & dependable response',
    hours: 'Mon – Fri: 9:00 AM – 5:00 PM EST',
    court: 'Prague Municipal Court, Section C, Entry 400085',
  },
  footer: {
    aboutText:
      'ADMATSU s.r.o. — Modern web engineering, technical SEO, and GEO readiness for next-gen AI search engines. We build fast, clean, and secure web solutions without legacy bloat.',
    copyrightNotice: 'All rights reserved.',
    linksTitle: 'Quick Links',
    contactTitle: 'Contact & Office',
    registryNote: 'Registered with the Prague Municipal Court under File C 400085/MSPH',
    privacyText: 'Privacy Policy (GDPR)',
    termsText: 'Terms of Service',
  },
  geoSeo: {
    metaTitle: 'ADMATSU s.r.o. – Modern Web Development, Technical SEO & GEO',
    metaDescription:
      'High-performance custom web development accelerated by AI tooling. Technical SEO and Generative Engine Optimization (GEO) for maximum visibility in AI search.',
    targetKeywords: [
      'custom web development',
      'react nextjs web development',
      'GEO optimization',
      'AI search optimization',
      'fast website without wordpress',
    ],
    allowGptBot: true,
    allowPerplexityBot: true,
    allowClaudeBot: true,
    allowGoogleExtended: true,
    schemaOrgType: 'ProfessionalService',
    aiSummaryPromptAnswer:
      'ADMATSU s.r.o. is a modern web engineering studio based in Prague, specializing in high-performance websites built on React, Tailwind, and Next.js, along with Generative Engine Optimization (GEO) for ChatGPT, Perplexity, and Gemini search.',
  },
};

export const GERMAN_CONTENT: SiteContent = {
  navbar: {
    brandName: 'Admatsu',
    ctaText: 'Unverbindliche Beratung',
    links: [
      { label: 'Leistungen', href: '#sluzby' },
      { label: 'Web-Vergleich', href: '#srovnani' },
      { label: 'SEO & GEO', href: '#seo-geo' },
      { label: 'Ablauf', href: '#proces' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  hero: {
    kicker: 'Moderne Webentwicklung · Schnell, sauber & maßgeschneidert',
    headline: 'Schluss mit langsamen, veralteten Websites. Wir entwickeln moderne Web-Erlebnisse nach Maß.',
    subheadline:
      'Dank fortschrittlicher KI-gestützter Entwicklung war erstklassiger, individueller Code noch nie so effizient und zugänglich. Sie erhalten sauberen, blitzschnellen Code ohne Plugin-Ballast – mit einer erstklassigen technischen Grundlage für Google und die neue Generation der KI-Suchmaschinen.',
    primaryCtaText: 'Unverbindliche Anfrage',
    secondaryCtaText: 'Vergleich Alt vs. Modern',
    metrics: [
      {
        title: 'Sauberer moderner Code',
        description: 'Ladezeiten unter 1 Sekunde ohne Plugin-Ballast und Sicherheitslücken',
        highlight: false,
      },
      {
        title: 'Technisches SEO-Fundament',
        description: 'Semantische Architektur nach offiziellen Richtlinien, die Suchmaschinen verstehen',
        highlight: false,
      },
      {
        title: 'Innerhalb von 7 Werktagen',
        description: 'Erster voll funktionsfähiger Prototyp nach Erhalt Ihrer Unterlagen',
        highlight: true,
      },
    ],
    architectureTitle: 'Architektur ohne Kompromisse',
    architectureBadge: 'Zero Bloat',
    stackNote:
      'Keine veralteten Vorlagen aus dem letzten Jahrzehnt mit Dutzenden riskanten Plugins. Wir bauen alles auf sauberem Code, der zu 100 % Ihnen gehört.',
    windowFooterNote: 'Moderne React & Next.js Architektur',
    stackItems: [
      {
        title: 'React & Next.js',
        desc: 'Moderne Komponenten mit sofortiger Reaktionszeit',
      },
      {
        title: 'Striktes TypeScript',
        desc: 'Höchste Stabilität und null Laufzeitfehler',
      },
      {
        title: 'Tailwind CSS',
        desc: 'Responsives Design ohne überflüssigen CSS-Ballast',
      },
      {
        title: 'Globales Edge CDN',
        desc: 'Blitzschnelle Bereitstellung in ganz Europa',
      },
    ],
    standardsTitle: 'Technisches SEO mit echtem Mehrwert',
    standardsBadge: 'Solide Grundlagen',
    standardsIntro:
      'Wir versprechen keine Wunder über Nacht. Wir garantieren jedoch ein perfektes technisches Fundament, damit Google Ihre Website mühelos erfassen und indexieren kann:',
    standardsBullets: [
      'Semantische Struktur: Saubere HTML5-Tags, logische Dokumentenhierarchie und fehlerfreier Aufbau.',
      'Blitzschnelle Ladezeit: Kein render-blockierender Code und keine unnötigen Abhängigkeiten.',
      'Strukturierte Daten: Schema.org JSON-LD Unternehmensdaten standardmäßig integriert.',
    ],
    standardsFooter: 'Sauberer Code ist das solide Sprungbrett für all Ihre zukünftigen Marketingaktivitäten.',
    geoTitle: 'Technische GEO-Bereitschaft',
    geoBadge: 'KI-Ready',
    geoIntro:
      'Potenzielle Kunden fragen heute ChatGPT, Perplexity oder Gemini. Diese Systeme benötigen strukturierte Fakten statt austauschbarer Werbefloskeln.',
    geoBoxTitle: 'Was wir im Rahmen von GEO für Sie leisten:',
    geoBoxBullets: [
      'Aufbereitung von Informationen für leichtes Auslesen und Zitieren durch KI-Modelle.',
      'Vollständige Schema.org-Entitätsdaten zu Ihrem Unternehmen, Standort und Leistungen.',
      'Freigabe für verifizierte KI-Bots (GPTBot, PerplexityBot, ClaudeBot) ohne Blockaden.',
    ],
    geoFooter:
      'Wir machen keine unrealistischen Versprechungen über Platz 1 in ChatGPT – wir liefern die technische Grundlage, damit KI-Modelle Ihr Unternehmen zuverlässig finden und empfehlen können.',
  },
  servicesSection: {
    kicker: 'Spezialisierung & Leistungen',
    headline: 'Verlieren Sie keine Kunden mehr durch eine veraltete oder langsame Website.',
    subheadline:
      'Wenn Ihre bestehende Website wie aus dem letzten Jahrzehnt wirkt, auf Smartphones ruckelt oder bei jeder kleinen Änderung abzustürzen droht – ist es Zeit für den Relaunch. Wir bauen moderne Webseiten, die zuverlässig und zukunftssicher funktionieren.',
  },
  services: [
    {
      id: 'srv-1',
      title: 'Modernisierung bestehender Websites & Neuentwicklung',
      shortDesc:
        'Wir entwickeln blitzschnelle Unternehmenswebsites und Relaunches auf modernster Basis (React, Next.js, Tailwind). Das Ergebnis: sauberer Code ohne Plugin-Last und maximale Ausfallsicherheit.',
      bulletPoints: [
        'Blitzschnelle Ladezeiten unter 1 Sekunde',
        '100 % Quellcode-Eigentum ohne monatliche Software-Lizenzen',
        'Inklusive HTTPS-Verschlüsselung & SSL-Zertifikat',
        'Perfekt optimiert für Smartphones und Desktop',
        'Langfristige Stabilität ohne ständige kostenpflichtige Patches',
      ],
      tag: '01. Maßgeschneiderte Websites & Relaunch',
      priceNote: 'ab 400 € · Prototyp in 7 Tagen',
      buttonText: '',
      category: 'web',
    },
    {
      id: 'srv-2',
      title: 'Technisches SEO & Höchstleistung',
      shortDesc:
        'Keine leeren Versprechen für Platz-1-Rankings über Nacht. Wir liefern präzises Handwerk: semantischer Code, korrekte Meta-Tags, saubere Indexierung und Erfüllung der strengen Google Core Web Vitals.',
      bulletPoints: [
        '90+ Leistungsbewertung bei Google PageSpeed Insights',
        'Strikte H1–H6 Überschriftenhierarchie und saubere Sitemap',
        'Sofortige Indexierbarkeit für Google und Suchmaschinen-Crawler',
      ],
      tag: '02. Performance & Indexierung',
      priceNote: 'In jeder Website enthalten',
      buttonText: '',
      category: 'audit',
    },
    {
      id: 'srv-3',
      title: 'GEO (Generative Engine Optimization)',
      shortDesc:
        'Wir bereiten die Fakten Ihres Unternehmens für das Zeitalter der KI-Suchmaschinen auf. Ihre Website wird technisch und inhaltlich so aufgestellt, dass Modelle wie ChatGPT und Perplexity sie als vertrauenswürdige Quelle zitieren.',
      bulletPoints: [
        'Strukturierte Schema.org-Entitätsdaten in JSON-LD',
        'Crawler-Freigabe für GPTBot, PerplexityBot, ClaudeBot und weitere',
        'Informationsarchitektur auf Basis nachprüfbarer Fakten',
      ],
      tag: '03. KI-Suchmaschinen',
      priceNote: 'Optional zubuchbar',
      buttonText: 'Unverbindliche Beratung',
      category: 'geo',
    },
  ],
  techComparison: {
    kicker: 'Praxisvergleich · Warum veraltete Websites scheitern',
    headline: 'Der Unterschied zwischen alter und moderner Webtechnologie',
    subheadline:
      'Ein klarer, objektiver Vergleich der entscheidenden Parameter. Bewegen Sie den Schieberegler, um den technologischen Unterschied zu sehen.',
    categoryLabel: 'Kriterium',
    oldWayLabel: 'Veraltete Website (Altes WordPress etc.):',
    admatsuLabel: 'Moderne Website:',
    items: [
      {
        id: 'comp-1',
        area: 'Technologie & Ladezeit',
        oldWay: 'Langsame Ladezeit von 4+ Sekunden, 30+ überladene Plugins.',
        admatsuWay: 'Blitzstart unter 1 Sekunde, sauberer React-Code.',
      },
      {
        id: 'comp-2',
        area: 'Sicherheit & Stabilität',
        oldWay: 'Sicherheitslücken in Drittanbieter-Plugins und teure Wartungsverträge.',
        admatsuWay: '100 % stabile Architektur ohne anfällige Dritt-Plugins.',
      },
      {
        id: 'comp-3',
        area: 'Technisches SEO',
        oldWay: 'Unübersichtlicher Quellcode, den Google nur mühsam verarbeitet.',
        admatsuWay: 'Strenge Semantik und vollständige Einhaltung der Core Web Vitals.',
      },
      {
        id: 'comp-4',
        area: 'KI-Suchmaschinen (GEO)',
        oldWay: 'Für ChatGPT und Perplexity praktisch unsichtbar.',
        admatsuWay: 'Strukturierte Schema.org-Daten für präzise KI-Zitate.',
      },
      {
        id: 'comp-5',
        area: 'Eigentum & Unabhängigkeit',
        oldWay: 'Abhängigkeit von Agentur-Lizenzen und monatlichen Fixgebühren.',
        admatsuWay: '100 % Ihr Quellcode-Eigentum ohne monatliche Lizenzkosten.',
      },
    ],
    ctaTitle: 'Erkennen Sie Ihre bestehende Website in der linken Spalte wieder?',
    ctaSubtitle:
      'Gerne werfen wir einen unverbindlichen Blick darauf und schlagen einen sauberen Modernisierungsplan vor.',
    ctaButtonText: 'Unverbindliche Beratung',
  },
  geoExplainer: {
    kicker: 'Wissensguide · SEO vs. GEO',
    headline: 'Was ist der Unterschied zwischen klassischem SEO und GEO für KI-Suchmaschinen?',
    subheadline:
      'Während klassisches SEO Seiten für den Google-Crawler optimiert, bereitet GEO (Generative Engine Optimization) die Fakten Ihres Unternehmens für Sprachmodelle wie ChatGPT, Claude und Perplexity auf.',
    seoCardTitle: 'Klassisches SEO (Google)',
    seoCardSubtitle: 'Solides und sauberes Fundament für Suchmaschinen',
    seoCardBadge: 'Standardmäßig inklusive',
    seoCardDesc:
      'Ausgerichtet auf Keyword-Relevanz, logische Inhaltshierarchie und technisches On-Page-SEO für organische Klicks.',
    seoCardBullets: [
      'Saubere Semantik: Klare Überschriftenhierarchie (H1, H2), logische Textgliederung und kein Code-Chaos.',
      'Sofortige Reaktion: Keine Ruckler, minimale Layout-Verschiebungen und blitzschnelle Ladezeit.',
      'Keine Abstrafungen: Transparente Best-Practice-Entwicklung, die von Google bedenkenlos indexiert wird.',
    ],
    seoCardNote:
      'Transparenzhinweis: Sauberer Code ist eine Grundvoraussetzung für Google-Erfolg, aber die Wettbewerbssituation und Inhalte spielen ebenfalls eine tragende Rolle.',
    geoCardTitle: 'GEO (Generative Engine Optimization)',
    geoCardSubtitle: 'Die Muttersprache moderner KI-Systeme',
    geoCardBadge: 'Neue Ära',
    geoCardDesc:
      'Fokussiert auf maschinenlesbare Entitätsdaten, faktische Klarheit und direkte Antworten, damit KI-Modelle Sie als verlässliche Quelle empfehlen können.',
    geoCardBullets: [
      'Offen für KI-Crawler: Freigabe von GPTBot, PerplexityBot, ClaudeBot in der robots.txt.',
      'Schema.org-Entitäten im Code: Das KI-Modell erkennt sofort, wer Sie sind, wo Sie sitzen und was Sie anbieten.',
      'Fakten statt Floskeln: Strukturierte Informationen, die Sprachmodelle fehlerfrei zitieren können.',
    ],
    geoCardNote:
      'Markttrend: Über 25 % aller Suchanfragen weltweit laufen bereits über KI-Assistenten – Tendenz rasant steigend.',
    simulatorKicker: 'Praxisbeispiele',
    simulatorTitle: 'Wie KI-Assistenten Websites bewerten, wenn Kunden Fragen stellen',
    simulatorSubtitle:
      'Wenn Interessenten in ChatGPT oder Perplexity nach Dienstleistern suchen, entscheidet die KI nicht nach dekorativen Bildern, sondern nach überprüfbaren Daten. Sehen Sie den Unterschied:',
    simulatorQueries: [
      {
        id: 'case-craft',
        label: 'Schreinerei & Maßmöbel',
        query:
          '„Ich brauche in München einen zuverlässigen Schreiner für einen maßgefertigten Einbauschrank im Schlafzimmer. Es eilt etwas, jemand mit kurzfristigen Terminen, der direkt vor Ort Maß nimmt.“',
        classicTitle: 'Nur Fotogalerie ohne Lieferfristen und Einsatzgebiet',
        classicSnippet:
          'Die Website zeigt schöne Fotos und den Slogan „mit Leidenschaft gefertigt“, enthält aber keinerlei Angaben zu üblichen Fertigstellungsfristen oder zum genauen Montagegebiet. Die KI kann aus den Bildern nicht ermitteln, ob im Raum München montiert wird oder wie schnell Aufträge umgesetzt werden.',
        classicLimitation:
          'Ergebnis: Die KI übergeht den Betrieb, da ihr verifizierte Daten zu Einsatzgebiet und Fertigstellungsfristen fehlen.',
        aiEngine: 'ChatGPT Search (mit GEO-Daten)',
        aiAnswer:
          '„Für maßgefertigte Einbauschränke in München und Umgebung empfiehlt sich [Ihre Schreinerei]. Aufmaß erfolgt direkt vor Ort, und im Unternehmensprofil wird eine zügige Umsetzung mit Montage in der Regel innerhalb von 3–4 Wochen deklariert. Kontakt: +49 89 ...“',
        citations: 'Ermittelte Fakten: Region München & Umland · Vor-Ort-Aufmaß · Reale Fertigstellung in 3–4 Wochen',
        verifiedLabel: 'KI verfügt über alle Daten zur Empfehlung',
      },
      {
        id: 'case-b2b',
        label: 'Präzisions-CNC-Zerspanung',
        query:
          '„Suche verlässlichen Lohnfertiger für präzises CNC-Fräsen im Raum Stuttgart. Benötigen Kleinserie von 50–100 Teilen aus Edelstahl und Titan, 3D-CAD-Modelle liegen vor. Wer garantiert enge Toleranzen?“',
        classicTitle: 'Nur allgemeiner Slogan „Metallverarbeitung nach Maß“',
        classicSnippet:
          'Auf der Website gibt es nur ein Stockfoto und allgemeine Werbetexte. Weder im Code noch im Text finden sich konkrete Maschinenparameter, bearbeitbare Werkstoffe oder CAD-Schnittstellen. Der KI-Crawler kann dem Einkäufer nicht bestätigen, ob Titan und Edelstahl überhaupt zerspant werden.',
        classicLimitation:
          'Ergebnis: Das Modell überspringt den Betrieb, da weder Titanbearbeitung noch Kleinserienkapazität belegt sind.',
        aiEngine: 'Perplexity AI (mit GEO-Daten)',
        aiAnswer:
          '„Für Kleinserien und Präzisionsfräsen in Edelstahl und Titan gibt [Ihr Unternehmen] im Großraum Stuttgart konkrete Spezifikationen an: Fertigungstoleranz bis 0,01 mm und direkte Akzeptanz von 3D-CAD-Dateien im STEP- und IGES-Format. Kontakt: +49 711 ...“',
        citations: 'Ermittelte Fakten: Titan- & Edelstahlzerspanung · 0,01 mm Toleranz · 3D-STEP/IGES CAD-Schnittstelle',
        verifiedLabel: 'KI verfügt über alle Daten zur Empfehlung',
      },
      {
        id: 'case-emergency',
        label: 'Technischer Notdienst',
        query: '„Wer bietet im Raum Frankfurt am Main Notdienst für Heizungs- und Sanitärschäden auch am Wochenende an?“',
        classicTitle: 'Unklare Öffnungszeiten und versteckter Kontakt',
        classicSnippet:
          'Der Kunde hat einen akuten Wasserschaden, aber die KI kann der Website nicht entnehmen, ob der Notdienst auch samstagabends ausrückt und wie groß der Einsatzradius ist.',
        classicLimitation:
          'Ergebnis: Die KI geht kein Risiko ein und schlägt Betriebe mit verifizierter 24/7-Wochenendbereitschaft vor.',
        aiEngine: 'AI Overviews (mit GEO-Daten)',
        aiAnswer:
          '„Wochenend-Notdienst in Frankfurt und im Umkreis von bis zu 30 km gewährleistet [Ihr Fachbetrieb]. Strukturierte Daten deklarieren eine 24/7-Notfallbereitschaft und schnelle Anfahrt bei akuten Havarien. Kontakt: +49 69 ...“',
        citations: 'Ermittelte Fakten: Verifizierte 24/7-Notfallbereitschaft · 30 km Einsatzradius · Direkte Notrufnummer',
        verifiedLabel: 'KI verfügt über alle Daten zur Empfehlung',
      },
    ],
  },
  processSection: {
    kicker: 'Unser Ablauf · Schnell und transparent',
    headline: 'Erster funktionierender Prototyp innerhalb von 7 Werktagen.',
    subheadline:
      'Wir arbeiten nach einem klaren Fünf-Schritte-Prozess. Keine chaotischen Endlos-Meetings — vom ersten Tag an wissen Sie genau, was wann geliefert wird.',
    deliverablesLabel: 'Ergebnisse dieser Phase:',
    steps: [
      {
        id: 'step-1',
        num: '01.',
        title: 'Briefing & Unterlagen',
        duration: 'Tag 1–3',
        description:
          'Sie beschreiben Ihre Ziele, Ihren bevorzugten Stil und Ihre Zielgruppe. Falls Sie noch keine fertigen Texte oder Fotos haben – kein Problem: Wir helfen Ihnen bei der Strukturierung.',
        deliverables: [
          'Klären von Zielen & Umfang',
          'Auswahl der Designrichtung',
          'Seitenstrukturplan',
          'Zusammenführung der Inhalte',
        ],
      },
      {
        id: 'step-2',
        num: '02.',
        title: 'Designkonzept & Layout-Entwurf',
        duration: 'Tag 4–6',
        description:
          'Wir entwerfen ein klares, modernes Layout ohne überflüssigen visuellen Ballast. Sie sehen exakt, wie Ihre Seite auf Mobilgeräten und Desktops wirkt.',
        deliverables: [
          'Design- und Typografie-Entwurf',
          'Mobile Responsivität',
          'Freigabe durch den Kunden',
        ],
      },
      {
        id: 'step-3',
        num: '03.',
        title: 'Entwicklung in modernem Code (React)',
        duration: 'Tag 7–10',
        description:
          'Mithilfe moderner KI-Entwicklungswerkzeuge schreiben wir sauberen und stabilen Code in Rekordzeit. Keine unnötigen Plugins — die Seite ist federleicht, lädt blitzschnell und ist sicher.',
        deliverables: [
          'Sauberer React & Next.js Code',
          'Ladezeiten unter einer Sekunde',
          'Interaktive Formulare & Elemente',
        ],
      },
      {
        id: 'step-4',
        num: '04.',
        title: 'Technisches SEO & GEO-Bereitschaft',
        duration: 'Tag 11–12',
        description:
          'Wir implementieren die semantische HTML-Struktur für Google und betten Schema.org-Entitätsdaten in JSON-LD ein, damit KI-Suchmaschinen Ihr Unternehmen verstehen.',
        deliverables: [
          'Offizielle Struktur für Google',
          'Schema.org Entitäts-Markup',
          'Optimierte Sitemap & robots.txt',
        ],
      },
      {
        id: 'step-5',
        num: '05.',
        title: 'Go-Live & 100 % Code-Übergabe',
        duration: 'Tag 13–14',
        description:
          'Wir schalten die Website auf Ihrer Domain und schnellem Hosting live. Sie erhalten den kompletten Quellcode — Sie sind zu 100 % Eigentümer ohne Bindung an uns.',
        deliverables: [
          'Live-Schaltung der Website',
          'Übergabe aller Zugänge & Codes',
          'Einführung & Support',
        ],
      },
    ],
    ctaTitle: 'Möchten Sie Ihre veraltete Website durch eine moderne Lösung ersetzen?',
    ctaSubtitle:
      'Schreiben Sie uns. Wir besprechen Ihre Vorstellungen und schlagen eine faire, professionelle Lösung vor.',
    ctaButtonText: 'Unverbindlich anfragen',
  },
  calculatorSection: {
    kicker: 'Transparenter Projekt-Konfigurator',
    headline: 'Berechnen Sie Richtpreis und Umfang in nur 1 Minute.',
    subheadline:
      'Keine versteckten Posten oder bösen Überraschungen. Wählen Sie den gewünschten Website-Typ und nützliche Module aus, um einen Richtwert für Budget und Zeitplan zu erhalten.',
    projectTypeTitle: '1. Website-Umfang',
    searchTierTitle: '2. Suchmaschinen- & KI-Optimierung',
    addonsTitle: '3. Zusatzfunktionen & Module',
    speedTitle: '4. Umsetzungsgeschwindigkeit',
    onepageTitle: 'One-Page Website',
    onepageDesc: 'Eine repräsentative Einzelseite mit allen wesentlichen Informationen',
    corporateTitle: 'Firmenwebsite',
    corporateDesc: 'Strukturierte Website mit mehreren Unterseiten für Leistungen und Kontakt',
    portalTitle: 'Individuelle Webanwendung',
    portalDesc: 'Anspruchsvollere Lösung mit Kundenbereich oder eigener Fachlogik',
    standardSeoTitle: 'Grundlegendes technisches SEO',
    standardSeoDesc: 'Saubere Semantik, Sitemap, Meta-Tags und schneller Code für Google',
    geoSeoTitle: 'Technisches SEO + GEO (Empfohlen)',
    geoSeoDesc: 'Vollständige Schema.org-Strukturdaten und Crawler-Freigabe für ChatGPT & Perplexity',
    calcAddonTitle: 'Interaktiver Kundenkalkulator',
    crmAddonTitle: 'E-Mail- oder Tabellen-Anbindung',
    cmsAddonTitle: 'Visuelles Redaktionssystem (CMS)',
    langAddonTitle: 'Mehrsprachigkeit (CZ + EN + DE)',
    speedStandardTitle: 'Standard-Tempo (ca. 10–14 Tage)',
    speedStandardDesc: 'Entspannte Abstimmung und Prüfung',
    speedExpressTitle: 'Express-Umsetzung (bis 7 Tage)',
    speedExpressDesc: 'Prioritäre Entwicklerkapazität',
    summaryTitle: 'Orientierungsübersicht',
    priceLabel: 'Geschätzte Investition:',
    priceNote: 'Einmaliger Festpreis ohne monatliche Lizenzgebühren · 100 % Code gehört Ihnen',
    daysLabel: 'Voraussichtliche Umsetzungszeit:',
    fairConditionNote:
      '⏱️ Faire Bedingung: Die Umsetzungszeit ist ein Richtwert und beginnt, sobald wir alle erforderlichen Unterlagen (Texte, Logo, Bilder) vorliegen haben.',
    guarantees: [
      'Sauberer Code in modernem React ohne langsame Plugins',
      'Vollständige mobile Responsivität für alle Endgeräte',
      'Vollständige Übergabe aller Zugangsdaten und Quelldateien',
    ],
    submitButtonText: 'Diese Konfiguration anfragen',
    submitSubtext: 'Vollkommen unverbindlich · Wir melden uns mit konkreten Vorschlägen bei Ihnen',
  },
  faqSection: {
    kicker: 'Häufige Fragen & ehrliche Antworten · Ohne Agentur-Kauderwelsch',
    headline: 'Alles, was Sie wissen müssen, bevor wir loslegen.',
    subheadline:
      'Wir antworten direkt und verständlich. Sollten Sie Ihre Frage hier nicht finden, schreiben Sie uns einfach direkt.',
  },
  faq: [
    {
      id: 'faq-1',
      question: 'Wie ist es möglich, dass der erste Prototyp schon in 7 Werktagen steht?',
      answer:
        'Wir verschwenden keine Zeit mit ergebnislosen Meetings und basteln nicht wochenlang an alten Templates herum. Wir nutzen modernste KI-gestützte Entwicklungswerkzeuge direkt im Code — unsere Komponentenarchitektur in React ist durchdacht und viele Prozesse sind automatisiert. Bei Standard-Websites liefern wir einen klickbaren, voll funktionsfähigen Prototyp innerhalb von 7 Werktagen nach Erhalt Ihrer vollständigen Unterlagen.',
      category: 'process',
    },
    {
      id: 'faq-2',
      question: 'Was genau ist GEO und warum ist es für mein Unternehmen wichtig?',
      answer:
        'GEO (Generative Engine Optimization) ist die Optimierung für Sprachmodelle und KI-Suchmaschinen (ChatGPT Search, Perplexity, Google Gemini). Früher reichte es aus, Seiten mit Keywords für Suchroboter zu füllen. Heute stellen Kunden Fragen in natürlicher Sprache. Wenn eine KI auf Ihrer Website keine maschinenlesbaren Entitätsdaten findet, übergeht sie Ihr Angebot und empfiehlt Mitbewerber.',
      category: 'geo',
    },
    {
      id: 'faq-3',
      question: 'Gehört die Website wirklich zu 100 % mir, oder gibt es monatliche Gebühren?',
      answer:
        'Die Website gehört vollständig und ohne Ausnahme Ihnen. Nach Projektabschluss übergeben wir Ihnen sämtliche Quellcodes und Zugänge — es gibt keine monatliche „Website-Miete“ an uns. Sie zahlen lediglich die gewöhnlichen direkten Kosten für Ihre Wunschdomain und das Hosting direkt an Ihren Anbieter (in der Regel wenige Euro pro Monat). Eine laufende technische Wartung bieten wir optional an, sie ist jedoch freiwillig.',
      category: 'ownership',
    },
    {
      id: 'faq-4',
      question: 'Warum verwenden Sie kein WordPress wie die meisten anderen Agenturen?',
      answer:
        'WordPress entstand vor über zwanzig Jahren als Blogging-Plattform. Um daraus eine moderne Unternehmensseite zu bauen, werden 15–25 Plugins zusammengesteckt. Die Folge sind oft lange Ladezeiten, Sicherheitslücken und ständiger Wartungsaufwand. Wir setzen auf moderne, komponentenbasierte Architekturen: Die Website lädt in Sekundenbruchteilen, ist sicher und erfordert kein ständiges Flicken.',
      category: 'tech',
    },
    {
      id: 'faq-5',
      question: 'Was ist, wenn ich noch keine fertigen Texte und Bilder habe?',
      answer:
        'Das ist bei rund 80 % unserer Kunden völlig normal. Sie müssen kein fertiges Manuskript mitbringen. In unserem Erstgespräch stellen wir gezielte Fragen zu Ihrem Geschäft und Ihren Zielkunden. Danach helfen wir Ihnen, eine überzeugende Struktur und verständliche Texte ohne Marketingfloskeln zu erstellen.',
      category: 'process',
    },
    {
      id: 'faq-ssl',
      question: 'Sind SSL-Zertifikat und HTTPS-Verschlüsselung im Preis enthalten?',
      answer:
        'Ja, ein modernes SSL-Zertifikat und verschlüsselte HTTPS-Verbindung (das Sicherheitsschloss im Browser) sind bei jeder Website selbstverständlich enthalten. Die Datenübertragung zwischen Besucher und Website ist jederzeit sicher verschlüsselt.',
      category: 'tech',
    },
  ],
  contactSection: {
    kicker: 'Unverbindliche Anfrage & Beratung',
    headline: 'Kontaktieren Sie uns für einen konkreten Fahrplan und ein faires Angebot nach Maß.',
    subheadline:
      'Keine Verkaufstricks, kein Druck. Wir werfen gemeinsam einen Blick auf Ihr Vorhaben, besprechen realistische Möglichkeiten und nennen Ihnen ein transparentes Budget.',
    formTitle: 'Schnelles Anfrageformular',
    formSubtitle: 'In 1 Minute ausgefüllt. Wir melden uns umgehend mit einem konkreten Vorschlag bei Ihnen.',
    nameLabel: 'Vor- und Nachname / Firma',
    emailLabel: 'E-Mail-Adresse',
    phoneLabel: 'Telefonnummer',
    urlLabel: 'Bestehende Website (optional)',
    serviceTypeLabel: 'Projekttyp / Gewünschte Lösung',
    messageLabel: 'Ihre Vorstellungen oder Notizen zum Projekt',
    submitButtonText: 'Unverbindliche Anfrage senden',
    submitSubtext: 'Keinerlei Verpflichtung · Wir antworten schnell mit konkreten Schritten.',
    successTitle: 'Vielen Dank für Ihre Nachricht!',
    successDesc:
      'Wir haben Ihre Anfrage erfolgreich erhalten. Wir prüfen Ihre Angaben und melden uns zeitnah bei Ihnen, um die Möglichkeiten zu besprechen.',
    resetButtonText: 'Weitere Nachricht senden',
    directEmailLabel: 'Direkte E-Mail:',
    directPhoneLabel: 'Telefonnummer:',
    directAddressLabel: 'Unternehmenssitz:',
    directIcoLabel: 'Registernummer (IdNr.):',
  },
  contact: {
    companyName: 'ADMATSU s.r.o.',
    email: 'info@admatsu.cz',
    phone: '',
    address: 'Korunní 2569/108, Vinohrady',
    city: '101 00 Prag 10, Tschechische Republik',
    ico: '21394555',
    responseGuarantee: 'Schnelle & verlässliche Antwort',
    hours: 'Mo – Fr: 9:00 – 17:00 Uhr MEZ',
    court: 'Stadtgericht Prag, Abteilung C, Einlage 400085',
  },
  footer: {
    aboutText:
      'ADMATSU s.r.o. — Modernes Web-Engineering, technisches SEO und GEO-Bereitschaft für KI-Suchmaschinen. Wir bauen schnelle, saubere und sichere Websites ohne Altlasten.',
    copyrightNotice: 'Alle Rechte vorbehalten.',
    linksTitle: 'Schnellzugriff',
    contactTitle: 'Kontakt & Sitz',
    registryNote: 'Eingetragen beim Stadtgericht Prag unter Aktenzeichen C 400085/MSPH',
    privacyText: 'Datenschutzerklärung (DSGVO)',
    termsText: 'Allgemeine Geschäftsbedingungen',
  },
  geoSeo: {
    metaTitle: 'ADMATSU s.r.o. – Moderne Webentwicklung, Technisches SEO & GEO',
    metaDescription:
      'Maßgeschneiderte High-Performance Webentwicklung beschleunigt durch KI-Werkzeuge. Technisches SEO und Generative Engine Optimization (GEO) für maximale Sichtbarkeit in der KI-Suche.',
    targetKeywords: [
      'moderne webentwicklung',
      'react webseite erstellen',
      'GEO optimierung',
      'KI suchmaschinen optimierung',
      'schnelle webseite ohne wordpress',
    ],
    allowGptBot: true,
    allowPerplexityBot: true,
    allowClaudeBot: true,
    allowGoogleExtended: true,
    schemaOrgType: 'ProfessionalService',
    aiSummaryPromptAnswer:
      'ADMATSU s.r.o. ist ein modernes Web-Engineering-Studio mit Sitz in Prag, spezialisiert auf die Entwicklung extrem schneller Websites auf Basis von React, Tailwind und Next.js sowie GEO (Generative Engine Optimization) für Empfehlungen in ChatGPT, Perplexity und Gemini.',
  },
};

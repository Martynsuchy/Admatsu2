import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import {
  LayoutDashboard,
  FileText,
  Inbox,
  Sparkles,
  Shield,
  Eye,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Plus,
  Trash2,
  Save,
  Search,
  ExternalLink,
  Bot,
  Zap,
  Clock,
  ArrowRight,
  TrendingUp,
  Download,
  Copy,
  ChevronRight,
  Send,
  SlidersHorizontal,
  LogOut,
} from 'lucide-react';
import { ServiceItem, FaqItemContent } from '../../types/cms';

export const CmsDashboard: React.FC = () => {
  const {
    content,
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
    updateInquiryStatus,
    deleteInquiry,
    addInquiry,
    viewMode,
    setViewMode,
    revisions,
    restoreRevision,
    resetToDefaults,
    triggerToast,
    logout,
  } = useCms();

  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'leads' | 'geo' | 'security'>('overview');
  const [contentSubTab, setContentSubTab] = useState<'hero' | 'services' | 'tech' | 'geo' | 'process' | 'calc' | 'faq' | 'contact' | 'footer' | 'search'>('hero');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(inquiries[0]?.id || null);
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');
  const [leadNotesInput, setLeadNotesInput] = useState<{ [id: string]: string }>({});

  const selectedLead = inquiries.find((i) => i.id === selectedLeadId);

  // New service modal/state
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');

  // New FAQ state
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  const filteredInquiries = inquiries.filter((i) => {
    if (leadStatusFilter === 'all') return true;
    return i.status === leadStatusFilter;
  });

  const handleCreateTestLead = () => {
    addInquiry({
      name: 'Marek Procházka (DesignLab s.r.o.)',
      email: 'prochazka@designlab.cz',
      phone: '+420 720 111 222',
      serviceType: 'Kompletní modernizace webu + GEO optimalizace',
      existingUrl: 'https://designlab-stary.cz',
      estimatedPrice: '32 000 Kč',
      message: 'Dobrý den, potřebujeme přepracovat web na rychlý stack a nastavit strukturovaná data pro ChatGPT a Perplexity. Jak brzy můžete začít?',
      notes: 'Zájem o expresní termín realizace do 10 dní.',
    });
  };

  const handleExportLeads = () => {
    const jsonStr = JSON.stringify(inquiries, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `poptavky-admatsu-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    triggerToast('Poptávky byly úspěšně exportovány do JSON.');
  };

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': content.geoSeo.schemaOrgType,
    name: content.contact.companyName,
    description: content.geoSeo.metaDescription,
    url: 'https://admatsu.com',
    telephone: content.contact.phone,
    email: content.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: content.contact.address,
      addressLocality: content.contact.city,
      addressCountry: 'CZ',
    },
    openingHours: 'Mo-Fr 09:00-17:00',
    areaServed: 'Česká republika',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Webové inženýrství & GEO',
      itemListElement: content.services.map((s, idx) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.shortDesc,
        },
        position: idx + 1,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-sans">
      {/* Top CMS Header */}
      <header className="border-b border-white/10 bg-[#090E1B] sticky top-0 z-40 px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-slate-950 text-base shadow-md shadow-cyan-500/20">
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white tracking-tight font-display text-sm sm:text-base">
                  Admatsu Studio CMS
                </span>
                <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                  Live Sync
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Redakční systém nové generace · Bez těžkopádných pluginů · Okamžitý zápis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'split' ? 'cms' : 'split')}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              title="Zobrazit editor a web vedle sebe"
            >
              <span>{viewMode === 'split' ? 'Celá obrazovka CMS' : 'Split-Screen náhled'}</span>
            </button>

            <button
              onClick={() => {
                setViewMode('web');
                triggerToast('Zobrazen čistý web. Pro návrat do CMS stiskněte Ctrl+Shift+A');
              }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-1.5 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition-all cursor-pointer shadow-md shadow-cyan-500/20 active:scale-98"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Zobrazit web</span>
            </button>

            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-rose-300 hover:bg-rose-950/30 hover:border-rose-500/30 transition-colors cursor-pointer"
              title="Odhlásit se z administrace"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Odhlásit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main CMS Layout with Navigation Sidebar / Tabs */}
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 flex flex-col md:flex-row gap-6">
        {/* Navigation Sidebar */}
        <nav className="w-full md:w-64 shrink-0 space-y-1">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 pb-2">
            Moduly správy
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-300'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="h-4 w-4" />
              <span>Přehled & Stav webu</span>
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'content'
                ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-300'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="h-4 w-4" />
              <span>Obsah webu (Editor)</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">4 sekce</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'leads'
                ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-300'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Inbox className="h-4 w-4" />
              <span>Poptávky & CRM</span>
            </div>
            <span className="rounded-full bg-cyan-500/20 border border-cyan-500/40 px-2 py-0.5 text-[10px] font-bold text-cyan-300">
              {inquiries.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('geo')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'geo'
                ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-300'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>GEO & AI Vyhledávače</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">AI-Ready</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'security'
                ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-300'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Shield className="h-4 w-4" />
              <span>Revize & Bezpečnost</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">100/100</span>
          </button>

          {/* Quick CMS Info Callout */}
          <div className="pt-6">
            <div className="rounded-xl border border-white/10 bg-[#0B101D] p-3 text-[11px] text-slate-400 space-y-2">
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-cyan-400" />
                <span>Proč je toto CMS jiné?</span>
              </div>
              <p className="leading-relaxed">
                Žádný přetížený WordPress. Data jsou uložena v čisté struktuře, frontend se sestavuje
                okamžitě bez databázové latence a nehrozí rozbití pluginů.
              </p>
              <div className="pt-1 border-t border-white/5 flex items-center justify-between text-[10px]">
                <span>Hosting: Globální Edge CDN</span>
                <span className="text-emerald-400 font-mono">0ms delay</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Content Pane */}
        <main className="flex-1 min-w-0">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-xl border border-white/10 bg-[#0B101D] p-4 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Google PageSpeed</span>
                    <Zap className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-emerald-400 font-display">99 / 100</div>
                  <div className="text-[11px] text-slate-400">Core Web Vitals splněno na zelenou</div>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0B101D] p-4 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>GEO & AI Připravenost</span>
                    <Bot className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-bold text-cyan-400 font-display">96 %</div>
                  <div className="text-[11px] text-slate-400">ChatGPT, Perplexity & Claude boti aktivní</div>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0B101D] p-4 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Aktivní poptávky</span>
                    <Inbox className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-white font-display">{inquiries.length}</div>
                  <div className="text-[11px] text-slate-400">
                    {inquiries.filter((i) => i.status === 'new').length} nových ke zpracování
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0B101D] p-4 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Doba načtení (TTFB)</span>
                    <Clock className="h-4 w-4 text-slate-300" />
                  </div>
                  <div className="text-2xl font-bold text-white font-display">42 ms</div>
                  <div className="text-[11px] text-slate-400">Statické servírování z CDN cache</div>
                </div>
              </div>

              {/* Srovnání s tradičním WordPressem */}
              <div className="rounded-xl border border-white/10 bg-[#0B101D] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white font-display">
                    Architektura: Admatsu Redakční systém vs. Tradiční WordPress
                  </h3>
                  <span className="text-xs font-mono text-cyan-400">Inženýrský standard</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="rounded-lg bg-rose-950/20 border border-rose-500/20 p-4 space-y-2">
                    <div className="font-semibold text-rose-300 flex items-center gap-1.5">
                      <AlertCircle className="h-4 w-4" />
                      <span>Běžný WordPress se šablonou</span>
                    </div>
                    <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                      <li>35–50 pluginů (Elementor, WooCommerce, Yoast, bezpečnostní záplaty)</li>
                      <li>Časté výpadky při aktualizacích PHP nebo pluginů</li>
                      <li>Pomalé načítání na mobilech (LCP 4–8 sekund)</li>
                      <li>AI crawlery narážejí na tuny zbytečného kódu a javascriptu</li>
                      <li>Nutnost neustálé placené správy a údržby (3 000+ Kč/měs)</li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-emerald-950/20 border border-emerald-500/20 p-4 space-y-2">
                    <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Admatsu Headless & Visual CMS</span>
                    </div>
                    <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                      <li>0 nebezpečných pluginů – čistý TypeScript kód na míru</li>
                      <li>Strukturovaná data pro ChatGPT a Google přímo v jádru</li>
                      <li>Blesková odezva pod 0.5s kdekoli na světě</li>
                      <li>Nulové měsíční licenční poplatky, web vám 100% patří</li>
                      <li>Možnost editovat texty přímo na webu i v administraci</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Poslední poptávky rychlý náhled */}
              <div className="rounded-xl border border-white/10 bg-[#0B101D] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white font-display">
                      Nejnovější poptávky z formuláře a kalkulačky
                    </h3>
                    <p className="text-xs text-slate-400">
                      Okamžité doručení přímo do vašeho CMS i na e-mail
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium cursor-pointer"
                  >
                    <span>Všechny poptávky ({inquiries.length})</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {inquiries.slice(0, 3).map((lead) => (
                    <div
                      key={lead.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-semibold text-white flex items-center gap-2">
                          <span>{lead.name}</span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                              lead.status === 'new'
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                : lead.status === 'in_progress'
                                ? 'bg-purple-500/20 text-purple-300'
                                : 'bg-emerald-500/20 text-emerald-300'
                            }`}
                          >
                            {lead.status === 'new'
                              ? 'Nová'
                              : lead.status === 'in_progress'
                              ? 'Zpracovává se'
                              : 'Nabídka odeslána'}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {lead.serviceType} · <span className="text-cyan-400">{lead.estimatedPrice}</span>
                        </div>
                      </div>
                      <div className="text-right text-[11px] text-slate-400 font-mono">
                        {lead.createdAt}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONTENT EDITOR */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              {/* Subtabs for content */}
              <div className="flex items-center gap-1.5 border-b border-white/10 pb-3 overflow-x-auto text-xs">
                {[
                  { id: 'hero', label: '1. Hero úvod' },
                  { id: 'services', label: `2. Služby (${content.services.length})` },
                  { id: 'tech', label: '3. Srovnání standardů' },
                  { id: 'geo', label: '4. SEO a GEO texty' },
                  { id: 'process', label: '5. 5 kroků procesu' },
                  { id: 'calc', label: '6. Kalkulačka texty' },
                  { id: 'faq', label: `7. FAQ (${content.faq.length})` },
                  { id: 'contact', label: '8. Kontakty & Firma' },
                  { id: 'footer', label: '9. Patička' },
                  { id: 'search', label: '🔍 Prohledat všechny texty' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setContentSubTab(st.id as any)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
                      contentSubTab === st.id
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* Subtab: Hero */}
              {contentSubTab === 'hero' && (
                <div className="space-y-6">
                  {/* Brand & Navbar Settings Card */}
                  <div className="rounded-xl border border-white/10 bg-[#0B101D] p-6 space-y-4 text-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <h3 className="text-base font-bold text-white font-display">
                          Navigace & Základní identita (Menu)
                        </h3>
                        <p className="text-xs text-slate-400">
                          Nastavení loga/názvu a konverzního tlačítka v horní liště
                        </p>
                      </div>
                      <span className="text-[11px] font-mono text-cyan-400">Horní lišta</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">
                          Název značky v menu (Wordmark)
                        </label>
                        <input
                          type="text"
                          value={content.navbar?.brandName || 'Admatsu'}
                          onChange={(e) => updateNavbar({ brandName: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-slate-100 font-bold focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">
                          Text tlačítka v horní navigaci
                        </label>
                        <input
                          type="text"
                          value={content.navbar?.ctaText || 'Nezávazná konzultace'}
                          onChange={(e) => updateNavbar({ ctaText: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-slate-100 focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-[#0B101D] p-6 space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <h3 className="text-base font-bold text-white font-display">
                          Úprava hlavní Hero sekce
                        </h3>
                        <p className="text-xs text-slate-400">
                          Změny se ihned propisují do reálného zobrazení webu
                        </p>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Automatické ukládání
                      </span>
                    </div>

                    <div className="space-y-4 text-xs">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">
                          Horní kicker odznak (Trust kicker)
                        </label>
                        <input
                          type="text"
                          value={content.hero.kicker}
                          onChange={(e) => updateHero({ kicker: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-slate-100 focus:border-cyan-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">
                          Hlavní nadpis (H1)
                        </label>
                        <textarea
                          rows={2}
                          value={content.hero.headline}
                          onChange={(e) => updateHero({ headline: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-slate-100 focus:border-cyan-500 focus:outline-none font-display text-sm"
                        />
                        <span className="text-[10px] text-slate-400">
                          Doporučeno: 50–90 znaků pro maximální konverzi a čitelnost.
                        </span>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">
                          Perex / Podnadpis (Value Proposition)
                        </label>
                        <textarea
                          rows={3}
                          value={content.hero.subheadline}
                          onChange={(e) => updateHero({ subheadline: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-slate-100 focus:border-cyan-500 focus:outline-none leading-relaxed"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-semibold text-slate-300 mb-1">
                            Text primárního CTA tlačítka
                          </label>
                          <input
                            type="text"
                            value={content.hero.primaryCtaText}
                            onChange={(e) => updateHero({ primaryCtaText: e.target.value })}
                            className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-slate-100 focus:border-cyan-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-300 mb-1">
                            Text sekundárního tlačítka
                          </label>
                          <input
                            type="text"
                            value={content.hero.secondaryCtaText}
                            onChange={(e) => updateHero({ secondaryCtaText: e.target.value })}
                            className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-slate-100 focus:border-cyan-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Proof point metrics */}
                      <div className="pt-3 border-t border-white/10 space-y-3">
                        <label className="block font-semibold text-slate-200">
                          Klíčové metriky (3 proof points pod formulářem)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {content.hero.metrics.map((m, idx) => (
                            <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-2">
                              <input
                                type="text"
                                value={m.title}
                                onChange={(e) => {
                                  const newMetrics = [...content.hero.metrics];
                                  newMetrics[idx] = { ...newMetrics[idx], title: e.target.value };
                                  updateHero({ metrics: newMetrics });
                                }}
                                className="w-full font-bold text-slate-100 bg-transparent border-b border-white/20 pb-1 focus:border-cyan-400 focus:outline-none"
                              />
                              <textarea
                                rows={2}
                                value={m.description}
                                onChange={(e) => {
                                  const newMetrics = [...content.hero.metrics];
                                  newMetrics[idx] = { ...newMetrics[idx], description: e.target.value };
                                  updateHero({ metrics: newMetrics });
                                }}
                                className="w-full text-[11px] text-slate-400 bg-transparent focus:outline-none resize-none"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Architecture preview box texts */}
                      <div className="pt-4 border-t border-white/10 space-y-3">
                        <label className="block font-semibold text-slate-200">
                          Pravý vizuální box (Architektura & Stack)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Titulek okna</label>
                            <input
                              type="text"
                              value={content.hero.architectureTitle || 'Architektura bez kompromisů'}
                              onChange={(e) => updateHero({ architectureTitle: e.target.value })}
                              className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Odznak (Badge)</label>
                            <input
                              type="text"
                              value={content.hero.architectureBadge || 'Zero Bloat'}
                              onChange={(e) => updateHero({ architectureBadge: e.target.value })}
                              className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-cyan-400 font-mono focus:outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Poznámka k architektuře</label>
                          <textarea
                            rows={2}
                            value={content.hero.stackNote || 'Žádné staré šablony z roku 2015 s desítkami nebezpečných pluginů. Vše stavíme na čistém kódu, který vám 100% patří.'}
                            onChange={(e) => updateHero({ stackNote: e.target.value })}
                            className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-slate-300 focus:outline-none leading-relaxed"
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* Subtab: Services */}
              {contentSubTab === 'services' && (
                <div className="space-y-5">
                  {/* Section Header Editor */}
                  <div className="rounded-xl border border-white/10 bg-[#0B101D] p-5 space-y-3 text-xs">
                    <h4 className="font-bold text-white font-display text-sm">Hlavička sekce Služby</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Kicker</label>
                        <input
                          type="text"
                          value={content.servicesSection.kicker}
                          onChange={(e) => updateServicesSection({ kicker: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Hlavní nadpis</label>
                        <input
                          type="text"
                          value={content.servicesSection.headline}
                          onChange={(e) => updateServicesSection({ headline: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none font-bold"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Perex / Podnadpis</label>
                      <textarea
                        rows={2}
                        value={content.servicesSection.subheadline}
                        onChange={(e) => updateServicesSection({ subheadline: e.target.value })}
                        className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white font-display">
                      Karty služeb a balíčků ({content.services.length})
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {content.services.map((srv) => (
                      <div
                        key={srv.id}
                        className="rounded-xl border border-white/10 bg-[#0B101D] p-5 space-y-3 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={srv.tag}
                            onChange={(e) => updateService(srv.id, { tag: e.target.value })}
                            className="font-mono text-cyan-400 font-semibold bg-transparent border-b border-white/10 focus:border-cyan-400 focus:outline-none text-[11px]"
                          />
                          <button
                            onClick={() => deleteService(srv.id)}
                            className="text-slate-500 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                            title="Smazat službu"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-300 mb-1">Název služby</label>
                          <input
                            type="text"
                            value={srv.title}
                            onChange={(e) => updateService(srv.id, { title: e.target.value })}
                            className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 font-bold text-white focus:border-cyan-400 focus:outline-none font-display text-sm"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-300 mb-1">Popis</label>
                          <textarea
                            rows={3}
                            value={srv.shortDesc}
                            onChange={(e) => updateService(srv.id, { shortDesc: e.target.value })}
                            className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-slate-300 focus:border-cyan-400 focus:outline-none leading-relaxed"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-300 mb-1">Cenová poznámka / orientační cena</label>
                          <input
                            type="text"
                            value={srv.priceNote}
                            onChange={(e) => updateService(srv.id, { priceNote: e.target.value })}
                            className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-1.5 text-cyan-300 font-mono text-[11px] focus:border-cyan-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Service Form */}
                  <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-5 space-y-3 text-xs">
                    <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <Plus className="h-4 w-4 text-cyan-400" />
                      <span>Přidat novou službu do nabídky</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Název služby"
                        value={newServiceTitle}
                        onChange={(e) => setNewServiceTitle(e.target.value)}
                        className="rounded-lg bg-black/50 border border-white/10 px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Cena (např. od 8 000 Kč)"
                        value={newServicePrice}
                        onChange={(e) => setNewServicePrice(e.target.value)}
                        className="rounded-lg bg-black/50 border border-white/10 px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Stručný popis služby a přínosu pro klienta..."
                      value={newServiceDesc}
                      onChange={(e) => setNewServiceDesc(e.target.value)}
                      className="w-full rounded-lg bg-black/50 border border-white/10 px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        if (!newServiceTitle.trim()) return;
                        addService({
                          id: `srv-${Date.now()}`,
                          title: newServiceTitle,
                          shortDesc: newServiceDesc || 'Profesionální služba na míru.',
                          tag: `0${content.services.length + 1}. Nová služba`,
                          priceNote: newServicePrice || 'Individuálně',
                          bulletPoints: ['Rychlá realizace', 'Čistý výstup'],
                          category: 'web',
                        });
                        setNewServiceTitle('');
                        setNewServiceDesc('');
                        setNewServicePrice('');
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950 hover:bg-cyan-400 cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Vložit do nabídky webu</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Subtab: Tech Comparison */}
              {contentSubTab === 'tech' && (
                <div className="space-y-5">
                  <div className="rounded-xl border border-white/10 bg-[#0B101D] p-5 space-y-3 text-xs">
                    <h4 className="font-bold text-white font-display text-sm">Hlavička srovnání</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Kicker</label>
                        <input
                          type="text"
                          value={content.techComparison.kicker}
                          onChange={(e) => updateTechComparison({ kicker: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Hlavní nadpis</label>
                        <input
                          type="text"
                          value={content.techComparison.headline}
                          onChange={(e) => updateTechComparison({ headline: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none font-bold"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Perex</label>
                      <textarea
                        rows={2}
                        value={content.techComparison.subheadline}
                        onChange={(e) => updateTechComparison({ subheadline: e.target.value })}
                        className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {content.techComparison.items.map((item, idx) => (
                      <div key={item.id} className="rounded-xl border border-white/10 bg-[#0B101D] p-5 space-y-3 text-xs">
                        <div className="font-bold text-cyan-300 text-sm">
                          Kritérium #{idx + 1}:
                          <input
                            type="text"
                            value={item.area}
                            onChange={(e) => {
                              const newItems = [...content.techComparison.items];
                              newItems[idx] = { ...newItems[idx], area: e.target.value };
                              updateTechComparison({ items: newItems });
                            }}
                            className="ml-2 bg-black/50 border border-white/15 px-2 py-1 rounded text-white font-semibold"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-semibold text-rose-300 mb-1">Zastaralý web (starý přístup):</label>
                            <textarea
                              rows={3}
                              value={item.oldWay}
                              onChange={(e) => {
                                const newItems = [...content.techComparison.items];
                                newItems[idx] = { ...newItems[idx], oldWay: e.target.value };
                                updateTechComparison({ items: newItems });
                              }}
                              className="w-full rounded-lg bg-rose-950/20 border border-rose-500/20 p-2.5 text-slate-200 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-cyan-300 mb-1">Moderní web standard:</label>
                            <textarea
                              rows={3}
                              value={item.admatsuWay}
                              onChange={(e) => {
                                const newItems = [...content.techComparison.items];
                                newItems[idx] = { ...newItems[idx], admatsuWay: e.target.value };
                                updateTechComparison({ items: newItems });
                              }}
                              className="w-full rounded-lg bg-cyan-950/20 border border-cyan-500/30 p-2.5 text-slate-200 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Banner in Tech Comparison */}
                  <div className="rounded-xl border border-white/10 bg-[#0B101D] p-5 space-y-3 text-xs">
                    <h4 className="font-bold text-white font-display text-sm">Spodní výzva (CTA banner)</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Titulek výzvy</label>
                        <input
                          type="text"
                          value={content.techComparison.ctaTitle || 'Máte pocit, že váš současný web patří do levého sloupce?'}
                          onChange={(e) => updateTechComparison({ ctaTitle: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Text tlačítka</label>
                        <input
                          type="text"
                          value={content.techComparison.ctaButtonText || 'Nezávazná konzultace'}
                          onChange={(e) => updateTechComparison({ ctaButtonText: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Perex výzvy</label>
                      <input
                        type="text"
                        value={content.techComparison.ctaSubtitle || 'Rádi se na něj nezávazně podíváme a navrhneme, jak ho převést do moderní podoby.'}
                        onChange={(e) => updateTechComparison({ ctaSubtitle: e.target.value })}
                        className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Subtab: GEO & SEO Explainer */}
              {contentSubTab === 'geo' && (
                <div className="space-y-5">
                  <div className="rounded-xl border border-white/10 bg-[#0B101D] p-5 space-y-3 text-xs">
                    <h4 className="font-bold text-white font-display text-sm">Hlavička sekce SEO vs GEO</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Kicker</label>
                        <input
                          type="text"
                          value={content.geoExplainer.kicker}
                          onChange={(e) => updateGeoExplainer({ kicker: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Hlavní nadpis</label>
                        <input
                          type="text"
                          value={content.geoExplainer.headline}
                          onChange={(e) => updateGeoExplainer({ headline: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none font-bold"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Perex</label>
                      <textarea
                        rows={2}
                        value={content.geoExplainer.subheadline}
                        onChange={(e) => updateGeoExplainer({ subheadline: e.target.value })}
                        className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="rounded-xl border border-white/10 bg-[#0B101D] p-5 space-y-3">
                      <h4 className="font-bold text-white">Karta Tradiční SEO</h4>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Titulek karty</label>
                        <input
                          type="text"
                          value={content.geoExplainer.seoCardTitle}
                          onChange={(e) => updateGeoExplainer({ seoCardTitle: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Popis karty</label>
                        <textarea
                          rows={4}
                          value={content.geoExplainer.seoCardDesc}
                          onChange={(e) => updateGeoExplainer({ seoCardDesc: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none leading-relaxed"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Spodní poznámka</label>
                        <input
                          type="text"
                          value={content.geoExplainer.seoCardNote || 'Upřímnost: Špičkový kód je pro úspěch v Googlu nutnost, ale není to kouzelná hůlka. O pozice rozhoduje i váš obor a obsah.'}
                          onChange={(e) => updateGeoExplainer({ seoCardNote: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-slate-300 text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="rounded-xl border border-cyan-500/30 bg-[#0B101D] p-5 space-y-3">
                      <h4 className="font-bold text-cyan-300">Karta GEO (AI vyhledávače)</h4>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Titulek karty</label>
                        <input
                          type="text"
                          value={content.geoExplainer.geoCardTitle}
                          onChange={(e) => updateGeoExplainer({ geoCardTitle: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Popis karty</label>
                        <textarea
                          rows={4}
                          value={content.geoExplainer.geoCardDesc}
                          onChange={(e) => updateGeoExplainer({ geoCardDesc: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none leading-relaxed"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Spodní poznámka</label>
                        <input
                          type="text"
                          value={content.geoExplainer.geoCardNote || 'Záruka: Garantujeme stoprocentní technickou připravenost, aby vás AI modely mohly spolehlivě najít a doporučit.'}
                          onChange={(e) => updateGeoExplainer({ geoCardNote: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-slate-300 text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Simulator header */}
                  <div className="rounded-xl border border-white/10 bg-[#0B101D] p-5 space-y-3 text-xs">
                    <h4 className="font-bold text-white font-display text-sm">Interaktivní simulátor</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Titulek simulátoru</label>
                        <input
                          type="text"
                          value={content.geoExplainer.simulatorTitle || 'Jak se liší výsledek starého webu oproti GEO optimalizaci'}
                          onChange={(e) => updateGeoExplainer({ simulatorTitle: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Podtitulek simulátoru</label>
                        <input
                          type="text"
                          value={content.geoExplainer.simulatorSubtitle || 'Klikněte na dotaz a podívejte se, jaký je rozdíl ve zpracování informací'}
                          onChange={(e) => updateGeoExplainer({ simulatorSubtitle: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Subtab: Process Section */}
              {contentSubTab === 'process' && (
                <div className="space-y-5">
                  <div className="rounded-xl border border-white/10 bg-[#0B101D] p-5 space-y-3 text-xs">
                    <h4 className="font-bold text-white font-display text-sm">Hlavička sekce Proces</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Kicker</label>
                        <input
                          type="text"
                          value={content.processSection.kicker}
                          onChange={(e) => updateProcessSection({ kicker: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Hlavní nadpis</label>
                        <input
                          type="text"
                          value={content.processSection.headline}
                          onChange={(e) => updateProcessSection({ headline: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none font-bold"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Perex</label>
                      <textarea
                        rows={2}
                        value={content.processSection.subheadline}
                        onChange={(e) => updateProcessSection({ subheadline: e.target.value })}
                        className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {content.processSection.steps.map((step, idx) => (
                      <div key={step.id} className="rounded-xl border border-white/10 bg-[#0B101D] p-5 space-y-3 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block font-semibold text-slate-300 mb-1">Číslo kroku</label>
                            <input
                              type="text"
                              value={step.num}
                              onChange={(e) => {
                                const newSteps = [...content.processSection.steps];
                                newSteps[idx] = { ...newSteps[idx], num: e.target.value };
                                updateProcessSection({ steps: newSteps });
                              }}
                              className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-cyan-400 font-mono font-bold"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-slate-300 mb-1">Doba trvání</label>
                            <input
                              type="text"
                              value={step.duration}
                              onChange={(e) => {
                                const newSteps = [...content.processSection.steps];
                                newSteps[idx] = { ...newSteps[idx], duration: e.target.value };
                                updateProcessSection({ steps: newSteps });
                              }}
                              className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-slate-300 mb-1">Název fáze</label>
                            <input
                              type="text"
                              value={step.title}
                              onChange={(e) => {
                                const newSteps = [...content.processSection.steps];
                                newSteps[idx] = { ...newSteps[idx], title: e.target.value };
                                updateProcessSection({ steps: newSteps });
                              }}
                              className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white font-bold"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-300 mb-1">Popis fáze</label>
                          <textarea
                            rows={2}
                            value={step.description}
                            onChange={(e) => {
                              const newSteps = [...content.processSection.steps];
                              newSteps[idx] = { ...newSteps[idx], description: e.target.value };
                              updateProcessSection({ steps: newSteps });
                            }}
                            className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-slate-200"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Process Section CTA Banner */}
                  <div className="rounded-xl border border-white/10 bg-[#0B101D] p-5 space-y-3 text-xs">
                    <h4 className="font-bold text-white font-display text-sm">Spodní výzva v sekci Proces (CTA)</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Titulek výzvy</label>
                        <input
                          type="text"
                          value={content.processSection.ctaTitle || 'Chcete vyměnit zastaralý web za moderní řešení?'}
                          onChange={(e) => updateProcessSection({ ctaTitle: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Text tlačítka</label>
                        <input
                          type="text"
                          value={content.processSection.ctaButtonText || 'Nezávazně poptat nový web'}
                          onChange={(e) => updateProcessSection({ ctaButtonText: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Perex výzvy</label>
                      <input
                        type="text"
                        value={content.processSection.ctaSubtitle || 'Napište nám nebo zavolejte. Probereme vaše představy a navrhneme férové řešení.'}
                        onChange={(e) => updateProcessSection({ ctaSubtitle: e.target.value })}
                        className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Subtab: Calculator Section */}
              {contentSubTab === 'calc' && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-white/10 bg-[#0B101D] p-5 space-y-4 text-xs">
                    <h4 className="font-bold text-white font-display text-sm">Hlavička kalkulačky</h4>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Kicker</label>
                      <input
                        type="text"
                        value={content.calculatorSection.kicker}
                        onChange={(e) => updateCalculatorSection({ kicker: e.target.value })}
                        className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Hlavní nadpis</label>
                      <input
                        type="text"
                        value={content.calculatorSection.headline}
                        onChange={(e) => updateCalculatorSection({ headline: e.target.value })}
                        className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Perex</label>
                      <textarea
                        rows={2}
                        value={content.calculatorSection.subheadline}
                        onChange={(e) => updateCalculatorSection({ subheadline: e.target.value })}
                        className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-[#0B101D] p-5 space-y-3 text-xs">
                    <h4 className="font-bold text-white font-display text-sm">Názvy kroků a tlačítka konfigurátoru</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">1. Krok (Rozsah webu)</label>
                        <input
                          type="text"
                          value={content.calculatorSection.projectTypeTitle || '1. Rozsah webu'}
                          onChange={(e) => updateCalculatorSection({ projectTypeTitle: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">2. Krok (Připravenost pro vyhledávače)</label>
                        <input
                          type="text"
                          value={content.calculatorSection.searchTierTitle || '2. Připravenost pro vyhledávače'}
                          onChange={(e) => updateCalculatorSection({ searchTierTitle: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">3. Krok (Doplňkové funkce)</label>
                        <input
                          type="text"
                          value={content.calculatorSection.addonsTitle || '3. Doplňkové funkce a moduly'}
                          onChange={(e) => updateCalculatorSection({ addonsTitle: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">4. Krok (Rychlost realizace)</label>
                        <input
                          type="text"
                          value={content.calculatorSection.speedTitle || '4. Rychlost realizace'}
                          onChange={(e) => updateCalculatorSection({ speedTitle: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/5">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Text tlačítka konfigurátoru</label>
                        <input
                          type="text"
                          value={content.calculatorSection.submitButtonText || 'Poptat tuto specifikaci'}
                          onChange={(e) => updateCalculatorSection({ submitButtonText: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-cyan-300 font-bold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Podtext pod tlačítkem</label>
                        <input
                          type="text"
                          value={content.calculatorSection.submitSubtext || 'Zcela nezávazné · Ozveme se vám a probereme detaily'}
                          onChange={(e) => updateCalculatorSection({ submitSubtext: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Subtab: Contact Section */}
              {contentSubTab === 'contact' && (
                <div className="space-y-5">
                  <div className="rounded-xl border border-white/10 bg-[#0B101D] p-5 space-y-3 text-xs">
                    <h4 className="font-bold text-white font-display text-sm">Hlavička a texty formuláře</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Kicker</label>
                        <input
                          type="text"
                          value={content.contactSection.kicker}
                          onChange={(e) => updateContactSection({ kicker: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Hlavní nadpis</label>
                        <input
                          type="text"
                          value={content.contactSection.headline}
                          onChange={(e) => updateContactSection({ headline: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none font-bold"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Perex</label>
                      <textarea
                        rows={2}
                        value={content.contactSection.subheadline}
                        onChange={(e) => updateContactSection({ subheadline: e.target.value })}
                        className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/5">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Titulek formuláře</label>
                        <input
                          type="text"
                          value={content.contactSection.formTitle}
                          onChange={(e) => updateContactSection({ formTitle: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Podtitulek formuláře</label>
                        <input
                          type="text"
                          value={content.contactSection.formSubtitle}
                          onChange={(e) => updateContactSection({ formSubtitle: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Tlačítko odeslání</label>
                        <input
                          type="text"
                          value={content.contactSection.submitButtonText || 'Odeslat nezávaznou poptávku'}
                          onChange={(e) => updateContactSection({ submitButtonText: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-cyan-300 font-bold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Podtext formuláře</label>
                        <input
                          type="text"
                          value={content.contactSection.submitSubtext || 'Žádné závazky ani spam. Ozveme se vám s konkrétním návrhem.'}
                          onChange={(e) => updateContactSection({ submitSubtext: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-[#0B101D] p-6 space-y-4 text-xs">
                    <div className="pb-3 border-b border-white/10">
                      <h3 className="text-base font-bold text-white font-display">
                        Firemní a kontaktní údaje
                      </h3>
                      <p className="text-slate-400 text-[11px]">
                        Tyto údaje se automaticky synchronizují v patičce, v kontaktní sekci i v Schema.org datech pro vyhledávače.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Název společnosti</label>
                        <input
                          type="text"
                          value={content.contact.companyName}
                          onChange={(e) => updateContact({ companyName: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">IČO</label>
                        <input
                          type="text"
                          value={content.contact.ico}
                          onChange={(e) => updateContact({ ico: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white focus:border-cyan-400 focus:outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Kontaktní E-mail</label>
                        <input
                          type="email"
                          value={content.contact.email}
                          onChange={(e) => updateContact({ email: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Telefonní číslo</label>
                        <input
                          type="tel"
                          value={content.contact.phone}
                          onChange={(e) => updateContact({ phone: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white focus:border-cyan-400 focus:outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Ulice a číslo</label>
                        <input
                          type="text"
                          value={content.contact.address}
                          onChange={(e) => updateContact({ address: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Město a PSČ</label>
                        <input
                          type="text"
                          value={content.contact.city}
                          onChange={(e) => updateContact({ city: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Garance odpovědi</label>
                        <input
                          type="text"
                          value={content.contact.responseGuarantee}
                          onChange={(e) => updateContact({ responseGuarantee: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Pracovní doba</label>
                        <input
                          type="text"
                          value={content.contact.hours}
                          onChange={(e) => updateContact({ hours: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Subtab: Footer */}
              {contentSubTab === 'footer' && (
                <div className="rounded-xl border border-white/10 bg-[#0B101D] p-5 space-y-4 text-xs">
                  <h4 className="font-bold text-white font-display text-sm">Patička webu</h4>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Text o firmě v patičce</label>
                    <textarea
                      rows={3}
                      value={content.footer.aboutText}
                      onChange={(e) => updateFooter({ aboutText: e.target.value })}
                      className="w-full rounded-lg bg-black/40 border border-white/10 p-2.5 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Copyright doložka</label>
                    <input
                      type="text"
                      value={content.footer.copyrightNotice}
                      onChange={(e) => updateFooter({ copyrightNotice: e.target.value })}
                      className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-white focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Subtab: Global Full-Text Search */}
              {contentSubTab === 'search' && (
                <div className="rounded-xl border border-white/10 bg-[#0B101D] p-6 space-y-4 text-xs">
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-white font-display flex items-center gap-2">
                      <Search className="h-4 w-4 text-cyan-400" />
                      <span>Globální vyhledávač a přepisovač textů</span>
                    </h4>
                    <p className="text-slate-400">
                      Zadejte libovolné slovo (např. „WordPress“, „React“, „14 dní“, „Korunní“) a ihned ho můžete upravit.
                    </p>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Vyhledat v textech celého webu..."
                      className="w-full rounded-xl bg-black/50 border border-white/20 pl-9 pr-4 py-2.5 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none text-sm"
                    />
                    <Search className="h-4 w-4 text-slate-400 absolute left-3 top-3.5" />
                  </div>

                  {searchTerm.trim().length > 1 ? (
                    <div className="space-y-3 pt-2">
                      <div className="text-slate-400 font-semibold">
                        Výsledky hledání výrazu „{searchTerm}“:
                      </div>

                      {/* Check navbar */}
                      {((content.navbar?.brandName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (content.navbar?.ctaText || '').toLowerCase().includes(searchTerm.toLowerCase())) && (
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-2">
                          <span className="text-[10px] text-cyan-400 font-mono font-semibold">Horní navigace (Menu)</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={content.navbar?.brandName || 'Admatsu'}
                              onChange={(e) => updateNavbar({ brandName: e.target.value })}
                              className="w-full rounded bg-black/60 border border-white/10 p-2 text-white font-bold"
                            />
                            <input
                              type="text"
                              value={content.navbar?.ctaText || 'Nezávazná konzultace'}
                              onChange={(e) => updateNavbar({ ctaText: e.target.value })}
                              className="w-full rounded bg-black/60 border border-white/10 p-2 text-white"
                            />
                          </div>
                        </div>
                      )}

                      {/* Check hero kicker */}
                      {content.hero.kicker.toLowerCase().includes(searchTerm.toLowerCase()) && (
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                          <span className="text-[10px] text-cyan-400 font-mono font-semibold">Hero sekce → Trust Kicker</span>
                          <input
                            type="text"
                            value={content.hero.kicker}
                            onChange={(e) => updateHero({ kicker: e.target.value })}
                            className="w-full rounded bg-black/60 border border-white/10 p-2 text-white"
                          />
                        </div>
                      )}

                      {/* Check hero headline */}
                      {content.hero.headline.toLowerCase().includes(searchTerm.toLowerCase()) && (
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                          <span className="text-[10px] text-cyan-400 font-mono font-semibold">Hero sekce → Hlavní nadpis H1</span>
                          <input
                            type="text"
                            value={content.hero.headline}
                            onChange={(e) => updateHero({ headline: e.target.value })}
                            className="w-full rounded bg-black/60 border border-white/10 p-2 text-white font-bold"
                          />
                        </div>
                      )}

                      {/* Check hero subheadline */}
                      {content.hero.subheadline.toLowerCase().includes(searchTerm.toLowerCase()) && (
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                          <span className="text-[10px] text-cyan-400 font-mono font-semibold">Hero sekce → Perex</span>
                          <textarea
                            rows={2}
                            value={content.hero.subheadline}
                            onChange={(e) => updateHero({ subheadline: e.target.value })}
                            className="w-full rounded bg-black/60 border border-white/10 p-2 text-white"
                          />
                        </div>
                      )}

                      {/* Check hero CTAs */}
                      {(content.hero.primaryCtaText.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        content.hero.secondaryCtaText.toLowerCase().includes(searchTerm.toLowerCase())) && (
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                          <span className="text-[10px] text-cyan-400 font-mono font-semibold">Hero sekce → Tlačítka</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={content.hero.primaryCtaText}
                              onChange={(e) => updateHero({ primaryCtaText: e.target.value })}
                              className="w-full rounded bg-black/60 border border-white/10 p-2 text-cyan-300 font-bold"
                            />
                            <input
                              type="text"
                              value={content.hero.secondaryCtaText}
                              onChange={(e) => updateHero({ secondaryCtaText: e.target.value })}
                              className="w-full rounded bg-black/60 border border-white/10 p-2 text-white"
                            />
                          </div>
                        </div>
                      )}

                      {/* Check contact details */}
                      {(content.contact.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        content.contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        content.contact.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        content.contact.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        content.contact.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        content.contact.ico.toLowerCase().includes(searchTerm.toLowerCase())) && (
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-2">
                          <span className="text-[10px] text-cyan-400 font-mono font-semibold">Kontaktní a firemní údaje</span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <input
                              type="text"
                              value={content.contact.companyName}
                              onChange={(e) => updateContact({ companyName: e.target.value })}
                              className="w-full rounded bg-black/60 border border-white/10 p-2 text-white font-bold"
                              placeholder="Firma"
                            />
                            <input
                              type="text"
                              value={content.contact.email}
                              onChange={(e) => updateContact({ email: e.target.value })}
                              className="w-full rounded bg-black/60 border border-white/10 p-2 text-white"
                              placeholder="E-mail"
                            />
                            <input
                              type="text"
                              value={content.contact.phone}
                              onChange={(e) => updateContact({ phone: e.target.value })}
                              className="w-full rounded bg-black/60 border border-white/10 p-2 text-white font-mono"
                              placeholder="Telefon"
                            />
                          </div>
                        </div>
                      )}

                      {/* Check footer */}
                      {(content.footer.aboutText.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        content.footer.copyrightNotice.toLowerCase().includes(searchTerm.toLowerCase())) && (
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-2">
                          <span className="text-[10px] text-cyan-400 font-mono font-semibold">Patička webu</span>
                          <textarea
                            rows={2}
                            value={content.footer.aboutText}
                            onChange={(e) => updateFooter({ aboutText: e.target.value })}
                            className="w-full rounded bg-black/60 border border-white/10 p-2 text-white text-xs"
                          />
                          <input
                            type="text"
                            value={content.footer.copyrightNotice}
                            onChange={(e) => updateFooter({ copyrightNotice: e.target.value })}
                            className="w-full rounded bg-black/60 border border-white/10 p-2 text-white text-xs"
                          />
                        </div>
                      )}

                      {/* Check services */}
                      {content.services.map((srv) => {
                        const matchesTitle = srv.title.toLowerCase().includes(searchTerm.toLowerCase());
                        const matchesDesc = srv.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
                        if (!matchesTitle && !matchesDesc) return null;
                        return (
                          <div key={srv.id} className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-2">
                            <span className="text-[10px] text-cyan-400 font-mono font-semibold">Služby → {srv.title}</span>
                            <input
                              type="text"
                              value={srv.title}
                              onChange={(e) => updateService(srv.id, { title: e.target.value })}
                              className="w-full rounded bg-black/60 border border-white/10 p-2 text-white font-bold"
                            />
                            <textarea
                              rows={2}
                              value={srv.shortDesc}
                              onChange={(e) => updateService(srv.id, { shortDesc: e.target.value })}
                              className="w-full rounded bg-black/60 border border-white/10 p-2 text-white"
                            />
                          </div>
                        );
                      })}

                      {/* Check comparisons */}
                      {content.techComparison.items.map((item) => {
                        const matches = item.oldWay.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.admatsuWay.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.area.toLowerCase().includes(searchTerm.toLowerCase());
                        if (!matches) return null;
                        return (
                          <div key={item.id} className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-2">
                            <span className="text-[10px] text-cyan-400 font-mono font-semibold">Srovnání → {item.area}</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <textarea
                                rows={2}
                                value={item.oldWay}
                                onChange={(e) => {
                                  const newItems = content.techComparison.items.map((i) => i.id === item.id ? { ...i, oldWay: e.target.value } : i);
                                  updateTechComparison({ items: newItems });
                                }}
                                className="w-full rounded bg-black/60 border border-white/10 p-2 text-rose-300"
                              />
                              <textarea
                                rows={2}
                                value={item.admatsuWay}
                                onChange={(e) => {
                                  const newItems = content.techComparison.items.map((i) => i.id === item.id ? { ...i, admatsuWay: e.target.value } : i);
                                  updateTechComparison({ items: newItems });
                                }}
                                className="w-full rounded bg-black/60 border border-white/10 p-2 text-cyan-300"
                              />
                            </div>
                          </div>
                        );
                      })}

                      {/* Check FAQs */}
                      {content.faq.map((f) => {
                        const matches = f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.answer.toLowerCase().includes(searchTerm.toLowerCase());
                        if (!matches) return null;
                        return (
                          <div key={f.id} className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-2">
                            <span className="text-[10px] text-cyan-400 font-mono font-semibold">FAQ → {f.question}</span>
                            <input
                              type="text"
                              value={f.question}
                              onChange={(e) => updateFaq(f.id, { question: e.target.value })}
                              className="w-full rounded bg-black/60 border border-white/10 p-2 text-white font-bold"
                            />
                            <textarea
                              rows={2}
                              value={f.answer}
                              onChange={(e) => updateFaq(f.id, { answer: e.target.value })}
                              className="w-full rounded bg-black/60 border border-white/10 p-2 text-white"
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-slate-500 italic p-4 text-center">
                      Napište alespoň 2 písmena pro vyhledání v textech webu.
                    </div>
                  )}
                </div>
              )}

              {/* Subtab: FAQ */}
              {contentSubTab === 'faq' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white font-display">
                      Správa otázek a odpovědí (FAQ)
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {content.faq.map((faq) => (
                      <div
                        key={faq.id}
                        className="rounded-xl border border-white/10 bg-[#0B101D] p-4 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => updateFaq(faq.id, { question: e.target.value })}
                            className="font-bold text-white bg-transparent border-b border-white/10 focus:border-cyan-400 focus:outline-none w-full text-sm font-display pb-1"
                          />
                          <button
                            onClick={() => deleteFaq(faq.id)}
                            className="text-slate-500 hover:text-rose-400 transition-colors p-1 cursor-pointer shrink-0 ml-3"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <textarea
                          rows={3}
                          value={faq.answer}
                          onChange={(e) => updateFaq(faq.id, { answer: e.target.value })}
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2 text-slate-300 leading-relaxed focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Add FAQ */}
                  <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-4 space-y-2 text-xs">
                    <div className="font-semibold text-slate-200">Přidat nový FAQ dotaz</div>
                    <input
                      type="text"
                      placeholder="Otázka (např. Provádíte i následnou správu obsahu?)"
                      value={newFaqQ}
                      onChange={(e) => setNewFaqQ(e.target.value)}
                      className="w-full rounded-lg bg-black/50 border border-white/10 p-2 text-white focus:border-cyan-400 focus:outline-none"
                    />
                    <textarea
                      rows={2}
                      placeholder="Odpověď..."
                      value={newFaqA}
                      onChange={(e) => setNewFaqA(e.target.value)}
                      className="w-full rounded-lg bg-black/50 border border-white/10 p-2 text-white focus:border-cyan-400 focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        if (!newFaqQ.trim()) return;
                        addFaq({
                          id: `faq-${Date.now()}`,
                          question: newFaqQ,
                          answer: newFaqA || 'Odpověď připravujeme.',
                          category: 'tech',
                        });
                        setNewFaqQ('');
                        setNewFaqA('');
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-1.5 font-semibold text-slate-950 hover:bg-cyan-400 cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Publikovat otázku</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: LEADS & CRM */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              {/* Header and filters */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    Poptávky a CRM schránka ({inquiries.length})
                  </h3>
                  <p className="text-xs text-slate-400">
                    Formuláře a kalkulace z webu jsou ihned bezpečně zachyceny v tomto rozhraní
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleCreateTestLead}
                    className="inline-flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>+ Simulovat novou poptávku</span>
                  </button>

                  <button
                    onClick={handleExportLeads}
                    className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Export (JSON)</span>
                  </button>
                </div>
              </div>

              {/* Status Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                {[
                  { key: 'all', label: 'Všechny poptávky' },
                  { key: 'new', label: 'Nové (ke zpracování)' },
                  { key: 'in_progress', label: 'Zpracovává se' },
                  { key: 'quote_sent', label: 'Nabídka odeslána' },
                  { key: 'completed', label: 'Uzavřeno' },
                ].map((chip) => (
                  <button
                    key={chip.key}
                    onClick={() => setLeadStatusFilter(chip.key)}
                    className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      leadStatusFilter === chip.key
                        ? 'bg-cyan-500 text-slate-950 font-semibold'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Master-Detail CRM view */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Leads List (Span 5) */}
                <div className="lg:col-span-5 space-y-2">
                  {filteredInquiries.length === 0 ? (
                    <div className="rounded-xl border border-white/10 bg-[#0B101D] p-8 text-center text-xs text-slate-400">
                      Žádné poptávky v této kategorii.
                    </div>
                  ) : (
                    filteredInquiries.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLeadId(lead.id)}
                        className={`rounded-xl border p-4 cursor-pointer transition-all ${
                          selectedLeadId === lead.id
                            ? 'border-cyan-500/50 bg-[#0F1629] shadow-md shadow-cyan-500/10'
                            : 'border-white/10 bg-[#0B101D] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                          <span className="font-mono">{lead.createdAt}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              lead.status === 'new'
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                : lead.status === 'in_progress'
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                                : lead.status === 'quote_sent'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            }`}
                          >
                            {lead.status === 'new' && 'Nová'}
                            {lead.status === 'in_progress' && 'Zpracovává se'}
                            {lead.status === 'quote_sent' && 'Nabídka odeslána'}
                            {lead.status === 'completed' && 'Hotovo'}
                          </span>
                        </div>
                        <div className="font-bold text-white text-sm truncate">{lead.name}</div>
                        <div className="text-xs text-slate-300 truncate mt-0.5">{lead.serviceType}</div>
                        {lead.estimatedPrice && (
                          <div className="text-xs font-mono text-cyan-400 font-semibold mt-1">
                            {lead.estimatedPrice}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Lead Detail View (Span 7) */}
                <div className="lg:col-span-7">
                  {selectedLead ? (
                    <div className="rounded-xl border border-white/10 bg-[#0B101D] p-6 space-y-5">
                      <div className="flex items-start justify-between gap-3 pb-4 border-b border-white/10">
                        <div>
                          <div className="text-[11px] font-mono text-slate-400">ID: {selectedLead.id}</div>
                          <h4 className="text-xl font-bold text-white font-display mt-0.5">
                            {selectedLead.name}
                          </h4>
                          <div className="text-xs text-slate-400 mt-1 flex items-center gap-3 flex-wrap">
                            <span>E-mail: <strong className="text-slate-200">{selectedLead.email}</strong></span>
                            {selectedLead.phone && <span>Tel: <strong className="text-slate-200">{selectedLead.phone}</strong></span>}
                          </div>
                        </div>

                        {/* Status dropdown */}
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 uppercase font-semibold block text-right">
                            Stav poptávky
                          </label>
                          <select
                            value={selectedLead.status}
                            onChange={(e) =>
                              updateInquiryStatus(selectedLead.id, e.target.value as any)
                            }
                            className="rounded-lg bg-black/60 border border-white/20 px-3 py-1.5 text-xs text-white focus:border-cyan-400 focus:outline-none cursor-pointer"
                          >
                            <option value="new">Nová</option>
                            <option value="contacted">Kontaktován</option>
                            <option value="in_progress">Zpracovává se</option>
                            <option value="quote_sent">Nabídka odeslána</option>
                            <option value="completed">Uzavřeno / Realizace</option>
                          </select>
                        </div>
                      </div>

                      {/* Detail facts */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1">
                          <span className="text-[11px] text-slate-400">Poptávaná služba</span>
                          <div className="font-semibold text-white">{selectedLead.serviceType}</div>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1">
                          <span className="text-[11px] text-slate-400">Předpokládaný rozpočet</span>
                          <div className="font-mono text-cyan-400 font-bold">
                            {selectedLead.estimatedPrice || 'Dle kalkulace'}
                          </div>
                        </div>
                        {selectedLead.existingUrl && (
                          <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1 sm:col-span-2">
                            <span className="text-[11px] text-slate-400">Stávající web klienta</span>
                            <div className="text-cyan-300 font-mono flex items-center gap-1">
                              <a
                                href={selectedLead.existingUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline flex items-center gap-1"
                              >
                                {selectedLead.existingUrl}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Client message */}
                      <div className="space-y-1.5 text-xs">
                        <span className="font-semibold text-slate-300">Zpráva od klienta:</span>
                        <div className="p-3.5 rounded-lg bg-black/40 border border-white/10 text-slate-200 leading-relaxed whitespace-pre-line">
                          {selectedLead.message}
                        </div>
                      </div>

                      {/* Internal CRM notes */}
                      <div className="space-y-1.5 text-xs pt-2 border-t border-white/10">
                        <span className="font-semibold text-slate-300">
                          Interní poznámka k zakázce:
                        </span>
                        <textarea
                          rows={2}
                          defaultValue={selectedLead.notes || ''}
                          onBlur={(e) =>
                            updateInquiryStatus(selectedLead.id, selectedLead.status, e.target.value)
                          }
                          placeholder="Zde si můžete psát poznámky k jednání s klientem..."
                          className="w-full rounded-lg bg-black/40 border border-white/10 p-2.5 text-slate-200 focus:border-cyan-400 focus:outline-none"
                        />
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                        <button
                          onClick={() => {
                            const template = `Dobrý den, ${selectedLead.name.split(' ')[0]},\n\nděkujeme za zájem o spolupráci s Admatsu s.r.o. ohledně ${selectedLead.serviceType}.\n\nRádi bychom vám navrhli krátkou 15minutovou online konzultaci, kde probereme technické detaily a připravíme vám přesný harmonogram realizace (7–14 dní).\n\nS pozdravem,\nAdmatsu inženýrský tým`;
                            navigator.clipboard?.writeText(template);
                            triggerToast('Šablona odpovědi byla zkopírována do schránky!');
                          }}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 px-3 py-1.5 font-medium text-cyan-300 hover:bg-cyan-500/30 cursor-pointer"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          <span>Zkopírovat rychlou odpověď pro klienta</span>
                        </button>

                        <button
                          onClick={() => deleteInquiry(selectedLead.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer transition-colors"
                          title="Smazat tuto poptávku"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-white/10 bg-[#0B101D] p-12 text-center text-slate-400 text-xs">
                      Vyberte poptávku ze seznamu vlevo.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GEO & AI SEARCH */}
          {activeTab === 'geo' && (
            <div className="space-y-6">
              <div className="pb-2">
                <h3 className="text-lg font-bold text-white font-display">
                  GEO (Generative Engine Optimization) & AI Crawlery
                </h3>
                <p className="text-xs text-slate-400">
                  Přímá správa toho, jak váš web vnímají modely ChatGPT, Perplexity, Claude a Google Gemini
                </p>
              </div>

              {/* SERP & AI Citation Previews */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Traditional Google SERP */}
                <div className="rounded-xl border border-white/10 bg-[#0B101D] p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-white/5">
                    <span className="font-semibold text-slate-200">Tradiční Google SERP náhled</span>
                    <Search className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div className="space-y-1 p-4 rounded-lg bg-black/60 border border-white/5">
                    <div className="text-[11px] text-slate-400 font-mono">https://admatsu.com</div>
                    <div className="text-sm font-semibold text-blue-400 hover:underline cursor-pointer">
                      {content.geoSeo.metaTitle}
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                      {content.geoSeo.metaDescription}
                    </div>
                  </div>
                </div>

                {/* AI Model Perplexity / ChatGPT Simulation */}
                <div className="rounded-xl border border-cyan-500/20 bg-[#081224] p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-cyan-400 pb-2 border-b border-cyan-500/20">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4" />
                      Jak odpovídá Perplexity / ChatGPT na dotaz
                    </span>
                    <span className="text-[10px] font-mono bg-cyan-500/20 px-2 py-0.5 rounded text-cyan-300">
                      Entita ověřena
                    </span>
                  </div>
                  <div className="p-4 rounded-lg bg-black/50 border border-cyan-500/20 space-y-2 text-xs">
                    <div className="text-[11px] text-slate-400 italic font-mono">
                      Dotaz uživatele: „Kdo v Praze dělá rychlé moderní weby bez starého WordPressu a s garancí rychlosti?“
                    </div>
                    <div className="text-slate-200 leading-relaxed pt-1 border-t border-white/10">
                      Podle ověřených entitních dat doporučuji studio <strong>Admatsu s.r.o.</strong>{' '}
                      Specializují se na čistý vývoj v moderním stacku (React, Next.js, Tailwind),
                      garantují načítání pod 0.5s a dodání do 7–14 pracovních dní.
                    </div>
                    <div className="flex items-center gap-2 pt-1 text-[10px] text-cyan-400 font-mono">
                      <span>Zdroj citace:</span>
                      <span className="rounded bg-cyan-950 px-2 py-0.5 border border-cyan-500/30">
                        admatsu.com [Schema.org verified]
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bot Crawler Permissions Toggle */}
              <div className="rounded-xl border border-white/10 bg-[#0B101D] p-6 space-y-4">
                <h4 className="text-sm font-bold text-white font-display">
                  Povolení AI crawlerů (robots.txt & llms.txt)
                </h4>
                <p className="text-xs text-slate-400">
                  Pokud AI boty zablokujete, nebudou moci váš web číst a doporučovat v odpovědích.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">GPTBot</div>
                      <div className="text-[10px] text-slate-400">OpenAI ChatGPT</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={content.geoSeo.allowGptBot}
                      onChange={(e) => updateGeoSeo({ allowGptBot: e.target.checked })}
                      className="h-4 w-4 rounded text-cyan-500 focus:ring-0 cursor-pointer"
                    />
                  </div>

                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">PerplexityBot</div>
                      <div className="text-[10px] text-slate-400">Perplexity AI Engine</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={content.geoSeo.allowPerplexityBot}
                      onChange={(e) => updateGeoSeo({ allowPerplexityBot: e.target.checked })}
                      className="h-4 w-4 rounded text-cyan-500 focus:ring-0 cursor-pointer"
                    />
                  </div>

                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">ClaudeBot</div>
                      <div className="text-[10px] text-slate-400">Anthropic Claude</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={content.geoSeo.allowClaudeBot}
                      onChange={(e) => updateGeoSeo({ allowClaudeBot: e.target.checked })}
                      className="h-4 w-4 rounded text-cyan-500 focus:ring-0 cursor-pointer"
                    />
                  </div>

                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">Google-Extended</div>
                      <div className="text-[10px] text-slate-400">Gemini & AI Overviews</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={content.geoSeo.allowGoogleExtended}
                      onChange={(e) => updateGeoSeo({ allowGoogleExtended: e.target.checked })}
                      className="h-4 w-4 rounded text-cyan-500 focus:ring-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Live Schema.org JSON-LD Output */}
              <div className="rounded-xl border border-white/10 bg-[#0B101D] p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-white font-display">
                      Vygenerovaná strukturovaná data (Schema.org JSON-LD)
                    </h4>
                    <p className="text-xs text-slate-400">
                      Tento skript se dynamicky vkládá do hlavičky webu pro indexační roboty
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(JSON.stringify(schemaJsonLd, null, 2));
                      triggerToast('Schema.org kód byl zkopírován!');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-slate-200 hover:bg-white/10 cursor-pointer"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>Zkopírovat JSON</span>
                  </button>
                </div>

                <pre className="rounded-lg bg-black/60 border border-white/5 p-4 text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-56 leading-relaxed">
                  {JSON.stringify(schemaJsonLd, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 5: REVISIONS & SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="pb-2">
                <h3 className="text-lg font-bold text-white font-display">
                  Revize, Zálohy a Bezpečnostní audit
                </h3>
                <p className="text-xs text-slate-400">
                  Kompletní přehled verzí webu s možností okamžitého návratu o krok zpět
                </p>
              </div>

              {/* Security Checklist */}
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-emerald-400" />
                    <span className="font-bold text-white text-base">Bezpečnostní skóre A+</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                    0 zranitelností
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1">
                    <div className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Zero WordPress Plugins</span>
                    </div>
                    <div className="text-[11px] text-slate-400">Žádné nebezpečné databázové injection útoky</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1">
                    <div className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>HTTPS / TLS 1.3 Strict</span>
                    </div>
                    <div className="text-[11px] text-slate-400">Šifrovaný přenos všech poptávkových formulářů</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1">
                    <div className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>CDN Edge Protection</span>
                    </div>
                    <div className="text-[11px] text-slate-400">Ochrana proti DDoS útokům a vysoké zátěži</div>
                  </div>
                </div>
              </div>

              {/* Revisions list */}
              <div className="rounded-xl border border-white/10 bg-[#0B101D] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">
                      Historie verzí a publikací (Audit Log)
                    </h4>
                    <p className="text-xs text-slate-400">
                      Každá změna v CMS je verzována s možností 1-klik návratu
                    </p>
                  </div>
                  <button
                    onClick={resetToDefaults}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Obnovit výchozí stav webu</span>
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  {revisions.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-3.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{rev.description}</span>
                          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded">
                            {rev.id}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {rev.author} · <span className="text-slate-300">{rev.timestamp}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => restoreRevision(rev.id)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-[11px] cursor-pointer transition-colors"
                      >
                        <RotateCcw className="h-3 w-3" />
                        <span>Vrátit tuto verzi</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

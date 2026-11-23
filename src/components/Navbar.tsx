import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Globe, ChevronDown, Check, Layers, Send } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { EditableText } from './cms/EditableText';
import { Language } from '../translations/contentTranslations';
import { scrollToTarget } from '../utils/scrollHelper';
import { ActivePageTab } from './OverviewLanding';

interface NavbarProps {
  activePage: ActivePageTab;
  onChangePage: (page: ActivePageTab) => void;
  onOpenConsultation: () => void;
}

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'cs', label: 'Čeština' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onChangePage,
  onOpenConsultation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const { content, updateNavbar, isInlineEditing, currentLang, setLanguage } = useCms();

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const pageTabs: { id: ActivePageTab; shortLabel: string; fullLabel: string }[] = [
    {
      id: 'overview',
      shortLabel: currentLang === 'cs' ? 'Přehled' : currentLang === 'de' ? 'Übersicht' : 'Overview',
      fullLabel: currentLang === 'cs' ? 'Přehled' : currentLang === 'de' ? 'Übersicht' : 'Overview',
    },
    {
      id: 'web',
      shortLabel: 'Web & GEO',
      fullLabel: 'Web & GEO Engineering',
    },
    {
      id: 'outreach',
      shortLabel: 'AI Outreach',
      fullLabel: 'AI Outreach',
    },
  ];

  // Context-aware section links for the currently active tab
  const webLinks = content.navbar?.links || [
    { label: currentLang === 'cs' ? 'Služby' : currentLang === 'de' ? 'Leistungen' : 'Services', href: '#sluzby' },
    { label: currentLang === 'cs' ? 'Srovnání webů' : currentLang === 'de' ? 'Web-Vergleich' : 'Comparison', href: '#srovnani' },
    { label: 'SEO & GEO', href: '#seo-geo' },
    { label: currentLang === 'cs' ? 'Jak pracujeme' : currentLang === 'de' ? 'Ablauf' : 'Process', href: '#proces' },
    { label: 'FAQ', href: '#faq' },
  ];

  const overviewLinks = [
    {
      label:
        currentLang === 'cs'
          ? 'Naše dvě divize (Web & AI Outreach)'
          : currentLang === 'de'
          ? 'Unsere zwei Divisionen (Web & AI Outreach)'
          : 'Our Two Divisions (Web & AI Outreach)',
      href: '#prehled-divize',
    },
    {
      label:
        currentLang === 'cs'
          ? 'Synergie webu a AI Outreach'
          : currentLang === 'de'
          ? 'Synergie aus Website & AI Outreach'
          : 'Website & AI Outreach Synergy',
      href: '#prehled-synergie',
    },
    {
      label:
        currentLang === 'cs'
          ? 'Nezávazná poptávka'
          : currentLang === 'de'
          ? 'Unverbindliche Anfrage'
          : 'Free Consultation',
      href: '#kontakt',
    },
  ];

  const outreachLinks = [
    {
      label:
        currentLang === 'cs'
          ? 'Architektura AI Outreach systému'
          : currentLang === 'de'
          ? 'Architektur des AI-Outreach-Systems'
          : 'AI Outreach Engine Architecture',
      href: '#outreach-architektura',
    },
    {
      label:
        currentLang === 'cs'
          ? 'Interaktivní kalkulátor dosahu'
          : currentLang === 'de'
          ? 'Interaktiver Reichweiten-Kalkulator'
          : 'Interactive Volume Simulator',
      href: '#outreach-kalkulator',
    },
    {
      label:
        currentLang === 'cs'
          ? 'Srovnání: Spam vs. AI Outreach'
          : currentLang === 'de'
          ? 'Vergleich: Spam vs. AI Outreach'
          : 'Comparison: Cold Spam vs. AI Outreach',
      href: '#outreach-srovnani',
    },
    {
      label:
        currentLang === 'cs'
          ? 'Jak probíhá spuštění (14 dní)'
          : currentLang === 'de'
          ? 'Ablauf & Launch (14 Tage)'
          : 'Launch Timeline (14 Days)',
      href: '#outreach-proces',
    },
    {
      label:
        currentLang === 'cs'
          ? 'Časté dotazy k AI Outreach (FAQ)'
          : currentLang === 'de'
          ? 'Häufige Fragen zu AI Outreach (FAQ)'
          : 'AI Outreach FAQ',
      href: '#outreach-faq',
    },
  ];

  const activeSectionLinks =
    activePage === 'overview' ? overviewLinks : activePage === 'outreach' ? outreachLinks : webLinks;

  const activeSectionGroupTitle =
    activePage === 'overview'
      ? currentLang === 'cs'
        ? 'Sekce na této stránce (Přehled)'
        : currentLang === 'de'
        ? 'Bereiche auf dieser Seite (Übersicht)'
        : 'Sections on this page (Overview)'
      : activePage === 'outreach'
      ? currentLang === 'cs'
        ? 'Sekce AI Outreach'
        : currentLang === 'de'
        ? 'AI-Outreach-Bereiche'
        : 'AI Outreach Sections'
      : currentLang === 'cs'
      ? 'Sekce Web & GEO Engineering'
      : currentLang === 'de'
      ? 'Web & GEO Sektionen'
      : 'Web & GEO Sections';

  const handleLinkClick = (href: string) => {
    if (isInlineEditing) return;
    setMobileMenuOpen(false);
    requestAnimationFrame(() => {
      scrollToTarget(href);
    });
  };

  const handleTabSelect = (tab: ActivePageTab) => {
    if (isInlineEditing) return;
    setMobileMenuOpen(false);
    onChangePage(tab);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isInlineEditing) return;
    e.preventDefault();
    setMobileMenuOpen(false);
    onChangePage('overview');
    if (typeof window !== 'undefined') {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#070B12]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-3">
        {/* Zone 1: Wordmark / Logo */}
        <button
          type="button"
          onClick={handleLogoClick}
          className="text-xl font-bold tracking-tight text-white font-display flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-85 text-left focus:outline-none shrink-0"
          aria-label="Admatsu"
        >
          <EditableText
            value={content.navbar?.brandName || 'Admatsu'}
            onChange={(val) => updateNavbar({ brandName: val })}
            label="Název značky v menu"
            className="text-white font-display text-xl"
          />
        </button>

        {/* Zone 2: Center Top-Level Switchable Page Tabs (Desktop / Tablet md+) */}
        <nav
          aria-label="Main divisions"
          className="hidden md:flex items-center rounded-xl bg-black/50 border border-white/10 p-1 gap-1 shrink-0"
        >
          {pageTabs.map((tab) => {
            const isActive = activePage === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabSelect(tab.id)}
                className={`px-3 xl:px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? tab.id === 'outreach'
                      ? 'bg-indigo-500 text-white shadow-sm'
                      : 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.id === 'overview' && <Layers className="h-3.5 w-3.5 shrink-0" />}
                {tab.id === 'web' && <Globe className="h-3.5 w-3.5 shrink-0" />}
                {tab.id === 'outreach' && <Send className="h-3.5 w-3.5 shrink-0" />}
                <span>
                  {tab.id === 'web' ? (
                    <>
                      Web & GEO<span className="hidden xl:inline"> Engineering</span>
                    </>
                  ) : (
                    tab.shortLabel
                  )}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary action + Language Switcher + Burger Menu */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              if (isInlineEditing) {
                e.preventDefault();
                e.stopPropagation();
                return;
              }
              onOpenConsultation();
            }}
            className="hidden lg:inline-flex items-center gap-1.5 rounded-lg bg-cyan-500/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 border border-cyan-500/30 transition-all hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-400 whitespace-nowrap cursor-pointer active:scale-98"
          >
            <EditableText
              value={content.navbar?.ctaText || 'Nezávazná konzultace'}
              onChange={(val) => updateNavbar({ ctaText: val })}
              label="Tlačítko v navigaci"
            />
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
          </button>

          {/* Language Dropdown Selector */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="inline-flex items-center gap-1 rounded-lg bg-black/60 border border-white/10 px-2.5 py-1.5 text-xs font-semibold text-slate-200 hover:text-white hover:border-cyan-500/40 hover:bg-black/80 transition-all cursor-pointer shadow-sm active:scale-98"
              aria-expanded={isLangDropdownOpen}
              aria-haspopup="true"
              aria-label="Language selector"
            >
              <span className="uppercase font-bold tracking-wider text-cyan-300">{currentLang}</span>
              <ChevronDown
                className={`h-3 w-3 text-slate-400 transition-transform duration-150 ${
                  isLangDropdownOpen ? 'rotate-180 text-cyan-400' : ''
                }`}
              />
            </button>

            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#090E1A] border border-white/10 shadow-2xl py-1.5 z-50 animate-fade-in backdrop-blur-xl">
                <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-white/5 mb-1">
                  Language
                </div>
                {languages.map((lang) => {
                  const isSelected = currentLang === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors cursor-pointer text-left ${
                        isSelected
                          ? 'bg-cyan-500/15 text-cyan-300 font-semibold'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{lang.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-400 uppercase font-mono">{lang.code}</span>
                        {isSelected && <Check className="h-3.5 w-3.5 text-cyan-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Menu toggle (Burger menu) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-cyan-400" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Tab Switcher Bar (Cleanly fits on all mobile widths < md) */}
      <div className="md:hidden border-t border-white/10 bg-[#05080E] px-3 py-1.5 grid grid-cols-3 gap-1.5">
        {pageTabs.map((tab) => {
          const isActive = activePage === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabSelect(tab.id)}
              className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1 ${
                isActive
                  ? tab.id === 'outreach'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white bg-white/[0.03]'
              }`}
            >
              {tab.id === 'overview' && <Layers className="h-3 w-3 shrink-0" />}
              {tab.id === 'web' && <Globe className="h-3 w-3 shrink-0" />}
              {tab.id === 'outreach' && <Send className="h-3 w-3 shrink-0" />}
              <span className="truncate">{tab.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Menu dropdown - context-aware for all screen sizes */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 w-full border-b border-white/10 bg-[#0B101D]/95 backdrop-blur-xl px-4 sm:px-6 lg:px-8 py-5 space-y-5 animate-fade-in shadow-2xl z-50">
          <div className="mx-auto max-w-7xl space-y-5">
            {/* Main Divisions inside Menu */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 px-3">
                {currentLang === 'cs'
                  ? 'Hlavní sekce & divize'
                  : currentLang === 'de'
                  ? 'Hauptbereiche & Divisionen'
                  : 'Main Divisions'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {pageTabs.map((tab) => {
                  const isActive = activePage === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleTabSelect(tab.id)}
                      className={`text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                        isActive
                          ? tab.id === 'outreach'
                            ? 'bg-indigo-500/15 border-indigo-400 text-white'
                            : 'bg-cyan-500/15 border-cyan-400 text-white'
                          : 'bg-black/40 border-white/10 text-slate-300 hover:text-white hover:border-white/25'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {tab.id === 'overview' && <Layers className="h-4 w-4 text-cyan-400 shrink-0" />}
                        {tab.id === 'web' && <Globe className="h-4 w-4 text-cyan-400 shrink-0" />}
                        {tab.id === 'outreach' && <Send className="h-4 w-4 text-indigo-400 shrink-0" />}
                        <span>{tab.fullLabel}</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-slate-400 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Context-Aware Section Links for Active Page */}
            <div className="border-t border-white/10 pt-4">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 px-3">
                {activeSectionGroupTitle}
              </div>
              <nav className="flex flex-col space-y-1">
                {activeSectionLinks.map((link, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleLinkClick(link.href)}
                    className="text-left text-sm font-medium text-slate-200 py-2 px-3 rounded-lg hover:bg-white/5 hover:text-cyan-300 transition-colors cursor-pointer flex items-center justify-between group"
                  >
                    {activePage === 'web' ? (
                      <EditableText
                        value={link.label}
                        onChange={(val) => {
                          const updated = [...webLinks];
                          updated[idx] = { ...updated[idx], label: val };
                          updateNavbar({ links: updated });
                        }}
                        label={`Odkaz v menu #${idx + 1}`}
                      />
                    ) : (
                      <span>{link.label}</span>
                    )}
                    <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-3.5 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-cyan-400" />
                <span>Language:</span>
              </span>
              <div className="flex items-center gap-1.5">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1 rounded-md text-xs font-semibold uppercase transition-all cursor-pointer font-mono ${
                      currentLang === lang.code
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-white bg-black/40 border border-white/5'
                    }`}
                  >
                    <span>{lang.code}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 lg:hidden">
              <button
                type="button"
                onClick={() => {
                  if (isInlineEditing) return;
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-cyan-400 cursor-pointer"
              >
                <EditableText
                  value={content.navbar?.ctaText || 'Nezávazná konzultace'}
                  onChange={(val) => updateNavbar({ ctaText: val })}
                  label="Tlačítko v navigaci"
                />
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

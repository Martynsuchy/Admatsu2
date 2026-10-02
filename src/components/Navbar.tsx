import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Globe, ChevronDown, Check } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { EditableText } from './cms/EditableText';
import { Language } from '../translations/contentTranslations';
import { scrollToTarget } from '../utils/scrollHelper';

interface NavbarProps {
  onOpenConsultation: () => void;
}

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'cs', label: 'Čeština' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
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

  const defaultLinks = [
    { label: currentLang === 'cs' ? 'Služby' : currentLang === 'de' ? 'Leistungen' : 'Services', href: '#sluzby' },
    { label: currentLang === 'cs' ? 'Srovnání webů' : currentLang === 'de' ? 'Web-Vergleich' : 'Comparison', href: '#srovnani' },
    { label: 'SEO & GEO', href: '#seo-geo' },
    { label: currentLang === 'cs' ? 'Jak pracujeme' : currentLang === 'de' ? 'Ablauf' : 'Process', href: '#proces' },
    { label: 'FAQ', href: '#faq' },
  ];

  const navLinks = content.navbar?.links || defaultLinks;

  const handleLinkClick = (href: string) => {
    if (isInlineEditing) return;
    setMobileMenuOpen(false);
    requestAnimationFrame(() => {
      scrollToTarget(href);
    });
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isInlineEditing) return;
    e.preventDefault();
    setMobileMenuOpen(false);
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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#070B12]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Wordmark / Logo */}
        <button
          type="button"
          onClick={handleLogoClick}
          className="text-xl font-bold tracking-tight text-white font-display flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-85 text-left focus:outline-none"
          aria-label="Admatsu - Návrat na začátek stránky"
        >
          <EditableText
            value={content.navbar?.brandName || 'Admatsu'}
            onChange={(val) => updateNavbar({ brandName: val })}
            label="Název značky v menu"
            className="text-white font-display text-xl"
          />
        </button>

        {/* Zone 2: Primary action + Language Switcher + Burger Menu (Always visible) */}
        <div className="flex items-center gap-2 sm:gap-3">
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
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-cyan-500/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 border border-cyan-500/30 transition-all hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-400 whitespace-nowrap cursor-pointer active:scale-98"
          >
            <EditableText
              value={content.navbar?.ctaText || 'Nezávazná konzultace'}
              onChange={(val) => updateNavbar({ ctaText: val })}
              label="Tlačítko v navigaci"
            />
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>

          {/* Language Dropdown Selector - placed directly next to the 3-line hamburger button */}
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

            {/* Dropdown Menu */}
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

          {/* Menu toggle (Burger menu - always visible on all screen sizes) */}
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

      {/* Menu dropdown - for all screen sizes (absolute to avoid document layout shifts) */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 w-full border-b border-white/10 bg-[#0B101D]/95 backdrop-blur-xl px-4 sm:px-6 lg:px-8 py-5 space-y-4 animate-fade-in shadow-2xl z-50">
          <div className="mx-auto max-w-7xl">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleLinkClick(link.href)}
                  className="text-left text-sm sm:text-base font-medium text-slate-200 py-2.5 px-3 rounded-lg hover:bg-white/5 hover:text-cyan-300 transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <EditableText
                    value={link.label}
                    onChange={(val) => {
                      const updated = [...navLinks];
                      updated[idx] = { ...updated[idx], label: val };
                      updateNavbar({ links: updated });
                    }}
                    label={`Odkaz v menu #${idx + 1}`}
                  />
                  <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </button>
              ))}
            </nav>

            <div className="pt-3.5 mt-2 border-t border-white/10 flex items-center justify-between">
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

            <div className="pt-3 sm:hidden">
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

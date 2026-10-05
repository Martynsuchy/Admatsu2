import React, { Component, ErrorInfo, ReactNode } from 'react';
import { CmsProvider, useCms } from './context/CmsContext';
import { CmsAdminBar } from './components/cms/CmsAdminBar';
import { CmsDashboard } from './components/cms/CmsDashboard';
import { LoginModal } from './components/cms/LoginModal';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { GeoExplainer } from './components/GeoExplainer';
import { TechComparison } from './components/TechComparison';
import { ProcessSection } from './components/ProcessSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { scrollToTarget } from './utils/scrollHelper';

// Global error boundary to prevent any blank black screen
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Admatsu App ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('admatsu_cms_content');
      localStorage.removeItem('admatsu_cms_inline');
      localStorage.removeItem('admatsu_cms_auth');
    } catch {}
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070B12] text-slate-100 flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md p-8 rounded-2xl bg-[#0B101D] border border-white/15 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
              A
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Nastala drobná chyba zobrazení</h2>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Omlouváme se, web se automaticky obnoví do výchozího stavu po stisknutí tlačítka níže.
            </p>
            <button
              onClick={this.handleReset}
              className="w-full rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition-all cursor-pointer shadow-lg shadow-cyan-500/20 active:scale-98"
            >
              Obnovit načtení webu
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function MainApp() {
  const { viewMode, isAuthenticated } = useCms();

  const scrollToSection = (id: string) => {
    scrollToTarget(id);
  };

  const renderWebsite = (isSplit = false) => (
    <div
      className={`min-h-screen bg-[#070B12] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300 ${
        isSplit ? 'border-l border-cyan-500/30 overflow-y-auto max-h-screen shadow-2xl' : ''
      }`}
    >
      {/* 1-Row 3-Zone Clean Top Bar */}
      <Navbar onOpenConsultation={() => scrollToSection('kontakt')} />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenConsultation={() => scrollToSection('kontakt')}
          onExploreComparison={() => scrollToSection('srovnani')}
        />

        {/* Services Bento */}
        <Services onOpenConsultation={() => scrollToSection('kontakt')} />

        {/* Apple-Style Pinned Comparison Slider: Zastaralý web vs. Moderní web */}
        <TechComparison onOpenConsultation={() => scrollToSection('kontakt')} />

        {/* SEO vs GEO Plain Explainer & Streamlined Interactive Simulator */}
        <GeoExplainer />

        {/* 5-Step Delivery Process (7-14 dní od předání podkladů) */}
        <ProcessSection onOpenConsultation={() => scrollToSection('kontakt')} />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Contact Form & Company Details */}
        <ContactSection />
      </main>

      {/* Clean Public Footer */}
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#070B12] text-slate-100 flex flex-col font-sans">
      {/* Discreet Admin Dock / CMS Bar - only visible when logged in */}
      <CmsAdminBar />

      {/* Security Login Dialog Modal */}
      <LoginModal />

      {/* View router: When in CMS mode and authenticated */}
      {viewMode === 'cms' && isAuthenticated && <CmsDashboard />}

      {/* View router: When in Split mode and authenticated */}
      {viewMode === 'split' && isAuthenticated && (
        <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 h-[calc(100vh-45px)] overflow-hidden">
          <div className="overflow-y-auto border-r border-white/10 bg-[#070B14]">
            <CmsDashboard />
          </div>
          <div className="overflow-y-auto bg-[#070B12]">
            {renderWebsite(true)}
          </div>
        </div>
      )}

      {/* Default Website View: Always renders for public visitors or when not in full CMS mode */}
      {(viewMode === 'web' || !isAuthenticated) && renderWebsite(false)}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <CmsProvider>
        <MainApp />
      </CmsProvider>
    </ErrorBoundary>
  );
}

import React from 'react';
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

function MainApp() {
  const { viewMode } = useCms();

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

      {/* View router */}
      {viewMode === 'cms' && <CmsDashboard />}

      {viewMode === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 h-[calc(100vh-45px)] overflow-hidden">
          <div className="overflow-y-auto border-r border-white/10 bg-[#070B14]">
            <CmsDashboard />
          </div>
          <div className="overflow-y-auto bg-[#070B12]">
            {renderWebsite(true)}
          </div>
        </div>
      )}

      {viewMode === 'web' && renderWebsite(false)}
    </div>
  );
}

export default function App() {
  return (
    <CmsProvider>
      <MainApp />
    </CmsProvider>
  );
}

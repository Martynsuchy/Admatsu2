export interface HeroContent {
  kicker: string;
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  metrics: {
    title: string;
    description: string;
    highlight?: boolean;
  }[];
  architectureTitle?: string;
  architectureBadge?: string;
  stackNote?: string;
  windowFooterNote?: string;
  stackItems?: { title: string; desc: string }[];
  standardsTitle?: string;
  standardsBadge?: string;
  standardsIntro?: string;
  standardsBullets?: string[];
  standardsFooter?: string;
  geoTitle?: string;
  geoBadge?: string;
  geoIntro?: string;
  geoBoxTitle?: string;
  geoBoxBullets?: string[];
  geoFooter?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  bulletPoints: string[];
  tag: string;
  priceNote: string;
  buttonText?: string;
  category: 'web' | 'geo' | 'audit' | 'calc';
}

export interface ServicesSectionContent {
  kicker: string;
  headline: string;
  subheadline: string;
}

export interface ComparisonItem {
  id: string;
  area: string;
  oldWay: string;
  admatsuWay: string;
}

export interface TechComparisonContent {
  kicker: string;
  headline: string;
  subheadline: string;
  items: ComparisonItem[];
  categoryLabel?: string;
  oldWayLabel?: string;
  admatsuLabel?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtonText?: string;
}

export interface GeoQueryItem {
  id: string;
  label?: string;
  query: string;
  classicTitle: string;
  classicSnippet: string;
  classicLimitation: string;
  aiEngine: string;
  aiAnswer: string;
  citations: string;
  verifiedLabel?: string;
}

export interface GeoExplainerContent {
  kicker: string;
  headline: string;
  subheadline: string;
  seoCardTitle: string;
  seoCardSubtitle?: string;
  seoCardBadge?: string;
  seoCardDesc: string;
  seoCardBullets?: string[];
  seoCardNote?: string;
  geoCardTitle: string;
  geoCardSubtitle?: string;
  geoCardBadge?: string;
  geoCardDesc: string;
  geoCardBullets?: string[];
  geoCardNote?: string;
  simulatorKicker?: string;
  simulatorTitle?: string;
  simulatorSubtitle?: string;
  simulatorQueries?: GeoQueryItem[];
}

export interface ProcessStep {
  id: string;
  num: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export interface ProcessSectionContent {
  kicker: string;
  headline: string;
  subheadline: string;
  steps: ProcessStep[];
  deliverablesLabel?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtonText?: string;
}

export interface CalculatorSectionContent {
  kicker: string;
  headline: string;
  subheadline: string;
  projectTypeTitle?: string;
  searchTierTitle?: string;
  addonsTitle?: string;
  speedTitle?: string;
  onepageTitle?: string;
  onepageDesc?: string;
  corporateTitle?: string;
  corporateDesc?: string;
  portalTitle?: string;
  portalDesc?: string;
  standardSeoTitle?: string;
  standardSeoDesc?: string;
  geoSeoTitle?: string;
  geoSeoDesc?: string;
  calcAddonTitle?: string;
  crmAddonTitle?: string;
  cmsAddonTitle?: string;
  langAddonTitle?: string;
  speedStandardTitle?: string;
  speedStandardDesc?: string;
  speedExpressTitle?: string;
  speedExpressDesc?: string;
  summaryTitle?: string;
  priceLabel?: string;
  priceNote?: string;
  daysLabel?: string;
  fairConditionNote?: string;
  guarantees?: string[];
  submitButtonText?: string;
  submitSubtext?: string;
}

export interface FaqSectionContent {
  kicker: string;
  headline: string;
  subheadline: string;
}

export interface FaqItemContent {
  id: string;
  question: string;
  answer: string;
  category: 'geo' | 'process' | 'tech' | 'ownership';
}

export interface ContactSectionContent {
  kicker: string;
  headline: string;
  subheadline: string;
  formTitle: string;
  formSubtitle: string;
  nameLabel?: string;
  emailLabel?: string;
  phoneLabel?: string;
  urlLabel?: string;
  serviceTypeLabel?: string;
  messageLabel?: string;
  submitButtonText?: string;
  submitSubtext?: string;
  successTitle?: string;
  successDesc?: string;
  resetButtonText?: string;
  directEmailLabel?: string;
  directPhoneLabel?: string;
  directAddressLabel?: string;
  directIcoLabel?: string;
}

export interface CompanyContact {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  ico: string;
  responseGuarantee: string;
  hours: string;
  dataBox?: string;
  court?: string;
}

export interface FooterContent {
  aboutText: string;
  copyrightNotice: string;
  linksTitle?: string;
  contactTitle?: string;
  registryNote?: string;
  privacyText?: string;
  termsText?: string;
}

export interface NavbarContent {
  brandName: string;
  ctaText: string;
  links?: { label: string; href: string }[];
}

export interface GeoSeoSettings {
  metaTitle: string;
  metaDescription: string;
  targetKeywords: string[];
  allowGptBot: boolean;
  allowPerplexityBot: boolean;
  allowClaudeBot: boolean;
  allowGoogleExtended: boolean;
  schemaOrgType: 'ProfessionalService' | 'Organization' | 'LocalBusiness';
  aiSummaryPromptAnswer: string;
}

export interface LeadInquiry {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  existingUrl?: string;
  estimatedPrice?: string;
  message: string;
  status: 'new' | 'contacted' | 'in_progress' | 'quote_sent' | 'completed';
  notes?: string;
}

export interface CmsRevision {
  id: string;
  timestamp: string;
  author: string;
  description: string;
}

export interface SiteContent {
  navbar: NavbarContent;
  hero: HeroContent;
  servicesSection: ServicesSectionContent;
  services: ServiceItem[];
  techComparison: TechComparisonContent;
  geoExplainer: GeoExplainerContent;
  processSection: ProcessSectionContent;
  calculatorSection: CalculatorSectionContent;
  faqSection: FaqSectionContent;
  faq: FaqItemContent[];
  contactSection: ContactSectionContent;
  contact: CompanyContact;
  footer: FooterContent;
  geoSeo: GeoSeoSettings;
  updatedAt?: number;
}

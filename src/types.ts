export interface ProjectConfig {
  projectType: 'onepage' | 'corporate' | 'portal';
  optimizationTier: 'standard_seo' | 'full_geo_seo';
  features: {
    interactiveCalculator: boolean;
    crmIntegration: boolean;
    contentCms: boolean;
    multilingual: boolean;
    speedOptimization: boolean;
  };
  deliverySpeed: 'express' | 'standard';
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'geo' | 'process' | 'tech' | 'ownership';
}

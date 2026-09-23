export type Language = 'es' | 'en';

export interface MaterialItem {
  id: string;
  category: 'carbide' | 'superalloy' | 'slags' | 'catalysts' | 'refractory';
  nameEs: string;
  nameEn: string;
  formula: string;
  descriptionEs: string;
  descriptionEn: string;
  formatsEs: string[];
  formatsEn: string[];
  applicationsEs: string[];
  applicationsEn: string[];
  minPurity: string;
  recoveryEfficiencyEs: string;
  recoveryEfficiencyEn: string;
  recoveryEfficiencyPct: number;
  processingMethodEs: string;
  processingMethodEn: string;
  image: string;
  co2SavingsPerKg: number; // kg CO2 avoided per kg recycled vs mining
  marketDemand: 'High' | 'Very High' | 'Strategic';
}

export interface AttachedPhoto {
  id: string;
  source: 'upload' | 'url';
  name: string;
  url: string;
  size?: string;
}

export interface QuoteFormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  materialType: string;
  quantityKg: string;
  format: string;
  location: string;
  notes: string;
  photos?: AttachedPhoto[];
}

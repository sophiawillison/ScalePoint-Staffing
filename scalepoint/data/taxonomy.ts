// Shared U.S. executive taxonomy (spec §5, §6, §13). Categorical only — no fabricated counts.

export const LEADERSHIP_FUNCTIONS = [
  'CEO', 'CFO', 'COO', 'CIO', 'CTO', 'CHRO', 'CMO',
  'President', 'General Counsel', 'VP', 'Managing Director', 'Transformation Leader',
] as const;

export const LEADERSHIP_LEVELS = [
  'C-Suite', 'President / MD', 'EVP / SVP', 'VP',
] as const;

export const EXPERIENCE_BANDS = [
  '10–12 years', '13–15 years', '16–18 years', '19–20+ years',
] as const;

export const REGIONS = [
  'Northeast', 'Southeast', 'Midwest', 'Texas / Southwest', 'Mountain', 'West Coast',
] as const;

export const INDUSTRIES = [
  'Technology', 'Financial Services', 'Private Equity', 'Venture Capital',
  'Healthcare', 'Life Sciences', 'Consumer', 'Industrial', 'Manufacturing',
  'Energy', 'SaaS', 'FinTech', 'Healthcare Technology', 'Professional Services',
  'Logistics', 'Aerospace & Defense',
] as const;

export const WORK_MODELS = ['On-site', 'Hybrid', 'Remote'] as const;

// Employer intelligence lenses (spec §10)
export const EMPLOYER_LENSES = [
  { id: 'technology', label: 'Technology Leadership' },
  { id: 'healthcare', label: 'Healthcare Leadership' },
  { id: 'industrial', label: 'Industrial Leadership' },
  { id: 'finance', label: 'Finance Leadership' },
  { id: 'operations', label: 'Operations' },
  { id: 'data-ai', label: 'Data / AI' },
] as const;

// Executive intent states (spec §5, section 5)
export const INTENT_STATES = [
  {
    id: 'active',
    label: 'Actively exploring',
    copy: 'You are ready to move for the right mandate. We can surface selected opportunities aligned to your scope and timing.',
  },
  {
    id: 'selective',
    label: 'Selectively open',
    copy: 'You are not searching, but the right conversation would earn your attention. We reach out only when a mandate genuinely fits.',
  },
  {
    id: 'planning',
    label: 'Planning 6–12 months ahead',
    copy: 'You are positioning for a considered next step. Sharing your profile early lets us map fit as mandates develop.',
  },
  {
    id: 'board',
    label: 'Board & advisory interest',
    copy: 'You bring enterprise judgment to the boardroom. We can consider you for board, advisory, and operating-partner contexts.',
  },
] as const;

export type LeadershipFunction = (typeof LEADERSHIP_FUNCTIONS)[number];
export type Industry = (typeof INDUSTRIES)[number];
export type WorkModel = (typeof WORK_MODELS)[number];

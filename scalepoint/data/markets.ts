// Major U.S. executive markets (spec §1, §5, §6, §10) — real coordinates for the map.
// Context is categorical/illustrative. No fabricated candidate counts.

export type Market = {
  id: string;
  city: string;
  state: string; // USPS
  region: string;
  lat: number;
  lon: number;
  // conceptual lens weighting 0–1 per employer lens (illustrative only)
  lenses: Partial<Record<'technology' | 'healthcare' | 'industrial' | 'finance' | 'operations' | 'data-ai', number>>;
  sectors: string[];
  functions: string[];
  context: string;
};

export const MARKETS: Market[] = [
  {
    id: 'nyc', city: 'New York', state: 'NY', region: 'Northeast', lat: 40.7128, lon: -74.006,
    lenses: { finance: 0.95, operations: 0.7, technology: 0.6, 'data-ai': 0.55 },
    sectors: ['Financial Services', 'Private Equity', 'Media', 'Consumer'],
    functions: ['CFO', 'CEO', 'COO', 'General Counsel'],
    context: 'The deepest U.S. market for capital-markets, private-equity, and enterprise finance leadership.',
  },
  {
    id: 'sf', city: 'San Francisco', state: 'CA', region: 'West Coast', lat: 37.7749, lon: -122.4194,
    lenses: { technology: 0.98, 'data-ai': 0.95, operations: 0.55 },
    sectors: ['Technology', 'SaaS', 'Venture Capital', 'FinTech'],
    functions: ['CTO', 'CEO', 'CIO', 'VP Engineering'],
    context: 'Concentration of venture-backed technology and product leadership across scale stages.',
  },
  {
    id: 'la', city: 'Los Angeles', state: 'CA', region: 'West Coast', lat: 34.0522, lon: -118.2437,
    lenses: { technology: 0.6, operations: 0.6, industrial: 0.45 },
    sectors: ['Consumer', 'Media', 'Aerospace & Defense', 'Technology'],
    functions: ['CMO', 'President', 'COO'],
    context: 'Consumer, media, and aerospace leadership with a growing technology base.',
  },
  {
    id: 'boston', city: 'Boston', state: 'MA', region: 'Northeast', lat: 42.3601, lon: -71.0589,
    lenses: { healthcare: 0.9, technology: 0.7, 'data-ai': 0.65 },
    sectors: ['Life Sciences', 'Healthcare', 'Technology', 'Healthcare Technology'],
    functions: ['CEO', 'CTO', 'VP Engineering'],
    context: 'Life-sciences and deep-tech leadership anchored by a dense research ecosystem.',
  },
  {
    id: 'chicago', city: 'Chicago', state: 'IL', region: 'Midwest', lat: 41.8781, lon: -87.6298,
    lenses: { industrial: 0.9, operations: 0.85, finance: 0.6 },
    sectors: ['Industrial', 'Manufacturing', 'Logistics', 'Financial Services'],
    functions: ['President', 'COO', 'CFO'],
    context: 'Industrial, operations, and mid-market platform leadership across the Midwest.',
  },
  {
    id: 'austin', city: 'Austin', state: 'TX', region: 'Texas / Southwest', lat: 30.2672, lon: -97.7431,
    lenses: { technology: 0.85, 'data-ai': 0.7, operations: 0.5 },
    sectors: ['Technology', 'SaaS', 'Semiconductors'],
    functions: ['CIO', 'CTO', 'CEO'],
    context: 'Fast-growing technology and enterprise-platform leadership market.',
  },
  {
    id: 'dallas', city: 'Dallas', state: 'TX', region: 'Texas / Southwest', lat: 32.7767, lon: -96.797,
    lenses: { finance: 0.75, operations: 0.75, industrial: 0.6 },
    sectors: ['Financial Services', 'Industrial', 'Consumer', 'Energy'],
    functions: ['CFO', 'COO', 'President'],
    context: 'Corporate finance and operations leadership across diversified enterprises.',
  },
  {
    id: 'seattle', city: 'Seattle', state: 'WA', region: 'West Coast', lat: 47.6062, lon: -122.3321,
    lenses: { technology: 0.9, 'data-ai': 0.85, operations: 0.5 },
    sectors: ['Technology', 'Cloud', 'Logistics', 'SaaS'],
    functions: ['CTO', 'CIO', 'VP Engineering'],
    context: 'Cloud, platform, and large-scale engineering leadership.',
  },
  {
    id: 'miami', city: 'Miami', state: 'FL', region: 'Southeast', lat: 25.7617, lon: -80.1918,
    lenses: { finance: 0.7, technology: 0.55, operations: 0.5 },
    sectors: ['Financial Services', 'FinTech', 'Consumer', 'Logistics'],
    functions: ['CEO', 'CFO', 'Managing Director'],
    context: 'Emerging finance and technology leadership hub for the Southeast and Americas.',
  },
  {
    id: 'dc', city: 'Washington', state: 'DC', region: 'Southeast', lat: 38.9072, lon: -77.0369,
    lenses: { operations: 0.7, technology: 0.6, industrial: 0.5 },
    sectors: ['Aerospace & Defense', 'Professional Services', 'Technology'],
    functions: ['President', 'General Counsel', 'COO'],
    context: 'Government-adjacent, defense, and professional-services leadership.',
  },
  {
    id: 'atlanta', city: 'Atlanta', state: 'GA', region: 'Southeast', lat: 33.749, lon: -84.388,
    lenses: { operations: 0.8, industrial: 0.65, technology: 0.55 },
    sectors: ['Logistics', 'FinTech', 'Consumer', 'Healthcare'],
    functions: ['COO', 'CIO', 'President'],
    context: 'Logistics, payments, and operations leadership across the Southeast.',
  },
  {
    id: 'denver', city: 'Denver', state: 'CO', region: 'Mountain', lat: 39.7392, lon: -104.9903,
    lenses: { technology: 0.65, operations: 0.6, industrial: 0.55 },
    sectors: ['Technology', 'Energy', 'Consumer'],
    functions: ['CEO', 'COO', 'CTO'],
    context: 'Growth-stage technology and energy leadership across the Mountain region.',
  },
  {
    id: 'houston', city: 'Houston', state: 'TX', region: 'Texas / Southwest', lat: 29.7604, lon: -95.3698,
    lenses: { industrial: 0.85, operations: 0.8, finance: 0.6 },
    sectors: ['Energy', 'Industrial', 'Manufacturing'],
    functions: ['CEO', 'COO', 'CFO'],
    context: 'Energy and industrial leadership, including turnaround and transformation contexts.',
  },
  {
    id: 'philadelphia', city: 'Philadelphia', state: 'PA', region: 'Northeast', lat: 39.9526, lon: -75.1652,
    lenses: { healthcare: 0.75, industrial: 0.55, operations: 0.55 },
    sectors: ['Healthcare', 'Life Sciences', 'Professional Services'],
    functions: ['CEO', 'CFO', 'President'],
    context: 'Healthcare, life-sciences, and professional-services leadership.',
  },
  {
    id: 'charlotte', city: 'Charlotte', state: 'NC', region: 'Southeast', lat: 35.2271, lon: -80.8431,
    lenses: { finance: 0.85, operations: 0.65 },
    sectors: ['Financial Services', 'FinTech', 'Industrial'],
    functions: ['CFO', 'COO', 'Transformation Leader'],
    context: 'Major banking and financial-operations leadership center.',
  },
  {
    id: 'minneapolis', city: 'Minneapolis', state: 'MN', region: 'Midwest', lat: 44.9778, lon: -93.265,
    lenses: { operations: 0.75, industrial: 0.7, healthcare: 0.6 },
    sectors: ['Healthcare', 'Consumer', 'Industrial', 'Manufacturing'],
    functions: ['COO', 'President', 'CFO'],
    context: 'Diversified corporate leadership across healthcare, consumer, and industrial.',
  },
];

export const marketById = (id: string) => MARKETS.find((m) => m.id === id);

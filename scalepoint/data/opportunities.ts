// Seed content — 10 confidential executive opportunities (spec §7, §19).
// SAMPLE / CONFIDENTIAL data. No real company names. USD compensation.
// Every card is flagged confidential and labeled as sample data in the UI.

export type Opportunity = {
  id: string;
  slug: string;
  title: string;
  organizationType: string; // never a real company name
  city: string;
  state: string;
  region: string;
  workModel: 'On-site' | 'Hybrid' | 'Remote';
  experienceRequired: string;
  minYears: number;
  leadershipLevel: string;
  industry: string;
  function: string;
  compensation: string; // USD range
  brief: string; // one-sentence mandate
  overview: string;
  responsibilities: string[];
  idealProfile: string[];
  requiredExperience: string[];
  preferredExperience: string[];
};

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: '01', slug: 'chief-executive-officer-pe-portfolio-nyc',
    title: 'Chief Executive Officer',
    organizationType: 'Private Equity Portfolio Company',
    city: 'New York', state: 'NY', region: 'Northeast',
    workModel: 'On-site', experienceRequired: '15+ years', minYears: 15,
    leadershipLevel: 'C-Suite', industry: 'Private Equity', function: 'CEO',
    compensation: '$650,000–$950,000 base + performance bonus + equity',
    brief: 'Lead an established portfolio business through growth, operational improvement, and strategic expansion.',
    overview:
      'A sponsor-backed platform is seeking a Chief Executive Officer to own the value-creation plan across an established portfolio business. The mandate combines commercial acceleration with operational discipline and a clear path to the next liquidity event.',
    responsibilities: [
      'Own the full P&L and enterprise value-creation plan alongside the sponsor.',
      'Set and execute commercial, operational, and capital-allocation strategy.',
      'Build and lead a high-performing executive team.',
      'Prepare the business for its next strategic milestone.',
    ],
    idealProfile: [
      'Proven CEO or divisional P&L leader in a sponsor-backed environment.',
      'Track record of profitable growth and margin improvement.',
      'Comfortable operating with board-level accountability.',
    ],
    requiredExperience: ['15+ years senior leadership', 'Full P&L ownership', 'Private-equity or sponsor context'],
    preferredExperience: ['Prior exit / liquidity event', 'Buy-and-build experience'],
  },
  {
    id: '02', slug: 'chief-technology-officer-vc-scaleup-sf',
    title: 'Chief Technology Officer',
    organizationType: 'Venture Capital-Backed Scaleup',
    city: 'San Francisco', state: 'CA', region: 'West Coast',
    workModel: 'Hybrid', experienceRequired: '12+ years', minYears: 12,
    leadershipLevel: 'C-Suite', industry: 'Technology', function: 'CTO',
    compensation: '$450,000–$600,000 base + significant equity',
    brief: 'Own technology strategy, engineering scale, and product/platform leadership through the next growth stage.',
    overview:
      'A venture-backed scaleup is appointing a Chief Technology Officer to lead engineering and platform strategy through a period of rapid scale. The role sets technical direction while building the organization and systems for durable growth.',
    responsibilities: [
      'Define technology and platform strategy aligned to the growth plan.',
      'Scale engineering organization, architecture, and delivery.',
      'Partner with product and go-to-market leadership.',
      'Establish security, reliability, and technical governance.',
    ],
    idealProfile: [
      'Senior engineering leader who has scaled teams through hypergrowth.',
      'Strong architecture and platform judgment.',
      'Credible partner to founders and investors.',
    ],
    requiredExperience: ['12+ years engineering leadership', 'Scaled a platform', 'High-growth environment'],
    preferredExperience: ['SaaS or infrastructure', 'Prior CTO / VP Engineering role'],
  },
  {
    id: '03', slug: 'chief-information-officer-pre-ipo-austin',
    title: 'Chief Information Officer',
    organizationType: 'Pre-IPO Technology Company',
    city: 'Austin', state: 'TX', region: 'Texas / Southwest',
    workModel: 'Hybrid', experienceRequired: '14+ years', minYears: 14,
    leadershipLevel: 'C-Suite', industry: 'Technology', function: 'CIO',
    compensation: '$400,000–$550,000 base + equity',
    brief: 'Modernize enterprise technology, data, security, and operating platforms ahead of the next stage.',
    overview:
      'A pre-IPO technology company is seeking a Chief Information Officer to modernize enterprise systems, data, and security as it prepares for public-company readiness and continued scale.',
    responsibilities: [
      'Lead enterprise technology, data, and security strategy.',
      'Drive systems modernization and operational readiness.',
      'Establish controls and governance for public-company standards.',
      'Partner across finance, product, and operations.',
    ],
    idealProfile: [
      'Enterprise CIO with modernization and readiness experience.',
      'Strong security and data governance orientation.',
      'Comfortable in a high-scrutiny, high-growth setting.',
    ],
    requiredExperience: ['14+ years enterprise technology leadership', 'Systems modernization', 'Security governance'],
    preferredExperience: ['IPO / public-company readiness', 'Data platform transformation'],
  },
  {
    id: '04', slug: 'chief-financial-officer-family-office-dallas',
    title: 'Chief Financial Officer',
    organizationType: 'Family Office Portfolio Company',
    city: 'Dallas', state: 'TX', region: 'Texas / Southwest',
    workModel: 'On-site', experienceRequired: '16+ years', minYears: 16,
    leadershipLevel: 'C-Suite', industry: 'Financial Services', function: 'CFO',
    compensation: '$425,000–$575,000 base + bonus',
    brief: 'Lead finance, capital planning, performance management, and strategic decision support.',
    overview:
      'A family-office-backed operating company is appointing a Chief Financial Officer to lead finance, capital planning, and performance management, serving as a strategic partner to ownership and the executive team.',
    responsibilities: [
      'Own finance strategy, planning, and capital allocation.',
      'Build performance-management and reporting rigor.',
      'Support strategic decisions and transactions.',
      'Lead and develop the finance organization.',
    ],
    idealProfile: [
      'Seasoned CFO across operating and ownership contexts.',
      'Strong capital-planning and analytics capability.',
      'Trusted advisor to owners and boards.',
    ],
    requiredExperience: ['16+ years finance leadership', 'CFO or deputy CFO', 'Capital planning'],
    preferredExperience: ['Family-office or PE context', 'M&A support'],
  },
  {
    id: '05', slug: 'vp-engineering-deeptech-boston',
    title: 'VP, Engineering',
    organizationType: 'Stealth-Mode DeepTech Startup',
    city: 'Boston', state: 'MA', region: 'Northeast',
    workModel: 'On-site', experienceRequired: '10+ years', minYears: 10,
    leadershipLevel: 'VP', industry: 'Technology', function: 'VP',
    compensation: '$300,000–$400,000 base + founding-level equity',
    brief: 'Build and lead engineering as the company moves from technical validation into scaled delivery.',
    overview:
      'A stealth deep-tech company is hiring a VP of Engineering to build the engineering organization and delivery model as it transitions from technical validation to scaled product delivery.',
    responsibilities: [
      'Build and lead the engineering organization from an early base.',
      'Establish architecture, delivery, and quality practices.',
      'Translate research into reliable, scalable product.',
      'Partner closely with founders and product.',
    ],
    idealProfile: [
      'Hands-on engineering leader comfortable in ambiguity.',
      'Experience taking systems from validation to scale.',
      'Strong hiring and culture instincts.',
    ],
    requiredExperience: ['10+ years engineering', 'Team building', 'Complex technical delivery'],
    preferredExperience: ['DeepTech / applied research', 'Early-stage leadership'],
  },
  {
    id: '06', slug: 'chief-operating-officer-swf-portfolio-nyc',
    title: 'Chief Operating Officer',
    organizationType: 'Sovereign Wealth Fund Portfolio Company',
    city: 'New York', state: 'NY', region: 'Northeast',
    workModel: 'On-site', experienceRequired: '18+ years', minYears: 18,
    leadershipLevel: 'C-Suite', industry: 'Private Equity', function: 'COO',
    compensation: '$550,000–$750,000 base + bonus + equity',
    brief: 'Drive operating discipline, cross-functional execution, and enterprise transformation.',
    overview:
      'A large institutionally-backed portfolio company is seeking a Chief Operating Officer to drive operating discipline and cross-functional execution across a complex enterprise undergoing transformation.',
    responsibilities: [
      'Lead enterprise operations and cross-functional execution.',
      'Drive operating discipline and performance systems.',
      'Own transformation delivery against business objectives.',
      'Develop operational leadership across the organization.',
    ],
    idealProfile: [
      'Enterprise COO with large-scale operating experience.',
      'Track record leading complex transformation.',
      'Strong execution and leadership presence.',
    ],
    requiredExperience: ['18+ years leadership', 'Enterprise operations', 'Transformation delivery'],
    preferredExperience: ['Institutional / PE ownership', 'Multi-site or global scope'],
  },
  {
    id: '07', slug: 'president-coo-mid-market-industrial-chicago',
    title: 'President / COO',
    organizationType: 'Mid-Market Industrial Company',
    city: 'Chicago', state: 'IL', region: 'Midwest',
    workModel: 'On-site', experienceRequired: '17+ years', minYears: 17,
    leadershipLevel: 'President / MD', industry: 'Industrial', function: 'President',
    compensation: '$500,000–$700,000 base + bonus',
    brief: 'Lead commercial and operational performance across a national industrial platform.',
    overview:
      'A mid-market industrial platform is appointing a President / COO to lead commercial and operational performance across a national footprint, with full accountability for growth and execution.',
    responsibilities: [
      'Lead commercial and operational performance nationally.',
      'Own growth strategy and operational execution.',
      'Strengthen the leadership team and operating model.',
      'Partner with ownership on strategic priorities.',
    ],
    idealProfile: [
      'Industrial or manufacturing leader with P&L scope.',
      'Commercial and operational balance.',
      'Comfortable across multi-site operations.',
    ],
    requiredExperience: ['17+ years leadership', 'Industrial / manufacturing', 'P&L ownership'],
    preferredExperience: ['Multi-site operations', 'Commercial transformation'],
  },
  {
    id: '08', slug: 'vp-strategy-consumer-brand-la',
    title: 'VP, Strategy',
    organizationType: 'Multi-National Consumer Brand',
    city: 'Los Angeles', state: 'CA', region: 'West Coast',
    workModel: 'Hybrid', experienceRequired: '13+ years', minYears: 13,
    leadershipLevel: 'VP', industry: 'Consumer', function: 'VP',
    compensation: '$325,000–$425,000 base + bonus',
    brief: 'Shape enterprise strategy, portfolio priorities, and growth initiatives.',
    overview:
      'A multinational consumer brand is hiring a VP of Strategy to shape enterprise strategy, portfolio priorities, and growth initiatives in partnership with executive leadership.',
    responsibilities: [
      'Lead enterprise and portfolio strategy.',
      'Prioritize and shape growth initiatives.',
      'Partner with executive leadership on decisions.',
      'Build strategic capability across the organization.',
    ],
    idealProfile: [
      'Senior strategy leader with consumer experience.',
      'Strong analytical and commercial judgment.',
      'Executive-level influence and communication.',
    ],
    requiredExperience: ['13+ years strategy leadership', 'Consumer / brand', 'Enterprise scope'],
    preferredExperience: ['Top-tier strategy background', 'Portfolio strategy'],
  },
  {
    id: '09', slug: 'ceo-md-founder-led-turnaround-houston',
    title: 'CEO / Managing Director',
    organizationType: 'Founder-Led Distressed Company',
    city: 'Houston', state: 'TX', region: 'Texas / Southwest',
    workModel: 'On-site', experienceRequired: '20+ years', minYears: 20,
    leadershipLevel: 'C-Suite', industry: 'Industrial', function: 'CEO',
    compensation: '$500,000–$750,000 base + turnaround incentive',
    brief: 'Lead a complex turnaround, stabilize performance, and reposition the business for sustainable growth.',
    overview:
      'A founder-led company facing performance pressure is seeking a CEO / Managing Director to lead a complex turnaround — stabilizing operations and repositioning the business for sustainable growth.',
    responsibilities: [
      'Lead the turnaround and stabilization plan.',
      'Restore financial and operational performance.',
      'Reposition the business for durable growth.',
      'Rebuild trust with stakeholders and the team.',
    ],
    idealProfile: [
      'Proven turnaround / restructuring leader.',
      'Decisive under pressure with strong judgment.',
      'Experience with founder-led dynamics.',
    ],
    requiredExperience: ['20+ years leadership', 'Turnaround / restructuring', 'Full P&L'],
    preferredExperience: ['Distressed / special situations', 'Stakeholder management'],
  },
  {
    id: '10', slug: 'transformation-program-director-spinoff-charlotte',
    title: 'Transformation Program Director',
    organizationType: 'S&P 500 Spin-Off Initiative',
    city: 'Charlotte', state: 'NC', region: 'Southeast',
    workModel: 'Hybrid', experienceRequired: '15+ years', minYears: 15,
    leadershipLevel: 'EVP / SVP', industry: 'Professional Services', function: 'Transformation Leader',
    compensation: '$375,000–$500,000 base + bonus',
    brief: 'Lead a multi-year separation and transformation across technology, operations, finance, and shared services.',
    overview:
      'A large enterprise undertaking a spin-off is appointing a Transformation Program Director to lead a multi-year separation across technology, operations, finance, and shared services.',
    responsibilities: [
      'Lead the end-to-end separation and transformation program.',
      'Coordinate technology, operations, finance, and shared services.',
      'Manage complex dependencies and executive stakeholders.',
      'Deliver against milestones and business objectives.',
    ],
    idealProfile: [
      'Senior transformation / program leader.',
      'Experience with separations, carve-outs, or large change programs.',
      'Strong cross-functional orchestration.',
    ],
    requiredExperience: ['15+ years leadership', 'Large-scale transformation', 'Cross-functional programs'],
    preferredExperience: ['Spin-off / carve-out', 'Public-company scale'],
  },
];

export const opportunityBySlug = (slug: string) =>
  OPPORTUNITIES.find((o) => o.slug === slug);

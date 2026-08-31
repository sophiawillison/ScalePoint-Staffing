import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/home/Section';
import { ButtonLink } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About',
  description: 'A U.S.-focused executive recruitment and talent intelligence practice built around fit, evidence, and trust.',
};

const BELIEFS = [
  { t: 'Fit over volume', d: 'A smaller, relevant universe is more valuable than hundreds of loosely matched profiles.' },
  { t: 'Evidence over titles', d: 'Titles vary. Scope, complexity, outcomes, and leadership responsibility are stronger signals.' },
  { t: 'Confidentiality by default', d: 'Senior leadership conversations require discretion — for organizations and executives alike.' },
  { t: 'Context matters', d: 'Ownership, scale, culture, maturity, and mandate all shape whether a leader is the right fit.' },
  { t: 'Judgement + intelligence', d: 'Data improves discovery. Experienced judgement determines relevance.' },
];

const HOW = [
  { n: '01', t: 'Understand', d: 'Define the mandate, business context, and what success actually requires.' },
  { n: '02', t: 'Map', d: 'Map the relevant executive universe across the U.S. market before narrowing.' },
  { n: '03', t: 'Evaluate', d: 'Assess leadership scope, outcomes, and evidence — not job titles.' },
  { n: '04', t: 'Engage', d: 'Approach a small, qualified group through discreet, context-rich conversations.' },
  { n: '05', t: 'Present', d: 'Deliver a deliberately small, decision-ready shortlist with clear rationale.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About ScalePoint"
        title="Executive search built around fit, evidence, and trust."
        intro="Leadership hiring should not be driven by résumé volume. We connect organizations with leaders capable of solving the business challenge ahead — and help experienced executives discover mandates aligned with where they want to go next."
      />

      {/* Purpose */}
      <Section>
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <p className="eyebrow eyebrow--brass">Our Purpose</p>
          <p className="max-w-prose text-[20px] leading-relaxed text-ink">
            Create better alignment between exceptional leaders and organizations where their experience can
            create meaningful impact.
          </p>
        </div>
      </Section>

      {/* Beliefs */}
      <Section className="bg-surface">
        <p className="eyebrow eyebrow--brass">What we believe</p>
        <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BELIEFS.map((b) => (
            <div key={b.t} className="flex h-full flex-col rounded-card-lg border border-mist bg-mineral p-7">
              <h2 className="text-title font-bold text-ink">{b.t}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-slate">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How we work */}
      <Section dark>
        <p className="eyebrow eyebrow--light">How we work</p>
        <h2 className="mt-3 text-heading font-bold text-mineral">Understand → Map → Evaluate → Engage → Present</h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-5">
          {HOW.map((s) => (
            <li key={s.n} className="rounded-card-lg border border-white/10 bg-white/[0.03] p-5">
              <span className="font-mono text-[12px] text-cyan">{s.n}</span>
              <h3 className="mt-2 text-[16px] font-semibold text-mineral">{s.t}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-mineral/65">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* For executives / employers */}
      <Section>
        <div className="grid items-stretch gap-6 md:grid-cols-2">
          <div className="flex h-full flex-col rounded-card-lg border border-mist bg-surface p-8">
            <h2 className="text-title font-bold text-ink">For executives</h2>
            <p className="mt-3 flex-1 text-[16px] leading-relaxed text-slate">
              Explore opportunities without becoming another résumé in an applicant queue. We focus on leadership
              scope, ambition, and mandate alignment.
            </p>
            <div className="mt-6"><ButtonLink href="/executive-profile" variant="primary" arrow>Submit Your Executive Profile</ButtonLink></div>
          </div>
          <div className="flex h-full flex-col rounded-card-lg border border-plum/30 bg-surface p-8">
            <h2 className="text-title font-bold text-ink">For employers</h2>
            <p className="mt-3 flex-1 text-[16px] leading-relaxed text-slate">
              Access an evidence-led executive search process designed around the business challenge — not simply
              the job description.
            </p>
            <div className="mt-6"><ButtonLink href="/employer-search" variant="primary" arrow>Start an Executive Search</ButtonLink></div>
          </div>
        </div>

        <div className="mt-12 rounded-card-lg border border-mist bg-mineral p-8">
          <p className="max-w-prose text-[15px] leading-relaxed text-slate">
            This site is a working product build. Sample opportunities and market visualizations are clearly
            labeled as illustrative. We make no claims about placement rates, network size, response times, or
            absolute confidentiality — those depend on the specifics of each engagement.
          </p>
        </div>
      </Section>
    </>
  );
}

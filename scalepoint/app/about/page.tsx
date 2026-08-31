import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/home/Section';
import { ButtonLink } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About',
  description: 'A U.S.-focused executive recruitment and talent intelligence practice.',
};

const PRINCIPLES = [
  { t: 'Fit over volume', d: 'We surface opportunities and candidates by relevance and evidence — never by application count or reach.' },
  { t: 'Confidential by default', d: 'Executives can explore and share their profile without an account or public presence. Organizations stay unnamed until a conversation is warranted.' },
  { t: 'Evidence-led', d: 'We assess scope, outcomes, and leadership evidence — what someone has actually done — not just titles or keywords.' },
  { t: 'U.S. market focus', d: 'A deliberate focus on the United States lets us understand markets, sectors, and compensation with real specificity.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Executive search, built around fit and evidence."
        intro="We connect senior leaders with mandates that match their scope and ambition, and help organizations hire the leaders who can move the business forward."
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div key={p.t} className="rounded-card-lg border border-mist bg-surface p-7">
              <h2 className="text-title font-bold text-ink">{p.t}</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-slate">{p.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-card-lg border border-mist bg-mineral p-8">
          <p className="max-w-prose text-[15px] leading-relaxed text-slate">
            This site is a working product build. Sample opportunities and market visualizations are clearly
            labeled as illustrative. We make no claims about placement rates, network size, response times, or
            absolute confidentiality — those depend on the specifics of each engagement.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/executive-profile" variant="primary" arrow>Submit Your Executive Profile</ButtonLink>
          <ButtonLink href="/employer-search" variant="secondary">Submit a Hiring Requirement</ButtonLink>
        </div>
      </Section>
    </>
  );
}

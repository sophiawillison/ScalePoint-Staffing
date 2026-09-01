import type { Metadata } from 'next';
import { Section, SectionHead } from '@/components/home/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { HeroVideo } from '@/components/ui/HeroVideo';
import { HERO_MEDIA } from '@/lib/media';
import { FAQ } from '@/components/ui/FAQ';
import { ScreeningModel } from '@/components/screening/ScreeningModel';

export const metadata: Metadata = {
  title: 'For Employers',
  description: 'Mandate-led executive search across the U.S. — evidence-led assessment, market intelligence, and a selective shortlist.',
};

const SOLUTIONS = [
  { t: 'Retained executive search', d: 'A dedicated, evidence-led search for a critical leadership hire, run end-to-end from mandate to shortlist.' },
  { t: 'Confidential & replacement search', d: 'Discreet searches where sensitivity matters — successions, replacements, or moves that can\u2019t be public.' },
  { t: 'Succession & first critical hires', d: 'Build the bench or make the first senior hire that sets the trajectory for the next chapter.' },
  { t: 'Turnaround & special situations', d: 'Leaders for growth inflection, transformation, or turnaround — matched to the specific business challenge.' },
];

const VALUE = [
  { t: 'Evidence over titles', d: 'We assess business scale, outcomes, transformation, and operating complexity — not job titles alone.' },
  { t: 'A deliberately small shortlist', d: 'You receive a decision-ready shortlist supported by evidence and rationale — not a stack of résumés to filter.' },
  { t: 'Market intelligence built in', d: 'Every search is grounded in where the right leaders actually concentrate across the U.S. market.' },
  { t: 'Discretion by design', d: 'Sensitive searches stay confidential — for your organisation and for the executives we engage.' },
];

const DELIVERABLES = [
  'A market map and target-company view for the mandate',
  'Evidence-led profiles with comparable leadership indicators',
  'A calibrated fit assessment against your business challenge',
  'A qualified, genuinely engaged candidate pool',
  'A decision-ready shortlist with clear rationale',
];

const FAQ_ITEMS = [
  { q: 'How is this different from a job board or contingency recruiter?', a: 'We run a mandate-led, evidence-based search grounded in market intelligence and present a small, qualified shortlist — rather than forwarding high volumes of applicants.' },
  { q: 'Can a search be confidential?', a: 'Yes. Many mandates are sensitive. We engage the market discreetly and protect both your organisation\u2019s and candidates\u2019 confidentiality throughout.' },
  { q: 'What do you need from us to start?', a: 'A brief on the role, the business context, and what success requires. You can share as much or as little detail as you have — our team calibrates from there.' },
  { q: 'How do you assess candidates?', a: 'We evaluate leadership scope, outcomes, transformation experience, and operating complexity against your specific mandate — not titles or keywords.' },
  { q: 'What will we receive?', a: 'A market map, evidence-led profiles, a calibrated fit assessment, and a deliberately small, decision-ready shortlist with clear rationale.' },
];

export default function ForEmployersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-carbon on-dark">
        <HeroVideo sources={HERO_MEDIA.employer.sources} poster={HERO_MEDIA.employer.poster}
          overlay="from-carbon/80 via-carbon/72 to-carbon"
          accent="radial-gradient(65% 55% at 22% 8%, rgba(176,71,92,0.30), transparent 62%)" />
        <div className="shell relative flex min-h-[80vh] flex-col justify-center pb-24 pt-40">
          <Reveal><p className="eyebrow" style={{ color: '#D98BA6' }}>Executive Search · Talent Intelligence</p></Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 max-w-4xl font-serif text-display font-medium text-mineral">
              Build the leadership team your next chapter demands.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-[19px] leading-relaxed text-mineral/75">
              Find proven executives through evidence-led search, market intelligence, and discreet engagement —
              designed around your business mandate.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/employer-search" variant="light" arrow>Start an Executive Search</ButtonLink>
              <ButtonLink href="/talent-intelligence" variant="ghost" className="!text-mineral hover:!text-wine">Explore Our Approach</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Hiring solutions */}
      <Section>
        <Reveal><SectionHead eyebrow="Hiring solutions"
          title="Search built around the mandate — not a template."
          intro="Every leadership hire carries a different challenge. We shape the search to the business situation in front of you." /></Reveal>
        <div className="mt-10 grid items-stretch gap-5 sm:grid-cols-2">
          {SOLUTIONS.map((s, i) => (
            <Reveal key={s.t} delay={(i % 2) * 60} className="h-full">
              <div className="flex h-full flex-col rounded-card-lg border border-mist bg-surface p-7">
                <span className="font-mono text-[12px] text-plum">0{i + 1}</span>
                <h3 className="mt-2 text-title font-bold text-ink">{s.t}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-slate">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why choose us */}
      <Section className="bg-surface">
        <Reveal><SectionHead eyebrow="Why employers choose us"
          title="Evidence, discretion, and a shortlist you can act on."
          intro="A search process designed to reduce noise and surface the few leaders who can actually solve the challenge." /></Reveal>
        <div className="mt-10 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE.map((v, i) => (
            <Reveal key={v.t} delay={(i % 4) * 50} className="h-full">
              <div className="flex h-full flex-col rounded-card-lg border border-mist bg-mineral p-6">
                <h3 className="text-[17px] font-bold text-ink">{v.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-slate">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Process — interactive screening model */}
      <Section dark>
        <Reveal><SectionHead dark eyebrow="Our process"
          title="A structured, evidence-led search model."
          intro="Five stages from market discovery to a selective shortlist. Step through each to see what it involves and what you get." /></Reveal>
        <Reveal className="mt-10"><ScreeningModel /></Reveal>
      </Section>

      {/* What you get */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <SectionHead eyebrow="What you get" title="Deliverables, not just candidates." />
            <p className="mt-4 max-w-prose text-[16px] leading-relaxed text-slate">
              A ScalePoint search produces more than a list of names. You gain a clear read on the market and a
              shortlist you can move on with confidence.
            </p>
            <div className="mt-8"><ButtonLink href="/employer-search" variant="primary" arrow>Start an Executive Search</ButtonLink></div>
          </Reveal>
          <Reveal delay={80}>
            <ul className="space-y-3">
              {DELIVERABLES.map((d) => (
                <li key={d} className="flex items-start gap-3 rounded-xl border border-mist bg-surface px-5 py-4 text-[15px] text-ink">
                  <span aria-hidden className="mt-0.5 text-plum">✦</span>{d}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-surface">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <Reveal><SectionHead eyebrow="Questions" title="What employers ask us." /></Reveal>
          <Reveal delay={80}><FAQ items={FAQ_ITEMS} /></Reveal>
        </div>
      </Section>

      {/* Final CTA */}
      <Section dark>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-heading font-medium text-mineral">Brief our executive search team.</h2>
          <p className="mx-auto mt-4 max-w-prose text-[17px] text-mineral/70">
            Share your hiring requirement. We\u2019ll review the mandate and reach out to discuss the role, the
            candidate profile, and next steps.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <ButtonLink href="/employer-search" variant="light" arrow>Start an Executive Search</ButtonLink>
            <ButtonLink href="/talent-intelligence" variant="ghost" className="!text-mineral hover:!text-wine">Explore Talent Intelligence</ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

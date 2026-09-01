'use client';

import { Section, SectionHead } from './Section';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { HeroVideo } from '@/components/ui/HeroVideo';
import { HERO_MEDIA } from '@/lib/media';
import { USMap } from '@/components/map/USMap';
import { ScreeningModel } from '@/components/screening/ScreeningModel';
import { EMPLOYER_LENSES, INDUSTRIES, LEADERSHIP_LEVELS } from '@/data/taxonomy';

export function EmployerHome() {
  return (
    <>
      {/* 1, Hero with live video banner (distinct burgundy accent) */}
      <section className="relative overflow-hidden bg-carbon on-dark">
        <HeroVideo
          sources={HERO_MEDIA.employer.sources}
          poster={HERO_MEDIA.employer.poster}
          overlay="from-carbon/80 via-carbon/72 to-carbon"
          accent="radial-gradient(65% 55% at 22% 8%, rgba(176,71,92,0.30), transparent 62%)"
        />
        <div className="shell relative flex min-h-[92vh] flex-col justify-center pb-24 pt-36">
          <Reveal><p className="eyebrow" style={{ color: '#D98BA6' }}>Executive Search · Talent Intelligence</p></Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 max-w-4xl font-serif text-display font-medium text-mineral">
              Build the leadership team your next chapter demands.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-[19px] leading-relaxed text-mineral/90">
              Find proven executives through evidence-led search, market intelligence, and discreet engagement
              designed around your business mandate.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/employer-search" variant="light" arrow>Start an Executive Search</ButtonLink>
              <ButtonLink href="/talent-intelligence" variant="ghost" className="!text-mineral hover:!text-wine">
                Explore Our Search Approach
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2, Talent Intelligence intro */}
      <Section>
        <Reveal><SectionHead eyebrow="Talent Intelligence"
          title="Search grounded in the U.S. leadership market."
          intro="We combine market mapping with structured assessment of leadership evidence, so your search is informed by where the right leaders are and what they’ve actually done." /></Reveal>
        <div className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
          {[
            { t: 'Market mapping', d: 'Identify where relevant leaders concentrate across U.S. markets and sectors.' },
            { t: 'Evidence-led assessment', d: 'Evaluate scope, outcomes, and leadership evidence, not just titles.' },
            { t: 'Selective presentation', d: 'Present a small, qualified shortlist calibrated to your mandate.' },
          ].map((c) => (
            <Reveal key={c.t} className="h-full">
              <div className="h-full rounded-card-lg border border-mist bg-surface p-7">
                <h3 className="text-title font-bold text-ink">{c.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3, Leadership Across America */}
      <Section dark>
        <Reveal><SectionHead dark eyebrow="Leadership Across America"
          title="Where the leadership you need is concentrated."
          intro="Apply a leadership lens to see how executive strength distributes across the U.S. market. Illustrative view, for orientation, not headcount." /></Reveal>
        <Reveal className="mt-10"><USMap variant="employer" /></Reveal>
      </Section>

      {/* 4, Screening Model */}
      <Section dark className="!pt-0">
        <Reveal><SectionHead dark eyebrow="How We Work"
          title="A structured, evidence-led search model."
          intro="Five stages from market discovery to a selective shortlist. Step through each to see what it involves and what you get." /></Reveal>
        <Reveal className="mt-10"><ScreeningModel /></Reveal>
      </Section>

      {/* 5, Industry & Leadership expertise */}
      <Section>
        <Reveal><SectionHead eyebrow="Expertise"
          title="Leadership lenses and industry coverage."
          intro="We work across the functions and sectors where senior leadership decisions carry the most weight." /></Reveal>
        <div className="mt-10 grid items-stretch gap-8 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-card-lg border border-mist bg-surface p-7">
              <h3 className="text-title font-bold text-ink">Leadership lenses</h3>
              <ul className="mt-4 grid grid-cols-2 gap-2">
                {EMPLOYER_LENSES.map((l) => (
                  <li key={l.id} className="rounded-lg bg-mineral px-3 py-2 text-[14px] text-ink">{l.label}</li>
                ))}
              </ul>
              <h4 className="mt-6 text-[14px] font-semibold text-ink">Leadership levels</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {LEADERSHIP_LEVELS.map((l) => <span key={l} className="rounded-full border border-mist px-3 py-1 text-[13px] text-slate">{l}</span>)}
              </div>
            </div>
          </Reveal>
          <Reveal delay={80} className="h-full">
            <div className="flex h-full flex-col rounded-card-lg border border-mist bg-surface p-7">
              <h3 className="text-title font-bold text-ink">Industry coverage</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {INDUSTRIES.map((i) => <span key={i} className="rounded-full border border-mist px-3 py-1.5 text-[13px] text-slate">{i}</span>)}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 6, Search context */}
      <Section className="bg-surface">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
          <Reveal><SectionHead eyebrow="Every search is different"
            title="Built around your mandate and context."
            intro="Growth, transformation, turnaround, succession, or a first critical hire, the search adapts to the business challenge, not a generic template." /></Reveal>
          <Reveal delay={80}>
            <ul className="space-y-3">
              {[
                'Growth & scale leadership',
                'Transformation & change mandates',
                'Turnaround & special situations',
                'Succession & first critical hires',
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 rounded-xl border border-mist bg-mineral px-4 py-3 text-[15px] text-ink">
                  <span aria-hidden className="text-plum">•</span>{t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* 7, Final employer CTA */}
      <Section>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-heading font-bold text-ink">Brief our executive search team.</h2>
          <p className="mx-auto mt-4 max-w-prose text-[17px] text-slate">
            Share your hiring requirement. We’ll review the mandate and reach out to discuss the role,
            candidate profile, and next steps.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <ButtonLink href="/employer-search" variant="primary" arrow>Start an Executive Search</ButtonLink>
            <ButtonLink href="/talent-intelligence" variant="secondary">Explore Talent Intelligence</ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

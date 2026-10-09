'use client';

import { HeroVideo } from '@/components/ui/HeroVideo';
import { HERO_MEDIA } from '@/lib/media';
import { Section, SectionHead } from '@/components/home/Section';
import { USMap } from '@/components/map/USMap';
import { TalentMatrix } from '@/components/matrix/TalentMatrix';
import { ScreeningModel } from '@/components/screening/ScreeningModel';
import { ButtonLink } from '@/components/ui/Button';

export default function TalentIntelligencePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-carbon on-dark">
        <HeroVideo sources={HERO_MEDIA.about.sources} poster={HERO_MEDIA.about.poster}
          overlay="from-carbon/82 via-carbon/74 to-carbon"
          accent="radial-gradient(60% 50% at 50% 0%, rgba(95,190,156,0.22), transparent 70%)" />
        <div className="shell relative flex min-h-[62vh] flex-col justify-center pb-16 pt-40">
          <p className="eyebrow eyebrow--light">Talent Intelligence</p>
          <h1 className="mt-4 max-w-3xl font-serif text-display font-medium text-mineral">
            A clearer view of the U.S. leadership market.
          </h1>
          <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-mineral/85">
            Explore how leadership concentrates across markets, how functions meet industries, and how we run an
            evidence-led search. All visualizations are illustrative.
          </p>
        </div>
      </section>

      <Section>
        <SectionHead eyebrow="Leadership Across America"
          title="Executive strength, by market and lens."
          intro="Apply a leadership lens and select a market to see its sector and function focus." />
        <div className="mt-10"><USMap variant="employer" /></div>
      </Section>

      <Section className="bg-surface">
        <SectionHead eyebrow="Talent Matrix"
          title="Function meets industry."
          intro="An illustrative model of leadership-industry overlap. Filter to orient a search or a move." />
        <div className="mt-10"><TalentMatrix /></div>
      </Section>

      <Section dark>
        <SectionHead dark eyebrow="How We Work"
          title="An evidence-led search model."
          intro="Five stages from market discovery to a selective shortlist." />
        <div className="mt-10"><ScreeningModel /></div>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-heading font-bold text-ink">Put this to work on your mandate.</h2>
          <p className="mx-auto mt-4 max-w-prose text-[17px] text-slate">
            Brief our team, or share your executive profile, whichever fits where you are.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <ButtonLink href="/employer-search" variant="primary" arrow>Submit a Hiring Requirement</ButtonLink>
            <ButtonLink href="/executive-profile" variant="secondary">Submit Your Executive Profile</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}

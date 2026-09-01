'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { Section, SectionHead } from '@/components/home/Section';
import { USMap } from '@/components/map/USMap';
import { TalentMatrix } from '@/components/matrix/TalentMatrix';
import { ScreeningModel } from '@/components/screening/ScreeningModel';
import { ButtonLink } from '@/components/ui/Button';

export default function TalentIntelligencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Talent Intelligence"
        title="A clearer view of the U.S. leadership market."
        intro="Explore how leadership concentrates across markets, how functions meet industries, and how we run an evidence-led search. All visualizations are illustrative."
      />

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

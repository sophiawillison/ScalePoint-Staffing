'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Section, SectionHead } from './Section';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { USMap } from '@/components/map/USMap';
import { TalentMatrix } from '@/components/matrix/TalentMatrix';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { OPPORTUNITIES } from '@/data/opportunities';
import { INTENT_STATES, INDUSTRIES, LEADERSHIP_FUNCTIONS } from '@/data/taxonomy';
import { cn } from '@/lib/utils';

export function ExecutiveHome() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="relative overflow-hidden bg-carbon on-dark">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{ background: 'radial-gradient(60% 50% at 70% 0%, rgba(142,169,255,0.16), transparent 70%)' }} />
        <div className="shell relative flex min-h-[86vh] flex-col justify-center pb-24 pt-36">
          <Reveal>
            <p className="eyebrow eyebrow--light">U.S. Executive Recruitment</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 max-w-4xl font-serif text-display font-medium text-mineral">
              Your next leadership chapter starts here.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-[19px] leading-relaxed text-mineral/70">
              Confidential access to senior mandates across the United States — surfaced by fit,
              not by application volume. No account required.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/executive-profile" variant="light" arrow>Submit Your Executive Profile</ButtonLink>
              <ButtonLink href="/opportunities" variant="ghost" className="!text-mineral hover:!text-cyan">
                Explore Executive Opportunities
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2 — U.S. Talent Landscape */}
      <Section>
        <Reveal><SectionHead eyebrow="U.S. Talent Landscape"
          title="Leadership opportunity, mapped across the country."
          intro="Explore the major U.S. markets where senior mandates concentrate. Select a market to see the sectors and leadership functions most active there." /></Reveal>
        <Reveal className="mt-10"><USMap variant="executive" /></Reveal>
      </Section>

      {/* 3 — Talent Matrix */}
      <Section className="bg-surface">
        <Reveal><SectionHead eyebrow="Talent Matrix"
          title="Where your function meets your industry."
          intro="An illustrative view of how leadership functions intersect with industries across the market. Filter by function, experience, level, and location." /></Reveal>
        <Reveal className="mt-10"><TalentMatrix /></Reveal>
      </Section>

      {/* 4 — Featured Opportunities */}
      <Section>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHead eyebrow="Confidential Opportunities"
              title="A selection of current leadership mandates."
              intro="Confidential by default. Organizations are described by type and context — never named — until a conversation is warranted." />
            <Link href="/opportunities" className="text-[15px] font-semibold text-ink hover:text-slate">View all →</Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {OPPORTUNITIES.slice(0, 6).map((o, i) => (
            <Reveal key={o.id} delay={(i % 3) * 60}><OpportunityCard o={o} index={i} /></Reveal>
          ))}
        </div>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-slate">Sample opportunities — illustrative</p>
      </Section>

      {/* 5 — Positioning / Intent */}
      <IntentSection />

      {/* 6 — Industries & Functions */}
      <Section>
        <Reveal><SectionHead eyebrow="Coverage"
          title="Industries and functions we focus on."
          intro="Senior leadership across the sectors and roles that define enterprise performance in the U.S. market." /></Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="rounded-card-lg border border-mist bg-surface p-7">
              <h3 className="text-title font-bold text-ink">Industries</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {INDUSTRIES.map((i) => <span key={i} className="rounded-full border border-mist px-3 py-1.5 text-[13px] text-slate">{i}</span>)}
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="rounded-card-lg border border-mist bg-surface p-7">
              <h3 className="text-title font-bold text-ink">Leadership functions</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {LEADERSHIP_FUNCTIONS.map((f) => <span key={f} className="rounded-full border border-mist px-3 py-1.5 text-[13px] text-slate">{f}</span>)}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 7 — Confidentiality */}
      <Section dark>
        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
          <Reveal><SectionHead dark eyebrow="Confidential by design"
            title="Explore without exposure."
            intro="You can review opportunities and share your profile without creating an account or a public presence. Your information is used to assess fit for specific mandates — nothing more." /></Reveal>
          <Reveal delay={80}>
            <ul className="space-y-3">
              {[
                'No account, no public profile, no application counter.',
                'Organizations stay confidential until a conversation makes sense.',
                'Your details are reviewed for fit against specific mandates.',
                'Providing current compensation is always optional.',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[15px] text-mineral/85">
                  <span aria-hidden className="mt-0.5 text-cyan">—</span>{t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* 8 — Final CTA */}
      <Section>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-heading font-bold text-ink">Ready when you are.</h2>
          <p className="mx-auto mt-4 max-w-prose text-[17px] text-slate">
            Share your profile confidentially. If a mandate fits, an Executive Relationship Partner will reach out.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <ButtonLink href="/executive-profile" variant="primary" arrow>Submit My Executive Profile</ButtonLink>
            <ButtonLink href="/opportunities" variant="secondary">Explore Leadership Opportunities</ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

function IntentSection() {
  const [active, setActive] = useState<string>(INTENT_STATES[0].id);
  const current = INTENT_STATES.find((s) => s.id === active)!;
  return (
    <Section className="bg-surface">
      <Reveal><SectionHead eyebrow="Position yourself"
        title="However you're approaching your next move."
        intro="Executives engage on different timelines. Tell us where you are, and we'll calibrate how we reach out." /></Reveal>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div className="flex flex-col gap-2">
          {INTENT_STATES.map((s) => (
            <button key={s.id} onClick={() => setActive(s.id)} aria-pressed={s.id === active}
              className={cn('rounded-xl border px-5 py-4 text-left transition-all duration-200',
                s.id === active ? 'border-ink bg-ink text-mineral' : 'border-mist bg-white text-ink hover:border-ink/40')}>
              <span className="text-[16px] font-semibold">{s.label}</span>
            </button>
          ))}
        </div>
        <div className="rounded-card-lg border border-mist bg-mineral p-8">
          <p className="text-[19px] leading-relaxed text-ink">{current.copy}</p>
          <div className="mt-6"><ButtonLink href="/executive-profile" variant="primary" arrow>Submit Your Executive Profile</ButtonLink></div>
        </div>
      </div>
    </Section>
  );
}

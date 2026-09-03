'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Section, SectionHead } from './Section';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { ScrollStory } from './ScrollStory';
import { USMap } from '@/components/map/USMap';
import { TalentMatrix } from '@/components/matrix/TalentMatrix';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { FAQ } from '@/components/ui/FAQ';
import { OPPORTUNITIES } from '@/data/opportunities';
import { INTENT_STATES, INDUSTRIES, LEADERSHIP_FUNCTIONS } from '@/data/taxonomy';
import { cn } from '@/lib/utils';

export function ExecutiveHome() {
  return (
    <>
      {/* 1, Interactive 3D scroll story hero */}
      <ScrollStory audience="executive" />

      {/* 2, U.S. Talent Landscape */}
      <Section>
        <Reveal><SectionHead eyebrow="U.S. Talent Landscape"
          title="Leadership opportunity, mapped across the country."
          intro="Explore the major U.S. markets where senior mandates concentrate. Select a market to see the sectors and leadership functions most active there." /></Reveal>
        <Reveal className="mt-10"><USMap variant="executive" /></Reveal>
      </Section>

      {/* 3, Talent Matrix */}
      <Section className="bg-surface">
        <Reveal><SectionHead eyebrow="Talent Matrix"
          title="Where your function meets your industry."
          intro="An illustrative view of how leadership functions intersect with industries across the market. Filter by function, experience, level, and location." /></Reveal>
        <Reveal className="mt-10"><TalentMatrix /></Reveal>
      </Section>

      {/* 4, Featured Opportunities */}
      <Section>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHead eyebrow="Confidential Opportunities"
              title="A selection of current leadership mandates."
              intro="Confidential by default. Organizations are described by type and context, never named, until a conversation is warranted." />
            <Link href="/opportunities" className="text-[15px] font-semibold text-ink hover:text-slate">View all →</Link>
          </div>
        </Reveal>
        <div className="mt-10 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {OPPORTUNITIES.slice(0, 6).map((o, i) => (
            <Reveal key={o.id} delay={(i % 3) * 60} className="h-full"><OpportunityCard o={o} index={i} /></Reveal>
          ))}
        </div>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-slate">Sample opportunities, illustrative</p>
      </Section>

      {/* How it works for you */}
      <Section className="bg-surface">
        <Reveal><SectionHead eyebrow="How it works for you"
          title="From profile to the right conversation."
          intro="Four steps, entirely on your terms, and confidential at every stage." /></Reveal>
        <ol className="mt-10 grid gap-4 md:grid-cols-4">
          {[
            { n: '01', t: 'Share your profile', d: 'A short, confidential submission, background, scope, and what you want next. Attach a resume if you like.' },
            { n: '02', t: 'We assess fit', d: 'We review your leadership evidence against current and upcoming mandates across the U.S. market.' },
            { n: '03', t: 'Discreet introductions', d: 'When a mandate fits, we reach out with real context: the business, the challenge, and why you.' },
            { n: '04', t: 'You stay in control', d: 'You decide what to pursue. Nothing moves forward without your say. Confidentiality holds throughout.' },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 60}>
              <li className="h-full rounded-card-lg border border-mist bg-mineral p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink font-mono text-[14px] text-mineral">{s.n}</span>
                <h3 className="mt-4 text-[17px] font-semibold text-ink">{s.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-slate">{s.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* 5, Positioning / Intent */}
      <IntentSection />

      {/* 6, Industries & Functions (interactive chips → filtered opportunities) */}
      <Section>
        <Reveal><SectionHead eyebrow="U.S. Talent Landscape"
          title="Leadership markets are complex. We make them easier to navigate."
          intro="Explore the industries, functions, and leadership disciplines represented across our executive network and active search mandates. Select any to see related opportunities." /></Reveal>
        <div className="mt-10 grid items-stretch gap-8 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-card-lg border border-mist bg-surface p-7">
              <h3 className="text-title font-bold text-ink">Industries</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {INDUSTRIES.map((i) => (
                  <Link key={i} href={`/opportunities?industry=${encodeURIComponent(i)}`}
                    className="rounded-full border border-mist px-3 py-1.5 text-[13px] text-slate transition-colors hover:border-ink hover:text-ink">
                    {i}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={80} className="h-full">
            <div className="flex h-full flex-col rounded-card-lg border border-mist bg-surface p-7">
              <h3 className="text-title font-bold text-ink">Leadership functions</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {LEADERSHIP_FUNCTIONS.map((f) => (
                  <Link key={f} href={`/opportunities?function=${encodeURIComponent(f)}`}
                    className="rounded-full border border-mist px-3 py-1.5 text-[13px] text-slate transition-colors hover:border-ink hover:text-ink">
                    {f}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 7, Confidentiality */}
      <Section dark>
        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
          <Reveal><SectionHead dark eyebrow="Confidential by design"
            title="Explore without exposure."
            intro="You can review opportunities and share your profile without creating an account or a public presence. Your information is used to assess fit for specific mandates, nothing more." /></Reveal>
          <Reveal delay={80}>
            <ul className="space-y-3">
              {[
                'No account, no public profile, no application counter.',
                'Organizations stay confidential until a conversation makes sense.',
                'Your details are reviewed for fit against specific mandates.',
                'Providing current compensation is always optional.',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[15px] text-mineral/85">
                  <span aria-hidden className="mt-0.5 text-cyan">•</span>{t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-surface">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <Reveal><SectionHead eyebrow="Questions" title="What executives ask us." /></Reveal>
          <Reveal delay={80}>
            <FAQ items={[
              { q: 'Do I need to create an account?', a: 'No. You can explore opportunities and submit your profile with no account, login, or public profile of any kind.' },
              { q: 'Will my current employer see that I\u2019m looking?', a: 'Your information is used only to assess fit for specific mandates and is not published anywhere. Organisations are engaged discreetly and only with your agreement.' },
              { q: 'Do I have to share my current salary?', a: 'No. Providing current compensation is always optional. Share only what you\u2019re comfortable with.' },
              { q: 'What happens after I submit my profile?', a: 'Our team reviews it against current and upcoming mandates. If there\u2019s a relevant fit, an Executive Relationship Partner reaches out with context. If not, your profile stays on file for future mandates.' },
              { q: 'What kinds of roles do you work on?', a: 'Senior leadership across C-suite, President/MD, EVP/SVP, and VP levels, plus board and advisory contexts, spanning the industries on our opportunities page.' },
            ]} />
          </Reveal>
        </div>
      </Section>

      {/* 8, Final CTA */}
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
        title="However you’re approaching your next move."
        intro="Executives engage on different timelines. Tell us where you are, and we’ll calibrate how we reach out." /></Reveal>
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

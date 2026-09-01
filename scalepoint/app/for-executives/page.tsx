import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, SectionHead } from '@/components/home/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { HeroVideo } from '@/components/ui/HeroVideo';
import { HERO_MEDIA } from '@/lib/media';
import { FAQ } from '@/components/ui/FAQ';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { OPPORTUNITIES } from '@/data/opportunities';

export const metadata: Metadata = {
  title: 'For Executives',
  description: 'Confidential access to senior leadership mandates across the U.S. — matched by fit, not application volume.',
};

const BENEFITS = [
  { t: 'Confidential by default', d: 'Explore and share your profile without a public presence or an account. Your name never sits in an open applicant pool.' },
  { t: 'Curated, not crowded', d: 'You see mandates matched to your scope and ambition — not a feed of everything, and never an application counter.' },
  { t: 'A real relationship', d: 'An Executive Relationship Partner engages you with context, not a form letter — and only when a mandate genuinely fits.' },
  { t: 'Compensation on your terms', d: 'Sharing current compensation is always optional. We focus on where you want to go, not just what you earn today.' },
];

const PROCESS = [
  { n: '01', t: 'Share your profile', d: 'A short, confidential submission — background, scope, and what you want next. Attach a resume if you like.' },
  { n: '02', t: 'We assess fit', d: 'We review your leadership evidence against current and upcoming mandates across the U.S. market.' },
  { n: '03', t: 'Discreet introductions', d: 'When a mandate fits, we reach out with real context — the business, the challenge, and why you.' },
  { n: '04', t: 'You stay in control', d: 'You decide what to pursue. Nothing moves forward without your say. Confidentiality holds throughout.' },
];

const REASONS = [
  'Senior mandates you won\u2019t find on public job boards.',
  'Evidence-led matching that values scope and outcomes over titles.',
  'Board, advisory, and operating-partner contexts — not just line roles.',
  'A process built around your timing, whether you\u2019re active or simply open.',
];

const FAQ_ITEMS = [
  { q: 'Do I need to create an account?', a: 'No. You can explore opportunities and submit your profile with no account, login, or public profile of any kind.' },
  { q: 'Will my current employer see that I\u2019m looking?', a: 'Your information is used only to assess fit for specific mandates and is not published anywhere. Organizations are engaged discreetly and only with your agreement.' },
  { q: 'Do I have to share my current salary?', a: 'No. Providing current compensation is always optional. Share only what you\u2019re comfortable with.' },
  { q: 'What happens after I submit my profile?', a: 'Our team reviews your profile against current and upcoming mandates. If there\u2019s a relevant fit, an Executive Relationship Partner reaches out with context. If not, your profile stays on file for future mandates.' },
  { q: 'What kinds of roles do you work on?', a: 'Senior leadership across C-suite, President/MD, EVP/SVP, and VP levels, plus board and advisory contexts, spanning the industries listed on our opportunities page.' },
];

export default function ForExecutivesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-carbon on-dark">
        <HeroVideo sources={HERO_MEDIA.executive.sources} poster={HERO_MEDIA.executive.poster}
          overlay="from-carbon/80 via-carbon/72 to-carbon"
          accent="radial-gradient(60% 50% at 72% 8%, rgba(47,143,114,0.28), transparent 68%)" />
        <div className="shell relative flex min-h-[80vh] flex-col justify-center pb-24 pt-40">
          <Reveal><p className="eyebrow eyebrow--light">For Executives · United States</p></Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 max-w-4xl font-serif text-display font-medium text-mineral">
              The right leadership move changes more than your title.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-[19px] leading-relaxed text-mineral/75">
              Confidential access to senior mandates matched around your experience, leadership scope, and
              ambition — never by application volume.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/executive-profile" variant="light" arrow>Submit Your Executive Profile</ButtonLink>
              <ButtonLink href="/opportunities" variant="ghost" className="!text-mineral hover:!text-cyan">Explore Opportunities</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why work with us */}
      <Section>
        <Reveal><SectionHead eyebrow="Why executives work with us"
          title="A different kind of career conversation."
          intro="Most job platforms optimise for volume. We optimise for fit, discretion, and genuine relevance to where you want to go next." /></Reveal>
        <div className="mt-10 grid items-stretch gap-5 sm:grid-cols-2">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.t} delay={(i % 2) * 60} className="h-full">
              <div className="flex h-full flex-col rounded-card-lg border border-mist bg-surface p-7">
                <span className="font-mono text-[12px] text-brass">0{i + 1}</span>
                <h3 className="mt-2 text-title font-bold text-ink">{b.t}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-slate">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section className="bg-surface">
        <Reveal><SectionHead eyebrow="How it works for you"
          title="From profile to the right conversation."
          intro="Four steps, entirely on your terms — and confidential at every stage." /></Reveal>
        <ol className="mt-10 grid gap-4 md:grid-cols-4">
          {PROCESS.map((s, i) => (
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

      {/* Reasons + opportunities preview */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <SectionHead eyebrow="Reasons to work with us" title="What you gain access to." />
            <ul className="mt-6 space-y-3">
              {REASONS.map((r) => (
                <li key={r} className="flex items-start gap-3 rounded-xl border border-mist bg-surface px-4 py-3 text-[15px] text-ink">
                  <span aria-hidden className="mt-0.5 text-brass">—</span>{r}
                </li>
              ))}
            </ul>
            <div className="mt-8"><ButtonLink href="/executive-profile" variant="primary" arrow>Submit Your Executive Profile</ButtonLink></div>
          </Reveal>
          <Reveal delay={80}>
            <div className="grid gap-4 sm:grid-cols-2">
              {OPPORTUNITIES.slice(0, 4).map((o) => <OpportunityCard key={o.id} o={o} index={OPPORTUNITIES.indexOf(o)} />)}
            </div>
            <div className="mt-4 text-right">
              <Link href="/opportunities" className="text-[15px] font-semibold text-ink hover:text-slate">View all opportunities →</Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-surface">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <Reveal><SectionHead eyebrow="Questions" title="What executives ask us." /></Reveal>
          <Reveal delay={80}><FAQ items={FAQ_ITEMS} /></Reveal>
        </div>
      </Section>

      {/* Final CTA */}
      <Section dark>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-heading font-medium text-mineral">Your next chapter, on your terms.</h2>
          <p className="mx-auto mt-4 max-w-prose text-[17px] text-mineral/70">
            Share your profile confidentially. If a mandate fits, an Executive Relationship Partner will reach out.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <ButtonLink href="/executive-profile" variant="light" arrow>Submit Your Executive Profile</ButtonLink>
            <ButtonLink href="/opportunities" variant="ghost" className="!text-mineral hover:!text-cyan">Explore Opportunities</ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

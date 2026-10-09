import type { Metadata } from 'next';
import { Section, SectionHead } from '@/components/home/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { HeroVideo } from '@/components/ui/HeroVideo';
import { HERO_MEDIA } from '@/lib/media';
import { FAQ } from '@/components/ui/FAQ';

export const metadata: Metadata = {
  title: 'About',
  description: 'ScalePoint is a U.S.-focused executive search and talent-intelligence practice built around fit, evidence, and trust.',
};

const PILLARS = [
  { t: 'Executive access', d: 'We give senior leaders confidential access to mandates matched to their scope and ambition, without a public profile or an applicant queue.' },
  { t: 'Employer search', d: 'We run mandate-led, evidence-based searches for organisations hiring the leaders who will define their next chapter.' },
  { t: 'Talent intelligence', d: 'We ground every engagement in a clear read of the U.S. leadership market, where the right leaders are, and what they’ve actually done.' },
];

const VALUES = [
  { t: 'Fit over volume', d: 'A smaller, relevant universe is more valuable than hundreds of loosely matched profiles.' },
  { t: 'Evidence over titles', d: 'Scope, complexity, outcomes, and responsibility are stronger signals than a job title.' },
  { t: 'Confidentiality by default', d: 'Senior conversations require discretion, for organisations and executives alike.' },
  { t: 'Context matters', d: 'Ownership, scale, culture, maturity, and mandate all shape whether a leader is the right fit.' },
  { t: 'Judgement + intelligence', d: 'Data improves discovery. Experienced judgement determines relevance.' },
  { t: 'Honesty about what we know', d: 'We label sample data clearly and make no claims we can’t stand behind.' },
];

const DIFFERENTIATORS = [
  { t: 'No applicant queue', d: 'Executives are never just another résumé in a pile. Every engagement is relationship-led and confidential.' },
  { t: 'A deliberately small shortlist', d: 'Employers receive a decision-ready shortlist supported by evidence, not volume for the sake of it.' },
  { t: 'U.S. market depth', d: 'A deliberate focus on the United States lets us understand markets, sectors, and compensation with real specificity.' },
  { t: 'Discretion end-to-end', d: 'Confidentiality is built into how we engage the market, not bolted on afterwards.' },
];

const HOW = [
  { n: '01', t: 'Understand', d: 'Define the mandate, business context, and what success actually requires.' },
  { n: '02', t: 'Map', d: 'Map the relevant executive universe across the U.S. market before narrowing.' },
  { n: '03', t: 'Evaluate', d: 'Assess leadership scope, outcomes, and evidence, not job titles.' },
  { n: '04', t: 'Engage', d: 'Approach a small, qualified group through discreet, context-rich conversations.' },
  { n: '05', t: 'Present', d: 'Deliver a deliberately small, decision-ready shortlist with clear rationale.' },
];

const FAQ_ITEMS = [
  { q: 'Who is ScalePoint for?', a: 'Two audiences: senior executives exploring their next leadership move, and organisations hiring critical leaders. Each has a dedicated experience on this site.' },
  { q: 'Is this a job board?', a: 'No. We’re an evidence-led executive search practice. Executives are engaged confidentially, and employers receive a curated shortlist rather than a stream of applicants.' },
  { q: 'How do you protect confidentiality?', a: 'Executives need no account or public profile, organisations remain unnamed until a conversation is warranted, and sensitive searches are engaged discreetly throughout.' },
  { q: 'Is the data on this site real?', a: 'Sample opportunities and market visualisations are illustrative and clearly labelled. We make no claims about placement rates, network size, or response times.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Video hero */}
      <section className="relative overflow-hidden bg-carbon on-dark">
        <HeroVideo sources={HERO_MEDIA.about.sources} poster={HERO_MEDIA.about.poster}
          overlay="from-carbon/82 via-carbon/74 to-carbon"
          accent="radial-gradient(60% 50% at 50% 0%, rgba(198,161,94,0.20), transparent 70%)" />
        <div className="shell relative flex min-h-[74vh] flex-col justify-center pb-24 pt-40">
          <Reveal><p className="eyebrow eyebrow--light">About ScalePoint</p></Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 max-w-4xl font-serif text-display font-medium text-mineral">
              Executive search built around fit, evidence, and trust.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-[19px] leading-relaxed text-mineral/90">
              Leadership hiring should not be driven by résumé volume. We connect organisations with leaders
              capable of solving the challenge ahead, and help experienced executives discover mandates aligned
              with where they want to go next.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Who we are */}
      <Section>
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <Reveal><p className="eyebrow eyebrow--brass">Who we are</p></Reveal>
          <Reveal delay={60}>
            <p className="max-w-prose text-[20px] leading-relaxed text-ink">
              ScalePoint is a U.S.-focused executive recruitment and talent-intelligence practice. We exist to
              create better alignment between exceptional leaders and the organisations where their experience can
              create meaningful impact, with discretion at the centre of everything we do.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* What we do */}
      <Section className="bg-surface">
        <Reveal><SectionHead eyebrow="What we do" title="Three connected capabilities." /></Reveal>
        <div className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.t} delay={i * 60} className="h-full">
              <div className="flex h-full flex-col rounded-card-lg border border-mist bg-mineral p-7">
                <span className="font-mono text-[12px] text-brass">0{i + 1}</span>
                <h3 className="mt-2 text-title font-bold text-ink">{p.t}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-slate">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Mission statement */}
      <Section dark>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow eyebrow--light">Our purpose</p>
          <p className="mt-6 font-serif text-heading font-medium leading-tight text-mineral">
            Create better alignment between exceptional leaders and organisations where their experience can create
            meaningful impact.
          </p>
        </Reveal>
      </Section>

      {/* Values */}
      <Section>
        <Reveal><SectionHead eyebrow="What we believe" title="The principles behind every search." /></Reveal>
        <div className="mt-10 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => (
            <Reveal key={v.t} className="h-full">
              <div className="flex h-full flex-col rounded-card-lg border border-mist bg-surface p-7">
                <h3 className="text-title font-bold text-ink">{v.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why trust us */}
      <Section className="bg-surface">
        <Reveal><SectionHead eyebrow="Why trust us" title="What makes us different."
          intro="We’re deliberate about how we work, and honest about what we can and can’t claim." /></Reveal>
        <div className="mt-10 grid items-stretch gap-5 sm:grid-cols-2">
          {DIFFERENTIATORS.map((d) => (
            <Reveal key={d.t} className="h-full">
              <div className="flex h-full items-start gap-4 rounded-card-lg border border-mist bg-mineral p-7">
                <span aria-hidden className="mt-1 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brass/15 text-brass">✦</span>
                <div>
                  <h3 className="text-title font-bold text-ink">{d.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate">{d.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How we work */}
      <Section dark>
        <Reveal><p className="eyebrow eyebrow--light">How we work</p></Reveal>
        <Reveal delay={60}><h2 className="mt-3 font-serif text-heading font-medium text-mineral">Understand → Map → Evaluate → Engage → Present</h2></Reveal>
        <ol className="mt-10 grid gap-4 md:grid-cols-5">
          {HOW.map((s, i) => (
            <Reveal key={s.n} delay={i * 50}>
              <li className="h-full rounded-card-lg border border-white/10 bg-white/[0.03] p-5">
                <span className="font-mono text-[12px] text-cyan">{s.n}</span>
                <h3 className="mt-2 text-[16px] font-semibold text-mineral">{s.t}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-mineral/65">{s.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <Reveal><SectionHead eyebrow="Questions" title="Good to know." /></Reveal>
          <Reveal delay={80}><FAQ items={FAQ_ITEMS} /></Reveal>
        </div>
      </Section>

      {/* Dual CTA */}
      <Section className="bg-surface">
        <div className="grid items-stretch gap-6 md:grid-cols-2">
          <div className="flex h-full flex-col rounded-card-lg border border-mist bg-mineral p-8">
            <h2 className="text-title font-bold text-ink">For executives</h2>
            <p className="mt-3 flex-1 text-[16px] leading-relaxed text-slate">
              Explore opportunities without becoming another résumé in a queue. We focus on leadership scope,
              ambition, and mandate alignment.
            </p>
            <div className="mt-6"><ButtonLink href="/?mode=executive" variant="primary" arrow>Explore the Executive Experience</ButtonLink></div>
          </div>
          <div className="flex h-full flex-col rounded-card-lg border border-plum/30 bg-mineral p-8">
            <h2 className="text-title font-bold text-ink">For employers</h2>
            <p className="mt-3 flex-1 text-[16px] leading-relaxed text-slate">
              Access an evidence-led search process designed around the business challenge, not simply the job
              description.
            </p>
            <div className="mt-6"><ButtonLink href="/?mode=employer" variant="primary" arrow>Explore the Employer Experience</ButtonLink></div>
          </div>
        </div>
      </Section>
    </>
  );
}

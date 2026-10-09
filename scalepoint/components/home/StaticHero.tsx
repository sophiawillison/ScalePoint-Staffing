'use client';

import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';

type Config = {
  eyebrow: string;
  headline: string;
  sub: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
  accent: string; // rgb triplet
  note: string;
  tags: string[];
};

const EXECUTIVE: Config = {
  eyebrow: 'Executive Opportunities · United States',
  headline: 'The right leadership move changes more than your title.',
  sub: 'Discover confidential senior-level opportunities matched around your experience, leadership scope, and ambition, not application volume.',
  primary: { href: '/executive-profile', label: 'Submit Your Executive Profile' },
  secondary: { href: '/opportunities', label: 'Explore Opportunities' },
  accent: '47,143,114',
  note: 'Confidential by default. No public profile required.',
  tags: ['C-Suite', 'President / MD', 'EVP / SVP', 'Board & Advisory'],
};

const EMPLOYER: Config = {
  eyebrow: 'Executive Search · Talent Intelligence',
  headline: 'Build the leadership team your next chapter demands.',
  sub: 'Find proven executives through evidence-led search, market intelligence, and discreet engagement, designed around your business mandate.',
  primary: { href: '/employer-search', label: 'Start an Executive Search' },
  secondary: { href: '/talent-intelligence', label: 'Explore Our Approach' },
  accent: '176,71,92',
  note: 'Evidence-led search. A deliberately small shortlist.',
  tags: ['Retained Search', 'Confidential', 'Succession', 'Turnaround'],
};

// Static, premium emblem: concentric hairline rings with a few quiet nodes and a
// centred monogram. No motion, no 3D — purely decorative and on-brand.
function Emblem({ accent }: { accent: string }) {
  const rings = [60, 104, 150, 196];
  const nodes = [
    [196, 0], [150, 55], [104, -40], [-150, 30], [-104, 70], [60, 150], [-60, -150], [170, 110],
  ];
  return (
    <svg viewBox="-230 -230 460 460" className="h-full w-full" role="img" aria-label="ScalePoint emblem" aria-hidden>
      <defs>
        <radialGradient id="emGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={`rgba(${accent},0.22)`} />
          <stop offset="1" stopColor={`rgba(${accent},0)`} />
        </radialGradient>
      </defs>
      <circle r="210" fill="url(#emGlow)" />
      {rings.map((r) => (
        <circle key={r} r={r} fill="none" stroke="rgba(244,238,224,0.12)" strokeWidth="1" />
      ))}
      <circle r="196" fill="none" stroke={`rgba(${accent},0.45)`} strokeWidth="1.25" strokeDasharray="2 10" />
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 4 : 2.6} fill={i % 3 === 0 ? `rgb(${accent})` : 'rgba(244,238,224,0.5)'} />
      ))}
      {/* centre mark */}
      <circle r="46" fill="rgba(8,32,26,0.6)" stroke="rgba(198,161,94,0.6)" strokeWidth="1" />
      <text x="0" y="0" textAnchor="middle" dominantBaseline="central"
        fontFamily="var(--font-serif), serif" fontSize="40" fontWeight="500" fill="#F4EEE0">
        S
      </text>
    </svg>
  );
}

export function StaticHero({ audience }: { audience: 'executive' | 'employer' }) {
  const c = audience === 'employer' ? EMPLOYER : EXECUTIVE;
  const { accent } = c;

  return (
    <section className="relative overflow-hidden bg-carbon on-dark">
      {/* static premium background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0" style={{ background: `radial-gradient(55% 50% at 78% 18%, rgba(${accent},0.26), transparent 62%)` }} />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(244,238,224,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(244,238,224,0.6) 1px, transparent 1px)', backgroundSize: '54px 54px' }} />
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,transparent_55%,rgba(8,32,26,0.6)_100%)]" />
      </div>

      <div className="shell relative grid min-h-[86vh] grid-cols-1 items-center gap-10 py-28 pt-36 lg:grid-cols-[1.15fr_0.85fr]">
        {/* copy */}
        <div>
          <Reveal><p className="eyebrow eyebrow--light">{c.eyebrow}</p></Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 max-w-2xl font-serif text-display font-medium text-mineral">{c.headline}</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-[19px] leading-relaxed text-mineral/85">{c.sub}</p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={c.primary.href} variant="light" arrow>{c.primary.label}</ButtonLink>
              <ButtonLink href={c.secondary.href} variant="ghost" className="!text-mineral hover:!text-cyan">{c.secondary.label}</ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-10 flex flex-wrap items-center gap-2.5">
              {c.tags.map((t) => (
                <span key={t} className="rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[12.5px] font-medium text-mineral/75">
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-6 text-[13.5px] text-mineral/55">{c.note}</p>
          </Reveal>
        </div>

        {/* static premium emblem */}
        <Reveal delay={200} className="hidden lg:block">
          <div className="relative mx-auto aspect-square w-full max-w-[480px]">
            <Emblem accent={accent} />
          </div>
        </Reveal>
      </div>

      {/* brass hairline closing the banner */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(198,161,94,0.45), transparent)' }} />
    </section>
  );
}

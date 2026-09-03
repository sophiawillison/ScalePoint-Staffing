'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { ButtonLink } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

// Real 3D model loads client-side only; the SVG figure shows until it's ready.
const Model3D = dynamic(() => import('./Model3D'), { ssr: false });

type Feature = { label: string; message: string; icon: string };
type Config = {
  eyebrow: string;
  headline: string;
  sub: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
  accent: string; // rgb triplet
  features: Feature[];
};

// lucide-style single-path icons (stroked)
const I = {
  skills: 'M12 2l2.4 7.4H22l-6 4.6 2.3 7.4L12 17l-6.3 4.4L8 14 2 9.4h7.6z',
  doc: 'M7 3h7l5 5v13H7zM14 3v5h5M9 13h6M9 17h6',
  briefcase: 'M4 7h16v13H4zM9 7V5a2 2 0 012-2h2a2 2 0 012 2v2',
  cap: 'M3 8l9-4 9 4-9 4zM7 11v5c0 1 5 3 5 3s5-2 5-3v-5',
  badge: 'M12 2l2 4 4 .6-3 3 .7 4.4L12 12l-3.7 2 .7-4.4-3-3L10 6zM8 15v6l4-2 4 2v-6',
  layers: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5',
  trophy: 'M7 4h10v4a5 5 0 01-10 0zM7 6H4a3 3 0 003 3M17 6h3a3 3 0 01-3 3M9 20h6M12 14v6',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0',
  search: 'M11 4a7 7 0 105 12l4 4M11 4a7 7 0 010 14',
  match: 'M8 6H4v4M16 18h4v-4M20 6l-6 6M4 18l6-6',
  handshake: 'M12 11l-2-2-4 4 3 3 2-2M12 11l2-2 4 4-3 3-2-2M8 9L5 6M16 9l3-3',
  megaphone: 'M3 11v2l11 5V6zM14 8a4 4 0 010 8M3 13H2a1 1 0 01-1-1v0a1 1 0 011-1',
  chat: 'M4 5h16v11H8l-4 3zM8 9h8M8 12h5',
  team: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20a6 6 0 0112 0M17 11a3 3 0 100-6M15 20a6 6 0 016 0',
  chart: 'M4 20V10M10 20V4M16 20v-7M4 20h16',
};

const EXECUTIVE: Config = {
  eyebrow: 'Executive Opportunities · United States',
  headline: 'The right leadership move changes more than your title.',
  sub: 'Discover confidential senior-level opportunities matched around your experience, leadership scope, and ambition, not application volume.',
  primary: { href: '/executive-profile', label: 'Submit Your Executive Profile' },
  secondary: { href: '/opportunities', label: 'Explore Opportunities' },
  accent: '47,143,114',
  features: [
    { label: 'Skills', message: 'Your leadership capabilities, mapped to the mandates that need them.', icon: I.skills },
    { label: 'Resume / CV', message: 'Share your background confidentially, attached in a single click.', icon: I.doc },
    { label: 'Experience', message: 'Scope and outcomes, weighed over titles.', icon: I.briefcase },
    { label: 'Education', message: 'Credentials read in context, never in isolation.', icon: I.cap },
    { label: 'Certifications', message: 'The signals that sharpen your fit for a mandate.', icon: I.badge },
    { label: 'Projects', message: 'The transformations and builds that define your impact.', icon: I.layers },
    { label: 'Achievements', message: 'Results that speak louder than a headline.', icon: I.trophy },
    { label: 'Career profile', message: 'One confidential profile, matched to the right rooms.', icon: I.user },
  ],
};

const EMPLOYER: Config = {
  eyebrow: 'Executive Search · Talent Intelligence',
  headline: 'Build the leadership team your next chapter demands.',
  sub: 'Find proven executives through evidence-led search, market intelligence, and discreet engagement, designed around your business mandate.',
  primary: { href: '/employer-search', label: 'Start an Executive Search' },
  secondary: { href: '/talent-intelligence', label: 'Explore Our Approach' },
  accent: '176,71,92',
  features: [
    { label: 'Talent discovery', message: 'Find leaders where they actually concentrate across the U.S.', icon: I.search },
    { label: 'Candidate profiles', message: 'Evidence-led profiles, not keyword matches.', icon: I.user },
    { label: 'Skills matching', message: 'Capabilities calibrated to your specific mandate.', icon: I.match },
    { label: 'Hiring', message: 'A deliberately small, decision-ready shortlist you can act on.', icon: I.handshake },
    { label: 'Job postings', message: 'Confidential mandates, discreetly represented.', icon: I.megaphone },
    { label: 'Interviews', message: 'Context-rich conversations, not mass outreach.', icon: I.chat },
    { label: 'Team building', message: 'Build the bench your next chapter demands.', icon: I.team },
    { label: 'Recruitment analytics', message: 'A clear read on the U.S. leadership market.', icon: I.chart },
  ],
};

function Figure({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 160 200" className="h-full w-full" role="img" aria-label="Professional profile">
      <defs>
        <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4EEE0" stopOpacity="0.95" />
          <stop offset="1" stopColor="#F4EEE0" stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="35%" r="60%">
          <stop offset="0" stopColor={`rgba(${accent},0.55)`} />
          <stop offset="1" stopColor={`rgba(${accent},0)`} />
        </radialGradient>
      </defs>
      <ellipse cx="80" cy="90" rx="70" ry="80" fill="url(#glow)" />
      {/* head */}
      <circle cx="80" cy="58" r="26" fill="url(#fg)" />
      {/* shoulders / suit */}
      <path d="M32 168c0-30 21-52 48-52s48 22 48 52z" fill="url(#fg)" />
      {/* collar / lapel accent */}
      <path d="M80 116l-12 14 12 8 12-8z" fill={`rgba(${accent},0.9)`} />
      <path d="M68 130l-10 34M92 130l10 34" stroke={`rgba(${accent},0.5)`} strokeWidth="2" fill="none" />
    </svg>
  );
}

export function ScrollStory({ audience }: { audience: 'executive' | 'employer' }) {
  const config = audience === 'employer' ? EMPLOYER : EXECUTIVE;
  const { features, accent } = config;
  const n = features.length;
  const STEP_VH = 30;

  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [enabled, setEnabled] = useState(true); // 3D scroll mode vs static fallback
  const [radius, setRadius] = useState(190);

  // Decide interactive vs. static (reduced-motion or small screens)
  useEffect(() => {
    const decide = () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const narrow = window.innerWidth < 860;
      setEnabled(!reduce && !narrow);
      setRadius(window.innerWidth < 1200 ? 150 : 190);
    };
    decide();
    window.addEventListener('resize', decide);
    return () => window.removeEventListener('resize', decide);
  }, []);

  // Scroll-linked progress (rAF-throttled)
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        setProgress(total > 0 ? scrolled / total : 0);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [enabled]);

  const step = 360 / n;
  const ringRotation = -progress * (n - 1) * step;
  const active = Math.min(n - 1, Math.max(0, Math.round(progress * (n - 1))));
  const started = progress > 0.04;

  // ---------- Static fallback (reduced motion / mobile) ----------
  if (!enabled) {
    return (
      <section className="relative overflow-hidden bg-carbon on-dark">
        <div aria-hidden className="absolute inset-0" style={{ background: `radial-gradient(60% 50% at 70% 0%, rgba(${accent},0.22), transparent 70%)` }} />
        <div className="shell relative flex flex-col justify-center pb-16 pt-36">
          <p className="eyebrow eyebrow--light">{config.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl font-serif text-display font-medium text-mineral">{config.headline}</h1>
          <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-mineral/85">{config.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={config.primary.href} variant="light" arrow>{config.primary.label}</ButtonLink>
            <ButtonLink href={config.secondary.href} variant="ghost" className="!text-mineral hover:!text-cyan">{config.secondary.label}</ButtonLink>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {features.map((f) => (
              <li key={f.label} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: `rgba(${accent},0.18)` }}>
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={`rgb(${accent})`} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={f.icon} /></svg>
                </span>
                <p className="mt-2 text-[14px] font-semibold text-mineral">{f.label}</p>
                <p className="mt-1 text-[12.5px] leading-snug text-mineral/60">{f.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  // ---------- Interactive 3D scroll story ----------
  return (
    <section ref={wrapRef} className="relative bg-carbon on-dark" style={{ height: `${100 + n * STEP_VH}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* animated background */}
        <div aria-hidden className="absolute inset-0">
          <div className="absolute inset-0" style={{ background: `radial-gradient(50% 45% at 30% 15%, rgba(${accent},0.28), transparent 60%)` }} />
          <div className="absolute inset-0" style={{ background: `radial-gradient(45% 40% at 85% 90%, rgba(${accent},0.18), transparent 65%)`, transform: `translateY(${progress * -40}px)` }} />
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(244,238,224,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(244,238,224,0.6) 1px, transparent 1px)', backgroundSize: '48px 48px', transform: `translateY(${progress * 30}px)` }} />
        </div>

        <div className="shell relative grid h-full grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* 3D stage */}
          <div className="relative flex h-[54vh] items-center justify-center lg:h-[72vh]" style={{ perspective: '1200px' }}>
            {/* platform glow */}
            <div aria-hidden className="absolute bottom-[14%] h-24 w-72 rounded-[100%]" style={{ background: `radial-gradient(closest-side, rgba(${accent},0.4), transparent)`, filter: 'blur(8px)' }} />

            {/* real 3D human model (SVG figure shows while it loads) */}
            <div className="absolute inset-0 z-20">
              <Model3D spin={progress * Math.PI * 2} accent={[Number(accent.split(',')[0]) / 255, Number(accent.split(',')[1]) / 255, Number(accent.split(',')[2]) / 255]} />
            </div>

            {/* orbiting feature icons (icons only, so nothing overlaps) */}
            <div className="pointer-events-none absolute inset-0 z-10" style={{ transformStyle: 'preserve-3d', transform: `rotateX(10deg) rotateY(${ringRotation}deg)` }}>
              {features.map((f, i) => {
                const world = ((i * step + ringRotation) % 360 + 360) % 360;
                const front = (Math.cos((world * Math.PI) / 180) + 1) / 2;
                const isActive = i === active;
                return (
                  <div
                    key={f.label}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transform: `translate(-50%,-50%) rotateY(${i * step}deg) translateZ(${radius}px) rotateY(${-(i * step) - ringRotation}deg)`,
                      transformStyle: 'preserve-3d',
                      zIndex: Math.round(front * 100),
                      opacity: 0.3 + front * 0.7,
                    }}
                  >
                    <span
                      className="flex items-center justify-center rounded-2xl border backdrop-blur-sm transition-all duration-300"
                      style={{
                        width: isActive ? 60 : 48,
                        height: isActive ? 60 : 48,
                        transform: `scale(${0.85 + front * 0.3})`,
                        borderColor: isActive ? `rgb(${accent})` : 'rgba(244,238,224,0.2)',
                        background: isActive ? `rgba(${accent},0.24)` : 'rgba(244,238,224,0.06)',
                        boxShadow: isActive ? `0 0 30px rgba(${accent},0.55)` : 'none',
                      }}
                    >
                      <svg viewBox="0 0 24 24" style={{ width: isActive ? 28 : 22, height: isActive ? 28 : 22 }} fill="none" stroke={isActive ? `rgb(${accent})` : '#F4EEE0'} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={f.icon} /></svg>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* narrative panel */}
          <div className="relative z-30">
            <p className="eyebrow eyebrow--light">{config.eyebrow}</p>
            <h1 className="mt-4 max-w-xl font-serif text-display-sm font-medium text-mineral">{config.headline}</h1>

            {/* intro sub OR active-feature message */}
            <div className="mt-5 min-h-[132px]">
              {!started ? (
                <p className="max-w-lg text-[18px] leading-relaxed text-mineral/85">{config.sub}</p>
              ) : (
                <div key={active} className="max-w-lg animate-reveal-up">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `rgba(${accent},0.2)` }}>
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={`rgb(${accent})`} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={features[active].icon} /></svg>
                    </span>
                    <span className="font-mono text-[12px] uppercase tracking-[0.16em]" style={{ color: `rgb(${accent})` }}>
                      {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')} · {features[active].label}
                    </span>
                  </div>
                  <p className="mt-4 text-[22px] font-medium leading-snug text-mineral">{features[active].message}</p>
                </div>
              )}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href={config.primary.href} variant="light" arrow>{config.primary.label}</ButtonLink>
              <ButtonLink href={config.secondary.href} variant="ghost" className="!text-mineral hover:!text-cyan">{config.secondary.label}</ButtonLink>
            </div>

            {/* progress track */}
            <div className="mt-9 flex items-center gap-3">
              <div className="h-1 w-40 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full transition-[width] duration-150" style={{ width: `${Math.max(4, progress * 100)}%`, background: `rgb(${accent})` }} />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mineral/50">
                {started ? 'Keep scrolling' : 'Scroll to explore'}
              </span>
            </div>
          </div>
        </div>

        {/* sr-only content for accessibility */}
        <ul className="sr-only">
          {features.map((f) => <li key={f.label}>{f.label}: {f.message}</li>)}
        </ul>
      </div>
    </section>
  );
}

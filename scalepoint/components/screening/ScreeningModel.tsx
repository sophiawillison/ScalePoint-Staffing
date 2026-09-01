'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const STAGES = [
  {
    n: '01', title: 'Market Discovery',
    purpose: 'Define the mandate and map the relevant universe of leaders across the U.S. market.',
    detail:
      'We define the mandate, business context, target leadership profile, geography, sector, and adjacent talent pools — then map the relevant executive universe before narrowing to candidates.',
    output: 'Market map, target companies, initial executive universe, and a clear search thesis.',
    visual: 'universe',
  },
  {
    n: '02', title: 'Leadership Evidence',
    purpose: 'Review scope, outcomes, and executive evidence against the dimensions that matter.',
    detail:
      'We evaluate leadership scope rather than relying on job titles alone — business scale, transformation experience, team responsibility, outcomes, ownership environments, and operating complexity.',
    output: 'Evidence-led executive profiles with comparable leadership indicators.',
    visual: 'evidence',
  },
  {
    n: '03', title: 'Mandate Calibration',
    purpose: 'Assess alignment with the specific business challenge and organizational context.',
    detail:
      'We test each executive against the specific challenge you are hiring for — growth, turnaround, succession, transformation, international expansion, or operational discipline.',
    output: 'A calibrated fit assessment against your actual business requirement.',
    visual: 'radar',
  },
  {
    n: '04', title: 'Executive Engagement',
    purpose: 'Conduct discreet, context-rich conversations with a small, qualified group.',
    detail:
      'We approach a deliberately selected group through confidential conversations — understanding motivation, timing, ambition, and genuine interest before advancing anyone.',
    output: 'A qualified, genuinely engaged pool of executives.',
    visual: 'engage',
  },
  {
    n: '05', title: 'Selective Presentation',
    purpose: 'Present a deliberately small, qualified shortlist — evidence over volume.',
    detail:
      'We present a deliberately small shortlist supported by evidence, context, and search rationale — not a high volume of résumés for you to filter.',
    output: 'A decision-ready shortlist with a clear leadership comparison.',
    visual: 'shortlist',
  },
] as const;

const EVIDENCE = [
  'Enterprise Scope', 'P&L Responsibility', 'Team Scale', 'Transformation', 'M&A',
  'Board Exposure', 'Operating Complexity', 'Industry Context', 'Growth / Turnaround',
  'Public / Private / PE-Backed',
];

export function ScreeningModel() {
  const [active, setActive] = useState(0);
  const stage = STAGES[active];

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      {/* stage rail */}
      <ol className="relative">
        {STAGES.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.n}>
              <button
                onClick={() => setActive(i)}
                aria-current={on}
                className={cn(
                  'group flex w-full items-start gap-4 rounded-xl px-2 py-3 text-left transition-colors',
                  on ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]',
                )}
              >
                <span
                  className={cn(
                    'relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full font-mono text-[13px] transition-colors',
                    on ? 'bg-cyan text-carbon' : 'bg-navy text-mineral/60 ring-1 ring-white/10',
                  )}
                >
                  {s.n}
                </span>
                <span>
                  <span className={cn('block text-[16px] font-semibold', on ? 'text-mineral' : 'text-mineral/70')}>
                    {s.title}
                  </span>
                  <span className={cn('mt-0.5 block text-[13.5px] leading-snug', on ? 'text-mineral/70' : 'text-mineral/40')}>
                    {s.purpose}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* stage detail — real content, not only a graphic */}
      <div className="rounded-card-lg border border-white/10 bg-navy p-6 sm:p-8">
        <p className="eyebrow eyebrow--light">Stage {stage.n}</p>
        <h3 className="mt-2 text-title font-bold text-mineral">{stage.title}</h3>
        <p className="mt-4 text-[15.5px] leading-relaxed text-mineral/75">{stage.detail}</p>

        <div className="mt-6 rounded-xl border border-cyan/25 bg-cyan/[0.06] p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan/80">What you get</p>
          <p className="mt-1.5 text-[14.5px] leading-relaxed text-mineral/85">{stage.output}</p>
        </div>

        <div className="mt-6 flex min-h-[220px] flex-col justify-center border-t border-white/10 pt-6">
          <StageVisual kind={stage.visual} />
        </div>
      </div>
    </div>
  );
}

function StageVisual({ kind }: { kind: (typeof STAGES)[number]['visual'] }) {
  if (kind === 'universe') {
    return (
      <svg viewBox="0 0 320 170" className="w-full" role="img" aria-label="Search universe narrowing toward a mandate">
        {Array.from({ length: 26 }).map((_, i) => {
          const a = (i / 26) * Math.PI * 2;
          const rad = 52 + (i % 3) * 20;
          const x = 160 + Math.cos(a) * rad;
          const y = 85 + Math.sin(a) * (rad * 0.5);
          return <line key={i} x1={160} y1={85} x2={x} y2={y} stroke="#1E4636" strokeWidth={1} />;
        })}
        {Array.from({ length: 26 }).map((_, i) => {
          const a = (i / 26) * Math.PI * 2;
          const rad = 52 + (i % 3) * 20;
          const x = 160 + Math.cos(a) * rad;
          const y = 85 + Math.sin(a) * (rad * 0.5);
          return <circle key={i} cx={x} cy={y} r={i % 5 === 0 ? 3.2 : 1.9} fill={i % 5 === 0 ? '#2F8F72' : '#2F6B57'} />;
        })}
        <circle cx={160} cy={85} r={6.5} fill="#5FBE9C" />
      </svg>
    );
  }
  if (kind === 'evidence') {
    return (
      <ul className="grid grid-cols-2 gap-2">
        {EVIDENCE.map((e) => (
          <li key={e} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[13px] text-mineral/80">{e}</li>
        ))}
      </ul>
    );
  }
  if (kind === 'radar') {
    const dims = 6;
    const pts = Array.from({ length: dims }).map((_, i) => {
      const a = (i / dims) * Math.PI * 2 - Math.PI / 2;
      const r = 34 + ((i * 37) % 34);
      return [95 + Math.cos(a) * r, 80 + Math.sin(a) * r];
    });
    return (
      <svg viewBox="0 0 190 160" className="mx-auto w-[190px]" role="img" aria-label="Calibration across mandate dimensions (no numeric scoring)">
        {[26, 46, 66].map((r) => <circle key={r} cx={95} cy={80} r={r} fill="none" stroke="#1E4636" strokeWidth={1} />)}
        <polygon points={pts.map((p) => p.join(',')).join(' ')} fill="rgba(95,190,156,0.18)" stroke="#5FBE9C" strokeWidth={1.5} />
        {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={3} fill="#5FBE9C" />)}
      </svg>
    );
  }
  if (kind === 'engage') {
    const rows = [
      { t: 'Confidential conversation', s: 'Motivation, timing, and ambition' },
      { t: 'Context, not a pitch', s: 'What a move would need to offer' },
      { t: 'Genuine interest confirmed', s: 'Before anyone is advanced' },
    ];
    return (
      <ul className="space-y-3">
        {rows.map((r) => (
          <li key={r.t} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-cyan/15 text-cyan">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="block text-[14px] font-medium text-mineral/85">{r.t}</span>
              <span className="block text-[12.5px] text-mineral/55">{r.s}</span>
            </span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="space-y-2.5">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
          <span className="text-[14px] font-medium text-mineral/85">Qualified candidate {i + 1}</span>
          <span className="font-mono text-[11px] uppercase tracking-wide text-cyan/70">evidence-led</span>
        </div>
      ))}
    </div>
  );
}

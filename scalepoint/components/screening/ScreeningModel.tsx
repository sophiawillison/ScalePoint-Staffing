'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const STAGES = [
  {
    n: '01', title: 'Market Discovery',
    purpose: 'Define the mandate and map the relevant universe of leaders across the U.S. market.',
    visual: 'universe',
  },
  {
    n: '02', title: 'Leadership Evidence',
    purpose: 'Review scope, outcomes, and executive evidence against the dimensions that matter.',
    visual: 'evidence',
  },
  {
    n: '03', title: 'Mandate Calibration',
    purpose: 'Assess alignment with the specific business challenge and organizational context.',
    visual: 'radar',
  },
  {
    n: '04', title: 'Executive Engagement',
    purpose: 'Conduct discreet, context-rich conversations with a small, qualified group.',
    visual: 'engage',
  },
  {
    n: '05', title: 'Selective Presentation',
    purpose: 'Present a deliberately small, qualified shortlist — evidence over volume.',
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
      {/* stage rail — genuinely a sequence, so numbering is appropriate */}
      <ol className="relative">
        <span aria-hidden className="absolute left-[19px] top-3 bottom-3 w-px bg-white/10" />
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

      {/* stage visualization */}
      <div className="min-h-[320px] rounded-card-lg border border-white/10 bg-navy p-6">
        <p className="eyebrow eyebrow--light">Stage {stage.n}</p>
        <h3 className="mt-2 text-title font-bold text-mineral">{stage.title}</h3>
        <div className="mt-6">
          <StageVisual kind={stage.visual} />
        </div>
      </div>
    </div>
  );
}

function StageVisual({ kind }: { kind: (typeof STAGES)[number]['visual'] }) {
  if (kind === 'universe') {
    return (
      <svg viewBox="0 0 320 200" className="w-full" role="img" aria-label="Search universe narrowing toward a mandate">
        {Array.from({ length: 26 }).map((_, i) => {
          const a = (i / 26) * Math.PI * 2;
          const rad = 60 + (i % 3) * 22;
          const x = 160 + Math.cos(a) * rad;
          const y = 100 + Math.sin(a) * (rad * 0.55);
          return <line key={i} x1={160} y1={100} x2={x} y2={y} stroke="#1E3247" strokeWidth={1} />;
        })}
        {Array.from({ length: 26 }).map((_, i) => {
          const a = (i / 26) * Math.PI * 2;
          const rad = 60 + (i % 3) * 22;
          const x = 160 + Math.cos(a) * rad;
          const y = 100 + Math.sin(a) * (rad * 0.55);
          return <circle key={i} cx={x} cy={y} r={i % 5 === 0 ? 3.4 : 2} fill={i % 5 === 0 ? '#8EA9FF' : '#3A5674'} />;
        })}
        <circle cx={160} cy={100} r={7} fill="#79D0DD" />
      </svg>
    );
  }
  if (kind === 'evidence') {
    return (
      <ul className="grid grid-cols-2 gap-2">
        {EVIDENCE.map((e) => (
          <li key={e} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[13px] text-mineral/80">
            {e}
          </li>
        ))}
      </ul>
    );
  }
  if (kind === 'radar') {
    const dims = 6;
    const pts = Array.from({ length: dims }).map((_, i) => {
      const a = (i / dims) * Math.PI * 2 - Math.PI / 2;
      const r = 40 + ((i * 37) % 40);
      return [110 + Math.cos(a) * r, 100 + Math.sin(a) * r];
    });
    return (
      <svg viewBox="0 0 220 200" className="mx-auto w-[220px]" role="img" aria-label="Calibration across mandate dimensions (no numeric scoring)">
        {[30, 55, 80].map((r) => (
          <circle key={r} cx={110} cy={100} r={r} fill="none" stroke="#1E3247" strokeWidth={1} />
        ))}
        <polygon points={pts.map((p) => p.join(',')).join(' ')} fill="rgba(121,208,221,0.18)" stroke="#79D0DD" strokeWidth={1.5} />
        {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={3} fill="#79D0DD" />)}
      </svg>
    );
  }
  if (kind === 'engage') {
    return (
      <div className="space-y-3">
        {[70, 45, 60].map((w, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="h-8 w-8 flex-none rounded-full bg-white/[0.06] ring-1 ring-white/10" />
            <span className="h-8 rounded-full bg-white/[0.05]" style={{ width: `${w}%` }} />
          </div>
        ))}
        <p className="pt-2 text-[13px] text-mineral/60">Discreet, context-rich conversations — not a mass outreach funnel.</p>
      </div>
    );
  }
  // shortlist
  return (
    <div className="space-y-2.5">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
          <span className="text-[14px] font-medium text-mineral/85">Qualified candidate {i + 1}</span>
          <span className="font-mono text-[11px] uppercase tracking-wide text-cyan/70">evidence-led</span>
        </div>
      ))}
      <p className="pt-1 text-[13px] text-mineral/60">A deliberately small shortlist, presented with evidence.</p>
    </div>
  );
}

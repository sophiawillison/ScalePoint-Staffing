'use client';

import { useMemo, useState } from 'react';
import {
  LEADERSHIP_FUNCTIONS, INDUSTRIES, EXPERIENCE_BANDS, LEADERSHIP_LEVELS,
} from '@/data/taxonomy';
import { MARKETS } from '@/data/markets';
import { cn } from '@/lib/utils';
import { track } from '@/lib/analytics';

const ROWS = LEADERSHIP_FUNCTIONS.slice(0, 10);
const COLS = INDUSTRIES.slice(0, 8);

// Deterministic, conceptual intensity (0..1). Not a candidate count — illustrative overlap.
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 1000) / 1000;
}

export function TalentMatrix() {
  const [fn, setFn] = useState<string>('all');
  const [exp, setExp] = useState<string>(EXPERIENCE_BANDS[1]);
  const [level, setLevel] = useState<string>('all');
  const [market, setMarket] = useState<string>('all');

  const onFilter = (name: string, setter: (v: string) => void) => (v: string) => {
    setter(v);
    track('talent_matrix_filter_changed', { filter: name });
  };

  const cells = useMemo(() => {
    const expIdx = EXPERIENCE_BANDS.indexOf(exp as never);
    return ROWS.map((r) =>
      COLS.map((c) => {
        let v = hash(`${r}|${c}|${expIdx}|${level}|${market}`);
        // gentle emphasis when a row filter is active
        if (fn !== 'all' && r === fn) v = Math.min(1, v + 0.25);
        return v;
      }),
    );
  }, [fn, exp, level, market]);

  return (
    <div>
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Select label="Function" value={fn} onChange={onFilter('function', setFn)}
          options={['all', ...ROWS]} allLabel="All functions" />
        <Select label="Experience" value={exp} onChange={onFilter('experience', setExp)}
          options={[...EXPERIENCE_BANDS]} />
        <Select label="Leadership level" value={level} onChange={onFilter('level', setLevel)}
          options={['all', ...LEADERSHIP_LEVELS]} allLabel="All levels" />
        <Select label="Location" value={market} onChange={onFilter('location', setMarket)}
          options={['all', ...MARKETS.map((m) => m.city)]} allLabel="All U.S. markets" />
      </div>

      {/* horizontal scroll on small screens (spec §5) */}
      <div className="overflow-x-auto rounded-card-lg border border-mist bg-surface">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <caption className="sr-only">
            Illustrative model of how leadership functions intersect with industries. Colour intensity is
            conceptual and does not represent candidate counts.
          </caption>
          <thead>
            <tr>
              <th scope="col" className="sticky left-0 z-10 bg-surface px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-wide text-slate">
                Function ╲ Industry
              </th>
              {COLS.map((c) => (
                <th key={c} scope="col" className={cn('px-2 py-3 text-center text-[12px] font-medium text-slate')}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, ri) => (
              <tr key={r} className={cn(fn !== 'all' && r === fn && 'bg-periwinkle/[0.04]')}>
                <th scope="row" className="sticky left-0 z-10 bg-surface px-4 py-2.5 text-left text-[13px] font-semibold text-ink">
                  {r}
                </th>
                {COLS.map((c, ci) => {
                  const v = cells[ri][ci];
                  return (
                    <td key={c} className="px-1.5 py-1.5">
                      <div
                        title={`${r} × ${c} — illustrative overlap`}
                        className="mx-auto h-8 w-full rounded-md transition-all duration-[350ms] ease-premium"
                        style={{
                          backgroundColor: `rgba(47,143,114,${0.10 + v * 0.72})`,
                          boxShadow: v > 0.72 ? 'inset 0 0 0 1px rgba(197,165,106,0.5)' : 'none',
                        }}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate">
          Illustrative / Demo Data — conceptual overlap, not candidate counts
        </p>
        <div className="flex items-center gap-2 text-[12px] text-slate">
          <span>Lower</span>
          <span className="h-3 w-24 rounded" style={{ background: 'linear-gradient(90deg, rgba(47,143,114,0.12), rgba(47,143,114,0.82))' }} />
          <span>Higher</span>
        </div>
      </div>
    </div>
  );
}

function Select({
  label, value, onChange, options, allLabel,
}: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; allLabel?: string;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="field-input appearance-none">
        {options.map((o) => (
          <option key={o} value={o}>{o === 'all' ? allLabel ?? 'All' : o}</option>
        ))}
      </select>
    </label>
  );
}

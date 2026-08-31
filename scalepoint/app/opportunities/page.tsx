'use client';

import { useMemo, useState } from 'react';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { OPPORTUNITIES } from '@/data/opportunities';
import { REGIONS, WORK_MODELS, LEADERSHIP_LEVELS } from '@/data/taxonomy';
import { cn } from '@/lib/utils';

const FUNCTIONS = Array.from(new Set(OPPORTUNITIES.map((o) => o.function)));

export default function OpportunitiesPage() {
  const [region, setRegion] = useState('all');
  const [fn, setFn] = useState('all');
  const [model, setModel] = useState('all');
  const [level, setLevel] = useState('all');

  const filtered = useMemo(
    () =>
      OPPORTUNITIES.filter(
        (o) =>
          (region === 'all' || o.region === region) &&
          (fn === 'all' || o.function === fn) &&
          (model === 'all' || o.workModel === model) &&
          (level === 'all' || o.leadershipLevel === level),
      ),
    [region, fn, model, level],
  );

  return (
    <>
      <header className="bg-carbon on-dark pb-16 pt-36">
        <div className="shell">
          <p className="eyebrow eyebrow--light">Confidential Opportunities</p>
          <h1 className="mt-4 max-w-3xl font-serif text-display-sm font-medium text-mineral">
            Current leadership mandates.
          </h1>
          <p className="mt-5 max-w-xl text-[17px] text-mineral/70">
            Organizations are described by type and context — never named — until a conversation is warranted.
            Apply confidentially; no account required.
          </p>
        </div>
      </header>

      <div className="shell py-section-sm">
        <div className="grid gap-3 rounded-card-lg border border-mist bg-surface p-4 sm:grid-cols-2 lg:grid-cols-4">
          <Filter label="Region" value={region} onChange={setRegion} options={REGIONS} allLabel="All regions" />
          <Filter label="Function" value={fn} onChange={setFn} options={FUNCTIONS} allLabel="All functions" />
          <Filter label="Work model" value={model} onChange={setModel} options={WORK_MODELS} allLabel="All models" />
          <Filter label="Level" value={level} onChange={setLevel} options={LEADERSHIP_LEVELS} allLabel="All levels" />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-[14px] text-slate">
            Showing {filtered.length} of {OPPORTUNITIES.length} sample opportunities
          </p>
          {(region !== 'all' || fn !== 'all' || model !== 'all' || level !== 'all') && (
            <button onClick={() => { setRegion('all'); setFn('all'); setModel('all'); setLevel('all'); }}
              className="text-[14px] font-medium text-ink hover:text-slate">Clear filters</button>
          )}
        </div>

        {filtered.length ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((o, i) => <OpportunityCard key={o.id} o={o} index={OPPORTUNITIES.indexOf(o)} />)}
          </div>
        ) : (
          <div className="mt-10 rounded-card-lg border border-dashed border-mist p-12 text-center">
            <p className="text-[16px] text-ink">No opportunities match these filters.</p>
            <p className="mt-1 text-[14px] text-slate">Try widening your selection, or share your profile so we can reach out when a fit appears.</p>
          </div>
        )}

        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-slate">
          Sample opportunities — illustrative, confidential
        </p>
      </div>
    </>
  );
}

function Filter({ label, value, onChange, options, allLabel }: {
  label: string; value: string; onChange: (v: string) => void; options: readonly string[]; allLabel: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[12px] font-semibold uppercase tracking-wide text-slate">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className={cn('w-full rounded-lg border border-mist bg-white px-3 py-2.5 text-[14px] text-ink focus:border-periwinkle focus:outline-none focus:ring-4 focus:ring-periwinkle/15')}>
        <option value="all">{allLabel}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

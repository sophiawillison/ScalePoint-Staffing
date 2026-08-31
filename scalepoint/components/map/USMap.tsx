'use client';

import { useMemo, useState, useId } from 'react';
import { geoAlbersUsa, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Feature, Geometry } from 'geojson';
import topo from '@/data/us-states-10m.json';
import { MARKETS, type Market } from '@/data/markets';
import { EMPLOYER_LENSES } from '@/data/taxonomy';
import { cn } from '@/lib/utils';
import { track } from '@/lib/analytics';

const WIDTH = 960;
const HEIGHT = 600;

type LensId = (typeof EMPLOYER_LENSES)[number]['id'];

export function USMap({ variant = 'executive' }: { variant?: 'executive' | 'employer' }) {
  const uid = useId();
  const [selected, setSelected] = useState<Market>(MARKETS[0]);
  const [lens, setLens] = useState<LensId | 'all'>('all');

  // Build state paths + projected market positions once.
  const { statePaths, points } = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fc = feature(topo as any, (topo as any).objects.states) as unknown as {
      features: Feature<Geometry>[];
    };
    const projection = geoAlbersUsa().fitSize([WIDTH, HEIGHT], fc as never);
    const path = geoPath(projection);
    const statePaths = fc.features.map((f, i) => ({ d: path(f) ?? '', key: `${f.id ?? i}` }));
    const points = MARKETS.map((m) => {
      const p = projection([m.lon, m.lat]);
      return { m, x: p?.[0] ?? -100, y: p?.[1] ?? -100 };
    });
    return { statePaths, points };
  }, []);

  const isEmployer = variant === 'employer';

  const intensity = (m: Market): number => {
    if (!isEmployer || lens === 'all') return 0.6;
    return m.lenses[lens] ?? 0.12;
  };

  const select = (m: Market) => {
    setSelected(m);
    track('talent_map_market_selected', { market: m.id, region: m.region, variant });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <div>
        {isEmployer && (
          <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Leadership lens">
            <LensChip active={lens === 'all'} onClick={() => setLens('all')}>All leadership</LensChip>
            {EMPLOYER_LENSES.map((l) => (
              <LensChip key={l.id} active={lens === l.id} onClick={() => setLens(l.id)}>
                {l.label}
              </LensChip>
            ))}
          </div>
        )}

        <div className="relative overflow-hidden rounded-card-lg border border-white/10 bg-navy">
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="h-auto w-full"
            role="img"
            aria-label="Map of the United States showing major executive markets. Select a market to see its context."
          >
            <g>
              {statePaths.map((s) => (
                <path
                  key={s.key}
                  d={s.d}
                  fill="#0F1E2E"
                  stroke="#1E3247"
                  strokeWidth={0.7}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </g>
            <g>
              {points.map(({ m, x, y }) => {
                const active = m.id === selected.id;
                const t = intensity(m);
                const r = 4 + t * 6;
                return (
                  <g key={m.id} transform={`translate(${x},${y})`}>
                    {active && (
                      <circle r={r + 4} fill="none" stroke="#79D0DD" strokeWidth={1.5} className="motion-safe:animate-halo" />
                    )}
                    <circle
                      r={r}
                      fill={active ? '#79D0DD' : '#8EA9FF'}
                      fillOpacity={active ? 1 : 0.35 + t * 0.5}
                      stroke={active ? '#050A10' : 'transparent'}
                      strokeWidth={1.5}
                      tabIndex={0}
                      role="button"
                      aria-pressed={active}
                      aria-label={`${m.city}, ${m.state} — ${m.region}`}
                      style={{ cursor: 'pointer', outline: 'none' }}
                      onClick={() => select(m)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          select(m);
                        }
                      }}
                    />
                    {active && (
                      <text x={r + 8} y={4} fontSize={15} fontWeight={600} fill="#F3F1EB">
                        {m.city}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
          <p className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.14em] text-cyan/70">
            Illustrative Market View — sample data
          </p>
        </div>

        {/* touch/keyboard-friendly market list (does not depend on hover) */}
        <div className="mt-4 flex flex-wrap gap-1.5" aria-label="All markets">
          {MARKETS.map((m) => (
            <button
              key={m.id}
              onClick={() => select(m)}
              aria-pressed={m.id === selected.id}
              className={cn(
                'rounded-full border px-2.5 py-1 text-[12px] transition-colors',
                m.id === selected.id
                  ? 'border-cyan bg-cyan/15 text-cyan'
                  : 'border-mist/70 text-slate hover:border-ink hover:text-ink',
              )}
            >
              {m.city}
            </button>
          ))}
        </div>
      </div>

      {/* market context panel */}
      <aside
        aria-live="polite"
        aria-labelledby={`${uid}-market`}
        className="self-start rounded-card-lg border border-mist bg-surface p-6"
      >
        <p className="eyebrow eyebrow--brass">{selected.region}</p>
        <h3 id={`${uid}-market`} className="mt-2 text-title font-bold text-ink">
          {selected.city}, {selected.state}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-slate">{selected.context}</p>

        <div className="mt-5">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-ink/70">Prominent sectors</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {selected.sectors.map((s) => (
              <span key={s} className="rounded-md bg-mineral px-2 py-1 text-[12px] text-ink">{s}</span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-ink/70">Leadership focus</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {selected.functions.map((f) => (
              <span key={f} className="rounded-md border border-mist px-2 py-1 text-[12px] text-slate">{f}</span>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

function LensChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors',
        active ? 'border-cyan bg-cyan/15 text-cyan' : 'border-white/15 text-mineral/70 hover:text-mineral',
      )}
    >
      {children}
    </button>
  );
}

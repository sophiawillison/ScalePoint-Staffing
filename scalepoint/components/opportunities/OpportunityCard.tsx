'use client';

import Link from 'next/link';
import type { Opportunity } from '@/data/opportunities';
import { track } from '@/lib/analytics';

export function OpportunityCard({ o, index }: { o: Opportunity; index?: number }) {
  return (
    <Link
      href={`/opportunities/${o.slug}`}
      onClick={() => track('opportunity_viewed', { slug: o.slug, function: o.function, region: o.region })}
      className="group relative flex h-full flex-col rounded-card-lg border border-mist bg-surface p-6 transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-[0_10px_40px_-24px_rgba(15,24,34,0.4)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brass">
            Confidential {typeof index === 'number' ? `· ${String(index + 1).padStart(2, '0')}` : ''}
          </p>
          <h3 className="mt-2 text-[19px] font-bold leading-tight text-ink">{o.title}</h3>
          <p className="mt-1 text-[14px] text-slate">{o.organizationType}</p>
        </div>
        <span aria-hidden className="text-slate transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink">→</span>
      </div>

      {/* clamped so one long description can’t make a card much taller */}
      <p className="mt-4 line-clamp-2 min-h-[2.9em] text-[15px] leading-relaxed text-ink/80">{o.brief}</p>

      {/* footer pinned to the bottom so metadata + tags align across the row */}
      <div className="mt-auto pt-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] text-slate">
          <span className="font-medium text-ink">{o.city}, {o.state}</span>
          <Dot /> <span>{o.workModel}</span>
          <Dot /> <span>{o.experienceRequired}</span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <Tag>{o.industry}</Tag>
          <Tag>{o.leadershipLevel}</Tag>
          <span className="ml-auto text-[13px] font-medium text-ink/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {o.compensation.split('+')[0].trim()}
          </span>
        </div>
      </div>
    </Link>
  );
}

const Dot = () => <span aria-hidden className="text-mist">•</span>;
const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-md bg-mineral px-2 py-0.5 text-[12px] text-ink">{children}</span>
);

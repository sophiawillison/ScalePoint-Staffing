import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { OPPORTUNITIES, opportunityBySlug } from '@/data/opportunities';
import { ExecutiveApplicationForm } from '@/components/forms/ExecutiveApplicationForm';

export function generateStaticParams() {
  return OPPORTUNITIES.map((o) => ({ slug: o.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const o = opportunityBySlug(params.slug);
  if (!o) return { title: 'Opportunity' };
  return { title: `${o.title} — ${o.city}, ${o.state}`, description: o.brief };
}

export default function OpportunityDetail({ params }: { params: { slug: string } }) {
  const o = opportunityBySlug(params.slug);
  if (!o) notFound();

  const facts: [string, string][] = [
    ['Location', `${o.city}, ${o.state}`],
    ['Region', o.region],
    ['Work model', o.workModel],
    ['Experience', o.experienceRequired],
    ['Leadership level', o.leadershipLevel],
    ['Industry', o.industry],
    ['Function', o.function],
    ['Compensation (USD)', o.compensation],
  ];

  return (
    <>
      <header className="bg-carbon on-dark pb-16 pt-36">
        <div className="shell">
          <Link href="/opportunities" className="text-[14px] text-mineral/60 hover:text-mineral">← All opportunities</Link>
          <p className="eyebrow eyebrow--light mt-6">Confidential · {o.id}</p>
          <h1 className="mt-3 max-w-3xl font-serif text-display-sm font-medium text-mineral">{o.title}</h1>
          <p className="mt-4 text-[17px] text-mineral/75">{o.organizationType}</p>
          <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-mineral/70">{o.brief}</p>
        </div>
      </header>

      <div className="shell grid gap-12 py-section-sm lg:grid-cols-[1.6fr_1fr]">
        <article className="max-w-prose">
          <Block title="Overview"><p className="text-[16px] leading-relaxed text-ink/85">{o.overview}</p></Block>
          <Block title="Key responsibilities"><List items={o.responsibilities} /></Block>
          <Block title="Ideal profile"><List items={o.idealProfile} /></Block>
          <Block title="Required experience"><List items={o.requiredExperience} /></Block>
          <Block title="Preferred experience"><List items={o.preferredExperience} /></Block>

          <p className="mt-10 rounded-card border border-mist bg-mineral p-4 font-mono text-[11px] uppercase tracking-[0.14em] text-slate">
            Sample opportunity — illustrative and confidential. Organization intentionally unnamed.
          </p>
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-card-lg border border-mist bg-surface p-6">
            <h2 className="text-[13px] font-semibold uppercase tracking-wide text-slate">At a glance</h2>
            <dl className="mt-4 space-y-3">
              {facts.map(([k, val]) => (
                <div key={k} className="flex flex-col border-b border-mist pb-3 last:border-0 last:pb-0">
                  <dt className="text-[12px] uppercase tracking-wide text-slate">{k}</dt>
                  <dd className="mt-0.5 text-[15px] font-medium text-ink">{val}</dd>
                </div>
              ))}
            </dl>
            <a href="#apply" className="mt-6 block w-full rounded-[12px] bg-ink px-6 py-3.5 text-center text-[15px] font-semibold text-mineral transition-colors hover:bg-carbon">
              Apply Confidentially →
            </a>
          </div>
        </aside>
      </div>

      <section id="apply" className="bg-surface py-section">
        <div className="shell max-w-3xl">
          <p className="eyebrow eyebrow--brass">Confidential application</p>
          <h2 className="mt-3 text-heading font-bold text-ink">Apply for this mandate.</h2>
          <p className="mt-4 max-w-prose text-[16px] text-slate">
            Your application is reviewed for fit against this specific opportunity. Providing current compensation
            is optional. No account required.
          </p>
          <div className="mt-10">
            <ExecutiveApplicationForm slug={o.slug} title={o.title} />
          </div>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 first:mt-0">
      <h2 className="text-[13px] font-semibold uppercase tracking-wide text-brass">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3 text-[16px] leading-relaxed text-ink/85">
          <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-periwinkle" />{it}
        </li>
      ))}
    </ul>
  );
}

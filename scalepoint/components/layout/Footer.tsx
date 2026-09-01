'use client';

import Link from 'next/link';
import { config } from '@/lib/config';
import { useAudience, CTA, primaryHref } from '@/components/layout/AudienceProvider';
import { ButtonLink } from '@/components/ui/Button';

export function Footer() {
  const { audience } = useAudience();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-carbon on-dark">
      <div className="shell py-section-sm">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[20px] font-extrabold tracking-tight text-mineral">{config.brandShort}</span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-mineral/50">Staffing</span>
            </div>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-mineral/70">
              U.S.-focused executive recruitment and talent intelligence. Confidential by design, with no
              account required to explore opportunities or brief a search.
            </p>
            <div className="mt-6">
              <ButtonLink href={primaryHref(audience)} variant="light" arrow>
                {CTA[audience].final}
              </ButtonLink>
            </div>
          </div>

          <nav aria-label="Explore" className="text-[15px]">
            <p className="eyebrow eyebrow--light mb-4">Explore</p>
            <ul className="space-y-2.5 text-mineral/75">
              <li><Link href="/for-executives" className="hover:text-mineral">For Executives</Link></li>
              <li><Link href="/for-employers" className="hover:text-mineral">For Employers</Link></li>
              <li><Link href="/opportunities" className="hover:text-mineral">Opportunities</Link></li>
              <li><Link href="/talent-intelligence" className="hover:text-mineral">Talent Intelligence</Link></li>
              <li><Link href="/about" className="hover:text-mineral">About</Link></li>
              <li><Link href="/contact" className="hover:text-mineral">Contact</Link></li>
            </ul>
          </nav>

          <div className="text-[15px]">
            <p className="eyebrow eyebrow--light mb-4">Contact</p>
            <ul className="space-y-2.5 text-mineral/75">
              {config.contactPhone && <li>{config.contactPhone}</li>}
              <li>
                <a href={`mailto:${config.privacyEmail}`} className="hover:text-mineral">
                  Privacy &amp; data requests
                </a>
              </li>
              {config.companyAddress && <li className="max-w-[16rem] text-mineral/60">{config.companyAddress}</li>}
            </ul>
          </div>
        </div>

        <div className="rule-brass mt-12 pt-6 text-[13px] text-mineral/55">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} {config.brandName}. U.S. executive search.</p>
            <div className="flex gap-5">
              <Link href="/privacy" className="hover:text-mineral">Privacy</Link>
              <Link href="/terms" className="hover:text-mineral">Terms</Link>
            </div>
          </div>
          <p className="mt-4 text-mineral/40">
            Sample opportunities and market visualizations are illustrative and clearly labeled. We make no
            claims about placement rates, network size, response times, or absolute confidentiality.
          </p>
        </div>
      </div>
    </footer>
  );
}

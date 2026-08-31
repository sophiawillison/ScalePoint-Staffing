'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { config } from '@/lib/config';
import { cn } from '@/lib/utils';
import { SegmentedSwitch } from '@/components/ui/SegmentedSwitch';
import { ButtonLink } from '@/components/ui/Button';
import { useAudience, CTA, primaryHref } from '@/components/layout/AudienceProvider';

const NAV = [
  { href: '/', label: 'Executive', exec: true },
  { href: '/opportunities', label: 'Opportunities', exec: true },
  { href: '/talent-intelligence', label: 'Talent Intelligence' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const { audience } = useAudience();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const primaryLabel = CTA[audience].primary;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-premium',
        scrolled ? 'bg-mineral/85 backdrop-blur-md border-b border-mist' : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="shell flex h-[68px] items-center justify-between gap-4">
        <Link href="/" className="flex items-baseline gap-2" aria-label={`${config.brandName} — home`}>
          <span className="text-[19px] font-extrabold tracking-tight text-ink">{config.brandShort}</span>
          <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-slate sm:inline">
            Staffing
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-[14px] font-medium transition-colors duration-200',
                  active ? 'text-ink' : 'text-slate hover:text-ink',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <SegmentedSwitch size="sm" />
          <ButtonLink href={primaryHref(audience)} variant="primary" arrow className="!px-5 !py-2.5 !text-[14px]">
            {primaryLabel}
          </ButtonLink>
        </div>

        {/* mobile trigger */}
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-mist md:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-5">
            <span className={cn('absolute left-0 top-0 h-0.5 w-5 bg-ink transition-transform', open && 'translate-y-1.5 rotate-45')} />
            <span className={cn('absolute bottom-0 left-0 h-0.5 w-5 bg-ink transition-transform', open && '-translate-y-1 -rotate-45')} />
          </span>
        </button>
      </div>

      {/* mobile sheet */}
      <div
        className={cn(
          'md:hidden overflow-hidden border-t border-mist bg-mineral transition-[max-height] duration-300 ease-premium',
          open ? 'max-h-[80vh]' : 'max-h-0',
        )}
      >
        <div className="shell space-y-5 py-6">
          <SegmentedSwitch className="w-full [&>button]:w-full" />
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="border-b border-mist py-3 text-[15px] text-ink">
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="py-3 text-[15px] text-ink">Contact</Link>
          </nav>
          <ButtonLink href={primaryHref(audience)} variant="primary" arrow className="w-full">
            {primaryLabel}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

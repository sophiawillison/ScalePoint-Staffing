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
  { href: '/', label: 'Executive' },
  { href: '/opportunities', label: 'Opportunities' },
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

  // Every page opens on a dark hero, so at the top the header sits over dark and
  // must use light text. Once scrolled (glass light background) it uses dark text.
  const overDark = !scrolled && !open;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-premium',
        scrolled || open ? 'bg-mineral/85 backdrop-blur-md border-b border-mist' : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="shell flex h-[68px] items-center justify-between gap-4">
        {/* Stacked wordmark: ScalePoint over STAFFING */}
        <Link href="/" className="flex flex-col leading-none" aria-label={`${config.brandName} — home`}>
          <span className={cn('text-[19px] font-extrabold tracking-tight', overDark ? 'text-mineral' : 'text-ink')}>
            {config.brandShort}
          </span>
          <span className={cn('mt-0.5 text-[9px] font-semibold uppercase tracking-[0.32em]', overDark ? 'text-mineral/55' : 'text-slate')}>
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
                  'relative text-[14px] font-medium transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-current after:transition-all after:duration-300',
                  active ? 'after:w-full' : 'after:w-0 hover:after:w-full',
                  overDark
                    ? active ? 'text-mineral' : 'text-mineral/75 hover:text-mineral'
                    : active ? 'text-ink' : 'text-slate hover:text-ink',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <SegmentedSwitch size="sm" onDark={overDark} audience={audience} />
          <ButtonLink
            href={primaryHref(audience)}
            variant={overDark ? 'light' : 'primary'}
            arrow
            className="!px-5 !py-2.5 !text-[13.5px] whitespace-nowrap"
          >
            {CTA[audience].primary}
          </ButtonLink>
        </div>

        <button
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-lg border md:hidden',
            overDark ? 'border-white/25' : 'border-mist',
          )}
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-5">
            <span className={cn('absolute left-0 top-0 h-0.5 w-5 transition-transform', overDark ? 'bg-mineral' : 'bg-ink', open && 'translate-y-1.5 rotate-45')} />
            <span className={cn('absolute bottom-0 left-0 h-0.5 w-5 transition-transform', overDark ? 'bg-mineral' : 'bg-ink', open && '-translate-y-1 -rotate-45')} />
          </span>
        </button>
      </div>

      <div
        className={cn(
          'md:hidden overflow-hidden border-t bg-mineral transition-[max-height] duration-300 ease-premium',
          open ? 'max-h-[80vh] border-mist' : 'max-h-0 border-transparent',
        )}
      >
        <div className="shell space-y-5 py-6">
          <SegmentedSwitch className="w-full [&>button]:w-full" audience={audience} />
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="border-b border-mist py-3 text-[15px] text-ink">
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="py-3 text-[15px] text-ink">Contact</Link>
          </nav>
          <ButtonLink href={primaryHref(audience)} variant="primary" arrow className="w-full">
            {CTA[audience].primary}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'light';
type Common = {
  variant?: Variant;
  arrow?: boolean;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
};

const base =
  'group inline-flex items-center justify-center gap-2 rounded-[12px] px-6 py-3.5 text-[15px] font-semibold ' +
  'transition-all duration-200 ease-premium focus-visible:outline-none disabled:opacity-55 disabled:pointer-events-none select-none';

const variants: Record<Variant, string> = {
  // Interactive accent lives on the ink surface; brass stays a hairline accent, not a fill.
  primary: 'bg-ink text-mineral hover:bg-carbon active:translate-y-px shadow-[0_1px_0_0_rgba(197,165,106,0.35)_inset]',
  secondary: 'border border-mist bg-surface text-ink hover:border-ink hover:bg-white active:translate-y-px',
  ghost: 'text-ink hover:text-slate',
  light: 'bg-mineral text-carbon hover:bg-white active:translate-y-px',
};

function Inner({ arrow, loading, children }: { arrow?: boolean; loading?: boolean; children: React.ReactNode }) {
  return (
    <>
      {loading && (
        <span
          aria-hidden
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70"
        />
      )}
      <span>{children}</span>
      {arrow && !loading && (
        <span aria-hidden className="transition-transform duration-200 ease-premium group-hover:translate-x-1">
          →
        </span>
      )}
    </>
  );
}

export function Button({
  variant = 'primary',
  arrow,
  loading,
  className,
  children,
  ...rest
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} disabled={loading || rest.disabled} {...rest}>
      <Inner arrow={arrow} loading={loading}>
        {children}
      </Inner>
    </button>
  );
}

export function ButtonLink({
  href,
  variant = 'primary',
  arrow,
  className,
  children,
  onClick,
}: Common & { href: string; onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} className={cn(base, variants[variant], className)}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
}

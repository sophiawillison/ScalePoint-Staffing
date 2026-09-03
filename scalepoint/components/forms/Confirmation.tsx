'use client';

import { ButtonLink } from '@/components/ui/Button';

export function Confirmation({
  title, message, referenceId, primaryHref, primaryLabel, secondaryHref, secondaryLabel,
}: {
  title: string;
  message: string;
  referenceId: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <div className="mx-auto max-w-xl rounded-card-lg border border-mist bg-surface p-8 text-center sm:p-12">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-periwinkle/12">
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-periwinkle" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <h2 className="mt-6 text-heading font-bold text-ink">{title}</h2>
      <p className="mx-auto mt-3 max-w-prose text-[16px] leading-relaxed text-slate">{message}</p>
      <p className="mt-5 inline-block rounded-lg bg-mineral px-4 py-2 font-mono text-[13px] text-ink">
        Reference: {referenceId}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href={primaryHref} variant="primary" arrow>{primaryLabel}</ButtonLink>
        {secondaryHref && secondaryLabel && (
          <ButtonLink href={secondaryHref} variant="secondary">{secondaryLabel}</ButtonLink>
        )}
      </div>
    </div>
  );
}

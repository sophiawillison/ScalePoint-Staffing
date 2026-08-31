'use client';

import { useAudience, type Audience } from '@/components/layout/AudienceProvider';
import { cn } from '@/lib/utils';

const OPTIONS: { id: Audience; label: string }[] = [
  { id: 'executive', label: 'Executive' },
  { id: 'employer', label: 'Employer' },
];

export function SegmentedSwitch({
  size = 'md',
  onDark = false,
  source = 'header',
  className,
}: {
  size?: 'sm' | 'md';
  onDark?: boolean;
  source?: string;
  className?: string;
}) {
  const { audience, setAudience } = useAudience();
  const idx = OPTIONS.findIndex((o) => o.id === audience);

  return (
    <div
      role="tablist"
      aria-label="Choose experience"
      className={cn(
        'relative inline-grid grid-cols-2 rounded-full p-1',
        onDark ? 'bg-white/[0.06] ring-1 ring-white/10' : 'bg-ink/[0.05] ring-1 ring-mist',
        className,
      )}
    >
      {/* sliding thumb — 300–500ms intentional transition (spec §2) */}
      <span
        aria-hidden
        className={cn(
          'absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-transform duration-[400ms] ease-premium',
          onDark ? 'bg-mineral' : 'bg-ink',
        )}
        style={{ transform: `translateX(${idx * 100}%)`, left: 4 }}
      />
      {OPTIONS.map((o) => {
        const active = o.id === audience;
        return (
          <button
            key={o.id}
            role="tab"
            aria-selected={active}
            onClick={() => setAudience(o.id, source)}
            className={cn(
              'relative z-10 rounded-full font-semibold tracking-wide transition-colors duration-300',
              size === 'sm' ? 'px-4 py-1.5 text-[13px]' : 'px-6 py-2 text-sm',
              active
                ? onDark ? 'text-carbon' : 'text-mineral'
                : onDark ? 'text-mineral/70 hover:text-mineral' : 'text-slate hover:text-ink',
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

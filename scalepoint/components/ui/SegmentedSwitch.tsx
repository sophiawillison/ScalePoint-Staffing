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
  audience: audienceProp,
}: {
  size?: 'sm' | 'md';
  onDark?: boolean;
  source?: string;
  className?: string;
  audience?: Audience;
}) {
  const ctx = useAudience();
  const audience = audienceProp ?? ctx.audience;
  const idx = OPTIONS.findIndex((o) => o.id === audience);

  // Employer mode gets a distinct accent thumb; executive stays ink/mineral.
  const thumbColor = onDark
    ? 'bg-mineral'
    : audience === 'employer'
      ? 'bg-plum'
      : 'bg-ink';
  const activeText = onDark
    ? audience === 'employer' ? 'text-plum' : 'text-carbon'
    : 'text-mineral';

  const seg = size === 'sm' ? 'min-w-[94px] px-4 py-1.5 text-[13px]' : 'min-w-[112px] px-6 py-2 text-sm';

  return (
    <div
      role="tablist"
      aria-label="Choose experience"
      className={cn(
        'relative inline-flex rounded-full p-1',
        onDark ? 'bg-white/[0.08] ring-1 ring-white/15' : 'bg-ink/[0.05] ring-1 ring-mist',
        className,
      )}
    >
      {/* sliding thumb — animates via left so it can never clip the label */}
      <span
        aria-hidden
        className={cn('absolute top-1 bottom-1 rounded-full transition-[left] duration-[380ms] ease-premium', thumbColor)}
        style={{ left: idx === 0 ? 4 : '50%', width: 'calc(50% - 4px)' }}
      />
      {OPTIONS.map((o) => {
        const active = o.id === audience;
        return (
          <button
            key={o.id}
            role="tab"
            aria-selected={active}
            onClick={() => ctx.setAudience(o.id, source)}
            className={cn(
              'relative z-10 whitespace-nowrap rounded-full text-center font-semibold tracking-wide transition-colors duration-300',
              seg,
              active
                ? activeText
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

'use client';

import { cn } from '@/lib/utils';

export function Stepper({ steps, current, onJump }: { steps: string[]; current: number; onJump?: (i: number) => void }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-2" aria-label="Progress">
      {steps.map((s, i) => {
        const done = i < current;
        const on = i === current;
        return (
          <li key={s} className="flex items-center gap-2">
            <button
              type="button"
              disabled={!onJump || i > current}
              onClick={() => onJump?.(i)}
              aria-current={on ? 'step' : undefined}
              className={cn(
                'flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors',
                on ? 'bg-ink text-mineral' : done ? 'text-ink hover:bg-mineral' : 'text-slate',
                onJump && i <= current ? 'cursor-pointer' : 'cursor-default',
              )}
            >
              <span className={cn(
                'flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-mono',
                on ? 'bg-mineral text-ink' : done ? 'bg-ink text-mineral' : 'bg-mist text-slate',
              )}>
                {done ? '✓' : i + 1}
              </span>
              <span className="hidden sm:inline">{s}</span>
            </button>
            {i < steps.length - 1 && <span aria-hidden className="h-px w-4 bg-mist" />}
          </li>
        );
      })}
    </ol>
  );
}

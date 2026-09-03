'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export type FaqItem = { q: string; a: string };

export function FAQ({ items, dark = false }: { items: FaqItem[]; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={cn('divide-y', dark ? 'divide-white/10' : 'divide-mist')}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className={cn('text-[17px] font-semibold', dark ? 'text-mineral' : 'text-ink')}>{it.q}</span>
              <span
                className={cn(
                  'flex h-8 w-8 flex-none items-center justify-center rounded-full border text-lg transition-transform duration-300',
                  dark ? 'border-white/20 text-mineral' : 'border-mist text-ink',
                  isOpen && 'rotate-45',
                )}
                aria-hidden
              >
                +
              </span>
            </button>
            <div
              className={cn('grid transition-all duration-300 ease-premium', isOpen ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]')}
            >
              <div className="overflow-hidden">
                <p className={cn('max-w-prose text-[15.5px] leading-relaxed', dark ? 'text-mineral/70' : 'text-slate')}>{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

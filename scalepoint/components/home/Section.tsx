import { cn } from '@/lib/utils';

export function Section({
  children, className, dark = false, id,
}: { children: React.ReactNode; className?: string; dark?: boolean; id?: string }) {
  return (
    <section id={id} className={cn('py-section', dark ? 'bg-carbon on-dark' : '', className)}>
      <div className="shell">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow, title, intro, dark = false, align = 'left',
}: { eyebrow?: string; title: string; intro?: string; dark?: boolean; align?: 'left' | 'center' }) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && <p className={cn('eyebrow', dark ? 'eyebrow--light' : 'eyebrow--brass')}>{eyebrow}</p>}
      <h2 className={cn('mt-3 text-heading font-bold', dark ? 'text-mineral' : 'text-ink')}>{title}</h2>
      {intro && <p className={cn('mt-4 text-[17px] leading-relaxed', dark ? 'text-mineral/70' : 'text-slate')}>{intro}</p>}
    </div>
  );
}

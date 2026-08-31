export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <header className="bg-carbon on-dark pb-16 pt-36">
      <div className="shell">
        <p className="eyebrow eyebrow--light">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-serif text-display-sm font-medium text-mineral">{title}</h1>
        {intro && <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-mineral/70">{intro}</p>}
      </div>
    </header>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-section text-center">
      <p className="eyebrow eyebrow--brass">404</p>
      <h1 className="mt-4 font-serif text-display-sm font-medium text-ink">This page isn't here.</h1>
      <p className="mt-4 max-w-md text-[17px] text-slate">
        The page you're looking for may have moved. Explore current opportunities or head back home.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="rounded-[12px] bg-ink px-6 py-3.5 text-[15px] font-semibold text-mineral hover:bg-carbon">Return home</Link>
        <Link href="/opportunities" className="rounded-[12px] border border-mist bg-surface px-6 py-3.5 text-[15px] font-semibold text-ink hover:border-ink">Explore opportunities</Link>
      </div>
    </div>
  );
}

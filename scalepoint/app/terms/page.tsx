import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = { title: 'Terms', description: 'Terms for using this site.' };

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Terms" title="Terms of use." />
      <div className="shell max-w-prose py-section-sm">
        <div className="space-y-8 text-[16px] leading-relaxed text-ink/85">
          <p className="rounded-card border border-mist bg-mineral p-4 text-[14px] text-slate">
            This is a template terms notice for a product build. Replace it with your organization’s reviewed terms
            before launch.
          </p>
          <Section title="Sample content">
            Opportunities, market visualizations, and matrices shown on this site are illustrative and labeled as
            such. They are provided to demonstrate the experience and do not represent live mandates unless stated.
          </Section>
          <Section title="No guarantees">
            We make no representations about placement rates, network size, response times, or absolute
            confidentiality. Outcomes depend on the specifics of each engagement.
          </Section>
          <Section title="Your submissions">
            By submitting information, you confirm it is accurate and that you’re entitled to share it. Do not
            submit confidential information you are not permitted to disclose.
          </Section>
          <Section title="Acceptable use">
            Use this site only for legitimate recruitment and hiring purposes. Automated scraping, misuse of forms,
            or attempts to disrupt the service are not permitted.
          </Section>
        </div>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-title font-bold text-ink">{title}</h2>
      <p className="mt-3">{children}</p>
    </section>
  );
}

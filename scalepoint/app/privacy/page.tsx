import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { config } from '@/lib/config';

export const metadata: Metadata = { title: 'Privacy', description: 'How we handle the information you share.' };

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Privacy" title="Your information, handled with care." />
      <div className="shell max-w-prose py-section-sm">
        <div className="space-y-8 text-[16px] leading-relaxed text-ink/85">
          <p className="rounded-card border border-mist bg-mineral p-4 text-[14px] text-slate">
            This is a template privacy notice for a product build. Replace it with your organization's reviewed
            policy before collecting real personal information.
          </p>
          <Section title="What we collect">
            When you submit an executive profile, an application, or a hiring requirement, we collect the details
            you provide — such as your name, contact information, professional background, and any file you attach.
            Providing current compensation is always optional.
          </Section>
          <Section title="How we use it">
            We use your information to assess fit for specific executive mandates and to contact you about relevant
            opportunities or searches. We do not sell your information.
          </Section>
          <Section title="How it's stored">
            Submissions and uploaded files are stored privately and are not exposed publicly. Access is limited to
            the team members involved in the relevant search.
          </Section>
          <Section title="Your choices">
            You can request access to, correction of, or deletion of the information you've shared. To make a
            request, contact us at the address below.
          </Section>
          <Section title="Contact">
            Privacy and data requests: <a className="text-periwinkle underline underline-offset-2" href={`mailto:${config.privacyEmail}`}>{config.privacyEmail}</a>
            {config.companyAddress ? ` · ${config.companyAddress}` : ''}.
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

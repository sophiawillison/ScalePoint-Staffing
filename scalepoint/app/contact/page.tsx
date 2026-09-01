'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/home/Section';
import { ContactForm } from '@/components/forms/ContactForm';
import { SegmentedSwitch } from '@/components/ui/SegmentedSwitch';
import { useAudience } from '@/components/layout/AudienceProvider';
import { config } from '@/lib/config';

export default function ContactPage() {
  const { audience } = useAudience();
  const defaultRole = audience === 'employer' ? 'Employer' : 'Executive';

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start a conversation."
        intro="Whether you are exploring your next leadership mandate, building an executive team, or simply want to understand how ScalePoint works, we would be glad to hear from you."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="rounded-card-lg border border-mist bg-surface p-6 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <span className="text-[14px] text-slate">I’m here as an</span>
              <SegmentedSwitch source="contact" />
            </div>
            <ContactForm defaultRole={defaultRole} />
          </div>

          <aside className="space-y-6">
            <div className="rounded-card-lg border border-mist bg-mineral p-8">
              <h2 className="text-[13px] font-semibold uppercase tracking-wide text-slate">Direct</h2>
              <ul className="mt-4 space-y-3 text-[15px] text-ink">
                {config.contactPhone && <li>{config.contactPhone}</li>}
                <li><a className="underline underline-offset-2 hover:text-slate" href={`mailto:${config.privacyEmail}`}>Privacy &amp; data requests</a></li>
                {config.companyAddress && <li className="text-slate">{config.companyAddress}</li>}
              </ul>
              <p className="mt-6 text-[13px] leading-relaxed text-slate">
                Set your organization’s real phone, email, and address via environment variables before going live.
              </p>
            </div>
            <div className="rounded-card-lg border border-mist bg-surface p-8">
              <h3 className="text-title font-bold text-ink">Prefer a specific path?</h3>
              <ul className="mt-4 space-y-2 text-[15px] text-periwinkle">
                <li><a href="/executive-profile" className="hover:underline">Submit your executive profile →</a></li>
                <li><a href="/employer-search" className="hover:underline">Start an executive search →</a></li>
                <li><a href="/opportunities" className="hover:underline">Explore opportunities →</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/home/Section';
import { ButtonLink } from '@/components/ui/Button';
import { SegmentedSwitch } from '@/components/ui/SegmentedSwitch';
import { useAudience } from '@/components/layout/AudienceProvider';
import { config } from '@/lib/config';

export default function ContactPage() {
  const { audience } = useAudience();
  const isExec = audience === 'executive';

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start the right conversation."
        intro="Choose how you'd like to engage. Whichever path you take, there's no account required and your information stays confidential."
      />
      <Section>
        <div className="mb-8 flex items-center gap-4">
          <span className="text-[14px] text-slate">I'm here as an</span>
          <SegmentedSwitch source="contact" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-card-lg border border-mist bg-surface p-8">
            {isExec ? (
              <>
                <h2 className="text-title font-bold text-ink">Executives</h2>
                <p className="mt-3 max-w-prose text-[16px] leading-relaxed text-slate">
                  Share your profile confidentially. We'll review it against current and upcoming mandates and an
                  Executive Relationship Partner will reach out when there's a genuine fit.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href="/executive-profile" variant="primary" arrow>Submit Your Executive Profile</ButtonLink>
                  <ButtonLink href="/opportunities" variant="secondary">Explore Opportunities</ButtonLink>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-title font-bold text-ink">Employers</h2>
                <p className="mt-3 max-w-prose text-[16px] leading-relaxed text-slate">
                  Brief our team on your leadership mandate. We'll review the requirement and reach out to discuss
                  the role, the candidate profile, and next steps.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href="/employer-search" variant="primary" arrow>Submit a Hiring Requirement</ButtonLink>
                  <ButtonLink href="/talent-intelligence" variant="secondary">Explore Talent Intelligence</ButtonLink>
                </div>
              </>
            )}
          </div>

          <aside className="rounded-card-lg border border-mist bg-mineral p-8">
            <h3 className="text-[13px] font-semibold uppercase tracking-wide text-slate">Direct</h3>
            <ul className="mt-4 space-y-3 text-[15px] text-ink">
              {config.contactPhone && <li>{config.contactPhone}</li>}
              <li><a className="underline underline-offset-2 hover:text-slate" href={`mailto:${config.privacyEmail}`}>Privacy &amp; data requests</a></li>
              {config.companyAddress && <li className="text-slate">{config.companyAddress}</li>}
            </ul>
            <p className="mt-6 text-[13px] leading-relaxed text-slate">
              Set your organization's real phone, email, and address via environment variables before going live.
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}

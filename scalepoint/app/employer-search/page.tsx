import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { EmployerRequirementForm } from '@/components/forms/EmployerRequirementForm';

export const metadata: Metadata = {
  title: 'Submit a Hiring Requirement',
  description: 'Brief our executive search team on your leadership mandate.',
};

export default function EmployerSearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="For Employers"
        title="Brief our executive search team."
        intro="Tell us about the mandate. We’ll review the requirement and reach out to discuss the role, candidate profile, and next steps."
      />
      <div className="shell max-w-4xl py-section-sm">
        <EmployerRequirementForm />
      </div>
    </>
  );
}

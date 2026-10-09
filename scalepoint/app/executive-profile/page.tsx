import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { ExecutiveProfileForm } from '@/components/forms/ExecutiveProfileForm';

export const metadata: Metadata = {
  title: 'Submit Your Executive Profile',
  description: 'Share your executive profile confidentially. No account required.',
};

export default function ExecutiveProfilePage() {
  return (
    <>
      <PageHeader
        eyebrow="For Executives"
        title="Submit your executive profile."
        intro="Share your background confidentially. We review profiles for fit against specific mandates and reach out only when it makes sense."
      />
      <div className="shell max-w-3xl py-section-sm">
        <ExecutiveProfileForm />
      </div>
    </>
  );
}

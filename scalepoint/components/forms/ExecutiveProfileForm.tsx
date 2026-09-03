'use client';

import { useEffect, useRef, useState } from 'react';
import { TextField, SelectField, TextArea } from '@/components/ui/Field';
import { ResumeDropzone } from '@/components/forms/ResumeDropzone';
import { Confirmation } from '@/components/forms/Confirmation';
import { Button } from '@/components/ui/Button';
import { executiveProfileSchema, flattenErrors } from '@/lib/validation';
import { INDUSTRIES, EXPERIENCE_BANDS, LEADERSHIP_FUNCTIONS } from '@/data/taxonomy';
import { track } from '@/lib/analytics';

type State = Record<string, string>;
const INIT: State = {
  fullName: '', email: '', phone: '', location: '',
  currentTitle: '', currentCompany: '', yearsExperience: '', industry: '',
  functionalExpertise: '', targetCompensation: '', preferredRole: '', preferredLocation: '',
  linkedin: '', additionalInfo: '',
};

export function ExecutiveProfileForm() {
  const [v, setV] = useState<State>(INIT);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ id: string } | null>(null);
  const [formError, setFormError] = useState('');
  const startedRef = useRef(false);

  const set = (k: string) => (val: string) => {
    if (!startedRef.current) { startedRef.current = true; track('executive_profile_started'); }
    setV((s) => ({ ...s, [k]: val }));
  };

  async function submit() {
    setFormError('');
    const candidate = { ...v, resumeFileName: file?.name ?? '' };
    const parsed = executiveProfileSchema.safeParse(candidate);
    if (!parsed.success) {
      const errs = flattenErrors(parsed.error);
      setErrors(errs);
      track('form_validation_error', { form: 'executive_profile' });
      const first = Object.keys(errs)[0];
      document.getElementById(first)?.focus();
      if (errs.resumeFileName) document.getElementById('exec-profile-resume')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(v).forEach(([k, val]) => fd.append(k, val));
      if (file) fd.append('resume', file);
      const res = await fetch('/api/executive-profile', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        if (json.errors) { setErrors(json.errors); document.getElementById(Object.keys(json.errors)[0])?.focus(); }
        else setFormError(json.message ?? 'Something went wrong. Please try again.');
        return;
      }
      track('resume_upload_success', { form: 'executive_profile' });
      track('executive_profile_completed');
      setDone({ id: json.id });
    } catch {
      setFormError('We could not reach the server. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => { if (done) window.scrollTo({ top: 0, behavior: 'smooth' }); }, [done]);

  if (done) {
    return (
      <Confirmation
        title="Your profile has been received"
        message="Thank you for sharing your information with us. Our team will review your profile and an Executive Relationship Partner will reach out if there is a relevant opportunity or if additional information is required."
        referenceId={done.id}
        primaryHref="/opportunities" primaryLabel="Explore Opportunities"
        secondaryHref="/" secondaryLabel="Return Home"
      />
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); submit(); }} noValidate className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="fullName" label="Full name" required value={v.fullName} onChange={set('fullName')} autoComplete="name" error={errors.fullName} />
        <TextField id="email" label="Email" type="email" required value={v.email} onChange={set('email')} inputMode="email" autoComplete="email" error={errors.email} />
        <TextField id="phone" label="Phone" type="tel" required value={v.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" error={errors.phone} />
        <TextField id="location" label="Location (City, State)" required value={v.location} onChange={set('location')} error={errors.location} />
        <TextField id="currentTitle" label="Current title" required value={v.currentTitle} onChange={set('currentTitle')} error={errors.currentTitle} />
        <TextField id="currentCompany" label="Current company" value={v.currentCompany} onChange={set('currentCompany')} hint="Optional" error={errors.currentCompany} />
        <SelectField id="yearsExperience" label="Years of experience" required value={v.yearsExperience} onChange={set('yearsExperience')} options={EXPERIENCE_BANDS} error={errors.yearsExperience} />
        <SelectField id="industry" label="Primary industry" required value={v.industry} onChange={set('industry')} options={INDUSTRIES} error={errors.industry} />
        <SelectField id="functionalExpertise" label="Functional expertise" value={v.functionalExpertise} onChange={set('functionalExpertise')} options={LEADERSHIP_FUNCTIONS} hint="Optional" error={errors.functionalExpertise} />
        <TextField id="preferredRole" label="Preferred next role" value={v.preferredRole} onChange={set('preferredRole')} hint="Optional" error={errors.preferredRole} />
        <TextField id="targetCompensation" label="Target compensation (USD)" value={v.targetCompensation} onChange={set('targetCompensation')} hint="Optional, base and/or total" error={errors.targetCompensation} />
        <TextField id="preferredLocation" label="Preferred location(s)" value={v.preferredLocation} onChange={set('preferredLocation')} hint="Optional" error={errors.preferredLocation} />
      </div>
      <TextField id="linkedin" label="LinkedIn URL" value={v.linkedin} onChange={set('linkedin')} inputMode="url" hint="Optional" error={errors.linkedin} />
      <TextArea id="additionalInfo" label="Anything else we should know" value={v.additionalInfo} onChange={set('additionalInfo')} hint="Optional" rows={4} error={errors.additionalInfo} />

      <div id="exec-profile-resume">
        <ResumeDropzone file={file} onFile={setFile} error={errors.resumeFileName} />
      </div>

      {formError && <p className="field-error" role="alert">{formError}</p>}

      <div className="flex items-center justify-between gap-4 pt-2">
        <p className="text-[13px] text-slate">Confidential. No account required.</p>
        <Button type="submit" loading={submitting} arrow>Submit My Executive Profile</Button>
      </div>
    </form>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { TextField, SelectField, TextArea } from '@/components/ui/Field';
import { ResumeDropzone } from '@/components/forms/ResumeDropzone';
import { Confirmation } from '@/components/forms/Confirmation';
import { Stepper } from '@/components/ui/Stepper';
import { Button } from '@/components/ui/Button';
import { executiveApplicationSchema, flattenErrors } from '@/lib/validation';
import { INDUSTRIES, EXPERIENCE_BANDS, LEADERSHIP_LEVELS } from '@/data/taxonomy';
import { track } from '@/lib/analytics';

const STEPS = ['Contact', 'Experience', 'Compensation', 'Leadership', 'Review'];
const STEP_FIELDS: string[][] = [
  ['fullName', 'email', 'phone', 'city', 'state', 'zip', 'linkedin'],
  ['currentTitle', 'currentCompany', 'industry', 'yearsExperience', 'currentLocation', 'preferredLocation', 'employmentStatus', 'availability'],
  ['currentBaseSalary', 'expectedBaseSalary', 'totalCompensation', 'annualBonus', 'equity'],
  ['leadershipLevel', 'teamSize', 'pnlResponsibility', 'boardExperience', 'maExperience', 'transformationExperience', 'internationalExperience'],
  ['coverNote', 'additionalInfo', 'resumeFileName'],
];

const INIT: Record<string, string> = Object.fromEntries(
  STEP_FIELDS.flat().filter((f) => f !== 'resumeFileName').map((f) => [f, '']),
);

export function ExecutiveApplicationForm({ slug, title }: { slug: string; title: string }) {
  const [step, setStep] = useState(0);
  const [v, setV] = useState<Record<string, string>>(INIT);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ id: string } | null>(null);
  const [formError, setFormError] = useState('');
  const startedRef = useRef(false);
  const topRef = useRef<HTMLDivElement>(null);

  const set = (k: string) => (val: string) => {
    if (!startedRef.current) { startedRef.current = true; track('opportunity_apply_started', { slug }); }
    setV((s) => ({ ...s, [k]: val }));
  };

  const goStep = (i: number) => {
    setStep(i);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  async function submit() {
    setFormError('');
    const candidate = { ...v, opportunitySlug: slug, opportunityTitle: title, resumeFileName: file?.name ?? '' };
    const parsed = executiveApplicationSchema.safeParse(candidate);
    if (!parsed.success) {
      const errs = flattenErrors(parsed.error);
      setErrors(errs);
      track('form_validation_error', { form: 'executive_application' });
      const firstField = Object.keys(errs)[0];
      const targetStep = STEP_FIELDS.findIndex((f) => f.includes(firstField));
      if (targetStep >= 0 && targetStep !== step) { goStep(targetStep); }
      setTimeout(() => document.getElementById(firstField)?.focus(), 60);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(v).forEach(([k, val]) => fd.append(k, val));
      fd.append('opportunitySlug', slug);
      fd.append('opportunityTitle', title);
      if (file) fd.append('resume', file);
      const res = await fetch('/api/executive-application', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        if (json.errors) {
          setErrors(json.errors);
          const f = Object.keys(json.errors)[0];
          const ts = STEP_FIELDS.findIndex((x) => x.includes(f));
          if (ts >= 0) goStep(ts);
        } else setFormError(json.message ?? 'Something went wrong. Please try again.');
        return;
      }
      track('resume_upload_success', { form: 'executive_application' });
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
        title="Your application has been received"
        message="Thank you for sharing your information with us. Our team will review your profile and an Executive Relationship Partner will reach out if there is a relevant opportunity or if additional information is required."
        referenceId={done.id}
        primaryHref="/opportunities" primaryLabel="Explore More Opportunities"
        secondaryHref="/" secondaryLabel="Return Home"
      />
    );
  }

  const last = step === STEPS.length - 1;

  return (
    <div ref={topRef}>
      <div className="mb-8"><Stepper steps={STEPS} current={step} onJump={goStep} /></div>

      <form onSubmit={(e) => { e.preventDefault(); last ? submit() : goStep(step + 1); }} noValidate className="space-y-6">
        {step === 0 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField id="fullName" label="Full name" required value={v.fullName} onChange={set('fullName')} autoComplete="name" error={errors.fullName} />
            <TextField id="email" label="Email" type="email" required value={v.email} onChange={set('email')} inputMode="email" autoComplete="email" error={errors.email} />
            <TextField id="phone" label="Phone" type="tel" required value={v.phone} onChange={set('phone')} inputMode="tel" error={errors.phone} />
            <TextField id="linkedin" label="LinkedIn URL" value={v.linkedin} onChange={set('linkedin')} inputMode="url" hint="Optional" error={errors.linkedin} />
            <TextField id="city" label="City" required value={v.city} onChange={set('city')} error={errors.city} />
            <TextField id="state" label="State" required value={v.state} onChange={set('state')} hint="e.g. NY" error={errors.state} />
            <TextField id="zip" label="ZIP code" required value={v.zip} onChange={set('zip')} inputMode="numeric" error={errors.zip} />
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField id="currentTitle" label="Current job title" required value={v.currentTitle} onChange={set('currentTitle')} error={errors.currentTitle} />
            <TextField id="currentCompany" label="Current company" required value={v.currentCompany} onChange={set('currentCompany')} error={errors.currentCompany} />
            <SelectField id="industry" label="Industry" required value={v.industry} onChange={set('industry')} options={INDUSTRIES} error={errors.industry} />
            <SelectField id="yearsExperience" label="Years of experience" required value={v.yearsExperience} onChange={set('yearsExperience')} options={EXPERIENCE_BANDS} error={errors.yearsExperience} />
            <TextField id="currentLocation" label="Current location" value={v.currentLocation} onChange={set('currentLocation')} hint="Optional" error={errors.currentLocation} />
            <TextField id="preferredLocation" label="Preferred location(s)" value={v.preferredLocation} onChange={set('preferredLocation')} hint="Optional" error={errors.preferredLocation} />
            <TextField id="employmentStatus" label="Employment status" value={v.employmentStatus} onChange={set('employmentStatus')} hint="Optional" error={errors.employmentStatus} />
            <TextField id="availability" label="Availability" value={v.availability} onChange={set('availability')} hint="Optional — e.g. 60–90 days" error={errors.availability} />
          </div>
        )}

        {step === 2 && (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField id="currentBaseSalary" label="Current base salary (USD)" value={v.currentBaseSalary} onChange={set('currentBaseSalary')} hint="Optional" error={errors.currentBaseSalary} />
              <TextField id="expectedBaseSalary" label="Expected base salary (USD)" required value={v.expectedBaseSalary} onChange={set('expectedBaseSalary')} error={errors.expectedBaseSalary} />
              <TextField id="totalCompensation" label="Target total compensation (USD)" value={v.totalCompensation} onChange={set('totalCompensation')} hint="Optional" error={errors.totalCompensation} />
              <TextField id="annualBonus" label="Annual bonus" value={v.annualBonus} onChange={set('annualBonus')} hint="Optional" error={errors.annualBonus} />
              <TextField id="equity" label="Equity expectations" value={v.equity} onChange={set('equity')} hint="Optional" error={errors.equity} />
            </div>
            <p className="text-[13px] text-slate">Providing current salary is optional. Share only what you're comfortable with.</p>
          </>
        )}

        {step === 3 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField id="leadershipLevel" label="Leadership level" value={v.leadershipLevel} onChange={set('leadershipLevel')} options={LEADERSHIP_LEVELS} hint="Optional" error={errors.leadershipLevel} />
            <TextField id="teamSize" label="Largest team led" value={v.teamSize} onChange={set('teamSize')} hint="Optional" error={errors.teamSize} />
            <TextField id="pnlResponsibility" label="P&L responsibility" value={v.pnlResponsibility} onChange={set('pnlResponsibility')} hint="Optional — e.g. $250M" error={errors.pnlResponsibility} />
            <TextField id="boardExperience" label="Board experience" value={v.boardExperience} onChange={set('boardExperience')} hint="Optional" error={errors.boardExperience} />
            <TextField id="maExperience" label="M&A experience" value={v.maExperience} onChange={set('maExperience')} hint="Optional" error={errors.maExperience} />
            <TextField id="transformationExperience" label="Transformation experience" value={v.transformationExperience} onChange={set('transformationExperience')} hint="Optional" error={errors.transformationExperience} />
            <TextField id="internationalExperience" label="International experience" value={v.internationalExperience} onChange={set('internationalExperience')} hint="Optional" error={errors.internationalExperience} />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <TextArea id="coverNote" label="Cover note" value={v.coverNote} onChange={set('coverNote')} hint="Optional — why this mandate fits you" rows={4} error={errors.coverNote} />
            <TextArea id="additionalInfo" label="Additional information" value={v.additionalInfo} onChange={set('additionalInfo')} hint="Optional" rows={3} error={errors.additionalInfo} />
            <div id="resumeFileName-anchor">
              <ResumeDropzone file={file} onFile={setFile} error={errors.resumeFileName} />
            </div>
          </div>
        )}

        {formError && <p className="field-error" role="alert">{formError}</p>}

        <div className="flex items-center justify-between gap-4 pt-2">
          <Button type="button" variant="secondary" onClick={() => goStep(Math.max(0, step - 1))} disabled={step === 0}>
            Back
          </Button>
          <Button type="submit" loading={submitting} arrow={last}>
            {last ? 'Submit Application' : 'Continue'}
          </Button>
        </div>
      </form>
    </div>
  );
}

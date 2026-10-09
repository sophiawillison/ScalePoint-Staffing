'use client';

import { useEffect, useRef, useState } from 'react';
import { TextField, SelectField, TextArea } from '@/components/ui/Field';
import { Confirmation } from '@/components/forms/Confirmation';
import { Stepper } from '@/components/ui/Stepper';
import { Button } from '@/components/ui/Button';
import { employerRequirementSchema, flattenErrors } from '@/lib/validation';
import { INDUSTRIES, WORK_MODELS } from '@/data/taxonomy';
import { track } from '@/lib/analytics';

const STEPS = ['Organization', 'Contact', 'Position', 'Compensation', 'Mandate', 'Profile', 'Context', 'Documents'];
const STEP_FIELDS: string[][] = [
  ['organizationName', 'organizationType', 'industry', 'website', 'headquarters', 'employees'],
  ['contactName', 'contactTitle', 'workEmail', 'contactPhone'],
  ['jobTitle', 'department', 'location', 'workModel', 'employmentType', 'reporting'],
  ['salaryRange', 'bonus', 'equity', 'experienceRequired', 'targetStart', 'searchPriority'],
  ['roleOverview', 'keyResponsibilities', 'firstYearOutcomes'],
  ['requiredSkills', 'preferredBackground', 'leadershipRequirements', 'education', 'preferredProfile'],
  ['searchContext', 'confidentiality', 'existingSearchStatus', 'additionalNotes'],
  [],
];

const INIT: Record<string, string> = Object.fromEntries(STEP_FIELDS.flat().map((f) => [f, '']));

function DocUpload({ id, label, file, onFile }: { id: string; label: string; file: File | null; onFile: (f: File | null) => void }) {
  return (
    <div className="rounded-card border border-mist bg-surface p-4">
      <p className="field-label">{label} <span className="text-slate">(optional)</span></p>
      {file ? (
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-[14px] text-ink">{file.name}</span>
          <button type="button" onClick={() => onFile(null)} className="text-[13px] text-[#B23B39] hover:underline">Remove</button>
        </div>
      ) : (
        <input
          id={id} type="file" accept=".pdf,.doc,.docx"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          className="block w-full text-[14px] text-slate file:mr-4 file:rounded-lg file:border-0 file:bg-mineral file:px-4 file:py-2 file:text-[13px] file:font-medium file:text-ink hover:file:bg-mist"
        />
      )}
    </div>
  );
}

export function EmployerRequirementForm() {
  const [step, setStep] = useState(0);
  const [v, setV] = useState<Record<string, string>>(INIT);
  const [jd, setJd] = useState<File | null>(null);
  const [brief, setBrief] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ id: string } | null>(null);
  const [formError, setFormError] = useState('');
  const startedRef = useRef(false);
  const topRef = useRef<HTMLDivElement>(null);

  const set = (k: string) => (val: string) => {
    if (!startedRef.current) { startedRef.current = true; track('employer_requirement_started'); }
    setV((s) => ({ ...s, [k]: val }));
  };
  const goStep = (i: number) => { setStep(i); topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  async function submit() {
    setFormError('');
    const parsed = employerRequirementSchema.safeParse(v);
    if (!parsed.success) {
      const errs = flattenErrors(parsed.error);
      setErrors(errs);
      track('form_validation_error', { form: 'employer_requirement' });
      const f = Object.keys(errs)[0];
      const ts = STEP_FIELDS.findIndex((x) => x.includes(f));
      if (ts >= 0 && ts !== step) goStep(ts);
      setTimeout(() => document.getElementById(f)?.focus(), 60);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(v).forEach(([k, val]) => fd.append(k, val));
      if (jd) fd.append('jobDescriptionFile', jd);
      if (brief) fd.append('searchBriefFile', brief);
      const res = await fetch('/api/employer-requirement', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        if (json.errors) { setErrors(json.errors); const f = Object.keys(json.errors)[0]; const ts = STEP_FIELDS.findIndex((x) => x.includes(f)); if (ts >= 0) goStep(ts); }
        else setFormError(json.message ?? 'Something went wrong. Please try again.');
        return;
      }
      if (jd || brief) track('search_brief_upload_success', { form: 'employer_requirement' });
      track('employer_requirement_completed');
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
        title="We’ve received your hiring requirement"
        message="Our team will review the mandate and a member of our team will contact you to discuss the position, candidate profile, and next steps."
        referenceId={done.id}
        primaryHref="/talent-intelligence" primaryLabel="Explore Talent Intelligence"
        secondaryHref="/" secondaryLabel="Return Home"
      />
    );
  }

  const last = step === STEPS.length - 1;

  return (
    <div ref={topRef}>
      <div className="mb-8 overflow-x-auto"><Stepper steps={STEPS} current={step} onJump={goStep} /></div>

      <form onSubmit={(e) => { e.preventDefault(); last ? submit() : goStep(step + 1); }} noValidate className="space-y-6">
        {step === 0 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField id="organizationName" label="Organization name" required value={v.organizationName} onChange={set('organizationName')} error={errors.organizationName} />
            <TextField id="organizationType" label="Organization type" required value={v.organizationType} onChange={set('organizationType')} hint="e.g. PE-backed, public, family office" error={errors.organizationType} />
            <SelectField id="industry" label="Industry" required value={v.industry} onChange={set('industry')} options={INDUSTRIES} error={errors.industry} />
            <TextField id="website" label="Website" value={v.website} onChange={set('website')} inputMode="url" hint="Optional" error={errors.website} />
            <TextField id="headquarters" label="Headquarters" value={v.headquarters} onChange={set('headquarters')} hint="Optional" error={errors.headquarters} />
            <TextField id="employees" label="Company size" value={v.employees} onChange={set('employees')} hint="Optional" error={errors.employees} />
          </div>
        )}
        {step === 1 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField id="contactName" label="Your name" required value={v.contactName} onChange={set('contactName')} autoComplete="name" error={errors.contactName} />
            <TextField id="contactTitle" label="Your title" required value={v.contactTitle} onChange={set('contactTitle')} error={errors.contactTitle} />
            <TextField id="workEmail" label="Work email" type="email" required value={v.workEmail} onChange={set('workEmail')} inputMode="email" error={errors.workEmail} />
            <TextField id="contactPhone" label="Phone" type="tel" required value={v.contactPhone} onChange={set('contactPhone')} inputMode="tel" error={errors.contactPhone} />
          </div>
        )}
        {step === 2 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField id="jobTitle" label="Job title" required value={v.jobTitle} onChange={set('jobTitle')} error={errors.jobTitle} />
            <TextField id="department" label="Department / function" value={v.department} onChange={set('department')} hint="Optional" error={errors.department} />
            <TextField id="location" label="Location" required value={v.location} onChange={set('location')} error={errors.location} />
            <SelectField id="workModel" label="Work model" value={v.workModel} onChange={set('workModel')} options={WORK_MODELS} hint="Optional" error={errors.workModel} />
            <TextField id="employmentType" label="Employment type" value={v.employmentType} onChange={set('employmentType')} hint="Optional, e.g. Full-time" error={errors.employmentType} />
            <TextField id="reporting" label="Reports to" value={v.reporting} onChange={set('reporting')} hint="Optional" error={errors.reporting} />
          </div>
        )}
        {step === 3 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField id="salaryRange" label="Salary range (USD)" required value={v.salaryRange} onChange={set('salaryRange')} hint="e.g. $400,000-$550,000" error={errors.salaryRange} />
            <TextField id="bonus" label="Bonus / incentive" value={v.bonus} onChange={set('bonus')} hint="Optional" error={errors.bonus} />
            <TextField id="equity" label="Equity / LTI" value={v.equity} onChange={set('equity')} hint="Optional" error={errors.equity} />
            <TextField id="experienceRequired" label="Experience required" value={v.experienceRequired} onChange={set('experienceRequired')} hint="Optional, e.g. 15+ years" error={errors.experienceRequired} />
            <TextField id="targetStart" label="Target start" value={v.targetStart} onChange={set('targetStart')} hint="Optional" error={errors.targetStart} />
            <TextField id="searchPriority" label="Search priority" value={v.searchPriority} onChange={set('searchPriority')} hint="Optional, e.g. High / retained" error={errors.searchPriority} />
          </div>
        )}
        {step === 4 && (
          <div className="space-y-5">
            <TextArea id="roleOverview" label="Role overview" required value={v.roleOverview} onChange={set('roleOverview')} rows={5} hint="The mandate, context, and what success looks like" error={errors.roleOverview} />
            <TextArea id="keyResponsibilities" label="Key responsibilities" value={v.keyResponsibilities} onChange={set('keyResponsibilities')} rows={4} hint="Optional" error={errors.keyResponsibilities} />
            <TextArea id="firstYearOutcomes" label="First-year outcomes" value={v.firstYearOutcomes} onChange={set('firstYearOutcomes')} rows={3} hint="Optional" error={errors.firstYearOutcomes} />
          </div>
        )}
        {step === 5 && (
          <div className="space-y-5">
            <TextArea id="requiredSkills" label="Required experience & skills" value={v.requiredSkills} onChange={set('requiredSkills')} rows={4} hint="Optional" error={errors.requiredSkills} />
            <TextArea id="preferredBackground" label="Preferred background" value={v.preferredBackground} onChange={set('preferredBackground')} rows={3} hint="Optional" error={errors.preferredBackground} />
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField id="leadershipRequirements" label="Leadership requirements" value={v.leadershipRequirements} onChange={set('leadershipRequirements')} hint="Optional" error={errors.leadershipRequirements} />
              <TextField id="education" label="Education requirements" value={v.education} onChange={set('education')} hint="Optional" error={errors.education} />
            </div>
            <TextField id="preferredProfile" label="Ideal candidate profile" value={v.preferredProfile} onChange={set('preferredProfile')} hint="Optional" error={errors.preferredProfile} />
          </div>
        )}
        {step === 6 && (
          <div className="space-y-5">
            <TextArea id="searchContext" label="Search context" value={v.searchContext} onChange={set('searchContext')} rows={4} hint="Optional, why this role, why now" error={errors.searchContext} />
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField id="confidentiality" label="Confidentiality requirements" value={v.confidentiality} onChange={set('confidentiality')} hint="Optional" error={errors.confidentiality} />
              <TextField id="existingSearchStatus" label="Existing search status" value={v.existingSearchStatus} onChange={set('existingSearchStatus')} hint="Optional" error={errors.existingSearchStatus} />
            </div>
            <TextArea id="additionalNotes" label="Additional notes" value={v.additionalNotes} onChange={set('additionalNotes')} rows={3} hint="Optional" error={errors.additionalNotes} />
          </div>
        )}
        {step === 7 && (
          <div className="space-y-5">
            <p className="text-[15px] text-slate">
              Optionally attach a job description or internal search brief (PDF, DOC, or DOCX). You can also submit without documents.
            </p>
            <DocUpload id="jobDescriptionFile" label="Job description" file={jd} onFile={setJd} />
            <DocUpload id="searchBriefFile" label="Internal search brief" file={brief} onFile={setBrief} />
            <div className="rounded-card bg-mineral p-5 text-[14px] text-ink">
              <p className="font-semibold">Ready to submit</p>
              <p className="mt-1 text-slate">
                {v.jobTitle || 'Your role'} · {v.location || '-'} · {v.salaryRange || 'compensation on file'}. Our team will
                review and reach out to discuss next steps.
              </p>
            </div>
          </div>
        )}

        {formError && <p className="field-error" role="alert">{formError}</p>}

        <div className="flex items-center justify-between gap-4 pt-2">
          <Button type="button" variant="secondary" onClick={() => goStep(Math.max(0, step - 1))} disabled={step === 0}>Back</Button>
          <Button type="submit" loading={submitting} arrow={last}>{last ? 'Submit Hiring Requirement' : 'Continue'}</Button>
        </div>
      </form>
    </div>
  );
}

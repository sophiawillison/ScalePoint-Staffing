'use client';

import { useEffect, useState } from 'react';
import { TextField, TextArea, SelectField } from '@/components/ui/Field';
import { Confirmation } from '@/components/forms/Confirmation';
import { Button } from '@/components/ui/Button';
import { contactSchema, flattenErrors } from '@/lib/validation';
import { track } from '@/lib/analytics';

type State = Record<string, string>;
const INIT: State = { name: '', email: '', phone: '', company: '', role: '', subject: '', message: '' };

export function ContactForm({ defaultRole }: { defaultRole?: string }) {
  const [v, setV] = useState<State>({ ...INIT, role: defaultRole ?? '' });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ id: string } | null>(null);
  const [formError, setFormError] = useState('');

  const set = (k: string) => (val: string) => setV((s) => ({ ...s, [k]: val }));

  async function submit() {
    setFormError('');
    const candidate = { ...v, consent: consent ? 'true' : '' };
    const parsed = contactSchema.safeParse(candidate);
    if (!parsed.success) {
      const errs = flattenErrors(parsed.error);
      setErrors(errs);
      track('form_validation_error', { form: 'contact' });
      document.getElementById(Object.keys(errs)[0])?.focus();
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(candidate).forEach(([k, val]) => fd.append(k, val));
      const res = await fetch('/api/contact', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        if (json.errors) { setErrors(json.errors); document.getElementById(Object.keys(json.errors)[0])?.focus(); }
        else setFormError(json.message ?? 'Something went wrong. Please try again.');
        return;
      }
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
        title="Thank you. We’ve received your message."
        message="One of our team members will review your enquiry and get in touch with you shortly."
        referenceId={done.id}
        primaryHref="/" primaryLabel="Return Home"
        secondaryHref="/opportunities" secondaryLabel="Explore Opportunities"
      />
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); submit(); }} noValidate className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="name" label="Name" required value={v.name} onChange={set('name')} autoComplete="name" error={errors.name} />
        <TextField id="email" label="Work email" type="email" required value={v.email} onChange={set('email')} inputMode="email" autoComplete="email" error={errors.email} />
        <TextField id="phone" label="Phone number" value={v.phone} onChange={set('phone')} inputMode="tel" hint="Optional" error={errors.phone} />
        <TextField id="company" label="Company" value={v.company} onChange={set('company')} hint="Optional" error={errors.company} />
        <SelectField id="role" label="I am an" required value={v.role} onChange={set('role')} options={['Executive', 'Employer', 'Other']} error={errors.role} />
        <TextField id="subject" label="Subject" required value={v.subject} onChange={set('subject')} error={errors.subject} />
      </div>
      <TextArea id="message" label="Message" required value={v.message} onChange={set('message')} rows={5} error={errors.message} />

      <div>
        <label htmlFor="consent" className="flex items-start gap-3 text-[14px] text-slate">
          <input
            id="consent" type="checkbox" checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'consent-error' : undefined}
            className="mt-1 h-4 w-4 flex-none rounded border-mist text-ink focus:ring-periwinkle"
          />
          <span>I agree that my details may be used to respond to this enquiry, in line with the privacy notice.</span>
        </label>
        {errors.consent && <p id="consent-error" className="field-error" role="alert">{errors.consent}</p>}
      </div>

      {formError && <p className="field-error" role="alert">{formError}</p>}

      <div className="flex items-center justify-between gap-4 pt-2">
        <p className="text-[13px] text-slate">We typically reply within a few business days.</p>
        <Button type="submit" loading={submitting} arrow>Send Message</Button>
      </div>
    </form>
  );
}

import { NextRequest, NextResponse } from 'next/server';
import { employerRequirementSchema, flattenErrors } from '@/lib/validation';
import { saveUpload } from '@/lib/upload';
import { getStorage } from '@/lib/storage';
import { getMailer } from '@/lib/email';
import { config } from '@/lib/config';
import { rateLimit } from '@/lib/utils';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'local';
  if (!rateLimit(`employer:${ip}`, 5, 60_000)) {
    return NextResponse.json({ ok: false, message: 'Too many submissions. Please try again shortly.' }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid submission.' }, { status: 400 });
  }

  // Optional documents (job description / search brief)
  const docs: { field: string; file: import('@/lib/upload').SavedFile }[] = [];
  for (const field of ['jobDescriptionFile', 'searchBriefFile']) {
    const f = form.get(field);
    if (f instanceof File && f.size > 0) {
      const up = await saveUpload(f);
      if (!up.ok) {
        return NextResponse.json({ ok: false, errors: { [field]: up.message } }, { status: 400 });
      }
      docs.push({ field, file: up.file });
    }
  }

  const fields: Record<string, string> = {};
  form.forEach((v, k) => { if (typeof v === 'string') fields[k] = v; });
  if (docs[0]) fields.documentFileName = docs[0].file.originalName;

  const parsed = employerRequirementSchema.safeParse(fields);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: flattenErrors(parsed.error) }, { status: 400 });
  }
  const data = parsed.data;

  const record = await getStorage().save('employer_requirement', {
    ...data,
    documents: docs.map((d) => ({ field: d.field, storedPath: d.file.storedPath, originalName: d.file.originalName })),
  });

  const mailer = getMailer();
  try {
    await mailer.send({
      to: config.internalEmployerEmail,
      replyTo: data.workEmail,
      subject: `[Employer Requirement] ${data.jobTitle} — ${data.organizationName}`,
      text:
        `New executive-search mandate (ref ${record.id})\n\n` +
        `Organization: ${data.organizationName} | ${data.organizationType} | ${data.industry}\n` +
        `HQ: ${data.headquarters || '—'} | Employees: ${data.employees || '—'} | Website: ${data.website || '—'}\n\n` +
        `Contact: ${data.contactName}, ${data.contactTitle}\nEmail: ${data.workEmail} | Phone: ${data.contactPhone}\n\n` +
        `Role: ${data.jobTitle} | ${data.department || '—'} | ${data.location} | ${data.workModel || '—'}\n` +
        `Employment: ${data.employmentType || '—'} | Reporting: ${data.reporting || '—'}\n` +
        `Comp: ${data.salaryRange} | Bonus: ${data.bonus || '—'} | Equity/LTI: ${data.equity || '—'}\n` +
        `Experience: ${data.experienceRequired || '—'} | Target start: ${data.targetStart || '—'} | Priority: ${data.searchPriority || '—'}\n\n` +
        `Role overview:\n${data.roleOverview}\n\n` +
        `Key responsibilities:\n${data.keyResponsibilities || '—'}\n\n` +
        `First-year outcomes:\n${data.firstYearOutcomes || '—'}\n\n` +
        `Required skills: ${data.requiredSkills || '—'}\nPreferred background: ${data.preferredBackground || '—'}\n` +
        `Leadership req: ${data.leadershipRequirements || '—'} | Education: ${data.education || '—'}\n` +
        `Preferred profile: ${data.preferredProfile || '—'}\n\n` +
        `Search context: ${data.searchContext || '—'} | Confidentiality: ${data.confidentiality || '—'}\n` +
        `Existing search: ${data.existingSearchStatus || '—'}\nNotes: ${data.additionalNotes || '—'}\n\n` +
        (docs.length
          ? `Documents: ${docs.map((d) => `${d.field}=${d.file.originalName} (${d.file.storedPath})`).join('; ')}`
          : 'Documents: none'),
    });
    await mailer.send({
      to: data.workEmail,
      from: config.fromEmail,
      subject: `We've received your hiring requirement — ${config.brandName}`,
      text:
        `Dear ${data.contactName},\n\n` +
        `Our team has received your hiring requirement and will review the mandate. A member of our ` +
        `team will contact you to discuss the position, candidate profile, and next steps.\n\n` +
        `Reference: ${record.id}\nRole: ${data.jobTitle}\n\n— ${config.brandName}`,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[employer] email failed', err);
    return NextResponse.json({ ok: true, id: record.id, warning: 'Saved, but confirmation email could not be sent.' });
  }

  return NextResponse.json({ ok: true, id: record.id });
}

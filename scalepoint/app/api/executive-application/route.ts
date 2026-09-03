import { NextRequest, NextResponse } from 'next/server';
import { executiveApplicationSchema, flattenErrors } from '@/lib/validation';
import { saveUpload } from '@/lib/upload';
import { getStorage } from '@/lib/storage';
import { getMailer } from '@/lib/email';
import { config } from '@/lib/config';
import { rateLimit } from '@/lib/utils';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'local';
  if (!rateLimit(`exec-app:${ip}`, 5, 60_000)) {
    return NextResponse.json({ ok: false, message: 'Too many submissions. Please try again shortly.' }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid submission.' }, { status: 400 });
  }

  // 1) validate + store the file first
  const resume = form.get('resume');
  if (!(resume instanceof File)) {
    return NextResponse.json({ ok: false, errors: { resumeFileName: 'Please attach your resume.' } }, { status: 400 });
  }
  const up = await saveUpload(resume);
  if (!up.ok) {
    return NextResponse.json({ ok: false, errors: { resumeFileName: up.message } }, { status: 400 });
  }

  // 2) collect + validate fields
  const fields: Record<string, string> = {};
  form.forEach((v, k) => { if (typeof v === 'string') fields[k] = v; });
  fields.resumeFileName = up.file.originalName;

  const parsed = executiveApplicationSchema.safeParse(fields);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: flattenErrors(parsed.error) }, { status: 400 });
  }
  const data = parsed.data;

  // 3) persist (before email), get submission id
  const storage = getStorage();
  const record = await storage.save('executive_application', {
    ...data,
    resume: { storedPath: up.file.storedPath, originalName: up.file.originalName, size: up.file.size },
  });

  // 4) internal notification + 5) applicant confirmation
  const mailer = getMailer();
  const loc = `${data.city}, ${data.state}`;
  try {
    await mailer.send({
      to: config.internalExecutiveEmail,
      replyTo: data.email,
      subject: `[Executive Application] ${data.opportunityTitle}, ${loc}, ${data.fullName}`,
      text:
        `New confidential executive application (ref ${record.id})\n\n` +
        `Opportunity: ${data.opportunityTitle} (${data.opportunitySlug})\n` +
        `Name: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone}\n` +
        `Location: ${loc} ${data.zip}\nLinkedIn: ${data.linkedin || '-'}\n\n` +
        `Current: ${data.currentTitle} @ ${data.currentCompany} | ${data.industry} | ${data.yearsExperience}\n` +
        `Expected base: ${data.expectedBaseSalary} | Total comp: ${data.totalCompensation || '-'} | Bonus: ${data.annualBonus || '-'} | Equity: ${data.equity || '-'}\n` +
        `Leadership: ${data.leadershipLevel || '-'} | Team: ${data.teamSize || '-'} | P&L: ${data.pnlResponsibility || '-'}\n` +
        `Board: ${data.boardExperience || '-'} | M&A: ${data.maExperience || '-'} | Transformation: ${data.transformationExperience || '-'}\n\n` +
        `Cover note: ${data.coverNote || '-'}\nAdditional: ${data.additionalInfo || '-'}\n\n` +
        `Resume on file: ${up.file.originalName} (internal storage: ${up.file.storedPath})`,
    });
    await mailer.send({
      to: data.email,
      from: config.fromEmail,
      subject: `Your application has been received, ${data.opportunityTitle}`,
      text:
        `Dear ${data.fullName},\n\n` +
        `Thank you for sharing your information with us. Our team will review your profile and an ` +
        `Executive Relationship Partner will reach out if there is a relevant opportunity or if ` +
        `additional information is required.\n\n` +
        `Reference: ${record.id}\n\n- ${config.brandName}`,
    });
  } catch (err) {
    // Submission is stored; report email failure without losing the record.
    // eslint-disable-next-line no-console
    console.error('[exec-app] email failed', err);
    return NextResponse.json(
      { ok: true, id: record.id, warning: 'Saved, but confirmation email could not be sent.' },
      { status: 200 },
    );
  }

  return NextResponse.json({ ok: true, id: record.id }, { status: 200 });
}

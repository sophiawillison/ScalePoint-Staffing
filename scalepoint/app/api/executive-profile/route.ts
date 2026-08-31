import { NextRequest, NextResponse } from 'next/server';
import { executiveProfileSchema, flattenErrors } from '@/lib/validation';
import { saveUpload } from '@/lib/upload';
import { getStorage } from '@/lib/storage';
import { getMailer } from '@/lib/email';
import { config } from '@/lib/config';
import { rateLimit } from '@/lib/utils';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'local';
  if (!rateLimit(`exec-profile:${ip}`, 5, 60_000)) {
    return NextResponse.json({ ok: false, message: 'Too many submissions. Please try again shortly.' }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid submission.' }, { status: 400 });
  }

  const resume = form.get('resume');
  if (!(resume instanceof File)) {
    return NextResponse.json({ ok: false, errors: { resumeFileName: 'Please attach your resume.' } }, { status: 400 });
  }
  const up = await saveUpload(resume);
  if (!up.ok) {
    return NextResponse.json({ ok: false, errors: { resumeFileName: up.message } }, { status: 400 });
  }

  const fields: Record<string, string> = {};
  form.forEach((v, k) => { if (typeof v === 'string') fields[k] = v; });
  fields.resumeFileName = up.file.originalName;

  const parsed = executiveProfileSchema.safeParse(fields);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: flattenErrors(parsed.error) }, { status: 400 });
  }
  const data = parsed.data;

  const record = await getStorage().save('executive_profile', {
    ...data,
    resume: { storedPath: up.file.storedPath, originalName: up.file.originalName, size: up.file.size },
  });

  const mailer = getMailer();
  try {
    await mailer.send({
      to: config.internalExecutiveEmail,
      replyTo: data.email,
      subject: `[Executive Profile] ${data.currentTitle} — ${data.location} — ${data.fullName}`,
      text:
        `New confidential executive profile (ref ${record.id})\n\n` +
        `Name: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone}\nLocation: ${data.location}\n\n` +
        `Current: ${data.currentTitle}${data.currentCompany ? ' @ ' + data.currentCompany : ''}\n` +
        `Experience: ${data.yearsExperience} | Industry: ${data.industry}\n` +
        `Expertise: ${data.functionalExpertise || '—'}\n` +
        `Target comp: ${data.targetCompensation || '—'} | Preferred role: ${data.preferredRole || '—'} | Preferred location: ${data.preferredLocation || '—'}\n` +
        `LinkedIn: ${data.linkedin || '—'}\nAdditional: ${data.additionalInfo || '—'}\n\n` +
        `Resume on file: ${up.file.originalName} (internal storage: ${up.file.storedPath})`,
    });
    await mailer.send({
      to: data.email,
      from: config.fromEmail,
      subject: `Your profile has been received — ${config.brandName}`,
      text:
        `Dear ${data.fullName},\n\n` +
        `Thank you for sharing your information with us. Our team will review your profile and an ` +
        `Executive Relationship Partner will reach out if there is a relevant opportunity or if ` +
        `additional information is required.\n\nReference: ${record.id}\n\n— ${config.brandName}`,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[exec-profile] email failed', err);
    return NextResponse.json({ ok: true, id: record.id, warning: 'Saved, but confirmation email could not be sent.' });
  }

  return NextResponse.json({ ok: true, id: record.id });
}

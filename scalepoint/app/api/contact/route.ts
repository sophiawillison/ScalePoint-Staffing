import { NextRequest, NextResponse } from 'next/server';
import { contactSchema, flattenErrors } from '@/lib/validation';
import { getStorage } from '@/lib/storage';
import { getMailer } from '@/lib/email';
import { config } from '@/lib/config';
import { rateLimit } from '@/lib/utils';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'local';
  if (!rateLimit(`contact:${ip}`, 5, 60_000)) {
    return NextResponse.json({ ok: false, message: 'Too many messages. Please try again shortly.' }, { status: 429 });
  }

  let body: Record<string, string> = {};
  try {
    const form = await req.formData();
    form.forEach((v, k) => { if (typeof v === 'string') body[k] = v; });
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid submission.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: flattenErrors(parsed.error) }, { status: 400 });
  }
  const data = parsed.data;

  const record = await getStorage().save('contact_enquiry', { ...data });

  const mailer = getMailer();
  const to = data.role === 'Employer' ? config.internalEmployerEmail : config.internalExecutiveEmail;
  try {
    await mailer.send({
      to,
      replyTo: data.email,
      subject: `[Contact · ${data.role}] ${data.subject}, ${data.name}`,
      text:
        `New contact enquiry (ref ${record.id})\n\n` +
        `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || '-'}\n` +
        `Company: ${data.company || '-'}\nI am an: ${data.role}\n\n` +
        `Subject: ${data.subject}\n\nMessage:\n${data.message}`,
    });
    await mailer.send({
      to: data.email,
      from: config.fromEmail,
      subject: `We’ve received your message, ${config.brandName}`,
      text:
        `Dear ${data.name},\n\n` +
        `Thank you. We’ve received your message and one of our team members will review your enquiry and get ` +
        `in touch with you shortly.\n\nReference: ${record.id}\n\n- ${config.brandName}`,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[contact] email failed', err);
    return NextResponse.json({ ok: true, id: record.id, warning: 'Saved, but confirmation email could not be sent.' });
  }

  return NextResponse.json({ ok: true, id: record.id });
}

import { promises as fs } from 'fs';
import path from 'path';
import { config } from './config';
import { writableDir } from './paths';

// Transactional email (spec §14). Dev driver writes messages to ./.emails so you can
// read exactly what would have been sent. Production seam: Resend / SES / SendGrid.

export type EmailMessage = {
  to: string;
  from?: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

export interface Mailer {
  send(msg: EmailMessage): Promise<{ id: string; provider: string }>;
}

const EMAIL_DIR = writableDir('.emails');

class DevLogMailer implements Mailer {
  async send(msg: EmailMessage) {
    await fs.mkdir(EMAIL_DIR, { recursive: true });
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const from = msg.from ?? config.fromEmail;
    const eml =
      `To: ${msg.to}\nFrom: ${from}\n` +
      (msg.replyTo ? `Reply-To: ${msg.replyTo}\n` : '') +
      `Subject: ${msg.subject}\nDate: ${new Date().toUTCString()}\n\n${msg.text}\n`;
    await fs.writeFile(path.join(EMAIL_DIR, `${id}.eml`), eml, 'utf8');
    // eslint-disable-next-line no-console
    console.log(`[email:dev-log] wrote .emails/${id}.eml  →  ${msg.to}  |  ${msg.subject}`);
    return { id, provider: 'dev-log' };
  }
}

class ResendMailer implements Mailer {
  async send(msg: EmailMessage) {
    if (!config.resendApiKey) throw new Error('EMAIL_DRIVER=resend but RESEND_API_KEY is not set.');
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: msg.from ?? config.fromEmail,
        to: msg.to,
        subject: msg.subject,
        text: msg.text,
        html: msg.html,
        reply_to: msg.replyTo,
      }),
    });
    if (!res.ok) throw new Error(`Resend error ${res.status}: ${await res.text()}`);
    const json = (await res.json()) as { id: string };
    return { id: json.id, provider: 'resend' };
  }
}

let instance: Mailer | null = null;
export function getMailer(): Mailer {
  if (instance) return instance;
  instance = config.emailDriver === 'resend' ? new ResendMailer() : new DevLogMailer();
  return instance;
}

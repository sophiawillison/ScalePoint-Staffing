// Central configuration. Everything sensitive comes from environment variables
// with safe local-dev fallbacks (spec §17, §23). Change these in .env — no code edits.

const bool = (v: string | undefined, d = false) =>
  v == null ? d : ['1', 'true', 'yes', 'on'].includes(v.toLowerCase());

export const config = {
  // Brand (spec placeholder [BRAND_NAME])
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME ?? 'ScalePoint Staffing',
  brandShort: process.env.NEXT_PUBLIC_BRAND_SHORT ?? 'ScalePoint',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',

  // Internal routing destinations (spec §14)
  internalExecutiveEmail: process.env.INTERNAL_EXECUTIVE_EMAIL ?? 'executives@localhost',
  internalEmployerEmail: process.env.INTERNAL_EMPLOYER_EMAIL ?? 'mandates@localhost',
  fromEmail: process.env.FROM_EMAIL ?? 'noreply@localhost',
  privacyEmail: process.env.PRIVACY_EMAIL ?? 'privacy@localhost',
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '',
  companyAddress: process.env.COMPANY_ADDRESS ?? '',

  // Adapters. 'dev' = local fallbacks; swap to real providers via env.
  storageDriver: (process.env.STORAGE_DRIVER ?? 'dev-json') as 'dev-json' | 'postgres',
  emailDriver: (process.env.EMAIL_DRIVER ?? 'dev-log') as 'dev-log' | 'resend' | 'ses',
  uploadDriver: (process.env.UPLOAD_DRIVER ?? 'dev-local') as 'dev-local' | 's3' | 'supabase',

  // Uploads
  maxUploadBytes: Number(process.env.MAX_UPLOAD_BYTES ?? 10 * 1024 * 1024), // 10 MB (spec §8)
  allowedUploadTypes: ['application/pdf', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  allowedUploadExt: ['.pdf', '.doc', '.docx'],

  // Provider keys (only used when the matching driver is selected)
  resendApiKey: process.env.RESEND_API_KEY ?? '',
  databaseUrl: process.env.DATABASE_URL ?? '',

  analyticsEnabled: bool(process.env.NEXT_PUBLIC_ANALYTICS_ENABLED, false),
};

// Which production values still need to be set for live behavior.
export function missingProductionConfig(): string[] {
  const missing: string[] = [];
  if (config.storageDriver !== 'dev-json' && !config.databaseUrl) missing.push('DATABASE_URL');
  if (config.emailDriver === 'resend' && !config.resendApiKey) missing.push('RESEND_API_KEY');
  return missing;
}

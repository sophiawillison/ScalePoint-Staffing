'use client';
import { config } from './config';

// Conversion events (spec §21). Never send names, emails, phone, compensation,
// resume filenames, or free-text, categorical values only.
export type AnalyticsEvent =
  | 'audience_mode_selected'
  | 'hero_primary_cta_click'
  | 'hero_secondary_cta_click'
  | 'talent_map_market_selected'
  | 'talent_matrix_filter_changed'
  | 'opportunity_viewed'
  | 'opportunity_apply_started'
  | 'executive_profile_started'
  | 'executive_profile_completed'
  | 'employer_requirement_started'
  | 'employer_requirement_completed'
  | 'resume_upload_success'
  | 'search_brief_upload_success'
  | 'form_validation_error';

const PII_KEYS = /name|email|phone|salary|comp|resume|note|linkedin|zip|address/i;

export function track(event: AnalyticsEvent, props: Record<string, string> = {}) {
  // Strip anything that looks like PII as a safety net.
  const safe: Record<string, string> = {};
  for (const [k, v] of Object.entries(props)) {
    if (!PII_KEYS.test(k)) safe[k] = String(v).slice(0, 64);
  }
  if (config.analyticsEnabled && typeof window !== 'undefined') {
    const w = window as unknown as { gtag?: (...a: unknown[]) => void };
    w.gtag?.('event', event, safe);
  }
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event, safe);
  }
}

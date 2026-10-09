'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { track } from '@/lib/analytics';

export type Audience = 'executive' | 'employer';

type Ctx = {
  audience: Audience;
  setAudience: (a: Audience, source?: string) => void;
  ready: boolean;
};

const AudienceContext = createContext<Ctx | null>(null);
const KEY = 'scalepoint.audience';

export function AudienceProvider({ children }: { children: React.ReactNode }) {
  const [audience, setAudienceState] = useState<Audience>('executive');
  const [ready, setReady] = useState(false);

  // Restore selected mode for the browsing session. A ?mode= link wins over the
  // stored value so other pages can point at a view; the toggle stays authoritative after.
  useEffect(() => {
    try {
      const mode = new URLSearchParams(window.location.search).get('mode');
      if (mode === 'executive' || mode === 'employer') {
        setAudienceState(mode);
        try { sessionStorage.setItem(KEY, mode); } catch { /* ignore */ }
        setReady(true);
        return;
      }
      const saved = sessionStorage.getItem(KEY);
      if (saved === 'executive' || saved === 'employer') setAudienceState(saved);
    } catch {
      /* storage/URL unavailable, default stands */
    }
    setReady(true);
  }, []);

  const setAudience = useCallback((a: Audience, source = 'switcher') => {
    setAudienceState((prev) => {
      if (prev !== a) track('audience_mode_selected', { mode: a, source });
      return a;
    });
    try {
      sessionStorage.setItem(KEY, a);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <AudienceContext.Provider value={{ audience, setAudience, ready }}>
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience() {
  const ctx = useContext(AudienceContext);
  if (!ctx) throw new Error('useAudience must be used within AudienceProvider');
  return ctx;
}

// CTA system (spec §4)
export const CTA = {
  executive: {
    primary: 'Submit Your Executive Profile',
    secondary: 'Explore Executive Opportunities',
    editorial: 'How We Work',
    final: 'Submit My Executive Profile',
    finalSecondary: 'Explore Leadership Opportunities',
  },
  employer: {
    primary: 'Submit a Hiring Requirement',
    secondary: 'Explore Talent Intelligence',
    editorial: 'See Our Screening Approach',
    final: 'Brief Our Executive Search Team',
    finalSecondary: 'Explore Talent Intelligence',
  },
} as const;

export const primaryHref = (a: Audience) =>
  a === 'executive' ? '/executive-profile' : '/employer-search';
export const secondaryHref = (a: Audience) =>
  a === 'executive' ? '/opportunities' : '/talent-intelligence';

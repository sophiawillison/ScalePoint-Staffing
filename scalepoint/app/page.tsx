'use client';

import { useEffect, useState } from 'react';
import { useAudience } from '@/components/layout/AudienceProvider';
import { ExecutiveHome } from '@/components/home/ExecutiveHome';
import { EmployerHome } from '@/components/home/EmployerHome';

export default function HomePage() {
  const { audience, ready } = useAudience();
  const [render, setRender] = useState(audience);
  const [visible, setVisible] = useState(true);

  // Soft crossfade on mode change (spec §2) — no hard reload.
  useEffect(() => {
    if (audience === render) return;
    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setRender(audience); return; }
    setVisible(false);
    const t = setTimeout(() => { setRender(audience); setVisible(true); }, 260);
    return () => clearTimeout(t);
  }, [audience, render]);

  return (
    <div
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 260ms cubic-bezier(0.22,1,0.36,1)' }}
      aria-busy={!ready}
    >
      {render === 'executive' ? <ExecutiveHome /> : <EmployerHome />}
    </div>
  );
}

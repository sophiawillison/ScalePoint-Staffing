'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// A real, working video banner. Multiple <source> URLs give resilience: if the
// first fails, the browser tries the next. A poster image shows before/while the
// video loads, and a tinted gradient keeps overlaid text legible. If every source
// fails, the poster + gradient still read as an intentional premium banner.
export function HeroVideo({
  sources,
  poster,
  overlay = 'from-carbon/85 via-carbon/70 to-carbon/90',
  accent,
  className,
}: {
  sources: string[];
  poster: string;
  overlay?: string;
  accent?: string; // rgba glow
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)} aria-hidden>
      {!failed && (
        <video
          ref={ref}
          className="h-full w-full object-cover motion-safe:animate-kenburns"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          onError={() => setFailed(true)}
        >
          {sources.map((src) => (
            <source key={src} src={src} type="video/mp4" />
          ))}
        </video>
      )}
      {failed && (
        <img src={poster} alt="" className="h-full w-full object-cover motion-safe:animate-kenburns" />
      )}
      {/* legibility + brand tint */}
      <div className={cn('absolute inset-0 bg-gradient-to-b', overlay)} />
      {accent && (
        <div className="absolute inset-0" style={{ background: accent }} />
      )}
      {/* subtle grain / vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,transparent_40%,rgba(8,32,26,0.55)_100%)]" />
    </div>
  );
}

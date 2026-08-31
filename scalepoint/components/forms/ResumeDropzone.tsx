'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const ACCEPT = '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const MAX_MB = 10;

function fmtSize(n: number) {
  return n < 1024 * 1024 ? `${Math.round(n / 1024)} KB` : `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export function ResumeDropzone({
  file, onFile, error, label = 'CV / Resume', required = true,
}: {
  file: File | null;
  onFile: (f: File | null) => void;
  error?: string;
  label?: string;
  required?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [localError, setLocalError] = useState<string>('');

  const validate = (f: File): string => {
    const ext = '.' + (f.name.split('.').pop() ?? '').toLowerCase();
    if (!['.pdf', '.doc', '.docx'].includes(ext)) return 'Please upload a PDF, DOC, or DOCX file.';
    if (f.size > MAX_MB * 1024 * 1024) return `File exceeds the ${MAX_MB} MB limit.`;
    return '';
  };

  const handle = (f: File | null) => {
    if (!f) return;
    const err = validate(f);
    if (err) {
      setLocalError(err);
      onFile(null);
      return;
    }
    setLocalError('');
    onFile(f);
  };

  const shownError = error || localError;

  return (
    <div>
      <p className="field-label">
        {label} {required && <span className="text-brass" aria-hidden>*</span>}
      </p>

      {!file ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files?.[0] ?? null); }}
          className={cn(
            'rounded-card border-2 border-dashed bg-mineral/40 px-6 py-9 text-center transition-colors',
            drag ? 'border-periwinkle bg-periwinkle/5' : 'border-mist',
            shownError && 'border-[#C4504E]',
          )}
        >
          <svg aria-hidden viewBox="0 0 24 24" className="mx-auto h-9 w-9 text-slate" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <path d="M12 16V4M12 4l-4 4M12 4l4 4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" />
          </svg>
          <p className="mt-3 text-[15px] font-medium text-ink">
            Drag your resume here, or{' '}
            <button type="button" onClick={() => inputRef.current?.click()} className="text-periwinkle underline underline-offset-2 hover:text-ink">
              browse files
            </button>
          </p>
          <p className="mt-1 text-[13px] text-slate">PDF, DOC, or DOCX · up to {MAX_MB} MB</p>
          <input
            ref={inputRef} type="file" accept={ACCEPT} className="sr-only"
            aria-label={label} onChange={(e) => handle(e.target.files?.[0] ?? null)}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4 rounded-card border border-mist bg-surface px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-periwinkle/12 text-[11px] font-bold text-periwinkle">
              {(file.name.split('.').pop() ?? '').toUpperCase().slice(0, 4)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[15px] font-medium text-ink">{file.name}</p>
              <p className="text-[13px] text-slate">{fmtSize(file.size)} · attached</p>
            </div>
          </div>
          <div className="flex flex-none gap-2">
            <button type="button" onClick={() => inputRef.current?.click()} className="text-[13px] font-medium text-slate hover:text-ink">Replace</button>
            <button type="button" onClick={() => { onFile(null); setLocalError(''); }} className="text-[13px] font-medium text-[#B23B39] hover:underline">Remove</button>
            <input ref={inputRef} type="file" accept={ACCEPT} className="sr-only" aria-label={`Replace ${label}`} onChange={(e) => handle(e.target.files?.[0] ?? null)} />
          </div>
        </div>
      )}

      {shownError && <p className="field-error" role="alert">{shownError}</p>}
    </div>
  );
}

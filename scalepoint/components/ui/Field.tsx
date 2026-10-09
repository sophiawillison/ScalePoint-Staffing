'use client';

import { cn } from '@/lib/utils';

type Base = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
};

function Wrap({ id, label, error, hint, required, children, className }: Base & { children: React.ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label} {required && <span className="text-brass" aria-hidden>*</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="field-error" role="alert">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="field-hint">{hint}</p>
      ) : null}
    </div>
  );
}

const describedBy = (id: string, error?: string, hint?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

export function TextField({
  value, onChange, type = 'text', placeholder, autoComplete, inputMode, ...b
}: Base & {
  value: string; onChange: (v: string) => void; type?: string;
  placeholder?: string; autoComplete?: string; inputMode?: 'text' | 'email' | 'tel' | 'numeric' | 'url';
}) {
  return (
    <Wrap {...b}>
      <input
        id={b.id} name={b.id} type={type} value={value} placeholder={placeholder}
        autoComplete={autoComplete} inputMode={inputMode}
        aria-invalid={!!b.error} aria-describedby={describedBy(b.id, b.error, b.hint)}
        onChange={(e) => onChange(e.target.value)} className="field-input"
      />
    </Wrap>
  );
}

export function TextArea({
  value, onChange, rows = 4, placeholder, ...b
}: Base & { value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  return (
    <Wrap {...b}>
      <textarea
        id={b.id} name={b.id} rows={rows} value={value} placeholder={placeholder}
        aria-invalid={!!b.error} aria-describedby={describedBy(b.id, b.error, b.hint)}
        onChange={(e) => onChange(e.target.value)} className="field-input resize-y"
      />
    </Wrap>
  );
}

export function SelectField({
  value, onChange, options, placeholder = 'Select…', ...b
}: Base & { value: string; onChange: (v: string) => void; options: readonly string[]; placeholder?: string }) {
  return (
    <Wrap {...b}>
      <select
        id={b.id} name={b.id} value={value}
        aria-invalid={!!b.error} aria-describedby={describedBy(b.id, b.error, b.hint)}
        onChange={(e) => onChange(e.target.value)}
        className={cn('field-input appearance-none', !value && 'text-slate/70')}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o} value={o} className="text-ink">{o}</option>)}
      </select>
    </Wrap>
  );
}

import { type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Field({ label, className = "", ...rest }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-text-muted">
        {label}
      </span>
      <input
        className={`w-full rounded-sm border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-muted/40 outline-none transition-colors focus:border-gold shadow-inner ${className}`}
        {...rest}
      />
    </label>
  );
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function TextAreaField({ label, className = "", ...rest }: TextAreaFieldProps) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-text-muted">
          {label}
        </span>
      )}
      <textarea
        className={`w-full rounded-sm border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-muted/40 outline-none transition-colors focus:border-gold resize-y shadow-inner ${className}`}
        {...rest}
      />
    </label>
  );
}

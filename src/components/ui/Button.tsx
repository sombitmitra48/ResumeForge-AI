import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  loading?: boolean;
}

const variants: Record<string, string> = {
  primary: "bg-gold text-bg hover:bg-gold-light border border-gold",
  secondary: "bg-bg3 border border-border text-text hover:border-gold hover:text-gold",
  outline: "border border-border bg-transparent text-text hover:border-gold hover:text-gold",
  ghost: "bg-transparent text-text-muted hover:text-text hover:bg-bg3",
};

const sizes: Record<string, string> = {
  sm: "text-xs px-3 py-1.5 gap-1.5 uppercase tracking-[0.08em] font-semibold",
  md: "text-sm px-4 py-2 gap-2 uppercase tracking-[0.08em] font-semibold",
  lg: "text-sm px-6 py-3.5 gap-2 uppercase tracking-[0.1em] font-semibold",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  loading,
  children,
  className = "",
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : (
        icon
      )}
      {children}
    </button>
  );
}

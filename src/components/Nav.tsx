import { Link } from "react-router-dom";

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 transition-all duration-400 bg-bg/85 backdrop-blur-xl border-b border-border">
      <Link to="/" className="font-[var(--font-display)] text-2xl font-semibold tracking-wide text-text decoration-none">
        Resume<span className="text-gold">Forge</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-10 list-none">
        <a href="#how-it-works" className="text-xs tracking-[0.12em] uppercase text-text-muted hover:text-gold transition-colors">How it works</a>
        <a href="#features" className="text-xs tracking-[0.12em] uppercase text-text-muted hover:text-gold transition-colors">Features</a>
        <a href="#faq" className="text-xs tracking-[0.12em] uppercase text-text-muted hover:text-gold transition-colors">FAQ</a>
      </div>

      <Link to="/builder" className="inline-flex items-center gap-2 bg-gold text-bg px-6 py-2.5 rounded-sm font-[var(--font-sans)] text-sm font-semibold tracking-[0.08em] uppercase transition-colors hover:bg-gold-light">
        Open Builder
      </Link>
    </nav>
  );
}

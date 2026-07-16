import { Link } from "react-router-dom";
import { Button } from "./ui/Button";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-[var(--font-display)] text-lg tracking-tight text-ink">
          ResumeForge
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
          <a href="/#features" className="hover:text-ink">Features</a>
          <a href="/#pricing" className="hover:text-ink">Pricing</a>
          <a href="/#faq" className="hover:text-ink">FAQ</a>
        </nav>
        <Link to="/builder">
          <Button size="sm">Open builder</Button>
        </Link>
      </div>
    </header>
  );
}

import { motion } from "framer-motion";
import {
  Wand2,
  Target,
  LayoutTemplate,
  FileDown,
  Mail,
  BarChart3,
} from "lucide-react";

const FEATURES = [
  {
    icon: Wand2,
    title: "AI rewrite, on demand",
    body: "Turn a rough line into a sharp one. Generate summaries and bullet points grounded in what you actually did.",
  },
  {
    icon: Target,
    title: "Live ATS scoring",
    body: "Every section is scored as you write — contact completeness, quantified impact, keyword coverage, structure.",
  },
  {
    icon: LayoutTemplate,
    title: "Templates that pass parsers",
    body: "Clean single-column layouts that read correctly in applicant tracking systems, not just to the human eye.",
  },
  {
    icon: FileDown,
    title: "One-click PDF export",
    body: "Export a print-ready, A4-correct PDF with no layout breakage, straight from the editor.",
  },
  {
    icon: Mail,
    title: "Matched to the job",
    body: "Paste a job description and see which of your bullets already match it, and which skills you're missing.",
  },
  {
    icon: BarChart3,
    title: "Section-by-section breakdown",
    body: "See exactly which section is dragging your score down instead of one opaque number.",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-lg">
        <h2 className="font-[var(--font-display)] text-3xl tracking-tight text-ink md:text-4xl">
          Everything a first draft is missing
        </h2>
        <p className="mt-3 text-ink-soft">
          Most builders style your resume. This one edits it.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group bg-paper p-7 transition-colors hover:bg-white"
          >
            <f.icon size={20} className="text-cobalt" strokeWidth={1.75} />
            <h3 className="mt-4 text-[15px] font-semibold text-ink">{f.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{f.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Pricing removed — the app is free to use. Kept file for landing sections (features/faq/footer).

export function Pricing() {
  // Pricing UI removed — app is free to use. Keep component to avoid changing layout.
  return null;
}

const FAQS = [
  {
    q: "Is this actually free to try?",
    a: "Yes — the builder, live preview, and PDF export all work without an account in this demo build.",
  },
  {
    q: "Does the AI rewrite use my real API key?",
    a: "By default it runs on offline sample suggestions so the demo works instantly. Add your own OpenAI key in Settings to get live rewrites.",
  },
  {
    q: "What does the ATS score actually measure?",
    a: "Contact completeness, summary quality, quantified impact in your bullets, skill coverage, and whether core sections are filled in — the same signals real parsers look for.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
      <h2 className="font-[var(--font-display)] text-3xl tracking-tight text-ink">
        Questions
      </h2>
      <div className="mt-8 divide-y divide-line border-y border-line">
        {FAQS.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-ink">
              {f.q}
              <span className="text-ink-soft/50 transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
        <p className="font-[var(--font-display)] text-lg text-ink">ResumeForge</p>
        <p className="text-sm text-ink-soft">Built as a working demo — not a production SaaS.</p>
      </div>
    </footer>
  );
}

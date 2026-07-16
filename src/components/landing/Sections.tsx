import { motion } from "framer-motion";
import {
  Wand2,
  Target,
  LayoutTemplate,
  FileDown,
  Mail,
  Shield,
} from "lucide-react";

const FEATURES = [
  {
    icon: Target,
    title: "JD Match Analyzer",
    body: "Paste any job description and instantly see your match score, missing keywords, and how to close the gap.",
  },
  {
    icon: Wand2,
    title: "AI Resume Tailor",
    body: "One click rewrites your summary, suggests power bullets, and adds missing skills tailored to the role.",
  },
  {
    icon: Mail,
    title: "Cover Letter Builder",
    body: "Generate a tailored cover letter in seconds. Choose your tone, edit inline, and download instantly.",
  },
  {
    icon: LayoutTemplate,
    title: "10 ATS-Ready Templates",
    body: "From classic to creative designs, every template is verified for ATS compatibility. Switch anytime.",
  },
  {
    icon: FileDown,
    title: "PDF & DOCX Export",
    body: "Download in any format instantly. No watermarks, no paywalls, completely free forever.",
  },
  {
    icon: Shield,
    title: "Local Privacy",
    body: "Your resume stays in your browser until you choose to download or process it. Your data is yours.",
  },
];

export function Features() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 md:px-12 py-32">
      <div className="flex items-center gap-3 font-[var(--font-mono)] text-xs tracking-[0.2em] uppercase text-gold mb-6">
        <div className="w-6 h-px bg-gold"></div>
        Everything You Need
      </div>
      
      <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-light leading-[1.1] mb-4 text-text">
        Tools that used to cost $30/month<br/>
        <em className="italic text-gold">now completely free.</em>
      </h2>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] border border-border bg-border">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-bg2 p-10 relative transition-colors hover:bg-bg3"
          >
            <div className="w-12 h-12 border border-border rounded-sm flex items-center justify-center text-gold mb-8">
              <f.icon size={20} strokeWidth={1.5} />
            </div>
            <h3 className="font-[var(--font-sans)] font-medium text-lg text-text mb-3">{f.title}</h3>
            <p className="text-sm leading-relaxed text-text-muted">{f.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Pricing() {
  return null;
}

const FAQS = [
  {
    q: "Is this actually free to try?",
    a: "Yes — the builder, live preview, and PDF export all work completely free. No hidden paywalls.",
  },
  {
    q: "How does the AI Tailor work?",
    a: "You provide an OpenAI API key in your settings (stored only locally in your browser). We use it to rewrite your summary and bullets based on the Job Description you provide.",
  },
  {
    q: "What does the JD Match score measure?",
    a: "It compares your resume against the Job Description to find missing keywords, skills, and overall alignment, exactly like an ATS parser does.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="max-w-4xl mx-auto px-6 md:px-12 py-32">
      <div className="flex items-center gap-3 font-[var(--font-mono)] text-xs tracking-[0.2em] uppercase text-gold mb-6">
        <div className="w-6 h-px bg-gold"></div>
        Common Questions
      </div>
      
      <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-light text-text mb-12">
        Questions & Answers
      </h2>
      
      <div className="border-t border-border">
        {FAQS.map((f) => (
          <details key={f.q} className="group border-b border-border py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-[var(--font-display)] text-text">
              {f.q}
              <span className="text-gold transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 text-sm leading-relaxed text-text-muted font-[var(--font-sans)]">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg2">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-[var(--font-display)] text-xl font-semibold tracking-wide text-text">
          Resume<span className="text-gold">Forge</span>
        </div>
        <p className="text-xs tracking-[0.1em] text-text-muted uppercase">
          Build resumes that get read.
        </p>
      </div>
    </footer>
  );
}

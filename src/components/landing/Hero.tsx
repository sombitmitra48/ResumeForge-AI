import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

const LINES = [
  { w: "62%", h: "h-4", delay: 0 },
  { w: "40%", h: "h-2.5", delay: 0.05 },
  { w: "88%", h: "h-2.5", delay: 0.1 },
  { w: "75%", h: "h-2.5", delay: 0.15 },
  { w: "50%", h: "h-2.5", delay: 0.2 },
];

export function Hero() {
  const [score, setScore] = useState(61);

  useEffect(() => {
    const t = setTimeout(() => setScore(94), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 pb-24 pt-20 md:grid-cols-2 md:pt-28">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-ink-soft">
            <Sparkles size={12} className="text-cobalt" />
            AI editing, not AI guessing
          </span>
          <h1 className="mt-6 font-[var(--font-display)] text-5xl leading-[1.05] tracking-tight text-ink md:text-6xl">
            Write a resume<br />
            that survives the <span className="italic text-cobalt">first filter.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            ResumeForge scores every draft against real ATS criteria as you type,
            and rewrites weak lines into ones a recruiter actually reads.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/builder">
              <Button size="lg" icon={<ArrowRight size={16} />} className="flex-row-reverse">
                Start building — it's free
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline">
                See how it scores
              </Button>
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="paper-shadow rounded-2xl bg-white p-7">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-3 w-28 rounded bg-ink/80" />
                <div className="mt-2 h-2 w-20 rounded bg-ink/20" />
              </div>
              <motion.div
                key={score}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center rounded-full border border-success/30 bg-success-dim px-3 py-1.5"
              >
                <span className="font-[var(--font-mono)] text-sm font-medium text-success">{score}</span>
                <span className="text-[9px] uppercase tracking-wide text-success/80">ATS</span>
              </motion.div>
            </div>

            <div className="mt-6 space-y-2.5">
              {LINES.map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ width: 0 }}
                  animate={{ width: l.w }}
                  transition={{ duration: 0.5, delay: 0.3 + l.delay }}
                  className={`${l.h} rounded bg-paper-dim`}
                  style={{ width: l.w }}
                />
              ))}
            </div>

            <div className="mt-6 border-t border-line pt-4">
              <div className="h-2 w-24 rounded bg-ink/30" />
              <div className="mt-3 space-y-2">
                <div className="h-2 w-full rounded bg-paper-dim" />
                <div className="h-2 w-5/6 rounded bg-paper-dim" />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.4 }}
            className="paper-shadow absolute -left-8 bottom-10 hidden w-52 rounded-xl bg-ink p-3.5 text-paper md:block"
          >
            <p className="text-[11px] leading-snug text-paper/70">Rewrite suggestion</p>
            <p className="mt-1 text-xs leading-snug">
              "Led migration cutting deploy time <span className="text-amber">62%</span>"
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

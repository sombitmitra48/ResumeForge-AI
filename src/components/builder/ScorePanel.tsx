import { computeATSScore } from "../../lib/atsScore";
import type { ResumeData } from "../../types/resume";

function tone(score: number) {
  if (score >= 80) return { bar: "bg-success", text: "text-success" };
  if (score >= 50) return { bar: "bg-amber", text: "text-amber" };
  return { bar: "bg-danger", text: "text-danger" };
}

export function ScorePanel({ resume }: { resume: ResumeData }) {
  const { overall, sections } = computeATSScore(resume);
  const t = tone(overall);

  return (
    <div className="rounded-xl border border-line bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-soft/70">ATS score</p>
        <span className={`font-[var(--font-mono)] text-lg font-semibold ${t.text}`}>{overall}</span>
      </div>
      <div className="mt-2 h-1.5 w-full rounded-full bg-paper-dim">
        <div className={`h-1.5 rounded-full transition-all duration-500 ${t.bar}`} style={{ width: `${overall}%` }} />
      </div>

      <div className="mt-5 space-y-3.5">
        {sections.map((s) => {
          const st = tone(s.score);
          return (
            <div key={s.label}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-ink">{s.label}</span>
                <span className={`font-[var(--font-mono)] ${st.text}`}>{s.score}</span>
              </div>
              <div className="mt-1 h-1 w-full rounded-full bg-paper-dim">
                <div className={`h-1 rounded-full ${st.bar}`} style={{ width: `${s.score}%` }} />
              </div>
              <p className="mt-1 text-[11px] leading-snug text-ink-soft">{s.note}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

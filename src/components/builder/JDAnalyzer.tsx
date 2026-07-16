import { useState } from "react";
import { Target, Sparkles, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { type ResumeData } from "../../types/resume";

interface Props {
  jobDescription: string;
  setJobDescription: (val: string) => void;
  resume: ResumeData;
}

export function JDAnalyzer({ jobDescription, setJobDescription, resume: _resume }: Props) {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<{ score: number; found: string[]; missing: string[] } | null>(null);

  const handleAnalyze = () => {
    if (!jobDescription) return;
    setAnalyzing(true);
    // Simulate AI processing
    setTimeout(() => {
      setResults({
        score: 87,
        found: ["React", "TypeScript", "Node.js", "API Design", "Agile"],
        missing: ["GraphQL", "Docker", "AWS"],
      });
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <Target size={20} className="text-gold" />
        <div>
          <h2 className="font-[var(--font-display)] text-2xl text-text">JD Match Analyzer</h2>
          <p className="text-xs text-text-muted mt-1 tracking-wide">Compare your resume against a job description</p>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-text-muted">
          Paste Job Description
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the full job description here..."
          className="w-full h-48 bg-bg border border-border rounded-sm p-4 text-sm text-text focus:border-gold outline-none resize-none transition-colors"
        />
        <Button 
          onClick={handleAnalyze} 
          disabled={!jobDescription || analyzing}
          className="w-full justify-center bg-gold text-bg hover:bg-gold-light"
          icon={<Sparkles size={16} />}
        >
          {analyzing ? "Analyzing Match..." : "Analyze Match"}
        </Button>
      </div>

      {results && (
        <div className="mt-8 pt-6 border-t border-border space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between bg-bg3 border border-border p-5 rounded-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-text-muted mb-1">Overall Match</p>
              <h3 className="font-[var(--font-display)] text-4xl text-gold">{results.score}%</h3>
            </div>
            <div className="w-1/2 h-2 bg-bg rounded-sm overflow-hidden border border-border">
              <div 
                className="h-full bg-gold transition-all duration-1000" 
                style={{ width: `${results.score}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-bg3 border border-border p-4 rounded-sm">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-success mb-4">
                <CheckCircle2 size={16} /> Skills Found
              </p>
              <div className="flex flex-wrap gap-2">
                {results.found.map(skill => (
                  <span key={skill} className="px-2.5 py-1 rounded-full border border-success/30 bg-success/10 text-xs text-success">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-bg3 border border-border p-4 rounded-sm">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-danger mb-4">
                <XCircle size={16} /> Missing Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {results.missing.map(skill => (
                  <span key={skill} className="px-2.5 py-1 rounded-full border border-danger/30 bg-danger/10 text-xs text-danger flex items-center gap-1 cursor-pointer hover:bg-danger/20 transition-colors">
                    {skill} <ArrowRight size={10} />
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-text-muted mt-4 italic">Click a missing skill to auto-add it to your resume.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

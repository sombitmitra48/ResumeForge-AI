import { useState } from "react";
import { Mail, Sparkles, Copy, Download } from "lucide-react";
import { Button } from "../ui/Button";
import { type ResumeData } from "../../types/resume";

interface Props {
  jobDescription: string;
  resume: ResumeData;
}

export function CoverLetterBuilder({ jobDescription: _jobDescription, resume }: Props) {
  const [generating, setGenerating] = useState(false);
  const [letter, setLetter] = useState("");
  const [tone, setTone] = useState("professional");

  const handleGenerate = () => {
    setGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setLetter(`Dear Hiring Manager,

I am writing to express my strong interest in the open position. With my background in ${resume.personal.headline || 'software engineering'} and my proven track record of delivering high-quality results, I am confident I would be a valuable addition to your team.

My experience aligns well with the qualifications you are seeking. In my previous roles, I have consistently demonstrated my ability to solve complex problems and collaborate effectively across teams.

I would welcome the opportunity to discuss how my skills and experiences align with your needs. Thank you for your time and consideration.

Sincerely,
${resume.personal.fullName || 'Jane Doe'}
${resume.personal.email || ''}`);
      setGenerating(false);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letter);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([letter], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "Cover_Letter.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <Mail size={20} className="text-gold" />
        <div>
          <h2 className="font-[var(--font-display)] text-2xl text-text">Cover Letter</h2>
          <p className="text-xs text-text-muted mt-1 tracking-wide">Generate a tailored cover letter in seconds</p>
        </div>
      </div>

      {!letter ? (
        <div className="space-y-6">
          <div className="bg-bg3 border border-border p-5 rounded-sm">
            <p className="text-sm text-text-muted mb-4 leading-relaxed">
              We will generate a cover letter based on your current resume content and the Job Description you pasted in the JD Match tab.
            </p>
            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-text-muted mb-2">
                Select Tone
              </label>
              <div className="flex gap-2">
                {['professional', 'enthusiastic', 'concise'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-3 py-1.5 rounded-sm text-xs capitalize transition-colors ${
                      tone === t ? "bg-gold text-bg font-semibold" : "bg-bg border border-border text-text-muted hover:text-text"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={handleGenerate} 
              disabled={generating}
              className="w-full justify-center bg-gold text-bg hover:bg-gold-light"
              icon={<Sparkles size={16} />}
            >
              {generating ? "Writing your letter..." : "Generate Cover Letter"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-text-muted">Generated Letter ({tone})</span>
            <div className="flex gap-2">
              <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors px-2 py-1">
                <Copy size={14} /> Copy
              </button>
              <button onClick={handleDownload} className="flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors px-2 py-1">
                <Download size={14} /> Save .txt
              </button>
            </div>
          </div>
          
          <textarea
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            className="w-full h-96 bg-bg border border-border rounded-sm p-5 text-sm text-text font-[var(--font-sans)] leading-relaxed focus:border-gold outline-none resize-none transition-colors shadow-inner"
          />
          
          <Button onClick={() => setLetter("")} variant="outline" className="w-full justify-center">
            Start Over
          </Button>
        </div>
      )}
    </div>
  );
}

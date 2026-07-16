import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, LayoutTemplate, Sparkles as SparklesIcon, WandSparkles, Target, Mail } from "lucide-react";
import { useResume } from "../hooks/useResume";
import { PersonalForm } from "../components/builder/PersonalForm";
import { SummaryForm } from "../components/builder/SummaryForm";
import { ExperienceForm } from "../components/builder/ExperienceForm";
import { EducationForm } from "../components/builder/EducationForm";
import { ProjectsForm } from "../components/builder/ProjectsForm";
import { SkillsForm } from "../components/builder/SkillsForm";
import { ResumePreview } from "../components/builder/ResumePreview";
import { ScorePanel } from "../components/builder/ScorePanel";
import { SettingsPopover } from "../components/builder/SettingsPopover";
import { JDAnalyzer } from "../components/builder/JDAnalyzer";
import { CoverLetterBuilder } from "../components/builder/CoverLetterBuilder";

import { sampleResume, type TemplateId } from "../types/resume";

const TABS = [
  { id: "personal", label: "Personal" },
  { id: "summary", label: "Summary" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
] as const;

const AI_TABS = [
  { id: "jd-match", label: "JD Match Analyzer", icon: Target },
  { id: "cover-letter", label: "Cover Letter", icon: Mail },
] as const;

const TEMPLATES: { id: TemplateId; label: string }[] = [
  { id: "minimal", label: "Minimal" },
  { id: "corporate", label: "Corporate" },
  { id: "modern", label: "Modern" },
];

import { useReactToPrint } from "react-to-print";
import { ResumePrintView } from "../components/builder/ResumePrintView";

export function BuilderPage() {
  const { resume, update, replace, savedAt } = useResume();
  const [tab, setTab] = useState<string>("personal");
  const [jobDescription, setJobDescription] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const handleExport = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${resume.personal.fullName || "resume"}`,
  });

  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-text-muted hover:text-gold transition-colors">
              <ArrowLeft size={18} />
            </Link>
            <input
              value={resume.name}
              onChange={(e) => update({ name: e.target.value })}
              className="bg-transparent text-sm font-[var(--font-sans)] text-text outline-none focus:text-gold transition-colors"
            />
            <span className="hidden text-[11px] font-[var(--font-mono)] text-text-muted/60 sm:inline uppercase tracking-widest">
              {savedAt ? `Saved ${savedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "Saving..."}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => replace(sampleResume())} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-text-muted hover:text-gold transition-colors px-3 py-1.5 border border-border rounded-sm hover:border-gold">
              <WandSparkles size={14} /> Sample
            </button>
            <SettingsPopover />
            <button onClick={handleExport} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] bg-gold text-bg hover:bg-gold-light transition-colors px-4 py-2 rounded-sm shadow-md">
              <Download size={14} /> Export PDF
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[240px_1fr_480px]">
        {/* Left: section nav + template picker */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="mb-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Resume Content</p>
            <nav className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`whitespace-nowrap rounded-sm px-4 py-2.5 text-left text-sm transition-all ${
                    tab === t.id ? "bg-bg2 border-l-2 border-gold text-gold shadow-sm" : "text-text-muted hover:bg-bg2 hover:text-text border-l-2 border-transparent"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mb-8">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold mt-6 border-t border-border pt-6">AI Tools</p>
            <nav className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
              {AI_TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`whitespace-nowrap rounded-sm px-4 py-2.5 text-left text-sm flex items-center gap-2 transition-all ${
                    tab === t.id ? "bg-bg2 border-l-2 border-gold text-gold shadow-sm" : "text-text-muted hover:bg-bg2 hover:text-text border-l-2 border-transparent"
                  }`}
                >
                  <t.icon size={16} /> {t.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <p className="mb-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
              <LayoutTemplate size={14} /> Template
            </p>
            <div className="space-y-2">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => update({ template: t.id })}
                  className={`w-full rounded-sm border px-4 py-2.5 text-left text-xs font-medium uppercase tracking-[0.08em] transition-all ${
                    resume.template === t.id ? "border-gold bg-[rgba(201,168,76,0.1)] text-gold shadow-[0_0_10px_rgba(201,168,76,0.2)]" : "border-border bg-bg2 text-text-muted hover:border-gold hover:text-gold"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <ScorePanel resume={resume} />
          </div>
        </aside>

        {/* Middle: active form */}
        <main className="min-w-0">
          <div className="rounded-sm border border-border bg-bg2 p-6 shadow-xl">
            {tab === "personal" && <PersonalForm value={resume.personal} onChange={(v) => update({ personal: v })} />}
            {tab === "summary" && <SummaryForm value={resume.summary} onChange={(v) => update({ summary: v })} personal={resume.personal} />}
            {tab === "experience" && <ExperienceForm value={resume.experience} onChange={(v) => update({ experience: v })} />}
            {tab === "projects" && <ProjectsForm value={resume.projects} onChange={(v) => update({ projects: v })} />}
            {tab === "education" && <EducationForm value={resume.education} onChange={(v) => update({ education: v })} />}
            {tab === "skills" && <SkillsForm value={resume.skills} onChange={(v) => update({ skills: v })} personal={resume.personal} />}
            {tab === "jd-match" && <JDAnalyzer jobDescription={jobDescription} setJobDescription={setJobDescription} resume={resume} />}
            {tab === "cover-letter" && <CoverLetterBuilder jobDescription={jobDescription} resume={resume} />}
          </div>
        </main>

        {/* Right: live preview */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="flex items-center justify-between mb-3">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
              <SparklesIcon size={13} /> Live preview
            </p>
          </div>
          {/* Note: ResumePreview handles its own styling, but we wrap it to ensure it stays white for printing/previewing */}
          <div className="rounded-sm overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(201,168,76,0.3)]">
            <ResumePreview ref={previewRef} resume={resume} />
          </div>
        </aside>
      </div>

      {/* Hidden print view for PDF generation */}
      <div style={{ display: 'none' }}>
        <ResumePrintView ref={printRef} resume={resume} />
      </div>
    </div>
  );
}

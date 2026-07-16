import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, LayoutTemplate, Sparkles as SparklesIcon, WandSparkles } from "lucide-react";
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
import { Button } from "../components/ui/Button";
import { sampleResume, type TemplateId } from "../types/resume";

const TABS = [
  { id: "personal", label: "Personal" },
  { id: "summary", label: "Summary" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
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
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("personal");
  const previewRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const handleExport = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${resume.personal.fullName || "resume"}`,
  });

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-ink-soft hover:text-ink">
              <ArrowLeft size={18} />
            </Link>
            <input
              value={resume.name}
              onChange={(e) => update({ name: e.target.value })}
              className="bg-transparent text-sm font-medium text-ink outline-none"
            />
            <span className="hidden text-[11px] text-ink-soft/50 sm:inline">
              {savedAt ? `Saved ${savedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "Saving..."}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Button variant="ghost" size="sm" icon={<WandSparkles size={14} />} onClick={() => replace(sampleResume())}>
              Load sample
            </Button>
            <SettingsPopover />
            <Button size="sm" icon={<Download size={14} />} onClick={handleExport}>
              Export PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-[220px_1fr_460px]">
        {/* Left: section nav + template picker */}
        <aside className="lg:sticky lg:top-20 lg:h-fit">
          <nav className="flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`whitespace-nowrap rounded-lg px-3.5 py-2.5 text-left text-sm font-medium transition-colors ${
                  tab === t.id ? "bg-ink text-paper" : "text-ink-soft hover:bg-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>

          <div className="mt-6">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft/70">
              <LayoutTemplate size={13} /> Template
            </p>
            <div className="space-y-1.5">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => update({ template: t.id })}
                  className={`w-full rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors ${
                    resume.template === t.id ? "border-cobalt bg-cobalt-dim text-cobalt" : "border-line bg-white text-ink-soft hover:border-ink"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <ScorePanel resume={resume} />
          </div>
        </aside>

        {/* Middle: active form */}
        <main className="min-w-0">
          <div className="rounded-xl border border-line bg-paper-dim/40 p-5">
            {tab === "personal" && <PersonalForm value={resume.personal} onChange={(v) => update({ personal: v })} />}
            {tab === "summary" && <SummaryForm value={resume.summary} onChange={(v) => update({ summary: v })} personal={resume.personal} />}
            {tab === "experience" && <ExperienceForm value={resume.experience} onChange={(v) => update({ experience: v })} />}
            {tab === "projects" && <ProjectsForm value={resume.projects} onChange={(v) => update({ projects: v })} />}
            {tab === "education" && <EducationForm value={resume.education} onChange={(v) => update({ education: v })} />}
            {tab === "skills" && <SkillsForm value={resume.skills} onChange={(v) => update({ skills: v })} personal={resume.personal} />}
          </div>
        </main>

        {/* Right: live preview */}
        <aside className="lg:sticky lg:top-20 lg:h-fit">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft/70">
            <SparklesIcon size={13} /> Live preview
          </p>
          <ResumePreview ref={previewRef} resume={resume} />
        </aside>
      </div>

      {/* Hidden print view for PDF generation */}
      <div style={{ display: 'none' }}>
        <ResumePrintView ref={printRef} resume={resume} />
      </div>
    </div>
  );
}

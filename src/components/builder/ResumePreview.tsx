import { forwardRef } from "react";
import type { ResumeData } from "../../types/resume";

function Contact({ r }: { r: ResumeData }) {
  const items = [r.personal.email, r.personal.phone, r.personal.location, r.personal.website, r.personal.linkedin, r.personal.github].filter(Boolean);
  return <p className="text-[10.5px] text-neutral-500">{items.join("  ·  ")}</p>;
}

export function MinimalTemplate({ r, hideHeader, hideContact }: { r: ResumeData; hideHeader?: boolean; hideContact?: boolean }) {
  return (
    <div className="font-sans text-neutral-900">
      {!hideHeader && (
        <>
          <h1 className="text-2xl font-semibold tracking-tight">{r.personal.fullName || "Your Name"}</h1>
          <p className="mt-0.5 text-sm text-neutral-600">{r.personal.headline}</p>
        </>
      )}
      {!hideContact && <div className="mt-1.5"><Contact r={r} /></div>}

      {r.summary && (
        <section className="mt-4">
          <p className="text-[12px] leading-relaxed text-neutral-700">{r.summary}</p>
        </section>
      )}

      {r.experience.length > 0 && (
        <Section title="Experience">
          {r.experience.map((e) => (
            <div key={e.id} className="mb-3">
              <div className="flex items-baseline justify-between">
                <p className="text-[12.5px] font-medium">{e.role} <span className="font-normal text-neutral-500">— {e.company}</span></p>
                <p className="text-[10.5px] text-neutral-500">{e.startDate} – {e.endDate}</p>
              </div>
              <ul className="mt-1 list-disc space-y-0.5 pl-4">
                {e.bullets.filter(Boolean).map((b, i) => (
                  <li key={i} className="text-[11.5px] leading-snug text-neutral-700">{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {r.projects.length > 0 && (
        <Section title="Projects">
          {r.projects.map((p) => (
            <div key={p.id} className="mb-3">
              <p className="text-[12.5px] font-medium">{p.name} {p.link && <span className="font-normal text-neutral-500">— {p.link}</span>}</p>
              {p.description && <p className="text-[11.5px] text-neutral-600">{p.description}</p>}
              <ul className="mt-1 list-disc space-y-0.5 pl-4">
                {p.bullets.filter(Boolean).map((b, i) => (
                  <li key={i} className="text-[11.5px] leading-snug text-neutral-700">{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {r.education.length > 0 && (
        <Section title="Education">
          {r.education.map((e) => (
            <div key={e.id} className="mb-2">
              <div className="flex items-baseline justify-between">
                <p className="text-[12.5px] font-medium">{e.degree}<span className="font-normal text-neutral-500"> — {e.school}</span></p>
                <p className="text-[10.5px] text-neutral-500">{e.startDate} – {e.endDate}</p>
              </div>
              {e.details && <p className="text-[11px] text-neutral-600">{e.details}</p>}
            </div>
          ))}
        </Section>
      )}

      {r.skills.length > 0 && (
        <Section title="Skills">
          {r.skills.map((g) => (
            <p key={g.id} className="text-[11.5px] text-neutral-700">
              <span className="font-medium text-neutral-900">{g.label}: </span>
              {g.items.join(", ")}
            </p>
          ))}
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-4">
      <h2 className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-neutral-500 border-b border-neutral-200 pb-1">{title}</h2>
      {children}
    </section>
  );
}

export function CorporateTemplate({ r }: { r: ResumeData }) {
  return (
    <div className="font-sans text-neutral-900">
      <div className="border-b-2 border-neutral-900 pb-3">
        <h1 className="text-[26px] font-bold uppercase tracking-wide">{r.personal.fullName || "Your Name"}</h1>
        <p className="text-[12px] text-neutral-600">{r.personal.headline}</p>
      </div>
      <div className="mt-2"><Contact r={r} /></div>
      <MinimalTemplate r={{ ...r, personal: { ...r.personal, fullName: "", headline: "" } }} hideHeader hideContact />
    </div>
  );
}

export function ModernTemplate({ r }: { r: ResumeData }) {
  return (
    <div className="grid grid-cols-[1fr_2fr] gap-6 font-sans text-neutral-900">
      <div className="rounded-lg bg-neutral-50 p-4">
        <h1 className="text-xl font-semibold">{r.personal.fullName || "Your Name"}</h1>
        <p className="mt-0.5 text-[11px] text-cobalt">{r.personal.headline}</p>
        <div className="mt-3 space-y-1 text-[10.5px] text-neutral-600">
          {[r.personal.email, r.personal.phone, r.personal.location, r.personal.website, r.personal.linkedin, r.personal.github]
            .filter(Boolean)
            .map((c) => <p key={c}>{c}</p>)}
        </div>
        {r.skills.length > 0 && (
          <div className="mt-5">
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Skills</h2>
            {r.skills.map((g) => (
              <div key={g.id} className="mt-2">
                <p className="text-[10.5px] font-medium">{g.label}</p>
                <p className="text-[10.5px] text-neutral-600">{g.items.join(", ")}</p>
              </div>
            ))}
          </div>
        )}
        {r.education.length > 0 && (
          <div className="mt-5">
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Education</h2>
            {r.education.map((e) => (
              <div key={e.id} className="mt-2">
                <p className="text-[10.5px] font-medium">{e.degree}</p>
                <p className="text-[10px] text-neutral-500">{e.school} · {e.startDate}–{e.endDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        {r.summary && <p className="text-[11.5px] leading-relaxed text-neutral-700">{r.summary}</p>}
        {r.experience.length > 0 && (
          <Section title="Experience">
            {r.experience.map((e) => (
              <div key={e.id} className="mb-3">
                <div className="flex items-baseline justify-between">
                  <p className="text-[12.5px] font-medium">{e.role} <span className="font-normal text-neutral-500">— {e.company}</span></p>
                  <p className="text-[10.5px] text-neutral-500">{e.startDate} – {e.endDate}</p>
                </div>
                <ul className="mt-1 list-disc space-y-0.5 pl-4">
                  {e.bullets.filter(Boolean).map((b, i) => (
                    <li key={i} className="text-[11.5px] leading-snug text-neutral-700">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>
        )}
        {r.projects.length > 0 && (
          <Section title="Projects">
            {r.projects.map((p) => (
              <div key={p.id} className="mb-3">
                <p className="text-[12.5px] font-medium">{p.name}</p>
                <ul className="mt-1 list-disc space-y-0.5 pl-4">
                  {p.bullets.filter(Boolean).map((b, i) => (
                    <li key={i} className="text-[11.5px] leading-snug text-neutral-700">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>
        )}
      </div>
    </div>
  );
}

export const ResumePreview = forwardRef<HTMLDivElement, { resume: ResumeData }>(({ resume }, ref) => {
  return (
    <div className="mx-auto w-full max-w-[600px] overflow-hidden rounded-md paper-shadow">
      <div className="aspect-[210/297] w-full overflow-y-auto bg-neutral-100/50">
        <div ref={ref} id="resume-preview-surface" className="min-h-[100%] w-full bg-white p-10">
          {resume.template === "minimal" && <MinimalTemplate r={resume} />}
          {resume.template === "corporate" && <CorporateTemplate r={resume} />}
          {resume.template === "modern" && <ModernTemplate r={resume} />}
        </div>
      </div>
    </div>
  );
});
ResumePreview.displayName = "ResumePreview";

import { forwardRef } from "react";
import type { ResumeData } from "../../types/resume";
import { MinimalTemplate, CorporateTemplate, ModernTemplate } from "./ResumePreview";

export const ResumePrintView = forwardRef<HTMLDivElement, { resume: ResumeData }>(({ resume }, ref) => {
  return (
    <div ref={ref} className="bg-white text-black p-10 print:bg-white print:m-0" style={{ width: '210mm', minHeight: '297mm' }}>
      {resume.template === "minimal" && <MinimalTemplate r={resume} />}
      {resume.template === "corporate" && <CorporateTemplate r={resume} />}
      {resume.template === "modern" && <ModernTemplate r={resume} />}
    </div>
  );
});

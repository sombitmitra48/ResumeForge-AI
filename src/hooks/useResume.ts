import { useEffect, useState } from "react";
import { type ResumeData, emptyResume } from "../types/resume";

const STORAGE_KEY = "resumeforge_active_resume";

function load(): ResumeData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fall through to empty
  }
  return emptyResume();
}

export function useResume() {
  const [resume, setResume] = useState<ResumeData>(load);
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...resume, updatedAt: new Date().toISOString() }));
      setSavedAt(new Date());
    }, 400);
    return () => clearTimeout(t);
  }, [resume]);

  function update(patch: Partial<ResumeData>) {
    setResume((prev) => ({ ...prev, ...patch }));
  }

  function replace(next: ResumeData) {
    setResume(next);
  }

  return { resume, update, replace, savedAt };
}

import type { ResumeData } from "../types/resume";

export interface ScoreBreakdown {
  overall: number;
  sections: { label: string; score: number; note: string }[];
}

const WEAK_VERBS = ["responsible for", "worked on", "helped with", "in charge of", "duties included"];

function scoreContact(r: ResumeData) {
  const p = r.personal;
  const filled = [p.fullName, p.email, p.phone, p.location].filter(Boolean).length;
  const score = Math.round((filled / 4) * 100);
  return {
    label: "Contact info",
    score,
    note: filled === 4 ? "All key fields present" : "Missing phone, location, or email",
  };
}

function scoreSummary(r: ResumeData) {
  const len = r.summary.trim().length;
  let score = 0;
  if (len === 0) score = 0;
  else if (len < 60) score = 40;
  else if (len < 400) score = 95;
  else score = 65;
  return {
    label: "Summary",
    score,
    note: len === 0 ? "No summary written" : len < 60 ? "Too short to be useful" : "Good length",
  };
}

function scoreExperience(r: ResumeData) {
  if (r.experience.length === 0) {
    return { label: "Experience", score: 0, note: "No experience entries" };
  }
  const bullets = r.experience.flatMap((e) => e.bullets).filter(Boolean);
  const hasNumbers = bullets.filter((b) => /\d/.test(b)).length;
  const weak = bullets.filter((b) =>
    WEAK_VERBS.some((w) => b.toLowerCase().includes(w))
  ).length;
  let score = 50;
  if (bullets.length >= 3) score += 20;
  score += Math.min(20, hasNumbers * 5);
  score -= Math.min(30, weak * 10);
  score = Math.max(0, Math.min(100, score));
  return {
    label: "Experience",
    score,
    note:
      weak > 0
        ? `${weak} bullet(s) use passive phrasing — try action verbs`
        : hasNumbers > 0
        ? "Good use of quantified impact"
        : "Add numbers to show measurable impact",
  };
}

function scoreSkills(r: ResumeData) {
  const total = r.skills.reduce((n, g) => n + g.items.length, 0);
  const score = Math.min(100, total * 8);
  return {
    label: "Skills",
    score,
    note: total < 5 ? "List more relevant skills for keyword matching" : "Solid skill coverage",
  };
}

function scoreFormatting(r: ResumeData) {
  const sectionsPresent = [
    r.summary.length > 0,
    r.experience.length > 0,
    r.education.length > 0,
    r.skills.length > 0,
  ].filter(Boolean).length;
  const score = Math.round((sectionsPresent / 4) * 100);
  return {
    label: "Structure",
    score,
    note: sectionsPresent === 4 ? "All core sections present" : "Some core sections are empty",
  };
}

export function computeATSScore(r: ResumeData): ScoreBreakdown {
  const sections = [
    scoreContact(r),
    scoreSummary(r),
    scoreExperience(r),
    scoreSkills(r),
    scoreFormatting(r),
  ];
  const overall = Math.round(sections.reduce((n, s) => n + s.score, 0) / sections.length);
  return { overall, sections };
}

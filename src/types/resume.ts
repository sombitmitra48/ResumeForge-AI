export interface PersonalInfo {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  details: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  link: string;
  description: string;
  bullets: string[];
}

export interface SkillGroup {
  id: string;
  label: string;
  items: string[];
}

export type TemplateId = "minimal" | "corporate" | "modern";

export interface ResumeData {
  id: string;
  name: string;
  template: TemplateId;
  personal: PersonalInfo;
  summary: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  projects: ProjectEntry[];
  skills: SkillGroup[];
  updatedAt: string;
}

export const emptyResume = (): ResumeData => ({
  id: crypto.randomUUID(),
  name: "Untitled resume",
  template: "minimal",
  personal: {
    fullName: "",
    headline: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
  },
  summary: "",
  experience: [],
  education: [],
  projects: [],
  skills: [],
  updatedAt: new Date().toISOString(),
});

export const sampleResume = (): ResumeData => ({
  id: crypto.randomUUID(),
  name: "Sample — Software Engineer",
  template: "minimal",
  personal: {
    fullName: "Jordan Avery",
    headline: "Full-Stack Software Engineer",
    email: "jordan.avery@example.com",
    phone: "+1 (555) 019-2837",
    location: "Austin, TX",
    website: "jordanavery.dev",
    linkedin: "linkedin.com/in/jordanavery",
    github: "github.com/jordanavery",
  },
  summary:
    "Full-stack engineer with a focus on real-time systems and developer tooling. Built collaborative apps end-to-end, from data model to interface, with an eye for details that make software feel fast.",
  experience: [
    {
      id: crypto.randomUUID(),
      role: "Software Engineer Intern",
      company: "Northwind Labs",
      location: "Remote",
      startDate: "May 2025",
      endDate: "Aug 2025",
      current: false,
      bullets: [
        "Built a real-time collaborative voting feature used by 400+ weekly active users",
        "Cut API response time 38% by redesigning the caching layer",
        "Shipped a redesigned frontend that raised session length by 22%",
      ],
    },
  ],
  education: [
    {
      id: crypto.randomUUID(),
      school: "State University",
      degree: "B.S., Computer Science",
      location: "Austin, TX",
      startDate: "2022",
      endDate: "2026",
      details: "Relevant coursework: Data Structures, Distributed Systems, Databases",
    },
  ],
  projects: [
    {
      id: crypto.randomUUID(),
      name: "Realtime Voting Board",
      link: "github.com/jordanavery/voting-board",
      description: "Collaborative live voting app for small teams",
      bullets: [
        "Designed a full-stack architecture spanning voting logic, queue state, and live sync",
        "Redesigned the frontend for clarity and responsiveness across devices",
      ],
    },
    {
      id: crypto.randomUUID(),
      name: "SecureShare",
      link: "github.com/jordanavery/secureshare",
      description: "Encrypted file sharing system",
      bullets: [
        "Implemented encrypted file transfer with access-controlled sharing links",
        "Built as a research exercise into secure system design",
      ],
    },
  ],
  skills: [
    { id: crypto.randomUUID(), label: "Languages", items: ["TypeScript", "Python", "C++"] },
    { id: crypto.randomUUID(), label: "Frameworks", items: ["React", "Next.js", "Node.js"] },
    { id: crypto.randomUUID(), label: "Tools", items: ["PostgreSQL", "Docker", "Git"] },
  ],
  updatedAt: new Date().toISOString(),
});

import type { PersonalInfo } from "../../types/resume";
import { Field } from "../ui/Field";

export function PersonalForm({
  value,
  onChange,
}: {
  value: PersonalInfo;
  onChange: (v: PersonalInfo) => void;
}) {
  function set<K extends keyof PersonalInfo>(key: K, v: PersonalInfo[K]) {
    onChange({ ...value, [key]: v });
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <Field label="Full name" value={value.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Jordan Avery" />
      <Field label="Headline" value={value.headline} onChange={(e) => set("headline", e.target.value)} placeholder="Full-Stack Software Engineer" />
      <Field label="Email" value={value.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
      <Field label="Phone" value={value.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+1 555 019 2837" />
      <Field label="Location" value={value.location} onChange={(e) => set("location", e.target.value)} placeholder="Austin, TX" />
      <Field label="Website" value={value.website} onChange={(e) => set("website", e.target.value)} placeholder="yoursite.dev" />
      <Field label="LinkedIn" value={value.linkedin} onChange={(e) => set("linkedin", e.target.value)} placeholder="linkedin.com/in/you" />
      <Field label="GitHub" value={value.github} onChange={(e) => set("github", e.target.value)} placeholder="github.com/you" />
    </div>
  );
}

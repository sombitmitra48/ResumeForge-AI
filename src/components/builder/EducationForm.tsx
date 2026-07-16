import { Plus, Trash2 } from "lucide-react";
import type { EducationEntry } from "../../types/resume";
import { Field, TextAreaField } from "../ui/Field";
import { Button } from "../ui/Button";

function newEntry(): EducationEntry {
  return { id: crypto.randomUUID(), school: "", degree: "", location: "", startDate: "", endDate: "", details: "" };
}

export function EducationForm({ value, onChange }: { value: EducationEntry[]; onChange: (v: EducationEntry[]) => void }) {
  function update(id: string, patch: Partial<EducationEntry>) {
    onChange(value.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }
  function remove(id: string) {
    onChange(value.filter((e) => e.id !== id));
  }

  return (
    <div className="space-y-5">
      {value.map((entry) => (
        <div key={entry.id} className="rounded-xl border border-line bg-white p-5">
          <div className="mb-3 flex justify-end">
            <button onClick={() => remove(entry.id)} className="text-ink-soft/50 hover:text-danger" aria-label="Remove education">
              <Trash2 size={15} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="School" value={entry.school} onChange={(e) => update(entry.id, { school: e.target.value })} placeholder="State University" />
            <Field label="Degree" value={entry.degree} onChange={(e) => update(entry.id, { degree: e.target.value })} placeholder="B.S. Computer Science" />
            <Field label="Location" value={entry.location} onChange={(e) => update(entry.id, { location: e.target.value })} placeholder="Austin, TX" />
            <div className="grid grid-cols-2 gap-2">
              <Field label="Start" value={entry.startDate} onChange={(e) => update(entry.id, { startDate: e.target.value })} placeholder="2022" />
              <Field label="End" value={entry.endDate} onChange={(e) => update(entry.id, { endDate: e.target.value })} placeholder="2026" />
            </div>
          </div>
          <TextAreaField
            label="Details"
            rows={2}
            value={entry.details}
            onChange={(e) => update(entry.id, { details: e.target.value })}
            placeholder="Relevant coursework, honors, GPA..."
            className="mt-4"
          />
        </div>
      ))}
      <Button variant="outline" size="sm" icon={<Plus size={14} />} onClick={() => onChange([...value, newEntry()])}>
        Add education
      </Button>
    </div>
  );
}

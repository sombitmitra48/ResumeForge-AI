import { Plus, Trash2 } from "lucide-react";
import type { ProjectEntry } from "../../types/resume";
import { Field, TextAreaField } from "../ui/Field";
import { Button } from "../ui/Button";

function newEntry(): ProjectEntry {
  return { id: crypto.randomUUID(), name: "", link: "", description: "", bullets: [""] };
}

export function ProjectsForm({ value, onChange }: { value: ProjectEntry[]; onChange: (v: ProjectEntry[]) => void }) {
  function update(id: string, patch: Partial<ProjectEntry>) {
    onChange(value.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }
  function remove(id: string) {
    onChange(value.filter((e) => e.id !== id));
  }
  function setBullet(entry: ProjectEntry, i: number, v: string) {
    const bullets = [...entry.bullets];
    bullets[i] = v;
    update(entry.id, { bullets });
  }

  return (
    <div className="space-y-5">
      {value.map((entry) => (
        <div key={entry.id} className="rounded-xl border border-line bg-white p-5">
          <div className="mb-3 flex justify-end">
            <button onClick={() => remove(entry.id)} className="text-ink-soft/50 hover:text-danger" aria-label="Remove project">
              <Trash2 size={15} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Project name" value={entry.name} onChange={(e) => update(entry.id, { name: e.target.value })} placeholder="Realtime Voting Board" />
            <Field label="Link" value={entry.link} onChange={(e) => update(entry.id, { link: e.target.value })} placeholder="github.com/you/project" />
          </div>
          <Field
            label="One-line description"
            value={entry.description}
            onChange={(e) => update(entry.id, { description: e.target.value })}
            placeholder="What the project does"
            className="mt-4"
          />
          <div className="mt-4 space-y-2">
            {entry.bullets.map((b, i) => (
              <TextAreaField
                key={i}
                label={i === 0 ? "Bullet points" : ""}
                rows={2}
                value={b}
                onChange={(e) => setBullet(entry, i, e.target.value)}
                placeholder="What you built or improved..."
              />
            ))}
            <Button variant="ghost" size="sm" icon={<Plus size={13} />} onClick={() => update(entry.id, { bullets: [...entry.bullets, ""] })}>
              Add bullet
            </Button>
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" icon={<Plus size={14} />} onClick={() => onChange([...value, newEntry()])}>
        Add project
      </Button>
    </div>
  );
}

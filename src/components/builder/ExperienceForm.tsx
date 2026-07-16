import { useState } from "react";
import { Plus, Trash2, Sparkles, GripVertical } from "lucide-react";
import type { ExperienceEntry } from "../../types/resume";
import { Field, TextAreaField } from "../ui/Field";
import { Button } from "../ui/Button";
import { runAI } from "../../ai/aiService";

function newEntry(): ExperienceEntry {
  return {
    id: crypto.randomUUID(),
    role: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    bullets: [""],
  };
}

export function ExperienceForm({
  value,
  onChange,
}: {
  value: ExperienceEntry[];
  onChange: (v: ExperienceEntry[]) => void;
}) {
  function update(id: string, patch: Partial<ExperienceEntry>) {
    onChange(value.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }

  function remove(id: string) {
    onChange(value.filter((e) => e.id !== id));
  }

  return (
    <div className="space-y-5">
      {value.map((entry) => (
        <ExperienceCard
          key={entry.id}
          entry={entry}
          onUpdate={(patch) => update(entry.id, patch)}
          onRemove={() => remove(entry.id)}
        />
      ))}
      <Button variant="outline" size="sm" icon={<Plus size={14} />} onClick={() => onChange([...value, newEntry()])}>
        Add experience
      </Button>
    </div>
  );
}

function ExperienceCard({
  entry,
  onUpdate,
  onRemove,
}: {
  entry: ExperienceEntry;
  onUpdate: (patch: Partial<ExperienceEntry>) => void;
  onRemove: () => void;
}) {
  const [improvingIdx, setImprovingIdx] = useState<number | null>(null);

  function setBullet(i: number, v: string) {
    const next = [...entry.bullets];
    next[i] = v;
    onUpdate({ bullets: next });
  }

  function addBullet() {
    onUpdate({ bullets: [...entry.bullets, ""] });
  }

  function removeBullet(i: number) {
    onUpdate({ bullets: entry.bullets.filter((_, idx) => idx !== i) });
  }

  async function improveBullet(i: number) {
    setImprovingIdx(i);
    try {
      const result = await runAI("improveBullet", { bullet: entry.bullets[i] || "worked on the project" });
      setBullet(i, result);
    } finally {
      setImprovingIdx(null);
    }
  }

  return (
    <div className="rounded-xl border border-line bg-bg3 p-5">
      <div className="mb-4 flex items-start justify-between">
        <GripVertical size={16} className="mt-2 text-ink-soft/30" />
        <button onClick={onRemove} className="text-ink-soft/50 hover:text-danger" aria-label="Remove experience">
          <Trash2 size={15} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Role" value={entry.role} onChange={(e) => onUpdate({ role: e.target.value })} placeholder="Software Engineer" />
        <Field label="Company" value={entry.company} onChange={(e) => onUpdate({ company: e.target.value })} placeholder="Company name" />
        <Field label="Location" value={entry.location} onChange={(e) => onUpdate({ location: e.target.value })} placeholder="Remote" />
        <div className="grid grid-cols-2 gap-2">
          <Field label="Start" value={entry.startDate} onChange={(e) => onUpdate({ startDate: e.target.value })} placeholder="Jan 2024" />
          <Field label="End" value={entry.endDate} onChange={(e) => onUpdate({ endDate: e.target.value })} placeholder="Present" />
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        <span className="block text-xs font-medium uppercase tracking-wide text-ink-soft/70">Bullet points</span>
        {entry.bullets.map((b, i) => (
          <div key={i} className="flex items-start gap-2">
            <TextAreaField
              label=""
              rows={2}
              value={b}
              onChange={(e) => setBullet(i, e.target.value)}
              placeholder="Built a feature that..."
              className="flex-1"
            />
            <div className="mt-1 flex flex-col gap-1.5">
              <button
                onClick={() => improveBullet(i)}
                disabled={improvingIdx === i}
                className="rounded-md border border-line p-1.5 text-cobalt hover:bg-cobalt-dim disabled:opacity-50"
                aria-label="Improve with AI"
                title="Improve with AI"
              >
                {improvingIdx === i ? (
                  <span className="block h-3.5 w-3.5 animate-spin rounded-full border-2 border-cobalt border-t-transparent" />
                ) : (
                  <Sparkles size={14} />
                )}
              </button>
              <button
                onClick={() => removeBullet(i)}
                className="rounded-md border border-line p-1.5 text-ink-soft/50 hover:text-danger"
                aria-label="Remove bullet"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        <Button variant="ghost" size="sm" icon={<Plus size={13} />} onClick={addBullet}>
          Add bullet
        </Button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Plus, Trash2, Sparkles, X } from "lucide-react";
import type { PersonalInfo, SkillGroup } from "../../types/resume";
import { Field } from "../ui/Field";
import { Button } from "../ui/Button";
import { runAI } from "../../ai/aiService";

function newGroup(): SkillGroup {
  return { id: crypto.randomUUID(), label: "", items: [] };
}

export function SkillsForm({
  value,
  onChange,
  personal,
}: {
  value: SkillGroup[];
  onChange: (v: SkillGroup[]) => void;
  personal: PersonalInfo;
}) {
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [suggesting, setSuggesting] = useState(false);

  function update(id: string, patch: Partial<SkillGroup>) {
    onChange(value.map((g) => (g.id === id ? { ...g, ...patch } : g)));
  }
  function remove(id: string) {
    onChange(value.filter((g) => g.id !== id));
  }
  function addItem(group: SkillGroup) {
    const text = (draft[group.id] || "").trim();
    if (!text) return;
    update(group.id, { items: [...group.items, text] });
    setDraft({ ...draft, [group.id]: "" });
  }
  function removeItem(group: SkillGroup, item: string) {
    update(group.id, { items: group.items.filter((i) => i !== item) });
  }

  async function suggest() {
    setSuggesting(true);
    try {
      const result = await runAI("skillSuggest", { role: personal.headline || "professional", background: "" });
      const items = result.split(",").map((s) => s.trim()).filter(Boolean);
      onChange([...value, { id: crypto.randomUUID(), label: "AI suggested", items }]);
    } finally {
      setSuggesting(false);
    }
  }

  return (
    <div className="space-y-5">
      {value.map((group) => (
        <div key={group.id} className="rounded-xl border border-line bg-bg3 p-5">
          <div className="mb-4 flex items-center justify-between">
            <Field
              label="Group name"
              value={group.label}
              onChange={(e) => update(group.id, { label: e.target.value })}
              placeholder="Languages"
              className="flex-1"
            />
            <button onClick={() => remove(group.id)} className="mt-5 text-ink-soft/50 hover:text-danger" aria-label="Remove group">
              <Trash2 size={15} />
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span key={item} className="inline-flex items-center gap-1 rounded-full bg-cobalt-dim px-3 py-1 text-xs font-medium text-cobalt">
                {item}
                <button onClick={() => removeItem(group, item)} aria-label={`Remove ${item}`}>
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={draft[group.id] || ""}
              onChange={(e) => setDraft({ ...draft, [group.id]: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addItem(group))}
              className="flex-1 rounded-sm border border-line bg-bg px-3 py-1.5 text-sm outline-none focus:border-cobalt"
              placeholder="Add skill (e.g. React, Docker)"
            />
            <Button variant="ghost" size="sm" onClick={() => addItem(group)}>
              Add
            </Button>
          </div>
        </div>
      ))}
      <div className="flex gap-3">
        <Button variant="outline" size="sm" icon={<Plus size={14} />} onClick={() => onChange([...value, newGroup()])}>
          Add group
        </Button>
        <Button variant="outline" size="sm" icon={<Sparkles size={14} className="text-cobalt" />} loading={suggesting} onClick={suggest}>
          Suggest with AI
        </Button>
      </div>
    </div>
  );
}

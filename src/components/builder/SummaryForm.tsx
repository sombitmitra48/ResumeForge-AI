import { useState } from "react";
import { Sparkles } from "lucide-react";
import { TextAreaField } from "../ui/Field";
import { Button } from "../ui/Button";
import { runAI } from "../../ai/aiService";
import type { PersonalInfo } from "../../types/resume";

export function SummaryForm({
  value,
  onChange,
  personal,
}: {
  value: string;
  onChange: (v: string) => void;
  personal: PersonalInfo;
}) {
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    try {
      const result = await runAI("summary", {
        role: personal.headline || "professional",
        background: value || "a mix of hands-on project work and collaborative team experience",
      });
      onChange(result);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <TextAreaField
        label="Summary"
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="2-3 sentences on who you are and what you're good at..."
      />
      <Button
        variant="outline"
        size="sm"
        icon={<Sparkles size={14} className="text-cobalt" />}
        loading={loading}
        onClick={generate}
        className="mt-3"
      >
        {value ? "Regenerate with AI" : "Generate with AI"}
      </Button>
    </div>
  );
}

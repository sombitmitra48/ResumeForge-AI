import { useState } from "react";
import { Settings, X } from "lucide-react";
import { Button } from "../ui/Button";
import { setOpenAIKey, hasOpenAIKey, clearOpenAIKey } from "../../ai/aiService";

export function SettingsPopover() {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState("");
  const [connected, setConnected] = useState(hasOpenAIKey());

  function save() {
    if (key.trim()) {
      setOpenAIKey(key.trim());
      setConnected(true);
      setKey("");
    }
  }

  function disconnect() {
    clearOpenAIKey();
    setConnected(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-ink"
      >
        <Settings size={13} />
        {connected ? "AI: OpenAI key" : "AI: offline demo"}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-72 rounded-xl border border-line bg-white p-4 paper-shadow">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft/70">AI provider</p>
            <button onClick={() => setOpen(false)} aria-label="Close"><X size={14} /></button>
          </div>
          <p className="mt-2 text-[11.5px] leading-snug text-ink-soft">
            {connected
              ? "Rewrite and summary requests are sent to OpenAI using the key stored in this browser."
              : "AI suggestions currently run on offline sample logic — no key required. Add an OpenAI key to get live rewrites."}
          </p>
          {connected ? (
            <Button variant="outline" size="sm" onClick={disconnect} className="mt-3 w-full">
              Remove key
            </Button>
          ) : (
            <div className="mt-3">
              <input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="sk-..."
                className="w-full rounded-lg border border-line px-3 py-1.5 text-xs outline-none focus:border-cobalt"
              />
              <Button size="sm" onClick={save} className="mt-2 w-full">
                Save key
              </Button>
              <p className="mt-2 text-[10.5px] text-ink-soft/60">
                Stored only in this browser's localStorage. Requests go straight from your browser to api.openai.com.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

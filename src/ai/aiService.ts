/**
 * AI service layer for ResumeForge.
 *
 * Two providers:
 *  - "mock": deterministic, offline, no key required. This is what runs
 *    out of the box so the demo works immediately after `npm install && npm run dev`.
 *  - "openai": calls OpenAI's API directly from the browser using a key the
 *    user pastes into Settings (stored only in localStorage, never sent anywhere
 *    but api.openai.com). This is fine for a local demo; a real product would
 *    proxy this through a backend so the key never touches the browser.
 *
 * Swap PROVIDER below, or let the user toggle it in the Settings panel.
 */

export type AIAction =
  | "summary"
  | "improveBullet"
  | "generateBullets"
  | "skillSuggest";

function getStoredKey(): string | null {
  return localStorage.getItem("resumeforge_openai_key");
}

export function setOpenAIKey(key: string) {
  localStorage.setItem("resumeforge_openai_key", key);
}

export function hasOpenAIKey(): boolean {
  return !!getStoredKey();
}

export function clearOpenAIKey() {
  localStorage.removeItem("resumeforge_openai_key");
}

const PROMPTS: Record<AIAction, (ctx: Record<string, string>) => string> = {
  summary: (ctx) =>
    `Write a 2-3 sentence professional resume summary for a ${ctx.role || "professional"} with this background: ${ctx.background || "not specified"}. Be concrete, avoid clichés like "results-driven" or "team player", and do not use first person.`,
  improveBullet: (ctx) =>
    `Rewrite this resume bullet point to be more impactful, using strong action verbs and quantifying impact where plausible. Keep it to one line. Original: "${ctx.bullet}"`,
  generateBullets: (ctx) =>
    `Write 3 resume bullet points for the role of ${ctx.role} at ${ctx.company || "a company"}, given this rough description: "${ctx.description}". Each should start with a strong action verb and include a plausible measurable outcome.`,
  skillSuggest: (ctx) =>
    `Given this job title: "${ctx.role}" and background: "${ctx.background}", list 8 relevant technical and soft skills as a comma-separated list.`,
};

async function callOpenAI(action: AIAction, context: Record<string, string>): Promise<string> {
  const key = getStoredKey();
  if (!key) throw new Error("No OpenAI key configured");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a precise, no-fluff resume writing assistant. Return only the requested text, no preamble, no quotes around it.",
        },
        { role: "user", content: PROMPTS[action](context) },
      ],
      temperature: 0.6,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI request failed (${res.status}): ${body}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

// --- Mock provider: offline, deterministic-ish, always available ---

const ACTION_VERBS = ["Led", "Built", "Shipped", "Streamlined", "Designed", "Automated", "Reduced", "Launched"];
const IMPACT_TAILS = [
  "cutting turnaround time by 30%",
  "improving reliability across the stack",
  "for a team of 6 engineers",
  "resulting in a 20% lift in weekly active users",
  "ahead of a tight quarterly deadline",
  "used daily by 500+ users",
];

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

async function callMock(action: AIAction, context: Record<string, string>): Promise<string> {
  await new Promise((r) => setTimeout(r, 550 + Math.random() * 500)); // feel like a real call
  const seed = hashSeed(JSON.stringify(context));

  switch (action) {
    case "summary": {
      const role = context.role || "professional";
      const background = context.background || "a strong technical and collaborative background";
      return `${role.charAt(0).toUpperCase() + role.slice(1)} with ${background}. Known for shipping reliable software and communicating clearly across engineering and product. Comfortable owning a problem from design through deployment.`;
    }
    case "improveBullet": {
      const verb = pick(ACTION_VERBS, seed);
      const tail = pick(IMPACT_TAILS, seed + 1);
      const core = context.bullet?.replace(/^(I |We )/i, "").trim() || "delivered a key feature";
      return `${verb} ${core.charAt(0).toLowerCase() + core.slice(1)}, ${tail}`;
    }
    case "generateBullets": {
      const role = context.role || "the role";
      const lines = [0, 1, 2].map((i) => {
        const verb = pick(ACTION_VERBS, seed + i);
        const tail = pick(IMPACT_TAILS, seed + i + 2);
        return `${verb} core ${role.toLowerCase()} work across the team, ${tail}`;
      });
      return lines.join("\n");
    }
    case "skillSuggest": {
      const base = ["Communication", "Problem solving", "Git", "Testing", "Code review", "Agile workflows", "Debugging", "Documentation"];
      return base.join(", ");
    }
  }
}

export async function runAI(action: AIAction, context: Record<string, string>): Promise<string> {
  if (hasOpenAIKey()) {
    try {
      return await callOpenAI(action, context);
    } catch (err) {
      console.warn("OpenAI call failed, falling back to offline suggestions:", err);
      return callMock(action, context);
    }
  }
  return callMock(action, context);
}

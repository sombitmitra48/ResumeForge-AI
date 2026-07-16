# ResumeForge AI — working demo

This is a **real, working slice** of the "ResumeForge AI" concept — not the full
25-feature SaaS spec. It covers three things well:

1. **Landing page** — hero, features, pricing, FAQ, footer.
2. **Resume builder** — forms for every core section, three switchable
   templates, live preview, autosave to `localStorage`, and a **working**
   client-side PDF export (A4, no layout breakage, multi-page if content
   overflows).
3. **AI assist** — summary generation, bullet-point rewriting, and skill
   suggestions. Runs on **offline mock logic by default** (no key, no cost,
   works the instant you `npm install`). Add your own OpenAI key in the
   Settings popover (top right of the builder) to switch to live GPT calls.
4. **ATS score** — a real heuristic scorer (not AI) that checks contact
   completeness, summary length, quantified bullet impact, skill count, and
   section completeness, with a breakdown per section.

## What's intentionally NOT here

The original brief asked for auth, a Postgres/Supabase backend, 25+
templates, portfolio-site generation, a job-application Kanban tracker,
real-time collaboration, cover letter/interview-prep AI, DOCX import/export,
an admin panel, and more. Building all of that as genuinely working code is a
multi-month project, not something that can be generated reliably in one
sitting — anything claiming otherwise would be full of silently broken
scaffolding. This demo is architected so any of those are a clean, additive
next step (see below), not a rewrite.

## Run it

```bash
npm install
npm run dev
```

Open the printed localhost URL. Click **Open builder**, then **Load sample**
to see it populated, or start from scratch.

## Using real AI instead of the offline demo

Open the builder, click the **"AI: offline demo"** button top-right, paste an
OpenAI API key, save. Requests go straight from your browser to
`api.openai.com` — fine for local use, but a real product should proxy this
through a backend so the key never reaches the browser.

## Natural next slices

- **Auth + persistence**: swap `useResume`'s localStorage calls for Supabase
  (schema would live in `supabase/schema.sql`); add `/login`, `/signup`,
  protected routes.
- **More templates**: `ResumePreview.tsx` already isolates each template as
  its own component — add more the same way and register them in
  `TEMPLATES` in `BuilderPage.tsx`.
- **Job description matching**: a new AI action in `aiService.ts` plus a
  small UI panel — the scoring/AI patterns already exist to copy.
- **Cover letter generator**: same shape as the summary generator, new page.

## Stack

Vite + React + TypeScript + Tailwind v4 + Framer Motion + react-hook-form +
lucide-react + html2canvas + jsPDF. No backend — everything runs client-side.

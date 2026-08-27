---
name: job-search-os
description: Build and run a personal, self-improving job-search system. Use this skill when someone wants onboarding, wants to set up a job hunt from scratch, find and track roles that fit them, score and filter listings, or learn over time which roles, framings, and keywords actually get callbacks. Trigger on phrases like "start my Job Search OS onboarding", "show me how the system works", "help me set up my job search", "build my job hunt system", "find roles for me", "what should I apply to", "track this job", "track this role", "track my applications", "set up a job search OS", "run my daily job search", or whenever someone shares their background and asks for a system to manage their search. On first use it presents a plain-language guide before interviewing the person and building their living files; on later runs it finds roles, verifies listings, tracks them, and updates what it has learned. Pairs with the resume-tailor and job-search-maintenance skills.
---

# Job Search OS

A personal, self-improving job-search system. It does four jobs:

1. **Set up** — interview the person once and build a folder of living files that capture who they are, what they're looking for, and how their resume is written.
2. **Find & track** — search for roles that fit, verify each listing is actually live, score and filter them, and log them to a tracker.
3. **Learn** — after each application and outcome, update the system so future searches and resumes get sharper. Every application is a labelled data point.
4. **Run cleanly anywhere** — keep recurring-run instructions in markdown files, not buried inside one vendor's scheduled-task prompt, so Claude, Codex, or another agent can run the same system.

The whole idea: the search should get smarter every week, because every rejection, callback, and interview teaches it something.

> **Pairs with the `resume-tailor` skill.** This skill maintains the living files; resume-tailor reads them to build tailored resumes and writes outcomes back. Install both for the full loop, but each works on its own.

---

## When to do what

- **First run ever** (no living files yet) → **show the welcome guide before asking setup questions.** Present `references/welcome.html` (use `present_files`, or open it for the user) before anything else. The guide is intentionally written for someone unfamiliar with AI: it explains what the system does, what remains human-controlled, the daily and weekly loops, the living files, safety boundaries, and a guided setup message. Give a one-line introduction, let the person read or use the guide, then continue into Phase 1. Do not replace this with a technical file list. Skip it on later runs once the files exist.
- **No living files yet** (first run) → do **Phase 1: Set up**.
- **Files exist, person wants roles** → do **Phase 2: Find & track**.
- **Files exist, person reports an outcome or wants a review** → do **Phase 3: Learn**.

Always read the living files fresh at the start of any run. They are the source of truth. Never work from memory or a cached copy.

---

## Phase 1 — Set up (first run only)

Interview the person in **one focused batch** of questions (not 20 separate turns). If they've shared a resume or files, extract everything you can first and only ask about the gaps.

Ask about:
1. **Background** — years of experience, current/recent roles, domains, the role + seniority they're targeting.
2. **Constraints** — target locations (remote / cities / open to relocation), minimum salary, company stage/size, hard exclusions (industries, role types, title levels too junior or too senior).
3. **Proof** — biggest achievements with real numbers (revenue, growth, scale, users, team size). Push for metrics; these become the achievement bank.
4. **Materials and public links** — existing resume, prior tailored resumes, a writing sample for cover-letter voice, and verified public profiles or portfolios such as LinkedIn and GitHub.
5. **Recent signals** — any recent applications, rejections, callbacks, or interviews, including what seemed to work, where they struggled, and any feedback they received.

Then create the living files. Prefer the bundled canonical templates in `assets/starter-kit/`. When Node and a writable filesystem are available, run `scripts/setup-workspace.mjs` with an explicit destination and the person's answers; the script refuses a non-empty destination by default. Otherwise copy the templates and replace every `{{TOKEN}}` before proceeding. See `references/file-templates.md` for the purpose and structure of each file.

| File | What it is |
|---|---|
| `profile.md` | Achievement bank — who they are, career timeline, achievement bullets WITH NUMBERS, core strengths, "what makes me stand out", Metric Notes table. The only source for resume metrics. |
| `resume-style-guide.md` | Canonical resume guide — voice, tone, section patterns, page architecture, format spec, tailoring checklist, naming conventions, and learning loop. |
| `search-config.md` | What they're looking for — target titles, locations, domains, deprioritised domains, include/exclude keywords, salary floor + target, title-band filter, scoring notes. |
| `boards-and-companies.md` | Where to look — tiered job boards (reliable ATS boards vs aggregators vs niche), target companies grouped by domain with career-page URLs, an active-applications/contact-history section. |
| `learnings-log.md` | Append-only chronological signal log. Every meaningful event gets a dated entry. |
| `interview-learnings.md` | Candidate-owned interview memory — questions, what landed, struggles, feedback, and the next experiment. |
| `hypotheses.md` | What's being learned before it's proven. Apply-hypotheses and callback-hypotheses, each with a status (Forming / Confirmed / Disproved) and evidence. |
| `search-patterns.md` | Long-term memory — confirmed patterns promoted from hypotheses, plus a config-change history table. |
| `keyword-ledger.md` | The resume-effectiveness brain — per application, the keywords/framings used and the outcome. |
| `active-learnings.md` | Small current-context entrypoint linking to confirmed patterns, active hypotheses, and archived evidence. |
| `daily-runbook.md` | The model-agnostic operating procedure for a daily search: read order, verification rules, scoring, tracker writes, digest shape, and post-run maintenance. |
| `resume-tailoring-runbook.md` | The separate batch-resume procedure: eligibility, idempotency, source read order, tracker writes, and QA handoff. |
| `weekly-review-runbook.md` | The model-agnostic learning, compaction, dependency, and archival procedure. |
| `run-config.md` | The small editable config for automated runs: schedule, search scope, volume caps, tracker details, attribution fields, and any temporary overrides. |
| `resume-qa.md` / `resume-qa-runbook.md` | Hard requirements and the repeatable visual-QA process for generated drafts. |
| `/Resume RAG/` | Library of prior tailored resumes (markdown) + an index, so the closest prior resume can be reused. |
| A tracker | One authoritative roles table the person can see at a glance. Default to `roles-tracker.md`; if Notion or a spreadsheet is chosen as primary, treat `roles-tracker.md` as an optional derived mirror rather than a second editable source. Columns/properties: Role, Company, Status, Score, Location, Salary, canonical link, first-seen and verification fields, Why It Fits, Concerns, plus learning and resume-state fields. |

If the person wants recurring automation, create `daily-runbook.md`, `resume-tailoring-runbook.md`, `resume-qa-runbook.md`, `weekly-review-runbook.md`, and `run-config.md` during setup. Use three ordered daily passes: search and digest, resume tailoring, then resume QA. Each pass reads and writes the same primary tracker. Scheduler prompts stay tiny and stable and point to the matching runbook. Put learnings and changed instructions back into the Markdown files, not into scheduler prompts.

### Public portfolio header rule

When creating or maintaining the resume profile and style-guide files, preserve a candidate-provided and verified portfolio or GitHub link as a compact live hyperlink immediately after LinkedIn on the contact line. Never infer a handle or URL. Keep it visually secondary and on one line; do not introduce a separate Projects, Portfolio, or builder-summary section unless the candidate explicitly asks for one.

Use their real answers, not placeholders. Where they don't have an answer yet, leave a clearly-marked TODO. Confirm the setup with them before moving on.

---

## Phase 2 — Find & track

### Step 1 — Read config

Read `run-config.md`, then `daily-runbook.md` first if they exist. Then read `search-config.md`, `search-patterns.md`, `hypotheses.md`, and `boards-and-companies.md`. If a distilled `active-learnings.md` exists, read it before the longer learning files.

If `daily-runbook.md` or `run-config.md` is missing but the person is running daily/recurring searches, create them from `references/file-templates.md` before or after the run, depending on urgency. Do not stop the search just because those files are missing.

### Step 2 — Read decision feedback before searching

If the tracker carries any feedback the person left on roles (why they passed or progressed), read it first and let it tighten scoring. Treat person-authored feedback as stronger than your own inference. When 2+ pieces of feedback share a pattern, update `search-config.md` / `search-patterns.md` and log the change.

For Notion/Sheets trackers, look for fields such as `Listing Feedback`, `Why I Applied`, `Confirmed Signal`, `Notes`, `Status`, and `Pass Reason`. Do not add near-duplicate cards; update the existing card if the canonical ATS link, company+title, or requisition ID matches.

### Step 2.5 — Resolve the primary tracker

Use `run-config.md` to identify exactly one primary tracker. For any explicit request like "track this job" or "track this role":

- If Markdown is primary, update `roles-tracker.md`.
- If Notion or a spreadsheet is primary, fetch its live schema and update it first. Reuse a tracker already resolved in this run.
- Refresh `roles-tracker.md` afterward only when `run-config.md` enables it as a derived portable mirror. Do not read independent edits from both copies.

Before creating a row, search for duplicates by canonical ATS URL, requisition ID, and normalized company plus role. Update the existing primary record if found; otherwise create a new record. A mirror must retain the primary record ID or URL so provenance stays clear.

If the configured external primary tracker is unavailable, do not quietly fork the workflow into Markdown. Report that the primary write is blocked. A person may explicitly choose to change the primary tracker in `run-config.md`.

### Step 3 — Search

Search the boards and target companies for roles matching the target titles, locations, and domains. Use the include/exclude keywords. Apply the title-band filter (drop roles above the too-senior ceiling or below the too-junior floor).

### Step 4 — Verify every listing is live (mandatory)

Job boards surface stale and closed listings constantly. **Verify before adding anything to the tracker or a digest.**

1. **Fetch the ATS URL directly.** Full job description = live. Redirect to homepage / 404 / blank = closed.
2. **Targeted search** as a fallback: `"[Company] [Role Title] site:[ats domain]"`.
3. **Never trust an aggregator or LinkedIn URL for recency.** Always resolve the canonical ATS source (Greenhouse / Lever / Ashby / company career site) and store THAT as the listing link. Aggregator "apply" links rot far faster than the underlying req and are the #1 cause of false "expired-on-click."

Handling:
- **Confirmed live** (full JD resolves at ATS) → add to tracker, digest-eligible.
- **Cannot confirm** (client-rendered page, blank fetch, LinkedIn-only) → add as "Needs verification", flag it, list separately. Don't pad a digest with unconfirmed roles to hit a count.
- **Closed** (404 / redirect / error) → don't add. Log as a ghost listing in `learnings-log.md`.

For active cards, re-verify the link on each run and stamp "Last verified: [date]" so the person only clicks links confirmed live recently.

### Step 5 — Score, explain, and log

Score each confirmed role against the profile and config. **Explain your reasoning** when you score or position a role, so the person can correct the system. Add live roles to the primary tracker with a fit score, why-it-fits, concerns, canonical ATS link, verification signal, verification run ID, date found, and model/agent attribution. Refresh an enabled mirror only after the primary write succeeds. Report at least a handful of outcomes per run; if there aren't enough confirmed-live new roles, say so honestly rather than inflating the list.

When the person decides to apply, hand off to the **resume-tailor** skill (if installed) to build the tailored resume, and add a row to `keyword-ledger.md`.

### Step 6 — Update run files

At the end of any automated or daily run, update the living files with what changed:

- Append meaningful signals, ghost listings, and config changes to `learnings-log.md`.
- Promote repeatable search/scoring changes to `search-patterns.md` only when they meet the evidence rule.
- Update `run-config.md` for run mechanics (caps, sources, tracker columns, temporary focus), not candidate preferences.
- Update `daily-runbook.md` for durable operating instructions (read order, verification method, digest contract), not one-off observations.
- Add model/agent attribution to tracker records or the run log when multiple agents may run the system.

---

## Phase 3 — Learn (close the loop)

Run this as a recurring "learning pass" — on a schedule if supported, or on demand whenever the person reports news.

- Review the tracker for status changes since last time.
- For each ATS rejection, callback, interview, or no-offer: write a dated signal to `learnings-log.md`. Update `keyword-ledger.md` for resume-screening evidence and `interview-learnings.md` for interview-stage evidence. Treat rejections, callbacks, and interview outcomes as labelled training data without confusing resume signals with interview signals.
- Generate or update hypotheses in `hypotheses.md` from the new evidence.
- Promote any hypothesis with **3+ consistent data points** to `search-patterns.md`, and update `search-config.md` if a confirmed pattern implies a change — logging the change and the reason.
- When a tailored resume earns a callback, extract the winning keywords/highlights and feed them back into `profile.md` and `keyword-ledger.md` so future resumes lead with what works. When a framing keeps getting filtered out, stop leading with it.

See `references/learning-loop.md` for the detailed routine and the hypothesis-promotion rule.

### Optional: make it recurring

If a scheduling tool is available, offer three ordered daily tasks and one weekly task:

1. Search reads `run-config.md` then `daily-runbook.md` and stops after the digest.
2. Resume tailoring reads `run-config.md` then `resume-tailoring-runbook.md` and processes eligible roles from the primary tracker.
3. Resume QA reads `run-config.md` then `resume-qa-runbook.md` and reviews drafts from the preceding tailoring run.
4. Weekly review reads `run-config.md` then `weekly-review-runbook.md`.

Keep every scheduled-task prompt deliberately small and model-agnostic. The primary tracker and saved files carry state between passes. If the scheduler cannot express dependencies, leave enough time for the preceding task to finish. Otherwise give the person the same four-pass checklist to run manually.

---

## Principles

- **Truthful only.** Reframe and reorder real achievements; never fabricate experience, metrics, titles, or dates.
- **Living files are the source of truth.** Read them fresh each run; keep them updated.
- **Prompts stay thin.** Recurring jobs should call the system, not contain the system. Put durable instructions in the matching runbook and editable knobs in `run-config.md`.
- **One tracker is authoritative.** Optional mirrors are derived outputs, not a second place to edit workflow state.
- **Verify before you trust.** A listing is not real until the canonical ATS URL resolves to a full JD. "Actually live" beats quantity.
- **Explain your scoring.** Show your reasoning so the person can correct the system — their feedback outranks your inference.
- **Every application is a data point.** The point of the loop is that the system learns which domains, titles, and keywords actually work.

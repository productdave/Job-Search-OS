# Folder map — your resume sources

Everything this skill reads lives in **your job-search folder** (whatever folder is connected, or a `Job Search` folder you create). Keep these files current — the skill reads the live versions on every run, never from memory.

| File | Purpose |
|---|---|
| `profile.md` | Achievement bank: who you are, career timeline, achievement bullets WITH NUMBERS grouped by theme, core strengths, "what makes you stand out", and a Metric Notes table for conflicting numbers. The ONLY source for bullets/metrics. |
| `resume-style-guide.md` | Canonical resume guide: voice, tone, section patterns, page architecture, format spec, tailoring checklist, file-naming + save conventions, and learning loop. Governs all formatting/writing decisions. |
| `search-config.md` | Target titles, locations, domains, include/exclude keywords, salary floor. Positioning lens. (Shared with the `job-search-os` skill.) |
| `search-patterns.md` | Confirmed patterns — what reliably works, what to avoid. Positioning lens. |
| `hypotheses.md` | Live apply/callback hypotheses. Secondary positioning context. |
| `keyword-ledger.md` | Per-application record of keywords/framings used + outcome. The self-improving loop. |
| `run-config.md` | Canonical thresholds, eligible statuses, primary tracker, and automation order for batch runs. |
| `resume-tailoring-runbook.md` | Eligibility, idempotency, tracker writes, file handoff, and hard stops for the separate resume pass. |
| `/Resume RAG/` | Prior tailored resumes (markdown) + an index file. Source of proven bullet language. Start at the index. |

When a tracker is external, use the primary tracker named in `run-config.md` as the queue and source of role state. `roles-tracker.md` may be a derived mirror, but it is not a second queue.

## Gold-standard template

Point this at your single best existing resume — the format reference. When building a DOCX, match its font, margins, and sizes. When in doubt about a formatting value, unpack its XML and copy exactly.

```
[path to your best existing resume .docx]
```

## Output location

Save each tailored resume to a per-company folder, creating it if missing. Never save tailored artifacts inside the source folder above.

```
[your output location]/[Company Name]/
```

## Contact block

Keep your current contact line here (verify it's still correct each run):

- Location / work authorisation:
- Email:
- Phone:
- LinkedIn:
- GitHub / builder portfolio:

When a candidate-verified portfolio or GitHub URL is present, show a compact label as a live hyperlink immediately after LinkedIn on the same contact line. Never infer a handle or URL. Keep it visually secondary and do not add a separate projects section unless explicitly requested.

## Related skills to load during a run

- **docx** — generate the resume DOCX first; generate the cover-letter DOCX only after the resume is finalized. Read its SKILL.md before building.
- A **writing-voice** skill or sample — tone and phrasing for cover letters and outreach, after the resume is finalized.
- **job-search-os** — the technical identifier for the companion Job Search Harness skill, which maintains these living files and finds roles to tailor for.

# Resume style guide

Last reviewed: {{TODAY}}

This file owns resume presentation rules. Candidate facts and metrics come only from `profile.md`.

## Gold standard

- Reference resume path: TODO
- Why it is the reference: TODO
- If no reference exists, use the neutral defaults below and require human approval.

## Neutral format defaults

| Element | Default |
|---|---|
| Font | Calibri or another widely available sans serif |
| Body size | 10–11 pt |
| Margins | 0.6–0.75 in |
| Length | Prefer 1–2 pages; never remove essential evidence only to hit a page count |
| Dates | Consistent format, such as MM/YYYY to MM/YYYY |
| Links | Live, verified, and descriptive |
| Output | DOCX plus PDF |

## Contact line

Use only verified values from `profile.md`. Keep LinkedIn and an optional portfolio or GitHub link compact and live-linked. Never infer a handle or create a portfolio section unless the candidate asks for one.

## Section order

1. Name and contact line
2. Target role
3. Executive summary
4. Selected highlights
5. Experience
6. Education
7. Optional skills or certifications only when useful

## Writing rules

- Mirror relevant job-description language without keyword stuffing.
- Reframe and reorder real achievements; never invent them.
- Use active voice and one main idea per bullet.
- Prefer concrete outcomes and numerals for verified metrics.
- Avoid `responsible for`, vague superlatives, unsupported claims, em dashes, and decorative arrows.
- Keep the summary to 2–3 sentences. Do not put target-company names or unverified metrics in it.
- Order highlights by relevance to the role.

## Resume draft eligibility

Read the current rule from `run-config.md`. Do not copy a numeric threshold into this file.

The listing must also be confirmed live during the run, have an eligible active status, and have no valid existing draft unless regeneration was explicitly requested.

## Output conventions

- Output root: TODO — keep outside the source-of-truth workspace.
- Company folder: `[Company Name]/`
- Resume filename: `[CandidateName]_[RoleOrAngle].docx` and matching `.pdf`
- Every generated draft status: `Needs Human Review`
- Never overwrite a hand-authored or attached resume.

## Pre-delivery checklist

- [ ] Candidate facts and every metric trace to `profile.md`.
- [ ] Target title matches the listing.
- [ ] Relevant listing language appears naturally.
- [ ] Gaps are disclosed, not disguised.
- [ ] Contact links are verified and live.
- [ ] Dates, fonts, margins, bullets, and headings are consistent.
- [ ] DOCX was exported to PDF.
- [ ] Every PDF page was rendered and visually inspected.
- [ ] No clipping, overflow, blank page, broken character, or stranded heading.
- [ ] Output is marked `Needs Human Review`.

## Learning loop

After a human finalizes or submits a resume, record the exact version and positioning in `keyword-ledger.md`. Feed new verified bullet variants into `profile.md`; do not silently replace canonical metrics.

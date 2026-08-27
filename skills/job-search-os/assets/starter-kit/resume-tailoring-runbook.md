# Resume tailoring runbook

Read this file after `run-config.md`. This is a separate pass that runs only after the daily search has finished writing verified roles and scores to the primary tracker.

## Read order

1. `run-config.md`
2. the configured primary tracker
3. `resume-style-guide.md`
4. `profile.md`
5. `keyword-ledger.md`
6. `search-patterns.md`
7. `Resume RAG/00_source_index.md`
8. the canonical listing for each eligible role

## Eligibility

Process a role only when all of these are true:

- its score meets the canonical resume-draft rule in `run-config.md`;
- the canonical employer or ATS listing was confirmed live in the immediately preceding search run;
- its status is active and eligible under `run-config.md`;
- it is not `Expired`, `Pass`, `ATS Rejected`, `Interview Rejected`, `No Offer`, or another terminal status;
- it does not already have a valid draft or a draft status of `Drafted` or `Needs Human Review`, unless regeneration was explicitly requested.

If the tracker does not prove that the listing was verified in the preceding search run, re-fetch the canonical listing before drafting. Skip roles that cannot be confirmed and record the reason.

## Draft process

For each eligible role:

1. Read the full listing and extract requirements, keywords, seniority signals, and honest gaps.
2. Use only verified facts and metrics from `profile.md`.
3. Reuse proven truthful language from the closest prior resumes when available.
4. Follow `resume-style-guide.md` exactly for structure, formatting, file naming, and output location.
5. Generate matching DOCX and PDF files outside the source-of-truth workspace.
6. Render every PDF page and perform the pre-delivery checks in `resume-style-guide.md`.
7. Mark the result `Needs Human Review`. A generated draft is never approved for submission.

## Tracker and learning handoff

After each draft, update the same primary tracker record with:

- DOCX location;
- PDF location;
- draft status `Needs Human Review`;
- drafted date and run ID;
- generator or agent attribution;
- honest gaps, skipped checks, or blocked dependencies.

Add a `keyword-ledger.md` row containing the role, resume version, positioning, keywords, and highlights used. Leave the outcome `Pending` until the candidate actually submits the resume and reports an outcome.

If an external tracker is primary, update it first. Refresh `roles-tracker.md` only as a derived mirror when `run-config.md` enables the mirror. Never create a second independent role record.

## Finish

Report:

- drafts created;
- roles skipped and why;
- roles needing listing verification or candidate input;
- file locations;
- the exact set of drafts handed to the QA pass.

## Hard stops

- Do not apply to jobs.
- Do not send outreach.
- Do not create cover letters.
- Do not invent or silently reconcile candidate facts.
- Do not overwrite a hand-authored or attached resume.
- Do not regenerate a valid existing draft unless requested.

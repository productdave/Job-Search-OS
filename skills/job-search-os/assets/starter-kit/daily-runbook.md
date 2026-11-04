# Daily job-search runbook

Read this file after `run-config.md`. When they disagree, `run-config.md` owns current operational values and this runbook owns the durable sequence.

## Read order

1. `run-config.md`
2. `active-learnings.md`
3. `search-config.md`
4. `search-patterns.md`
5. `hypotheses.md`
6. `boards-and-companies.md`
7. the configured primary tracker; read `roles-tracker.md` only when it is primary or needed as a derived mirror
8. `keyword-ledger.md`
9. `profile.md` only when scoring nuance or resume eligibility requires candidate evidence

## Workflow

### 1. Learning and feedback pass

- Read human-authored listing feedback, pass reasons, status changes, and notes before searching.
- Before treating a status as evidence for a hypothesis, read its feedback note, confirmed signal, and relevant page details. A status alone does not establish why a role ended; distinguish employer pauses, candidate withdrawals, screening rejections, and interview outcomes.
- Record meaningful new outcomes in `learnings-log.md`; use `keyword-ledger.md` for screening evidence and `interview-learnings.md` for interview-stage evidence.
- Human feedback outranks the agent's earlier inference.
- Do not confirm a pattern from a single outcome.

### 2. Search

- Use target titles, locations, domains, inclusions, and exclusions from `search-config.md`.
- Search trusted sources and target-company career pages from `boards-and-companies.md`.
- Treat aggregator results as discovery leads only.
- When a configured source requires a browser, open the actual results and job details, verify the active search filters, and record the searches, pages, and listings reviewed. If access is blocked or a run budget cuts the sweep short, report partial coverage; a text-search fallback is a separate discovery source.

### 3. Verify every listing

1. Resolve the canonical employer or ATS page.
2. Confirm the full job description still loads.
3. Record the canonical URL, requisition ID if available, and verification date.
4. If confirmation fails, label the role `Needs verification`; do not present it as live.
5. If closed, do not add a new active role. Log a ghost or expired listing when useful.

### 4. Deduplicate and score

- Apply the duplicate keys in `run-config.md`.
- Score against the rubric in `search-config.md`.
- Explain the fit, the concerns, and any missing evidence.
- Apply the current eligibility values from `run-config.md`; never hard-code a second threshold here.

### 5. Update trackers

- When hiring-contact research is enabled, look for a named recruiter or hiring manager on the live listing and current public profiles. Record each person's source and confidence; distinguish a named owner from a likely or possible contact. If no one can be verified, say so. Research is read-only: do not contact anyone.
- Update the configured primary tracker.
  - Required card standard for every new role scoring 6 or higher:
    - Why it fits: at least 3 named proof points from `profile.md`, each mapped to a specific job-description requirement. Use only metrics the candidate has cleared; do not paraphrase the charter.
    - Concerns: labelled blocks, in order: EDUCATION TIER (verbatim requirement), COMPANY CLUSTER, SIBLING REQ, POSITIONING TRIGGER (a listing phrase that needs a specific story), SCREEN-OUT CRITERIA, HONEST GAPS. Write `none` where a block does not apply.
    - Salary and location: the published band or location plus a one-line note against the floor and target in `run-config.md`, and remote or relocation eligibility.
    - Role page body, four sections in order: `## Verification` (canonical URL, date read, how found), `## Scoring` (table `Factor | Weight | Score | Basis`, then the weighted score), `## Hiring Contacts` (when enabled; a none-found result lists the sources searched), and `## Suggested application angle` (what to lead with, which parts of the listing each need a story, a prepared answer to any screen-out criterion, and the route in: referral, recruiter, or direct apply, and why).
    - Job description child page or archive entry, when archiving is enabled.
    - Self-check before closing each role: all four body sections exist, at least 3 proof points are named, all six concern blocks are present, and the description archive exists. Record any miss in the role's system notes and fix it in the same run.
- If an external tracker is primary, refresh `roles-tracker.md` only as a derived portable mirror when `run-config.md` enables it.
- Never accept independent workflow state from both the primary tracker and its mirror. Human feedback and status changes belong in the primary tracker.
- Preserve human-authored notes.
- Attribute automated changes.
- Stamp confirmed listings with the verification date and run ID so the resume pass can prove they were live in this run.
- When job-description archiving is enabled, save the available listing text for each new role with its canonical URL, capture date, and capture type. Label a summary as partial rather than a full description. Reuse an unchanged archive instead of creating a duplicate.

### 6. Produce the digest

Report:

- confirmed-live roles that meet the current threshold, each with one `Angle:` line (the full angle also lives on the role page under `## Suggested application angle`);
- confirmed-live roles below the threshold, briefly;
- roles needing verification;
- expired or duplicate findings;
- tracker and learning files changed;
- job descriptions archived and hiring contacts found or still unverified, when those passes are enabled;
- constraints, rate limits, or blocked pages.
- browser-source coverage as completed, partial, blocked, or disabled, with the filters checked and where coverage stopped when applicable.

Do not inflate counts with stale, duplicate, or unverified roles.

### 7. Log the run

Append only meaningful evidence and changes to `learnings-log.md`. Do not paste the entire digest into every living file.

## Handoff boundaries

The daily search stops after the digest. It must not draft resumes. Resume tailoring reads `resume-tailoring-runbook.md` in a later pass, and resume QA reads `resume-qa-runbook.md` after that. The primary tracker, verification run ID, and saved files are the handoff. Applications, outreach, and cover letters are always outside these automated runs.

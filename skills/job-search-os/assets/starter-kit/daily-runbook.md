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
- Record meaningful new outcomes in `learnings-log.md`; use `keyword-ledger.md` for screening evidence and `interview-learnings.md` for interview-stage evidence.
- Human feedback outranks the agent's earlier inference.
- Do not confirm a pattern from a single outcome.

### 2. Search

- Use target titles, locations, domains, inclusions, and exclusions from `search-config.md`.
- Search trusted sources and target-company career pages from `boards-and-companies.md`.
- Treat aggregator results as discovery leads only.

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

- Update the configured primary tracker.
- If an external tracker is primary, refresh `roles-tracker.md` only as a derived portable mirror when `run-config.md` enables it.
- Never accept independent workflow state from both the primary tracker and its mirror. Human feedback and status changes belong in the primary tracker.
- Preserve human-authored notes.
- Attribute automated changes.
- Stamp confirmed listings with the verification date and run ID so the resume pass can prove they were live in this run.

### 6. Produce the digest

Report:

- confirmed-live roles that meet the current threshold;
- confirmed-live roles below the threshold, briefly;
- roles needing verification;
- expired or duplicate findings;
- tracker and learning files changed;
- constraints, rate limits, or blocked pages.

Do not inflate counts with stale, duplicate, or unverified roles.

### 7. Log the run

Append only meaningful evidence and changes to `learnings-log.md`. Do not paste the entire digest into every living file.

## Handoff boundaries

The daily search stops after the digest. It must not draft resumes. Resume tailoring reads `resume-tailoring-runbook.md` in a later pass, and resume QA reads `resume-qa-runbook.md` after that. The primary tracker, verification run ID, and saved files are the handoff. Applications, outreach, and cover letters are always outside these automated runs.

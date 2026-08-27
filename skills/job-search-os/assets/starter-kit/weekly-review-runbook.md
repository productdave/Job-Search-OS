# Weekly review and maintenance runbook

Read `run-config.md` first. This pass improves the harness without deleting evidence or duplicating workflow instructions.

## 1. Review outcomes

- Reconcile tracker status changes with `keyword-ledger.md`, `learnings-log.md`, and `interview-learnings.md`.
- Keep resume-screening signals in the keyword ledger and interview-stage reflections in `interview-learnings.md`; link both to the chronological log.
- For each interview stage, capture what landed, where the candidate struggled, any direct feedback, and one next experiment.
- Preserve human-authored explanations and counter-evidence.

## 2. Update hypotheses

- Add new evidence to stable hypothesis IDs.
- Keep statuses explicit: `Forming`, `Confirmed`, `Disproved`, `Merged`, or `Superseded`.
- Promote only when the evidence rule in `run-config.md` is satisfied.
- When a confirmed pattern changes candidate preferences, update `search-config.md` and log the change in `search-patterns.md`.

## 3. Refresh active learnings

Update `active-learnings.md` with only:

- current confirmed patterns;
- active hypotheses being tested;
- current scoring or positioning implications;
- links to detailed evidence.

Do not copy the full chronological log into this entrypoint.

## 4. Audit context size

Review at these default thresholds:

| File role | Review threshold | Target after compaction |
|---|---:|---:|
| Mandatory entrypoint | 64 KiB | 24–48 KiB |
| Selective reference | 192 KiB | <= 120 KiB |
| Append-only history | 512 KiB | <= 128 KiB live window |
| Interview reflections | 192 KiB | <= 120 KiB live window |
| Combined mandatory context | 384 KiB | <= 300 KiB |

For oversized logs, move complete older entries into dated archive files and link them from `4. System Files/context-index.md`. Preserve exact text, dates, IDs, metrics, and chronology.

## 5. Audit artifacts and dependencies

- Check runbooks, links, imports, package manifests, scheduler pointers, and active output paths.
- Classify cleanup candidates as live, compatibility, generated, historical, duplicate, or system-managed.
- Move superseded user artifacts into a dated archive with a manifest. Do not delete them.
- Do not manipulate operating-system or cloud-provider metadata files.

## 6. Verify

- Required files still exist.
- Relative links resolve.
- Every active rule can be traced to evidence.
- Every archive range appears in the context index.
- No scheduler contains a conflicting workflow copy.
- No hard stop or candidate constraint was lost.

Finish with a concise maintenance report listing changes, before/after sizes, archive paths, verification checks, and items deliberately left alone.

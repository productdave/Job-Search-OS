---
name: job-search-maintenance
description: Maintain a file-based Job Search Harness by auditing dependencies, archiving superseded scripts and generated artifacts without deleting them, and compacting oversized living context into lossless archives plus small indexed entrypoints. Use when someone asks to clean up, maintain, archive, compact, prune, reduce context size, or prevent their job-search files and agent memory from growing without bound.
---

# Job Search Harness Maintenance

Keep the working harness small without losing its history. The maintenance pass has two independent lanes: artifact lifecycle and context lifecycle.

## Start with a dry audit

Run:

```bash
node "<this skill directory>/scripts/audit-workspace.mjs" "/absolute/path/to/job-search-root"
```

Resolve the script path relative to this `SKILL.md`; do not assume the job-search workspace is the current directory.

Treat the report as evidence, not permission to archive every flagged item. Read the live runbooks, root README, package manifest, skill sources, scheduler prompts, and repository status before changing paths.

Read [artifact-lifecycle.md](references/artifact-lifecycle.md) when the task includes scripts, packages, generated previews, duplicate checkouts, dependency files, or other cleanup candidates.

Read [compaction-playbook.md](references/compaction-playbook.md) when any living/context file is over budget or the combined mandatory startup context is too large.

## Maintenance contract

1. Build a reference graph before moving or splitting anything. Search file names, imports, requires, links, runbooks, skill instructions, packages, and scheduler prompts.
2. Classify each candidate as `live`, `compatibility`, `generated`, `historical`, `duplicate`, or `system-managed`.
3. Preserve history. Move retired material into `4. System Files/archive/YYYY-MM-DD-maintenance/` and write a manifest mapping original paths to archive paths and reasons. Do not permanently delete user material.
4. Do not archive an ambiguous candidate. Report it for review.
5. Snapshot a context file before semantic compaction. Keep stable IDs, dates, claims, metrics, counter-evidence, and user-authored decisions intact.
6. Create a small context index that tells future agents what stayed live, what moved, the archive ranges, and how to retrieve details.
7. Update every consumer in the same change when a live file becomes an index plus references. A split is incomplete until runbooks and relevant skills follow the new references.
8. Verify after mutation: required paths, local links, source/package parity, syntax, dependency resolution, repository dirtiness, archive manifest, and a proportional smoke test.

## Context hierarchy

Prefer this shape:

- **Tier 1 — enforced:** safety-critical rules in code and QA.
- **Tier 2 — active entrypoints:** current rules, state, open hypotheses, and indexes kept deliberately small.
- **Tier 3 — referenced detail:** modular evidence files loaded only for the current task.
- **Tier 4 — archive:** exact historical records, partitioned by date or stable ID and excluded from default loading.

Compaction is successful only when an agent can answer both questions: “What is the current rule?” from Tier 2, and “What evidence produced it?” through the index into Tier 3 or Tier 4.

## Finish with a maintenance report

Report:

- files archived, including restore location;
- files compacted and before/after size;
- indexes or reference modules created;
- consumers updated;
- checks run and their results;
- candidates deliberately left alone and why;
- scheduler state, without enabling or creating recurring tasks unless the user asked.

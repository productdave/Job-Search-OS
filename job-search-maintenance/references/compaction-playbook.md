# Context Compaction Playbook

Use this reference when a living file or the combined startup context exceeds its budget.

## Default budgets

These are review thresholds, not automatic truncation limits:

| Context role | Review at | Target after compaction |
|---|---:|---:|
| Mandatory entrypoint read every run | 64 KiB | 24–48 KiB |
| Selective reference | 192 KiB | ≤120 KiB per module |
| Append-only history | 512 KiB | ≤128 KiB live window; exact remainder archived |
| Combined mandatory startup context | 384 KiB | ≤300 KiB |

Estimate tokens as bytes ÷ 4 for triage only. Structure and repetition matter more than the estimate.

## Choose the compaction method by file type

### Append-only logs

Examples: `learnings-log.md`, interview logs.

1. Split only at complete dated-entry boundaries.
2. Keep the current month or latest 30 days in the live file.
3. Move older entries exactly, without rewriting, into monthly or quarterly archive files.
4. Put a chronological range index at the top of the live file and in `4. System Files/context-index.md`.
5. Preserve any format instructions that future appenders need.

### Ledgers and trackers

Examples: `keyword-ledger.md`.

Keep current summary sections and the recent working window live. Partition older raw rows by year/quarter. Preserve table headers in every segment. Recompute summaries from evidence rather than copying stale conclusions.

### Hypotheses

Keep forming, confirmed-but-still-tested, and standing decision hypotheses live. Move disproved, merged, and superseded hypotheses to an archive while retaining their stable IDs and one-line disposition in the live index.

### Confirmed patterns and configuration

Keep the operative rule, confidence/status, and implication in the live file. Move long case narratives and evidence tables behind stable per-pattern references. Never move a hard constraint or current user preference out of default context.

### Resume profile and style guides

These are factual sources, not ordinary logs. Deduplicate first. If they still exceed budget, split by stable topic such as career timeline, achievement bank, metric notes, format specification, or examples.

The entrypoint must retain:

- identity and contact facts;
- safety-critical truth constraints;
- current positioning summary;
- a context map to every module.

Do not move achievements, metrics, or format rules until every resume/search consumer is updated to follow the context map. Verify that a representative tailoring run can still find the required facts.

## Stable reference format

Create or update `4. System Files/context-index.md` with rows like:

```markdown
| Live entrypoint | Reference/archive | Coverage | Stable IDs | Load when |
|---|---|---|---|---|
| `hypotheses.md` | `archive/hypotheses-2026-Q2.md` | Retired through 2026-06-30 | AH-1…CH-2 | Investigating historical rationale |
```

Use relative links. Record byte counts and a checksum for exact archive partitions when practical.

## Semantic safety checks

Before and after compaction, compare:

- stable IDs and headings;
- dates and chronology;
- current status labels;
- numbers, metrics, compensation, and location constraints;
- hard negatives and counter-evidence;
- links and archive paths;
- user-authored directives;
- source-of-truth and precedence statements.

Do not call a compaction complete if any item is missing or if a consumer still assumes the former monolithic file.

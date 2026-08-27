# Run config

Last reviewed: {{TODAY}}

This file contains operational knobs. Candidate preferences belong in `search-config.md`; durable procedure belongs in the runbooks.

## Mode and scope

| Setting | Value |
|---|---|
| Run mode | Manual test |
| Timezone | TODO |
| New confirmed roles per run | 5 |
| Maximum sources per run | 20 |
| Reverify active roles | Yes |
| Primary tracker | {{TRACKER}} |
| Markdown mirror | `roles-tracker.md` |

## Eligibility thresholds

| Decision | Rule |
|---|---|
| Add to shortlist | Score `>= 8/10` and listing confirmed live |
| Create resume draft | Score `>= 8/10`, confirmed live this run, eligible status, and no valid existing draft |
| Promote a hypothesis | At least 3 consistent evidence points and no unresolved counter-evidence |

These are the canonical threshold values. Other files refer to them without copying the numbers.

## Enabled passes

| Pass | Enabled |
|---|---|
| Learning and listing-feedback pass | Yes |
| Job search | Yes |
| Live-listing verification | Yes |
| Tracker updates | Yes |
| Daily digest | Yes |
| Resume tailoring | Separate run |
| Resume QA | Separate run |
| Weekly maintenance | Manual until tested |

## Duplicate keys

Use, in order:

1. canonical employer or ATS URL;
2. requisition ID;
3. normalized company + title + location.

## Attribution

For automated changes, record:

- run date and run ID;
- agent or model name when available;
- discovery source;
- canonical listing URL;
- first-seen and last-verified dates.

## Hard stops

- Do not apply to jobs.
- Do not send messages or outreach.
- Do not create cover letters in the search or resume run.
- Do not invent candidate facts or listing details.
- Do not overwrite human-authored resume files.
- Do not change hard candidate constraints silently.
- Do not delete learning history; archive it with an index.

## Temporary overrides

| Override | Reason | Expires | Owner |
|---|---|---|---|
| None | — | — | — |

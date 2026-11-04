# Technical and maintainer guide

The [README](./README.md) is the starting point for job seekers. This page keeps the implementation and release details for people maintaining or extending Job Search Harness. For the fuller architecture story, see [How I Built My Job Search OS](https://productdave.github.io/Job-Search-OS/How%20I%20Built%20My%20Job%20Search%20OS.html).

## What is included

| Component | Purpose |
|---|---|
| [`.codex-plugin/plugin.json`](./.codex-plugin/plugin.json) | Installs the repository as one plugin in compatible agents |
| [Live onboarding](https://productdave.github.io/Job-Search-OS/) ([source](./index.html)) | Guided first-use tour and copyable messages |
| [`skills/`](./skills/) | Generated plugin copies of the three canonical skill folders |
| [`connector/`](./connector/) | Read-only MCP server for current public methods |
| [`job-search-os/`](./job-search-os/) | Canonical search and tracking skill, starter kit, and setup script |
| [`resume-tailor/`](./resume-tailor/) | Canonical resume-tailoring skill |
| [`job-search-maintenance/`](./job-search-maintenance/) | Canonical maintenance skill |
| [`examples/fictional-workspace/`](./examples/fictional-workspace/) | Fictional completed workspace |

The standalone packages are [job-search-os.skill](https://raw.githubusercontent.com/productdave/Job-Search-OS/main/job-search-os.skill), [resume-tailor.skill](https://raw.githubusercontent.com/productdave/Job-Search-OS/main/resume-tailor.skill), and [job-search-maintenance.skill](https://raw.githubusercontent.com/productdave/Job-Search-OS/main/job-search-maintenance.skill). They are ZIP-based installer packages, so GitHub cannot preview them as readable pages. The source instructions are the `SKILL.md` files in the canonical folders above. The repository-level plugin is the preferred install path; [INSTALL.md](./INSTALL.md) documents the alternatives.

The public product name is **Job Search Harness**. The repository URL, `job-search-os` identifier, folder name, and `.skill` filename stay in place for compatibility with existing installations. The current plugin version is in [plugin.json](./.codex-plugin/plugin.json).

## One source of truth

Each kind of candidate information belongs in one file in the **private workspace**, separate from this public toolkit.

| Information | Canonical file |
|---|---|
| Candidate facts and verified achievements | `profile.md` |
| Search preferences and fit logic | `search-config.md` |
| Runtime thresholds, caps, and integrations | `run-config.md` |
| Daily search procedure | `daily-runbook.md` |
| Resume-drafting procedure | `resume-tailoring-runbook.md` |
| Resume-QA procedure | `resume-qa-runbook.md` |
| Weekly review and maintenance procedure | `weekly-review-runbook.md` |
| Current roles and statuses | `roles-tracker.md` or the configured external tracker |
| Confirmed patterns | `search-patterns.md` |
| Unproven ideas | `hypotheses.md` |
| Chronological evidence | `learnings-log.md` |
| Interview reflections and experiments | `interview-learnings.md` |

Choose one primary tracker. If that tracker is Notion or a spreadsheet, `roles-tracker.md` can be a portable mirror, but it must not become a second independently edited source. Read and write feedback, status changes, and resume state in the primary tracker first.

Scheduler prompts should name the private workspace and relevant runbook. Keep the workflow in the canonical Markdown file rather than duplicating it in a scheduler prompt.

## How a run works

The harness reads recent feedback, searches configured sources, resolves promising roles to the employer or ATS listing, checks whether the listing is live, deduplicates and scores it, and records eligible roles with reasons. Optional passes can research hiring contacts using public evidence and archive job descriptions. Resume drafts use verified candidate facts and remain marked `Needs Human Review`. Outcomes feed later searches; repeated independent evidence is needed before a pattern is promoted. Maintenance archives or compacts growing files without deleting history.

The starter kit defaults to an **8/10** shortlist and resume-draft threshold. Both use `>= 8`; the editable value is in `run-config.md`.

For recurring work, keep the three passes in order. Each writes to the same primary tracker before the next pass begins:

| Order | Pass | Reads | Stops after |
|---:|---|---|---|
| 1 | Daily search | `run-config.md`, then `daily-runbook.md` | Verified roles, tracker updates, and digest |
| 2 | Resume tailoring | `run-config.md`, then `resume-tailoring-runbook.md` | Eligible drafts saved as `Needs Human Review` |
| 3 | Resume QA | `run-config.md`, then `resume-qa-runbook.md` | QA verdicts and remaining human actions |

Leave enough time between scheduled passes for the previous one to finish. None of these passes submits applications, sends outreach, or creates cover letters. [INSTALL.md](./INSTALL.md#optional-recurring-passes) has scheduler prompt examples. Test the full cycle manually before scheduling it.

## Build and release

Edit `index.html` and the three canonical top-level skill folders when changing shared onboarding or skill behavior. The generated `skills/` copies and `.skill` packages are outputs, not independent sources.

Before publishing a toolkit update, run:

```bash
node scripts/build-release.mjs
```

This synchronizes onboarding and plugin copies, rebuilds the three installers, tests each archive, checks generated files against canonical sources, creates a sample workspace, verifies overwrite protection, and runs the maintenance audit. To check an existing release without rebuilding, run `node scripts/audit-release.mjs`.

For a personal search, edit the canonical file in the private workspace. Put candidate preferences in `search-config.md`, thresholds and integrations in `run-config.md`, and durable procedures in the matching runbook. Change this public toolkit only when an improvement should apply to future installations.

## Safety and privacy boundaries

The templates stop before submitting an application or sending outreach. They also prohibit invented experience, metrics, titles, dates, or public links; overwriting a resume marked as human-authored; deleting historical learning; and treating an aggregator link as proof that a listing is live.

The repository contains blank templates and fictional examples, not a real candidate profile. The onboarding wizard makes no network requests. The repository's `.gitignore` covers `my-job-search/` and `setup-output/`; any other private workspace needs its own protection. Resume output remains a draft until human review. Read [PRIVACY.md](./PRIVACY.md) before publishing a fork; Git history, remote URLs, and commit authors can identify a publisher even when current files are generic.

## Repository map

```text
.
├── .codex-plugin/plugin.json          # plugin manifest
├── .nojekyll                          # serve the static site unchanged
├── connector/                         # public read-only MCP connector
├── index.html                         # interactive onboarding
├── INSTALL.md                         # install and first-run guide
├── skills/                             # generated plugin skill copies
├── scripts/                            # release and audit tools
├── README.md                           # job seeker starting point
├── MAINTAINERS.md                      # technical reference
├── PRIVACY.md                          # publishing and data safety
├── examples/fictional-workspace/       # fictional completed example
├── job-search-os/
│   ├── SKILL.md
│   ├── assets/starter-kit/            # canonical templates
│   ├── references/
│   └── scripts/setup-workspace.mjs
├── resume-tailor/
└── job-search-maintenance/
```

Job Search Harness is an agent harness, not a hosted job board or autonomous application service. Verification can fail on blocked or client-rendered pages. Every recommendation and application document needs human review.

<div align="center">

<img src="assets/readme-cover-v3.png" width="100%" alt="Job Search Harness — Job searching should not eat your whole day." />

</div>

# Job Search Harness

A personal AI harness for putting more credible shots on goal—without letting the searching, checking, and resume rewriting eat your whole day.

Let’s get real. A manual job search can become death by a thousand cuts: search the same sites, open the same tabs, rewrite the same resume, submit, wait, and then start again. The emotional cost grows because every application carries hours of hope before you know whether the role was even live or whether your positioning worked.

The Job Search Harness carries that repeated work. It finds and verifies roles, explains fit, prepares truthful resume drafts, and records what happened. You still choose the direction, review every claim, make the final call, and apply yourself.

The point is not to hand your career to AI. It is to give AI your facts, rules, guardrails, and feedback—so the work stays connected and the next run learns from the last one.

> **Why “harness”?** An AI model can produce an answer. A harness turns it into a repeatable process: your profile supplies verified facts, your configuration supplies direction, your tracker carries state, and outcomes feed the next iteration. The harness carries the process. You keep the judgement.

The public product name is **Job Search Harness**. The repository URL, `job-search-os` skill identifier, folder name, and existing `.skill` filename remain unchanged so earlier links and installations continue to work.

## Start here

Open the **[live guided onboarding](https://productdave.github.io/Job-Search-OS/)** to see the page as a website. It explains what the harness does, how the parts work together, what the AI handles, and what remains under human control.

> GitHub's repository view shows HTML source code. Use the live onboarding link above when viewing the guide on a phone or sharing it with someone else.

Set this up on the computer where the private job-search files should live. Use an AI app that can read and update local files, such as Codex, Claude Cowork or Claude Code, Cursor, or Visual Studio Code with an AI coding agent. A chat-only window without file access cannot run the toolkit.

Use the link to this specific **Job Search Harness repository**, not a GitHub profile link. Send the agent:

```text
Install this Job Search Harness toolkit for me from this repository:

https://github.com/productdave/Job-Search-OS

Use the installation method supported by this AI app. Then show me the onboarding guide and walk me through setup in plain English.

Keep my personal job-search information in a separate private folder, not inside the downloaded public repository. Do not apply for jobs or send messages on my behalf.
```

Codex can install the repository as one bundled plugin. Other file-capable agents can use the same toolkit after opening the downloaded repository folder. See [INSTALL.md](./INSTALL.md) for the download fallback. After the toolkit is installed or open, send:

```text
Start my Job Search Harness onboarding. Show me the guide first, then walk me through setup in plain English.
```

The onboarding creates a plain-language first brief. The AI then builds a separate private workspace rather than asking the user to understand files or run commands.

Advanced users can also generate a workspace directly:

```bash
node job-search-os/scripts/setup-workspace.mjs ./my-job-search
```

The setup command refuses to overwrite a non-empty folder unless `--force` is provided.

## What is included

| Component | Purpose |
|---|---|
| [`.codex-plugin/plugin.json`](./.codex-plugin/plugin.json) | Lets a compatible agent install the repository as one plugin |
| [Live onboarding](https://productdave.github.io/Job-Search-OS/) ([source](./index.html)) | Nontechnical tour and guided first message |
| [`skills/`](./skills/) | Generated plugin copies of the three canonical skill folders |
| [Download `job-search-os.skill`](https://raw.githubusercontent.com/productdave/Job-Search-OS/main/job-search-os.skill) · [read the instructions](./job-search-os/SKILL.md) | Finds, verifies, scores, and tracks roles; learns from outcomes |
| [Download `resume-tailor.skill`](https://raw.githubusercontent.com/productdave/Job-Search-OS/main/resume-tailor.skill) · [read the instructions](./resume-tailor/SKILL.md) | Tailors resumes from verified achievements without inventing facts |
| [Download `job-search-maintenance.skill`](https://raw.githubusercontent.com/productdave/Job-Search-OS/main/job-search-maintenance.skill) · [read the instructions](./job-search-maintenance/SKILL.md) | Audits dependencies, archives obsolete artifacts, and compacts oversized context |
| [`job-search-os/assets/starter-kit/`](./job-search-os/assets/starter-kit/) | Canonical blank workspace templates |
| [`examples/fictional-workspace/`](./examples/fictional-workspace/) | Clearly labelled fictional data showing completed files |
| [How the harness works](https://productdave.github.io/Job-Search-OS/How%20I%20Built%20My%20Job%20Search%20OS.html) | Generic architecture, operating loop, and maintenance model |

Files ending in `.skill` are ZIP-based installer packages. GitHub cannot preview their contents and may show an empty-looking file page. Use the **Download** link for installation or **read the instructions** to inspect the human-readable source.

## One source of truth

Keep each kind of information in exactly one place:

| Information | Canonical file |
|---|---|
| Candidate facts and verified achievements | `profile.md` |
| Search preferences and fit logic | `search-config.md` |
| Runtime thresholds, caps, and integrations | `run-config.md` |
| Durable daily procedure | `daily-runbook.md` |
| Durable resume-drafting procedure | `resume-tailoring-runbook.md` |
| Durable resume-QA procedure | `resume-qa-runbook.md` |
| Durable weekly review and maintenance procedure | `weekly-review-runbook.md` |
| Current roles and statuses | `roles-tracker.md` or the configured external tracker |
| Confirmed patterns | `search-patterns.md` |
| Unproven ideas | `hypotheses.md` |
| Chronological evidence | `learnings-log.md` |
| Interview reflections and next experiments | `interview-learnings.md` |

Choose one primary tracker. If the primary tracker is Notion or a spreadsheet, `roles-tracker.md` may be kept as a derived portable mirror, but it must not become a second place for independent edits. Human feedback, status changes, and resume state are read from and written to the primary tracker first.

Scheduler prompts should only point at the private workspace and name the relevant runbook. Do not paste the workflow into the scheduler. When the process changes, update the canonical Markdown file once.

Example daily trigger:

```text
Run the Job Search Harness in /absolute/path/to/my-job-search.
Read run-config.md, then daily-runbook.md, then follow the living files they name.
The files are the source of truth. Respect all hard stops.
```

## The three-pass daily automation

Keep search, resume drafting, and resume QA as separate passes. Each pass finishes by writing its state to the same primary tracker, which becomes the handoff to the next pass.

| Order | Pass | Reads | Stops after |
|---:|---|---|---|
| 1 | Daily search | `run-config.md`, then `daily-runbook.md` | Verified roles, tracker updates, and digest |
| 2 | Resume tailoring | `run-config.md`, then `resume-tailoring-runbook.md` | Eligible drafts saved as `Needs Human Review` |
| 3 | Resume QA | `run-config.md`, then `resume-qa-runbook.md` | QA verdicts and remaining human actions |

Run the passes in this order. If the scheduler cannot wait for the previous pass to finish, leave enough time between them for the prior pass to complete. None of these passes submits applications, sends outreach, or creates cover letters.

## What the harness does

1. Read recent feedback and outcomes.
2. Search configured sources.
3. Resolve and verify the canonical employer or ATS listing.
4. Deduplicate and score the role against explicit criteria.
5. Track eligible roles and explain the score.
6. Tailor a resume only when the configured eligibility rule is met.
7. Record outcomes and promote patterns only after repeated evidence.
8. Archive or compact growing files without deleting history.

The starter kit defaults to an 8/10 shortlist and resume-draft threshold. Both use `>= 8`, and the single editable value lives in `run-config.md`.

## Fictional sample

The example workspace uses a fictional candidate named **Jordan Lee** and fictional companies, URLs, metrics, and outcomes. It exists only to demonstrate structure. Never copy its achievements into a real application.

## Privacy model

- The repository contains templates and fictional examples, not a real candidate profile.
- The onboarding wizard runs entirely in the browser and makes no network requests.
- Generated workspaces are ignored by the repository's `.gitignore` by default.
- Public links and metrics are never inferred; the agent must verify them with the candidate.
- Resume output is always a draft until a human reviews it.

Read [`PRIVACY.md`](./PRIVACY.md) before publishing a fork. Git remote URLs, commit authors, and repository history can still identify the publisher even when file contents are generic.

## Standalone skill installation

The repository-level plugin is the preferred install experience. For hosts that support standalone skills only, download the `.skill` files above and install them separately. On the first run, say:

```text
Start my Job Search Harness onboarding.
```

Web browsing, scheduling, Notion, spreadsheet, DOCX, and PDF features depend on the tools supplied by the host agent. The Markdown workflow works without those optional integrations.

The canonical skill sources are the three top-level skill folders. Do not edit the generated `skills/` copies or `.skill` packages directly.

Before publishing an update, run:

```bash
node scripts/build-release.mjs
```

That one command synchronizes the onboarding and plugin copies, rebuilds all three `.skill` installers, tests every archive, compares generated files with their canonical sources, creates a sample workspace, verifies overwrite protection, and runs the maintenance audit. To check an existing release without rebuilding it, run `node scripts/audit-release.mjs`.

## Change the process in one place

- To change a personal search, edit the canonical file inside the private workspace. Do not make the same change in this public toolkit or in a scheduler prompt.
- Put candidate preferences and scoring logic in `search-config.md`.
- Put thresholds, caps, the primary tracker, and temporary overrides in `run-config.md`.
- Put durable search, resume, QA, or maintenance steps in the matching runbook.
- Treat scheduler prompts as timing and routing only. They should not contain a second copy of the workflow.
- Treat the public GitHub repository as the reusable template. Change it only when the improvement should apply to every future installation.

When changing this public toolkit, edit `index.html` and the three canonical top-level skill folders, then run `node scripts/build-release.mjs`. The generated `skills/` directory and `.skill` files are outputs, not independent instruction sources.

## Safety boundaries

The templates default to these hard stops:

- never submit an application;
- never send outreach;
- never invent experience, metrics, titles, dates, or public links;
- never overwrite a resume marked as human-authored;
- never delete historical learning during maintenance;
- never treat an aggregator link as proof that a listing is live.

## Repository map

```text
.
├── .codex-plugin/plugin.json          # one-link plugin manifest
├── .nojekyll                          # serve the static site unchanged on GitHub Pages
├── index.html                         # interactive onboarding
├── INSTALL.md                         # install and first-run contract
├── skills/                            # generated plugin skill copies
├── scripts/                           # release build, audit, onboarding, and plugin sync tools
├── README.md                          # repository guide
├── PRIVACY.md                         # publishing and data-safety checklist
├── examples/fictional-workspace/      # fictional completed example
├── job-search-os/
│   ├── SKILL.md
│   ├── assets/starter-kit/            # canonical templates
│   ├── references/
│   └── scripts/setup-workspace.mjs
├── resume-tailor/
└── job-search-maintenance/
```

## Limitations

This is an agent harness, not a hosted job board or autonomous application service. Listing verification can fail on blocked or client-rendered pages. A human should review every recommendation and every application document before acting.

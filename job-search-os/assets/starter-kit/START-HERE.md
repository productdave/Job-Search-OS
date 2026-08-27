# Start here

Created: {{TODAY}}

This folder is private. It will contain personal information, job applications, and career evidence. Do not commit it to a public repository.

## 1. Complete the candidate files

1. Put only verified facts in [profile.md](profile.md). Import a real resume if available.
2. Review targets and constraints in [search-config.md](search-config.md).
3. Define resume presentation rules in [resume-style-guide.md](resume-style-guide.md).
4. Add trusted boards and target companies to [boards-and-companies.md](boards-and-companies.md).

Leave unknowns as `TODO`. Never let an agent guess a date, metric, employer, salary requirement, contact detail, or public URL.

## 2. Review operational defaults

Open [run-config.md](run-config.md). The starter defaults are:

- shortlist threshold: score `>= 8/10`;
- resume-draft threshold: score `>= 8/10`;
- primary tracker: `{{TRACKER}}`;
- automated applications: disabled;
- automated outreach: disabled;
- automated cover letters: disabled.

Change a runtime value only in `run-config.md`. Do not repeat it in the runbooks or scheduler.

## 3. Give the folder to an agent

Use:

```text
Read START-HERE.md, then help me finish onboarding this Job Search OS.
Treat the Markdown files as the source of truth.
Ask before replacing verified facts or changing hard constraints.
```

## 4. Add a scheduled trigger only after a manual test

Daily trigger:

```text
Run the Job Search OS in [ABSOLUTE WORKSPACE PATH].
Read run-config.md, then daily-runbook.md, then follow the living files they name.
The files are the source of truth. Respect all hard stops.
```

Weekly trigger:

```text
Run the weekly review in [ABSOLUTE WORKSPACE PATH].
Read run-config.md, then weekly-review-runbook.md, then follow the living files they name.
Archive rather than delete. Do not change hard constraints without recording the reason.
```

The trigger owns timing only. The files own behavior.

## 5. Close the learning loop

After every meaningful outcome, update the tracker and tell the agent what happened. Rejections, callbacks, interviews, passes, and offers are evidence. Put interview reflections and next experiments in [interview-learnings.md](interview-learnings.md) so they do not disappear between searches. A pattern becomes confirmed only after the evidence rule in [weekly-review-runbook.md](weekly-review-runbook.md) is met.

## First-run checklist

- [ ] Candidate facts and metrics are verified.
- [ ] Target titles, locations, compensation, and exclusions are correct.
- [ ] Score thresholds are reviewed.
- [ ] Tracker fields and duplicate keys are configured.
- [ ] At least one manual search has been reviewed.
- [ ] Scheduler prompts contain pointers, not duplicated workflow rules.
- [ ] The workspace is excluded from public version control.

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
- tracker authority: one primary tracker; any Markdown mirror is derived;
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

Resume-tailoring trigger, scheduled after the daily search finishes:

```text
Run the resume-tailoring pass in [ABSOLUTE WORKSPACE PATH].
Read run-config.md, then resume-tailoring-runbook.md, then follow the living files they name.
Process only eligible roles from the primary tracker. Save drafts as Needs Human Review. Do not apply, send outreach, or create cover letters.
```

Resume-QA trigger, scheduled after resume tailoring finishes:

```text
Run the resume-QA pass in [ABSOLUTE WORKSPACE PATH].
Read run-config.md, then resume-qa-runbook.md, then follow the living files they name.
Review drafts from the latest tailoring pass, record verdicts in the primary tracker, and leave every draft as Needs Human Review.
```

Weekly trigger:

```text
Run the weekly review in [ABSOLUTE WORKSPACE PATH].
Read run-config.md, then weekly-review-runbook.md, then follow the living files they name.
Archive rather than delete. Do not change hard constraints without recording the reason.
```

The triggers own timing and routing only. The files own behavior. Search, resume tailoring, and QA must run in that order. If the scheduler cannot wait on task completion, leave enough time between passes for the previous one to finish.

## 5. Change the process in one place

- Edit `search-config.md` for candidate preferences and fit logic.
- Edit `run-config.md` for thresholds, caps, the primary tracker, and temporary overrides.
- Edit the relevant runbook for durable search, resume, QA, or maintenance steps.
- Do not repeat those rules in a scheduler prompt.
- Do not edit both an external primary tracker and its Markdown mirror independently.
- Change the public toolkit repository only when the new behavior should become a default for future workspaces.

## 6. Close the learning loop

After every meaningful outcome, update the tracker and tell the agent what happened. Rejections, callbacks, interviews, passes, and offers are evidence. Put interview reflections and next experiments in [interview-learnings.md](interview-learnings.md) so they do not disappear between searches. A pattern becomes confirmed only after the evidence rule in [weekly-review-runbook.md](weekly-review-runbook.md) is met.

## First-run checklist

- [ ] Candidate facts and metrics are verified.
- [ ] Target titles, locations, compensation, and exclusions are correct.
- [ ] Score thresholds are reviewed.
- [ ] Tracker fields and duplicate keys are configured.
- [ ] One primary tracker is named; any mirror is marked as derived.
- [ ] At least one manual search has been reviewed.
- [ ] Search, resume tailoring, and QA have each passed one manual test before scheduling.
- [ ] Scheduler prompts contain pointers, not duplicated workflow rules.
- [ ] The workspace is excluded from public version control.

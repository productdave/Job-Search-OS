# Install Job Search OS

Job Search OS helps a file-capable AI agent find open roles, prepare truthful resume drafts, track progress, and learn from outcomes. The repository contains the whole toolkit. Codex can install it as a bundled plugin; other AI agents can run the same workflow after opening the downloaded folder.

## 1. Use the right kind of AI app

Set this up on the computer where the private job-search workspace should live. The AI app must be able to read, create, and update local files.

Examples include:

- ChatGPT Codex;
- Claude Cowork or Claude Code with local-folder access;
- Cursor;
- Visual Studio Code with an AI coding agent.

A normal chat window that cannot access files is not enough.

## 2. Copy the Job Search OS repository link

Use the link to this specific repository:

```text
https://github.com/productdave/Job-Search-OS
```

Do not use a GitHub profile link such as `https://github.com/ACCOUNT-NAME`, and do not use a link to one file inside the repository.

## 3. Ask the agent to set it up

Paste this message:

```text
Install this Job Search OS toolkit for me from this repository:

https://github.com/productdave/Job-Search-OS

Use the installation method supported by this AI app. Then show me the onboarding guide and walk me through setup in plain English.

Keep my personal job-search information in a separate private folder, not inside the downloaded public repository. Do not apply for jobs or send messages on my behalf.
```

Codex can install the bundled plugin directly. Other clients may download or open the repository instead; direct plugin installation is not guaranteed outside Codex.

## 4. If direct installation is not supported

1. Open the repository link in a browser.
2. Choose **Code → Download ZIP**.
3. Unzip the download.
4. Open the extracted folder in the file-capable AI app.
5. Paste:

```text
I have downloaded and opened the Job Search OS folder.

Please read INSTALL.md and job-search-os/SKILL.md. Then open job-search-os/references/welcome.html and guide me through setup in plain English.

Create my private job-search workspace in a separate folder. Do not put my personal information inside this public toolkit folder. Do not apply for jobs or send messages on my behalf.
```

## 5. Start onboarding

After the agent confirms that the toolkit is installed or open, send:

```text
Start my Job Search OS onboarding. Show me the guide first, then walk me through setup in plain English.
```

## First-run contract

The first run should:

- show the onboarding guide before asking setup questions;
- use plain language and explain unfamiliar terms;
- ask one focused group of questions rather than a long technical interview;
- create a private workspace from the bundled starter kit;
- leave unknown facts as TODOs;
- never apply, send outreach, or invent candidate information;
- explain which living file owns each kind of future change.

## What the agent should create

The installation folder is a public, reusable toolkit. The agent should create a separate private workspace for the candidate's facts, targets, trackers, outcomes, and generated drafts.

Inside that private workspace:

- `profile.md` owns verified career facts and achievements;
- `search-config.md` owns candidate preferences and fit scoring;
- `run-config.md` owns thresholds, caps, integrations, and the primary tracker;
- `daily-runbook.md` owns the search and digest sequence;
- `resume-tailoring-runbook.md` owns batch resume eligibility and draft handoff;
- `resume-qa-runbook.md` owns visual and factual QA;
- `weekly-review-runbook.md` owns learning, archiving, and context maintenance.

The agent should choose one primary tracker during onboarding. A Markdown tracker may be a portable mirror of an external tracker, but it is not a second source for independent edits.

## Test once before scheduling

Run one manual search and review the results before turning on recurring work. Confirm that:

1. target roles, locations, compensation, and exclusions are correct;
2. the primary tracker receives new and updated roles without duplicates;
3. unverified listings are clearly separated from confirmed-live listings;
4. the score and resume-draft thresholds in `run-config.md` are correct;
5. every generated resume stays marked `Needs Human Review`.

## Optional recurring passes

If the AI client supports scheduled tasks, create three ordered tasks that all point to the same private workspace:

### 1. Daily search

```text
Run the Job Search OS in [ABSOLUTE PRIVATE WORKSPACE PATH].
Read run-config.md, then daily-runbook.md, then follow the living files they name.
Stop after the digest. Do not create resumes, apply, or send outreach.
```

### 2. Resume tailoring

```text
Run the resume-tailoring pass in [ABSOLUTE PRIVATE WORKSPACE PATH].
Read run-config.md, then resume-tailoring-runbook.md, then follow the living files they name.
Process only eligible roles from the primary tracker. Save drafts as Needs Human Review. Do not apply, send outreach, or create cover letters.
```

### 3. Resume QA

```text
Run the resume-QA pass in [ABSOLUTE PRIVATE WORKSPACE PATH].
Read run-config.md, then resume-qa-runbook.md, then follow the living files they name.
Review drafts from the latest tailoring pass, record verdicts in the primary tracker, and leave every draft as Needs Human Review.
```

Run them in that order. The primary tracker and saved draft files carry state between passes. The scheduled messages should remain short pointers; do not copy the detailed workflow into them.

## How to change the process later

Change the private workspace, not three different places:

- preferences or scoring logic: edit `search-config.md`;
- thresholds, caps, tracker, or temporary focus: edit `run-config.md`;
- durable search steps: edit `daily-runbook.md`;
- durable resume steps: edit `resume-tailoring-runbook.md`;
- durable QA steps: edit `resume-qa-runbook.md`;
- weekly learning or maintenance: edit `weekly-review-runbook.md`.

Do not repeat the change in the scheduler prompt. Change this public GitHub toolkit only when the improvement should become the default for future installations.

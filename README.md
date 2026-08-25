<div align="center">

<img src="assets/readme-cover.png" width="100%" alt="Job Search OS helps people find roles, tailor resumes, track applications, and learn from outcomes" />

# Job Search OS

**Find better-fit roles, create stronger applications, and learn what actually earns callbacks.**

A pair of AI-agent skills that turns a scattered job hunt into a repeatable, evidence-based system.

</div>

## What it does

Job Search OS keeps your experience, search criteria, applications, and outcomes in plain Markdown files, then uses them to improve each new search and resume.

It combines two skills:

- **`job-search-os`** finds and verifies roles, scores their fit, tracks applications, and learns from outcomes.
- **`resume-tailor`** turns a job description into a targeted resume using your real achievements, writing preferences, and successful prior applications.

Together, they create a simple feedback loop:

**Find → Verify → Apply → Track → Learn**

## Key features

- **Personalized job search** — captures your target roles, locations, salary range, strengths, and exclusions
- **Listing verification** — checks company and ATS pages before recommending a role and separates confirmed listings from those that still need verification
- **Explainable fit scoring** — shows why each role matches, where the gaps are, and what may concern a recruiter
- **Truthful resume tailoring** — adapts your positioning and language without inventing experience, responsibilities, or metrics
- **Application tracking** — maintains a portable Markdown tracker and can optionally mirror roles to Notion
- **Outcome learning** — records the positioning used for each application and what happened afterwards
- **Reusable resume library** — draws from prior tailored resumes instead of rewriting everything from scratch
- **Optional recurring searches** — supports scheduled search and learning passes when the agent environment provides scheduling

## How to use

Once setup is complete, use natural-language prompts:

| What you want to do | What to say |
|---|---|
| Find suitable roles | `Find roles for me` |
| Review new opportunities | `What should I apply to?` |
| Track a role you found | `Track this role` plus the URL or job description |
| Tailor your resume | `Tailor my resume for this` plus the job description |
| Record a rejection | `I was rejected by [company]` |
| Record a positive result | `[Company] invited me to interview` |

Reporting outcomes closes the loop. With consistent feedback, the system can identify which roles, keywords, and positioning repeatedly perform best.

## Install

### Requirements

- Claude Cowork, a Claude Project, or another compatible skill-enabled agent
- A connected writable folder so your files persist between conversations
- Web access for finding and checking job listings

Document export, scheduling, Notion, and spreadsheet support depend on the tools available in your agent environment.

### Install in Claude

1. Download [`job-search-os.skill`](./job-search-os.skill).
2. Download [`resume-tailor.skill`](./resume-tailor.skill).
3. Open each file in Claude and choose **Save skill**.
4. Connect a local folder in Cowork or a Claude Project.
5. Say: `Help me set up my job search`.

The first run asks one focused set of questions about your background, goals, constraints, and achievements. It then creates the living files for you.

### Files it creates

- `profile.md` — your verified achievement bank
- `search-config.md` — roles, locations, salary, and other preferences
- `roles-tracker.md` — opportunities and application status
- `resume-style-guide.md` — writing, formatting, and output rules
- `keyword-ledger.md` — positioning used and subsequent outcomes
- `hypotheses.md` — patterns currently being tested
- `search-patterns.md` — patterns supported by repeated evidence
- `learnings-log.md` — an append-only history of meaningful events
- `/Resume RAG/` — prior tailored resumes and proven language

The files belong to you and can be reviewed or edited at any time. Future runs read their latest contents.

## Tech stack

| Layer | Technology |
|---|---|
| Agent workflows | `SKILL.md` instruction packages |
| Persistent state | Plain Markdown files |
| Onboarding | Static HTML guide |
| Resume output | Copy-ready text, with optional DOCX and PDF generation |
| Optional integrations | Web browsing, Notion, spreadsheets, scheduling |

Job Search OS has no separate application server or database. It runs inside the agent environment where the skills are installed.

## Status and limitations

Job Search OS is an agent workflow package, not a hosted job board or autonomous background service.

- A connected folder is required for information to persist between conversations.
- Some listings cannot be fully verified because of blocked or client-rendered career pages.
- Scheduled searches require a scheduler supplied by the host environment.
- DOCX/PDF output and external trackers require compatible tools.
- Results depend on the accuracy of the achievements, preferences, and outcomes you provide.
- Its learning loop is evidence-based workflow logic, not machine-learning model training.
- Always review application documents before submitting them.

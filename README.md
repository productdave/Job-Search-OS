<div align="center">

<img src="assets/readme-cover.png" width="100%" alt="Job Search OS improves each application through a continuous search, tailor, track, and learn loop" />

<br/>

<img src="https://img.shields.io/badge/Claude-Skills-0f7b5f?style=for-the-badge&logo=anthropic&logoColor=white" alt="Claude Skills"/>

# Run your job search like a system, don't spray and pray

**Two skills that help you find roles, tailor your resume, and learn automatically every time you hear back.**

<br/>

![job-search-os](https://img.shields.io/badge/Skill_1-job--search--os-0f7b5f?style=flat-square)
![resume-tailor](https://img.shields.io/badge/Skill_2-resume--tailor-2f63b8?style=flat-square)
![5 min read](https://img.shields.io/badge/⏱_read_time-5_min-b07918?style=flat-square)

</div>

---

Looking for a job is exhausting, right? You tweak the same resume forty times, you lose track of what you applied to, and every rejection feels like it taught you nothing. I went through exactly that — so I built a little system to take the chaos out of it.

These two skills are that system, packaged up for you.

> **Every application is a labelled data point. Most people just throw the label away.**

---

## Table of contents

- [How it works](#how-it-works)
- [The two skills](#the-two-skills)
- [Getting started](#getting-started)
- [Day-to-day use](#day-to-day-use)
- [Your files](#your-files)
- [How to customise](#how-to-customise)
- [Quick-start recap](#quick-start-recap)

---

## How it works

Job searching is one of those things that *should* get easier the longer you do it — but somehow never does.

You apply, you hear nothing, you move on, and the next application starts from zero. No memory, no learning. You're basically re-inventing yourself from scratch every time, and making the same mistakes you made three weeks ago without even knowing it.

The idea here is simple. **Treat every application as a data point.** A rejection and a callback are both information. If you capture what you led with, then later capture what happened, you slowly learn which roles, which framings, and which keywords actually get you in the door. The system gets a little sharper every week.

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Apply    │────▶│    Track    │────▶│    Learn    │────▶│   Sharpen   │
│ tailor+send │     │  log role   │     │   outcome   │     │  next wins  │
└─────────────┘     └─────────────┘     └─────────────┘     └──────┬──────┘
       ▲                                                            │
       └────────────────── (every loop, sharper) ──────────────────┘
```

One more thing: these skills never invent a metric or a job you didn't have. They take your *real* achievements and reframe them to fit the role in front of you. If a job wants something you don't have, they flag it as a gap honestly — so you can speak to it in the interview instead of getting caught out. (That's the better trade.)

---

## The two skills

| | [`job-search-os`](job-search-os/SKILL.md) | [`resume-tailor`](resume-tailor/SKILL.md) |
|---|---|---|
| **Role** | Your search command centre | Your resume writer |
| **Input** | Your background, targets, outcomes | A job description (text, URL, or file) |
| **Output** | Scored role list, tracked applications, pattern insights | Tailored resume + optional cover letter (DOCX + PDF if the `docx` skill is installed, otherwise copy-ready text) |
| **Superpower** | Checks every listing is **actually live** before you click | Leads with your **strongest-matching proof** every time |
| **Gets smarter?** | Yes — learns from logged outcomes | Yes — reads the keyword ledger, reuses what worked |

> **They're better together.** `job-search-os` builds and maintains your living files. `resume-tailor` reads those same files and writes outcomes back. Install both and the loop closes. But each works fine on its own — don't stress if you only want one to start.

<details>
<summary><strong>job-search-os in depth</strong></summary>

<br/>

Your search command centre. It interviews you once, builds your living files, then runs three jobs on demand:

**1. Find & track**
Searches your target boards and companies for matching roles, verifies every listing is live at its canonical ATS URL (not just an aggregator link), scores and explains each fit, and logs them to your tracker. You can also paste in a role you found yourself — *"track this for me"* + a JD or URL — and it'll add it to the same tracker.

**2. Learn**
After each outcome (rejection, callback, interview, ghosting), update the system. It logs the signal, updates your keyword ledger, generates or strengthens hypotheses, and promotes anything confirmed by 3+ data points to your patterns file. Over time it tells you which domains, framings, and keywords actually get you callbacks — and stops leading with the ones that don't.

**3. Scheduled runs** *(if scheduling is available)*
Offer a daily find-and-track pass and a weekly learning pass, so the loop runs without you having to remember to kick it off. The scheduled prompt stays tiny; the real instructions live in editable markdown files (`daily-runbook.md` and `run-config.md`) so the same setup can run under Claude, Codex, or another agent.

</details>

<details>
<summary><strong>resume-tailor in depth</strong></summary>

<br/>

Your resume writer. Give it a job description as text, a link, or a file and it:

1. Reads your `profile.md` achievement bank and `resume-style-guide.md` resume rules
2. Finds the closest prior resume in your `/Resume RAG/` library and reuses proven language
3. Mirrors the JD's exact language for ATS keyword matching
4. Orders your highlights strongest-match-first — not just chronologically
5. Flags any genuine gaps so you can prep for them in the interview
6. Saves to a per-company folder — DOCX + PDF if you have the `docx` skill installed, copy-ready text if not

Cover letter only comes *after* the resume is finalised — and it matches the same angle, same proof points, same ordering. Resume first, always.

</details>

---

## Getting started

> **One honest note first.** These work best in **Cowork with a folder connected**, or inside a **Claude Project**. The living files need to stick around between chats — that persistence is what makes the system get smarter. In a one-off chat they still run, but nothing carries over. Connect a folder if you can.

**Step 1 — Install the skills**

Download `job-search-os.skill` and `resume-tailor.skill` from this repo, open each in Claude, and hit **Save skill**. Done — they're available in every chat from that point.

**Step 2 — Connect a folder**

In Cowork or a Claude Project, connect a local folder. This is where all the living files will live. It doesn't need to be organised — just needs to exist.

**Step 3 — Run setup**

How you start depends on which skill you're using:

| If you want… | Say… |
|---|---|
| The full job-search system (find roles + tailor resumes) | *"help me set up my job search"* |
| Resume tailoring only | *"tailor my resume"* + paste a JD |

Either way, the skill interviews you in one focused batch — not 20 separate turns. It asks about your background, targets, achievements (with real numbers), and any existing resume you want to use as a format reference. If you share a resume upfront, it extracts everything it can and only asks about the gaps.

> **The first run feels like an interview, not magic.** That's the setup tax. Once your files exist, every run after is fast. Don't judge it by minute one.

---

## Day-to-day use

Once you're set up, most days look like one of these:

**Find roles** `job-search-os`

> *"find roles for me"* or *"what should I apply to"*

Searches, kills dead listings, scores what's left, explains why each fits.

**Track something you found yourself** `job-search-os`

> *"track this for me"* + paste the JD or URL

Logs it to your tracker in the same format as anything the skill finds — so everything stays in one place.

**Tailor your resume** `resume-tailor`

> *"tailor my resume for this"* + paste the JD

You get a resume back, a note on the angle it led with, and any gaps to prep for. Ask for a cover letter only once the resume feels right.

**Log an outcome** `job-search-os`

> *"I got rejected from X"* or *"Y booked a recruiter call"*

Every time you hear back — ghosted, rejected, call, interview — tell it. This is the part most people skip, and it's the whole point. It logs the signal, updates what's working, and the next resume gets a little sharper because of it.

> **The bar it holds itself to:** would a tired recruiter, skimming for 20 seconds, immediately see why you fit *this exact* role? If not, it re-orders until they would.

---

## Your files

After setup, you'll have a folder of plain markdown files. They're yours — open and edit any of them by hand at any time.

> **No Notion required.** Everything is plain markdown in whatever folder you connect. The tracker is a markdown table by default — but if you'd prefer Notion or Google Sheets, just say so during setup.

The files fall into five groups:

### Core source files
*Both skills read these on every run. This is where your real material lives.*

<details>
<summary><strong>profile.md — your achievement bank</strong></summary>

<br/>

The most important file. Every resume metric and bullet comes from here — it's the only place.

Contains: who you are (2–3 lines for job matching), career timeline, achievement bullets **with real numbers** grouped by theme, core strengths mapped to shipped work, 5–8 "what makes me stand out" angles each tagged to the role type they suit best, and a Metric Notes table for any number you state differently across versions.

If a number is wrong, fix it here. If a win is missing, add it here. Everything downstream updates automatically.

</details>

<details>
<summary><strong>resume-style-guide.md — your resume rules</strong></summary>

<br/>

Controls how every resume gets built and written: voice, tone, font, margins, page architecture, section order, bullet style, spacing, writing rules to avoid, and your preferred English variant (AU/US/UK).

Also holds the tailoring checklist the skill runs before finalising any resume — things like "target title matches the JD", "JD language is reflected without keyword stuffing", "no company names or metrics in the summary", "highlights ordered by relevance", and "page 2 spacing was visually inspected."

Point it at your best existing resume as the gold standard and it matches that format every time.

</details>

### Search files
*Used by `job-search-os` to find and filter roles.*

<details>
<summary><strong>search-config.md — what you're hunting for</strong></summary>

<br/>

Target titles, locations, salary floor, company stage preference, include/exclude keywords, domains you want and the ones you don't, and a title-band filter (too-junior floor, too-senior ceiling).

Edit this whenever your search shifts. The next run reads it fresh — no re-setup needed.

</details>

<details>
<summary><strong>boards-and-companies.md — where to look</strong></summary>

<br/>

A tiered list of job boards (reliable ATS boards → aggregators → niche) plus target companies grouped by domain, each with its career-page URL. Also tracks active applications and any recruiter contact history.

The skill goes to these sources first on every search — not just Googling randomly.

</details>

### Run files
*Used by recurring or multi-agent searches so the automation stays portable.*

<details>
<summary><strong>daily-runbook.md — how the search runs</strong></summary>

<br/>

The durable operating procedure for daily searches: read order, tracker feedback fields, search/verification rules, scoring rubric, duplicate handling, digest format, and what to update after a run.

This is where learnings about the run itself go. Don't bury them inside a scheduled-task prompt.

</details>

<details>
<summary><strong>run-config.md — the small editable config</strong></summary>

<br/>

The knobs for automation: run mode, schedule, source priority, volume caps, tracker integration, model attribution, digest preferences, safety rails, and temporary overrides.

Think of it as the thing a scheduler points at. The scheduler says "run this"; this file says exactly how.

</details>

### Learning files
*Written to automatically as you use the system. The longer you run it, the more valuable these get.*

<details>
<summary><strong>learnings-log.md — the signal feed</strong></summary>

<br/>

Append-only chronological log. Every meaningful event gets a dated entry: role found, application sent, ATS rejection, callback, interview, offer, pass, config change. You don't edit this — the skill writes to it.

Read it back after a month. It's a surprisingly clear picture of what's actually happening in your search.

</details>

<details>
<summary><strong>hypotheses.md — what the system is learning</strong></summary>

<br/>

Tracks emerging patterns before they're confirmed — each with a status (Forming / Confirmed / Disproved) and the evidence behind it. Two types: apply-hypotheses (what draws you to apply) and callback-hypotheses (why companies call back).

When a hypothesis hits 3+ consistent data points, it graduates to `search-patterns.md`.

</details>

<details>
<summary><strong>search-patterns.md — what's confirmed to work</strong></summary>

<br/>

Confirmed patterns promoted from hypotheses, each with confidence level, evidence, and its implication for how roles are scored and how resumes are framed. When something consistently works, it moves here. When something consistently fails, it stops being led with.

Also holds a Config Change History table — every time `search-config.md` changes, why it changed is logged here.

</details>

<details>
<summary><strong>keyword-ledger.md — the resume effectiveness brain</strong></summary>

<br/>

Per application: the keywords, framings, and highlights used, and what happened (ATS rejected / callback / interview / offer / no offer). Over time this becomes the most valuable file in the folder — it's the direct line between "what I said" and "what I heard back."

`resume-tailor` reads this every time it builds a new resume, so it leads with what's already working.

</details>

### Resume library

<details>
<summary><strong>/Resume RAG/ — your tailored resume archive</strong></summary>

<br/>

Every tailored resume gets saved here as a markdown file, plus a short index (`00_source_index.md`) that lists each file with its target domain and title so the skill can find the closest match quickly.

When the next role comes in, `resume-tailor` finds the closest prior resume and reuses the language that already worked — rather than writing every line from scratch. The actual DOCX + PDF files are saved separately, to a per-company folder outside this source folder.

</details>

---

## How to customise

You barely have to — most customisation happens by using it. But here's how to steer it deliberately:

**Tell it directly**
*"stop showing me on-site roles"*, *"I want to lean more into product strategy"*, *"remove fintech from my targets."* It updates `search-config.md` and remembers. Your feedback always outranks its own guesses.

**Edit a file**
Open `search-config.md` and change what you're targeting. Open `profile.md` and add a win you forgot. Both routes end up in the same place — the skill reads the live files on every run.

For recurring jobs, edit `run-config.md` for operational settings and `daily-runbook.md` for durable instructions. That keeps you from being stuck with whatever prompt happened to be pasted into one scheduler.

**Let the loop do it**
The most powerful customisation is just logging outcomes consistently. After a few weeks, the system knows which framings get you callbacks and which get you filtered — and it adjusts automatically.

---

## Quick-start recap

That's the whole thing. Not complicated — just a system that *remembers*, which turns out to be the part most job hunts are missing.

If you only remember five things:

- **Install both** by saving the two `.skill` files
- **Connect a folder** (Cowork or a Project) so the files persist between chats
- **Start with** *"help me set up my job search"* and give it real numbers
- **Use it** by pasting a job description and saying *"tailor my resume for this"*
- **Feed it outcomes** every single time you hear back — that's what makes it smart

Do that, and in a few weeks you'll have a job search that's actually working *for* you instead of you working it. Go get it. 💪

---

<div align="center">
  <sub>Made with ♥ by Dave &nbsp;·&nbsp; <a href="https://github.com/deewang/Job-Search-OS/issues">shout if anything feels off</a></sub>
</div>

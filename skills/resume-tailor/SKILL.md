---
name: resume-tailor
description: Tailor your resume to a specific job description, then only after the resume is finalized draft a matching cover letter or outreach message if requested. Use this skill whenever you provide a job description (pasted text, a job-posting URL, or a file) and want a resume customised for it, or say anything like "tailor my resume", "write me a resume for this role", "customise my CV for this job", "make a resume for [company]", or "draft a cover letter for this". Trigger even if the word "resume" is not used but the intent is clearly to produce an application document for a role. This skill reads your living profile, format rules, and prior-resume library from your job-search folder, so it always uses your current achievement bank and learnings.
---

# Resume Tailor

Turn a job description into a tailored resume (DOCX + PDF), built from your real achievement bank, your format rules, and your library of prior tailored resumes. The goal is a recruiter-ready document that mirrors the JD's language, passes ATS keyword screening, and leads with the proof points that map most directly to what the role asks for.

The resume anchors the narrative. Do **not** create the cover letter or outreach message in the same pass as the resume. Only draft cover letters or outreach after you have finalized the resume angle, highlights, and ordering.

This skill does NOT invent achievements or metrics. Everything comes from your source files. If something the JD wants is not in your background, name it as a gap rather than fabricating it.

> **Pairs with the `job-search-os` skill.** If you have it installed, this skill reads the same living files (`resume-style-guide.md`, `profile.md`, `search-config.md`, `search-patterns.md`, `hypotheses.md`, `keyword-ledger.md`) and writes outcomes back to them. They are designed to be used together, but resume-tailor also works on its own.

---

## First run — show the welcome guide, then set up the files

**On the very first run (when the core files don't exist yet), show the user the bundled welcome guide before doing anything else.** Present `references/welcome.html` (use `present_files`, or open it for the user). It explains what the skill is, the thinking behind it, and how to use and customise it. Give a one-line intro like "Here's a quick guide to what this does," then continue into setup. Skip this on later runs once the files exist.

This skill works by reading living files from **your job-search folder**. If you have never used it, those files won't exist. After showing the welcome guide, do the **setup interview** in `references/setup-interview.md` to create them, then continue. Don't ask the user to fill in blank files by hand — interview them and write the files for them.

The core files this skill needs:

| File | What it holds |
|---|---|
| `profile.md` | Your achievement bank: who you are, career timeline, achievement bullets WITH NUMBERS grouped by theme, core strengths, "what makes you stand out", and a Metric Notes table for any number you state differently across versions. The ONLY source for resume bullets and metrics. |
| `resume-style-guide.md` | Your canonical resume guide: voice, tone, section patterns, page architecture, format spec, tailoring checklist, and file-naming + save-location conventions. |
| `search-config.md` *(optional)* | Target titles, locations, domains, include/exclude keywords. Used as a positioning lens. |
| `search-patterns.md` / `hypotheses.md` *(optional)* | What's confirmed to work vs. still being tested. Positioning context. |
| `keyword-ledger.md` *(optional)* | Per-application record of the keywords/framings used and the outcome. What makes the system self-improving over time. |

A `/Resume RAG/` subfolder holds prior tailored resumes as markdown plus a short index file, so the skill can reuse proven language instead of writing every line from scratch.

> If the job-search folder isn't accessible (e.g. running in a chat without a folder connected), say so plainly and either run the setup interview to gather the material in-conversation, or ask the user to paste the relevant files. Do not proceed from guesswork — the value of this skill is that it uses real material.

## Scheduled batch mode

When invoked as the separate automated resume pass, read `run-config.md` and `resume-tailoring-runbook.md` before this workflow. Use the configured primary tracker as the queue. Process only roles that satisfy the canonical threshold, verified-live run ID, eligible status, and idempotency rules in those files. Do not use a Markdown mirror as a second queue when an external tracker is primary.

After each draft, write the DOCX and PDF locations, `Needs Human Review` status, drafted date, run ID, attribution, and honest gaps to the same primary tracker record. Add a `keyword-ledger.md` row with outcome `Pending`. The later QA pass reads that state; this pass does not approve a resume or submit an application.

---

## Workflow

### Step 1 — Get the job description

The JD may arrive as pasted text, a URL, or a file.
- **URL:** fetch it. If the page is client-rendered and the fetch returns an empty shell, ask for the JD text.
- **File:** read it.
- Capture the **exact job title** and **company name** — you'll need both for the target-role line and the file naming.

### Step 2 — Read the source files

Read `resume-style-guide.md` and `profile.md` in full. If only `resume-format.md` exists, read it and follow its redirect to the current guide. Skim `search-config.md`, `search-patterns.md`, and `hypotheses.md` for the positioning lens if they exist. Then open the `/Resume RAG/` index and pick the 1–2 prior resumes closest to this role (by domain/title); read those. If no prior resumes exist yet, work from `profile.md` alone.

### Step 3 — Analyse the JD

Extract and note (briefly, for your own use):
- Required experience areas and must-have skills
- Domain keywords and competency language (the exact terms to mirror)
- Seniority signals and the title band
- Any domain **gaps** vs. the profile — flag these honestly

Apply the patterns from `search-patterns.md` if present: lead with confirmed strengths, and don't over-index on anti-pattern territory even if the JD mentions it.

### Step 4 — Build the resume sections

Follow `resume-style-guide.md` exactly. In brief (defer to that file if it disagrees):

- **Executive Summary** (2–3 sentences): mirror the JD's domain + competency keywords. No company names, no metrics. Its job is to answer the JD and pass ATS.
- **Selected Highlights** (4–6): `**Bold Label:** what was done. Metric outcome.` Pick the highlights that map most directly to the JD's stated requirements; order strongest-match first.
- **Experience bullets:** pull the closest-matching phrasing from the RAG library. Action verb first, metric as a participial phrase at the end. No "responsible for", no "→", no em-dashes, no semicolons splitting two ideas.
- **Portfolio link (header):** when the profile or style guide provides a candidate-verified portfolio or GitHub URL, keep it as a compact live hyperlink on the contact line immediately after LinkedIn. Never infer a handle or URL. Keep it at the contact-line size and visual weight. Do not add a separate Projects, Portfolio, or builder-summary section unless the candidate explicitly asks for one.

Then produce the resume DOCX. Use the **docx** skill for generation if it's available, matching the format spec in `resume-style-guide.md` (font, margins, sizes). Read the docx SKILL.md before building the file. If no docx skill is available, output clean, copy-ready text.

### Step 5 — Run the tailoring checklist

Run the full checklist in `resume-style-guide.md` (target title matches the JD, JD language is reflected without keyword stuffing, no company names/metrics in the summary, highlights ordered by relevance, no "→"/em-dashes/"responsible for", correct font throughout, GitHub is live-linked beside LinkedIn without wrapping, and rendered page spacing is visually inspected). Fix anything that fails before saving.

### Step 6 — Save and deliver the resume for finalization

Save to a per-company folder, creating it if needed (use whatever output convention is set in `resume-style-guide.md`):

```
[your resume output location]/[Company Name]/
```

Never save tailored artifacts inside the job-search source folder — that folder holds source-of-truth files only.

File naming (per `resume-style-guide.md`):
- Resume DOCX: `[YourName]_[Seniority]_[Domain1]_[Domain2].docx`
- Resume PDF: same name, `.pdf` — **always export a PDF for submission**, keep the DOCX for edits

Then present the resume files and give a 2–3 line summary: the angle led with, which highlights were chosen and why, and any JD gaps to be ready to address in an interview. Ask the user to confirm the resume is finalized before producing a cover letter or outreach message.

If `keyword-ledger.md` exists, add a row capturing the company, role, resume version, and the keywords, framing, and highlights led with. Set the outcome to `Pending` until the candidate actually submits it and reports a result.

### Step 7 — After resume finalization: cover letter or outreach only if requested

Only after the resume is finalized, draft a cover letter or outreach message if asked. Use the final resume as the narrative anchor: same angle, same proof points, same ordering of strengths.

For cover letters and outreach messages:
- Match the user's writing voice. If a writing-voice skill or sample exists, load and follow it.
- Lead with value and fit, not with the ask.
- Back claims with concrete proof points and metrics from the finalized resume and `profile.md`.
- Close with a low-pressure alignment invitation, not a plea.
- Avoid "please pick me", "I'd be grateful for the opportunity", "I know I'm a long shot", over-thanking, or hedging.
- No em-dashes. Sound human, confident, warm, and direct.

Save cover letters alongside the finalized resume:

```
[your resume output location]/[Company Name]/
- [YourName]_Cover_Letter_[Company].docx
- [YourName]_Cover_Letter_[Company].pdf
```

---

## Principles

- **Truthful tailoring.** Reframe and reorder real achievements to fit the JD. Never invent a metric, employer, or responsibility. Conflicting numbers → use the Metric Notes table in `profile.md`.
- **Answer the JD, then sell.** The summary answers the role and feeds the ATS; the highlights sell the fit. Keep those jobs separate.
- **Borrow proven language.** The RAG library exists so you don't rewrite from zero. Find the closest prior resume and reuse what worked.
- **Lead with confirmed strengths.** Use `search-patterns.md` to decide what to foreground.
- **Resume first.** The resume is the source narrative. Cover letters and outreach come later, only after the resume is finalized.
- **Partnership, not pleading.** Cover letters and outreach should sound like a confident discussion about mutual fit, not a request for validation.
- **One quiet quality bar:** would a tired recruiter, skimming for 20 seconds, immediately see why this person fits this exact role? If not, re-order.

---

## Quick reference

See `references/folder-map.md` for the file layout and `references/setup-interview.md` for the first-run interview that creates the living files.

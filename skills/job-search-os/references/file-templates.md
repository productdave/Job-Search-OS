# Living-file templates

Structure for each file the setup phase creates. Fill them with the person's real answers. Keep them current — every later run reads the live versions.

The canonical copy-ready implementations are bundled in `../assets/starter-kit/`. This reference explains their roles; do not maintain a second set of full templates here.

---

## daily-runbook.md — how automated searches run

The durable operating procedure for daily or recurring runs. It should be clear enough that any capable agent can run the same search without copying a giant prompt into a scheduler.

- **Objective** — one paragraph describing the run's job: read the living files, collect feedback, find verified-live roles, update the tracker, and produce a digest.
- **Read order** — `run-config.md`, `active-learnings.md` if present, `search-config.md`, `search-patterns.md`, `hypotheses.md`, `boards-and-companies.md`, tracker feedback, then the resume/profile files needed for scoring.
- **Feedback intake** — tracker fields to inspect before searching, such as Listing Feedback, Why I Applied, Confirmed Signal, Notes, Status, Pass Reason.
- **Search procedure** — sources to query, title/location/domain filters, how to use target-company lists, and how broad the daily search should be.
- **Verification procedure** — canonical ATS requirement, fallback search pattern, how to classify confirmed live / needs verification / closed.
- **Scoring procedure** — fit-score rubric, dealbreakers, downrank rules, and how much reasoning to write per role.
- **Tracker write rules** — duplicate detection, required fields, status values, last-verified date, source/model attribution, and when to update instead of create.
- **Digest contract** — what to return after each run: new top roles, changed existing roles, unconfirmed roles, ghost listings, config changes, and open questions.
- **Post-run maintenance** — which files to append or update after the run, including `learnings-log.md`, `search-patterns.md`, `run-config.md`, and `daily-runbook.md` itself.

## run-config.md — editable knobs for each run

The small configuration file a scheduler points at. Keep this concise; it is for run mechanics and temporary focus, not the whole search strategy.

- **Run mode** — manual test / daily search / resume tailoring / resume QA / weekly review.
- **Schedule** — timezone, intended cadence, and last successful run.
- **Search scope** — how many roles to add, how many companies or boards to inspect, and whether to prioritize new roles only or reverify active ones too.
- **Source priority** — ordered list of boards, ATS sources, target-company career pages, and any sources temporarily disabled.
- **Tracker integration** — one primary tracker type and location, required fields, duplicate keys, and whether `roles-tracker.md` is maintained as a derived portable mirror.
- **Attribution** — model/agent name field, run ID format, source URL field, first-seen and last-verified fields.
- **Digest preferences** — where to write or send the digest, max items, and any separate sections the person expects.
- **Safety rails** — actions the run should not take automatically, such as applying to jobs, emailing recruiters, or changing hard filters without logging a reason.
- **Temporary overrides** — short-lived focus areas, companies to pause, or hypotheses to test, each with an expiry date.

## resume-tailoring-runbook.md — how eligible drafts are created

The durable operating procedure for the separate resume pass. It should define:

- read order, beginning with `run-config.md` and the primary tracker;
- eligibility from the canonical threshold, verified-live run ID, active status, and idempotency state;
- truthful source rules for `profile.md`, prior resume language, and the target listing;
- DOCX/PDF generation, rendering, save location, and `Needs Human Review` status;
- primary-tracker fields and `keyword-ledger.md` writes;
- the exact handoff set for `resume-qa-runbook.md`;
- hard stops for applying, outreach, cover letters, invented facts, and overwriting human work.

## profile.md — the achievement bank

- **Contact and public links** — verified location, email, phone, LinkedIn, and GitHub/builder-portfolio URLs. Never infer a handle or URL.
- **Who I am** — 2–3 lines for job matching (level, years, domains, the outcomes I drive).
- **Career timeline** — a table: Company | Role | Dates | One-line scope.
- **Achievement bank** — bullets WITH NUMBERS, grouped by theme (e.g. Growth, Monetisation, Platform, Leadership). Include metric variants where the same achievement can be framed differently.
- **Core Strengths** — skills mapped to real shipped work.
- **What Makes Me Stand Out** — 5–8 distinct angles, each tagged with the role/company type it's best used for.
- **Metric Notes table** — any metric stated differently across versions, with the recommended canonical number. The ONLY place resume metrics come from.

## resume-style-guide.md — how the resume is built and written

- **Voice and positioning** — stable writing principles, tone by role type, and rules for sounding like the person rather than a keyword-matched profile.
- **Format spec** — font, margins, sizes, bullet style, page architecture, and spacing derived from the best existing resume (note its path as the "gold standard").
- **Header/contact links** — when the candidate supplies a verified portfolio or GitHub URL, place a compact label immediately after LinkedIn as a live hyperlink and keep it on one line. Never infer a handle or URL. Keep it visually secondary; do not create a separate projects section unless requested.
- **Section order** and per-section writing rules (summary, highlights, experience, education).
- **Tailoring checklist** — run before any resume is finalised. Example items: target title matches the JD; JD language is reflected without keyword stuffing; no company names/metrics in the summary; highlights ordered by relevance; no "→"/em-dashes/"responsible for"; consistent font; page 2 is visually inspected for spacing.
- **Naming + save conventions** — file name pattern and per-company output folder.
- **Learning loop** — what to update after the person edits or sends a final resume.
- **Compatibility note** — older folders may still contain `resume-format.md`; treat it as a redirect only and follow `resume-style-guide.md` when present.

## search-config.md — what I'm looking for

- **Target roles** — exact titles to query.
- **Target locations** — remote / cities / regions.
- **Domains** — preferred, and deprioritised.
- **Company stage** — preferences.
- **Keywords to INCLUDE** / **Keywords to EXCLUDE** in JDs.
- **Salary** — minimum + target.
- **Title-band filter** — too-junior floor and too-senior ceiling.
- **Scoring notes** — how to weight roles (e.g. prioritise strategy/vision over pure execution; flag recent funding).

## boards-and-companies.md — where to look

- **Job boards, tiered** — reliable ATS boards, then aggregators, then niche boards. Note which are trustworthy for recency.
- **Target companies** grouped by domain, each with a career-page URL.
- **Active Applications & Contact History** — running log of who's been applied to and any recruiter contact.

## learnings-log.md — chronological signal log

Append-only. Put a format block at the top so entries stay consistent. Every meaningful event gets a dated entry: role found, application sent, ATS rejection, callback, interview, pass, config change.

## interview-learnings.md — interview memory and experiments

Keep candidate-owned reflections separate from resume-screening evidence. For each meaningful interview stage, record the role and stage, what was asked, what seemed to land, where the candidate struggled, direct feedback or observable signals, and one change to test next time. Link the reflection to role, resume, and hypothesis IDs where possible. Do not store unnecessary personal information about interviewers or promote a one-off feeling into a confirmed pattern.

## hypotheses.md — what I'm learning, before it's proven

- **Apply hypotheses** — what draws me to apply.
- **Callback hypotheses** — why companies call me back.
- Each has a status (Forming / Confirmed / Disproved) and an evidence list.
- Rule: a hypothesis with 3+ consistent data points graduates to `search-patterns.md`.

## search-patterns.md — what I know for sure

- Confirmed patterns promoted from hypotheses, each with a confidence level, evidence, and an implication for scoring/positioning.
- A **Config Change History** table logging every change to `search-config.md` and why.

## keyword-ledger.md — the self-improving brain

A table tracking, per application: company, role, resume variant used, the keywords/framings/highlights led with, and the OUTCOME (ATS rejected / callback / interview / offer / no offer). Plus a running "What's working / what's not" summary comparing resumes that advanced vs. those auto-rejected.

## The primary tracker

A single authoritative roles table the person sees at a glance. It may be Markdown, CSV, Notion, or Sheets. If `roles-tracker.md` mirrors an external primary tracker, the mirror is derived and must retain primary record IDs. Do not accept independent edits from both. Columns:

`Role · Company · Status · Score · Location · Salary · Link (canonical ATS) · Date Found · Verification · Last Verified · Verified Run ID · Source / Agent · Why It Fits · Concerns · Why I Applied · Confirmed Signal · Listing Feedback · Draft Resume · Draft PDF · Draft Status · Draft Run ID · QA Result · Notes`

Suggested status values: Found · Researching · Shortlist · Applied · Phone Screen · Interviewing · Offer · Pass · Expired.

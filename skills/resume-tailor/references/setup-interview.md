# First-run setup interview

Run this the first time the skill is used, or whenever `profile.md` / `resume-style-guide.md` are missing. The goal is to create the living files **for** the user from their real answers — don't hand them blank templates to fill in.

If the user has uploaded or pointed to an existing resume, **extract everything you can from it first**, then only ask about the gaps.

## Ask in one focused batch (not 20 separate turns)

1. **Background:** years of experience, current/most recent roles, the domains they work in, and the role + seniority they're targeting.
2. **Constraints:** target locations (remote / specific cities / open to relocation), minimum salary, company stage/size preferences, hard exclusions (industries, role types, or title levels too junior or too senior).
3. **Proof:** their biggest achievements with real numbers (revenue, growth, scale, users, team size). Push for metrics — these become the achievement bank.
4. **Materials and public links:** do they have an existing resume, prior tailored resumes, a writing sample they want cover letters to sound like, or public profiles/portfolios such as LinkedIn and GitHub? Ask them to share or point to these.
5. **Workspace and tracking:** where should the private workspace and generated resumes live, which single tracker should be authoritative, and do they want separate scheduled search, resume-tailoring, and resume-QA passes after a manual test?

## Then create the files

**`profile.md`** — the achievement bank:
- Who they are (2–3 lines for job matching), a career timeline table, and a bank of achievement bullets WITH NUMBERS grouped by theme.
- A "Core Strengths" list mapping skills to real shipped work.
- A "What Makes Me Stand Out" section: 5–8 distinct angles, each tagged with the role/company type it's best used for.
- A "Metric Notes" table for any metric stated differently across versions, with a recommended canonical number. This is the ONLY place resume metrics come from.

**`resume-style-guide.md`** — how the resume is built and written:
- Document format spec (font, margins, sizes, bullet style), page architecture, and spacing derived from their best existing resume (the "gold standard" — note its file path).
- Header/contact rules for verified public links. When the candidate provides a portfolio or GitHub URL, use a compact label as a live hyperlink immediately after LinkedIn and keep it visually secondary. Never infer a handle or URL; do not create a separate projects section unless requested.
- Stable voice, role-specific tone, section order, and per-section writing rules (summary, highlights, experience bullets).
- A tailoring checklist to run before every resume is finalised (e.g. target title matches the JD, JD language is reflected without keyword stuffing, no company names/metrics in the summary, highlights ordered by relevance, no "→"/em-dashes/"responsible for", consistent font, rendered page spacing inspected).
- File-naming and save-location conventions.
- Writing rules to avoid (e.g. no "responsible for", no em-dashes, active voice, numerals for metrics, one idea per bullet). Capture their preferred English variant (US/UK/AU).
- A learning loop for incorporating the person's final edits and callback patterns into future resumes.

**`/Resume RAG/`** — seed it with whatever resumes they share, saved as markdown, plus a short index file (`00_source_index.md`) listing each file with its target domain/title so the skill can find the closest match quickly.

Optionally, if they also want the full job-search system (config, learnings loop, tracker), point them to the companion **job-search-os** skill, which builds the rest of the living files.

Once the files exist, confirm with the user and continue to the normal workflow in `SKILL.md`.

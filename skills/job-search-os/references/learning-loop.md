# The learning loop

What turns a job tracker into a self-improving system. Run this as a recurring pass and whenever the person reports an outcome.

## The routine

1. **Scan for changes.** Review the tracker for any status changes since the last pass (new rejection, callback, interview, offer, pass).

2. **Read person feedback.** Before inferring from outcomes, inspect any tracker fields the person may have edited: Listing Feedback, Why I Applied, Confirmed Signal, Notes, Status, Pass Reason. Person-authored feedback outranks the system's earlier score.

3. **Record each signal.** For every change, write a dated entry to `learnings-log.md` and update the matching row in `keyword-ledger.md`:
   - ATS rejection → did the keywords/framing likely hurt? Note the domain/angle that got filtered.
   - Callback / interview → which keywords and highlights did that resume lead with? Mark them as working.
   - No-offer after interview → note the stage and any feedback; this is interview signal, not resume signal.

4. **Update hypotheses.** Fold the new evidence into `hypotheses.md`. Add new apply/callback hypotheses or strengthen existing ones with the dated data point.

5. **Promote what's proven.** Any hypothesis with **3+ consistent data points** graduates to `search-patterns.md` as a confirmed pattern, with its confidence level, evidence, and the implication for scoring/positioning. If a confirmed pattern implies a config change, update `search-config.md` and log it in the Config Change History table with the reason and date.

6. **Feed wins back into the resume.** When a tailored resume earns a callback, extract the winning keywords/highlights and add them to `profile.md` (so future resumes can lead with them) and mark them in `keyword-ledger.md`. When a framing keeps getting filtered out, stop leading with it.

7. **Tune the run, not the scheduler.** If the learning changes how daily searches should run, update `run-config.md` or `daily-runbook.md`. Keep scheduled-task prompts short and stable so the same job can run under multiple LLMs.

## Principles for the loop

- **Treat outcomes as labelled training data.** A rejection and a callback are both information about what your resume and targeting are doing.
- **Person feedback outranks inference.** If they tell you why they passed or progressed, that's stronger evidence than your scoring guess. Update the rules accordingly.
- **Don't over-fit to one data point.** One rejection is noise. The 3+ rule exists so patterns are real before they change your config.
- **Keep history.** `learnings-log.md` is append-only. Move old detail to an `archive/` folder rather than deleting it, so the trail stays auditable.
- **Attribute automated actions.** When multiple agents or scheduled jobs may touch the tracker, write the source/model/run ID where the tracker supports it. This makes later comparison possible.

## Optional integrations

- **Scheduling** — if a scheduling tool is available, offer a daily find-and-track pass and a weekly learning pass. The schedule should point at `run-config.md` and `daily-runbook.md`; do not bury durable instructions inside the scheduler text.
- **Notion / Sheets tracker** — if the person keeps their tracker in Notion or a spreadsheet, read status and feedback from there each run, and write attribution (which model/agent created a card, the date) so they can compare sources over time.
- **Resume upload loop** — when the person uploads a new tailored resume (to the tracker card or the folder), compare it to `profile.md` and pull any new bullet variants, reframed achievements, or summary copy back into the achievement bank.

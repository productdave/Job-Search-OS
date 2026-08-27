# Resume QA runbook

Read, in order:

1. `run-config.md`
2. `resume-tailoring-runbook.md`
3. the configured primary tracker
4. `resume-qa.md`
5. `resume-style-guide.md`
6. `profile.md`
7. the target listing and tracker record
8. the draft DOCX and PDF

## Scope

Review only drafts created by the immediately preceding tailoring run, or explicitly selected by the candidate, that remain marked `Needs Human Review`. Use the draft run ID and saved file locations in the primary tracker. Do not treat a Markdown mirror as a second queue when an external tracker is primary.

## Process

1. Confirm the listing is still live and the draft maps to the correct role.
2. Compare every factual claim and metric to `profile.md`.
3. Inspect document structure and links.
4. Render every PDF page to an image and inspect at readable resolution.
5. Apply the verdict rule in `resume-qa.md`.
6. For a hard failure in a generated draft, send exact fixes back to the canonical resume builder, regenerate, and re-run QA.
7. Stop after 3 fix-and-QA cycles. Report remaining failures for human action.
8. For attached or hand-authored files, flag issues only; never regenerate or overwrite.
9. Record the verdict, cycle count, and honest gaps in the same primary tracker record used by the tailoring pass. Refresh a configured Markdown mirror from that record only after the primary write succeeds. Keep status `Needs Human Review`.

Finish with counts and a per-resume verdict.

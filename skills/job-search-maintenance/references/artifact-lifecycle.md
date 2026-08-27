# Artifact Lifecycle

Use this reference when cleaning scripts, packages, previews, temporary files, or duplicate repositories.

## Classification

| Class | Typical evidence | Action |
|---|---|---|
| Live | Imported, linked, named by a runbook or scheduler, or required by a package | Keep; repair dependency declaration if needed |
| Compatibility | Redirect, adapter, or legacy path still read by a consumer | Keep until every consumer migrates |
| Generated | Page renders, scratch output, caches, temporary exports | Archive when no current QA/review uses it |
| Historical | Per-run builder, dated experiment, superseded prompt, old backup | Archive with provenance |
| Duplicate | Older checkout or package whose useful changes exist in the canonical source | Preserve repository state, then archive |
| System-managed | `.fuse_hidden*`, `.DS_Store`, cloud-provider metadata, open OS handles | Do not manipulate as user cleanup |

## Proof required before archiving

- Search exact and basename references across active files.
- Inspect JavaScript imports/`require()` calls and package scripts.
- Inspect scheduler prompts and installed skill copies.
- Check whether a generated package matches a source folder. Rebuild from canonical source before archiving an older distribution.
- Check every Git checkout's branch and dirty state. Preserve `.git` and uncommitted work when archiving a duplicate.
- Confirm the destination does not already exist.

## Archive transaction

Use a dated directory under `4. System Files/archive/` with:

- `README.md` — scope, safety warnings, restore instructions;
- `MOVED-FILES.tsv` — original path, archive path, classification, reason;
- the files or directories, preserving names where practical.

Prefer moves within the same filesystem. Do not use recursive deletion as cleanup. If files are open by Dropbox/Finder metadata processes, leave system tombstones alone and report them.

## Dependencies and packages

- Every third-party runtime import must appear in the nearest package manifest and lockfile.
- Generated `.skill`, `.zip`, DOCX, PDF, or other packages are artifacts, not source. The unpacked source folder is canonical.
- Keep one current distributable per supported install path. Archive older packages only after source-to-package parity checks pass.
- Never modify unrelated repositories found under the same portfolio directory.

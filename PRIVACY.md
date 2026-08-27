# Privacy and publishing checklist

This repository is designed to stay generic. The generated workspace is not.

## Before publishing a fork

- Search tracked files for your name, usernames, email addresses, phone numbers, home or work paths, profile URLs, employer names, and real application URLs.
- Inspect images, PDFs, DOCX files, archives, and `.skill` packages as well as plain text.
- Keep real resumes, generated workspaces, tracker exports, screenshots, and agent logs out of the repository.
- Use fictional examples that are explicitly labelled as fictional.
- Check Git commit authors, commit messages, branches, tags, remote URLs, issues, and pull requests. Removing a name from the current files does not remove it from Git history or the hosting account.
- If anonymity matters, publish from a separate account into a newly initialized repository after copying only the reviewed working-tree files. Do not reuse identifying Git history.

## Data boundaries

The template repository may contain:

- blank or tokenized templates;
- generic workflow instructions;
- fictional names, employers, URLs, metrics, and outcomes;
- generated `.skill` archives built from the generic source folders.

It should not contain:

- real candidate contact details or public profile URLs;
- real employment history, achievements, compensation, or location constraints;
- real job applications, recruiter correspondence, or interview feedback;
- absolute paths from a candidate's computer;
- API keys, database IDs, workspace IDs, tokens, cookies, or credentials;
- private scheduler prompts that embed candidate rules or tracker identifiers.

## Local onboarding

`index.html` is a static file. Its wizard makes no network requests and stores nothing in browser storage. The download button creates a local Markdown file from the values currently in the form.

The setup script writes only to the destination path you provide. It refuses a non-empty destination by default. A generated `my-job-search/` folder is ignored by this repository, but a workspace created elsewhere must be protected separately.

## Final scan examples

Run these from the repository root and review every match:

```bash
rg -n -i --hidden --glob '!.git/**' \
  '(your-name|your-email|your-handle|/Users/|linkedin\\.com/in/|github\\.com/)' .

git log --format='%an <%ae>' | sort -u
git remote -v
```

The second and third commands inspect attribution; they do not change it.

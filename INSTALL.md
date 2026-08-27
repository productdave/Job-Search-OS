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

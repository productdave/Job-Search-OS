#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import readline from "node:readline/promises";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const templateRoot = path.resolve(scriptDir, "..", "assets", "starter-kit");

const help = `
Job Search Harness workspace setup

Usage:
  node job-search-os/scripts/setup-workspace.mjs [destination] [options]

Options:
  --name VALUE          Candidate name or placeholder
  --titles VALUE        Comma-separated target titles
  --location VALUE      Target locations
  --salary VALUE        Minimum compensation
  --domains VALUE       Preferred domains
  --exclusions VALUE    Hard exclusions
  --tracker VALUE       markdown, notion, or sheets
  --force               Overwrite matching template files; never deletes extras
  --dry-run             Preview files without writing
  --help                Show this help

With an interactive terminal, omitted answers are prompted. Without one, safe
placeholder defaults are used. The destination defaults to ./my-job-search.
`.trim();

function parseArgs(argv) {
  const options = { force: false, dryRun: false };
  const values = new Set([
    "--name",
    "--titles",
    "--location",
    "--salary",
    "--domains",
    "--exclusions",
    "--tracker",
  ]);

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") options.help = true;
    else if (arg === "--force") options.force = true;
    else if (arg === "--dry-run") options.dryRun = true;
    else if (values.has(arg)) {
      const next = argv[index + 1];
      if (!next || next.startsWith("--")) throw new Error(`Missing value for ${arg}`);
      options[arg.slice(2)] = next;
      index += 1;
    } else if (arg.startsWith("--")) {
      throw new Error(`Unknown option: ${arg}`);
    } else if (!options.destination) {
      options.destination = arg;
    } else {
      throw new Error(`Unexpected argument: ${arg}`);
    }
  }
  return options;
}

async function completeAnswers(options) {
  const defaults = {
    name: "Your Name",
    titles: "Target Role",
    location: "Set during onboarding",
    salary: "Set during onboarding",
    domains: "Set during onboarding",
    exclusions: "None yet",
    tracker: "markdown",
  };

  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    return Object.fromEntries(
      Object.entries(defaults).map(([key, fallback]) => [key, options[key] || fallback]),
    );
  }

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const prompts = {
    name: "Candidate name or placeholder",
    titles: "Target titles, comma-separated",
    location: "Target locations",
    salary: "Minimum compensation",
    domains: "Preferred domains",
    exclusions: "Hard exclusions",
    tracker: "Primary tracker (markdown, notion, or sheets)",
  };
  const answers = {};
  try {
    for (const key of Object.keys(prompts)) {
      if (options[key]) {
        answers[key] = options[key];
        continue;
      }
      const entered = await rl.question(`${prompts[key]} [${defaults[key]}]: `);
      answers[key] = entered.trim() || defaults[key];
    }
  } finally {
    rl.close();
  }
  return answers;
}

function validateAnswers(answers) {
  const allowedTrackers = new Set(["markdown", "notion", "sheets"]);
  answers.tracker = answers.tracker.toLowerCase();
  if (!allowedTrackers.has(answers.tracker)) {
    throw new Error("Tracker must be markdown, notion, or sheets.");
  }
}

function walkFiles(root, current = root) {
  const files = [];
  for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
    const full = path.join(current, entry.name);
    if (entry.isDirectory()) files.push(...walkFiles(root, full));
    else if (entry.isFile()) files.push(path.relative(root, full));
  }
  return files.sort();
}

function replaceTokens(content, values) {
  let output = content;
  for (const [token, value] of Object.entries(values)) {
    output = output.split(`{{${token}}}`).join(value);
  }
  return output;
}

function assertDestinationSafe(destination, force) {
  if (!fs.existsSync(destination)) return;
  if (!fs.statSync(destination).isDirectory()) {
    throw new Error(`Destination exists and is not a directory: ${destination}`);
  }
  const entries = fs.readdirSync(destination);
  if (entries.length && !force) {
    throw new Error(
      `Destination is not empty: ${destination}\nChoose an empty folder or pass --force to overwrite matching template files. Extra files are never deleted.`,
    );
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(help);
    return;
  }
  if (!fs.existsSync(templateRoot)) {
    throw new Error(`Bundled starter kit was not found: ${templateRoot}`);
  }

  const answers = await completeAnswers(options);
  validateAnswers(answers);

  const destination = path.resolve(options.destination || "my-job-search");
  assertDestinationSafe(destination, options.force);

  const today = new Date().toISOString().slice(0, 10);
  const values = {
    NAME: answers.name,
    WORKSPACE_NAME: answers.name === "Your Name" ? "Job Search Harness" : `${answers.name}'s Job Search Harness`,
    TARGET_TITLES: answers.titles,
    LOCATION: answers.location,
    SALARY: answers.salary,
    DOMAINS: answers.domains,
    EXCLUSIONS: answers.exclusions,
    TRACKER: answers.tracker,
    TODAY: today,
  };
  const files = walkFiles(templateRoot);

  if (options.dryRun) {
    console.log(`Would create or update ${files.length} files in ${destination}:`);
    files.forEach((relative) => console.log(`- ${relative}`));
    return;
  }

  fs.mkdirSync(destination, { recursive: true });
  for (const relative of files) {
    const source = path.join(templateRoot, relative);
    const target = path.join(destination, relative);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    const content = fs.readFileSync(source, "utf8");
    fs.writeFileSync(target, replaceTokens(content, values), "utf8");
  }

  console.log(`Created ${files.length} files in ${destination}`);
  console.log("Next: open START-HERE.md and complete profile.md with verified facts.");
  console.log("Keep the generated workspace private.");
}

main().catch((error) => {
  console.error(`Setup failed: ${error.message}`);
  process.exitCode = 1;
});

#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "index.html");
const destination = path.join(root, "job-search-os", "references", "welcome.html");

if (!fs.existsSync(source)) {
  throw new Error(`Canonical onboarding file is missing: ${source}`);
}

const content = fs.readFileSync(source, "utf8");
const requiredPhrases = [
  "Job searching should not eat your whole day",
  "Job Search OS repository link",
  "Copy the installation message",
];

for (const phrase of requiredPhrases) {
  if (!content.includes(phrase)) {
    throw new Error(`Onboarding is missing required phrase: ${phrase}`);
  }
}

fs.writeFileSync(destination, content, "utf8");
console.log(`Synced ${path.relative(root, source)} to ${path.relative(root, destination)}`);

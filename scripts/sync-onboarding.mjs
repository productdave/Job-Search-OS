#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "index.html");
const destination = path.join(root, "job-search-os", "references", "welcome.html");
const imageNames = ["logo-mark.png", "private-workspace.png", "verified-roles.png", "resume-review.png"];

if (!fs.existsSync(source)) {
  throw new Error(`Canonical onboarding file is missing: ${source}`);
}

const content = fs.readFileSync(source, "utf8");
const requiredPhrases = [
  "Let's get you set up.",
  "Job Search Harness repository link",
  "Copy the installation message",
];

for (const phrase of requiredPhrases) {
  if (!content.includes(phrase)) {
    throw new Error(`Onboarding is missing required phrase: ${phrase}`);
  }
}

const destinationContent = fs.existsSync(destination) ? fs.readFileSync(destination, "utf8") : null;
if (destinationContent !== content) {
  fs.writeFileSync(destination, content, "utf8");
  console.log(`Synced ${path.relative(root, source)} to ${path.relative(root, destination)}`);
} else {
  console.log(`Already synced ${path.relative(root, destination)}`);
}

for (const name of imageNames) {
  const sourceImage = path.join(root, "assets", "guide", name);
  const destinationImage = path.join(root, "job-search-os", "references", "assets", "guide", name);
  if (!fs.existsSync(sourceImage)) throw new Error(`Onboarding image is missing: ${sourceImage}`);
  const sourceBytes = fs.readFileSync(sourceImage);
  const destinationBytes = fs.existsSync(destinationImage) ? fs.readFileSync(destinationImage) : null;
  if (!destinationBytes || !sourceBytes.equals(destinationBytes)) {
    fs.mkdirSync(path.dirname(destinationImage), { recursive: true });
    fs.writeFileSync(destinationImage, sourceBytes);
    console.log(`Synced ${path.relative(root, sourceImage)} to ${path.relative(root, destinationImage)}`);
  }
}

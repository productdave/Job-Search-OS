#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const targetArg = process.argv[2];

if (!targetArg) {
  console.error("Usage: node scripts/export-onboarding-site.mjs /absolute/path/to/sites-project");
  process.exit(1);
}

const target = path.resolve(targetArg);
const publicDir = path.join(target, "public");
const hostingFile = path.join(target, ".openai", "hosting.json");

if (!fs.existsSync(hostingFile)) {
  throw new Error(`Target is not a Sites project: ${target}`);
}

fs.mkdirSync(publicDir, { recursive: true });
fs.copyFileSync(path.join(root, "index.html"), path.join(publicDir, "onboarding.html"));
fs.copyFileSync(path.join(root, "assets", "readme-cover-v3.png"), path.join(publicDir, "og.png"));

console.log("Exported the canonical onboarding and social image to the Sites project.");

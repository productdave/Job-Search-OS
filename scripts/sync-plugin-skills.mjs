#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = path.join(root, ".codex-plugin", "plugin.json");
const skillsRoot = path.join(root, "skills");
const skillNames = ["job-search-os", "resume-tailor", "job-search-maintenance"];

if (!fs.existsSync(manifest)) {
  throw new Error("Plugin manifest is missing; refusing to create generated skill copies.");
}

fs.mkdirSync(skillsRoot, { recursive: true });

for (const name of skillNames) {
  const source = path.join(root, name);
  const target = path.join(skillsRoot, name);
  if (!fs.existsSync(path.join(source, "SKILL.md"))) {
    throw new Error(`Canonical skill source is missing: ${source}`);
  }
  if (fs.existsSync(target)) fs.rmSync(target, { recursive: true });
  fs.cpSync(source, target, {
    recursive: true,
    filter: (candidate) => path.basename(candidate) !== ".DS_Store",
  });
  console.log(`Synced ${name} into the plugin skills directory.`);
}

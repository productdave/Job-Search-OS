#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillNames = ["job-search-os", "resume-tailor", "job-search-maintenance"];

function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, encoding: "utf8", stdio: "inherit" });
  if (result.status !== 0) throw new Error(`${command} ${args.join(" ")} failed`);
}

function packageEntries(skillName) {
  const entries = [];
  function visit(current) {
    for (const entry of fs.readdirSync(path.join(root, current), { withFileTypes: true })) {
      if (entry.name === ".DS_Store") continue;
      const relative = path.join(current, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`Refusing to package symbolic link: ${relative}`);
      if (entry.isDirectory()) {
        entries.push(`${relative.split(path.sep).join("/")}/`);
        visit(relative);
      } else if (entry.isFile()) {
        entries.push(relative.split(path.sep).join("/"));
      }
    }
  }
  entries.push(`${skillName}/`);
  visit(skillName);
  return entries.sort();
}

function buildSkillArchive(skillName) {
  const source = path.join(root, skillName, "SKILL.md");
  if (!fs.existsSync(source)) throw new Error(`Canonical skill source is missing: ${source}`);
  const temporaryArchive = path.join(root, `${skillName}.skill.tmp`);
  const finalArchive = path.join(root, `${skillName}.skill`);
  fs.rmSync(temporaryArchive, { force: true });
  try {
    run("zip", ["-X", "-q", "-9", temporaryArchive, ...packageEntries(skillName)]);
    fs.renameSync(temporaryArchive, finalArchive);
    console.log(`Built ${skillName}.skill`);
  } finally {
    fs.rmSync(temporaryArchive, { force: true });
  }
}

run(process.execPath, ["scripts/sync-onboarding.mjs"]);
run(process.execPath, ["scripts/sync-plugin-skills.mjs"]);
skillNames.forEach(buildSkillArchive);
run(process.execPath, ["scripts/audit-release.mjs"]);

console.log("Release artifacts are synchronized, rebuilt, and verified.");

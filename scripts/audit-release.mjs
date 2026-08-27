#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillNames = ["job-search-os", "resume-tailor", "job-search-maintenance"];
const checks = [];
const failures = [];
const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "job-search-os-release-audit-"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd || root,
    encoding: "utf8",
    stdio: options.stdio || "pipe",
  });
  if (options.allowFailure !== true && result.status !== 0) {
    const detail = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
    throw new Error(`${command} ${args.join(" ")} failed${detail ? `:\n${detail}` : ""}`);
  }
  return result;
}

function check(label, callback) {
  try {
    callback();
    checks.push(label);
    console.log(`PASS  ${label}`);
  } catch (error) {
    failures.push(`${label}: ${error.message}`);
    console.error(`FAIL  ${label}: ${error.message}`);
  }
}

function portableFiles(directory) {
  const files = [];
  function visit(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (entry.name === ".DS_Store") continue;
      const full = path.join(current, entry.name);
      assert(!entry.isSymbolicLink(), `symbolic links are not allowed in skill packages: ${full}`);
      if (entry.isDirectory()) visit(full);
      else if (entry.isFile()) files.push(path.relative(directory, full).split(path.sep).join("/"));
    }
  }
  visit(directory);
  return files.sort();
}

function compareTrees(expectedRoot, actualRoot, label) {
  assert(fs.existsSync(expectedRoot), `${label} expected directory is missing: ${expectedRoot}`);
  assert(fs.existsSync(actualRoot), `${label} actual directory is missing: ${actualRoot}`);
  const expectedFiles = portableFiles(expectedRoot);
  const actualFiles = portableFiles(actualRoot);
  assert(
    JSON.stringify(actualFiles) === JSON.stringify(expectedFiles),
    `${label} file inventory differs\nexpected: ${expectedFiles.join(", ")}\nactual: ${actualFiles.join(", ")}`,
  );
  for (const relative of expectedFiles) {
    const expected = fs.readFileSync(path.join(expectedRoot, relative));
    const actual = fs.readFileSync(path.join(actualRoot, relative));
    assert(expected.equals(actual), `${label} content differs: ${relative}`);
  }
}

function validateSkillFolder(skillName, directory) {
  const skillFile = path.join(directory, "SKILL.md");
  assert(fs.existsSync(skillFile), `${skillName}/SKILL.md is missing`);
  const content = fs.readFileSync(skillFile, "utf8");
  const frontmatter = content.match(/^---\n([\s\S]*?)\n---/);
  assert(frontmatter, `${skillName}/SKILL.md has invalid YAML frontmatter delimiters`);
  const keys = frontmatter[1]
    .split("\n")
    .map((line) => line.match(/^([A-Za-z0-9-]+):/))
    .filter(Boolean)
    .map((match) => match[1]);
  const allowed = new Set(["name", "description", "license", "allowed-tools", "metadata"]);
  const unexpected = keys.filter((key) => !allowed.has(key));
  assert(unexpected.length === 0, `${skillName} has unexpected frontmatter keys: ${unexpected.join(", ")}`);
  const declaredName = frontmatter[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const description = frontmatter[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();
  assert(declaredName === skillName, `${skillName} declares name ${declaredName || "(missing)"}`);
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(declaredName), `${skillName} is not hyphen-case`);
  assert(declaredName.length <= 64, `${skillName} exceeds the 64-character name limit`);
  assert(description, `${skillName} is missing a description`);
  assert(description.length <= 1024, `${skillName} description exceeds 1,024 characters`);
  assert(!description.includes("<") && !description.includes(">"), `${skillName} description contains angle brackets`);
  assert(!/^\s{0,3}\[TODO:/m.test(content.slice(frontmatter[0].length)), `${skillName} contains an unfinished TODO placeholder`);
}

function validateArchive(skillName) {
  const archive = path.join(root, `${skillName}.skill`);
  assert(fs.existsSync(archive), `${skillName}.skill is missing`);
  run("unzip", ["-tq", archive]);
  const listing = run("unzip", ["-Z1", archive]).stdout.split("\n").filter(Boolean);
  assert(listing.length > 0, `${skillName}.skill contains no entries`);
  assert(listing.every((entry) => entry.startsWith(`${skillName}/`)), `${skillName}.skill has entries outside ${skillName}/`);
  assert(listing.every((entry) => !entry.endsWith(".DS_Store")), `${skillName}.skill contains .DS_Store metadata`);
  const extractionRoot = path.join(temporaryRoot, `${skillName}-archive`);
  fs.mkdirSync(extractionRoot, { recursive: true });
  run("unzip", ["-q", archive, "-d", extractionRoot]);
  compareTrees(path.join(root, skillName), path.join(extractionRoot, skillName), `${skillName} archive`);
  return extractionRoot;
}

try {
  check("plugin manifest exposes the generated skills directory", () => {
    const manifestPath = path.join(root, ".codex-plugin", "plugin.json");
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    assert(manifest.skills === "./skills/", `plugin.json skills path is ${manifest.skills || "missing"}`);
    for (const skillName of skillNames) {
      assert(fs.existsSync(path.join(root, "skills", skillName, "SKILL.md")), `generated ${skillName}/SKILL.md is missing`);
    }
  });

  for (const skillName of skillNames) {
    check(`${skillName} source passes structural validation`, () => validateSkillFolder(skillName, path.join(root, skillName)));
    check(`${skillName} generated plugin copy matches its source`, () => {
      compareTrees(path.join(root, skillName), path.join(root, "skills", skillName), `${skillName} generated copy`);
    });
    check(`${skillName}.skill is valid and matches its source`, () => validateArchive(skillName));
  }

  check("starter kit includes a non-empty resume-tailoring runbook", () => {
    const runbook = path.join(root, "job-search-os", "assets", "starter-kit", "resume-tailoring-runbook.md");
    const content = fs.readFileSync(runbook, "utf8");
    assert(content.length > 500, "resume-tailoring-runbook.md is unexpectedly small");
    assert(content.startsWith("# Resume tailoring runbook"), "resume-tailoring-runbook.md has the wrong heading");
    assert(content.includes("## Eligibility") && content.includes("## Hard stops"), "resume-tailoring-runbook.md is missing required sections");
  });

  check("packaged installer creates a complete protected workspace", () => {
    const packageRoot = path.join(temporaryRoot, "job-search-os-e2e-package");
    fs.mkdirSync(packageRoot, { recursive: true });
    run("unzip", ["-q", path.join(root, "job-search-os.skill"), "-d", packageRoot]);
    const packagedSkill = path.join(packageRoot, "job-search-os");
    const workspace = path.join(temporaryRoot, "sample-workspace");
    const setupArgs = [
      path.join(packagedSkill, "scripts", "setup-workspace.mjs"),
      workspace,
      "--name", "Sample Candidate",
      "--titles", "Senior Product Manager",
      "--location", "Remote",
      "--salary", "Set during onboarding",
      "--domains", "Marketplace, SaaS",
      "--exclusions", "None",
      "--tracker", "markdown",
    ];
    run(process.execPath, setupArgs);
    const templateFiles = portableFiles(path.join(packagedSkill, "assets", "starter-kit"));
    const workspaceFiles = portableFiles(workspace);
    assert(JSON.stringify(workspaceFiles) === JSON.stringify(templateFiles), "generated workspace file inventory differs from the starter kit");
    for (const relative of workspaceFiles) {
      const content = fs.readFileSync(path.join(workspace, relative), "utf8");
      assert(!/\{\{[A-Z_]+\}\}/.test(content), `unresolved template token in ${relative}`);
    }
    const secondRun = run(process.execPath, setupArgs, { allowFailure: true });
    assert(secondRun.status !== 0, "installer overwrote a non-empty workspace without --force");
    assert(`${secondRun.stdout}${secondRun.stderr}`.includes("Destination is not empty"), "installer failed for an unexpected reason on a non-empty workspace");

    const maintenanceRoot = path.join(temporaryRoot, "maintenance-e2e-package");
    fs.mkdirSync(maintenanceRoot, { recursive: true });
    run("unzip", ["-q", path.join(root, "job-search-maintenance.skill"), "-d", maintenanceRoot]);
    const maintenanceAudit = run(process.execPath, [
      path.join(maintenanceRoot, "job-search-maintenance", "scripts", "audit-workspace.mjs"),
      workspace,
    ]);
    assert(maintenanceAudit.stdout.includes("resume-tailoring-runbook.md"), "maintenance audit did not inspect the resume-tailoring runbook");
  });

  check("public product messaging uses Job Search Harness", () => {
    const publicFiles = [
      "README.md",
      "INSTALL.md",
      "index.html",
      "How I Built My Job Search OS.html",
      "Start Here - README.html",
      "job-search-os/SKILL.md",
    ];
    for (const relative of publicFiles) {
      const content = fs.readFileSync(path.join(root, relative), "utf8");
      assert(content.includes("Job Search Harness"), `${relative} is missing the Job Search Harness name`);
      assert(!content.includes("Job Search OS"), `${relative} still contains the retired public product name`);
    }
    const manifest = JSON.parse(fs.readFileSync(path.join(root, ".codex-plugin", "plugin.json"), "utf8"));
    assert(manifest.name === "job-search-os", "plugin technical identifier changed and would break compatibility");
    assert(manifest.interface?.displayName === "Job Search Harness", "plugin display name is not Job Search Harness");
  });

  check("README separates installer downloads from readable skill sources", () => {
    const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
    for (const skillName of skillNames) {
      const downloadUrl = `https://raw.githubusercontent.com/productdave/Job-Search-OS/main/${skillName}.skill`;
      assert(readme.includes(downloadUrl), `README is missing the ${skillName}.skill download URL`);
      assert(readme.includes(`./${skillName}/SKILL.md`), `README is missing the readable ${skillName} source link`);
    }
    assert(readme.includes("GitHub cannot preview"), "README does not explain why .skill files look empty on GitHub");
  });
} finally {
  fs.rmSync(temporaryRoot, { recursive: true, force: true });
}

if (failures.length) {
  console.error(`\nRelease audit failed with ${failures.length} problem(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`\nRelease audit passed: ${checks.length} checks.`);

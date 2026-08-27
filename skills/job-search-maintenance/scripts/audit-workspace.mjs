#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { builtinModules } from "node:module";

const args = process.argv.slice(2);
const json = args.includes("--json");
const rootArg = args.find((arg) => arg !== "--json") || process.cwd();
const root = path.resolve(rootArg);

if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
  console.error(`Workspace root is not a directory: ${root}`);
  process.exit(1);
}

const KiB = 1024;
const tracked = [
  { path: "active-learnings.md", role: "mandatory", budget: 64 * KiB },
  { path: "search-config.md", aliases: ["job-search-config.md"], role: "mandatory", budget: 64 * KiB },
  { path: "search-patterns.md", role: "mandatory", budget: 64 * KiB },
  { path: "hypotheses.md", role: "mandatory", budget: 64 * KiB },
  { path: "boards-and-companies.md", aliases: ["job-boards-and-companies.md"], role: "mandatory", budget: 64 * KiB },
  { path: "keyword-ledger.md", role: "mandatory", budget: 64 * KiB },
  { path: "profile.md", aliases: ["resume-profile.md"], role: "mandatory", budget: 64 * KiB },
  { path: "resume-style-guide.md", role: "mandatory", budget: 64 * KiB },
  { path: "daily-runbook.md", role: "mandatory", budget: 64 * KiB },
  { path: "run-config.md", role: "mandatory", budget: 64 * KiB },
  { path: "learnings-log.md", role: "history", budget: 512 * KiB },
  { path: "interview-learnings.md", role: "selective", budget: 192 * KiB },
  { path: "resume-tailoring-runbook.md", role: "selective", budget: 192 * KiB },
  { path: "weekly-review-runbook.md", role: "selective", budget: 192 * KiB },
  { path: "resume-qa.md", role: "selective", budget: 192 * KiB },
  { path: "resume-qa-runbook.md", role: "selective", budget: 192 * KiB },
];

function fileStats({ path: canonical, aliases = [], role, budget }) {
  const relative = [canonical, ...aliases].find((candidate) => fs.existsSync(path.join(root, candidate)));
  if (!relative) return { path: canonical, aliases, role, missing: true, budget };
  const full = path.join(root, relative);
  const content = fs.readFileSync(full, "utf8");
  const bytes = Buffer.byteLength(content);
  return {
    path: relative,
    role,
    bytes,
    lines: content.split(/\r?\n/).length,
    estimatedTokens: Math.ceil(bytes / 4),
    budget,
    status: bytes > budget ? "action" : bytes > budget * 0.75 ? "watch" : "ok",
  };
}

const context = tracked.map(fileStats);
const mandatoryBytes = context
  .filter((item) => item.role === "mandatory" && !item.missing)
  .reduce((sum, item) => sum + item.bytes, 0);

const artifactCandidates = [];
const packageArtifacts = [];
const packageArtifactPaths = new Set();
for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
  if (entry.isFile() && /^_(?:run|tmp).*\.(?:js|mjs|cjs)$/.test(entry.name)) {
    artifactCandidates.push({ path: entry.name, reason: "root-level per-run or temporary script" });
  }
  if (entry.isFile() && /^pg-\d+\.png$/i.test(entry.name)) {
    artifactCandidates.push({ path: entry.name, reason: "root-level generated page preview" });
  }
  if (entry.isDirectory() && entry.name === "tmp") {
    artifactCandidates.push({ path: entry.name, reason: "temporary output directory" });
  }
  if (entry.isFile() && /\.(?:skill|zip|tgz)$/i.test(entry.name)) {
    packageArtifactPaths.add(path.join(root, entry.name));
  }
}

const ignoredDirs = new Set([".git", "node_modules", "archive"]);
const sourceFiles = [];
function walk(current) {
  if (current !== root && fs.existsSync(path.join(current, ".git"))) return;
  for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirs.has(entry.name)) continue;
    const full = path.join(current, entry.name);
    if (entry.isDirectory()) walk(full);
    else {
      if (/\.(?:js|mjs|cjs)$/.test(entry.name)) sourceFiles.push(full);
      if (/\.(?:skill|zip|tgz)$/i.test(entry.name)) packageArtifactPaths.add(full);
    }
  }
}
walk(root);

for (const full of [...packageArtifactPaths].sort()) {
  const stem = path.basename(full).replace(/\.(?:skill|zip|tgz)$/i, "");
  packageArtifacts.push({
    path: path.relative(root, full),
    bytes: fs.statSync(full).size,
    adjacentSource: fs.existsSync(path.join(path.dirname(full), stem)),
  });
}

let packageJson = {};
const packagePath = path.join(root, "package.json");
if (fs.existsSync(packagePath)) packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
const declared = new Set([
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.devDependencies || {}),
  ...Object.keys(packageJson.optionalDependencies || {}),
]);
const builtins = new Set([...builtinModules, ...builtinModules.map((name) => `node:${name}`)]);
const imports = new Set();
for (const file of sourceFiles) {
  const content = fs.readFileSync(file, "utf8");
  const patterns = [
    /require\(\s*["']([^"']+)["']\s*\)/g,
    /from\s+["']([^"']+)["']/g,
    /import\(\s*["']([^"']+)["']\s*\)/g,
  ];
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content))) imports.add(match[1]);
  }
}
const externalPackage = (specifier) => {
  if (specifier.startsWith("@")) return specifier.split("/").slice(0, 2).join("/");
  return specifier.split("/")[0];
};
const externalImports = [...imports]
  .filter((specifier) => !specifier.startsWith(".") && !specifier.startsWith("/") && !builtins.has(specifier))
  .map(externalPackage);
const undeclared = [...new Set(externalImports)].filter((name) => !declared.has(name)).sort();

const report = {
  root,
  generatedAt: new Date().toISOString(),
  context,
  mandatoryContext: {
    bytes: mandatoryBytes,
    estimatedTokens: Math.ceil(mandatoryBytes / 4),
    budget: 384 * KiB,
    status: mandatoryBytes > 384 * KiB ? "action" : "ok",
  },
  artifactCandidates,
  packageArtifacts,
  dependencies: {
    packageManifest: fs.existsSync(packagePath),
    lockfile: fs.existsSync(path.join(root, "package-lock.json")),
    declared: [...declared].sort(),
    undeclaredImports: undeclared,
  },
};

if (json) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

console.log("# Job Search Maintenance Audit\n");
console.log(`Root: ${root}`);
console.log(`Generated: ${report.generatedAt}\n`);
console.log("## Context budget\n");
for (const item of context) {
  if (item.missing) {
    console.log(`- MISSING ${item.path}`);
    continue;
  }
  console.log(`- ${item.status.toUpperCase().padEnd(6)} ${item.path}: ${(item.bytes / KiB).toFixed(1)} KiB, ${item.lines} lines, ~${item.estimatedTokens.toLocaleString()} tokens`);
}
console.log(`\nMandatory startup context: ${(mandatoryBytes / KiB).toFixed(1)} KiB, ~${report.mandatoryContext.estimatedTokens.toLocaleString()} tokens (${report.mandatoryContext.status.toUpperCase()})`);

console.log("\n## Artifact candidates\n");
if (!artifactCandidates.length) console.log("- None in active root paths.");
for (const item of artifactCandidates) console.log(`- ${item.path}: ${item.reason}`);

console.log("\n## Dependency declaration\n");
console.log(`- package.json: ${report.dependencies.packageManifest ? "present" : "missing"}`);
console.log(`- package-lock.json: ${report.dependencies.lockfile ? "present" : "missing"}`);
console.log(`- Declared packages: ${report.dependencies.declared.join(", ") || "none"}`);
console.log(`- Undeclared external imports: ${undeclared.join(", ") || "none"}`);

console.log("\n## Generated package inventory\n");
if (!packageArtifacts.length) console.log("- None found in active package locations.");
for (const item of packageArtifacts) {
  const source = item.adjacentSource === undefined ? "source relationship not inferred" : item.adjacentSource ? "adjacent source present" : "no adjacent source folder";
  console.log(`- ${item.path}: ${(item.bytes / KiB).toFixed(1)} KiB; ${source}`);
}

console.log("\nDry audit only. Read the skill references and build a reference graph before mutating files.");

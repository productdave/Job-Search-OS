const REPOSITORY = "https://github.com/productdave/Job-Search-OS";
const RAW_BASE = "https://raw.githubusercontent.com/productdave/Job-Search-OS/main/";

// Only these public, canonical instructions may be served. Never accept a path or URL from a caller.
export const METHODS = Object.freeze([
  { id: "getting-started", title: "Getting started: Job Search Harness step by step", description: "Plain-language first-use guide to setup, a private workspace, one manual search, resume review, and learning from outcomes.", path: "job-search-os/references/getting-started.md", terms: "first time beginner onboarding tutorial how to use start guide setup" },
  { id: "job-search", title: "Find and track jobs", description: "Set up the harness, verify live listings, score roles, track decisions, and learn from outcomes.", path: "job-search-os/SKILL.md", terms: "daily search listing verification tracker onboarding" },
  { id: "resume-tailoring", title: "Tailor a truthful resume", description: "Build role-specific resume drafts using verified candidate facts and prior approved examples.", path: "resume-tailor/SKILL.md", terms: "resume cv achievements keywords docx pdf" },
  { id: "harness-maintenance", title: "Maintain the harness", description: "Audit dependencies, archive old artifacts, and compact growing context without losing evidence.", path: "job-search-maintenance/SKILL.md", terms: "maintenance archive cleanup context" },
  { id: "workspace-files", title: "Workspace file guide", description: "Understand the purpose and structure of each private workspace file.", path: "job-search-os/references/file-templates.md", terms: "profile config runbook tracker templates setup" },
  { id: "learning-loop", title: "Learning loop", description: "Record outcomes, test hypotheses, and promote patterns only after repeated evidence.", path: "job-search-os/references/learning-loop.md", terms: "feedback outcomes callback rejection hypotheses" },
  { id: "resume-folder-map", title: "Resume folder map", description: "Locate resume sources, prior examples, and output files in the workspace.", path: "resume-tailor/references/folder-map.md", terms: "resume rag files folders source" },
  { id: "resume-setup", title: "Resume setup interview", description: "Collect verified background, constraints, proof, and writing preferences before tailoring.", path: "resume-tailor/references/setup-interview.md", terms: "onboarding questions background achievements" },
  { id: "artifact-lifecycle", title: "Artifact lifecycle", description: "Classify and archive obsolete scripts, packages, and generated artifacts safely.", path: "job-search-maintenance/references/artifact-lifecycle.md", terms: "cleanup archive dependencies" },
  { id: "context-compaction", title: "Context compaction", description: "Keep active instructions small while preserving an indexed evidence trail.", path: "job-search-maintenance/references/compaction-playbook.md", terms: "memory archive index context" }
]);

export function searchMethods(query) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return METHODS.map(({ id, title, description, path, terms }) => {
    const titleText = `${id} ${title}`.toLowerCase();
    const otherText = `${description} ${terms}`.toLowerCase();
    const score = words.reduce((total, word) => total + (titleText.includes(word) ? 3 : otherText.includes(word) ? 1 : 0), 0);
    return { id, title, description, source: `${REPOSITORY}/blob/main/${path}`, score, primary: path.endsWith("/SKILL.md") };
  }).filter((method) => words.length === 0 || method.score > 0)
    .sort((a, b) => b.score - a.score || Number(b.primary) - Number(a.primary) || a.title.localeCompare(b.title))
    .map(({ score, primary, ...method }) => method);
}

export async function getMethod(id, fetcher = fetch) {
  const method = METHODS.find((entry) => entry.id === id);
  if (!method) throw new Error("Unknown method ID. Use search_methods to find a valid ID.");

  const url = new URL(method.path, RAW_BASE);
  url.searchParams.set("read", String(Date.now()));
  const response = await fetcher(url.toString(), {
    cache: "no-store",
    signal: AbortSignal.timeout(8000)
  });
  if (!response.ok) throw new Error(`GitHub returned ${response.status} for this public method. Try again later.`);
  const length = Number(response.headers.get("content-length") ?? 0);
  if (length > 256_000) throw new Error("Method is larger than the allowed response size.");
  const body = await response.text();
  if (body.length > 256_000) throw new Error("Method is larger than the allowed response size.");
  return {
    id: method.id,
    title: method.title,
    source: `${REPOSITORY}/blob/main/${method.path}`,
    retrievedAt: new Date().toISOString(),
    content: body
  };
}

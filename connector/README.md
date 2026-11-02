# Job Search Harness MCP connector

This Cloudflare Worker serves the current **public** Job Search Harness methods to Claude through MCP. It exposes two read-only tools:

- `search_methods(query)` finds a method ID and source link.
- `get_method(id)` fetches that method's current text from the public GitHub `main` branch.

The server accepts only the IDs in `src/catalog.js`. It cannot read arbitrary GitHub paths, local files, candidate profiles, trackers, or resumes. Changes to an existing allowlisted method appear on its next retrieval request; adding a new method requires updating the catalog and redeploying the Worker. If GitHub is unavailable, retrieval fails instead of returning stale content.

## Build and deploy

From this directory:

```bash
npm ci
npm test
npx wrangler deploy --dry-run
npx wrangler login
npm run deploy
```

The deployment prints a URL such as `https://job-search-harness-mcp.<your-subdomain>.workers.dev`. Use that URL with `/mcp` appended. The Worker is public and has no sign-in because its methods are already public on GitHub.

In Claude, add a **custom connector** using the `/mcp` URL and choose **No sign in**. Enable it in a chat and ask: “Search the Job Search Harness methods for verifying a live role, then load the relevant method.” The connector is a method library; Claude still needs a file-capable client with access to your separate private workspace to run the full job search.

Do not add personal files, private tokens, or candidate-specific instructions to this connector or its allowlist.

# Job Search Harness MCP connector

This Cloudflare Worker serves the current **public** Job Search Harness methods to Claude and ChatGPT through MCP. It exposes two read-only tools:

- `search_methods(query)` finds a method ID and source link.
- `get_method(id)` fetches that method's current text from the public GitHub `main` branch.

The server accepts only the IDs in `src/catalog.js`. It cannot read arbitrary GitHub paths, local files, candidate profiles, trackers, or resumes. Changes to an existing allowlisted method appear on its next retrieval request; adding a new method requires updating the catalog and redeploying the Worker. If GitHub is unavailable, retrieval fails instead of returning stale content.

## Add the live connector to Claude

The public connector is running at:

```text
https://job-search-harness-mcp.job-search-harness-mcp.workers.dev/mcp
```

In Claude, open **Customize → Connectors → Add connector → Add custom connector**. Name it **Job Search Harness**, paste the URL above, and choose **No sign-in**. Connect it, then ask Claude:

> Use the Job Search Harness connector to search for the method on verifying live job listings. Load the most relevant method and summarize its checks.

Claude may ask you to approve each of its two read-only tools, **Search methods** and **Get method**. The connector is a method library; a normal Claude chat can read public methods, while running the full job search requires Claude Cowork, Claude Code, or another file-capable agent with access to your separate private workspace.

## Add the live connector to ChatGPT

Open [ChatGPT Plugins](https://chatgpt.com/plugins), choose **Add → Add custom MCP server**, name it **Job Search Harness**, and enter the same `/mcp` URL above. Choose **No authentication**, review the connection notice, create the plugin, and connect it. Start a new chat with **Try in chat** or select `@Job Search Harness`, then ask:

> Use the Job Search Harness plugin. Call `search_methods` for live-listing verification, then call `get_method` with the returned ID. Summarize the first two checks from the public method. Do not browse or use personal files.

ChatGPT may share relevant chat or memory context with a connected plugin. Keep private candidate details out of method queries. The connector can return public instructions; it cannot read your local workspace or run the full harness by itself.

## Run your own deployment

From this directory:

```bash
npm ci
npm test
npx wrangler deploy --dry-run
npx wrangler login
npm run deploy
```

The deployment prints a Worker URL. Append `/mcp` to that URL when adding your own custom connector. The Worker needs no sign-in because it serves only methods already public on GitHub.

Do not add personal files, private tokens, or candidate-specific instructions to this connector or its allowlist.

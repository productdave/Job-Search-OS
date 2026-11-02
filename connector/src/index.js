import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";
import { z } from "zod";
import { getMethod, searchMethods } from "./catalog.js";

function createServer() {
  const server = new McpServer({ name: "job-search-harness", version: "1.0.0" }, {
    instructions: "This server serves public Job Search Harness methods only. For first-time or how-to-use requests, load get_method with id 'getting-started' and teach its steps. For other requests, use search_methods then get_method. In a chat-only client, do not collect private candidate details or claim to run the harness; a file-capable agent with private-folder access is needed for setup and ongoing work."
  });

  server.registerTool("search_methods", {
    description: "Search public Job Search Harness methods and reference instructions. Returns IDs to use with get_method. Personal candidate files are not available here.",
    inputSchema: z.object({ query: z.string().max(200).describe("A method name or short search phrase") }),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true }
  }, async ({ query }) => ({
    content: [{ type: "text", text: JSON.stringify(searchMethods(query)) }]
  }));

  server.registerTool("get_method", {
    description: "Read one current public Job Search Harness method by an ID returned from search_methods. Never reads private workspaces or arbitrary paths.",
    inputSchema: z.object({ id: z.string().describe("A method ID returned by search_methods") }),
    outputSchema: z.object({
      ok: z.boolean(),
      id: z.string(),
      title: z.string().optional(),
      source: z.string().optional(),
      retrievedAt: z.string().optional(),
      content: z.string().optional(),
      error: z.string().optional()
    }),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true }
  }, async ({ id }) => {
    try {
      const method = await getMethod(id);
      return {
        content: [{ type: "text", text: `# ${method.title}\n\nSource: ${method.source}\nRetrieved: ${method.retrievedAt}\n\n${method.content}` }],
        structuredContent: { ok: true, ...method }
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to read method.";
      return {
        content: [{ type: "text", text: `Unable to read public method ${id}: ${message}` }],
        structuredContent: { ok: false, id, error: message }
      };
    }
  });

  return server;
}

const mcp = createMcpHandler(createServer, { responseMode: "json" });

export default {
  fetch(request, env, context) {
    const url = new URL(request.url);
    if (url.pathname === "/health" && request.method === "GET") {
      return Response.json({ status: "ok", service: "job-search-harness-mcp" });
    }
    return mcp(request, env, context);
  }
};

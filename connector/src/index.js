import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";
import { z } from "zod";
import { getMethod, searchMethods } from "./catalog.js";

function createServer() {
  const server = new McpServer({ name: "job-search-harness", version: "1.0.0" });

  server.registerTool("search_methods", {
    description: "Search public Job Search Harness methods and reference instructions. Returns IDs to use with get_method. Personal candidate files are not available here.",
    inputSchema: z.object({ query: z.string().max(200).describe("A method name or short search phrase") })
  }, async ({ query }) => ({
    content: [{ type: "text", text: JSON.stringify(searchMethods(query)) }]
  }));

  server.registerTool("get_method", {
    description: "Read one current public Job Search Harness method by an ID returned from search_methods. Never reads private workspaces or arbitrary paths.",
    inputSchema: z.object({ id: z.string().describe("A method ID returned by search_methods") })
  }, async ({ id }) => {
    try {
      const method = await getMethod(id);
      return { content: [{ type: "text", text: JSON.stringify(method) }] };
    } catch (error) {
      return { isError: true, content: [{ type: "text", text: error instanceof Error ? error.message : "Unable to read method." }] };
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

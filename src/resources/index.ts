import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerInfoResource } from "./info.js";

export function registerResources(server: McpServer) {
  registerInfoResource(server);
}

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerEchoTool } from "./echo.js";
import { registerCalculateTool } from "./calculate.js";

export function registerTools(server: McpServer) {
  registerEchoTool(server);
  registerCalculateTool(server);
}

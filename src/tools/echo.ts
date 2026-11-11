import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export const echoInputSchema = {
  message: z.string().describe("Message to echo back"),
};

export function echoHandler({ message }: { message: string }) {
  return {
    content: [{ type: "text" as const, text: message }],
  };
}

export function registerEchoTool(server: McpServer) {
  server.tool(
    "echo",
    "Return the input message unchanged",
    echoInputSchema,
    async ({ message }) => echoHandler({ message }),
  );
}

import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export const echoInputSchema = {
  message: z.string().describe("要回显的消息"),
};

export function echoHandler({ message }: { message: string }) {
  return {
    content: [{ type: "text" as const, text: message }],
  };
}

export function registerEchoTool(server: McpServer) {
  server.tool(
    "echo",
    "将输入消息原样返回",
    echoInputSchema,
    async ({ message }) => echoHandler({ message }),
  );
}

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerInfoResource(server: McpServer) {
  server.registerResource(
    "server-info",
    "server://info",
    {
      title: "服务器信息",
      description: "返回该 MCP 服务器的基本信息（名称与版本）",
      mimeType: "application/json",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(
            {
              name: "<%= serverName %>",
              version: "<%= version %>",
            },
            null,
            2,
          ),
        },
      ],
    }),
  );
}

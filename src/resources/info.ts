import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerInfoResource(server: McpServer) {
  server.registerResource(
    "server-info",
    "server://info",
    {
      title: "Server Info",
      description: "Returns basic information about this MCP server (name and version)",
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

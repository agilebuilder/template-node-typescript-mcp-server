# <%= serverName %>

<%= description %><% if (author) { %>

Author: <%= author %><% } %>

A TypeScript MCP (Model Context Protocol) server built on [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk) (^1.x) with stdio transport.

## Tech Stack

- TypeScript + Node.js (>= 18, ESM)
- `@modelcontextprotocol/sdk`: official MCP TypeScript SDK
- `zod`: tool input schema definition and validation
- `tsup`: build (outputs ESM + type declarations)
- `Vitest`: unit testing
- ESLint + Prettier: code style

## Project Structure

```
├── src/
│   ├── index.ts            # Entry: McpServer init + StdioServerTransport connection
│   ├── tools/              # Tool definitions (echo, calculate examples)
│   │   ├── index.ts        # Unified registration entry
│   │   ├── echo.ts         # Echo tool example
│   │   └── calculate.ts    # Arithmetic tool example (zod input schema)
│   └── resources/          # Resource definitions
│       ├── index.ts        # Unified registration entry
│       └── info.ts         # server-info example resource
├── tests/                  # Vitest unit tests
├── tsup.config.ts          # Build config
├── vitest.config.ts        # Test config
└── package.json            # bin points to dist/index.js; installable as a CLI
```

## Quick Start

Create a project from this template with AgileBuilder:

```bash
ag create --git-url <template-repo-url> --target <directory>
```

Then:

```bash
cd <directory>
npm install
npm run build
npm test
```

## Template Variables

| Variable | Description | Default |
| --- | --- | --- |
| `serverName` | MCP server name (used for the `McpServer` name and `package.json` `name`/`bin`) | `demo-mcp-server` |
| `description` | Project description | `An MCP server` |
| `author` | Author | empty |
| `version` | Initial version | `0.1.0` |

## Common Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Run source with tsx watch mode (development) |
| `npm run build` | Build to `dist/` with tsup |
| `npm start` | Run the build output `dist/index.js` |
| `npm test` | Run all tests with Vitest |
| `npm run lint` | ESLint check |
| `npm run format` | Prettier formatting |
| `npm run typecheck` | tsc type check |

## Configuring in MCP Clients

Run `npm run build` first to generate `dist/index.js`, then register it in your client config.

### Claude Desktop

Edit the config file (Windows: `%APPDATA%\Claude\claude_desktop_config.json`; macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "<%= serverName %>": {
      "command": "node",
      "args": ["D:/path/to/<%= serverName %>/dist/index.js"]
    }
  }
}
```

Replace the path in `args` with the absolute path to this project, save, and restart Claude Desktop.

If you registered the `bin` command via `npm link` or a global install, you can also write:

```json
{
  "mcpServers": {
    "<%= serverName %>": {
      "command": "<%= serverName %>"
    }
  }
}
```

Other MCP-compatible clients (Cursor, Cline, etc.) work the same way: specify `command` + `args` to launch the stdio server.

## Building Your Own Tools and Resources

- New tool: create a file under `src/tools/`, define the input schema with `zod`, register via `server.tool(name, description, schema, handler)`, and mount it in `src/tools/index.ts`.
- New resource: create a file under `src/resources/`, register via `server.registerResource(...)`, and mount it in `src/resources/index.ts`.
- Keep handlers as pure logic (like `echoHandler`, `calculate`) so they can be unit-tested directly with Vitest.

## License

MIT

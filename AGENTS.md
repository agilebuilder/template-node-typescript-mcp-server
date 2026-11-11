# AGENTS.md

Navigation guide for AI coding agents.

## Project Overview

`<%= serverName %>`: <%= description %>. An MCP server built on `@modelcontextprotocol/sdk` (^1.x) with stdio transport, Node.js >= 18, ESM (`"type": "module"`).

## Project Structure

- `src/index.ts`: entry point. Creates the `McpServer`, calls `registerTools` / `registerResources`, and connects via `StdioServerTransport`.
- `src/tools/`: tool implementations. One file per tool, exporting the input schema, a pure handler function, and a `registerXxxTool(server)` function; `index.ts` mounts them all.
- `src/resources/`: resource implementations. Same convention as tools; `index.ts` mounts them all.
- `tests/`: Vitest tests covering pure handler functions only; no real server is started.

## Conventions

- All module imports must use the `.js` extension (required by NodeNext resolution); import from `./foo.js` even when the source file is `./foo.ts`.
- Extract testable logic from tool/resource handlers into standalone exported functions (see `echoHandler` in `src/tools/echo.ts`); keep the registration layer thin.
- Validate all inputs with zod schemas; do not hand-write type assertions in handlers.
- After adding a tool or resource, register it in the `index.ts` of the corresponding directory, or it will not be exposed to clients.
- Logs go to `console.error` (stderr) only — **never** write to stdout, which the stdio transport reserves for protocol messages.

## Common Commands

- Dev: `npm run dev` (tsx watch)
- Build: `npm run build` (tsup; output in `dist/`, `bin` points to `dist/index.js`)
- Test: `npm test`
- Type check: `npm run typecheck`
- Lint / format: `npm run lint` / `npm run format`

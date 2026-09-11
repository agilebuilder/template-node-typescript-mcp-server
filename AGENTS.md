# AGENTS.md

给 AI 编码代理的项目导航指南。

## 项目概览

`<%= serverName %>`：<%= description %>。基于 `@modelcontextprotocol/sdk`（^1.x）的 MCP 服务器，stdio 传输，Node.js >= 18，ESM（`"type": "module"`）。

## 目录结构

- `src/index.ts`：入口。创建 `McpServer`，调用 `registerTools` / `registerResources`，通过 `StdioServerTransport` 连接。
- `src/tools/`：工具实现。每个工具一个文件，导出输入 schema、纯逻辑处理函数和 `registerXxxTool(server)` 注册函数；`index.ts` 统一挂载。
- `src/resources/`：资源实现。约定同 tools，`index.ts` 统一挂载。
- `tests/`：Vitest 测试，只测纯逻辑函数，不启动真实 server。

## 约定

- 模块导入一律带 `.js` 扩展名（NodeNext 解析要求），包括从 `./foo.ts` 导入也写 `./foo.js`。
- 工具/资源的 handler 把可测逻辑抽成独立导出函数（参考 `src/tools/echo.ts` 的 `echoHandler`），注册层尽量薄。
- 输入校验全部用 zod schema，不要在 handler 里手写类型断言。
- 新增工具/资源后，必须在对应目录的 `index.ts` 中注册，否则不会暴露给客户端。
- 日志只写 `console.error`（stderr），**不要**写 stdout——stdio 传输占用 stdout 做协议通信。

## 常用命令

- 开发：`npm run dev`（tsx watch）
- 构建：`npm run build`（tsup，产物在 `dist/`，`bin` 指向 `dist/index.js`）
- 测试：`npm test`
- 类型检查：`npm run typecheck`
- Lint / 格式化：`npm run lint` / `npm run format`

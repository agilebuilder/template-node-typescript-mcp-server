# <%= serverName %>

<%= description %><% if (author) { %>

作者：<%= author %><% } %>

这是一个基于 [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk)（^1.x）的 TypeScript MCP（Model Context Protocol）服务器，使用 stdio 传输。

## 技术栈

- TypeScript + Node.js（>= 18，ESM）
- `@modelcontextprotocol/sdk`：MCP 官方 TypeScript SDK
- `zod`：工具输入 schema 定义与校验
- `tsup`：构建（输出 ESM + 类型声明）
- `Vitest`：单元测试
- ESLint + Prettier：代码规范

## 目录结构

```
├── src/
│   ├── index.ts            # 入口：McpServer 初始化 + StdioServerTransport 连接
│   ├── tools/              # 工具定义（echo、calculate 示例）
│   │   ├── index.ts        # 统一注册入口
│   │   ├── echo.ts         # 回显工具示例
│   │   └── calculate.ts    # 四则运算工具示例（zod 输入 schema）
│   └── resources/          # 资源定义
│       ├── index.ts        # 统一注册入口
│       └── info.ts         # server-info 示例资源
├── tests/                  # Vitest 单元测试
├── tsup.config.ts          # 构建配置
├── vitest.config.ts        # 测试配置
└── package.json            # bin 字段指向 dist/index.js，可作为 CLI 安装
```

## 快速开始

使用 AgileBuilder 从模板创建项目：

```bash
ag create --git-url <模板仓库地址> --target <目录>
```

然后：

```bash
cd <目录>
npm install
npm run build
npm test
```

## 模板变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `serverName` | MCP 服务器名称（用于 `McpServer` 名称与 `package.json` 的 `name`/`bin`） | `demo-mcp-server` |
| `description` | 项目描述 | `一个 MCP 服务器` |
| `author` | 作者 | 空 |
| `version` | 初始版本号 | `0.1.0` |

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 用 tsx watch 模式运行源码（开发调试） |
| `npm run build` | tsup 构建到 `dist/` |
| `npm start` | 运行构建产物 `dist/index.js` |
| `npm test` | Vitest 运行全部测试 |
| `npm run lint` | ESLint 检查 |
| `npm run format` | Prettier 格式化 |
| `npm run typecheck` | tsc 类型检查 |

## 在 MCP 客户端中配置

先执行 `npm run build` 生成 `dist/index.js`，然后在客户端配置中注册。

### Claude Desktop

编辑配置文件（Windows：`%APPDATA%\Claude\claude_desktop_config.json`；macOS：`~/Library/Application Support/Claude/claude_desktop_config.json`）：

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

把 `args` 中的路径改成本项目的绝对路径，保存后重启 Claude Desktop 即可。

如果已通过 `npm link` 或全局安装注册了 `bin` 命令，也可以直接写：

```json
{
  "mcpServers": {
    "<%= serverName %>": {
      "command": "<%= serverName %>"
    }
  }
}
```

其他兼容 MCP 的客户端（如 Cursor、Cline 等）配置方式相同，都是指定 `command` + `args` 启动 stdio 服务器。

## 开发自己的工具与资源

- 新增工具：在 `src/tools/` 下新建文件，用 `zod` 定义输入 schema，调用 `server.tool(name, description, schema, handler)` 注册，并在 `src/tools/index.ts` 中挂载。
- 新增资源：在 `src/resources/` 下新建文件，用 `server.registerResource(...)` 注册，并在 `src/resources/index.ts` 中挂载。
- 为处理函数编写纯逻辑（如 `echoHandler`、`calculate`），便于用 Vitest 直接单测。

## License

MIT

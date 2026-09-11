import { describe, expect, it } from "vitest";
import { echoHandler } from "../src/tools/echo.js";

describe("echo 工具", () => {
  it("原样返回输入消息", () => {
    const result = echoHandler({ message: "hello mcp" });
    expect(result.content).toEqual([{ type: "text", text: "hello mcp" }]);
  });

  it("支持空字符串", () => {
    const result = echoHandler({ message: "" });
    expect(result.content[0].text).toBe("");
  });
});

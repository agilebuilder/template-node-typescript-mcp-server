import { describe, expect, it } from "vitest";
import { echoHandler } from "../src/tools/echo.js";

describe("echo tool", () => {
  it("returns the input message unchanged", () => {
    const result = echoHandler({ message: "hello mcp" });
    expect(result.content).toEqual([{ type: "text", text: "hello mcp" }]);
  });

  it("supports empty strings", () => {
    const result = echoHandler({ message: "" });
    expect(result.content[0].text).toBe("");
  });
});

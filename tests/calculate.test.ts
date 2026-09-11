import { describe, expect, it } from "vitest";
import { calculate } from "../src/tools/calculate.js";

describe("calculate 工具", () => {
  it("加法", () => {
    const result = calculate({ operation: "add", a: 2, b: 3 });
    expect(result.content[0].text).toContain("5");
  });

  it("除法", () => {
    const result = calculate({ operation: "divide", a: 10, b: 4 });
    expect(result.content[0].text).toContain("2.5");
  });

  it("除以 0 返回错误", () => {
    const result = calculate({ operation: "divide", a: 1, b: 0 });
    expect(result.isError).toBe(true);
  });
});

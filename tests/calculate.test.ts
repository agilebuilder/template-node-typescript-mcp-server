import { describe, expect, it } from "vitest";
import { calculate } from "../src/tools/calculate.js";

describe("calculate tool", () => {
  it("adds two numbers", () => {
    const result = calculate({ operation: "add", a: 2, b: 3 });
    expect(result.content[0].text).toContain("5");
  });

  it("divides two numbers", () => {
    const result = calculate({ operation: "divide", a: 10, b: 4 });
    expect(result.content[0].text).toContain("2.5");
  });

  it("returns an error when dividing by zero", () => {
    const result = calculate({ operation: "divide", a: 1, b: 0 });
    expect(result.isError).toBe(true);
  });
});

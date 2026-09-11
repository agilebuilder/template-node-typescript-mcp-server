import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export const calculateInputSchema = {
  operation: z
    .enum(["add", "subtract", "multiply", "divide"])
    .describe("运算类型"),
  a: z.number().describe("第一个操作数"),
  b: z.number().describe("第二个操作数"),
};

export type CalculateInput = {
  operation: "add" | "subtract" | "multiply" | "divide";
  a: number;
  b: number;
};

export function calculate({ operation, a, b }: CalculateInput) {
  if (operation === "divide" && b === 0) {
    return {
      isError: true as const,
      content: [{ type: "text" as const, text: "除数不能为 0" }],
    };
  }

  const result =
    operation === "add"
      ? a + b
      : operation === "subtract"
        ? a - b
        : operation === "multiply"
          ? a * b
          : a / b;

  return {
    content: [{ type: "text" as const, text: `${a} ${operation} ${b} = ${result}` }],
  };
}

export function registerCalculateTool(server: McpServer) {
  server.tool(
    "calculate",
    "对两个数字执行加减乘除运算",
    calculateInputSchema,
    async (input) => calculate(input as CalculateInput),
  );
}

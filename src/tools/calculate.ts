import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export const calculateInputSchema = {
  operation: z
    .enum(["add", "subtract", "multiply", "divide"])
    .describe("Arithmetic operation"),
  a: z.number().describe("First operand"),
  b: z.number().describe("Second operand"),
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
      content: [{ type: "text" as const, text: "Division by zero is not allowed" }],
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
    "Perform addition, subtraction, multiplication, or division on two numbers",
    calculateInputSchema,
    async (input) => calculate(input as CalculateInput),
  );
}

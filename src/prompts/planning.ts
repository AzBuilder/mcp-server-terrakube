import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

/**
 * Register planning prompts to an MCP server
 * @param server The MCP server instance
 */
export function registerPlanningPrompts(server: McpServer): void {
  // Create infrastructure plan
  server.prompt(
    "plan-organization",
    "Plan a new Terrakube organization with specified environments",
    {
      organizationName: z.string(),
      description: z.string(),
      environmentCount: z.string()
    },
    (args) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Plan an organization with name "${args.organizationName}", description "${args.description}", and ${args.environmentCount} environments.`
          }
        }
      ]
    })
  );
}

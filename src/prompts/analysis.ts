import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

/**
 * Register analysis prompts to an MCP server
 * @param server The MCP server instance
 */
export function registerAnalysisPrompts(server: McpServer): void {
  // Analyze organization structure
  server.prompt(
    "analyze-organization",
    {
      organizationId: z.string().describe("Organization ID to analyze")
    },
    ({ organizationId }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `Please analyze the structure of the Terrakube organization with ID '${organizationId}'. 
          
Include the following in your analysis:
1. List all workspaces and their purpose
2. Identify all modules being used
3. Summarize the variables and their usage patterns
4. Suggest any potential improvements to the organization structure

Use the terrakube resource URIs to fetch the necessary information.`
        }
      }]
    })
  );
}

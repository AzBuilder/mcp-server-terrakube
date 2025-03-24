import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { validateConfig } from "./config.js";

// Import resource registrations
import { registerOrganizationResources } from "./resources/organizations.js";
import { registerWorkspaceResources } from "./resources/workspaces.js";
import { registerModuleResources } from "./resources/modules.js";

// Import tool registrations
import { registerOrganizationTools } from "./tools/organizations.js";
import { registerWorkspaceTools } from "./tools/workspaces.js";
import { registerModuleTools } from "./tools/modules.js";
import { registerVariableTools } from "./tools/variables.js";

// Import prompt registrations
import { registerAnalysisPrompts } from "./prompts/analysis.js";
import { registerPlanningPrompts } from "./prompts/planning.js";

/**
 * Initialize and start the Terrakube MCP server
 */
export async function startServer(): Promise<void> {
  // Validate configuration
  if (!validateConfig()) {
    process.exit(1);
  }

  // Initialize the MCP server
  const server = new McpServer({
    name: "terrakube-server",
    version: "1.0.0",
  });

  // Register resources
  registerOrganizationResources(server);
  registerWorkspaceResources(server);
  registerModuleResources(server);
  
  // Register tools
  registerOrganizationTools(server);
  registerWorkspaceTools(server);
  registerModuleTools(server);
  registerVariableTools(server);
  
  // Register prompts
  registerAnalysisPrompts(server);
  registerPlanningPrompts(server);

  // Start the server
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Terrakube MCP Server running...");
}

#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerOrganizationTools } from "./tools/organizations.js";
import { registerWorkspaceTools } from "./tools/workspaces.js";
import { registerModuleTools } from "./tools/modules.js";
import { registerVariableTools } from "./tools/variables.js";

async function runServer() {
  console.error("Starting Terrakube MCP Server...");
  
  const server = new McpServer({
    name: "Terrakube MCP",
    version: "1.0.0"
  });
  console.error("Created MCP Server instance");
  
  const transport = new StdioServerTransport();
  console.error("Created StdioServerTransport");

  // Register core tools
  registerOrganizationTools(server);
  registerWorkspaceTools(server);
  registerModuleTools(server);
  registerVariableTools(server);
  console.error("Registered all tools");

  console.error("Connecting to transport...");
  await server.connect(transport);
  console.error("Connected to transport");
  
  // Set up cleanup for graceful shutdown
  const cleanup = async () => {
    console.error("Shutting down server...");
    try {
      await transport.close();
      console.error("Server shut down successfully");
    } catch (error) {
      console.error("Error during shutdown:", error);
    }
    process.exit(0);
  };

  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);
}

// Export for programmatic usage
export async function startServer() {
  return runServer();
}

// Run directly when executed as a script
runServer().catch(error => {
  console.error("Fatal error in runServer():", error);
  process.exit(1);
});
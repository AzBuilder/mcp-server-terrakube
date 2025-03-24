#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerOrganizationTools } from "./tools/organizations.js";
import { registerWorkspaceTools } from "./tools/workspaces.js";
import { registerModuleTools } from "./tools/modules.js";
import { registerVariableTools } from "./tools/variables.js";

async function startServer() {
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
}

// Start the server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.error("Starting server from command line");
  startServer().catch(err => {
    console.error("Error starting server:", err);
    process.exit(1);
  });
}

export { startServer };

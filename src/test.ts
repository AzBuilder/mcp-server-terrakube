import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerOrganizationTools } from "./tools/organizations.js";
import { registerWorkspaceTools } from "./tools/workspaces.js";
import { registerModuleTools } from "./tools/modules.js";
import { registerVariableTools } from "./tools/variables.js";
import dotenv from 'dotenv';

dotenv.config();

async function testMCP() {
  console.error('Starting MCP server test...');
  
  try {
    // Create and start the MCP server
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

    // Keep the process running and handle cleanup
    const cleanup = async () => {
      console.error('Cleaning up...');
      try {
        await transport.close();
        console.error('Transport closed successfully');
      } catch (error) {
        console.error('Error closing transport:', error);
      }
      process.exit(0);
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    process.on('uncaughtException', (error) => {
      console.error('Uncaught exception:', error);
      cleanup();
    });
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled rejection at:', promise, 'reason:', reason);
      cleanup();
    });

    // Keep the process alive
    setInterval(() => {
      console.error('Server heartbeat...');
    }, 30000);

  } catch (error) {
    console.error('Error starting MCP server:', error);
    process.exit(1);
  }
}

// Start the server
testMCP().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
}); 
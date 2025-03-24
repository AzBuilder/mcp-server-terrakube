import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CONFIG } from "../config.js";

/**
 * Register workspace resources to an MCP server
 * @param server The MCP server instance
 */
export function registerWorkspaceResources(server: McpServer): void {
  // List workspaces in an organization
  server.resource(
    "workspace",
    new ResourceTemplate("terrakube://organizations/{organizationId}/workspaces", { list: undefined }),
    async (uri, { organizationId }) => {
      const response = await fetch(`${CONFIG.apiUrl}/organizations/${organizationId}/workspaces`, {
        headers: {
          Authorization: `Bearer ${CONFIG.patToken}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to list workspaces: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(data, null, 2),
          mimeType: "application/json"
        }]
      };
    }
  );

  // Get a specific workspace
  server.resource(
    "workspace",
    new ResourceTemplate("terrakube://organizations/{organizationId}/workspaces/{workspaceId}", { list: undefined }),
    async (uri, { organizationId, workspaceId }) => {
      const response = await fetch(`${CONFIG.apiUrl}/organizations/${organizationId}/workspaces/${workspaceId}`, {
        headers: {
          Authorization: `Bearer ${CONFIG.patToken}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get workspace: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(data, null, 2),
          mimeType: "application/json"
        }]
      };
    }
  );
}

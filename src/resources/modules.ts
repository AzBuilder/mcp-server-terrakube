import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CONFIG } from "../config.js";

/**
 * Register module resources to an MCP server
 * @param server The MCP server instance
 */
export function registerModuleResources(server: McpServer) {
  server.resource(
    "module",
    new ResourceTemplate("terrakube://organizations/{organizationId}/modules", { list: undefined }),
    async (uri, { organizationId }) => {
      const response = await fetch(`${CONFIG.apiUrl}/organizations/${organizationId}/modules`, {
        headers: {
          Authorization: `Bearer ${CONFIG.patToken}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to list modules: ${response.statusText}`);
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

  server.resource(
    "module",
    new ResourceTemplate("terrakube://organizations/{organizationId}/modules/{moduleId}", { list: undefined }),
    async (uri, { organizationId, moduleId }) => {
      const response = await fetch(`${CONFIG.apiUrl}/organizations/${organizationId}/modules/${moduleId}`, {
        headers: {
          Authorization: `Bearer ${CONFIG.patToken}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get module: ${response.statusText}`);
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

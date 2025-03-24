import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { apiClient, handleApiError } from "../api/client.js";

/**
 * Register organization resources to an MCP server
 * @param server The MCP server instance
 */
export function registerOrganizationResources(server: McpServer): void {
  // Organizations resource - list all organizations
  server.resource(
    "organizations",
    "terrakube://organizations",
    async (uri) => {
      try {
        const response = await apiClient.get('/organizations');
        return {
          contents: [{
            uri: uri.href,
            text: JSON.stringify(response.data, null, 2),
            mimeType: "application/json"
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: handleApiError(error),
            mimeType: "text/plain"
          }]
        };
      }
    }
  );

  // Single organization resource - get organization by ID
  server.resource(
    "organization",
    new ResourceTemplate("terrakube://organizations/{id}", { list: undefined }),
    async (uri, { id }) => {
      try {
        const response = await apiClient.get(`/organizations/${id}`);
        return {
          contents: [{
            uri: uri.href,
            text: JSON.stringify(response.data, null, 2),
            mimeType: "application/json"
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: handleApiError(error),
            mimeType: "text/plain"
          }]
        };
      }
    }
  );
}

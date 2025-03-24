import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { CONFIG } from "../config.js";

/**
 * Register organization tools to an MCP server
 * @param server The MCP server instance
 */
export function registerOrganizationTools(server: McpServer) {
  server.tool(
    "list-organizations",
    "Lists all organizations accessible to the current user",
    {},
    async () => {
      const response = await fetch(`${CONFIG.apiUrl}/organization`, {
        headers: {
          Authorization: `Bearer ${CONFIG.patToken}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to list organizations: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        content: [{
          type: "text",
          text: JSON.stringify(data, null, 2)
        }]
      };
    }
  );

  server.tool(
    "get-organization",
    "Retrieves detailed information about a specific organization by its ID",
    {
      id: z.string().describe("Organization ID")
    },
    async ({ id }) => {
      const response = await fetch(`${CONFIG.apiUrl}/organization/${id}`, {
        headers: {
          Authorization: `Bearer ${CONFIG.patToken}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get organization: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        content: [{
          type: "text",
          text: JSON.stringify(data, null, 2)
        }]
      };
    }
  );

  server.tool(
    "create-organization",
    "Creates a new organization with the specified name and optional description",
    {
      name: z.string().describe("Organization name"),
      description: z.string().optional().describe("Organization description")
    },
    async ({ name, description = "" }) => {
      const response = await fetch(`${CONFIG.apiUrl}/organization`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CONFIG.patToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          description
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create organization: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        content: [{
          type: "text",
          text: JSON.stringify(data, null, 2)
        }]
      };
    }
  );

  server.tool(
    "edit-organization",
    "Updates an existing organization's details",
    {
      id: z.string().describe("Organization ID"),
      name: z.string().optional().describe("New organization name"),
      description: z.string().optional().describe("New organization description")
    },
    async ({ id, name, description }) => {
      const response = await fetch(`${CONFIG.apiUrl}/organization/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${CONFIG.patToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          description
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to update organization: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        content: [{
          type: "text",
          text: JSON.stringify(data, null, 2)
        }]
      };
    }
  );
}

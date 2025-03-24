import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { CONFIG } from "../config.js";

/**
 * Register variable management tools to an MCP server
 * @param server The MCP server instance
 */
export function registerVariableTools(server: McpServer): void {
  server.tool(
    "list-variables",
    "Lists all variables in the specified workspace",
    {
      organizationId: z.string().describe("Organization ID"),
      workspaceId: z.string().describe("Workspace ID")
    },
    async ({ organizationId, workspaceId }) => {
      const response = await fetch(`${CONFIG.apiUrl}/organization/${organizationId}/workspace/${workspaceId}/variable`, {
        headers: {
          Authorization: `Bearer ${CONFIG.patToken}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to list variables: ${response.statusText}`);
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
    "get-variable",
    "Retrieves detailed information about a specific variable",
    {
      organizationId: z.string().describe("Organization ID"),
      workspaceId: z.string().describe("Workspace ID"),
      variableId: z.string().describe("Variable ID")
    },
    async ({ organizationId, workspaceId, variableId }) => {
      const response = await fetch(`${CONFIG.apiUrl}/organization/${organizationId}/workspace/${workspaceId}/variable/${variableId}`, {
        headers: {
          Authorization: `Bearer ${CONFIG.patToken}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get variable: ${response.statusText}`);
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
    "create-variable",
    "Creates a new variable in the specified workspace",
    {
      organizationId: z.string().describe("Organization ID"),
      workspaceId: z.string().describe("Workspace ID"),
      key: z.string().describe("Variable key"),
      value: z.string().describe("Variable value"),
      description: z.string().optional().describe("Variable description"),
      category: z.string().optional().describe("Variable category (e.g., terraform, environment)"),
      sensitive: z.boolean().optional().describe("Whether the variable is sensitive")
    },
    async ({ organizationId, workspaceId, key, value, description, category, sensitive }) => {
      const response = await fetch(`${CONFIG.apiUrl}/organization/${organizationId}/workspace/${workspaceId}/variable`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CONFIG.patToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          key,
          value,
          description,
          category,
          sensitive
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create variable: ${response.statusText}`);
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
    "edit-variable",
    "Updates an existing variable's details",
    {
      organizationId: z.string().describe("Organization ID"),
      workspaceId: z.string().describe("Workspace ID"),
      variableId: z.string().describe("Variable ID"),
      key: z.string().optional().describe("New variable key"),
      value: z.string().optional().describe("New variable value"),
      description: z.string().optional().describe("New variable description"),
      category: z.string().optional().describe("New variable category"),
      sensitive: z.boolean().optional().describe("New sensitive flag")
    },
    async ({ organizationId, workspaceId, variableId, key, value, description, category, sensitive }) => {
      const response = await fetch(`${CONFIG.apiUrl}/organization/${organizationId}/workspace/${workspaceId}/variable/${variableId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${CONFIG.patToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          key,
          value,
          description,
          category,
          sensitive
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to update variable: ${response.statusText}`);
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

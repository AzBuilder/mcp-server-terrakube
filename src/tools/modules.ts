import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { CONFIG } from "../config.js";

/**
 * Register module tools to an MCP server
 * @param server The MCP server instance
 */
export function registerModuleTools(server: McpServer) {
  server.tool(
    "list-modules",
    "Lists all modules in the specified organization",
    {
      organizationId: z.string().describe("Organization ID")
    },
    async ({ organizationId }) => {
      const response = await fetch(`${CONFIG.apiUrl}/organization/${organizationId}/module`, {
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
        content: [{
          type: "text",
          text: JSON.stringify(data, null, 2)
        }]
      };
    }
  );

  server.tool(
    "get-module",
    "Retrieves detailed information about a specific module",
    {
      organizationId: z.string().describe("Organization ID"),
      moduleId: z.string().describe("Module ID")
    },
    async ({ organizationId, moduleId }) => {
      const response = await fetch(`${CONFIG.apiUrl}/organization/${organizationId}/module/${moduleId}`, {
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
        content: [{
          type: "text",
          text: JSON.stringify(data, null, 2)
        }]
      };
    }
  );

  server.tool(
    "create-module",
    "Creates a new module in the specified organization",
    {
      organizationId: z.string().describe("Organization ID"),
      name: z.string().describe("Module name"),
      description: z.string().optional().describe("Module description"),
      registry: z.string().describe("Registry URL"),
      provider: z.string().describe("Provider name")
    },
    async ({ organizationId, name, description, registry, provider }) => {
      const response = await fetch(`${CONFIG.apiUrl}/organization/${organizationId}/module`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CONFIG.patToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          description,
          registry,
          provider
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create module: ${response.statusText}`);
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
    "edit-module",
    "Updates an existing module's details",
    {
      organizationId: z.string().describe("Organization ID"),
      moduleId: z.string().describe("Module ID"),
      name: z.string().optional().describe("New module name"),
      description: z.string().optional().describe("New module description"),
      registry: z.string().optional().describe("New registry URL"),
      provider: z.string().optional().describe("New provider name")
    },
    async ({ organizationId, moduleId, name, description, registry, provider }) => {
      const response = await fetch(`${CONFIG.apiUrl}/organization/${organizationId}/module/${moduleId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${CONFIG.patToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          description,
          registry,
          provider
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to update module: ${response.statusText}`);
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
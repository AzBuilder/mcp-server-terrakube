import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { CONFIG } from "../config.js";

export function registerWorkspaceTools(server: McpServer) {
  server.tool(
    "list-workspaces",
    "Lists all workspaces in the specified organization",
    {
      organizationId: z.string().describe("Organization ID")
    },
    async ({ organizationId }) => {
      const response = await fetch(`${CONFIG.apiUrl}/organization/${organizationId}/workspace`, {
        headers: {
          Authorization: `Bearer ${CONFIG.patToken}`,
          "Content-Type": "application/vnd.api+json"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to list workspaces: ${response.statusText}`);
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
    "get-workspace",
    "Retrieves detailed information about a specific workspace",
    {
      organizationId: z.string().describe("Organization ID"),
      workspaceId: z.string().describe("Workspace ID")
    },
    async ({ organizationId, workspaceId }) => {
      const response = await fetch(`${CONFIG.apiUrl}/organization/${organizationId}/workspace/${workspaceId}`, {
        headers: {
          Authorization: `Bearer ${CONFIG.patToken}`,
          "Content-Type": "application/vnd.api+json"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get workspace: ${response.statusText}`);
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
    "create-workspace",
    "Creates a new workspace in the specified organization",
    {
      organizationId: z.string().describe("Organization ID"),
      name: z.string().describe("Workspace name"),
      description: z.string().optional().describe("Workspace description"),
      terraformVersion: z.string().describe("Terraform version"),
      vcsProvider: z.string().optional().describe("VCS provider (e.g., github, gitlab)"),
      vcsRepo: z.string().optional().describe("VCS repository URL")
    },
    async ({ organizationId, name, description, terraformVersion, vcsProvider, vcsRepo }) => {
      const response = await fetch(`${CONFIG.apiUrl}/organization/${organizationId}/workspace`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CONFIG.patToken}`,
          "Content-Type": "application/vnd.api+json"
        },
        body: JSON.stringify({
          data: {
            type: "workspace",
            attributes: {
              name,
              description,
              terraformVersion,
              vcsProvider,
              vcsRepo
            }
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create workspace: ${response.statusText}`);
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
    "edit-workspace",
    "Updates an existing workspace's details",
    {
      organizationId: z.string().describe("Organization ID"),
      workspaceId: z.string().describe("Workspace ID"),
      name: z.string().optional().describe("New workspace name"),
      description: z.string().optional().describe("New workspace description"),
      terraformVersion: z.string().optional().describe("New Terraform version"),
      vcsProvider: z.string().optional().describe("New VCS provider"),
      vcsRepo: z.string().optional().describe("New VCS repository URL")
    },
    async ({ organizationId, workspaceId, name, description, terraformVersion, vcsProvider, vcsRepo }) => {
      const response = await fetch(`${CONFIG.apiUrl}/organization/${organizationId}/workspace/${workspaceId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${CONFIG.patToken}`,
          "Content-Type": "application/vnd.api+json"
        },
        body: JSON.stringify({
          data: {
            type: "workspace",
            id: workspaceId,
            attributes: {
              name,
              description,
              terraformVersion,
              vcsProvider,
              vcsRepo
            }
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to update workspace: ${response.statusText}`);
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

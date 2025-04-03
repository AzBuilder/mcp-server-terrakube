# Terrakube MCP Server

[![smithery badge](https://smithery.ai/badge/@AzBuilder/mcp-server-terrakube)](https://smithery.ai/server/@AzBuilder/mcp-server-terrakube)
A Model Context Protocol (MCP) server for Terrakube operations, enabling workspace management, variable handling, module operations, and organization management.

<a href="https://glama.ai/mcp/servers/@AzBuilder/mcp-server-terrakube">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@AzBuilder/mcp-server-terrakube/badge" alt="Terrakube Server MCP server" />
</a>

## Features

- **Comprehensive API Integration**: Full integration with Terrakube's API for seamless operations
- **Type Safety**: Built with TypeScript for enhanced type safety and developer experience
- **Error Handling**: Robust error handling with clear error messages
- **Environment Configuration**: Flexible configuration through environment variables
- **Modular Design**: Organized code structure for easy maintenance and extension

## Tools

### Workspaces

#### `createWorkspace`
Create a new workspace in Terrakube.
- **Inputs**:
  - `name` (string): Name of the workspace
  - `organization` (string): Organization name
  - `description` (optional string): Workspace description
  - `vcsProviderId` (optional string): VCS provider ID
  - `vcsRepository` (optional string): VCS repository name
  - `vcsBranch` (optional string): VCS branch name
- **Returns**: Created workspace details

#### `updateWorkspace`
Update an existing workspace.
- **Inputs**:
  - `name` (string): Name of the workspace
  - `organization` (string): Organization name
  - `description` (optional string): New workspace description
  - `vcsProviderId` (optional string): New VCS provider ID
  - `vcsRepository` (optional string): New VCS repository name
  - `vcsBranch` (optional string): New VCS branch name
- **Returns**: Updated workspace details

#### `deleteWorkspace`
Delete a workspace.
- **Inputs**:
  - `name` (string): Name of the workspace
  - `organization` (string): Organization name
- **Returns**: Success status

#### `getWorkspace`
Get details of a specific workspace.
- **Inputs**:
  - `name` (string): Name of the workspace
  - `organization` (string): Organization name
- **Returns**: Workspace details

#### `listWorkspaces`
List all workspaces in an organization.
- **Inputs**:
  - `organization` (string): Organization name
- **Returns**: Array of workspace details

### Variables

#### `createVariable`
Create a new variable in a workspace.
- **Inputs**:
  - `name` (string): Name of the variable
  - `organization` (string): Organization name
  - `workspace` (string): Workspace name
  - `value` (string): Variable value
  - `description` (optional string): Variable description
  - `category` (optional string): Variable category
  - `hcl` (optional boolean): Whether the variable is HCL
  - `sensitive` (optional boolean): Whether the variable is sensitive
- **Returns**: Created variable details

#### `updateVariable`
Update an existing variable.
- **Inputs**:
  - `name` (string): Name of the variable
  - `organization` (string): Organization name
  - `workspace` (string): Workspace name
  - `value` (string): New variable value
  - `description` (optional string): New variable description
  - `category` (optional string): New variable category
  - `hcl` (optional boolean): Whether the variable is HCL
  - `sensitive` (optional boolean): Whether the variable is sensitive
- **Returns**: Updated variable details

#### `deleteVariable`
Delete a variable.
- **Inputs**:
  - `name` (string): Name of the variable
  - `organization` (string): Organization name
  - `workspace` (string): Workspace name
- **Returns**: Success status

#### `getVariable`
Get details of a specific variable.
- **Inputs**:
  - `name` (string): Name of the variable
  - `organization` (string): Organization name
  - `workspace` (string): Workspace name
- **Returns**: Variable details

#### `listVariables`
List all variables in a workspace.
- **Inputs**:
  - `organization` (string): Organization name
  - `workspace` (string): Workspace name
- **Returns**: Array of variable details

### Modules

#### `createModule`
Create a new module.
- **Inputs**:
  - `name` (string): Name of the module
  - `organization` (string): Organization name
  - `provider` (string): Module provider
  - `description` (optional string): Module description
- **Returns**: Created module details

#### `updateModule`
Update an existing module.
- **Inputs**:
  - `name` (string): Name of the module
  - `organization` (string): Organization name
  - `provider` (string): Module provider
  - `description` (optional string): New module description
- **Returns**: Updated module details

#### `deleteModule`
Delete a module.
- **Inputs**:
  - `name` (string): Name of the module
  - `organization` (string): Organization name
  - `provider` (string): Module provider
- **Returns**: Success status

#### `getModule`
Get details of a specific module.
- **Inputs**:
  - `name` (string): Name of the module
  - `organization` (string): Organization name
  - `provider` (string): Module provider
- **Returns**: Module details

#### `listModules`
List all modules in an organization.
- **Inputs**:
  - `organization` (string): Organization name
- **Returns**: Array of module details

### Organizations

#### `createOrganization`
Create a new organization.
- **Inputs**:
  - `name` (string): Name of the organization
  - `description` (optional string): Organization description
- **Returns**: Created organization details

#### `updateOrganization`
Update an existing organization.
- **Inputs**:
  - `name` (string): Name of the organization
  - `description` (optional string): New organization description
- **Returns**: Updated organization details

#### `deleteOrganization`
Delete an organization.
- **Inputs**:
  - `name` (string): Name of the organization
- **Returns**: Success status

#### `getOrganization`
Get details of a specific organization.
- **Inputs**:
  - `name` (string): Name of the organization
- **Returns**: Organization details

#### `listOrganizations`
List all organizations.
- **Returns**: Array of organization details

## Setup

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
TERRAKUBE_API_URL=<your-terrakube-api-url>
TERRAKUBE_PAT_TOKEN=<your-personal-access-token>
TERRAKUBE_ORGANIZATION=<your-organization-name>
```

### Installing via Smithery

To install Terrakube MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@AzBuilder/mcp-server-terrakube):

```bash
npx -y @smithery/cli install @AzBuilder/mcp-server-terrakube --client claude
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/terrakube-mcp-server.git
   cd terrakube-mcp-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

### Usage with Claude Desktop

To use this with Claude Desktop, add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "terrakube": {
      "command": "npx",
      "args": [
        "-y",
        "@terrakube/mcp-server-terrakube"
      ],
      "env": {
        "TERRAKUBE_API_URL": "<YOUR_API_URL>",
        "TERRAKUBE_PAT_TOKEN": "<YOUR_PAT_TOKEN>",
        "TERRAKUBE_ORGANIZATION": "<YOUR_ORGANIZATION>"
      }
    }
  }
}
```

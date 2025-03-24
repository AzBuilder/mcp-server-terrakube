// Common interfaces for Terrakube API entities

export interface Organization {
  id: string;
  name: string;
  description?: string;
  executionMode?: string;
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  terraformVersion: string;
  branch?: string;
  folder?: string;
  source?: string;
  executionMode?: string;
  iacType?: string;
  defaultTemplate?: string;
  locked?: boolean;
  lockDescription?: string;
  organizationId: string;
  relationships?: {
    vcs?: { data: { id: string; type: string } };
    ssh?: { data: { id: string; type: string } };
    agent?: { data: { id: string; type: string } };
    webhook?: { data: { id: string; type: string } };
  };
}

export interface Module {
  id: string;
  name: string;
  provider: string;
  source: string;
  folder?: string;
  description?: string;
  downloadQuantity?: number;
  versions?: string[];
  registryPath?: string;
  tagPrefix?: string;
  organizationId: string;
  relationships?: {
    vcs?: { data: { id: string; type: string } };
    ssh?: { data: { id: string; type: string } };
  };
}

export interface Variable {
  id: string;
  key: string;
  value: string;
  description?: string;
  category: 'TERRAFORM' | 'ENV';
  sensitive: boolean;
  hcl: boolean;
  workspaceId: string;
}

// Request/Response interfaces

export interface CreateOrganizationRequest {
  data: {
    type: string;
    attributes: {
      name: string;
      description?: string;
      executionMode?: string;
    };
  };
}

export interface CreateWorkspaceRequest {
  data: {
    type: string;
    lid?: string;
    attributes: {
      name: string;
      description?: string;
      terraformVersion: string;
      source?: string;
      branch?: string;
      folder?: string;
      iacType?: string;
      defaultTemplate?: string;
    };
    relationships?: {
      vcs?: { data: { type: string; id: string } };
      ssh?: { data: { type: string; id: string } };
    };
  };
}

export interface CreateModuleRequest {
  data: {
    type: string;
    attributes: {
      name: string;
      provider: string;
      source: string;
      description?: string;
      folder?: string;
      tagPrefix?: string;
    };
    relationships?: {
      vcs?: { data: { type: string; id: string } };
      ssh?: { data: { type: string; id: string } };
    };
  };
}

export interface CreateVariableRequest {
  data: {
    type: string;
    attributes: {
      key: string;
      value: string;
      description?: string;
      category: 'TERRAFORM' | 'ENV';
      sensitive: boolean;
      hcl: boolean;
    };
  };
}

// API Response interfaces
export interface ApiListResponse<T> {
  data: T[];
  included?: any[];
}

export interface ApiEntityResponse<T> {
  data: T;
  included?: any[];
}

// API Request Options
export interface ApiRequestOptions {
  includes?: string[];
  filter?: Record<string, string>;
  params?: Record<string, string>;
}

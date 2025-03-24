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

export interface Team {
  id: string;
  name: string;
  description?: string;
  manageState?: boolean;
  manageWorkspace?: boolean;
  manageModule?: boolean;
  manageProvider?: boolean;
  manageVcs?: boolean;
  manageTemplate?: boolean;
  manageCollection?: boolean;
  manageJob?: boolean;
  organizationId: string;
}

export interface Template {
  id: string;
  name: string;
  description?: string;
  tcl: string;
  version?: string;
}

export interface SshKey {
  id: string;
  name: string;
  description: string;
  sshType: string;
  privateKey?: string;
}

export interface VCS {
  id: string;
  name: string;
  description: string;
  vcsType: string;
  clientId: string;
  clientSecret?: string;
  privateKey?: string;
  callback: string;
  endpoint: string;
  apiUrl: string;
  connectionType: string;
  status: string;
}

export interface Job {
  id: string;
  status: string;
  via: string;
  templateReference: string;
  overrideBranch?: string;
  createdBy: string;
  createdDate: string;
  updatedDate: string;
  commitId?: string;
}

export interface JobStep {
  id: string;
  name: string;
  stepNumber: number;
  status: string;
  output: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface State {
  id: string;
  jobReference: string;
  lineage: string;
  md5: string;
  output: string;
  serial: number;
}

export interface Schedule {
  id: string;
  cron: string;
  templateReference: string;
  enabled: boolean;
}

export interface Webhook {
  id: string;
  remoteHookId: string;
}

export interface WebhookEvent {
  id: string;
  event: string;
  branch: string;
  path: string;
  templateId: string;
  priority: number;
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

export interface CreateTeamRequest {
  data: {
    type: string;
    attributes: {
      name: string;
      description?: string;
      manageState?: boolean;
      manageWorkspace?: boolean;
      manageModule?: boolean;
      manageProvider?: boolean;
      manageVcs?: boolean;
      manageTemplate?: boolean;
      manageCollection?: boolean;
      manageJob?: boolean;
    };
  };
}

export interface CreateTemplateRequest {
  data: {
    type: string;
    attributes: {
      name: string;
      description?: string;
      tcl: string;
      version: string;
    };
  };
}

export interface CreateJobRequest {
  data: {
    type: string;
    attributes: {
      templateReference: string;
      overrideBranch?: string;
      via?: string;
    };
    relationships: {
      workspace: {
        data: {
          type: string;
          id: string;
        };
      };
    };
  };
}

export interface CreateScheduleRequest {
  data: {
    type: string;
    attributes: {
      templateReference: string;
      cron: string;
    };
  };
}

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

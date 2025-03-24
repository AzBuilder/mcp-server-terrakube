import { z } from "zod";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const configSchema = z.object({
  apiUrl: z.string(),
  patToken: z.string(),
  organization: z.string()
});

export const CONFIG = configSchema.parse({
  apiUrl: process.env.TERRAKUBE_API_URL,
  patToken: process.env.TERRAKUBE_PAT_TOKEN,
  organization: process.env.TERRAKUBE_ORGANIZATION
});

// Validate required configuration
export function validateConfig(): boolean {
  if (!CONFIG.apiUrl) {
    console.error("Error: TERRAKUBE_API_URL is not set");
    return false;
  }
  
  if (!CONFIG.patToken) {
    console.error("Error: TERRAKUBE_PAT_TOKEN is not set");
    return false;
  }
  
  if (!CONFIG.organization) {
    console.error("Error: TERRAKUBE_ORGANIZATION is not set");
    return false;
  }
  
  return true;
}

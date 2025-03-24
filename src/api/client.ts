import axios from "axios";
import { CONFIG } from "../config.js";

// Create axios instance for API calls
export const apiClient = axios.create({
  baseURL: CONFIG.apiUrl,
  headers: {
    Authorization: `Bearer ${CONFIG.patToken}`,
    "Content-Type": "application/vnd.api+json",
  },
  timeout: 30000 // Default timeout of 30 seconds
});

// Create axios instance for registry calls
export const registryClient = axios.create({
  baseURL: `${CONFIG.apiUrl}/registry`,
  headers: {
    Authorization: `Bearer ${CONFIG.patToken}`,
    "Content-Type": "application/vnd.api+json",
  },
  timeout: 30000 // Default timeout of 30 seconds
});

// Helper function to handle API errors
export function handleApiError(error: any): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return `API Error: ${error.response.status} - ${error.response.data?.errors?.[0]?.detail || error.response.statusText}`;
    } else if (error.request) {
      return "No response received from server";
    } else {
      return `Request Error: ${error.message}`;
    }
  }
  return `Error: ${error.message}`;
} 
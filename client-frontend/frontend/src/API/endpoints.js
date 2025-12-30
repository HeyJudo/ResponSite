/**
 * RESPONSITE API ENDPOINTS
 * Backend Base URL: http://localhost:8080
 * All endpoints require proper authentication via session cookies
 */

const BASE_URL = "http://localhost:8080/api";

// ==================== AUTHENTICATION ====================
export const AUTH_ENDPOINTS = {
  REGISTER: `${BASE_URL}/auth/register`,
  LOGIN: `${BASE_URL}/auth/login`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  CHECK_SESSION: `${BASE_URL}/auth/check`,
};

// ==================== INCIDENTS ====================
export const INCIDENT_ENDPOINTS = {
  CREATE: `${BASE_URL}/incidents`,
  GET_ALL: `${BASE_URL}/incidents`,
  GET_MY_REPORTS: `${BASE_URL}/incidents/my-reports`,
  UPDATE_STATUS: (id) => `${BASE_URL}/incidents/${id}/status`,
  ASSIGN_RESPONDENT: (id) => `${BASE_URL}/incidents/${id}/assign`,
  CANCEL: (id) => `${BASE_URL}/incidents/${id}/cancel`,
  DELETE: (id) => `${BASE_URL}/incidents/${id}`,
};

// ==================== RESOURCES ====================
export const RESOURCE_ENDPOINTS = {
  GET_ALL: `${BASE_URL}/resources`,
  ADD: `${BASE_URL}/resources`,
  UPDATE: (id) => `${BASE_URL}/resources/${id}`,
  DELETE: (id) => `${BASE_URL}/resources/${id}`,
};

// ==================== EVACUATION CENTERS ====================
export const EVACUATION_CENTER_ENDPOINTS = {
  GET_ALL: `${BASE_URL}/evacuation-centers`,
  ADD: `${BASE_URL}/evacuation-centers`,
  UPDATE: (id) => `${BASE_URL}/evacuation-centers/${id}`,
  UPDATE_STATUS: (id) => `${BASE_URL}/evacuation-centers/${id}/status`,
  DELETE: (id) => `${BASE_URL}/evacuation-centers/${id}`,
};

// ==================== INFRASTRUCTURE PROJECTS ====================
export const PROJECT_ENDPOINTS = {
  GET_ALL: `${BASE_URL}/projects`,
  GET_BY_ID: (id) => `${BASE_URL}/projects/${id}`,
  CREATE: `${BASE_URL}/projects`,
  UPDATE: (id) => `${BASE_URL}/projects/${id}`,
  ADD_PROCESS_UPDATE: (projectId) => `${BASE_URL}/projects/${projectId}/process-updates`,
  GET_PROCESS_UPDATES: (projectId) => `${BASE_URL}/projects/${projectId}/process-updates`,
};

// ==================== FEEDBACK ====================
export const FEEDBACK_ENDPOINTS = {
  SUBMIT: (projectId) => `${BASE_URL}/feedback/${projectId}`,
  GET_FEEDBACKS: (projectId) => `${BASE_URL}/feedback/${projectId}`,
};

// ==================== DASHBOARD ====================
export const DASHBOARD_ENDPOINTS = {
  GET_STATS: `${BASE_URL}/dashboard/stats`,
};

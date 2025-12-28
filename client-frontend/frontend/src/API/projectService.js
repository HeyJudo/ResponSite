/**
 * INFRASTRUCTURE PROJECTS API SERVICE
 * Handles infrastructure project management - view, create, update projects
 * View: PUBLIC (no login required)
 * Create/Update: STAFF and ADMIN only
 */

import { PROJECT_ENDPOINTS } from './endpoints';

// ==================== GET ALL PROJECTS ====================
/**
 * Get all infrastructure projects (PUBLIC - no login required)
 * @returns {Promise} Array of all infrastructure projects
 */
export const getAllProjects = async () => {
  try {
    const response = await fetch(PROJECT_ENDPOINTS.GET_ALL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }
};

// ==================== GET PROJECT BY ID ====================
/**
 * Get a specific infrastructure project (PUBLIC - no login required)
 * @param {number} id - Project ID
 * @returns {Promise} Project details
 */
export const getProjectById = async (id) => {
  try {
    const response = await fetch(PROJECT_ENDPOINTS.GET_BY_ID(id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch project: ${error.message}`);
  }
};

// ==================== CREATE PROJECT ====================
/**
 * Create a new infrastructure project (STAFF and ADMIN only)
 * @param {Object} data - {
 *   name, type, location, description, objectives, startDate, 
 *   targetEndDate, totalBudget, status, contractorName, 
 *   contractorNumber, contractorEmail
 * }
 * @returns {Promise} Created project data
 */
export const createProject = async (data) => {
  try {
    const response = await fetch(PROJECT_ENDPOINTS.CREATE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Failed to create project: ${error.message}`);
  }
};

// ==================== UPDATE PROJECT ====================
/**
 * Update an infrastructure project (STAFF and ADMIN only)
 * @param {number} id - Project ID
 * @param {Object} data - Updated project data (progress, status, etc.)
 * @returns {Promise} Updated project data
 */
export const updateProject = async (id, data) => {
  try {
    const response = await fetch(PROJECT_ENDPOINTS.UPDATE(id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Failed to update project: ${error.message}`);
  }
};

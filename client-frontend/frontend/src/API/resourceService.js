/**
 * RESOURCES API SERVICE
 * Handles inventory management - add, view, update, delete resources
 * Access: STAFF and ADMIN only (RESIDENT cannot access)
 */

import { RESOURCE_ENDPOINTS } from './endpoints';

// ==================== GET ALL RESOURCES ====================
/**
 * Get all resources in inventory (STAFF and ADMIN only)
 * @returns {Promise} Array of all resources with stock levels
 */
export const getAllResources = async () => {
  try {
    const response = await fetch(RESOURCE_ENDPOINTS.GET_ALL, {
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
    throw new Error(`Failed to fetch resources: ${error.message}`);
  }
};

// ==================== ADD RESOURCE ====================
/**
 * Add a new item to inventory
 * @param {Object} data - { name, quantity, status, description }
 * @returns {Promise} Created resource data
 */
export const addResource = async (data) => {
  try {
    const response = await fetch(RESOURCE_ENDPOINTS.ADD, {
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
    throw new Error(`Failed to add resource: ${error.message}`);
  }
};

// ==================== UPDATE RESOURCE ====================
/**
 * Update a resource in inventory
 * @param {number} id - Resource ID
 * @param {Object} data - Updated resource data (name, quantity, status, description)
 * @returns {Promise} Updated resource data
 */
export const updateResource = async (id, data) => {
  try {
    const response = await fetch(RESOURCE_ENDPOINTS.UPDATE(id), {
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
    throw new Error(`Failed to update resource: ${error.message}`);
  }
};

// ==================== DELETE RESOURCE ====================
/**
 * Delete a resource from inventory
 * @param {number} id - Resource ID
 * @returns {Promise} Success message
 */
export const deleteResource = async (id) => {
  try {
    const response = await fetch(RESOURCE_ENDPOINTS.DELETE(id), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    // Check if response has content before trying to parse as JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      // Return success for plain text responses
      return { message: 'Resource deleted successfully' };
    }
  } catch (error) {
    throw new Error(`Failed to delete resource: ${error.message}`);
  }
};

/**
 * EVACUATION CENTERS API SERVICE
 * Handles evacuation center management - view, add, update, delete centers
 * View: PUBLIC (no login required)
 * Add/Edit/Delete: STAFF and ADMIN only
 */

import { EVACUATION_CENTER_ENDPOINTS } from './endpoints';

// ==================== GET ALL EVACUATION CENTERS ====================
/**
 * Get all evacuation centers (PUBLIC - no login required)
 * @returns {Promise} Array of all evacuation centers
 */
export const getAllEvacuationCenters = async () => {
  try {
    const response = await fetch(EVACUATION_CENTER_ENDPOINTS.GET_ALL, {
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
    throw new Error(`Failed to fetch evacuation centers: ${error.message}`);
  }
};

// ==================== ADD EVACUATION CENTER ====================
/**
 * Add a new evacuation center (STAFF and ADMIN only)
 * @param {Object} data - { name, location, capacity, status, contactPerson, contactNumber }
 * @returns {Promise} Created evacuation center data
 */
export const addEvacuationCenter = async (data) => {
  try {
    const response = await fetch(EVACUATION_CENTER_ENDPOINTS.ADD, {
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
    throw new Error(`Failed to add evacuation center: ${error.message}`);
  }
};

// ==================== UPDATE EVACUATION CENTER ====================
/**
 * Update evacuation center details
 * @param {number} id - Evacuation center ID
 * @param {Object} data - { name, location, capacity, status }
 * @returns {Promise} Updated evacuation center data
 */
export const updateEvacuationCenter = async (id, data) => {
  try {
    const response = await fetch(EVACUATION_CENTER_ENDPOINTS.UPDATE(id), {
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
    throw new Error(`Failed to update evacuation center: ${error.message}`);
  }
};

// ==================== UPDATE EVACUATION CENTER STATUS ====================
/**
 * Update evacuation center status
 * @param {number} id - Evacuation center ID
 * @param {string} status - New status (e.g., "ACTIVE", "INACTIVE", "FULL")
 * @returns {Promise} Updated evacuation center data
 */
export const updateEvacuationCenterStatus = async (id, status) => {
  try {
    const response = await fetch(`${EVACUATION_CENTER_ENDPOINTS.UPDATE_STATUS(id)}?status=${status}`, {
      method: 'PUT',
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
    throw new Error(`Failed to update evacuation center status: ${error.message}`);
  }
};

// ==================== DELETE EVACUATION CENTER ====================
/**
 * Delete an evacuation center (STAFF and ADMIN only)
 * @param {number} id - Evacuation center ID
 * @returns {Promise} Success message
 */
export const deleteEvacuationCenter = async (id) => {
  try {
    const response = await fetch(EVACUATION_CENTER_ENDPOINTS.DELETE(id), {
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
      return { message: 'Evacuation center deleted successfully' };
    }
  } catch (error) {
    throw new Error(`Failed to delete evacuation center: ${error.message}`);
  }
};

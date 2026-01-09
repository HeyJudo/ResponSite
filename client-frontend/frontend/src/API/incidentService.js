/**
 * INCIDENTS API SERVICE
 * Handles incident reporting, viewing, and management
 * Access: STAFF and ADMIN can view all incidents, RESIDENT can view own reports
 */

import { INCIDENT_ENDPOINTS } from './endpoints';

// ==================== CREATE INCIDENT ====================
/**
 * Create a new incident report
 * @param {Object} data - Incident details (type, location, description, etc.)
 * @returns {Promise} Created incident data
 */
export const createIncident = async (data) => {
  try {
    const response = await fetch(INCIDENT_ENDPOINTS.CREATE, {
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
    throw new Error(`Failed to create incident: ${error.message}`);
  }
};

// ==================== GET ALL INCIDENTS ====================
/**
 * Get all incidents (STAFF and ADMIN only)
 * @returns {Promise} Array of all incidents
 */
export const getAllIncidents = async () => {
  try {
    const response = await fetch(INCIDENT_ENDPOINTS.GET_ALL, {
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
    throw new Error(`Failed to fetch incidents: ${error.message}`);
  }
};

// ==================== GET MY REPORTS ====================
/**
 * Get incidents reported by current user
 * @returns {Promise} Array of user's incidents
 */
export const getMyIncidents = async () => {
  try {
    const response = await fetch(INCIDENT_ENDPOINTS.GET_MY_REPORTS, {
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
    throw new Error(`Failed to fetch your incidents: ${error.message}`);
  }
};

// ==================== UPDATE INCIDENT STATUS ====================
/**
 * Update incident status (STAFF and ADMIN only)
 * Status options: PENDING, ASSIGNED, IN_PROGRESS, RESOLVED, CANCELLED
 * @param {number} id - Incident ID
 * @param {string} status - New status
 * @returns {Promise} Updated incident data
 */
export const updateIncidentStatus = async (id, status) => {
  try {
    const response = await fetch(`${INCIDENT_ENDPOINTS.UPDATE_STATUS(id)}?status=${status}`, {
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
    throw new Error(`Failed to update incident status: ${error.message}`);
  }
};

// ==================== CANCEL INCIDENT ====================
/**
 * Cancel an incident report (by owner)
 * @param {number} id - Incident ID
 * @returns {Promise} Cancelled incident data
 */
export const cancelIncident = async (id) => {
  try {
    const response = await fetch(INCIDENT_ENDPOINTS.CANCEL(id), {
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
    throw new Error(`Failed to cancel incident: ${error.message}`);
  }
};

// ==================== ASSIGN RESPONDENT ====================
/**
 * Assign a respondent to an incident (ADMIN/LGU only)
 * @param {number} id - Incident ID
 * @param {string} respondentName - Name of the respondent to assign
 * @returns {Promise} Updated incident data
 */
export const assignRespondent = async (id, respondentName) => {
  try {
    const response = await fetch(`${INCIDENT_ENDPOINTS.ASSIGN_RESPONDENT(id)}?respondent=${respondentName}`, {
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
    throw new Error(`Failed to assign respondent: ${error.message}`);
  }
};

// ==================== DELETE INCIDENT ====================
/**
 * Delete incident permanently (ADMIN only)
 * @param {number} id - Incident ID
 * @returns {Promise} Success message
 */
export const deleteIncident = async (id) => {
  try {
    const response = await fetch(INCIDENT_ENDPOINTS.DELETE(id), {
      method: 'DELETE',
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
    throw new Error(`Failed to delete incident: ${error.message}`);
  }
};
// ==================== RESOLVE WITH NOTES ====================
/**
 * Resolve an incident with resolution notes
 * @param {number} id - Incident ID
 * @param {string} resolutionNotes - Notes about the resolution
 * @returns {Promise} Updated incident data
 */
export const resolveIncidentWithNotes = async (id, resolutionNotes) => {
  try {
    const response = await fetch(INCIDENT_ENDPOINTS.RESOLVE(id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ resolutionNotes }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Failed to resolve incident: ${error.message}`);
  }
};
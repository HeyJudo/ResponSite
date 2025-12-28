/**
 * FEEDBACK API SERVICE
 * Handles project feedback submission and viewing
 * Submit: RESIDENT only
 * View: STAFF and ADMIN only
 */

import { FEEDBACK_ENDPOINTS } from './endpoints';

// ==================== SUBMIT FEEDBACK ====================
/**
 * Submit feedback for a project (RESIDENT only)
 * @param {number} projectId - Infrastructure project ID
 * @param {Object} data - { rating, comment }
 * @returns {Promise} Submitted feedback data
 */
export const submitFeedback = async (projectId, data) => {
  try {
    const response = await fetch(FEEDBACK_ENDPOINTS.SUBMIT(projectId), {
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
    throw new Error(`Failed to submit feedback: ${error.message}`);
  }
};

// ==================== GET FEEDBACKS FOR PROJECT ====================
/**
 * Get all feedbacks for a project (STAFF and ADMIN only)
 * @param {number} projectId - Infrastructure project ID
 * @returns {Promise} Array of feedback entries
 */
export const getFeedbacks = async (projectId) => {
  try {
    const response = await fetch(FEEDBACK_ENDPOINTS.GET_FEEDBACKS(projectId), {
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
    throw new Error(`Failed to fetch feedbacks: ${error.message}`);
  }
};

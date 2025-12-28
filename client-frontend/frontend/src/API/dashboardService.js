/**
 * DASHBOARD API SERVICE
 * Handles dashboard statistics and analytics
 * Access: All authenticated users
 */

import { DASHBOARD_ENDPOINTS } from './endpoints';

// ==================== GET DASHBOARD STATS ====================
/**
 * Get dashboard statistics for the logged-in user
 * Returns aggregated data based on user role
 * @returns {Promise} Dashboard statistics object with user-specific metrics
 */
export const getDashboardStats = async () => {
  try {
    const response = await fetch(DASHBOARD_ENDPOINTS.GET_STATS, {
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
    throw new Error(`Failed to fetch dashboard statistics: ${error.message}`);
  }
};

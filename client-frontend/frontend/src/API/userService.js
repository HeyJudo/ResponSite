/**
 * USER MANAGEMENT API SERVICE
 * Fetches users for the admin List of Users page
 */

import { USER_ENDPOINTS } from './endpoints';

/**
 * Get all users
 * Access: Admin
 */
export const getAllUsers = async () => {
  try {
    const response = await fetch(USER_ENDPOINTS.GET_ALL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || 'Failed to fetch users');
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
};

/**
 * AUTHENTICATION API SERVICE
 * Handles user registration, login, logout, and session checks
 */

import { AUTH_ENDPOINTS } from './endpoints';

// ==================== REGISTER ====================
/**
 * Register a new user
 * @param {Object} data - { username, password, email, address, role }
 * @returns {Promise} Response with user data (without password)
 */
export const registerUser = async (data) => {
  try {
    const response = await fetch(AUTH_ENDPOINTS.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for session cookies
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};

// ==================== LOGIN ====================
/**
 * Login user with credentials
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {Promise} Response with user data and session cookie
 */
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for session cookies
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

// ==================== LOGOUT ====================
/**
 * Logout current user and destroy session
 * @returns {Promise} Success message
 */
export const logoutUser = async () => {
  try {
    const response = await fetch(AUTH_ENDPOINTS.LOGOUT, {
      method: 'POST',
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
    throw new Error(`Logout failed: ${error.message}`);
  }
};

// ==================== CHECK SESSION ====================
/**
 * Check if user is still logged in (useful for app initialization)
 * @returns {Promise} User data if logged in, error if not
 */
export const checkSession = async () => {
  try {
    const response = await fetch(AUTH_ENDPOINTS.CHECK_SESSION, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Not logged in');
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Session check failed: ${error.message}`);
  }
};

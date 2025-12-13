/**
 * Incident API
 * TODO: Implement real API calls to backend
 */

/**
 * Fetches the count of active incident reports
 * @returns {Promise<number>} Number of active incidents
 */
export const fetchActiveIncidents = async () => {
  // TODO: Replace with real API call
  return 0;
};

/**
 * Fetches notification list for the current user
 * @returns {Promise<Array>} Array of notification objects
 */
export const fetchNotifications = async () => {
  // TODO: Replace with real API call
  return [
    {
      id: 1,
      content: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas."
    },
    {
      id: 2,
      content: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas."
    }
  ];
};
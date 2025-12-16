/**
 * My Reports API
 * In-memory data store for incident reports
 * TODO: Replace with real backend API calls
 */

let myReports = [];

/**
 * Retrieves all incident reports for the current user
 * @returns {Array} Array of report objects
 */
export const getMyReports = () => myReports;

/**
 * Adds a new incident report
 * @param {Object} report - The report data to add
 * @returns {Object} The newly created report with generated fields
 */
export const addMyReport = (report) => {
  const newReport = {
    id: myReports.length ? myReports[myReports.length - 1].id + 1 : 1,
    ...report,
    status: 'Pending',
    dateReported: new Date().toISOString().slice(0, 10),
    assignedTo: 'N/A',
  };
  myReports = [...myReports, newReport];
  return newReport;
};

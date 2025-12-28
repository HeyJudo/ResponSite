// Dynamic calculation of incidents summary based on incidentReportsData
import incidentReportsData from './incidentReportsData';

// Get current date for "this month" calculation
const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11, so add 1
const currentYear = currentDate.getFullYear();

// Calculate incidents this month and total incidents
const calculateIncidentCounts = () => {
  let thisMonthCount = 0;
  const totalCount = incidentReportsData.length;

  incidentReportsData.forEach(incident => {
    // Parse date from format "MM-DD-YYYY"
    const [month, day, year] = incident.dateReported.split('-').map(Number);

    if (month === currentMonth && year === currentYear) {
      thisMonthCount++;
    }
  });

  return {
    thisMonth: thisMonthCount,
    total: totalCount
  };
};

// Calculate status-based counts for recent incident reports
const calculateStatusCounts = () => {
  const statusCounts = {
    pending: 0,
    inProgress: 0,
    resolved: 0
  };

  incidentReportsData.forEach(incident => {
    const status = incident.status.toLowerCase();
    if (status === 'pending') {
      statusCounts.pending++;
    } else if (status === 'in progress') {
      statusCounts.inProgress++;
    } else if (status === 'resolved') {
      statusCounts.resolved++;
    }
  });

  return statusCounts;
};

const incidentCounts = calculateIncidentCounts();
const statusCounts = calculateStatusCounts();

// Dynamic data for incidents summary
const incidentsSummary = {
  totalIncidents: {
    thisMonth: incidentCounts.thisMonth,
    total: incidentCounts.total
  },
  recentIncidentReports: {
    pending: statusCounts.pending,
    inProgress: statusCounts.inProgress,
    resolved: statusCounts.resolved
  }
};

export default incidentsSummary;
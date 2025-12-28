import { useState, useEffect } from 'react';
import { getAllIncidents } from '../../API/incidentService';

const DashboardSummary = () => {
  const [summaryData, setSummaryData] = useState({
    totalIncidents: {
      thisMonth: 0,
      total: 0
    },
    recentIncidentReports: {
      pending: 0,
      inProgress: 0,
      resolved: 0
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidentSummary = async () => {
      try {
        const data = await getAllIncidents();

        // Get current date for "this month" calculation
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        // Calculate incidents this month and total incidents
        let thisMonthCount = 0;
        const totalCount = data.length;

        data.forEach(incident => {
          if (incident.timestamp) {
            const incidentDate = new Date(incident.timestamp);
            const incidentMonth = incidentDate.getMonth() + 1;
            const incidentYear = incidentDate.getFullYear();

            if (incidentMonth === currentMonth && incidentYear === currentYear) {
              thisMonthCount++;
            }
          }
        });

        // Calculate status-based counts
        const statusCounts = {
          pending: 0,
          inProgress: 0,
          resolved: 0
        };

        data.forEach(incident => {
          const status = incident.status;
          if (status === 'PENDING') {
            statusCounts.pending++;
          } else if (status === 'IN_PROGRESS') {
            statusCounts.inProgress++;
          } else if (status === 'RESOLVED') {
            statusCounts.resolved++;
          }
        });

        setSummaryData({
          totalIncidents: {
            thisMonth: thisMonthCount,
            total: totalCount
          },
          recentIncidentReports: statusCounts
        });
      } catch (err) {
        console.error('Failed to fetch incident summary:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidentSummary();
  }, []);

  if (loading) {
    return (
      <div className="bottom-row-container">
        <div className="recent-incident-form-card form-flex-1">
          <div className="recent-incident-header">Total Incidents</div>
          <div className="form-card-padding">
            <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
          </div>
        </div>
        <div className="recent-incident-form-card form-flex-1">
          <div className="recent-incident-header">Recent Incident Reports</div>
          <div className="form-card-padding">
            <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bottom-row-container">
      {/* Total Incidents Form (Left) */}
      <form className="recent-incident-form-card form-flex-1">
        <div className="recent-incident-header">Total Incidents</div>
        <div className="form-card-padding">
          <div className="total-users-stack">
            <div className="total-users-card">
              <span className="admin-form-count">{summaryData.totalIncidents.thisMonth}</span>
              <span className="admin-form-title">Incidents this Month</span>
            </div>
            <div className="total-users-card">
              <span className="admin-form-count">{summaryData.totalIncidents.total}</span>
              <span className="admin-form-title">Total Incidents</span>
            </div>
          </div>
        </div>
      </form>

      {/* Recent Incident Reports Form (Right) */}
      <form className="recent-incident-form-card form-flex-1">
        <div className="recent-incident-header">Recent Incident Reports</div>
        <div className="form-card-padding">
          <div className="total-users-stack">
            <div className="total-users-card">
              <span className="admin-form-count">{summaryData.recentIncidentReports.pending}</span>
              <span className="admin-form-title">Pending</span>
            </div>
            <div className="total-users-card">
              <span className="admin-form-count">{summaryData.recentIncidentReports.inProgress}</span>
              <span className="admin-form-title">In Progress</span>
            </div>
            <div className="total-users-card">
              <span className="admin-form-count">{summaryData.recentIncidentReports.resolved}</span>
              <span className="admin-form-title">Resolved</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DashboardSummary;

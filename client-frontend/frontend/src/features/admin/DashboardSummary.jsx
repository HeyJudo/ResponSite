import incidentsSummary from '../../API/admin/incidentsSummary';

const DashboardSummary = () => {
  return (
    <div className="bottom-row-container">
      {/* Total Incidents Form (Left) */}
      <form className="recent-incident-form-card form-flex-1">
        <div className="recent-incident-header">Total Incidents</div>
        <div className="form-card-padding">
          <div className="total-users-stack">
            <div className="total-users-card">
              <span className="admin-form-count">{incidentsSummary.totalIncidents.thisMonth}</span>
              <span className="admin-form-title">Incidents this Month</span>
            </div>
            <div className="total-users-card">
              <span className="admin-form-count">{incidentsSummary.totalIncidents.total}</span>
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
              <span className="admin-form-count">{incidentsSummary.recentIncidentReports.completed}</span>
              <span className="admin-form-title">Completed</span>
            </div>
            <div className="total-users-card">
              <span className="admin-form-count">{incidentsSummary.recentIncidentReports.inProgress}</span>
              <span className="admin-form-title">In Progress</span>
            </div>
            <div className="total-users-card">
              <span className="admin-form-count">{incidentsSummary.recentIncidentReports.delayed}</span>
              <span className="admin-form-title">Delayed</span>
            </div>
            <div className="total-users-card">
              <span className="admin-form-count">{incidentsSummary.recentIncidentReports.planned}</span>
              <span className="admin-form-title">Planned</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DashboardSummary;

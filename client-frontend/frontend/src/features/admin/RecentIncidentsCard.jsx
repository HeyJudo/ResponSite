import Table from '../../components/Table';
import recentIncidentReports from '../../API/admin/recentIncidentReports';

const RecentIncidentsCard = () => {
  return (
    <form className="recent-incident-form-card">
      <div className="recent-incident-header">
        Recent Incident Reports
      </div>
      <div className="recent-incident-table-container">
        <Table
          columns={[
            { key: 'incidentId', header: 'Incident ID' },
            { key: 'type', header: 'Type' },
            { key: 'zone', header: 'Zone' },
            { key: 'severity', header: 'Severity' },
            { key: 'status', header: 'Status' },
            { key: 'reportedBy', header: 'Reported By' },
            { key: 'dateReported', header: 'Date Reported' },
            { key: 'assignedTo', header: 'Assigned to' },
          ]}
          data={recentIncidentReports}
        />
      </div>
      <div className="view-btn-container">
        <button type="button" className="admin-form-view-btn">View All</button>
      </div>
    </form>
  );
};

export default RecentIncidentsCard;

import Table from '../../components/Table';
import { getAllIncidents } from '../../API/incidentService';
import { useState, useEffect } from 'react';

const RecentIncidentsCard = () => {
  const [pendingIncidents, setPendingIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const data = await getAllIncidents();
        // Filter to show only pending incident reports
        const pending = data.filter(report => report.status === 'PENDING');
        setPendingIncidents(pending);
      } catch (err) {
        console.error('Failed to fetch incidents:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  return (
    <form className="recent-incident-form-card">
      <div className="recent-incident-header">
        Recent Incident Reports
      </div>
      <div className="recent-incident-table-container">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
        ) : (
          <Table
            columns={[
              { key: 'id', header: 'Incident ID' },
              { key: 'type', header: 'Type' },
              { key: 'zone', header: 'Zone' },
              { key: 'severity', header: 'Severity' },
              { key: 'status', header: 'Status' },
              { key: 'reporterName', header: 'Reported By' },
              { key: 'timestamp', header: 'Date Reported', render: (value) => value ? new Date(value).toLocaleDateString() : 'N/A' },
              { key: 'assignedTo', header: 'Assigned to', render: (value) => value || '---' },
            ]}
            data={pendingIncidents}
          />
        )}
      </div>
    </form>
  );
};

export default RecentIncidentsCard;
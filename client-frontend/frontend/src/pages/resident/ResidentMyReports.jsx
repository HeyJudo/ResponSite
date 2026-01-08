import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResidentSidebar from '../../features/resident/ResidentSidebar';
import ResidentHeader from '../../features/resident/ResidentHeader';
import { getMyIncidents } from '../../API/incidentService';
import { incidentStatusColors, severityColors } from '../../features/admin/admInfraProjects.constants';
import Table from '../../components/Table';
import { SkeletonTable } from '../../components/SkeletonLoader';
import EmptyState from '../../components/EmptyState';
import { useToast } from '../../components/Toast';
import '../../styles/resident/global.css';
import '../../styles/resident/resInfraProjects.css';


const ResidentMyReports = () => {
  const toast = useToast();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getMyIncidents();
        setReports(data);
      } catch (err) {
        setError(err.message || 'Failed to load reports');
        toast.error('Failed to load your reports');
      } finally {
        setLoading(false);
      }
    };
    
    fetchReports();
  }, []);

  return (
    <div className="dashboard-root">
      <ResidentHeader />
      <div className="dashboard-body-row">
        <ResidentSidebar />
        <div className="dashboard-right">
          <main className="right-panel">
            <div className="resource-form-card">
              <div className="resource-form-header">My Reports</div>
              {error && <div style={{ color: 'red', padding: '10px', marginBottom: '10px' }}>{error}</div>}
              {loading ? (
                <div style={{ padding: '20px' }}>
                  <SkeletonTable rows={5} columns={7} />
                </div>
              ) : (
              <div className="resource-table-container">
                {reports.length > 0 ? (
                  <Table
                    columns={[
                      { key: 'id', header: 'Incident ID' },
                      { key: 'type', header: 'Type' },
                      { key: 'zone', header: 'Zone' },
                      { key: 'location', header: 'Location' },
                      { key: 'severity', header: 'Severity', render: (value) => (
                        <span className={`severity-chip ${severityColors[value] || ""}`}>
                          {value}
                        </span>
                      ) },
                      { key: 'status', header: 'Status', render: (value) => (
                        <span className={`status-chip ${incidentStatusColors[value] || ""}`}>
                          {value}
                        </span>
                      ) },
                      { key: 'timestamp', header: 'Date Reported', render: (value) => (
                        value ? new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'
                      ) },
                    ]}
                    data={reports}
                    rowClassName={() => 'clickable-row'}
                    onRowClick={(row) => navigate(`/incident-reports/${row.id}`, { state: { incident: row } })}
                  />
                ) : (
                  <EmptyState 
                    preset="reports"
                    action={() => navigate('/dashboard')}
                    actionLabel="Report an Incident"
                  />
                )}
              </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ResidentMyReports;
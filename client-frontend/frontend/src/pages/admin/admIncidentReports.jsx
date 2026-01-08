import AdminSidebar from '../../features/admin/AdminSidebar';
import AdminHeader from '../../features/admin/AdminHeader';
import Table from '../../components/Table';
import SearchBar from '../../components/SearchBar';
import { SkeletonTable } from '../../components/SkeletonLoader';
import EmptyState from '../../components/EmptyState';
import { useToast } from '../../components/Toast';
import { getAllIncidents } from '../../API/incidentService';
import { incidentStatusColors, severityColors } from '../../features/admin/admInfraProjects.constants';
import '../../styles/resident/global.css';
import '../../styles/admin/admIncidentReports.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdmIncidentReports = () => {
  const toast = useToast();
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [allIncidents, setAllIncidents] = useState([]);
  const navigate = useNavigate();

  // Fetch all incidents from API
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const data = await getAllIncidents();
        setAllIncidents(data);
        setFiltered(data);
      } catch (err) {
        setError(err.message || 'Failed to load incidents');
        toast.error('Failed to load incidents');
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (search === '') {
      setFiltered(allIncidents);
    } else {
      const filteredData = allIncidents.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(search.toLowerCase())
        )
      );
      setFiltered(filteredData);
    }
  }, [search, allIncidents]);

  const handleRowClick = (row) => {
    navigate(`/admIncidentReportsDet/${row.id}`, { state: { incident: row } });
  };

  return (
    <div className="dashboard-root">
      <AdminHeader />
      <div className="dashboard-body-row">
        <AdminSidebar />
        <div className="dashboard-right">
          <main className="right-panel">
            <div className="resource-form-card">
              <div className="resource-form-header">Incident Reports</div>
              {error && <div style={{ color: 'red', padding: '10px', marginBottom: '10px' }}>{error}</div>}
              {loading ? (
                <div style={{ padding: '20px' }}>
                  <SkeletonTable rows={6} columns={8} />
                </div>
              ) : (
              <>
              <div className="resource-search-actions">
                <SearchBar
                  placeholder="Search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="resource-table-container">
                {filtered.length > 0 ? (
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
                      { key: 'reporterName', header: 'Reported By' },
                      { key: 'timestamp', header: 'Date Reported', render: (value) => {
                        if (!value) return 'N/A';
                        return new Date(value).toLocaleDateString();
                      } },
                    ]}
                    data={filtered}
                    onRowClick={handleRowClick}
                  />
                ) : (
                  <EmptyState 
                    preset={search ? 'search' : 'incidents'}
                  />
                )}
              </div>
              </>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdmIncidentReports;
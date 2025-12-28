import AdminSidebar from '../../features/admin/AdminSidebar';
import AdminHeader from '../../features/admin/AdminHeader';
import Table from '../../components/Table';
import SearchBar from '../../components/SearchBar';
import { getAllIncidents } from '../../API/incidentService';
import '../../styles/resident/global.css';
import '../../styles/admin/admIncidentReports.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdmIncidentReports = () => {
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
        <div className="dashboard-left">
          <AdminSidebar />
        </div>
        <div className="dashboard-right">
          <main className="right-panel">
            <div className="resource-form-card">
              <div className="resource-form-header">Incident Reports</div>
              {error && <div style={{ color: 'red', padding: '10px', marginBottom: '10px' }}>{error}</div>}
              {loading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>Loading incidents...</div>
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
                <Table
                  columns={[
                    { key: 'id', header: 'Incident ID' },
                    { key: 'type', header: 'Type' },
                    { key: 'zone', header: 'Zone' },
                    { key: 'location', header: 'Location' },
                    { key: 'severity', header: 'Severity' },
                    { key: 'status', header: 'Status' },
                    { key: 'reporterName', header: 'Reported By' },
                    { key: 'timestamp', header: 'Date Reported', render: (value) => {
                      if (!value) return 'N/A';
                      return new Date(value).toLocaleDateString();
                    } },
                  ]}
                  data={filtered}
                  onRowClick={handleRowClick}
                />
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
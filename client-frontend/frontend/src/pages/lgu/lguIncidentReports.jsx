import LguSidebar from '../../features/lgu/LguSidebar';
import LguHeader from '../../features/lgu/LguHeader';
import Table from '../../components/Table';
import SearchBar from '../../components/SearchBar';
import { SkeletonTable } from '../../components/SkeletonLoader';
import EmptyState from '../../components/EmptyState';
import { useToast } from '../../components/Toast';
import { getAllIncidents } from '../../API/incidentService';
import { incidentStatusColors } from '../../features/admin/admInfraProjects.constants';
import '../../styles/resident/global.css';
import '../../styles/admin/admIncidentReports.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LguIncidentReports = () => {
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
        const errorMessage = err.message || 'Failed to load incidents';
        setError(errorMessage);
        toast.error(errorMessage);
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
    navigate(`/lguIncidentReportsDet/${row.id}`, { state: { incident: row } });
  };

  const renderContent = () => {
    if (loading) {
      return <SkeletonTable columns={8} rows={6} />;
    }

    if (error) {
      return (
        <EmptyState
          icon="⚠️"
          title="Failed to Load Incidents"
          message={error}
          action={() => window.location.reload()}
          actionLabel="Try Again"
        />
      );
    }

    if (filtered.length === 0 && search) {
      return <EmptyState preset="search" />;
    }

    if (allIncidents.length === 0) {
      return <EmptyState preset="incidents" />;
    }

    return (
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
        </div>
      </>
    );
  };

  return (
    <div className="dashboard-root">
      <LguHeader />
      <div className="dashboard-body-row">
        <LguSidebar />
        <div className="dashboard-right">
          <main className="right-panel">
            <div className="resource-form-card">
              <div className="resource-form-header">Incident Reports</div>
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default LguIncidentReports;

import AdminSidebar from '../../features/admin/AdminSidebar';
import AdminHeader from '../../features/admin/AdminHeader';
import Table from '../../components/Table';
import IncidentSearchCard from '../../features/admin/IncidentSearchCard';
import incidentReportsData from '../../API/admin/incidentReportsData';
import '../../styles/resident/global.css';
import '../../styles/admin/admIncidentReports.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdmIncidentReports = () => {
  const [filtered, setFiltered] = useState(incidentReportsData);
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    navigate(`/admIncidentReportsDet/${row.incidentId}`, { state: { incident: row } });
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
            <form className="recent-incident-form-card">
              <div className="recent-incident-header">
                Incident Reports
              </div>
              <IncidentSearchCard data={incidentReportsData} onFilteredChange={setFiltered} />
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
                  data={filtered}
                  onRowClick={handleRowClick}
                />
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdmIncidentReports;
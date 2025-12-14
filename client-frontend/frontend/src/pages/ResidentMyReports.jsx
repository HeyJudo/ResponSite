import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../features/dashboard/Sidebar';
import Header from '../features/dashboard/Header';
import { getMyReports } from '../API/myReports';
import Table from '../components/Table';
import '../styles/resident/global.css';
import '../styles/resident/resInfraProjects.css';


const ResidentMyReports = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    setReports(getMyReports());
  }, []);

  return (
    <div className="dashboard-root">
      <Header />
      <div className="dashboard-body-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>
        <div className="dashboard-right">
          <main className="right-panel">
            <div className="incident-reports-wrapper">
              <div className="incident-header">My Reports</div>
              <div className="table-container">
                <Table
                  columns={[
                    { key: 'id', header: 'Incident ID' },
                    { key: 'type', header: 'Type' },
                    { key: 'zone', header: 'Zone' },
                    { key: 'status', header: 'Status', render: (value) => (
                      <span className={`evac-status ${value.toLowerCase()}`}>{value}</span>
                    ) },
                    { key: 'dateReported', header: 'Date Reported' },
                    { key: 'assignedTo', header: 'Assigned to' },
                  ]}
                  data={reports}
                  rowClassName={() => 'clickable-row'}
                  onRowClick={(row) => navigate(`/incident-reports/${row.id}`)}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ResidentMyReports;
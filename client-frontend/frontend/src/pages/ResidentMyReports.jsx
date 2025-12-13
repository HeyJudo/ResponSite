import { useState, useEffect } from 'react';
import Sidebar from '../components/resident_dashboard/Sidebar';
import Header from '../components/resident_dashboard/Header';
import { getMyReports } from '../API/myReports';
import '../styles/global.css';
import '../styles/resReport.css';


const ResidentMyReports = () => {
  const [reports, setReports] = useState([]);
  
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
          <div className="evac-panel">
            <div className="evac-title-card">
              <span className="evac-title">My Reports</span>
            </div>
            <div className="evac-table-card">
              <table className="evac-table">
                <thead>
                  <tr>
                    <th>Incident ID</th>
                    <th>Type</th>
                    <th>Zone</th>
                    <th>Status</th>
                    <th>Date Reported</th>
                    <th>Assigned to</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id}>
                      <td>{report.id}</td>
                      <td>{report.type}</td>
                      <td>{report.zone}</td>
                      <td><span className={`evac-status ${report.status.toLowerCase()}`}>{report.status}</span></td>
                      <td>{report.dateReported}</td>
                      <td>{report.assignedTo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentMyReports;
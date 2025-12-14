


import React from 'react';
import Sidebar from '../features/dashboard/Sidebar';
import Header from '../features/dashboard/Header';
import '../styles/resident/global.css';
import '../styles/resident/resInfraProjects.css';
import { reporter } from '../API/reporter';
import { useParams } from 'react-router-dom';
import { getMyReports } from '../API/myReports';

const ResidentMyReportDetails = () => {
  const { id } = useParams();
  const reports = getMyReports();
  const report = reports.find(r => String(r.id) === String(id));

  if (!report) {
    return <div className="report-details">Report not found.</div>;
  }

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
              <div className="incident-header">Incident #{report.id}</div>
              <div className="report-content">
                <div className="report-info">
                  <div><strong>Type :</strong> {report.type}</div>
                  <div><strong>Severity :</strong> {report.severity}</div>
                  <div><strong>Zone :</strong> {report.zone}</div>
                  <div><strong>Location :</strong> {report.location}</div>
                  <div><strong>Description :</strong> <br />{report.description}</div>
                </div>
                <div className="report-reporter">
                  <div className="reporter-label">Reported by:</div>
                  <div className="reporter-name">{reporter.name}</div>
                  <div className="reporter-contact">
                    <span className="reporter-icon" role="img" aria-label="phone">📞</span>
                    <span>{reporter.phone}</span>
                    <span className="reporter-icon" role="img" aria-label="email">📧</span>
                    <span>{reporter.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ResidentMyReportDetails;
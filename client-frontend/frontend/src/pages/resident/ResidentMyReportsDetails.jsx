


import React, { useState, useEffect } from 'react';
import ResidentSidebar from '../../features/resident/ResidentSidebar';
import ResidentHeader from '../../features/resident/ResidentHeader';
import Modal from '../../components/Modal';
import LoadingScreen from '../../components/LoadingScreen';
import '../../styles/resident/global.css';
import '../../styles/resident/resInfraProjects.css';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { cancelIncident } from '../../API/incidentService';

const ResidentMyReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const incident = location.state?.incident;
  
  const [report, setReport] = useState(incident || null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Use incident reporter data if available from passed state
  const reporterName = report?.reporterName || 'Unknown';
  const reporterPhone = report?.reporterPhone || 'N/A';
  const reporterEmail = report?.reporterEmail || 'N/A';

  if (!report && !incident) {
    return <div className="report-details">Report not found. Please select a report from My Reports.</div>;
  }

  // Status phases - simplified for resident view
  const status = report?.status || 'PENDING';
  const dates = {
    pending: report?.timestamp ? new Date(report.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    inProgress: report?.inProgressDate ? new Date(report.inProgressDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : null,
    resolved: report?.resolvedDate ? new Date(report.resolvedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : null,
  };
  const assignedTo = report?.assignedTo || 'Pending assignment';
  const resolutionNotes = report?.resolutionNotes || 'No resolution notes';

  const handleCancelReport = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    setError('');
    
    try {
      const incidentId = report?.id;
      if (!incidentId) {
        setError('Incident ID not found');
        setLoading(false);
        return;
      }
      
      await cancelIncident(incidentId);
      setShowDeleteConfirmation(false);
      navigate('/incident-reports');
    } catch (err) {
      setError(err.message || 'Failed to cancel incident');
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-root">
      {loading && <LoadingScreen />}
      <ResidentHeader />
      <div className="dashboard-body-row">
        <div className="dashboard-left">
          <ResidentSidebar />
        </div>
        <div className="dashboard-right">
          <main className="right-panel">
            <div className="resource-form-card">
              <div className="resource-form-header">
                Incident #{String(report?.id).padStart(4, '0')}
              </div>
              {error && <div style={{ color: 'red', padding: '10px', marginBottom: '10px' }}>{error}</div>}
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'row', gap: '1.5rem' }}>
                {/* Left 50% - Form Fields */}
                <div style={{ width: '50%' }}>
                  <div className="form-field-full" style={{ marginBottom: '0.7rem' }}>
                    <p style={{ margin: 0 }}>Incident Type: {report?.type}</p>
                  </div>
                  <div className="form-field-full" style={{ marginBottom: '0.7rem' }}>
                    <p style={{ margin: 0 }}>Severity: {report?.severity}</p>
                  </div>
                  <div className="form-field-full" style={{ marginBottom: '0.7rem' }}>
                    <p style={{ margin: 0 }}>Location: {report?.location}</p>
                  </div>
                  <div className="form-field-full" style={{ marginBottom: 0 }}>
                    <p style={{ margin: 0 }}>Description:</p>
                  </div>
                  <div style={{ marginTop: '0.5rem', padding: '0.8rem', background: '#F2F4F8', borderRadius: '8px', fontSize: '0.95rem', lineHeight: '1.4' }}>
                    {report?.description}
                  </div>
                </div>
                {/* Right 50% - Stacked form cards */}
                <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <div style={{ background: '#F2F4F8', borderRadius: '8px', padding: '0.8rem 1rem', minHeight: '45px', color: '#000000ff', fontWeight: 500, fontSize: '1rem', display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '0.7rem' }}>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>Status: <span style={{ fontWeight: 700, marginLeft: '0.5rem' }}>{status}</span></div>
                    <div style={{ background: '#e9e9e9ff', borderRadius: '7px', padding: '0.9rem 1rem', width: '100%', color: '#000000ff', fontWeight: 500, fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Pending</span>
                        <span style={{ fontSize: '0.85rem', color: '#555' }}>{dates.pending}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>In Progress</span>
                        <span style={{ fontSize: '0.85rem', color: '#555' }}>{dates.inProgress || 'No Date'}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Resolved</span>
                        <span style={{ fontSize: '0.85rem', color: '#555' }}>{dates.resolved || 'No Date'}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: '#F2F4F8', borderRadius: '8px', padding: '0.8rem 1rem', minHeight: '45px', color: '#000000ff', fontWeight: 500, fontSize: '1rem', display: 'flex', alignItems: 'center' }}>
                    Respondent/Assigned to: <span style={{ fontWeight: 700, marginLeft: '0.5rem' }}>{assignedTo}</span>
                  </div>
                  <div style={{ background: '#F2F4F8', borderRadius: '8px', padding: '0.8rem 1rem', minHeight: '45px', color: '#000000ff', fontWeight: 500, fontSize: '1rem', display: 'flex', alignItems: 'center' }}>Resolution Notes: <span style={{ fontWeight: 700, marginLeft: '0.5rem' }}>{resolutionNotes}</span></div>
                </div>
              </div>
              {/* Reporter Blue Card and Action Buttons Row */}
              <div style={{ padding: '0 1rem 1rem 1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: '0', gap: '1.5rem' }}>
                  {/* Reporter Blue Card */}
                  <div style={{
                    background: '#001D9C',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '1rem 1.2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    width: '50%',
                    alignItems: 'flex-start',
                  }}>
                    <div style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.3rem' }}>Reported By: {reporterName}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', fontSize: '1rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 A2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.06a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.99.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z"></path></svg>
                      </span>
                      <span>{reporterPhone}</span>
                      <span style={{ display: 'flex', alignItems: 'center', marginLeft: '1.5rem' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>
                      </span>
                      <span>{reporterEmail}</span>
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', alignItems: 'stretch', width: '50%' }}>
                    <button 
                      onClick={handleCancelReport}
                      disabled={status !== 'PENDING' || loading}
                      style={{
                        background: status === 'PENDING' && !loading ? '#d32f2f' : '#ccc',
                        color: status === 'PENDING' && !loading ? '#fff' : '#999',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '0.5rem 0.8rem',
                        fontWeight: 600,
                        fontSize: '1rem',
                        cursor: status === 'PENDING' && !loading ? 'pointer' : 'not-allowed',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
                        opacity: status === 'PENDING' && !loading ? 1 : 0.5
                      }}
                    >
                      Cancel Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteConfirmation} onClose={() => setShowDeleteConfirmation(false)} title="Cancel Report" showFooter={false}>
        <div style={{ padding: '1.5rem' }}>
          <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>Are you sure you want to cancel this report? This action cannot be undone.</p>
          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
            <button onClick={() => setShowDeleteConfirmation(false)} style={{ background: '#ccc', color: '#000', border: 'none', borderRadius: '5px', padding: '0.6rem 1.2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>Cancel</button>
            <button onClick={handleConfirmDelete} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: '5px', padding: '0.6rem 1.2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>Cancel Report</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ResidentMyReportDetails;